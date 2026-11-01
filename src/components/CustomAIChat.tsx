"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const RESPONSE_FOLLOW_UPS: Array<{ triggers: string[]; chips: string[] }> = [
  {
    triggers: ["scan & start", "scan and start", "gate meeting", "attendance logging"],
    chips: [
      "What was Ashish's role in designing Scan & Start?",
      "What info do the Performance Dashboards show to agents?",
      "How did Ashish simplify attendance logging?",
    ],
  },
  {
    triggers: ["performance dashboard", "kpi", "incentive tracker"],
    chips: [
      "How did the dashboards motivate field agents?",
      "What was the drop-off reduction across the 5 core journeys?",
      "How did 50k+ daily agents react to the new design?",
    ],
  },
  {
    triggers: ["sales one", "50,000", "50k", "onboarding flow"],
    chips: [
      "Tell me about the Scan & Start feature he designed",
      "How did Ashish design for low-connectivity rural areas?",
      "What user research did Ashish conduct with field agents?",
    ],
  },
  {
    triggers: ["scene search", "multimodal", "timestamp"],
    chips: [
      "How does Scene Search let users find specific moments?",
      "What research insights led to the Scene Search concept?",
      "How does the AI understand emotional queries?",
    ],
  },
  {
    triggers: ["gold loan", "personal loan", "insta emi"],
    chips: [
      "How did Ashish improve the Gold Loan user journey?",
      "What is the INSTA EMI Card UX like?",
      "What marketing banners did Ashish create for lending?",
    ],
  },
];

const QUICK_ACTIONS = [
  { text: "💼 Bajaj Finance", prompt: "Tell me about Ashish's role at Bajaj Finance Ltd" },
  { text: "🎬 Prime Video", prompt: "Explain the Amazon Prime Video Redesign case study" },
  { text: "⚡ His Toolkit", prompt: "What design tools and frameworks does Ashish use?" },
  { text: "📬 Contact Info", prompt: "How can I contact Ashish directly?" },
];

function isContactResponse(text: string): boolean {
  const lower = text.toLowerCase();
  return (
    lower.includes("linkedin.com") ||
    lower.includes("contact section") ||
    lower.includes("+91 9075521047") ||
    lower.includes("ashishcmaliofficial@gmail.com") ||
    lower.includes("reach out to ashish") ||
    lower.includes("get in touch")
  );
}

export default function CustomAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm Ashli, Ashish's virtual UX design co-pilot. I can walk you through his design systems at Bajaj Finance, case studies, or walk you through his background. What would you like to explore?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [followUps, setFollowUps] = useState<string[]>([]);
  const [showContactCTAs, setShowContactCTAs] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    if (!textToSend) setInput("");
    setFollowUps([]);
    setShowContactCTAs(false);

    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const userId =
        typeof window !== "undefined"
          ? localStorage.getItem("ashli_user_id") || "anonymous"
          : "anonymous";

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          userId,
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");
      const data = await response.json();
      const assistantMessage =
        data.choices?.[0]?.message?.content ||
        "I'm having trouble connecting to the network right now. Please feel free to reach out to Ashish directly via the Contact section below!";

      setMessages((prev) => [...prev, { role: "assistant", content: assistantMessage }]);

      if (isContactResponse(assistantMessage)) {
        setShowContactCTAs(true);
      }

      const lower = assistantMessage.toLowerCase();
      for (const entry of RESPONSE_FOLLOW_UPS) {
        if (entry.triggers.some((t) => lower.includes(t))) {
          setFollowUps(entry.chips);
          break;
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I encountered a connection issue. You can always reach out to Ashish directly via WhatsApp (+91 9075521047) or email (ashishcmaliofficial@gmail.com)!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-[#12141c]/90 border border-amber-500/30 flex items-center justify-center shadow-[0_4px_20px_rgba(245,158,11,0.15)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.35)] cursor-pointer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI UX Assistant"
      >
        <img
          src="/images/ai_avatar.png"
          alt="Ashli AI Avatar"
          className="w-10 h-10 rounded-full object-contain"
        />
        <span className="absolute inset-0 rounded-full border border-amber-500/20 animate-ping opacity-75 pointer-events-none" />
      </motion.button>

      {/* Floating Scroll to Top button */}
      <AnimatePresence>
        {scrollY >= 150 && !isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            title="Scroll to top"
            className="fixed bottom-[88px] right-6 z-[9998] w-14 h-14 rounded-full bg-[#12141c]/90 border border-neutral-800/80 flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.15)] text-neutral-400 hover:text-amber-500 cursor-pointer"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-24 right-6 z-[9999] w-[400px] h-[600px] max-h-[calc(100vh-120px)] max-w-[calc(100vw-48px)] bg-[#0d0f14]/95 border border-neutral-800/80 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl overflow-hidden flex flex-col font-inter"
          >
            {/* Header */}
            <div className="p-4 border-b border-neutral-800/80 bg-[#12151c]/90 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-amber-500/40">
                  <img
                    src="/images/ai_avatar.png"
                    alt="Ashli"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full ring-1 ring-[#121212]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white leading-tight">Ashli</h3>
                  <p className="text-[10px] text-amber-400 font-medium">UX Design Co-Pilot</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-wrap ${
                      m.role === "user"
                        ? "bg-amber-500 text-black font-medium rounded-tr-sm"
                        : "bg-[#181a20] text-neutral-200 border border-neutral-800/80 rounded-tl-sm"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#181a20] border border-neutral-800/80 rounded-2xl rounded-tl-sm px-4 py-2.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" />
                  </div>
                </div>
              )}

              {/* Direct Contact CTAs */}
              {showContactCTAs && (
                <div className="pt-2 flex flex-wrap gap-2">
                  <a
                    href="https://wa.me/919075521047"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 transition-colors"
                  >
                    WhatsApp Chat ↗
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ashish-mali-b071b526b"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] px-3 py-1.5 rounded-full bg-[#0077b5]/20 border border-[#0077b5]/40 text-[#0077b5] hover:bg-[#0077b5]/30 transition-colors"
                  >
                    LinkedIn ↗
                  </a>
                  <a
                    href="#contact"
                    onClick={() => setIsOpen(false)}
                    className="text-[11px] px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 transition-colors"
                  >
                    Portfolio Contact ↘
                  </a>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions / Follow-up Chips */}
            <div className="px-3 py-2 border-t border-neutral-800/50 bg-[#0d0f14]/80">
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {followUps.length > 0
                  ? followUps.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(chip)}
                        disabled={isLoading}
                        className="shrink-0 text-[10px] bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-300 px-2.5 py-1 rounded-full transition-all disabled:opacity-40 cursor-pointer"
                      >
                        {chip}
                      </button>
                    ))
                  : QUICK_ACTIONS.map((btn, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(btn.prompt)}
                        disabled={isLoading}
                        className="shrink-0 text-[10px] bg-neutral-800/60 hover:bg-neutral-800 border border-neutral-700/50 text-neutral-300 hover:text-white px-2.5 py-1 rounded-full transition-all disabled:opacity-40 cursor-pointer"
                      >
                        {btn.text}
                      </button>
                    ))}
              </div>
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 border-t border-neutral-800/80 bg-[#12151c]/95 flex gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                placeholder="Ask about Ashish's work..."
                className="flex-1 bg-[#0a0c10] border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/40 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-9 h-9 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-neutral-800 text-black disabled:text-neutral-500 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
              >
                ➔
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}