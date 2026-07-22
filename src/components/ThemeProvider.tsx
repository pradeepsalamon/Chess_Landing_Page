"use client";

import { useEffect } from "react";

export const DEFAULT_BG = "#fff8e6";

export default function ThemeProvider() {
  useEffect(() => {
    // 1. Immediately apply cached color if present to avoid flicker
    const cachedColor = localStorage.getItem("test_bg_color") || localStorage.getItem("site_bg_color");
    if (cachedColor) {
      document.body.style.backgroundColor = cachedColor;
    }

    // 2. Fetch active dynamic theme color from server
    fetch("/api/theme")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.backgroundColor) {
          document.body.style.backgroundColor = data.backgroundColor;
          localStorage.setItem("site_bg_color", data.backgroundColor);
          localStorage.setItem("test_bg_color", data.backgroundColor);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch dynamic background color from server:", err);
      });

    // 3. Listen for real-time local updates (e.g. from admin preview or change)
    const handleThemeChange = (e: CustomEvent<{ backgroundColor: string }>) => {
      if (e.detail && e.detail.backgroundColor) {
        document.body.style.backgroundColor = e.detail.backgroundColor;
      }
    };

    window.addEventListener("themeChange" as any, handleThemeChange as EventListener);
    return () => {
      window.removeEventListener("themeChange" as any, handleThemeChange as EventListener);
    };
  }, []);

  return null;
}
