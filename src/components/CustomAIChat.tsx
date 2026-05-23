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
      content: "Hello! I'm Ashli. You can Ask me about Ashish anything.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const msgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

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
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
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
        content: "Reset complete! I'm Ashli. You can Ask me about Ashish anything.",
      },
    ]);
    setShowFAQ(true);
    setFollowUps([]);
  };

  const ResetIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12a9 9 0 109-9M3 12V6m0 6H9"
      />
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
          className="w-9 h-9 rounded-full object-contain border border-amber-500/40"
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
                    className="w-10 h-10 rounded-full border border-amber-500/40 p-0.5 bg-[#090b0e] object-contain"
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
                  title="New conversation"
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
                      className="w-8 h-8 rounded-full border border-amber-500/20 p-0.5 bg-[#090b0e] object-contain shrink-0"
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
                    className="w-8 h-8 rounded-full border border-amber-500/20 p-0.5 bg-[#090b0e] object-contain shrink-0"
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
    </>
  );
}
