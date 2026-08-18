"use client";

import { motion } from "framer-motion";
import { ScrambleText } from "@/components/ui/scramble-text";

export function Services() {
  const services = [
    {
      num: "01",
      tag: "FULL-STACK WEB APPS",
      title: "Custom Web Applications",
      description: "Engineering tailored, high-performance web platforms from scratch. Designed for seamless user engagement, security, and automated workflows that save business hours.",
      deliverables: ["Next.js App Router", "Supabase / PostgreSQL", "Real-Time Synchronization"],
      outcome: "Directly increases customer conversion and operational scale.",
    },
    {
      num: "02",
      tag: "ENTERPRISE & SME TOOLS",
      title: "Dashboards & Internal Systems",
      description: "Replacing error-prone spreadsheets with custom management portals, inventory ledgers, and offline-first administrative suites built for daily business reliability.",
      deliverables: ["Offline-First PWA", "IndexedDB Caching", "Custom Analytics"],
      outcome: "Eliminates data loss and manual tracking overhead.",
    },
    {
      num: "03",
      tag: "PERFORMANCE & AUDITS",
      title: "Speed & SEO Optimization",
      description: "Auditing and optimizing existing web applications for sub-second page loads, mobile responsiveness, and 100/100 Google Lighthouse scores to maximize search visibility.",
      deliverables: ["100/100 Lighthouse", "Vercel Edge ISR", "Core Web Vitals"],
      outcome: "Lowers bounce rates and boosts Google organic rankings.",
    },
  ];

  return (
    <section id="services" className="scroll-mt-24">
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#18181B] dark:text-[#F4F4F5] mb-2">
            <ScrambleText text="What I Can Do For You" />
          </h2>
          <div className="h-1 w-12 bg-blue-600 dark:bg-blue-500 rounded-full mb-4" />
          <p className="text-[#52525B] dark:text-[#A1A1AA]">
            Specialized engineering solutions focused on measurable business outcomes.
          </p>
        </div>

        {/* Tabbed / Card-based Professional Feature Architecture */}
        <div className="flex flex-col gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-[#E4E4E7] dark:border-[#27272A] shadow-sm hover:border-blue-500/50 dark:hover:border-blue-500/40 transition-all duration-300 relative overflow-hidden"
            >
              {/* Top Row: Index + Category Tag */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40">
                    {service.num}
                  </span>
                  <span className="font-mono text-xs font-semibold tracking-wider text-[#71717A] dark:text-[#A1A1AA] uppercase">
                    {service.tag}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-[#18181B] dark:text-[#F4F4F5] mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-[#52525B] dark:text-[#A1A1AA] text-sm leading-relaxed mb-5 max-w-2xl">
                {service.description}
              </p>

              {/* Deliverable Tags & Outcome Highlight */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#F4F4F5] dark:border-[#27272A]">
                <div className="flex flex-wrap gap-2">
                  {service.deliverables.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium px-2.5 py-1 rounded-md bg-[#F4F4F5] dark:bg-[#27272A] text-[#3F3F46] dark:text-[#D4D4D8]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="text-xs font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                  {service.outcome}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
