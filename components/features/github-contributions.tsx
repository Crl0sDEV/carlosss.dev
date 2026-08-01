"use client";

import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function GithubContributions() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <div className="bg-white dark:bg-[#1A1A1A] p-6 rounded-xl border border-[#E4E4E7] dark:border-[#27272A] shadow-sm flex flex-col gap-4 overflow-hidden h-[180px] animate-pulse mt-8">
      <div className="w-48 h-4 bg-gray-200 dark:bg-gray-800 rounded"></div>
      <div className="w-full h-full bg-gray-100 dark:bg-[#121212] rounded"></div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-[#1A1A1A] p-6 rounded-xl border border-[#E4E4E7] dark:border-[#27272A] shadow-sm flex flex-col gap-6 overflow-hidden mt-8">
      <h3 className="text-sm font-semibold text-[#18181B] dark:text-[#F4F4F5] uppercase tracking-wider flex items-center gap-2">
        <svg className="w-4 h-4 text-gray-800 dark:text-gray-200" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
        GitHub Contributions
      </h3>
      <div className="flex justify-center w-full overflow-x-auto overflow-y-hidden pb-2 scrollbar-thin">
        <div className="min-w-fit pr-2">
            <GitHubCalendar 
              username="Crl0sDEV" 
              colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
              blockMargin={4}
              blockRadius={2}
              blockSize={12}
            />
        </div>
      </div>
    </div>
  );
}
