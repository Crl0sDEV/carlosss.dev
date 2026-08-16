"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <section id="home" className="pt-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-8">
          <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl font-bold tracking-tight text-[#18181B] dark:text-[#F4F4F5] leading-tight flex-1">
            I build custom web apps <br />
            <span className="text-blue-600 dark:text-blue-500">
              that drive real business results
            </span>
          </motion.h1>

          {/* Profile photo container + high-trust status badge hugged together */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-2 shrink-0 group rotate-3 hover:rotate-0 transition-transform duration-300 w-28 sm:w-32 self-center sm:self-auto"
          >
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl relative overflow-hidden bg-[#E4E4E7] dark:bg-[#27272A] shadow-md shadow-black/5 dark:shadow-black/20 border-4 border-white dark:border-[#121212] cursor-pointer">
              <Image
                src="/profile.png"
                alt="Carlos Miguel"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 128px, 128px"
                priority
              />
            </div>

            {/* Professional Credibility Badge */}
            <div className="flex items-center justify-center gap-1.5 px-2 py-1 rounded-full bg-white dark:bg-[#1A1A1A] border border-[#E4E4E7] dark:border-[#27272A] shadow-sm w-full text-center">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-semibold text-[#18181B] dark:text-[#F4F4F5] tracking-tight whitespace-nowrap">Available for Hire</span>
            </div>
          </motion.div>
        </div>

        <motion.p variants={itemVariants} className="text-lg text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">
          I'm Carlos, a Full Stack Developer. I help businesses scale by engineering high-performance web applications, automating workflows, and delivering measurable digital solutions that solve real problems.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="#contact"
            className="inline-flex items-center justify-center whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 rounded-lg px-6 h-10 font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Book a Free Call
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="#projects"
            className="inline-flex items-center justify-center whitespace-nowrap border border-[#E4E4E7] dark:border-[#27272A] text-[#18181B] dark:text-[#F4F4F5] hover:bg-[#F4F4F5] dark:hover:bg-[#1A1A1A] rounded-lg px-6 h-10 font-medium bg-transparent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            View Case Studies
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
