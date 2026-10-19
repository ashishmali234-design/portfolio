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
   - Hinglish / Roman Hindi (e.g., "ashish ka number mil sakta hai kya", "kaha rehta hai", "kya kaam karta hai", "kaisa hai", "uska portfolio kaisa hai")
   - Pure Hindi in Devanagari script (e.g., "आशीष का नंबर मिल सकता है क्या?", "आशीष क्या काम करता है?", "उनके प्रोजेक्ट्स बताओ")
   - Marathi in Devanagari or Roman script (e.g., "आशीषचा मोबाईल नंबर मिळेल का?", "to kay karto?", "kuthe rahto?", "ashish cha number milel ka?")
   - Spanish (e.g., "¿Cuál es el número de Ashish?", "¿Cómo contactarlo?", "¿Qué proyectos ha diseñado?", "¿Quién es Ashish?")
   - French (e.g., "Comment contacter Ashish ?", "Quel est son numéro ?", "Quels sont ses projets et son expérience ?")
   - German (e.g., "Wie kann ich Ashish kontaktieren?", "Wie lautet seine Telefonnummer?", "Welche Erfahrung hat er?")
   - Japanese (e.g., "アシシュの連絡先や電話番号を教えてください", "どのようなプロジェクトをデザインしましたか？")
   - Arabic (e.g., "ما هو رقم هاتف اشيش أو بريده الإلكتروني؟", "ما هي خبراته ومشاريعه؟")
   - Portuguese (e.g., "Qual é o número de contato do Ashish?", "Quais são as experiências dele?")
   - Italian (e.g., "Come posso contattare Ashish?", "Qual è il suo numero di telefono?")
   - Russian (e.g., "Как связаться с Ашишем?", "Какой у него номер телефона?")
   - Indian Regional Languages: Telugu, Tamil, Kannada, Bengali, Gujarati, Malayalam, Punjabi, etc.
   - English (standard international).

2. STRICT LANGUAGE & REGISTER MIRRORING:
   - ALWAYS reply in the EXACT SAME language, dialect, and script that the user wrote in!
   - If user asks in Hinglish (Hindi in English letters) → Reply in warm, natural Hinglish (e.g., "Haan bilkul! Aap Ashish se WhatsApp ya call par direct contact kar sakte hain: +91 9075521047, ya email kar sakte hain ashishcmaliofficial@gmail.com par 😊").
   - If user asks in Hindi (Devanagari) → Reply warmly in pure Hindi (Devanagari).
   - If user asks in Marathi → Reply warmly in Marathi (Devanagari or Roman to match user).
   - If user asks in Spanish → Reply in fluent, native Spanish.
   - If user asks in French → Reply in fluent, native French.
   - If user asks in German → Reply in fluent, native German.
   - If user asks in Japanese → Reply in polite, natural Japanese.
   - If user asks in Portuguese / Italian / Russian / Arabic → Reply in that exact language.
   - If user asks in English → Reply in English.
   - NEVER reply in English when a visitor writes to you in another language!

3. UNIVERSAL CONTACT EXTRACTION:
   - When anyone asks for Ashish's contact, phone number, mobile, call, WhatsApp, email, or meeting in ANY language (e.g., "number mil sakta hai kya", "milel ka", "¿teléfono?", "numéro?", "Telefonnummer?", "contato?"), IMMEDIATELY provide:
     * Phone & WhatsApp: +91 9075521047
     * Email: ashishcmaliofficial@gmail.com
     * Location: Satara / Pune, Maharashtra, India
     * LinkedIn: https://www.linkedin.com/in/ashish-mali-b071b526b
     * Behance: https://www.behance.net/ashishmali

=======================================================
PERSONA & KNOWLEDGE RULES:
=======================================================
- USE SIMPLE, HUMAN LANGUAGE: Speak like a friendly, knowledgeable design partner. Avoid stiff jargon.
- ANSWER LEVEL: Short overview (3-4 sentences) for general questions. If user asks to explain more or go deep, provide rich details.
- CONFIDENTIALITY: Never expose internal step-by-step algorithms or proprietary merchant backend workflows. Focus on what Ashish designed, his user research, and business outcomes.
- REAL WORK: Always ground answers in Ashish's actual projects and design philosophy.

KEY FACTS ABOUT ASHISH:
- Full Name: Mr. Ashish Chandrakant Mali
- Father: Mr. Chandrakant Mali
- Birthdate: 11th June 2002
- Philosophy: "Designing with AI, thinking like humans" — uses AI to eliminate grunt work, preserving human empathy for user research and strategic design.
- Current Role: Product Designer at Bajaj Finance Ltd, Pune (May 2025 – Present)
  * Core Lending Journeys: Gold Loan, Personal Loan, INSTA EMI Card — streamlined complex financing flows into frictionless user journeys.
  * Sales One App (Full Revamp): End-to-end redesign for field sales agents — Homepage, Merchant Profile, Onboarding dashboards, Performance Dashboards, Team Tracking, Task management, Attendance logging, Merchant Visits, Gate meeting schedules, and "Scan & Start" flow.
  * Merchant One App (Bajaj Finserv for Business): Core dashboards, promotional banners, and animated merchant onboarding/training videos in After Effects & Premiere Pro.
  * B2B Enterprise Solutions: Scalable systems for corporate Aggregators and Non-Aggregators to monitor merchant operations.
  * Bajaj Pay / REMI / EDC POS: Campaign marketing banners, push notification graphics, GIFs, co-branded Retail EMI banners, and the POS EDC swipe journey design.
- Previous Experience: UI/UX Designer at Dchronicles Explication Intl. (July 2024–March 2025), Infoshard Technology (April–July 2024).
- Education: B.Sc. Animation Science from Yashwantrao Chavan Institute of Science, Satara (CGPA 9.02, 2023). UI/UX Design training at Midas Multimedia, Pune (2024).
- Featured Projects:
  1. MedApp: Healthcare UX ecosystem for seamless doctor appointments.
  2. Amazon Prime Video Redesign: Lean UX modernization of content discovery.
  3. boAt Website Redesign, Social Media Analytics Dashboard, Travel Booking Platform, Food & Dining Website, Auto Parts Website.
- Toolkit: Figma, ProtoPie, Framer Motion, Webflow, Spline 3D, Adobe After Effects, Illustrator, Photoshop, Premiere Pro.
- AI Stack: ChatGPT, Claude AI, Gemini AI, Magnific AI, Figma AI, Figma Make, Notebook LM, N8N (agentic workflows), Antigravity IDE.
- Contact Channels: Phone/WhatsApp (+91 9075521047), Email (ashishcmaliofficial@gmail.com), LinkedIn, Behance.
`;

// Helper: detect language of user input
export function detectLanguage(text: string): SupportedLanguage {
  const t = text.trim();
  const lower = t.toLowerCase();

  // 1. Japanese (Hiragana / Katakana / Kanji)
  if (/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(t)) {
    return "japanese";
  }

  // 2. Arabic script
  if (/[\u0600-\u06FF]/.test(t)) {
    return "arabic";
  }

  // 3. Devanagari script (Hindi / Marathi)
  if (/[\u0900-\u097F]/.test(t)) {
    if (/\b(मिळेल|करतो|कुठे|राहतो|काय|माहिती|आहे|आहात|कसे|कशी|आशिषचा|सांग|भेटू|नंबर|कधी)\b/.test(t)) {
      return "marathi_devanagari";
    }
    return "hindi_devanagari";
  }

  // 4. Spanish markers
  if (
    /[¿¡áéíóúñ]/.test(lower) ||
    /\b(hola|buenos\s*días|buenas\s*tardes|cómo|como|cuál|cual|dónde|donde|número|numero|teléfono|telefono|contacto|contactar|correo|quién|quien|qué|que|gracias|proyectos|trabajo|experiencia|puedo|llamar)\b/i.test(lower)
  ) {
    return "spanish";
  }

  // 5. French markers
  if (
    /[éèêëàâçîïôûù]/.test(lower) ||
    /\b(bonjour|salut|comment|quel|quelle|numéro|numero|téléphone|telephone|contacter|contact|qui\s*est|merci|projets|travail|expérience|appeler|joindre)\b/i.test(lower)
  ) {
    return "french";
  }

  // 6. German markers
  if (
    /[äöüß]/.test(lower) ||
    /\b(hallo|guten\s*tag|servus|wie|wo|nummer|telefonnummer|telefon|kontakt|kontaktieren|wer\s*ist|danke|projekte|arbeit|erfahrung|anrufen|erreichen)\b/i.test(lower)
  ) {
    return "german";
  }

  // 7. Portuguese markers
  if (
    /[ãõçáéíóú]/.test(lower) ||
    /\b(olá|ola|bom\s*dia|como|qual|onde|número|numero|telefone|contato|contatar|quem\s*é|obrigado|obrigada|projetos|trabalho|experiência|ligar)\b/i.test(lower)
  ) {
    return "portuguese";
  }

  // 8. Italian markers
  if (
    /\b(ciao|buongiorno|come|quale|dove|numero|telefono|contatto|contattare|chi\s*è|grazie|progetti|lavoro|esperienza|chiamare)\b/i.test(lower)
  ) {
    return "italian";
  }

  // 9. Marathi in Roman script
  if (
    /\b(milel|kuthe|rahto|rahatos|kasa|kashi|karto|kartos|bhetu|shakto|kay\s*karto|cha\s*number|chi\s*mahiti|mahiti|sang|dya|ahe|ahes)\b/i.test(lower)
  ) {
    return "marathi_roman";
  }

  // 10. Hinglish (Hindi in Roman script)
  if (
    /\b(kya|hai|hain|kaisa|kaise|kaha|kahan|batao|dedo|dena|sakta|sakti|sakte|chahiye|mil\s*sakta|milega|baat|kaun|suno|shukriya|namaste|dhanyawad|unka|inka|uska|iska|rehta|kaam|karta|bhai|yaar|bataiye|dijiye)\b/i.test(lower)
  ) {
    return "hinglish";
  }

  return "english";
}

// Conversational Intercepts in Multiple Languages
export function getMultilingualConversationalReply(message: string): string | null {
  const trimmed = message.trim();
  const lower = trimmed.toLowerCase();
  const lang = detectLanguage(message);

  // Gratitude / Thanks
  if (
    /\b(thanks|thank\s*you|thx|thankyou|ty|thnx|thnks|cheers|gracias|merci|danke|shukriya|dhanyawad|dhanyavaad|धन्यवाद|शुक्रिया|arigato|obrigado|obrigada|grazie)\b/i.test(lower)
  ) {
    switch (lang) {
      case "spanish":
        return "¡De nada! 😊 ¡Un placer ayudarte! Si quieres saber más sobre el trabajo de Ashish en Bajaj Finance o sus proyectos, ¡aquí estoy!";
      case "french":
        return "Avec grand plaisir ! 😊 N'hésitez pas si vous avez d'autres questions sur les projets ou le parcours d'Ashish !";
      case "german":
        return "Sehr gerne! 😊 Wenn Sie noch Fragen zu Ashishs Projekten oder Design-Prozessen haben, bin ich jederzeit da!";
      case "japanese":
        return "どういたしまして！😊 お役に立てて嬉しいです。Ashishのデザインや実績について何でもお気軽にお尋ねください！";
      case "hindi_devanagari":
        return "आपका बहुत स्वागत है! 😊 आशीष के काम, प्रोजेक्ट्स या उनके डिज़ाइन प्रोसेस के बारे में कुछ भी पूछने के लिए मैं हमेशा यहाँ हूँ!";
      case "marathi_devanagari":
      case "marathi_roman":
        return "तुमचे मनापासून स्वागत आहे! 😊 आशिषच्या कामाबद्दल, डिझाइन प्रोसेसबद्दल किंवा प्रोजेक्ट्सबद्दल काहीही विचारू शकता!";
      case "hinglish":
        return "Aapka bohot swagat hai! 😊 Ashish ke projects, design process ya contact ke baare mein kuch bhi poochiye, main hamesha yahan hoon!";
      case "portuguese":
        return "De nada! 😊 Fico feliz em ajudar! Se quiser saber mais sobre os projetos de Ashish, estou por aqui!";
      case "italian":
        return "Prego! 😊 È un piacere aiutarti! Se hai altre domande sui progetti di Ashish, sono qui!";
      default:
        return "You're so welcome! 😊 Feel free to ask anything else about Ashish's work, his projects, or his design process — I'm always here!";
    }
  }

  // Greetings
  if (
    /^\s*(hi|hello|hey|heya|howdy|heyy|hihi|hola|bonjour|salut|hallo|guten\s*tag|namaste|namaskar|नमस्ते|नमस्कार|konnichiwa|こんにちは|ciao|olá|ola)\s*[!.,:]*\s*$/i.test(lower)
  ) {
    switch (lang) {
      case "spanish":
        return "¡Hola! 👋 Soy Ashli, la asistente virtual de IA de Ashish Mali. Pregúntame lo que quieras sobre su trabajo en Bajaj Finance, sus herramientas de diseño o cómo contactarlo. ¿En qué te puedo ayudar?";
      case "french":
        return "Bonjour ! 👋 Je suis Ashli, l'assistante IA interactive d'Ashish Mali. Posez-moi toutes vos questions sur ses projets fintech chez Bajaj Finance, ses outils de design ou son parcours. Comment puis-je vous aider ?";
      case "german":
        return "Hallo! 👋 Ich bin Ashli, die interaktive KI-Assistentin von Ashish Mali. Fragen Sie mich gerne nach seinen Projekten bei Bajaj Finance, seinen Design-Tools oder seinen Fallstudien. Wie kann ich Ihnen helfen?";
      case "japanese":
        return "こんにちは！👋 アシシュ・マリのインタラクティブAIアシスタント「Ashli」です。Bajaj Financeでのデザイン実績やツール、連絡先など、何でも気軽にお尋ねください！";
      case "hindi_devanagari":
        return "नमस्ते! 🙏 मैं Ashli हूँ, आशीष माली की इंटरैक्टिव AI असिस्टेंट। आप मुझसे उनके बजाज फाइनेंस के काम, AI डिज़ाइन टूल्स, प्रोजेक्ट्स या कॉन्टैक्ट के बारे में कुछ भी पूछ सकते हैं। मैं आपकी क्या मदद कर सकती हूँ?";
      case "marathi_devanagari":
      case "marathi_roman":
        return "नमस्कार! 🙏 मी Ashli, आशिषची व्हर्च्युअल AI असिस्टंट! तुम्ही मला त्याच्या बजाज फायनान्स मधील डिझाइन, AI टूल्स, प्रोजेक्ट्स किंवा संपर्काबद्दल विचारू शकता. मी कशी मदत करू?";
      case "hinglish":
        return "Hey there! 🙏 Main Ashli hoon, Ashish ki interactive AI assistant! Aap mujhse uske Bajaj Finance work, design tools, case studies ya contact info ke baare mein kuch bhi pooch sakte hain. Kaise help kar sakti hoon?";
      case "portuguese":
        return "Olá! 👋 Sou a Ashli, assistente virtual de IA de Ashish Mali. Pergunte-me qualquer coisa sobre o trabalho dele na Bajaj Finance, seus projetos ou ferramentas de design!";
      case "italian":
        return "Ciao! 👋 Sono Ashli, l'assistente virtuale di Ashish Mali. Chiedimi pure qualsiasi cosa sui suoi progetti in Bajaj Finance, il suo design o come contattarlo!";
      default:
        return "Hey there! 👋 I'm Ashli, Ashish's interactive AI assistant. Ask me anything — his work at Bajaj Finance, his design tools, his case studies, or how to contact him. What can I help you with?";
    }
  }

  // Farewell
  if (
    /^\s*(bye|goodbye|see\s*ya|see\s*you|cya|good\s*night|good\s*bye|take\s*care|adios|adiós|chao|au\s*revoir|a\s*bientot|tschüss|auf\s*wiedersehen|alvida|अलविदा)\s*[!.]*\s*$/i.test(lower)
  ) {
    switch (lang) {
      case "spanish":
        return "¡Hasta luego! 🙌 ¡Muchísimas gracias por visitar el portafolio de Ashish! ¡Que tengas un excelente día!";
      case "french":
        return "Au revoir ! 🙌 Merci beaucoup d'avoir visité le portfolio d'Ashish. Passez une excellente journée !";
      case "german":
        return "Auf Wiedersehen! 🙌 Vielen Dank für Ihren Besuch auf Ashishs Portfolio. Haben Sie einen schönen Tag!";
      case "japanese":
        return "ありがとうございました！🙌 Ashishのポートフォリオをご覧いただき感謝いたします。素晴らしい一日をお過ごしください！";
      case "hindi_devanagari":
        return "अलविदा! अपना ख्याल रखें और आशीष का पोर्टफोलियो देखने के लिए बहुत धन्यवाद 🙌 आपका दिन शुभ हो!";
      case "marathi_devanagari":
      case "marathi_roman":
        return "काळजी घ्या! 🙌 आशिषच्या पोर्टफोलिओला भेट दिल्याबद्दल खूप धन्यवाद. तुमचा दिवस छान जावो!";
      case "hinglish":
        return "Take care! 🙌 Ashish ka portfolio visit karne ke liye bohot shukriya. Have an awesome day ahead!";
      default:
        return "Take care! 🙌 It was great chatting — thanks for visiting Ashish's portfolio. Have an amazing day!";
    }
  }

  // Affirmations
  if (
    /^\s*(ok|okay|k|kk|got\s*it|alright|sounds?\s*good|nice|cool|awesome|great|perfect|theek\s*hai|achha|thik\s*hai|vale|d'accord|gut)\s*[!.]*\s*$/i.test(lower)
  ) {
    switch (lang) {
      case "spanish":
        return "¡Genial! 😊 ¿Te gustaría explorar algo más, como sus proyectos en Bajaj Finance o su filosofía de diseño con IA?";
      case "french":
        return "Parfait ! 😊 Aimeriez-vous découvrir d'autres projets d'Ashish chez Bajaj Finance ou son approche du design IA ?";
      case "german":
        return "Klasse! 😊 Möchten Sie noch mehr über Ashishs Fintech-Projekte oder seinen KI-Design-Workflow erfahren?";
      case "hindi_devanagari":
        return "बहुत बढ़िया! 😊 क्या आप आशीष के बजाज फाइनेंस प्रोजेक्ट्स, उनकी AI डिज़ाइन फिलॉसफी या किसी केस स्टडी के बारे में और जानना चाहते हैं?";
      case "marathi_devanagari":
      case "marathi_roman":
        return "छान! 😊 तुम्हाला आशिषच्या बजाज फायनान्स मधील कामाबद्दल किंवा AI डिझाइनबद्दल अजून काही जाणून घ्यायचे आहे का?";
      case "hinglish":
        return "Badiya! 😊 Kya aap Ashish ke Bajaj Finance projects, unke AI tools ya case studies ke baare mein aur jaan-na chahte hain?";
      default:
        return "Glad that helped! 😊 Curious about anything else — like his Bajaj Finance projects, his AI design philosophy, or his case studies?";
    }
  }

  return null;
}

// Multilingual Intent-based Knowledge Fallback
export function getMultilingualFallbackResponse(message: string): string {
  const query = message.trim().toLowerCase();
  const lang = detectLanguage(message);

  // 1. Contact intent
  const isContactQuery =
    /\b(hire|contact|available|job|freelance|reach|email|linkedin|phone|mobile|gmail|whatsapp|call|connect|number|telephone|cell)\b/i.test(query) ||
    /\b(number\s*mil|mil\s*sakta|milega|milel|sampark|kaha\s*rehta|kahan\s*rehta|kuthe\s*rahto|phone\s*karna|baat\s*karni|number\s*kya|mobile\s*number|kaise\s*mile|call\s*kar)\b/i.test(query) ||
    query.includes("number mil sakta hai kya") ||
    query.includes("ashish ka number") ||
    query.includes("ashish cha number") ||
    /\b(contacto|contactar|teléfono|telefono|número|numero|llamar|correo|contratar|whatsapp|comunicar)\b/i.test(query) ||
    /\b(contacter|contact|téléphone|telephone|numéro|numero|appeler|joindre|embaucher|courriel)\b/i.test(query) ||
    /\b(kontakt|kontaktieren|telefonnummer|nummer|telefon|anrufen|erreichen|e-mail|handy)\b/i.test(query) ||
    /\b(contato|contatar|telefone|número|numero|ligar|chamar)\b/i.test(query) ||
    /\b(contatto|contattare|telefono|numero|chiamare)\b/i.test(query) ||
    /連絡先|電話番号|メール|問い合わせ|連絡/.test(message) ||
    /رقم|هاتف|اتصال|تواصل|ايميل/.test(message);

  if (isContactQuery) {
    switch (lang) {
      case "hindi_devanagari":
        return "हाँ बिल्कुल! आप आशीष से सीधे WhatsApp या Call पर +91 9075521047 पर संपर्क कर सकते हैं, या ashishcmaliofficial@gmail.com पर ईमेल भेज सकते हैं।\n\nआप उनके साथ इन प्लेटफ़ॉर्म्स पर भी जुड़ सकते हैं:\n• LinkedIn: linkedin.com/in/ashish-mali-b071b526b\n• Behance: behance.net/ashishmali\n• स्थान: सातारा / पुणे, महाराष्ट्र 😊";

      case "marathi_devanagari":
      case "marathi_roman":
        return "हो नक्कीच! तुम्ही आशिषशी थेट WhatsApp किंवा Call द्वारे +91 9075521047 वर संपर्क साधू शकता, किंवा ashishcmaliofficial@gmail.com वर ईमेल पाठवू शकता.\n\nइतर संपर्क पर्याय:\n• LinkedIn: linkedin.com/in/ashish-mali-b071b526b\n• Behance: behance.net/ashishmali\n• स्थान: सातारा / पुणे, महाराष्ट्र 😊";

      case "hinglish":
        return "Haan bilkul! Aap Ashish se direct WhatsApp ya Call par connect kar sakte hain: +91 9075521047, ya email kar sakte hain ashishcmaliofficial@gmail.com par.\n\nUnke professional profiles:\n• LinkedIn: linkedin.com/in/ashish-mali-b071b526b\n• Behance: behance.net/ashishmali\n• Location: Satara / Pune, Maharashtra 😊";

      case "spanish":
        return "¡Por supuesto! Puedes ponerte en contacto con Ashish directamente por WhatsApp o llamada al +91 9075521047, o escribirle un correo a ashishcmaliofficial@gmail.com.\n\nTambién puedes conectar con él a través de:\n• LinkedIn: linkedin.com/in/ashish-mali-b071b526b\n• Behance: behance.net/ashishmali\n• Ubicación: Pune / Satara, India 😊";

      case "french":
        return "Bien sûr ! Vous pouvez joindre Ashish directement via WhatsApp ou par téléphone au +91 9075521047, ou par e-mail à ashishcmaliofficial@gmail.com.\n\nVous pouvez également le retrouver sur :\n• LinkedIn : linkedin.com/in/ashish-mali-b071b526b\n• Behance : behance.net/ashishmali\n• Localisation : Pune / Satara, Inde 😊";

      case "german":
        return "Sehr gerne! Sie können Ashish direkt per WhatsApp oder telefonisch unter +91 9075521047 erreichen oder eine E-Mail an ashishcmaliofficial@gmail.com senden.\n\nWeitere Profile:\n• LinkedIn: linkedin.com/in/ashish-mali-b071b526b\n• Behance: behance.net/ashishmali\n• Standort: Pune / Satara, Indien 😊";

      case "japanese":
        return "もちろんです！AshishにはWhatsAppまたはお電話（+91 9075521047）、あるいはメール（ashishcmaliofficial@gmail.com）で直接ご連絡いただけます。\n\n• LinkedIn: linkedin.com/in/ashish-mali-b071b526b\n• Behance: behance.net/ashishmali\n• 拠点: インド・プネ / サタラ 😊";

      default:
        return "Haan bilkul! You can reach Ashish directly via WhatsApp or Call at +91 9075521047, or email him at ashishcmaliofficial@gmail.com.\n\nYou can also connect on:\n• LinkedIn: linkedin.com/in/ashish-mali-b071b526b\n• Behance: behance.net/ashishmali\n• Location: Satara / Pune, Maharashtra, India 😊";
    }
  }

  // 2. About intent
  const isAboutQuery =
    /\b(who\s*is\s*ashish|about\s*ashish|tell\s*me\s*about\s*ashish|background|bio|profile|father|chandrakant)\b/i.test(query) ||
    /\b(ashish\s*kaun\s*hai|kya\s*karta\s*hai|to\s*kay\s*karto|kaam\s*kya\s*hai|kon\s*ahe)\b/i.test(query) ||
    /\b(quién\s*es\s*ashish|quien\s*es\s*ashish|qui\s*est\s*ashish|wer\s*ist\s*ashish|quem\s*é\s*ashish)\b/i.test(query) ||
    /誰|紹介/.test(message);

  if (isAboutQuery) {
    switch (lang) {
      case "hindi_devanagari":
        return "आशीष सी. माली पुणे, भारत में स्थित एक सीनियर प्रोडक्ट डिज़ाइनर हैं। वर्तमान में वे Bajaj Finance Ltd में हाई-स्टेक्स फिनटेक और B2B एंटरप्राइज प्रोडक्ट्स डिज़ाइन करते हैं। उनका डिज़ाइन दर्शन है: \"Designing with AI, thinking like humans\" — वे तकनीक और मानवीय संवेदना का संतुलन बनाते हैं।";
      case "marathi_devanagari":
      case "marathi_roman":
        return "आशिष सी. माळी हे पुणे येथील प्रॉडक्ट डिझायनर आहेत. ते सध्या Bajaj Finance Ltd मध्ये फिनटेक, मर्चंट आणि B2B एंटरप्राइज प्लॅटफॉर्म्सचे डिझाइन करतात. त्यांचा विचार \"Designing with AI, thinking like humans\" असा आहे.";
      case "hinglish":
        return "Ashish C Mali ek passionate Product Designer hain jo Pune mein based hain. Currently Bajaj Finance Ltd mein high-stakes financial journeys, merchant apps aur B2B dashboards design karte hain. Unka philosophy hai \"Designing with AI, thinking like humans\"!";
      default:
        return "Ashish C Mali is a Product Designer based in Pune, India. He currently works at Bajaj Finance Ltd designing high-stakes financial, merchant, and B2B products. His philosophy is \"Designing with AI, thinking like humans\" — combining cutting-edge AI tools with deep human empathy to create meaningful, pixel-perfect digital experiences.";
    }
  }

  // 3. Bajaj Finance intent
  const isBajajQuery =
    /\b(bajaj|finance|finserv|current\s*job|where\s*does\s*he\s*work|experience|sales\s*one|merchant\s*one|lending|gold\s*loan|edc|pos)\b/i.test(query) ||
    /\b(kaha\s*kaam\s*karta|kuthe\s*kam\s*karto|anubhav|experiencia|expérience|erfahrung)\b/i.test(query);

  if (isBajajQuery) {
    switch (lang) {
      case "hindi_devanagari":
        return "आशीष बजाज फाइनेंस (Bajaj Finance Ltd) में प्रॉडक्ट डिज़ाइनर हैं:\n1. Core Lending: Gold Loan, Personal Loan और INSTA EMI Card की यूज़र जर्नी आसान बनाई।\n2. Sales One App: फील्ड सेल्स एजेंट्स के लिए पूरी ऐप का एंड-टू-एंड रीवैम्प किया।\n3. Merchant One App: मर्चेंट डैशबोर्ड्स और एनिमेटेड ट्रेनिंग वीडियो बनाए।\n4. B2B Enterprise: एग्रीगेटर्स और कॉर्पोरेट पार्टनर्स के लिए डैशबोर्ड्स डिज़ाइन किए।";
      case "marathi_devanagari":
      case "marathi_roman":
        return "आशिष बजाज फायनान्स (Bajaj Finance Ltd) मध्ये प्रॉडक्ट डिझायनर म्हणून काम करतो:\n१. कोअर लेंडिंग: Gold Loan, Personal Loan आणि INSTA EMI Card च्या सोप्या युझर जर्नीज.\n२. Sales One App: सेल्स एजंट्ससाठी संपूर्ण अ‍ॅपचे रीव्हॅम्प.\n३. Merchant One App: मर्चंट डॅशबोर्ड्स आणि अ‍ॅनिमेटेड ट्रेनिंग व्हिडिओज.\n४. B2B Enterprise: कॉर्पोरेट पार्टनर्ससाठी ऑनबोर्डिंग आणि डॅशबोर्ड्स.";
      case "hinglish":
        return "Ashish Bajaj Finance Ltd mein Product Designer hain. Unka kaam:\n1. Core Lending: Gold Loan, Personal Loan aur INSTA EMI Card ke journeys streamline kiye.\n2. Sales One App: Sales agents ke liye poori app revamp ki (Scan & Start onboarding, performance dashboards).\n3. Merchant One App: Dashboards aur animated training videos banaye.\n4. B2B Enterprise: Aggregators ke liye complex corporate dashboards design kiye.";
      default:
        return "Ashish is a Product Designer at Bajaj Finance Ltd in Pune. His high-impact fintech work spans:\n1. Core Lending: Optimized user journeys for Gold Loans, Personal Loans, and INSTA EMI Card.\n2. Sales One App: Full revamp of field sales agent tools (Scan & Start flow, attendance, performance dashboards).\n3. Merchant One App: Core merchant dashboards and animated training videos.\n4. B2B Enterprise: End-to-end Aggregator and Non-Aggregator onboarding & management.";
    }
  }

  // Default fallback
  switch (lang) {
    case "hindi_devanagari":
      return "यह बहुत अच्छा सवाल है! 🤔 आप मुझसे आशीष के बजाज फाइनेंस प्रोजेक्ट्स, उनके AI डिज़ाइन टूल्स या उनके संपर्क (+91 9075521047 / ashishcmaliofficial@gmail.com) के बारे में कुछ भी पूछ सकते हैं!";
    case "marathi_devanagari":
    case "marathi_roman":
      return "हा खूप छान प्रश्न आहे! 🤔 तुम्ही मला आशिषच्या बजाज फायनान्स मधील कामाबद्दल, त्याचे AI टूल्स किंवा थेट संपर्काबद्दल (+91 9075521047) नक्की विचारू शकता!";
    case "hinglish":
      return "Yeh bohot achha sawal hai! 🤔 Aap mujhse Ashish ke Bajaj Finance projects, AI design workflow ya direct contact (+91 9075521047) ke baare mein kuch bhi pooch sakte hain!";
    default:
      return "That's an interesting question! 🤔 Feel free to ask me about Ashish's projects at Bajaj Finance, his AI design workflow, or how to contact him (+91 9075521047) — I love talking about his work!";
  }
}
