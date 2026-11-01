"use client";

import { useEffect, useRef } from "react";
import FireCursor from "@/lib/fire-cursor.js";
import SmokeHover from "@/lib/smoke-hover.js";

export default function CustomCursor() {
  const fireInstanceRef = useRef<{ destroy: () => void } | null>(null);
  const smokeInstanceRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFinePointer) return;

    const BOX_SELECTORS = [
      "a",
      "button",
      "input",
      "textarea",
      "select",
      "[role='button']",
      ".glass-card",
      ".fc-glass",
      "[data-fire-edge]",
      "[data-smoke]",
      ".clickable"
    ].join(", ");

    const TEXT_SELECTORS = "h1, h2, h3, h4, [data-smoke-text], .smoke-text, .typewriter-text";
    const ALL_SMOKE_SELECTORS = `${TEXT_SELECTORS}, ${BOX_SELECTORS}`;

    try {
      fireInstanceRef.current = FireCursor.init({
        radius: 14,
        embers: 180,
        glassSelector: ".fc-glass, .glass-card",
        glassStrength: 0.35,
        edgeSelector: BOX_SELECTORS,
        growSelector: BOX_SELECTORS,
        hideCursor: true,
        theme: "dark",
        touch: false,
        respectReducedMotion: true,
        zIndex: 2147483000,
      });
    } catch (err) {
      console.warn("[FireCursor] initialization error:", err);
    }

    try {
      smokeInstanceRef.current = SmokeHover.init({
        selector: ALL_SMOKE_SELECTORS,
        textSelector: TEXT_SELECTORS,
        floatSelector: BOX_SELECTORS,
        float: true,
        density: 1.15,
        linger: 1.05,
        theme: "dark",
        darkSmoke: [0.92, 0.92, 0.95],
        touch: false,
        respectReducedMotion: true,
        zIndex: 2147482000,
      });
    } catch (err) {
      console.warn("[SmokeHover] initialization error:", err);
    }

    return () => {
      if (fireInstanceRef.current?.destroy) {
        fireInstanceRef.current.destroy();
        fireInstanceRef.current = null;
      }
      if (smokeInstanceRef.current?.destroy) {
        smokeInstanceRef.current.destroy();
        smokeInstanceRef.current = null;
      }
    };
  }, []);

  return null;
}
