"use client";

import "katex/dist/katex.min.css";
import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import { InlineMath } from "react-katex";

interface DataPoint {
  x: number;
  y: number;
  label: string;
}
const initialDataPoints: DataPoint[] = [
    { x: 1, y: 2, label: "A" },
    { x: 2, y: 4, label: "A" },
    { x: 3, y: 5, label: "B" },
    { x: 4, y: 4, label: "B" },
    { x: 5, y: 5, label: "B" },
  ]
const KNNVisualization: React.FC = () => {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>(initialDataPoints);
  const [kValue, setKValue] = useState<number>(3);
  const [newPoint, setNewPoint] = useState<{ x: number; y: number }>({ x: 4, y: 4 });

  useEffect(() => {
    const svg = d3.select("#knn-plot");
    // Clear previous drawing
    svg.selectAll("*").remove();

    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Scales
    const xScale = d3.scaleLinear().domain([0, 10]).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain([0, 10]).range([innerHeight, 0]);

    // Axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Append a group for drawing elements and translate by margins
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxis);

    g.append("g").attr("class", "y-axis").call(yAxis);

    // Draw training data points
    g.selectAll(".data-point")
      .data(dataPoints)
      .enter()
      .append("circle")
      .attr("class", "data-point")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", 5)
      .style("fill", (d) => (d.label === "A" ? "green" : "red"))
      .style("stroke", "black")
      .style("stroke-width", "2px")
      .on("dblclick", function (event, d) {
        event.stopPropagation();
        setDataPoints((prev) => prev.filter((point) => point !== d));
      });

    // Draw the blue test point and attach drag behavior to it
    g.append("circle")
      .attr("class", "new-point")
      .attr("cx", xScale(newPoint.x))
      // FIX: Use yScale for y coordinate instead of xScale
      .attr("cy", yScale(newPoint.y))
      .attr("r", 7)
      .style("fill", "blue")
      .style("stroke", "white")
      .style("stroke-width", "2px")
      .datum(newPoint)
      .call(
        d3
          .drag<SVGCircleElement, { x: number; y: number }>()
          .on("drag", function (event) {
            const newX = xScale.invert(event.x);
            const newY = yScale.invert(event.y);
            setNewPoint({ x: newX, y: newY });
          })
      );

    // Add a new training point on click (only if not clicking on an existing circle)
    svg.on("click", function (event) {
      const target = event.target as HTMLElement;
      // Avoid clicks on circles (training or test points)
      if (target.tagName === "circle") return;
      const [mx, my] = d3.pointer(event);
      // Adjust pointer coordinates to the group's coordinate system
      const x = xScale.invert(mx - margin.left);
      const y = yScale.invert(my - margin.top);
      // Determine label: Shift+Click gives label "B", otherwise "A"
      const newLabel = event.shiftKey ? "B" : "A";
      if (x >= 0 && x <= 10 && y >= 0 && y <= 10) {
        setDataPoints((prev) => [...prev, { x, y, label: newLabel }]);
      }
    });

    // --- kNN Classification ---

    // Calculate distances from the test (blue) point to each training point
    const distances = dataPoints.map((point) => ({
      ...point,
      distance: Math.sqrt(Math.pow(point.x - newPoint.x, 2) + Math.pow(point.y - newPoint.y, 2)),
    }));

    // Sort by distance and take the k nearest neighbors
    const sortedDistances = distances.sort((a, b) => a.distance - b.distance);
    const kNearest = sortedDistances.slice(0, kValue);

    // Count labels among k-nearest neighbors
    const labelCounts: { [key: string]: number } = {};
    kNearest.forEach((point) => {
      labelCounts[point.label] = (labelCounts[point.label] || 0) + 1;
    });
    const predictedLabel = Object.keys(labelCounts).reduce((a, b) =>
      labelCounts[a] > labelCounts[b] ? a : b
    );

    // Draw lines from the blue test point to each of the k-nearest neighbors
    g.selectAll(".knn-line").remove();
    g.selectAll(".knn-line")
      .data(kNearest)
      .enter()
      .append("line")
      .attr("class", "knn-line")
      .attr("x1", xScale(newPoint.x))
      .attr("y1", yScale(newPoint.y))
      .attr("x2", (d) => xScale(d.x))
      .attr("y2", (d) => yScale(d.y))
      .style("stroke", "yellow")
      .style("stroke-width", "2px");

    // Display prediction text near the blue test point
    g.selectAll(".prediction-text").remove();
    g.append("text")
      .attr("class", "prediction-text")
      .attr("x", xScale(newPoint.x) + 10)
      .attr("y", yScale(newPoint.y) - 10)
      .text(`Predicted: ${predictedLabel}`)
      .style("fill", "white")
      .style("font-size", "14px");

    // Cleanup: Remove event listener on unmount
    return () => {
      svg.on("click", null);
    };
  }, [dataPoints, kValue, newPoint]);

  return (
    <div className="flex flex-col items-center justify-center">
        <button
          onClick={() => setDataPoints(initialDataPoints)}
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition mb-4"
        >
          Reset
        </button>
      <div className="flex items-center mb-4">
        <label className="mr-2">Set <InlineMath math="k"/>:</label>
        <input
          type="number"
          min="1"
          max="10"
          value={kValue}
          onChange={(e) => setKValue(Number(e.target.value))}
          className="bg-gray-700 text-white px-2 py-1 rounded"
        />
      </div>
      <svg id="knn-plot" width={600} height={400}></svg>
      <p>
        Click on the background to add data points (
        <strong>Click</strong> for Class A, <strong>Shift+Click</strong> for Class B).
      </p>
      <p>Drag the blue point to test predictions. Double-click a training point to remove it.</p>
    </div>
  );
};

export default KNNVisualization;
