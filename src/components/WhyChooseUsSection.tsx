"use client";

const features = [
  {
    icon: "🎓",
    title: "Expert Chess Coaches",
    description: "FIDE-rated professionals with years of teaching and tournament experience",
  },
  {
    icon: "🎯",
    title: "Personalized Guidance",
    description: "Custom learning paths tailored to each student's strengths and goals",
  },
  {
    icon: "🏆",
    title: "Tournament Preparation",
    description: "Comprehensive preparation for national and international chess tournaments",
  },
  {
    icon: "💻",
    title: "Interactive Online Classes",
    description: "Engaging live sessions with real-time interaction and digital tools",
  },
  {
    icon: "📅",
    title: "Flexible Scheduling",
    description: "Choose class times that work for your schedule, including weekends",
  },
  {
    icon: "🤝",
    title: "Friendly Environment",
    description: "Supportive and encouraging atmosphere that makes learning enjoyable",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section id="why-choose-us" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 chess-pattern opacity-15" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="text-center mb-16 reveal reveal-up"
          style={{ transitionDelay: '0s' }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase bg-gold/10 text-gold border border-gold/20 mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-playfair)] mb-4">
            Why <span className="gold-text">GrandMaster</span> Academy?
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Discover what makes our academy the preferred choice for chess excellence
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="group relative p-6 sm:p-8 rounded-2xl bg-dark-card border border-dark-border hover:border-gold/20 card-lift transition-all duration-500 reveal reveal-up"
              style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
            >
              {/* Hover glow bg */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <div
                  className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12 inline-block"
                >
                  {feature.icon}
                </div>
                <br />
                <h3 className="text-lg font-bold font-[family-name:var(--font-playfair)] mb-2 text-text-primary group-hover:text-gold transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
