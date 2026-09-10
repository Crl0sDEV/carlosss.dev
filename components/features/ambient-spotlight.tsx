"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function AmbientSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Only activate on devices with fine pointer (mouse/trackpad)
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const el = spotlightRef.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power2.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power2.out" });
    const opacityTo = gsap.quickTo(el, "opacity", { duration: 0.4, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      opacityTo(1);
    };

    const handleMouseLeave = () => {
      opacityTo(0);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full z-30 opacity-0 hidden md:block will-change-transform"
      style={{
        background: "radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, rgba(37, 99, 235, 0.02) 40%, transparent 70%)",
      }}
    />
  );
}
