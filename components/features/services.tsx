"use client";

import { MonitorSmartphone, Server, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { ScrambleText } from "@/components/ui/scramble-text";

export function Services() {
  const services = [
    {
      title: "Custom Web Applications",
      description: "I build fast, scalable web apps that automate your workflows, engage your customers, and directly increase your revenue.",
      icon: <MonitorSmartphone className="w-6 h-6 text-blue-600 dark:text-blue-500" />
    },
    {
      title: "Custom Dashboards & Internal Tools",
      description: "I design custom management portals, offline-first SME tools, and automated dashboards that replace manual spreadsheet work and streamline your daily operations.",
      icon: <Server className="w-6 h-6 text-blue-600 dark:text-blue-500" />
    },
    {
      title: "Performance & SEO Optimization",
      description: "I fix slow websites so they load instantly on mobile, rank higher on Google, and stop losing you potential customers.",
      icon: <Zap className="w-6 h-6 text-blue-600 dark:text-blue-500" />
    }
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
            Specialized services I offer for remote teams and freelance clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-[#1A1A1A] p-6 rounded-xl border border-[#E4E4E7] dark:border-[#27272A] shadow-sm hover:border-blue-500/50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-[#18181B] dark:text-[#F4F4F5] mb-2">
                {service.title}
              </h3>
              <p className="text-[#52525B] dark:text-[#A1A1AA] text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
