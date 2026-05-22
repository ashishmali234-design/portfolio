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
      {/* Outer iOS-Inspired Liquid Glass Sphere Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-14 h-14 rounded-full pointer-events-none z-[9999] backdrop-blur-[20px] border border-white/20 overflow-hidden"
        style={{
          x: outerX,
          y: outerY,
          translateX: "-50%",
          translateY: "-50%",
          scale: hideOuterRing ? 0 : isClicked ? 0.92 : isHovered ? 1.3 : 1,
          opacity: hideOuterRing ? 0 : 1,
          // Premium Apple-inspired 3D liquid frosted glass gradient
          background: isHovered
            ? "radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 45%, rgba(0, 0, 0, 0.12) 80%, rgba(0, 0, 0, 0.26) 100%)"
            : "radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.03) 45%, rgba(0, 0, 0, 0.1) 80%, rgba(0, 0, 0, 0.22) 100%)",
          // Deep layered shadows + inner highlights that capture real 3D volume
          boxShadow: isHovered
            ? "inset 0 0 12px rgba(255, 255, 255, 0.2), inset 4px 4px 10px rgba(255, 255, 255, 0.45), inset -4px -4px 10px rgba(0, 0, 0, 0.35), inset -2px -2px 6px rgba(245, 158, 11, 0.2), 0 18px 45px rgba(0, 0, 0, 0.38), 0 4px 12px rgba(0, 0, 0, 0.15)"
            : "inset 0 0 10px rgba(255, 255, 255, 0.15), inset 3px 3px 8px rgba(255, 255, 255, 0.35), inset -3px -3px 8px rgba(0, 0, 0, 0.25), inset -1.5px -1.5px 4px rgba(245, 158, 11, 0.12), 0 12px 30px rgba(0, 0, 0, 0.26), 0 3px 8px rgba(0, 0, 0, 0.12)",
        }}
        transition={{
          scale: { type: "spring", stiffness: 480, damping: 24 },
          opacity: { duration: 0.15 },
        }}
      >
        {/* Soft centered lens reflection highlight (Magnification glow) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_65%)] pointer-events-none" />

        {/* Sharp specular rim highlight crescent (Top-Left Edge) */}
        <div className="absolute inset-[1.5px] rounded-full border-t-[1.5px] border-l-[1.5px] border-white/65 pointer-events-none filter blur-[0.1px]" />
        
        {/* Soft blurred specular window-pane ellipse reflection in the top-left quadrant */}
        <div className="absolute top-[8%] left-[8%] w-[38%] h-[22%] bg-gradient-to-b from-white/75 to-white/0 rounded-full rotate-[-42deg] filter blur-[0.4px] pointer-events-none" />

        {/* Opposite bounce-light reflection crescent (Bottom-Right Edge) */}
        <div className="absolute inset-[1.5px] rounded-full border-b border-r border-white/15 pointer-events-none" />

        {/* Chromatic aberration dispersion flare (Bottom-Right) */}
        <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.22),transparent_75%)] pointer-events-none" />
      </motion.div>

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
