"use client";
import React from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
import { motion } from 'framer-motion';
import { Header } from "../components/Header";
import { Section1 } from "../components/Main/Section1/Section1";
import { Section2 } from "@/components/Main/Section2";
import { Section3 } from '@/components/Main/Section3';
import { Section4 } from '@/components/Main/Section4';
import { Section5 } from '@/components/Main/Section5';
import { Section6 } from '@/components/Main/Section6';
import { Section7 } from '@/components/Main/Section7';

export default function Home() {
  // const { scrollYProgress } = useScroll(); // Tracks scroll progress (0 to 1)

  // Define visibility ranges for each section
  // const headerOpacity = useTransform(scrollYProgress, [0, 0.33], [0, 1]);
  // const section1Opacity = useTransform(scrollYProgress, [0.33, 0.66], [0, 1]);
  // const section2Opacity = useTransform(scrollYProgress, [0.66, 1], [0, 1]);

  return (
    <div
      className="min-h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {/* Header */}
      <motion.div style={{ opacity: 1 }} className="snap-start h-screen">
        <Header />
      </motion.div>

      {/* Section1 */}
      <motion.div style={{ opacity: 1 }} className="snap-start h-screen">
        <Section1 />
      </motion.div>

      {/* Section2 */}
      <motion.div style={{ opacity: 1 }} className="snap-start h-screen">
        <Section2 />
      </motion.div>

      {/* Section3 */}
      <motion.div style={{ opacity: 1 }} className="snap-start h-screen">
        <Section3 />
      </motion.div>

      {/* Section4 */}
      <motion.div style={{ opacity: 1 }} className="snap-start h-screen">
        <Section4 />
      </motion.div>

      {/* Section5 */}
      <motion.div style={{ opacity: 1 }} className="snap-start h-screen">
        <Section5 />
      </motion.div>

      {/* Section6 */}
      <motion.div style={{ opacity: 1 }} className="snap-start h-[90vh]">
        <Section6 />
      </motion.div>

      {/* Section7 */}
      <motion.div style={{ opacity: 1 }} className="snap-start h-screen">
        <Section7 />
      </motion.div>
    </div>
  );
}