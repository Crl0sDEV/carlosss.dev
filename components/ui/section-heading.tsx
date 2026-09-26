"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({ title, description, className }: SectionHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const titleEl = titleRef.current;
      const lineEl = lineRef.current;
      const descEl = descRef.current;

      if (!container || !titleEl) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });

      tl.from(titleEl, {
        y: 28,
        opacity: 0,
        duration: 0.65,
        ease: "power3.out",
      });

      if (lineEl) {
        tl.from(
          lineEl,
          {
            scaleX: 0,
            transformOrigin: "center center",
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.3"
        );
      }

      if (descEl) {
        tl.from(
          descEl,
          {
            y: 14,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3"
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={cn("text-center flex flex-col items-center", className)}
    >
      <h2
        ref={titleRef}
        className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-3 leading-tight"
      >
        {title}
      </h2>
      <div
        ref={lineRef}
        className="h-1 w-12 bg-red-500 dark:bg-red-400 rounded-full mb-3"
      />
      {description && (
        <p
          ref={descRef}
          className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-xl mx-auto"
        >
          {description}
        </p>
      )}
    </div>
  );
}
