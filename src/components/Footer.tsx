"use client";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Programs", href: "#programs" },
  { label: "Class Types", href: "#class-types" },
  { label: "About Us", href: "#why-choose-us" },
  { label: "Demo Classes", href: "#demo" },
  { label: "Contact", href: "#contact" },
];

const programs = [
  { label: "Beginner Level", href: "#programs" },
  { label: "Intermediate Level", href: "#programs" },
  { label: "Advanced Level", href: "#programs" },
  { label: "Sunday Training", href: "#sunday-training" },
];

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@grandmasterchess.com";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* Background */}
      <div className="absolute inset-0 bg-[#fff8e6]" />
      <div className="absolute inset-0 chess-pattern opacity-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1 reveal reveal-up" style={{ transitionDelay: '0s' }}>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/nexa-logo.svg" 
                alt="NEXA Chess Academy" 
                className="w-12 h-12 drop-shadow-lg"
              />
            </div>
            <p className="text-sm text-text-secondary leading-relaxed mb-6">
              Professional online chess training for students of all levels. Building champions since 2018.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {["📸", "▶️", "👍"].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg border border-dark-border hover:border-gold/30 flex items-center justify-center text-base transition-all duration-300 hover:bg-gold/5 hover:scale-110 active:scale-95"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="reveal reveal-up" style={{ transitionDelay: '0.1s' }}>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-text-primary mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-gold transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="text-gold/40 text-xs transition-transform duration-300 group-hover:translate-x-1">›</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="reveal reveal-up" style={{ transitionDelay: '0.2s' }}>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-text-primary mb-4">
              Programs
            </h4>
            <ul className="space-y-2.5">
              {programs.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-gold transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="text-gold/40 text-xs transition-transform duration-300 group-hover:translate-x-1">›</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="reveal reveal-up" style={{ transitionDelay: '0.3s' }}>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-text-primary mb-4">
              Contact Info
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-text-secondary">
                <span className="text-gold mt-0.5">📞</span>
                +91 93617 27940
              </li>
              <li className="flex items-start gap-3 text-sm text-text-secondary">
                <span className="text-gold mt-0.5">✉️</span>
                <a href={`mailto:${contactEmail}`} className="hover:text-gold transition-colors">
                  {contactEmail}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-text-secondary">
                <span className="text-gold mt-0.5">🌐</span>
                Available Worldwide
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4 reveal reveal-up" style={{ transitionDelay: '0.4s' }}>
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} GrandMaster Chess Academy. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-text-muted hover:text-gold transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-text-muted hover:text-gold transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
