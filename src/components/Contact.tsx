"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import Typewriter from "./Typewriter";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Construct professional prefilled email text
    const subject = `Portfolio Inquiry from ${name}`;
    const body = `Hi Ashish,\n\nI filled out the contact form on your portfolio website with the following details:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nBest regards,\n${name}`;
    const mailtoUrl = `mailto:ashishmali234@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Simulate premium visual delay and trigger email client opening
    setTimeout(() => {
      window.location.href = mailtoUrl;
      setStatus("success");

      // Reset contact states after success feedback
      setTimeout(() => {
        setStatus("idle");
        setName("");
        setEmail("");
        setMessage("");
      }, 5000);
    }, 1000);
  };

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
            <div className="text-left">
              <span className="text-xs font-bold tracking-[0.3em] text-amber-400 uppercase block mb-3">
                GET IN TOUCH
              </span>
              <h3 className="text-3xl md:text-4xl font-black tracking-tight text-white uppercase mb-4 min-h-[1.2em]">
                <Typewriter segments={[{ text: "Let's Work ", className: "font-light" }, { text: "Together", className: "font-extrabold" }]} delay={150} />
              </h3>
              <p className="text-sm md:text-base text-white/60 font-light leading-relaxed max-w-sm mb-6">
                Have a project in mind, want to build something cinematic, or just chat? Feel free to reach out.
              </p>
              <div className="text-sm font-semibold tracking-wide text-white/80">
                Email:{" "}
                <a 
                  href="mailto:ashishmali234@gmail.com" 
                  className="text-amber-400 hover:text-amber-300 hover:underline transition-all duration-300"
                >
                  ashishmali234@gmail.com
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-amber-500 transition-colors text-sm"
                  required
                  disabled={status === "submitting"}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-amber-500 transition-colors text-sm"
                  required
                  disabled={status === "submitting"}
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-amber-500 transition-colors text-sm resize-none"
                  required
                  disabled={status === "submitting"}
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={status === "submitting" || status === "success"}
                className={`w-full flex justify-center items-center gap-2 px-6 py-3.5 rounded-lg font-extrabold text-xs tracking-widest uppercase transition-all shadow-lg active:scale-[0.98] cursor-pointer ${
                  status === "success"
                    ? "bg-emerald-500 text-white shadow-emerald-500/20"
                    : status === "submitting"
                    ? "bg-amber-500/50 text-black cursor-wait shadow-amber-500/10"
                    : "bg-amber-500 hover:bg-amber-400 text-black shadow-amber-500/20"
                }`}
              >
                {status === "success" ? (
                  <>
                    Email Client Opened!
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                ) : status === "submitting" ? (
                  "Opening Email Client..."
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              <AnimatePresence>
                {status === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-xs text-emerald-400 text-left font-medium mt-2 flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Prefilled message prepared! If your email app did not open automatically, please send direct to <a href="mailto:ashishmali234@gmail.com" className="underline hover:text-white">ashishmali234@gmail.com</a>
                  </motion.p>
                )}
              </AnimatePresence>
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
