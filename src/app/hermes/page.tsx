"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import CTABanner from "@/components/CTABanner";

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

const capabilities = [
  {
    icon: "🤖",
    title: "Autonomous Task Execution",
    description: "Plans and executes complex multi-step workflows without constant supervision. Handles exceptions and recovers gracefully.",
  },
  {
    icon: "🔗",
    title: "Tool Integration",
    description: "Connects to your existing tools and APIs. Executes actions across multiple platforms in a single coordinated operation.",
  },
  {
    icon: "📊",
    title: "Context Memory",
    description: "Maintains conversation context across sessions. Learns from interactions to improve future task performance.",
  },
  {
    icon: "⚡",
    title: "Real-Time Reasoning",
    description: "Thinks through problems step-by-step. Explains its reasoning so you understand what it's doing and why.",
  },
  {
    icon: "🛡️",
    title: "Secure Execution",
    description: "Runs in isolated environments with proper auth. Every action is logged and auditable.",
  },
  {
    icon: "🔄",
    title: "Continuous Operation",
    description: "Works while you sleep. Monitors for triggers, sends alerts, and keeps systems running.",
  },
];

const terminalSteps = [
  { command: "hermes setup --project my-workflow", output: "Initializing Hermes agent..." },
  { command: "hermes connect --tools github,slack,notion", output: "Connected to 3 tools" },
  { command: "hermes task \"Review open PRs and summarize for team\"", output: "Analyzing 12 open pull requests..." },
  { command: "hermes status", output: "Task complete. 4 PRs need attention." },
];

export default function HermesPage() {
  const [terminalStep, setTerminalStep] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((c) => !c);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (terminalStep < terminalSteps.length) {
      const timer = setTimeout(() => {
        setTerminalStep((s) => s + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [terminalStep]);

  return (
    <>
      {/* Hero */}
      <Section className="pt-32 pb-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <RevealOnScroll>
              <div className="text-6xl mb-6">🤖</div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Meet Hermes.
              </h1>
              <p className="text-xl text-text2 mb-6">
                Your autonomous AI agent that works while you sleep. Hermes handles complex multi-step tasks, integrates with your tools, and delivers results—not just updates.
              </p>
              <p className="text-lg text-text2">
                Built on Claude, Hermes combines reasoning with action. It doesn&apos;t just chat—it does.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <Card variant="glass" className="p-8 font-mono text-sm">
                <div className="space-y-2">
                  <div className="text-text2">$ hermes --version</div>
                  <div className="text-accent">Hermes v2.4.1 (Claude 3.5 Sonnet)</div>
                  <div className="h-px bg-border my-4" />
                  <div className="text-text2">$ hermes status</div>
                  <div className="text-accent">● Running | 3 active tasks</div>
                  <div className="text-text2 mt-4">$ _</div>
                </div>
              </Card>
            </RevealOnScroll>
          </div>
        </Container>
      </Section>

      {/* Capabilities */}
      <Section className="bg-surface">
        <Container>
          <RevealOnScroll>
            <h2 className="text-3xl font-bold mb-4">What Hermes does</h2>
            <p className="text-lg text-text2 mb-12 max-w-2xl">
              Hermes is an AI agent designed for real work—not demos. It handles the tasks that traditionally required a dedicated person or team.
            </p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => (
              <RevealOnScroll key={cap.title} delay={i * 100}>
                <Card variant="glass" className="p-8 h-full">
                  <div className="text-4xl mb-4">{cap.icon}</div>
                  <h3 className="text-xl font-semibold text-text mb-3">{cap.title}</h3>
                  <p className="text-text2">{cap.description}</p>
                </Card>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </Section>

      {/* Terminal Demo */}
      <Section>
        <Container>
          <RevealOnScroll>
            <h2 className="text-3xl font-bold mb-4">See it in action</h2>
            <p className="text-lg text-text2 mb-12 max-w-2xl">
              Watch Hermes work through a real task—from setup to completion.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <Card variant="glass" className="p-6 max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-text2 text-sm">hermes terminal</span>
              </div>
              <div className="font-mono text-sm space-y-3">
                {terminalSteps.slice(0, terminalStep).map((step, i) => (
                  <div key={i}>
                    <div className="flex gap-2">
                      <span className="text-accent">→</span>
                      <span className="text-text">{step.command}</span>
                    </div>
                    <div className="text-text2 ml-6">{step.output}</div>
                  </div>
                ))}
                {terminalStep < terminalSteps.length && (
                  <div className="flex gap-2">
                    <span className="text-accent">→</span>
                    <span className="text-text">
                      {terminalSteps[terminalStep].command}
                      <span className={showCursor ? "opacity-100" : "opacity-0"}>_</span>
                    </span>
                  </div>
                )}
                {terminalStep === terminalSteps.length && (
                  <div className="flex gap-2">
                    <span className="text-accent">→</span>
                    <span className="text-text">
                      hermes status
                      <span className={showCursor ? "opacity-100" : "opacity-0"}>_</span>
                    </span>
                  </div>
                )}
              </div>
            </Card>
          </RevealOnScroll>
        </Container>
      </Section>

      <CTABanner />
    </>
  );
}