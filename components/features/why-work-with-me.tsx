"use client";

import { WifiOff, Gauge, Rocket, MessageSquareCode } from "lucide-react";
import { motion } from "framer-motion";
import { ScrambleText } from "@/components/ui/scramble-text";

export function WhyWorkWithMe() {
  const pillars = [
    {
      icon: <WifiOff className="w-6 h-6 text-blue-600 dark:text-blue-500" />,
      title: "Offline-First & Resilient Engineering",
      description: "I build apps designed for real-world network conditions—unstable Wi-Fi, low bandwidth, and zero data loss—ensuring your users never hit dead ends."
    },
    {
      icon: <Gauge className="w-6 h-6 text-blue-600 dark:text-blue-500" />,
      title: "Sub-Second Speed & 100/100 Lighthouse",
      description: "I optimize every kilobyte for lightning-fast initial loads and 60fps animations, keeping bounce rates low and Google search rankings high."
    },
    {
      icon: <Rocket className="w-6 h-6 text-blue-600 dark:text-blue-500" />,
      title: "Full Product & Business Ownership",
      description: "I don't just ship raw code. I take your project from initial problem discovery to live Vercel deployment with clear business metrics in mind."
    },
    {
      icon: <MessageSquareCode className="w-6 h-6 text-blue-600 dark:text-blue-500" />,
      title: "Async & Remote Ready Communication",
      description: "Proactive, clear updates tailored for global timezones with live staging preview links so you're always informed on milestone progress."
    }
  ];

  return (
    <section id="why-me" className="scroll-mt-24">
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#18181B] dark:text-[#F4F4F5] mb-2">
            <ScrambleText text="Why Work With Me" />
          </h2>
          <div className="h-1 w-12 bg-blue-600 dark:bg-blue-500 rounded-full mb-4" />
          <p className="text-[#52525B] dark:text-[#A1A1AA]">
            How I deliver tangible value and peace of mind for founders and remote teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-[#1A1A1A] p-6 rounded-xl border border-[#E4E4E7] dark:border-[#27272A] shadow-sm hover:border-blue-500/50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {pillar.icon}
              </div>
              <h3 className="text-lg font-bold text-[#18181B] dark:text-[#F4F4F5] mb-2">
                {pillar.title}
              </h3>
              <p className="text-[#52525B] dark:text-[#A1A1AA] text-sm leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
