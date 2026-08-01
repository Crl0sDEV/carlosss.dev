"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAFA]/90 backdrop-blur-md dark:bg-[#121212]/90 border-b border-[#E4E4E7] dark:border-[#27272A] shadow-sm">
      <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="#home" className="text-xl font-bold tracking-tight text-[#18181B] dark:text-[#F4F4F5]">
          carlosss<span className="text-blue-600 dark:text-blue-500">.dev</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-[#52525B] dark:text-[#A1A1AA]">
          {links.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-blue-600 dark:hover:text-blue-500 transition-colors">
              {link.name}
            </Link>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Toggle Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button 
          className="md:hidden p-2 -mr-2 text-[#52525B] dark:text-[#A1A1AA] hover:text-[#18181B] dark:hover:text-[#F4F4F5] focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <div className="w-6 h-5 flex flex-col justify-between items-end">
            <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'w-6 rotate-45 translate-y-2.5' : 'w-6'}`} />
            <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : 'w-5'}`} />
            <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-4'}`} />
          </div>
        </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden absolute top-16 left-0 right-0 bg-[#FAFAFA] dark:bg-[#121212] border-b border-[#E4E4E7] dark:border-[#27272A] shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col px-6 py-4 gap-4">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-base font-medium text-[#52525B] dark:text-[#A1A1AA] hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
