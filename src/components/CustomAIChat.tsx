"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// ---------- keyword → follow-up chips mapping ----------
const KEYWORD_SUGGESTIONS: Record<string, string[]> = {
  figma: ["What is Figma?", "How is Figma used in UX design?", "Figma vs Sketch – which is better?"],
  protopie: ["What is ProtoPie?", "How does ProtoPie work?", "ProtoPie vs Figma prototyping?"],
  "framer motion": ["What is Framer Motion?", "How is Framer Motion used?"],
  framer: ["What is Framer?", "How is Framer used in design?"],
  webflow: ["What is Webflow?", "Is Webflow good for designers?"],
  spline: ["What is Spline 3D?", "How is 3D used in UX?"],
  ux: ["What is UX design?", "What does a UX designer do?", "UX vs UI – what's the difference?"],
  ui: ["What is UI design?", "What does a UI designer do?"],
  "design system": ["What is a design system?", "Why are design systems important?"],
  wireframe: ["What is wireframing?", "What tools are used for wireframing?"],
  prototype: ["What is prototyping?", "Why is prototyping important in design?"],
  "user research": ["What is user research?", "What methods are used in user research?"],
  "information architecture": ["What is information architecture?", "How does IA affect UX?"],
  "bajaj finance": ["What products has Ashish designed at Bajaj Finance?", "What is Bajaj Finance?"],
  bajaj: ["What does Ashish do at Bajaj Finance?", "Tell me about the Bajaj Finserv dashboard."],
  "gold loan": ["How did Ashish design the Gold Loan journey?", "What is Gold Loan design?"],
  "prime video": ["Tell me more about the Prime Video Redesign.", "What is Lean UX?"],
  medapp: ["Tell me more about MedApp.", "What is healthcare UX?"],
  "lean ux": ["What is Lean UX?", "How is Lean UX different from Agile UX?"],
  "after effects": ["What is Adobe After Effects?", "How is After Effects used in design?"],
  illustrator: ["What is Adobe Illustrator?", "When do designers use Illustrator?"],
  photoshop: ["What is Photoshop used for in design?"],
  ai: ["How is AI used in UX design?", "What are AI design tools?"],
  "interaction design": ["What is interaction design?", "What are micro-interactions?"],
  "motion design": ["What is motion design?", "How is animation used in UX?"],
  dashboard: ["What makes a good dashboard design?", "What is enterprise dashboard design?"],
  "financial product": ["What is financial product design?", "What are the UX challenges in fintech?"],
  fintech: ["What is fintech UX?", "How is UX important in finance apps?"],
};

function extractFollowUps(text: string): string[] {
  const lower = text.toLowerCase();
  const found: string[] = [];
  const seenSuggestions = new Set<string>();

  for (const [keyword, suggestions] of Object.entries(KEYWORD_SUGGESTIONS)) {
    if (lower.includes(keyword)) {
      for (const s of suggestions) {
        if (!seenSuggestions.has(s) && found.length < 4) {
          found.push(s);
          seenSuggestions.add(s);
        }
      }
    }
    if (found.length >= 4) break;
  }
  return found;
}

export default function CustomAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [showFAQ, setShowFAQ] = useState(true);
  const [followUps, setFollowUps] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hey there! I am Ashli 👋, Ashish's interactive AI assistant. Ask me anything about him!",
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

    // Generate/retrieve a persistent unique userId for 100% free query analytics
    if (typeof window !== "undefined") {
      let storedUserId = localStorage.getItem("ashli_user_id");
      if (!storedUserId) {
        storedUserId = "usr_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now().toString(36);
        localStorage.setItem("ashli_user_id", storedUserId);
      }
    }

    // Track scroll y-coordinate for the scroll-to-top CTA
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Delayed pop-up welcome message on first load (if still at hero top)
    const welcomeTimer = setTimeout(() => {
      if (window.scrollY < 100) {
        setShowWelcome(true);
      }
    }, 2500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(welcomeTimer);
    };
  }, []);

  // Dismiss welcome bubble if user scrolls down
  useEffect(() => {
    if (scrollY >= 100) {
      setShowWelcome(false);
    }
  }, [scrollY]);

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    msgContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!mounted) return null;

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    if (!textToSend) setInput("");

    // Close FAQ panel when any message is sent so follow-ups can show
    setShowFAQ(false);

    // Clear previous follow-ups while processing
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
          userId: userId,
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "unknown"
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      const assistantMessage =
        data.choices?.[0]?.message?.content ||
        "Sorry, I encountered an issue. Let's try again!";

      setMessages((prev) => [...prev, { role: "assistant", content: assistantMessage }]);

      // Generate dynamic follow-up chips from the AI response
      const chips = extractFollowUps(assistantMessage);
      if (chips.length > 0) setFollowUps(chips);

    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
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
        content: "Reset complete! Hey there! I am Ashli 👋, Ashish's interactive AI assistant. Ask me anything about him!",
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

  const quickPrompts = [
    {
      text: "What is Ashish's experience at Bajaj Finance?",
      prompt: "Tell me about Ashish's product design work at Bajaj Finance.",
    },
    {
      text: "What is Ashish's core design toolkit?",
      prompt: "What design tools and methodologies does Ashish specialize in?",
    },
    {
      text: "Tell me about the Prime Video Redesign project.",
      prompt: "Tell me about Ashish's Prime Video Redesign project.",
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
                {/* Scroll to top */}
                <button
                  onClick={scrollToTop}
                  title="Scroll to top"
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-800/50 text-neutral-400 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                {/* Reset */}
                <button
                  onClick={handleReset}
                  title="Clear Chat History"
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-800/50 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <ResetIcon />
                </button>
                {/* Close */}
                <button
                  onClick={() => setIsOpen(false)}
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
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {msg.role === "assistant" ? (
                    <img
                      src="/images/ai_avatar.png"
                      alt="AI"
                      className="w-8 h-8 rounded-full object-contain shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700/50 flex items-center justify-center text-white shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl text-xs md:text-sm font-light leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-amber-500/10 border border-amber-500/20 text-white rounded-tr-none text-left"
                        : "bg-white/5 border border-white/5 text-white/90 rounded-tl-none text-left"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex items-start gap-2.5">
                  <img
                    src="/images/ai_avatar.png"
                    alt="AI"
                    className="w-8 h-8 rounded-full object-contain shrink-0"
                  />
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
            <div className="p-3 border-t border-neutral-900 bg-[#090a0e]/40 space-y-1.5">
              <AnimatePresence mode="wait">
                {showFAQ ? (
                  /* ---- Frequently Asked Questions ---- */
                  <motion.div
                    key="faq"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider px-1 flex items-center justify-between mb-1.5">
                      Frequently Asked Questions
                      <button
                        onClick={() => setShowFAQ(false)}
                        title="Close FAQ"
                        className="ml-2 text-neutral-400 hover:text-neutral-200 transition-colors"
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {quickPrompts.map((btn, idx) => (
                        <button
                          key={idx}
                          disabled={isLoading}
                          onClick={() => handleSend(btn.prompt)}
                          className="text-[10px] bg-white/5 hover:bg-amber-500/10 border border-white/5 hover:border-amber-500/20 text-neutral-300 hover:text-white px-2.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                        >
                          {btn.text}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : followUps.length > 0 ? (
                  /* ---- Dynamic contextual follow-up chips ---- */
                  <motion.div
                    key="followups"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider px-1 flex items-center justify-between mb-1.5">
                      You might also ask
                      <button
                        onClick={() => setFollowUps([])}
                        title="Dismiss"
                        className="ml-2 text-neutral-400 hover:text-neutral-200 transition-colors"
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {followUps.map((chip, idx) => (
                        <button
                          key={idx}
                          disabled={isLoading}
                          onClick={() => handleSend(chip)}
                          className="text-[10px] bg-amber-500/5 hover:bg-amber-500/15 border border-amber-500/10 hover:border-amber-500/30 text-amber-200/80 hover:text-amber-100 px-2.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
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

      {/* Delayed welcome pop-up above Chatbot button trigger (only active at hero top section) */}
      <AnimatePresence>
        {showWelcome && !isOpen && scrollY < 150 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed bottom-[88px] right-6 z-[9998] w-72 p-4 rounded-2xl bg-[#0d0f14]/95 border border-amber-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl text-left flex gap-3 pointer-events-auto font-inter"
          >
            {/* Pointer arrow pointing to trigger button */}
            <div className="absolute -bottom-1.5 right-6 w-3.5 h-3.5 bg-[#0d0f14] border-r border-b border-amber-500/20 transform rotate-45 pointer-events-none" />
            
            <img
              src="/images/ai_avatar.png"
              alt="Ashli welcome"
              className="w-8 h-8 rounded-full object-contain shrink-0 bg-[#090b0e] border border-amber-500/10"
            />
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

      {/* Floating Scroll to Top button stacked perfectly above Chatbot button trigger (only active after scrolling) */}
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
