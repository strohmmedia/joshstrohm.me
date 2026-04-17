"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import CTABanner from "@/components/CTABanner";

const services = [
  {
    id: "workflows",
    number: "01",
    title: "AI Workflow Automation",
    description: "Custom workflows that eliminate manual bottlenecks. Built to handle your specific processes with robust error handling and monitoring.",
    deliverables: [
      "Multi-step workflow design and implementation",
      "Integration with 50+ business tools",
      "Error handling and retry logic",
      "Real-time monitoring dashboards",
      "Documentation and team training",
    ],
  },
  {
    id: "agents",
    number: "02",
    title: "Custom AI Agents",
    description: "Intelligent agents that reason, decide, and execute. These are autonomous systems that handle complex tasks for you.",
    deliverables: [
      "Agent architecture and tool design",
      "Knowledge base integration",
      "Guardrails and safety protocols",
      "Performance evaluation frameworks",
      "Continuous monitoring and tuning",
    ],
  },
  {
    id: "strategy",
    number: "03",
    title: "AI Strategy & Roadmapping",
    description: "Clear guidance so you know where to invest. This is a practical plan based on your business needs.",
    deliverables: [
      "Operations audit and opportunity mapping",
      "ROI analysis and prioritization",
      "Phased implementation roadmap",
      "Tool selection and vendor evaluation",
      "Success metrics and KPIs",
    ],
  },
  {
    id: "optimization",
    number: "04",
    title: "Ongoing Optimization",
    description: "Automation is a continuous process. I keep your systems running efficiently as your business grows.",
    deliverables: [
      "Regular performance tuning",
      "Edge case identification and handling",
      "New automation opportunities",
      "Monthly reporting and insights",
      "Priority support for issues",
    ],
  },
];

const comparison = [
  { feature: "Setup time", diy: "20+ hours", inhouse: "2-4 weeks", josh: "1-2 weeks" },
  { feature: "Customization", diy: "Limited", inhouse: "Full", josh: "Full" },
  { feature: "Ongoing support", diy: "You", inhouse: "Included", josh: "Included" },
  { feature: "Cost structure", diy: "Low cost, high time", inhouse: "$80k+/year", josh: "$3k-10k/project" },
  { feature: "Maintenance", diy: "You", inhouse: "Included", josh: "Included" },
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

function ServiceIcon({ number }: { number: string }) {
  return (
    <svg viewBox="0 0 120 120" className="w-32 h-32 opacity-20">
      <defs>
        <linearGradient id={`grad-${number}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0fb0d7" />
          <stop offset="50%" stopColor="#0fb0d7" />
          <stop offset="100%" stopColor="#f0612d" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="50" fill={`url(#grad-${number})`} />
    </svg>
  );
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-32 pb-16">
        <Container>
          <RevealOnScroll>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Automation that actually works.
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={100}>
            <p className="text-xl text-text2 max-w-2xl">
              No generic bots. Custom systems built for your operations.
            </p>
          </RevealOnScroll>
        </Container>
      </Section>

      {/* Services */}
      <Section>
        <Container>
          <div className="space-y-24">
            {services.map((service, i) => (
              <div key={service.id} id={service.id}>
                <RevealOnScroll>
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                    <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-6xl font-bold text-muted/20 font-mono">{service.number}</span>
                        <h2 className="text-3xl font-bold">{service.title}</h2>
                      </div>
                      <p className="text-lg text-text2 mb-8">{service.description}</p>
                      <ul className="space-y-3">
                        {service.deliverables.map((item) => (
                          <li key={item} className="flex items-center gap-3 text-text2">
                            <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={`flex justify-center ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                      <div className="relative">
                        <ServiceIcon number={service.number} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-24 h-24 rounded-2xl bg-surface2 border border-border flex items-center justify-center">
                            <div className="text-4xl">{["⚡", "🤖", "🗺️", "🔄"][i]}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Comparison */}
      <Section className="bg-surface">
        <Container>
          <RevealOnScroll>
            <h2 className="text-3xl font-bold mb-8 text-center">Choose your path</h2>
          </RevealOnScroll>
          <RevealOnScroll delay={100}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-text2 font-medium">Feature</th>
                    <th className="text-center py-4 px-4 text-text2 font-medium">DIY Tools</th>
                    <th className="text-center py-4 px-4 text-text2 font-medium">In-house</th>
                    <th className="text-center py-4 px-4 text-accent font-bold">Josh</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row.feature} className="border-b border-border">
                      <td className="py-4 px-4 text-text">{row.feature}</td>
                      <td className="py-4 px-4 text-center text-text2">{row.diy}</td>
                      <td className="py-4 px-4 text-center text-text2">{row.inhouse}</td>
                      <td className="py-4 px-4 text-center text-accent font-medium">{row.josh}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </RevealOnScroll>
        </Container>
      </Section>

      <CTABanner />
    </>
  );
}