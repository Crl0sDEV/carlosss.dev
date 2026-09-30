"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ArrowUpRight } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const portraitFrameRef = useRef<HTMLDivElement>(null);
  const halftoneRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-tag-item", {
        opacity: 0,
        y: 15,
        duration: 0.6,
        stagger: 0.08,
      })
        .from(
          headlineRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .from(
          portraitRef.current,
          {
            scale: 0.92,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          bioRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .from(
          ".hero-cta-btn",
          {
            y: 16,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.2)",
          },
          "-=0.4"
        )
        .from(
          bottomBarRef.current,
          {
            opacity: 0,
            y: 12,
            duration: 0.5,
          },
          "-=0.2"
        );

      // Multi-layer depth parallax on mouse move
      const container = containerRef.current;
      const portraitFrame = portraitFrameRef.current;
      const halftone = halftoneRef.current;
      const glow = glowRef.current;

      const isDesktop = window.matchMedia("(pointer: fine)").matches;
      if (!container || !isDesktop) return;

      const portraitX = gsap.quickTo(portraitFrame, "x", { duration: 0.5, ease: "power2.out" });
      const portraitY = gsap.quickTo(portraitFrame, "y", { duration: 0.5, ease: "power2.out" });
      const portraitRotX = gsap.quickTo(portraitFrame, "rotationX", { duration: 0.5, ease: "power2.out" });
      const portraitRotY = gsap.quickTo(portraitFrame, "rotationY", { duration: 0.5, ease: "power2.out" });

      const halftoneX = gsap.quickTo(halftone, "x", { duration: 0.65, ease: "power2.out" });
      const halftoneY = gsap.quickTo(halftone, "y", { duration: 0.65, ease: "power2.out" });

      const glowX = gsap.quickTo(glow, "x", { duration: 0.8, ease: "power2.out" });
      const glowY = gsap.quickTo(glow, "y", { duration: 0.8, ease: "power2.out" });

      const handlePointerMove = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

        portraitX(nx * 14);
        portraitY(ny * 14);
        portraitRotX(-ny * 7);
        portraitRotY(nx * 7);

        halftoneX(-nx * 20);
        halftoneY(-ny * 20);

        glowX(nx * 28);
        glowY(ny * 28);
      };

      const handlePointerLeave = () => {
        gsap.to(portraitFrame, { x: 0, y: 0, rotationX: 0, rotationY: 0, duration: 0.8, ease: "power3.out" });
        gsap.to(halftone, { x: 0, y: 0, duration: 0.8, ease: "power3.out" });
        gsap.to(glow, { x: 0, y: 0, duration: 0.8, ease: "power3.out" });
      };

      container.addEventListener("pointermove", handlePointerMove);
      container.addEventListener("pointerleave", handlePointerLeave);

      return () => {
        container.removeEventListener("pointermove", handlePointerMove);
        container.removeEventListener("pointerleave", handlePointerLeave);
      };
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="home" className="pt-2 sm:pt-4 md:pt-6 scroll-mt-24">
      <div className="flex flex-col gap-12 lg:gap-16">
        {/* Main Grid: Headline & Information vs Portrait & Halftone */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left Column (Appears 2nd on mobile/tablet, 1st on desktop) */}
          <div className="order-2 lg:order-1 flex flex-col gap-6 text-center lg:text-left items-center lg:items-start max-w-xl mx-auto lg:mx-0 w-full">
            {/* Tagline */}
            <div className="hero-tag-item inline-flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#636B2F] dark:bg-[#D4DE95]" />
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                Full-Stack Web Developer
              </span>
            </div>

            {/* Headline: Name */}
            <h1
              ref={headlineRef}
              className="font-pixel text-2xl sm:text-4xl md:text-[2.6rem] lg:text-[2.5rem] xl:text-[3rem] font-normal text-neutral-900 dark:text-neutral-50 leading-[1.25] tracking-wide"
            >
              <span className="whitespace-nowrap">Carlos Miguel</span>{" "}
              <span className="block mt-1 sm:mt-2 text-[#636B2F] dark:text-[#D4DE95]">
                Sandrino
              </span>
            </h1>

            {/* Sub-tag */}
            <div className="hero-tag-item flex items-center gap-3 pt-1">
              <span className="w-12 sm:w-16 h-[2px] bg-[#636B2F] dark:bg-[#D4DE95]" />
              <span className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                Building fast, clean, and modern websites
              </span>
            </div>

            {/* Clear, Simple Bio */}
            <p
              ref={bioRef}
              className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl"
            >
              Hi, I&apos;m Carlos. I develop responsive, reliable, and user-friendly web applications with clean code and modern tools like Next.js, React, and Supabase.
            </p>

            {/* Actions / CTA Buttons */}
            <div ref={ctaGroupRef} className="flex flex-wrap gap-4 pt-2 justify-center lg:justify-start">
              <div className="hero-cta-btn">
                <MagneticButton strength={0.25}>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap bg-[#636B2F] hover:bg-[#525925] text-white font-semibold px-7 sm:px-8 h-12 rounded-xl text-sm sm:text-base shadow-md shadow-[#636B2F]/25 dark:bg-[#D4DE95] dark:hover:bg-[#c2ce7c] dark:text-[#1E2113] dark:shadow-[#D4DE95]/20 transition-all active:scale-95"
                  >
                    <span>Contact Me</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </MagneticButton>
              </div>

              <div className="hero-cta-btn">
                <MagneticButton strength={0.25}>
                  <a
                    href="#projects"
                    className="inline-flex items-center justify-center whitespace-nowrap liquid-glass liquid-glass-interactive text-neutral-900 dark:text-neutral-100 font-semibold px-7 sm:px-8 h-12 rounded-xl text-sm sm:text-base shadow-sm transition-transform active:scale-95 border border-black/5 dark:border-white/10 hover:text-[#636B2F] dark:hover:text-[#D4DE95]"
                  >
                    View Projects
                  </a>
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Right Column: Freestanding Studio Portrait with Halftone Halo (Appears 1st on mobile/tablet) */}
          <div
            ref={portraitRef}
            className="order-1 lg:order-2 flex justify-center items-center relative [perspective:1000px] w-full pt-2 sm:pt-4 lg:pt-0"
          >
            <div className="relative flex items-center justify-center">
              {/* Halftone Dot Matrix Circular Halo directly framing Carlos's Head */}
              <div
                ref={halftoneRef}
                aria-hidden="true"
                className="absolute top-1 sm:top-2 md:top-3 lg:top-4 left-1/2 -translate-x-1/2 w-[170px] h-[170px] sm:w-[210px] sm:h-[210px] md:w-[245px] md:h-[245px] lg:w-[270px] lg:h-[270px] halftone-dot-grid rounded-full text-neutral-600/50 dark:text-neutral-300/40 [mask-image:radial-gradient(circle_at_center,#000_65%,transparent_98%)] pointer-events-none will-change-transform z-0"
              />

              {/* Subtle Warm Ambient Glow behind the head */}
              <div
                ref={glowRef}
                aria-hidden="true"
                className="absolute top-3 sm:top-5 md:top-6 lg:top-8 left-1/2 -translate-x-1/2 w-[150px] h-[150px] sm:w-[190px] sm:h-[190px] lg:w-[230px] lg:h-[230px] rounded-full bg-[#636B2F]/20 dark:bg-[#D4DE95]/20 blur-2xl pointer-events-none will-change-transform z-0"
              />

              {/* Profile Cutout Image (Horizontally level & balanced) */}
              <div
                ref={portraitFrameRef}
                className="relative z-10 w-[260px] h-[320px] sm:w-[320px] sm:h-[390px] md:w-[370px] md:h-[450px] lg:w-[410px] lg:h-[490px] will-change-transform flex items-end justify-center"
              >
                <Image
                  src="/profile.png"
                  alt="Carlos Miguel Sandrino"
                  fill
                  priority
                  className="object-contain object-bottom drop-shadow-xl select-none pointer-events-none"
                  sizes="(max-width: 640px) 260px, (max-width: 1024px) 370px, 410px"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Bottom Bar */}
        <div
          ref={bottomBarRef}
          className="pt-6 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500 dark:text-neutral-400"
        >
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/Crl0sDEV"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#636B2F] dark:hover:text-[#D4DE95] transition-colors"
            >
              GitHub &rarr;
            </a>
            <a
              href="https://www.linkedin.com/in/sandrino-carlos-miguel"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#636B2F] dark:hover:text-[#D4DE95] transition-colors"
            >
              LinkedIn &rarr;
            </a>
            <a
              href="mailto:sandrinocarlosmiguel@gmail.com"
              className="hover:text-[#636B2F] dark:hover:text-[#D4DE95] transition-colors"
            >
              Email &rarr;
            </a>
          </div>

          <div className="text-[12px] text-neutral-400 dark:text-neutral-500">
            Based in the Philippines
          </div>
        </div>
      </div>
    </section>
  );
}
