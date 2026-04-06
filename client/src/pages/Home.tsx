import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatementSection from "@/components/StatementSection";
import ServicesSection from "@/components/ServicesSection";
import MethodologySection from "@/components/MethodologySection";
import OpenSourceSection from "@/components/OpenSourceSection";
import ShowcaseSection from "@/components/ShowcaseSection";
import IndustriesSection from "@/components/IndustriesSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-800 text-zinc-100 overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <StatementSection />
      <ServicesSection />
      <MethodologySection />
      <ShowcaseSection />
      <OpenSourceSection />
      <IndustriesSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
