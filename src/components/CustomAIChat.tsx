"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// ─── Smart follow-up extraction ──────────────────────────────────────────────
const RESPONSE_FOLLOW_UPS: Array<{ triggers: string[]; chips: string[] }> = [
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
  {
    triggers: ["sales one app", "sales one"],
    chips: [
      "What features did Ashish revamp in the Sales One App?",
      "What was the impact of the new Scan & Start onboarding?",
      "What dashboards did Ashish design for sales agents?",
    ],
  },
  {
    triggers: ["high-converting", "checkout funnel", "drop-off", "conversion rate", "loan journey"],
    chips: [
      "How did Ashish improve the Gold Loan checkout flow?",
      "What marketing assets did he create for lending products?",
      "How did Ashish design the INSTA EMI Card experience?",
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
  {
    triggers: ["remi", "retail emi", "co-branded", "push notification", "in-app banner", "promotional gif"],
    chips: [
      "What brands are covered in the REMI campaigns?",
      "How does Ashish create animated GIFs for Bajaj Finance?",
      "Tell me about the Bajaj Pay marketing collaterals",
    ],
  },
  {
    triggers: ["training video", "merchant training", "animated training", "step-by-step video"],
    chips: [
      "What tools does Ashish use to create training videos?",
      "What topics do the merchant training videos cover?",
      "How does motion design help merchants learn the app?",
    ],
  },
  {
    triggers: ["merchant one app", "finserv for business", "merchant dashboard"],
    chips: [
      "What dashboards did Ashish design for the Merchant One App?",
      "Tell me about the animated merchant training videos",
      "How does the app help merchants get started with Bajaj?",
    ],
  },
  {
    triggers: ["edc", "pos terminal", "point-of-sale", "swipe journey", "terminal journey"],
    chips: [
      "How did Ashish design for zero payment errors on POS?",
      "What accessibility principles did he use for EDC screens?",
      "Tell me about the Bajaj Pay EDC branding work",
    ],
  },
  {
    triggers: ["aggregator dashboard", "non-aggregator", "merchant network", "aggregator and non-aggregator"],
    chips: [
      "What's the difference between Aggregator and Non-Aggregator dashboards?",
      "How does Ashish simplify complexity in B2B flows?",
      "What kind of data do these dashboards manage?",
    ],
  },
  {
    triggers: ["b2b enterprise", "b2b solution", "aggregator", "corporate partner"],
    chips: [
      "What is the B2B Aggregator dashboard?",
      "How does Ashish design for large merchant networks?",
      "What problem did the B2B Enterprise solution solve?",
    ],
  },
  {
    triggers: ["sales one", "gold loan", "merchant one", "lending", "b2b"],
    chips: [
      "Tell me more about the Sales One App revamp",
      "What is the Merchant One App?",
      "How did Ashish design the core lending journeys?",
    ],
  },
  {
    triggers: ["bajaj finance", "bajaj finserv", "bajaj pay"],
    chips: [
      "What exactly does Ashish work on at Bajaj Finance?",
      "What kind of products does he design there?",
      "How long has Ashish been at Bajaj Finance?",
    ],
  },
  {
    triggers: ["chatgpt", "magnific", "n8n", "notebook lm", "antigravity ide"],
    chips: [
      "How exactly does Ashish use ChatGPT in design work?",
      "What does Magnific AI help Ashish create?",
      "What is N8N and how does Ashish use it for workflows?",
    ],
  },
  {
    triggers: ["figma ai", "figma make"],
    chips: [
      "How does Figma AI speed up Ashish's wireframing?",
      "What is Ashish's design system process in Figma?",
      "How does Ashish hand off Figma designs to developers?",
    ],
  },
  {
    triggers: ["figma", "design system", "design token"],
    chips: [
      "How does Ashish use Figma AI and Figma Make?",
      "How does Ashish structure design tokens in Figma?",
      "What makes Ashish's design systems enterprise-ready?",
    ],
  },
  {
    triggers: ["designing with ai", "thinking like humans", "ai philosophy"],
    chips: [
      "Which AI tools does Ashish use in his daily workflow?",
      "How does Ashish use ChatGPT for design copywriting?",
      "How does Magnific AI help Ashish with visual generation?",
    ],
  },
  {
    triggers: ["chatgpt", "magnific", "notebook lm", "n8n", "antigravity"],
    chips: [
      "What is Ashish's 'Designing with AI, thinking like humans' philosophy?",
      "How does Ashish use Figma AI and Figma Make?",
      "How does N8N agentic workflow fit in Ashish's process?",
    ],
  },
  {
    triggers: ["protopie", "logic-driven prototype", "interactive prototype"],
    chips: [
      "Why does Ashish prefer ProtoPie over basic Figma links?",
      "How does Ashish prototype EDC terminal swipe flows in ProtoPie?",
      "What is Ashish's full prototyping-to-handoff process?",
    ],
  },
  {
    triggers: ["framer motion", "framer", "micro-animation", "page transition"],
    chips: [
      "How is Framer Motion used in this portfolio site?",
      "What kind of motion effects did Ashish create?",
      "Does Ashish use Framer for live client websites?",
    ],
  },
  {
    triggers: ["after effects", "motion design", "animation", "merchant training video"],
    chips: [
      "How does Ashish animate merchant training videos?",
      "What motion graphics did Ashish create for Bajaj?",
      "How does Ashish use motion as a usability tool?",
    ],
  },
  {
    triggers: ["medapp", "doctor appointment", "doctor booking"],
    chips: [
      "What features does MedApp have?",
      "How did Ashish design the doctor availability flow?",
      "What UX challenges did Ashish solve in MedApp?",
    ],
  },
  {
    triggers: ["prime video", "amazon prime", "lean ux"],
    chips: [
      "What was Ashish's Lean UX approach for Prime Video?",
      "What content discovery problems did the redesign solve?",
      "Tell me about Ashish's other featured projects",
    ],
  },
  {
    triggers: ["user experience", "ux design", "user research", "usability"],
    chips: [
      "What is Ashish's UX process at Bajaj Finance?",
      "How does Ashish conduct user research?",
      "How does Ashish balance business needs with UX?",
    ],
  },
  {
    triggers: ["ashishcmaliofficial@gmail.com", "9075521047", "reach him", "available for"],
    chips: [
      "What kind of projects is Ashish open to?",
      "Tell me about Ashish's Bajaj Finance work",
      "What is Ashish's design philosophy?",
    ],
  },
  {
    triggers: ["animation science", "yashwantrao chavan", "midas multimedia", "cgpa"],
    chips: [
      "How did Ashish's animation background influence his design work?",
      "What did Ashish learn at Midas Multimedia?",
      "How did Ashish transition from animation to product design?",
    ],
  },
];

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

function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
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
        <ul key={key++} className="list-none space-y-1 my-1.5">
          {bulletItems}
        </ul>
      );
      bulletItems = [];
    }
  };

  const flushNumbered = () => {
    if (numberedItems.length > 0) {
      elements.push(
        <ol key={key++} className="list-none space-y-1 my-1.5">
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
          <span className="shrink-0 font-semibold text-amber-400/80 min-w-[1.2em] text-right">{numberedMatch[1]}.</span>
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

  return <div className="space-y-1.5">{elements}</div>;
}

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

function isContactResponse(text: string): boolean {
  const lower = text.toLowerCase();
  return (
    lower.includes("ashishcmaliofficial@gmail.com") ||
    lower.includes("9075521047") ||
    lower.includes("+91 9075") ||
    lower.includes("linkedin") ||
    lower.includes("behance") ||
    lower.includes("whatsapp") ||
    (lower.includes("reach") && lower.includes("ashish")) ||
    (lower.includes("contact") && (lower.includes("email") || lower.includes("phone") || lower.includes("call")))
  );
}

function ContactPanel() {
  const wa = `https://wa.me/919075521047?text=${encodeURIComponent("Hi Ashish! 👋 I came across your portfolio and would love to connect.")}`;
  const mail = `mailto:ashishcmaliofficial@gmail.com?subject=${encodeURIComponent("Let's Connect — Saw Your Portfolio")}&body=${encodeURIComponent("Hi Ashish,\n\nI came across your portfolio and I'm really impressed by your work! I'd love to connect.\n\nBest regards,")}`;
  const call = "tel:+919075521047";
  const linkedin = "https://www.linkedin.com/in/ashish-mali-b071b526b";
  const behance = "https://www.behance.net/ashishmali";

  const actions = [
    {
      label: "WhatsApp",
      href: wa,
      bg: "bg-[#25D366]/10 hover:bg-[#25D366]/20 border-[#25D366]/25 hover:border-[#25D366]/50",
      text: "text-[#25D366]",
      icon: (
        <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
    },
    {
      label: "Email",
      href: mail,
      bg: "bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/25 hover:border-amber-500/50",
      text: "text-amber-400",
      icon: (
        <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: "Call",
      href: call,
      bg: "bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/25 hover:border-emerald-500/50",
      text: "text-emerald-400",
      icon: (
        <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: linkedin,
      bg: "bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 border-[#0A66C2]/25 hover:border-[#0A66C2]/50",
      text: "text-[#4D9FDC]",
      icon: (
        <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      label: "Behance",
      href: behance,
      bg: "bg-[#1769FF]/10 hover:bg-[#1769FF]/20 border-[#1769FF]/25 hover:border-[#1769FF]/50",
      text: "text-[#5B8FFF]",
      icon: (
        <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.051-2.053-5.051-5s2.01-4.975 5.001-4.975c2.941 0 4.842 1.739 5.083 4.389.065.741.065 1.711.065 1.711H15.849s.13 1.851 2.001 1.851c.821 0 1.489-.316 1.764-1.031l4.112.055zM15.85 14h4.201c0-.651-.124-1.789-1.994-1.789-1.792 0-2.148 1.365-2.207 1.789zM9.798 11.01c0-.913-.478-1.74-1.629-1.937-.701-.127-1.479-.149-2.255-.149H2v9.938h3.759c.867 0 1.779-.057 2.601-.296 1.567-.449 2.506-1.563 2.506-3.268 0-1.258-.648-2.29-1.677-2.799.621-.454.609-1.083.609-1.489zm-5.549-1.239h1.629c1.126 0 1.727.494 1.727 1.344 0 .949-.68 1.375-1.771 1.375H4.249v-2.719zm3.14 5.527c0 1.037-.695 1.633-1.95 1.633H4.249v-3.179h1.19c1.374 0 1.95.524 1.95 1.546z"/>
        </svg>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="ml-10 mt-2"
    >
      <p className="text-[9px] text-neutral-600 font-semibold uppercase tracking-widest mb-1.5">Connect directly</p>
      <div className="flex flex-row flex-wrap gap-1.5">
        {actions.map((a) => (
          <a
            key={a.label}
            href={a.href}
            target={a.href.startsWith("tel:") || a.href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-medium transition-all duration-200 ${a.bg} ${a.text}`}
          >
            {a.icon}
            {a.label}
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
  const [followUps, setFollowUps] = useState<string[]>([]);
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
  const [showWelcome, setShowWelcome] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const msgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    let companyFound = "";
    if (typeof window !== "undefined") {
      let storedUserId = localStorage.getItem("ashli_user_id");
      if (!storedUserId) {
        storedUserId = "usr_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now().toString(36);
        localStorage.setItem("ashli_user_id", storedUserId);
      }

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

  useEffect(() => {
    if (showWelcome) {
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(150);
      }
    }
  }, [showWelcome]);

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
        data.choices?.[0]?.message?.content || "Sorry, I encountered an issue. Let's try again!";

      setMessages((prev) => [...prev, { role: "assistant", content: assistantMessage }]);

      if (isContactResponse(assistantMessage)) setShowContactCTAs(true);

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
        content: targetCompany
          ? `Reset complete! ${getInitialAssistantMessage(targetCompany)}`
          : `Reset complete! ${getGreeting()}! I am Ashli 👋, Ashish's interactive AI assistant. You can ask me anything about him!`,
      },
    ]);
    setShowFAQ(true);
    setFollowUps([]);
    setShowContactCTAs(false);
  };

  const handleClose = () => {
    setIsOpen(false);
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
    {
      text: "Connect with Ashish",
      prompt: "How can I contact or connect with Ashish?",
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
                <button onClick={handleClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-800/50 text-neutral-400 hover:text-white transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Conversation Log */}
            <div ref={msgContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
              {messages.map((msg, index) => {
                const isLastAssistantMsg = msg.role === "assistant" && index === messages.length - 1;
                return (
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
                    <div className="flex flex-col gap-1 max-w-[75%]">
                      <div className={`p-3 rounded-2xl text-xs md:text-sm font-light leading-relaxed ${
                        msg.role === "user"
                          ? "bg-amber-500/10 border border-amber-500/20 text-white rounded-tr-none text-left whitespace-pre-wrap"
                          : "bg-white/5 border border-white/5 text-white/90 rounded-tl-none text-left"
                      }`}>
                        {msg.role === "user" ? msg.content : renderMessageContent(msg.content)}
                      </div>
                      
                      {isLastAssistantMsg && showContactCTAs && <ContactPanel />}
                    </div>
                  </div>
                );
              })}
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

            {/* Bottom suggestions panel */}
            <div className="px-2.5 py-2 border-t border-neutral-900 bg-[#090a0e]/40">
              <AnimatePresence mode="wait">
                {showFAQ ? (
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
            <img src="/images/ai_avatar.png" alt="Ashli welcome" className="w-8 h-8 rounded-full object-contain shrink-0 bg-[#090b0e] border border-amber-500/10" />
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
