"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const parentOrigin = typeof window !== "undefined" ? window.location.origin : "";
  const iframeUrl = `https://assistloop.ai/embed/chatwidget?agentId=d60874c9-63c1-43cf-ad18-17e354054deb&parentOrigin=${encodeURIComponent(parentOrigin)}`;

  return (
    <>
      {/* Custom Floating Chat Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-[#12141c]/90 border border-amber-500/30 flex items-center justify-center shadow-[0_4px_20px_rgba(245,158,11,0.15)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.35)] cursor-pointer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <img
          src="/images/ai_avatar.png"
          alt="AI Assistant Logo"
          className="w-9 h-9 rounded-full object-contain"
        />
        {/* Pulsing glow ring */}
        <span className="absolute inset-0 rounded-full border border-amber-500/20 animate-ping opacity-75 pointer-events-none" />
      </motion.button>

      {/* Custom Designed Chat Drawer Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-24 right-6 z-[9999] w-[400px] h-[600px] max-h-[calc(100vh-120px)] max-w-[calc(100vw-48px)] bg-[#0d0f14]/95 border border-neutral-800/80 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-800/80 bg-[#12151c]/90">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center">
                  <img
                    src="/images/ai_avatar.png"
                    alt="Ashish AI Avatar"
                    className="w-10 h-10 rounded-full border border-amber-500/40 p-0.5 bg-[#090b0e] object-contain"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#090b0e] rounded-full animate-pulse" />
                </div>
                <div>
                  <h3 className="font-rubik text-sm font-semibold tracking-wide text-white">
                    Ashish AI
                  </h3>
                  <p className="text-[10px] text-neutral-400 font-inter">
                    UX Design Co-pilot
                  </p>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-800/50 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Embedded Iframe Body */}
            <div className="flex-1 w-full bg-[#0a0c10]">
              <iframe
                src={iframeUrl}
                className="w-full h-full border-none"
                allow="clipboard-read; clipboard-write; microphone"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
