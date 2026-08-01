import { Navbar } from "@/components/features/navbar";
import { Hero } from "@/components/features/hero";
import { About } from "@/components/features/about";
import { Projects } from "@/components/features/projects";
import { Services } from "@/components/features/services";
import { Contact } from "@/components/features/contact";
import { Footer } from "@/components/features/footer";
import dynamic from 'next/dynamic';

const Chatbot = dynamic(() => import('@/components/features/chatbot').then(m => ({ default: m.Chatbot })), { ssr: false });

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
          <Contact />
        </main>
        <Footer />
      </div>
      <Chatbot />
    </div>
  );
}
