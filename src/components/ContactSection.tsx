"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@grandmasterchess.com";

const contactMethods = [
  {
    icon: "📱",
    label: "WhatsApp",
    value: "+91 93617 27940",
    href: "https://api.whatsapp.com/send?phone=919361727940&text=Hi! I'm interested in chess classes",
    color: "from-green-500/20 to-green-600/5",
    borderHover: "hover:border-green-500/30",
  },
  {
    icon: "📞",
    label: "Phone",
    value: "+91 93617 27940",
    href: "tel:+919361727940",
    color: "from-blue-500/20 to-blue-600/5",
    borderHover: "hover:border-blue-500/30",
  },
  {
    icon: "✉️",
    label: "Email",
    value: contactEmail,
    href: `mailto:${contactEmail}`,
    color: "from-gold/20 to-gold-dark/5",
    borderHover: "hover:border-gold/30",
  },
];

const socialLinks = [
  { icon: "📸", label: "Instagram", href: "#", color: "hover:bg-pink-500/10 hover:border-pink-500/30" },
  { icon: "▶️", label: "YouTube", href: "#", color: "hover:bg-red-500/10 hover:border-red-500/30" },
  { icon: "👍", label: "Facebook", href: "#", color: "hover:bg-blue-500/10 hover:border-blue-500/30" },
];

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-lighter/30 to-dark" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase bg-gold/10 text-gold border border-gold/20 mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-playfair)] mb-4">
            Ready to <span className="gold-text">Start</span>?
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Reach out to us anytime — we&apos;re here to help you begin your chess journey
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, i) => (
            <motion.a
              key={method.label}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className={`group relative p-6 rounded-2xl bg-dark-card border border-dark-border ${method.borderHover} card-lift transition-all duration-500 text-center`}
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {method.icon}
                </div>
                <div className="text-sm text-text-muted uppercase tracking-wider mb-1">
                  {method.label}
                </div>
                <div className="text-text-primary font-medium text-sm">
                  {method.value}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center gap-4"
        >
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              className={`w-14 h-14 rounded-xl border border-dark-border flex items-center justify-center text-2xl transition-all duration-300 ${social.color}`}
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
