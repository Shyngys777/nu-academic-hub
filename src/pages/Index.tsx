
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Calendar, Clock, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import SearchDialog from "@/components/SearchDialog";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import StatsSection from "@/components/StatsSection";
import CallToAction from "@/components/CallToAction";
import FAQSection from "@/components/FAQSection";

// Feature cards data
const features = [
  {
    icon: Calendar,
    title: "Exam Schedule",
    description: "Access your exam schedule at a glance. Filter by course, date, or location.",
    link: "/dashboard/exams",
    color: "bg-gradient-to-br from-blue-500/20 to-blue-600/30",
    delay: 0.2
  },
  {
    icon: BookOpen,
    title: "Study Planner",
    description: "Plan your study sessions effectively with our AI-powered recommendation system.",
    link: "/dashboard/planner",
    color: "bg-gradient-to-br from-amber-500/20 to-amber-600/30",
    delay: 0.4
  },
  {
    icon: GraduationCap,
    title: "Study Materials",
    description: "Find and share study resources for all your courses in one convenient location.",
    link: "/dashboard/materials",
    color: "bg-gradient-to-br from-green-500/20 to-green-600/30",
    delay: 0.6
  },
  {
    icon: Clock,
    title: "Dashboard",
    description: "Monitor your academic progress and manage upcoming deadlines efficiently.",
    link: "/dashboard",
    color: "bg-gradient-to-br from-purple-500/20 to-purple-600/30",
    delay: 0.8
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 100
    }
  }
};

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6 md:px-12 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-500/10 to-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-amber-500/10 to-red-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="mb-6 inline-block"
            >
              <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-nu-blue to-nu-darkblue flex items-center justify-center mx-auto shadow-lg">
                <span className="text-white font-bold text-2xl sm:text-4xl">NU</span>
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="text-nu-blue">Academic Hub</span> for{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-nu-blue to-nu-darkblue">
                Nazarbayev University
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Your all-in-one platform for exam preparation, study planning, and academic resources.
              Designed specifically for Nazarbayev University students.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex justify-center mb-8"
            >
              <SearchDialog />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg" className="bg-nu-blue hover:bg-nu-darkblue text-white px-6 py-6 text-lg">
                <Link to="/dashboard">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-nu-blue text-nu-blue hover:bg-nu-blue/10 py-6 text-lg">
                <Link to="/dashboard/exams">
                  View Exam Schedule
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* Features Section */}
      <section className="py-20 px-6 md:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Everything You Need for <span className="text-nu-blue">Academic Success</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive set of tools designed to help you excel in your studies
              at Nazarbayev University.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={cn(
                  "rounded-xl p-6 transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg",
                  feature.color
                )}
              >
                <div className="bg-white/80 rounded-full w-12 h-12 flex items-center justify-center mb-4 shadow-sm">
                  <feature.icon className="h-6 w-6 text-nu-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <Button asChild variant="ghost" className="text-nu-blue hover:bg-nu-blue/10 p-0">
                  <Link to={feature.link} className="flex items-center gap-2">
                    Explore <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <HowItWorks />
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* Call to Action */}
      <CallToAction />
      
      {/* Footer */}
      <footer className="mt-auto py-10 px-6 bg-gray-100 border-t">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 mb-8 border-b">
            <div>
              <h3 className="font-semibold text-lg mb-4">NU Academic Hub</h3>
              <p className="text-gray-600 mb-4">Your all-in-one platform for academic success at Nazarbayev University.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/dashboard" className="text-nu-blue hover:text-nu-darkblue transition-colors">Dashboard</Link></li>
                <li><Link to="/dashboard/exams" className="text-nu-blue hover:text-nu-darkblue transition-colors">Exam Schedule</Link></li>
                <li><Link to="/dashboard/planner" className="text-nu-blue hover:text-nu-darkblue transition-colors">Study Planner</Link></li>
                <li><Link to="/dashboard/materials" className="text-nu-blue hover:text-nu-darkblue transition-colors">Materials</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact</h3>
              <p className="text-gray-600">53 Kabanbay Batyr Ave</p>
              <p className="text-gray-600">Astana, 010000</p>
              <p className="text-gray-600">Kazakhstan</p>
              <p className="text-nu-blue mt-2">support@nuacademichub.com</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-gray-600">
              © 2025 NU Academic Hub. Made for Nazarbayev University students.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
