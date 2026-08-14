"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { ScrambleText } from "@/components/ui/scramble-text";

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
    
    // Add the Web3Forms Access Key from the environment variables
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
        
        // Reset success message after 3 seconds
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
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#18181B] dark:text-[#F4F4F5] mb-2">
              <ScrambleText text="Let's Work Together" />
            </h2>
            <div className="h-1 w-12 bg-blue-600 dark:bg-blue-500 rounded-full" />
          </div>
          
          <p className="text-base text-[#52525B] dark:text-[#A1A1AA] leading-relaxed max-w-xl">
            Currently available for freelance opportunities and full-time roles. If you have a project that needs some creative magic, I'd love to hear about it.
          </p>

          <div className="flex flex-wrap gap-3 mt-2">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#1A1A1A] border border-[#E4E4E7] dark:border-[#27272A] text-[#52525B] dark:text-[#A1A1AA] hover:text-blue-600 dark:hover:text-blue-500 hover:border-blue-500/50 shadow-sm transition-all"
              >
                {social.icon}
                <span className="text-sm font-medium">{social.name}</span>
              </motion.a>
            ))}
          </div>
        </div>
        
        {/* Form (Wide) */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-[#1A1A1A] p-8 rounded-2xl border border-[#E4E4E7] dark:border-[#27272A] shadow-sm w-full">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-[#18181B] dark:text-[#F4F4F5]">Name</Label>
              <Input 
                id="name"
                name="name"
                type="text" 
                required
                className="rounded-lg border-[#E4E4E7] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#121212] focus-visible:ring-blue-500 text-[#18181B] dark:text-[#F4F4F5]"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-[#18181B] dark:text-[#F4F4F5]">Email</Label>
              <Input 
                id="email"
                name="email"
                type="email" 
                required
                className="rounded-lg border-[#E4E4E7] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#121212] focus-visible:ring-blue-500 text-[#18181B] dark:text-[#F4F4F5]"
                placeholder="john@example.com"
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
              className="rounded-lg border-[#E4E4E7] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#121212] focus-visible:ring-blue-500 text-[#18181B] dark:text-[#F4F4F5] resize-none"
              placeholder="Tell me about your project..."
            />
          </div>
          
          {/* Web3Forms Honeypot Spam Protection */}
          <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

          <Button 
            type="submit" 
            disabled={status === "loading" || status === "success"}
            className={`w-full h-12 text-sm font-medium transition-all ${
              status === "success" 
                ? "bg-green-500 hover:bg-green-600 text-white shadow-green-500/20" 
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20"
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
      </motion.div>
    </section>
  );
}
