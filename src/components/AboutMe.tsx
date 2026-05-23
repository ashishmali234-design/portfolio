"use client";

import { motion } from "framer-motion";
import { Sparkles, MapPin, Briefcase, Award } from "lucide-react";
import Typewriter from "./Typewriter";

export default function AboutMe() {
  return (
    <section id="about-me" className="relative z-20 py-24 px-6 md:px-12 bg-[#121212] overflow-hidden border-b border-white/5">
      {/* Dynamic ambient backgrounds */}
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="mb-16 text-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase min-h-[1.2em]"
          >
            <Typewriter segments={[{ text: "About ", className: "font-light text-white" }, { text: "Me", className: "font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400 inline-block" }]} delay={100} />
          </motion.h2>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Rich Bio Text (Spans 2 columns on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-2 space-y-6 text-base md:text-lg text-white/70 font-light leading-relaxed text-left"
          >
            <p>
              I’m a <span className="text-white font-semibold border-b border-amber-500/30">UI/UX Designer</span> passionate about creating clean, intuitive, and impactful digital experiences. I specialize in end-to-end product design, including user research, wireframing, UI design, prototyping, and design systems, with a strong focus on solving real user problems through thoughtful and user-centered design.
            </p>
            <p>
              Currently working at <span className="text-amber-400 font-semibold">Bajaj Finance</span>, I work on financial and merchant-based products including Gold Loan, Personal Loan, INSTA EMI, EDC Journeys, Sales One App, Enterprise Dashboard, and Bajaj Finserv for Business. I also create <span className="text-white font-medium">AI-driven experiences</span>, training videos, banners, GIFs, and digital creatives while collaborating on improving user journeys and modernizing digital platforms.
            </p>
            <p>
              Along with product design, I actively explore AI tools, modern interaction design, and emerging technologies to craft experiences that are simple, engaging, and <span className="text-amber-400 font-semibold">future-ready</span>.
            </p>
          </motion.div>

          {/* Right Column: Visual Accent Stats/Details Card (Spans 1 column) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="glass-card p-8 rounded-3xl border border-white/5 relative overflow-hidden flex flex-col justify-between"
          >
            {/* Soft decorative background pattern */}
            <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-amber-500/5 rounded-full blur-[40px] pointer-events-none" />

            <div className="space-y-6 text-left">
              {/* Header Badge */}
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="text-xs font-bold tracking-[0.25em] text-amber-400 uppercase">
                  Profile Accent
                </span>
              </div>

              {/* Roles / Stats */}
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-300 mt-0.5 shrink-0">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs text-white/40 uppercase font-bold tracking-wider">Current Position</h4>
                    <p className="text-sm font-semibold text-white mt-0.5">Product Designer</p>
                    <p className="text-xs text-amber-400/80 font-medium">Bajaj Finance Ltd.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-300 mt-0.5 shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs text-white/40 uppercase font-bold tracking-wider">Core Focus</h4>
                    <p className="text-sm font-semibold text-white mt-0.5">Financial UX & Product Thinking</p>
                    <p className="text-xs text-white/50 font-light">AI integration, Design Systems</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-300 mt-0.5 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs text-white/40 uppercase font-bold tracking-wider">Based In</h4>
                    <p className="text-sm font-semibold text-white mt-0.5">Pune, Maharashtra</p>
                    <p className="text-xs text-white/50 font-light">India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle bottom border highlight */}
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mt-8" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
