"use client";

import { useRef, useState, useEffect } from "react";
import { useIsVisible } from "@/hooks/useIsVisible";

const achievements = [
  { value: 150, suffix: "+", label: "Tournament Players", icon: "🏆" },
  { value: 95, suffix: "%", label: "Win Rate Improvement", icon: "📈" },
  { value: 50, suffix: "+", label: "Sunday Sessions/Year", icon: "📅" },
  { value: 30, suffix: "+", label: "Tournaments Covered", icon: "🎯" },
];

function AnimatedCounter({ target, suffix, isInView }: { target: number; suffix: string; isInView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
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

  return (
    <span className="text-3xl sm:text-4xl font-bold text-blue-600 font-[family-name:var(--font-playfair)]">
      {count}{suffix}
    </span>
  );
}

export default function SundayTrainingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useIsVisible(ref);

  return (
    <section id="sunday-training" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Dynamic background */}
      <div className="absolute inset-0 bg-white" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-500/[0.05] rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-400/[0.05] rounded-full blur-[120px]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div
            className="reveal reveal-up"
            style={{ transitionDelay: '0s' }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase bg-blue-500/10 text-blue-600 border border-blue-500/20 mb-4">
              Special Sunday Sessions
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-playfair)] mb-6 leading-tight text-dark-900">
              Sunday{" "}
              <span className="text-blue-600">Tournament</span>{" "}
              Training
            </h2>
            <p className="text-dark-600 text-lg leading-relaxed mb-8">
              Special Sunday sessions focused on tournament preparation, practical gameplay,
              analysis, rapid chess improvement, and competitive confidence. Take your game
              to the next level with intensive weekend training.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                "Tournament Simulation",
                "Game Analysis",
                "Rapid Improvement",
                "Competitive Play",
                "Opening Prep",
                "Endgame Drills",
              ].map((feature, i) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-sm text-dark-600 reveal reveal-up"
                  style={{ transitionDelay: `${0.3 + i * 0.1}s` }}
                >
                  <span className="text-blue-600">♦</span>
                  {feature}
                </div>
              ))}
            </div>

            <a
              href="#demo"
              className="bg-blue-600 text-white hover:bg-blue-700 inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span>🏆</span> Join Sunday Training
            </a>
          </div>

          {/* Achievement counters */}
          <div
            className="reveal reveal-up"
            style={{ transitionDelay: '0.2s' }}
          >
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((item, i) => (
                <div
                  key={item.label}
                  className="group p-6 rounded-2xl bg-white border border-blue-200 hover:border-blue-400 hover:shadow-lg card-lift text-center transition-all reveal reveal-scale"
                  style={{ transitionDelay: `${0.4 + i * 0.1}s` }}
                >
                  <div className="text-3xl mb-3 group-hover:scale-125 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <AnimatedCounter target={item.value} suffix={item.suffix} isInView={isInView} />
                  <div className="text-xs text-dark-500 mt-2 uppercase tracking-wider">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Trophy visual */}
            <div
              className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-300 text-center reveal reveal-up"
              style={{ transitionDelay: '0.8s' }}
            >
              <div
                className="text-6xl mb-2 inline-block animate-float-slow"
              >
                🏆
              </div>
              <div className="text-sm text-blue-600 font-semibold">Every Sunday</div>
              <div className="text-xs text-dark-500 mt-1">Competitive Tournament Practice</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
