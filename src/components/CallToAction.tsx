
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

export default function CallToAction() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);
  
  return (
    <section ref={containerRef} className="py-24 md:py-32 px-6 md:px-12 relative overflow-hidden">
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-br from-nu-blue/90 to-nu-darkblue z-0"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 bottom-0 z-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-white/5 rounded-full"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-white/5 rounded-full"></div>
          <motion.div 
            className="absolute top-20 right-20 w-20 h-20 bg-white/5 rounded-full"
            animate={{ 
              y: [0, 15, 0],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 5,
              ease: "easeInOut"
            }}
          ></motion.div>
          <motion.div 
            className="absolute bottom-20 left-40 w-16 h-16 bg-white/5 rounded-full"
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 7,
              ease: "easeInOut"
            }}
          ></motion.div>
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-8 text-white">
            Transform Your Academic Experience
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Join thousands of Nazarbayev University students who are already using NU Academic Hub to improve their study habits and academic performance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="bg-white text-nu-blue hover:bg-gray-100 px-8 py-7 text-lg">
              <Link to="/dashboard">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8 py-7 text-lg">
              <Link to="/dashboard/exams">
                View Exam Schedule
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
