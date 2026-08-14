"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/";

interface ScrambleTextProps {
  text: string;
  className?: string;
  duration?: number;
  speed?: number;
}

export function ScrambleText({
  text,
  className = "",
  duration = 1.2,
  speed = 0.04,
}: ScrambleTextProps) {
  const [displayedText, setDisplayedText] = useState(text);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    let frame = 0;
    const totalFrames = Math.floor(duration / speed);
    const textLength = text.length;

    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const revealedLength = Math.floor(progress * textLength);

      const scrambled = text
        .split("")
        .map((char, index) => {
          if (char === " " || char === "\n") return char;
          if (index < revealedLength) return text[index];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplayedText(scrambled);

      if (frame >= totalFrames) {
        setDisplayedText(text);
        clearInterval(interval);
      }
    }, speed * 1000);

    return () => clearInterval(interval);
  }, [isInView, text, duration, speed]);

  return (
    <span ref={containerRef} className={className}>
      {displayedText}
    </span>
  );
}
