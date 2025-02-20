// SectionDecisionTree.tsx
"use client";

import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { motion } from "framer-motion";
import DecisionTreeVisualization from "../DecisionTree"; // Assuming you'll create this

const sectionVariants = {
  offscreen: { opacity: 0, x: 50 },
  onscreen: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export function Section7() {
  return (
    <div className="relative bg-black h-screen w-full overflow-hidden">
      {/* Background Animation */}
      <FlickeringGrid
        className="absolute inset-0 z-0 [mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]"
        squareSize={4}
        gridGap={6}
        color="#A855F7" // Different color to distinguish from KNN
        maxOpacity={0.5}
        flickerChance={0.3}
        height={800}
        width={1600}
      />
      {/* Main Content */}
      <div className="relative z-10 p-8 md:p-16 text-white max-w-4xl mx-auto overflow-y-auto h-full">
        <article>
          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Decision Trees in Supervised Learning
          </h1>

          {/* Introduction */}
          <motion.section
            className="mb-8"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionVariants}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Introduction
            </h2>
            <p className="mb-4">
              Decision Trees are a versatile supervised learning algorithm used
              for both classification and regression. They work by recursively
              splitting the dataset into subsets based on the most significant
              feature at each step. This process creates a tree-like structure of
              decisions, making them highly interpretable and useful for
              understanding the logic behind predictions.
            </p>
            <p>
              From predicting customer churn to diagnosing medical conditions,
              decision trees offer a powerful and intuitive approach to modeling
              complex relationships in data.
            </p>
          </motion.section>

          {/* What are Decision Trees? */}
          <motion.section
            className="mb-8"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionVariants}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              What are Decision Trees?
            </h2>
            <p className="mb-4">
              Decision Trees mimic human decision-making by using a tree structure
              to represent a series of decisions and their possible outcomes. Each
              internal node represents a test on an attribute, each branch
              represents the outcome of the test, and each leaf node (terminal
              node) represents a class label or a regression value.
            </p>
            <p className="mb-4">
              The algorithm learns to split based on features that best separate
              the data according to the target variable. This splitting process
              aims to increase the homogeneity of the subsets, ideally leading to
              pure leaf nodes where all data points belong to the same class (in
              classification) or have similar values (in regression).
            </p>
             <BlockMath math="\text{Decision Process}: \text{Feature Selection} \rightarrow \text{Splitting} \rightarrow \text{Leaf Node Assignment}" />
          </motion.section>

          {/* Key Concepts */}
          <motion.section
            className="mb-8"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionVariants}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Key Concepts in Decision Trees
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Box 1: Splitting Criteria */}
              <div className="bg-[#1E1E1E] p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Splitting Criteria</h3>
                <p>
                  Criteria used to determine the best feature and split point at
                  each node:
                  <ul className="list-disc list-inside mt-2">
                    <li>
                      <strong>Gini Impurity (Classification):</strong> Measures the
                      probability of misclassifying a randomly chosen element if it
                      were randomly labeled according to the class distribution in
                      the subset.
                    </li>
                    <li>
                      <strong>Entropy and Information Gain (Classification):</strong> Entropy
                      measures the impurity of a node. Information gain measures the
                      reduction in entropy after a split.
                    </li>
                    <li>
                      <strong>Mean Squared Error (MSE) (Regression):</strong> Measures the
                      average squared difference between the predicted and actual
                      values in a node.
                    </li>
                  </ul>
                </p>
              </div>
              {/* Box 2: Tree Depth and Overfitting */}
              <div className="bg-[#1E1E1E] p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Tree Depth and Overfitting</h3>
                <p>
                  The depth of the tree significantly impacts its complexity and
                  potential for overfitting:
                  <ul className="list-disc list-inside mt-2">
                    <li>
                      <strong>Shallow Trees:</strong> May underfit, failing to capture
                      complex relationships in the data.
                    </li>
                    <li>
                      <strong>Deep Trees:</strong> Can overfit, memorizing the training data
                      and performing poorly on unseen data. Techniques like pruning
                      and setting maximum depth are used to control overfitting.
                    </li>
                  </ul>
                </p>
              </div>
              {/* Box 3: Node Types */}
              <div className="bg-[#1E1E1E] p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Node Types</h3>
                <p>
                  Decision Trees are composed of different types of nodes:
                  <ul className="list-disc list-inside mt-2">
                    <li>
                      <strong>Root Node:</strong> The topmost node, representing the
                      entire dataset.
                    </li>
                    <li>
                      <strong>Decision Nodes (Internal Nodes):</strong> Nodes that test
                      an attribute and branch to child nodes based on the outcome.
                    </li>
                    <li>
                      <strong>Leaf Nodes (Terminal Nodes):</strong> Nodes that predict the
                      final output (class label or regression value) and do not
                      split further.
                    </li>
                  </ul>
                </p>
              </div>
              {/* Box 4: Pros and Cons */}
              <div className="bg-[#1E1E1E] p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Pros and Cons</h3>
                <p>
                  <strong>Pros:</strong>
                  <ul className="list-disc list-inside mt-2">
                    <li>Easy to understand and interpret.</li>
                    <li>Can handle both categorical and numerical data.</li>
                    <li>Non-parametric, no assumptions about data distribution.</li>
                  </ul>
                  <strong>Cons:</strong>
                  <ul className="list-disc list-inside mt-2">
                    <li>Prone to overfitting, especially with deep trees.</li>
                    <li>Can be unstable; small changes in data can lead to different trees.</li>
                    <li>Can be less effective than other algorithms for complex problems.</li>
                  </ul>
                </p>
              </div>
            </div>
          </motion.section>

          {/* Interactive Visualization */}
          <motion.section
            className="mb-8"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionVariants}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Interactive Visualization of Decision Trees
            </h2>
            <DecisionTreeVisualization />
          </motion.section>

          {/* Applications of Decision Trees */}
          <motion.section
            className="mb-8"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionVariants}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Applications of Decision Trees
            </h2>
            <p className="mb-4">
              Decision Trees are applied across various domains due to their
              interpretability and ease of use:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>
                <strong>Customer Churn Prediction:</strong> Identifying factors that
                lead customers to stop using a service.
              </li>
              <li>
                <strong>Medical Diagnosis:</strong> Assisting in diagnosing diseases based
                on symptoms and medical history.
              </li>
              <li>
                <strong>Risk Assessment:</strong> Evaluating credit risk or fraud risk in
                financial applications.
              </li>
              <li>
                <strong>Classification Problems:</strong> Image classification, spam
                detection, and sentiment analysis.
              </li>
            </ul>
            <p>
              Their ability to provide clear decision paths makes them valuable
              in scenarios where understanding the reasoning behind predictions is
              as important as the prediction itself.
            </p>
          </motion.section>

          {/* Conclusion */}
          <motion.section
            className="mb-8"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionVariants}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Conclusion
            </h2>
            <p className="mb-4">
              Decision Trees are a powerful and intuitive tool for supervised
              learning, offering both classification and regression capabilities.
              Their interpretability makes them particularly valuable for gaining
              insights from data and understanding decision-making processes.
              However, it&apos;s crucial to manage their complexity to avoid overfitting
              and to consider their stability in different datasets.
            </p>
            <p>
              Experiment with Decision Trees, explore techniques to optimize their
              performance, and consider their strengths and limitations as you
              advance in your machine learning journey. Practical application and
              critical evaluation are key to mastering these algorithms.
            </p>
          </motion.section>
        </article>
      </div>
    </div>
  );
}