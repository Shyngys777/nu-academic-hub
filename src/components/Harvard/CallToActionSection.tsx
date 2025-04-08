
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CallToActionSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);
  
  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-40 overflow-hidden"
    >
      {/* Background image with parallax effect */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-nu-darkblue">
          <div 
            className="absolute inset-0 bg-[url('https://nu.edu.kz/media/%D0%A4%D0%BE%D1%82%D0%BE%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D0%B8%20%D1%82%D0%B5%D0%BA%D1%81%D1%82%D0%BE%D0%B2%D1%8B%D1%85%20%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86/DJI_0958.jpg')] bg-cover bg-center mix-blend-overlay opacity-30"
          ></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-nu-darkblue to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-nu-darkblue to-transparent opacity-50"></div>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif mb-8 text-white"
          >
            Transform Your Academic Experience
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/80 mb-12"
          >
            Join thousands of Nazarbayev University students who are already using 
            NU Academic Hub to improve their study habits and academic performance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-white hover:bg-gray-100 text-nu-darkblue hover:text-nu-blue px-8 py-7 text-lg"
            >
              <Link to="/dashboard">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
