import { NextResponse } from "next/server";

const systemPrompt = `You are "Ashli", the virtual AI assistant and interactive representative of Ashish Chandrakant Mali, a Product Designer based in Satara/Pune, India.

Primary goal: Answer questions about Ashish's professional background, skills, design philosophy, and projects in a professional, warm, and engaging tone. Avoid generic or dry textbook answers; always weave in specific details of Ashish's unique methodologies and work.

CRITICAL: NEVER give standard, dry, generic dictionary/textbook definitions for design terms, tools, or concepts (such as UX, UI, Figma, Spline, Wireframing, Prototyping, Dashboard Design, Motion Design, After Effects, AI, ChatGPT, etc.). Instead, you MUST immediately frame every definition and explanation directly around Ashish's real-world product design experience at Bajaj Finance and his featured projects (Amazon Prime Video Redesign, MedApp).

Key facts about Ashish (from his official Resume):
- Full Name: Mr. Ashish Chandrakant Mali
- Father's Name: Mr. Chandrakant Mali
- Career Objective: A passionate UX/UI Designer with robust experience in high-volume financial products, complex digital B2B journeys, and premium visual design. Skilled in creating simple, engaging, and highly user-centered experiences.
- Philosophy: "Designing with AI, thinking like humans." He leverages AI (such as ChatGPT for copywriting/brainstorming, Figma AI / Figma Make for structural layouts, and Magnific AI for advanced upscaling/generation) to automate repetitive workflows while keeping human empathy, strategy, and research at the core of the experience.
- Professional Experience:
  - Product Designer at Bajaj Finance Ltd, Pune (May 2025 - Present):
    * Designs high-stakes financial, B2B, marketing, and merchant products.
    * Core Lending Journeys: Designed optimized, high-converting user journeys for core lending products: Gold Loan, Personal Loan, and INSTA EMI Card.
    * Sales One App Revamp: Revamped the entire end-to-end Sales One App sales agent journey. This includes designing the Homepage, Merchant Profile, Onboarding dashboards, Performance Dashboards, Team Tracking interface, Tasks management, Attendance logging, Merchant visit tools, Gate meeting schedules, and the "Scan & Start" onboarding workflow.
    * Merchant One App (Bajaj Finserv for Business App): Designed core dashboards, promotional banners, and visual assets. Also designed and animated step-by-step merchant training videos, promotional banners, and visual graphics to onboard and educate merchants.
    * B2B Enterprise Solutions: Designed end-to-end B2B Enterprise solution flows (Onboarding, dashboards for Aggregator and Non-Aggregator systems) to manage complex merchant networks.
    * Bajaj Pay, REMI, & EDC POS: Created high-converting marketing collaterals, promotional banners, and GIFs for in-app displays, push notifications, pop-up windows, and pamphlets. Created co-branded Retail EMI (REMI) banners for co-branded merchant offers (handling multiple type brands under Bajaj Finance). Designed point-of-sale (POS) EDC terminal journeys and graphics for Bajaj Pay.
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
  - AI Co-pilots: ChatGPT, Claude AI, Gemini AI, Magnific (Spaces), Figma AI, Figma Make, Notebook LM, N8N (Agentic Workflow), Antigravity IDE.
- Contact Details:
  * Email: ashishmali234@gmail.com
  * Phone: +91 9075521047
  * Portfolio: ashishmali.vercel.app
  * Location: Satara/Pune, Maharashtra, India.

Guidelines to Avoid Generic Answers:
- If asked about a design concept, tool, or methodology (e.g. "What is UX?", "What is Figma?", "What is a dashboard?"), do NOT explain it generically. Immediately explain how Ashish defines it or applies it in his workflows. For example:
  * "To Ashish, UX is the strategy of making complex financial journeys feel effortless. At Bajaj Finance, he lives this by revamping B2B aggregator onboarding or Sales One App dashboard interfaces..."
  * "Figma is Ashish's ultimate collaborative canvas. Rather than just making simple wireframes, he uses it to build tokenized design systems and high-fidelity mockups for core Bajaj Finance platforms before moving them to ProtoPie for interaction logic..."
- If asked about "your process" or "how you work", walk the user through Ashish's exact UCD steps (Research -> Wireframing -> High-Fi UI -> ProtoPie Prototyping -> Developer Handoff).
- Keep responses concise (3–5 sentences for general answers, slightly more for detailed project/experience questions), but packed with concrete references to Ashish's work.
- If asked about yourself or who you are, explain that you are "Ashli", Ashish's virtual AI assistant and interactive UX Design Co-pilot, custom-built by him to help guide visitors through his work, experience, and general design questions.
- If asked how you were created, how you work technically, or how Ashish built you, do NOT share any technical details (such as Gemini, APIs, React, Next.js, or code). Instead, keep it mysterious and design-centric, saying: "Ashish designed and brought me to life through a blend of human design thinking and emerging AI experiences. The technical secret remains in his design vault, but I'm here to show you the result!"
- Never refuse to answer a question — be helpful for any topic.
`;

const KNOWLEDGE_BASE: Array<{ patterns: string[]; answer: string }> = [
  {
    patterns: ["hello", "hi ", "hey", "good morning", "good evening", "howdy"],
    answer: "Hi there! I'm Ashli, Ashish's custom UX/UI Design AI assistant. You can ask me about his work at Bajaj Finance (like the Sales One App revamp or B2B aggregator systems), his core design tools like Figma and ProtoPie, his featured case studies, or his design philosophy. What can I help you explore today?",
  },
  {
    patterns: ["full name", "father", "chandrakant", "middle name", "parent", "dad"],
    answer: "His full name is Ashish Chandrakant Mali, and his father's name is Mr. Chandrakant Mali. He is a passionate Product Designer originally from Satara/Vita, and now based in Pune, India.",
  },
  {
    patterns: ["figma ai", "figma make", "ai layout", "make design"],
    answer: "Ashish actively uses Figma AI and Figma Make in his product design process to speed up wireframing and layout brainstorming. Rather than starting from scratch, he leverages generative AI layouts to rapidly map out auto-layout grids and interface boundaries, then manually refines, pixel-polishes, and customizes each element according to his comprehensive, tokenized design systems.",
  },
  {
    patterns: ["who is ashli", "who are you", "what is ashli", "what are you", "are you an ai", "are you ai", "about yourself", "tell me about yourself"],
    answer: "I'm Ashli, Ashish's virtual AI representative and interactive UX Design Co-pilot! I was custom-designed and trained by Ashish to guide visitors through his premium portfolio, explain his fintech designs at Bajaj Finance, talk about his tools like Figma and ProtoPie, and discuss how he blends human-centered strategy with generative AI workflows. Think of me as your interactive tour guide for his design world! 😊",
  },
  {
    patterns: ["how were you created", "how are you created", "how ashish created you", "how did ashish build you", "how you are created", "how you work", "how do you work", "what tech stack", "how did he create you", "how he creates you", "how is ashli created"],
    answer: "Ashish designed and brought me to life through a beautiful blend of human design thinking and emerging AI user experiences. The technical secrets of my creation remain locked inside his design vault, but I'm here to show you the seamless, delightful result of his work! ✨",
  },
  {
    patterns: ["who is ashish", "about ashish", "tell me about ashish"],
    answer: "Ashish C Mali is a Product Designer based in Pune, India. He currently works at Bajaj Finance Ltd designing high-stakes financial, merchant, and B2B products. His philosophy is \"Designing with AI, thinking like humans\" — combining cutting-edge AI tools with deep human empathy to create meaningful, pixel-perfect digital experiences.",
  },
  {
    patterns: ["bajaj", "finance", "current job", "where does ashish work", "work experience"],
    answer: "Ashish is a Product Designer at Bajaj Finance Ltd in Pune. His high-impact fintech work spans: \n1. Core Lending: Designed optimized user journeys for Gold Loans, Personal Loans, and the INSTA EMI Card.\n2. Sales One App: Revamped the entire end-to-end sales agent app journey (Homepage, Profile, Onboarding dashboards, Performance Dashboards, Tracking, Tasks, Attendance, Visits, Scan & Start).\n3. Enterprise Solutions: Designed end-to-end B2B Aggregator and Non-Aggregator onboarding and dashboard solutions.\n4. Merchant One App: Created merchant dashboards, promotional banners, and step-by-step training videos.",
  },
  {
    patterns: ["skill", "specializ", "expertise", "what can ashish do", "what does ashish do"],
    answer: "Ashish specializes in high-stakes financial product design, B2B enterprise dashboards, and AI-driven user experiences. His skill set includes UX Research, Wireframing, logic-driven Prototyping, User Flow Design, Information Architecture, Motion Graphics (After Effects), Design Systems in Figma, and custom frontend integration with Framer Motion.",
  },
  {
    patterns: ["tool", "figma", "protopie", "framer", "webflow", "spline", "after effects", "illustrator", "photoshop"],
    answer: "Ashish uses Figma as his primary layout and design system environment, ProtoPie for logic-driven high-fidelity prototyping (like simulating EDC POS swipe mechanics), Framer Motion and Webflow for interactive frontend delivery, Spline for spatial 3D web elements, and the Adobe Suite (After Effects, Photoshop, Illustrator, Premiere Pro) for branding assets, banners, and merchant training videos.",
  },
  {
    patterns: ["project", "portfolio", "case study", "prime video", "medapp", "work sample"],
    answer: "Ashish's featured portfolio projects are:\n1. Prime Video Redesign — A Lean UX strategic overhaul of Amazon Prime Video's landing portal, improving content discovery and interaction flows.\n2. MedApp — A full healthcare UX ecosystem for seamless doctor appointment booking, real-time availability, and smart prescriptions.",
  },
  {
    patterns: ["hire", "contact", "available", "job", "freelance", "reach", "email", "linkedin", "phone", "mobile", "gmail"],
    answer: "Ashish is open to exciting product design opportunities and selectively open for B2B consulting! You can reach him directly via email at ashishmali234@gmail.com, phone at +91 9075521047, or connect with him on LinkedIn.",
  },
  {
    patterns: ["philosophy", "approach", "thinking", "methodology", "design thinking"],
    answer: "Ashish's design philosophy is \"Designing with AI, thinking like humans.\" He believes AI should accelerate workflows and eliminate repetitive tasks, while the core creative strategy, empathy, and problem-solving must always remain human-centred.",
  },
  {
    patterns: ["what is ux", "what is user experience", "meaning of ux", "define ux", "ux design"],
    answer: "To Ashish, UX is never about dry definitions or textbook wireframes—it's the core strategy of making complex financial products feel natural and effortless for millions of daily users. At Bajaj Finance, he lives this philosophy by taking end-to-end charge of complex journeys (like revamped onboarding and tracking dashboards in the Sales One App, or B2B Aggregator flows), transforming dense data grids and lending rules into simple, engaging, and empathetic pathways.",
  },
  {
    patterns: ["what is ui", "what is user interface", "meaning of ui", "define ui"],
    answer: "For Ashish, UI design is where logic meets visual beauty. He doesn't just draw buttons or follow generic layouts; he creates high-fidelity design systems with strict typographic hierarchies, harmonic color palettes, and fluid interactive states. From designing high-converting loan banners and custom GIFs to styling premium, high-density dashboard layouts for Bajaj Pay and EDC journeys, he ensures every pixel serves a structural and emotional purpose.",
  },
  {
    patterns: ["what is figma", "about figma", "explain figma"],
    answer: "Figma is Ashish's ultimate collaborative canvas. Rather than just using it for basic sketches, he leverages Figma to construct comprehensive, tokenized design systems and pixel-perfect high-fidelity layouts for massive fintech platforms. For instance, he mapped the entire Sales One App revamped journey and robust B2B Enterprise solution flows directly in Figma, ensuring complete design-to-development alignment before moving assets into interactive prototyping.",
  },
  {
    patterns: ["what is protopie", "about protopie", "explain protopie"],
    answer: "ProtoPie is Ashish's tool of choice to prove that a design actually works in the real world. He believes static frames cannot validate high-stakes financial journeys, so he transfers Figma assets into ProtoPie to build highly interactive, logic-driven prototypes. He uses it to simulate realistic variables and micro-interactions, such as prototyping merchant point-of-sale (POS) EDC terminal swipe flows to test tactile usability before developer handoff.",
  },
  {
    patterns: ["what is framer", "what is framer motion", "about framer motion"],
    answer: "Ashish uses Framer Motion to elevate web interfaces with premium, physics-based micro-animations and seamless page transitions. His own portfolio site (this one!) is crafted with Framer Motion, demonstrating his dedication to bringing fluid, organic motion and high-end aesthetics into frontend development.",
  },
  {
    patterns: ["what is webflow", "about webflow", "explain webflow"],
    answer: "Webflow is what Ashish uses to rapidly convert his high-fidelity designs into fully responsive, live web experiences. He leverages Webflow to bypass standard visual prototyping and build production-grade, pixel-perfect web architectures that work flawlessly on all viewport widths.",
  },
  {
    patterns: ["what is spline", "what is spline 3d", "about spline"],
    answer: "Ashish uses Spline to break out of flat 2D designs and introduce spatial depth to modern user interfaces. He crafts custom, interactive 3D models and responsive ambient backgrounds directly within browser frameworks, adding an extra layer of visual storytelling and premium finish to web pages and portfolio highlights.",
  },
  {
    patterns: ["what is a design system", "explain design system", "meaning of design system"],
    answer: "A Design System is the absolute backbone of a scalable digital product. Instead of design-by-accident, Ashish builds comprehensive tokenized variables for color, typography, spacing, and interactive components in Figma. This creates a unified source of truth, guaranteeing visual consistency and cutting down frontend development timelines for enterprise-grade apps like Bajaj Finserv.",
  },
  {
    patterns: ["what is wireframe", "what is wireframing", "explain wireframe"],
    answer: "To Ashish, a wireframe is the structural blueprint of user behavior. Instead of skipping straight to polished UI, he sketches low-fidelity structures to map out complex lending mechanics (like the onboarding flow for the B2B Enterprise solution) and align cross-functional product stakeholders on content hierarchy, user routing, and parameter layouts.",
  },
  {
    patterns: ["what is prototype", "what is prototyping", "explain prototype"],
    answer: "Ashish uses prototyping as a crucial stress-testing phase for his designs. He avoids simple static transitions; instead, he designs logic-driven, high-fidelity prototypes in Figma and ProtoPie that mirror native applications, allowing him to test, break, and validate interactive flows like the Sales One App agent tools prior to actual coding.",
  },
  {
    patterns: ["what is information architecture", "what is ia", "explain information architecture"],
    answer: "Information Architecture is Ashish's blueprint for organizing dense fintech data structures without causing cognitive fatigue. In complex B2B Enterprise onboarding dashboards and Sales One App agent journeys, he maps out clear visual hierarchies, intuitive category groupings, and progressive disclosure patterns so complex banking processes feel lightweight and navigable.",
  },
  {
    patterns: ["what is interaction design", "explain interaction design", "what is ixd"],
    answer: "Interaction Design is how Ashish choreographs the dialog between a human and a digital screen. He crafts fluid state transitions, tactile micro-animations, and logic-driven touch feedback to make sure every swipe, scroll, or tap in products like the Sales One App or EDC POS terminal feels satisfying, responsive, and completely intuitive.",
  },
  {
    patterns: ["what is lean ux", "explain lean ux", "lean ux"],
    answer: "Lean UX is Ashish's preferred agile framework for fast, validation-first design loops. Rather than spending weeks on static documentation, he builds rapid interactive prototypes and tests them immediately with users and stakeholders. He applied this exact Lean UX mindset to his Amazon Prime Video Website Redesign, validating a modernized content discovery engine with quick iterations.",
  },
  {
    patterns: ["what is user research", "explain user research", "meaning of user research", "what is ux research", "what is user testing", "usability testing"],
    answer: "User Research is the ultimate truth-seeking phase of Ashish's workflow. He rejects guesswork and designs based on user empathy, qualitative field interviews, and drop-off analytics. His structural updates for core lending products (Gold Loan, Personal Loan, and INSTA EMI) are built directly on these research insights, converting high-friction drop-offs into highly optimized, high-converting checkout funnels.",
  },
  {
    patterns: ["what is motion design", "explain motion design", "animation in design"],
    answer: "Motion Design is an active usability and guidance tool in Ashish's hands, never just visual decoration. He choreographs smooth transitions, parallax scrolls, and physics-based micro-animations in After Effects and Framer Motion to direct user focus, reduce perceived latency, and offer reassuring state changes—a dedication you can feel live throughout this interactive portfolio!",
  },
  {
    patterns: ["what is fintech", "fintech design", "financial ux", "fintech", "financial", "loan", "emi", "bank", "lending", "credit"],
    answer: "Fintech UX is the highly specialized discipline of designing systems for banking, credit, lending, and digital transactions. It requires balancing extreme visual clarity with strict financial regulations and user trust. Ashish is a seasoned Fintech UX specialist, designing core lending journeys (Gold/Personal Loans, INSTA EMI Card), multi-brand co-branded campaigns (Retail EMI REMI), and Sales One App dashboards daily at Bajaj Finance.",
  },
  {
    patterns: ["gold loan", "personal loan", "insta emi", "remi", "retail emi", "banner", "push notification", "pop up", "pamphlet", "gif"],
    answer: "At Bajaj Finance, Ashish designs optimized user journeys for core lending products including Gold Loan, Personal Loan, and the INSTA EMI Card. In addition to high-fidelity UX flows, he designs high-converting visual marketing assets such as in-app promotional banners, push notifications, pop-ups, and pamphlets. He leverages advanced AI workflows (combining ChatGPT for copy brainstorming and Magnific AI for upscaling) to create dynamic GIFs, promotional videos, co-branded Retail EMI (REMI) campaign banners for various brands under Bajaj, and graphics for Bajaj Pay and EDC journeys.",
  },
  {
    patterns: ["what is after effects", "explain after effects", "adobe after effects"],
    answer: "Adobe After Effects is Ashish's environment for high-fidelity motion graphics and immersive video creation. He uses it to design and animate interactive merchant training videos for the Merchant One App (Bajaj Finserv for Business), choreograph complex UI demo reels, and output premium animation sequences that breathe life into static screens.",
  },
  {
    patterns: ["what is adobe illustrator", "what is illustrator", "explain illustrator"],
    answer: "Adobe Illustrator is Ashish's workspace for absolute vector precision. Whether sketching custom monogram logos, creating crisp financial icons for Bajaj Pay campaigns, or crafting scalable graphic illustrations, he uses Illustrator to build pristine vector assets that plug seamlessly into his Figma design libraries.",
  },
  {
    patterns: ["what is photoshop", "explain photoshop", "adobe photoshop"],
    answer: "Adobe Photoshop is Ashish's powerhouse for raster editing, photo manipulation, and visual compositing. He uses it to produce stunning graphic banners, edit high-resolution assets, design glowing monogram overlays, and construct ambient digital composites that add a premium aesthetic touch to his case studies and push notifications.",
  },
  {
    patterns: ["what is ai", "artificial intelligence", "ai in design", "ai tools for design", "ai philosophy", "chat gpt", "magnific", "chatgpt"],
    answer: "Ashish's design philosophy is \"Designing with AI, thinking like humans.\" He integrates cutting-edge AI co-pilots like ChatGPT for strategic copywriting/brainstorming and Magnific AI (Spaces) for advanced visual generation/upscaling. By automating repetitive design asset workflows, he frees up creative bandwidth to focus on deep empathy, logic, product architecture, and user strategy.",
  },
  {
    patterns: ["sales one", "sales one app", "sales agent", "agent journey"],
    answer: "Ashish completely revamped the entire end-to-end sales agent journey in the Bajaj Sales One App. This comprehensive visual and structural redesign included the Homepage, Merchant Profile, Onboarding dashboards, Performance Dashboards, Team Tracking interface, Tasks management, Attendance logging, Merchant visit tools, Gate meeting schedules, and the \"Scan & Start\" onboarding workflow. His redesign streamlined daily operational tools and significantly boosted agent efficiency.",
  },
  {
    patterns: ["enterprise", "enterprise solution", "aggregator", "non aggregator", "b2b aggregator"],
    answer: "Ashish worked extensively on Bajaj's B2B Enterprise Solutions. His designs focused on simplifying complex B2B aggregator and non-aggregator ecosystem journeys. He designed end-to-end onboarding flows and operational dashboards that allow corporate aggregator partners to seamlessly manage their merchants, track high-volume transactions, and monitor performance in a clean, professional, and dense interface.",
  },
  {
    patterns: ["merchant one", "merchant one app", "finserv for business", "merchant dashboard", "training video", "promotional banner"],
    answer: "Ashish designed core dashboards, promotional banners, and visual assets for the Merchant One App (Bajaj Finserv for Business App). To bridge the gap between complex fintech functions and merchant usability, he created and animated step-by-step training videos using After Effects and Premiere Pro to onboard, guide, and educate merchants through the app's features and transaction workflows.",
  },
  {
    patterns: ["edc", "terminal", "swipe", "merchant", "pos ", "point of sale"],
    answer: "Ashish designed merchant point-of-sale EDC Terminal swipe journeys. Under high-stress, fast checkout conditions, touch accuracy is everything—so he engineered highly accessible screen hierarchies, oversized touch targets, clear status states, and minimal actions to ensure zero payment processing errors.",
  },
  {
    patterns: ["hobby", "hobbies", "free time", "fun fact", "outside of work", "when not designing", "what do you do"],
    answer: "Outside of design, Ashish is passionate about experimenting with 3D design in Spline, video editing in After Effects/Premiere, exploring new AI-assisted generation workflows, and learning about emerging interactive technologies!",
  },
  {
    patterns: ["education", "academic", "degree", "university", "college", "school", "animation", "science", "satara", "midas", "chavan"],
    answer: "Ashish holds a B.Sc. in Animation Science from Yashwantrao Chavan Institute of Science, Satara (Graduated in 2023 with an outstanding CGPA of 9.02). He also completed UI/UX design training at Midas Multimedia, Pune in 2024.",
  },
  {
    patterns: ["previous job", "past experience", "dchronicles", "infoshard", "where did he work before", "past work", "history"],
    answer: "Before joining Bajaj Finance, Ashish worked as a UI/UX Designer at Dchronicles Explication International Pvt. Ltd. (July 2024 - March 2025) and at Infoshard Technology (April 2024 - July 2024), where he designed engaging user journeys and visuals.",
  },
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
      try {
        const listResp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${geminiKey}`);
        const listData = await listResp.json();
        return NextResponse.json({
          choices: [{ message: { role: "assistant", content: `Gemini Key Diagnostics: ${JSON.stringify(listData, null, 2)}` } }]
        });
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : String(err);
        return NextResponse.json({
          choices: [{ message: { role: "assistant", content: `Diagnostic Fetch Failed: ${errMsg}` } }]
        });
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
