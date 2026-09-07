import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { person, company } = await request.json();

    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;
    const discordWebhook = process.env.DISCORD_WEBHOOK_URL;

    // Detect visitor location using automatic headers
    const city = request.headers.get("x-vercel-ip-city");
    const region = request.headers.get("x-vercel-ip-country-region");
    const country = request.headers.get("x-vercel-ip-country");
    const location =
      [city, region, country]
        .filter(Boolean)
        .map((s) => decodeURIComponent(s!))
        .join(", ") || "Unknown Location";

    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    // 1. Send Discord Notification (if DISCORD_WEBHOOK_URL is configured)
    if (discordWebhook) {
      const isTargeted = Boolean(person || company);
      let title = "👀 Portfolio Opened!";
      if (person && company) title = `🎯 ${person} (${company}) just opened your portfolio!`;
      else if (person) title = `🎯 ${person} just opened your portfolio!`;
      else if (company) title = `🏢 Someone from ${company} just opened your portfolio!`;

      await fetch(discordWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title,
              color: isTargeted ? 0x10b981 : 0x3b82f6,
              fields: [
                ...(person ? [{ name: "👤 Person", value: `**${person}**`, inline: true }] : []),
                ...(company ? [{ name: "🏢 Company", value: `**${company}**`, inline: true }] : []),
                { name: "📍 Location", value: location, inline: true },
                { name: "📅 Time (IST)", value: `${timestamp}`, inline: true },
              ],
            },
          ],
        }),
        signal: AbortSignal.timeout(2500),
      }).catch((e) => console.error("Discord error:", e));
    }

    // 2. Send Telegram Notification (if TELEGRAM_BOT_TOKEN & TELEGRAM_CHAT_ID are configured)
    if (telegramToken && telegramChatId) {
      let text = `👀 *Portfolio Opened!*\n`;
      if (person) text += `👤 *Person:* ${person}\n`;
      if (company) text += `🏢 *Company:* ${company}\n`;
      text += `📍 *Location:* ${location}\n📅 *Time:* ${timestamp} IST`;

      await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text,
          parse_mode: "Markdown",
        }),
        signal: AbortSignal.timeout(2500),
      }).catch((e) => console.error("Telegram error:", e));
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
