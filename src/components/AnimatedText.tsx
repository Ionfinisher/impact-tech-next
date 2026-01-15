"use client";

import { useState, useEffect } from "react";

interface AnimatedTextProps {
  texts: string[];
  interval?: number;
}

export function AnimatedText({ texts, interval = 3000 }: AnimatedTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setIsAnimating(false);
      }, 500);
    }, interval);

    return () => clearInterval(timer);
  }, [texts.length, interval]);

  return (
    <span className="inline-block relative overflow-hidden h-[1.2em] align-bottom">
      <span
        className={`inline-block text-primary transition-transform duration-500 ${
          isAnimating
            ? "-translate-y-full opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        {texts[currentIndex]}
      </span>
    </span>
  );
}
