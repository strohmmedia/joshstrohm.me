"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ParticleNetwork from "@/components/ParticleNetwork";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import CTABanner from "@/components/CTABanner";

const techStack = [
  "Claude Code", "n8n", "Make", "Zapier",
  "OpenAI", "Anthropic", "CrewAI", "LangChain", "LlamaIndex",
  "Cursor", "VS Code", "Python", "Node.js",
  "Supabase", "Postgres", "Redis",
  "Notion", "Slack",
  "Airtable", "HubSpot", "Salesforce", "Zoho",
  "Pipedream", "Bardeen", "Relevance AI", "Lindy AI"
];

const problemCards = [
  { icon: "⏱️", title: "Hours lost to busywork", description: "Manual data entry, follow-ups, and repetitive tasks eating your team's time." },
  { icon: "🥶", title: "Leads go cold", description: "Prospects slip through the cracks because there's no instant follow-up system." },
  { icon: "📊", title: "Tool overload", description: "Too many disconnected apps creating more work instead of less." },
  { icon: "💰", title: "Revenue left on the table", description: "Inefficient processes mean slower closes and wasted marketing spend." },
];

const servicesCards = [
  { href: "/services#workflows", title: "AI Workflow Automation", description: "Intelligent automations that handle repetitive tasks with precision." },
  { href: "/services#agents", title: "Custom AI Agents", description: "Purpose-built agents that reason, decide, and act on your behalf." },
  { href: "/services#strategy", title: "AI Strategy & Roadmapping", description: "Clear paths from chaos to automated operations." },
  { href: "/services#optimization", title: "Ongoing Optimization", description: "Continuous improvement to keep your systems ahead." },
];

const processSteps = [
  { number: "01", title: "Audit", description: "I map your current workflows and identify the highest-impact automation opportunities." },
  { number: "02", title: "Build", description: "Custom systems designed for how your business actually operates, not generic templates." },
  { number: "03", title: "Deploy + Optimize", description: "Production-ready automations with monitoring, error handling, and continuous tuning." },
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

    if (ref.current) {
      observer.observe(ref.current);
    }

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

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  return (
    <div className="text-4xl md:text-5xl font-bold">
      {value}{suffix}
    </div>
  );
}

export default function Home() {
  const servicesRef = useRef<HTMLDivElement>(null);

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20">
        <ParticleNetwork />
        <Container>
          <div className="max-w-3xl">
            <RevealOnScroll>
              <Badge className="mb-6">AI AUTOMATION CONSULTANT</Badge>
            </RevealOnScroll>
            
            <RevealOnScroll delay={100}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6">
                I build the{" "}
                <span>AI systems</span>
                {" "}that run your business.
              </h1>
            </RevealOnScroll>
            
            <RevealOnScroll delay={200}>
              <p className="text-xl md:text-2xl text-text2 leading-relaxed mb-8 max-w-2xl">
Custom workflows, intelligent agents, and automations engineered for how your company actually operates.
              </p>
            </RevealOnScroll>
            
            <RevealOnScroll delay={300}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/ai-assessment">
                  <Button size="lg">Get Your AI Assessment →</Button>
                </Link>
                <Button variant="secondary" size="lg" onClick={scrollToServices}>
                  See What I Build
                </Button>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={400}>
              <div className="mt-16 pt-8 border-t border-border">
                <p className="text-sm text-muted mb-4">Tools I work with</p>
                <div className="flex flex-wrap gap-6 opacity-50 grayscale">
                  {["Claude Code", "n8n", "Make", "Zapier", "Notion", "Slack", "Cursor", "Supabase", "PostgreSQL"].map((tool) => (
                    <span key={tool} className="text-sm font-medium text-text2">{tool}</span>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      {/* Problem Section */}
      <Section>
        <Container>
          <RevealOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 max-w-2xl">
              Your team is drowning in work that shouldn&apos;t require a human.
            </h2>
          </RevealOnScroll>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {problemCards.map((card, i) => (
              <RevealOnScroll key={card.title} delay={i * 100}>
                <Card variant="glass" className="p-6">
                  <div className="text-3xl mb-4">{card.icon}</div>
                  <h3 className="text-lg font-semibold text-text mb-2">{card.title}</h3>
                  <p className="text-text2 text-sm">{card.description}</p>
                </Card>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </Section>

      {/* Services Overview */}
      <Section ref={servicesRef} className="bg-surface">
        <Container>
          <RevealOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              Four services. One outcome: your business runs cleaner.
            </h2>
          </RevealOnScroll>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicesCards.map((service, i) => (
              <RevealOnScroll key={service.title} delay={i * 100}>
                <Link href={service.href}>
                  <Card variant="glow" className="p-8 group cursor-pointer">
                    <h3 className="text-xl font-semibold text-text mb-3 group-hover:text-[#2dd4bf] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-text2">{service.description}</p>
                    <div className="mt-4 text-accent text-sm font-medium group-hover:translate-x-2 transition-transform">
                      Learn more →
                    </div>
                  </Card>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section>
        <Container>
          <RevealOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold mb-12">How I work</h2>
          </RevealOnScroll>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processSteps.map((step, i) => (
              <RevealOnScroll key={step.number} delay={i * 150}>
                <div className="relative">
                  <div className="text-6xl md:text-7xl font-bold text-muted/20 font-mono mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-text mb-3">{step.title}</h3>
                  <p className="text-text2">{step.description}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </Section>

      {/* Results */}
      <Section className="bg-surface">
        <Container>
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">What I've helped with</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                <div className="text-center">
                  <AnimatedCounter value="5-10" />
                  <p className="text-text2 mt-2">hours saved/week</p>
                </div>
                <div className="text-center">
                  <AnimatedCounter value="Instant" />
                  <p className="text-text2 mt-2">lead follow-up</p>
                </div>
                <div className="text-center">
                  <AnimatedCounter value="<7" />
                  <p className="text-text2 mt-2">days to launch</p>
                </div>
              </div>
            </div>
          </RevealOnScroll>
          
          <RevealOnScroll delay={200}>
            <blockquote className="text-xl md:text-2xl text-text text-center max-w-2xl mx-auto italic border-l-4 border-accent pl-6">
              &ldquo;If it doesn&apos;t save time or make money, it doesn&apos;t ship.&rdquo;
              <footer className="text-base text-text2 mt-4 not-italic">- Josh Strohm</footer>
            </blockquote>
          </RevealOnScroll>
        </Container>
      </Section>

      {/* Tech Marquee */}
      <Section className="py-8 overflow-hidden">
        <div className="mb-8 text-center">
          <p className="text-sm text-muted">Tools I work with</p>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg to-transparent z-10" />
          <div className="flex animate-marquee gap-12">
            {[...techStack, ...techStack].map((tech, i) => (
              <span key={i} className="text-lg font-medium text-text2 whitespace-nowrap">{tech}</span>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Banner */}
      <CTABanner />
    </>
  );
}
