
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  content: string;
  avatarUrl?: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Aisha Nurmagambetova",
    role: "Computer Science Student",
    content: "The NU Academic Hub transformed how I prepare for exams. The study planner feature helped me organize my time efficiently, and I saw immediate improvements in my grades.",
  },
  {
    id: 2,
    name: "Daulet Arynov",
    role: "Mechanical Engineering Student",
    content: "The materials section is a lifesaver! Being able to access and share resources with my classmates in one place made collaboration so much easier.",
  },
  {
    id: 3,
    name: "Laura Kim",
    role: "Biology Student",
    content: "I love how the exam schedule syncs with my calendar. No more missing important dates or cramming last minute.",
  }
];

const cardVariants = {
  offscreen: { 
    y: 50,
    opacity: 0 
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
};

export default function Testimonials() {
  return (
    <section className="py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Trusted by <span className="text-nu-blue">NU Students</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear what our users have to say about how NU Academic Hub has helped them excel in their studies.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className={cn(
                "bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300",
                index === 1 && "md:translate-y-4"
              )}
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="flex flex-col h-full">
                <div className="mb-4 flex-grow">
                  <p className="text-gray-600 italic">&ldquo;{testimonial.content}&rdquo;</p>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-nu-blue/10 flex items-center justify-center mr-4">
                    {testimonial.avatarUrl ? (
                      <img 
                        src={testimonial.avatarUrl} 
                        alt={testimonial.name} 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-6 w-6 text-nu-blue" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
