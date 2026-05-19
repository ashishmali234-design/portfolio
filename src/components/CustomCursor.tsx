"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Custom cursor position motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Smooth spring settings for outer trailing ring
  const springConfig = { damping: 35, stiffness: 350, mass: 0.35 };
  const outerX = useSpring(cursorX, springConfig);
  const outerY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable custom cursor on mobile/touch screens
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Trigger scaling hover effect on any interactive element
      if (
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.classList.contains("clickable")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer trailing circle with iOS glass effect */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/25 pointer-events-none z-50 shadow-[0_4px_12px_rgba(0,0,0,0.15)] backdrop-blur-[5px]"
        style={{
          x: outerX,
          y: outerY,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovered ? 1.8 : 1,
          backgroundColor: isHovered ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.06)",
          borderColor: isHovered ? "rgba(255, 255, 255, 0.35)" : "rgba(255, 255, 255, 0.25)",
        }}
        transition={{ type: "spring", stiffness: 450, damping: 30 }}
      />
      {/* Inner pinpoint dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white/80 rounded-full pointer-events-none z-50"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovered ? 0 : 1,
          opacity: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
