"use client";

import { motion } from "framer-motion";
import { Cpu, Bot } from "lucide-react";
import Typewriter from "./Typewriter";

export default function WhatIDo() {
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

  return (
    <section id="what-i-do" className="relative z-20 py-24 px-6 md:px-12 bg-[#121212] overflow-hidden border-b border-white/5">
      {/* Glow overlays */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Title Block - No small yellow text as requested */}
        <div className="mb-16 text-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase min-h-[1.2em]"
          >
            <Typewriter segments={[{ text: "What I ", className: "font-light text-white" }, { text: "Do", className: "font-extrabold text-white" }]} delay={100} />
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
        </div>
      </div>
    </section>
  );
}
