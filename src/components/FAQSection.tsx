
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I access my exam schedule?",
    answer: "After logging in, navigate to the 'Exams' section in the dashboard. There you can view all your upcoming exams, filter by course, and add them to your personal calendar."
  },
  {
    question: "Can I share my study materials with specific classmates only?",
    answer: "Yes, when uploading study materials you can set visibility permissions to specific users or groups. This allows you to share resources only with your intended audience."
  },
  {
    question: "How does the AI-powered study planner work?",
    answer: "Our study planner analyzes your course load, exam dates, and personal preferences to create an optimized study schedule. It recommends study sessions based on spaced repetition principles and your peak productivity hours."
  },
  {
    question: "Is my data secure on NU Academic Hub?",
    answer: "Absolutely. We employ industry-standard encryption and security practices to protect your academic information. Your data is only accessible to you and those you explicitly grant access to."
  },
  {
    question: "Can professors contribute to the platform?",
    answer: "Yes, professors can create official course spaces to share resources, announcements, and facilitate discussions. Contact your instructor to request they join the platform."
  }
];

export default function FAQSection() {
  return (
    <section className="py-20 px-6 md:px-12 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Frequently Asked <span className="text-nu-blue">Questions</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get answers to the most common questions about NU Academic Hub
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-gray-200 mb-4 rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 transition-all data-[state=open]:bg-gray-50">
                  <span className="text-left font-medium text-gray-900">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
