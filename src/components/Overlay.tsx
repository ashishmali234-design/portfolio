"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Typewriter from "./Typewriter";

export default function Overlay() {
  const { scrollY } = useScroll();

  const [isSection2Visible, setIsSection2Visible] = useState(false);
  const [isSection3Visible, setIsSection3Visible] = useState(false);

  useEffect(() => {
    if (scrollY.get() >= 450) setIsSection2Visible(true);
    if (scrollY.get() >= 1650) setIsSection3Visible(true);

    return scrollY.on("change", (latest) => {
      if (latest >= 450) {
        setIsSection2Visible(true);
      }
      if (latest >= 1650) {
        setIsSection3Visible(true);
      }
    });
  }, [scrollY]);

  // Section 1 Transforms (Hero, centered)
  const y1 = useTransform(scrollY, [0, 300], [0, -120]);
  const opacity1 = useTransform(scrollY, [0, 200], [1, 0]);
  const scale1 = useTransform(scrollY, [0, 300], [1, 0.95]);
  const heroPointerEvents = useTransform(scrollY, (value) => value > 200 ? "none" : "auto") as unknown as React.CSSProperties["pointerEvents"];

  // Section 2 Transforms (Left-aligned)
  const y2 = useTransform(scrollY, [400, 700, 1500], [100, 0, -100]);
  const opacity2 = useTransform(scrollY, [400, 600, 1200, 1500], [0, 1, 1, 0]);
  const pointerEvents2 = useTransform(scrollY, (value) => (value >= 400 && value <= 1500) ? "auto" : "none") as unknown as React.CSSProperties["pointerEvents"];

  // Section 3 Transforms (Left-aligned)
  const y3 = useTransform(scrollY, [1600, 1900, 2700], [100, 0, -100]);
  const opacity3 = useTransform(scrollY, [1600, 1800, 2400, 2700], [0, 1, 1, 0]);
  const pointerEvents3 = useTransform(scrollY, (value) => (value >= 1600 && value <= 2700) ? "auto" : "none") as unknown as React.CSSProperties["pointerEvents"];

  // Scroll Indicator transforms (Stay visible until scrollytelling completes)
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 2400, 2600], [1, 1, 0]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 font-sans">
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">

        {/* Section 1: Hero (Left Corner / Blank Space Aligned) */}
        <motion.div
          style={{ y: y1, opacity: opacity1, scale: scale1, pointerEvents: heroPointerEvents }}
          className="absolute inset-x-5 md:inset-x-24 top-0 bottom-0 -mt-16 md:mt-0 flex flex-col justify-center items-start text-left max-w-2xl"
        >
          <div className="relative w-full p-0">
            {/* Open navy blue gradient glow behind text only in mobile view */}
            <div className="absolute -left-5 w-screen -inset-y-36 bg-[radial-gradient(circle_at_30%_50%,rgba(15,27,61,0.95)_0%,rgba(21,16,43,0.8)_50%,rgba(18,18,18,0)_100%)] md:hidden pointer-events-none z-[-1] blur-3xl" />
            
            <span className="text-[12px] md:text-sm font-bold tracking-[0.25em] text-white/40 uppercase mb-3 block">
              Hello! I&apos;m
            </span>
            <h1 className="text-[44px] md:text-8xl font-bold tracking-tight text-white select-none uppercase leading-none min-h-[1.1em]">
              <Typewriter text="Ashish Mali" delay={150} speed={50} />
            </h1>
            <h2 className="text-[22px] md:text-4xl font-semibold tracking-tight text-amber-400 select-none uppercase mt-3 min-h-[1.2em]">
              <Typewriter text="Product Designer" delay={900} speed={40} />
            </h2>
            <motion.p 
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6, ease: "easeOut" }}
              className="text-[12px] md:text-sm text-white/50 uppercase tracking-widest mt-3"
            >
              at <span className="font-rubik text-white font-semibold tracking-widest">Bajaj Finance</span>
            </motion.p>
          </div>
        </motion.div>

        {/* Scroll to explore (Centered bottom) */}
        <motion.div 
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-16 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[10px] tracking-[0.25em] text-white/40 uppercase font-bold">
            Scroll to explore
          </span>
          <div className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center p-1 mt-1">
            <motion.div 
              animate={{ 
                y: [0, 8, 0],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-1 h-2 bg-amber-400 rounded-full"
            />
          </div>
        </motion.div>

        {/* Section 2: Statement (Left-aligned) */}
        <motion.div
          style={{ y: y2, opacity: opacity2, pointerEvents: pointerEvents2 }}
          className="absolute inset-x-5 md:inset-x-24 top-0 bottom-0 flex flex-col justify-center items-start text-left max-w-2xl"
        >
          <div className="relative w-full p-0">
            {/* Open navy blue gradient glow behind text only in mobile view */}
            <div className="absolute -left-5 w-screen -inset-y-36 bg-[radial-gradient(circle_at_30%_50%,rgba(15,27,61,0.95)_0%,rgba(21,16,43,0.8)_50%,rgba(18,18,18,0)_100%)] md:hidden pointer-events-none z-[-1] blur-3xl" />
            
            <div className="mb-4">
              <span className="text-xs font-bold tracking-[0.25em] text-white/40 uppercase">
                CORE EXPERIENCE
              </span>
            </div>
            {/* Mobile Title: Shortened to Crafting Seamless UX */}
            <h2 className="text-[36px] font-extrabold tracking-tight text-white leading-tight min-h-[2.2em] md:hidden">
              <Typewriter
                trigger={isSection2Visible}
                segments={[
                  { text: "Crafting\n", className: "text-white" },
                  { text: "Seamless UX.", className: "text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-[#FFBF4F] to-yellow-500" }
                ]}
                delay={200}
              />
            </h2>
            {/* Desktop Title: Keep Original */}
            <h2 className="text-6xl font-extrabold tracking-tight text-white leading-tight min-h-[2.2em] hidden md:block">
              <Typewriter
                trigger={isSection2Visible}
                segments={[
                  { text: "Turning Ideas Into\n", className: "text-white" },
                  { text: "Seamless Experiences.", className: "text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-[#FFBF4F] to-yellow-500" }
                ]}
                delay={200}
              />
            </h2>
            <p className="mt-4 md:mt-6 text-xs md:text-base text-white/60 leading-relaxed font-light font-sans max-w-[80%] md:max-w-none">
              Focused on user-centric UI/UX, product thinking, and immersive digital interactions.
            </p>
          </div>
        </motion.div>

        {/* Section 3: Value Prop (Left-aligned) */}
        <motion.div
          style={{ y: y3, opacity: opacity3, pointerEvents: pointerEvents3 }}
          className="absolute inset-x-5 md:inset-x-24 top-0 bottom-0 flex flex-col justify-center items-start text-left max-w-2xl"
        >
          <div className="relative w-full p-0">
            {/* Open navy blue gradient glow behind text only in mobile view */}
            <div className="absolute -left-5 w-screen -inset-y-36 bg-[radial-gradient(circle_at_30%_50%,rgba(15,27,61,0.95)_0%,rgba(21,16,43,0.8)_50%,rgba(18,18,18,0)_100%)] md:hidden pointer-events-none z-[-1] blur-3xl" />
            
            <div className="mb-4">
              <span className="text-xs font-bold tracking-[0.25em] text-white/40 uppercase">
                THE PHILOSOPHY
              </span>
            </div>
            <h2 className="text-[36px] md:text-7xl font-extrabold tracking-tight text-white leading-tight min-h-[2.2em]">
              <Typewriter
                trigger={isSection3Visible}
                segments={[
                  { text: "Designing with ", className: "text-white" },
                  { text: "AI", className: "text-white" },
                  { text: ",\n", className: "text-white" },
                  { text: "thinking like humans.", className: "text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600" }
                ]}
                delay={200}
              />
            </h2>
            <p className="mt-4 md:mt-6 text-xs md:text-base text-white/60 leading-relaxed font-light font-sans max-w-[80%] md:max-w-md">
              Using AI thoughtfully to create seamless, innovative, and human-centered experiences.
            </p>
          </div>
        </motion.div>


      </div>
    </div>
  );
}
