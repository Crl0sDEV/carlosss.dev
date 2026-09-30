"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function WhyWorkWithMe() {
  const containerRef = useRef<HTMLElement>(null);

  const pillars = [
    {
      num: "01",
      title: "Clean & Maintainable Code",
      description:
        "I write well-structured, readable code that is easy to update and scale as your project grows over time.",
      tag: "Code Quality",
    },
    {
      num: "02",
      title: "Fast & Responsive Design",
      description:
        "Every application is built to load quickly and work seamlessly across phones, tablets, and desktop computers.",
      tag: "Mobile-Friendly",
    },
    {
      num: "03",
      title: "Reliable Communication",
      description:
        "Clear, honest updates throughout the project so you always know the current status and next steps.",
      tag: "Direct Updates",
    },
    {
      num: "04",
      title: "End-to-End Delivery",
      description:
        "From initial development to live deployment, I make sure everything works properly before handing it over.",
      tag: "Full Support",
    },
  ];

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>(".pillar-card");
      if (!rows.length) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      rows.forEach((row, idx) => {
        gsap.from(row, {
          scrollTrigger: {
            trigger: row,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          y: 20,
          opacity: 0,
          duration: 0.55,
          delay: idx * 0.08,
          ease: "power3.out",
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="why-me" className="scroll-mt-24">
      <div className="flex flex-col gap-8">
        <SectionHeading
          title="Why Work With Me"
          description="What you can expect when collaborating together."
        />

        {/* Reasons Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, idx) => (
            <GlassCard
              key={idx}
              maxTilt={8}
              className="pillar-card group liquid-glass rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-5 transition-all duration-300 shadow-sm hover:shadow-xl h-full"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#636B2F] dark:text-[#D4DE95]">
                    [{pillar.num}]
                  </span>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md liquid-glass-subtle text-xs font-mono text-neutral-700 dark:text-neutral-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#636B2F] dark:bg-[#D4DE95]" />
                    <span>{pillar.tag}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight group-hover:text-[#636B2F] dark:group-hover:text-[#D4DE95] transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {pillar.description}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
