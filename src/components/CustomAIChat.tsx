"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// ─── Smart follow-up extraction ──────────────────────────────────────────────
// Each entry: if these keywords appear in Ashli's RESPONSE,
// suggest these specific deeper follow-up questions about what she JUST said.
const RESPONSE_FOLLOW_UPS: Array<{ triggers: string[]; chips: string[] }> = [
  // ── BAJAJ FINANCE ──────────────────────────────────────────────────────────
  // Level 3: Sales One App — very specific features mentioned
  {
    triggers: ["scan & start", "scan and start", "gate meeting", "merchant visit", "attendance logging"],
    chips: [
      "How does the Scan & Start onboarding exactly work?",
      "What info do the Performance Dashboards show to agents?",
      "How do agents log their merchant visits in the app?",
    ],
  },
  {
    triggers: ["homepage", "merchant profile", "onboarding dashboard", "performance dashboard", "team tracking", "tasks management"],
    chips: [
      "How does Scan & Start onboarding work in Sales One?",
      "What does the Performance Dashboard actually track?",
      "How do sales agents manage their daily tasks?",
    ],
  },
  // Level 2: Sales One App mentioned by name
  {
    triggers: ["sales one app", "sales one"],
    chips: [
      "What features did Ashish revamp in the Sales One App?",
      "How does the Scan & Start onboarding work?",
      "What dashboards did Ashish design for sales agents?",
    ],
  },
  // Level 3: Gold Loan / Lending deep details
  {
    triggers: ["high-converting", "checkout funnel", "drop-off", "conversion rate", "loan journey"],
    chips: [
      "How did Ashish improve the Gold Loan checkout flow?",
      "What marketing assets did he create for lending products?",
      "How did Ashish design the INSTA EMI Card experience?",
    ],
  },
  // Level 2: Lending products mentioned
  {
    triggers: ["gold loan", "personal loan", "insta emi"],
    chips: [
      "How did Ashish improve the Gold Loan user journey?",
      "What is the INSTA EMI Card UX like?",
      "What marketing banners did Ashish create for lending?",
    ],
  },
  // Level 3: REMI / Banners / GIFs deep
  {
    triggers: ["remi", "retail emi", "co-branded", "push notification", "in-app banner", "promotional gif"],
    chips: [
      "What brands are covered in the REMI campaigns?",
      "How does Ashish create animated GIFs for Bajaj Finance?",
      "Tell me about the Bajaj Pay marketing collaterals",
    ],
  },
  // Level 3: Merchant training videos
  {
    triggers: ["training video", "merchant training", "animated training", "step-by-step video"],
    chips: [
      "What tools does Ashish use to create training videos?",
      "What topics do the merchant training videos cover?",
      "How does motion design help merchants learn the app?",
    ],
  },
  // Level 2: Merchant One App mentioned
  {
    triggers: ["merchant one app", "finserv for business", "merchant dashboard"],
    chips: [
      "What dashboards did Ashish design for the Merchant One App?",
      "Tell me about the animated merchant training videos",
      "How does the app help merchants get started with Bajaj?",
    ],
  },
  // Level 3: EDC POS deep
  {
    triggers: ["edc", "pos terminal", "point-of-sale", "swipe journey", "terminal journey"],
    chips: [
      "How did Ashish design for zero payment errors on POS?",
      "What accessibility principles did he use for EDC screens?",
      "Tell me about the Bajaj Pay EDC branding work",
    ],
  },
  // Level 3: B2B Aggregator deep
  {
    triggers: ["aggregator dashboard", "non-aggregator", "merchant network", "aggregator and non-aggregator"],
    chips: [
      "What's the difference between Aggregator and Non-Aggregator dashboards?",
      "How does Ashish simplify complexity in B2B flows?",
      "What kind of data do these dashboards manage?",
    ],
  },
  // Level 2: B2B Enterprise mentioned
  {
    triggers: ["b2b enterprise", "b2b solution", "aggregator", "corporate partner"],
    chips: [
      "What is the B2B Aggregator dashboard?",
      "How does Ashish design for large merchant networks?",
      "What problem did the B2B Enterprise solution solve?",
    ],
  },
  // Level 2: Multiple Bajaj products listed (medium detail)
  {
    triggers: ["sales one", "gold loan", "merchant one", "lending", "b2b"],
    chips: [
      "Tell me more about the Sales One App revamp",
      "What is the Merchant One App?",
      "How did Ashish design the core lending journeys?",
    ],
  },
  // Level 1: Bajaj Finance general mention only
  {
    triggers: ["bajaj finance", "bajaj finserv", "bajaj pay"],
    chips: [
      "What exactly does Ashish work on at Bajaj Finance?",
      "What kind of products does he design there?",
      "How long has Ashish been at Bajaj Finance?",
    ],
  },

  // ── AI TOOLS ───────────────────────────────────────────────────────────────
  // Level 3: Specific AI tools deep
  {
    triggers: ["chatgpt", "magnific", "n8n", "notebook lm", "antigravity ide"],
    chips: [
      "How exactly does Ashish use ChatGPT in design work?",
      "What does Magnific AI help Ashish create?",
      "What is N8N and how does Ashish use it for workflows?",
    ],
  },
  // Level 2: Figma AI / Figma Make
  {
    triggers: ["figma ai", "figma make"],
    chips: [
      "How does Figma AI speed up Ashish's wireframing?",
      "What is Ashish's design system process in Figma?",
      "How does Ashish hand off Figma designs to developers?",
    ],
  },
  // Figma general
  {
    triggers: ["figma", "design system", "design token"],
    chips: [
      "How does Ashish use Figma AI and Figma Make?",
      "How does Ashish structure design tokens in Figma?",
      "What makes Ashish's design systems enterprise-ready?",
    ],
  },
  // AI philosophy
  {
    triggers: ["designing with ai", "thinking like humans", "ai philosophy"],
    chips: [
      "Which AI tools does Ashish use in his daily workflow?",
      "How does Ashish use ChatGPT for design copywriting?",
      "How does Magnific AI help Ashish with visual generation?",
    ],
  },
  // AI tools general
  {
    triggers: ["chatgpt", "magnific", "notebook lm", "n8n", "antigravity"],
    chips: [
      "What is Ashish's 'Designing with AI, thinking like humans' philosophy?",
      "How does Ashish use Figma AI and Figma Make?",
      "How does N8N agentic workflow fit in Ashish's process?",
    ],
  },
  // ProtoPie
  {
    triggers: ["protopie", "logic-driven prototype", "interactive prototype"],
    chips: [
      "Why does Ashish prefer ProtoPie over basic Figma links?",
      "How does Ashish prototype EDC terminal swipe flows in ProtoPie?",
      "What is Ashish's full prototyping-to-handoff process?",
    ],
  },
  // Framer Motion
  {
    triggers: ["framer motion", "framer", "micro-animation", "page transition"],
    chips: [
      "How is Framer Motion used in this portfolio site?",
      "What kind of motion effects did Ashish create?",
      "Does Ashish use Framer for live client websites?",
    ],
  },
  // Motion design / After Effects
  {
    triggers: ["after effects", "motion design", "animation", "merchant training video"],
    chips: [
      "How does Ashish animate merchant training videos?",
      "What motion graphics did Ashish create for Bajaj?",
      "How does Ashish use motion as a usability tool?",
    ],
  },
  // MedApp
  {
    triggers: ["medapp", "doctor appointment", "doctor booking"],
    chips: [
      "What features does MedApp have?",
      "How did Ashish design the doctor availability flow?",
      "What UX challenges did Ashish solve in MedApp?",
    ],
  },
  // Prime Video
  {
    triggers: ["prime video", "amazon prime", "lean ux"],
    chips: [
      "What was Ashish's Lean UX approach for Prime Video?",
      "What content discovery problems did the redesign solve?",
      "Tell me about Ashish's other featured projects",
    ],
  },
  // UX / user experience
  {
    triggers: ["user experience", "ux design", "user research", "usability"],
    chips: [
      "What is Ashish's UX process at Bajaj Finance?",
      "How does Ashish conduct user research?",
      "How does Ashish balance business needs with UX?",
    ],
  },
  // Contact / hire
  {
    triggers: ["ashishmali234@gmail.com", "9075521047", "reach him", "available for"],
    chips: [
      "What kind of projects is Ashish open to?",
      "Tell me about Ashish's Bajaj Finance work",
      "What is Ashish's design philosophy?",
    ],
  },
  // Education
  {
    triggers: ["animation science", "yashwantrao chavan", "midas multimedia", "cgpa"],
    chips: [
      "How did Ashish's animation background influence his design work?",
      "What did Ashish learn at Midas Multimedia?",
      "How did Ashish transition from animation to product design?",
    ],
  },
];

// Extract follow-ups based on Ashli's actual response content
function extractFollowUps(responseText: string): string[] {
  const lower = responseText.toLowerCase();
  const found: string[] = [];
  const seen = new Set<string>();

  for (const entry of RESPONSE_FOLLOW_UPS) {
    // Check if ANY trigger phrase appears in Ashli's response
    const matched = entry.triggers.some((t) => lower.includes(t.toLowerCase()));
    if (matched) {
      for (const chip of entry.chips) {
        if (!seen.has(chip) && found.length < 3) {
          found.push(chip);
          seen.add(chip);
        }
      }
    }
    if (found.length >= 3) break;
  }
  return found;
}

// ─── Scrollable chip row with desktop arrows ──────────────────────────────────
function ChipRow({
  children,
  rowId,
}: {
  children: React.ReactNode;
  rowId: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    const ro = new ResizeObserver(checkScroll);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      ro.disconnect();
    };
  }, [children]);

  const scrollBy = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -140 : 140, behavior: "smooth" });
  };

  return (
    <div className="relative flex items-center gap-0.5" id={rowId}>
      {/* Left arrow — desktop only */}
      <button
        onClick={() => scrollBy("left")}
        aria-label="Scroll left"
        className={`hidden md:flex shrink-0 w-5 h-5 items-center justify-center rounded-full text-neutral-600 hover:text-neutral-300 transition-all duration-200 ${
          canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Scrollable chip container */}
      <div
        ref={scrollRef}
        className="flex flex-row overflow-x-auto whitespace-nowrap scrollbar-none gap-1.5 pb-0.5 scroll-smooth flex-1"
      >
        {children}
      </div>

      {/* Right arrow — desktop only */}
      <button
        onClick={() => scrollBy("right")}
        aria-label="Scroll right"
        className={`hidden md:flex shrink-0 w-5 h-5 items-center justify-center rounded-full text-neutral-600 hover:text-neutral-300 transition-all duration-200 ${
          canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export default function CustomAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [showFAQ, setShowFAQ] = useState(true);
  const [followUps, setFollowUps] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hey there! I am Ashli 👋, Ashish's interactive AI assistant. you can ask me anything about him!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const msgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      let storedUserId = localStorage.getItem("ashli_user_id");
      if (!storedUserId) {
        storedUserId = "usr_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now().toString(36);
        localStorage.setItem("ashli_user_id", storedUserId);
      }
    }

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const fallbackTimer = setTimeout(() => {
      if (window.scrollY < 100) setShowWelcome(true);
    }, 5000);

    const handleHeroAnimationComplete = () => {
      clearTimeout(fallbackTimer);
      if (window.scrollY < 100) setShowWelcome(true);
    };
    window.addEventListener("hero-animation-complete", handleHeroAnimationComplete);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hero-animation-complete", handleHeroAnimationComplete);
      clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    if (scrollY >= 100) setShowWelcome(false);
  }, [scrollY]);

  useEffect(() => {
    if (isOpen) chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, isLoading]);

  const scrollToTop = () => msgContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });

  if (!mounted) return null;

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    if (!textToSend) setInput("");
    setShowFAQ(false);
    setFollowUps([]);

    const newMessages: Message[] = [...messages, { role: "user", content: text }];
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
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      const assistantMessage =
        data.choices?.[0]?.message?.content || "Sorry, I encountered an issue. Let's try again!";

      setMessages((prev) => [...prev, { role: "assistant", content: assistantMessage }]);

      // Smart follow-ups: only suggest questions relevant to what Ashli JUST said
      const chips = extractFollowUps(assistantMessage);
      if (chips.length > 0) setFollowUps(chips);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: "assistant",
        content: "Reset complete! Hey there! I am Ashli 👋, Ashish's interactive AI assistant. you can ask me anything about him!",
      },
    ]);
    setShowFAQ(true);
    setFollowUps([]);
  };

  const ResetIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_4005_84" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <rect width="24" height="24" fill="#D9D9D9"/>
      </mask>
      <g mask="url(#mask0_4005_84)">
        <path d="M11 20.95C8.98333 20.7 7.3125 19.8208 5.9875 18.3125C4.6625 16.8042 4 15.0333 4 13C4 11.9 4.21667 10.8458 4.65 9.8375C5.08333 8.82917 5.7 7.95 6.5 7.2L7.925 8.625C7.29167 9.19167 6.8125 9.85 6.4875 10.6C6.1625 11.35 6 12.15 6 13C6 14.4667 6.46667 15.7625 7.4 16.8875C8.33333 18.0125 9.53333 18.7 11 18.95V20.95ZM13 20.95V18.95C14.45 18.6833 15.6458 17.9917 16.5875 16.875C17.5292 15.7583 18 14.4667 18 13C18 11.3333 17.4167 9.91667 16.25 8.75C15.0833 7.58333 13.6667 7 12 7H11.925L13.025 8.1L11.625 9.5L8.125 6L11.625 2.5L13.025 3.9L11.925 5H12C14.2333 5 16.125 5.775 17.675 7.325C19.225 8.875 20 10.7667 20 13C20 15.0167 19.3375 16.7792 18.0125 18.2875C16.6875 19.7958 15.0167 20.6833 13 20.95Z" fill="currentColor"/>
      </g>
    </svg>
  );

  // Quick prompts — no emojis, clean text only
  const quickPrompts = [
    {
      text: "Bajaj Finance work",
      prompt: "Tell me about Ashish's product design work at Bajaj Finance.",
    },
    {
      text: "Designing with AI",
      prompt: "How does Ashish use Figma AI, Figma Make, ChatGPT, and other AI tools in his workflow?",
    },
    {
      text: "Sales One App revamp",
      prompt: "Tell me about the Sales One App revamp Ashish did at Bajaj Finance.",
    },
    {
      text: "Design philosophy",
      prompt: "What is Ashish's 'Designing with AI, thinking like humans' philosophy?",
    },
    {
      text: "MedApp project",
      prompt: "Tell me about the MedApp doctor appointment booking project.",
    },
    {
      text: "Prime Video redesign",
      prompt: "Tell me about the Amazon Prime Video redesign project.",
    },
  ];

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-[#12141c]/90 border border-amber-500/30 flex items-center justify-center shadow-[0_4px_20px_rgba(245,158,11,0.15)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.35)] cursor-pointer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <img src="/images/ai_avatar.png" alt="Ashli AI Avatar" className="w-10 h-10 rounded-full object-contain" />
        <span className="absolute inset-0 rounded-full border border-amber-500/20 animate-ping opacity-75 pointer-events-none" />
      </motion.button>

      {/* Bespoke Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-24 right-6 z-[9999] w-[400px] h-[600px] max-h-[calc(100vh-120px)] max-w-[calc(100vw-48px)] bg-[#0d0f14]/95 border border-neutral-800/80 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl overflow-hidden flex flex-col font-inter"
          >
            {/* Ambient glow */}
            <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-amber-500/5 rounded-full blur-[40px] pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-800/80 bg-[#12151c]/90 relative z-10">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center">
                  <img src="/images/ai_avatar.png" alt="Ashli Header Avatar" className="w-10 h-10 rounded-full object-contain" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#090b0e] rounded-full animate-pulse" />
                </div>
                <div>
                  <h3 className="font-rubik text-sm font-semibold tracking-wide text-white">Ashli</h3>
                  <p className="text-[10px] text-neutral-400 font-inter">AI Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button onClick={scrollToTop} title="Scroll to top" className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-800/50 text-neutral-400 hover:text-amber-300 transition-colors cursor-pointer">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button onClick={handleReset} title="Clear Chat History" className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-800/50 text-neutral-400 hover:text-white transition-colors cursor-pointer">
                  <ResetIcon />
                </button>
                <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-800/50 text-neutral-400 hover:text-white transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Conversation Log */}
            <div ref={msgContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
              {messages.map((msg, index) => (
                <div key={index} className={`flex items-start gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  {msg.role === "assistant" ? (
                    <img src="/images/ai_avatar.png" alt="AI" className="w-8 h-8 rounded-full object-contain shrink-0" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700/50 flex items-center justify-center text-white shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                  <div className={`max-w-[75%] p-3 rounded-2xl text-xs md:text-sm font-light leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-amber-500/10 border border-amber-500/20 text-white rounded-tr-none text-left"
                      : "bg-white/5 border border-white/5 text-white/90 rounded-tl-none text-left"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex items-start gap-2.5">
                  <img src="/images/ai_avatar.png" alt="AI" className="w-8 h-8 rounded-full object-contain shrink-0" />
                  <div className="bg-white/5 border border-white/5 p-3 rounded-2xl rounded-tl-none flex items-center gap-1.5 min-w-[60px] justify-center">
                    <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Bottom suggestions panel – FAQ OR dynamic follow-ups */}
            <div className="px-2.5 py-2 border-t border-neutral-900 bg-[#090a0e]/40">
              <AnimatePresence mode="wait">
                {showFAQ ? (
                  /* ---- Quick questions ---- */
                  <motion.div
                    key="faq"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="flex items-center justify-between mb-1.5 px-0.5">
                      <p className="text-[9px] text-neutral-600 font-semibold uppercase tracking-widest">Quick questions</p>
                      <button
                        onClick={() => setShowFAQ(false)}
                        title="Close"
                        className="text-neutral-700 hover:text-neutral-400 transition-colors"
                      >
                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <ChipRow rowId="faq-chips">
                      {quickPrompts.map((btn, idx) => (
                        <button
                          key={idx}
                          disabled={isLoading}
                          onClick={() => handleSend(btn.prompt)}
                          className="shrink-0 text-[10px] bg-amber-500/5 hover:bg-amber-500/12 border border-amber-500/15 hover:border-amber-500/40 text-amber-400/70 hover:text-amber-100 px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:pointer-events-none leading-none"
                        >
                          {btn.text}
                        </button>
                      ))}
                    </ChipRow>
                  </motion.div>
                ) : followUps.length > 0 ? (
                  /* ---- Smart contextual follow-up chips ---- */
                  <motion.div
                    key="followups"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="flex items-center justify-between mb-1.5 px-0.5">
                      <p className="text-[9px] text-neutral-600 font-semibold uppercase tracking-widest">Dig deeper</p>
                      <button
                        onClick={() => setFollowUps([])}
                        title="Dismiss"
                        className="text-neutral-700 hover:text-neutral-400 transition-colors"
                      >
                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <ChipRow rowId="followup-chips">
                      {followUps.map((chip, idx) => (
                        <button
                          key={idx}
                          disabled={isLoading}
                          onClick={() => handleSend(chip)}
                          className="shrink-0 text-[10px] bg-amber-500/5 hover:bg-amber-500/12 border border-amber-400/20 hover:border-amber-400/45 text-amber-400/70 hover:text-amber-100 px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:pointer-events-none leading-none"
                        >
                          {chip}
                        </button>
                      ))}
                    </ChipRow>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="p-4 border-t border-neutral-800/80 bg-[#12151c]/90 flex gap-2 relative z-10"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                placeholder="Ask me anything..."
                className="flex-1 bg-[#0a0c10] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/40 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-neutral-800/50 text-[#121212] disabled:text-neutral-500 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Welcome pop-up above Chatbot button */}
      <AnimatePresence>
        {showWelcome && !isOpen && scrollY < 150 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed bottom-[88px] right-6 z-[9998] w-72 p-4 rounded-2xl bg-[#0d0f14]/95 border border-amber-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl text-left flex gap-3 pointer-events-auto font-inter"
          >
            <div className="absolute -bottom-1.5 right-6 w-3.5 h-3.5 bg-[#0d0f14] border-r border-b border-amber-500/20 transform rotate-45 pointer-events-none" />
            <img src="/images/ai_avatar.png" alt="Ashli welcome" className="w-8 h-8 rounded-full object-contain shrink-0 bg-[#090b0e] border border-amber-500/10" />
            <div className="flex-1 pr-4">
              <h4 className="text-[10px] text-amber-500 font-semibold tracking-wider uppercase mb-0.5 font-rubik">Ashli</h4>
              <p className="text-[11px] text-white/95 leading-normal font-light">
                Hey there! I am Ashli 👋, Ashish&apos;s interactive AI assistant. Ask me anything about him!
              </p>
            </div>
            <button
              onClick={() => setShowWelcome(false)}
              className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-neutral-500 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

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
    </>
  );
}
