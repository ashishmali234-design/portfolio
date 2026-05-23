"use client";

import Script from "next/script";

declare global {
  interface Window {
    AssistLoopWidget?: {
      init: (config: { agentId: string }) => void;
    };
  }
}

export default function AssistLoopLoader() {
  return (
    <Script
      src="https://assistloop.ai/assistloop-widget.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (typeof window !== "undefined" && window.AssistLoopWidget) {
          window.AssistLoopWidget.init({
            agentId: "d60874c9-63c1-43cf-ad18-17e354054deb"
          });
        }
      }}
    />
  );
}
