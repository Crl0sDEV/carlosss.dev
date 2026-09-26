"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { VelocityMarquee } from "@/components/ui/velocity-marquee";
import { SectionHeading } from "@/components/ui/section-heading";

const GithubContributions = dynamic(
  () => import("./github-contributions").then((m) => ({ default: m.GithubContributions }))
);

export function About() {
  const frontendSkills = [
    "TypeScript",
    "React 19",
    "Next.js",
    "Tailwind CSS",
    "GSAP Animations",
    "Framer Motion",
    "Responsive UI",
  ];

  const backendSkills = [
    "Node.js",
    "PostgreSQL",
    "Supabase",
    "REST APIs",
    "GraphQL",
    "Git & GitHub",
    "Performance Optimization",
  ];

  return (
    <section id="about" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="flex flex-col gap-8"
      >
        <SectionHeading title="About Me" />

        <div className="space-y-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl mx-auto text-center">
          <p>
            I&apos;m a full-stack developer who enjoys building clean, functional, and responsive websites. I work with modern tools like Next.js, React, Tailwind CSS, and Supabase to build web applications that are easy to use and maintain.
          </p>
        </div>

        <GlassCard
          maxTilt={4}
          className="liquid-glass p-6 sm:p-7 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-sans text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
              Skills & Technologies
            </h3>
          </div>

          <VelocityMarquee row1={frontendSkills} row2={backendSkills} />
        </GlassCard>

        <GithubContributions />
      </motion.div>
    </section>
  );
}
