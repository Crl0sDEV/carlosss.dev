"use client";

import { motion } from "framer-motion";
import { ScrambleText } from "@/components/ui/scramble-text";

export function WhyWorkWithMe() {
  const pillars = [
    {
      num: "01",
      category: "ARCHITECTURE",
      title: "Offline-First & Resilient Engineering",
      description: "Applications designed for unstable networks and low-bandwidth environments. Automatic background synchronization ensures zero data loss during connectivity drops.",
      metric: "Zero Data Loss",
    },
    {
      num: "02",
      category: "PERFORMANCE",
      title: "Sub-Second Load & 100/100 Lighthouse",
      description: "Optimizing bundle sizes, database queries, and static asset caching to achieve instant page loads, smooth 60fps UI, and top Google search rankings.",
      metric: "100/100 Core Vitals",
    },
    {
      num: "03",
      category: "OWNERSHIP",
      title: "Full Product & Business Accountability",
      description: "I don't just write raw code. I collaborate from problem discovery to live Vercel production deployment, focusing on software that achieves business goals.",
      metric: "End-to-End Shipping",
    },
    {
      num: "04",
      category: "COMMUNICATION",
      title: "Async & Global Timezone Ready",
      description: "Proactive status updates, clear milestone documentation, and live staging preview links so you always have total clarity on project progress.",
      metric: "Live Staging Previews",
    },
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
            Core engineering standards and principles I bring to every client collaboration.
          </p>
        </div>

        {/* 2x2 Bento Executive Guarantee Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-6 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-[#E4E4E7] dark:border-[#27272A] shadow-sm hover:border-blue-500/40 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group"
            >
              {/* Background Monospace Number Watermark */}
              <span className="absolute top-3 right-4 font-mono text-4xl font-extrabold text-[#E4E4E7]/60 dark:text-[#27272A]/80 select-none group-hover:text-blue-500/20 transition-colors">
                {pillar.num}
              </span>

              <div>
                <span className="font-mono text-[11px] font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase block mb-2">
                  // {pillar.category}
                </span>
                <h3 className="text-lg font-bold text-[#18181B] dark:text-[#F4F4F5] mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#52525B] dark:text-[#A1A1AA] leading-relaxed mb-6">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F4F4F5] dark:border-[#27272A] flex items-center justify-between">
                <span className="text-xs font-mono font-medium text-[#71717A] dark:text-[#A1A1AA]">
                  GUARANTEED STANDARD
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40">
                  {pillar.metric}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
