"use client";

import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Devesh's Mother",
    location: "Mumbai",
    rating: 5,
    text: "Under the academy's superb guidance, my son got an international FIDE Rating. He has been learning for 5 years and won so many tournaments. The coaching quality is exceptional!",
    initials: "DM",
  },
  {
    name: "Architha's Parents",
    location: "Prayagraj",
    rating: 5,
    text: "Initially thought only for two months, but now she has been learning for over a year. She really enjoys the class and wants to continue. The Sunday tournaments are a highlight!",
    initials: "AP",
  },
  {
    name: "Aarav's Father",
    location: "Dubai",
    rating: 5,
    text: "We are very happy with the immense dedication and support from day one. Aarav has improved tremendously. The personalized attention is what sets this academy apart.",
    initials: "AF",
  },
  {
    name: "Sanchi's Mother",
    location: "Mumbai",
    rating: 5,
    text: "My Sanchi has been learning chess since she was 6 years old and won the Mumbai District Championship. She has won many tournaments, all thanks to the amazing coaching!",
    initials: "SM",
  },
  {
    name: "Raghul's Mother",
    location: "Chennai",
    rating: 5,
    text: "My son is only 6 years, and now he has won so many tournaments and wants to become a Grandmaster! Regular classes and structured curriculum make all the difference.",
    initials: "RM",
  },
  {
    name: "Reyansh's Mother",
    location: "Surat",
    rating: 5,
    text: "Reyansh started learning during the lockdown. Within one year, he got his FIDE rating and won multiple tournaments. The coaching methodology is truly world-class!",
    initials: "RM",
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-lighter/30 to-dark" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="text-center mb-16 reveal reveal-up"
          style={{ transitionDelay: '0s' }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase bg-gold/10 text-gold border border-gold/20 mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-playfair)] mb-4">
            Parents <span className="gold-text">Trust</span> Us
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Hear what our chess families have to say
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto reveal reveal-up" style={{ transitionDelay: '0.2s' }}>
          <div className="relative overflow-hidden">
            <div className="relative h-64 sm:h-56">
              {testimonials.map((testimonial, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 p-8 sm:p-12 rounded-2xl glass-strong border border-dark-border transition-all duration-500 ease-in-out flex flex-col justify-center ${
                    i === activeIndex
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-8 pointer-events-none'
                  }`}
                >
                  {/* Quote mark */}
                  <div className="absolute top-4 right-8 text-8xl gold-text opacity-10 font-serif leading-none">&ldquo;</div>

                  <p className="text-lg sm:text-xl text-text-secondary leading-relaxed mb-6 italic relative z-10 line-clamp-3">
                    {testimonial.text}
                  </p>

                  <div className="flex items-center gap-4 relative z-10 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-dark font-bold text-sm shrink-0">
                      {testimonial.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-text-primary">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-text-muted">
                        {testimonial.location}
                      </div>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {Array.from({ length: testimonial.rating }).map((_, j) => (
                        <span key={j} className="text-gold text-lg">★</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "bg-gold w-8"
                    : "bg-dark-border hover:bg-gold/30"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
