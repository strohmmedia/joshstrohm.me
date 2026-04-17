"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";

const revenueRanges = [
  { value: "", label: "Select revenue range" },
  { value: "under-10k", label: "Under $10K" },
  { value: "10k-50k", label: "$10K - $50K" },
  { value: "50k-100k", label: "$50K - $100K" },
  { value: "100k-250k", label: "$100K - $250K" },
  { value: "250k-500k", label: "$250K - $500K" },
  { value: "500k-1m", label: "$500K - $1M" },
  { value: "over-1m", label: "Over $1M" },
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    revenue: "",
    message: "",
  });
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://n8n.srv945929.hstgr.cloud/webhook/c537f342-3791-4c51-b68c-6a8dfa77e3bb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, consent }),
      });
      
      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Section className="pt-32 pb-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Column */}
            <div>
              <RevealOnScroll>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Get your free automation audit.
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={100}>
                <p className="text-xl text-text2 mb-8">
                  No calls required. I&apos;ll respond within 24 hours.
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={200}>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-surface2 border border-border flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-text">Email</p>
                      <p className="text-text2">hello@joshstrohm.me</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-surface2 border border-border flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-text">Response time</p>
                      <p className="text-text2">Within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-surface2 border border-border flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-text">Location</p>
                      <p className="text-text2">Remote-first, US-based</p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            {/* Right Column - Form */}
            <div>
              <RevealOnScroll>
                <Card variant="glass" className="p-8">
                  {isSuccess ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-text mb-2">Got it!</h3>
                      <p className="text-text2 mb-6">
                        I&apos;ll review your info and get back to you within 24 hours.
                      </p>
                      <p className="text-sm text-muted">
                        In the meantime, check out my{" "}
                        <Link href="/case-studies" className="text-accent hover:underline">
                          case studies
                        </Link>{" "}
                        to see what I&apos;ve built.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <Input
                        id="name"
                        label="Name"
                        placeholder="Your name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                      
                      <Input
                        id="email"
                        label="Email"
                        type="email"
                        placeholder="you@company.com"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      
                      <Input
                        id="company"
                        label="Company"
                        placeholder="Your company name"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                      
                      <Input
                        id="website"
                        label="Website (optional)"
                        type="url"
                        placeholder="https://yourcompany.com"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      />
                      
                      <Select
                        id="revenue"
                        label="Company revenue"
                        options={revenueRanges}
                        required
                        value={formData.revenue}
                        onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                      />
                      
                      <Textarea
                        id="message"
                        label="What are you trying to automate?"
                        placeholder="Describe the manual work you want to eliminate..."
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />

                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="consent"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          className="mt-1 w-4 h-4 rounded border-border bg-surface2 text-[#0fb0d7] focus:ring-[#2dd4bf] focus:ring-offset-bg"
                        />
                        <label htmlFor="consent" className="text-sm text-text2">
                          Yes, I'd like to receive helpful tips and updates about AI automation. Unsubscribe anytime.
                        </label>
                      </div>

                      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Get My Free Audit →"}
                      </Button>
                    </form>
                  )}
                </Card>
              </RevealOnScroll>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}