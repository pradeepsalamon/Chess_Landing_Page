"use client";

import { useRef, useState, useEffect } from "react";
import { useIsVisible } from "@/hooks/useIsVisible";

const stats = [
  { value: 5000, suffix: "+", label: "Students Trained", icon: "🎓" },
  { value: 100, suffix: "+", label: "Tournament Winners", icon: "🏆" },
  { value: 15000, suffix: "+", label: "Coaching Hours", icon: "⏰" },
  { value: 4500, suffix: "+", label: "Positive Reviews", icon: "⭐" },
];

function Counter({ target, suffix, isInView }: { target: number; suffix: string; isInView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2500;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  const formatted = count >= 1000 ? `${(count / 1000).toFixed(count >= target ? 0 : 1)}K` : count.toString();

  return (
    <span className="text-4xl sm:text-5xl font-bold gold-text-bright font-[family-name:var(--font-playfair)]">
      {count >= 1000 ? `${Math.floor(count / 1000)},${String(count % 1000).padStart(3, "0")}` : count}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useIsVisible(ref);

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark-lighter/40 to-dark" />
      <div className="absolute inset-0 chess-pattern opacity-10" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center group reveal reveal-up"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div
                className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12 inline-block"
              >
                {stat.icon}
              </div>
              <br />
              <Counter target={stat.value} suffix={stat.suffix} isInView={isInView} />
              <div className="text-xs sm:text-sm text-text-muted mt-2 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
