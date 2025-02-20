"use client";

import "katex/dist/katex.min.css";
import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { buildDecisionTree, predict, TreeNode } from "./decisionTreeAlgorithm";

interface DataPoint {
  x: number;
  y: number;
  label: string;
}

const initialDataPoints: DataPoint[] = [
  { x: 2, y: 6, label: "A" },
  { x: 3, y: 7, label: "A" },
  { x: 4, y: 5, label: "A" },
  { x: 5, y: 8, label: "A" },
  { x: 6, y: 5, label: "B" },
  { x: 7, y: 7, label: "B" },
  { x: 8, y: 6, label: "B" },
  { x: 9, y: 8, label: "B" },
];

interface Region {
  name: string;
  color: string;
  bounds: { xMin: number; xMax: number; yMin: number; yMax: number };
  label: string;
}

const DecisionTreeVisualization: React.FC = () => {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>(initialDataPoints);
  const [newPoint, setNewPoint] = useState<{ x: number; y: number }>({ x: 5, y: 6 });
  const [predictedRegion, setPredictedRegion] = useState<string | null>(null);
  const [decisionTree, setDecisionTree] = useState<TreeNode | null>(null);

  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    // Train the decision tree whenever dataPoints change
    const tree = buildDecisionTree(dataPoints);
    setDecisionTree(tree);
  }, [dataPoints]);

  useEffect(() => {
    if (!decisionTree) return; // Don't draw if tree is not yet built

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear().domain([0, 10]).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain([0, 10]).range([innerHeight, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(xAxis);
    g.append("g").call(yAxis);

    // --- Visualize Decision Tree Structure ---
    const treeLayout = d3.tree<TreeNode>().size([innerWidth, innerHeight]);

    
    const root = d3.hierarchy<TreeNode>(decisionTree, (node) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
      [node.leftChild, node.rightChild].filter(Boolean)
    );
    treeLayout(root);

    // Draw links (branches)
    g.selectAll(".link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr(
        "d",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (d3.linkVertical<d3.HierarchyPointLink<TreeNode>, d3.HierarchyPointNode<TreeNode>>() as any)
          .x((d: { x: unknown; }) => d.x)
          .y((d: { y: unknown; }) => d.y)
      )
      .style("fill", "none")
      .style("stroke", "white")
      .style("stroke-width", 1);

    // Draw nodes (decision nodes and leaf nodes)
    const nodes = g
      .selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    nodes
      .append("circle")
      .attr("r", 10)
      .style("fill", (d) =>
        d.data.isLeaf ? (d.data.predictedLabel === "A" ? "green" : "red") : "steelblue"
      )
      .style("stroke", "white")
      .style("stroke-width", 2);

    nodes
      .append("text")
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .style("fill", "white")
      .style("font-size", "10px")
      .text((d) =>
        d.data.isLeaf ? `Class: ${d.data.predictedLabel}` : `${d.data.featureIndex}=${d.data.threshold}`
      );

    // --- Calculate and Draw Decision Regions ---
    function getRegionsFromTree(
      treeNode: TreeNode,
      xMin = 0,
      xMax = 10,
      yMin = 0,
      yMax = 10
    ): Region[] {
      if (treeNode.isLeaf) {
        return [
          {
            name: `Region (${treeNode.predictedLabel})`,
            color: treeNode.predictedLabel === "A" ? "green" : "red",
            bounds: { xMin, xMax, yMin, yMax },
            label: treeNode.predictedLabel,
          },
        ];
      }

      const feature = treeNode.featureIndex;
      const threshold = treeNode.threshold;
      let regions: Region[] = [];

      if (feature === "x") {
        regions = [
          ...getRegionsFromTree(treeNode.leftChild, xMin, threshold, yMin, yMax),
          ...getRegionsFromTree(treeNode.rightChild, threshold, xMax, yMin, yMax),
        ];
      } else if (feature === "y") {
        regions = [
          ...getRegionsFromTree(treeNode.leftChild, xMin, xMax, yMin, threshold),
          ...getRegionsFromTree(treeNode.rightChild, xMin, xMax, threshold, yMax),
        ];
      }
      return regions;
    }

    const regions = getRegionsFromTree(decisionTree);

    g.selectAll(".region")
      .data(regions)
      .enter()
      .append("rect")
      .attr("class", "region")
      .attr("x", (d) => xScale(d.bounds.xMin))
      .attr("y", (d) => yScale(d.bounds.yMax))
      .attr("width", (d) => xScale(d.bounds.xMax) - xScale(d.bounds.xMin))
      .attr("height", (d) => yScale(d.bounds.yMin) - yScale(d.bounds.yMax))
      .style("fill", (d) => d.color)
      .style("opacity", 0.3)
      .style("stroke", "black")
      .style("stroke-width", 1)
      .on("mouseover", function (_event, d) {
        setPredictedRegion(d.name);
        d3.select(this).style("opacity", 0.7);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .on("mouseout", function (_event, _d) {
        setPredictedRegion(null);
        d3.select(this).style("opacity", 0.3);
      });

    // Draw data points
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

    // Draw new point and enable dragging
    g.append("circle")
      .attr("class", "new-point")
      .attr("cx", xScale(newPoint.x))
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
            if (decisionTree) {
              const predictedLabel = predict(decisionTree, {
                  x: newX, y: newY,
                  label: ""
              });
              setPredictedRegion(`Predicted Class: ${predictedLabel}`);
            }
          })
      );

    svg.on("click", function (event) {
      const target = event.target as HTMLElement;
      if (target.tagName === "circle" || target.tagName === "path") return; // Avoid clicks on points or regions
      const [mx, my] = d3.pointer(event);
      const x = xScale.invert(mx - margin.left);
      const y = yScale.invert(my - margin.top);
      const newLabel = event.shiftKey ? "B" : "A";
      if (x >= 0 && x <= 10 && y >= 0 && y <= 10) {
        setDataPoints((prev) => [...prev, { x, y, label: newLabel }]);
      }
    });

    return () => {
      svg.on("click", null);
    };
  }, [dataPoints, newPoint, decisionTree]);

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={() => setDataPoints(initialDataPoints)}
        className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition mb-4"
      >
        Reset
      </button>
      <div className="mb-4">{!predictedRegion && <p>Test</p>} {predictedRegion && <p>{predictedRegion}</p>}</div>
      <svg id="decision-tree-plot" width={600} height={400} ref={svgRef}></svg>
      <p>
        Click to add data points (<strong>Click</strong> for Class A,{" "}
        <strong>Shift+Click</strong> for Class B).
      </p>
      <p>
        Drag the blue point to see the predicted class and region. Double-click a
        training point to remove it.
      </p>
    </div>
  );
};

export default DecisionTreeVisualization;