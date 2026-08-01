import { MonitorSmartphone, Server, Zap } from "lucide-react";

export function Services() {
  const services = [
    {
      title: "Full-Stack Development",
      description: "I build responsive, high-performance web apps from scratch using modern frameworks like Next.js and React, tailored perfectly to your business needs.",
      icon: <MonitorSmartphone className="w-6 h-6 text-blue-600 dark:text-blue-500" />
    },
    {
      title: "Backend & API Architecture",
      description: "I design robust server-side logic, secure database architectures, and scalable APIs using Node.js, PostgreSQL, and Supabase.",
      icon: <Server className="w-6 h-6 text-blue-600 dark:text-blue-500" />
    },
    {
      title: "Performance Optimization",
      description: "I refactor legacy codebases, improve Core Web Vitals, and ensure your application is lightning-fast and accessible globally.",
      icon: <Zap className="w-6 h-6 text-blue-600 dark:text-blue-500" />
    }
  ];

  return (
    <section id="services" className="scroll-mt-24">
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#18181B] dark:text-[#F4F4F5] mb-2">
            What I Can Do For You
          </h2>
          <div className="h-1 w-12 bg-blue-600 dark:bg-blue-500 rounded-full mb-4" />
          <p className="text-[#71717A] dark:text-[#A1A1AA]">
            Specialized services I offer for remote teams and freelance clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-[#1A1A1A] p-6 rounded-xl border border-[#E4E4E7] dark:border-[#27272A] shadow-sm hover:border-blue-500/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-[#18181B] dark:text-[#F4F4F5] mb-2">
                {service.title}
              </h3>
              <p className="text-[#52525B] dark:text-[#A1A1AA] text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
