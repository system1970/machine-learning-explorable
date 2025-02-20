"use client";

import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { motion } from "framer-motion";
import LogisticRegressionVisualization from "../LogisticRegressionVisual";

const sectionVariants = {
  offscreen: { opacity: 0, x: 50 },
  onscreen: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export function Section3() {
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
            Logistic Regression in Supervised Learning
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
              Logistic regression is a fundamental classification algorithm in
              supervised learning. Unlike linear regression, which predicts
              continuous values, logistic regression predicts probabilities for
              binary outcomes (e.g., yes/no, true/false). It uses the sigmoid
              function to map predictions to values between 0 and 1.
            </p>
            <p>
              Whether you&apos;re predicting whether an email is spam or not, or
              diagnosing a disease based on patient data, logistic regression
              provides a simple yet powerful framework for binary classification.
            </p>
          </motion.section>

          {/* What is Logistic Regression? */}
          <motion.section
            className="mb-8"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionVariants}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              What is Logistic Regression?
            </h2>
            <p className="mb-4">
              Logistic regression models the probability that a given input
              belongs to a particular class. The output is constrained between 0
              and 1 using the sigmoid function:
              </p>
              <BlockMath math="P(y=1|X) = \sigma(w^T X + b)" />
              <p>
              where:
              </p>
              <ul className="list-disc list-inside mt-2">
                <li><InlineMath math="\sigma(z)" />: Sigmoid function, defined as:</li>
                <BlockMath math="\sigma(z) = \frac{1}{1 + e^{-z}}" />
                <li><InlineMath math="w" />: Weight vector.</li>
                <li><InlineMath math="b" />: Bias term.</li>
                <li><InlineMath math="X" />: Input features.</li>
              </ul>
            
            <p>
                 
              If <InlineMath math="P(y=1|X) > 0.5" /> , the model predicts the positive class;
              otherwise, it predicts the negative class.
            </p>
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
              Key Concepts
            </h2>
            <ul className="list-disc list-inside mb-4">
              <li>
                <strong>Sigmoid Function:</strong> Maps any real-valued number to
                the range [0, 1], making it suitable for probability estimation.
              </li>
              <li>
                <strong>Decision Boundary:</strong> A threshold (usually 0.5)
                separates the two classes.
              </li>
              <li>
                <strong>Loss Function:</strong> Logistic regression uses the
                cross-entropy loss to measure the difference between predicted
                probabilities and actual labels:
                <BlockMath math="L = -\frac{1}{n} \sum_{i=1}^n \left[ y_i \log(\hat{y}_i) + (1 - y_i) \log(1 - \hat{y}_i) \right]" />
              </li>
            </ul>
            <p>
              These concepts form the foundation of logistic regression and enable
              it to solve binary classification problems effectively.
            </p>
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
              Interactive Visualization of Logistic Regression
            </h2>
            <LogisticRegressionVisualization />
          </motion.section>

          {/* Applications */}
          <motion.section
            className="mb-8"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionVariants}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Applications of Logistic Regression
            </h2>
            <p className="mb-4">
              Logistic regression is widely used in various fields due to its
              simplicity and interpretability:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>
                <strong>Healthcare:</strong> Predicting disease outcomes (e.g.,
                diabetes diagnosis).
              </li>
              <li>
                <strong>Finance:</strong> Credit scoring and fraud detection.
              </li>
              <li>
                <strong>Email Systems:</strong> Spam detection.
              </li>
              <li>
                <strong>Marketing:</strong> Customer churn prediction.
              </li>
            </ul>
            <p>
              Its ability to provide probabilistic outputs makes it particularly
              useful in scenarios where understanding the confidence of a
              prediction is important.
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
              Logistic regression is a cornerstone of supervised learning for
              binary classification tasks. While it is simple, it serves as a
              stepping stone to more complex models like neural networks and
              decision trees.
            </p>
            <p>
              As you explore machine learning further, consider experimenting with
              advanced classification techniques and their applications. Remember,
              mastering these tools requires a solid understanding of their
              mathematical foundations and practical use cases.
            </p>
          </motion.section>
        </article>
      </div>
    </div>
  );
}

// Logistic Regression Visualization Component
