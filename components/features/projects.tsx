"use client";

import { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { projects, Project } from "@/data/projects";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ScrambleText } from "@/components/ui/scramble-text";
import { CardTilt } from "@/components/ui/card-tilt";
import { MagneticButton } from "@/components/ui/magnetic-button";
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

      cards.forEach((card, idx) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          y: 40,
          opacity: 0,
          duration: 0.65,
          delay: (idx % 3) * 0.08,
          ease: "power3.out",
        });
      });

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
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#18181B] dark:text-[#F4F4F5] mb-2">
            <ScrambleText text="Selected Projects" />
          </h2>
          <div className="h-1 w-12 bg-blue-600 dark:bg-blue-500 rounded-full" />
        </div>

        <div className="flex flex-col gap-8">
          {displayedProjects.map((project, idx) => (
            <div key={project.title || idx} className="project-card-wrapper">
              <CardTilt maxTilt={4} scale={1.01}>
                <div className="group overflow-hidden rounded-2xl bg-white dark:bg-[#1A1A1A] border border-[#E4E4E7] dark:border-[#27272A] hover:border-blue-400/50 dark:hover:border-blue-500/40 transition-colors duration-300 shadow-sm hover:shadow-lg flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="md:w-2/5 shrink-0 relative bg-gray-100 dark:bg-[#121212] flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-[#E4E4E7] dark:border-[#27272A]">
                    {project.img ? (
                      <div className="relative w-full h-52 md:h-full min-h-[220px] group-hover:scale-105 transition-transform duration-500 ease-out">
                        <Image
                          src={project.img}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 360px"
                          priority={idx === 0}
                        />
                      </div>
                    ) : (
                      <div className="h-52 md:h-full w-full min-h-[220px] flex items-center justify-center bg-gray-50 dark:bg-[#121212] text-[#A1A1AA]">
                        <span className="text-xs uppercase font-semibold tracking-wider">No Image</span>
                      </div>
                    )}
                  </div>

                  {/* Content Section with spacious padding */}
                  <div className="flex flex-col flex-1 p-6 sm:p-7 gap-5 justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <h3 className="text-xl font-bold text-[#18181B] dark:text-[#F4F4F5] group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors">
                          {project.title}
                        </h3>
                        {project.isCaseStudy && (
                          <Badge
                            variant="outline"
                            className="shrink-0 text-[10px] uppercase tracking-wider font-semibold border-blue-200 dark:border-blue-900/50 text-blue-600 dark:text-blue-400"
                          >
                            Case Study
                          </Badge>
                        )}
                      </div>

                      <p className="text-sm text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Problem, Solution, Impact Details */}
                    <div className="space-y-2 text-xs bg-[#FAFAFA] dark:bg-[#151515] p-3.5 rounded-xl border border-[#F4F4F5] dark:border-[#27272A]">
                      <div>
                        <strong className="text-[#18181B] dark:text-[#F4F4F5]">Problem:</strong>{" "}
                        <span className="text-[#52525B] dark:text-[#A1A1AA]">{project.problem}</span>
                      </div>
                      <div>
                        <strong className="text-[#18181B] dark:text-[#F4F4F5]">Solution:</strong>{" "}
                        <span className="text-[#52525B] dark:text-[#A1A1AA]">{project.solution}</span>
                      </div>
                      <div>
                        <strong className="text-[#18181B] dark:text-[#F4F4F5]">Impact:</strong>{" "}
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">{project.impact}</span>
                      </div>
                    </div>

                    {/* Card Footer: Tech Tags + CTA */}
                    <div className="flex items-center justify-between pt-3 border-t border-[#F4F4F5] dark:border-[#27272A] mt-auto gap-4">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.slice(0, 4).map((t) => (
                          <Badge
                            key={t}
                            variant="secondary"
                            className="bg-[#F4F4F5] dark:bg-[#27272A] text-[#3F3F46] dark:text-[#E4E4E7] hover:bg-[#E4E4E7] dark:hover:bg-[#3F3F46] text-[10px] px-2 py-0.5"
                          >
                            {t}
                          </Badge>
                        ))}
                        {project.tech.length > 4 && (
                          <span className="text-[10px] text-[#52525B] dark:text-[#A1A1AA] font-medium flex items-center px-1">
                            +{project.tech.length - 4}
                          </span>
                        )}
                      </div>

                      {project.link ? (
                        <MagneticButton strength={0.3}>
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => handlePreviewClick(e, project)}
                            className="shrink-0 text-sm font-semibold text-blue-600 dark:text-blue-500 hover:text-blue-800 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/40"
                          >
                            View <span aria-hidden="true">&rarr;</span>
                          </a>
                        </MagneticButton>
                      ) : (
                        <span className="shrink-0 text-xs font-medium text-[#71717A] dark:text-[#A1A1AA]">
                          Private Repo
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardTilt>
            </div>
          ))}
        </div>

        {projects.length > 3 && (
          <div className="flex justify-center mt-4">
            <MagneticButton strength={0.2}>
              <button
                onClick={handleToggleShowAll}
                className="inline-flex items-center justify-center whitespace-nowrap bg-white dark:bg-[#1A1A1A] border border-[#E4E4E7] dark:border-[#27272A] text-[#18181B] dark:text-[#F4F4F5] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] hover:text-blue-600 dark:hover:text-blue-500 rounded-lg px-8 h-12 font-medium transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring active:scale-95"
              >
                {showAll ? "Show Less" : "View All Case Studies"}
              </button>
            </MagneticButton>
          </div>
        )}
      </div>

      <LivePreviewModal project={previewProject} onClose={() => setPreviewProject(null)} />
    </section>
  );
}
