import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AuroraBackground from "@/components/AuroraBackground";
import CommandPalette from "@/components/CommandPalette";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Josh Strohm | AI Automation Consultant",
  description: "I build custom AI automations and agents that remove manual work, speed up revenue workflows, and make operations scalable.",
  keywords: ["AI Automation", "AI Consultant", "Workflow Automation", "AI Agents", "Business Automation"],
  openGraph: {
    title: "Josh Strohm | AI Automation Consultant",
    description: "I build custom AI automations and agents that remove manual work, speed up revenue workflows, and make operations scalable.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-bg text-text font-sans antialiased">
        <AuroraBackground />
        <Navigation />
        <CommandPalette />
        <main className="flex-1 relative z-10">
          {children}
        </main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}