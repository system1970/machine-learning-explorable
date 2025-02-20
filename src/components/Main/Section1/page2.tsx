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
        id: "learning",
        title: "What is Learning?",
        content: (
            <div>
                <p className="mb-2">
                    At its core, learning is the process of acquiring knowledge or skills through experience, study, or observation.
                    For humans, learning happens when we recognize patterns, make connections between ideas, and improve our ability to perform tasks over time.
                    For machines, learning means improving performance on a task by analyzing data and adjusting internal parameters.
                </p>
            </div>
        )
    },
    {
        id: "patterns",
        title: "Recognizing Patterns",
        content: (
            <div>
                <h3 className="font-semibold mb-1">Recognizing Patterns</h3>
                <p className="mb-1">
                    <strong>Definition:</strong> The ability to identify regularities, similarities, or trends in the world around us.
                </p>
                <p className="mb-1"><strong>Examples:</strong></p>
                <ul className="list-disc list-inside mb-1">
                    <li>
                        <strong>Shapes in Clouds:</strong> Recognizing familiar shapes from prior experience.
                    </li>
                    <li>
                        <strong>Language:</strong> Babies pick up language by recognizing sound patterns.
                    </li>
                    <li>
                        <strong>Music:</strong> Musicians identify melodies, rhythms, and harmonies.
                    </li>
                </ul>
                <p>
                    <strong>Why It Matters:</strong> Pattern recognition simplifies decision-making and helps us predict outcomes.
                </p>
            </div>
        )
    },
    {
        id: "connections",
        title: "Making Connections",
        content: (
            <div>
                <h3 className="font-semibold mb-1">Making Connections Between Ideas</h3>
                <p className="mb-1">
                    <strong>Definition:</strong> Learning involves connecting new information to existing knowledge, allowing for better understanding and application.
                </p>
                <p className="mb-1"><strong>Examples:</strong></p>
                <ul className="list-disc list-inside mb-1">
                    <li>
                        <strong>Cause and Effect:</strong> Understanding that touching a hot stove results in pain.
                    </li>
                    <li>
                        <strong>Science and Math:</strong> Connecting abstract concepts with real-world phenomena.
                    </li>
                    <li>
                        <strong>Storytelling:</strong> Creating narratives by linking characters, events, and themes.
                    </li>
                </ul>
                <p>
                    <strong>Why It Matters:</strong> Connections foster critical thinking, creativity, and problem-solving.
                </p>
            </div>
        )
    },
    {
        id: "improving",
        title: "Improving Over Time",
        content: (
            <div>
                <h3 className="font-semibold mb-1">Improving Our Ability to Perform Tasks Over Time</h3>
                <p className="mb-1">
                    <strong>Definition:</strong> Learning isn’t just theoretical – consistent practice turns complex tasks into automatic actions.
                </p>
                <p className="mb-1"><strong>Examples:</strong></p>
                <ul className="list-disc list-inside mb-1">
                    <li>
                        <strong>Riding a Bike:</strong> Practice enables balance, coordination, and confidence.
                    </li>
                    <li>
                        <strong>Playing an Instrument:</strong> Repetition builds muscle memory for fluency.
                    </li>
                    <li>
                        <strong>Sports:</strong> Athletes refine their techniques through ongoing practice.
                    </li>
                </ul>
                <p>
                    <strong>Why It Matters:</strong> Practice strengthens neural pathways, making tasks easier and faster.
                </p>
            </div>
        )
    },
    {
        id: "adapting",
        title: "Adapting to New Situations",
        content: (
            <div>
                <h3 className="font-semibold mb-1">Adapting to New Situations</h3>
                <p className="mb-1">
                    <strong>Definition:</strong> Learning equips us with the flexibility to adjust to changing circumstances.
                </p>
                <p className="mb-1"><strong>Examples:</strong></p>
                <ul className="list-disc list-inside mb-1">
                    <li>
                        <strong>Traveling Abroad:</strong> Adapting to new customs and languages for a smoother experience.
                    </li>
                    <li>
                        <strong>Problem-Solving:</strong> Overcoming unexpected challenges, such as fixing a flat tire.
                    </li>
                </ul>
                <p>
                    <strong>Why It Matters:</strong> Being adaptable is vital for thriving in a rapidly changing world.
                </p>
            </div>
        )
    },
    {
        id: "machine-learning-intro",
        title: "What is Machine Learning?",
        content: (
            <div>
                <p className="mb-2">
                    Alright, let’s dive into what machine learning really is. We’ve already talked about how humans learn—by recognizing patterns, making connections, and improving over time. Now, let’s apply that same idea to machines.
                </p>
                <p className="mb-2">
                    Machines learn through data. Just like humans learn from experience, machines analyze examples (data) to find patterns and make decisions. For instance, if you want a computer to recognize cats in images, you’d give it thousands of labeled pictures of cats and dogs. The machine looks at these examples and tries to figure out what makes a cat different from a dog.
                </p>
                <p className="mb-2">
                    Let’s break this down using the P, T, E framework:
                </p>
                <ul className="list-disc list-inside mb-2">
                    <li><strong>P (Performance):</strong> The machine gets better at identifying cats.</li>
                    <li><strong>T (Task):</strong> The task is recognizing cats in images.</li>
                    <li><strong>E (Experience):</strong> The experience comes from analyzing thousands of labeled images.</li>
                </ul>
            </div>
        )
    },
    {
        id: "machine-learning-types",
        title: "Types of Machine Learning",
        content: (
            <div>
                <p className="mb-2">
                    There are three main types of machine learning:
                </p>
                <ul className="list-disc list-inside mb-2">
                    <li>
                        <strong>Supervised Learning:</strong> The machine learns from labeled data, like predicting house prices based on features like size and location.
                    </li>
                    <li>
                        <strong>Unsupervised Learning:</strong> The machine finds hidden patterns in unlabeled data, like grouping customers into segments based on purchasing behavior.
                    </li>
                    <li>
                        <strong>Reinforcement Learning:</strong> The machine learns by trial and error, earning rewards for good actions, like training a robot to walk.
                    </li>
                </ul>
            </div>
        )
    },
    {
        id: "machine-learning-applications",
        title: "Applications & Challenges in Machine Learning",
        content: (
            <div>
                <p className="mb-2">
                    Machine learning is being used in amazing ways today:
                </p>
                <ul className="list-disc list-inside mb-2">
                    <li><strong>Healthcare:</strong> Diagnosing diseases from medical images.</li>
                    <li><strong>Finance:</strong> Detecting fraudulent transactions.</li>
                    <li><strong>Retail:</strong> Personalizing product recommendations.</li>
                    <li><strong>Transportation:</strong> Enabling self-driving cars to navigate roads safely.</li>
                </ul>
                <p className="mb-2">
                    Of course, there are challenges, like ensuring data quality, avoiding overfitting, and making models interpretable. But when done right, machine learning can solve problems that were once thought impossible.
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

const Page2 = () => {
  const [selectedTopic, setSelectedTopic] = useState<Topic>(topics[0]);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-black text-white p-4 space-y-8">
      <h1 className="text-4xl mb-8">What is &quot;Machine Learning&quot;</h1>
      <InteractiveGridPattern
        className={cn("[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]")}
        width={20}
        height={20}
        squares={[80, 80]}
        squaresClassName="hover:fill-purple-500"
      />
      <div className="flex w-full max-w-6xl space-x-4">
        {/* Left Box - Clickable Topics, with Custom Scrollbar */}
        <div className="w-1/3 p-4 bg-[#0B0B0B] rounded-md h-[70vh] overflow-y-scroll relative shadow-md 
                        scrollbar-thin  scrollbar-thumb-purple-600 scrollbar-track-gray-700">
          <h2 className="text-xl font-bold mb-4">Topics</h2>
          <ul className="space-y-3">
            {topics.map(topic => (
              <li
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className={`cursor-pointer p-2 rounded border border-white hover:bg-gray-800 transition ${
                  selectedTopic.id === topic.id ? "bg-purple-600" : ""
                }`}
              >
                {topic.title}
              </li>
            ))}
          </ul>
        </div>
        {/* Right Box - Topic Details with Animation and Custom Scrollbar */}
        <div className="w-2/3 p-4 bg-[#0B0B0B] rounded-md h-[70vh] overflow-y-scroll relative shadow-md 
                        scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-gray-700">
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
          {/* <button className="absolute bottom-4 right-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded">
            Summarize
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Page2;