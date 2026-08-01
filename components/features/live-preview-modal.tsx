"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Tablet, Smartphone, ExternalLink, X } from "lucide-react";
import { Project } from "@/data/projects";

interface LivePreviewModalProps {
  project: Project | null;
  onClose: () => void;
}

export function LivePreviewModal({ project, onClose }: LivePreviewModalProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  return (
    <AnimatePresence>
      {project && project.link && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex flex-col bg-[#FAFAFA]/95 dark:bg-[#121212]/95 backdrop-blur-md"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#1A1A1A] shadow-sm">
            <div className="flex items-center gap-6">
               <h3 className="text-sm md:text-base font-bold text-[#18181B] dark:text-[#F4F4F5] truncate max-w-[150px] md:max-w-xs lg:max-w-md">
                 {project.title}
               </h3>
               
               {/* Device Toggles - Hidden on mobile, visible on md+ */}
               <div className="hidden md:flex items-center bg-[#F4F4F5] dark:bg-[#27272A] rounded-lg p-1 border border-[#E4E4E7] dark:border-[#3F3F46]">
                  <button 
                    onClick={() => setViewMode('desktop')} 
                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'desktop' ? 'bg-white dark:bg-[#1A1A1A] text-[#18181B] dark:text-[#F4F4F5] shadow-sm' : 'text-[#71717A] dark:text-[#A1A1AA] hover:text-[#18181B] dark:hover:text-[#F4F4F5]'}`} 
                    title="Desktop View"
                  >
                    <Monitor className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode('tablet')} 
                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'tablet' ? 'bg-white dark:bg-[#1A1A1A] text-[#18181B] dark:text-[#F4F4F5] shadow-sm' : 'text-[#71717A] dark:text-[#A1A1AA] hover:text-[#18181B] dark:hover:text-[#F4F4F5]'}`} 
                    title="Tablet View"
                  >
                    <Tablet className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode('mobile')} 
                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'mobile' ? 'bg-white dark:bg-[#1A1A1A] text-[#18181B] dark:text-[#F4F4F5] shadow-sm' : 'text-[#71717A] dark:text-[#A1A1AA] hover:text-[#18181B] dark:hover:text-[#F4F4F5]'}`} 
                    title="Mobile View"
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
               </div>
            </div>

            <div className="flex items-center gap-3">
               <a 
                 href={project.link} 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="text-xs md:text-sm flex items-center gap-1.5 text-[#52525B] dark:text-[#A1A1AA] hover:text-[#18181B] dark:hover:text-[#F4F4F5] transition-colors px-3 py-1.5 rounded-md bg-[#F4F4F5] dark:bg-[#27272A] border border-[#E4E4E7] dark:border-[#3F3F46]"
               >
                 Open <span className="hidden md:inline">in new tab</span> <ExternalLink className="w-3.5 h-3.5" />
               </a>
               <button 
                 onClick={onClose} 
                 className="p-1.5 bg-[#F4F4F5] dark:bg-[#27272A] hover:bg-[#E4E4E7] dark:hover:bg-[#3F3F46] text-[#18181B] dark:text-[#F4F4F5] rounded-full transition-colors"
               >
                 <X className="w-5 h-5" />
               </button>
            </div>
          </div>

          {/* Modal Body / Iframe Container */}
          <div className="flex-1 overflow-hidden bg-gray-50 dark:bg-[#121212] flex items-center justify-center p-0 md:p-6 lg:p-8">
             <motion.div
               layout
               className={`relative w-full h-full bg-white dark:bg-white transition-all duration-300 mx-auto ${
                 viewMode === 'desktop' ? 'max-w-full rounded-none md:rounded-xl shadow-2xl overflow-hidden border border-[#E4E4E7] dark:border-[#27272A]' :
                 viewMode === 'tablet' ? 'max-w-[768px] rounded-xl shadow-2xl overflow-hidden border-[8px] border-[#E4E4E7] dark:border-[#27272A]' :
                 'max-w-[375px] rounded-[2rem] shadow-2xl overflow-hidden border-[12px] border-[#E4E4E7] dark:border-[#27272A]'
               }`}
             >
               <iframe
                 src={project.link}
                 className="w-full h-full border-none bg-white"
                 title={`${project.title} Preview`}
               />
             </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
