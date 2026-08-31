"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Sparkles,
  Bot,
  RotateCcw,
  User,
  ArrowUpRight,
  Lightbulb,
  Briefcase,
  HelpCircle,
  Wand2,
  Mail,
  Linkedin,
  Phone,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  isQuickPrompt?: boolean;
}

const FAQ_SUGGESTIONS = [
  {
    icon: Sparkles,
    label: "Who is Ashish?",
    query: "Who is Ashish?",
  },
  {
    icon: Briefcase,
    label: "Bajaj Finance Work",
    query: "What did Ashish do at Bajaj Finance?",
  },
  {
    icon: Wand2,
    label: "AI Design Philosophy",
    query: "What is Ashish's AI design philosophy?",
  },
  {
    icon: Lightbulb,
    label: "Tools & Skills",
    query: "What tools and design skills does Ashish use?",
  },
  {
    icon: HelpCircle,
    label: "How to hire?",
    query: "How can I hire or contact Ashish?",
  },
];

// Helper to format bot responses nicely
function formatBotResponse(text: string) {
  // If response already has markdown-style breaks, handle them cleanly
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];

  lines.forEach((line, lineIdx) => {
    const trimmed = line.trim();
    if (!trimmed) {
      elements.push(<div key={`space-${lineIdx}`} className="h-1.5" />);
      return;
    }

    // Numbered list items
    const numberedMatch = trimmed.match(/^(\d+[\.\)])\s*(.*)/);
    if (numberedMatch) {
      elements.push(
        <div key={`num-${lineIdx}`} className="flex items-start gap-2 my-1 pl-1">
          <span className="text-amber-400 font-semibold text-xs min-w-[16px]">
            {numberedMatch[1]}
          </span>
          <span className="text-white/90 text-xs leading-relaxed">
            {formatInlineStyles(numberedMatch[2])}
          </span>
        </div>
      );
      return;
    }

    // Bullet points
    if (trimmed.startsWith("•") || trimmed.startsWith("-") || trimmed.startsWith("*")) {
      const bulletContent = trimmed.replace(/^[•\-\*]\s*/, "");
      elements.push(
        <div key={`bullet-${lineIdx}`} className="flex items-start gap-2 my-1 pl-1">
          <span className="text-amber-400 text-xs mt-0.5">•</span>
          <span className="text-white/90 text-xs leading-relaxed">
            {formatInlineStyles(bulletContent)}
          </span>
        </div>
      );
      return;
    }

    // Standard paragraph line
    elements.push(
      <p key={`p-${lineIdx}`} className="text-xs text-white/90 leading-relaxed my-0.5">
        {formatInlineStyles(trimmed)}
      </p>
    );
  });

  return elements;
}

// Inline styling for bold / italics / quotes
function formatInlineStyles(text: string): React.ReactNode {
  // Split on bold markers **text** or *text*
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-white font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={i} className="text-amber-200/90 not-italic font-medium">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function formatCompanyName(raw: string): string {
  const cleaned = raw.replace(/[-_]+/g, " ").trim();
  if (!cleaned) return "";
  if (cleaned.length <= 4 && cleaned === cleaned.toUpperCase()) {
    return cleaned;
  }
  return cleaned
    .split(" ")
    .map((word) => {
      const w = word.toLowerCase();
      if (w === "ai" || w === "ui" || w === "ux") return w.toUpperCase();
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

function getInitialAssistantMessage(companyName?: string) {
  if (companyName) {
    return `Hey Team ${companyName}! 👋 I'm Ashli, Ashish's interactive AI assistant. Welcome to his portfolio! Feel free to explore his featured work, design systems, and product process — or ask me anything directly. What would you like to explore?`;
  }
  return `${getGreeting()}! I am Ashli 👋, Ashish's interactive AI assistant. You can ask me anything about him!`;
}

export default function CustomAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [showFAQ, setShowFAQ] = useState(true);
  const [showContactCTAs, setShowContactCTAs] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [targetCompany, setTargetCompany] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `${getGreeting()}! I am Ashli 👋, Ashish's interactive AI assistant. You can ask me anything about him!`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);

    let companyFound = "";
    if (typeof window !== "undefined") {
      let storedUserId = localStorage.getItem("ashli_user_id");
      if (!storedUserId) {
        storedUserId = "user_" + Math.random().toString(36).substring(2, 9);
        localStorage.setItem("ashli_user_id", storedUserId);
      }

      // Check for company in URL parameters: ?company=Google, ?c=Google, ?team=Google, ?for=Google
      const urlParams = new URLSearchParams(window.location.search);
      const rawParam =
        urlParams.get("company") ||
        urlParams.get("c") ||
        urlParams.get("team") ||
        urlParams.get("for") ||
        urlParams.get("org") ||
        urlParams.get("target");

      if (rawParam) {
        companyFound = formatCompanyName(rawParam);
        setTargetCompany(companyFound);
        setMessages([
          {
            role: "assistant",
            content: getInitialAssistantMessage(companyFound),
          },
        ]);
      }
    }

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setBubbleDismissed(true);
  };

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage = textToSend.trim();
    if (!customText) setInput("");

    // Hide suggestions after first message
    setShowFAQ(false);

    // Detect if message is contact-related
    const contactKeywords = ["hire", "contact", "email", "reach", "call", "connect", "freelance", "job", "phone", "whatsapp"];
    const isContactRelated = contactKeywords.some((kw) => userMessage.toLowerCase().includes(kw));
    if (isContactRelated) {
      setShowContactCTAs(true);
    }

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: userMessage, isQuickPrompt: !!customText },
    ];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const userId = typeof window !== "undefined" ? localStorage.getItem("ashli_user_id") || "anonymous" : "anonymous";
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          userId,
          company: targetCompany || undefined,
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      const assistantMessage =
        data.choices?.[0]?.message?.content ||
        "I'm here to help! Ask me anything about Ashish's work, projects, design tools, or experience.";

      setMessages([
        ...newMessages,
        { role: "assistant", content: assistantMessage },
      ]);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "Ashish is a Product Designer based in Pune, India, specializing in fintech systems at Bajaj Finance Ltd. Reach out directly at ashishcmaliofficial@gmail.com or +91 9075521047!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: "assistant",
        content: targetCompany
          ? `Reset complete! ${getInitialAssistantMessage(targetCompany)}`
          : `Reset complete! ${getGreeting()}! I am Ashli 👋, Ashish's interactive AI assistant. You can ask me anything about him!`,
      },
    ]);
    setShowFAQ(true);
    setShowContactCTAs(false);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* ── CHAT PANEL ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 24 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="mb-4 w-[92vw] sm:w-[410px] h-[580px] max-h-[82vh] bg-[#161616]/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white font-sans"
            style={{
              boxShadow: "0 24px 64px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)",
            }}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/8 flex items-center justify-between bg-gradient-to-r from-amber-500/10 via-transparent to-transparent flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/20">
                    <Bot className="w-5 h-5 text-black" />
                  </div>
                  {/* Live pulsating dot */}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#161616] rounded-full">
                    <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-medium text-sm text-white font-rubik tracking-tight">Ashli</h3>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 font-mono font-medium border border-amber-500/20">
                      {targetCompany ? `for ${targetCompany}` : "AI Co-pilot"}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/50">
                    {targetCompany ? `Personalized for ${targetCompany} Team` : "Ashish's Design Co-Pilot • Always Active"}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  title="Reset Conversation"
                  className="p-2 text-white/40 hover:text-white/80 hover:bg-white/5 rounded-full transition-all duration-200"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close Chat"
                  className="p-2 text-white/40 hover:text-white/80 hover:bg-white/5 rounded-full transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2.5 items-start ${
                    m.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs mt-0.5 ${
                      m.role === "assistant"
                        ? "bg-gradient-to-tr from-amber-500 to-amber-300 text-black shadow-md shadow-amber-500/20 font-bold"
                        : "bg-white/10 text-white/80 border border-white/10"
                    }`}
                  >
                    {m.role === "assistant" ? (
                      <Bot className="w-3.5 h-3.5" />
                    ) : (
                      <User className="w-3.5 h-3.5" />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs ${
                      m.role === "user"
                        ? "bg-amber-500 text-black font-medium rounded-tr-sm shadow-md shadow-amber-500/10"
                        : "bg-white/5 border border-white/8 text-white/90 rounded-tl-sm backdrop-blur-sm"
                    }`}
                  >
                    {m.role === "assistant" ? (
                      <div className="space-y-0.5">{formatBotResponse(m.content)}</div>
                    ) : (
                      <p className="leading-relaxed">{m.content}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex gap-2.5 items-start">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-black flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-white/5 border border-white/8 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" />
                  </div>
                </div>
              )}

              {/* Quick Contact CTA Strip (Shown if user asks to contact/hire) */}
              {showContactCTAs && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-3 space-y-2 mt-2"
                >
                  <p className="text-[11px] text-amber-300/90 font-medium">Quick connect options for Ashish:</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    <a
                      href="mailto:ashishcmaliofficial@gmail.com"
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-[11px] transition-colors border border-white/5"
                    >
                      <Mail className="w-3 h-3 text-amber-400" />
                      <span>Send Email</span>
                      <ArrowUpRight className="w-2.5 h-2.5 ml-auto opacity-50" />
                    </a>
                    <a
                      href="https://wa.me/919075521047"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-[11px] transition-colors border border-white/5"
                    >
                      <Phone className="w-3 h-3 text-emerald-400" />
                      <span>WhatsApp</span>
                      <ArrowUpRight className="w-2.5 h-2.5 ml-auto opacity-50" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/ashish-mali-b071b526b"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-[11px] transition-colors border border-white/5 col-span-2"
                    >
                      <Linkedin className="w-3 h-3 text-blue-400" />
                      <span>LinkedIn Profile</span>
                      <ArrowUpRight className="w-2.5 h-2.5 ml-auto opacity-50" />
                    </a>
                  </div>
                </motion.div>
              )}

              {/* Suggestions Pill Bar (Only on fresh chats) */}
              {showFAQ && messages.length <= 1 && (
                <div className="pt-2 space-y-2">
                  <div className="flex items-center gap-1.5 text-white/40 text-[10px] uppercase font-mono tracking-wider px-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Popular Topics</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {FAQ_SUGGESTIONS.map((faq, i) => {
                      const Icon = faq.icon;
                      return (
                        <button
                          key={i}
                          onClick={() => handleSend(faq.query)}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/5 hover:bg-amber-500/10 hover:border-amber-500/30 border border-white/8 text-white/70 hover:text-amber-300 text-[11px] transition-all duration-200 text-left group"
                        >
                          <Icon className="w-3 h-3 text-amber-400/70 group-hover:text-amber-400" />
                          <span>{faq.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Box */}
            <div className="p-3 border-t border-white/8 bg-[#121212]/80 backdrop-blur-md flex-shrink-0">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-3.5 py-2 focus-within:border-amber-500/50 focus-within:bg-white/[0.07] transition-all duration-200">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={targetCompany ? `Ask about Ashish for ${targetCompany}...` : "Ask Ashli anything about Ashish..."}
                  className="flex-1 bg-transparent text-xs text-white placeholder-white/40 focus:outline-none"
                  disabled={isLoading}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="p-1.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-30 disabled:hover:bg-amber-500 text-black rounded-xl transition-all duration-200 flex-shrink-0 disabled:cursor-not-allowed shadow-md shadow-amber-500/20"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex items-center justify-between mt-1.5 px-1">
                <span className="text-[10px] text-white/30 font-mono">
                  {targetCompany ? `Personalized for ${targetCompany}` : "Powered by Ashish's Portfolio AI"}
                </span>
                <span className="text-[10px] text-white/30 font-mono">Press Enter ↵</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FLOATING LAUNCH BUBBLE / AVATAR ─────────────────────────────────── */}
      <div className="relative flex items-center gap-3">
        {/* Proactive Greeting Bubble */}
        <AnimatePresence>
          {!isOpen && !bubbleDismissed && scrollY > 80 && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              transition={{ delay: 1, duration: 0.3 }}
              className="hidden sm:flex items-center bg-[#181818]/95 border border-white/15 backdrop-blur-xl px-4 py-2.5 rounded-2xl shadow-2xl relative max-w-[260px]"
              style={{
                boxShadow: "0 10px 30px -5px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
              }}
            >
              <div className="flex-1 pr-4">
                <h4 className="text-[10px] text-amber-500 font-semibold tracking-wider uppercase mb-0.5 font-rubik">Ashli</h4>
                <p className="text-[11px] text-white/95 leading-normal font-light">
                  {targetCompany ? (
                    <>
                      Hey Team {targetCompany}! 👋 Welcome to Ashish&apos;s portfolio. I&apos;m Ashli, his interactive AI assistant. Ask me anything!
                    </>
                  ) : (
                    <>
                      Hey there! I am Ashli 👋, Ashish&apos;s interactive AI assistant. Ask me anything about him!
                    </>
                  )}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setBubbleDismissed(true);
                }}
                className="text-white/40 hover:text-white p-0.5 transition-colors absolute top-2 right-2"
                title="Dismiss"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Trigger Button */}
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={isOpen ? () => setIsOpen(false) : handleOpen}
          className="relative group w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 text-black flex items-center justify-center shadow-xl shadow-amber-500/25 border-2 border-white/20 transition-all duration-300 overflow-hidden cursor-pointer"
          aria-label="Open Ashli AI Chat"
        >
          {/* Subtle sheen animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="w-6 h-6 text-black stroke-[2.5]" />
              </motion.div>
            ) : (
              <motion.div
                key="bot"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="relative flex items-center justify-center"
              >
                <Bot className="w-6 h-6 text-black stroke-[2.2]" />
                <Sparkles className="w-3 h-3 text-black absolute -top-1 -right-1 animate-pulse" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
