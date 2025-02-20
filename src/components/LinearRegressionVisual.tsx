"use client";

import React, { useState, useEffect } from "react";
import * as d3 from "d3";

interface DataPoint {
    x: number;
    y: number;
  }
  
  // A more representative initial set of data points
  const initialDataPoints: DataPoint[] = [
    { x: 1, y: 2.5 },
    { x: 2, y: 3 },
    { x: 3, y: 4 },
    { x: 4, y: 4.5 },
    { x: 5, y: 6 },
    { x: 6, y: 7 },
    { x: 7, y: 7.5 },
    { x: 8, y: 8.2 },
    { x: 9, y: 10 },
    { x: 10, y: 10.5 },
  ];
  
const LinearRegressionVisualization = () => {
    const [dataPoints, setDataPoints] = useState<DataPoint[]>(initialDataPoints);
    const [rSquared, setRSquared] = useState<number>(0);
    const [errorType, setErrorType] = useState("none");
  
    useEffect(() => {
      // Select and clear the SVG element
      const svg = d3.select("#regression-plot");
      svg.selectAll("*").remove();
  
      const width = 600;
      const height = 400;
      const margin = { top: 20, right: 20, bottom: 30, left: 50 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;
  
      // Create the main group for chart elements
      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
      // Define scales
      const xScale = d3.scaleLinear().domain([0, 15]).range([0, innerWidth]);
      const yScale = d3.scaleLinear().domain([0, 20]).range([innerHeight, 0]);
  
      // Define and draw axes
      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);
  
      g.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(xAxis);
      g.append("g").attr("class", "y-axis").call(yAxis);
  
      // Function to update the regression line, error indicators, and R² value
      function updateRegressionLine() {
        if (dataPoints.length < 2) return;
  
        const xValues = dataPoints.map((d) => d.x);
        const yValues = dataPoints.map((d) => d.y);
        const n = dataPoints.length;
        const sumX = d3.sum(xValues);
        const sumY = d3.sum(yValues);
        const sumXY = d3.sum(dataPoints, (d) => d.x * d.y);
        const sumX2 = d3.sum(xValues, (x) => x * x);
  
        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;
  
        const predictedY = xValues.map((x) => slope * x + intercept);
        const ssResidual = d3.sum(dataPoints, (d, i) =>
          Math.pow(d.y - predictedY[i], 2)
        );
        const ssTotal = d3.sum(dataPoints, (d) => Math.pow(d.y - sumY / n, 2));
        const r2 = 1 - ssResidual / ssTotal;
        setRSquared(parseFloat(r2.toFixed(2)));
  
        // Draw regression line
        g.selectAll(".regression-line").remove();
        g.append("line")
          .attr("class", "regression-line")
          .attr("x1", xScale(0))
          .attr("y1", yScale(intercept))
          .attr("x2", xScale(15))
          .attr("y2", yScale(slope * 15 + intercept))
          .style("stroke", "red")
          .style("stroke-width", "2px");
  
        // Remove any old error indicators
        g.selectAll(".error-line").remove();
        g.selectAll(".error-square").remove();
  
        if (errorType === "absolute") {
          // Draw vertical lines to show absolute error
          g.selectAll(".error-line")
            .data(dataPoints)
            .enter()
            .append("line")
            .attr("class", "error-line")
            .attr("x1", (d) => xScale(d.x))
            .attr("y1", (d) => yScale(d.y))
            .attr("x2", (d) => xScale(d.x))
            .attr("y2", (d) => {
              const predicted = slope * d.x + intercept;
              return yScale(predicted);
            })
            .style("stroke", "red")
            .style("stroke-width", "1px");
        } else if (errorType === "squared") {
          // Draw squares representing the squared error in pixel space
          g.selectAll(".error-square")
            .data(dataPoints)
            .enter()
            .append("rect")
            .attr("class", "error-square")
            .attr("x", (d) => {
              const predicted = slope * d.x + intercept;
              const pixelError = Math.abs(yScale(d.y) - yScale(predicted));
              // Center the square horizontally on the data point
              return xScale(d.x) - pixelError / 2;
            })
            .attr("y", (d) => {
              const predicted = slope * d.x + intercept;
            //   const pixelError = Math.abs(yScale(d.y) - yScale(predicted));
              // Position the square at the top of the error interval
              return Math.min(yScale(d.y), yScale(predicted));
            })
            .attr("width", (d) => {
              const predicted = slope * d.x + intercept;
              return Math.abs(yScale(d.y) - yScale(predicted));
            })
            .attr("height", (d) => {
              const predicted = slope * d.x + intercept;
              return Math.abs(yScale(d.y) - yScale(predicted));
            })
            .style("stroke", "red")
            .style("fill", "red")
            .attr("opacity", "0.3")
            .style("stroke-width", "1px");
        }
      }
  
      // Define drag behavior for data points
      const drag = d3
        .drag<SVGCircleElement, DataPoint>()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .on("start", function (_event, _d) {
          d3.select(this).raise().classed("active", true);
        })
        .on("drag", function (event, d) {
          const [pointerX, pointerY] = d3.pointer(event, this.parentNode);
          const newX = Math.max(0, Math.min(15, xScale.invert(pointerX)));
          const newY = Math.max(0, Math.min(20, yScale.invert(pointerY)));
          console.log(xScale.invert(event.x), yScale.invert(event.y));
          console.log(newX, newY);
          // Update the data point
          const index = dataPoints.indexOf(d);
          const newDataPoints = [...dataPoints];
          newDataPoints[index] = { x: newX, y: newY };
          setDataPoints(newDataPoints);
          
          // Update the circle position
          d3.select(this)
            .attr("cx", xScale(newX))
            .attr("cy", yScale(newY));
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .on("end", function (_event, _d) {
          d3.select(this).classed("active", false);
          updateRegressionLine();
        });
  
      // Draw data points as circles
        g.selectAll(".data-point")
        .data(dataPoints)
        .enter()
        .append("circle")
        .attr("class", "data-point")
        .attr("cx", (d) => xScale(d.x))
        .attr("cy", (d) => yScale(d.y))
        .attr("r", 5)
        .style("fill", "white")
        .style("stroke", "black")
        .style("stroke-width", "2px")
        .on("dblclick", function (event, d) {
            event.stopPropagation();
            setDataPoints((prev) => prev.filter((point) => point !== d));
          })
        .call(drag);

      // Add a new point when clicking on the background
      svg.on("click", function (event) {
        if (event.target === this) { // Only trigger if clicking on the SVG background
          const [mouseX, mouseY] = d3.pointer(event);
          const x = xScale.invert(mouseX - margin.left);
          const y = yScale.invert(mouseY - margin.top);
          if (x >= 0 && x <= 15 && y >= 0 && y <= 20) {
            setDataPoints([...dataPoints, { x, y }]);
          }
        }
      });

      // Draw initial regression line and error indicators
      updateRegressionLine();
    }, [dataPoints, errorType]);
  
    return (
      <div className="flex flex-col items-center justify-center">
        {/* Reset Button */}
        <button
          onClick={() => setDataPoints(initialDataPoints)}
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition mb-4"
        >
          Reset
        </button>
        <div className="mt-4">
          View:
          <label className="ml-2">
            <input
              type="radio"
              name="error-type"
              value="none"
              checked={errorType === "none"}
              onChange={() => setErrorType("none")}
            />{" "}
            None
          </label>
          <label className="ml-4">
            <input
              type="radio"
              name="error-type"
              value="absolute"
              checked={errorType === "absolute"}
              onChange={() => setErrorType("absolute")}
            />{" "}
            Absolute Error
          </label>
          <label className="ml-4">
            <input
              type="radio"
              name="error-type"
              value="squared"
              checked={errorType === "squared"}
              onChange={() => setErrorType("squared")}
            />{" "}
            Squared Error
          </label>
        </div>
        <svg id="regression-plot" width={600} height={400}></svg>
        <p>R²: {rSquared}</p>
        <p>
          Click on the plot (away from existing points) to add a new point.
          Drag points to move them. Double-click on the background to remove a point.
        </p>
      </div>
    );
  };

export default LinearRegressionVisualization;