"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface CardTiltProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxTilt?: number; // Max degrees of tilt (default 6)
  glare?: boolean;
  scale?: number;
  className?: string;
}

export function CardTilt({
  children,
  maxTilt = 6,
  glare = false,
  scale = 1.015,
  className = "",
  ...props
}: CardTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const rotateXTo = useRef<gsap.QuickToFunc | null>(null);
  const rotateYTo = useRef<gsap.QuickToFunc | null>(null);
  const scaleXTo = useRef<gsap.QuickToFunc | null>(null);
  const scaleYTo = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(
    () => {
      if (!contentRef.current) return;

      rotateXTo.current = gsap.quickTo(contentRef.current, "rotationX", {
        duration: 0.4,
        ease: "power2.out",
      });
      rotateYTo.current = gsap.quickTo(contentRef.current, "rotationY", {
        duration: 0.4,
        ease: "power2.out",
      });
      scaleXTo.current = gsap.quickTo(contentRef.current, "scaleX", {
        duration: 0.4,
        ease: "power2.out",
      });
      scaleYTo.current = gsap.quickTo(contentRef.current, "scaleY", {
        duration: 0.4,
        ease: "power2.out",
      });
    },
    { scope: cardRef }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      !cardRef.current ||
      !rotateXTo.current ||
      !rotateYTo.current ||
      !scaleXTo.current ||
      !scaleYTo.current
    )
      return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normalizedX = (x / rect.width - 0.5) * 2; // -1 to 1
    const normalizedY = (y / rect.height - 0.5) * 2; // -1 to 1

    rotateXTo.current(-normalizedY * maxTilt);
    rotateYTo.current(normalizedX * maxTilt);
    scaleXTo.current(scale);
    scaleYTo.current(scale);
  };

  const handleMouseLeave = () => {
    if (!rotateXTo.current || !rotateYTo.current || !scaleXTo.current || !scaleYTo.current) return;

    rotateXTo.current(0);
    rotateYTo.current(0);
    scaleXTo.current(1);
    scaleYTo.current(1);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px" }}
      className={`relative ${className}`}
      {...props}
    >
      <div
        ref={contentRef}
        style={{ transformStyle: "preserve-3d" }}
        className="h-full w-full will-change-transform rounded-2xl"
      >
        {children}
      </div>
    </div>
  );
}
