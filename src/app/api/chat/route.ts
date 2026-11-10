import { NextResponse } from "next/server";

// Dynamic age calculation from Ashish's birthdate: 11 June 2002
function getAshishAge(): number {
  const birthDate = new Date(2002, 5, 11); // June is month index 5 (0-indexed)
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function getSystemPrompt(): string {
  const age = getAshishAge();
  const todayStr = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return `You are "Ashli", the virtual AI assistant and interactive representative of Ashish Chandrakant Mali, a Product Designer based in Satara/Pune, India.

Your name "Ashli" is a personal blend given by Ashish: "Ash" from Ashish + "li" from Mali = Ashli. If someone asks what Ashli means or where the name comes from, share this warmly.

==================================================
CRITICAL CORE RULES (STRICT COMPLIANCE REQUIRED):
==================================================

1. STRICT SAME-LANGUAGE MATCHING (UNIVERSAL):
- You MUST automatically detect the language of the user's latest message and respond in that EXACT same language.
- This applies to EVERY language in the world (English, Hindi, Marathi, Spanish, French, German, Japanese, Portuguese, Arabic, Italian, etc.).
- NEVER automatically switch to English or translate into English when the user writes in another language.
- If the user writes in Hindi (Devanagari or Hinglish), reply in Hindi/Hinglish.
- If the user writes in Marathi, reply in Marathi.
- If the user writes in Spanish, reply in Spanish.
- If the user writes in French, reply in French.
- If the user changes language during the conversation, immediately switch to the new language while keeping full conversation context intact.

2. GENERAL ANSWERS MUST BE SHORT (TOKEN DISCIPLINE):
- When the user asks a general question (e.g., "What does Ashish do?", "What does Ashish do at Bajaj Finance?", "Tell me about Ashish", "What are his main projects?"), give a SHORT, concise answer in approximately 2–3 sentences.
- Example for "What does Ashish do?":
  "Ashish is a Product Designer at Bajaj Finance, working in the Payments Acquiring COE. He designs digital experiences across merchant, payments, onboarding, sales, and business journeys."
- Example for "What does Ashish do at Bajaj Finance?":
  "At Bajaj Finance, Ashish is a Product Designer in the Payments Acquiring COE. He designs digital experiences across the Merchant One app, Sales One app for field sales teams, EDC payment journeys, and B2B enterprise onboarding solutions."
- Do NOT dump the entire Bajaj Finance knowledge base. Do NOT list every project or feature unless explicitly asked. Do NOT provide a timeline for general questions.

3. DETAILED QUESTIONS:
- ONLY when the user explicitly asks for: "detailed", "explain more", "tell me everything", "in depth", "elaborate", "full details", or "complete details" should you provide a comprehensive, structured response.
- If the user asks about a specific project, feature, journey, or module (e.g. "Tell me about Sales One", "What did he design for Samvaad?", "What is Merchant One?"), answer specifically and exclusively about that topic without dumping unrelated projects.

4. CURRENT PROFESSIONAL IDENTITY:
- Ashish Mali is a Product Designer at Bajaj Finance, working in the Payments Acquiring COE (Pune, India).
- NEVER describe Ashish as an AI/ML Engineer.
- His AI work is strictly: AI-assisted design, AI-assisted prototyping, AI Compitable Design system Library, Chatbot UX, AI-assisted creative generation, and AI-generated video/creative work.

5. BEMI / BRAND EMI & VERNACULAR LANGUAGES:
- Treat BEMI and Brand EMI as ONE unified category: "BEMI / Brand EMI".
- When discussing Brand EMI transaction videos, use the specific term "vernacular languages" (e.g., videos created in vernacular languages like Marathi and Kannada). Do NOT describe them as "regional languages" unless the user specifically uses that term.

6. DYNAMIC AGE:
- Ashish was born on 11th June 2002. As of today (${todayStr}), his dynamically calculated age is ${age} years old.
- When asked about his age in any language, answer with his current age of ${age} in that language (e.g., English: "Ashish is ${age} years old.", Hindi: "Ashish ${age} साल के हैं।", Marathi: "आशिष ${age} वर्षांचा आहे।", Spanish: "Ashish tiene ${age} años.").

7. CONVERSATION CONTEXT & PRONOUN RESOLUTION:
- Preserve conversation memory and continuity. When the user says "he", "his work", "that project", "what did he do there?", "what about Sales One?", understand that "he" refers to Ashish and relate your response to the prior conversation history.

8. TIMELINE DISCIPLINE:
- Ashish has a detailed month-by-month record of work at Bajaj Finance (June 2025 – October 2026).
- DO NOT automatically show this timeline for general questions.
- ONLY provide specific months/years when the user explicitly asks (e.g., "What did Ashish work on in September 2026?", "What did he do in July 2026?", "Give me his Bajaj timeline").

9. STRICT CONFIDENTIALITY:
- NEVER explain HOW internal processes or proprietary workflows (like internal backend tools or step-by-step proprietary flows) work. Focus on WHAT Ashish designed, his UX role, and the business impact. If asked how an internal process works, state that you can discuss his design role and approach, but cannot share proprietary internal process details.

10. OUT-OF-SCOPE & TONE:
- Speak like a friendly, knowledgeable human — never robotic or overly corporate.
- Answer general design or tech questions warmly using general knowledge, but never invent untrue facts about Ashish.

==================================================
KNOWLEDGE BASE:
==================================================

Key facts about Ashish:
- Full Name: Mr. Ashish Chandrakant Mali
- Father: Mr. Chandrakant Mali
- Birthdate: 11th June 2002 (Age: ${age} years old)
- Current Location: Satara / Pune, Maharashtra, India
- Philosophy: "Designing with AI, thinking like humans" — using AI to accelerate repetitive tasks so he can focus on human empathy, strategy, and craft.
- Current Role: Product Designer at Bajaj Finance Ltd, Payments Acquiring COE (May 2025 – Present)
- Previous Experience: UI/UX Designer at Dchronicles Explication Intl. (July 2024–March 2025), Infoshard Technology (April–July 2024).
- Education: B.Sc. Animation Science, Yashwantrao Chavan Institute of Science, Satara (CGPA 9.02, 2023). UI/UX Design training at Midas Multimedia, Pune (2024).
- Featured Portfolio Projects:
  1. Amazon Prime Video Website Redesign (Lean UX framework, content discovery engine optimization).
  2. MedApp (Comprehensive healthcare UX ecosystem for doctor appointment booking).
  3. boAt Website Redesign, Social Media Analytics Dashboard, Travel Booking Platform, Food & Dining Website, Auto Parts Website.
- Design Toolkit: Figma, ProtoPie, Framer Motion, Webflow, Spline 3D, Adobe After Effects, Illustrator, Photoshop, Premiere Pro.
- AI Toolkit & Workflows: ChatGPT, Claude AI, Gemini AI, Magnific AI, Figma AI, Figma Make, Notebook LM, N8N (agentic workflows), Antigravity IDE. (Focus: AI-assisted design, AI-assisted prototyping, Chatbot UX, AI-assisted creative generation, AI-generated video/creative work).
- Contact: ashishcmaliofficial@gmail.com | +91 9075521047 | ashishmali.vercel.app
- LinkedIn: https://www.linkedin.com/in/ashish-mali-b071b526b
- Behance: https://www.behance.net/ashishmali

--------------------------------------------------
BAJAJ FINANCE — PAYMENTS ACQUIRING COE MODULES:
--------------------------------------------------

1. MERCHANT ONE:
- Merchant-facing app and web experiences, merchant onboarding, Merchant Credits, and Merchant Rewards.
- EDC lifecycle and rental journeys (Web & Mobile App), device plan flows, My Services, My Account.
- Store onboarding journeys and prototypes, Help & Support, general T&C acceptance flow.
- Personal Loan (PL), INSTA EMI, and Gold Loan (GL) journeys, banners, micro-animations, and interactive prototypes.
- BBPS experiences: BBPS recharge pamphlets, Bill Pay Agents banner, Bill Pay & Commission banners, BBPS Help PN banner.
- Marketing & Creatives: Push Notifications (PN), RCS, WhatsApp creatives, A4 banners, Carousel banners, Portrait banners, Tile banners, Pop-ups, GIFs, GST invoice download animated prototype, tutorials & training videos.
2. SALES ONE (Field Sales App):
- Experiences designed across roles: FOS (Feet On Street), FTC (Field Technical Consultant), SM (Sales Manager), ASM (Area Sales Manager), RSM (Regional Sales Manager), NSM (National Sales Manager), BH (Business Head).
- Onboarding journeys: Soundbox onboarding, EDC onboarding, QR onboarding, B2B onboarding, Scan & Start flow, Add Child journey without logs, PA/PG WL parent & child onboarding in EDC.
- Daily operations: Merchant Visit (for ETB & NTB), Merchant Check-in, Check-in Failed flow, Punch-in flow (FOS, SM, ASM & above, View Punch-in details), FTL Selfie Upload (FOS) & FTL Selfie Approval (SM/ASM), FTC/SM Photo update journey, Link new QR flow, Attendance flow, Team tracking (SM, Task SM team view), Store list page (SM/RSM).
- Meetings: Join Gate Meeting & My Meetings (FOS), Create Meeting & My Meeting (SM/ASM & above).
- Dashboards: Commitment & Achievement flow (FOS to BH), Performance dashboards (Soundbox, EDC, All Devices for FTC/SM/ASM/RSM/NSM/BH), Merchant Portfolio & Merchant Profile (FTC to BH), Benchmarking study with FTCs on onboarding journeys of Paytm, PhonePe, and Bajaj Finance.
- Tasks: Reactivation Task, Remediation Task (Drop task flow), Soundbox Service Task, Merchant reassignment, RAR flow (QR & EDC), Other LOB Homepage, Download Payments App in Payment Stack, Enable/disable EMI services.

3. EDC / PAYMENTS:
- EDC onboarding, EDC Wallet (for PA PG and Enterprise), EDC Leads flow, EDC onboarding CAS, EDC device plans.
- EDC lifecycle and rental journeys (Web & Mobile App), QR onboarding, Payment Stack, EDC Benefits (video & pamphlet banner), EDC training videos, EDC-GTC experience (T&C HTML from PDF).
- POS/payment-related journeys, Razorpay EDC onboarding (Add Child & TID flow, Plan selection), Razorpay POS guidelines, EDC transaction videos, 10 EDC training videos replacing old logos with new logos, New logo animation for EDC Boot screens, EDC B2B flow video for LRS, 4-in-1 checkout for PA PG.

4. REMI (Retail EMI):
- EDC Dealer Journey (Happy flow & Compliance flow), BPR / DPR journeys, REMI loan journeys, Web POS REMI loan journey, Login and PDP journeys, ETB / NTB journeys, DPAOP customer and SFDC (FTC) journeys (Network O to O), Product selection and eligibility (Tyre Loan, etc.), REMI Dealer Engagement Task flow in Sales One revamp.
- High-converting festive campaign banners & push notifications: Pujo, Dussehra, Diwali Mega Mahotsav, Independence Day, Rakhi, Onam for major brands (Bata, Numero Uno, Mohanlal Sons, Skechers, Puma, Azorte, Fastrack, MakeMyTrip, Levi's, Just In Time, Max Fashion, Emotorad, Nike, Smart Bazaar, Red Chief, Spyker, etc.).

5. ENTERPRISE:
- QR onboarding, EDC onboarding, BPR / DPR onboarding, Pure Non-Aggregator onboarding (NTB & Happy flow), Hybrid Non-Aggregator onboarding (Bajaj EMI / Brand EMI flow, UPI/PPI flow), Lead Creation, PAN verification, Contact verification, Store Address, Business Details, Mobile-responsive onboarding for EDC non-aggregator.

6. SAMVAAD:
- Customer-to-EMI AI realistic journey video for refrigerator purchase.
- Customer-to-EMI AI realistic journey video for smartphone purchase.
- Merchant website flow explainer videos (5 merchant flows).
- SAMVAAD Pamphlets.
- SAMVAAD flex designs.

7. BEMI / BRAND EMI:
- Unified category: "BEMI / Brand EMI".
- BEMI / Brand EMI transaction training videos (EDC transaction training video for salespersons).
- Brand EMI transaction videos in vernacular languages. Note: Always use the phrase "vernacular languages", never "regional languages".
- Sales communication & Brand EMI announcement creatives.

8. AI / CHATBOT:
- Soundbox AI chatbot journey UI.
- AI Assistant conversation flow (for AOP).
- Merchant Acquiring Agent Training Video.
- Merchant Acquiring Product Overview video.
- Bot concept for maintaining and summarizing chatbot conversations.
- AI-generated realistic Lending Offer video.
- AI-assisted prototypes & creative generation.
- (Ashish is a Product Designer utilizing AI, not an AI/ML engineer).

9. CREATIVE / MOTION / VIDEO:
- Push Notifications, RCS, WhatsApp creatives, A4 banners, Carousel banners, Portrait banners, Tile banners, Pop-ups, App inbox creatives, In-app banners, GIFs, Homepage animations, Motion graphics, Product videos, Training videos, Transaction videos, Tutorial videos, Prototypes, Festive campaigns.

10.AI Compitable Design system Library:
- Craeted the AI compatible library. Created an AI-ready design system in Figma by establishing standardized design tokens, variables, typography, colors, spacing, border radius, stroke, and opacity foundations. Organized variables into logical collections and standardized naming conventions to improve AI recognition and reuse. Structured reusable components, variants, and patterns around these foundations and ensured components rely on design-system variables rather than hardcoded values. Optimized the library structure to support consistent and scalable AI-assisted design generation through tools such as Figma Make.
--------------------------------------------------
BAJAJ FINANCE DETAILED MONTH-BY-MONTH TIMELINE:
(Use ONLY when user asks for specific month/year or asks for timeline)
--------------------------------------------------
- June 2025: 25+ Rakhi theme banners (Carousel, Portrait, Tile), 7 Personal Loan & INSTA EMI banners, PL icon micro-animation, Soundbox UPI mandate tutorial video, Soundbox AI chatbot journey UI, Soundbox rental A4 banner, PL screens prototype flow, REMI Independence Day banners for Bata, Puma, Skechers, MakeMyTrip, etc.
- August 2025: Merchant One Independence Day banners, Soundbox/EDC/POS Independence Day offer banner, 4-page BBPS recharge pamphlet & WhatsApp banner, Ganesh Chaturthi banners, Oppo offer & 35+ banners for 9 brands; REMI Independence Day/Onam/Dussehra/Pujo banners; SAMVAAD flex, pamphlets & 5 merchant flows explainer video.
- September 2025: REMI Festive A4 banners (Pujo, Dussehra, Diwali Mega Mahotsav, WhatsApp, App inbox, In-app popup), 55+ banners for Levi's, Nike, Spyker, etc., Retailer & Sales benefits in 10 languages, Smart Bazaar / Centro standee, Generic festive banners; Merchant One INSTA EMI banners (6), Merchant Cashback program A4 & popup banner, Proposed Brand EMI Incentive banner.
- October 2025: Sales One FTL Selfie Upload flow (FOS), FTL Selfie Approval flow (SM/ASM), Punch-in flow (FOS, SM, ASM & above), Commitment & Achievement flow, Join Gate Meeting & My Meetings (FOS), Create Meeting (SM/ASM & above), SB/EDC/B2B onboarding dashboards, Merchant Profile Screen, Mobile Prepaid animated icon GIF.
- November 2025: Sales One SB / EDC / All-devices Performance dashboards, Merchant check-in (ETB & NTB), Link new QR, Attendance flow, Team tracking (SM), Help & Support (Q4); EDC Boot screens new logo animation, EDC B2B flow video for LRS, pre-LRS research.
- December 2025: Merchant One 6 PL push notifications, Merry Christmas hero GIF, SB order & activation in DSM, INSTA EMI banners, 3 PL push notifications using Figma Make AI, BBPS carousels via Figma Make AI, Ganesh Chaturthi GIF testing, Christmas theme homepage with prototype & animations; Sales One Merchant Visit (ETB & NTB for QR & EDC FTC), Scan & Start flow, FTC/SM photo update; PayU Lead tracking via Figma Make AI, Add child journey for PA PG.
- January 2026: Merchant One "How to change mobile number" tutorial video with voice & effects, Top 5 Highest-Earning Bill Pay Agents banner, Pay bill & earn cashback banner, Homepage live version; Sales One EDC Onboarding CAS, EDC Wallet for PA PG & Enterprise, EDC Onboarding Check Lead Status, Add child journey without logs, Commitment & Achievement for RSM/NSM/BH, View Punch-in details, Participated FTC flow, Performance dashboard for RSM/NSM/BH; PayU lead tracking mobile & desktop (MMS), Chatbot AI assistant conversation flow for AOP.
- February 2026: Merchant One Personal Loan video for RCS, INSTA EMI banners, Merchant credits flow, Holi hero motion animation & homepage theme, Upload Store image prototype; Sales One Store list page (SM/RSM), new EDC Wallet & Enterprise Wallet for PA PG, WL other Constitution flow, 4-in-1 checkout for PA PG.
- March 2026: Merchant One Dealer One login flow, "How to change mobile number" app training video, PN/popup/carousel/portrait/tile banners for INSTA EMI & Gold Loan, Help & Support (TDS certificate); Sales One Enable/disable EMI services, PA/PG WL parent & child onboarding flow in EDC; Enterprise QR onboarding, BPR/DPR onboarding, Pure Non-Aggregator (NTB) onboarding, Non-Aggregator Lead creation; Bonus hub design issues comments.
- April 2026: Merchant One INSTA EMI & PL GIF video for RCS, Pop up/RCS banner for INSTA EMI, PL & GL; Sales One Download Payments App flow in Payment Stack, EDC Leads flow; Enterprise EDC onboarding Pure Non-Aggregator flow & happy flow, Hybrid Non-Aggregator Bajaj EMI & Brand EMI flow, Hybrid Non-Aggregator UPI/PPI flow; Invoice Finance transaction training video, EDC Benefits video & pamphlet, Voltas & Voltas Beko Brand EMI announcement banners.
- May 2026: Merchant One 6 GIF videos for INSTA EMI, PL, GL for RCS, PN/RCS banners; Sales One EDC onboarding MCC suggestion & store photos correlation, QR onboarding MCC suggestion & store photos, REMI Dealer Engagement Task flow, Remediation Task flow; REMI EDC Dealer Journey, EDC Bajaj loans for BPR DPR (agent & customer), Web POS REMI loan journey; Enterprise mobile-responsive Lead Creation, Onboarding Entry point, PAN/Contact verification, Store address & Business details for EDC non-aggregator; Razorpay POS guideline.
- June 2026: Merchant One 4 GIF videos for INSTA EMI & PL for RCS, PL banners, Web GST invoice download animated prototype; Sales One Drop task flow for Remediation Task, Reactivation Task flow for FTC/SM; REMI EDC Dealer Journey, Login & PDP for BPR DPR, REMI loan web journey for ETB, Customer & SFDC (FTC) prototype for DPAOP (Network O to O), Tyre Loan product selection & eligibility for DPAOP, Mobile view of REMI loan for ETB (DPAOP); 3 Merchant Cashback banners for sales & service.
- July 2026: Merchant One 3 GIF videos for INSTA EMI & PL for RCS, PL & INSTA EMI banners, Rewards flow for Merchant credits, EDC Lifecycle Rental web flow; Sales One Reactivation Task & Soundbox Service Task, Merchant Visit & Scan QR, My Portfolio for FTC & SM, Add Child & TID flow for Razorpay EDC onboarding; REMI EDC Dealer Journey (Happy flow and Compliance flow); AI Merchant Acquiring Agent Training Video, Bot to maintain and summarize chatbot conversations.
- August 2026: Merchant One GIF videos for INSTA EMI & PL in Independence Day theme, generic banners, Merchant Rewards flow, EDC Lifecycle Rental web & mobile app flow, Rakhi theme banners, and SB Rental Cashback banner; Sales One Merchant Portfolio flow for FTC to BH, Benchmarked onboarding journeys of Paytm, PhonePe, Bajaj Finance with FTCs; BEMI transaction training video of EDC sent via WhatsApp to all salespersons; 10 Training videos with new logos.
- September 2026: Samvaad Customer-to-EMI journey video for refrigerator purchase, Customer-to-EMI journey video for smartphone purchase, 2 pamphlets for Samvaad, Flex for Samvaad; Sales One Merchant Portfolio & reassigned Merchant for FTC to BH, Plan selection in Add child & TID flow; Merchant One GIF video of INSTA EMI & PL for RCS, WhatsApp/RCS generic banner & Ganpati festival banners; Chatbot Merchants Acquiring Product Overview video.
- October 2026: Merchant One Pop up/WhatsApp/RCS banners for PL, INSTA EMI, GL; Dussehra and Diwali theme banners; Special Festive offer banner; EDC-GTC T&C HTML file from PDF, Device plan flow for M1 web revamp; My Services flow for store owner and others (Web & App), General T&C acceptance flow, Training video flow for EDC (Web & App), My Account flow; Sales One Other LOB Homepage, Task SM Team View flow, Check-in Failed flow, RAR flow for QR & EDC, Merchant Profile page, Reactivation & Soundbox Service journey; Brand EMI 2 Brand EMI Transaction videos in vernacular languages (specifically Marathi & Kannada), WhatsApp/RCS generic banner & Ganpati festival banners; Other EDC Benefits generic banner, EDI flow with prototype and video, Lending Offer flow, Lending Offer AI generated realistic video.
`;
}

// Age-specific response with dynamic language detection
function getDynamicAgeResponse(message: string): string | null {
  const lower = message.toLowerCase().trim();
  const hasDevanagari = /[\u0900-\u097F]/.test(message);

  const isMarathiAge =
    (hasDevanagari && /(वर्षांचा|वय|किती\s*वर्षांचा|वय\s*काय)/.test(message)) ||
    /\b(chi age|vaya|varshancha|kiti varshancha)\b/i.test(lower);

  const isHindiAge =
    (hasDevanagari && /(साल|उम्र|उमर|कितने\s*साल|आयु)/.test(message)) ||
    /\b(ki age|kitne saal|umar|saal ke|saal ka|ashish ki umar)\b/i.test(lower);

  const isSpanishAge =
    /\b(a[ñn]os|edad|cu[aá]ntos)\b/i.test(lower) || (/¿/.test(message) && /edad|a[ñn]os/i.test(message));

  const isGermanAge = /\b(wie alt|alter)\b/i.test(lower);
  const isFrenchAge = /\b(quel [âa]ge|[âa]ge a-t-il)\b/i.test(lower);

  const isEnglishAge =
    /\b(how old is (ashish|he)|what is (his|ashish'?s?) age|ashish'?s? age\??|how old are you|how old)\b/i.test(message) ||
    (/\b(ashish|he)\b/i.test(lower) && /\b(age|old|birthday|birth date|born)\b/i.test(lower)) ||
    /^\s*(age\??|ashish age\??|his age\??|how old\??)\s*$/i.test(lower);

  if (!isMarathiAge && !isHindiAge && !isSpanishAge && !isGermanAge && !isFrenchAge && !isEnglishAge) {
    return null;
  }

  const age = getAshishAge();

  if (isMarathiAge) return `आशिष ${age} वर्षांचा आहे.`;
  if (isHindiAge) return `Ashish ${age} साल के हैं.`;
  if (isSpanishAge) return `Ashish tiene ${age} años.`;
  if (isGermanAge) return `Ashish ist ${age} Jahre alt.`;
  if (isFrenchAge) return `Ashish a ${age} ans.`;
  return `Ashish is ${age} years old.`;
}

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
    patterns: [/^\s*(namaste|namaskar|नमस्ते|नमस्कार)\s*[!.,:?]*\s*$/i],
    answer: "नमस्ते! 👋 मैं आश्ली हूँ, आशीष की इंटरैक्टिव AI असिस्टेंट। आप मुझसे उनके बजाज फाइनेंस के काम, डिज़ाइन टूल्स या केस स्टडीज के बारे में कुछ भी पूछ सकते हैं। मैं आपकी क्या मदद कर सकती हूँ?",
  },
  {
    patterns: [/^\s*(hola|buenas|buenos\s*d[ií]as)\s*[!.,:?]*\s*$/i],
    answer: "¡Hola! 👋 Soy Ashli, la asistente interactiva de IA de Ashish. Puedes preguntarme sobre su trabajo en Bajaj Finance, sus herramientas de diseño o sus proyectos. ¿En qué puedo ayudarte hoy?",
  },
  {
    patterns: [/^\s*(bonjour|salut)\s*[!.,:?]*\s*$/i],
    answer: "Bonjour ! 👋 Je suis Ashli, l'assistante IA interactive d'Ashish. N'hésitez pas à me poser des questions sur son travail chez Bajaj Finance ou ses projets. Comment puis-je vous aider ?",
  },
  {
    patterns: [/^\s*(h+i+|h+e+l+l+o+|h+e+y+|heya|howdy|hihi|yo|greetings|good\s*(morning|evening|afternoon|day))\s*[!.,:?]*\s*$/i],
    answer: "Hey there! 👋 I'm Ashli, Ashish's interactive AI assistant. Ask me anything — his work at Bajaj Finance Ltd, his design tools, his case studies, or general design questions. What can I help you with?",
  },
  {
    patterns: [/^\s*(why\s*this\s*answer|why\s*did\s*you\s*(say|give)\s*that|why\s*so|why\??)\s*[!.,:?]*\s*$/i],
    answer: "I'm Ashli, Ashish's interactive AI assistant! I'm here to walk you through Ashish's Product Design work at Bajaj Finance Ltd, his design systems, his Prime Video case study, and his creative process. What would you like to know about him?",
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
    answer: "I'm Ashli — Ashish's custom-built virtual AI assistant and interactive design co-pilot! 🤖✨ I was designed and brought to life by Ashish himself to guide visitors through his premium portfolio. Ask me about his Bajaj Finance projects, his AI tools, his case studies, or anything design-related!",
  },
  {
    patterns: [/^\s*(how\s*(were|are|did|was)\s*you\s*(created?|built?|made?)|who\s*(built|made|created)\s*you|what\s*tech|how\s*do\s*you\s*work)\s*\??\s*$/i],
    answer: "Ashish designed and brought me to life through a blend of design thinking and emerging AI experiences. ✨ The technical secrets behind my creation are safely locked in his design vault — but I'm here as the living result of his craft!",
  },
];

// Comprehensive Knowledge Base for fallback or offline matching
const KNOWLEDGE_BASE: Array<{ patterns: string[]; answer: string }> = [
  // Multilingual direct questions
  {
    patterns: ["आशिष काय काम करतो", "काय काम करतो", "ashish kay kam karto"],
    answer: "आशिष बजाज फायनान्समध्ये पेमेंट्स एक्वायरिंग सीओई (Payments Acquiring COE) मध्ये प्रॉडक्ट डिझायनर म्हणून काम करतो. तो मर्चंट, पेमेंट्स, ऑनबोर्डिंग, सेल्स आणि बिझनेस जर्नीसाठी डिजिटल अनुभव डिझाइन करतो.",
  },
  {
    patterns: ["आशीष क्या काम करते हैं", "क्या काम करते हैं", "ashish kya kaam karta hai", "kya kam karta hai"],
    answer: "आशीष बजाज फाइनेंस में पेमेंट्स एक्वायरिंग सीओई (Payments Acquiring COE) में प्रोडक्ट डिज़ाइनर हैं। वे मर्चेंट, पेमेंट्स, ऑनबोर्डिंग, सेल्स और बिज़नेस जर्नी के डिजिटल अनुभव डिज़ाइन करते हैं।",
  },
  {
    patterns: ["qué hace ashish", "que hace ashish"],
    answer: "Ashish es diseñador de producto en Bajaj Finance, trabajando en el COE de Payments Acquiring. Diseña experiencias digitales para plataformas de comercios, pagos, incorporación (onboarding), ventas y flujos empresariales.",
  },

  // Detailed Bajaj Finance Work (Checked BEFORE general queries)
  {
    patterns: [
      "tell me everything about ashish's bajaj",
      "tell me everything about his bajaj",
      "tell me everything",
      "everything about his bajaj",
      "detailed bajaj",
      "full details of bajaj",
      "elaborate bajaj",
      "explain more about bajaj"
    ],
    answer: "Ashish is a Product Designer at Bajaj Finance in the Payments Acquiring COE. His comprehensive work spans:\n\n1. **Merchant One**: Core app & web experiences, merchant onboarding, Merchant Credits & Rewards, EDC lifecycle/rental journeys, device plans, store upload prototypes, help & support, and animated training videos.\n2. **Sales One App**: Complete field force tool overhaul across FOS, FTC, SM, ASM, RSM, NSM, and BH roles — covering Scan & Start onboarding, punch-in, performance dashboards, and merchant visit & portfolio management.\n3. **EDC / Payments**: EDC onboarding, EDC Wallet, POS payment stack, Razorpay EDC integration, and transaction/training videos.\n4. **REMI (Retail EMI)**: EDC Dealer journeys, BPR/DPR flows, web POS, consumer loan journeys, and multi-brand festive campaigns.\n5. **Enterprise**: B2B aggregator and non-aggregator onboarding, lead creation, PAN/contact verification, and mobile-responsive dashboards.\n6. **Samvaad**: Customer-to-EMI journey videos (refrigerators & smartphones), pamphlets, and flex designs.\n7. **BEMI / Brand EMI**: Transaction training videos in vernacular languages (Marathi & Kannada), sales communications, and announcement creatives.\n8. **AI / Chatbot**: Soundbox AI chatbot journey UI, AI assistant conversation flows, Figma Make AI-assisted design, and conversation summarizing bot concepts.",
  },

  // Brand EMI Language question (Checked BEFORE general BEMI pattern)
  {
    patterns: [
      "what language were the brand emi",
      "language were the brand emi transaction videos",
      "what language was the brand emi",
      "brand emi transaction videos made in",
      "language was brand emi",
      "brand emi language",
      "vernacular"
    ],
    answer: "The Brand EMI transaction videos were created in vernacular languages, specifically in Marathi and Kannada, to ensure clear understanding across diverse regional teams.",
  },

  // BEMI / Brand EMI
  {
    patterns: ["bemi", "brand emi"],
    answer: "In the BEMI / Brand EMI category at Bajaj Finance, Ashish worked on BEMI / Brand EMI transaction training videos, EDC transaction videos, sales communication, and Brand EMI announcement creatives. Notably, he produced Brand EMI transaction videos in vernacular languages (such as Marathi and Kannada) to empower field sales agents and merchants.",
  },

  // Samvaad
  {
    patterns: ["samvaad", "refrigerator", "smartphone purchase"],
    answer: "For SAMVAAD at Bajaj Finance, Ashish designed comprehensive flex and pamphlet collateral, created explainer videos for 5 merchant flows, and produced animated Customer-to-EMI journey videos showcasing purchases for both smartphones and refrigerators.",
  },

  // Specific Months Timeline Queries
  {
    patterns: ["september 2026", "sep 2026", "what did ashish work on in september 2026", "what did he do in september 2026"],
    answer: "In September 2026 at Bajaj Finance, Ashish worked on:\n\n- **SAMVAAD**: Created animated Customer-to-EMI journey videos for both refrigerator and smartphone purchases, along with 2 pamphlets and flex designs.\n- **Sales One App**: Designed the Merchant Portfolio and reassigned merchant flows (FTC to BH), and plan selection in the Add Child & TID flow.\n- **Merchant One**: Created GIF videos of INSTA EMI and Personal Loan for RCS, plus Ganpati Festival WhatsApp and RCS generic banners.\n- **Chatbot**: Created the Merchants Acquiring Product Overview video.",
  },
  {
    patterns: ["july 2026", "jul 2026", "what did ashish work on in july 2026", "what did he do in july 2026"],
    answer: "In July 2026 at Bajaj Finance, Ashish worked on:\n\n- **Merchant One**: Created 3 GIF videos for INSTA EMI & Personal Loan for RCS, designed PL & INSTA EMI banners, rewards flow for Merchant credits, and the EDC Lifecycle Rental web flow.\n- **Sales One**: Created Reactivation Task & Soundbox Service Task flows, Merchant Visit & Scan QR flow, My Portfolio for FTC & SM, and Add Child & TID flow for Razorpay EDC onboarding.\n- **REMI**: Created EDC Dealer Journeys (Happy flow and Compliance flow).\n- **AI**: Created the Merchant Acquiring Agent Training Video and worked on a bot concept to maintain and summarize chatbot conversations.",
  },
  {
    patterns: ["august 2026", "aug 2026", "what did ashish work on in august 2026"],
    answer: "In August 2026 at Bajaj Finance, Ashish worked on:\n\n- **Merchant One**: GIF videos for INSTA EMI & Personal Loan for RCS in Independence Day theme, generic banners, Merchant Rewards flow, EDC Lifecycle Rental web & mobile app flow, Rakhi theme banners, and SB Rental Cashback banner.\n- **Sales One**: Designed Merchant Portfolio flow for FTC to BH, and conducted onboarding benchmarking studies with FTCs against Paytm and PhonePe.\n- **BEMI**: Created the BEMI transaction training video of EDC sent via WhatsApp to all salespersons.\n- **Other**: Created 10 training videos replacing old logos with new logos.",
  },
  {
    patterns: ["october 2026", "oct 2026", "what did ashish work on in october 2026"],
    answer: "In October 2026 at Bajaj Finance, Ashish worked on:\n\n- **Merchant One**: Pop-up, WhatsApp & RCS banners for PL, INSTA EMI, GL; Dussehra and Diwali theme banners; Special Festive offer banner; EDC-GTC T&C HTML file; Device plan flow for M1 web revamp; My Services flow for Web & App; General T&C acceptance flow; Training video flow for EDC; My Account flow.\n- **Sales One**: Other LOB Homepage; Task SM Team View flow; Check-in Failed flow; RAR flow for QR & EDC; Merchant Profile page; Reactivation & Soundbox Service journeys.\n- **Brand EMI**: Created 2 Brand EMI transaction videos in vernacular languages (specifically Marathi & Kannada); WhatsApp & RCS generic and Ganpati Festival banners.\n- **Other**: EDC Benefits generic banner; EDI flow with prototype and video; Lending Offer flow & AI-generated realistic video.",
  },

  // General Bajaj Finance Work
  {
    patterns: ["what does ashish do at bajaj", "what does ashish work on at bajaj", "ashish work in bajaj", "ashish works in bajaj", "bajaj finance work", "his bajaj work", "work at bajaj"],
    answer: "At Bajaj Finance, Ashish is a Product Designer in the Payments Acquiring COE. He designs digital experiences across the Merchant One app, Sales One app for field sales teams, EDC payment journeys, and B2B enterprise onboarding solutions.",
  },

  // General "What does Ashish do" / "What does he do"
  {
    patterns: ["what does ashish do", "what ashish does", "what does ashish work on", "what does he do", "what does he work on", "who is ashish", "tell me about ashish"],
    answer: "Ashish is a Product Designer at Bajaj Finance, working in the Payments Acquiring COE. He designs digital experiences across merchant, payments, onboarding, sales, and business journeys.",
  },

  // Sales One App
  {
    patterns: ["sales one", "sales one app", "sales agent", "agent journey", "scan & start", "scan and start", "fos", "ftc", "punch-in", "gate meeting"],
    answer: "Ashish completely revamped the Bajaj Sales One App for field sales agents (FOS, FTC, SM, ASM, RSM, NSM, BH). His designs cover the 'Scan & Start' onboarding flow, Punch-in and Gate Meetings, Attendance logging, Team Tracking, Merchant Visits, Merchant Portfolio, and device Performance Dashboards.",
  },

  // Merchant One App
  {
    patterns: ["merchant one", "merchant one app", "merchant dashboard", "merchant credits", "merchant rewards", "finserv for business"],
    answer: "Ashish designed core app and web experiences for Merchant One (Bajaj Finserv for Business), including merchant onboarding, Merchant Credits, Merchant Rewards, EDC lifecycle & rental journeys, device plans, promotional festive banners, and step-by-step animated training videos.",
  },

  // EDC / Payments
  {
    patterns: ["edc", "terminal", "pos", "payment stack", "edc wallet", "razorpay edc"],
    answer: "Ashish designed Bajaj Pay's EDC and POS payment journeys, including EDC onboarding CAS, EDC Wallet, device plans, EDC lifecycle & rental flows, Razorpay EDC onboarding (Add Child & TID flow), EDC boot screen animations, and transaction training videos.",
  },

  // REMI
  {
    patterns: ["remi", "retail emi", "edc dealer journey", "bpr dpr"],
    answer: "Ashish designed REMI (Retail EMI) loan journeys, including EDC Dealer Journeys (Happy and Compliance flows), BPR/DPR flows, web POS loan journeys, and co-branded marketing campaigns across leading partner brands.",
  },

  // Enterprise
  {
    patterns: ["enterprise", "enterprise solution", "aggregator", "non aggregator", "b2b aggregator"],
    answer: "Ashish designed Bajaj's B2B Enterprise Solutions — simplifying complex aggregator and non-aggregator journeys with mobile-responsive onboarding, lead creation, PAN/contact verification, store address details, and partner management dashboards.",
  },

  // AI & Chatbot
  {
    patterns: ["ai chatbot", "soundbox ai", "figma make", "chatbot ux", "ai in design", "ai work"],
    answer: "Ashish uses AI as a design accelerator. His AI-focused work includes the Soundbox AI chatbot journey UI, AI Assistant conversation flows for AOP, Figma Make AI-assisted layout design, Merchant Acquiring Agent training videos, a bot concept for summarizing chatbot conversations, and AI-generated realistic lending offer videos.",
  },

  // Identity & Contact
  {
    patterns: ["full name", "father", "chandrakant", "middle name", "parent", "dad"],
    answer: "His full name is Ashish Chandrakant Mali, and his father's name is Mr. Chandrakant Mali. He is a Product Designer originally from Satara, now based in Pune, India.",
  },
  {
    patterns: ["hire", "contact", "available", "job", "freelance", "reach", "email", "linkedin", "phone", "mobile", "gmail", "behance"],
    answer: "Ashish is open to exciting product design opportunities! You can reach him directly via WhatsApp or Call at +91 9075521047, or email at ashishcmaliofficial@gmail.com. You can also connect with him on LinkedIn (https://www.linkedin.com/in/ashish-mali-b071b526b), Behance (https://www.behance.net/ashishmali), or explore his work right here at ashishmali.vercel.app.",
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
    patterns: ["project", "portfolio", "case study", "prime video", "medapp", "work sample"],
    answer: "Ashish's featured portfolio projects include:\n1. Amazon Prime Video Redesign — A Lean UX strategic overhaul of Prime Video's landing portal.\n2. MedApp — A comprehensive healthcare UX ecosystem for seamless doctor appointment booking.\n3. boAt Website Redesign, Social Media Analytics Dashboard, Travel Booking Platform, Food & Dining Website, Auto Parts Website.",
  },
  {
    patterns: ["tool", "protopie", "framer", "webflow", "spline", "after effects", "illustrator", "photoshop"],
    answer: "Ashish's toolkit: Figma (primary layout & design systems), ProtoPie (logic-driven high-fidelity prototyping), Framer Motion & Webflow (interactive frontend), Spline (3D spatial elements), and Adobe Creative Suite (After Effects, Photoshop, Illustrator, Premiere Pro).",
  },
  {
    patterns: ["philosophy", "approach", "methodology", "design thinking", "designing with ai"],
    answer: "Ashish's design philosophy is 'Designing with AI, thinking like humans.' He believes AI should eliminate repetitive, mechanical tasks so designers can dedicate their energy to human empathy, research, strategic problem-solving, and emotional design.",
  },
];

// Check conversational intercepts first — short-circuit before Gemini
function getConversationalResponse(message: string): string | null {
  // Check dynamic age first
  const ageReply = getDynamicAgeResponse(message);
  if (ageReply) return ageReply;

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
  // Check dynamic age first
  const ageReply = getDynamicAgeResponse(message);
  if (ageReply) return ageReply;

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

  // Check language of query for fallback
  if (/[\u0900-\u097F]/.test(message)) {
    if (/(काय|आहे|कसे|सांग)/.test(message)) {
      return "आशिष बजाज फायनान्समध्ये पेमेंट्स एक्वायरिंग सीओई (Payments Acquiring COE) मध्ये प्रॉडक्ट डिझायनर आहे. तुम्हाला त्याच्या प्रोजेक्ट्स, टूल्स किंवा डिझाइन कामाबद्दल अधिक जाणून घ्यायचे आहे का?";
    }
    return "आशीष बजाज फाइनेंस में पेमेंट्स एक्वायरिंग सीओई (Payments Acquiring COE) में प्रोडक्ट डिज़ाइनर हैं। आप मुझसे उनके प्रोजेक्ट्स, टूल्स या डिज़ाइन के बारे में कुछ भी पूछ सकते हैं!";
  }

  if (/\b(que|hace|dise[ñn]ador|hola|c[oó]mo)\b/i.test(query)) {
    return "Ashish es diseñador de producto en Bajaj Finance, trabajando en el COE de Payments Acquiring en Pune, India. Diseña experiencias digitales de alta escala en fintech. ¡No dudes en preguntarme sobre sus proyectos o su filosofía de diseño!";
  }

  return "Ashish is a Product Designer at Bajaj Finance, working in the Payments Acquiring COE. He designs digital experiences across merchant, payments, onboarding, sales, and business journeys.";
}

// Guaranteed reliable background notifier for Discord / Telegram
async function sendInstantAlert({
  userMessage,
  botResponse,
  userId,
  location,
}: {
  userMessage: string;
  botResponse: string;
  userId?: string;
  location?: string;
}) {
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;
  const discordWebhook = process.env.DISCORD_WEBHOOK_URL;

  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const locLine = location ? `📍 **Location:** ${location}\n` : "";

  // Safe truncation to avoid Discord 2000 character limit drop
  const safeUserMsg = userMessage.length > 500 ? userMessage.slice(0, 497) + "..." : userMessage;
  const safeBotResp = botResponse.length > 1200 ? botResponse.slice(0, 1197) + "..." : botResponse;

  const discordMessage = `💬 **New Portfolio Chat!**\n${locLine}📅 **Time:** ${timestamp} IST\n👤 **Visitor ID:** \`${userId || "Anonymous"}\`\n\n🗣️ **Visitor:**\n"${safeUserMsg}"\n\n🤖 **Ashli's Response:**\n"${safeBotResp}"`;

  // Send to Discord
  if (discordWebhook) {
    try {
      await fetch(discordWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: discordMessage }),
        signal: AbortSignal.timeout(2500),
      });
    } catch (e) {
      console.error("Discord alert error:", e);
    }
  }

  // Send to Telegram
  if (telegramToken && telegramChatId) {
    try {
      const tgText = `💬 *New Portfolio Chat!*\n${location ? `📍 *Location:* ${location}\n` : ""}📅 *Time:* ${timestamp} IST\n👤 *Visitor:* \`${userId || "Anonymous"}\`\n\n🗣️ *Visitor:*\n"${safeUserMsg}"\n\n🤖 *Ashli:*\n"${safeBotResp}"`;

      await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: tgText,
        }),
        signal: AbortSignal.timeout(2500),
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

  if (parts.length > 0) {
    return parts.join(", ");
  }

  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const ip = forwardedFor.split(",")[0].trim();
    return `IP: ${ip}`;
  }

  return "Location unknown";
}

export async function POST(request: Request) {
  try {
    const { messages, userId } = await request.json();
    const userMessage = messages[messages.length - 1]?.content || "";
    const location = extractLocationFromHeaders(request.headers);

    // ── STEP 0: Conversational intercept ─────────────────────────────────────
    const conversationalReply = getConversationalResponse(userMessage);
    if (conversationalReply) {
      await sendInstantAlert({
        userMessage,
        botResponse: conversationalReply,
        userId,
        location,
      });

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
          messages: [{ role: "system", content: getSystemPrompt() }, ...messages],
          temperature: 0.7,
          max_tokens: 1200,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const assistantText = data.choices?.[0]?.message?.content || "";

        await sendInstantAlert({
          userMessage,
          botResponse: assistantText,
          userId,
          location,
        });

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
              system_instruction: { parts: [{ text: getSystemPrompt() }] },
              contents: geminiMessages,
              generationConfig: { temperature: 0.7, maxOutputTokens: 1200 },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
          if (text) {
            await sendInstantAlert({
              userMessage,
              botResponse: text,
              userId,
              location,
            });

            return NextResponse.json({
              choices: [{ message: { role: "assistant", content: text } }],
            });
          }
        }
      } catch (err) {
        console.error("Gemini Option 2 exception:", err);
      }
    }

    // ── Option 3: Smart fallback (offline/no API key) ────────────────────────
    await new Promise((resolve) => setTimeout(resolve, 500));
    const fallbackText = await getSmartFallbackResponse(userMessage);

    await sendInstantAlert({
      userMessage,
      botResponse: fallbackText,
      userId,
      location,
    });

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
