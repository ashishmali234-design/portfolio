import type { Metadata } from "next";
import { Rubik, Inter } from "next/font/google";
import Script from "next/script";
import CustomAIChat from "../components/CustomAIChat";
import VisitorTracker from "../components/VisitorTracker";
import "./globals.css";

const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const rubikFont = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ashishmali.vercel.app"),
  title: "Ashish Mali (Ashish C Mali) | UI/UX & Product Designer",
  description:
    "Official portfolio of Ashish Mali (Ashish C Mali) – Product Designer & UI/UX Specialist at Bajaj Finance crafting high-converting design systems, intuitive digital experiences, and scalable products.",
  applicationName: "Ashish C Mali",
  appleWebApp: {
    title: "Ashish C Mali",
    statusBarStyle: "black-translucent",
    capable: true,
  },
  keywords: [
    "Ashish",
    "Ashish Mali",
    "Ashish C Mali",
    "Ashish Mali Portfolio",
    "Ashish C Mali Portfolio",
    "Ashish Mali UI UX Designer",
    "Ashish Mali Product Designer",
    "Ashish Mali Bajaj Finance",
    "UI UX Designer Pune",
    "Product Designer Pune",
    "Fintech UI UX Designer",
    "Interaction Designer",
    "Design Systems",
    "UX Research",
    "Figma",
    "Lean UX Case Study",
    "Prime Video Redesign",
    "Best UI UX Designer Portfolio",
    "Ashish Mali Pune",
    "Ashish C Mali Designer",
  ],
  authors: [{ name: "Ashish Mali (Ashish C Mali)", url: "https://ashishmali.vercel.app" }],
  creator: "Ashish Mali (Ashish C Mali)",
  publisher: "Ashish Mali (Ashish C Mali)",
  alternates: {
    canonical: "https://ashishmali.vercel.app/",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Ashish Mali (Ashish C Mali) | UI/UX Designer & Product Designer",
    description:
      "Explore selected case studies, interactive prototypes, and scalable design systems by Ashish Mali (Ashish C Mali) – Product Designer at Bajaj Finance.",
    url: "https://ashishmali.vercel.app",
    siteName: "Ashish C Mali",
    locale: "en_US",
    type: "profile",
    images: [
      {
        url: "https://ashishmali.vercel.app/opengraph-image.png?v=3",
        width: 1200,
        height: 630,
        alt: "Ashish Mali (Ashish C Mali) - Product Designer & UI/UX Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashish Mali (Ashish C Mali) | UI/UX Designer & Product Designer",
    description:
      "Explore selected case studies, interactive prototypes, and scalable design systems by Ashish Mali (Ashish C Mali) – Product Designer at Bajaj Finance.",
    images: ["https://ashishmali.vercel.app/opengraph-image.png?v=3"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "UXlP7mSxn7z0DAAVRofuHw5ZyeZwHU27WM_A6rYbCNg",
  },
  other: {
    "geo.region": "IN-MH",
    "geo.placename": "Pune",
    "geo.position": "18.5204;73.8567",
    ICBM: "18.5204, 73.8567",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://ashishmali.vercel.app/#website",
      url: "https://ashishmali.vercel.app/",
      name: "Ashish C Mali",
      alternateName: [
        "Ashish Mali",
        "Ashish C Mali Portfolio",
        "Ashish Mali Portfolio",
        "Ashish",
      ],
      description: "Official portfolio of Ashish Mali (Ashish C Mali) – Product Designer & UI/UX Specialist.",
      publisher: {
        "@id": "https://ashishmali.vercel.app/#person",
      },
    },
    {
      "@type": "ProfilePage",
      "@id": "https://ashishmali.vercel.app/#profilepage",
      url: "https://ashishmali.vercel.app/",
      name: "Ashish Mali (Ashish C Mali) | UI/UX Designer & Product Designer",
      description:
        "Official portfolio of Ashish Mali (Ashish C Mali) – Product Designer & UI/UX Specialist crafting high-converting design systems, intuitive digital experiences, and scalable products.",
      inLanguage: "en-US",
      primaryImageOfPage: "https://ashishmali.vercel.app/ashish-profile.jpg",
      image: "https://ashishmali.vercel.app/ashish-profile.jpg",
      mainEntity: {
        "@id": "https://ashishmali.vercel.app/#person",
      },
    },
    {
      "@type": "Person",
      "@id": "https://ashishmali.vercel.app/#person",
      name: "Ashish Mali",
      additionalName: "C",
      givenName: "Ashish",
      familyName: "Mali",
      alternateName: [
        "Ashish C Mali",
        "Ashish C. Mali",
        "Ashish Mali UX",
        "Ashish Mali Designer",
        "Ashish",
      ],
      jobTitle: "Product Designer & UI/UX Designer",
      worksFor: {
        "@type": "Organization",
        name: "Bajaj Finance",
        url: "https://www.bajajfinserv.in",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Pune",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
      url: "https://ashishmali.vercel.app/",
      image: "https://ashishmali.vercel.app/ashish-profile.jpg",
      sameAs: [
        "https://www.linkedin.com/in/ashish-mali-b071b526b",
        "https://www.behance.net/ashishmali",
        "https://github.com/ashishmali234-design",
      ],
      knowsAbout: [
        "UI/UX Design",
        "Product Design",
        "Design Systems",
        "Interaction Design",
        "User Research",
        "Wireframing & Prototyping",
        "Figma",
        "Fintech UX",
        "Mobile App Design",
        "Lean UX",
      ],
    },
    {
      "@type": "ItemList",
      "@id": "https://ashishmali.vercel.app/#projects",
      name: "Featured Design Case Studies & Projects by Ashish Mali",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "CreativeWork",
            name: "Prime Video Redesign",
            description:
              "A Lean UX strategic overhaul of Amazon Prime Video's landing portal, optimizing content discovery and IA paths through high-fidelity interactive design.",
            creator: { "@id": "https://ashishmali.vercel.app/#person" },
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "CreativeWork",
            name: "MedApp - Doctor's Appointment Booking App",
            description:
              "A comprehensive digital healthcare ecosystem designed for seamless patient scheduling, real-time doctor availability consultations, and smart prescriptions.",
            creator: { "@id": "https://ashishmali.vercel.app/#person" },
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "CreativeWork",
            name: "boAt Landing Page",
            description:
              "A dark-mode, high-fidelity landing page interface highlighting the energetic audio performance and lifestyle brand language of boAt acoustics.",
            creator: { "@id": "https://ashishmali.vercel.app/#person" },
          },
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://ashishmali.vercel.app/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Who is Ashish Mali (Ashish C Mali)?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ashish Mali (also known as Ashish C Mali) is a UI/UX Designer and Product Designer currently working at Bajaj Finance in Pune, India. He crafts high-converting design systems, user journeys for financial products, and interactive digital experiences.",
          },
        },
        {
          "@type": "Question",
          name: "What design services and skills does Ashish Mali specialize in?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ashish specializes in end-to-end Product Design, UI/UX Design, Design Systems, Interaction Design, User Research, Wireframing, High-Fidelity Prototyping, and Fintech/Merchant digital journeys.",
          },
        },
        {
          "@type": "Question",
          name: "What projects has Ashish worked on?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Notable projects include financial and merchant products at Bajaj Finance (Gold Loan, Personal Loan, INSTA EMI, EDC Journeys, Enterprise Dashboard), the Amazon Prime Video Redesign case study, MedApp Healthcare booking app, and boAt acoustics landing page.",
          },
        },
        {
          "@type": "Question",
          name: "How can I contact or hire Ashish Mali (Ashish C Mali)?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can connect with Ashish directly through the Contact section on his portfolio (https://ashishmali.vercel.app/#contact), on LinkedIn (https://www.linkedin.com/in/ashish-mali-b071b526b), Behance (https://www.behance.net/ashishmali), or via his interactive AI assistant Ashli.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "yawy26zbqe";

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
        {clarityId && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `}
          </Script>
        )}
      </head>
      <body
        className={`${interFont.variable} ${rubikFont.variable} antialiased bg-[#121212] text-white`}
      >
        {children}
        <VisitorTracker />
        <CustomAIChat />
      </body>
    </html>
  );
}
