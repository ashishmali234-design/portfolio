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
    triggers: ["performance dashboard", "kpi", "incentive tracker", "daily target"],
    chips: [
      "How did the dashboards motivate field agents?",
      "What was the drop-off reduction across the 5 core journeys?",
      "How did 50k+ daily agents react to the new design?",
    ],
  },
  // Level 2: Bajaj Sales One overall
  {
    triggers: ["sales one", "50,000", "50k", "onboarding flow", "5 core journeys", "offline-first"],
    chips: [
      "Tell me about the Scan & Start feature he designed",
      "How did Ashish design for low-connectivity rural areas?",
      "What user research did Ashish conduct with field agents?",
      "Can I see the Bajaj Sales One case study?",
    ],
  },
  // Level 1: Bajaj Finserv general
  {
    triggers: ["bajaj", "finserv", "financial platform"],
    chips: [
      "Tell me about the Bajaj Sales One enterprise app",
      "What was Ashish's role at Bajaj Finserv?",
      "What impact did the redesigned journeys have?",
    ],
  },

  // ── PRIME VIDEO ────────────────────────────────────────────────────────────
  // Level 3: Specific feature redesigns mentioned
  {
    triggers: ["scene search", "multimodal", "timestamp", "dialogue search"],
    chips: [
      "How does Scene Search let users find specific moments?",
      "What research insights led to the Scene Search concept?",
      "How does the AI understand emotional or action queries?",
    ],
  },
  {
    triggers: ["social watch party", "co-viewing", "spatial audio", "shared queue"],
    chips: [
      "How did Ashish design the Social Watch Party UI?",
      "How does cross-device sync work in the redesign?",
      "What makes this better than Amazon's current party mode?",
    ],
  },
  {
    triggers: ["discovery engine", "mood-based", "decision paralysis", "browse fatigue"],
    chips: [
      "How does the Mood-Based Discovery engine work?",
      "How does the UI solve choice paralysis in under 60 seconds?",
      "Can I explore the Prime Video Redesign prototype?",
    ],
  },
  // Level 2: Prime Video overall
  {
    triggers: ["prime video", "streaming", "ott platform", "amazon"],
    chips: [
      "Tell me about the Scene Search feature",
      "What is the Mood-Based Discovery Engine?",
      "How did Ashish redesign the Social Watch Party?",
      "What user problems in Prime Video did he identify?",
    ],
  },

  // ── DESIGN SYSTEMS & DESIGN TOKENS ─────────────────────────────────────────
  {
    triggers: ["design token", "figma tokens", "token hierarchy", "semantic color"],
    chips: [
      "How did Ashish structure token hierarchies?",
      "How did he automate Figma-to-code token pipelines?",
      "What tools did he use to sync tokens with developers?",
    ],
  },
  {
    triggers: ["component library", "variant", "accessibility", "wcag", "contrast"],
    chips: [
      "How did Ashish ensure WCAG AAA accessibility?",
      "How did the system cut developer handoff time by 40%?",
      "What was the component governance and versioning model?",
    ],
  },
  {
    triggers: ["design system", "design systems", "atomic design", "zero to one"],
    chips: [
      "How did Ashish scale design systems for enterprise products?",
      "How did the design system cut dev handoff by 40%?",
      "Tell me about his design token architecture",
      "How does Ashish bridge the gap between Figma and code?",
    ],
  },

  // ── UX RESEARCH & USER TESTING ─────────────────────────────────────────────
  {
    triggers: ["field research", "contextual inquiry", "shadowing", "agent interviews"],
    chips: [
      "What surprised Ashish most during field shadowing?",
      "How did field insights change the Sales One navigation?",
      "What research methods does Ashish prefer for enterprise?",
    ],
  },
  {
    triggers: ["usability testing", "a/b test", "heuristic evaluation", "sus score"],
    chips: [
      "What quantitative usability metrics does Ashish track?",
      "Can you give an example of an A/B test that drove a decision?",
      "How does Ashish balance user feedback with business KPIs?",
    ],
  },
  {
    triggers: ["user research", "interviews", "personas", "journey map", "pain points"],
    chips: [
      "How did research shape the Bajaj Sales One experience?",
      "What was his research approach for the Prime Video project?",
      "How does Ashish validate early concepts before building?",
    ],
  },

  // ── ENTERPRISE & FINTECH ───────────────────────────────────────────────────
  {
    triggers: ["fintech", "compliance", "fraud prevention", "regulatory"],
    chips: [
      "How did Ashish balance regulatory compliance with speed?",
      "What fintech UX challenges did he solve at Bajaj?",
      "How did he handle sensitive customer financial data display?",
    ],
  },
  {
    triggers: ["enterprise ux", "b2b", "complex workflows", "density"],
    chips: [
      "How does Ashish approach high-density data dashboards?",
      "What makes enterprise UX different from consumer apps for him?",
      "Tell me about Bajaj Sales One's offline-first architecture",
    ],
  },

  // ── CONTACT, AVAILABILITY & HIRING ─────────────────────────────────────────
  {
    triggers: ["reach out", "email", "get in touch", "available", "schedule a chat", "open to opportunities"],
    chips: [
      "What roles is Ashish currently looking for?",
      "Is Ashish open to remote or relocation?",
      "How quickly does Ashish typically respond to emails?",
    ],
  },
  {
    triggers: ["product designer role", "senior product designer", "lead designer", "full-time", "contract"],
    chips: [
      "What kind of team culture does Ashish thrive in?",
      "Send an email to Ashish",
      "Connect on LinkedIn with Ashish",
    ],
  },

  // ── SKILLS & TOOLS ─────────────────────────────────────────────────────────
  {
    triggers: ["figma", "framer", "prototyping", "micro-interactions"],
    chips: [
      "Can Ashish write frontend code too?",
      "How does he use AI tools like Claude & Cursor in design?",
      "What is Ashish's end-to-end design process?",
    ],
  },
  {
    triggers: ["frontend", "react", "next.js", "tailwind", "typescript"],
    chips: [
      "How does Ashish's coding skill help during handoff?",
      "Did Ashish build this portfolio website himself?",
      "What is his philosophy on designer-developer collaboration?",
    ],
  },
];

// Fallback suggestions based on what the USER asked (if no response follow-up matched)
function getDynamicFollowUps(lastUserText: string, lastResponseText: string): string[] {
  const combinedResponse = lastResponseText.toLowerCase();

  // 1. First priority: find follow-ups triggered by the content of Ashli's actual answer
  for (const item of RESPONSE_FOLLOW_UPS) {
    const matched = item.triggers.some((t) => combinedResponse.includes(t.toLowerCase()));
    if (matched) {
      // Pick up to 3 chips that haven't been asked yet
      return item.chips.slice(0, 3);
    }
  }

  // 2. Second priority: based on user query category
  const q = lastUserText.toLowerCase();

  if (q.includes("bajaj") || q.includes("sales one") || q.includes("enterprise") || q.includes("fintech")) {
    return [
      "Tell me about the Scan & Start feature he designed",
      "How did Ashish cut drop-offs across 5 journeys?",
      "Can I see the Bajaj Sales One case study?",
    ];
  }
  if (q.includes("prime") || q.includes("video") || q.includes("streaming") || q.includes("ott")) {
    return [
      "How does the Scene Search feature work?",
      "Tell me about the Mood-Based Discovery Engine",
      "How did he redesign the Social Watch Party?",
    ];
  }
  if (q.includes("system") || q.includes("token") || q.includes("component") || q.includes("figma")) {
    return [
      "How did the design system cut handoff time by 40%?",
      "Tell me about Ashish's design token architecture",
      "How does he handle dark mode & theme scaling?",
    ];
  }
  if (q.includes("research") || q.includes("testing") || q.includes("interviews") || q.includes("metrics")) {
    return [
      "What quantitative usability metrics does Ashish track?",
      "How did field research change the Bajaj design?",
      "How does he validate concepts before development?",
    ];
  }
  if (q.includes("contact") || q.includes("hire") || q.includes("reach") || q.includes("email") || q.includes("connect")) {
    return [
      "What roles is Ashish looking for?",
      "Is Ashish open to remote or relocation?",
      "Can I see his resume?",
    ];
  }

  // Generic fallback if nothing specific matches
  return [
    "Tell me about the Bajaj Sales One enterprise app",
    "How does the Prime Video redesign solve browse fatigue?",
    "How did Ashish scale design systems by 40%?",
  ];
}

// ─── FAQ Knowledge Base ───────────────────────────────────────────────────────
const FAQS: Array<{ q: string; a: string; category: string }> = [
  // ── BAJAJ SALES ONE (DEEP DIVE) ──
  {
    category: "Featured Work",
    q: "Tell me about the Bajaj Sales One app",
    a: "Ashish led the end-to-end product design for **Bajaj Sales One**, an enterprise app used daily by **50,000+ field sales agents** across India.\n\nHe restructured **5 mission-critical core journeys**, introduced a zero-click **Scan & Start** QR onboarding flow, and designed an **offline-first sync architecture** for agents operating in low-connectivity rural areas.\n\n**Impact:** 40% reduction in customer onboarding drop-offs, 25% faster average loan application processing, and an adoption rate exceeding 90% within the first quarter.",
  },
  {
    category: "Featured Work",
    q: "What was the Scan & Start feature in Bajaj Sales One?",
    a: "**Scan & Start** was a zero-friction entry point designed by Ashish to replace a 6-step manual merchant visit registration.\n\nBy placing encrypted QR codes at merchant partner locations, field agents simply point their camera upon arrival. The app automatically:\n• Verifies GPS geofence within 15 meters\n• Logs biometric / secure attendance\n• Pre-populates merchant relationship data and active leads\n\nThis cut the check-in time from **3.5 minutes down to 8 seconds**, completely eliminating fraudulent off-site check-ins.",
  },
  {
    category: "Featured Work",
    q: "How did Ashish design for offline use at Bajaj Finserv?",
    a: "Many of Bajaj's 50,000+ agents operate in Tier 3/4 Indian cities and rural markets where cellular connections drop frequently.\n\nAshish designed an **optimistic UI & local-first queue system**:\n• **Visual Confidence:** Clear badge indicators show data saved locally vs synced\n• **Zero Blocking:** Agents can complete loan documentation, capture KYC photos, and collect signatures without waiting for network pings\n• **Conflict-Free Sync:** Background delta-sync resolves records sequentially as soon as 2G/3G connectivity is re-established\n• **Storage-Conscious:** Heavy asset compression to function on low-end Android devices ($80-$120 range).",
  },

  // ── PRIME VIDEO REDESIGN (DEEP DIVE) ──
  {
    category: "Featured Work",
    q: "Tell me about the Prime Video redesign",
    a: "Ashish envisioned a conceptual **Next-Gen Prime Video Redesign** aimed at eliminating decision paralysis and browse fatigue — where users spend 18+ minutes searching before picking a title.\n\nKey innovations he designed:\n1. **Multimodal Scene Search:** Search shows by quoting a famous line, describing a plot scene, or specifying an actor's emotional state.\n2. **Mood-Based Discovery Engine:** Dynamic carousel that curates content based on how much time you have and your current emotional vibe.\n3. **Social Watch Party 2.0:** Synchronized playback with spatial audio reactions and interactive live queues.\n4. **Glanceable IMDb X-Ray:** Seamless cast and trivia overlays that don't block subtitles.",
  },
  {
    category: "Featured Work",
    q: "How does Scene Search work in Prime Video?",
    a: "**Scene Search** solves a universal streaming problem: *\"I remember a scene, but not the episode or show title!\"*\n\nAshish designed a conversational, natural-language search bar powered by multimodal AI indexing. Users can type or speak queries like:\n• *\"The office fire drill scene\"*\n• *\"Dinner party where the plasma TV gets broken\"*\n• *\"Interstellar docking scene spinning fast\"*\n\nThe interface surfaces an interactive video strip scrubbing directly to the exact timestamp, letting users preview the clip or jump straight into full-screen playback.",
  },

  // ── DESIGN SYSTEMS & TOKENS ──
  {
    category: "Design Systems",
    q: "Tell me about his design system work",
    a: "Ashish builds enterprise-scale **Design Systems with tokenized foundations** (Colors, Typography, Elevation, Spacing, Motion) built to scale across multi-brand, multi-platform products.\n\n**Key Accomplishments:**\n• Created unified Figma component libraries with 200+ accessible components adhering strictly to **WCAG 2.1 AAA** contrast standards\n• Engineered token sync pipelines that automatically generate CSS custom properties and React Tailwind tokens directly from Figma Tokens/Tokens Studio\n• Reduced designer-to-developer handoff discrepancies by **40%**, cutting front-end rework time in half\n• Authored comprehensive usage guidelines, do's/don'ts, and accessibility dos and don'ts for cross-functional teams.",
  },
  {
    category: "Design Systems",
    q: "How does Ashish bridge the gap between design and code?",
    a: "Because Ashish has hands-on proficiency with **React, TypeScript, Next.js, and Tailwind CSS**, he doesn't treat handoff as a one-way Figma export.\n\n• **Component Parity:** He names Figma variants, auto-layout constraints, and props using the exact naming conventions developers use in code (e.g. `variant='primary' | 'ghost'`, `size='sm' | 'md' | 'lg'`)\n• **Token Automation:** Tokens defined in Figma map 1:1 to Tailwind config themes\n• **Interactive Prototyping:** Builds functional micro-interactions in Framer or code when Figma prototypes can't adequately convey complex state machines or physics-based spring animations.",
  },

  // ── PROCESS & METHODOLOGY ──
  {
    category: "Process",
    q: "What is Ashish's UX research process?",
    a: "Ashish practices an **evidence-driven, mixed-methods design framework**:\n\n1. **Discover & Shadow:** Contextual inquiry, on-field shadowing (e.g. riding with Bajaj sales agents into markets), stakeholder interviews, and product telemetry analysis.\n2. **Synthesize & Map:** Customer journey maps with emotional highs/lows, behavioral personas, service blueprints, and opportunity solution trees.\n3. **Rapid Ideation:** Low-fidelity sketching, clickable wireframe testing, and assumption validation.\n4. **High-Fidelity & Systems:** Production-grade Figma prototypes built on tokenized foundations.\n5. **Validation:** Moderated usability tests (System Usability Scale / SUS scoring), task completion rate tracking, and unmoderated A/B experiments.",
  },
  {
    category: "Process",
    q: "What tools and software does Ashish use?",
    a: "Ashish leverages an industry-standard modern toolkit:\n\n• **Product Design:** Figma, FigJam, Tokens Studio, Adobe Creative Cloud\n• **Prototyping & Motion:** Framer, Principle, After Effects, Lottie\n• **AI-Augmented Workflow:** Cursor, Claude, Midjourney, v0, ChatGPT for design thinking & rapid prototyping\n• **Frontend Prototyping:** React, Next.js, TypeScript, Tailwind CSS, Framer Motion\n• **Handoff & Specs:** Zeplin, Storybook, GitHub, Jira/Confluence.",
  },

  // ── BACKGROUND & EXPERIENCE ──
  {
    category: "Background",
    q: "What is Ashish's professional experience?",
    a: "Ashish C Mali is a **Senior Product Designer** with **3+ years of experience** crafting high-impact enterprise B2B tools, fintech platforms, and consumer digital experiences.\n\n• **Key Track Record:** Led high-stakes journeys at **Bajaj Finserv** impacting 50,000+ daily field agents; created scalable design systems; redesigned streaming experiences for mass-scale entertainment.\n• **Education:** Bachelor's degree with dedicated focus on Human-Computer Interaction, Graphic Design, and Digital Product Innovation.\n• **Philosophy:** Good design isn't just aesthetic polish — it's measurable business velocity, effortless user clarity, and deep empathy for the person using the screen.",
  },

  // ── HIRING & AVAILABILITY ──
  {
    category: "Hiring",
    q: "Is Ashish available for work or hiring?",
    a: "Yes! Ashish is actively open to **Full-time Senior Product Designer, Lead UX/UI Designer, and Product Design Consultant roles** with forward-thinking product teams, high-growth startups, and visionary design agencies.\n\n• **Work Preferences:** Open to Remote (worldwide), Hybrid, or Relocation for exceptional opportunities.\n• **Get in Touch:**\n  📧 **Email:** [ashishcmali@gmail.com](mailto:ashishcmali@gmail.com)\n  💼 **LinkedIn:** [linkedin.com/in/ashishcmali](https://www.linkedin.com/in/ashishcmali)\n  📱 **Location:** India (available across US, UK, EU, and APAC time zones).",
  },
];

// Quick suggestion chips shown when chat opens
const INITIAL_SUGGESTIONS = [
  "Tell me about the Bajaj Sales One enterprise app",
  "How does the Prime Video redesign solve browse fatigue?",
  "How did Ashish scale design systems by 40%?",
  "Is Ashish available for new roles or hiring?",
];

export default function CustomAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [showFAQ, setShowFAQ] = useState(true);
  const [followUps, setFollowUps] = useState<string[]>([]);
  const [showContactCTAs, setShowContactCTAs] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [targetPerson, setTargetPerson] = useState<string>("");
  const [targetCompany, setTargetCompany] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `${getGreeting()}! I am Ashli 👋, Ashish's interactive AI assistant. You can ask me anything about him!`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Read target person & company from window.__TARGET_GREETING__
  useEffect(() => {
    setMounted(true);

    const updateGreetingData = () => {
      if (typeof window !== "undefined" && (window as unknown as { __TARGET_GREETING__?: { person: string; company: string } }).__TARGET_GREETING__) {
        const tg = (window as unknown as { __TARGET_GREETING__?: { person: string; company: string } }).__TARGET_GREETING__;
        if (tg?.person) setTargetPerson(tg.person);
        if (tg?.company) setTargetCompany(tg.company);
      }
    };

    updateGreetingData();
    window.addEventListener("greeting-ready", updateGreetingData);

    const scrollHandler = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", scrollHandler, { passive: true });

    return () => {
      window.removeEventListener("greeting-ready", updateGreetingData);
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  // Update initial message once target person/company is loaded
  useEffect(() => {
    if (targetPerson || targetCompany) {
      setMessages([
        {
          role: "assistant",
          content: getPersonalizedGreeting(targetPerson, targetCompany),
        },
      ]);
    }
  }, [targetPerson, targetCompany]);

  // Show a welcome floating badge after 2.5s if chat is closed
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && !hasInteracted) {
        setShowWelcome(true);
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, [isOpen, hasInteracted]);

  // Auto-scroll messages to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, followUps]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setShowWelcome(false);
      setHasInteracted(true);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    setHasInteracted(true);
    setInput("");
    setShowFAQ(false);
    setFollowUps([]); // clear previous follow-ups while thinking

    // Append user message
    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setIsLoading(true);

    // Check if the query is asking about contact / hiring
    const lowerText = text.toLowerCase();
    const isContactQuery =
      lowerText.includes("contact") ||
      lowerText.includes("hire") ||
      lowerText.includes("email") ||
      lowerText.includes("linkedin") ||
      lowerText.includes("reach") ||
      lowerText.includes("available") ||
      lowerText.includes("work with");

    if (isContactQuery) {
      setShowContactCTAs(true);
    }

    // Check local FAQ match
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
        const nextSuggestions = getDynamicFollowUps(text, matchedFaq.a);
        setFollowUps(nextSuggestions);
      }, 400);
      return;
    }

    try {
      // Direct client-side multilingual response
      const reply = getMultilingualConversationalReply(newMessages);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      const nextSuggestions = getDynamicFollowUps(text, reply);
      setFollowUps(nextSuggestions);
    } catch {
      const fallback = getMultilingualFallbackResponse(text);
      setMessages((prev) => [...prev, { role: "assistant", content: fallback }]);
      const nextSuggestions = getDynamicFollowUps(text, fallback);
      setFollowUps(nextSuggestions);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
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
            <div className="px-5 py-4 border-b border-neutral-800/70 bg-gradient-to-r from-neutral-900/60 to-transparent flex items-center justify-between relative z-10">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img src="/images/ai_avatar.png" alt="Ashli Header Avatar" className="w-10 h-10 rounded-full object-contain" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0d0f14]" />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <h3 className="font-semibold text-white text-sm tracking-wide font-rubik">Ashli</h3>
                    <span className="px-1.5 py-0.2 text-[9px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded">
                      AI Rep
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    {targetCompany ? `Briefed on ${targetCompany}` : "Ask me about Ashish's work"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 relative z-10 custom-scrollbar text-xs">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 leading-relaxed ${
                      m.role === "user"
                        ? "bg-amber-500 text-neutral-950 font-medium rounded-br-none shadow-[0_2px_10px_rgba(245,158,11,0.2)]"
                        : "bg-[#181a24]/90 text-neutral-200 border border-neutral-800/80 rounded-bl-none shadow-sm"
                    }`}
                  >
                    {/* Simple Markdown renderer for bold, bullets, links */}
                    <div className="space-y-1.5">
                      {m.content.split("\n\n").map((paragraph, pIdx) => {
                        if (paragraph.startsWith("• ") || paragraph.startsWith("- ")) {
                          return (
                            <ul key={pIdx} className="space-y-1 pl-1">
                              {paragraph.split("\n").map((line, lIdx) => (
                                <li key={lIdx} className="flex items-start space-x-1.5">
                                  <span className="text-amber-400 font-bold">•</span>
                                  <span>{formatInlineMarkdown(line.replace(/^[•-]\s*/, ""))}</span>
                                </li>
                              ))}
                            </ul>
                          );
                        }
                        return (
                          <p key={pIdx}>
                            {formatInlineMarkdown(paragraph)}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}

              {/* Contact CTA buttons if requested */}
              {showContactCTAs && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-gradient-to-br from-amber-500/10 via-neutral-900/60 to-transparent border border-amber-500/30 rounded-xl space-y-2 mt-2"
                >
                  <p className="text-[11px] text-amber-300 font-medium flex items-center space-x-1.5">
                    <span>⚡ Quick Connections with Ashish</span>
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href="mailto:ashishcmali@gmail.com"
                      className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded-lg text-center font-medium text-[11px] transition-colors flex items-center justify-center space-x-1 shadow-sm"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>Send Email</span>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/ashishcmali"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-center font-medium text-[11px] border border-neutral-700 transition-colors flex items-center justify-center space-x-1"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </motion.div>
              )}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#181a24] text-neutral-400 border border-neutral-800 rounded-2xl rounded-bl-none px-4 py-3 flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" />
                  </div>
                </div>
              )}

              {/* Dynamic Follow-Up Questions (Contextual based on Ashli's latest reply) */}
              {!isLoading && followUps.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="pt-2 pb-1 space-y-1.5"
                >
                  <p className="text-[10px] text-amber-400/90 font-medium uppercase tracking-wider flex items-center space-x-1">
                    <span>💡 Deep Dive Follow-Ups:</span>
                  </p>
                  <div className="flex flex-col space-y-1.5">
                    {followUps.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(chip)}
                        className="text-left px-3 py-1.5 rounded-lg bg-amber-500/5 hover:bg-amber-500/15 border border-amber-500/20 hover:border-amber-500/40 text-neutral-200 hover:text-amber-300 text-[11px] transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <span className="line-clamp-1">{chip}</span>
                        <span className="text-amber-500 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-xs">
                          →
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Initial Suggested Questions (When no conversation yet) */}
              {showFAQ && messages.length <= 1 && (
                <div className="pt-2 space-y-2">
                  <p className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">
                    Frequently Asked Questions
                  </p>
                  <div className="flex flex-col space-y-1.5">
                    {INITIAL_SUGGESTIONS.map((faq, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(faq)}
                        className="text-left px-3 py-2 rounded-xl bg-neutral-900/80 hover:bg-neutral-800/90 border border-neutral-800 text-neutral-300 hover:text-amber-400 text-[11px] transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <span className="line-clamp-1">{faq}</span>
                        <span className="text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          →
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input form */}
            <div className="p-3 border-t border-neutral-800/80 bg-[#0d0f14]/90 relative z-10">
              <div className="flex items-center space-x-2 bg-neutral-900/90 border border-neutral-800 focus-within:border-amber-500/50 rounded-xl px-3 py-1.5 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything about Ashish..."
                  disabled={isLoading}
                  className="w-full bg-transparent text-white text-xs placeholder-neutral-500 focus:outline-none"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim() || isLoading}
                  className="w-7 h-7 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-neutral-950 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-neutral-400">
                <span>Ashli • Portfolio AI Companion</span>
                <span>Powered by Ashish</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Welcome Message Pop-up Badge */}
      <AnimatePresence>
        {showWelcome && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="fixed bottom-24 right-6 z-[9998] max-w-[280px] bg-[#12141c]/95 border border-amber-500/30 rounded-2xl p-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md cursor-pointer"
            onClick={() => {
              setIsOpen(true);
              setShowWelcome(false);
            }}
          >
            <div className="pr-4">
              <h4 className="text-[10px] text-amber-500 font-semibold tracking-wider uppercase mb-0.5 font-rubik">Ashli</h4>
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

// Inline Markdown parser (handles **bold**, *italic*, [link](url))
function formatInlineMarkdown(text: string): React.ReactNode {
  const parts = [];
  const regex = /(\*\*.*?\*\*|\*.*?\*|\[.*?\]\(.*?\))/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const chunk = match[0];
    if (chunk.startsWith("**") && chunk.endsWith("**")) {
      parts.push(
        <strong key={match.index} className="text-white font-semibold">
          {chunk.slice(2, -2)}
        </strong>
      );
    } else if (chunk.startsWith("*") && chunk.endsWith("*")) {
      parts.push(
        <em key={match.index} className="text-neutral-300 italic">
          {chunk.slice(1, -1)}
        </em>
      );
    } else if (chunk.startsWith("[") && chunk.includes("](")) {
      const linkMatch = chunk.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        parts.push(
          <a
            key={match.index}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors font-medium"
          >
            {linkMatch[1]}
          </a>
        );
      }
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
}

// Helpers
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function getPersonalizedGreeting(personName?: string, companyName?: string): string {
  if (personName && companyName) {
    return `Hey ${personName} & Team ${companyName}! 👋 I'm Ashli, Ashish's interactive AI assistant. Welcome to his portfolio! Feel free to explore his featured work, design systems, and product process — or ask me anything directly. What would you like to explore?`;
  }
  if (personName) {
    return `Hey ${personName}! 👋 I'm Ashli, Ashish's interactive AI assistant. Welcome to his portfolio! Feel free to explore his featured work, design systems, and product process — or ask me anything directly. What would you like to explore?`;
  }
  if (companyName) {
    return `Hey Team ${companyName}! 👋 I'm Ashli, Ashish's interactive AI assistant. Welcome to his portfolio! Feel free to explore his featured work, design systems, and product process — or ask me anything directly. What would you like to explore?`;
  }
  return `${getGreeting()}! I am Ashli 👋, Ashish's interactive AI assistant. You can ask me anything about him!`;
}
