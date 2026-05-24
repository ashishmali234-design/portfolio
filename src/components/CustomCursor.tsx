"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(true); // Active immediately (even on loading screen)
  const [isHovered, setIsHovered] = useState(false);
  const [isOverText, setIsOverText] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  // Custom cursor position motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Premium AI Neural Spark Trail Spring Tracking (independent spring nodes for smooth trailing lag)
  const trailX1 = useSpring(cursorX, { stiffness: 120, damping: 24 });
  const trailY1 = useSpring(cursorY, { stiffness: 120, damping: 24 });
  const trailX2 = useSpring(cursorX, { stiffness: 80, damping: 18 });
  const trailY2 = useSpring(cursorY, { stiffness: 80, damping: 18 });

  useEffect(() => {
    // Disable custom cursor on mobile/touch screens
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setIsVisible(false);
      return;
    }

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
      {/* Premium AI Neural Spark Trail Particles */}
      {!showIBeam && !hideCursor && (
        <>
          {/* Main trailing Cyber Cyan node particle */}
          <motion.div
            className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-cyan-400 pointer-events-none z-[99998] shadow-[0_0_8px_#00F0FF] custom-cursor-container"
            style={{
              x: trailX1,
              y: trailY1,
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              opacity: isClicked ? 0.85 : 0.65,
              scale: isClicked ? 1.5 : 1,
            }}
          />
          {/* Secondary trailing Golden Amber node particle */}
          <motion.div
            className="fixed top-0 left-0 w-1 h-1 rounded-full bg-amber-400 pointer-events-none z-[99998] shadow-[0_0_6px_#FFBF4F] custom-cursor-container"
            style={{
              x: trailX2,
              y: trailY2,
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              opacity: isClicked ? 0.65 : 0.45,
              scale: isClicked ? 1.3 : 1,
            }}
          />
        </>
      )}

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] flex items-center justify-center custom-cursor-container"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: showIBeam ? "-50%" : isHovered ? "-32%" : "-15%",
          translateY: showIBeam ? "-50%" : isHovered ? "-5%" : "-15%",
        }}
        animate={{
          opacity: hideCursor ? 0 : 1,
        }}
        transition={{ duration: 0.1 }}
      >
        {/* Extremely subtle ambient radial glow behind the cursor logo/hand for premium visual depth */}
        {!showIBeam && !hideCursor && (
          <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none">
            <motion.div
              className="absolute w-14 h-14 rounded-full blur-[8px] pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(0,240,255,0.06) 0%, rgba(255,191,79,0.04) 50%, rgba(0,0,0,0) 70%)"
              }}
              animate={{
                scale: isClicked ? 0.75 : isHovered ? [1, 1.2, 1] : [1, 1.1, 1],
                opacity: isHovered ? [0.35, 0.55, 0.35] : [0.2, 0.3, 0.2],
              }}
              transition={{
                scale: isClicked ? { duration: 0.1 } : { repeat: Infinity, duration: 3, ease: "easeInOut" },
                opacity: { repeat: Infinity, duration: 3, ease: "easeInOut" },
              }}
            />
          </div>
        )}

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
            // User's custom pointing hand PNG (size reduced to w-[26px] x h-[26px] normally, clicking scales to 0.8 = exactly 20.8px)
            <motion.div
              key="hand"
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: isClicked ? 0.8 : 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: -5 }}
              transition={{ duration: 0.12 }}
              className="w-[26px] h-[26px]"
            >
              <img
                src="/images/hand_cursor.png"
                alt="hand cursor"
                className="w-full h-full object-contain filter drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)]"
              />
            </motion.div>
          ) : (
            // User's custom monogram PNG as default cursor (rotated -22 deg, w-10/40px)
            // Contour shadow applied directly to img for flawless transparent pixel outlining
            <motion.div
              key="logo"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: isClicked ? 0.85 : 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.12 }}
              style={{ rotate: -22 }}
              className="w-10 h-10"
            >
              <img
                src="/images/logo_cursor.png"
                alt="logo cursor"
                className="w-full h-full object-contain filter drop-shadow-[0_5px_12px_rgba(0,0,0,0.55)]"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
