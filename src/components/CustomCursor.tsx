"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isOverText, setIsOverText] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  // Custom cursor position motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Smooth spring settings for outer trailing ring
  const springConfig = { damping: 45, stiffness: 400, mass: 0.4 };
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
      setIsTyping(false); // Mouse movement cancels typing state
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // 1. Detect if hovering over clickable/interactive elements
      const isInteractive = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button") ||
        target.classList.contains("clickable") ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsHovered(!!isInteractive);

      // 2. Detect if hovering over selectable text or input fields
      const computedCursor = window.getComputedStyle(target).cursor;
      const isTextElement = 
        computedCursor === "text" || 
        target.tagName === "INPUT" || 
        target.tagName === "TEXTAREA" ||
        target.closest("input") ||
        target.closest("textarea") ||
        ["P", "SPAN", "H1", "H2", "H3", "H4", "H5", "H6", "LI", "CODE", "PRE"].includes(target.tagName);

      setIsOverText(!!isTextElement);
    };

    // 3. Detect keyboard typing active state
    const handleKeyDown = () => {
      setIsTyping(true);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  // Determine state transitions
  const hideOuterRing = isTyping || isOverText;

  return (
    <>
      {/* Outer Liquid Glass Bubble */}
      <motion.div
        className="fixed top-0 left-0 w-11 h-11 pointer-events-none z-[9999] shadow-[0_8px_32px_rgba(14,165,233,0.15)] backdrop-blur-[6px] border border-white/30 overflow-hidden"
        style={{
          x: outerX,
          y: outerY,
          translateX: "-50%",
          translateY: "-50%",
          scale: hideOuterRing ? 0 : isHovered ? 1.5 : 1,
          opacity: hideOuterRing ? 0 : 1,
          backgroundColor: isHovered ? "rgba(255, 255, 255, 0.16)" : "rgba(255, 255, 255, 0.08)",
          borderColor: isHovered ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0.3)",
        }}
        animate={{
          borderRadius: [
            "42% 58% 50% 50% / 45% 45% 55% 55%",
            "55% 45% 55% 45% / 50% 55% 45% 50%",
            "45% 55% 40% 60% / 55% 45% 55% 45%",
            "42% 58% 50% 50% / 45% 45% 55% 55%"
          ]
        }}
        transition={{
          // Spring for state changes (scale, opacity)
          scale: { type: "spring", stiffness: 400, damping: 28 },
          opacity: { duration: 0.2 },
          // Beautiful continuous fluid wobbly animation
          borderRadius: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        {/* Specular light highlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),transparent_65%)] pointer-events-none" />
        <div className="absolute inset-0.5 rounded-full bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none" />
        
        {/* Subtle inner glass border reflection */}
        <div className="absolute inset-[1px] rounded-full border border-white/10 pointer-events-none" />
      </motion.div>

      {/* Inner Pinpoint Dot / Golden Laser Laser Needle */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          // Shape & Size transformation
          width: isOverText ? 2 : isHovered ? 0 : 6,
          height: isOverText ? 16 : isHovered ? 0 : 6,
          borderRadius: isOverText ? "4px" : "50%",
          backgroundColor: isOverText ? "#F59E0B" : "rgba(255, 255, 255, 0.95)",
          boxShadow: isOverText 
            ? "0 0 8px rgba(245, 158, 11, 0.8)" 
            : "0 2px 4px rgba(0, 0, 0, 0.2)",
          opacity: isTyping ? 0 : 1, // Completely hide while typing to not block visibility
        }}
        transition={{
          duration: 0.15,
          ease: "easeOut",
        }}
      />
    </>
  );
}
