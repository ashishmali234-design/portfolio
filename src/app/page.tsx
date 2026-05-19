"use client";

import { useRef, useState, useEffect } from "react";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import Logo from "@/components/Logo";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
        <header className={`fixed top-0 left-0 right-0 z-50 px-6 flex justify-between items-center transition-all duration-300 md:px-12 ${
          scrolled 
            ? "bg-gradient-to-b from-[#121212] via-[#121212]/80 to-transparent pt-4 pb-8" 
            : "bg-gradient-to-b from-[#121212]/60 to-transparent pt-6 pb-10 md:pt-8"
        }`}>
          <Logo />
          
          <nav className="flex gap-6 text-xs uppercase tracking-widest font-semibold text-white/60">
            <a href="#projects" className="hover:text-white transition-colors">Work</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>
        </header>
      )}

      {/* Scroll container wraps the Sticky Canvas and Overlay */}
      <div ref={containerRef} className="relative w-full">
        {/* Component 1: Canvas Scroller */}
        <ScrollyCanvas onLoadComplete={() => setIsLoaded(true)} />
        
        {/* Component 2: Parallax Text Overlay */}
        {isLoaded && <Overlay />}
      </div>

      {/* Component 3: Work Grid & Contact */}
      {isLoaded && <Projects />}
    </main>
  );
}
