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
    industry: "Consulting",
    title: "Client Communication Automation",
    summary: "Set up automated follow-up emails and meeting reminders for a solo consultant, so no lead or client falls through the cracks.",
    metrics: [
      { label: "Time saved", value: "5 hrs/week" },
      { label: "Response time", value: "Instant" },
      { label: "Missed follow-ups", value: "0" },
    ],
    tags: ["Google Workspace", "Make", "Email"],
  },
  {
    industry: "E-commerce",
    title: "Inventory Sync",
    summary: "Connected a small Shopify store to their inventory system so orders update automatically without manual entry.",
    metrics: [
      { label: "Manual entries", value: "-90%" },
      { label: "Order processing", value: "4x faster" },
      { label: "Errors", value: "Near zero" },
    ],
    tags: ["Shopify", "Make", "Spreadsheet"],
  },
  {
    industry: "Freelancer",
    title: "Proposal & Invoice Workflow",
    summary: "Created a system that automatically sends proposals and follows up, then generates invoices when clients accept.",
    metrics: [
      { label: "Time on admin", value: "-60%" },
      { label: "Proposal time", value: "10 min" },
      { label: "Follow-ups", value: "Automated" },
    ],
    tags: ["Notion", "Google Docs", "Stripe"],
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