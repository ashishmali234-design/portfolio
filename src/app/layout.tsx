import type { Metadata } from "next";
import { Rubik, Inter } from "next/font/google";
import CustomAIChat from "../components/CustomAIChat";
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
  description: "Product Designer portfolio bridging clean layout, high-end user research, custom design systems, and robust front-end engineering.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Ashish C Mali | Product Designer & Interactive Architect",
    description: "Product Designer portfolio bridging clean layout, high-end user research, custom design systems, and robust front-end engineering.",
    url: "https://ashishmali.vercel.app",
    siteName: "Ashish C Mali Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashish C Mali | Product Designer & Interactive Architect",
    description: "Product Designer portfolio bridging clean layout, high-end user research, custom design systems, and robust front-end engineering.",
  }
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
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${interFont.variable} ${rubikFont.variable} antialiased bg-[#121212] text-white`}
      >
        {children}
        <CustomAIChat />
      </body>
    </html>
  );
}

