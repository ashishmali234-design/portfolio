"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getMultilingualConversationalReply,
  getMultilingualFallbackResponse,
} from "@/lib/multilingualChat";

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

const FAQS = [
  {
    q: "What is Ashish's design philosophy?",
    a: "Ashish designs with AI and thinks like humans. He combines UX strategy, customer research, and AI-powered workflows to create fast, intuitive, and high-converting products.",
  },
  {
    q: "Tell me about his role at Bajaj Finance",
    a: "Ashish designs enterprise tools and digital lending products at Bajaj Finance Ltd, including the Sales One App (50k+ daily users), Scan & Start onboarding, Gold Loan, and INSTA EMI journeys.",
  },
  {
    q: "What tools does Ashish use?",
    a: "His primary toolkit is Figma (advanced components, design tokens, auto-layout), ProtoPie, Framer Motion, Spline 3D, and Adobe Creative Suite (After Effects, Photoshop, Illustrator).",
  },
  {
    q: "How can I contact Ashish?",
    a: "You can reach Ashish via WhatsApp/Call at +91 9075521047, email him at ashishcmaliofficial@gmail.com, or connect on LinkedIn (linkedin.com/in/ashish-mali-b071b526b).",
  },
];

export default function CustomAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm Ashli, Ashish's virtual UX design co-pilot. Feel free to ask about his work at Bajaj Finance, the Prime Video redesign, or his availability in any language!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [followUps, setFollowUps] = useState<string[]>([]);
  const [showContactCTAs, setShowContactCTAs] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    if (!textToSend) setInput("");
    setFollowUps([]);
    setShowContactCTAs(false);

    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setIsLoading(true);

    const lowerText = text.toLowerCase();
    if (
      lowerText.includes("contact") ||
      lowerText.includes("hire") ||
      lowerText.includes("number") ||
      lowerText.includes("email")
    ) {
      setShowContactCTAs(true);
    }

    const matchedFaq = FAQS.find(
      (f) =>
        f.q.toLowerCase() === lowerText ||
        lowerText.includes(f.q.toLowerCase()) ||
        f.q.toLowerCase().includes(lowerText)
    );

    if (matchedFaq) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "assistant", content: matchedFaq.a }]);
        setIsLoading(false);
      }, 400);
      return;
    }

    try {
      const reply =
        getMultilingualConversationalReply(text) || getMultilingualFallbackResponse(text);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);

      // Check follow-ups
      const lowerReply = reply.toLowerCase();
      for (const entry of RESPONSE_FOLLOW_UPS) {
        if (entry.triggers.some((t) => lowerReply.includes(t))) {
          setFollowUps(entry.chips);
          break;
        }
      }
    } catch {
      const fallback = getMultilingualFallbackResponse(text);
      setMessages((prev) => [...prev, { role: "assistant", content: fallback }]);
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
      >
        <img
          src="/images/ai_avatar.png"
          alt="Ashli AI Avatar"
          className="w-10 h-10 rounded-full object-contain"
        />
        <span className="absolute inset-0 rounded-full border border-amber-500/20 animate-ping opacity-75 pointer-events-none" />
      </motion.button>

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
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
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
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Smart Follow-up Chips */}
            <div className="px-3 py-2 border-t border-neutral-800/50 bg-[#0d0f14]/80">
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {(followUps.length > 0 ? followUps : FAQS.map((f) => f.q)).map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(chip)}
                    disabled={isLoading}
                    className="shrink-0 text-[10px] bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-300 px-2.5 py-1 rounded-full transition-all disabled:opacity-40"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 border-t border-neutral-800/80 bg-[#12151c]/95 flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                placeholder="Ask Ashli in any language..."
                className="flex-1 bg-[#0a0c10] border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/40 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-9 h-9 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-neutral-800 text-black disabled:text-neutral-500 flex items-center justify-center transition-colors shrink-0"
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