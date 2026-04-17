"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import CTABanner from "@/components/CTABanner";

const caseStudies = [
  {
    industry: "E-commerce",
    title: "Order → Fulfillment Automation",
    summary: "Automated the entire order-to-fulfillment pipeline for a 7-figure Shopify store, eliminating manual data entry and reducing errors.",
    metrics: [
      { label: "Time saved", value: "25 hrs/week" },
      { label: "Error reduction", value: "98%" },
      { label: "Fulfillment speed", value: "2x faster" },
    ],
    tags: ["Shopify", "Zapier", "Slack", "Shipping API"],
  },
  {
    industry: "Professional Services",
    title: "AI Lead Qualification + Routing",
    summary: "Built an intelligent lead qualification system that scores, enriches, and routes prospects to the right team members automatically.",
    metrics: [
      { label: "Lead response", value: "Instant" },
      { label: "Qualification rate", value: "3x" },
      { label: "Conversion increase", value: "40%" },
    ],
    tags: ["n8n", "OpenAI", "HubSpot", "CRM"],
  },
  {
    industry: "SaaS",
    title: "Onboarding Automation",
    summary: "Created a personalized onboarding workflow that adapts based on user behavior, reducing time-to-value and improving retention.",
    metrics: [
      { label: "Setup time", value: "-65%" },
      { label: "User activation", value: "+45%" },
      { label: "Support tickets", value: "-30%" },
    ],
    tags: ["Custom", "Segment", "Intercom", "Notion"],
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

export default function CaseStudiesPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-32 pb-16">
        <Container>
          <RevealOnScroll>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Proof, not promises.
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={100}>
            <p className="text-xl text-text2 max-w-2xl">
              Real results from real implementations. More coming soon.
            </p>
          </RevealOnScroll>
        </Container>
      </Section>

      {/* Case Studies Grid */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, i) => (
              <RevealOnScroll key={study.title} delay={i * 100}>
                <Card variant="glow" className="p-6 h-full flex flex-col">
                  <Badge className="mb-4 w-fit">{study.industry}</Badge>
                  <h3 className="text-xl font-bold text-text mb-3">{study.title}</h3>
                  <p className="text-text2 text-sm mb-6 flex-1">{study.summary}</p>
                  
                  <div className="grid grid-cols-3 gap-4 py-4 border-t border-border mb-4">
                    {study.metrics.map((metric) => (
                      <div key={metric.label}>
                        <div className="text-lg font-bold text-accent">{metric.value}</div>
                        <div className="text-xs text-muted">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 rounded bg-surface text-text2">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>
              </RevealOnScroll>
            ))}
          </div>

          {/* Empty State */}
          <RevealOnScroll delay={300}>
            <div className="mt-16 text-center p-8 border border-dashed border-border rounded-2xl">
              <p className="text-lg text-text2 mb-4">More case studies coming soon</p>
              <Link href="/contact">
                <Button>Get Your Free Audit</Button>
              </Link>
            </div>
          </RevealOnScroll>
        </Container>
      </Section>

      <CTABanner />
    </>
  );
}