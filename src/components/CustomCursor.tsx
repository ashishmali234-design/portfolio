"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showIBeam, setShowIBeam] = useState(false);
  const [hideCursor, setHideCursor] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 450, mass: 0.2 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'button, a, input, textarea, select, [role="button"], [data-cursor="pointer"], .cursor-pointer'
      );
      setIsHovered(!!interactive);

      const isText = target.closest(
        'input[type="text"], input[type="email"], input[type="search"], textarea, [contenteditable="true"]'
      );
      setShowIBeam(!!isText);

      const isScrollbar =
        e.clientX >= document.documentElement.clientWidth ||
        e.clientY >= document.documentElement.clientHeight;
      setHideCursor(isScrollbar);
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="custom-cursor-container pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      <motion.div
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: showIBeam ? "-50%" : isHovered ? "-32%" : "-50%",
          translateY: showIBeam ? "-50%" : isHovered ? "-5%" : "-50%",
        }}
        animate={{
          opacity: hideCursor ? 0 : 1,
        }}
        transition={{ duration: 0.1 }}
      >
        {!showIBeam && !hideCursor && (
          <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none">
            <motion.div
              animate={{
                scale: isHovered ? 1.6 : 1.1,
                opacity: isHovered ? 0.35 : 0.18,
              }}
              transition={{ duration: 0.2 }}
              className="w-12 h-12 rounded-full bg-amber-400 blur-md"
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          {showIBeam ? (
            <motion.div
              key="ibeam"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: isClicked ? 0.9 : 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.1 }}
              className="flex flex-col items-center justify-center h-6 w-3"
            >
              <div className="w-2.5 h-[2px] bg-amber-400 shadow-[0_0_8px_#FFBF4F]" />
              <div className="w-[2px] h-4 bg-amber-400 shadow-[0_0_8px_#FFBF4F]" />
              <div className="w-2.5 h-[2px] bg-amber-400 shadow-[0_0_8px_#FFBF4F]" />
            </motion.div>
          ) : isHovered ? (
            <motion.div
              key="hand"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{
                opacity: 1,
                scale: isClicked ? 0.9 : 1.15,
                rotate: 0,
              }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.12 }}
              className="w-8 h-8"
            >
              <img
                src="/images/hand_cursor.png"
                alt="pointer cursor"
                className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
              />
            </motion.div>
          ) : (
            /* Modern Sleek Rounded Cursor */
            <motion.div
              key="rounded-cursor"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{
                opacity: 1,
                scale: isClicked ? 0.75 : 1,
              }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="relative flex items-center justify-center w-6 h-6"
            >
              <div className="absolute inset-0 rounded-full border border-amber-400/40 bg-amber-400/10 shadow-[0_0_12px_rgba(245,158,11,0.35)] backdrop-blur-[0.5px]" />
              <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#FFBF4F]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
