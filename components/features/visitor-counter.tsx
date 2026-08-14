"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Eye } from "lucide-react";
import { motion } from "framer-motion";

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateCount = async () => {
      const hasVisited = sessionStorage.getItem("has_visited");

      try {
        if (!hasVisited) {
          await supabase.rpc("increment_visitor_count");
          sessionStorage.setItem("has_visited", "true");
        }

        const { data } = await supabase
          .from("site_stats")
          .select("count")
          .eq("id", 1)
          .single();

        if (data) {
          setCount(data.count);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    updateCount();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-full bg-white dark:bg-[#1A1A1A] border border-[#E4E4E7] dark:border-[#27272A] text-[#52525B] dark:text-[#A1A1AA] shadow-sm flex-1"
    >
      <Eye className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 shrink-0" />
      
      <span className="font-bold text-[11px] leading-none text-[#18181B] dark:text-[#F4F4F5]">
        {isLoading ? (
          <div className="h-3 w-6 bg-gray-200 dark:bg-[#27272A] rounded animate-pulse" />
        ) : (
          count?.toLocaleString() || "0"
        )}
      </span>
    </motion.div>
  );
}
