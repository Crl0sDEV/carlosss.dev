"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function AmbientBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll();

  // Silky-smooth spring physics for momentum scroll tracking
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 22,
    restDelta: 0.001,
  });

  // Layer 1 (Deepest plane - upper right)
  const y1 = useTransform(smoothProgress, [0, 1], [-30, 160]);
  const x1 = useTransform(smoothProgress, [0, 1], [10, -35]);
  const r1 = useTransform(smoothProgress, [0, 1], [-20, -14]);

  // Layer 2 (Mid-depth plane - overlapping)
  const y2 = useTransform(smoothProgress, [0, 1], [-60, 260]);
  const x2 = useTransform(smoothProgress, [0, 1], [0, -55]);
  const r2 = useTransform(smoothProgress, [0, 1], [-13, -7]);

  // Layer 3 (Dominant foreground plane with prominent rounded corner)
  const y3 = useTransform(smoothProgress, [0, 1], [-90, 360]);
  const x3 = useTransform(smoothProgress, [0, 1], [-10, -75]);
  const r3 = useTransform(smoothProgress, [0, 1], [-7, -1]);

  // Layer 4 (Lower counter-balance plane for mid-to-bottom page depth)
  const y4 = useTransform(smoothProgress, [0, 1], [180, -120]);
  const x4 = useTransform(smoothProgress, [0, 1], [-40, 25]);
  const r4 = useTransform(smoothProgress, [0, 1], [14, 8]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none bg-[#F5F6FA] dark:bg-[#070709] transition-colors duration-700"
    >
      {/* Directional Ambient Light Gradients */}
      <div className="absolute -top-[20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-b from-red-500/8 via-rose-500/4 to-transparent blur-3xl dark:from-red-600/8 dark:via-red-950/5 dark:to-transparent" />
      <div className="absolute top-[40%] -left-[15%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-tr from-slate-400/10 to-transparent blur-3xl dark:from-neutral-800/20 dark:to-transparent" />

      {/* Layered Architectural Card Planes */}
      <div className="relative w-full h-full">
        {/* Plane 1: Deep Back Slab */}
        <motion.div
          style={mounted ? { y: y1, x: x1, rotate: r1 } : { rotate: -20 }}
          className="absolute -top-[12%] -right-[8%] md:right-[2%] w-[88vw] md:w-[62vw] max-w-[1050px] h-[72vh] md:h-[82vh] min-h-[460px] rounded-[36px] md:rounded-[54px] 
                     bg-gradient-to-br from-[#E2E4EB] via-[#D3D6E1] to-[#C4C7D4] 
                     dark:bg-gradient-to-br dark:from-[#1A1A22] dark:via-[#101015] dark:to-[#09090C]
                     border border-white/60 dark:border-white/[0.04]
                     shadow-[0_25px_60px_-15px_rgba(15,23,42,0.08)] 
                     dark:shadow-[0_30px_75px_-10px_rgba(0,0,0,0.85)]
                     will-change-transform"
        >
          {/* Subtle Surface Sheen */}
          <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/20 to-transparent dark:from-white/[0.03] dark:to-transparent pointer-events-none" />
        </motion.div>

        {/* Plane 2: Intermediate Slab */}
        <motion.div
          style={mounted ? { y: y2, x: x2, rotate: r2 } : { rotate: -13 }}
          className="absolute top-[4%] -right-[5%] md:right-[6%] w-[90vw] md:w-[66vw] max-w-[1100px] h-[76vh] md:h-[86vh] min-h-[500px] rounded-[38px] md:rounded-[56px] 
                     bg-gradient-to-br from-[#EAEBF2] via-[#DDDFE8] to-[#CFD2DD] 
                     dark:bg-gradient-to-br dark:from-[#22222B] dark:via-[#16161D] dark:to-[#0D0D12]
                     border border-white/80 dark:border-white/[0.06]
                     shadow-[0_35px_80px_-15px_rgba(15,23,42,0.11)] 
                     dark:shadow-[0_45px_100px_-15px_rgba(0,0,0,0.92)]
                     will-change-transform"
        >
          {/* Subtle Top-Edge Specular Rim */}
          <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.09)] pointer-events-none" />
        </motion.div>

        {/* Plane 3: Dominant Foreground Slab (Matching User Reference) */}
        <motion.div
          style={mounted ? { y: y3, x: x3, rotate: r3 } : { rotate: -7 }}
          className="absolute top-[18%] -right-[2%] md:right-[11%] w-[94vw] md:w-[72vw] max-w-[1180px] h-[80vh] md:h-[90vh] min-h-[540px] rounded-[42px] md:rounded-[62px] 
                     bg-gradient-to-br from-[#FFFFFF] via-[#EFF1F7] to-[#DFE2EC] 
                     dark:bg-gradient-to-br dark:from-[#2A2A35] dark:via-[#1B1B23] dark:to-[#111117]
                     border border-white dark:border-white/[0.08]
                     shadow-[0_45px_100px_-20px_rgba(15,23,42,0.14)] 
                     dark:shadow-[0_60px_130px_-20px_rgba(0,0,0,0.98)]
                     will-change-transform"
        >
          {/* Pronounced Inset Light Reflection on Upper Rim */}
          <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_2px_rgba(255,255,255,0.95)] dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.14)] pointer-events-none" />
        </motion.div>

        {/* Plane 4: Lower Counter-Balance Slab for Page Scroll Depth */}
        <motion.div
          style={mounted ? { y: y4, x: x4, rotate: r4 } : { rotate: 14 }}
          className="absolute top-[68%] -left-[15%] md:-left-[5%] w-[84vw] md:w-[58vw] max-w-[950px] h-[65vh] md:h-[75vh] min-h-[440px] rounded-[36px] md:rounded-[52px] 
                     bg-gradient-to-br from-[#ECEEF5] via-[#DFE1EA] to-[#D0D3DE] 
                     dark:bg-gradient-to-br dark:from-[#202028] dark:via-[#14141A] dark:to-[#0B0B0E]
                     border border-white/70 dark:border-white/[0.05]
                     shadow-[0_30px_70px_-15px_rgba(15,23,42,0.09)] 
                     dark:shadow-[0_35px_85px_-15px_rgba(0,0,0,0.88)]
                     will-change-transform"
        >
          <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] pointer-events-none" />
        </motion.div>
      </div>

      {/* Subtle Engineering Grid Overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.025)_1px,transparent_1px)] 
                   dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] 
                   [background-size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" 
      />
    </div>
  );
}
