"use client";

import { useState, useRef } from "react";
import { projects, Project } from "@/data/projects";
import dynamic from "next/dynamic";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ProjectCard } from "./project-card";
import { SectionHeading } from "@/components/ui/section-heading";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LivePreviewModal = dynamic(
  () => import("./live-preview-modal").then((m) => ({ default: m.LivePreviewModal })),
  { ssr: false }
);

export function Projects() {
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const displayedProjects = showAll ? projects : projects.slice(0, 3);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card-wrapper");
      if (!cards.length) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      // Stacking deck scrub animation when not showing all
      if (!showAll && cards.length > 1) {
        cards.forEach((card, idx) => {
          if (idx === cards.length - 1) return;
          const nextCard = cards[idx + 1];

          gsap.to(card, {
            scale: 0.94,
            opacity: 0.65,
            filter: "blur(2px)",
            ease: "none",
            scrollTrigger: {
              trigger: nextCard,
              start: "top 80%",
              end: "top 30%",
              scrub: true,
            },
          });
        });
      } else {
        cards.forEach((card, idx) => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            y: 22,
            opacity: 0,
            duration: 0.5,
            delay: (idx % 3) * 0.06,
            ease: "power2.out",
          });
        });
      }

      ScrollTrigger.refresh();
    },
    { scope: containerRef, dependencies: [showAll] }
  );

  const handleToggleShowAll = () => {
    if (showAll) {
      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: "smooth" });
      }
      setShowAll(false);
    } else {
      setShowAll(true);
    }
  };

  const handlePreviewClick = (e: React.MouseEvent<HTMLAnchorElement>, project: Project) => {
    if (window.innerWidth < 768) return;
    e.preventDefault();
    setPreviewProject(project);
  };

  return (
    <section ref={containerRef} id="projects" className="scroll-mt-24">
      <div className="flex flex-col gap-8">
        <SectionHeading
          title="Projects"
          description="Some of the websites and web applications I've built."
        />

        {/* Project Cards Stacking Deck */}
        <div className="relative flex flex-col gap-8 pb-4">
          {displayedProjects.map((project, idx) => (
            <div
              key={project.title || idx}
              className={`project-card-wrapper transition-transform duration-300 will-change-transform ${
                !showAll ? "sticky" : "relative"
              }`}
              style={
                !showAll
                  ? {
                      top: `calc(5.5rem + ${idx * 1.5}rem)`,
                      zIndex: idx + 1,
                    }
                  : undefined
              }
            >
              <ProjectCard
                project={project}
                idx={idx}
                onPreviewClick={handlePreviewClick}
              />
            </div>
          ))}
        </div>

        {projects.length > 3 && (
          <div className="flex justify-center mt-4">
            <MagneticButton strength={0.2}>
              <button
                onClick={handleToggleShowAll}
                className="inline-flex items-center justify-center whitespace-nowrap bg-white dark:bg-[#1A1A1A] border border-[#E4E4E7] dark:border-[#27272A] text-[#18181B] dark:text-[#F4F4F5] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] hover:text-red-500 dark:hover:text-red-400 rounded-lg px-8 h-12 font-medium transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring active:scale-95"
              >
                {showAll ? "Show Less" : `View All Projects (${projects.length})`}
              </button>
            </MagneticButton>
          </div>
        )}
      </div>

      <LivePreviewModal project={previewProject} onClose={() => setPreviewProject(null)} />
    </section>
  );
}
