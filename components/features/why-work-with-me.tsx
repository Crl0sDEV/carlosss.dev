"use client";

import { WifiOff, Gauge, Rocket, MessageSquareCode } from "lucide-react";
import { motion } from "framer-motion";
import { ScrambleText } from "@/components/ui/scramble-text";

export function WhyWorkWithMe() {
  const pillars = [
    {
      icon: <WifiOff className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      title: "Offline-First & Resilient Engineering",
      description: "I build apps designed for real-world network conditions—unstable Wi-Fi, low bandwidth, and zero data loss—ensuring your users never hit dead ends."
    },
    {
      icon: <Gauge className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      title: "Sub-Second Speed & 100/100 Lighthouse",
      description: "I optimize every kilobyte for lightning-fast initial loads and 60fps animations, keeping bounce rates low and Google search rankings high."
    },
    {
      icon: <Rocket className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      title: "Full Product & Business Ownership",
      description: "I don't just ship raw code. I take your project from initial problem discovery to live Vercel deployment with clear business metrics in mind."
    },
    {
      icon: <MessageSquareCode className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
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

        {/* Horizontal Row List layout for distinct visual variety */}
        <div className="flex flex-col gap-4">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
              whileHover={{ x: 6 }}
              className="flex items-start gap-4 p-5 rounded-xl bg-white dark:bg-[#1A1A1A] border border-[#E4E4E7] dark:border-[#27272A] shadow-sm hover:border-blue-500/40 transition-all duration-300 group"
            >
              {/* Pill-style circular icon badge */}
              <div className="mt-0.5 w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200/80 dark:border-blue-800/40 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/60 transition-transform">
                {pillar.icon}
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-bold text-[#18181B] dark:text-[#F4F4F5] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
