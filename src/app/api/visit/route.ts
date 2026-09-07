import { NextResponse } from "next/server";

function detectPlatform(referrer?: string, userAgent?: string, pageUrl?: string): string {
  const ref = (referrer || "").toLowerCase();
  const ua = (userAgent || "").toLowerCase();
  const url = (pageUrl || "").toLowerCase();

  // 1. Check in-app browsers via userAgent (mobile apps often strip the referrer)
  if (ua.includes("instagram")) return "📸 Instagram (App)";
  if (ua.includes("linkedinapp")) return "💼 LinkedIn (App)";
  if (ua.includes("whatsapp")) return "💬 WhatsApp (In-App)";
  if (ua.includes("twitter") || ua.includes("tweetmeme") || ua.includes("twitterkit")) return "🐦 Twitter / X (App)";
  if (ua.includes("telegram")) return "✈️ Telegram (In-App)";
  if (ua.includes("fban") || ua.includes("fbav")) return "👥 Facebook (App)";

  // 2. Check UTM / query parameters in pageUrl (e.g. ?utm_source=instagram or ?ref=linkedin)
  if (url.includes("utm_source=instagram") || url.includes("ref=instagram") || url.includes("source=instagram")) return "📸 Instagram";
  if (url.includes("utm_source=linkedin") || url.includes("ref=linkedin") || url.includes("source=linkedin")) return "💼 LinkedIn";
  if (url.includes("utm_source=whatsapp") || url.includes("ref=whatsapp") || url.includes("source=whatsapp")) return "💬 WhatsApp";
  if (url.includes("utm_source=twitter") || url.includes("ref=twitter") || url.includes("utm_source=x") || url.includes("ref=x")) return "🐦 Twitter / X";
  if (url.includes("utm_source=telegram") || url.includes("ref=telegram")) return "✈️ Telegram";
  if (url.includes("utm_source=behance") || url.includes("ref=behance")) return "🎨 Behance";
  if (url.includes("utm_source=dribbble") || url.includes("ref=dribbble")) return "🏀 Dribbble";
  if (url.includes("utm_source=resume") || url.includes("ref=resume") || url.includes("source=cv")) return "📄 Resume / CV";
  if (url.includes("utm_source=email") || url.includes("source=mail") || url.includes("ref=email")) return "📧 Email";

  // 3. Check Referrer domain
  if (ref) {
    if (ref.includes("instagram.com") || ref.includes("l.instagram.com")) return "📸 Instagram";
    if (ref.includes("linkedin.com") || ref.includes("lnkd.in")) return "💼 LinkedIn";
    if (ref.includes("whatsapp.com") || ref.includes("wa.me")) return "💬 WhatsApp";
    if (ref.includes("t.co") || ref.includes("twitter.com") || ref.includes("x.com")) return "🐦 Twitter / X";
    if (ref.includes("behance.net")) return "🎨 Behance";
    if (ref.includes("dribbble.com")) return "🏀 Dribbble";
    if (ref.includes("telegram.org") || ref.includes("t.me")) return "✈️ Telegram";
    if (ref.includes("google.")) return "🔍 Google Search";
    if (ref.includes("bing.com")) return "🔍 Bing Search";
    if (ref.includes("github.com")) return "🐙 GitHub";
    if (ref.includes("facebook.com") || ref.includes("fb.me") || ref.includes("m.facebook.com")) return "👥 Facebook";
    if (ref.includes("youtube.com") || ref.includes("youtu.be")) return "▶️ YouTube";
    if (ref.includes("mail.google.com")) return "📧 Gmail";
    if (ref.includes("outlook.")) return "📧 Outlook";

    // Extract custom external domain
    try {
      const parsed = new URL(ref);
      const host = parsed.hostname.replace(/^www\./, "");
      if (host && !host.includes("ashishmali") && !host.includes("localhost") && !host.includes("vercel.app")) {
        return `🌐 ${host}`;
      }
    } catch {
      // ignore
    }
  }

  return "🔗 Direct Link / Bookmarks";
}

export async function POST(request: Request) {
  try {
    const { person, company, userAgent, pageUrl, referrer, action } = await request.json();

    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;
    const discordWebhook = process.env.DISCORD_WEBHOOK_URL;

    // Detect visitor location using automatic Vercel headers
    const city = request.headers.get("x-vercel-ip-city");
    const region = request.headers.get("x-vercel-ip-country-region");
    const country = request.headers.get("x-vercel-ip-country");
    const location =
      [city, region, country]
        .filter(Boolean)
        .map((s) => decodeURIComponent(s!))
        .join(", ") || "Unknown Location";

    // Header fallback for referrer & userAgent
    const effectiveReferrer = referrer || request.headers.get("referer") || "";
    const effectiveUserAgent = userAgent || request.headers.get("user-agent") || "";

    // Detect platform / source
    const platform = detectPlatform(effectiveReferrer, effectiveUserAgent, pageUrl);

    // Detect device type from userAgent
    const ua = effectiveUserAgent.toLowerCase();
    let device = "💻 Desktop / Laptop";
    if (ua.includes("iphone") || ua.includes("android") || ua.includes("mobile")) {
      device = "📱 Mobile";
    } else if (ua.includes("ipad") || ua.includes("tablet")) {
      device = "📟 Tablet";
    }

    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const isTargeted = Boolean(person || company);
    const isResume = action === "resume";

    // 1. Send Discord Notification (if DISCORD_WEBHOOK_URL is configured in Vercel)
    if (discordWebhook) {
      let title = "👀 New Visitor on Portfolio!";
      let embedColor = isTargeted ? 0x10b981 : 0x3b82f6;

      if (isResume) {
        embedColor = 0xf59e0b; // Amber / Gold for Resume
        if (person && company) title = `📄 🎯 ${person} (${company}) opened your Resume!`;
        else if (person) title = `📄 🎯 ${person} opened your Resume!`;
        else if (company) title = `📄 🏢 Someone from ${company} opened your Resume!`;
        else title = `📄 Someone opened your Resume!`;
      } else {
        if (person && company) title = `🎯 ${person} (${company}) just opened your portfolio!`;
        else if (person) title = `🎯 ${person} just opened your portfolio!`;
        else if (company) title = `🏢 Someone from ${company} just opened your portfolio!`;
      }

      const fields = [
        ...(person ? [{ name: "👤 Person", value: `**${person}**`, inline: true }] : []),
        ...(company ? [{ name: "🏢 Company", value: `**${company}**`, inline: true }] : []),
        { name: "📍 Location", value: location, inline: true },
        { name: "📱 Device", value: device, inline: true },
        { name: "🧭 Platform / Source", value: platform, inline: true },
        { name: "📅 Time (IST)", value: `${timestamp}`, inline: true },
        ...(isResume ? [{ name: "📄 Action", value: "Opened / Downloaded Resume (PDF)", inline: true }] : []),
        { name: "🔗 Type", value: isTargeted ? "Personalized Link" : "Generic Website", inline: true },
      ];

      await fetch(discordWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title,
              color: embedColor,
              fields,
              footer: {
                text: pageUrl ? `URL: ${pageUrl}` : "Portfolio Tracker",
              },
            },
          ],
        }),
        signal: AbortSignal.timeout(3000),
      }).catch((e) => console.error("Discord error:", e));
    }

    // 2. Send Telegram Notification (if TELEGRAM_BOT_TOKEN & TELEGRAM_CHAT_ID are configured in Vercel)
    if (telegramToken && telegramChatId) {
      let text = "";
      if (isResume) {
        if (isTargeted) {
          text = `📄 *Resume Opened / Downloaded!*\n`;
          if (person) text += `👤 *Person:* ${person}\n`;
          if (company) text += `🏢 *Company:* ${company}\n`;
        } else {
          text = `📄 *Resume Opened / Downloaded!*\n🌐 *Type:* Generic Visitor\n`;
        }
      } else {
        if (isTargeted) {
          text = `🎯 *Personalized Portfolio Opened!*\n`;
          if (person) text += `👤 *Person:* ${person}\n`;
          if (company) text += `🏢 *Company:* ${company}\n`;
        } else {
          text = `👀 *New Visitor on Portfolio!*\n🌐 *Type:* Generic Visit\n`;
        }
      }
      text += `📍 *Location:* ${location}\n📱 *Device:* ${device}\n🧭 *Platform:* ${platform}\n📅 *Time:* ${timestamp} IST`;

      await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text,
          parse_mode: "Markdown",
        }),
        signal: AbortSignal.timeout(3000),
      }).catch((e) => console.error("Telegram error:", e));
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
