

import Image from "next/image";

export function Hero() {
  return (
    <section id="home" className="pt-12">
      <div className="flex flex-col gap-6">
        
        <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#18181B] dark:text-[#F4F4F5] leading-tight flex-1">
            I build custom web apps <br />
            <span className="text-blue-600 dark:text-blue-500">
              that drive real business results
            </span>
          </h1>

          <div className="shrink-0 w-28 h-28 sm:w-32 sm:h-32 rounded-2xl relative overflow-hidden bg-[#E4E4E7] dark:bg-[#27272A] shadow-md shadow-black/5 dark:shadow-black/20 border-4 border-white dark:border-[#121212] rotate-3 hover:rotate-0 transition-transform duration-300">
            <Image 
              src="/profile.png" 
              alt="Carlos Miguel" 
              fill 
              className="object-cover"
              sizes="(max-width: 768px) 128px, 128px"
              priority
            />
          </div>
        </div>
        
        <p className="text-lg text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">
          I'm Carlos, a Full Stack Developer. I help businesses scale by engineering high-performance web applications, automating workflows, and delivering measurable digital solutions that solve real problems.
        </p>
        
        <div className="flex flex-wrap gap-4 pt-4">
          <a href="#contact" className="inline-flex items-center justify-center whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 rounded-lg px-6 h-10 font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
            Book a Free Call
          </a>
          <a href="#projects" className="inline-flex items-center justify-center whitespace-nowrap border border-[#E4E4E7] dark:border-[#27272A] text-[#18181B] dark:text-[#F4F4F5] hover:bg-[#F4F4F5] dark:hover:bg-[#1A1A1A] rounded-lg px-6 h-10 font-medium bg-transparent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
            View Case Studies
          </a>
        </div>
      </div>
    </section>
  );
}
