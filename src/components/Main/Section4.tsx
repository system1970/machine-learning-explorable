"use client";

import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { motion } from "framer-motion";
import React from "react";

const sectionVariants = {
  offscreen: { opacity: 0, x: 50 },
  onscreen: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export function Section4() {
  return (
    <div className="relative bg-black h-screen w-full overflow-hidden">
      {/* Background Animation */}
      <FlickeringGrid
        className="absolute inset-0 z-0 [mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]"
        squareSize={4}
        gridGap={6}
        color="#60A5FA"
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
            Classification in Supervised Learning
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
              Classification is a fundamental task in supervised learning where
              the goal is to predict discrete class labels for given input data.
              Unlike regression, which predicts continuous values, classification
              assigns inputs to predefined categories or classes.
            </p>
            <p>
              Examples include predicting whether an email is spam or not, classifying images into categories (e.g., cats vs. dogs), or diagnosing diseases based on patient data.
            </p>
          </motion.section>

          {/* What is Classification? */}
          <motion.section
            className="mb-8"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionVariants}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              What is Classification?
            </h2>
            <p className="mb-4">
              Classification involves training a model on labeled data to predict
              discrete class labels. The output is typically one of several
              predefined categories. Mathematically, the model learns a mapping:
            </p>
              <BlockMath math="y = f(X)" />
              where <InlineMath math="y" /> is the predicted class label and{" "}
              <InlineMath math="X" /> is the input data.
            
            <ul className="list-disc list-inside mb-4">
              <li>
                <strong>Binary Classification:</strong> Predicts one of two classes
                (e.g., yes/no, true/false).
              </li>
              <li>
                <strong>Multiclass Classification:</strong> Predicts one of more
                than two classes (e.g., cat/dog/bird).
              </li>
              <li>
                <strong>Multilabel Classification:</strong> Assigns multiple labels
                to a single input (e.g., tagging an image with multiple objects).
              </li>
            </ul>
            <p>
              Classification algorithms are widely used in various domains due to
              their ability to categorize data effectively.
            </p>
          </motion.section>

          {/* Key Concepts in Classification */}
          <motion.section
            className="mb-8"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionVariants}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Key Concepts in Classification
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[50rem]">
              {/* Box 1: Decision Boundary */}
              <div className="bg-[#1E1E1E] p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Decision Boundary</h3>
                <p>
                  A decision boundary separates different classes in the feature
                  space. For example, in logistic regression, the decision boundary
                  is a line (or hyperplane) that divides the positive and negative
                  classes.
                </p>
              </div>
              {/* Box 2: Loss Function */}
              <div className="bg-[#1E1E1E] p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Loss Function</h3>
                <p>
                  Classification models use loss functions like cross-entropy to
                  measure the difference between predicted probabilities and actual
                  labels:
                </p>
                  <BlockMath math="L = -\frac{1}{n} \sum_{i=1}^n \left[ y_i \log(\hat{y}_i) + (1 - y_i) \log(1 - \hat{y}_i) \right]" />
                
              </div>
              {/* Box 3: Evaluation Metrics */}
              <div className="bg-[#1E1E1E] p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Evaluation Metrics</h3>
                <p>
                  Common metrics for evaluating classification models include:
                  </p>
                  <ul className="list-disc list-inside mt-2">
                    <li>
                      <strong>Accuracy:</strong> Proportion of correct predictions.
                    </li>
                    <li>
                      <strong>Precision:</strong> Proportion of true positives among
                      predicted positives.
                    </li>
                    <li>
                      <strong>Recall:</strong> Proportion of true positives among
                      actual positives.
                    </li>
                    <li>
                      <strong>F1-Score:</strong> Harmonic mean of precision and recall.
                    </li>
                  </ul>
                
              </div>
              {/* Box 4: Algorithms */}
              <div className="bg-[#1E1E1E] p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Algorithms</h3>
                <p>
                  Popular classification algorithms include:
                  </p>
                  <ul className="list-disc list-inside mt-2">
                    <li>Logistic Regression</li>
                    <li>Support Vector Machines (SVM)</li>
                    <li>Decision Trees</li>
                    <li>Random Forests</li>
                    <li>k-Nearest Neighbors (k-NN)</li>
                  </ul>
                
              </div>
            </div>
          </motion.section>

          {/* Applications of Classification */}
          <motion.section
            className="mb-8"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionVariants}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Applications of Classification
            </h2>
            <p className="mb-4">
              Classification is widely used in various fields:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>
                <strong>Healthcare:</strong> Diagnosing diseases (e.g., cancer
                detection).
              </li>
              <li>
                <strong>Finance:</strong> Credit scoring and fraud detection.
              </li>
              <li>
                <strong>Email Systems:</strong> Spam filtering.
              </li>
              <li>
                <strong>Image Recognition:</strong> Object detection and facial
                recognition.
              </li>
            </ul>
            <p>
              Its ability to categorize data makes it indispensable in modern
              machine learning applications.
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
              Classification is a cornerstone of supervised learning, enabling
              models to predict discrete class labels. From binary classification to
              multiclass and multilabel problems, it provides a versatile framework
              for solving real-world challenges.
            </p>
            <p>
              As you explore classification further, consider experimenting with
              different algorithms and evaluation metrics to understand their
              strengths and limitations. Mastery of these tools requires both
              theoretical knowledge and practical experience.
            </p>
          </motion.section>
        </article>
      </div>
    </div>
  );
}