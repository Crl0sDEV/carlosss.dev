"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

export function LikeButton() {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await fetchLikes();
      checkDailyLimit();
    };
    init();
  }, []);

  const checkDailyLimit = () => {
    const lastLikedDate = localStorage.getItem("last_liked_date");
    const today = new Date().toDateString();
    if (lastLikedDate === today) {
      setHasLiked(true);
    }
  };

  const fetchLikes = async () => {
    try {
      const { data } = await supabase
        .from("site_likes")
        .select("count")
        .eq("id", 1)
        .single();
        
      if (data) {
        setLikes(data.count);
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  const handleLike = async () => {
    if (hasLiked || isLoading) return;

    setLikes((prev) => prev + 1);
    setHasLiked(true);
    const today = new Date().toDateString();
    localStorage.setItem("last_liked_date", today);

    try {
      await supabase.rpc("increment_likes");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <motion.button
      onClick={handleLike}
      disabled={hasLiked || isLoading}
      whileHover={!hasLiked ? { scale: 1.05 } : {}}
      whileTap={!hasLiked ? { scale: 0.95 } : {}}
      className={`relative flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-full border transition-all duration-300 shadow-sm flex-1 ${
        hasLiked
          ? "bg-red-500/10 border-red-500/30 text-red-500 cursor-default"
          : "bg-white dark:bg-[#1A1A1A] border-[#E4E4E7] dark:border-[#27272A] text-[#52525B] dark:text-[#A1A1AA] hover:border-red-500/50 hover:text-red-500 dark:hover:text-red-400 hover:shadow-red-500/10 cursor-pointer"
      }`}
    >
      <div className="relative flex items-center justify-center">
        <Heart 
          className={`w-3.5 h-3.5 transition-colors ${hasLiked ? "fill-red-500 text-red-500" : "currentColor"}`} 
        />

        <AnimatePresence>
          {hasLiked && (
            <motion.div
              initial={{ opacity: 1, y: 0, scale: 0.5 }}
              animate={{ opacity: 0, y: -20, scale: 1.4, rotate: [-10, 10, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0 text-red-500 pointer-events-none flex items-center justify-center"
            >
              <Heart className="w-3.5 h-3.5 fill-red-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <span className="font-bold text-[11px] leading-none">
        {isLoading ? (
          <div className="h-3 w-6 bg-gray-200 dark:bg-[#27272A] rounded animate-pulse" />
        ) : (
          likes.toLocaleString()
        )}
      </span>
    </motion.button>
  );
}
