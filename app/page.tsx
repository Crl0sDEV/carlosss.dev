import { Navbar } from "@/components/features/navbar";
import { Hero } from "@/components/features/hero";
import { Footer } from "@/components/features/footer";
import dynamic from 'next/dynamic';

const About = dynamic(() => import('@/components/features/about').then(m => ({ default: m.About })));
const Projects = dynamic(() => import('@/components/features/projects').then(m => ({ default: m.Projects })));
const Services = dynamic(() => import('@/components/features/services').then(m => ({ default: m.Services })));
const WhyWorkWithMe = dynamic(() => import('@/components/features/why-work-with-me').then(m => ({ default: m.WhyWorkWithMe })));
const Contact = dynamic(() => import('@/components/features/contact').then(m => ({ default: m.Contact })));
const Chatbot = dynamic(() => import('@/components/features/chatbot').then(m => ({ default: m.Chatbot })));

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] dark:bg-[#121212] selection:bg-blue-500/30 text-[#27272A] dark:text-[#E4E4E7]">
      <div className="max-w-3xl mx-auto w-full px-6 flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 w-full pt-32 pb-16 space-y-32">
          <Hero />
          <About />
          <Projects />
          <Services />
          <WhyWorkWithMe />
          <Contact />
        </main>
        <Footer />
      </div>
      <Chatbot />
    </div>
  );
}
