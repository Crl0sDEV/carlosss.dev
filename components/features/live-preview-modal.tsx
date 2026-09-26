"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Tablet, Smartphone, ExternalLink, X } from "lucide-react";
import { Project } from "@/data/projects";

interface LivePreviewModalProps {
  project: Project | null;
  onClose: () => void;
}

export function LivePreviewModal({ project, onClose }: LivePreviewModalProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleViewModeChange = (mode: 'desktop' | 'tablet' | 'mobile') => {
    if (mode === viewMode) return;
    setViewMode(mode);
  };

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {project && project.link && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex flex-col bg-[#FAFAFA]/95 dark:bg-[#121212]/95 backdrop-blur-md"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-black/5 dark:border-white/10 liquid-glass shrink-0">
            <div className="flex items-center gap-6">
               <h3 className="text-sm md:text-base font-sans font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 truncate max-w-[150px] md:max-w-xs lg:max-w-md">
                 {project.title}
               </h3>
               
               {/* Device Toggles */}
               <div className="hidden md:flex items-center liquid-glass-subtle rounded-lg p-0.5 border border-black/5 dark:border-white/10">
                  <button 
                    onClick={() => handleViewModeChange('desktop')} 
                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'desktop' ? 'bg-white dark:bg-white/10 text-neutral-900 dark:text-neutral-100 shadow-xs' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'}`} 
                    title="Desktop View"
                  >
                    <Monitor className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleViewModeChange('tablet')} 
                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'tablet' ? 'bg-white dark:bg-white/10 text-neutral-900 dark:text-neutral-100 shadow-xs' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'}`} 
                    title="Tablet View"
                  >
                    <Tablet className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleViewModeChange('mobile')} 
                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'mobile' ? 'bg-white dark:bg-white/10 text-neutral-900 dark:text-neutral-100 shadow-xs' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'}`} 
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
                 className="text-xs md:text-sm flex items-center gap-1.5 text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors px-3 py-1.5 rounded-lg liquid-glass-interactive border border-black/5 dark:border-white/10"
               >
                 Open <span className="hidden md:inline">in new tab</span> <ExternalLink className="w-3.5 h-3.5" />
               </a>
               <button 
                 onClick={onClose} 
                 className="p-1.5 liquid-glass-interactive text-neutral-700 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white rounded-lg transition-colors border border-black/5 dark:border-white/10"
               >
                 <X className="w-5 h-5" />
               </button>
            </div>
          </div>

          {/* Modal Body / Iframe Container */}
          <div className="flex-1 overflow-hidden bg-gray-50 dark:bg-[#121212] flex items-center justify-center p-0 md:p-6 lg:p-8">
             <div
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
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
