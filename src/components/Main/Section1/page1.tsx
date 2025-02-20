import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import Image from "next/image";

interface Page1Props {
  stage: number;
}

// Animation variants for fade in/out
const variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const Page1: React.FC<Page1Props> = ({ stage }) => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-black text-white overflow-hidden">
      <InteractiveGridPattern
        className={cn("[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]")}
        width={20}
        height={20}
        squares={[80, 80]}
        squaresClassName="hover:fill-purple-500"
      />

      <AnimatePresence mode="wait">
        {stage === 0 && (
          <motion.div
            key="stage0"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-4">Let&apos;s begin shall we.</h1>
            <p className="text-xl">
                Let&apos;s start off with the bare basics.
            </p>
          </motion.div>
        )}

        {stage === 1 && (
          <motion.div
            key="stage1"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
            className="max-w-2xl text-center mt-6 p-6 border border-gray rounded-lg"
          >
            <p className="text-3xl font-bold mb-4 text-white">
            What&apos;s Learning?
            Learning is the process of gaining knowledge, skills, or understanding through experience, practice, or study.
            </p>
          </motion.div>
        )}

        {stage === 2 && (
          <motion.div
            key="stage2"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
            className="max-w-xl text-center mt-6 p-6 border border-gray rounded-lg"
          >
            <p className="text-2xl text-white">
              When you repeatedly perform a task and improve over time, you are said to be engaging in the process of <span className="font-bold underline">learning</span>.
            </p>
            <p className="text-2xl text-white mt-4">
              This involves <span className="font-bold underline">experience</span>, <span className="font-bold underline">task</span>, and <span className="font-bold underline">performance</span>.
            </p>
          </motion.div>
        )}

        {stage === 3 && (
          <motion.div
            key="stage3"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
            className="max-w-2xl text-center mt-8 p-8 border border-gray-300 shadow-lg rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white"
          >
            <p className="mb-6 text-3xl font-extrabold">
              The <span className="underline decoration-wavy decoration-white">P, T, E</span> Framework
            </p>
            <ul className="list-disc text-xl space-y-5 text-left px-8">
              <li>
                <strong>Performance (P):</strong> Your ultimate goal—what you&apos;re striving to excel at.
              </li>
              <li>
                <strong>Task (T):</strong> The engaging challenge you dive into.
              </li>
              <li>
                <strong>Experience (E):</strong> The hands-on practice that turns effort into mastery.
              </li>
            </ul>
          </motion.div>
        )}

        {stage >= 4 && (
          <motion.div
            key="stage4"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
            className="max-w-xl text-center mt-6"
          >
            <p className="mt-4  text-3xl font-normal">Here&apos;s a Little Diagram, to Find our Place in The</p>
            <Image
              src="/World of AI.svg"
              alt="AI Map"
              width={800}
              height={800}
              layout="intrinsic"
              objectFit="contain"
              className="opacity-80"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page1;