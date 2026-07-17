"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function TrackingProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const trackPageView = async () => {
      try {
        const url = window.location.href;
        const referrer = document.referrer;
        
        await fetch("/api/tracking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url, referrer, pathname }),
        });
      } catch (err) {
        console.error("Failed to track page view", err);
      }
    };
    
    // Slight delay to ensure cookies are fully set by middleware
    const timeout = setTimeout(trackPageView, 500);
    return () => clearTimeout(timeout);
  }, [pathname, searchParams]);

  return null;
}
