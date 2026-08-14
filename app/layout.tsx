import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollProgress } from "@/components/features/scroll-progress";
import { AmbientSpotlight } from "@/components/features/ambient-spotlight";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://carlosssdev.vercel.app"),
  title: {
    default: "Carlos Miguel Sandrino | Full Stack Web Developer",
    template: "%s | Carlos Miguel Sandrino"
  },
  description: "I build fast, scalable custom web applications that automate workflows, engage customers, and directly increase revenue for your business.",
  keywords: ["Carlos Miguel Sandrino", "Full Stack Developer", "Web Developer Philippines", "Next.js Developer", "Freelance Web Developer", "Software Engineer"],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Carlos Miguel Sandrino | Full Stack Web Developer",
    description: "I build fast, scalable custom web applications that drive real business results.",
    url: "https://carlosssdev.vercel.app",
    siteName: "Carlos Miguel Portfolio",
    images: [
      {
        url: "/profile.png", 
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  verification: {
    google: "XrhjcO-Xcvf0l4TVmWp7WdXGEOQ_Cs3v_BW7z3OYV6I",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "scroll-smooth", "antialiased", plusJakartaSans.variable, spaceGrotesk.variable, "font-sans")}
    >
      <head>
        <link rel="preconnect" href="https://github-contributions-api.jogruber.de" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://github-contributions-api.jogruber.de" />
        <link rel="preconnect" href="https://xbnpbeddrltrtdomibad.supabase.co" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://xbnpbeddrltrtdomibad.supabase.co" />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollProgress />
          <AmbientSpotlight />
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
