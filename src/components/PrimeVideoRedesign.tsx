"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Monitor,
  X,
  Menu,
  ArrowLeft
} from "lucide-react";
import Logo from "./Logo";

interface PrimeVideoRedesignProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrimeVideoRedesign({ isOpen, onClose }: PrimeVideoRedesignProps) {
  const [activeTab, setActiveTab] = useState<"figma" | "case-study">("figma");
  const [figmaView, setFigmaView] = useState<"desktop" | "mobile">("desktop");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [modalMenuOpen, setModalMenuOpen] = useState(false);

  const handleNavLinkClick = (targetId: string) => {
    setModalMenuOpen(false);
    onClose();
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      const container = e.currentTarget.getBoundingClientRect();
      handleMove(e.touches[0].clientX, container);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1 || isDragging) {
      const container = e.currentTarget.getBoundingClientRect();
      handleMove(e.clientX, container);
    }
  };

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
        className="fixed inset-0 z-50 bg-[#070709] overflow-y-auto flex flex-col font-sans text-neutral-100 select-none text-left lg:cursor-default animate-fade-in"
      >
        {/* Sticky Header Navigation */}
        <header className="sticky top-0 z-[100] w-full px-4 md:px-8 py-3.5 flex justify-between items-center bg-[#070709]/85 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center gap-3.5">
            <Logo forceShowTextOnMobile={false} onClick={() => handleNavLinkClick("projects")} />
            
            <button
              onClick={onClose}
              className="flex items-center justify-center p-2 rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer active:scale-95 shadow-lg shadow-black/20"
              aria-label="Back to Portfolio"
              title="Back to Portfolio"
            >
              <ArrowLeft size={16} className="stroke-[2.5]" />
            </button>
          </div>

          {/* Right Side Content - Tabs + Hamburger */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Tab Toggles for case study vs figma */}
            <div className="flex bg-[#121216] border border-white/5 p-1 rounded-full">
              <button
                onClick={() => setActiveTab("figma")}
                className={`px-3 py-1.5 md:px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === "figma"
                    ? "bg-[#FFBF4F] text-black font-extrabold shadow-[0_0_15px_rgba(255,191,79,0.3)]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Prototype
              </button>
              <button
                onClick={() => setActiveTab("case-study")}
                className={`px-3 py-1.5 md:px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === "case-study"
                    ? "bg-[#FFBF4F] text-black font-extrabold shadow-[0_0_15px_rgba(255,191,79,0.3)]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Case Study
              </button>
            </div>
            
            {/* Unified Hamburger Button */}
            <button 
              onClick={() => setModalMenuOpen(true)}
              className="text-white/80 hover:text-white hover:bg-white/5 border border-white/10 rounded-full p-2.5 transition-all duration-300 focus:outline-none cursor-pointer flex items-center justify-center"
              aria-label="Open Navigation Menu"
            >
              <Menu size={20} className="stroke-[2.5]" />
            </button>
          </div>
        </header>

        {/* Sliding Navigation Drawer */}
        <AnimatePresence>
          {modalMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setModalMenuOpen(false)}
                className="fixed inset-0 bg-black z-[140] backdrop-blur-sm cursor-pointer"
              />
              {/* Sliding Drawer Panel */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 bottom-0 w-full sm:max-w-md bg-[#0a0a0d]/95 backdrop-blur-2xl border-l border-white/5 z-[150] flex flex-col justify-between p-8 select-none text-left shadow-2xl"
              >
                <div className="flex justify-between items-center w-full">
                  <Logo forceShowTextOnMobile={true} onClick={() => {
                    setModalMenuOpen(false);
                    onClose();
                  }} />
                  <button 
                    onClick={() => setModalMenuOpen(false)}
                    className="text-white/80 hover:text-white hover:bg-white/5 border border-white/10 rounded-full p-2 transition-all duration-300 focus:outline-none cursor-pointer"
                    aria-label="Close Menu"
                  >
                    <X size={20} className="stroke-[2.5]" />
                  </button>
                </div>

                {/* Portfolio Navigation Links */}
                <nav className="flex flex-col gap-6 my-auto text-left pl-4">
                  <span className="text-[10px] uppercase tracking-widest text-[#FFBF4F] font-black mb-1">Portfolio</span>
                  {[
                    { name: "Experience", target: "experience" },
                    { name: "Skills", target: "skills" },
                    { name: "Work", target: "projects" },
                    { name: "Contact", target: "contact" }
                  ].map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleNavLinkClick(item.target)}
                      className="text-3xl font-black uppercase tracking-wider text-white/70 hover:text-[#FFBF4F] active:text-[#FFBF4F] text-left transition-colors cursor-pointer bg-transparent border-none"
                    >
                      {item.name}
                    </button>
                  ))}
                  
                  {/* Resume CTA */}
                  <a 
                    href="file:///Users/rac/Downloads/Ashish%20C%20Mali%20Resume.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-3xl font-black uppercase tracking-wider text-amber-400 hover:text-amber-300 text-left transition-colors mt-2"
                  >
                    Resume
                  </a>
                </nav>

                <div className="flex flex-col gap-4 text-left pl-4">
                  <button
                    onClick={onClose}
                    className="w-full py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white text-xs font-black uppercase tracking-widest transition-all duration-300 active:scale-95 cursor-pointer text-center"
                  >
                    Close Case Study
                  </button>
                  <div className="text-[10px] tracking-[0.25em] text-gray-500 uppercase font-black">
                    © 2026 ASHISH MALI • CREATIVE PORTFOLIO
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Dynamic Inner Content */}
        <div className="flex-1 flex flex-col bg-[#070709]">
          
          {/* TAB 1: FIGMA INTERACTIVE EMBEDS */}
          {activeTab === "figma" && (
            <div className="flex-1 flex flex-col p-6 md:p-12 pb-24 bg-[#0a0a0d]">
              {/* Figma View Controls */}
              <div className="max-w-7xl mx-auto w-full mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <h3 className="text-2xl font-light text-white">
                    Figma <span className="font-extrabold text-amber-400">Interactive Prototypes</span>
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
                    {/* Brand Logo PNG */}
                    <div className="w-[180px] h-auto text-left select-none mb-4">
                      <img
                        src="/images/primevideo_logo_new.png"
                        alt="Prime Video Redesign"
                        className="w-full h-auto object-contain"
                      />
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight uppercase">
                      Redesigning the entertainment landing experience
                    </h1>
                    <p className="text-lg text-neutral-300 font-light max-w-xl leading-relaxed">
                      Restructuring Information Architecture, visual cues, and cross-platform consistency to deliver an immersive cinematic journey.
                    </p>
                  </div>

                  <div className="lg:col-span-6 relative flex justify-center items-center w-full">
                    <div className="absolute inset-0 bg-[#FFBF4F]/10 rounded-full blur-[120px] pointer-events-none" />
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="relative w-full flex items-center justify-center cursor-zoom-in"
                    >
                      <img 
                        src="/images/primevideo_hero_new.png" 
                        alt="Prime Video Redesign Integrated View"
                        onClick={() => setLightboxImage("/images/primevideo_hero_new.png")}
                        className="w-full h-auto object-contain hover:scale-[1.02] transition-transform duration-500"
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
                      <span className="text-xs font-bold tracking-[0.3em] text-[#FFBF4F] uppercase block mb-1">
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

                  </div>

                  <div className="lg:col-span-5 relative group cursor-zoom-in">
                    <img 
                      src="/images/primevideo_brief_final.png" 
                      alt="Prime Video Case Study Brief Sheet"
                      onClick={() => setLightboxImage("/images/primevideo_brief_final.png")}
                      className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Style Guide Section */}
              <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 space-y-12 border-b border-white/5">
                <div className="text-left">
                  <span className="text-xs font-bold tracking-[0.3em] text-[#FFBF4F] uppercase block mb-1">
                    Design Tokens
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                    Style Guide
                  </h2>
                  <p className="text-sm text-neutral-400 font-light mt-2 max-w-2xl leading-relaxed">
                    A rigorous design system implemented to maintain high visual impact, cinematic focus, and unified component structure. Click the style guide sheet below to expand.
                  </p>
                </div>

                <div className="relative max-w-[578px] mx-auto cursor-zoom-in group rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0b0c10]">
                  <img 
                    src="/images/primevideo_styleguide_v2.jpg" 
                    alt="Prime Video Redesign Style Guide Sheet"
                    onClick={() => setLightboxImage("/images/primevideo_styleguide_v2.jpg")}
                    className="w-full h-auto object-contain group-hover:scale-[1.01] transition-transform duration-500"
                  />
                </div>
              </div>

              {/* 4. Desktop Interface Detail Spacer */}
              <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-b border-white/5">
                <div className="relative max-w-[1024px] mx-auto overflow-hidden rounded-2xl border border-white/10 bg-[#070709] cursor-zoom-in group shadow-2xl">
                  <img 
                    src="/images/primevideo_desktop_spacer_v2.png" 
                    alt="Wide desktop layout showcase spacer"
                    onClick={() => setLightboxImage("/images/primevideo_desktop_spacer_v2.png")}
                    className="w-full h-auto object-contain group-hover:scale-[1.01] transition-transform duration-500"
                  />
                </div>
              </div>

              {/* 5. Comparative Design Evolution & Slider */}
              <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 space-y-12 border-b border-white/5">
                <div className="text-left space-y-2">
                  <span className="text-xs font-bold tracking-[0.3em] text-[#FFBF4F] uppercase block mb-1">
                    Comparative Evolution
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase">
                    Landing Page Redesign
                  </h2>
                  <p className="text-sm text-neutral-400 font-light max-w-2xl leading-relaxed">
                    Interact directly with the comparison slider on the left to see the transformation from our baseline structure to the high-fidelity cinematic layout. On the right, explore the new mobile adaptive blueprint.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  {/* Left Column: Draggable Slider */}
                  <div className="lg:col-span-8 space-y-4">
                    <span className="text-[10px] uppercase font-black tracking-widest text-[#FFBF4F] block">
                      Desktop Evolution Slider (Drag horizontally to compare)
                    </span>
                    <div 
                      className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#070709] cursor-ew-resize select-none shadow-2xl"
                      onMouseMove={handleMouseMove}
                      onTouchMove={handleTouchMove}
                      onMouseDown={() => setIsDragging(true)}
                      onMouseUp={() => setIsDragging(false)}
                      onMouseLeave={() => setIsDragging(false)}
                      onTouchStart={() => setIsDragging(true)}
                      onTouchEnd={() => setIsDragging(false)}
                    >
                      {/* Background Layer: NEW design */}
                      <img 
                        src="/images/primevideo_desktop_new_full.png" 
                        alt="Redesigned Prime Video layout"
                        className="w-full h-auto block pointer-events-none"
                      />
                      
                      {/* Foreground Layer (Clipped): OLD design */}
                      <div 
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        style={{
                          clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
                        }}
                      >
                        <img 
                           src="/images/primevideo_before_full.png" 
                          alt="Original Prime Video layout"
                          className="absolute inset-0 w-full h-full object-fill pointer-events-none"
                        />
                      </div>

                      {/* Glassmorphic Labels */}
                      <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-md bg-black/60 border border-white/10 backdrop-blur-md text-[10px] font-black uppercase text-red-400 tracking-wider pointer-events-none">
                        Old Design
                      </div>
                      <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-md bg-black/60 border border-white/10 backdrop-blur-md text-[10px] font-black uppercase text-amber-400 tracking-wider pointer-events-none">
                        New Design
                      </div>

                      {/* Slider Control Line & Circular Handle */}
                      <div 
                        className="absolute top-0 bottom-0 w-[2px] bg-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.8)] pointer-events-none z-20"
                        style={{ left: `${sliderPosition}%` }}
                      />
                      <div 
                        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#FFBF4F] border border-amber-300 text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,191,79,0.6)] cursor-ew-resize pointer-events-none z-30 font-black text-lg select-none"
                        style={{ left: `${sliderPosition}%` }}
                      >
                        ↔
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Mobile View Directly */}
                  <div className="lg:col-span-4 space-y-4">
                    <span className="text-[10px] uppercase font-black tracking-widest text-[#FFBF4F] block">
                      New Mobile Design Mockup
                    </span>
                    <div 
                      className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#070709] cursor-zoom-in group shadow-2xl"
                      onClick={() => setLightboxImage("/images/primevideo_mobile_new.png")}
                    >
                      <img 
                        src="/images/primevideo_mobile_new.png" 
                        alt="Redesigned Prime Video mobile view"
                        className="w-full h-auto object-contain max-h-[600px] group-hover:scale-[1.02] transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 7. Footer CTA Block */}
              <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16">
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0d1624] via-[#080d16] to-[#070709] border border-white/5 p-12 md:p-20 text-center space-y-8 flex flex-col items-center">
                  <div className="absolute inset-0 bg-[#FFBF4F]/5 blur-[60px] pointer-events-none" />
                  
                  <div className="space-y-4 max-w-2xl relative z-10">
                    <h3 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight uppercase">
                      Ready to transform your business?
                    </h3>
                    <p className="text-lg text-neutral-300 font-light">
                      Let&apos;s build something extraordinary together.
                    </p>
                  </div>

                  <div className="relative z-10 pt-4 flex flex-col sm:flex-row gap-4 items-center justify-center">
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
                      className="px-8 py-4 rounded-full bg-[#FFBF4F] hover:bg-[#FFE082] text-black font-extrabold uppercase tracking-widest text-xs transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,191,79,0.4)] active:scale-95 cursor-pointer w-full sm:w-auto"
                    >
                      Contact me
                    </button>
                    
                    <a
                      href="https://www.behance.net/gallery/219780733/Prime-Video-Redesigned-Landing-Page-%28Lean-UX%29"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 rounded-full bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 hover:border-[#FFBF4F] text-white font-extrabold uppercase tracking-widest text-xs transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center gap-2 w-full sm:w-auto"
                    >
                      <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.228 15.011H6v-2.316h2.228c.454 0 .81.103 1.066.309.256.206.384.498.384.877 0 .368-.124.656-.37.863-.248.207-.599.31-.552.31zM8.01 9.422H6v-2.002h1.902c.402 0 .717-.086.944-.257.227-.172.34-.438.34-.8 0-.342-.116-.595-.347-.759-.232-.164-.56-.245-.829-.245v.259zm13.762 1.341h-4.382c.041-.663.226-1.168.555-1.516.329-.348.783-.522 1.362-.522.531 0 .951.157 1.258.471.307.314.475.753.504 1.317.703-.105.703-.105.703-.75zM24 12c0-6.627-5.373-12-12-12S0 5.373 0 12s5.373 12 12 12 12-5.373 12-12zm-12.72 1.701c-.139.544-.442.973-.912 1.29-.469.316-1.042.475-1.72.475H4V7.075h5.059c.72 0 1.295.148 1.723.444.428.297.642.715.642 1.255 0 .54-.207.954-.62 1.24-.413.287-.936.43-1.57.43v.041c.783.082 1.378.361 1.785.836.407.475.611 1.077.611 1.808v.572zm8.683-1.924h-5.068c.039.733.25 1.302.632 1.705.382.403.905.605 1.57.605.514 0 .937-.099 1.267-.297.33-.198.599-.481.806-.85l.993.582c-.347.595-.826 1.057-1.439 1.385-.612.329-1.347.493-2.204.493-1.229 0-2.207-.384-2.934-1.15-.727-.767-1.09-1.809-1.09-3.125 0-1.332.355-2.385 1.066-3.159.71-.774 1.637-1.162 2.78-1.162 1.155 0 2.062.366 2.72.502.658.502.987 1.25.987 2.247v.728zm-3.856-4.992h3.364v-.69h-3.364v.69z"/>
                      </svg>
                      <span>View on Behance</span>
                    </a>
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
                className="mx-auto h-auto max-h-[85vh] max-w-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}
