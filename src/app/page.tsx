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

// Custom official LinkedIn SVG Icon Component (Filled Variant)
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

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showPrimeVideo, setShowPrimeVideo] = useState(false);

  useEffect(() => {
    // Redirect large deployment URLs to clean short subdomain to ensure correct copying
    if (typeof window !== "undefined" && 
        window.location.hostname !== "ashishmali.vercel.app" && 
        !window.location.hostname.includes("localhost") &&
        !window.location.hostname.includes("127.0.0.1")) {
      window.location.replace("https://ashishmali.vercel.app" + window.location.pathname + window.location.search);
    }
  }, []);

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
            {/* Logo Group */}
            <div className="flex-1 flex justify-start">
              <Logo />
            </div>
            
            {/* Navigation Menu (Centered) */}
            <nav className="hidden md:flex gap-4 lg:gap-6 xl:gap-8 text-xs uppercase tracking-widest font-semibold text-white/60 items-center justify-center flex-1">
              <a href="#what-i-do" className="hover:text-white transition-colors whitespace-nowrap">What I Do</a>
              <a href="#projects" className="hover:text-white transition-colors whitespace-nowrap">Projects</a>
              <a href="#skills" className="hover:text-white transition-colors whitespace-nowrap">Skills</a>
              <a href="#about-me" className="hover:text-white transition-colors whitespace-nowrap">About Me</a>
              <a href="#experience" className="hover:text-white transition-colors whitespace-nowrap">Experience</a>
              <a href="#contact" className="hover:text-white transition-colors whitespace-nowrap">Contact</a>
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
                <nav className="flex flex-col gap-6 my-auto items-center text-center w-full">
                  {[
                    { name: "What I Do", href: "#what-i-do" },
                    { name: "Projects", href: "#projects" },
                    { name: "Skills", href: "#skills" },
                    { name: "About Me", href: "#about-me" },
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
