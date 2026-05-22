"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Typewriter from "./Typewriter";

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);


interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  github: string;
  isComingSoon?: boolean;
}

const projects: Project[] = [
  {
    title: "Prime Video Redesign",
    description: "A Lean UX strategic overhaul of Amazon Prime Video's landing portal, optimizing content discovery and IA paths through high-fidelity interactive design.",
    image: "/images/primevideo_cover_final.jpg",
    tags: ["Lean UX", "Interaction Design", "Framer Motion", "Interactive Prototype"],
    link: "#",
    github: "#",
  },
  {
    title: "MedApp - Doctor's Appointment Booking App",
    description: "A comprehensive digital healthcare ecosystem designed for seamless patient scheduling, real-time doctor availability consultations, and smart prescriptions.",
    image: "/images/medapp_cover.png",
    tags: ["UX Research", "Mobile Design", "Healthcare"],
    link: "#",
    github: "#",
    isComingSoon: true,
  },
  {
    title: "boAt Landing Page",
    description: "A dark-mode, high-fidelity landing page interface highlighting the energetic audio performance and lifestyle brand language of boAt acoustics.",
    image: "/images/boat_cover.png",
    tags: ["Visual Design", "Landing Page", "Web UI"],
    link: "#",
    github: "#",
    isComingSoon: true,
  },
];

interface ProjectsProps {
  onOpenPrimeVideo?: () => void;
}

export default function Projects({ onOpenPrimeVideo }: ProjectsProps) {
  return (
    <section id="projects" className="relative z-20 py-24 px-6 md:px-12 bg-[#121212] overflow-hidden">
      
      {/* Decorative radial gradients for glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="mb-16 text-left">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-bold tracking-[0.3em] text-amber-500 uppercase block mb-3"
          >
            Curated Works
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase min-h-[1.2em]"
          >
            <Typewriter text="Selected Projects" delay={100} />
          </motion.h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              onClick={() => {
                if (project.title === "Prime Video Redesign") {
                  onOpenPrimeVideo?.();
                }
              }}
              className={`glass-card flex flex-col h-full rounded-2xl overflow-hidden pointer-events-auto group ${
                project.title === "Prime Video Redesign" ? "cursor-pointer" : ""
              }`}
            >
              {/* Image Preview Container */}
              <div className="relative aspect-square w-full overflow-hidden bg-black/40">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-60" />
                
                {/* Coming Soon Glass Badge */}
                {project.isComingSoon && (
                  <div className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-black/60 border border-amber-500/30 text-amber-400 text-[9px] uppercase tracking-widest font-black backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                    Coming Soon
                  </div>
                )}

                {/* Immersive blur and explore overlay on hover for Prime Video */}
                {project.title === "Prime Video Redesign" && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center gap-3">
                    <div className="px-5 py-2.5 rounded-full bg-cyan-500 text-black font-extrabold text-xs tracking-widest uppercase shadow-[0_0_20px_rgba(6,182,212,0.4)] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      Explore Redesign
                    </div>
                  </div>
                )}

                {/* Coming Soon Overlay */}
                {project.isComingSoon && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center gap-3">
                    <div className="px-5 py-2.5 rounded-full bg-amber-500 text-black font-extrabold text-xs tracking-widest uppercase shadow-[0_0_20px_rgba(245,158,11,0.4)] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      Coming Soon
                    </div>
                  </div>
                )}
              </div>

              {/* Card Details */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start gap-2 mb-3">
                  <h3 className={`text-2xl font-bold tracking-tight text-white transition-colors duration-300 ${
                    project.title === "Prime Video Redesign" 
                      ? "group-hover:text-cyan-400" 
                      : project.isComingSoon 
                        ? "group-hover:text-amber-400" 
                        : "group-hover:text-amber-500"
                  }`}>
                    {project.title}
                  </h3>
                  <div className="flex gap-2 shrink-0">
                    {project.title === "Prime Video Redesign" ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenPrimeVideo?.();
                        }}
                        className="p-1.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 transition-colors border border-cyan-500/20 cursor-pointer"
                        aria-label={`${project.title} live case study`}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    ) : project.isComingSoon ? (
                      <span className="text-[9px] tracking-widest uppercase font-black text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full">
                        Soon
                      </span>
                    ) : (
                      <>
                        <a
                          href={project.github}
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-full bg-white/5 hover:bg-amber-500/20 text-white/70 hover:text-white transition-colors border border-white/5"
                          aria-label={`${project.title} Github`}
                        >
                          <Github className="w-4 h-4" />
                        </a>
                        <a
                          href={project.link}
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-full bg-white/5 hover:bg-amber-500/20 text-white/70 hover:text-white transition-colors border border-white/5"
                          aria-label={`${project.title} live demo`}
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      </>
                    )}
                  </div>
                </div>

                <p className="text-sm text-white/60 font-light leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md border ${
                        project.title === "Prime Video Redesign"
                          ? "text-cyan-400 bg-cyan-400/5 border-cyan-400/10"
                          : project.isComingSoon
                            ? "text-amber-400 bg-amber-400/5 border-amber-400/10"
                            : "text-amber-500 bg-amber-500/5 border-amber-500/10"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
