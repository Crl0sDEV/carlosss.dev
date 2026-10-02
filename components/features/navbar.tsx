"use client";

import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 liquid-glass-navbar transition-colors duration-300">
      <div className="max-w-5xl lg:max-w-6xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        <MagneticButton strength={0.25}>
          <a
            href="#home"
            className="text-lg font-bold font-pixel tracking-wider text-[#18181B] dark:text-[#F4F4F5] inline-block"
          >
            carlos<span className="text-[#636B2F] dark:text-[#D4DE95]">dev</span>
          </a>
        </MagneticButton>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-[#52525B] dark:text-[#A1A1AA]">
          {links.map((link) => (
            <MagneticButton key={link.name} strength={0.3}>
              <a
                href={link.href}
                className="hover:text-[#636B2F] dark:hover:text-[#D4DE95] transition-colors inline-block px-1 py-0.5"
              >
                {link.name}
              </a>
            </MagneticButton>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Toggle Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="p-2 -mr-2 text-[#52525B] dark:text-[#A1A1AA] hover:text-[#18181B] dark:hover:text-[#F4F4F5] focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <div className="w-6 h-5 flex flex-col justify-between items-end">
              <span
                className={`h-0.5 bg-current rounded-full transition-all duration-300 ${
                  isOpen ? "w-6 rotate-45 translate-y-2.5" : "w-6"
                }`}
              />
              <span
                className={`h-0.5 bg-current rounded-full transition-all duration-300 ${
                  isOpen ? "opacity-0" : "w-5"
                }`}
              />
              <span
                className={`h-0.5 bg-current rounded-full transition-all duration-300 ${
                  isOpen ? "w-6 -rotate-45 -translate-y-2" : "w-4"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute top-16 left-0 right-0 liquid-glass-navbar shadow-2xl overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 py-4 gap-4">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium text-[#52525B] dark:text-[#A1A1AA] hover:text-[#636B2F] dark:hover:text-[#D4DE95] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
