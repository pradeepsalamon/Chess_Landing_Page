"use client";

import { useEffect } from "react";

export default function ThemeProvider() {
  useEffect(() => {
    const savedColor = localStorage.getItem("test_bg_color");
    if (savedColor) {
      document.body.style.backgroundColor = savedColor;
    }
  }, []);

  return null;
}
