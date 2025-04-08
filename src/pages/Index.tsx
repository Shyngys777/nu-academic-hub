
import { Link } from "react-router-dom";
import HeroSection from "@/components/Harvard/HeroSection";
import NodeBasedSection from "@/components/Harvard/NodeBasedSection";
import FeaturedSection from "@/components/Harvard/FeaturedSection";
import CallToActionSection from "@/components/Harvard/CallToActionSection";
import Footer from "@/components/Harvard/Footer";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import ChatbotAssistant from "@/components/ChatbotAssistant";

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

      {/* Chatbot */}
      <ChatbotAssistant />
    </div>
  );
};

export default Index;
