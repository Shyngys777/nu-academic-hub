
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import HeroSection from "@/components/Harvard/HeroSection";
import NodeBasedSection from "@/components/Harvard/NodeBasedSection";
import FeaturedSection from "@/components/Harvard/FeaturedSection";
import CallToActionSection from "@/components/Harvard/CallToActionSection";
import Footer from "@/components/Harvard/Footer";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Section */}
      <FeaturedSection />
      
      {/* How It Works Section with Nodes */}
      <NodeBasedSection />
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* Call to Action */}
      <CallToActionSection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
