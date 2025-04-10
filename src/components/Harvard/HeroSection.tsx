
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import SearchDialog from "../SearchDialog";

const HeroSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Harvard-inspired header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn(
          "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500",
          scrolled ? "bg-white shadow-md py-2" : "py-6"
        )}
      >
        <div className="container mx-auto flex justify-between items-center px-6">
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="w-12 h-12 rounded-md bg-nu-blue flex items-center justify-center"
            >
              <span className="text-white font-bold text-xl">NU</span>
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="hidden md:block text-2xl font-semibold text-gray-800"
            >
              Academic Hub
            </motion.span>
          </Link>

          <div className="flex items-center space-x-4">
            <div className="w-[200px] lg:w-[250px]">
              <SearchDialog />
            </div>
            
            <Button
              variant="ghost"
              size="lg"
              className="text-lg font-medium"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="h-5 w-5 mr-2" />
              <span>Menu</span>
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen menu like Harvard */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-50 text-white overflow-auto"
        >
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-12">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-md bg-nu-blue flex items-center justify-center">
                  <span className="text-white font-bold text-xl">NU</span>
                </div>
                <span className="text-2xl font-semibold text-white">
                  Academic Hub
                </span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="h-6 w-6" />
                <span className="sr-only md:not-sr-only md:ml-2 md:inline-block">
                  Close
                </span>
              </Button>
            </div>

            <div className="grid gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Link
                  to="/dashboard"
                  className="text-4xl md:text-5xl font-light hover:text-nu-gold transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  to="/dashboard/exams"
                  className="text-4xl md:text-5xl font-light hover:text-nu-gold transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Exams
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  to="/dashboard/planner"
                  className="text-4xl md:text-5xl font-light hover:text-nu-gold transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Study Planner
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  to="/dashboard/materials"
                  className="text-4xl md:text-5xl font-light hover:text-nu-gold transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Materials
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  to="/dashboard/smartmind"
                  className="text-4xl md:text-5xl font-light hover:text-nu-gold transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  SmartMind
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link
                  to="/dashboard/settings"
                  className="text-4xl md:text-5xl font-light hover:text-nu-gold transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </Link>
              </motion.div>
            </div>

            <div className="mt-16 border-t border-white/20 pt-8">
              <div className="flex flex-wrap gap-6 text-sm">
                <Link
                  to="/about"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Contact
                </Link>
                <Link
                  to="/faq"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
                <Link
                  to="/privacy"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <div className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 z-0">
          <div className="absolute inset-0 bg-[url('https://nu.edu.kz/media/%D0%A4%D0%BE%D1%82%D0%BE%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D0%B8%20%D1%82%D0%B5%D0%BA%D1%81%D1%82%D0%BE%D0%B2%D1%8B%D1%85%20%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86/DJI_0958.jpg')] bg-cover bg-center opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="max-w-4xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1, ease: "easeOut" }}
              className="text-5xl md:text-7xl lg:text-8xl text-gray-900 font-serif leading-tight mb-8"
            >
              Welcome to{" "}
              <span className="block text-nu-blue">NU Academic Hub</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1, ease: "easeOut" }}
              className="text-xl md:text-2xl text-gray-700 max-w-2xl mb-12 leading-relaxed"
            >
              Where dedicated students and faculty come together to pursue
              knowledge, excel in academics, and create a vibrant learning
              community at Nazarbayev University.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 mt-8"
            >
              <Button
                asChild
                size="lg"
                className="bg-nu-blue hover:bg-nu-darkblue text-white px-8 py-6 text-lg"
              >
                <Link to="/dashboard">Explore Dashboard</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-nu-blue text-nu-blue hover:bg-nu-blue/5 px-8 py-6 text-lg"
              >
                <Link to="/dashboard/smartmind">Try SmartMind AI</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
