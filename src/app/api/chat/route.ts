import { NextResponse } from "next/server";
import {
  systemPrompt,
  getMultilingualConversationalReply,
  getMultilingualFallbackResponse,
} from "@/lib/multilingualChat";

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

export async function POST(request: Request) {
  try {
    const { messages, userId, person, company, userAgent } = await request.json();
    const userMessage = messages?.[messages.length - 1]?.content || "";
    const location = extractLocationFromHeaders(request.headers);

    // Step 0: Direct multilingual conversational reply
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
        console.warn("OpenAI call failed:", e);
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
          const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
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
        console.warn("Gemini call failed:", err);
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