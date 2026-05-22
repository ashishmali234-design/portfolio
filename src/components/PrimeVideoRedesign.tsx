"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ExternalLink,
  Smartphone,
  Monitor,
  BookOpen,
  Sparkles,
  X
} from "lucide-react";

interface PrimeVideoRedesignProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrimeVideoRedesign({ isOpen, onClose }: PrimeVideoRedesignProps) {
  const [activeTab, setActiveTab] = useState<"figma" | "case-study">("figma");
  const [figmaView, setFigmaView] = useState<"desktop" | "mobile">("desktop");
  const [comparisonView, setComparisonView] = useState<"before" | "after">("after");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Prevent background scrolling when overlay is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 120 }}
        className="fixed inset-0 z-50 bg-[#070709] overflow-y-auto flex flex-col font-sans text-neutral-100 select-none text-left"
      >
        {/* Navigation & Controls Top Bar */}
        <div className="sticky top-0 z-[100] bg-[#070709]/95 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6 w-full md:w-auto">
            {/* Immersive Pill Back Button */}
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-300 active:scale-95 shrink-0"
            >
              <ChevronLeft size={16} /> Back to Portfolio
            </button>
            <div className="h-5 w-[1px] bg-white/10 hidden md:block" />
            <h2 className="text-sm font-black tracking-[0.2em] text-cyan-400 uppercase truncate">
              Prime Video Redesign <span className="font-light text-white/50 text-[10px]">Case Study & Prototypes</span>
            </h2>
          </div>

          {/* Core Tab Toggles */}
          <div className="flex bg-[#121216] border border-white/5 p-1 rounded-full w-full md:w-auto overflow-x-auto shrink-0">
            <button
              onClick={() => setActiveTab("figma")}
              className={`flex items-center justify-center gap-1.5 px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 w-full md:w-auto whitespace-nowrap cursor-pointer ${
                activeTab === "figma"
                  ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20 font-black"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Smartphone size={14} /> Figma Prototypes
            </button>
            <button
              onClick={() => setActiveTab("case-study")}
              className={`flex items-center justify-center gap-1.5 px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 w-full md:w-auto whitespace-nowrap cursor-pointer ${
                activeTab === "case-study"
                  ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20 font-black"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <BookOpen size={14} /> UX Insights
            </button>
          </div>
        </div>

        {/* Dynamic Inner Content */}
        <div className="flex-1 flex flex-col bg-[#070709]">
          
          {/* TAB 1: FIGMA INTERACTIVE EMBEDS */}
          {activeTab === "figma" && (
            <div className="flex-1 flex flex-col p-6 md:p-12 pb-24 bg-[#0a0a0d]">
              {/* Figma View Controls */}
              <div className="max-w-7xl mx-auto w-full mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <h3 className="text-2xl font-light text-white">
                    Figma <span className="font-extrabold text-cyan-400">Interactive Prototypes</span>
                  </h3>
                  <p className="text-xs text-neutral-400 font-light mt-1">
                    Play directly with the user flows designed in the Prime Video Lean UX case study.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="https://www.figma.com/design/ReAm71jBATr3A2euzHS1A0/Prime-Video--Copy-?node-id=2602-5155&t=uX89AVLyKb6qtgIg-11"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#F24E1E]/10 hover:bg-[#F24E1E]/20 border border-[#F24E1E]/20 text-[#F24E1E] text-xs font-bold uppercase tracking-wider transition-all duration-300"
                  >
                    Open Figma File <ExternalLink size={12} />
                  </a>
                  
                  <div className="flex bg-[#121216] border border-white/5 p-1 rounded-lg">
                    <button
                      onClick={() => setFigmaView("desktop")}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                        figmaView === "desktop"
                          ? "bg-white/10 text-white font-extrabold"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      <Monitor size={14} /> Desktop Prototype
                    </button>
                    <button
                      onClick={() => setFigmaView("mobile")}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                        figmaView === "mobile"
                          ? "bg-white/10 text-white font-extrabold"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      <Smartphone size={14} /> Mobile Prototype
                    </button>
                  </div>
                </div>
              </div>

              {/* Viewport Render */}
              <div className="flex-1 flex justify-center items-center w-full max-w-7xl mx-auto relative min-h-[500px]">
                {figmaView === "desktop" ? (
                  /* Desktop Embed Frame */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full h-full min-h-[600px] rounded-3xl overflow-hidden border border-white/5 bg-[#121216]/50 p-3 shadow-2xl relative"
                  >
                    <div className="absolute top-4 left-6 flex gap-1.5 z-10">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <iframe
                      style={{ border: "none" }}
                      width="100%"
                      height="100%"
                      src="https://embed.figma.com/proto/mqD4Qed8LIwK2LCaXbB2bc/Prime-Video?node-id=519-1046&viewport=-163%2C261%2C0.17&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1&embed-host=share"
                      allowFullScreen
                      className="w-full h-full min-h-[580px] rounded-2xl bg-black"
                    />
                  </motion.div>
                ) : (
                  /* Mobile Embed Frame */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full h-full min-h-[600px] rounded-3xl overflow-hidden border border-white/5 bg-[#121216]/50 p-3 shadow-2xl relative"
                  >
                    <div className="absolute top-4 left-6 flex gap-1.5 z-10">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <iframe
                      style={{ border: "none" }}
                      width="100%"
                      height="100%"
                      src="https://embed.figma.com/proto/mqD4Qed8LIwK2LCaXbB2bc/Prime-Video?node-id=442-6739&viewport=55%2C271%2C0.41&scaling=scale-down&content-scaling=fixed&page-id=107%3A528&embed-host=share"
                      allowFullScreen
                      className="w-full h-full min-h-[580px] rounded-2xl bg-black"
                    />
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: BEHANCE CASE STUDY INSIGHTS */}
          {activeTab === "case-study" && (
            <div className="flex-1 max-w-4xl mx-auto px-6 md:px-12 py-16 pb-32">
              <div className="space-y-16">
                
                {/* 1. Immersive Cover Image Hero with click-to-zoom Lightbox */}
                <div className="relative group/cover rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-zoom-in bg-black">
                  <img
                    src="/images/primevideo_background.png"
                    alt="Prime Video 3D embossed logo background"
                    onClick={() => setLightboxImage("/images/primevideo_background.png")}
                    className="w-full h-auto object-cover aspect-[21/9] transition-transform duration-700 ease-out group-hover/cover:scale-[1.02]"
                  />
                  {/* Backdrop glowing content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 pointer-events-none" />
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 text-left pointer-events-none">
                    <span className="text-xs font-bold tracking-[0.3em] text-cyan-400 uppercase block mb-2">
                      Figma Original Design Showcase
                    </span>
                    <h3 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase leading-none">
                      Prime Video Redesign
                    </h3>
                    <p className="text-sm text-neutral-300 font-light mt-2 max-w-lg hidden md:block">
                      Restructuring Information Architecture, visual cues, and platform consistency around real design mockups.
                    </p>
                  </div>
                  <div className="absolute bottom-4 right-6 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-[10px] font-bold text-white/80 uppercase tracking-widest pointer-events-none group-hover/cover:text-white transition-colors duration-300">
                    <Sparkles size={12} className="text-cyan-400" /> Click to Expand Wallpaper
                  </div>
                </div>

                {/* Intro */}
                <div className="text-left space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <span className="text-xs font-bold tracking-[0.3em] text-cyan-400 uppercase block">
                        Product Design Case Study
                      </span>
                      <h3 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
                        Lean UX Redesign
                      </h3>
                    </div>
                    <div className="flex gap-3 shrink-0">
                      <a
                        href="https://www.figma.com/design/ReAm71jBATr3A2euzHS1A0/Prime-Video--Copy-?node-id=2602-5155&t=uX89AVLyKb6qtgIg-11"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-full bg-[#F24E1E]/10 hover:bg-[#F24E1E]/20 border border-[#F24E1E]/20 text-[#F24E1E] text-xs font-extrabold uppercase tracking-wider transition-all"
                      >
                        Inspect Figma Design <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                  <p className="text-lg text-neutral-300 font-light leading-relaxed">
                    A comprehensive strategic overhaul of Amazon Prime Video&apos;s landing portal, solving content discoverability and subscription flow clutter through structured UX refinement.
                  </p>
                  <div className="pt-2">
                    <a
                      href="https://www.behance.net/gallery/219780733/Prime-Video-Redesigned-Landing-Page-%28Lean-UX%29"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 tracking-wider uppercase transition-colors"
                    >
                      View Original Behance Presentation <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

                <div className="h-[1px] w-full bg-white/5" />

                {/* 2. Interactive Before vs. After Design Comparison */}
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h4 className="text-xl font-bold tracking-tight text-white uppercase flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" /> Before vs. After Comparison
                      </h4>
                      <p className="text-xs text-neutral-400 font-light mt-1">
                        Compare the baseline Amazon Prime portal with our tailored Lean UX Redesign mockup.
                      </p>
                    </div>

                    <div className="flex bg-[#121216] border border-white/5 p-1 rounded-lg shrink-0">
                      <button
                        onClick={() => setComparisonView("before")}
                        className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                          comparisonView === "before"
                            ? "bg-red-500/10 border border-red-500/20 text-red-400 font-extrabold"
                            : "text-white/50 hover:text-white"
                        }`}
                      >
                        Original (Before)
                      </button>
                      <button
                        onClick={() => setComparisonView("after")}
                        className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                          comparisonView === "after"
                            ? "bg-green-500/10 border border-green-500/20 text-green-400 font-extrabold"
                            : "text-white/50 hover:text-white"
                        }`}
                      >
                        Redesigned (After)
                      </button>
                    </div>
                  </div>

                  {/* Render Comparison Image Frame with high-fidelity transition */}
                  <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black cursor-zoom-in group/comparison">
                    <AnimatePresence mode="wait">
                      {comparisonView === "before" ? (
                        <motion.img
                          key="comparison-before"
                          src="/images/primevideo_before.png"
                          alt="Original Amazon Prime Video landing page"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.4 }}
                          onClick={() => setLightboxImage("/images/primevideo_before.png")}
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <motion.img
                          key="comparison-after"
                          src="/images/primevideo_desktop.png"
                          alt="Redesigned Amazon Prime Video landing page mockup"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.4 }}
                          onClick={() => setLightboxImage("/images/primevideo_desktop.png")}
                          className="w-full h-full object-cover object-top"
                        />
                      )}
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Visual Label */}
                    <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest pointer-events-none border ${
                      comparisonView === "before" 
                        ? "bg-red-500/10 border-red-500/20 text-red-400" 
                        : "bg-green-500/10 border-green-500/20 text-green-400"
                    }`}>
                      {comparisonView === "before" ? "Original Cluttered Layout" : "Lean High-Fidelity UI"}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-[10px] font-bold text-white/80 uppercase tracking-widest pointer-events-none group-hover/comparison:text-white transition-colors duration-300">
                      <Sparkles size={12} className="text-cyan-400" /> Click to Expand View
                    </div>
                  </div>
                </div>

                <div className="h-[1px] w-full bg-white/5" />

                {/* 3. Cross-Platform Showcase Device Mockups */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-bold tracking-tight text-white uppercase flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> Responsive Cross-Platform Showcase
                    </h4>
                    <p className="text-xs text-neutral-400 font-light mt-1">
                      Meticulously designed layouts tailored dynamically for desktop browsers and mobile devices.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Desktop Mockup Frame */}
                    <div className="glass-card p-4 rounded-3xl border border-white/5 bg-[#121216]/40 backdrop-blur-md flex flex-col justify-between group/desk shadow-lg">
                      <div className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-black/40 border border-white/5 cursor-zoom-in">
                        <img
                          src="/images/primevideo_desktop_angled.png"
                          alt="Redesigned Prime Video desktop viewport mockup"
                          onClick={() => setLightboxImage("/images/primevideo_desktop_angled.png")}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/desk:scale-[1.03]"
                        />
                        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full flex items-center gap-1 text-[9px] font-bold text-white/80 uppercase tracking-widest pointer-events-none group-hover/desk:text-white transition-colors duration-300">
                          <Sparkles size={10} className="text-cyan-400" /> Expand
                        </div>
                      </div>
                      <div className="mt-4 text-left">
                        <h5 className="text-sm font-bold text-white uppercase tracking-wide">Desktop Cinematic Frame</h5>
                        <p className="text-xs text-neutral-400 font-light leading-relaxed mt-1">
                          Leveraging wide aspect ratios to render custom backlit ambient glows, persistent spycarousels, and visual genre collections.
                        </p>
                      </div>
                    </div>

                    {/* Mobile Mockup Frame */}
                    <div className="glass-card p-4 rounded-3xl border border-white/5 bg-[#121216]/40 backdrop-blur-md flex flex-col justify-between group/mob shadow-lg">
                      <div className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-black/40 border border-white/5 cursor-zoom-in flex items-center justify-center">
                        <img
                          src="/images/primevideo_mobile.png"
                          alt="Redesigned Prime Video mobile viewport mockup"
                          onClick={() => setLightboxImage("/images/primevideo_mobile.png")}
                          className="h-full w-auto object-contain py-2 transition-transform duration-700 group-hover/mob:scale-[1.04]"
                        />
                        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full flex items-center gap-1 text-[9px] font-bold text-white/80 uppercase tracking-widest pointer-events-none group-hover/mob:text-white transition-colors duration-300">
                          <Sparkles size={10} className="text-cyan-400" /> Expand
                        </div>
                      </div>
                      <div className="mt-4 text-left">
                        <h5 className="text-sm font-bold text-white uppercase tracking-wide">Mobile Adaptive Layout</h5>
                        <p className="text-xs text-neutral-400 font-light leading-relaxed mt-1">
                          Optimizing details to match touch targets and layout heights, ensuring high visibility without compromising brand aesthetics.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-[1px] w-full bg-white/5" />

                {/* 4. Embedded Interactive Behance Project */}
                <div className="space-y-6 text-center">
                  <h4 className="text-xl font-bold tracking-tight text-white uppercase text-left flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> Embedded Behance Presentation
                  </h4>
                  <div className="flex justify-center">
                    <div className="relative w-full max-w-[600px] aspect-[404/316] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#121216]/50 p-2">
                      <iframe
                        src="https://www.behance.net/embed/project/219780733?ilo0=1"
                        height="100%"
                        width="100%"
                        allowFullScreen
                        loading="lazy"
                        frameBorder="0"
                        allow="clipboard-write"
                        referrerPolicy="strict-origin-when-cross-origin"
                        className="w-full h-full rounded-2xl bg-black"
                      />
                    </div>
                  </div>
                </div>

                <div className="h-[1px] w-full bg-white/5" />

                {/* Grid Insights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                  
                  {/* Problem */}
                  <div className="glass-card p-8 rounded-3xl space-y-4 border border-white/5 bg-[#121216]/40 backdrop-blur-md">
                    <h4 className="text-xl font-bold tracking-tight text-white uppercase flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> The Problem
                    </h4>
                    <p className="text-sm text-neutral-300 font-light leading-relaxed">
                      Amazon Prime Video&apos;s landing portal suffers from severe cognitive load. Visual hierarchy is cluttered, the global navigation is highly nested and obscure, and original content tags compete aggressively with rented assets, creating transactional friction.
                    </p>
                  </div>

                  {/* Core Idea */}
                  <div className="glass-card p-8 rounded-3xl space-y-4 border border-white/5 bg-[#121216]/40 backdrop-blur-md">
                    <h4 className="text-xl font-bold tracking-tight text-white uppercase flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500" /> The Lean Solution
                    </h4>
                    <p className="text-sm text-neutral-300 font-light leading-relaxed">
                      We restructured the landing portal around high-impact immersive rows and a clean, dynamic category system. The global header was simplified to expose active streaming choices immediately, and movie cards were enhanced with visual ratings, matching factors, and instant watchlist shortcuts.
                    </p>
                  </div>
                </div>

                {/* Key UX Enhancements */}
                <div className="space-y-6 text-left">
                  <h4 className="text-2xl font-bold tracking-tight text-white uppercase">
                    Core UX Enhancements
                  </h4>
                  
                  <div className="space-y-4">
                    {[
                      {
                        title: "1. Immersive Hero Teaser Carousel",
                        desc: "High-impact key art with dynamic backlighting colors that match the cinematic content. Direct action options for trailers and watchlists reduce discovery loops."
                      },
                      {
                        title: "2. Flattened Information Architecture",
                        desc: "Simplified structural channels ('Movies', 'TV Shows', 'Sports', 'My Stuff') directly visible in the global navigation bar, providing instantaneous paths."
                      },
                      {
                        title: "3. Interactive Ratings & Badging System",
                        desc: "Clear visual indicators for IMDb score, maturity constraints, and personal match percentage on hovering, optimizing critical selection criteria."
                      },
                      {
                        title: "4. Clean Premium Subscription Flow",
                        desc: "Removed complex checkout widgets and replaced them with seamless, glassmorphic selection panels that highlight the raw value of the Prime tier."
                      }
                    ].map((item, idx) => (
                      <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-2">
                        <h5 className="text-sm font-bold text-cyan-400 uppercase tracking-wide">
                          {item.title}
                        </h5>
                        <p className="text-xs text-neutral-300 font-light leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-[1px] w-full bg-white/5" />

                {/* Design Philosophy Footer */}
                <div className="p-8 rounded-3xl bg-gradient-to-r from-cyan-500/5 to-transparent border border-cyan-500/10 flex flex-col md:flex-row items-center gap-6 text-left">
                  <div className="p-4 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    <Sparkles size={28} />
                  </div>
                  <div>
                    <h5 className="text-lg font-bold text-white uppercase tracking-wide mb-1">
                      Lean Research, Iterative Designs
                    </h5>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed">
                      By focusing heavily on rapid prototyping and user journey mappings, we transformed the landing portal from a complex e-commerce catalog layout into an immersive, premium cinema experience.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </motion.div>

      {/* Lightbox Modal for Cover Image & Other Design Showcase Images */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all z-[210] active:scale-95"
            >
              <X size={20} />
            </button>
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-7xl max-h-[90vh] overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImage}
                alt="Prime Video design showcase high resolution view"
                className="w-full h-auto max-h-[85vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}
