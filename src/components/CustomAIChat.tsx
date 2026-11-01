"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What is Ashish's role at Bajaj Finance?",
  "Tell me about the Prime Video redesign",
  "What design tools does Ashish master?",
  "How can I contact Ashish?",
];

const RESPONSE_FOLLOW_UPS: Array<{ triggers: string[]; chips: string[] }> = [
  {
    triggers: ["sales one", "scan & start", "merchant", "50,000"],
    chips: [
      "What was Ashish's role in Scan & Start?",
      "What dashboards did he design for agents?",
      "How did 50k+ daily users react?",
    ],
  },
  {
    triggers: ["prime video", "amazon", "lean ux"],
    chips: [
      "What was the main problem with Prime Video?",
      "How did Lean UX help test fast?",
      "What metrics improved?",
    ],
  },
  {
    triggers: ["gold loan", "personal loan", "insta emi", "fintech"],
    chips: [
      "How did Ashish reduce checkout drop-off?",
      "What is the INSTA EMI Card experience like?",
      "What marketing assets did he create?",
    ],
  },
];

function isContactResponse(text: string): boolean {
  const lower = text.toLowerCase();
  return (
    lower.includes("linkedin.com") ||
    lower.includes("contact section") ||
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
        "Hi! I'm Ashli, Ashish's virtual UX design co-pilot. Ask me anything about his work at Bajaj Finance, case studies, or design methodology!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [followUps, setFollowUps] = useState<string[]>([]);
  const [showContactCTAs, setShowContactCTAs] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
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
        "I'm having trouble connecting right now. Please feel free to reach out to Ashish directly via the Contact section!";

      setMessages((prev) => [...prev, { role: "assistant", content: assistantMessage }]);

      if (isContactResponse(assistantMessage)) {
        setShowContactCTAs(true);
      }

      // Check contextual follow-up triggers
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
            "I ran into an issue connecting to the server. You can always contact Ashish directly via the Contact section below!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* Floating Trigger Button */}
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

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed bottom-24 right-6 z-[9999] w-[380px] max-w-[calc(100vw-32px)] h-[560px] max-h-[calc(100vh-120px)] bg-[#0d0f14]/95 border border-neutral-800 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl flex flex-col overflow-hidden"
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
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-wrap ${
                      m.role === "user"
                        ? "bg-amber-500 text-black font-medium rounded-tr-sm shadow-[0_2px_10px_rgba(245,158,11,0.2)]"
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

              {/* Contact CTAs */}
              {showContactCTAs && (
                <div className="pt-2 flex flex-wrap gap-2">
                  <a
                    href="https://www.linkedin.com/in/ashish-mali-b071b526b"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] px-3 py-1.5 rounded-full bg-[#0077b5]/20 border border-[#0077b5]/40 text-[#0077b5] hover:bg-[#0077b5]/30 transition-colors"
                  >
                    LinkedIn Profile ↗
                  </a>
                  <a
                    href="#contact"
                    onClick={() => setIsOpen(false)}
                    className="text-[11px] px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 hover:bg-amber-500/30 transition-colors"
                  >
                    Jump to Contact ↘
                  </a>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Follow-up / Suggested Chips */}
            <div className="px-3 py-2 border-t border-neutral-800/50 bg-[#0d0f14]/80">
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {(followUps.length > 0 ? followUps : SUGGESTED_QUESTIONS).map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(chip)}
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