
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, BookOpen, Clock, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

// Feature cards data
const features = [
  {
    icon: Calendar,
    title: "Exam Schedule",
    description: "Access your exam schedule at a glance. Filter by course, date, or location.",
    link: "/dashboard/exams",
    color: "bg-gradient-to-br from-blue-500/10 to-blue-600/20",
    delay: 0.2,
  },
  {
    icon: BookOpen,
    title: "Study Planner",
    description: "Plan your study sessions effectively with our AI-powered recommendation system.",
    link: "/dashboard/planner",
    color: "bg-gradient-to-br from-amber-500/10 to-amber-600/20",
    delay: 0.4,
  },
  {
    icon: GraduationCap,
    title: "Study Materials",
    description: "Find and share study resources for all your courses in one convenient location.",
    link: "/dashboard/materials",
    color: "bg-gradient-to-br from-green-500/10 to-green-600/20",
    delay: 0.6,
  },
  {
    icon: Clock,
    title: "Dashboard",
    description: "Monitor your academic progress and manage upcoming deadlines efficiently.",
    link: "/dashboard",
    color: "bg-gradient-to-br from-purple-500/10 to-purple-600/20",
    delay: 0.8,
  },
];

const FeaturedSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-gray-50 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <motion.div
        style={{ y }}
        className="absolute right-0 top-0 w-96 h-96 bg-blue-100 rounded-full filter blur-3xl opacity-30 -z-10"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
        className="absolute left-0 bottom-0 w-72 h-72 bg-amber-100 rounded-full filter blur-3xl opacity-30 -z-10"
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-gray-900">
            Everything You Need for{" "}
            <span className="text-nu-blue">Academic Success</span>
          </h2>
          <p className="text-xl text-gray-600">
            Explore our comprehensive tools designed to help you excel in your
            studies at Nazarbayev University
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ feature, index }: { feature: any; index: number }) => {
  const cardRef = useRef(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "rounded-xl p-8 transition-all duration-300 border border-transparent hover:border-gray-200 hover:shadow-lg group",
        feature.color
      )}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
        className="bg-white rounded-full w-14 h-14 flex items-center justify-center mb-6 shadow-sm"
      >
        <feature.icon className="h-7 w-7 text-nu-blue" />
      </motion.div>

      <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
      <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors">
        {feature.description}
      </p>

      <Link
        to={feature.link}
        className="inline-flex items-center text-nu-blue font-medium hover:text-nu-darkblue transition-all"
      >
        <span className="mr-1">Explore</span>
        <motion.div
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowRight className="h-4 w-4" />
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default FeaturedSection;
