"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const timelineItems = [
  { time: "0-5 min", label: "Warm-up & Review", icon: "🧠" },
  { time: "5-20 min", label: "Core Lesson & Theory", icon: "📖" },
  { time: "20-35 min", label: "Practice & Puzzles", icon: "♟" },
  { time: "35-45 min", label: "Game Play & Analysis", icon: "🏆" },
];

export default function SessionTimingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 chess-pattern opacity-15" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase bg-gold/10 text-gold border border-gold/20 mb-4">
            Session Structure
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-playfair)] mb-4">
            Every Session: <span className="gold-text">45 Minutes</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Structured, focused, and interactive — every minute counts
          </p>
        </motion.div>

        {/* Animated clock and timeline */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Clock visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-gold/20" />
              <div className="absolute inset-2 rounded-full border border-dark-border" />

              {/* Animated rotating ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, transparent 0%, rgba(212,168,67,0.3) 75%, transparent 100%)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center glass rounded-full w-40 h-40 sm:w-48 sm:h-48 flex flex-col items-center justify-center">
                  <div className="text-5xl sm:text-6xl font-bold gold-text font-[family-name:var(--font-playfair)]">
                    45
                  </div>
                  <div className="text-sm text-text-secondary uppercase tracking-widest">
                    Minutes
                  </div>
                </div>
              </div>

              {/* Tick marks */}
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-3 bg-gold/30 left-1/2 -translate-x-1/2"
                  style={{
                    top: "4px",
                    transformOrigin: "50% calc(50vmin - 4px)",
                    transform: `translateX(-50%) rotate(${i * 30}deg)`,
                    transformOrigin: `center ${128}px`,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Timeline */}
          <div className="space-y-6">
            {timelineItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                className="group flex items-center gap-5"
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
              </motion.div>
            ))}

            {/* Extra info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="grid grid-cols-3 gap-3 mt-8"
            >
              {["Weekly Learning", "Interactive", "Regular Practice"].map((item) => (
                <div key={item} className="text-center p-3 rounded-xl glass border border-dark-border">
                  <span className="text-xs text-text-secondary">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
