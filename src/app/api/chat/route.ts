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


// Direct intelligent simulator fallback responses in case the API key is not configured yet
async function getFallbackResponse(message: string): Promise<string> {
  const query = message.toLowerCase();

  if (query.includes("meaning of")) {
    return "The phrase 'Designing with AI, thinking like humans' defines Ashish's philosophy. It means leveraging AI tools to accelerate workflows and automate repetitive tasks, while keeping the core creative strategy, empathy, and user-centric problem solving rooted in human expertise.";
  }
  if (query.includes("hello") || query.includes("hi ") || query.includes("hey")) {
    return "Hi there! I'm Ashli, your virtual UX Design Co-pilot. I'm here to chat about Ashish's product design work, his experience at Bajaj Finance, his core toolkit, and how he bridges human-centric thinking with AI tools. What would you like to explore today?";
  }
  if (query.includes("bajaj") || query.includes("finance") || query.includes("work") || query.includes("current")) {
    return "Ashish is currently working as a Product Designer at Bajaj Finance Ltd in Pune. He focuses heavily on financial and merchant-based platforms. Some of the core products he's designed and optimized include Gold Loan, Personal Loan, INSTA EMI, EDC Terminal Journeys, Sales One App, and the Finserv for Business Enterprise Dashboard.";
  }
  if (query.includes("skill") || query.includes("tool") || query.includes("figma") || query.includes("use")) {
    return "Ashish has a highly versatile toolkit! For creative and interaction design, he is expert in Figma, ProtoPie, Framer Motion, Webflow, Spline 3D, and the Adobe Creative Suite (After Effects, Photoshop, Illustrator, Premiere Pro). His core methodologies center on UX Research, high-fidelity interactive prototyping, responsive design, and custom design systems.";
  }
  if (query.includes("project") || query.includes("prime") || query.includes("video") || query.includes("medapp")) {
    return "Ashish's featured case studies include:\n1. **Prime Video Redesign**: A Lean UX strategic overhaul of Amazon Prime Video's landing portal, optimizing content discovery and interaction paths.\n2. **MedApp**: A comprehensive digital healthcare ecosystem designed for seamless patient scheduling, real-time doctor availability, and smart prescriptions. \nBoth demonstrate his focus on high-fidelity user interaction and clean layout hierarchy!";
  }
  if (query.includes("hire") || query.includes("availability") || query.includes("contact") || query.includes("job") || query.includes("email")) {
    return "Ashish is always excited to collaborate on innovative digital products! He is based in Pune, Maharashtra, and is open to full-time opportunities or selective freelance design projects. You can reach out to him directly via the contact links on this site, or find him on LinkedIn!";
  }

  return "That's an interesting question! As Ashish's UX Design Co-pilot, I can tell you that he specializes in financial product design, high-fidelity prototypes (using Figma and ProtoPie), and emerging AI-driven user experiences. Feel free to ask me about his work at Bajaj Finance, his featured projects (like the Prime Video Redesign), or his design philosophy!";
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    const apiKey = process.env.OPENAI_API_KEY;

    // If API Key is not set, run the interactive fallback simulation smoothly
    if (!apiKey) {
      const userMessage = messages[messages.length - 1]?.content || "";
      const simulatedText = await getFallbackResponse(userMessage);

      // Simulate a small network delay for premium visual pacing
      await new Promise((resolve) => setTimeout(resolve, 800));

      return NextResponse.json({
        choices: [
          {
            message: {
              role: "assistant",
              content: simulatedText,
            },
          },
        ],
      });
    }

    // Connect to OpenAI Chat Completions API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 400,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "OpenAI API request failed");
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    const err = error as Error;
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: err.message || "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
