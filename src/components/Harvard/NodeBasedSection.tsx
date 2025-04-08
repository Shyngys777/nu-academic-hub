
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { BookOpen, Calendar, Clock, Award } from "lucide-react";

const nodes = [
  {
    id: 1,
    title: "View Your Exam Schedule",
    description:
      "Access your complete exam schedule in one place. Filter by course, date, or location to find exactly what you need.",
    icon: Calendar,
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
    textColor: "text-blue-700",
  },
  {
    id: 2,
    title: "Plan Your Study Sessions",
    description:
      "Create a personalized study plan that fits your schedule and learning style with our AI-powered recommendation system.",
    icon: Clock,
    color: "bg-amber-500",
    lightColor: "bg-amber-50",
    textColor: "text-amber-700",
  },
  {
    id: 3,
    title: "Access & Share Materials",
    description:
      "Find and share study resources with your peers. Notes, practice exams, and more all organized by course.",
    icon: BookOpen,
    color: "bg-green-500",
    lightColor: "bg-green-50",
    textColor: "text-green-700",
  },
  {
    id: 4,
    title: "Track Your Progress",
    description:
      "Monitor your academic progress, track completed study sessions, and celebrate your achievements.",
    icon: Award,
    color: "bg-purple-500",
    lightColor: "bg-purple-50",
    textColor: "text-purple-700",
  },
];

const NodeBasedSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-36 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-gray-900">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your academic journey simplified in four steps
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line connecting nodes */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />

          {nodes.map((node, index) => (
            <NodeItem key={node.id} node={node} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface NodeItemProps {
  node: {
    id: number;
    title: string;
    description: string;
    icon: any;
    color: string;
    lightColor: string;
    textColor: string;
  };
  index: number;
}

const NodeItem = ({ node, index }: NodeItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  
  const isEven = index % 2 === 0;

  return (
    <div className="mb-24 last:mb-0 relative">
      <div
        ref={ref}
        className={cn(
          "flex flex-col md:flex-row md:items-center gap-10",
          isEven ? "md:flex-row" : "md:flex-row-reverse"
        )}
      >
        {/* Node circle */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center"
        >
          <div
            className={cn(
              "relative w-20 h-20 rounded-full flex items-center justify-center z-10",
              node.lightColor
            )}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center",
                node.color
              )}
            >
              <node.icon className="h-6 w-6 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 20 : -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex-1 max-w-xl"
        >
          <h3 className={cn("text-2xl font-semibold mb-3", node.textColor)}>
            {node.title}
          </h3>
          <p className="text-gray-600">{node.description}</p>
        </motion.div>
      </div>

      {/* Vertical connector dot */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute left-1/2 transform -translate-x-1/2 h-4 w-4 rounded-full bg-gray-200 hidden md:block"
        style={{ top: "5rem" }}
      ></motion.div>
    </div>
  );
};

export default NodeBasedSection;
