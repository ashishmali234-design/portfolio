"use client";

import { useState, useEffect, useRef } from "react";
import { useInView, motion } from "framer-motion";

export interface TypewriterSegment {
  text: string;
  className?: string;
}

interface TypewriterProps {
  text?: string;
  segments?: TypewriterSegment[];
  speed?: number; // ms per character
  delay?: number; // start delay in ms
  className?: string;
  trigger?: boolean; // Manual trigger override
}

export default function Typewriter({
  text,
  segments,
  speed = 40,
  delay = 0,
  className = "",
  trigger,
}: TypewriterProps) {
  const [charCount, setCharCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  
  // Fallback to auto-trigger when entering view if no manual trigger is provided
  const autoInView = useInView(ref, { once: true, amount: 0.1 });
  const isActivated = trigger !== undefined ? trigger : autoInView;

  // Normalize input to segments
  const activeSegments = segments 
    ? segments 
    : text 
      ? [{ text }] 
      : [];

  const totalChars = activeSegments.reduce((sum, s) => sum + s.text.length, 0);

  useEffect(() => {
    if (!isActivated) {
      setCharCount(0);
      return;
    }

    let isCancelled = false;
    let timeoutId: NodeJS.Timeout;
    let current = 0;

    const startTyping = () => {
      const type = () => {
        if (isCancelled) return;
        if (current <= totalChars) {
          setCharCount(current);
          current++;
          timeoutId = setTimeout(type, speed);
        }
      };
      type();
    };

    timeoutId = setTimeout(startTyping, delay);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [isActivated, totalChars, speed, delay]);

  let currentOffset = 0;

  return (
    <span ref={ref} className={`${className} whitespace-pre-wrap inline-block`}>
      {activeSegments.map((seg, idx) => {
        const segLen = seg.text.length;
        const start = currentOffset;
        currentOffset += segLen;

        if (charCount <= start) return null;
        const visibleLen = Math.min(segLen, charCount - start);

        if (seg.text === "AI" || seg.text === "Ai") {
          return (
            <span key={idx} className="relative inline-flex items-baseline mx-1 group font-sans font-bold">
              {/* Vibrant Electric Neon Blue text wrapper */}
              <span className="relative z-10 font-sans font-extrabold inline-flex items-baseline uppercase tracking-wide ai-outline">
                {/* Render 'A' if visible */}
                {visibleLen >= 1 && <span>{seg.text[0]}</span>}
                {/* Render 'I' with star if visible length is 2 */}
                {visibleLen >= 2 && (
                  <span className="relative inline-flex items-baseline">
                    <span>{seg.text[1]}</span>
                    {/* Elegant sparkling star spark floating precisely ABOVE the capital 'I' */}
                    <motion.span 
                      animate={{ 
                        opacity: [0.75, 1, 0.75], 
                        scale: [0.9, 1.15, 0.9],
                        rotate: [0, 180, 360],
                        y: [0, -3, 0]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute left-[48%] -translate-x-1/2 top-[-0.55em] pointer-events-none text-cyan-300"
                      style={{
                        filter: "drop-shadow(0 0 3px rgba(0, 240, 255, 0.9)) drop-shadow(0 0 8px rgba(0, 163, 255, 0.5))"
                      }}
                    >
                      <svg className="w-[0.45em] h-[0.45em] fill-cyan-300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
                      </svg>
                    </motion.span>
                  </span>
                )}
              </span>
            </span>
          );
        }

        return (
          <span key={idx} className={seg.className}>
            {seg.text.slice(0, visibleLen)}
          </span>
        );
      })}
      {/* Pulsing/blinking typewriter cursor */}
      {charCount < totalChars && (
        <span className="animate-blink inline-block w-[3px] bg-amber-400 h-[0.85em] ml-1.5 align-middle" />
      )}
    </span>
  );
}
