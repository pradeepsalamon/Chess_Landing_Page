"use client";

const classTypes = [
  {
    title: "Individual Classes",
    icon: "👤",
    description: "Personalized one-on-one coaching tailored to your learning pace",
    features: [
      "One-on-one coaching",
      "Personalized attention",
      "Flexible timing",
      "Custom curriculum",
    ],
    accent: "from-blue-500 to-cyan-500",
    accentBg: "from-blue-500/10 to-cyan-500/5",
  },
  {
    title: "Buddy Combo Classes",
    icon: "👥",
    description: "Learn together with friends in an interactive and fun environment",
    features: [
      "Learn with friends",
      "Interactive training",
      "Fun & competitive",
      "Peer motivation",
    ],
    accent: "from-gold to-gold-light",
    accentBg: "from-gold/10 to-gold-light/5",
  },
  {
    title: "Group Classes",
    icon: "👨‍👩‍👧‍👦",
    description: "Collaborative learning with affordable coaching and team activities",
    features: [
      "Collaborative learning",
      "Affordable coaching",
      "Team activities",
      "Social development",
    ],
    accent: "from-purple-500 to-pink-500",
    accentBg: "from-purple-500/10 to-pink-500/5",
  },
];

export default function ClassTypesSection() {
  return (
    <section id="class-types" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#fff8e6] via-[#fffbf0] to-[#fff8e6]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="text-center mb-16 reveal reveal-up"
          style={{ transitionDelay: '0s' }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase bg-gold/10 text-gold border border-gold/20 mb-4">
            Class Types
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-playfair)] mb-4">
            Flexible <span className="gold-text">Learning</span> Options
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Choose the format that works best for you
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {classTypes.map((cls, i) => (
            <div
              key={cls.title}
              className="group relative reveal reveal-up"
              style={{ transitionDelay: `${0.2 + i * 0.15}s` }}
            >
              <div className="relative rounded-2xl border border-dark-border hover:border-gold/20 bg-dark-card overflow-hidden card-lift transition-all duration-500">
                {/* Top gradient bar */}
                <div className={`h-1 bg-gradient-to-r ${cls.accent} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Hover bg */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cls.accentBg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative p-6 sm:p-8">
                  {/* Icon */}
                  <div className="text-4xl mb-4 transition-transform duration-500 group-hover:scale-125">
                    {cls.icon}
                  </div>

                  <h3 className="text-xl font-bold font-[family-name:var(--font-playfair)] mb-2 text-text-primary">
                    {cls.title}
                  </h3>
                  <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                    {cls.description}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {cls.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm text-text-secondary">
                        <span className="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                          <span className="text-gold text-[10px]">✓</span>
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#demo"
                    className="block text-center py-3 rounded-xl border border-dark-border hover:border-gold/30 text-sm font-semibold text-text-secondary hover:text-gold transition-all duration-300 hover:bg-gold/5 hover:scale-105 active:scale-95"
                  >
                    Learn More →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
