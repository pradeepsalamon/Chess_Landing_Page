"use client";

import { useEffect } from "react";

export default function ScrollObserver() {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".reveal:not(.is-visible)");
      
      const windowHeight = window.innerHeight;
      
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Reveal when the top of the element is within 90% of the viewport height
        if (rect.top <= windowHeight * 0.9) {
          el.classList.add("is-visible");
        }
      });
    };

    // Run on mount to reveal elements already in view
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Setup a MutationObserver to catch dynamically added elements (like from React mounting later)
    const observer = new MutationObserver(() => {
      handleScroll();
    });
    
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      observer.disconnect();
    };
  }, []);

  return null;
}
