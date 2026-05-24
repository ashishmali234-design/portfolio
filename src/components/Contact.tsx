"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import Typewriter from "./Typewriter";

// Custom official LinkedIn SVG Icon Component (Filled Variant)
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

// Custom official Behance SVG Icon Component
const BehanceIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 100 100"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M2.94843 21.2339C3.2396 21.198 3.53183 21.1709 3.82467 21.153C5.39184 21.059 7.4209 21.111 9.01687 21.1113L18.003 21.1133L26.5643 21.1102C33.4828 21.1092 42.0917 21.0443 46.7356 27.1961C47.2261 27.8459 47.9928 29.5984 48.0365 30.3556C47.9153 31.9323 48.0824 33.6231 48.1518 35.2083C48.1892 36.0626 48.4166 36.8537 48.4374 37.7101C48.452 37.8728 48.4507 37.9357 48.4328 38.093C47.8956 42.8145 44.9404 44.858 41.4385 47.5175C42.4576 48.1048 43.7107 48.616 44.7411 49.1855C49.3723 51.7452 51.2687 56.5011 51.2105 61.6094C51.1727 64.9277 51.0663 67.635 49.2531 70.6513C45.8194 76.3631 38.7498 78.4236 32.4846 78.8574C23.0253 79.041 13.5417 78.8357 4.07962 78.9059C3.80069 78.908 3.29395 78.8752 3.0639 78.7381C2.90779 77.7929 2.95519 75.2112 2.95454 74.1461L2.95583 65.7484L2.95551 35.3515L2.95769 25.7489C2.9584 24.6082 3.04972 22.3324 2.95769 21.3289L2.94843 21.2339ZM15.9442 68.8563C20.48 69.0852 25.1735 68.8899 29.725 68.9234C31.1273 68.9337 32.9166 68.6946 34.1872 68.074C35.8153 67.439 37.5565 66.09 38.2853 64.4621C39.0539 62.7451 38.9779 59.7625 38.2888 58.0097C37.6159 56.2982 35.9102 54.6557 34.2301 53.9402C31.1734 52.6382 23.198 53.0685 19.4954 53.076C18.5577 53.0929 16.8159 53.1647 15.9566 53.0774C15.8256 55.0024 15.8923 57.4228 15.894 59.3953C15.8807 62.549 15.8975 65.7028 15.9442 68.8563ZM15.9798 44.311C18.5959 44.3803 21.2132 44.4003 23.8301 44.3708C26.0966 44.3659 28.4678 44.4683 30.688 44.0871C35.4687 42.9995 36.8498 40.2612 36.0139 35.5657C34.9954 29.8448 25.3143 31.0949 21.04 31.1035C20.373 31.1099 16.5646 31.1049 16.0995 31.2381C15.739 32.3024 15.8159 42.6943 15.9798 44.311Z" fill="currentColor"/>
    <path d="M96.1075 64.1662C95.3687 66.6699 93.9616 69.2365 92.3941 71.3239C90.0792 74.4069 85.6675 76.4845 81.8822 76.9016C76.1433 77.5338 69.5764 76.5412 64.9831 72.8024C61.4289 69.9094 59.129 65.4865 58.6955 60.9355C58.4914 58.7919 58.3859 55.3895 58.7107 53.2627C59.1393 50.454 60.6543 46.0513 62.4634 43.83C65.0587 40.6433 67.3223 38.7931 71.2705 37.5626C72.5144 37.1749 72.4056 36.9378 74.0502 36.7642C78.4527 36.2407 82.3477 36.252 86.4041 38.2547C88.9772 39.525 91.0729 40.9122 92.7101 43.3717C93.9199 45.1893 95.9801 49.3862 96.1884 51.5216C96.0582 52.7483 96.5096 58.1685 96.0778 58.8728C94.5187 59.7658 93.8732 59.1062 92.2593 59.3871C90.0413 59.5112 86.8205 59.4174 84.5564 59.4173L69.1134 59.4347C68.9502 61.5573 69.3177 63.728 70.5769 65.4877C71.8827 67.2944 73.8488 68.5128 76.0479 68.8781C79.2394 69.4 82.7822 68.8714 85.0923 66.4246C85.7178 65.7621 86.335 64.6897 87.0523 64.2131C88.9196 63.9878 94.0952 64.0904 96.1075 64.1662ZM77.5879 52.7272C79.6766 52.7308 84.0479 52.8439 85.935 52.6382C85.9893 50.3768 85.1365 48.1876 83.567 46.5586C81.8658 44.8016 79.705 44.4556 77.3597 44.5769C74.4107 44.9168 72.8132 45.4303 70.7753 47.8331C69.4808 49.3595 69.3834 50.8905 69.0223 52.7142C70.2044 52.6379 71.5616 52.7039 72.7679 52.72C74.3745 52.7323 75.9813 52.7348 77.5879 52.7272Z" fill="currentColor"/>
    <path d="M66.9185 31.9368C66.8411 30.789 66.6621 27.8667 66.916 26.8461C66.9423 26.7404 66.9684 26.5866 67.0665 26.5319C67.3919 26.3505 87.4681 26.2581 88.024 26.4666C88.2773 26.5617 88.3461 26.8774 88.4483 27.1063C88.2148 27.7306 88.2552 30.7161 88.2725 31.543L88.258 31.7971C87.9564 32.0488 83.7208 31.9285 82.9781 31.9284L71.7457 31.9235C70.5667 31.9218 67.918 31.816 66.9185 31.9368Z" fill="currentColor" fill-opacity="0.94902"/>
    <path d="M68.2757 27.091C70.4005 26.9838 86.2381 26.9047 87.3977 27.2953C87.8992 28.1339 87.9578 30.6571 87.0123 31.3766L86.9379 31.4326L87.0848 31.4007L87.0342 31.5416C86.8486 31.5949 86.6621 31.6446 86.4746 31.6905C84.5201 31.6918 68.0124 31.8068 67.7029 31.4543C67.5448 31.2742 67.7351 31.0029 67.4554 30.7971L67.3669 31.0825L67.2454 31.0528C67.1167 30.4952 67.022 27.8293 67.2808 27.3885C67.5181 27.1675 67.9418 27.1442 68.2757 27.091Z" fill="currentColor"/>
    <path d="M96.1884 51.5216C96.6372 53.6472 97.1935 56.854 96.8422 58.9814C96.7402 59.5987 92.8753 59.4675 92.2593 59.3871C93.8732 59.1062 94.5187 59.7658 96.0778 58.8728C96.5096 58.1685 96.0582 52.7483 96.1884 51.5216Z" fill="currentColor" fill-opacity="0.905882"/>
    <path d="M48.0365 30.3556C48.8332 33.4469 49.0728 34.6232 48.4374 37.7101C48.4166 36.8537 48.1892 36.0626 48.1518 35.2083C48.0824 33.6231 47.9153 31.9323 48.0365 30.3556Z" fill="currentColor" fill-opacity="0.898039"/>
    <path d="M88.4483 27.1062C88.5142 27.3333 88.5147 27.3126 88.5237 27.5419C88.5352 27.8366 88.7568 27.9936 88.846 28.352C89.0271 29.0803 89.1849 31.3063 88.8242 31.9052L88.686 31.9256C88.5733 31.8167 88.3921 31.628 88.2725 31.5429C88.2552 30.7161 88.2148 27.7305 88.4483 27.1062Z" fill="currentColor" fill-opacity="0.145098"/>
    <path d="M51.6523 60.5962C52.0207 60.9185 51.8872 62.5567 51.7638 63.0217C51.3465 62.3499 51.4854 61.3312 51.6523 60.5962Z" fill="currentColor" fill-opacity="0.388235"/>
  </svg>
);

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
    const mailtoUrl = `mailto:ashishcmaliofficial@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

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
                  href="mailto:ashishcmaliofficial@gmail.com" 
                  className="text-amber-400 hover:text-amber-300 hover:underline transition-all duration-300"
                >
                  ashishcmaliofficial@gmail.com
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
                    <CheckCircle2 className="w-3.5 h-3.5" /> Prefilled message prepared! If your email app did not open automatically, please send direct to <a href="mailto:ashishcmaliofficial@gmail.com" className="underline hover:text-white">ashishcmaliofficial@gmail.com</a>
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-24 pt-12 border-t border-white/5 relative w-full flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-4 text-center md:text-left">
          {/* Left Side: Brand Logo and Name */}
          <div className="flex justify-center md:justify-start">
            {/* Static Footer Brand Logo & Name (No clashing layoutId or gradient ID) */}
            <div className="flex items-center gap-3.5 select-none opacity-75 hover:opacity-100 transition-opacity duration-300 scale-90 origin-left">
              <div className="w-8 h-8 md:w-9 md:h-9 flex-shrink-0">
                <svg
                  viewBox="0 0 54 54"
                  className="w-full h-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M27.7906 5.5864C27.3385 5.59566 26.9705 5.94626 26.9476 6.38957C26.9252 6.82376 26.931 7.41494 26.9659 8.13723C26.8931 10.1656 26.5626 13.4374 25.9453 17.2112C25.2117 21.696 24.0885 26.7941 22.5679 31.2004C21.4191 29.577 20.1929 28.4157 18.91 27.6731C17.2435 26.7086 15.5252 26.4777 13.8693 26.8112C10.6225 27.4653 7.76289 30.2474 5.79722 33.4524C3.81979 36.6765 2.60077 40.5613 2.81789 43.7159C2.92699 45.3011 3.40569 46.7796 4.42435 47.8705C5.46131 48.9809 6.96111 49.5862 8.88479 49.5862C12.1856 49.5862 15.058 47.5921 17.4611 44.6719C19.5456 42.1388 21.3611 38.812 22.8881 35.1687C24.4118 38.3708 25.8125 42.9783 26.9631 48.8986C27.0408 49.2985 27.3977 49.5874 27.8124 49.5862C28.2272 49.585 28.5823 49.294 28.6576 48.8937C29.7584 43.0412 31.1224 38.6947 32.6181 35.5571C32.6734 35.441 32.7288 35.3267 32.7844 35.2141C33.9741 38.2551 35.3723 41.0847 37.002 43.4109C39.5334 47.0241 42.746 49.5862 46.735 49.5862C49.0063 49.5862 50.6659 48.7462 51.6712 47.2774C52.6429 45.8577 52.9145 43.9789 52.7465 42.0359C52.4103 38.1491 50.279 33.5511 47.3264 30.473C45.8449 28.9287 44.1051 27.7129 42.2159 27.1979C40.2951 26.6742 38.2703 26.8913 36.3266 28.133C35.2287 28.8344 34.1746 29.8505 33.1781 31.2131C32.9903 30.6412 32.8087 30.0643 32.6331 29.4839C31.1555 24.5985 30.1268 19.5283 29.4862 15.3237C29.0303 12.3308 28.776 9.80946 28.6908 8.11823C28.7151 7.3805 28.7073 6.78198 28.667 6.35435C28.6253 5.91237 28.2427 5.57714 27.7906 5.5864ZM27.793 16.1631C28.4469 20.3185 29.5366 25.1923 30.9803 29.9656C31.2947 31.005 31.6299 32.0393 31.9867 33.0583C31.6694 33.6115 31.3591 34.2049 31.0564 34.8399C29.8521 37.3663 28.7521 40.5835 27.8022 44.6049C26.6323 39.6778 25.2531 35.7841 23.7302 33.0518C25.5379 28.2339 26.8337 22.4553 27.6476 17.4795C27.7236 17.0151 27.7251 16.6141 27.793 16.1631ZM33.8779 33.2387C34.9965 31.4475 36.1468 30.2671 37.2671 29.5514C38.7842 28.5822 40.2964 28.4309 41.7544 28.8284C43.244 29.2345 44.7248 30.2297 46.0711 31.6331C48.774 34.4508 50.7272 38.6962 51.0285 42.179C51.1792 43.9208 50.9077 45.3583 50.2401 46.3337C49.6061 47.26 48.5301 47.8939 46.735 47.8939C43.5844 47.8939 40.8246 45.8804 38.4226 42.452C36.6526 39.9255 35.1432 36.7191 33.8779 33.2387ZM21.8304 33.2006C20.2292 37.2858 18.305 40.9532 16.1199 43.6085C13.8575 46.3577 11.4267 47.8939 8.88479 47.8939C7.34927 47.8939 6.34655 47.4243 5.69535 46.727C5.02585 46.01 4.63075 44.9479 4.53811 43.6018C4.35172 40.8937 5.4174 37.3529 7.27435 34.3252C9.14307 31.2783 11.6675 28.9824 14.216 28.469C15.4577 28.2188 16.7398 28.3818 18.0342 29.1309C19.2788 29.8512 20.5723 31.1367 21.8304 33.2006Z"
                    fill="url(#footer-logo-gold-gradient)"
                  />
                  <defs>
                    <linearGradient
                      id="footer-logo-gold-gradient"
                      x1="27.793"
                      y1="5.58621"
                      x2="28"
                      y2="48"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0%" stopColor="#FFE082" />
                      <stop offset="40%" stopColor="#FFBF4F" />
                      <stop offset="100%" stopColor="#A06A0A" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="font-sans font-bold text-sm md:text-base tracking-wide text-white/90">
                  Ashish C Mali
                </span>
                <span className="font-sans font-medium text-[10px] md:text-xs tracking-wider text-white/40 uppercase whitespace-nowrap">
                  Product Designer
                </span>
              </div>
            </div>
          </div>

          {/* Center: Copyright Text */}
          <div className="text-[10px] md:text-xs text-white/35 tracking-[0.15em] uppercase font-light leading-relaxed text-center md:absolute md:left-1/2 md:-translate-x-1/2 md:max-w-md">
            &copy; {new Date().getFullYear()} ASHISH C MALI. ALL RIGHTS RESERVED.<br className="md:hidden" /> DESIGNED & BUILT WITH PASSION.
          </div>

          {/* Right Side: Social Logos (LinkedIn, Behance) */}
          <div className="flex justify-center md:justify-end items-center gap-3.5">
            {/* LinkedIn Icon */}
            <a 
              href="https://www.linkedin.com/in/ashish-mali-b071b526b?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-amber-400 hover:border-amber-400/50 hover:bg-amber-500/10 transition-all duration-300 shadow-inner flex items-center justify-center active:scale-95"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            {/* Behance Icon */}
            <a 
              href="https://www.behance.net/ashishmali"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-amber-400 hover:border-amber-400/50 hover:bg-amber-500/10 transition-all duration-300 shadow-inner flex items-center justify-center active:scale-95"
              aria-label="Behance"
            >
              <BehanceIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
