"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { CardTilt } from "@/components/ui/card-tilt";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineLine1Ref = useRef<HTMLSpanElement>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement>(null);
  const avatarContainerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const statsGroupRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 1. Headline Masked Lines Stagger
      tl.from([headlineLine1Ref.current, headlineLine2Ref.current], {
        y: "115%",
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "power4.out",
      })
        // 2. Avatar pop-in with back ease
        .from(
          avatarContainerRef.current,
          {
            scale: 0.8,
            rotation: 8,
            opacity: 0,
            duration: 0.9,
            ease: "back.out(1.6)",
          },
          "-=0.8"
        )
        // 3. Bio text fade and rise
        .from(
          bioRef.current,
          {
            y: 25,
            opacity: 0,
            filter: "blur(6px)",
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        // 4. CTA Buttons pop-in
        .from(
          ".hero-cta-btn",
          {
            y: 20,
            opacity: 0,
            scale: 0.95,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.4)",
          },
          "-=0.5"
        )
        // 5. Trust Metrics Strip Stagger
        .from(
          ".hero-stat-pill",
          {
            y: 15,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.4"
        );

      // Continuous subtle idle floating animation for the availability badge
      if (badgeRef.current) {
        gsap.to(badgeRef.current, {
          y: -4,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    },
    { scope: containerRef }
  );

  const trustMetrics = [
    { label: "Sub-second Page Loads", highlight: "< 1s" },
    { label: "Lighthouse Performance", highlight: "100/100" },
    { label: "Full Stack Architecture", highlight: "End-to-End" },
  ];

  return (
    <section ref={containerRef} id="home" className="pt-10 sm:pt-14">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-8">
          {/* Kinetic Masked Headline */}
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#18181B] dark:text-[#F4F4F5] leading-tight flex-1">
            <span className="block overflow-hidden pb-1">
              <span ref={headlineLine1Ref} className="block will-change-transform">
                I build <span className="text-stroke-blue font-extrabold">custom</span> web apps
              </span>
            </span>
            <span className="block overflow-hidden pt-0.5">
              <span
                ref={headlineLine2Ref}
                className="block text-blue-600 dark:text-blue-500 will-change-transform"
              >
                that drive real business results
              </span>
            </span>
          </h1>

          {/* Interactive 3D Avatar + Available Status */}
          <div ref={avatarContainerRef} className="shrink-0 self-center sm:self-auto will-change-transform">
            <CardTilt maxTilt={7} scale={1.03}>
              <div className="flex flex-col items-center gap-2.5 w-28 sm:w-32">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl relative overflow-hidden bg-[#E4E4E7] dark:bg-[#27272A] shadow-lg shadow-blue-500/5 dark:shadow-blue-500/10 border-4 border-white dark:border-[#18181B] cursor-pointer">
                  <Image
                    src="/profile.png"
                    alt="Carlos Miguel Sandrino"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 128px, 128px"
                    priority
                  />
                </div>

                {/* Live Availability Badge */}
                <div
                  ref={badgeRef}
                  className="flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-full bg-white dark:bg-[#1A1A1A] border border-[#E4E4E7] dark:border-[#27272A] shadow-sm w-full text-center"
                >
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600 dark:bg-blue-500"></span>
                  </span>
                  <span className="text-[11px] font-semibold text-[#18181B] dark:text-[#F4F4F5] tracking-tight whitespace-nowrap">
                    Available for Hire
                  </span>
                </div>
              </div>
            </CardTilt>
          </div>
        </div>

        {/* Bio Description */}
        <p
          ref={bioRef}
          className="text-lg text-[#52525B] dark:text-[#A1A1AA] leading-relaxed max-w-2xl will-change-transform"
        >
          I'm Carlos, a Full Stack Developer. I help businesses scale by engineering high-performance
          web applications, automating workflows, and delivering measurable digital solutions that solve
          real problems.
        </p>

        {/* CTA Actions */}
        <div ref={ctaGroupRef} className="flex flex-wrap gap-4 pt-2">
          <div className="hero-cta-btn">
            <MagneticButton strength={0.3}>
              <a
                href="#contact"
                className="inline-flex items-center justify-center whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/25 rounded-xl px-7 h-11 font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-95"
              >
                Book a Free Call
              </a>
            </MagneticButton>
          </div>
          <div className="hero-cta-btn">
            <MagneticButton strength={0.3}>
              <a
                href="#projects"
                className="inline-flex items-center justify-center whitespace-nowrap border border-[#E4E4E7] dark:border-[#27272A] text-[#18181B] dark:text-[#F4F4F5] hover:bg-[#F4F4F5] dark:hover:bg-[#1A1A1A] rounded-xl px-7 h-11 font-medium bg-transparent transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-95"
              >
                View Case Studies
              </a>
            </MagneticButton>
          </div>
        </div>

        {/* Trust Metrics Strip */}
        <div ref={statsGroupRef} className="flex flex-wrap items-center gap-3 pt-2">
          {trustMetrics.map((metric) => (
            <div
              key={metric.label}
              className="hero-stat-pill inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/80 dark:bg-[#1A1A1A]/80 border border-[#E4E4E7] dark:border-[#27272A] shadow-xs text-xs"
            >
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                {metric.highlight}
              </span>
              <span className="text-[#71717A] dark:text-[#A1A1AA]">{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
