"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CTABanner from "@/components/CTABanner";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import { Metadata } from "next";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
  featured: boolean;
  image?: string | null;
  content: string;
}

interface BlogClientProps {
  posts: BlogPost[];
}

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2" />
    <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" strokeWidth="2" />
    <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ListIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GridIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const ArrowRight = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function BlogPageClient({ posts }: BlogClientProps) {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const featuredPosts = posts.filter((p) => p.featured).slice(0, 3);
  const remainingPosts = posts.filter((p) => !p.featured);

  return (
    <>
      <Section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />

        <Container className="relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 mb-6">
              Insights & Analysis
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-4 tracking-tight">
              The Automation Blog
            </h1>
            <p className="text-lg text-text2 leading-relaxed">
              Practical insights on AI automation, workflow optimization, and building systems that scale.
            </p>
          </div>
        </Container>
      </Section>

      {featuredPosts.length > 0 && (
        <Section className="pb-12">
          <Container>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-text2">
                Featured Articles
              </h2>
              <div className="h-px flex-1 mx-4 bg-border/50" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post, index) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <Card
                    variant="glass"
                    className="overflow-hidden h-full bg-surface/40 border-border/50 hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5 p-0"
                  >
                    <div className="relative h-48 overflow-hidden">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-surface to-surface2 flex items-center justify-center">
                          <span className="text-5xl font-bold text-text/10 font-mono">
                            {post.title.substring(0, 2)}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-3 text-xs text-white/80 font-mono">
                          <span className="flex items-center gap-1.5">
                            <CalendarIcon />
                            {formatDate(post.date)}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <ClockIcon />
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-text mb-2 line-clamp-2 group-hover:text-accent transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-sm text-text2 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 flex items-center text-sm font-medium text-accent gap-1.5">
                        <span>Read article</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {remainingPosts.length > 0 && (
        <Section className="pb-24">
          <Container>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-text2">
                All Articles
              </h2>
              <div className="h-px flex-1 mx-4 bg-border/50" />
              <div className="flex items-center gap-1 bg-surface/50 rounded-lg p-1 border border-border/50">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === "list"
                      ? "bg-accent text-white shadow-lg"
                      : "text-text2 hover:text-text hover:bg-surface2"
                  }`}
                  aria-label="List view"
                >
                  <ListIcon />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === "grid"
                      ? "bg-accent text-white shadow-lg"
                      : "text-text2 hover:text-text hover:bg-surface2"
                  }`}
                  aria-label="Grid view"
                >
                  <GridIcon />
                </button>
              </div>
            </div>

            {viewMode === "list" ? (
              <div className="space-y-4">
                {remainingPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                    <Card
                      variant="glass"
                      className="overflow-hidden bg-surface/40 border-border/50 hover:border-accent/30 transition-all duration-300 hover:-translate-y-0.5 p-0"
                    >
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative w-full sm:w-56 h-48 sm:h-auto overflow-hidden flex-shrink-0">
                          {post.image ? (
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-surface to-surface2 flex items-center justify-center">
                              <span className="text-3xl font-bold text-text/10 font-mono">
                                {post.title.substring(0, 2)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 p-6 flex flex-col justify-center">
                          <div className="flex items-center gap-4 text-xs text-text2 font-mono mb-3">
                            <span className="flex items-center gap-1.5">
                              <CalendarIcon />
                              {formatDate(post.date)}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <ClockIcon />
                              {post.readTime}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold text-text mb-2 group-hover:text-accent transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-sm text-text2 line-clamp-2 leading-relaxed">
                            {post.excerpt}
                          </p>
                          <div className="mt-4 flex items-center text-sm font-medium text-accent gap-1.5">
                            <span>Read article</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {remainingPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
                    <Card
                      variant="glass"
                      className="overflow-hidden h-full bg-surface/40 border-border/50 hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5 p-0"
                    >
                      <div className="relative h-40 overflow-hidden">
                        {post.image ? (
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-surface to-surface2 flex items-center justify-center">
                            <span className="text-4xl font-bold text-text/10 font-mono">
                              {post.title.substring(0, 2)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-5 flex flex-col flex-grow">
                        <div className="flex items-center gap-3 text-xs text-text2 font-mono mb-3">
                          <span className="flex items-center gap-1.5">
                            <CalendarIcon />
                            {formatDate(post.date)}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <ClockIcon />
                            {post.readTime}
                          </span>
                        </div>
                        <h3 className="text-base font-semibold text-text mb-2 line-clamp-2 group-hover:text-accent transition-colors leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-sm text-text2 line-clamp-3 leading-relaxed flex-grow">
                          {post.excerpt}
                        </p>
                        <div className="mt-4 flex items-center text-sm font-medium text-accent gap-1.5">
                          <span>Read article</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </Container>
        </Section>
      )}

      {posts.length === 0 && (
        <Section className="pb-24">
          <Container>
            <Card variant="glass" className="text-center py-16 bg-surface/40 border-border/50">
              <div className="w-16 h-16 bg-surface2 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-text2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">No articles yet</h3>
              <p className="text-text2 max-w-md mx-auto">
                Check back soon for insights on AI automation and building effective systems.
              </p>
            </Card>
          </Container>
        </Section>
      )}

      <CTABanner />
    </>
  );
}