import { Badge } from "@/components/ui/badge";
import dynamic from 'next/dynamic';

const GithubContributions = dynamic(() => import('./github-contributions').then(m => ({ default: m.GithubContributions })), { ssr: false });

export function About() {
  const skills = [
    "TypeScript", "React", "Next.js", "Node.js", 
    "PostgreSQL", "Supabase", "Tailwind CSS", "GraphQL"
  ];

  return (
    <section id="about" className="scroll-mt-24">
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#18181B] dark:text-[#F4F4F5] mb-2">
            About Me
          </h2>
          <div className="h-1 w-12 bg-blue-600 dark:bg-blue-500 rounded-full" />
        </div>
        
        <div className="space-y-4 text-base text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">
          <p>
            I am a passionate Full Stack Web Developer with a deep appreciation for building elegant, robust, and scalable solutions. With years of experience across the full stack, I specialize in crafting digital products that solve real-world problems.
          </p>
          <p>
            My approach combines architectural rigor with a strong focus on user experience and performance. I believe in clean code, automated testing, and continuous deployment.
          </p>
        </div>
        
        <div className="bg-white dark:bg-[#1A1A1A] p-6 rounded-xl border border-[#E4E4E7] dark:border-[#27272A] shadow-sm">
          <h3 className="text-sm font-semibold mb-4 text-[#18181B] dark:text-[#F4F4F5] uppercase tracking-wider">Core Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge 
                key={skill}
                variant="secondary"
                className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-100 dark:border-blue-900/30"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <GithubContributions />
      </div>
    </section>
  );
}
