"use client";

import { motion } from "framer-motion";
import { Layers, Cpu, Zap, Monitor } from "lucide-react";

export default function WhatIDo() {
  const capabilities = [
    {
      title: "Frontend Architecture",
      description: "Designing scalable, maintainable, and high-performance frontend systems for enterprise applications using React, Next.js, and TypeScript.",
      icon: <Layers className="w-5 h-5 text-indigo-400" />,
      iconBg: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
      hoverStyle: "hover:border-indigo-500/30 hover:shadow-[0_0_30px_rgba(99,102,241,0.12)]",
      glowColor: "from-indigo-500/5 to-transparent"
    },
    {
      title: "Full-Stack Development",
      description: "Building seamless end-to-end applications with robust Node.js backend services and modern interactive user interfaces.",
      icon: <Cpu className="w-5 h-5 text-emerald-400" />,
      iconBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
      hoverStyle: "hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.12)]",
      glowColor: "from-emerald-500/5 to-transparent"
    },
    {
      title: "Performance Optimization",
      description: "Identifying bottlenecks and implementing strategies across the stack to ensure lightning-fast load times and smooth rendering.",
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      iconBg: "bg-amber-500/10 border-amber-500/20 text-amber-400",
      hoverStyle: "hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.12)]",
      glowColor: "from-amber-500/5 to-transparent"
    },
    {
      title: "UI/UX Engineering",
      description: "Translating complex design systems into pixel-perfect, accessible, and responsive digital experiences.",
      icon: <Monitor className="w-5 h-5 text-rose-400" />,
      iconBg: "bg-rose-500/10 border-rose-500/20 text-rose-400",
      hoverStyle: "hover:border-rose-500/30 hover:shadow-[0_0_30px_rgba(244,63,94,0.12)]",
      glowColor: "from-rose-500/5 to-transparent"
    }
  ];

  return (
    <section id="about-me" className="relative z-20 py-24 px-6 md:px-12 bg-[#121212] overflow-hidden border-b border-white/5">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Title Block */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-light text-white tracking-tight"
          >
            About <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-300">Me</span>
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 px-4 py-1.5 rounded-full bg-white/5 border border-white/10"
          >
            <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-neutral-400 uppercase">
              Core Capabilities
            </span>
          </motion.div>
        </div>

        {/* 2-Column Capability Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {capabilities.map((cap, idx) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`group glass-card p-8 md:p-10 rounded-3xl min-h-[250px] relative overflow-hidden flex flex-col justify-between transition-all duration-300 ${cap.hoverStyle}`}
            >
              {/* Subtle background card gradient glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cap.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              <div>
                {/* Icon Badge */}
                <div className={`inline-flex items-center justify-center p-3 rounded-2xl border bg-black/40 shadow-inner shrink-0 mb-6 transition-transform duration-300 group-hover:scale-110 ${cap.iconBg}`}>
                  {cap.icon}
                </div>

                {/* Capability Title */}
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-4 group-hover:text-white transition-colors duration-200">
                  {cap.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-sm md:text-base text-white/50 font-light leading-relaxed max-w-lg mt-2 group-hover:text-white/70 transition-colors duration-300">
                {cap.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
