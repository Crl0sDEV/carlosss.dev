"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function Services() {
  const containerRef = useRef<HTMLElement>(null);

  const services = [
    {
      num: "01",
      title: "Web Application Development",
      description:
        "Building tailored, responsive web applications from scratch using modern frameworks. Focused on clean code, smooth navigation, and reliable performance.",
      deliverables: ["Next.js & React", "Supabase & PostgreSQL", "Authentication & Security", "Fast Deployment"],
    },
    {
      num: "02",
      title: "Frontend & UI Design",
      description:
        "Creating beautiful, modern, and mobile-friendly user interfaces that match your brand identity and provide an intuitive experience for your visitors.",
      deliverables: ["Responsive Layouts", "Modern UI Components", "Mobile-First Design", "Performance Optimization"],
    },
    {
      num: "03",
      title: "Backend & Database Integration",
      description:
        "Setting up reliable databases, custom APIs, and backend logic to securely manage your application data and keep everything running smoothly.",
      deliverables: ["Database Setup", "API Integration", "Secure Data Flow", "Cloud Hosting"],
    },
  ];

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>(".service-card");
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
    <section ref={containerRef} id="services" className="scroll-mt-24">
      <div className="flex flex-col gap-8">
        <SectionHeading
          title="Services"
          description="What I can help you build."
        />

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <GlassCard
              key={index}
              maxTilt={8}
              className="service-card group liquid-glass rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-5 transition-all duration-300 shadow-sm hover:shadow-xl h-full"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-red-500 dark:text-red-400">
                    [{service.num}]
                  </span>
                </div>

                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors">
                  {service.title}
                </h3>

                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {service.description}
                </p>
              </div>

              {/* Deliverables List */}
              <div className="pt-4 border-t border-black/5 dark:border-white/10 flex flex-wrap gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                {service.deliverables.map((item, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md liquid-glass-subtle">
                    <span className="text-red-500 dark:text-red-400 font-bold">&bull;</span>
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
