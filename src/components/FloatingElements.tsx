"use client";

import { useState, useEffect } from "react";

export default function FloatingElements() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Floating WhatsApp button */}
      <a
        href="https://api.whatsapp.com/send?phone=919361727940&text=Hi! I'm interested in chess classes"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 active:scale-95 animate-[float_6s_ease-in-out_infinite]"
        aria-label="Chat on WhatsApp"
      >
        💬
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
      </a>

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-dark-card border border-dark-border hover:border-gold/30 flex items-center justify-center text-gold text-lg shadow-lg transition-all duration-300 hover:bg-gold/5 hover:scale-110 active:scale-95 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        ↑
      </button>
    </>
  );
}
