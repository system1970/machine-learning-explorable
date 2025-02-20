"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Page1 from "./page1";
import Page2 from "./page2";
import Page3 from "./page3";

export function Section1() {
  const [currentPage, setCurrentPage] = useState(1);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Accumulator for wheel and touch delta values
  const wheelAccumulated = useRef<number>(0);
  const touchStartRef = useRef<number | null>(null);
  const accumulatedTouchDelta = useRef<number>(0);
  const wheelThreshold = 500; // Adjust threshold value as needed

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const handleNextPage = () => {
    if (currentPage < 3) {
      setCurrentPage((prev) => prev + 1);
      wheelAccumulated.current = 0;
      accumulatedTouchDelta.current = 0;
      setProgress(0);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      wheelAccumulated.current = 0;
      accumulatedTouchDelta.current = 0;
      setProgress(0);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Wheel event handler (for desktop)
    const handleWheel = (e: WheelEvent) => {
      console.log("Wheel event deltaY:", e.deltaY);
      
      // Allow natural scrolling to Header when on page1 and scrolling upward
      if (currentPage === 1 && e.deltaY < 0) {
        // wheelAccumulated.current += e.deltaY;
        if (wheelAccumulated.current + e.deltaY<=0) {
            setProgress(0);
            return;
        }
        
      }
      // Allow natural scrolling to Section2 when on page3 and scrolling downward
      if (currentPage === 3 && e.deltaY > 0) {
        if (wheelAccumulated.current + e.deltaY>=wheelThreshold) {
            wheelAccumulated.current = 0;
            setProgress(0);
            return;
        }
        
        // setProgress(0);
        // return;
      }
      
      e.preventDefault();

      wheelAccumulated.current += e.deltaY;
      const newProgress = Math.min(1, Math.abs(wheelAccumulated.current) / wheelThreshold);
      setProgress(newProgress);
      console.log("Accumulated wheel delta:", wheelAccumulated.current);

      if (wheelAccumulated.current >= wheelThreshold && currentPage < 3) {
        handleNextPage();
      } else if (wheelAccumulated.current <= -wheelThreshold && currentPage > 1) {
        handlePrevPage();
      }
    };

    // Touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = e.touches[0].clientY;
      accumulatedTouchDelta.current = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartRef.current === null) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchY - touchStartRef.current;
      accumulatedTouchDelta.current = deltaY;
      const newProgress = Math.min(1, Math.abs(accumulatedTouchDelta.current) / wheelThreshold);
      setProgress(newProgress);

      // Swipe up: next page (delta negative)
      if (accumulatedTouchDelta.current <= -wheelThreshold && currentPage < 3) {
        e.preventDefault();
        handleNextPage();
      }
      // Swipe down: previous page (delta positive)
      else if (accumulatedTouchDelta.current >= wheelThreshold && currentPage > 1) {
        e.preventDefault();
        handlePrevPage();
      }
    };

    const handleTouchEnd = () => {
      touchStartRef.current = null;
      accumulatedTouchDelta.current = 0;
      setProgress(0);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentPage]);

  return (
    <div
      ref={containerRef}
      style={{ overscrollBehaviorY: "none", touchAction: "none" }}
      className="bg-black relative flex h-[120vh] w-full flex-col items-center justify-center overflow-hidden bg-background"
    >
      <AnimatePresence>
        {currentPage === 1 && (
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Page1 stage = {wheelAccumulated.current/100}/>
          </motion.div>
        )}
        {currentPage === 2 && (
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Page2 />
          </motion.div>
        )}
        {currentPage === 3 && (
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Page3 />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gray-700 z-50">
        <div
          className="h-full bg-blue-500 transition-all duration-100"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}