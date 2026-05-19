"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

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
  onComplete?: () => void; // Callback when typing finishes
}

export default function Typewriter({
  text,
  segments,
  speed = 40,
  delay = 0,
  className = "",
  trigger,
  onComplete,
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
        } else if (onComplete) {
          onComplete();
        }
      };
      type();
    };

    timeoutId = setTimeout(startTyping, delay);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [isActivated, totalChars, speed, delay, onComplete]);

  let currentOffset = 0;

  return (
    <span ref={ref} className={`${className} whitespace-pre-wrap inline-block`}>
      {activeSegments.map((seg, idx) => {
        const segLen = seg.text.length;
        const start = currentOffset;
        currentOffset += segLen;

        if (charCount <= start) return null;
        const visibleLen = Math.min(segLen, charCount - start);

        return (
          <span key={idx} className={seg.className}>
            {seg.text.slice(0, visibleLen)}
          </span>
        );
      })}
      {/* Always show the pulsing/blinking typewriter cursor */}
      <span className="animate-blink inline-block w-[3px] bg-amber-400 h-[0.85em] ml-1.5 align-middle" />
    </span>
  );
}
