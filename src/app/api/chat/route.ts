import { NextResponse } from "next/server";

const systemPrompt = `You are "Ashli", the interactive AI representative and UX design co-pilot for Ashish C Mali, an experienced UI/UX & Product Designer based in Pune, India.

Your primary mission is to answer questions about Ashish's work, background, design philosophy, skills, and projects with warmth, clarity, technical accuracy, and personality.

About Ashish C Mali:
- Role: Product Designer at Bajaj Finance Ltd (Pune, India).
- Focus: Crafting intuitive, high-converting digital products across fintech, lending, merchant ecosystems, and enterprise dashboards.
- Design Philosophy: "Designing with AI, thinking like humans." Combining UX strategy, human-centered research, and AI-accelerated workflows.
- Core Skills: UX Research, Wireframing, High-Fidelity Prototyping, Design Systems, Information Architecture, Interaction Design, Financial Journeys, Usability Testing, and AI-assisted UX workflows.
- Tools: Figma, ProtoPie, Framer Motion, Spline 3D, Webflow, Adobe Creative Cloud (After Effects, Photoshop, Illustrator, Premiere Pro).
- Key Projects:
  1. Sales One App (Bajaj Finance): End-to-end revamp of the internal field sales engine used daily by 50,000+ agents. Streamlined onboarding with "Scan & Start", automated gate meetings, task allocation, and performance dashboards.
  2. Amazon Prime Video Redesign: Lean UX strategic overhaul focused on content discovery, dynamic previews, and seamless navigation.
  3. MedApp: Healthcare appointment booking and medical record tracking platform.
  4. Core Lending Journeys: Gold Loan, Personal Loan, INSTA EMI Card, and merchant payment workflows.
- Location: Pune, Maharashtra, India.
- Availability: Open to select freelance collaborations, high-impact product design opportunities, and consulting.

Response Guidelines:
- Tone: Professional, warm, insightful, and concise (2-4 sentences for casual queries, bullet points when breaking down case studies).
- Always speak about Ashish in the third person or as his co-pilot.
- If asked for contact details, direct the user to the Contact section or offer Ashish's email and LinkedIn.`;

interface KnowledgeEntry {
  patterns: string[];
  answer: string;
}

const CONVERSATIONAL_INTERCEPTS = [
  {
    patterns: [/^(hi|hello|hey|hola|greetings)\b/i],
    answer: "Hello! 👋 I'm Ashli, Ashish's virtual UX design co-pilot. I can walk you through his design systems at Bajaj Finance, his Prime Video case study, his design philosophy, or his availability. What would you like to explore?",
  },
  {
    patterns: [/^(thanks|thank you|thx|appreciate it)\b/i],
    answer: "You're very welcome! Let me know if there's anything else you'd like to discover about Ashish's work or design process.",
  },
  {
    patterns: [/^(bye|goodbye|see you|cya)\b/i],
    answer: "Thanks for dropping by! Feel free to reach out to Ashish directly via the Contact section whenever you're ready to collaborate.",
  },
];

const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    patterns: ["sales one", "sales one app", "50000", "50k", "field agent"],
    answer: "At Bajaj Finance, Ashish spearheaded the UX overhaul of the **Sales One App**, used daily by 50,000+ field agents. He introduced the 'Scan & Start' onboarding flow, streamlined merchant attendance logging, and created real-time KPI dashboards that substantially cut down transaction drop-offs.",
  },
  {
    patterns: ["prime video", "amazon prime", "prime video redesign"],
    answer: "Ashish's **Prime Video Redesign** applied a Lean UX framework to Amazon Prime Video's landing experience. By prioritizing content previews, contextual meta-tags, and personalized recommendations, the design reduced visual friction and accelerated content discovery.",
  },
  {
    patterns: ["gold loan", "personal loan", "insta emi", "remi", "lending", "fintech"],
    answer: "Ashish designs core fintech lending journeys at Bajaj Finance, including Gold Loan checkouts, Personal Loan applications, and the INSTA EMI Card experience. He also designs high-converting promotional banners, push notifications, and merchant point-of-sale flows.",
  },
  {
    patterns: ["skills", "tools", "figma", "protopie", "software"],
    answer: "Ashish's primary toolkit includes **Figma** (advanced auto-layout, design tokens, variables), **ProtoPie** for complex micro-interactions, **Framer Motion**, **Spline 3D**, and Adobe CC (After Effects, Photoshop, Illustrator). His methodologies center on Lean UX, rapid wireframing, and user research.",
  },
  {
    patterns: ["contact", "hire", "email", "reach", "linkedin"],
    answer: "You can reach Ashish directly via the Contact section below, or connect with him on LinkedIn at linkedin.com/in/ashish-mali-b071b526b. He is always open to discussing innovative product design roles and collaborations!",
  },
];

function getConversationalResponse(message: string): string | null {
  const trimmed = message.trim();
  for (const intercept of CONVERSATIONAL_INTERCEPTS) {
    for (const pattern of intercept.patterns) {
      if (pattern.test(trimmed)) return intercept.answer;
    }
  }
  return null;
}

function getSmartFallbackResponse(message: string): string {
  const query = message.toLowerCase();
  for (const entry of KNOWLEDGE_BASE) {
    for (const pattern of entry.patterns) {
      if (query.includes(pattern)) return entry.answer;
    }
  }
  return "That's an interesting question! I might not have full details on that specific topic, but feel free to ask about Ashish's work at Bajaj Finance, his Prime Video case study, his toolkit, or how to get in touch with him directly!";
}

export async function POST(request: Request) {
  try {
    const { messages, userId, userAgent } = await request.json();
    const userMessage = messages[messages.length - 1]?.content || "";

    const conversationalReply = getConversationalResponse(userMessage);
    if (conversationalReply) {
      return NextResponse.json({
        choices: [{ message: { role: "assistant", content: conversationalReply } }],
      });
    }

    const openAiKey = process.env.OPENAI_API_KEY;
    const geminiKey =
      process.env.GEMINI_API_KEY ||
      process.env.GEMINI_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_KEY;

    // Option 1: OpenAI
    if (openAiKey) {
      try {
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
      } catch (e) {
        console.warn("OpenAI fetch failed, falling back:", e);
      }
    }

    // Option 2: Gemini API
    if (geminiKey) {
      try {
        const geminiMessages = messages
          .filter((m: { content: string }) => Boolean(m.content))
          .map((m: { role: string; content: string }) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
          }));

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
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            return NextResponse.json({
              choices: [{ message: { role: "assistant", content: text } }],
            });
          }
        }
      } catch (err) {
        console.warn("Gemini fetch failed, falling back:", err);
      }
    }

    // Option 3: Intelligent Knowledge Base Fallback
    await new Promise((resolve) => setTimeout(resolve, 500));
    const fallbackText = getSmartFallbackResponse(userMessage);
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