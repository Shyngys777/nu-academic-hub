
import { motion, useScroll, useTransform } from "framer-motion";
import { GraduationCap, Book, Users, Award } from "lucide-react";
import CountUp from "react-countup";
import { cn } from "@/lib/utils";
import { useRef } from "react";

const stats = [
  {
    id: 1,
    value: 15000,
    label: "Study Sessions Planned",
    icon: GraduationCap,
    color: "bg-blue-50 text-blue-600"
  },
  {
    id: 2,
    value: 8500,
    label: "Resources Shared",
    icon: Book,
    color: "bg-amber-50 text-amber-600"
  },
  {
    id: 3,
    value: 5000,
    label: "Active Students",
    icon: Users,
    color: "bg-green-50 text-green-600"
  },
  {
    id: 4,
    value: 98,
    suffix: "%",
    label: "Student Satisfaction",
    icon: Award,
    color: "bg-purple-50 text-purple-600"
  }
];

export default function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  
  return (
    <section ref={containerRef} className="py-24 px-6 md:px-12 relative overflow-hidden bg-gray-50">
      {/* Decorative shapes */}
      <motion.div 
        style={{ y }}
        className="absolute top-0 left-0 w-1/3 h-1/2 bg-gradient-to-br from-blue-100/30 to-purple-100/20 rounded-full blur-3xl -z-10" 
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
        className="absolute bottom-0 right-0 w-1/2 h-1/3 bg-gradient-to-tr from-amber-100/30 to-red-100/20 rounded-full blur-3xl -z-10" 
      />
      
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-gray-900">
            Our Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            NU Academic Hub is transforming how students prepare for exams and manage their studies
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mb-6", stat.color)}>
                  <stat.icon className="h-8 w-8" />
                </div>
                <h3 className="text-4xl font-serif mb-2 text-gray-900">
                  <CountUp 
                    end={stat.value} 
                    duration={2.5} 
                    suffix={stat.suffix || ""} 
                    separator="," 
                  />
                </h3>
                <p className="text-lg text-gray-600">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
