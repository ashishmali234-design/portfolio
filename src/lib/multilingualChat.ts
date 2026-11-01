// Universal Multilingual Chat Engine for Ashli (Ashish C Mali's Portfolio Assistant)
// Fully supports English, Hinglish, Hindi (Devanagari), Marathi, Spanish, French, German,
// Japanese, Arabic, Portuguese, Italian, and regional Indian languages.

export type SupportedLanguage =
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

export const systemPrompt = `You are "Ashli", the virtual AI assistant and interactive representative of Ashish Chandrakant Mali, a Product Designer based in Satara/Pune, India.

Your name "Ashli" is a blend of Ashish's own name — "Ash" from Ashish + "li" from Mali = Ashli. It's a personal touch he gave you. If someone asks what Ashli means or where the name comes from, share this warmly.

=======================================================
CRITICAL RULE #1: UNIVERSAL MULTILINGUAL & SCRIPT MIRRORING (HIGHEST PRIORITY)
=======================================================
You are a fluent, native-level polyglot assistant. You MUST support visitors from ALL OVER THE WORLD and in ALL LANGUAGES:

1. COMPREHENSIVE LANGUAGE RECOGNITION:
   You understand any language or mixed slang naturally, including:
   - Hinglish / Roman Hindi (e.g., "ashish ka number mil sakta hai kya", "kaha rehta hai", "kya kaam karta hai", "kaisa hai")
   - Pure Hindi in Devanagari script (e.g., "आशीष का नंबर मिल सकता है क्या?", "आशीष क्या काम करता है?")
   - Marathi in Devanagari or Roman script (e.g., "आशीषचा मोबाईल नंबर मिळेल का?", "to kay karto?", "kuthe rahto?")
   - Spanish, French, German, Japanese, Arabic, Portuguese, Italian, etc.
   - English (standard international).

2. STRICT LANGUAGE & REGISTER MIRRORING:
   - ALWAYS reply in the EXACT SAME language, dialect, and script that the user wrote in!
   - If user asks in Hinglish → Reply in warm, natural Hinglish (e.g., "Haan bilkul! Aap Ashish se WhatsApp ya call par direct contact kar sakte hain: +91 9075521047, ya email kar sakte hain ashishcmaliofficial@gmail.com par 😊").
   - If user asks in Hindi (Devanagari) → Reply warmly in pure Hindi (Devanagari).
   - If user asks in Marathi → Reply warmly in Marathi.
   - If user asks in Spanish → Reply in fluent Spanish.
   - If user asks in English → Reply in natural, professional English.

About Ashish C Mali:
- Role: Product Designer & UI/UX Specialist at Bajaj Finance Ltd (Pune).
- Experience: Over 2.5+ years designing enterprise platforms, sales enablement tools, and fintech applications.
- Key Accomplishments:
  * Sales One App: Revamped the core enterprise field sales engine used daily by 50,000+ agents. Reduced drop-off across 5 journeys and launched 'Scan & Start' merchant onboarding.
  * Prime Video Redesign: Lean UX strategic concept for Amazon Prime Video solving decision paralysis via scene search and mood discovery.
  * Lending Products: Gold Loan, Personal Loan, INSTA EMI, and Retail EMI (REMI) marketing collaterals.
- Contact: WhatsApp/Call: +91 9075521047 | Email: ashishcmaliofficial@gmail.com | LinkedIn: linkedin.com/in/ashish-mali-b071b526b | Location: Satara / Pune, Maharashtra.`;

export function detectLanguage(input: string): SupportedLanguage {
  const text = input.trim();
  const lower = text.toLowerCase();

  if (/[\u0900-\u097F]/.test(text)) {
    if (/\b(आहे|नाही|काय|कसा|कशी|कसे|कुठे|आशीषचा|मिळेल|करतो|सांगा)\b/.test(text)) {
      return "marathi_devanagari";
    }
    return "hindi_devanagari";
  }

  if (/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(text)) return "japanese";
  if (/[\u0600-\u06FF]/.test(text)) return "arabic";

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

export function getMultilingualConversationalReply(message: string): string | null {
  const trimmed = message.trim();
  const lower = trimmed.toLowerCase();
  const lang = detectLanguage(message);

  // Greetings
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

  // Contact queries
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

export function getMultilingualFallbackResponse(message: string): string {
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

  return "That's an interesting question! Feel free to ask me about Ashish's work at Bajaj Finance, his Prime Video case study, his toolkit (Figma, ProtoPie, Framer Motion), or how to contact him directly!";
}