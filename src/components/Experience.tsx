"use client";

import { motion } from "framer-motion";
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
  return (
    <section id="experience" className="relative z-20 py-24 px-6 md:px-12 bg-[#121212] overflow-hidden">
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
            <Typewriter segments={[{ text: "Career ", className: "font-light" }, { text: "Journey", className: "font-extrabold" }]} delay={100} />
          </motion.h2>
        </div>

        {/* Timeline Path */}
        <div className="relative border-l border-white/10 pl-6 md:pl-10 ml-4 md:ml-6 space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              {/* Glowing timeline node dot */}
              <span className="absolute -left-[35px] md:-left-[51px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#121212] border border-white/20 shadow-md">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400 animate-pulse" />
              </span>

              {/* Glassmorphic timeline card */}
              <div className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden transition-all duration-300 hover:border-amber-500/30">
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

                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase px-3 py-1.5 rounded-full bg-amber-400/5 border border-amber-400/10 w-fit self-start md:self-center">
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
