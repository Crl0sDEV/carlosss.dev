"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

interface VelocityMarqueeProps {
  row1: string[];
  row2: string[];
  className?: string;
}

export function VelocityMarquee({ row1, row2, className }: VelocityMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track1 = track1Ref.current;
      const track2 = track2Ref.current;
      if (!track1 || !track2) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      // Smooth, gentle base speed (readable and elegant)
      let speed1 = -0.045;
      let speed2 = 0.045;
      let pos1 = 0;
      let pos2 = -50;

      let isHovered = false;

      // Subtle scroll influence
      let velocityFactor = 0;
      const clampVelocity = gsap.utils.clamp(-0.12, 0.12);

      ScrollTrigger.create({
        onUpdate: (self) => {
          const v = self.getVelocity() / 4000;
          velocityFactor = clampVelocity(v);
        },
      });

      const handleMouseEnter = () => {
        isHovered = true;
      };

      const handleMouseLeave = () => {
        isHovered = false;
      };

      const container = containerRef.current;
      container?.addEventListener("mouseenter", handleMouseEnter);
      container?.addEventListener("mouseleave", handleMouseLeave);

      const tickerCallback = () => {
        // Decay velocity back to 0 smoothly
        velocityFactor *= 0.95;

        const currentMultiplier = isHovered ? 0.3 : 1;
        pos1 += (speed1 + velocityFactor * -0.5) * currentMultiplier;
        pos2 += (speed2 + velocityFactor * 0.5) * currentMultiplier;

        // Loop seamlessly between -50% and 0%
        if (pos1 <= -50) pos1 = 0;
        if (pos1 > 0) pos1 = -50;

        if (pos2 >= 0) pos2 = -50;
        if (pos2 < -50) pos2 = 0;

        track1.style.transform = `translate3d(${pos1}%, 0, 0)`;
        track2.style.transform = `translate3d(${pos2}%, 0, 0)`;
      };

      gsap.ticker.add(tickerCallback);

      return () => {
        gsap.ticker.remove(tickerCallback);
        container?.removeEventListener("mouseenter", handleMouseEnter);
        container?.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: containerRef }
  );

  // Quadruple items to ensure completely continuous infinite ribbon
  const fullRow1 = [...row1, ...row1, ...row1, ...row1];
  const fullRow2 = [...row2, ...row2, ...row2, ...row2];

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden w-full select-none py-2 space-y-3",
        className
      )}
    >
      {/* Side gradient feathering */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-[var(--background)] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-[var(--background)] to-transparent z-10" />

      {/* Row 1 */}
      <div className="overflow-hidden flex whitespace-nowrap">
        <div ref={track1Ref} className="flex gap-3 will-change-transform">
          {fullRow1.map((item, idx) => (
            <div
              key={`${item}-${idx}`}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl liquid-glass-subtle text-xs sm:text-sm font-mono text-neutral-800 dark:text-neutral-200 border border-black/5 dark:border-white/10 hover:border-red-500/40 transition-colors shadow-xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 dark:bg-red-400" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 (Reverse) */}
      <div className="overflow-hidden flex whitespace-nowrap">
        <div ref={track2Ref} className="flex gap-3 will-change-transform">
          {fullRow2.map((item, idx) => (
            <div
              key={`${item}-${idx}`}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl liquid-glass-subtle text-xs sm:text-sm font-mono text-neutral-800 dark:text-neutral-200 border border-black/5 dark:border-white/10 hover:border-red-500/40 transition-colors shadow-xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 dark:bg-red-400" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
