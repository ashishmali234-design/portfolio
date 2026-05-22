"use client";

import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUp } from "lucide-react";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Logo from "@/components/Logo";
import CustomCursor from "@/components/CustomCursor";
import WhatIDo from "@/components/WhatIDo";
import PrimeVideoRedesign from "@/components/PrimeVideoRedesign";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showPrimeVideo, setShowPrimeVideo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative bg-[#121212] w-full min-h-screen text-white select-none lg:cursor-none">
      <CustomCursor />
      
      {/* Fixed Navigation Header */}
      {isLoaded && (
        <>
          <header className={`fixed top-0 left-0 right-0 z-50 px-6 flex justify-between items-center transition-all duration-300 md:px-12 ${
            scrolled 
              ? "bg-gradient-to-b from-[#121212] via-[#121212]/80 to-transparent pt-4 pb-8" 
              : "bg-gradient-to-b from-[#121212]/60 to-transparent pt-6 pb-10 md:pt-8"
          }`}>
            <Logo />
            
            <nav className="hidden md:flex gap-6 text-xs uppercase tracking-widest font-semibold text-white/60 items-center">
              <a href="#experience" className="hover:text-white transition-colors">Experience</a>
              <a href="#skills" className="hover:text-white transition-colors">Skills</a>
              <a href="#projects" className="hover:text-white transition-colors">Work</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              <a 
                href="/Ashish_C_Mali_Resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-4 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-400 font-bold hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.12)] hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] text-[10px] tracking-wider uppercase"
              >
                Resume
              </a>
            </nav>

            {/* Mobile Header Right Side (Resume + Hamburger) */}
            <div className="flex md:hidden items-center gap-2">
              <a 
                href="/Ashish_C_Mali_Resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-400 font-bold text-[9px] tracking-widest uppercase transition-all duration-300 shadow-[0_0_10px_rgba(245,158,11,0.08)] hover:bg-amber-500 hover:text-black hover:border-amber-500 active:scale-95"
              >
                Resume
              </a>
              <button 
                onClick={() => setMenuOpen(true)}
                className="text-white/80 hover:text-white transition-colors focus:outline-none p-2 -mr-2"
                aria-label="Toggle Menu"
              >
                <Menu size={22} className="stroke-[2.5]" />
              </button>
            </div>
          </header>

          {/* Mobile Fullscreen Glassmorphic Menu Drawer */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
                className="fixed inset-0 bg-[#121212]/96 backdrop-blur-xl z-[100] flex flex-col justify-between p-6 md:hidden select-none"
              >
                {/* Header inside drawer */}
                <div className="flex justify-between items-center w-full">
                  <Logo forceShowTextOnMobile={true} onClick={() => {
                    setMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }} />
                  
                  {/* Close Button */}
                  <button 
                    onClick={() => setMenuOpen(false)}
                    className="text-white/80 hover:text-white transition-colors focus:outline-none p-2 -mr-2"
                    aria-label="Close Menu"
                  >
                    <X size={24} className="stroke-[2.5]" />
                  </button>
                </div>

                {/* Menu Links with Staggered Slide In */}
                <nav className="flex flex-col gap-8 my-auto text-left pl-4">
                  {[
                    { name: "Experience", href: "#experience" },
                    { name: "Skills", href: "#skills" },
                    { name: "Work", href: "#projects" },
                    { name: "Contact", href: "#contact" },
                    { name: "Resume", href: "/Ashish_C_Mali_Resume.pdf", isExternal: true }
                  ].map((item, idx) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      target={item.isExternal ? "_blank" : undefined}
                      rel={item.isExternal ? "noopener noreferrer" : undefined}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 120,
                        damping: 15,
                        delay: 0.1 + idx * 0.08 
                      }}
                      className={`text-3xl font-black uppercase tracking-wider transition-colors ${
                        item.isExternal 
                          ? "text-amber-400 hover:text-white" 
                          : "text-white/70 hover:text-amber-500 active:text-amber-500"
                      }`}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </nav>

                {/* Footer inside drawer */}
                <div className="text-left pl-4 text-[10px] tracking-[0.25em] text-gray-500 uppercase font-bold">
                  © 2026 ASHISH MALI • CREATIVE PORTFOLIO
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Scroll container wraps the Sticky Canvas and Overlay */}
      <div ref={containerRef} className="relative w-full">
        {/* Component 1: Canvas Scroller */}
        <ScrollyCanvas onLoadComplete={() => setIsLoaded(true)} />
        
        {/* Component 2: Parallax Text Overlay */}
        {isLoaded && <Overlay />}
      </div>

      {/* Experience, Skills, Work Grid & Contact */}
      {isLoaded && (
        <>
          <WhatIDo />
          <Projects onOpenPrimeVideo={() => setShowPrimeVideo(true)} />
          <Experience />
          <Skills />
          <PrimeVideoRedesign isOpen={showPrimeVideo} onClose={() => setShowPrimeVideo(false)} />
        </>
      )}

      {/* Scroll-To-Top Up Arrow CTA */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-[#121212]/80 border border-white/10 text-white/80 backdrop-blur-md shadow-2xl hover:text-white hover:border-amber-500/50 hover:shadow-[0_0_24px_rgba(245,158,11,0.25)] transition-all duration-300 group focus:outline-none"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} className="stroke-[2.5] group-hover:-translate-y-0.5 transition-transform duration-300" />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}
