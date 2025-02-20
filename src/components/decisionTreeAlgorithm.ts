// Define interfaces for a data point, best split, and decision tree node.
export interface DataPoint {
    x: number;
    y: number;
    label: string;
  }
  
  export interface BestSplit {
    featureIndex: keyof Pick<DataPoint, "x" | "y">;
    threshold: number;
    leftData: DataPoint[];
    rightData: DataPoint[];
  }
  
  interface LeafNode {
    isLeaf: true;
    predictedLabel: string;
    dataCount: number;
    depth: number;
  }
  
  interface InternalNode {
    isLeaf: false;
    featureIndex: keyof Pick<DataPoint, "x" | "y">;
    threshold: number;
    leftChild: TreeNode;
    rightChild: TreeNode;
    depth: number;
  }
  
  export type TreeNode = LeafNode | InternalNode;
  
  /**
   * Calculates Gini impurity for a set of data points.
   * @param {DataPoint[]} dataPoints
   * @returns {number} Gini impurity
   */
  export function calculateGiniImpurity(dataPoints: DataPoint[]): number {
    if (dataPoints.length === 0) return 0;
    const labelCounts: Record<string, number> = {};
    for (const point of dataPoints) {
      labelCounts[point.label] = (labelCounts[point.label] || 0) + 1;
    }
    let impurity = 1;
    for (const label in labelCounts) {
      const probability = labelCounts[label] / dataPoints.length;
      impurity -= probability ** 2;
    }
    return impurity;
  }
  
  /**
   * Finds the best split for a node based on Gini impurity.
   * @param {DataPoint[]} dataPoints
   * @returns {BestSplit | null} Best split or null if no split improves impurity.
   */
  export function findBestSplit(dataPoints: DataPoint[]): BestSplit | null {
    if (dataPoints.length <= 1) return null;
    const currentImpurity = calculateGiniImpurity(dataPoints);
    let bestSplit: BestSplit | null = null;
    let bestImpurityImprovement = 0;
  
    const possibleFeatures: (keyof Pick<DataPoint, "x" | "y">)[] = ["x", "y"]; // For 2D data
  
    for (const featureIndex of possibleFeatures) {
      const uniqueValues = [...new Set(dataPoints.map(p => p[featureIndex]))];
      uniqueValues.sort((a, b) => a - b); // Sort for ordered thresholds
  
      for (const threshold of uniqueValues) {
        const leftData = dataPoints.filter(p => p[featureIndex] <= threshold);
        const rightData = dataPoints.filter(p => p[featureIndex] > threshold);
  
        if (leftData.length > 0 && rightData.length > 0) {
          const leftImpurity = calculateGiniImpurity(leftData);
          const rightImpurity = calculateGiniImpurity(rightData);
          const weightedImpurity =
            (leftData.length / dataPoints.length) * leftImpurity +
            (rightData.length / dataPoints.length) * rightImpurity;
          const impurityImprovement = currentImpurity - weightedImpurity;
  
          if (impurityImprovement > bestImpurityImprovement) {
            bestSplit = {
              featureIndex: featureIndex,
              threshold: threshold,
              leftData: leftData,
              rightData: rightData,
            };
            bestImpurityImprovement = impurityImprovement;
          }
        }
      }
    }
  
    return bestImpurityImprovement > 0 ? bestSplit : null; // Only return split if it improves impurity
  }
  
  /**
   * Builds a decision tree recursively.
   * @param {DataPoint[]} dataPoints
   * @param {number} depth Current depth of the tree
   * @param {number} maxDepth Maximum depth of the tree (for pruning)
   * @returns {TreeNode} Decision tree node
   */
  export function buildDecisionTree(
    dataPoints: DataPoint[],
    depth: number = 0,
    maxDepth: number = 5
  ): TreeNode {
    // Stop if max depth reached or node is pure
    if (depth >= maxDepth || new Set(dataPoints.map(p => p.label)).size === 1) {
      const labelCounts: Record<string, number> = {};
      for (const point of dataPoints) {
        labelCounts[point.label] = (labelCounts[point.label] || 0) + 1;
      }
      let predictedLabel = 'A'; // Default label in case of tie or no data (shouldn't happen)
      let maxCount = 0;
      for (const label in labelCounts) {
        if (labelCounts[label] > maxCount) {
          predictedLabel = label;
          maxCount = labelCounts[label];
        }
      }
  
      return {
        isLeaf: true,
        predictedLabel,
        dataCount: dataPoints.length,
        depth,
      };
    }
  
    const bestSplit = findBestSplit(dataPoints);
  
    if (!bestSplit) {
      const labelCounts: Record<string, number> = {};
      for (const point of dataPoints) {
        labelCounts[point.label] = (labelCounts[point.label] || 0) + 1;
      }
      let predictedLabel = 'A';
      let maxCount = 0;
      for (const label in labelCounts) {
        if (labelCounts[label] > maxCount) {
          predictedLabel = label;
          maxCount = labelCounts[label];
        }
      }
      return {
        isLeaf: true,
        predictedLabel,
        dataCount: dataPoints.length,
        depth,
      };
    }
  
    const leftChild = buildDecisionTree(bestSplit.leftData, depth + 1, maxDepth);
    const rightChild = buildDecisionTree(bestSplit.rightData, depth + 1, maxDepth);
  
    return {
      isLeaf: false,
      featureIndex: bestSplit.featureIndex,
      threshold: bestSplit.threshold,
      leftChild,
      rightChild,
      depth,
    };
  }
  
  /**
   * Predicts the label for a new data point using the decision tree.
   * @param {TreeNode} tree
   * @param {DataPoint} dataPoint
   * @returns {string} Predicted label
   */
  export function predict(tree: TreeNode, dataPoint: DataPoint): string {
    if (tree.isLeaf) {
      return tree.predictedLabel;
    }
    const featureValue = dataPoint[tree.featureIndex];
    if (featureValue <= tree.threshold) {
      return predict(tree.leftChild, dataPoint);
    } else {
      return predict(tree.rightChild, dataPoint);
    }
  }