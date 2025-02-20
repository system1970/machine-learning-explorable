"use client";

import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { motion } from "framer-motion";
import KNNVisualization from "../KNN";

const sectionVariants = {
  offscreen: { opacity: 0, x: 50 },
  onscreen: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export function Section5() {
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
            k-Nearest Neighbors (KNN) in Supervised Learning
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
              k-Nearest Neighbors (KNN) is a simple yet powerful algorithm used
              for both classification and regression tasks in supervised learning.
              It predicts the output for a new data point based on the majority
              class or average value of its <InlineMath math="k" /> nearest neighbors in the training
              dataset.
            </p>
            <p>
              Whether you&apos;re predicting house prices or classifying handwritten
              digits, KNN provides an intuitive way to make predictions without
              requiring complex model training.
            </p>
          </motion.section>

          {/* What is KNN? */}
          <motion.section
            className="mb-8"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionVariants}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              What is KNN?
            </h2>
            <p className="mb-4">
              KNN is a non-parametric algorithm that makes predictions based on
              similarity. For a given input <InlineMath math="X" />, the algorithm identifies the <InlineMath math="k" />
              closest data points in the training set and uses their labels or
              values to predict the output:
              </p>
              <BlockMath math="\hat{y} = \text{majority\_vote}(\text{neighbors}(X))" />
              where <InlineMath math="\text{neighbors}(X)" /> are the <InlineMath math="k" /> nearest points to <InlineMath math="X" />.
            
            <ul className="list-disc list-inside mb-4">
              <li>
                <strong>Classification:</strong> Predicts the most frequent class
                among the <InlineMath math="k" /> neighbors.
              </li>
              <li>
                <strong>Regression:</strong> Predicts the average value of the <InlineMath math="k" />
                neighbors.
              </li>
            </ul>
            <p>
              The distance metric (e.g., Euclidean, Manhattan) determines how
              &quot;closeness&quot; is measured between points.
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
              Key Concepts in KNN
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Box 1: Distance Metric */}
              <div className="bg-[#1E1E1E] p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Distance Metric</h3>
                <p>
                  The distance metric measures the similarity between data points.
                  Common metrics include:
                  <ul className="list-disc list-inside mt-2">
                    <li>
                      <strong>Euclidean Distance:</strong>{" "}
                      <InlineMath math="d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}" />
                    </li>
                    <li>
                      <strong>Manhattan Distance:</strong>{" "}
                      <InlineMath math="d = |x_2 - x_1| + |y_2 - y_1|" />
                    </li>
                  </ul>
                </p>
              </div>
              {/* Box 2: Choosing k */}
              <div className="bg-[#1E1E1E] p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Choosing <InlineMath math="k" /></h3>
                <p>
                  The choice of <InlineMath math="(k)" /> affects the model&apos;s performance:
                  <ul className="list-disc list-inside mt-2">
                    <li>
                      <strong>Small <InlineMath math="(k)" />:</strong> More sensitive to noise and
                      outliers.
                    </li>
                    <li>
                      <strong>Large <InlineMath math="(k)" />:</strong> Smoother decision boundaries but
                      may underfit.
                    </li>
                  </ul>
                </p>
              </div>
              {/* Box 3: Lazy Learning */}
              <div className="bg-[#1E1E1E] p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Lazy Learning</h3>
                <p>
                  KNN is a lazy learner because it does not explicitly build a model
                  during training. Instead, it stores the entire dataset and performs
                  computations only during prediction.
                </p>
              </div>
              {/* Box 4: Pros and Cons */}
              <div className="bg-[#1E1E1E] p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Pros and Cons</h3>
                <p>
                  <strong>Pros:</strong>
                  <ul className="list-disc list-inside mt-2">
                    <li>Simple and easy to implement.</li>
                    <li>No assumptions about data distribution.</li>
                  </ul>
                  <strong>Cons:</strong>
                  <ul className="list-disc list-inside mt-2">
                    <li>Computationally expensive for large datasets.</li>
                    <li>Sensitive to irrelevant features and scaling.</li>
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
              Interactive Visualization of KNN
            </h2>
            <KNNVisualization />
          </motion.section>

          {/* Applications of KNN */}
          <motion.section
            className="mb-8"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionVariants}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Applications of KNN
            </h2>
            <p className="mb-4">
              KNN is widely used in various fields due to its simplicity and
              effectiveness:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>
                <strong>Healthcare:</strong> Disease diagnosis based on patient
                symptoms.
              </li>
              <li>
                <strong>Finance:</strong> Credit scoring and fraud detection.
              </li>
              <li>
                <strong>Image Recognition:</strong> Handwritten digit recognition.
              </li>
              <li>
                <strong>Recommendation Systems:</strong> Suggesting similar products
                or movies.
              </li>
            </ul>
            <p>
              Its ability to handle both classification and regression tasks makes
              it versatile for real-world applications.
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
              k-Nearest Neighbors (KNN) is a simple yet effective algorithm for
              supervised learning tasks. While it is easy to implement, careful
              consideration of the distance metric, \(k\)-value, and feature scaling
              is essential for optimal performance.
            </p>
            <p>
              As you explore machine learning further, experiment with KNN on
              different datasets and evaluate its strengths and limitations. Mastery
              of these tools requires both theoretical understanding and practical
              experience.
            </p>
          </motion.section>
        </article>
      </div>
    </div>
  );
}
