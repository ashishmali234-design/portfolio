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

        if (seg.text === "AI") {
          return (
            <span key={idx} className="relative inline-block mx-0.5 group">
              {/* Subtle back-glow */}
              <motion.span 
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                  scale: [0.95, 1.05, 0.95]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -inset-1.5 rounded-lg bg-gradient-to-r from-amber-500/25 to-yellow-500/25 blur-md pointer-events-none"
              />
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 font-black">
                {seg.text.slice(0, visibleLen)}
              </span>
              {/* Star spark above the letter 'I' */}
              {visibleLen >= 2 && (
                <motion.span 
                  initial={{ opacity: 0, scale: 0, rotate: -45 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    rotate: 0,
                    y: [0, -1.5, 0]
                  }}
                  transition={{ 
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 },
                    rotate: { duration: 0.3 },
                    y: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                  className="absolute -top-3.5 right-0.5 pointer-events-none text-amber-300 filter drop-shadow-[0_0_5px_rgba(251,191,36,0.85)]"
                >
                  <svg className="w-3.5 h-3.5 fill-amber-300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
                  </svg>
                </motion.span>
              )}
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
