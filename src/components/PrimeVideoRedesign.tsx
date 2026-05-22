"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Smartphone,
  Monitor,
  BookOpen,
  X
} from "lucide-react";

interface PrimeVideoRedesignProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrimeVideoRedesign({ isOpen, onClose }: PrimeVideoRedesignProps) {
  const [activeTab, setActiveTab] = useState<"figma" | "case-study">("figma");
  const [figmaView, setFigmaView] = useState<"desktop" | "mobile">("desktop");
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
        className="fixed inset-0 z-50 bg-[#070709] overflow-y-auto flex flex-col font-sans text-neutral-100 select-none text-left lg:cursor-default"
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

          {/* TAB 2: HIGH-FIDELITY CASE STUDY INSIGHTS */}
          {activeTab === "case-study" && (
            <div className="flex-1 w-full bg-[#070709] pb-32">
              {/* 1. Header Banner Hero */}
              <div className="relative w-full overflow-hidden bg-gradient-to-b from-[#0e1724] via-[#090d16] to-[#070709] border-b border-white/5 py-20 px-6 md:px-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6 space-y-6 text-left">
                    {/* Brand Typography */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <span className="text-white text-5xl font-extrabold tracking-tight font-sans">prime</span>
                        <span className="text-[#00A8E1] text-5xl font-extrabold tracking-tight font-sans">video</span>
                      </div>
                      <div className="w-[140px] h-[10px] bg-[#00A8E1] rounded-full scale-y-[-1] origin-top translate-x-4 -translate-y-1" style={{ clipPath: "ellipse(50% 100% at 50% 100%)" }} />
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight uppercase">
                      Redesigning the entertainment landing experience
                    </h1>
                    <p className="text-lg text-neutral-300 font-light max-w-xl leading-relaxed">
                      Restructuring Information Architecture, visual cues, and cross-platform consistency to deliver an immersive cinematic journey.
                    </p>
                  </div>

                  <div className="lg:col-span-6 relative flex justify-center items-center w-full min-h-[300px] md:min-h-[400px]">
                    <div className="absolute inset-0 bg-[#00A8E1]/10 rounded-full blur-[120px] pointer-events-none" />
                    {/* Device composite images floating together */}
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="relative w-full flex items-center justify-center"
                    >
                      <img 
                        src="/images/primevideo_desktop.png" 
                        alt="Desktop redesign front view"
                        onClick={() => setLightboxImage("/images/primevideo_desktop.png")}
                        className="w-[80%] h-auto rounded-xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-white/10 cursor-zoom-in hover:scale-[1.02] transition-transform duration-500 z-10"
                      />
                      <img 
                        src="/images/primevideo_mobile.png" 
                        alt="Mobile redesign notch view"
                        onClick={() => setLightboxImage("/images/primevideo_mobile.png")}
                        className="absolute right-0 bottom-[-30px] w-[28%] h-auto shadow-[0_20px_45px_rgba(0,0,0,0.9)] border border-white/10 rounded-2xl cursor-zoom-in hover:scale-[1.05] transition-transform duration-500 z-20"
                      />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* 2. Project Brief Section */}
              <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 border-b border-white/5">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                  <div className="lg:col-span-7 text-left space-y-8">
                    <div>
                      <span className="text-xs font-bold tracking-[0.3em] text-[#00A8E1] uppercase block mb-1">
                        Overview
                      </span>
                      <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                        Project Brief
                      </h2>
                    </div>
                    
                    <p className="text-base text-neutral-300 font-light leading-relaxed">
                      This case study focuses on restructuring the Amazon Prime Video landing page experience. The existing portal features complex information hierarchies, transactional clutter, and a heavy cognitive load that competes aggressively with the pure streaming tier.
                    </p>
                    <p className="text-base text-neutral-300 font-light leading-relaxed">
                      By prioritizing high-impact cinema artwork, simplified channel routes, and intuitive content scoring systems, our redesigned interface bridges the gap between searching and streaming.
                    </p>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 block">Role</span>
                        <span className="text-sm font-bold text-white block">Product Designer</span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 block">Timeline</span>
                        <span className="text-sm font-bold text-white block">4 Weeks (Lean UX)</span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 block">Tools</span>
                        <span className="text-sm font-bold text-white block">Figma, Photoshop</span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#00A8E1] block">Focus</span>
                        <span className="text-sm font-bold text-[#00A8E1] block">Cinematic Interface</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative group cursor-zoom-in">
                    <div className="absolute inset-0 bg-[#00A8E1]/5 rounded-3xl blur-[40px] pointer-events-none" />
                    <img 
                      src="/images/primevideo_desktop_angled.png" 
                      alt="Angled laptop brief mockup"
                      onClick={() => setLightboxImage("/images/primevideo_desktop_angled.png")}
                      className="w-full h-auto object-contain rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Style Guide Section */}
              <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 space-y-24 border-b border-white/5">
                <div className="text-left">
                  <span className="text-xs font-bold tracking-[0.3em] text-[#00A8E1] uppercase block mb-1">
                    Design Tokens
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                    Style Guide
                  </h2>
                  <p className="text-sm text-neutral-400 font-light mt-2 max-w-2xl">
                    A rigorous design system implemented to maintain high visual impact, cinematic focus, and unified component structure.
                  </p>
                </div>

                {/* Grid 1: Colors & Typography */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 text-left">
                  
                  {/* Colors */}
                  <div className="lg:col-span-6 space-y-6">
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider border-b border-white/10 pb-3">Color System</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {/* Swatch 1: Prime Blue */}
                      <div className="space-y-2 group">
                        <div className="h-20 w-full rounded-xl bg-[#00A8E1] border border-white/10 shadow-lg group-hover:scale-95 transition-all duration-300" />
                        <div>
                          <span className="text-xs font-bold text-white block">Prime Blue</span>
                          <span className="text-[10px] text-neutral-500 font-mono block">#00A8E1</span>
                        </div>
                      </div>
                      {/* Swatch 2: White */}
                      <div className="space-y-2 group">
                        <div className="h-20 w-full rounded-xl bg-[#FFFFFF] border border-white/10 shadow-lg group-hover:scale-95 transition-all duration-300" />
                        <div>
                          <span className="text-xs font-bold text-white block">Pure White</span>
                          <span className="text-[10px] text-neutral-500 font-mono block">#FFFFFF</span>
                        </div>
                      </div>
                      {/* Swatch 3: Black */}
                      <div className="space-y-2 group">
                        <div className="h-20 w-full rounded-xl bg-[#000000] border border-white/20 shadow-lg group-hover:scale-95 transition-all duration-300" />
                        <div>
                          <span className="text-xs font-bold text-white block">Deep Obsidian</span>
                          <span className="text-[10px] text-neutral-500 font-mono block">#000000</span>
                        </div>
                      </div>
                      {/* Swatch 4: Grey */}
                      <div className="space-y-2 group">
                        <div className="h-20 w-full rounded-xl bg-[#1A1A1A] border border-white/10 shadow-lg group-hover:scale-95 transition-all duration-300" />
                        <div>
                          <span className="text-xs font-bold text-white block">Secondary Charcoal</span>
                          <span className="text-[10px] text-neutral-500 font-mono block">#1A1A1A</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Typography */}
                  <div className="lg:col-span-6 space-y-6">
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider border-b border-white/10 pb-3">Typography Spec</h3>
                    <div className="flex gap-6 items-start">
                      <span className="text-6xl md:text-7xl font-bold text-white/90 tracking-tighter leading-none shrink-0 font-sans">Aa</span>
                      <div className="space-y-2">
                        <h4 className="text-xl font-bold text-white">Poppins Typeface</h4>
                        <p className="text-xs text-neutral-400 font-light leading-relaxed">
                          Poppins provides unified visual scales across responsive layouts, geometric curves, clean numerical styles, and bold movie banners.
                        </p>
                        <div className="flex gap-2 flex-wrap text-[10px] font-bold text-white/60 tracking-wider uppercase pt-2">
                          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">Light</span>
                          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">Regular</span>
                          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">Medium</span>
                          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-bold">Bold</span>
                          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-black">Black</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Grid 2: Buttons & Form Elements */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 text-left">
                  
                  {/* Interactive Button States */}
                  <div className="lg:col-span-6 space-y-6">
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider border-b border-white/10 pb-3">Standard UI Components</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block">Filled States</span>
                        
                        {/* Primary Button */}
                        <button className="w-full text-center py-3.5 rounded-xl bg-[#00A8E1] hover:bg-[#0092c4] font-bold text-black transition-all duration-300 text-xs uppercase tracking-wider select-none pointer-events-none">
                          Primary Button
                        </button>
                        {/* Primary Hover Glow */}
                        <button className="w-full text-center py-3.5 rounded-xl bg-[#00A8E1] font-bold text-black transition-all duration-300 text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,168,225,0.4)] select-none pointer-events-none">
                          Primary Hovered
                        </button>
                      </div>

                      <div className="space-y-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 block">Outline States</span>
                        
                        {/* Outline Button */}
                        <button className="w-full text-center py-3.5 rounded-xl border border-white/20 bg-transparent hover:bg-white/5 text-white font-bold transition-all duration-300 text-xs uppercase tracking-wider select-none pointer-events-none">
                          Secondary Button
                        </button>
                        {/* Outline Button Hover */}
                        <button className="w-full text-center py-3.5 rounded-xl border border-white bg-white text-black font-bold transition-all duration-300 text-xs uppercase tracking-wider select-none pointer-events-none">
                          Secondary Hovered
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Input Fields */}
                  <div className="lg:col-span-6 space-y-6">
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider border-b border-white/10 pb-3">Form Input States</h3>
                    <div className="space-y-4">
                      {/* Default */}
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase font-bold tracking-widest text-neutral-500">Default State</span>
                        <div className="w-full border border-white/10 bg-[#121216]/50 rounded-xl px-4 py-3 text-xs text-neutral-500 pointer-events-none">
                          Enter your streaming email address...
                        </div>
                      </div>
                      {/* Active/Focused */}
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase font-bold tracking-widest text-[#00A8E1]">Active State</span>
                        <div className="w-full border border-[#00A8E1] bg-[#121216]/80 rounded-xl px-4 py-3 text-xs text-white shadow-[0_0_15px_rgba(0,168,225,0.15)] flex justify-between items-center pointer-events-none">
                          <span>ashishmali@gmail.com</span>
                          <span className="w-1.5 h-4 bg-[#00A8E1] animate-pulse" />
                        </div>
                      </div>
                      {/* Error */}
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase font-bold tracking-widest text-red-500">Error State</span>
                        <div className="w-full border border-red-500 bg-red-500/5 rounded-xl px-4 py-3 text-xs text-white flex justify-between items-center pointer-events-none">
                          <span>ashishmali@gmail</span>
                          <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">Invalid Email</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Grid 3: Partner Brand Channels */}
                <div className="space-y-8 text-left">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider border-b border-white/10 pb-3">Partner Channels</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {[
                      "Lionsgate Play", "discovery+", "BBC Player", "Eros Now", "MUBI",
                      "hoichoi", "Docubay", "ShortsTV", "Manorama Max", "chaupal"
                    ].map((partner) => (
                      <div 
                        key={partner} 
                        className="px-6 py-4 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] hover:border-[#00A8E1]/30 hover:shadow-[0_0_20px_rgba(0,168,225,0.08)] flex items-center justify-center text-center font-bold text-xs text-neutral-400 hover:text-white transition-all duration-300 uppercase tracking-widest h-16 cursor-default"
                      >
                        {partner}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4. Immersive Laptop Backdrop Spacer */}
              <div className="relative w-full bg-black py-24 flex items-center justify-center overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00A8E1]/5 via-transparent to-[#00A8E1]/5 pointer-events-none" />
                <div className="absolute w-[500px] h-[500px] bg-[#00A8E1]/5 rounded-full blur-[140px] pointer-events-none" />
                <div className="max-w-5xl mx-auto w-full px-6 relative cursor-zoom-in group">
                  <img 
                    src="/images/primevideo_desktop.png" 
                    alt="Wide desktop layout showcase"
                    onClick={() => setLightboxImage("/images/primevideo_desktop.png")}
                    className="w-full h-auto rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.9)] border border-white/5 group-hover:scale-[1.01] transition-transform duration-500"
                  />
                  <div className="absolute inset-x-6 bottom-[-20px] h-20 bg-gradient-to-t from-black to-transparent opacity-60 pointer-events-none" />
                </div>
              </div>

              {/* 5. Old Landing Page Section */}
              <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 space-y-12 border-b border-white/5">
                <div className="text-left space-y-2">
                  <span className="text-xs font-bold tracking-[0.3em] text-[#00A8E1] uppercase block mb-1">
                    Baseline Interface Analysis
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase">
                    Old Landing Page
                  </h2>
                  <p className="text-sm text-neutral-400 font-light max-w-2xl leading-relaxed">
                    The original design suffered from heavy visual clutter, obscure nested global navigation, and a dense catalog structure that resulted in transaction friction.
                  </p>
                </div>

                <div className="relative w-full rounded-2xl overflow-hidden border border-red-500/10 shadow-2xl bg-black cursor-zoom-in group/old">
                  <div className="absolute top-4 left-6 flex gap-1.5 z-10">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <img 
                    src="/images/primevideo_before.png" 
                    alt="Original Prime Video landing page clutter"
                    onClick={() => setLightboxImage("/images/primevideo_before.png")}
                    className="w-full h-auto object-cover object-top max-h-[600px] opacity-80 group-hover/old:scale-[1.01] group-hover/old:opacity-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 right-6 px-3 py-1.5 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest pointer-events-none">
                    Baseline Cluttered Grid
                  </div>
                </div>
              </div>

              {/* 6. Redesigned Landing Page Section */}
              <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 space-y-12">
                <div className="text-left space-y-2">
                  <span className="text-xs font-bold tracking-[0.3em] text-[#00A8E1] uppercase block mb-1">
                    Optimized High-Fidelity Mockup
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#00A8E1] tracking-tight uppercase">
                    Redesigned Landing Page
                  </h2>
                  <p className="text-sm text-neutral-400 font-light max-w-2xl leading-relaxed">
                    By prioritizing high-impact cinema artwork, simplified channel routes, ambient backlit glows, and persistent watchlist/rating overlays, the redesigned interface creates an immersive, premium streaming portal.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  {/* Desktop Frame */}
                  <div className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-cyan-500/20 shadow-2xl bg-black cursor-zoom-in group/new">
                    <div className="absolute top-4 left-6 flex gap-1.5 z-10">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <img 
                      src="/images/primevideo_desktop.png" 
                      alt="Redesigned Prime Video desktop view mockup"
                      onClick={() => setLightboxImage("/images/primevideo_desktop.png")}
                      className="w-full h-auto object-cover object-top max-h-[550px] group-hover/new:scale-[1.01] transition-transform duration-700"
                    />
                    <div className="absolute bottom-6 left-6 px-3 py-1.5 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-black uppercase tracking-widest pointer-events-none">
                      Cinematic Fluid Frame
                    </div>
                  </div>

                  {/* Mobile Frame */}
                  <div className="lg:col-span-4 relative rounded-2xl overflow-hidden border border-white/5 bg-[#121216]/40 p-6 flex flex-col justify-center items-center cursor-zoom-in group/newmob">
                    <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden max-h-[500px]">
                      <img 
                        src="/images/primevideo_mobile.png" 
                        alt="Redesigned Prime Video mobile view mockup"
                        onClick={() => setLightboxImage("/images/primevideo_mobile.png")}
                        className="w-full h-full object-contain group-hover/newmob:scale-[1.03] transition-transform duration-700"
                      />
                    </div>
                    <span className="text-[10px] uppercase font-black tracking-widest text-[#00A8E1] mt-6">
                      Mobile Responsive Adaptability
                    </span>
                  </div>
                </div>
              </div>

              {/* 7. Footer CTA Block */}
              <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16">
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0d1624] via-[#080d16] to-[#070709] border border-white/5 p-12 md:p-20 text-center space-y-8 flex flex-col items-center">
                  <div className="absolute inset-0 bg-[#00A8E1]/5 blur-[60px] pointer-events-none" />
                  
                  <div className="space-y-4 max-w-2xl relative z-10">
                    <h3 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight uppercase">
                      Ready to transform your business?
                    </h3>
                    <p className="text-lg text-neutral-300 font-light">
                      Let&apos;s build something extraordinary together.
                    </p>
                  </div>

                  <div className="relative z-10 pt-4">
                    <button 
                      onClick={() => {
                        onClose();
                        // Delay slightly to allow transition and smooth scroll
                        setTimeout(() => {
                          const contactSection = document.getElementById("contact");
                          if (contactSection) {
                            contactSection.scrollIntoView({ behavior: "smooth" });
                          }
                        }, 300);
                      }}
                      className="px-8 py-4 rounded-full bg-[#00A8E1] hover:bg-[#0092c4] text-black font-extrabold uppercase tracking-widest text-xs transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,168,225,0.4)] active:scale-95 cursor-pointer"
                    >
                      Contact me
                    </button>
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
