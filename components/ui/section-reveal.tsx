"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
}

export function SectionReveal({ children, className = "" }: SectionRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`relative group my-6 ${className}`}
    >
      {/* Subtle section ambient glow backdrop */}
      <div className="absolute -inset-x-4 -inset-y-6 bg-gradient-to-r from-red-500/0 via-red-500/[0.02] to-red-500/0 dark:via-red-500/[0.04] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10" />
      {children}
    </motion.div>
  );
}
