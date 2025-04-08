
import { motion } from "framer-motion";
import { GraduationCap, Book, Users, Award } from "lucide-react";
import CountUp from "react-countup";
import { cn } from "@/lib/utils";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
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

export default function StatsSection() {
  return (
    <section className="py-16 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {stats.map((stat) => (
            <motion.div 
              key={stat.id}
              variants={itemVariants}
              className="bg-white rounded-xl p-6 shadow border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mb-4", stat.color)}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-bold mb-1">
                  <CountUp 
                    end={stat.value} 
                    duration={2.5} 
                    suffix={stat.suffix || ""} 
                    separator="," 
                  />
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
