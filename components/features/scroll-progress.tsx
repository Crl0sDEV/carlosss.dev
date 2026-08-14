"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(currentProgress);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Observe DOM height changes when sections expand/collapse
    const resizeObserver = new ResizeObserver(() => {
      handleScroll();
    });
    resizeObserver.observe(document.body);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 z-[100] transition-transform duration-75 ease-out origin-left pointer-events-none shadow-[0_0_10px_rgba(37,99,235,0.7)]"
      style={{ transform: `scaleX(${scrollProgress / 100})` }}
      aria-hidden="true"
    />
  );
}
