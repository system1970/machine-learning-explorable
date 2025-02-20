import React, { JSX, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";

interface Topic {
  id: string;
  title: string;
  content: JSX.Element;
}

const topics: Topic[] = [
  {
    id: "arthur-samuel",
    title: "Arthur Samuel (1959)",
    content: (
      <div>
        <p className="text-gray-300 text-lg leading-relaxed font-sans p-4 bg-[#1E1E1E] rounded-lg shadow-md mb-2">
          One of the earliest definitions of machine learning came from Arthur Samuel, who worked on early AI systems like a program that played checkers. He described machine learning as giving computers the ability to learn without being explicitly programmed.
        </p>
        <p className="text-gray-300 text-lg leading-relaxed font-sans p-4 bg-[#1E1E1E] rounded-lg shadow-md mb-2">
          <strong>Why It Matters:</strong> This definition emphasized automation—letting machines figure things out on their own rather than relying on humans to define every rule. For example, instead of programming every possible move in a game of checkers, the computer could learn by playing many games and adjusting its strategy based on wins and losses.
        </p>
      </div>
    )
  },
  {
    id: "tom-mitchell",
    title: "Tom M. Mitchell (1997)",
    content: (
      <div>
        <p className="text-gray-300 text-lg leading-relaxed font-sans p-4 bg-[#1E1E1E] rounded-lg shadow-md mb-2">
          Tom M. Mitchell formalized a more precise definition of machine learning. He said: &quot;A computer program is said to learn from experience <strong>E</strong> with respect to some class of tasks <strong>T</strong> and performance measure <strong>P</strong>, if its performance at tasks in <strong>T</strong>, as measured by <strong>P</strong>, improves with experience <strong>E</strong>.&quot;
        </p>
        <p className="text-gray-300 text-lg leading-relaxed font-sans p-4 bg-[#1E1E1E] rounded-lg shadow-md mb-2">
          <strong>Breaking It Down:</strong>
          <ul className="list-disc list-inside mt-2 text-gray-300">
            <li><strong>T (Task):</strong> What the machine is trying to do, like classifying images or predicting stock prices.</li>
            <li><strong>E (Experience):</strong> The data or feedback the machine uses to learn, like labeled images or historical stock data.</li>
            <li><strong>P (Performance):</strong> How well the machine is doing, like accuracy or error rate.</li>
          </ul>
        </p>
        <p className="text-gray-300 text-lg leading-relaxed font-sans p-4 bg-[#1E1E1E] rounded-lg shadow-md mb-2">
          <strong>Why It Matters:</strong> This definition provides a structured framework for thinking about machine learning problems. It helps researchers design experiments and evaluate models systematically.
        </p>
      </div>
    )
  },
  {
    id: "modern-view",
    title: "Modern Interpretation",
    content: (
      <div>
        <p className="text-gray-300 text-lg leading-relaxed font-sans p-4 bg-[#1E1E1E] rounded-lg shadow-md mb-2">
          In today’s world, machine learning is often seen as a tool for making decisions based on large amounts of data. Instead of relying solely on human intuition or predefined rules, machine learning leverages statistical techniques to uncover patterns and insights from data.
        </p>
        <p className="text-gray-300 text-lg leading-relaxed font-sans p-4 bg-[#1E1E1E] rounded-lg shadow-md mb-2">
          <strong>Examples:</strong>
          <ul className="list-disc list-inside mt-2 text-gray-300">
            <li><strong>Netflix:</strong> Recommends movies by analyzing millions of user interactions.</li>
            <li><strong>Healthcare:</strong> Predicts patient outcomes by analyzing medical records.</li>
            <li><strong>Retail:</strong> Optimizes inventory by forecasting demand based on sales trends.</li>
          </ul>
        </p>
        <p className="text-gray-300 text-lg leading-relaxed font-sans p-4 bg-[#1E1E1E] rounded-lg shadow-md mb-2">
          <strong>Why It Matters:</strong> This modern view highlights the role of data as the foundation of machine learning and emphasizes its practical applications in decision-making.
        </p>
      </div>
    )
  },
  {
    id: "philosophical",
    title: "Philosophical Perspective",
    content: (
      <div>
        <p className="text-gray-300 text-lg leading-relaxed font-sans p-4 bg-[#1E1E1E] rounded-lg shadow-md mb-2">
          Some researchers see machine learning as an attempt to replicate aspects of human learning in machines. Machines can simulate certain aspects of human learning, such as reinforcement learning (trial and error) or neural networks (pattern recognition inspired by the brain).
        </p>
        <p className="text-gray-300 text-lg leading-relaxed font-sans p-4 bg-[#1E1E1E] rounded-lg shadow-md mb-2">
          <strong>Limitations:</strong> While machines can simulate certain aspects of human learning, they lack consciousness, creativity, and true understanding.
        </p>
        <p className="text-gray-300 text-lg leading-relaxed font-sans p-4 bg-[#1E1E1E] rounded-lg shadow-md mb-2">
          <strong>Why It Matters:</strong> This perspective ties machine learning to cognitive science and neuroscience, exploring how machines can emulate human intelligence.
        </p>
      </div>
    )
  },
  {
    id: "conclusion",
    title: "Conclusion",
    content: (
      <div>
        <p className="text-gray-300 text-lg leading-relaxed font-sans p-4 bg-[#1E1E1E] rounded-lg shadow-md mb-2">
          The evolution of machine learning definitions reflects the field&apos;s growth and shifting priorities:
          <ul className="list-disc list-inside mt-2 text-gray-300">
            <li><strong>Early Days:</strong> Researchers focused on building systems that could &quot;learn&quot; simple tasks.</li>
            <li><strong>Formalization:</strong> As the field matured, researchers sought precise definitions to guide the development of algorithms and evaluate performance.</li>
            <li><strong>Big Data Era:</strong> With the explosion of data and computational power, machine learning has become synonymous with data-driven decision-making and automation.</li>
          </ul>
        </p>
        <p className="text-gray-300 text-lg leading-relaxed font-sans p-4 bg-[#1E1E1E] rounded-lg shadow-md mb-2">
          Each definition captures a different aspect of machine learning, depending on the context and goals of the time. But the essence remains the same: <strong>machines learn from experience to improve performance.</strong>
        </p>
      </div>
    )
  }
];

const contentVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
};

const Page3 = () => {
  const [selectedTopic, setSelectedTopic] = useState<Topic>(topics[0]);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-black text-white p-4 space-y-8">
      {/* Title */}
      <h1 className="text-4xl mb-8">The Evolution of Definitions of Machine Learning</h1>

      {/* Interactive Grid Pattern */}
      <InteractiveGridPattern
        className={cn("[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]")}
        width={20}
        height={20}
        squares={[80, 80]}
        squaresClassName="hover:fill-purple-500"
      />

      {/* Content Layout */}
      <div className="flex w-full max-w-6xl space-x-4">
        {/* Left Box - Clickable Topics */}
        <div className="w-1/3 p-4 bg-[#0B0B0B] rounded-md h-[70vh] overflow-y-scroll relative shadow-md scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-gray-900">
          <h2 className="text-xl font-bold mb-4">Topics</h2>
          <ul className="space-y-3">
            {topics.map(topic => (
              <li
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className={`cursor-pointer p-2 border border-white rounded hover:bg-gray-800 transition ${
                  selectedTopic.id === topic.id ? "bg-purple-600" : ""
                }`}
              >
                {topic.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Box - Topic Details with Animation */}
        <div className="w-2/3 p-4 bg-[#0B0B0B] rounded-md h-[70vh] overflow-y-scroll relative shadow-md scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-gray-900">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTopic.id}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={contentVariants}
              transition={{ duration: 0.5 }}
              className="space-y-6 text-base"
            >
              <h2 className="text-xl font-bold mb-4">{selectedTopic.title}</h2>
              {selectedTopic.content}
            </motion.div>
          </AnimatePresence>
          {/* Summarize Button */}
          <button className="absolute bottom-4 right-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded">
            Summarize
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page3;