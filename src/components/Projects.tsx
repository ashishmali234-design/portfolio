"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Send } from "lucide-react";
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
}

const projects: Project[] = [
  {
    title: "Prime Video Redesign",
    description: "A Lean UX strategic overhaul of Amazon Prime Video's landing portal, optimizing content discovery and IA paths through high-fidelity interactive design.",
    image: "/images/primevideo.png",
    tags: ["Lean UX", "Interaction Design", "Framer Motion", "Interactive Prototype"],
    link: "#",
    github: "#",
  },
  {
    title: "Aether Flow",
    description: "An interactive high-fidelity 3D fluid simulation playground using customized GLSL shaders and GPU computation.",
    image: "/images/aetherflow.png",
    tags: ["Creative Design", "WebGL Interaction", "3D Shaders", "Visual FX"],
    link: "#",
    github: "#",
  },
  {
    title: "Chronos OS",
    description: "A spatial computing holographic desktop mockup showcasing translucent glassmorphism widget environments.",
    image: "/images/chronos.png",
    tags: ["Product Design", "Framer Motion", "Design System", "Spatial UI"],
    link: "#",
    github: "#",
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                
                {/* Immersive blur and explore overlay on hover for Prime Video */}
                {project.title === "Prime Video Redesign" && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center gap-3">
                    <div className="px-5 py-2.5 rounded-full bg-cyan-500 text-black font-extrabold text-xs tracking-widest uppercase shadow-[0_0_20px_rgba(6,182,212,0.4)] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      Explore Redesign
                    </div>
                  </div>
                )}
              </div>

              {/* Card Details */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className={`text-2xl font-bold tracking-tight text-white transition-colors duration-300 ${
                    project.title === "Prime Video Redesign" ? "group-hover:text-cyan-400" : ""
                  }`}>
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
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

        {/* Contact Form Section */}
        <motion.div 
          id="contact"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 p-8 md:p-12 glass-card rounded-3xl relative overflow-hidden pointer-events-auto"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-bold tracking-[0.3em] text-amber-500 uppercase block mb-3">
                Get In Touch
              </span>
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase mb-4 min-h-[1.2em]">
                <Typewriter text="Let's collaborate" delay={150} />
              </h3>
              <p className="text-sm md:text-base text-white/60 font-light leading-relaxed max-w-sm mb-6">
                Have a project in mind, want to build something cinematic, or just chat? Feel free to reach out.
              </p>
              <div className="text-sm font-semibold tracking-wide text-white/80">
                Email: contact@ashishmali.com
              </div>
            </div>

            {/* Mock Contact form */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-amber-500 transition-colors text-sm"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-amber-500 transition-colors text-sm"
                  required
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-amber-500 transition-colors text-sm resize-none"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-semibold text-sm hover:from-amber-600 hover:to-yellow-700 transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98]"
              >
                Send Message
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-white/5 text-center text-xs text-white/40 tracking-wider">
          &copy; {new Date().getFullYear()} ASHISH C MALI. ALL RIGHTS RESERVED. DESIGNED & BUILT WITH PASSION.
        </div>
      </div>
    </section>
  );
}
