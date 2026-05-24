"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function DemoClassSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    parentName: "",
    age: "",
    experience: "",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/book-demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setFormData({ name: "", parentName: "", age: "", experience: "", phone: "" });
    } catch (err) {
      console.error(err);
      setError("Failed to register. Please try again or contact via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="demo" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-lighter/30 to-dark" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-[150px]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase bg-gold/10 text-gold border border-gold/20 mb-4">
              Free Trial Class
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-playfair)] mb-6 leading-tight">
              Book Your <span className="gold-text">Free Demo</span> Class
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              Experience our world-class coaching firsthand. No commitment required — just
              pure chess learning with our expert instructors. See why thousands of parents trust us.
            </p>

            <div className="space-y-4">
              {[
                { icon: "✓", text: "No payment required for demo" },
                { icon: "✓", text: "Personalized assessment included" },
                { icon: "✓", text: "Meet your potential coach" },
                { icon: "✓", text: "Get a custom learning roadmap" },
              ].map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <span className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-gold text-xs">
                    {item.icon}
                  </span>
                  <span className="text-text-secondary">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative rounded-2xl glass-strong border border-dark-border p-6 sm:p-8">
              {/* Form glow */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-gold/10 via-transparent to-gold/5 pointer-events-none" />

              <div className="relative">
                <h3 className="text-xl font-bold font-[family-name:var(--font-playfair)] mb-6 gold-text">
                  Register for Free Demo
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs text-text-muted uppercase tracking-wider mb-1.5">
                      Student Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-dark border border-dark-border focus:border-gold/40 text-text-primary placeholder:text-text-muted/50 outline-none transition-all duration-300 text-sm"
                      placeholder="Enter student name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-text-muted uppercase tracking-wider mb-1.5">
                      Parent Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-dark border border-dark-border focus:border-gold/40 text-text-primary placeholder:text-text-muted/50 outline-none transition-all duration-300 text-sm"
                      placeholder="Enter parent name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-text-muted uppercase tracking-wider mb-1.5">
                        Student Age
                      </label>
                      <input
                        type="number"
                        required
                        min="4"
                        max="18"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-dark border border-dark-border focus:border-gold/40 text-text-primary placeholder:text-text-muted/50 outline-none transition-all duration-300 text-sm"
                        placeholder="Age"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-text-muted uppercase tracking-wider mb-1.5">
                        Experience Level
                      </label>
                      <select
                        required
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-dark border border-dark-border focus:border-gold/40 text-text-primary outline-none transition-all duration-300 text-sm appearance-none"
                      >
                        <option value="">Select</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-text-muted uppercase tracking-wider mb-1.5">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-dark border border-dark-border focus:border-gold/40 text-text-primary placeholder:text-text-muted/50 outline-none transition-all duration-300 text-sm"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  {error && (
                    <div className="text-red-400 text-sm mb-4">
                      {error}
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-gold !py-3.5 rounded-xl text-base font-bold tracking-wide mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? "Booking..." : "♞ Book Free Demo Class"}
                  </motion.button>
                </form>

                {/* Success popup */}
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-dark-card/95 rounded-2xl backdrop-blur-sm"
                  >
                    <div className="text-center p-6">
                      <motion.div
                        className="text-6xl mb-4"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5 }}
                      >
                        ✅
                      </motion.div>
                      <h4 className="text-xl font-bold text-text-primary mb-2">
                        Demo Booked Successfully!
                      </h4>
                      <p className="text-sm text-text-secondary">
                        We&apos;ll contact you shortly on WhatsApp
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
