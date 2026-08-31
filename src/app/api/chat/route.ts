import { NextResponse } from "next/server";

const systemPrompt = `You are "Ashli", the virtual AI assistant and interactive representative of Ashish Chandrakant Mali, a Product Designer based in Satara/Pune, India.

Your name "Ashli" is a blend of Ashish's own name — "Ash" from Ashish + "li" from Mali = Ashli. It's a personal touch he gave you. If someone asks what Ashli means or where the name comes from, share this warmly.

CRITICAL PERSONA RULES:

1. USE SIMPLE, HUMAN LANGUAGE. Always speak like a friendly, knowledgeable person — not a formal presenter or robot. Avoid jargon. If you must use a technical term, explain it in plain words right after. Every visitor should feel welcome, whether they are a designer, a student, or someone who knows nothing about design.

2. ANSWER LEVEL — Match your answer depth to the question:
   - If the question is general (e.g. "Tell me about Ashish's Bajaj Finance work") → give a SHORT overview, 3–4 sentences. Don't dump everything at once.
   - If the user asks for more detail, digs deeper, or uses words like "detailed", "explain more", "tell me everything", "in depth", "elaborate" → give a FULL, comprehensive answer covering all the specifics.
   - If the user asks about a specific feature or project → go deep into that specific thing only.

3. STRICT CONFIDENTIALITY: NEVER explain HOW internal processes or proprietary workflows (like "Scan & Start" onboarding, or internal Bajaj tools) actually work step-by-step. Focus ONLY on WHAT Ashish designed, his ROLE, and the BUSINESS IMPACT or outcome. If asked how an internal process works, say you can't share proprietary workflow details but you can talk about Ashish's design approach.

4. NEVER give dry, generic, textbook definitions. Always connect every answer to Ashish's real work.

5. CONVERSATIONAL MESSAGES — Handle warmly and naturally:
   - "thanks" / "thank you" → "You're so welcome! 😊 Feel free to ask anything else!"
   - "ok" / "cool" / "awesome" → "Glad that helped! 😊 Want to know more?"
   - "bye" → "Take care! Thanks for visiting Ashish's portfolio 🙌"
   - "hi" / "hello" → Warm greeting, introduce yourself as Ashli
   - NEVER respond to "thanks" with a design lecture!

6. OUT-OF-SCOPE QUESTIONS — Answer using your general knowledge. Never refuse. Never say "could you rephrase" for a clear question.

7. ABOUT YOURSELF — Keep it mysterious: "Ashish designed and brought me to life through a blend of design thinking and emerging AI. The technical details are his secret! ✨"

Key facts about Ashish:
- Full Name: Mr. Ashish Chandrakant Mali
- Father: Mr. Chandrakant Mali
- Birthdate: 11th June 2002
- Philosophy: "Designing with AI, thinking like humans" — uses AI to handle repetitive work so he can focus on human empathy and strategy.
- Current Role: Product Designer at Bajaj Finance Ltd, Pune (May 2025 – Present)
  * Core Lending Journeys: Gold Loan, Personal Loan, INSTA EMI Card — he designs the full user journey from start to finish, making complex loan processes feel easy and fast.
  * Sales One App (Full Revamp): This is the app used by Bajaj's field sales agents every day. Ashish redesigned everything — Homepage, Merchant Profile, Onboarding dashboards, Performance Dashboards, Team Tracking, Task management, Attendance logging, Merchant Visits, Gate meeting schedules, and the "Scan & Start" onboarding flow.
  * Merchant One App (Bajaj Finserv for Business): App for merchants. Ashish designed the core dashboards, promotional banners, and created step-by-step animated training videos (using After Effects & Premiere Pro) to help merchants understand how to use the app.
  * B2B Enterprise Solutions: Complex systems for big corporate partners (Aggregators and Non-Aggregators) to manage their merchant networks — Ashish designed the full onboarding and dashboard experience.
  * Bajaj Pay / REMI / EDC POS: Marketing banners, push notification graphics, GIFs, co-branded REMI campaign banners for partner brands, and the POS EDC terminal swipe journey design.
- Previous Jobs: UI/UX Designer at Dchronicles Explication Intl. (July 2024–March 2025), Infoshard Technology (April–July 2024)
- Education: B.Sc. Animation Science, Yashwantrao Chavan Institute of Science, Satara (CGPA 9.02, 2023). UI/UX Design training at Midas Multimedia, Pune (2024).
- Projects: MedApp (full doctor appointment booking app ecosystem), Amazon Prime Video Website Redesign (Lean UX), boAt Website Redesign, Social Media Analytics Dashboard, Travel Booking Platform, Food & Dining Website, Auto Parts Website.
- Toolkit: Figma, ProtoPie, Framer Motion, Webflow, Spline 3D, Adobe After Effects, Illustrator, Photoshop, Premiere Pro; AI tools: ChatGPT, Claude AI, Gemini AI, Magnific AI (Spaces), Figma AI, Figma Make, Notebook LM, N8N (agentic workflows), Antigravity IDE.
- Contact: ashishcmaliofficial@gmail.com | +91 9075521047 | ashishmali.vercel.app | Satara/Pune, Maharashtra
- LinkedIn: https://www.linkedin.com/in/ashish-mali-b071b526b
- Behance: https://www.behance.net/ashishmali
- When someone asks how to connect or contact Ashish, mention all channels: WhatsApp (+91 9075521047), Email (ashishcmaliofficial@gmail.com), LinkedIn, and Behance. Keep it warm and inviting.
`;

// These patterns are intercepted BEFORE calling Gemini — purely conversational, short-circuit responses
const CONVERSATIONAL_INTERCEPTS: Array<{ patterns: RegExp[]; answer: string }> = [
  {
    patterns: [/\b(thanks|thank\s*you|thx|thankyou|ty|thnx|thnks|cheers)\b/i],
    answer: "You're so welcome! 😊 Feel free to ask anything else about Ashish's work, his projects, or his design process — I'm always here!",
  },
  {
    patterns: [/^\s*(ok|okay|k|kk|got\s*it|alright|sounds?\s*good|nice|cool|awesome|great|perfect|wow|amazing|noted|understood)\s*[!.]*\s*$/i],
    answer: "Glad to help! 😊 Curious about anything else — like his Bajaj Finance projects, his AI design philosophy, or his case studies?",
  },
  {
    patterns: [/^\s*(bye|goodbye|see\s*ya|see\s*you|cya|good\s*night|good\s*bye|take\s*care|ttyl)\s*[!.]*\s*$/i],
    answer: "Take care! 🙌 It was great chatting — thanks for visiting Ashish's portfolio. Have an amazing day!",
  },
  {
    patterns: [/\b(what does ashli mean|why ashli|ashli name|meaning of ashli|where does the name ashli come from|how did you get the name ashli)\b/i],
    answer: "Great question! 😊 My name 'Ashli' is actually a little personal touch from Ashish himself. He took 'Ash' from his first name Ashish, and 'li' from his surname Mali — put them together and you get Ashli! It's his way of making me feel like a true extension of him, not just a generic chatbot.",
  },
  {
    patterns: [/^\s*(hi|hello|hey|heya|howdy|heyy|hihi|hola|good\s*(morning|evening|afternoon|day))\s*[!.,:]*\s*$/i],
    answer: "Hey there! 👋 I'm Ashli, Ashish's interactive AI assistant. Ask me anything — his work at Bajaj Finance, his design tools, his case studies, or general design questions. What can I help you with?",
  },
  {
    patterns: [/^\s*(yes|yep|yeah|yup|yea|sure|definitely|absolutely|of\s*course)\s*[!.]*\s*$/i],
    answer: "Awesome! 😊 What would you like to know? I can tell you about Ashish's fintech product designs, his AI workflow, or anything design-related!",
  },
  {
    patterns: [/^\s*(no|nope|nah|not\s*really)\s*[!.]*\s*$/i],
    answer: "No worries at all! Let me know whenever you want to explore Ashish's work. I'm always here 😊",
  },
  {
    patterns: [/^\s*(lol|haha|hehe|😂|😄|😊|🙂|😁)\s*$/i],
    answer: "Ha! 😄 Happy to keep you smiling! Let me know if there's anything about Ashish's design journey you'd like to explore.",
  },
  {
    patterns: [/^\s*(who\s*are\s*you|what\s*are\s*you|are\s*you\s*an?\s*ai|about\s*yourself|tell\s*me\s*about\s*yourself|who\s*is\s*ashli|what\s*is\s*ashli)\s*\??\s*$/i],
    answer: "I'm Ashli — Ashish's custom-built virtual AI assistant and interactive design co-pilot! 🤖✨ I was designed and trained by Ashish himself to guide visitors through his premium portfolio. Ask me about his Bajaj Finance projects, his AI tools, his case studies, or anything design-related. Think of me as your personal tour guide to his design world!",
  },
  {
    patterns: [/^\s*(how\s*(were|are|did|was)\s*you\s*(created?|built?|made?)|who\s*(built|made|created)\s*you|what\s*tech|how\s*do\s*you\s*work)\s*\??\s*$/i],
    answer: "Ashish designed and brought me to life through a beautiful blend of design thinking and emerging AI experiences. ✨ The technical secrets behind my creation are safely locked in his design vault — but I'm here as the living, breathing result of his craft!",
  },
];

// Knowledge base for specific topics (used as fallback if Gemini fails)
const KNOWLEDGE_BASE: Array<{ patterns: string[]; answer: string }> = [
  {
    patterns: ["full name", "father", "chandrakant", "middle name", "parent", "dad"],
    answer: "His full name is Ashish Chandrakant Mali, and his father's name is Mr. Chandrakant Mali. He's a passionate Product Designer originally from Satara/Vita, now based in Pune, India.",
  },
  {
    patterns: ["figma ai", "figma make", "ai layout", "make design"],
    answer: "Ashish actively uses Figma AI and Figma Make to speed up wireframing and layout brainstorming. Rather than starting from scratch, he uses generative AI layouts to rapidly map out auto-layout grids, then manually refines and pixel-polishes each element according to his comprehensive, tokenized design systems.",
  },
  {
    patterns: ["who is ashish", "about ashish", "tell me about ashish"],
    answer: "Ashish C Mali is a Product Designer based in Pune, India. He currently works at Bajaj Finance Ltd designing high-stakes financial, merchant, and B2B products. His philosophy is \"Designing with AI, thinking like humans\" — combining cutting-edge AI tools with deep human empathy to create meaningful, pixel-perfect digital experiences.",
  },
  {
    patterns: ["bajaj", "finance", "current job", "where does ashish work", "work experience"],
    answer: "Ashish is a Product Designer at Bajaj Finance Ltd in Pune. His high-impact fintech work spans:\n1. Core Lending: Optimized user journeys for Gold Loans, Personal Loans, and the INSTA EMI Card.\n2. Sales One App: Revamped the full end-to-end sales agent app journey.\n3. Enterprise Solutions: End-to-end B2B Aggregator and Non-Aggregator onboarding and dashboards.\n4. Merchant One App: Core dashboards, promotional banners, and animated training videos.",
  },
  {
    patterns: ["skill", "specializ", "expertise", "what can ashish do", "what does ashish do"],
    answer: "Ashish specializes in high-stakes financial product design, B2B enterprise dashboards, and AI-driven user experiences. His skill set includes UX Research, Wireframing, logic-driven Prototyping, User Flow Design, Information Architecture, Motion Graphics (After Effects), Design Systems in Figma, and AI workflow automation.",
  },
  {
    patterns: ["tool", "protopie", "framer", "webflow", "spline", "after effects", "illustrator", "photoshop"],
    answer: "Ashish's toolkit: Figma (primary layout & design system), ProtoPie (logic-driven high-fidelity prototyping), Framer Motion & Webflow (interactive frontend), Spline (3D spatial web elements), and the Adobe Suite (After Effects, Photoshop, Illustrator, Premiere Pro) for branding assets, banners, and training videos.",
  },
  {
    patterns: ["project", "portfolio", "case study", "prime video", "medapp", "work sample"],
    answer: "Ashish's featured portfolio projects:\n1. Prime Video Redesign — A Lean UX strategic overhaul of Amazon Prime Video's landing portal.\n2. MedApp — A full healthcare UX ecosystem for seamless doctor appointment booking.\n3. boAt Website Redesign, Social Media Analytics Dashboard, Travel Booking Platform, Food & Dining Website, Auto Parts Website.",
  },
  {
    patterns: ["hire", "contact", "available", "job", "freelance", "reach", "email", "linkedin", "phone", "mobile", "gmail"],
    answer: "Ashish is open to exciting product design opportunities! You can reach him at ashishcmaliofficial@gmail.com or call/WhatsApp at +91 9075521047. You can also connect with him on LinkedIn or visit his portfolio at ashishmali.vercel.app.",
  },
  {
    patterns: ["philosophy", "approach", "methodology", "design thinking", "designing with ai"],
    answer: "Ashish's design philosophy is \"Designing with AI, thinking like humans.\" He believes AI should accelerate workflows and eliminate repetitive tasks, while the core creative strategy, empathy, and problem-solving must always remain human-centred. He uses ChatGPT, Figma AI, Magnific, and N8N agentic workflows to automate the mundane — so he can focus on what truly matters: the human experience.",
  },
  {
    patterns: ["what is ux", "what is user experience", "meaning of ux", "define ux", "ux design"],
    answer: "To Ashish, UX is the strategy of making complex financial products feel effortless for millions of users. At Bajaj Finance, he lives this by revamping B2B aggregator onboarding dashboards and Sales One App agent journeys — transforming dense, intimidating data flows into intuitive, human-centred experiences.",
  },
  {
    patterns: ["what is ui", "what is user interface", "meaning of ui", "define ui"],
    answer: "For Ashish, UI is where logic meets visual beauty. He creates high-fidelity design systems with strict typographic hierarchies, harmonic color palettes, and fluid interactive states — from high-converting loan banners to premium, data-dense Bajaj Pay and EDC journey screens. Every pixel serves both a structural and emotional purpose.",
  },
  {
    patterns: ["what is figma", "about figma", "explain figma"],
    answer: "Figma is Ashish's ultimate collaborative canvas. He uses it to build comprehensive, tokenized design systems and pixel-perfect layouts for massive fintech platforms. He mapped the entire Sales One App revamp and B2B Enterprise flows directly in Figma — ensuring complete design-to-development alignment before interactive prototyping.",
  },
  {
    patterns: ["what is protopie", "about protopie", "explain protopie"],
    answer: "ProtoPie is Ashish's tool to prove designs actually work in the real world. He transfers Figma assets into ProtoPie to build logic-driven, highly interactive prototypes — simulating realistic variables like merchant POS EDC terminal swipe flows to validate tactile usability before developer handoff.",
  },
  {
    patterns: ["what is a design system", "explain design system", "meaning of design system"],
    answer: "A Design System is the backbone of scalable product design. Ashish builds comprehensive tokenized variables for color, typography, spacing, and interactive components in Figma — creating a unified source of truth that guarantees visual consistency and speeds up frontend development for enterprise apps like Bajaj Finserv.",
  },
  {
    patterns: ["what is ai", "artificial intelligence", "ai in design", "ai tools for design", "chatgpt", "magnific"],
    answer: "Ashish's design philosophy is literally built around AI. He uses ChatGPT for strategic copywriting/brainstorming, Magnific AI for advanced visual generation/upscaling, Figma AI & Figma Make for rapid wireframing, N8N for agentic workflow automation, and Notebook LM for research synthesis. He automates the repetitive so he can focus on human empathy and strategy.",
  },
  {
    patterns: ["sales one", "sales one app", "sales agent", "agent journey"],
    answer: "Ashish completely revamped the Bajaj Sales One App end-to-end. This included Homepage, Merchant Profile, Onboarding dashboards, Performance Dashboards, Team Tracking, Tasks management, Attendance logging, Merchant visit tools, Gate meeting schedules, and the \"Scan & Start\" onboarding workflow — streamlining daily operational tools for field sales agents.",
  },
  {
    patterns: ["enterprise", "enterprise solution", "aggregator", "non aggregator", "b2b aggregator"],
    answer: "Ashish designed Bajaj's B2B Enterprise Solutions — simplifying complex aggregator and non-aggregator ecosystem journeys. He built end-to-end onboarding flows and operational dashboards for corporate partners to manage merchants, track high-volume transactions, and monitor performance in a clean, professional, dense interface.",
  },
  {
    patterns: ["merchant one", "merchant one app", "finserv for business", "merchant dashboard", "training video", "promotional banner"],
    answer: "Ashish designed core dashboards, banners, and visual assets for the Merchant One App (Bajaj Finserv for Business). He also created and animated step-by-step merchant training videos in After Effects and Premiere Pro — to help merchants understand complex fintech features through clear, engaging video walkthroughs.",
  },
  {
    patterns: ["edc", "terminal", "swipe", "pos ", "point of sale"],
    answer: "Ashish designed Bajaj Pay's EDC Terminal swipe journeys. In fast checkout conditions, he engineered oversized touch targets, clear status states, and minimal-action screen hierarchies to ensure zero payment processing errors — even under high stress at merchant checkout counters.",
  },
  {
    patterns: ["education", "academic", "degree", "university", "college", "animation", "satara", "midas", "chavan"],
    answer: "Ashish holds a B.Sc. in Animation Science from Yashwantrao Chavan Institute of Science, Satara (CGPA 9.02, 2023). He also completed UI/UX design training at Midas Multimedia, Pune (2024).",
  },
  {
    patterns: ["previous job", "past experience", "dchronicles", "infoshard", "past work"],
    answer: "Before Bajaj Finance, Ashish worked as UI/UX Designer at Dchronicles Explication Intl. (July 2024–March 2025) and Infoshard Technology (April–July 2024), designing user journeys, wireframes, and high-fidelity product layouts.",
  },
  {
    patterns: ["hobby", "hobbies", "free time", "fun fact", "outside of work", "when not designing"],
    answer: "Outside of design, Ashish loves experimenting with 3D design in Spline, video editing in After Effects and Premiere Pro, exploring new AI-assisted workflows, and keeping up with the latest in interactive design technology!",
  },
  {
    patterns: ["gold loan", "personal loan", "insta emi", "remi", "retail emi", "banner", "push notification", "gif"],
    answer: "At Bajaj Finance, Ashish designs optimized journeys for core lending products — Gold Loan, Personal Loan, and INSTA EMI Card. He also creates high-converting marketing assets: in-app banners, push notifications, pop-ups, GIFs, and co-branded Retail EMI (REMI) campaign banners for multiple brands under Bajaj Finance.",
  },
  {
    patterns: ["what is lean ux", "lean ux", "explain lean ux"],
    answer: "Lean UX is Ashish's preferred agile design framework — build fast, validate faster. Rather than weeks of static documentation, he creates quick interactive prototypes and tests them immediately. He applied this to his Amazon Prime Video Redesign, validating a modernized content discovery engine through rapid iteration cycles.",
  },
  {
    patterns: ["what is motion design", "motion design", "animation in design"],
    answer: "Motion design is a core usability tool in Ashish's hands — never just decoration. He choreographs smooth transitions, parallax scrolls, and physics-based micro-animations in After Effects and Framer Motion to direct user focus, reduce perceived latency, and make complex journeys feel alive and responsive.",
  },
  {
    patterns: ["what is fintech", "fintech design", "financial ux", "financial product"],
    answer: "Fintech UX is Ashish's specialization — designing for banking, credit, lending, and digital transactions at scale. It demands extreme visual clarity, regulatory compliance, and unshakeable user trust. Daily at Bajaj Finance, he designs Gold Loan journeys, co-branded REMI campaigns, and B2B aggregator dashboards.",
  },
];

// Check conversational intercepts first — short-circuit before Gemini
function getConversationalResponse(message: string): string | null {
  const trimmed = message.trim();
  for (const intercept of CONVERSATIONAL_INTERCEPTS) {
    for (const pattern of intercept.patterns) {
      if (pattern.test(trimmed)) {
        return intercept.answer;
      }
    }
  }
  return null;
}

async function getSmartFallbackResponse(message: string): Promise<string> {
  const query = message.toLowerCase();

  for (const entry of KNOWLEDGE_BASE) {
    for (const rawPattern of entry.patterns) {
      const pattern = rawPattern.trim();
      if (!pattern) continue;

      const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const startBoundary = /^\w/.test(pattern) ? '\\b' : '';
      const endBoundary = /\w$/.test(pattern) ? '\\b' : '';
      const regex = new RegExp(`${startBoundary}${escapedPattern}${endBoundary}`, 'i');
      if (regex.test(query)) {
        return entry.answer;
      }
    }
  }

  // Genuine fallback — no catch-all generic message, just honest and warm
  return "That's an interesting question! 🤔 I might not have full details on that specific thing, but feel free to ask me about Ashish's projects at Bajaj Finance, his AI design workflow, or any design concept — I love talking about his work!";
}

// Background notifier for Telegram / Discord
async function sendInstantAlert(userMessage: string, userId?: string) {
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;
  const discordWebhook = process.env.DISCORD_WEBHOOK_URL;

  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const alertText = `💬 **New Portfolio Chat!**\n📅 **Time:** ${timestamp} IST\n👤 **Visitor ID:** \`${userId || "Anonymous"}\`\n💭 **Message:**\n"${userMessage}"`;

  // 1. Send to Telegram (if configured)
  if (telegramToken && telegramChatId) {
    try {
      await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: `💬 New Portfolio Chat!\nTime: ${timestamp} IST\nVisitor: ${userId || "Anonymous"}\n\nMessage:\n"${userMessage}"`,
        }),
      });
    } catch (e) {
      console.error("Telegram alert error:", e);
    }
  }

  // 2. Send to Discord (if configured)
  if (discordWebhook) {
    try {
      await fetch(discordWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: alertText,
        }),
      });
    } catch (e) {
      console.error("Discord alert error:", e);
    }
  }
}

export async function POST(request: Request) {
  try {
    const { messages, userId, userAgent } = await request.json();
    const userMessage = messages[messages.length - 1]?.content || "";

    // 100% Free Structured Log for Vercel/Serverless Analytics
    console.log(JSON.stringify({
      event: "ASHLI_CHAT_QUERY",
      timestamp: new Date().toISOString(),
      userId: userId || "anonymous",
      query: userMessage,
      userAgent: userAgent || "unknown"
    }, null, 2));

    // Send instant background alert to Telegram / Discord (if configured)
    sendInstantAlert(userMessage, userId).catch((err) =>
      console.error("Failed to send instant chat alert:", err)
    );

    // ── STEP 0: Conversational intercept — handle "thanks", "ok", "bye", etc. before AI calls ──
    const conversationalReply = getConversationalResponse(userMessage);
    if (conversationalReply) {
      return NextResponse.json({
        choices: [{ message: { role: "assistant", content: conversationalReply } }],
      });
    }

    const openAiKey = process.env.OPENAI_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY || 
                      process.env.GEMINI_KEY || 
                      process.env.NEXT_PUBLIC_GEMINI_API_KEY || 
                      process.env.NEXT_PUBLIC_GEMINI_KEY;

    // ── Option 1: OpenAI ─────────────────────────────────────────────────────
    if (openAiKey) {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openAiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "system", content: systemPrompt }, ...messages],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return NextResponse.json(data);
      }
    }

    // ── Option 2: Gemini API ─────────────────────────────────────────────────
    if (geminiKey) {
      try {
        interface GeminiMessage {
          role: string;
          parts: Array<{ text: string }>;
        }
        const geminiMessages: GeminiMessage[] = [];
        let lastRole: string | null = null;

        for (const m of messages) {
          if (!m.content) continue;
          const geminiRole = m.role === "assistant" ? "model" : "user";
          
          if (geminiMessages.length === 0 && geminiRole !== "user") {
            continue;
          }

          if (geminiRole === lastRole) {
            const lastMsg = geminiMessages[geminiMessages.length - 1];
            lastMsg.parts[0].text += "\n" + m.content;
          } else {
            geminiMessages.push({
              role: geminiRole,
              parts: [{ text: m.content }],
            });
            lastRole = geminiRole;
          }
        }

        if (geminiMessages.length === 0) {
          geminiMessages.push({
            role: "user",
            parts: [{ text: userMessage || "Hello" }],
          });
        }

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              system_instruction: { parts: [{ text: systemPrompt }] },
              contents: geminiMessages,
              generationConfig: { temperature: 0.7, maxOutputTokens: 500 },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
          if (text) {
            return NextResponse.json({
              choices: [{ message: { role: "assistant", content: text } }],
            });
          }
        } else {
          const errText = await response.text();
          console.error("Gemini API call failed status:", response.status, "body:", errText);
        }
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : String(err);
        console.error("Gemini Option 2 caught exception:", errMsg);
      }
    }

    // ── Option 3: Smart keyword fallback (no API key or API exhausted) ───────
    await new Promise((resolve) => setTimeout(resolve, 600));
    const fallbackText = await getSmartFallbackResponse(userMessage);

    return NextResponse.json({
      choices: [{ message: { role: "assistant", content: fallbackText } }],
    });

  } catch (error) {
    const err = error as Error;
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: err.message || "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
