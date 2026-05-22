"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import Typewriter from "./Typewriter";

export default function Contact() {
  return (
    <section id="contact" className="relative z-20 py-16 px-6 md:px-12 bg-[#121212] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Contact Form Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-8 md:p-12 glass-card rounded-3xl relative overflow-hidden pointer-events-auto"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-bold tracking-[0.3em] text-amber-500 uppercase block mb-3">
                Get In Touch
              </span>
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase mb-4 min-h-[1.2em]">
                <Typewriter text="Let's Work Together" delay={150} />
              </h3>
              <p className="text-sm md:text-base text-white/60 font-light leading-relaxed max-w-sm mb-6">
                Have a project in mind, want to build something cinematic, or just chat? Feel free to reach out.
              </p>
              <div className="text-sm font-semibold tracking-wide text-white/80">
                Email: contact@ashishmali.com
              </div>
            </div>

            {/* Contact Form */}
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
                className="w-full flex justify-center items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-semibold text-sm hover:from-amber-600 hover:to-yellow-700 transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98] cursor-pointer"
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
