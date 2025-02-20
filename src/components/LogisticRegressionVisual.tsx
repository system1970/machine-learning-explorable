"use client";

import "katex/dist/katex.min.css";
import React, { useState, useEffect } from "react";
import * as d3 from "d3";

// Define interfaces for data points and weights
interface DataPoint {
  x: number;
  y: number;
}

interface Weights {
  w: number;
  b: number;
}

const LogisticRegressionVisualization: React.FC = () => {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 1 },
    { x: 4, y: 1 },
    { x: 5, y: 1 },
  ]);
  const [weights, setWeights] = useState<Weights>({ w: 1, b: -3 });

  // Function that fits logistic regression using gradient descent
  const fitLogisticRegression = (data: DataPoint[]): Weights => {
    // Use current weights as starting point
    let { w, b } = weights;
    const lr = 0.01;
    const iterations = 1000;
    for (let i = 0; i < iterations; i++) {
      let gradW = 0;
      let gradB = 0;
      data.forEach((d) => {
        const z = w * d.x + b;
        const p = 1 / (1 + Math.exp(-z)); // sigmoid
        gradW += (p - d.y) * d.x;
        gradB += p - d.y;
      });
      gradW /= data.length;
      gradB /= data.length;
      w -= lr * gradW;
      b -= lr * gradB;
    }
    return { w, b };
  };

  // Update weights when dataPoints change.
  useEffect(() => {
    if (dataPoints.length > 0) {
      const newWeights = fitLogisticRegression(dataPoints);
      setWeights(newWeights);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPoints]);

  // Render or update chart when dataPoints or weights change.
  useEffect(() => {
    const svg = d3.select("#logistic-regression-plot");
    // Clear the svg before re-drawing
    svg.selectAll("*").remove();

    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Scales
    const xScale = d3.scaleLinear().domain([0, 10]).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain([0, 1]).range([innerHeight, 0]);

    // Axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Append group for drawing elements
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxis);

    g.append("g").attr("class", "y-axis").call(yAxis);

    // Draw data points
    g.selectAll(".data-point")
      .data(dataPoints)
      .enter()
      .append("circle")
      .attr("class", "data-point")
      .attr("cx", (d: DataPoint) => xScale(d.x))
      // Offset y value for better visibility: class 1 is near top, class 0 near bottom.
      .attr("cy", (d: DataPoint) => yScale(d.y ? 0.9 : 0.1))
      .attr("r", 5)
      .style("fill", (d: DataPoint) => (d.y === 1 ? "green" : "red"))
      .style("stroke", "black")
      .style("stroke-width", "2px");

    // Add new point on click (using d3.pointer for coordinates)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    svg.on("click", function (event: any) {
      // Prevent adding a point if clicking on an existing circle
      if ((event.target as HTMLElement).tagName === "circle") return;
      const [mx, my] = d3.pointer(event);
      const x = xScale.invert(mx - margin.left);
      const y = Math.round(yScale.invert(my - margin.top));
      if (x >= 0 && x <= 10 && (y === 0 || y === 1)) {
        setDataPoints((prev) => [...prev, { x, y }]);
      }
    });

    // Remove point on double-click (using d3.pointer)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    svg.on("dblclick", function (event: any) {
      // Prevent removing if double-clicking on a circle
      if ((event.target as HTMLElement).tagName === "circle") return;
      const [mx, my] = d3.pointer(event);
      const x = xScale.invert(mx - margin.left);
      const y = Math.round(yScale.invert(my - margin.top));
      setDataPoints((prev) =>
        prev.filter((point) => Math.abs(point.x - x) > 0.5 || point.y !== y)
      );
    });

    // Update logistic regression line
    function updateLogisticLine() {
      if (dataPoints.length === 0) return;
      const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));
      const logisticLine = xScale.ticks(100).map((x) => ({
        x,
        y: sigmoid(weights.w * x + weights.b),
      }));

      // Draw logistic curve
      g.selectAll(".logistic-line").remove();
      g.append("path")
        .attr("class", "logistic-line")
        .datum(logisticLine)
        .attr(
          "d",
          d3
            .line<{ x: number; y: number }>()
            .x((d) => xScale(d.x))
            .y((d) => yScale(d.y))
        )
        .style("stroke", "blue")
        .style("stroke-width", "2px")
        .style("fill", "none");
    }

    updateLogisticLine();

    // Clean up event listeners on unmount.
    return () => {
      svg.on("click", null);
      svg.on("dblclick", null);
    };
  }, [dataPoints, weights]);

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={() => setDataPoints([])}
        className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition mb-4"
      >
        Reset
      </button>
      <svg id="logistic-regression-plot" width={600} height={400}></svg>
      <p>Click to add data points (Green = Class 1, Red = Class 0).</p>
      <p>Double-click to remove data points.</p>
      <p>
        Current weights: <strong>w = {weights.w.toFixed(2)}</strong>,{" "}
        <strong>b = {weights.b.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default LogisticRegressionVisualization;
