"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
}

export function SectionReveal({ children, className = "" }: SectionRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 3D Wheel / Cylindrical Roll effect parameters
  // As section scrolls in: rotateX tilts backward (+16deg), scale 0.94
  // When in focus center: rotateX 0deg, scale 1
  // As section scrolls out: rotateX tilts forward (-16deg), scale 0.94
  const rotateX = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [16, 0, 0, -16]);
  const scale = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [0.93, 1, 1, 0.93]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.4]);

  return (
    <div
      ref={containerRef}
      style={{ perspective: "1200px" }}
      className="relative my-4"
    >
      <motion.div
        style={{
          rotateX,
          scale,
          opacity,
          transformStyle: "preserve-3d",
        }}
        className={`relative group ${className}`}
      >
        {/* Subtle section ambient glow backdrop */}
        <div className="absolute -inset-x-4 -inset-y-6 bg-gradient-to-r from-blue-500/0 via-blue-500/[0.03] to-blue-500/0 dark:via-blue-500/[0.05] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10" />
        {children}
      </motion.div>
    </div>
  );
}
