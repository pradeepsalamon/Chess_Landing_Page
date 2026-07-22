"use client";

import { useEffect, useState, useRef } from "react";

const timelineItems = [
  { time: "0-10 min", label: "Warm-up & Review", icon: "🧠" },
  { time: "10-25 min", label: "Core Lesson & Theory", icon: "📖" },
  { time: "25-40 min", label: "Practice & Puzzles", icon: "♟" },
  { time: "40-55 min", label: "Game Play & Analysis", icon: "🏆" },
];

export default function SessionTimingSection() {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.6 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number;
    const duration = 2000;
    const end = 55;
    let req: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      const easeOut = 1 - Math.pow(1 - Math.min(progress / duration, 1), 4);
      const current = Math.min(Math.floor(easeOut * end), end);
      
      setCount(current);
      
      if (progress < duration) {
        req = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    
    req = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(req);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 chess-pattern opacity-15" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="text-center mb-16 reveal reveal-up"
          style={{ transitionDelay: '0s' }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase bg-gold/10 text-gold border border-gold/20 mb-4">
            Session Structure
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-playfair)] mb-4">
            Every Session: <span className="gold-text">45 - 55 Minutes</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Structured, focused, and interactive — every minute counts
          </p>
        </div>

        {/* Animated clock and timeline */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Clock visual */}
          <div
            className="flex justify-center reveal reveal-scale"
            style={{ transitionDelay: '0.2s' }}
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-gold/20" />
              <div className="absolute inset-2 rounded-full border border-dark-border" />

              {/* Animated rotating ring (using CSS instead of framer motion) */}
              <div
                className="absolute inset-0 rounded-full animate-rotate-slow"
                style={{
                  background: "conic-gradient(from 0deg, transparent 0%, rgba(212,168,67,0.3) 75%, transparent 100%)",
                }}
              />

              {/* Tick marks & Chess pieces */}
              <div className="absolute inset-0">
                {Array.from({ length: 12 }).map((_, i) => {
                  const isQuarter = i % 3 === 0;
                  const pieces = ["♔", "♕", "♖", "♘"];
                  return (
                    <div
                      key={i}
                      className="absolute inset-0 flex justify-center items-start"
                      style={{ transform: `rotate(${i * 30}deg)` }}
                    >
                      {isQuarter ? (
                        <div 
                          className="text-gold/80 text-xl sm:text-2xl leading-none mt-1 sm:mt-2"
                          style={{ transform: `rotate(-${i * 30}deg)` }}
                        >
                          {pieces[i / 3]}
                        </div>
                      ) : (
                        <div className="w-0.5 h-3 bg-gold/30 mt-1 sm:mt-2" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Minute Hand */}
              <div
                className="absolute top-1/2 left-1/2 w-0.5 sm:w-1 bg-gold/30 rounded-full z-10"
                style={{
                  height: '42%',
                  transformOrigin: 'bottom center',
                  transform: `translate(-50%, -100%) rotate(${isVisible ? 330 : 0}deg)`,
                  transition: 'transform 2s cubic-bezier(0.25, 1, 0.5, 1) 0.3s',
                }}
              />

              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center glass rounded-full w-40 h-40 sm:w-48 sm:h-48 flex flex-col items-center justify-center relative shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/10">
                  <div className="text-5xl sm:text-6xl font-bold gold-text font-[family-name:var(--font-playfair)]">
                    {count}
                  </div>
                  <div className="text-sm text-text-secondary uppercase tracking-widest mt-1">
                    Minutes
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-6">
            {timelineItems.map((item, i) => (
              <div
                key={item.label}
                className="group flex items-center gap-5 reveal reveal-up"
                style={{ transitionDelay: `${0.3 + i * 0.15}s` }}
              >
                {/* Connector line */}
                <div className="relative flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-dark-card border border-dark-border group-hover:border-gold/30 flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-gold/10">
                    {item.icon}
                  </div>
                  {i < timelineItems.length - 1 && (
                    <div className="w-px h-6 bg-gradient-to-b from-gold/20 to-transparent mt-2" />
                  )}
                </div>

                <div>
                  <div className="text-xs text-gold font-medium uppercase tracking-wider mb-1">
                    {item.time}
                  </div>
                  <div className="text-lg font-semibold text-text-primary group-hover:text-gold transition-colors duration-300">
                    {item.label}
                  </div>
                </div>
              </div>
            ))}

            {/* Extra info */}
            <div
              className="grid grid-cols-3 gap-3 mt-8 reveal reveal-up"
              style={{ transitionDelay: '0.8s' }}
            >
              {["Weekly Learning", "Interactive", "Regular Practice"].map((item) => (
                <div key={item} className="text-center p-3 rounded-xl glass border border-dark-border">
                  <span className="text-xs text-text-secondary">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
