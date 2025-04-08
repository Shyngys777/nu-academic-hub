
import { motion } from "framer-motion";
import { Calendar, BookOpen, Clock, Award } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "View Your Exam Schedule",
    description: "Access your complete exam schedule in one place. Filter by course, date, or location to find exactly what you need.",
    icon: Calendar,
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Plan Your Study Sessions",
    description: "Create a personalized study plan that fits your schedule and learning style with our AI-powered recommendation system.",
    icon: Clock,
    color: "bg-amber-500",
  },
  {
    id: 3,
    title: "Access & Share Materials",
    description: "Find and share study resources with your peers. Notes, practice exams, and more all organized by course.",
    icon: BookOpen,
    color: "bg-green-500",
  },
  {
    id: 4,
    title: "Track Your Progress",
    description: "Monitor your academic progress, track completed study sessions, and celebrate your achievements.",
    icon: Award,
    color: "bg-purple-500",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-6 md:px-12 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            How <span className="text-nu-blue">It Works</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            NU Academic Hub streamlines your academic journey with these simple steps
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="relative"
            >
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300 h-full flex flex-col">
                <div className={`w-12 h-12 rounded-full ${step.color} flex items-center justify-center mb-4`}>
                  <step.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
