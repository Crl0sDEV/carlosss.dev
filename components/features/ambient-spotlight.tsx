"use client";

import { useEffect, useState } from "react";

export function AmbientSpotlight() {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // Only activate on devices with fine pointer (mouse/trackpad)
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!position) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden md:block"
      aria-hidden="true"
      style={{
        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(37, 99, 235, 0.08), transparent 80%)`,
      }}
    />
  );
}
