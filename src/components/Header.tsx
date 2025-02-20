"use client";

import React from "react";
import Image from "next/image";
import { RetroGrid } from "./magicui/retro-grid";
import { RxDoubleArrowDown } from "react-icons/rx";
import { VelocityScroll } from "./magicui/scroll-based-velocity";
import { GithubIcon } from "lucide-react";
import "@fontsource/inter";

export function Header() {
  return (
    <div className="bg-black relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background">
      {/* Gradient wave overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8E44AD" />
              <stop offset="100%" stopColor="#9B59B6" />
            </linearGradient>
          </defs>
          <path
            fill="url(#purpleGradient)"
            fillOpacity="0.2"
            d="M0,160L48,149.3C96,139,192,117,288,122.7C384,128,480,160,576,181.3C672,203,768,213,864,186.7C960,160,1056,96,1152,69.3C1248,43,1344,53,1392,58.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>

      {/* Regression Graph Overlay */}
      <div className="absolute bottom-12 inset-0 flex items-center justify-center pointer-events-none z-0">
        <Image
          src="/Regression Graph.svg"
          alt="Regression Graph"
          layout="fill"
          objectFit="fit"
          className="opacity-80"
        />
      </div>

      {/* Header Text */}
      <header className="text-white relative z-10 text-center px-4">
        <h1
          style={{ fontFamily: "Inter" }}
          className="text-3xl sm:text-5xl md:text-[7.5rem] w-full sm:w-9/12 m-auto font-bold leading-tight break-words"
        >
          Intro to Machine Learning
        </h1>
      </header>

      {/* VelocityScroll with Interactive Text */}
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <VelocityScroll numRows={1}>
          <span
            style={{ fontFamily: "Inter" }}
            className="text-xl sm:text-2xl md:text-3xl text-white mt-4"
          >
            An Interactive Explorable by{" "}
            <a
              href="https://github.com/system1970/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="underline">system1970</span>
            </a>
            <GithubIcon className="inline-block ml-1" />
          </span>
        </VelocityScroll>
        {/* Optional overlay gradients
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        */}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 z-10 flex flex-col items-center animate-bounce">
        <RxDoubleArrowDown color="white" />
        <span className="text-white text-xs sm:text-sm">Scroll down</span>
      </div>

      {/* Retro grid for background effects */}
      <RetroGrid className="bg-black" opacity={0.1} />
    </div>
  );
}