"use client";

import { motion } from "framer-motion";
import { Sparkles, Layers, Cpu, Bot } from "lucide-react";
import Typewriter from "./Typewriter";

export default function Skills() {
  const capabilities = [
    "UX Research",
    "Wireframing",
    "Prototyping",
    "User Flow Design",
    "Information Architecture",
    "Interaction Design",
    "Financial Product Design",
    "Dashboard Design",
    "Responsive Web Design",
    "Motion & Visual Design",
    "Design Systems",
    "AI-Driven Experiences"
  ];

  const primaryTools = [
    {
      name: "Antigravity IDE",
      highlight: false,
      icon: (
        <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 22h20L12 2zm0 3.8L18.5 18H5.5L12 5.8z" />
          <circle cx="12" cy="13" r="2" fill="currentColor" />
          <path d="M12 8v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    },
    {
      name: "ChatGPT",
      highlight: false,
      icon: (
        <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      )
    },
    {
      name: "Claude AI",
      highlight: false,
      icon: (
        <svg className="w-4 h-4 text-[#D97706]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2a1 1 0 0 1 .9.6l2.1 4.2 4.6.7a1 1 0 0 1 .6 1.7l-3.3 3.3.8 4.6a1 1 0 0 1-1.5 1.1L12 16.1l-4.1 2.1a1 1 0 0 1-1.5-1.1l.8-4.6-3.3-3.3a1 1 0 0 1 .6-1.7l4.6-.7L11.1 2.6A1 1 0 0 1 12 2z" />
        </svg>
      )
    },
    {
      name: "Gemini AI",
      highlight: false,
      icon: (
        <svg className="w-4 h-4 text-[#38BDF8]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2c.2 2.5 2 4.3 4.5 4.5-2.5.2-4.3 2-4.5 4.5-.2-2.5-2-4.3-4.5-4.5 2.5-.2 4.3-2 4.5-4.5zM19 13c.1 1.2 1 2.1 2.2 2.2-1.2.1-2.1 1-2.2 2.2-.1-1.2-1-2.1-2.2-2.2 1.2-.1 2.1-1 2.2-2.2zM7 14c.1.9.8 1.6 1.7 1.7-.9.1-1.6.8-1.7 1.7-.1-.9-.8-1.6-1.7-1.7.9-.1 1.6-.8 1.7-1.7z" />
        </svg>
      )
    },
    {
      name: "Figma AI",
      highlight: false,
      icon: (
        <svg className="w-4 h-4 text-[#FF7262]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z" />
        </svg>
      )
    },
    {
      name: "Magnific AI",
      highlight: false,
      icon: (
        <svg className="w-4 h-4 text-[#FF00C7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="6" />
          <path d="M16 16l5 5M16 8l1-1M8 16l-1 1" />
        </svg>
      )
    },
    {
      name: "Notebook LM",
      highlight: false,
      icon: (
        <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
          <path d="M6 6h10M6 10h10" />
        </svg>
      )
    },
    {
      name: "N8N Workflow",
      highlight: false,
      icon: (
        <svg className="w-4 h-4 text-[#FF6D5A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" xmlns="http://www.w3.org/2000/svg">
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="18" cy="18" r="3" />
          <path d="M9 12h3v-5h3" />
          <path d="M12 7v10h3" />
        </svg>
      )
    }
  ];

  const creativeTools = [
    {
      name: "Figma",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12C9.31371 12 12 9.31371 12 6Z" fill="#F24E1E"/>
          <path d="M6 12C2.68629 12 0 14.6863 0 18C0 21.3137 2.68629 24 6 24C9.31371 24 12 21.3137 12 18V12H6Z" fill="#A259FF"/>
          <path d="M6 24C2.68629 24 0 26.6863 0 30C0 33.3137 2.68629 36 6 36C9.31371 36 12 33.3137 12 30V24H6Z" fill="#0ACF83"/>
          <path d="M18 12C21.3137 12 24 14.6863 24 18C24 21.3137 21.3137 24 18 24C14.6863 24 12 21.3137 12 18C12 14.6863 14.6863 12 18 12Z" fill="#1ABCFE"/>
          <path d="M18 0C21.3137 0 24 2.68629 24 6C24 9.31371 21.3137 12 18 12C14.6863 12 12 9.31371 12 6C12 2.68629 14.6863 0 18 0Z" fill="#FF7262"/>
        </svg>
      )
    },
    {
      name: "ProtoPie",
      icon: (
        <svg className="w-5 h-5 text-[#FF5C00]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M12 2a10 10 0 0 1 10 10H12V2z" fill="#FF5C00" />
          <path d="M12 12v10A10 10 0 0 1 2 12h10z" fill="#FF8A00" />
        </svg>
      )
    },
    {
      name: "Framer Motion",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0L24 0L24 12L12 24L12 12L0 12L12 0Z" fill="url(#framer-grad-skills)" />
          <defs>
            <linearGradient id="framer-grad-skills" x1="0" y1="0" x2="24" y2="24">
              <stop offset="0%" stopColor="#FF00C7" />
              <stop offset="100%" stopColor="#00AFFF" />
            </linearGradient>
          </defs>
        </svg>
      )
    },
    {
      name: "Webflow",
      icon: (
        <svg className="w-5 h-5 text-[#4353FF]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.062 6.643c-.707.037-1.127.354-1.258.948l-2.025 9.176c-.053.243-.162.348-.328.313-.162-.036-.217-.183-.243-.377L16.48 7.915c-.131-.963-.64-1.298-1.52-1.262-.727.03-1.139.318-1.251.865l-1.956 9.344c-.052.247-.156.348-.316.319-.163-.03-.223-.178-.255-.373l-1.745-10.158c-.147-1.025-.658-1.398-1.558-1.353-.7.034-1.1.309-1.205.829L4.47 18.06c-.066.309-.163.44-.334.394-.17-.046-.226-.223-.238-.45L3.6 8.016c-.07-1.378-.605-1.986-1.605-1.936C.995 6.13 0 7.3 0 7.3l.425.96c.642-.258.847-.076.915.34l.794 10.378c.07 1.344.605 1.944 1.55 1.897.944-.047 1.432-.693 1.575-1.368l2.09-10.02c.038-.179.112-.249.227-.225.114.025.158.125.176.262l1.62 9.429c.148.989.65 1.368 1.545 1.323.896-.045 1.385-.635 1.536-1.344l2.127-10.177c.034-.16.108-.225.214-.202.106.023.149.123.167.247l1.868 8.468c.22 1.002.723 1.368 1.626 1.323.903-.045 1.378-.646 1.523-1.312l2.368-10.732c.247-1.127-.123-1.696-1.123-1.646z" />
        </svg>
      )
    },
    {
      name: "Spline 3D",
      icon: (
        <svg className="w-5 h-5 text-[#FF00C7]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="12" r="2" fill="#FF00C7" />
        </svg>
      )
    },
    {
      name: "After Effects",
      icon: (
        <div className="font-sans font-black text-[10px] tracking-tight select-none px-1.5 py-0.5 text-[#00E5FF] bg-[#002B3D] border border-[#00E5FF]/30 rounded-[4px] leading-tight">Ae</div>
      )
    },
    {
      name: "Photoshop",
      icon: (
        <div className="font-sans font-black text-[10px] tracking-tight select-none px-1.5 py-0.5 text-[#00CFFF] bg-[#001D33] border border-[#00CFFF]/30 rounded-[4px] leading-tight">Ps</div>
      )
    },
    {
      name: "Illustrator",
      icon: (
        <div className="font-sans font-black text-[10px] tracking-tight select-none px-1.5 py-0.5 text-[#FFC400] bg-[#331C00] border border-[#FFC400]/30 rounded-[4px] leading-tight">Ai</div>
      )
    },
    {
      name: "Premiere Pro",
      icon: (
        <div className="font-sans font-black text-[10px] tracking-tight select-none px-1.5 py-0.5 text-[#EA77FF] bg-[#2E003D] border border-[#EA77FF]/30 rounded-[4px] leading-tight">Pr</div>
      )
    }
  ];

  const techTools = [
    {
      name: "Antigravity IDE",
      icon: (
        <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 22h20L12 2zm0 3.8L18.5 18H5.5L12 5.8z" />
          <circle cx="12" cy="13" r="2" fill="currentColor" />
          <path d="M12 8v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    },
    {
      name: "Claude AI",
      icon: (
        <svg className="w-5 h-5 text-[#D97706]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2a1 1 0 0 1 .9.6l2.1 4.2 4.6.7a1 1 0 0 1 .6 1.7l-3.3 3.3.8 4.6a1 1 0 0 1-1.5 1.1L12 16.1l-4.1 2.1a1 1 0 0 1-1.5-1.1l.8-4.6-3.3-3.3a1 1 0 0 1 .6-1.7l4.6-.7L11.1 2.6A1 1 0 0 1 12 2z" />
        </svg>
      )
    },
    {
      name: "Gemini AI",
      icon: (
        <svg className="w-5 h-5 text-[#38BDF8]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2c.2 2.5 2 4.3 4.5 4.5-2.5.2-4.3 2-4.5 4.5-.2-2.5-2-4.3-4.5-4.5 2.5-.2 4.3-2 4.5-4.5zM19 13c.1 1.2 1 2.1 2.2 2.2-1.2.1-2.1 1-2.2 2.2-.1-1.2-1-2.1-2.2-2.2 1.2-.1 2.1-1 2.2-2.2zM7 14c.1.9.8 1.6 1.7 1.7-.9.1-1.6.8-1.7 1.7-.1-.9-.8-1.6-1.7-1.7.9-.1 1.6-.8 1.7-1.7z" />
        </svg>
      )
    },
    {
      name: "N8N Workflow",
      icon: (
        <svg className="w-5 h-5 text-[#FF6D5A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" xmlns="http://www.w3.org/2000/svg">
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="18" cy="18" r="3" />
          <path d="M9 12h3v-5h3" />
          <path d="M12 7v10h3" />
        </svg>
      )
    },
    {
      name: "Figma AI",
      icon: (
        <svg className="w-5 h-5 text-[#FF7262]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z" />
        </svg>
      )
    },
    {
      name: "Magnific AI",
      icon: (
        <svg className="w-5 h-5 text-[#FF00C7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="6" />
          <path d="M16 16l5 5M16 8l1-1M8 16l-1 1" />
        </svg>
      )
    },
    {
      name: "Notebook LM",
      icon: (
        <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
          <path d="M6 6h10M6 10h10" />
        </svg>
      )
    }
  ];

  return (
    <section id="skills" className="relative z-20 py-24 px-6 md:px-12 bg-[#121212] overflow-hidden">
      {/* Glow overlays */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto mb-20">
        {/* Section Header: My Expertise */}
        <div className="mb-16 text-left">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-bold tracking-[0.3em] text-amber-400 uppercase block mb-3"
          >
            TECHNOLOGIES & TOOLS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase min-h-[1.2em]"
          >
            <Typewriter segments={[{ text: "My ", className: "font-light text-white" }, { text: "Expertise", className: "font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400 inline-block" }]} delay={100} />
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Core Expertise (col-span-2) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card p-8 rounded-3xl md:col-span-2 flex flex-col justify-between min-h-[350px] hover:border-amber-500/30"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white uppercase">Core Expertise</h3>
              </div>
              <p className="text-sm md:text-base text-white/50 font-light leading-relaxed mb-8">
                Designing user-centered digital experiences with a focus on financial products, AI-integrated workflows, and scalable interface systems. Experienced in transforming complex processes into intuitive, engaging, and business-focused product experiences.
              </p>
            </div>
            
            <div>
              <h4 className="text-xs text-white/40 uppercase font-bold tracking-wider mb-3">Capabilities</h4>
              <div className="flex flex-wrap gap-2">
                {capabilities.map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] md:text-xs font-semibold tracking-wide text-white/80 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl hover:bg-amber-500/15 hover:border-amber-500/30 hover:text-white transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 2: AI & Design Stack (col-span-1) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8 rounded-3xl flex flex-col justify-between min-h-[350px] hover:border-purple-500/30 relative overflow-hidden"
          >
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-purple-500/10 rounded-full blur-[40px] pointer-events-none" />
            
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <Bot className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white uppercase">AI & Design Stack</h3>
              </div>
              <p className="text-xs md:text-sm text-white/50 font-light leading-relaxed mb-6">
                Leveraging AI-powered tools and modern workflows to accelerate ideation, automate repetitive tasks, enhance creativity, and prototype intelligent digital experiences faster.
              </p>
            </div>

            <div>
              <h4 className="text-xs text-white/40 uppercase font-bold tracking-wider mb-3">Primary Tools</h4>
              <div className="grid grid-cols-2 gap-2">
                {primaryTools.map((tool) => (
                  <div
                    key={tool.name}
                    className={`flex items-center gap-2 text-[10px] md:text-xs px-2.5 py-2 rounded-xl border transition-all ${
                      tool.highlight
                        ? "bg-gradient-to-r from-amber-500/10 to-yellow-600/10 border-amber-500/30 text-amber-300 font-semibold shadow-lg shadow-amber-500/5 animate-pulse col-span-2"
                        : "bg-white/5 border-white/5 text-white/70 hover:border-purple-500/20 hover:text-white"
                    }`}
                  >
                    <div className="shrink-0">{tool.icon}</div>
                    <span className="truncate">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>

      {/* Standalone Full-Width "My Toolkit" Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="w-full relative overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="mb-10 text-left">
            <h3 className="text-3xl md:text-4xl font-light text-white tracking-tight">
              My <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">Toolkit</span>
            </h3>
          </div>
        </div>

        {/* Marquee Rows Container */}
        <div className="relative -mx-6 md:-mx-12 py-8 overflow-hidden flex flex-col gap-6 select-none bg-gradient-to-b from-transparent via-white/[0.01] to-transparent border-y border-white/[0.04]">
          {/* Fade masks */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-[#121212] via-[#121212]/90 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-[#121212] via-[#121212]/90 to-transparent pointer-events-none z-10" />

          {/* Row 1: Creative Suite (Left scrolling - slowed down to 75s) */}
          <div className="flex gap-4 w-full overflow-hidden relative marquee-row">
            <div className="flex gap-4 shrink-0 animate-marquee-left">
              {[...creativeTools, ...creativeTools].map((tool, idx) => (
                <div
                  key={`creative-1-${tool.name}-${idx}`}
                  className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#161618]/90 border border-white/[0.08] hover:border-amber-500/30 hover:bg-[#1c1c1f]/90 hover:shadow-[0_0_20px_rgba(245,158,11,0.12)] transition-all duration-300 group cursor-default shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                >
                  <div className="flex items-center justify-center w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110">
                    {tool.icon}
                  </div>
                  <span className="text-sm font-semibold tracking-wide text-neutral-300 group-hover:text-white transition-colors duration-200">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-4 shrink-0 animate-marquee-left" aria-hidden="true">
              {[...creativeTools, ...creativeTools].map((tool, idx) => (
                <div
                  key={`creative-2-${tool.name}-${idx}`}
                  className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#161618]/90 border border-white/[0.08] hover:border-amber-500/30 hover:bg-[#1c1c1f]/90 hover:shadow-[0_0_20px_rgba(245,158,11,0.12)] transition-all duration-300 group cursor-default shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                >
                  <div className="flex items-center justify-center w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110">
                    {tool.icon}
                  </div>
                  <span className="text-sm font-semibold tracking-wide text-neutral-300 group-hover:text-white transition-colors duration-200">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: AI & Agentic Workflow (Right scrolling - slowed down to 75s) */}
          <div className="flex gap-4 w-full overflow-hidden relative marquee-row">
            <div className="flex gap-4 shrink-0 animate-marquee-right">
              {[...techTools, ...techTools, ...techTools].map((tool, idx) => (
                <div
                  key={`tech-1-${tool.name}-${idx}`}
                  className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#161618]/90 border border-white/[0.08] hover:border-amber-500/30 hover:bg-[#1c1c1f]/90 hover:shadow-[0_0_20px_rgba(245,158,11,0.12)] transition-all duration-300 group cursor-default shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                >
                  <div className="flex items-center justify-center w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110">
                    {tool.icon}
                  </div>
                  <span className="text-sm font-semibold tracking-wide text-neutral-300 group-hover:text-white transition-colors duration-200">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-4 shrink-0 animate-marquee-right" aria-hidden="true">
              {[...techTools, ...techTools, ...techTools].map((tool, idx) => (
                <div
                  key={`tech-2-${tool.name}-${idx}`}
                  className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#161618]/90 border border-white/[0.08] hover:border-amber-500/30 hover:bg-[#1c1c1f]/90 hover:shadow-[0_0_20px_rgba(245,158,11,0.12)] transition-all duration-300 group cursor-default shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                >
                  <div className="flex items-center justify-center w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110">
                    {tool.icon}
                  </div>
                  <span className="text-sm font-semibold tracking-wide text-neutral-300 group-hover:text-white transition-colors duration-200">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>



        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marqueeLeft {
            0% {
              transform: translate3d(0, 0, 0);
            }
            100% {
              transform: translate3d(calc(-100% - 16px), 0, 0);
            }
          }
          @keyframes marqueeRight {
            0% {
              transform: translate3d(calc(-100% - 16px), 0, 0);
            }
            100% {
              transform: translate3d(0, 0, 0);
            }
          }
          .animate-marquee-left {
            animation: marqueeLeft 75s linear infinite;
          }
          .animate-marquee-right {
            animation: marqueeRight 75s linear infinite;
          }
          .marquee-row:hover .animate-marquee-left,
          .marquee-row:hover .animate-marquee-right {
            animation-play-state: paused;
          }
        ` }} />
      </motion.div>
    </section>
  );
}
