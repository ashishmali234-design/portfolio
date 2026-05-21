"use client";

import { motion } from "framer-motion";
import { Cpu, Bot, Sparkles, Layers } from "lucide-react";
import Typewriter from "./Typewriter";

interface ToolLogo {
  name: string;
  color: string;
  glow: string;
  customRender: React.ReactNode;
  initialX: string;
  initialY: string;
  floatDelay: number;
}

export default function Skills() {
  const coreExpertise = [
    "UX Research",
    "Wireframing",
    "Prototyping",
    "User Flow",
    "Information Architecture",
    "Interaction Design",
    "Financial Product Design",
    "Design Systems",
  ];

  const aiTools = [
    { name: "Antigravity IDE", highlight: true },
    { name: "Claude AI", highlight: false },
    { name: "Gemini AI", highlight: false },
    { name: "N8N (Agentic Workflow)", highlight: false },
    { name: "Figma AI & Magnific", highlight: false },
    { name: "Notebook LM", highlight: false },
  ];

  // Stylized SVGs and custom components for design & motion tools
  const floatingLogos: ToolLogo[] = [
    {
      name: "Figma",
      color: "border-[#F24E1E]/30 text-[#F24E1E]",
      glow: "shadow-[#F24E1E]/10",
      initialX: "left-[5%] md:left-[10%]",
      initialY: "top-[15%] md:top-[20%]",
      floatDelay: 0,
      customRender: (
        <svg className="w-8 h-8" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      color: "border-[#FF5C00]/30 text-[#FF5C00]",
      glow: "shadow-[#FF5C00]/10",
      initialX: "left-[35%] md:left-[25%]",
      initialY: "top-[40%] md:top-[15%]",
      floatDelay: 0.8,
      customRender: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M12 2a10 10 0 0 1 10 10H12V2z" fill="#FF5C00" />
          <path d="M12 12v10A10 10 0 0 1 2 12h10z" fill="#FF8A00" />
        </svg>
      )
    },
    {
      name: "Framer",
      color: "border-[#00AFFF]/30 text-white",
      glow: "shadow-[#00AFFF]/10",
      initialX: "left-[65%] md:left-[42%]",
      initialY: "top-[15%] md:top-[25%]",
      floatDelay: 1.5,
      customRender: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0L24 0L24 12L12 24L12 12L0 12L12 0Z" />
        </svg>
      )
    },
    {
      name: "Webflow",
      color: "border-[#4353FF]/30 text-[#4353FF]",
      glow: "shadow-[#4353FF]/10",
      initialX: "left-[15%] md:left-[58%]",
      initialY: "top-[50%] md:top-[15%]",
      floatDelay: 0.4,
      customRender: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.062 6.643c-.707.037-1.127.354-1.258.948l-2.025 9.176c-.053.243-.162.348-.328.313-.162-.036-.217-.183-.243-.377L16.48 7.915c-.131-.963-.64-1.298-1.52-1.262-.727.03-1.139.318-1.251.865l-1.956 9.344c-.052.247-.156.348-.316.319-.163-.03-.223-.178-.255-.373l-1.745-10.158c-.147-1.025-.658-1.398-1.558-1.353-.7.034-1.1.309-1.205.829L4.47 18.06c-.066.309-.163.44-.334.394-.17-.046-.226-.223-.238-.45L3.6 8.016c-.07-1.378-.605-1.986-1.605-1.936C.995 6.13 0 7.3 0 7.3l.425.96c.642-.258.847-.076.915.34l.794 10.378c.07 1.344.605 1.944 1.55 1.897.944-.047 1.432-.693 1.575-1.368l2.09-10.02c.038-.179.112-.249.227-.225.114.025.158.125.176.262l1.62 9.429c.148.989.65 1.368 1.545 1.323.896-.045 1.385-.635 1.536-1.344l2.127-10.177c.034-.16.108-.225.214-.202.106.023.149.123.167.247l1.868 8.468c.22 1.002.723 1.368 1.626 1.323.903-.045 1.378-.646 1.523-1.312l2.368-10.732c.247-1.127-.123-1.696-1.123-1.646z" />
        </svg>
      )
    },
    {
      name: "Spline 3D",
      color: "border-[#FF00C7]/30 text-white",
      glow: "shadow-[#FF00C7]/10",
      initialX: "left-[45%] md:left-[76%]",
      initialY: "top-[65%] md:top-[25%]",
      floatDelay: 1.2,
      customRender: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="12" r="2" fill="#FF00C7" />
        </svg>
      )
    },
    {
      name: "After Effects",
      color: "border-[#0094FF]/30 text-[#00E5FF]",
      glow: "shadow-[#0094FF]/10",
      initialX: "left-[75%] md:left-[18%]",
      initialY: "top-[40%] md:top-[60%]",
      floatDelay: 0.5,
      customRender: (
        <div className="font-sans font-black text-base select-none px-1">Ae</div>
      )
    },
    {
      name: "Premiere Pro",
      color: "border-[#EA77FF]/30 text-[#F9A8FF]",
      glow: "shadow-[#EA77FF]/10",
      initialX: "left-[5%] md:left-[35%]",
      initialY: "top-[75%] md:top-[65%]",
      floatDelay: 1.4,
      customRender: (
        <div className="font-sans font-black text-base select-none px-1">Pr</div>
      )
    },
    {
      name: "Photoshop",
      color: "border-[#00A2FF]/30 text-[#00CFFF]",
      glow: "shadow-[#00A2FF]/10",
      initialX: "left-[30%] md:left-[55%]",
      initialY: "top-[80%] md:top-[60%]",
      floatDelay: 0.9,
      customRender: (
        <div className="font-sans font-black text-base select-none px-1">Ps</div>
      )
    },
    {
      name: "Illustrator",
      color: "border-[#FF9A00]/30 text-[#FFC400]",
      glow: "shadow-[#FF9A00]/10",
      initialX: "left-[60%] md:left-[72%]",
      initialY: "top-[80%] md:top-[65%]",
      floatDelay: 2.0,
      customRender: (
        <div className="font-sans font-black text-base select-none px-1">Ai</div>
      )
    }
  ];

  return (
    <section id="skills" className="relative z-20 py-24 px-6 md:px-12 bg-[#121212] overflow-hidden">
      {/* Glow overlays */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="mb-16 text-left">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-bold tracking-[0.3em] text-amber-500 uppercase block mb-3"
          >
            Capabilities
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase min-h-[1.2em]"
          >
            <Typewriter text="Skills & Toolkit" delay={100} />
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
            className="glass-card p-8 rounded-3xl md:col-span-2 flex flex-col justify-between min-h-[300px] hover:border-amber-500/30"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white uppercase">Core Expertise</h3>
              </div>
              <p className="text-sm md:text-base text-white/50 font-light leading-relaxed mb-6">
                Applying user-centered processes to structure interfaces, validate ideas through quick prototype loops, and architect scalable visual frameworks.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2.5">
              {coreExpertise.map((skill) => (
                <span
                  key={skill}
                  className="text-xs font-medium tracking-wider text-white/80 bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl hover:bg-amber-500/15 hover:border-amber-500/30 hover:text-white transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Card 2: AI & Agentic Stack (col-span-1) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8 rounded-3xl flex flex-col justify-between min-h-[300px] hover:border-purple-500/30 relative overflow-hidden"
          >
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-purple-500/10 rounded-full blur-[40px] pointer-events-none" />
            
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <Bot className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white uppercase">AI & Agentic Stack</h3>
              </div>
              <p className="text-xs md:text-sm text-white/50 font-light leading-relaxed mb-6">
                Leveraging next-generation cognitive tools and agentic frameworks to accelerate workflows and prototype AI-integrated product concepts.
              </p>
            </div>

            <div className="space-y-2.5">
              {aiTools.map((tool) => (
                <div
                  key={tool.name}
                  className={`flex items-center justify-between text-xs px-3.5 py-2 rounded-xl border transition-all ${
                    tool.highlight
                      ? "bg-gradient-to-r from-amber-500/10 to-yellow-600/10 border-amber-500/30 text-amber-300 font-semibold shadow-lg shadow-amber-500/5 animate-pulse"
                      : "bg-white/5 border-white/5 text-white/70 hover:border-purple-500/20 hover:text-white"
                  }`}
                >
                  <span>{tool.name}</span>
                  {tool.highlight && (
                    <span className="text-[9px] uppercase tracking-widest bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-md font-bold">
                      Primary
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 3: Animated Floating Logos (col-span-3) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass-card p-8 rounded-3xl md:col-span-3 min-h-[350px] md:min-h-[400px] flex flex-col justify-between hover:border-cyan-500/30 relative overflow-hidden"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white uppercase">Design & Motion Suite</h3>
              </div>
              <p className="text-sm text-white/50 font-light leading-relaxed max-w-xl">
                Highly fluent in industry-standard design tools and visual dynamic suites. Drag or hover over icons to explore the creative stack.
              </p>
            </div>

            {/* Floating Area Canvas */}
            <div className="relative w-full h-[220px] md:h-[260px] overflow-hidden mt-6 bg-black/10 rounded-2xl border border-white/5">
              {floatingLogos.map((logo) => (
                <motion.div
                  key={logo.name}
                  className={`absolute ${logo.initialX} ${logo.initialY} flex flex-col items-center group cursor-pointer z-10`}
                  animate={{
                    y: [0, -12, 0],
                    x: [0, 6, 0],
                  }}
                  transition={{
                    duration: 4.5 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: logo.floatDelay,
                  }}
                  whileHover={{ scale: 1.15, zIndex: 20 }}
                >
                  {/* Floating Bubble */}
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-black/40 backdrop-blur-md border ${logo.color} flex items-center justify-center shadow-lg ${logo.glow} group-hover:bg-[#121212] group-hover:border-white/20 transition-all duration-300`}>
                    {logo.customRender}
                  </div>
                  {/* Tool Name Badge */}
                  <span className="mt-2 text-[10px] tracking-wider text-white/40 uppercase font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {logo.name}
                  </span>
                </motion.div>
              ))}
              
              {/* Subtle background connection lines */}
              <div className="absolute inset-0 grid-bg pointer-events-none opacity-20" />
            </div>

            <div className="border-t border-white/5 pt-4 text-xs text-white/40 tracking-widest uppercase flex justify-between items-center">
              <span>Interactive Toolkit Playroom</span>
              <span className="flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-cyan-400" /> TIMING & TIMELINES
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
