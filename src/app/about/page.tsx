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
      <Section className="pt-32 pb-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <RevealOnScroll>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                The person behind the systems.
              </h1>
              <p className="text-xl text-text2">
                Hi, I'm Josh Strohm. I help small businesses and startups eliminate manual work through smart AI automation.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <div className="relative aspect-square max-w-md mx-auto lg:max-w-none">
                <Image
                  src="/my_photo.jpg"
                  alt="Josh Strohm"
                  fill
                  className="object-cover rounded-2xl"
                  priority
                />
              </div>
            </RevealOnScroll>
          </div>
        </Container>
      </Section>

      {/* Bio */}
      <Section>
        <Container>
          <RevealOnScroll>
            <div className="max-w-3xl">
              <p className="text-xl text-text2 leading-relaxed mb-6">
                I spent years watching businesses drown in manual work. Data entry, follow-ups, copy-paste between apps, endless status meetings about &ldquo;process.&rdquo;
              </p>
              <p className="text-xl text-text2 leading-relaxed mb-6">
                Then I discovered what AI and automation could actually do-not in theory, in production. I started building systems that replaced the drudgery and gave teams their time back.
              </p>
              <p className="text-xl text-text2 leading-relaxed mb-6">
                I work with small businesses and startups who need real automation-not expensive enterprise solutions that don't fit their budget or needs. My clients want systems that actually work without requiring a dedicated IT team.
              </p>
              <p className="text-xl text-text2 leading-relaxed">
                I don&apos;t do generic chatbots or useless dashboards. I build production-grade AI systems that integrate with your tools, follow your logic, and scale with your business.
              </p>
            </div>
          </RevealOnScroll>
        </Container>
      </Section>

      {/* Principles */}
      <Section className="bg-surface">
        <Container>
          <RevealOnScroll>
            <h2 className="text-3xl font-bold mb-12">How I work</h2>
          </RevealOnScroll>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {principles.map((principle, i) => (
              <RevealOnScroll key={principle.title} delay={i * 100}>
                <Card variant="glass" className="p-8">
                  <div className="text-4xl mb-4">{principle.icon}</div>
                  <h3 className="text-xl font-semibold text-text mb-3">{principle.title}</h3>
                  <p className="text-text2">{principle.description}</p>
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