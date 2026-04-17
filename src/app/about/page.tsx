"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import CTABanner from "@/components/CTABanner";

const principles = [
  {
    icon: "🎯",
    title: "Outcomes over hours",
    description: "I don't track time. I track results. If something doesn't move the needle, it doesn't get built.",
  },
  {
    icon: "🔍",
    title: "No black boxes",
    description: "You own everything. Every workflow, every agent, every integration-is documented and accessible.",
  },
  {
    icon: "🚀",
    title: "Start small, scale fast",
    description: "Prove it works with one process, then expand. No massive upfront bets required.",
  },
  {
    icon: "💬",
    title: "Honest over comfortable",
    description: "I'll tell you when automation isn't the answer. Sometimes the fix is simpler than you think.",
  },
];

function RevealOnScroll({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Section className="relative pt-40 pb-24 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] -z-10 animate-pulse-glow" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent3/10 rounded-full blur-[100px] -z-10" />

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <RevealOnScroll>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-accent/20 mb-8 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-semibold text-text uppercase tracking-widest">Digital Architect</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-[1.1]">
                The person behind the <span className="gradient-text">systems</span>.
              </h1>
              
              <p className="text-xl md:text-2xl text-text2 max-w-xl leading-relaxed mb-10">
                Hi, I'm Josh Strohm. I bridge the gap between complex AI technology and real-world business growth through intelligent automation.
              </p>

              <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-lg">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-text">150+</span>
                  <span className="text-[10px] md:text-xs text-muted uppercase tracking-wider font-semibold">Systems built</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-text">10k+</span>
                  <span className="text-[10px] md:text-xs text-muted uppercase tracking-wider font-semibold">Hours saved</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-text">US</span>
                  <span className="text-[10px] md:text-xs text-muted uppercase tracking-wider font-semibold">Based</span>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <div className="relative group">
                {/* Image Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-accent to-accent2 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                
                <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none glass p-3 rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden">
                  <div className="relative w-full h-full overflow-hidden rounded-[1.8rem]">
                    <Image
                      src="/my_photo.jpg"
                      alt="Josh Strohm"
                      fill
                      className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                      priority
                    />
                    
                    {/* Overlay info tag */}
                    <div className="absolute bottom-6 left-6 right-6 p-4 glass rounded-2xl border border-white/10 backdrop-blur-xl translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-sm font-bold text-text">Josh Strohm</p>
                      <p className="text-xs text-text2">AI Automation Specialist</p>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </Container>
      </Section>

      {/* Bio */}
      <Section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>
        
        <Container>
          <RevealOnScroll>
            <div className="max-w-3xl mx-auto md:text-center mb-12">
               <span className="text-accent font-mono text-sm uppercase tracking-widest mb-4 block">The Mission</span>
               <h2 className="text-3xl md:text-5xl font-bold mb-8">Bridging the gap between manual drudgery and high-scale output.</h2>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-8">
              <p className="text-lg md:text-xl text-text2 leading-relaxed">
                I spent years watching businesses drown in manual work. Data entry, follow-ups, copy-paste between apps, endless status meetings about &ldquo;process.&rdquo;
              </p>
              <p className="text-lg md:text-xl text-text2 leading-relaxed">
                Then I discovered what AI and automation could actually do—not in theory, but in production. I started building systems that replaced the drudgery and gave teams their time back.
              </p>
              <p className="text-lg md:text-xl text-text2 leading-relaxed p-6 glass rounded-2xl border-l-4 border-l-accent">
                I work with small businesses and startups who need real automation—not expensive enterprise solutions that don't fit their budget or needs. My clients want systems that actually work without requiring a dedicated IT team.
              </p>
              <p className="text-lg md:text-xl text-text2 leading-relaxed">
                I don&apos;t do generic chatbots or useless dashboards. I build production-grade AI systems that integrate with your tools, follow your logic, and scale with your business.
              </p>
            </div>
          </RevealOnScroll>
        </Container>
      </Section>

      {/* Principles */}
      <Section className="bg-surface relative py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        <Container>
          <RevealOnScroll>
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Principles</h2>
              <p className="text-text2 max-w-xl">How I approach every system I build to ensure long-term value and reliability.</p>
            </div>
          </RevealOnScroll>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {principles.map((principle, i) => (
              <RevealOnScroll key={principle.title} delay={i * 100}>
                <Card variant="glass" className="p-8 h-full group hover:bg-surface2 transition-colors duration-500 border-border/50">
                  <div className="w-14 h-14 rounded-2xl bg-surface2 border border-border flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-accent/10 group-hover:border-accent/30 transition-all duration-500">
                    {principle.icon}
                  </div>
                  <h3 className="text-xl font-bold text-text mb-3">{principle.title}</h3>
                  <p className="text-text2 leading-relaxed">{principle.description}</p>
                </Card>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </Section>

      <CTABanner />
    </>
  );
}