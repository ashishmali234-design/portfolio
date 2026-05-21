"use client";

import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Logo from "@/components/Logo";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
            
            <nav className="hidden md:flex gap-6 text-xs uppercase tracking-widest font-semibold text-white/60">
              <a href="#experience" className="hover:text-white transition-colors">Experience</a>
              <a href="#skills" className="hover:text-white transition-colors">Skills</a>
              <a href="#projects" className="hover:text-white transition-colors">Work</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </nav>

            {/* Hamburger Menu Button for Mobile */}
            <button 
              onClick={() => setMenuOpen(true)}
              className="flex md:hidden text-white/80 hover:text-white transition-colors focus:outline-none p-2 -mr-2"
              aria-label="Toggle Menu"
            >
              <Menu size={22} className="stroke-[2.5]" />
            </button>
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
                  <Logo forceShowTextOnMobile={true} />
                  
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
                    { name: "Contact", href: "#contact" }
                  ].map((item, idx) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 120,
                        damping: 15,
                        delay: 0.1 + idx * 0.08 
                      }}
                      className="text-3xl font-black uppercase tracking-wider text-white/70 hover:text-amber-500 transition-colors active:text-amber-500"
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
          <Experience />
          <Skills />
          <Projects />
        </>
      )}
    </main>
  );
}
