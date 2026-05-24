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

export default function Home() {
  return (
    <main className="relative">
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
    </main>
  );
}
