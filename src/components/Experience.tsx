"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, Calendar, Building2 } from "lucide-react";
import Typewriter from "./Typewriter";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  highlights: string[];
}

const experiences: ExperienceItem[] = [
  {
    role: "Product Designer",
    company: "Bajaj Finance",
    period: "May 2025 - Present",
    highlights: [
      "Designed user flows, wireframes, prototypes, and interactive UI for complex financial products.",
      "Worked on high-impact products: Gold Loan, Personal Loan, INSTA EMI, EDC Journeys, Sales One App, Enterprise Dashboard, and Bajaj Finserv for Business.",
      "Created AI-driven digital experiences, training videos, marketing banners, GIFs, and creative layouts.",
    ],
  },
  {
    role: "UI/UX Designer",
    company: "Dchronicles Explication International Pvt. Ltd.",
    period: "July 2024 - March 2025",
    highlights: [
      "Crafted high-fidelity web and mobile application UI with special attention to modern aesthetics and layout engineering.",
      "Conducted usability analysis and refined complex workflows into intuitive user interfaces.",
    ],
  },
  {
    role: "UI/UX Designer",
    company: "Infoshard Technology",
    period: "April 2024 - July 2024",
    highlights: [
      "Collaborated with developers and product managers to wireframe and prototype responsive web applications.",
      "Conducted user research and translated findings into actionable wireframes, design systems, and components.",
    ],
  },
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Calculate the avatar's top position based on scroll (from 0% to 100% down the container)
  const avatarY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative z-20 py-24 px-6 md:px-12 bg-[#121212] overflow-hidden">
      <style>{`
        @keyframes climb-sway {
          0%, 100% { transform: rotate(-4deg) translateY(0px); }
          50% { transform: rotate(4deg) translateY(-6px); }
        }
        .animate-climb {
          animation: climb-sway 2s ease-in-out infinite;
          transform-origin: center;
        }
      `}</style>
      
      {/* Background glow effects */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="mb-16 text-left">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-bold tracking-[0.3em] text-amber-400 uppercase block mb-3"
          >
            CAREER JOURNEY
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase min-h-[1.2em]"
          >
            <Typewriter segments={[{ text: "Career ", className: "font-light text-white" }, { text: "Journey", className: "font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400 inline-block" }]} delay={100} />
          </motion.h2>
        </div>

        {/* Timeline Path / Ladder Container */}
        <div ref={containerRef} className="relative pl-24 md:pl-32 ml-0 md:ml-4 space-y-16 py-10">
          
          {/* The Ladder UI */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-20 z-0">
            {/* Left Rail */}
            <div className="absolute left-2 md:left-4 top-0 bottom-0 w-1 md:w-1.5 bg-gradient-to-b from-transparent via-amber-500/60 to-transparent rounded-full shadow-[0_0_12px_rgba(245,158,11,0.6)]" />
            {/* Right Rail */}
            <div className="absolute right-2 md:right-4 top-0 bottom-0 w-1 md:w-1.5 bg-gradient-to-b from-transparent via-amber-500/60 to-transparent rounded-full shadow-[0_0_12px_rgba(245,158,11,0.6)]" />
            
            {/* Horizontal Rungs */}
            <div className="absolute inset-0 flex flex-col justify-between py-12 md:py-24 pointer-events-none">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="w-full h-[2px] md:h-[3px] bg-amber-500/40 shadow-[0_0_6px_rgba(245,158,11,0.4)]" />
              ))}
            </div>

            {/* Climbing Avatar */}
            <motion.div 
              style={{ top: avatarY }}
              className="absolute left-1/2 -translate-x-1/2 -mt-10 w-16 h-20 z-10 flex items-center justify-center pointer-events-none"
            >
              <div className="relative animate-climb">
                <svg width="60" height="80" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_15px_rgba(251,191,36,0.9)]">
                  {/* Glowing Aura */}
                  <circle cx="30" cy="18" r="14" fill="#FBBF24" opacity="0.2" filter="blur(6px)" />
                  {/* Head */}
                  <circle cx="30" cy="18" r="10" fill="#FFFFFF" />
                  {/* Torso */}
                  <rect x="22" y="32" width="16" height="24" rx="8" fill="#FBBF24" />
                  {/* Left Arm (Reaching up) */}
                  <path d="M22 38 C14 38 10 26 10 20" stroke="#FBBF24" strokeWidth="6" strokeLinecap="round" />
                  {/* Right Arm (Holding down) */}
                  <path d="M38 38 C46 38 50 50 50 56" stroke="#FBBF24" strokeWidth="6" strokeLinecap="round" />
                  {/* Left Leg */}
                  <path d="M26 56 L20 70 L14 70" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Right Leg */}
                  <path d="M34 56 L40 64 L40 74" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Experience Cards */}
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative z-10"
            >
              {/* Connecting line from ladder to card */}
              <div className="absolute top-1/2 -left-8 md:-left-12 w-8 md:w-12 h-[2px] bg-gradient-to-r from-amber-500/60 to-transparent pointer-events-none hidden md:block" />

              {/* Glassmorphic timeline card */}
              <div className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden transition-all duration-300 hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)]">
                {/* Header details */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-amber-400" />
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5 text-white/70 text-sm font-medium">
                      <Building2 className="w-4 h-4 text-white/40" />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase px-3 py-1.5 rounded-full bg-amber-400/5 border border-amber-400/10 w-fit self-start md:self-center shrink-0">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Job description bullet list */}
                <ul className="space-y-3.5">
                  {exp.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-white/60 text-sm md:text-base font-light leading-relaxed">
                      <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
