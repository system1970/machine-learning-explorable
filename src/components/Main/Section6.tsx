"use client";

import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { motion } from "framer-motion";

const sectionVariants = {
  offscreen: { opacity: 0, x: 50 },
  onscreen: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export function Section6() {
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
            Naive Bayes in Supervised Learning
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
              Naive Bayes is a probabilistic classification algorithm based on
              Bayes&apos; Theorem. It is widely used in supervised learning for tasks
              like spam detection, sentiment analysis, and medical diagnosis.
              Despite its simplicity, Naive Bayes performs surprisingly well in many
              real-world applications.
            </p>
            <p>
              The &quot;naive&quot; assumption in Naive Bayes is that all features are
              conditionally independent given the class label, which simplifies the
              computation of probabilities.
            </p>
          </motion.section>

          {/* What is Naive Bayes? */}
          <motion.section
            className="mb-8"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionVariants}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              What is Naive Bayes?
            </h2>
            <p className="mb-4">
              Naive Bayes is based on Bayes&apos; Theorem, which calculates the
              probability of a class <InlineMath math="C" /> given input features{" "}
              <InlineMath math="X" />:
              <BlockMath math="P(C|X) = \frac{P(X|C) \cdot P(C)}{P(X)}" />
              where:
              <ul className="list-disc list-inside mt-2">
                <li>
                  <InlineMath math="P(C|X)" />: Posterior probability of class{" "}
                  <InlineMath math="C" /> given <InlineMath math="X" />.
                </li>
                <li>
                  <InlineMath math="P(X|C)" />: Likelihood of <InlineMath math="X" />{" "}
                  given <InlineMath math="C" />.
                </li>
                <li>
                  <InlineMath math="P(C)" />: Prior probability of class{" "}
                  <InlineMath math="C" />.
                </li>
                <li>
                  <InlineMath math="P(X)" />: Marginal probability of{" "}
                  <InlineMath math="X" />.
                </li>
              </ul>
            </p>
            <p>
              The &quot;naive&quot; assumption simplifies the likelihood{" "}
              <InlineMath math="P(X|C)" /> by assuming that features are
              conditionally independent:
              <BlockMath math="P(X|C) = P(x_1|C) \cdot P(x_2|C) \cdot ... \cdot P(x_n|C)" />
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
              Key Concepts in Naive Bayes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Box 1: Bayes' Theorem */}
              <div className="bg-[#1E1E1E] p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Bayes&apos; Theorem</h3>
                <p>
                  Bayes&apos; Theorem provides a way to calculate the posterior
                  probability of a class <InlineMath math="C" /> given the data:
                  <BlockMath math="P(C|X) \propto P(X|C) \cdot P(C)" />
                  The denominator <InlineMath math="P(X)" /> is constant and can be
                  ignored during classification.
                </p>
              </div>
              {/* Box 2: Conditional Independence */}
              <div className="bg-[#1E1E1E] p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Conditional Independence</h3>
                <p>
                  The naive assumption assumes that features are conditionally
                  independent given the class:
                  <BlockMath math="P(X|C) = \prod_{i=1}^n P(x_i|C)" />
                  This simplifies the computation but may not hold true in all cases.
                </p>
              </div>
              {/* Box 3: Types of Naive Bayes */}
              <div className="bg-[#1E1E1E] p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Types of Naive Bayes</h3>
                <p>
                  Different variants of Naive Bayes are used depending on the data:
                  <ul className="list-disc list-inside mt-2">
                    <li>
                      <strong>Gaussian Naive Bayes:</strong> Assumes features follow
                      a normal distribution.
                    </li>
                    <li>
                      <strong>Multinomial Naive Bayes:</strong> Used for discrete
                      count data (e.g., text classification).
                    </li>
                    <li>
                      <strong>Bernoulli Naive Bayes:</strong> Used for binary
                      feature data.
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
                    <li>Simple and fast to train.</li>
                    <li>Effective for high-dimensional data.</li>
                    <li>Performs well with small datasets.</li>
                  </ul>
                  <strong>Cons:</strong>
                  <ul className="list-disc list-inside mt-2">
                    <li>
                      Assumption of independence may not hold in real-world data.
                    </li>
                    <li>May struggle with irrelevant features.</li>
                  </ul>
                </p>
              </div>
            </div>
          </motion.section>

          {/* Applications of Naive Bayes */}
          <motion.section
            className="mb-8"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionVariants}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Applications of Naive Bayes
            </h2>
            <p className="mb-4">
              Naive Bayes is widely used in various fields due to its simplicity
              and effectiveness:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>
                <strong>Spam Detection:</strong> Classifying emails as spam or not.
              </li>
              <li>
                <strong>Sentiment Analysis:</strong> Determining the sentiment of
                text (positive/negative).
              </li>
              <li>
                <strong>Medical Diagnosis:</strong> Predicting diseases based on
                symptoms.
              </li>
              <li>
                <strong>Document Classification:</strong> Categorizing documents
                into topics.
              </li>
            </ul>
            <p>
              Its ability to handle high-dimensional data makes it particularly
              useful in text-based applications.
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
              Naive Bayes is a powerful and efficient algorithm for classification
              tasks, especially in scenarios involving high-dimensional data. While
              its assumption of conditional independence may not always hold, it
              often performs surprisingly well in practice.
            </p>
            <p>
              As you explore machine learning further, experiment with Naive Bayes
              on different datasets and evaluate its strengths and limitations.
              Mastery of these tools requires both theoretical understanding and
              practical experience.
            </p>
          </motion.section>
        </article>
      </div>
    </div>
  );
}