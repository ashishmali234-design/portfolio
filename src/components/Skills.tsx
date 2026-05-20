"use client";

import { motion } from "framer-motion";
import { Cpu, Bot, GraduationCap, Sparkles, Award, Layers } from "lucide-react";
import Typewriter from "./Typewriter";

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

  const creativeTools = [
    { name: "Figma", level: "Expert" },
    { name: "ProtoPie", level: "Advanced" },
    { name: "Spline 3D", level: "Advanced" },
    { name: "Framer / Webflow", level: "Intermediate" },
    { name: "After Effects", level: "Advanced" },
    { name: "Premiere Pro", level: "Advanced" },
    { name: "Photoshop & Illustrator", level: "Expert" },
  ];

  const aiTools = [
    { name: "Antigravity IDE", highlight: true },
    { name: "Claude AI", highlight: false },
    { name: "Gemini AI", highlight: false },
    { name: "N8N (Agentic Workflow)", highlight: false },
    { name: "Figma AI & Magnific", highlight: false },
    { name: "Notebook LM", highlight: false },
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
            {/* Ambient Background Glow specific for AI card */}
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

          {/* Card 3: Design & Motion Tools (col-span-1) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card p-8 rounded-3xl flex flex-col justify-between min-h-[300px] hover:border-cyan-500/30"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white uppercase">Design & Motion</h3>
              </div>
              <p className="text-xs md:text-sm text-white/50 font-light leading-relaxed mb-6">
                Translating static visual principles into fluid, high-fidelity digital interactions using professional layout and keyframe animation software.
              </p>
            </div>

            <div className="space-y-2">
              {creativeTools.map((tool) => (
                <div
                  key={tool.name}
                  className="flex justify-between items-center text-xs text-white/70 py-1.5 border-b border-white/5 hover:text-white transition-colors"
                >
                  <span className="font-medium">{tool.name}</span>
                  <span className="text-[10px] tracking-wider text-cyan-400 uppercase font-semibold">
                    {tool.level}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 4: Background & Philosophy (col-span-2) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card p-8 rounded-3xl md:col-span-2 flex flex-col justify-between min-h-[300px] hover:border-amber-500/30 relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[60px] pointer-events-none" />

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white uppercase">Academic Foundation</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                <div>
                  <h4 className="text-lg font-bold text-white leading-snug">
                    B.Sc. in Animation Science
                  </h4>
                  <p className="text-sm text-amber-400/90 font-semibold tracking-wider uppercase mt-1">
                    Yashwantrao Chavan Institute
                  </p>
                  <p className="text-xs text-white/40 mt-1">Satara • Graduated 2023</p>
                  
                  <div className="mt-4 flex items-center gap-2 text-sm text-white/80">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>Graduated with an outstanding CGPA of <strong>9.02</strong></span>
                  </div>
                </div>

                <div className="border-t sm:border-t-0 sm:border-l border-white/10 pt-6 sm:pt-0 sm:pl-6 flex flex-col justify-between">
                  <h4 className="text-sm font-semibold text-white/80 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    Animation to UX Bridge
                  </h4>
                  <p className="text-xs md:text-sm text-white/50 leading-relaxed font-light">
                    My training in Animation Science provides a unique structural foundation in motion design, spacing, timing, and dynamic layout, which directly translates into creating highly fluid and immersive digital interfaces.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 border-t border-white/5 pt-4 text-center sm:text-left text-[11px] tracking-wider text-white/40 uppercase">
              Merging visual timing principles with functional product design systems.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
