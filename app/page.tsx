import { Navbar } from "@/components/features/navbar";
import { Hero } from "@/components/features/hero";
import { Footer } from "@/components/features/footer";
import { AmbientBackground } from "@/components/features/ambient-background";
import { SectionReveal } from "@/components/ui/section-reveal";
import dynamic from 'next/dynamic';

const About = dynamic(() => import('@/components/features/about').then(m => ({ default: m.About })));
const Projects = dynamic(() => import('@/components/features/projects').then(m => ({ default: m.Projects })));
const Services = dynamic(() => import('@/components/features/services').then(m => ({ default: m.Services })));
const WhyWorkWithMe = dynamic(() => import('@/components/features/why-work-with-me').then(m => ({ default: m.WhyWorkWithMe })));
const Contact = dynamic(() => import('@/components/features/contact').then(m => ({ default: m.Contact })));
const Chatbot = dynamic(() => import('@/components/features/chatbot').then(m => ({ default: m.Chatbot })));
const LiquidWaterSurface = dynamic(() => import('@/components/features/liquid-water-surface').then(m => ({ default: m.LiquidWaterSurface })));

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F6FA] dark:bg-[#070709] selection:bg-red-500/25 selection:text-red-950 dark:selection:text-red-200 text-neutral-800 dark:text-neutral-200 relative overflow-x-hidden">
      <AmbientBackground />
      <LiquidWaterSurface />
      <div className="max-w-5xl lg:max-w-6xl mx-auto w-full px-6 lg:px-8 flex flex-col flex-1 relative z-10">
        <Navbar />
        <main className="flex-1 w-full pt-32 pb-16 space-y-32">
          <Hero />
          <SectionReveal>
            <About />
          </SectionReveal>
          <SectionReveal>
            <Projects />
          </SectionReveal>
          <SectionReveal>
            <Services />
          </SectionReveal>
          <SectionReveal>
            <WhyWorkWithMe />
          </SectionReveal>
          <SectionReveal>
            <Contact />
          </SectionReveal>
        </main>
        <Footer />
      </div>
      <Chatbot />
    </div>
  );
}
