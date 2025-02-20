"use client";

import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { motion } from "framer-motion";
import LinearRegressionVisualization from "../LinearRegressionVisual";

const sectionVariants = {
  offscreen: { opacity: 0, x: 50 },
  onscreen: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export function Section2() {
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
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionVariants}
          >
            Regression in Supervised Learning
          </motion.h1>

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
              Supervised learning involves training a model on a dataset that
              contains both input features (<InlineMath math="X" />) and
              corresponding target outputs (<InlineMath math="y" />). The goal is
              to learn a mapping (<InlineMath math="f" />) such that:
            </p>
            <BlockMath math="y = f(X)" />
            <p className="mt-4">
              Once trained, the model can predict outputs for new, unseen inputs.
            </p>
          </motion.section>

          {/* What is Supervised Learning? */}
          <motion.section
            className="mb-8"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionVariants}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              What is Supervised Learning?
            </h2>
            <p className="mb-4">
              Supervised learning involves training a model on a dataset that
              contains both input features (<InlineMath math="X" />) and
              corresponding target outputs (<InlineMath math="y" />). The goal is
              to learn a mapping (<InlineMath math="f" />) such that:
            </p>
            <BlockMath math="y = f(X)" />
            <p className="mt-4">
              Once trained, the model can predict outputs for new, unseen inputs.
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>
                <strong>Labeled Data:</strong> Each input (<InlineMath math="X" />)
                is paired with a known output (<InlineMath math="y" />). For
                example, predicting house prices requires data like size, location,
                and number of bedrooms (<InlineMath math="X" />) paired with actual
                prices (<InlineMath math="y" />).
              </li>
              <li>
                <strong>Prediction:</strong> The model predicts (<InlineMath math="y" />)
                for new (<InlineMath math="X" />), such as estimating the price of a
                house not in the training set.
              </li>
              <li>
                <strong>Evaluation:</strong> Performance is measured by comparing
                predicted outputs (<InlineMath math="\hat{y}" />) to true outputs (
                <InlineMath math="y" />), often using metrics like Mean Squared Error
                (MSE):
                <BlockMath
                  math="\text{MSE} = \frac{1}{n} \sum_{i=1}^n (y_i - \hat{y}_i)^2"
                />
              </li>
            </ul>
            <p>
              Supervised learning is widely used in classification (predicting
              categories) and regression (predicting continuous values). Here, we
              focus on regression.
            </p>
          </motion.section>

          {/* Understanding Regression */}
          <motion.section
            className="mb-8"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionVariants}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Understanding Regression
            </h2>
            <p className="mb-4">
              Regression is a type of supervised learning that predicts
              continuous numerical values. It models the relationship between a
              dependent variable (<InlineMath math="y" />) and one or more
              independent variables (<InlineMath math="X" />). Mathematically,
              regression seeks to find a function (<InlineMath math="f" />) such
              that:
            </p>
            <BlockMath math="y = f(X) + \epsilon" />
            <p className="mt-4">
              where (<InlineMath math="\epsilon" />) represents noise or error in
              the data.
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>
                <strong>Purpose:</strong> Estimate and predict numerical outcomes,
                such as sales forecasts or temperature predictions.
              </li>
              <li>
                <strong>Techniques:</strong> Common methods include linear
                regression, polynomial regression, and support vector regression.
              </li>
              <li>
                <strong>Applications:</strong> Used in finance (stock price
                prediction), healthcare (disease progression modeling), and economics
                (demand forecasting).
              </li>
            </ul>
            <p>
              Regression helps us understand how changes in input variables affect
              the output. For instance, how does increasing the size of a house
              impact its price?
            </p>
          </motion.section>

          {/* Linear Regression */}
          <motion.section
            className="mb-8"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionVariants}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Linear Regression
            </h2>
            <p className="mb-4">
              Linear regression is one of the simplest and most interpretable
              regression techniques. It assumes a linear relationship between the
              input variables (<InlineMath math="X" />) and the output (
              <InlineMath math="y" />):
            </p>
            <BlockMath math="y = w_1x_1 + w_2x_2 + \dots + w_nx_n + b" />
            <p className="mb-4">where:</p>
            <ul className="list-disc list-inside mt-2">
              <li>
                <InlineMath math="w_1, w_2, \ldots, w_n" />: Weights (coefficients)
                that determine the influence of each feature.
              </li>
              <li>
                <InlineMath math="b" />: Bias term (intercept).
              </li>
              <li>
                <InlineMath math="x_1, x_2, \ldots, x_n" />: Input features.
              </li>
            </ul>
            <h3 className="text-xl md:text-2xl font-semibold mb-3">
              Key Concepts
            </h3>
            <ul className="list-disc list-inside mb-4">
              <li>
                <strong>Linearity:</strong> Assumes the relationship between{" "}
                <InlineMath math="X" /> and <InlineMath math="y" /> is linear. For
                example, house price increases proportionally with size.
              </li>
              <li>
                <strong>Equation of a Line:</strong> In simple linear regression
                (one feature), the equation is:
                <BlockMath math="y = mx + b" />
                where <InlineMath math="m" /> is the slope and{" "}
                <InlineMath math="b" /> is the intercept.
              </li>
              <li>
                <strong>Loss Function:</strong> Measures the difference between
                predicted (<InlineMath math="\hat{y}" />) and actual (
                <InlineMath math="y" />) values. Commonly used is the Mean Squared
                Error (MSE):
                <BlockMath math="\text{MSE} = \frac{1}{n} \sum_{i=1}^n (y_i - \hat{y}_i)^2" />
              </li>
            </ul>
            <h3 className="text-xl md:text-2xl font-semibold mb-3">
              How Linear Regression Works
            </h3>
            <ol className="list-decimal list-inside mb-4">
              <li>
                <strong>Data Collection:</strong> Gather input-output pairs.
                For example, collect house sizes (<InlineMath math="X" />) and
                prices (<InlineMath math="y" />).
              </li>
              <li>
                <strong>Model Fitting:</strong> Use an optimization algorithm
                (e.g., gradient descent) to minimize the loss function and find the
                best parameters (<InlineMath math="w" /> and{" "}
                <InlineMath math="b" />).
              </li>
              <li>
                <strong>Prediction:</strong> Once trained, the model predicts (
                <InlineMath math="\hat{y}" />) for new (
                <InlineMath math="X" />) using:
                <BlockMath math="\hat{y} = w_1x_1 + w_2x_2 + \dots + w_nx_n + b" />
              </li>
              <li>
                <strong>Evaluation:</strong> Measure performance using metrics
                like MSE or R-squared (<InlineMath math="R^2" />):
                <BlockMath math="R^2 = 1 - \frac{\sum (y_i - \hat{y}_i)^2}{\sum (y_i - \bar{y})^2}" />
                where (<InlineMath math="\bar{y}" />) is the mean of (
                <InlineMath math="y" />).
              </li>
            </ol>
            <p>
              Linear regression is intuitive and interpretable, making it ideal
              for beginners and scenarios where simplicity is key.
            </p>
          </motion.section>

          {/* Conclusion */}
          <motion.section
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionVariants}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Conclusion
            </h2>
            <p className="mb-4">
              Regression—and particularly linear regression—is a fundamental tool
              in supervised learning. It enables us to model relationships between
              variables and make predictions about continuous outcomes. While linear
              regression is simple, it lays the groundwork for more complex models
              like neural networks and decision trees.
            </p>
            <p>
              As you dive deeper into machine learning, consider exploring advanced
              regression techniques and their applications. Remember, the key to
              mastering these tools lies in understanding their mathematical
              foundations and applying them to real-world problems.
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
              Interactive Visualization of Linear Regression
            </h2>
            <LinearRegressionVisualization />
          </motion.section>
        </article>
      </div>
    </div>
  );
}
