"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isOverText, setIsOverText] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  // Custom cursor position motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

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

  // Determine which cursor shape to show
  const showIBeam = isOverText && !isHovered;
  const hideCursor = isTyping;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: showIBeam ? "-50%" : isHovered ? "-35%" : "-15%",
          translateY: showIBeam ? "-50%" : isHovered ? "-10%" : "-15%",
        }}
        animate={{
          opacity: hideCursor ? 0 : 1,
        }}
        transition={{ duration: 0.1 }}
      >
        <AnimatePresence mode="wait">
          {showIBeam ? (
            // Sleek Golden I-Beam for precise text selection
            <motion.div
              key="ibeam"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.12 }}
              className="w-[2px] h-4 bg-amber-500 rounded-sm shadow-[0_0_8px_rgba(245,158,11,0.8)]"
            />
          ) : isHovered ? (
            // Custom pointer hand icon inspired by default clicking state
            <motion.div
              key="hand"
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: isClicked ? 0.85 : 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: -5 }}
              transition={{ duration: 0.12 }}
              className="text-amber-500 filter drop-shadow-[0_2px_8px_rgba(245,158,11,0.4)]"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M9 11.25V4.5a1.5 1.5 0 0 1 3 0v6.75h.75V5.25a1.5 1.5 0 0 1 3 0v6h.75V6.75a1.5 1.5 0 0 1 3 0v7.5a6.75 6.75 0 0 1-13.5 0v-3a1.5 1.5 0 0 1 3 0v3h.75Z" 
                  fill="currentColor" 
                  stroke="#000000" 
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          ) : (
            // User's custom logo as default cursor (rotated slightly to the left)
            <motion.div
              key="logo"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: isClicked ? 0.85 : 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.12 }}
              style={{ rotate: -22 }}
              className="w-7 h-7 filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
            >
              <img
                src="/images/ai_avatar.png"
                alt="logo cursor"
                className="w-full h-full object-contain"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
