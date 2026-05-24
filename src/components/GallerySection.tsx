"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const galleryItems = [
  { title: "Online Chess Class in Progress", category: "Classes", emoji: "💻", aspect: "aspect-video" },
  { title: "Tournament Championship", category: "Tournaments", emoji: "🏆", aspect: "aspect-square" },
  { title: "Strategy Workshop Session", category: "Workshops", emoji: "📋", aspect: "aspect-[4/5]" },
  { title: "Student Achievement Ceremony", category: "Achievements", emoji: "🎖️", aspect: "aspect-square" },
  { title: "Group Learning Session", category: "Classes", emoji: "👨‍🏫", aspect: "aspect-[4/5]" },
  { title: "Weekend Tournament", category: "Tournaments", emoji: "♟️", aspect: "aspect-video" },
];

export default function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 chess-pattern opacity-10" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase bg-gold/10 text-gold border border-gold/20 mb-4">
            Gallery
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-playfair)] mb-4">
            Our <span className="gold-text">Moments</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Glimpses from our classes, tournaments, and success stories
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="break-inside-avoid group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={`relative ${item.aspect} rounded-2xl overflow-hidden border border-dark-border group-hover:border-gold/20 transition-all duration-500`}>
                {/* Placeholder with gradient and icon */}
                <div className="absolute inset-0 bg-gradient-to-br from-dark-card via-dark-lighter to-dark-card flex items-center justify-center">
                  <motion.div
                    className="text-6xl sm:text-7xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                    animate={hoveredIndex === i ? { scale: 1.2, rotate: 5 } : { scale: 1, rotate: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {item.emoji}
                  </motion.div>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={hoveredIndex === i ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium bg-gold/20 text-gold mb-1">
                    {item.category}
                  </span>
                  <h4 className="text-sm font-semibold text-text-primary">
                    {item.title}
                  </h4>
                </motion.div>

                {/* Zoom icon on hover */}
                <motion.div
                  className="absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center text-gold text-sm"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={hoveredIndex === i ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  🔍
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
