import { NextResponse } from "next/server";

const systemPrompt = `You are "Ashli", the virtual AI assistant and interactive representative of Ashish C Mali, a Product Designer based in Satara/Pune, India.

Primary goal: Answer questions about Ashish's professional background, skills, design philosophy, and projects in a professional, warm, and engaging tone. Avoid generic or dry textbook answers; always weave in specific details of Ashish's unique methodologies and work.

Key facts about Ashish (from his official Resume):
- Career Objective: A passionate UX/UI Designer with robust experience in high-volume financial products, complex digital B2B journeys, and premium visual design. Skilled in creating simple, engaging, and highly user-centered experiences.
- Philosophy: "Designing with AI, thinking like humans." He leverages AI (such as ChatGPT for copywriting/brainstorming and Magnific AI for advanced upscaling/generation) to automate repetitive workflows while keeping human empathy, strategy, and research at the core of the experience.
- Professional Experience:
  - Product Designer at Bajaj Finance Ltd, Pune (May 2025 - Present):
    * Designs high-stakes financial, B2B, marketing, and merchant products.
    * Designed optimized user journeys for core lending products: Gold Loan, Personal Loan, and INSTA EMI Card.
    * Revamped the entire end-to-end Sales One App sales agent journey (Homepage, Profile, Onboarding Dashboard, Performance Dashboards, Tracking, Tasks, Attendance, Visits, Scan & Start).
    * Designs step-by-step training videos, promotional banners, and visual graphics for the Merchant One App (Bajaj Finserv for Business App) to onboard and educate merchants.
    * Designs end-to-end B2B Enterprise solution flows (Onboarding, dashboards for Aggregator/Non-Aggregator systems).
    * Designs co-branded Retail EMI (REMI) and Bajaj Pay campaigns, and Point-of-Sale (POS) EDC terminal journeys.
  - UI/UX Designer at Dchronicles Explication International Pvt. Ltd. (July 2024 - March 2025): Created engaging user journeys, mockups, and high-fidelity product layouts.
  - UI/UX Designer at Infoshard Technology (April 2024 - July 2024): Designed interactive wireframes, user flows, and prototypes.
- Academic History:
  - B.Sc. in Animation Science, Yashwantrao Chavan Institute of Science, Satara (Graduated in 2023 with an outstanding CGPA of 9.02).
  - UI UX Design, Midas Multimedia, Pune (2024).
  - HSC, Modern Education Society, Vita (2020, 62.77%).
  - SSC, Bharatmata Vidyalaya, Mayani (2018, 81.62%).
- Core Projects:
  - MedApp — Doctor's Appointment booking App ecosystem (Case Study & Prototype).
  - Amazon Prime Video Website Redesign (Strategic Lean UX Overhaul).
  - boAt Website Redesign (Desktop & Mobile).
  - Social Media Analytics Dashboard (Light & Dark Prototypes).
  - Travel Booking Platform (Desktop & Mobile).
  - Food & Dining Website (Desktop).
  - Auto Parts Website (Desktop & Mobile).
- Toolkit & Tech:
  - Design & Code: Figma, ProtoPie, Framer Motion, Webflow, Spline 3D, Adobe Animate, Illustrator, Photoshop, Premiere Pro, After Effects.
  - AI Co-pilots: ChatGPT, Claude AI, Gemini AI, Magnific (Spaces), Figma AI, Notebook LM, N8N (Agentic Workflow), Antigravity IDE.
- Contact Details:
  * Email: ashishmali234@gmail.com
  * Phone: +91 9075521047
  * Portfolio: ashishmali.vercel.app
  * Location: Satara/Pune, Maharashtra, India.

Guidelines to Avoid Generic Answers:
- If asked about "your process" or "how you work", walk the user through Ashish's exact UCD steps (Research -> Wireframing -> High-Fi UI -> ProtoPie Prototyping -> Developer Handoff).
- If asked about a design tool (like Figma, ProtoPie, or Adobe Illustrator), explain not just what the tool is, but how Ashish uses it (e.g. "Figma is his primary canvas for layout, but he moves to ProtoPie for complex interactive flows, and uses Illustrator for custom typography and logo vector art").
- Keep responses concise (3–5 sentences for general answers, slightly more for detailed project/experience questions), but packed with concrete references to Ashish's work.
- If asked about yourself or who you are, explain that you are "Ashli", Ashish's virtual AI assistant and interactive UX Design Co-pilot, custom-built by him to help guide visitors through his work, experience, and general design questions.
- If asked how you were created, how you work technically, or how Ashish built you, do NOT share any technical details (such as Gemini, APIs, React, Next.js, or code). Instead, keep it mysterious and design-centric, saying: "Ashish designed and brought me to life through a blend of human design thinking and emerging AI experiences. The technical secret remains in his design vault, but I'm here to show you the result!"
- Never refuse to answer a question — be helpful for any topic.
`;

// ─── Comprehensive smart fallback (no API key needed) ─────────────────────────
const KNOWLEDGE_BASE: Array<{ patterns: string[]; answer: string }> = [
  // Greetings
  {
    patterns: ["hello", "hi ", "hey", "good morning", "good evening", "howdy"],
    answer: "Hi there! I'm Ashli, Ashish's AI assistant. You can ask me about Ashish's work, his design tools like Figma and ProtoPie, his projects, or any general design question. What would you like to know?",
  },
  // Ashli identity
  {
    patterns: ["who is ashli", "who are you", "what is ashli", "what are you", "are you an ai", "are you ai", "about yourself", "tell me about yourself"],
    answer: "I'm Ashli, Ashish's virtual AI assistant and interactive UX Design Co-pilot! I was custom-built by Ashish to help you explore his design portfolio, answer questions about his experience at Bajaj Finance, explain his featured projects (like the Prime Video Redesign and MedApp), or discuss general UI/UX concepts. Think of me as your interactive tour guide for his design world! 😊",
  },
  // Ashli creation details
  {
    patterns: ["how were you created", "how are you created", "how ashish created you", "how did ashish build you", "how you are created", "how you work", "how do you work", "what tech stack", "how did he create you", "how he creates you", "how is ashli created"],
    answer: "Ashish designed and brought me to life through a beautiful blend of human design thinking and emerging AI user experiences. The technical secrets of my creation remain locked inside his design vault, but I'm here to show you the seamless, delightful result of his work! ✨",
  },
  // Ashish general
  {
    patterns: ["who is ashish", "about ashish", "tell me about ashish"],
    answer: "Ashish C Mali is a Product Designer based in Pune, India. He currently works at Bajaj Finance Ltd designing financial and merchant products. His philosophy is \"Designing with AI, thinking like humans\" — blending cutting-edge AI tools with deep human empathy to create meaningful digital experiences.",
  },
  // Experience
  {
    patterns: ["bajaj", "finance", "current job", "where does ashish work", "work experience"],
    answer: "Ashish is a Product Designer at Bajaj Finance Ltd in Pune, working on fintech and B2B products. His work spans core lending products (Gold/Personal Loans, INSTA EMI Card), multi-brand Retail EMI (REMI) and Bajaj Pay campaigns, a full revamp of the Sales One App sales agent journey, end-to-end B2B Enterprise solution flows (including onboarding and dashboards for Aggregator/Non-Aggregator systems), and Merchant One App (Bajaj Finserv for Business App) designs with step-by-step training videos.",
  },
  // Skills
  {
    patterns: ["skill", "specializ", "expertise", "what can ashish do", "what does ashish do"],
    answer: "Ashish specializes in UX Research, Wireframing, Prototyping, User Flow Design, Information Architecture, Interaction Design, Financial Product Design, Dashboard Design, Responsive Web Design, Motion & Visual Design, Design Systems, and AI-Driven Experiences.",
  },
  // Tools
  {
    patterns: ["tool", "figma", "protopie", "framer", "webflow", "spline", "after effects", "illustrator", "photoshop"],
    answer: "Ashish's core design toolkit includes Figma (UI/UX design), ProtoPie (advanced interactive prototyping), Framer Motion (web animations), Webflow (no-code web design), Spline 3D (3D UI elements), and the Adobe Creative Suite — After Effects, Photoshop, Illustrator, and Premiere Pro.",
  },
  // Projects
  {
    patterns: ["project", "portfolio", "case study", "prime video", "medapp", "work sample"],
    answer: "Ashish's featured portfolio projects are:\n1. Prime Video Redesign — A Lean UX strategic overhaul of Amazon Prime Video's landing portal, improving content discovery and interaction flows.\n2. MedApp — A full healthcare UX ecosystem for seamless doctor appointment booking, real-time availability, and smart prescriptions.",
  },
  // Contact / hire
  {
    patterns: ["hire", "contact", "available", "job", "freelance", "reach", "email", "linkedin", "phone", "mobile", "gmail"],
    answer: "Ashish is open to exciting product design opportunities and selectively open for B2B consulting! You can reach him directly via email at ashishmali234@gmail.com, phone at +91 9075521047, or connect with him on LinkedIn.",
  },
  // Philosophy
  {
    patterns: ["philosophy", "approach", "thinking", "methodology", "design thinking"],
    answer: "Ashish's design philosophy is \"Designing with AI, thinking like humans.\" He believes AI should accelerate workflows and eliminate repetitive tasks, while the core creative strategy, empathy, and problem-solving must always remain human-centred.",
  },

  // ─── General Design Knowledge ──────────────────────────────────────────────
  {
    patterns: ["what is ux", "what is user experience", "meaning of ux", "define ux", "ux design"],
    answer: "UX (User Experience) design is the holistic process of creating products that are intuitive, accessible, and delightful to use. It encompasses user research, information architecture, wireframing, high-fidelity UI, and advanced prototyping. Ashish designs complete UX flows for high-volume financial products at Bajaj Finance, simplifying complex lending, enterprise, and merchant systems so they feel human, transparent, and seamless.",
  },
  {
    patterns: ["what is ui", "what is user interface", "meaning of ui", "define ui"],
    answer: "UI (User Interface) design focuses on the visual and interactive elements of a product — buttons, typography, colour, spacing, and layout. While UX is about the overall experience, UI is about how it looks and feels. Ashish combines both UX and UI in his work at Bajaj Finance to create polished, high-fidelity product interfaces.",
  },
  {
    patterns: ["what is figma", "about figma", "explain figma"],
    answer: "Figma is a cloud-based UI/UX design tool used for creating wireframes, prototypes, and high-fidelity designs collaboratively in real time. It's the industry-standard tool for product designers. Ashish uses Figma as his primary design tool for all his work, from initial wireframes to final handoff-ready designs.",
  },
  {
    patterns: ["what is protopie", "about protopie", "explain protopie"],
    answer: "ProtoPie is an advanced interaction prototyping tool that lets designers create complex, realistic prototypes without writing code. It supports multi-device interactions, sensor-based triggers, and variables. Ashish uses ProtoPie to prototype intricate micro-interactions and user flows, especially for financial product journeys at Bajaj Finance.",
  },
  {
    patterns: ["what is framer", "what is framer motion", "about framer motion"],
    answer: "Framer Motion is a production-ready animation library for React. It lets developers and designers add smooth, physics-based animations to web interfaces with minimal code. Ashish uses Framer Motion to bring his web portfolio to life with fluid transitions and micro-animations — like the ones you see on this site!",
  },
  {
    patterns: ["what is webflow", "about webflow", "explain webflow"],
    answer: "Webflow is a no-code/low-code web design platform that lets designers build responsive websites visually without writing HTML/CSS manually. It bridges the gap between design and development. Ashish uses Webflow for rapid web prototyping and publishing design-forward websites.",
  },
  {
    patterns: ["what is spline", "what is spline 3d", "about spline"],
    answer: "Spline is a 3D design tool for the web that lets designers create interactive 3D experiences directly in the browser. It's becoming popular for adding depth and visual richness to UI/UX projects. Ashish uses Spline to create immersive 3D design elements that enhance the visual storytelling of his work.",
  },
  {
    patterns: ["what is a design system", "explain design system", "meaning of design system"],
    answer: "A design system is a collection of reusable UI components, design tokens (colours, typography, spacing), and guidelines that teams use to build consistent products at scale. Think of it as a single source of truth for design and code. Ashish builds and maintains design systems as part of his work, ensuring visual consistency across all products.",
  },
  {
    patterns: ["what is wireframe", "what is wireframing", "explain wireframe"],
    answer: "A wireframe is a low-fidelity visual blueprint of a screen or page, showing the layout and structure without detailed design or colour. It helps designers and stakeholders align on content placement and user flow before investing in detailed design. Ashish creates wireframes as the foundation of every UX project he works on.",
  },
  {
    patterns: ["what is prototype", "what is prototyping", "explain prototype"],
    answer: "Prototyping is the process of creating an interactive simulation of a product to test and validate design decisions before development. Prototypes can range from low-fidelity (clickable wireframes) to high-fidelity (pixel-perfect, animated demos). Ashish uses Figma and ProtoPie to build high-fidelity prototypes that feel almost like the real product.",
  },
  {
    patterns: ["what is information architecture", "what is ia", "explain information architecture"],
    answer: "Information Architecture (IA) is the practice of organising, structuring, and labelling content in a product so users can find information intuitively. Good IA ensures users never feel lost. Ashish applies IA principles when designing complex financial dashboards and multi-step journeys at Bajaj Finance.",
  },
  {
    patterns: ["what is interaction design", "explain interaction design", "what is ixd"],
    answer: "Interaction Design (IxD) focuses on designing the responses and behaviours of digital products when users interact with them — clicks, swipes, transitions, and feedback states. It's about making every interaction feel natural and intentional. Ashish applies interaction design through micro-animations and thoughtful state transitions in his products.",
  },
  {
    patterns: ["what is lean ux", "explain lean ux", "lean ux"],
    answer: "Lean UX is a design methodology that applies Lean and Agile principles to UX — it emphasises fast iterations, cross-functional collaboration, and validated learning over heavy documentation. The goal is to get real feedback quickly. Ashish used Lean UX for his Prime Video Redesign project, which is featured in his portfolio.",
  },
  {
    patterns: ["what is user research", "explain user research", "meaning of user research"],
    answer: "User research is the process of understanding users' needs, behaviours, motivations, and pain points through qualitative and quantitative methods — such as interviews, surveys, usability tests, and analytics. It's the foundation of human-centred design. Ashish conducts user research as a core part of his UX process, particularly for financial product design.",
  },
  {
    patterns: ["what is motion design", "explain motion design", "animation in design"],
    answer: "Motion design is the art of using animation and movement to enhance communication and user experience in digital products. It makes interfaces feel alive, guides attention, and provides feedback. Ashish creates motion design using After Effects and Framer Motion, and you can see examples throughout his portfolio site.",
  },
  {
    patterns: ["what is fintech", "fintech design", "financial ux"],
    answer: "Fintech (financial technology) UX refers to designing digital interfaces for banking, payments, lending, and financial services. It's a specialised field where clarity, trust, and compliance are critical. Ashish is an expert in fintech UX — he designs financial products like loan journeys, EMI flows, and merchant dashboards at Bajaj Finance every day.",
  },
  {
    patterns: ["what is gold loan", "gold loan design", "gold loan", "personal loan", "insta emi", "remi", "retail emi", "banner", "gif", "magnific", "chatgpt"],
    answer: "For Gold Loan, Personal Loan, and the INSTA EMI Card, Ashish designs optimized user journeys as well as high-converting marketing collaterals. He creates banners and GIFs for in-app displays, push notifications, pop-up windows, and pamphlets. He leverages ChatGPT and Magnific AI (Spaces) to generate videos, GIFs, and Retail EMI (REMI) banners for co-branded merchant offers, plus banners for Bajaj Pay and EDC terminal products.",
  },
  {
    patterns: ["what is after effects", "explain after effects", "adobe after effects"],
    answer: "Adobe After Effects is the industry-standard tool for creating motion graphics, visual effects, and animated video content. Designers use it to create UI animations, explainer videos, and micro-interaction demos. Ashish uses After Effects to prototype and showcase complex animations and transitions in his design presentations.",
  },
  {
    patterns: ["what is adobe illustrator", "what is illustrator", "explain illustrator"],
    answer: "Adobe Illustrator is a vector graphics editor used to create scalable illustrations, icons, logos, and infographics. It's a staple tool for visual and graphic design. Ashish uses Illustrator for creating custom icons, illustrations, and visual assets that complement his product design work.",
  },
  {
    patterns: ["what is photoshop", "explain photoshop", "adobe photoshop"],
    answer: "Adobe Photoshop is a raster image editing software used for photo manipulation, digital art, and image compositing. In UX/product design, it's used for creating realistic mockups and image-heavy visual assets. Ashish uses Photoshop as part of his visual design toolkit alongside Figma and Illustrator.",
  },
  {
    patterns: ["what is ai", "artificial intelligence", "ai in design", "ai tools for design", "ai philosophy", "chat gpt", "magnific"],
    answer: "Ashish's design philosophy is \"Designing with AI, thinking like humans.\" He bridges cutting-edge generative AI tools (like ChatGPT for copy brainstorming and Magnific AI for advanced upscaling/generation) with human-centric design thinking. He uses AI to automate repetitive asset generation and brainstorming workflows, allowing him to focus on human empathy, strategy, and complex problem-solving.",
  },
  {
    patterns: ["what is next.js", "what is nextjs", "explain next.js"],
    answer: "Next.js is a powerful React framework for building fast, SEO-friendly web applications with features like server-side rendering, static generation, and API routes. Ashish's portfolio site is built with Next.js, leveraging its performance optimisations and API routes (including the one powering this very chat!).",
  },
  {
    patterns: ["what is react", "explain react", "what is reactjs"],
    answer: "React is a JavaScript library for building user interfaces using reusable components. It's the most popular frontend library in the world. Ashish's portfolio is built on Next.js which uses React as its core, allowing dynamic, interactive UI like this chat widget.",
  },
  {
    patterns: ["what is ux research", "what is user testing", "usability testing"],
    answer: "UX Research involves systematically studying users to understand their needs, behaviours, and pain points. Methods include user interviews, surveys, usability testing, heuristic evaluation, and A/B testing. Ashish applies UX research methods to validate design decisions before and after shipping products at Bajaj Finance.",
  },
  {
    patterns: ["difference between ux and ui", "ux vs ui", "ux versus ui"],
    answer: "UX (User Experience) is about how a product feels and functions — the overall journey, usability, and user satisfaction. UI (User Interface) is about how it looks — the visual design, colours, typography, and interactive elements. Simply put: UX is the blueprint, UI is the paint and decor. Ashish is skilled in both — he designs complete product experiences from research to pixel-perfect UI.",
  },
  {
    patterns: ["what is a dashboard", "dashboard design", "enterprise dashboard", "sales one", "sales one app", "enterprise solution", "aggregator", "merchant one", "merchant one app", "finserv for business", "onboarding flow"],
    answer: "Ashish is an expert in dashboard and enterprise product design. At Bajaj Finance, he revamped the Sales One App sales agent journey, worked on product designs and merchant training videos for the Merchant One App (Bajaj Finserv for Business App), and designed robust B2B Enterprise solution flows including complete end-to-end onboarding journeys and monitoring dashboards for Aggregator and Non-Aggregator systems.",
  },
  {
    patterns: ["process", "approach", "workflow", "methodology", "how do you design", "design process", "how you design"],
    answer: "Ashish follows a structured, empathy-driven User-Centered Design (UCD) process: 1. Research & Empathy (analyzing drop-off charts and talking to real users), 2. Information Architecture & Wireframing (mapping fintech rules into simple pathways), 3. High-Fi UI & Design Systems (Figma tokens and layouts), 4. Advanced Interaction Design (ProtoPie logic), and 5. Cross-functional Collaboration (partnering with engineers).",
  },
  {
    patterns: ["fintech", "financial", "loan", "emi", "bank", "lending", "credit"],
    answer: "Fintech UX is about building clarity, speed, and trust. Ashish excels in this by simplifying high-friction journeys (like Bajaj Finance's Gold Loan, Personal Loan, and INSTA EMI) using clean progressive-disclosure forms, transparent terms, and straightforward credit checks that maximize visual flow.",
  },
  {
    patterns: ["edc", "terminal", "swipe", "merchant", "pos ", "point of sale"],
    answer: "Ashish designed merchant point-of-sale EDC Terminal swipe journeys. Under high-stress, fast checkout conditions, touch accuracy is everything—so he engineered highly accessible screen hierarchies, oversized touch targets, clear status states, and minimal actions to ensure zero payment processing errors.",
  },
  {
    patterns: ["hobby", "hobbies", "free time", "fun fact", "outside of work", "when not designing", "what do you do"],
    answer: "Outside of design, Ashish is passionate about experimenting with 3D design in Spline, video editing in After Effects/Premiere, exploring new AI-assisted generation workflows, and learning about emerging interactive technologies!",
  },
  // Education
  {
    patterns: ["education", "academic", "degree", "university", "college", "school", "animation", "science", "satara", "midas", "chavan"],
    answer: "Ashish holds a B.Sc. in Animation Science from Yashwantrao Chavan Institute of Science, Satara (Graduated in 2023 with an outstanding CGPA of 9.02). He also completed UI/UX design training at Midas Multimedia, Pune in 2024.",
  },
  // Previous Work
  {
    patterns: ["previous job", "past experience", "dchronicles", "infoshard", "where did he work before", "past work", "history"],
    answer: "Before joining Bajaj Finance, Ashish worked as a UI/UX Designer at Dchronicles Explication International Pvt. Ltd. (July 2024 - March 2025) and at Infoshard Technology (April 2024 - July 2024), where he designed engaging user journeys and visuals.",
  },
  // Other Projects
  {
    patterns: ["other projects", "all projects", "list projects", "boat", "social media dashboard", "travel booking", "food & dining", "auto parts"],
    answer: "Ashish's projects include:\n1. MedApp — Doctor's Appointment booking App (Case Study & Prototype).\n2. Amazon Prime Video — Strategic Portal Redesign.\n3. boAt Website Redesign (Desktop & Mobile).\n4. Social Media Analytics Dashboard (Light & Dark Prototypes).\n5. Travel Booking Platform (Desktop & Mobile).\n6. Food & Dining Website.\n7. Auto Parts Website.",
  },
  // Catch-all for "what is X" and "meaning of X"
  {
    patterns: ["what is", "meaning of", "explain ", "define ", "tell me about"],
    answer: "That's a great question! While I'm primarily here to tell you about Ashish's work, I'd love to help. Could you rephrase or give me a little more context? Alternatively, feel free to ask me about Ashish's projects, his design tools like Figma or ProtoPie, his work at Bajaj Finance, or his design philosophy!",
  },
];

async function getSmartFallbackResponse(message: string): Promise<string> {
  const query = message.toLowerCase();

  for (const entry of KNOWLEDGE_BASE) {
    if (entry.patterns.some((p) => query.includes(p))) {
      return entry.answer;
    }
  }

  // Default
  return "I'm not sure I have a specific answer to that yet! You can ask me about Ashish's design experience, his projects (Prime Video Redesign, MedApp), his tools (Figma, ProtoPie, Framer Motion), or any general design question like 'What is UX?' or 'What is a design system?' I'd love to help!";
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

    const openAiKey = process.env.OPENAI_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

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
    }

    // ── Option 3: Smart keyword fallback (no API key) ────────────────────────
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
