// Silent ping on page load to notify visit (both generic and personalized visits)
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
        // In case sessionStorage is blocked by browser privacy settings
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

      // Listen for Resume clicks anywhere on the portfolio
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

      const handleScroll = () => {
        setScrollY(window.scrollY);
      };
      window.addEventListener("scroll", handleScroll, { passive: true });

      const fallbackTimer = setTimeout(() => {
        if (window.scrollY < 100) setShowWelcome(true);
      }, 5000);

      const handleHeroAnimationComplete = () => {
        clearTimeout(fallbackTimer);
        if (window.scrollY < 100) setShowWelcome(true);
      };
      window.addEventListener("hero-animation-complete", handleHeroAnimationComplete);

      return () => {
        document.removeEventListener("click", handleGlobalClick);
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("hero-animation-complete", handleHeroAnimationComplete);
        clearTimeout(fallbackTimer);
      };
