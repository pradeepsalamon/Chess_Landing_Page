"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProgramsSection from "@/components/ProgramsSection";
import ClassTypesSection from "@/components/ClassTypesSection";
import SessionTimingSection from "@/components/SessionTimingSection";
import SundayTrainingSection from "@/components/SundayTrainingSection";
import DemoClassSection from "@/components/DemoClassSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import StatsSection from "@/components/StatsSection";
// import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";
import ChessScene from "@/components/ChessScene";

const interactivePointerClasses =
  "[&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_form]:pointer-events-auto [&_input]:pointer-events-auto [&_label]:pointer-events-auto [&_select]:pointer-events-auto [&_textarea]:pointer-events-auto [&_[role=button]]:pointer-events-auto";

const getScrollProgress = () => {
  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  if (scrollableHeight <= 0) {
    return 0;
  }

  return Math.min(Math.max(window.scrollY / scrollableHeight, 0), 1);
};

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({
      anchors: true,
      lerp: 0.08,
      smoothWheel: true,
    });

    let animationFrameId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const updateScrollProgress = () => {
      setScrollProgress(getScrollProgress());
    };

    updateScrollProgress();

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, []);

  return (
    <main className="scene-backed-landing relative isolate min-h-screen overflow-x-hidden">
      <ChessScene scrollProgress={scrollProgress} />
      <div
        className={`relative z-10 pointer-events-none ${interactivePointerClasses}`}
      >
        <Navbar />
        <HeroSection />
        <ProgramsSection />
        <ClassTypesSection />
        <SessionTimingSection />
        <SundayTrainingSection />
        <WhyChooseUsSection />
        <DemoClassSection />
        <TestimonialsSection />
        <StatsSection />
        {/* <GallerySection /> */}
        <ContactSection />
        <Footer />
        <FloatingElements />
      </div>
    </main>
  );
}
