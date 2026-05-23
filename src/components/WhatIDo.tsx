"use client";

import { motion } from "framer-motion";
import { Bot, Layers, TrendingUp, Video, Grid, Sparkles } from "lucide-react";
import Typewriter from "./Typewriter";

export default function WhatIDo() {
  const capabilities = [
    {
      title: "AI-Driven Product Design",
      description: "Designing intelligent and user-focused digital experiences by combining UX strategy, modern UI, and AI-powered workflows. Using AI tools to speed up ideation, content generation, interaction concepts, user experience improvements, and creative production.",
      icon: <Bot className="w-5 h-5 text-white" />,
      iconBg: "bg-white/5 border-white/10 text-white",
      hoverStyle: "hover:border-indigo-500/30 hover:shadow-[0_0_30px_rgba(99,102,241,0.12)]",
      glowColor: "from-indigo-500/5 to-transparent"
    },
    {
      title: "Product & UX Design",
      description: "Creating user flows, wireframes, prototypes, and scalable UI systems for web and mobile products focused on usability and business impact.",
      icon: <Layers className="w-5 h-5 text-white" />,
      iconBg: "bg-white/5 border-white/10 text-white",
      hoverStyle: "hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.12)]",
      glowColor: "from-emerald-500/5 to-transparent"
    },
    {
      title: "Financial Product Experiences",
      description: "Designing digital journeys for Gold Loan, Personal Loan, INSTA EMI, EDC onboarding, merchant ecosystems, and enterprise platforms.",
      icon: <TrendingUp className="w-5 h-5 text-white" />,
      iconBg: "bg-white/5 border-white/10 text-white",
      hoverStyle: "hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.12)]",
      glowColor: "from-amber-500/5 to-transparent"
    },
    {
      title: "Creative & Motion Content",
      description: "Creating training videos, banners, GIFs, and digital creatives that enhance communication, engagement, and product understanding.",
      icon: <Video className="w-5 h-5 text-white" />,
      iconBg: "bg-white/5 border-white/10 text-white",
      hoverStyle: "hover:border-rose-500/30 hover:shadow-[0_0_30px_rgba(244,63,94,0.12)]",
      glowColor: "from-rose-500/5 to-transparent"
    },
    {
      title: "Design Systems & Consistency",
      description: "Building scalable design systems and reusable components to maintain consistency across products and platforms.",
      icon: <Grid className="w-5 h-5 text-white" />,
      iconBg: "bg-white/5 border-white/10 text-white",
      hoverStyle: "hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.12)]",
      glowColor: "from-cyan-500/5 to-transparent"
    },
    {
      title: "Emerging Technology Exploration",
      description: "Exploring AI, automation, immersive interfaces, and future-focused digital experiences to create smarter and more intuitive products.",
      icon: <Sparkles className="w-5 h-5 text-white" />,
      iconBg: "bg-white/5 border-white/10 text-white",
      hoverStyle: "hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.12)]",
      glowColor: "from-purple-500/5 to-transparent"
    }
  ];

  return (
    <section id="what-i-do" className="relative z-20 py-24 px-6 md:px-12 bg-[#121212] overflow-hidden border-b border-white/5">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

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

        {/* 3-Column Capability Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, idx) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className={`group glass-card p-8 rounded-3xl min-h-[280px] relative overflow-hidden flex flex-col items-start transition-all duration-300 ${cap.hoverStyle}`}
            >
              {/* Subtle background card gradient glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cap.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              <div className="relative z-10 w-full">
                {/* Icon + Title Header */}
                <div className="flex items-center gap-4 mb-4">
                  {/* Icon Badge */}
                  <div className={`inline-flex items-center justify-center p-2.5 rounded-xl border bg-black/40 shadow-inner shrink-0 transition-transform duration-300 group-hover:scale-110 ${cap.iconBg}`}>
                    {cap.icon}
                  </div>
                  {/* Capability Title */}
                  <h3 className="text-base md:text-lg font-bold tracking-tight text-white group-hover:text-white transition-colors duration-200 uppercase leading-snug">
                    {cap.title}
                  </h3>
                </div>

                {/* Description Subtext */}
                <p className="text-xs md:text-sm text-white/50 font-light leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                  {cap.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
