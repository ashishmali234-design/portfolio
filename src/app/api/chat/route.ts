import { NextResponse } from "next/server";

type SupportedLanguage =
  | "english"
  | "hinglish"
  | "hindi_devanagari"
  | "marathi_devanagari"
  | "marathi_roman"
  | "spanish"
  | "french"
  | "german"
  | "japanese"
  | "arabic"
  | "portuguese"
  | "italian";

const systemPrompt = `You are "Ashli", the virtual AI assistant and interactive representative of Ashish Chandrakant Mali, a Product Designer based in Satara/Pune, India.

Your name "Ashli" is a blend of Ashish's own name — "Ash" from Ashish + "li" from Mali = Ashli. It's a personal touch he gave you. If someone asks what Ashli means or where the name comes from, share this warmly.

CRITICAL RULE #1: UNIVERSAL MULTILINGUAL & SCRIPT MIRRORING (HIGHEST PRIORITY)
You are a fluent, native-level polyglot assistant. You MUST support visitors from ALL OVER THE WORLD and in ALL LANGUAGES:
- Hinglish / Roman Hindi (e.g. "ashish ka number mil sakta hai kya", "kaha rehta hai", "kya kaam karta hai")
- Pure Hindi in Devanagari script (e.g. "आशीष का नंबर मिल सकता है क्या?", "आशीष क्या काम करता है?")
- Marathi in Devanagari or Roman script (e.g. "आशीषचा मोबाईल नंबर मिळेल का?", "to kay karto?", "kuthe rahto?")
- Spanish, French, German, Japanese, Arabic, Portuguese, Italian, etc.
- English (standard international).

CRITICAL PERSONA RULES:
1. USE SIMPLE, HUMAN LANGUAGE. Speak like a friendly, knowledgeable person.
2. ANSWER LEVEL: Short 3–4 sentence overview for general queries; comprehensive answers when the user asks to elaborate.
3. STRICT CONFIDENTIALITY: Never explain internal proprietary workflows step-by-step. Focus on what Ashish designed, his role, and the business outcome.
4. Contact details: Phone/WhatsApp: +91 9075521047 | Email: ashishcmaliofficial@gmail.com | LinkedIn: linkedin.com/in/ashish-mali-b071b526b | Location: Satara / Pune, Maharashtra.`;

function detectLanguage(text: string): SupportedLanguage {
  const trimmed = text.trim();
  const lower = trimmed.toLowerCase();

  if (/[\u0900-\u097F]/.test(trimmed)) {
    if (/\b(आहे|नाही|काय|कसा|कशी|कसे|कुठे|आशीषचा|मिळेल|करतो|सांगा)\b/.test(trimmed)) {
      return "marathi_devanagari";
    }
    return "hindi_devanagari";
  }

  if (/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(trimmed)) return "japanese";
  if (/[\u0600-\u06FF]/.test(trimmed)) return "arabic";

  if (/\b(kay|karto|kuthe|rahto|ahe|nahi|kasa|kashi|ashishcha|milel|tula|bol)\b/.test(lower)) {
    return "marathi_roman";
  }

  if (
    /\b(kya|kaise|kaha|kaisa|kaisi|bhai|batao|milega|hoga|hai|nahi|mujhe|uska|unka|karega|bolo|aap)\b/.test(lower)
  ) {
    return "hinglish";
  }

  if (/\b(hola|como|donde|quien|numero|proyectos|gracias|buenos|dias)\b/.test(lower)) return "spanish";
  if (/\b(bonjour|merci|comment|quel|numero|projets|qui|salut)\b/.test(lower)) return "french";
  if (/\b(hallo|wie|danke|nummer|projekte|wer|guten)\b/.test(lower)) return "german";
  if (/\b(ciao|come|grazie|numero|progetti|chi)\b/.test(lower)) return "italian";
  if (/\b(ola|como|obrigado|numero|projetos|quem)\b/.test(lower)) return "portuguese";

  return "english";
}

function getMultilingualConversationalReply(message: string): string | null {
  const trimmed = message.trim();
  const lower = trimmed.toLowerCase();
  const lang = detectLanguage(message);

  if (/^(hi|hello|hey|hola|bonjour|hallo|namaste|kem cho|vanakkam|salam)\b/i.test(trimmed)) {
    switch (lang) {
      case "hinglish":
        return "Hello! Kaise hain aap? Main hoon Ashli, Ashish ka virtual AI design co-pilot. Ashish ke projects (Bajaj Finance, Prime Video), design skills ya contact details ke baare mein kuch bhi pooch sakte hain!";
      case "hindi_devanagari":
        return "नमस्ते! मैं 'अश्ली' (Ashli) हूँ, आशीष का AI डिज़ाइन साथी। आप आशीष के प्रोजेक्ट्स (Bajaj Finance, Prime Video), उनके टूल्स या संपर्क के बारे में कुछ भी पूछ सकते हैं!";
      case "marathi_devanagari":
      case "marathi_roman":
        return "नमस्कार! मी 'अश्ली' (Ashli), आशिषचा व्हर्च्युअल AI डिझाइन पार्टनर. आशिषचे काम (Bajaj Finance, Prime Video), त्याचे अनुभव किंवा त्याच्याशी संपर्क कसा करायचा, याबद्दल तुम्ही विचारू शकता!";
      default:
        return "Hi there! 👋 I'm Ashli, Ashish's virtual UX design co-pilot. Feel free to ask about his work at Bajaj Finance, the Prime Video redesign, his UX toolkit, or how to get in touch with him directly!";
    }
  }

  if (
    lower.includes("number") ||
    lower.includes("phone") ||
    lower.includes("contact") ||
    lower.includes("email") ||
    lower.includes("whatsapp") ||
    lower.includes("call")
  ) {
    switch (lang) {
      case "hinglish":
        return "Aap Ashish se seedha connect kar sakte hain:\n📞 Phone / WhatsApp: +91 9075521047\n✉️ Email: ashishcmaliofficial@gmail.com\n🔗 LinkedIn: linkedin.com/in/ashish-mali-b071b526b\nAap niche diye Contact section se bhi direct message bhej sakte hain!";
      case "hindi_devanagari":
        return "आप आशीष से सीधे संपर्क कर सकते हैं:\n📞 फोन / व्हाट्सएप: +91 9075521047\n✉️ ईमेल: ashishcmaliofficial@gmail.com\n🔗 लिंक्डइन: linkedin.com/in/ashish-mali-b071b526b";
      case "marathi_devanagari":
      case "marathi_roman":
        return "तुम्ही आशिषशी थेट संपर्क साधू शकता:\n📞 फोन / व्हॉट्सॲप: +91 9075521047\n✉️ ईमेल: ashishcmaliofficial@gmail.com\n🔗 लिंक्डइन: linkedin.com/in/ashish-mali-b071b526b";
      default:
        return "You can reach Ashish directly via:\n📞 Phone / WhatsApp: +91 9075521047\n✉️ Email: ashishcmaliofficial@gmail.com\n🔗 LinkedIn: https://www.linkedin.com/in/ashish-mali-b071b526b\nHe is based in Pune/Satara and open to high-impact design roles!";
    }
  }

  return null;
}

function getMultilingualFallbackResponse(message: string): string {
  const query = message.toLowerCase();
  const lang = detectLanguage(message);

  if (query.includes("bajaj") || query.includes("sales one") || query.includes("work")) {
    if (lang === "hinglish") {
      return "Ashish Bajaj Finance Ltd mein Product Designer hain. Unhone 'Sales One App' ka complete revamp lead kiya jo 50,000+ daily field agents use karte hain, jisme 'Scan & Start' onboarding aur live KPI dashboards shamil hain!";
    }
    return "At Bajaj Finance, Ashish designed enterprise field journeys including the Sales One App (50k+ daily agents), Scan & Start onboarding, Gold Loan, and Retail EMI customer funnels.";
  }

  if (query.includes("prime") || query.includes("video") || query.includes("project")) {
    if (lang === "hinglish") {
      return "Ashish ka Prime Video Redesign ek Lean UX strategic concept hai jo users ki choice paralysis ko khatam karta hai Scene Search, Mood-based discovery, aur Social Watch Party features ke zariye!";
    }
    return "Ashish's Prime Video Redesign is a strategic Lean UX project introducing Mood-based Discovery, AI Scene Search, and synchronized Watch Party features to cut down browse fatigue.";
  }

  return "That's an interesting question! Feel free to ask me about Ashish's work at Bajaj Finance, his Prime Video case study, his toolkit (Figma, ProtoPie, Framer Motion), or how to contact him directly (+91 9075521047)!";
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
    const userMessage = messages?.[messages.length - 1]?.content || "";
    const location = extractLocationFromHeaders(request.headers);

    const conversationalReply = getMultilingualConversationalReply(userMessage);
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
            max_tokens: 1200,
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
        console.warn("OpenAI API call failed:", e);
      }
    }

    // Option 2: Gemini API
    if (geminiKey) {
      try {
        const geminiMessages = messages.map((m: { role: string; content: string }) => ({
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
              generationConfig: { temperature: 0.7, maxOutputTokens: 1200 },
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
        console.warn("Gemini fetch failed:", err);
      }
    }

    // Option 3: Immediate Multilingual Knowledge Base Fallback
    const fallbackText = getMultilingualFallbackResponse(userMessage);
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
