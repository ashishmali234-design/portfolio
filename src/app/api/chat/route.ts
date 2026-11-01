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
- Contact: Phone/WhatsApp: +91 9075521047 | Email: ashishcmaliofficial@gmail.com | LinkedIn: linkedin.com/in/ashish-mali-b071b526b | Behance: behance.net/ashishmali | Location: Satara / Pune, Maharashtra, India.`;

interface KnowledgeEntry {
  patterns: string[];
  answer: string;
}

const CONVERSATIONAL_INTERCEPTS = [
  {
    patterns: [/^(hi|hello|hey|hola|greetings)\b/i],
    answer: "Hello! 👋 I'm Ashli, Ashish's virtual AI co-pilot. I can walk you through his work at Bajaj Finance, his Prime Video case study, his design philosophy, or his availability. What would you like to explore?",
  },
  {
    patterns: [/^(thanks|thank you|thx|appreciate it)\b/i],
    answer: "You're so welcome! 😊 Let me know if there's anything else you'd like to discover about Ashish's work or design process.",
  },
  {
    patterns: [/^(ok|okay|cool|awesome|great|got it)\b/i],
    answer: "Glad that helped! 😊 Want to know more about any of his projects?",
  },
  {
    patterns: [/^(bye|goodbye|see you|cya)\b/i],
    answer: "Take care! Thanks for stopping by Ashish's portfolio 🙌 Feel free to reach out anytime via the Contact section below.",
  },
];

const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    patterns: ["sales one", "sales one app", "field agent", "50000", "50k"],
    answer: "At Bajaj Finance, Ashish spearheaded the UX overhaul of the **Sales One App**, used daily by 50,000+ field sales agents. He redesigned core modules including Homepage, Merchant Profile, Performance Dashboards, and the 'Scan & Start' onboarding flow, reducing journey drop-offs significantly.",
  },
  {
    patterns: ["prime video", "amazon prime", "prime video redesign"],
    answer: "Ashish's **Prime Video Redesign** applied a Lean UX framework to Amazon Prime Video's interface. He focused on solving choice paralysis and browse fatigue using rapid prototyping, Scene Search concepts, and synchronized Social Watch Party interactions.",
  },
  {
    patterns: ["gold loan", "personal loan", "insta emi", "remi", "lending", "fintech"],
    answer: "Ashish designs core digital lending journeys at Bajaj Finance — Gold Loan, Personal Loan, and INSTA EMI Card. He also crafts high-converting marketing collaterals, push notifications, GIFs, and co-branded Retail EMI (REMI) campaign banners.",
  },
  {
    patterns: ["contact", "hire", "phone", "number", "email", "whatsapp", "call"],
    answer: "You can reach Ashish directly via:\n📞 Phone / WhatsApp: +91 9075521047\n✉️ Email: ashishcmaliofficial@gmail.com\n🔗 LinkedIn: linkedin.com/in/ashish-mali-b071b526b\nHe is based in Pune/Satara and open to high-impact design roles!",
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
  return "That's an interesting question! I might not have full details on that specific topic, but feel free to ask about Ashish's work at Bajaj Finance, his Prime Video case study, his toolkit (Figma, ProtoPie, Framer Motion), or how to contact him directly!";
}

function extractLocationFromHeaders(headers: Headers): string {
  const city = headers.get("x-vercel-ip-city");
  const region = headers.get("x-vercel-ip-country-region");
  const country = headers.get("x-vercel-ip-country");
  const parts = [];
  if (city) parts.push(decodeURIComponent(city));
  if (region) parts.push(region);
  if (country) parts.push(country);
  if (parts.length > 0) return parts.join(", ");
  return "Location unknown";
}

async function sendInstantAlert({
  userMessage,
  botResponse,
  userId,
  person,
  company,
  location,
}: {
  userMessage: string;
  botResponse: string;
  userId?: string;
  person?: string;
  company?: string;
  location?: string;
  userAgent?: string;
}) {
  const discordWebhook = process.env.DISCORD_WEBHOOK_URL;
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;

  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const cleanResponse =
    botResponse.length > 900 ? botResponse.slice(0, 897) + "..." : botResponse;

  if (discordWebhook) {
    try {
      const isTargeted = Boolean(person || company);
      let title = "💬 New Portfolio Chat Conversation";
      if (person && company) title = `🎯 New Chat from ${person} (${company})!`;
      else if (person) title = `🎯 New Chat from ${person}!`;
      else if (company) title = `🎯 New Chat from Team ${company}!`;

      await fetch(discordWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title,
              color: isTargeted ? 0x10b981 : 0xf59e0b,
              fields: [
                { name: "🗣️ User Question", value: userMessage || "*(Empty)*", inline: false },
                { name: "🤖 Ashli's Answer", value: cleanResponse || "*(No response)*", inline: false },
                { name: "📍 Visitor Location", value: location || "Unknown Location", inline: true },
                { name: "📅 Time (IST)", value: `${timestamp}`, inline: true },
              ],
              footer: { text: `Visitor ID: ${userId || "anonymous"}` },
            },
          ],
        }),
      });
    } catch (e) {
      console.error("Discord alert error:", e);
    }
  }

  if (telegramToken && telegramChatId) {
    try {
      const text = `💬 *New Portfolio Chat*\n📅 *Time:* ${timestamp} IST\n👤 *Visitor:* \`${userId || "Anonymous"}\`\n📍 *Location:* ${location || "Unknown"}\n\n🗣️ *User:* "${userMessage}"\n\n🤖 *Ashli:* "${cleanResponse}"`;
      await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text,
          parse_mode: "Markdown",
        }),
      });
    } catch (e) {
      console.error("Telegram alert error:", e);
    }
  }
}

export async function POST(request: Request) {
  try {
    const { messages, userId, person, company, userAgent } = await request.json();
    const userMessage = messages[messages.length - 1]?.content || "";
    const location = extractLocationFromHeaders(request.headers);

    // Conversational quick-intercept
    const conversationalReply = getConversationalResponse(userMessage);
    if (conversationalReply) {
      sendInstantAlert({
        userMessage,
        botResponse: conversationalReply,
        userId,
        person,
        company,
        location,
        userAgent,
      }).catch((err) => console.error("Alert error:", err));

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
          const assistantText = data.choices?.[0]?.message?.content || "";
          sendInstantAlert({
            userMessage,
            botResponse: assistantText,
            userId,
            person,
            company,
            location,
            userAgent,
          }).catch((err) => console.error("Alert error:", err));
          return NextResponse.json(data);
        }
      } catch (e) {
        console.warn("OpenAI API call failed, falling back:", e);
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
          const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (generatedText) {
            sendInstantAlert({
              userMessage,
              botResponse: generatedText,
              userId,
              person,
              company,
              location,
              userAgent,
            }).catch((err) => console.error("Alert error:", err));
            return NextResponse.json({
              choices: [{ message: { role: "assistant", content: generatedText } }],
            });
          }
        }
      } catch (err) {
        console.warn("Gemini fetch failed, falling back:", err);
      }
    }

    // Option 3: Smart Knowledge Base Fallback
    await new Promise((resolve) => setTimeout(resolve, 500));
    const fallbackText = getSmartFallbackResponse(userMessage);
    sendInstantAlert({
      userMessage,
      botResponse: fallbackText,
      userId,
      person,
      company,
      location,
      userAgent,
    }).catch((err) => console.error("Alert error:", err));

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