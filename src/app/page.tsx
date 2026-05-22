"use client";

import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUp, FileText } from "lucide-react";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Logo from "@/components/Logo";
import CustomCursor from "@/components/CustomCursor";
import WhatIDo from "@/components/WhatIDo";
import PrimeVideoRedesign from "@/components/PrimeVideoRedesign";
import Contact from "@/components/Contact";
import AboutMe from "@/components/AboutMe";

// Custom official Behance SVG Icon Component
const BehanceIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M22 13h-7v1.25h7V13zm-11.83-3.23c.31-.47.46-1.01.46-1.62 0-.66-.17-1.22-.51-1.67-.34-.45-.81-.79-1.42-1.02-.6-.23-1.3-.34-2.11-.34H2v13.62h5.27c1.37 0 2.45-.3 3.23-.9.78-.6 1.17-1.47 1.17-2.6 0-.85-.23-1.57-.69-2.16-.46-.59-1.1-1.03-1.93-1.31.74-.23 1.31-.63 1.72-1.2l-.39.2zm-5.3-2.6h1.91c.64 0 1.11.12 1.41.35.3.23.45.58.45 1.05 0 .42-.15.75-.44.97-.29.22-.76.33-1.4.33H4.87V7.17zm3.76 6.37c0 .54-.17.96-.51 1.24-.34.28-.88.42-1.62.42H4.87v-3.32h1.66c.72 0 1.25.13 1.59.39.34.26.51.68.51 1.27zm10.74-2.28c-.89 0-1.63.26-2.23.77-.6.51-.97 1.25-1.12 2.22h6.58c-.06-.94-.37-1.66-.94-2.17-.57-.51-1.34-.82-2.29-.82zm-.11-2c1.3 0 2.37.38 3.19 1.14.82.76 1.24 1.83 1.27 3.21H13.62c.12 1.34.6 2.38 1.44 3.1.84.72 1.93 1.08 3.26 1.08 1.16 0 2.11-.25 2.85-.75.74-.5 1.29-1.2 1.63-2.1h-2.82c-.18.39-.46.7-.85.93-.39.23-.88.35-1.47.35-.78 0-1.37-.22-1.78-.65-.41-.43-.65-1.07-.72-1.92h10.28c.04-.32.06-.67.06-1.04 0-1.35-.38-2.43-1.14-3.23-.76-.8-1.78-1.2-3.07-1.2z" />
  </svg>
);

// Custom official LinkedIn SVG Icon Component
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

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
      {!showPrimeVideo && <CustomCursor />}
      
      {/* Fixed Navigation Header */}
      {isLoaded && (
        <>
          <header className={`fixed top-0 left-0 right-0 z-50 px-6 flex justify-between items-center transition-all duration-300 md:px-12 ${
            scrolled 
              ? "bg-gradient-to-b from-[#121212] via-[#121212]/80 to-transparent pt-4 pb-8" 
              : "bg-gradient-to-b from-[#121212]/60 to-transparent pt-6 pb-10 md:pt-8"
          }`}>
            {/* Logo Group */}
            <div className="flex-1 flex justify-start">
              <Logo />
            </div>
            
            {/* Navigation Menu (Centered) */}
            <nav className="hidden md:flex gap-8 text-xs uppercase tracking-widest font-semibold text-white/60 items-center justify-center flex-1">
              <a href="#about-me" className="hover:text-white transition-colors">About Me</a>
              <a href="#projects" className="hover:text-white transition-colors">Projects</a>
              <a href="#skills" className="hover:text-white transition-colors">Skills</a>
              <a href="#experience" className="hover:text-white transition-colors">Experience</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </nav>

            {/* CTAs (Resume with Icon + LinkedIn + Behance Icons on Right) */}
            <div className="hidden md:flex items-center gap-3.5 justify-end flex-1">
              {/* Resume CTA */}
              <a 
                href="/Ashish_C_Mali_Resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-400 font-bold hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.12)] hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] text-[10px] tracking-wider uppercase flex items-center gap-2"
              >
                <FileText size={13} className="stroke-[2.5]" />
                <span>Resume</span>
              </a>

              {/* LinkedIn Icon CTA */}
              <a 
                href="https://www.linkedin.com/in/ashish-mali-b071b526b?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-amber-400 hover:border-amber-400/50 hover:bg-amber-500/10 transition-all duration-300 shadow-inner flex items-center justify-center active:scale-95"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>

              {/* Behance Icon CTA */}
              <a 
                href="https://www.behance.net/ashishmali"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-amber-400 hover:border-amber-400/50 hover:bg-amber-500/10 transition-all duration-300 shadow-inner flex items-center justify-center active:scale-95"
                aria-label="Behance"
              >
                <BehanceIcon className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Header Right Side (Resume + Hamburger) */}
            <div className="flex md:hidden items-center gap-2">
              <a 
                href="/Ashish_C_Mali_Resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-400 font-bold text-[9px] tracking-widest uppercase transition-all duration-300 shadow-[0_0_10px_rgba(245,158,11,0.08)] hover:bg-amber-500 hover:text-black hover:border-amber-500 active:scale-95 flex items-center gap-1.5"
              >
                <FileText size={10} className="stroke-[2.5]" />
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

                {/* Menu Links with Staggered Slide In (Centered) */}
                <nav className="flex flex-col gap-7 my-auto items-center text-center w-full">
                  {[
                    { name: "About Me", href: "#about-me" },
                    { name: "Projects", href: "#projects" },
                    { name: "Skills", href: "#skills" },
                    { name: "Experience", href: "#experience" },
                    { name: "Contact", href: "#contact" }
                  ].map((item, idx) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 120,
                        damping: 15,
                        delay: 0.1 + idx * 0.06 
                      }}
                      className="text-2xl font-black uppercase tracking-widest text-white/70 hover:text-[#FFBF4F] active:text-[#FFBF4F] transition-colors duration-300"
                    >
                      {item.name}
                    </motion.a>
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
                      onClick={() => setMenuOpen(false)}
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
                      onClick={() => setMenuOpen(false)}
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
                      onClick={() => setMenuOpen(false)}
                      className="p-2.5 rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-amber-400 hover:border-amber-400/50 hover:bg-amber-500/10 transition-all duration-300 shadow-inner flex items-center justify-center active:scale-95"
                      aria-label="Behance"
                    >
                      <BehanceIcon className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="text-center text-[9px] tracking-[0.25em] text-gray-500 uppercase font-bold">
                    © 2026 ASHISH C MALI • CREATIVE PORTFOLIO
                  </div>
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
          <Skills />
          <AboutMe />
          <Experience />
          <Contact />
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
