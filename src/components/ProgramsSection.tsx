"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const programs = [
  {
    level: "Beginner Level",
    icon: "♟",
    color: "from-emerald-500/20 to-emerald-600/5",
    borderColor: "hover:border-emerald-500/30",
    glowColor: "group-hover:shadow-emerald-500/10",
    features: [
      "Chess basics & rules",
      "Piece movement mastery",
      "Opening fundamentals",
      "Simple tactics & puzzles",
      "Confidence building",
      "Interactive game play",
    ],
    tag: "Perfect Start",
    tagColor: "bg-emerald-500/10 text-emerald-400",
  },
  {
    level: "Intermediate Level",
    icon: "♞",
    color: "from-gold/20 to-gold-dark/5",
    borderColor: "hover:border-gold/30",
    glowColor: "group-hover:shadow-gold/10",
    features: [
      "Strategy development",
      "Tactical combinations",
      "Positional understanding",
      "Tournament preparation",
      "Advanced openings",
      "Game analysis sessions",
    ],
    tag: "Most Popular",
    tagColor: "bg-gold/10 text-gold",
    featured: true,
  },
  {
    level: "Advanced Level",
    icon: "♞",
    color: "from-purple-500/20 to-purple-600/5",
    borderColor: "hover:border-purple-500/30",
    glowColor: "group-hover:shadow-purple-500/10",
    features: [
      "Advanced opening theory",
      "Deep calculation skills",
      "Endgame mastery",
      "Competitive tournament coaching",
      "Grandmaster game studies",
      "Psychological preparation",
    ],
    tag: "Elite Program",
    tagColor: "bg-purple-500/10 text-purple-400",
  },
];

export default function ProgramsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="programs" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 chess-pattern opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase bg-gold/10 text-gold border border-gold/20 mb-4">
            Our Programs
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-playfair)] mb-4">
            Choose Your <span className="gold-text">Path</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Carefully curated programs designed to elevate your chess skills at every level
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {programs.map((program, i) => (
            <motion.div
              key={program.level}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className={`group relative rounded-2xl border border-dark-border ${program.borderColor} transition-all duration-500 card-lift overflow-hidden ${
                program.featured ? "md:-mt-4 md:mb-[-16px]" : ""
              }`}
            >
              {/* Gradient bg */}
              <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Glow */}
              <div className={`absolute -inset-[1px] rounded-2xl shadow-2xl ${program.glowColor} transition-shadow duration-500 opacity-0 group-hover:opacity-100`} />

              <div className="relative p-6 sm:p-8">
                {/* Tag */}
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${program.tagColor} mb-6`}>
                  {program.tag}
                </span>

                {/* Icon */}
                <div className="text-5xl mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  {program.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-playfair)] mb-6 text-text-primary">
                  {program.level}
                </h3>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {program.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-text-secondary">
                      <span className="text-gold mt-0.5 text-xs">✦</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.a
                  href="#demo"
                  className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    program.featured
                      ? "btn-gold !rounded-xl"
                      : "border border-dark-border hover:border-gold/30 text-text-secondary hover:text-gold hover:bg-gold/5"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Learning →
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
