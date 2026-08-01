"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects, Project } from "@/data/projects";
import Image from "next/image";
import dynamic from 'next/dynamic';

const LivePreviewModal = dynamic(() => import('./live-preview-modal').then(m => ({ default: m.LivePreviewModal })), { ssr: false });

export function Projects() {
  const [previewProject, setPreviewProject] = useState<Project | null>(null);

  const handlePreviewClick = (e: React.MouseEvent<HTMLAnchorElement>, project: Project) => {
    // If mobile, let standard link behavior happen
    if (window.innerWidth < 768) return;
    
    e.preventDefault();
    setPreviewProject(project);
  };

  return (
    <section id="projects" className="scroll-mt-24">
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#18181B] dark:text-[#F4F4F5] mb-2">
            Selected Projects
          </h2>
          <div className="h-1 w-12 bg-blue-600 dark:bg-blue-500 rounded-full" />
        </div>
        
        <div className="flex flex-col gap-8">
          {projects.map((project, idx) => (
            <Card key={idx} className="group overflow-hidden bg-white dark:bg-[#1A1A1A] border-[#E4E4E7] dark:border-[#27272A] hover:border-blue-200 dark:hover:border-blue-900/50 transition-colors shadow-sm flex flex-col md:flex-row">
              
              {/* Image Section */}
              <div className="md:w-2/5 shrink-0 relative bg-gray-100 dark:bg-[#121212] flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-[#E4E4E7] dark:border-[#27272A]">
                {project.img ? (
                  <div className="relative w-full h-48 md:h-full group-hover:scale-105 transition-transform duration-500 ease-out">
                    {/* Using next/image requires width/height or fill. We use fill with objectFit. */}
                    <Image 
                      src={project.img} 
                      alt={project.title} 
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                ) : (
                  <div className="h-48 md:h-full w-full flex items-center justify-center bg-gray-50 dark:bg-[#121212] text-[#A1A1AA]">
                    <span className="text-xs uppercase font-semibold tracking-wider">No Image</span>
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="flex flex-col flex-1">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start gap-4">
                    <CardTitle className="text-xl font-bold text-[#18181B] dark:text-[#F4F4F5] group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors">
                      {project.title}
                    </CardTitle>
                    {project.isCaseStudy && (
                      <Badge variant="outline" className="shrink-0 text-[10px] uppercase tracking-wider font-semibold border-blue-200 dark:border-blue-900/50 text-blue-600 dark:text-blue-400">
                        Case Study
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="pb-4 flex-1 flex flex-col gap-4">
                  <CardDescription className="text-sm text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">
                    {project.description}
                  </CardDescription>
                  
                  <div className="space-y-2 mt-auto">
                    <div className="text-xs">
                      <strong className="text-[#18181B] dark:text-[#F4F4F5]">Problem:</strong> <span className="text-[#52525B] dark:text-[#A1A1AA]">{project.problem}</span>
                    </div>
                    <div className="text-xs">
                      <strong className="text-[#18181B] dark:text-[#F4F4F5]">Solution:</strong> <span className="text-[#52525B] dark:text-[#A1A1AA]">{project.solution}</span>
                    </div>
                    <div className="text-xs">
                      <strong className="text-[#18181B] dark:text-[#F4F4F5]">Impact:</strong> <span className="text-blue-600 dark:text-blue-400 font-medium">{project.impact}</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex items-center justify-between pt-4 border-t border-[#FAFAFA] dark:border-[#27272A] mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((t) => (
                      <Badge key={t} variant="secondary" className="bg-[#F4F4F5] dark:bg-[#27272A] text-[#71717A] dark:text-[#A1A1AA] hover:bg-[#E4E4E7] dark:hover:bg-[#3F3F46] text-[10px]">
                        {t}
                      </Badge>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="text-[10px] text-[#A1A1AA] font-medium flex items-center px-1">+{project.tech.length - 4}</span>
                    )}
                  </div>
                  
                  {project.link ? (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => handlePreviewClick(e, project)}
                      className="shrink-0 ml-4 text-sm font-medium text-blue-600 dark:text-blue-500 hover:text-blue-800 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1"
                    >
                      View <span aria-hidden="true">&rarr;</span>
                    </a>
                  ) : (
                    <span className="shrink-0 ml-4 text-xs font-medium text-[#A1A1AA] flex items-center gap-1">
                      Private Repo
                    </span>
                  )}
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <LivePreviewModal 
        project={previewProject} 
        onClose={() => setPreviewProject(null)} 
      />
    </section>
  );
}
