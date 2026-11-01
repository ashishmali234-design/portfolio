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
      "What was Ashish's role in designing Scan & Start?",
      "What info do the Performance Dashboards show to agents?",
      "How did Ashish simplify the attendance logging process?",
    ],
  },
  {
    triggers: ["homepage", "merchant profile", "onboarding dashboard", "performance dashboard", "team tracking", "tasks management"],
    chips: [
      "How did Ashish approach the Sales One App revamp?",
      "What does the Performance Dashboard actually track?",
      "How do sales agents manage their daily tasks?",
    ],
  },
  // Level 2: Sales One App mentioned by name
  {
    triggers: ["sales one app", "sales one"],
    chips: [
      "What features did Ashish revamp in the Sales One App?",
      "What was the impact of the new Scan & Start onboarding?",
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
    triggers: ["ashishcmaliofficial@gmail.com", "9075521047", "reach him", "available for"],
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

// ─── Markdown-like message renderer ─────────────────────────────────────────
function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-amber-300">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function renderMessageContent(content: string): React.ReactNode {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let bulletItems: React.ReactNode[] = [];
  let numberedItems: React.ReactNode[] = [];
  let key = 0;

  const flushBullets = () => {
    if (bulletItems.length > 0) {
      elements.push(
        <ul key={key++} className="space-y-1.5 my-1.5 pl-0.5">
          {bulletItems}
        </ul>
      );
      bulletItems = [];
    }
  };

  const flushNumbered = () => {
    if (numberedItems.length > 0) {
      elements.push(
        <ol key={key++} className="space-y-1.5 my-1.5 pl-0.5">
          {numberedItems}
        </ol>
      );
      numberedItems = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed === "") {
      flushBullets();
      flushNumbered();
      continue;
    }

    const bulletMatch = trimmed.match(/^[\*\-•]\s+(.+)/);
    if (bulletMatch) {
      flushNumbered();
      bulletItems.push(
        <li key={key++} className="flex items-start gap-2 text-white/90">
          <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-amber-400/70 inline-block" />
          <span>{renderInline(bulletMatch[1])}</span>
        </li>
      );
      continue;
    }

    const numberedMatch = trimmed.match(/^(\d+)\.\s+(.+)/);
    if (numberedMatch) {
      flushBullets();
      numberedItems.push(
        <li key={key++} className="flex items-start gap-2 text-white/90">
          <span className="shrink-0 font-semibold text-amber-400/80 min-w-[1.2em] text-right">
            {numberedMatch[1]}.
          </span>
          <span>{renderInline(numberedMatch[2])}</span>
        </li>
      );
      continue;
    }

    flushBullets();
    flushNumbered();
    elements.push(
      <p key={key++} className="leading-relaxed text-white/90">
        {renderInline(trimmed)}
      </p>
    );
  }

  flushBullets();
  flushNumbered();

  return <div className="space-y-2">{elements}</div>;
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
    <div className="relative flex items-center group/row">
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

      <div
        ref={scrollRef}
        className="flex flex-row overflow-x-auto whitespace-nowrap scrollbar-none gap-1.5 pb-0.5 scroll-smooth flex-1"
      >
        {children}
      </div>

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

// ─── Trash / Clear chat icon ──────────────────────────────────────────────────
function ResetIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );
}

// ─── Contact action buttons ───────────────────────────────────────────────────
function isContactResponse(text: string): boolean {
  const lower = text.toLowerCase();
  return (
    lower.includes("ashishcmaliofficial@gmail.com") ||
    lower.includes("9075521047") ||
    lower.includes("reach out") ||
    lower.includes("contact") ||
    lower.includes("linkedin.com") ||
    lower.includes("behance.net") ||
    lower.includes("hire")
  );
}

function ContactActions() {
  const actions = [
    {
      label: "WhatsApp",
      href: "https://wa.me/919075521047",
      icon: "💬",
      bg: "bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30",
      text: "text-emerald-400",
    },
    {
      label: "Email",
      href: "mailto:ashishcmaliofficial@gmail.com",
      icon: "✉️",
      bg: "bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30",
      text: "text-amber-400",
    },
    {
      label: "Call",
      href: "tel:+919075521047",
      icon: "📞",
      bg: "bg-cyan-500/10 hover:bg-cyan-500/20 border-cyan-500/30",
      text: "text-cyan-400",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ashish-mali-b071b526b",
      icon: "🔗",
      bg: "bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/30",
      text: "text-blue-400",
    },
    {
      label: "Behance",
      href: "https://www.behance.net/ashishmali",
      icon: "🎨",
      bg: "bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/30",
      text: "text-purple-400",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="ml-10 mt-2"
    >
      <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold mb-1.5">
        Connect directly
      </p>
      <div className="flex flex-wrap gap-1.5">
        {actions.map((a) => (
          <a
            key={a.label}
            href={a.href}
            target={a.href.startsWith("tel:") || a.href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-medium transition-all duration-200 ${a.bg} ${a.text}`}
          >
            <span>{a.icon}</span>
            <span>{a.label}</span>
          </a>
        ))}
      </div>
    </motion.div>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function CustomAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [showFAQ, setShowFAQ] = useState(true);
  const [followUps, setFollowUps] = useState<string[]>([]);
  const [showContactCTAs, setShowContactCTAs] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [targetPerson, setTargetPerson] = useState<string | null>(null);
  const [targetCompany, setTargetCompany] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `${getGreeting()}! I am Ashli 👋, Ashish's interactive AI assistant. You can ask me anything about him!`,
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
        storedUserId =
          "usr_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now().toString(36);
        localStorage.setItem("ashli_user_id", storedUserId);
      }

      const params = new URLSearchParams(window.location.search);
      const p = params.get("person") || params.get("target") || params.get("p");
      const c = params.get("company") || params.get("org") || params.get("team") || params.get("c");
      if (p) setTargetPerson(p);
      if (c) setTargetCompany(c);

      if (p && c) {
        setMessages([
          {
            role: "assistant",
            content: `Hello ${p} and welcome to team ${c}! I am Ashli 👋, Ashish's interactive AI assistant. Ask me anything about him!`,
          },
        ]);
      } else if (p) {
        setMessages([
          {
            role: "assistant",
            content: `Hello ${p}! Welcome to Ashish's portfolio. I am Ashli 👋, his interactive AI assistant. Ask me anything about him!`,
          },
        ]);
      } else if (c) {
        setMessages([
          {
            role: "assistant",
            content: `Hello Team ${c}! Welcome to Ashish's portfolio. I am Ashli 👋, his interactive AI assistant. Ask me anything about him!`,
          },
        ]);
      }
    }

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest("[data-chat-trigger]")) {
        e.preventDefault();
        setIsOpen(true);
        setShowWelcome(false);
      }
    };
    document.addEventListener("click", handleGlobalClick);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Show welcome pop-up after 2.5 seconds
    const fallbackTimer = setTimeout(() => {
      if (window.scrollY < 100) setShowWelcome(true);
    }, 2500);

    const handleHeroAnimationComplete = () => {
      clearTimeout(fallbackTimer);
      if (window.scrollY < 100) setShowWelcome(true);
    };
    window.addEventListener("hero-animation-complete", handleHeroAnimationComplete);

    return () => {
      document.removeEventListener("click", handleGlobalClick);
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

  // Trigger device vibration when welcome pop-up appears
  useEffect(() => {
    if (showWelcome) {
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(150);
      }
    }
  }, [showWelcome]);

  // Trigger device vibration when a new assistant message is received
  useEffect(() => {
    if (messages.length > 1) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg && lastMsg.role === "assistant") {
        if (typeof navigator !== "undefined" && navigator.vibrate) {
          navigator.vibrate(100);
        }
      }
    }
  }, [messages]);

  const scrollToTop = () => msgContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });

  if (!mounted) return null;

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    if (!textToSend) setInput("");
    setShowFAQ(false);
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

      // REAL BACKEND API CALL
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          userId,
          person: targetPerson || undefined,
          company: targetCompany || undefined,
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      const assistantMessage =
        data.choices?.[0]?.message?.content || "Sorry, I encountered an issue. Let's try again!";

      setMessages((prev) => [...prev, { role: "assistant", content: assistantMessage }]);

      if (isContactResponse(assistantMessage)) setShowContactCTAs(true);

      const dynamicChips = extractFollowUps(assistantMessage);
      setFollowUps(dynamicChips);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having a little trouble connecting right now. You can reach Ashish directly via WhatsApp (+91 9075521047) or email (ashishcmaliofficial@gmail.com)!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    const initialGreeting =
      targetPerson && targetCompany
        ? `Hello ${targetPerson} and welcome to team ${targetCompany}! I am Ashli 👋, Ashish's interactive AI assistant. Ask me anything about him!`
        : targetPerson
        ? `Hello ${targetPerson}! Welcome to Ashish's portfolio. I am Ashli 👋, his interactive AI assistant. Ask me anything about him!`
        : targetCompany
        ? `Hello Team ${targetCompany}! Welcome to Ashish's portfolio. I am Ashli 👋, his interactive AI assistant. Ask me anything about him!`
        : `${getGreeting()}! I am Ashli 👋, Ashish's interactive AI assistant. You can ask me anything about him!`;

    setMessages([{ role: "assistant", content: initialGreeting }]);
    setFollowUps([]);
    setShowContactCTAs(false);
    setShowFAQ(true);
    setInput("");
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const QUICK_ACTIONS = [
    { text: "💼 Bajaj Finance", prompt: "Tell me about Ashish's work at Bajaj Finance" },
    { text: "🎬 Prime Video", prompt: "Explain the Prime Video redesign case study" },
    { text: "⚡ His Toolkit", prompt: "What design tools and AI workflows does Ashish use?" },
    { text: "📬 Contact Ashish", prompt: "How can I contact Ashish directly?" },
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowWelcome(false);
        }}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-[#12141c]/90 border border-amber-500/30 flex items-center justify-center shadow-[0_4px_20px_rgba(245,158,11,0.15)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.35)] cursor-pointer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI Assistant"
      >
        <img
          src="/images/ai_avatar.png"
          alt="Ashli AI Avatar"
          className="w-10 h-10 rounded-full object-contain"
        />
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
                  <img
                    src="/images/ai_avatar.png"
                    alt="Ashli Header Avatar"
                    className="w-10 h-10 rounded-full object-contain"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#090b0e] rounded-full animate-pulse" />
                </div>
                <div>
                  <h3 className="font-rubik text-sm font-semibold tracking-wide text-white">Ashli</h3>
                  <p className="text-[10px] text-neutral-400 font-inter">AI Assistant</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={scrollToTop}
                  title="Scroll to top"
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-800/50 text-neutral-400 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  onClick={handleReset}
                  title="Clear Chat History"
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-800/50 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <ResetIcon />
                </button>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-800/50 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Conversation Log */}
            <div
              ref={msgContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent"
            >
              {messages.map((msg, index) => {
                const isLastAssistantMsg =
                  msg.role === "assistant" && index === messages.length - 1;
                return (
                  <div
                    key={index}
                    className={`flex items-start gap-2.5 ${
                      msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <img
                        src="/images/ai_avatar.png"
                        alt="AI"
                        className="w-8 h-8 rounded-full object-contain shrink-0"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700/80 flex items-center justify-center text-xs font-semibold text-neutral-300 shrink-0">
                        You
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-xs p-3.5 rounded-2xl ${
                          msg.role === "user"
                            ? "bg-amber-500 text-black font-medium ml-8 rounded-tr-none shadow-[0_4px_15px_rgba(245,158,11,0.2)]"
                            : "bg-[#12151c]/90 text-neutral-200 border border-neutral-800/80 mr-4 rounded-tl-none leading-relaxed"
                        }`}
                      >
                        {msg.role === "assistant" ? renderMessageContent(msg.content) : msg.content}
                      </div>

                      {/* Direct contact action pills */}
                      {isLastAssistantMsg && showContactCTAs && <ContactActions />}
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex items-start gap-2.5">
                  <img
                    src="/images/ai_avatar.png"
                    alt="AI Loading"
                    className="w-8 h-8 rounded-full object-contain shrink-0 animate-pulse"
                  />
                  <div className="bg-[#12151c]/90 text-neutral-400 border border-neutral-800/80 p-3.5 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Smart Chips Area */}
            <div className="p-3 border-t border-neutral-800/60 bg-[#0d0f14]/80 flex flex-col gap-2 relative z-10">
              <AnimatePresence mode="wait">
                {showFAQ ? (
                  <motion.div
                    key="quickactions"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                  >
                    <ChipRow rowId="quick-actions">
                      {QUICK_ACTIONS.map((btn) => (
                        <button
                          key={btn.text}
                          onClick={() => handleSend(btn.prompt)}
                          className="shrink-0 text-[10px] bg-amber-500/5 hover:bg-amber-500/12 border border-amber-500/15 hover:border-amber-500/40 text-amber-400/70 hover:text-amber-100 px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:pointer-events-none leading-none"
                        >
                          {btn.text}
                        </button>
                      ))}
                    </ChipRow>
                  </motion.div>
                ) : followUps.length > 0 ? (
                  <motion.div
                    key="followups"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="flex items-center justify-between mb-1.5 px-0.5">
                      <p className="text-[9px] text-neutral-600 font-semibold uppercase tracking-widest">
                        Dig deeper
                      </p>
                      <button
                        onClick={() => setFollowUps([])}
                        className="text-[9px] text-neutral-600 hover:text-neutral-400 transition-colors cursor-pointer"
                      >
                        dismiss
                      </button>
                    </div>
                    <ChipRow rowId="follow-ups">
                      {followUps.map((chip) => (
                        <button
                          key={chip}
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
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
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
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-neutral-800/50 text-[#121212] disabled:text-neutral-500 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
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
            <img
              src="/images/ai_avatar.png"
              alt="Ashli welcome"
              className="w-8 h-8 rounded-full object-contain shrink-0 bg-[#090b0e] border border-amber-500/10"
            />
            <div className="flex-1 pr-4">
              <h4 className="text-[10px] text-amber-500 font-semibold tracking-wider uppercase mb-0.5 font-rubik">
                Ashli
              </h4>
              <p className="text-[11px] text-white/95 leading-normal font-light">
                {targetPerson && targetCompany ? (
                  <>
                    Hey {targetPerson} & Team {targetCompany}! 👋 Welcome to Ashish&apos;s portfolio. I&apos;m Ashli, his interactive AI assistant. Ask me anything!
                  </>
                ) : targetPerson ? (
                  <>
                    Hey {targetPerson}! 👋 Welcome to Ashish&apos;s portfolio. I&apos;m Ashli, his interactive AI assistant. Ask me anything!
                  </>
                ) : targetCompany ? (
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