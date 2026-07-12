"use client";

import { useState } from "react";

const galleryItems = [
  { title: "Online Chess Class in Progress", category: "Classes", emoji: "💻", aspect: "aspect-video" },
  { title: "Tournament Championship", category: "Tournaments", emoji: "🏆", aspect: "aspect-square" },
  { title: "Strategy Workshop Session", category: "Workshops", emoji: "📋", aspect: "aspect-[4/5]" },
  { title: "Student Achievement Ceremony", category: "Achievements", emoji: "🎖️", aspect: "aspect-square" },
  { title: "Group Learning Session", category: "Classes", emoji: "👨‍🏫", aspect: "aspect-[4/5]" },
  { title: "Weekend Tournament", category: "Tournaments", emoji: "♟️", aspect: "aspect-video" },
];

export default function GallerySection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 chess-pattern opacity-10" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="text-center mb-16 reveal reveal-up"
          style={{ transitionDelay: '0s' }}
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
        </div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {galleryItems.map((item, i) => (
            <div
              key={item.title}
              className="break-inside-avoid group cursor-pointer reveal reveal-up"
              style={{ transitionDelay: `${0.1 + (i % 3) * 0.1}s` }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={`relative ${item.aspect} rounded-2xl overflow-hidden border border-dark-border group-hover:border-gold/20 transition-all duration-500`}>
                {/* Placeholder with gradient and icon */}
                <div className="absolute inset-0 bg-gradient-to-br from-dark-card via-dark-lighter to-dark-card flex items-center justify-center">
                  <div
                    className={`text-6xl sm:text-7xl transition-all duration-500 ${
                      hoveredIndex === i ? 'opacity-40 scale-125 rotate-6' : 'opacity-20 scale-100 rotate-0'
                    }`}
                  >
                    {item.emoji}
                  </div>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div
                  className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 ${
                    hoveredIndex === i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium bg-gold/20 text-gold mb-1">
                    {item.category}
                  </span>
                  <h4 className="text-sm font-semibold text-text-primary">
                    {item.title}
                  </h4>
                </div>

                {/* Zoom icon on hover */}
                <div
                  className={`absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center text-gold text-sm transition-all duration-300 ${
                    hoveredIndex === i ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                  }`}
                >
                  🔍
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
