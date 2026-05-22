"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isOverText, setIsOverText] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  // Custom cursor position motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Smooth, organic, liquid-lag spring settings (iOS/VisionOS tactile physics)
  const springConfig = { damping: 32, stiffness: 240, mass: 0.7 };
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

    // 3. Detect keyboard typing active state with 1-second auto-restore
    let typingTimeout: NodeJS.Timeout;
    const handleKeyDown = () => {
      setIsTyping(true);
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => {
        setIsTyping(false);
      }, 1000);
    };

    // 4. Tactile click feedback listeners
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      clearTimeout(typingTimeout);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  // Determine state transitions
  const hideOuterRing = isTyping || isOverText;

  return (
    <>
      {/* Outer Minimalist Blurred Circular Shape Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-14 h-14 rounded-full pointer-events-none z-[9999] backdrop-blur-[12px] border border-white/15 bg-white/[0.08]"
        style={{
          x: outerX,
          y: outerY,
          translateX: "-50%",
          translateY: "-50%",
          scale: hideOuterRing ? 0 : isClicked ? 0.90 : isHovered ? 1.35 : 1,
          opacity: hideOuterRing ? 0 : 1,
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.25)",
        }}
        transition={{
          scale: { type: "spring", stiffness: 480, damping: 24 },
          opacity: { duration: 0.15 },
        }}
      />

      {/* Inner Pinpoint Dot / Golden Laser Needle */}
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
            ? "0 0 8px rgba(245, 158, 11, 0.85)" 
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
