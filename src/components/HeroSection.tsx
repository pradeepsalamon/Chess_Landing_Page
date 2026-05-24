"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const chessPieces = ["♔", "♕", "♖", "♗", "♘", "♙"];

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function HeroSection() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 5,
    }));
    setParticles(generated);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#fff8e6]" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#1a3a52]/[0.04] rounded-full blur-[150px] animate-pulse-gold" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#2a5a8a]/[0.03] rounded-full blur-[120px] animate-pulse-gold" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1a3a52]/[0.02] rounded-full blur-[100px] animate-pulse-gold" style={{ animationDelay: "4s" }} />
      </div>

      {/* Chess board pattern overlay */}
      <div className="absolute inset-0 chess-pattern opacity-40" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#1a3a52]/40"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating chess pieces */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {chessPieces.map((piece, i) => (
          <motion.div
            key={i}
            className="absolute text-[#1a3a52]/[0.08] select-none"
            style={{
              fontSize: `${60 + i * 20}px`,
              left: `${10 + i * 15}%`,
              top: `${15 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -25 + i * 5, 0],
              rotate: [0, i % 2 === 0 ? 10 : -10, 0],
              opacity: [0.04, 0.08, 0.04],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            {piece}
          </motion.div>
        ))}
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-playfair)] leading-[1.1] mb-6 blue-glow"
          >
            <span className="text-[#1a3a52]">NEXA Chess With</span>
            <br />
            <span className="text-[#2a6a9a]">Expert Coaching</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl text-[#4a5f7f] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Professional online chess training for{" "}
            <span className="text-[#1a3a52]">Beginners</span>,{" "}
            <span className="text-[#1a3a52]">Intermediate</span>, and{" "}
            <span className="text-[#1a3a52]">Advanced</span> players.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href="#demo"
              className="btn-gold text-base !py-3.5 !px-8 rounded-full font-semibold tracking-wide inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>♞</span> Book Free Demo
            </motion.a>
            <motion.a
              href="#programs"
              className="btn-outline-gold text-base !py-3.5 !px-8 rounded-full inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Programs <span>→</span>
            </motion.a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-wrap justify-center gap-8 sm:gap-12 mt-16"
          >
            {[
              { value: "5,000+", label: "Students Trained" },
              { value: "50+", label: "Expert Coaches" },
              { value: "8+", label: "Countries" },
              { value: "100+", label: "Tournament Wins" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold gold-text font-[family-name:var(--font-playfair)]">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-[#7a8fa5] mt-1 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-[#7a8fa5] uppercase tracking-widest">Scroll</span>
        <motion.div
          className="w-5 h-8 rounded-full border border-[#1a3a52]/30 flex justify-center pt-1.5"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-[#1a3a52]"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
