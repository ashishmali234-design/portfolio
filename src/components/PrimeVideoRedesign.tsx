"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Monitor,
  X,
  Menu
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
          <div className="flex items-center">
            <Logo forceShowTextOnMobile={false} onClick={() => handleNavLinkClick("projects")} />
          </div>

          {/* Right Side Content - Tabs + Hamburger */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Tab Toggles for case study vs figma */}
            <div className="flex bg-[#121216] border border-white/5 p-1 rounded-full">
              <button
                onClick={() => setActiveTab("case-study")}
                className={`px-3 py-1.5 md:px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === "case-study"
                    ? "bg-[#00A8E1] text-black font-extrabold"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Case Study
              </button>
              <button
                onClick={() => setActiveTab("figma")}
                className={`px-3 py-1.5 md:px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === "figma"
                    ? "bg-[#00A8E1] text-black font-extrabold"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Prototype
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
                  <span className="text-[10px] uppercase tracking-widest text-[#00A8E1] font-black mb-1">Portfolio</span>
                  {[
                    { name: "Experience", target: "experience" },
                    { name: "Skills", target: "skills" },
                    { name: "Work", target: "projects" },
                    { name: "Contact", target: "contact" }
                  ].map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleNavLinkClick(item.target)}
                      className="text-3xl font-black uppercase tracking-wider text-white/70 hover:text-[#00A8E1] active:text-[#00A8E1] text-left transition-colors cursor-pointer bg-transparent border-none"
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
                    {/* Brand Logo SVG */}
                    <div className="w-[180px] h-auto text-left select-none mb-4">
                      <svg width="100%" height="auto" viewBox="0 0 385 122" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                        <g clipPath="url(#clip0_2606_6863)">
                          <path fillRule="evenodd" clipRule="evenodd" d="M260.164 37.5753V55.3915C260.064 56.3822 259.619 56.8266 258.629 56.8758C255.958 56.9249 253.334 56.9249 250.661 56.8758C249.67 56.8758 249.226 56.3822 249.128 55.4407C249.077 55.1439 249.077 54.7979 249.077 54.501V20.2545C249.128 18.7211 249.523 18.2749 251.056 18.2749H258.184C259.718 18.2749 260.166 18.7211 260.166 20.2545L260.164 37.5753ZM254.672 0.506021C255.663 0.405859 256.651 0.606184 257.593 1.00137C259.521 1.74258 260.859 3.52547 260.956 5.60339C261.353 10.1071 258.336 12.3835 254.324 12.2833C253.78 12.2833 253.235 12.1832 252.689 12.0848C249.621 11.3436 248.039 8.96704 248.334 5.5524C248.581 2.8298 250.71 0.802867 253.629 0.553371C253.975 0.506021 254.323 0.45685 254.672 0.506021Z" fill="#F0F2FE"/>
                          <path fillRule="evenodd" clipRule="evenodd" d="M302.916 0H296.038C294.159 0 293.811 0.346017 293.811 2.22543V18.2624C293.811 18.6084 293.963 18.9562 293.711 19.3023C293.267 19.2531 293.019 18.9562 292.672 18.7577C287.526 15.7383 282.133 15.1938 276.69 17.7179C272.879 19.4989 270.507 22.7151 268.973 26.5267C267.489 30.189 267.142 34.0499 267.24 37.9598C267.24 41.6222 268.081 45.2353 269.715 48.5006C271.594 52.1137 274.318 54.8855 278.276 56.0729C283.669 57.7556 288.717 56.9143 293.318 53.4996C293.666 53.3029 293.862 52.9551 294.309 52.8549C294.556 53.4013 294.753 53.9932 294.853 54.5869C295.051 55.379 295.745 55.9254 296.585 55.9254H297.772C299.554 55.9254 301.286 55.9746 303.016 55.9254C304.401 55.9254 304.796 55.4792 304.847 54.0442V1.88124C304.795 0.346017 304.4 0 302.916 0ZM293.861 36.4264V45.4338C293.961 46.0275 293.613 46.5702 293.069 46.8197C290.692 48.1564 287.972 48.6991 285.301 48.3039C283.025 48.0562 281.046 46.6704 280.006 44.6434C279.214 43.059 278.768 41.3763 278.62 39.6444C278.223 36.5248 278.471 33.3596 279.212 30.3402C279.46 29.4988 279.758 28.7048 280.203 27.9144C281.242 25.984 283.221 24.7475 285.397 24.5981C288.019 24.3505 290.641 24.8458 293.018 25.9349C293.611 26.1334 293.959 26.7271 293.91 27.3699C293.811 30.4385 293.861 33.407 293.861 36.4264ZM241.613 19.6701C241.695 19.5153 241.928 18.8979 242.008 18.357C242.008 17.7396 241.456 17.6613 240.274 17.5065L234.921 16.8109C234.685 16.8109 233.82 16.7344 233.661 16.7344C233.031 16.7344 232.795 17.4319 232.56 18.2787L227.205 35.6651C226.26 38.6773 225 44.0879 224.528 46.8688H224.37C223.898 44.0114 222.714 38.7556 221.85 35.6651L217.046 18.2787C216.811 17.5065 216.575 16.7344 215.945 16.7344C215.786 16.7344 214.921 16.8109 214.685 16.8109L208.151 17.5065C206.97 17.6613 206.418 17.7396 206.418 18.357C206.496 18.8979 206.733 19.5153 206.811 19.6701L219.331 55.2897C219.646 56.1402 219.725 56.295 220.826 56.295H227.283C228.386 56.295 228.465 56.142 228.78 55.2897L241.613 19.6701ZM340.906 46.8671C340.747 46.5575 340.432 46.2479 340.041 46.2479C338.939 46.2479 335.709 48.7993 330.041 48.7993C322.639 48.7993 321.379 43.4671 321.379 39.14H342.561C344.056 39.14 344.371 38.6756 344.371 37.2078C344.371 27.8581 342.009 16.1155 328.624 16.1135C318.072 16.1135 311.381 24.6128 311.381 36.8982C311.381 51.114 318.626 56.9107 329.019 56.9107C335.237 56.9107 343.112 54.3593 343.112 52.3506C343.112 52.041 343.034 51.7314 342.878 51.5001L340.906 46.8671ZM321.377 31.9556C321.614 29.7921 321.929 23.3016 328.071 23.3016C333.502 23.3016 333.739 28.7868 333.739 31.9556H321.377ZM367.913 49.1853C362.401 49.1853 361.456 43.7 361.456 36.5138C361.456 29.3294 362.48 23.8423 367.913 23.8423C373.346 23.8423 374.37 29.3294 374.37 36.5138C374.37 43.7765 373.425 49.1853 367.913 49.1853ZM385 36.5138C385 24.0736 378.465 16.1152 367.915 16.1152C357.285 16.1152 350.828 24.0736 350.828 36.5138C350.828 48.954 357.285 56.9142 367.915 56.9142C378.543 56.9142 385 48.954 385 36.5138ZM53.2716 55.5996H46.8368C46.4927 55.5996 46.0957 55.5996 45.7498 55.5504C45.1052 55.5012 44.6117 54.9549 44.5607 54.3138C44.5098 53.9168 44.5098 53.5217 44.5098 53.1246V19.4718C44.5098 17.1954 44.7574 16.9477 47.0334 16.9477L51.784 16.9495C53.0713 16.9495 53.6631 17.3939 54.0109 18.6322C54.355 19.8688 54.6536 21.1054 54.9504 22.4439C55.2964 22.3437 55.5932 22.1452 55.7916 21.852C56.6838 20.9597 57.6234 20.1183 58.6121 19.3279C61.1831 17.3483 64.3987 16.3595 67.6179 16.6053C68.9052 16.6545 69.3495 17.0497 69.4497 18.2881C69.5498 19.9708 69.4988 21.7009 69.4988 23.3854C69.548 24.0775 69.4988 24.7221 69.4005 25.416C69.202 26.3084 68.8543 26.6525 67.9657 26.7527C67.272 26.8019 66.6274 26.7527 65.9355 26.7035C62.6197 26.4049 59.406 27.0477 56.2905 28.0876C55.5968 28.3353 55.5968 28.8306 55.5968 29.3733V53.1283C55.5968 53.5745 55.5968 53.9697 55.5476 54.4158C55.4985 55.0587 55.0032 55.554 54.3586 55.554C54.0145 55.5996 53.6176 55.5996 53.2716 55.5996ZM146.455 28.3221C146.455 21.6021 144.721 16.115 137.321 16.115C130.865 16.115 127.478 19.4368 125.116 21.4455C124.171 18.2002 120.472 16.115 117.085 16.115C110.865 16.115 107.402 19.4368 105.038 21.4455C104.171 17.8141 103.541 16.115 102.518 16.115C102.203 16.115 101.81 16.1915 101.336 16.3445L95.3532 18.2767C94.8033 18.4315 94.4883 18.7393 94.4883 19.1272C94.4883 20.9028 95.9832 20.2854 95.9832 31.1813V54.5156C95.9832 55.3642 96.1416 55.5955 97.0866 55.5955H104.882C105.827 55.5955 105.985 55.3624 105.985 54.5156V27.3951C107.006 26.4682 109.607 24.2282 112.913 24.2282C115.905 24.2282 116.22 27.7812 116.22 30.7169V54.5156C116.22 55.3642 116.378 55.5955 117.323 55.5955H125.118C126.061 55.5955 126.22 55.3624 126.22 54.5156V27.3951C127.245 26.4682 129.843 24.2282 133.152 24.2282C136.143 24.2282 136.458 27.7812 136.458 30.7169V54.5156C136.458 55.3642 136.615 55.5955 137.56 55.5955H145.355C146.3 55.5955 146.457 55.3624 146.457 54.5156V28.3221H146.455ZM184.327 46.8669C184.171 46.5573 183.856 46.2477 183.462 46.2477C182.359 46.2477 179.131 48.7991 173.462 48.7991C166.061 48.7991 164.801 43.4668 164.801 39.1398H185.983C187.477 39.1398 187.792 38.6754 187.792 37.2075C187.792 27.8578 185.431 16.1133 172.044 16.1133C161.492 16.1133 154.801 24.6125 154.801 36.898;154.801 51.1138 162.046 56.9105 172.437 56.9105C178.657 56.9105 186.531 54.359;186.531 52.3503C186.531 52.0407 186.452 51.7311 186.294 51.4999L184.327 46.8669ZM164.803 31.9554C165.039 29.7919 165.354 23.3013 171.496 23.3013C176.929 23.3013 177.166 28.7866 177.166 31.9554H164.803ZM84.4669 37.5753V55.3915C84.3667 56.3822 83.9206 56.8266 82.9319 56.8758C80.2607 56.9249 77.6369 56.9249 74.9639 56.8758C73.9734 56.8758 73.5291 56.3822 73.429 55.4407C73.3798 55.1439 73.3798 54.7979 73.3798 54.501V20.2545C73.429 18.7211 73.8241 18.2749 75.3591 18.2749H82.4858C84.0189 18.2749 84.4669 18.7211 84.4669 20.2545V37.5753ZM78.9734 0.506021C79.9639 0.405859 80.9526 0.606184 81.894 1.00137C83.8223 1.74258 85.1606 3.52547 85.2571 5.60339C85.654 10.1071 82.6369 12.3835 78.6256 12.2833C78.0812 12.2833 77.5368 12.1832 76.9905 12.0848C73.9224 11.3436 72.3401 8.96704 72.6369 5.5524C72.8845 2.83344 75.0131 0.804688 77.9319 0.557013C78.2778 0.506021 78.6238 0.45685 78.9734 0.506021ZM37.9534 32.9034C37.7549 30.3301 37.063 27.806 36.0233 25.4786C33.9949 21.2226 30.8776 18.1066 26.1271 17.0176C20.6846 15.8302 15.7848 17.0176 11.331 20.3321C11.0342 20.6271 10.6883 20.8784 10.2913 21.0751C10.193 21.0259 10.0947 20.9749 10.0947 20.9257C9.9472 20.4304 9.84705 19.935 9.69774 19.4397C9.3008 18.2031 8.80554 17.757 7.47087 17.757C5.98689 17.757 4.45375 17.808 2.96795 17.757C1.83176 17.7096 0.792061 17.8571 0 18.7477C0 36.0685 0 53.4404 0.0509833 70.7121C0.693736 71.7519 1.68427 71.9486 2.82229 71.9013C4.60306 71.8521 6.38565 71.9013 8.16642 71.9013C11.2855 71.9013 11.2855 71.9013 11.2855 68.8327V54.7297C11.2855 54.3837 11.1344 53.9867 11.484 53.6899C13.9585 55.6185 16.9774 56.8077 20.0947 57.1027C24.4501 57.5507 28.4068 56.4598 31.7225 53.4896C34.146 51.2623 35.9286 48.3922 36.87 45.2252C38.2047 41.1677 38.3012 37.061 37.9534 32.9034ZM26.1271 43.1491C25.7793 44.6825 24.9891 46.0684 23.8511 47.1065C22.5637 48.1973 20.9796 48.8402 19.2972 48.8402C16.7735 48.9895 14.299 48.4432 12.0739 47.2558C11.5295 47.0081 11.1835 46.4636 11.2327 45.8699V36.9117C11.2327 33.9433 11.2819 30.9748 11.2327 28.0063C11.1835 27.3125 11.5787 26.7188 12.2232 26.4711C14.9454 25.1854 17.7658 24.5917 20.7338 25.1854C22.8132 25.4804 24.594 26.8171 25.4352 28.7494C26.1781 30.3338 26.6224 32.0657 26.7225 33.7976C27.0193 36.9627 27.0193 40.1297 26.1271 43.1491ZM196.132 121.798C193.432 121.652 190.732 121.552 188.031 121.353C180.808 120.811 173.63 119.722 166.606 118.09C142.308 112.446 120.983 101.113 102.378 84.6337C100.646 83.1003 99.0128 81.5159 97.3303 79.9315C96.9334 79.5874 96.5874 79.0902 96.3908 78.5948C96.094 77.9028 96.2415 77.1598 96.7368 76.6153C97.232 76.0707 98.0241 75.8722 98.716 76.1709C99.1621 76.3676 99.6082 76.5679 100.001 76.8138C117.766 87.8007 137.163 95.8173 157.502 100.569C164.33 102.153 171.207 103.39 178.135 104.28C188.082 105.517 198.128 105.963 208.121 105.617C213.516 105.466 218.858 104.972 224.202 104.28C236.671 102.696 248.995 99.8749 260.919 95.9157C267.203 93.836 273.337 91.4594 279.326 88.6894C280.218 88.1959 281.307 88.0465 282.294 88.2942C283.929 88.6894 284.918 90.374 284.521 92.0057C284.472 92.2042 284.37 92.4501 284.273 92.6486C283.878 93.3916 283.334 94.0345 282.642 94.528C276.95 98.9807 270.815 102.892 264.333 106.158C252.11 112.344 239.047 116.748 225.59 119.272C217.835 120.654 210.034 121.497 202.179 121.794L202.134 121.796V121.994L196.192 122V121.801L196.132 121.798ZM287.192 73.5484L287.19 73.5466C283.725 73.645 280.311 73.991 276.946 74.6848C272.591 75.7247 268.483 77.3073 264.821 79.9297C264.229 80.2757 263.734 80.7711 263.337 81.3156C262.991 81.9111 262.844 82.503 263.19 83.0967C263.538 83.6922 264.133 83.7414 264.774 83.6922L270.761 82.951C275.264 82.3555 279.816 82.1588 284.37 82.3555C286.003 82.4556 287.587 82.7525 289.122 83.2478C290.755 83.7414 291.844 85.1764 291.893 86.861C291.992 87.8517 291.943 88.8387 291.844 89.8294C291.498 92.5521 290.954 95.2237 290.162 97.8461C288.823 102.647 287.141 107.249 285.409 111.902C285.215 112.395 285.114 112.891 285.065 113.386C285.114 114.327 285.708 114.821 286.649 114.575C287.245 114.378 287.787 114.031 288.233 113.584C290.46 111.506 292.389 109.132 293.975 106.507C298.328 99.232 300.95 91.066 301.595 82.605C301.691 81.1699 301.642 79.733 301.444 78.349C301.296 77.1616 300.551 76.0725 299.415 75.6264C298.574 75.2294 297.733 74.9325 296.841 74.683C293.672 73.8453 290.457 73.6468 287.192 73.5484Z" fill="#00A8E1"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_2606_6863">
                            <rect width="385" height="122" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight uppercase">
                      Redesigning the entertainment landing experience
                    </h1>
                    <p className="text-lg text-neutral-300 font-light max-w-xl leading-relaxed">
                      Restructuring Information Architecture, visual cues, and cross-platform consistency to deliver an immersive cinematic journey.
                    </p>
                  </div>

                  <div className="lg:col-span-6 relative flex justify-center items-center w-full">
                    <div className="absolute inset-0 bg-[#00A8E1]/10 rounded-full blur-[120px] pointer-events-none" />
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
                  <span className="text-xs font-bold tracking-[0.3em] text-[#00A8E1] uppercase block mb-1">
                    Design Tokens
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                    Style Guide
                  </h2>
                  <p className="text-sm text-neutral-400 font-light mt-2 max-w-2xl leading-relaxed">
                    A rigorous design system implemented to maintain high visual impact, cinematic focus, and unified component structure. Click the style guide sheet below to expand.
                  </p>
                </div>

                <div className="relative w-full cursor-zoom-in group">
                  <img 
                    src="/images/primevideo_styleguide_v2.jpg" 
                    alt="Prime Video Redesign Style Guide Sheet"
                    onClick={() => setLightboxImage("/images/primevideo_styleguide_v2.jpg")}
                    className="w-full h-auto object-contain group-hover:scale-[1.01] transition-transform duration-500"
                  />
                </div>
              </div>

              {/* 4. Desktop Interface Detail Spacer */}
              <div className="relative w-full bg-[#070709] border-b border-white/5 cursor-zoom-in group overflow-hidden">
                <img 
                  src="/images/primevideo_desktop_spacer_v2.png" 
                  alt="Wide desktop layout showcase spacer"
                  onClick={() => setLightboxImage("/images/primevideo_desktop_spacer_v2.png")}
                  className="w-full h-auto object-cover group-hover:scale-[1.005] transition-transform duration-700"
                />
              </div>

              {/* 5. Comparative Design Evolution & Slider */}
              <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 space-y-12 border-b border-white/5">
                <div className="text-left space-y-2">
                  <span className="text-xs font-bold tracking-[0.3em] text-[#00A8E1] uppercase block mb-1">
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
                    <span className="text-[10px] uppercase font-black tracking-widest text-[#00A8E1] block">
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
                      <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-md bg-black/60 border border-white/10 backdrop-blur-md text-[10px] font-black uppercase text-cyan-400 tracking-wider pointer-events-none">
                        New Design
                      </div>

                      {/* Slider Control Line & Circular Handle */}
                      <div 
                        className="absolute top-0 bottom-0 w-[2px] bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.8)] pointer-events-none z-20"
                        style={{ left: `${sliderPosition}%` }}
                      />
                      <div 
                        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#00A8E1] border border-cyan-300 text-black flex items-center justify-center shadow-[0_0_20px_rgba(0,168,225,0.6)] cursor-ew-resize pointer-events-none z-30 font-black text-lg select-none"
                        style={{ left: `${sliderPosition}%` }}
                      >
                        ↔
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Mobile View Directly */}
                  <div className="lg:col-span-4 space-y-4">
                    <span className="text-[10px] uppercase font-black tracking-widest text-[#00A8E1] block">
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
