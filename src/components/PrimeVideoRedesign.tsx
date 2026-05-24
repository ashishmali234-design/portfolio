"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Monitor,
  X,
  Menu,
  ArrowLeft,
  FileText
} from "lucide-react";
import Logo from "./Logo";

// Custom official Behance SVG Icon Component
const BehanceIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M2.94843 21.2339C3.2396 21.198 3.53183 21.1709 3.82467 21.153C5.39184 21.059 7.4209 21.111 9.01687 21.1113L18.003 21.1133L26.5643 21.1102C33.4828 21.1092 42.0917 21.0443 46.7356 27.1961C47.2261 27.8459 47.9928 29.5984 48.0365 30.3556C47.9153 31.9323 48.0824 33.6231 48.1518 35.2083C48.1892 36.0626 48.4166 36.8537 48.4374 37.7101C48.452 37.8728 48.4507 37.9357 48.4328 38.093C47.8956 42.8145 44.9404 44.858 41.4385 47.5175C42.4576 48.1048 43.7107 48.616 44.7411 49.1855C49.3723 51.7452 51.2687 56.5011 51.2105 61.6094C51.1727 64.9277 51.0663 67.635 49.2531 70.6513C45.8194 76.3631 38.7498 78.4236 32.4846 78.8574C23.0253 79.041 13.5417 78.8357 4.07962 78.9059C3.80069 78.908 3.29395 78.8752 3.0639 78.7381C2.90779 77.7929 2.95519 75.2112 2.95454 74.1461L2.95583 65.7484L2.95551 35.3515L2.95769 25.7489C2.9584 24.6082 3.04972 22.3324 2.95769 21.3289L2.94843 21.2339ZM15.9442 68.8563C20.48 69.0852 25.1735 68.8899 29.725 68.9234C31.1273 68.9337 32.9166 68.6946 34.1872 68.074C35.8153 67.439 37.5565 66.09 38.2853 64.4621C39.0539 62.7451 38.9779 59.7625 38.2888 58.0097C37.6159 56.2982 35.9102 54.6557 34.2301 53.9402C31.1734 52.6382 23.198 53.0685 19.4954 53.076C18.5577 53.0929 16.8159 53.1647 15.9566 53.0774C15.8256 55.0024 15.8923 57.4228 15.894 59.3953C15.8807 62.549 15.8975 65.7028 15.9442 68.8563ZM15.9798 44.311C18.5959 44.3803 21.2132 44.4003 23.8301 44.3708C26.0966 44.3659 28.4678 44.4683 30.688 44.0871C35.4687 42.9995 36.8498 40.2612 36.0139 35.5657C34.9954 29.8448 25.3143 31.0949 21.04 31.1035C20.373 31.1099 16.5646 31.1049 16.0995 31.2381C15.739 32.3024 15.8159 42.6943 15.9798 44.311Z" fill="currentColor"/>
    <path d="M96.1075 64.1662C95.3687 66.6699 93.9616 69.2365 92.3941 71.3239C90.0792 74.4069 85.6675 76.4845 81.8822 76.9016C76.1433 77.5338 69.5764 76.5412 64.9831 72.8024C61.4289 69.9094 59.129 65.4865 58.6955 60.9355C58.4914 58.7919 58.3859 55.3895 58.7107 53.2627C59.1393 50.454 60.6543 46.0513 62.4634 43.83C65.0587 40.6433 67.3223 38.7931 71.2705 37.5626C72.5144 37.1749 72.4056 36.9378 74.0502 36.7642C78.4527 36.2407 82.3477 36.252 86.4041 38.2547C88.9772 39.525 91.0729 40.9122 92.7101 43.3717C93.9199 45.1893 95.9801 49.3862 96.1884 51.5216C96.0582 52.7483 96.5096 58.1685 96.0778 58.8728C94.5187 59.7658 93.8732 59.1062 92.2593 59.3871C90.0413 59.5112 86.8205 59.4174 84.5564 59.4173L69.1134 59.4347C68.9502 61.5573 69.3177 63.728 70.5769 65.4877C71.8827 67.2944 73.8488 68.5128 76.0479 68.8781C79.2394 69.4 82.7822 68.8714 85.0923 66.4246C85.7178 65.7621 86.335 64.6897 87.0523 64.2131C88.9196 63.9878 94.0952 64.0904 96.1075 64.1662ZM77.5879 52.7272C79.6766 52.7308 84.0479 52.8439 85.935 52.6382C85.9893 50.3768 85.1365 48.1876 83.567 46.5586C81.8658 44.8016 79.705 44.4556 77.3597 44.5769C74.4107 44.9168 72.8132 45.4303 70.7753 47.8331C69.4808 49.3595 69.3834 50.8905 69.0223 52.7142C70.2044 52.6379 71.5616 52.7039 72.7679 52.72C74.3745 52.7323 75.9813 52.7348 77.5879 52.7272Z" fill="currentColor"/>
    <path d="M66.9185 31.9368C66.8411 30.789 66.6621 27.8667 66.916 26.8461C66.9423 26.7404 66.9684 26.5866 67.0665 26.5319C67.3919 26.3505 87.4681 26.2581 88.024 26.4666C88.2773 26.5617 88.3461 26.8774 88.4483 27.1063C88.2148 27.7306 88.2552 30.7161 88.2725 31.543L88.258 31.7971C87.9564 32.0488 83.7208 31.9285 82.9781 31.9284L71.7457 31.9235C70.5667 31.9218 67.918 31.816 66.9185 31.9368Z" fill="currentColor" fill-opacity="0.94902"/>
    <path d="M68.2757 27.091C70.4005 26.9838 86.2381 26.9047 87.3977 27.2953C87.8992 28.1339 87.9578 30.6571 87.0123 31.3766L86.9379 31.4326L87.0848 31.4007L87.0342 31.5416C86.8486 31.5949 86.6621 31.6446 86.4746 31.6905C84.5201 31.6918 68.0124 31.8068 67.7029 31.4543C67.5448 31.2742 67.7351 31.0029 67.4554 30.7971L67.3669 31.0825L67.2454 31.0528C67.1167 30.4952 67.022 27.8293 67.2808 27.3885C67.5181 27.1675 67.9418 27.1442 68.2757 27.091Z" fill="currentColor"/>
    <path d="M96.1884 51.5216C96.6372 53.6472 97.1935 56.854 96.8422 58.9814C96.7402 59.5987 92.8753 59.4675 92.2593 59.3871C93.8732 59.1062 94.5187 59.7658 96.0778 58.8728C96.5096 58.1685 96.0582 52.7483 96.1884 51.5216Z" fill="currentColor" fill-opacity="0.905882"/>
    <path d="M48.0365 30.3556C48.8332 33.4469 49.0728 34.6232 48.4374 37.7101C48.4166 36.8537 48.1892 36.0626 48.1518 35.2083C48.0824 33.6231 47.9153 31.9323 48.0365 30.3556Z" fill="currentColor" fill-opacity="0.898039"/>
    <path d="M88.4483 27.1062C88.5142 27.3333 88.5147 27.3126 88.5237 27.5419C88.5352 27.8366 88.7568 27.9936 88.846 28.352C89.0271 29.0803 89.1849 31.3063 88.8242 31.9052L88.686 31.9256C88.5733 31.8167 88.3921 31.628 88.2725 31.5429C88.2552 30.7161 88.2148 27.7305 88.4483 27.1062Z" fill="currentColor" fill-opacity="0.145098"/>
    <path d="M51.6523 60.5962C52.0207 60.9185 51.8872 62.5567 51.7638 63.0217C51.3465 62.3499 51.4854 61.3312 51.6523 60.5962Z" fill="currentColor" fill-opacity="0.388235"/>
  </svg>
);

// Custom official LinkedIn SVG Icon Component
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

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

                {/* Portfolio Navigation Links (Centered) */}
                <nav className="flex flex-col gap-7 my-auto items-center text-center w-full">
                  <span className="text-[10px] uppercase tracking-widest text-[#FFBF4F] font-black mb-2">Portfolio</span>
                  {[
                    { name: "Experience", target: "experience" },
                    { name: "Skills", target: "skills" },
                    { name: "Work", target: "projects" },
                    { name: "Contact", target: "contact" }
                  ].map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleNavLinkClick(item.target)}
                      className="text-2xl font-black uppercase tracking-widest text-white/70 hover:text-[#FFBF4F] active:text-[#FFBF4F] text-center transition-colors cursor-pointer bg-transparent border-none"
                    >
                      {item.name}
                    </button>
                  ))}
                </nav>

                {/* CTAs & Footer inside drawer (Centered) */}
                <div className="flex flex-col items-center gap-6 w-full pb-6 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    {/* Resume CTA */}
                    <a 
                      href="/Ashish_C_Mali_Resume.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={() => setModalMenuOpen(false)}
                      className="px-5 py-2 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-400 font-bold hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.12)] text-[10px] tracking-widest uppercase flex items-center gap-2"
                    >
                      <FileText size={13} className="stroke-[2.5]" />
                      <span>Resume</span>
                    </a>

                    {/* LinkedIn Icon CTA */}
                    <a 
                      href="https://www.linkedin.com/in/ashish-mali-b071b526b?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setModalMenuOpen(false)}
                      className="p-2.5 rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-amber-400 hover:border-amber-400/50 hover:bg-amber-500/10 transition-all duration-300 shadow-inner flex items-center justify-center active:scale-95"
                      aria-label="LinkedIn"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>

                    {/* Behance Icon CTA */}
                    <a 
                      href="https://www.behance.net/ashishmali"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setModalMenuOpen(false)}
                      className="p-2.5 rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-amber-400 hover:border-amber-400/50 hover:bg-amber-500/10 transition-all duration-300 shadow-inner flex items-center justify-center active:scale-95"
                      aria-label="Behance"
                    >
                      <BehanceIcon className="w-4 h-4" />
                    </a>
                  </div>

                  <button
                    onClick={onClose}
                    className="w-full py-3.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white text-xs font-black uppercase tracking-widest transition-all duration-300 active:scale-95 cursor-pointer text-center"
                  >
                    Close Case Study
                  </button>

                  <div className="text-center text-[9px] tracking-[0.25em] text-gray-500 uppercase font-bold">
                    © 2026 ASHISH C MALI • CREATIVE PORTFOLIO
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
