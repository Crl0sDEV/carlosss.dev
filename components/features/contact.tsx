"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/ui/section-heading";

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (accessKey) {
      formData.append("access_key", accessKey);
    }
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
        
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <LinkedinIcon className="w-4 h-4" />,
      url: "https://www.linkedin.com/in/sandrino-carlos-miguel",
    },
    {
      name: "GitHub",
      icon: <GithubIcon className="w-4 h-4" />,
      url: "https://github.com/Crl0sDEV",
    },
    {
      name: "Facebook",
      icon: <FacebookIcon className="w-4 h-4" />,
      url: "https://www.facebook.com/KreizzyCarl",
    },
    {
      name: "Instagram",
      icon: <InstagramIcon className="w-4 h-4" />,
      url: "https://www.instagram.com/crls_mgx",
    },
  ];

  return (
    <section id="contact" className="scroll-mt-24">
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="flex flex-col gap-10"
      >
        {/* Header & Socials */}
        <div className="flex flex-col gap-6 text-center items-center">
          <SectionHeading
            title="Contact Me"
            description="Have a project in mind or want to work together? Feel free to send a message and I'll get back to you soon."
          />

          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {socialLinks.map((social) => (
              <MagneticButton key={social.name} strength={0.35}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full liquid-glass-subtle liquid-glass-interactive text-neutral-600 dark:text-neutral-300 hover:text-red-500 dark:hover:text-red-400 text-sm font-medium transition-colors"
                >
                  {social.icon}
                  <span>{social.name}</span>
                </a>
              </MagneticButton>
            ))}
          </div>
        </div>
        
        {/* Form */}
        <div className="max-w-2xl mx-auto w-full">
          <GlassCard
            maxTilt={4}
            className="liquid-glass p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-[#18181B] dark:text-[#F4F4F5]">Name</Label>
                  <Input 
                    id="name"
                    name="name"
                    type="text" 
                    required
                    className="rounded-xl liquid-glass-subtle focus-visible:ring-red-500 text-[#18181B] dark:text-[#F4F4F5]"
                    placeholder="Your Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-[#18181B] dark:text-[#F4F4F5]">Email</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email" 
                    required
                    className="rounded-xl liquid-glass-subtle focus-visible:ring-red-500 text-[#18181B] dark:text-[#F4F4F5]"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium text-[#18181B] dark:text-[#F4F4F5]">Message</Label>
                <Textarea 
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="rounded-xl liquid-glass-subtle focus-visible:ring-red-500 text-[#18181B] dark:text-[#F4F4F5] resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

              <Button 
                type="submit" 
                disabled={status === "loading" || status === "success"}
                className={`w-full h-12 text-sm font-medium transition-all ${
                  status === "success" 
                    ? "bg-green-500 hover:bg-green-600 text-white shadow-green-500/20" 
                    : "bg-red-500 hover:bg-red-600 text-white shadow-red-500/20"
                } shadow-sm`}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending Message...
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Message Sent Successfully!
                  </>
                ) : status === "error" ? (
                  "Failed to send. Try again."
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </GlassCard>
        </div>
      </motion.div>
    </section>
  );
}
