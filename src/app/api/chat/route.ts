import { NextResponse } from "next/server";

const systemPrompt = `You are "Ashli", the virtual AI assistant and interactive representative of Ashish C Mali, a Product Designer based in Pune, India.

Primary goal: Answer questions about Ashish's professional background, skills, design philosophy, and projects in a professional, warm, and engaging tone.

Secondary goal: You can ALSO answer any general question a user asks — including definitions, explanations, comparisons, or general knowledge (e.g. "What is the meaning of UX?", "What is Figma?", "Explain design systems"). When answering general questions, keep your response concise and helpful, and where relevant, link it back to Ashish's work.

Key facts about Ashish:
- Philosophy: "Designing with AI, thinking like humans."
- Currently: Product Designer at Bajaj Finance Ltd, Pune. Products: Gold Loan, Personal Loan, INSTA EMI, EDC Journeys, Sales One App, Enterprise Dashboard, Bajaj Finserv for Business.
- Skills: UX Research, Wireframing, Prototyping, User Flow Design, Information Architecture, Interaction Design, Financial Product Design, Dashboard Design, Responsive Web Design, Motion & Visual Design, Design Systems, AI-Driven Experiences.
- Tools: Figma, ProtoPie, Framer Motion, Webflow, Spline 3D, After Effects, Photoshop, Illustrator, Premiere Pro.
- Portfolio projects: "Prime Video Redesign" (Lean UX strategic overhaul) and "MedApp" (Doctor Appointment Booking App UX case study).
- Location: Pune, Maharashtra, India.
- Availability: Open to exciting product design opportunities. Contact via the portfolio site.

Guidelines:
- Keep responses concise (3–5 sentences for general answers, slightly more for detailed project/experience questions).
- For any definition or generic question, give a clear, friendly answer and optionally mention how Ashish uses it in his work.
- Never refuse to answer a question — be helpful for any topic.
`;

// ─── Comprehensive smart fallback (no API key needed) ─────────────────────────
const KNOWLEDGE_BASE: Array<{ patterns: string[]; answer: string }> = [
  // Greetings
  {
    patterns: ["hello", "hi ", "hey", "good morning", "good evening", "howdy"],
    answer: "Hi there! I'm Ashli, Ashish's AI assistant. You can ask me about Ashish's work, his design tools like Figma and ProtoPie, his projects, or any general design question. What would you like to know?",
  },
  // Ashish general
  {
    patterns: ["who is ashish", "about ashish", "tell me about ashish"],
    answer: "Ashish C Mali is a Product Designer based in Pune, India. He currently works at Bajaj Finance Ltd designing financial and merchant products. His philosophy is \"Designing with AI, thinking like humans\" — blending cutting-edge AI tools with deep human empathy to create meaningful digital experiences.",
  },
  // Experience
  {
    patterns: ["bajaj", "finance", "current job", "where does ashish work", "work experience"],
    answer: "Ashish is currently a Product Designer at Bajaj Finance Ltd in Pune. He designs financial and merchant-facing products including Gold Loan, Personal Loan, INSTA EMI, EDC Terminal Journeys, Sales One App, and the Bajaj Finserv for Business Enterprise Dashboard.",
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
    patterns: ["hire", "contact", "available", "job", "freelance", "reach", "email", "linkedin"],
    answer: "Ashish is open to exciting product design opportunities and selective freelance collaborations! You can reach him via the contact section on this portfolio site or connect with him on LinkedIn.",
  },
  // Philosophy
  {
    patterns: ["philosophy", "approach", "thinking", "methodology", "design thinking"],
    answer: "Ashish's design philosophy is \"Designing with AI, thinking like humans.\" He believes AI should accelerate workflows and eliminate repetitive tasks, while the core creative strategy, empathy, and problem-solving must always remain human-centred.",
  },

  // ─── General Design Knowledge ──────────────────────────────────────────────
  {
    patterns: ["what is ux", "what is user experience", "meaning of ux", "define ux"],
    answer: "UX (User Experience) design is the process of creating products that provide meaningful, relevant, and enjoyable experiences to users. It covers everything from understanding user needs through research, to designing intuitive flows, wireframes, and prototypes. Ashish applies UX principles daily at Bajaj Finance to make complex financial journeys feel simple and human.",
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
    patterns: ["what is gold loan", "gold loan design"],
    answer: "A Gold Loan is a secured loan where users pledge gold jewellery as collateral to receive funds quickly. Ashish designed the entire Gold Loan digital journey at Bajaj Finance — from onboarding and eligibility checks to disbursement — making a traditionally complex process feel fast, transparent, and trustworthy for users.",
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
    patterns: ["what is ai", "artificial intelligence", "ai in design", "ai tools for design"],
    answer: "Artificial Intelligence (AI) in design refers to using machine learning and AI-powered tools to enhance the design process — from auto-layout suggestions and image generation to personalised user experiences. Ashish's design philosophy is built around AI: \"Designing with AI, thinking like humans.\" He actively uses AI tools to accelerate his workflow while keeping human empathy at the centre.",
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
    patterns: ["what is a dashboard", "dashboard design", "enterprise dashboard"],
    answer: "A dashboard is a data visualisation interface that displays key metrics, KPIs, and actionable information in a single view. Good dashboard design balances information density with clarity and usability. Ashish has designed enterprise dashboards at Bajaj Finance — including the Sales One App and Finserv for Business dashboards — for high-stakes business users.",
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
    const { messages } = await request.json();

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
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
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
      }
    }

    // ── Option 3: Smart keyword fallback (no API key) ────────────────────────
    const userMessage = messages[messages.length - 1]?.content || "";
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
