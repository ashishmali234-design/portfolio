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
  title: "Ashish C Mali | Product Designer & Interactive Architect",
  description:
    "Product Designer portfolio of Ashish C Mali bridging clean layout, high-end user research, custom design systems, and robust front-end engineering.",
  keywords: [
    "Ashish Mali",
    "Ashish C Mali",
    "Ashish Mali Portfolio",
    "Ashish Mali Designer",
    "Product Designer",
    "UI UX Designer",
    "Interactive Architect",
    "Design Systems Specialist",
    "UX Researcher",
    "Creative Technologist",
    "Frontend Developer",
    "Web Designer Portfolio",
  ],
  authors: [{ name: "Ashish C Mali", url: "https://ashishmali.vercel.app" }],
  creator: "Ashish C Mali",
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
    title: "Ashish C Mali | Product Designer & Interactive Architect",
    description:
      "Product Designer portfolio bridging clean layout, high-end user research, custom design systems, and robust front-end engineering.",
    url: "https://ashishmali.vercel.app",
    siteName: "Ashish C Mali Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Ashish C Mali - Product Designer & Interactive Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashish C Mali | Product Designer & Interactive Architect",
    description:
      "Product Designer portfolio bridging clean layout, high-end user research, custom design systems, and robust front-end engineering.",
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

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ashish C Mali",
    url: "https://ashishmali.vercel.app",
    jobTitle: "Product Designer & Interactive Architect",
    sameAs: [
      "https://github.com/ashishmali234-design",
      "https://www.linkedin.com/in/ashishmali",
    ],
    knowsAbout: [
      "Product Design",
      "UI/UX Design",
      "Design Systems",
      "Interactive Architecture",
      "Front-End Engineering",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ashish C Mali Portfolio",
    url: "https://ashishmali.vercel.app",
    description:
      "Portfolio of Ashish C Mali - Product Designer & Interactive Architect",
    author: {
      "@type": "Person",
      name: "Ashish C Mali",
    },
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
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
