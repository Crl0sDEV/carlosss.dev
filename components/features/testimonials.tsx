"use client";

import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { ScrambleText } from "@/components/ui/scramble-text";

export function Testimonials() {
  const testimonials = [
    {
      text: "Carlos completely transformed how we handle our data. The web app he built is lightning fast and solved a massive operational headache for our team. Highly recommended.",
      name: "Client Feedback",
      role: "E-Commerce Startup",
    },
    {
      text: "His attention to detail and ability to understand exactly what the business needed was incredible. He didn't just write code, he delivered a product that scaled our growth.",
      name: "Colleague Reference",
      role: "Senior Software Engineer",
    }
  ];

  return (
    <section id="testimonials" className="scroll-mt-24">
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#18181B] dark:text-[#F4F4F5] mb-2">
            <ScrambleText text="Client Feedback" />
          </h2>
          <div className="h-1 w-12 bg-blue-600 dark:bg-blue-500 rounded-full mb-4" />
          <p className="text-[#52525B] dark:text-[#A1A1AA]">
            What people say about working with me.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-[#1A1A1A] p-6 rounded-xl border border-[#E4E4E7] dark:border-[#27272A] shadow-sm relative group hover:border-blue-500/50 transition-all duration-300"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-blue-500/10 dark:text-blue-500/20 group-hover:text-blue-500/30 transition-colors" />
              <p className="text-sm text-[#52525B] dark:text-[#A1A1AA] italic mb-6 relative z-10 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-500 font-bold text-sm">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#18181B] dark:text-[#F4F4F5]">{testimonial.name}</h3>
                  <p className="text-xs text-[#52525B] dark:text-[#A1A1AA]">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
