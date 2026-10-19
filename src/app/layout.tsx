import type { Metadata } from "next";
import { Rubik, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  // Covers both "Ashish Mali" and "Ashish C Mali" for Google's search algorithm:
  title: "Ashish Mali (Ashish C Mali) | Product Designer & UI/UX Specialist",
  description:
    "Official portfolio of Ashish Mali (Ashish C Mali) – Product Designer & UI/UX Specialist crafting high-converting design systems, intuitive digital experiences, and fintech products at Bajaj Finance.",
  keywords: [
    "Ashish Mali",
    "Ashish C Mali",
    "Ashish Mali Portfolio",
    "Ashish Mali Designer",
    "Ashish Mali Bajaj Finance",
    "Ashish Mali Pune",
    "Product Designer",
    "UI UX Designer",
    "Design Systems Specialist",
    "UX Researcher",
    "Creative Technologist",
    "Frontend Developer",
  ],
  authors: [{ name: "Ashish Mali (Ashish C Mali)", url: "https://ashishmali.vercel.app" }],
  creator: "Ashish Mali",
  applicationName: "Ashish C Mali",
  alternates: {
    canonical: "https://ashishmali.vercel.app",
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
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Ashish Mali (Ashish C Mali) | Product Designer & UI/UX Specialist",
    description:
      "Explore selected case studies, interactive prototypes, and scalable design systems by Ashish Mali (Ashish C Mali) – Product Designer at Bajaj Finance.",
    url: "https://ashishmali.vercel.app",
    // Clean exact brand name for Google Search Site Name:
    siteName: "Ashish C Mali",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Ashish Mali (Ashish C Mali) - Product Designer & Interactive Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashish Mali (Ashish C Mali) | Product Designer & UI/UX Specialist",
    description:
      "Explore selected case studies, interactive prototypes, and scalable design systems by Ashish Mali (Ashish C Mali) – Product Designer at Bajaj Finance.",
    images: ["/opengraph-image.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "yawy26zbqe";

  // Google WebSite Schema (Controls the Site Name and alternate names in Search)
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://ashishmali.vercel.app/#website",
    name: "Ashish C Mali",
    alternateName: [
      "Ashish Mali",
      "Ashish C Mali",
      "Ashish Mali Portfolio",
      "Ashish C Mali Portfolio",
      "Ashish",
    ],
    url: "https://ashishmali.vercel.app/",
    description:
      "Official portfolio of Ashish Mali (Ashish C Mali) – Product Designer & UI/UX Specialist.",
    publisher: {
      "@type": "Person",
      name: "Ashish Mali",
    },
  };

  // Google Person Schema (Identifies you as the entity behind both name queries)
  const personSchema = {
    "@context": "https://schema.org",
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
    url: "https://ashishmali.vercel.app",
    jobTitle: "Product Designer & UI/UX Specialist",
    worksFor: {
      "@type": "Organization",
      name: "Bajaj Finance",
      url: "https://www.bajajfinserv.in",
    },
    sameAs: [
      "https://www.linkedin.com/in/ashishmali",
      "https://www.linkedin.com/in/ashish-mali-b071b526b",
      "https://www.behance.net/ashishmali",
      "https://github.com/ashishmali234-design",
    ],
    knowsAbout: [
      "Product Design",
      "UI/UX Design",
      "Design Systems",
      "Interactive Architecture",
      "Front-End Engineering",
      "User Research",
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
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
        <Analytics />
      </body>
    </html>
  );
}
