"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/data/projects";
import { ChevronDown, ExternalLink, Eye } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

interface ProjectCardProps {
  project: Project;
  idx: number;
  onPreviewClick: (e: React.MouseEvent<HTMLAnchorElement>, project: Project) => void;
}

export function ProjectCard({ project, idx, onPreviewClick }: ProjectCardProps) {
  const [isUnfolded, setIsUnfolded] = useState(false);
  const formattedIndex = String(idx + 1).padStart(2, "0");

  return (
    <GlassCard
      maxTilt={6}
      className="group relative overflow-hidden rounded-2xl liquid-glass liquid-glass-interactive flex flex-col md:flex-row shadow-sm hover:shadow-2xl transition-all duration-300 w-full"
    >
        {/* Left Side: Visual Showcase Canvas */}
        <div className="relative flex shrink-0 items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-[#E4E4E7]/70 dark:border-[#27272A]/70 bg-[#F4F4F5]/40 dark:bg-[#141414]/40 md:w-[42%] min-h-[220px] md:min-h-[280px]">
          {project.img ? (
            <div className="relative h-56 md:h-full w-full overflow-hidden">
              <Image
                src={project.img}
                alt={project.title}
                fill
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 400px"
                priority={idx === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 p-8 text-center text-[#A1A1AA]">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-600/80 dark:text-blue-400/80">
                // ARCHITECTURE SPEC
              </span>
              <span className="text-xs text-[#71717A] dark:text-[#A1A1AA]">
                Embedded Hardware / Proprietary System
              </span>
            </div>
          )}
        </div>

        {/* Right Side: Narrative, Impact & Tech Stack */}
        <div className="flex flex-1 flex-col justify-between p-6 sm:p-7 gap-5">
          <div className="space-y-3">
            {/* Top Meta Header */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="font-bold text-red-500 dark:text-red-400">
                  [{formattedIndex}]
                </span>
                <span className="text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-wider text-[11px]">
                  Web Project
                </span>
              </div>
            </div>

            {/* Title & Description */}
            <h3 className="text-xl sm:text-2xl font-semibold text-[#18181B] dark:text-[#F4F4F5] tracking-tight group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors">
              {project.title}
            </h3>

            <p className="text-sm sm:text-base leading-relaxed text-[#52525B] dark:text-[#A1A1AA]">
              {project.description}
            </p>

            {/* Impact Metric Callout */}
            {project.impact && (
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl liquid-glass-subtle text-xs sm:text-[13px]">
                <span className="shrink-0 font-mono font-bold text-red-500 dark:text-red-400 text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-red-50 dark:bg-red-950/60 border border-red-200/50 dark:border-red-900/40">
                  Key Result
                </span>
                <span className="text-[#27272A] dark:text-[#E4E4E7] leading-relaxed">
                  {project.impact}
                </span>
              </div>
            )}
          </div>

          {/* Details Accordion */}
          <div
            className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
              isUnfolded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="pt-2 pb-1 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs leading-relaxed">
                  <div className="p-3.5 rounded-xl border border-red-200/50 dark:border-red-950/50 bg-red-50/25 dark:bg-red-950/15 backdrop-blur-xs">
                    <span className="font-mono text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider block mb-1">
                      Problem
                    </span>
                    <span className="text-[#52525B] dark:text-[#A1A1AA]">
                      {project.problem}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl border border-emerald-200/50 dark:border-emerald-950/50 bg-emerald-50/25 dark:bg-emerald-950/15 backdrop-blur-xs">
                    <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                      Solution
                    </span>
                    <span className="text-[#52525B] dark:text-[#A1A1AA]">
                      {project.solution}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card Footer: Tech Stack & Actions */}
          <div className="pt-4 border-t border-[#E4E4E7]/70 dark:border-[#27272A]/70 flex flex-wrap items-center justify-between gap-3">
            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[11px] px-2 py-0.5 rounded liquid-glass-subtle text-[#52525B] dark:text-[#D4D4D8]"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={() => setIsUnfolded(!isUnfolded)}
                aria-expanded={isUnfolded}
                className="inline-flex items-center gap-1.5 rounded-lg liquid-glass-subtle liquid-glass-interactive px-3 py-1.5 text-xs font-medium text-[#52525B] dark:text-[#A1A1AA] transition-colors hover:text-red-500 dark:hover:text-red-400"
              >
                <span>{isUnfolded ? "Hide Details" : "View Details"}</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-300 ${
                    isUnfolded ? "rotate-180" : ""
                  }`}
                />
              </button>

              {project.link ? (
                <div className="flex items-center gap-1.5">
                  <a
                    href={project.link}
                    onClick={(e) => onPreviewClick(e, project)}
                    className="hidden md:inline-flex items-center gap-1 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50/60 dark:bg-red-950/30 px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                    title="Open Live Preview Modal"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </a>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 text-xs font-medium transition-colors shadow-xs"
                  >
                    <span>Visit</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ) : (
                <span className="font-mono text-xs text-[#71717A] dark:text-[#A1A1AA] px-2 py-1 rounded bg-[#F4F4F5] dark:bg-[#1E1E1E]">
                  Proprietary
                </span>
              )}
            </div>
          </div>
        </div>
      </GlassCard>
  );
}
