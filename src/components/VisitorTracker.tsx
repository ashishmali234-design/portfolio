"use client";

import { useEffect } from "react";

function formatProperCase(raw: string): string {
  const cleaned = raw.replace(/[-_]+/g, " ").trim();
  if (!cleaned) return "";
  if (cleaned.length <= 4 && cleaned === cleaned.toUpperCase()) {
    return cleaned;
  }
  return cleaned
    .split(" ")
    .map((word) => {
      const w = word.toLowerCase();
      if (w === "ai" || w === "ui" || w === "ux") return w.toUpperCase();
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

export default function VisitorTracker() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let personFound = "";
    let companyFound = "";

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const rawPerson =
        urlParams.get("name") ||
        urlParams.get("p") ||
        urlParams.get("person") ||
        urlParams.get("user") ||
        urlParams.get("to");

      const rawCompany =
        urlParams.get("company") ||
        urlParams.get("c") ||
        urlParams.get("team") ||
        urlParams.get("for") ||
        urlParams.get("org") ||
        urlParams.get("target");

      if (rawPerson) personFound = formatProperCase(rawPerson);
      if (rawCompany) companyFound = formatProperCase(rawCompany);
    } catch {
      // ignore
    }

    // 1. Send silent visit ping on page load (generic or personalized)
    try {
      const lastPing = sessionStorage.getItem("ashish_portfolio_visit_ping");
      const now = Date.now();
      if (!lastPing || now - Number(lastPing) > 60000) {
        sessionStorage.setItem("ashish_portfolio_visit_ping", String(now));
        fetch("/api/visit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            person: personFound || undefined,
            company: companyFound || undefined,
            userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
            pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
            referrer: typeof document !== "undefined" ? document.referrer : undefined,
          }),
        }).catch(() => {});
      }
    } catch {
      fetch("/api/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          person: personFound || undefined,
          company: companyFound || undefined,
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
          pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
          referrer: typeof document !== "undefined" ? document.referrer : undefined,
        }),
      }).catch(() => {});
    }

    // 2. Track when visitor clicks on Resume anywhere on the portfolio
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;
      const href = (target.getAttribute("href") || "").toLowerCase();
      if (href.includes("resume") || href.includes(".pdf")) {
        try {
          const payload = JSON.stringify({
            action: "resume",
            person: personFound || undefined,
            company: companyFound || undefined,
            userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
            pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
            referrer: typeof document !== "undefined" ? document.referrer : undefined,
          });
          if (navigator.sendBeacon) {
            navigator.sendBeacon("/api/visit", new Blob([payload], { type: "application/json" }));
          } else {
            fetch("/api/visit", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: payload,
              keepalive: true,
            }).catch(() => {});
          }
        } catch {
          // ignore
        }
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  return null;
}
