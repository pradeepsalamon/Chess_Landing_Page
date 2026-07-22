"use client";

import { useState, useEffect } from "react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Programs", href: "#programs" },
  { label: "Class Types", href: "#class-types" },
  { label: "About Us", href: "#why-choose-us" },
  { label: "Demo Classes", href: "#demo" },
  { label: "Training", href: "#sunday-training" },
  { label: "Contact", href: "#contact" },
  { label: "Admin", href: "/admin" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white shadow-lg shadow-blue-500/10 border-b-2 border-[#1a3a52] reveal reveal-up ${scrolled ? 'py-0' : 'py-2'}`}
      style={{ transitionDelay: '0s' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 group hover:scale-105 transition-transform"
          >
            <img 
              src="/nexa_logo.png" 
              alt="NEXA Chess Academy" 
              className="w-12 h-12 drop-shadow-lg"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative px-4 py-2 text-sm text-[#4a5f7f] hover:text-[#1a3a52] transition-colors duration-300 group hover:-translate-y-0.5"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-[#1a3a52] to-transparent group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#demo"
              className="btn-gold text-sm !py-2.5 !px-6 rounded-full hover:scale-105 active:scale-95 transition-transform"
            >
              Book Free Demo
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-[2px] bg-[#1a3a52] origin-center transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[8px]' : ''}`}
            />
            <span
              className={`block w-6 h-[2px] bg-[#1a3a52] transition-all duration-300 ${mobileOpen ? 'opacity-0' : 'opacity-100'}`}
            />
            <span
              className={`block w-6 h-[2px] bg-[#1a3a52] origin-center transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden glass-strong border-t border-glass-border overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-4 py-6 space-y-1">
          {navItems.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 text-[#4a5f7f] hover:text-[#1a3a52] hover:bg-black/5 rounded-lg transition-all duration-300 transform ${mobileOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
              style={{ transitionDelay: mobileOpen ? `${i * 50}ms` : '0ms' }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#demo"
            onClick={() => setMobileOpen(false)}
            className={`block btn-gold text-center mt-4 rounded-full transition-all duration-300 transform ${mobileOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
            style={{ transitionDelay: mobileOpen ? `${navItems.length * 50}ms` : '0ms' }}
          >
            Book Free Demo
          </a>
        </div>
      </div>
    </nav>
  );
}
