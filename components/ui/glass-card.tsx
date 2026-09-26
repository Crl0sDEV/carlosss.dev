"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  enableTilt?: boolean;
  maxTilt?: number;
}

export function GlassCard({
  children,
  className,
  enableTilt = true,
  maxTilt = 7,
  ...props
}: GlassCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const card = cardRef.current;
      const glare = glareRef.current;

      if (!container || !card || !enableTilt) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isTouchDevice = !window.matchMedia("(pointer: fine)").matches;

      if (prefersReducedMotion || isTouchDevice) return;

      const xTo = gsap.quickTo(card, "rotationY", { duration: 0.35, ease: "power2.out" });
      const yTo = gsap.quickTo(card, "rotationX", { duration: 0.35, ease: "power2.out" });

      const handlePointerMove = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateXVal = ((y - centerY) / centerY) * -maxTilt;
        const rotateYVal = ((x - centerX) / centerX) * maxTilt;

        xTo(rotateYVal);
        yTo(rotateXVal);

        if (glare) {
          glare.style.background = `radial-gradient(circle 320px at ${x}px ${y}px, rgba(255, 255, 255, 0.22), transparent 75%)`;
          glare.style.opacity = "1";
        }
      };

      const handlePointerLeave = () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.65,
          ease: "power3.out",
        });

        if (glare) {
          gsap.to(glare, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      };

      container.addEventListener("pointermove", handlePointerMove);
      container.addEventListener("pointerleave", handlePointerLeave);

      return () => {
        container.removeEventListener("pointermove", handlePointerMove);
        container.removeEventListener("pointerleave", handlePointerLeave);
      };
    },
    { scope: containerRef, dependencies: [enableTilt, maxTilt] }
  );

  return (
    <div
      ref={containerRef}
      style={{ perspective: "1200px" }}
      className="w-full relative"
    >
      <div
        ref={cardRef}
        style={{ transformStyle: "preserve-3d" }}
        className={cn(
          "relative overflow-hidden transition-shadow duration-300 will-change-transform",
          className
        )}
        {...props}
      >
        {children}

        {/* Specular Liquid Glare Layer */}
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30 opacity-0 transition-opacity duration-300 mix-blend-overlay"
        />
      </div>
    </div>
  );
}
