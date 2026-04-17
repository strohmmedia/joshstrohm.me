import { getAllPosts } from "@/lib/blog";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Link from "next/link";
import Image from "next/image";
import CTABanner from "@/components/CTABanner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Josh Strohm - AI Automation Insights",
  description: "Practical thoughts on AI automation, building systems, and what actually works.",
};

// Simple Arrow SVG component
const ArrowRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14"></path>
    <path d="m12 5 7 7-7 7"></path>
  </svg>
);

export default function BlogPage() {
  const posts = getAllPosts();
  const featuredPost = posts.length > 0 ? posts[0] : null;
  const regularPosts = posts.length > 0 ? posts.slice(1) : [];

  return (
    <>
      <Section className="relative pt-40 pb-24 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-accent/10 rounded-full blur-[100px] -z-10 animate-pulse-glow" />
        
        <Container className="relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent/20 mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-text">The Future of Work</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            The Autom<span className="gradient-text">AI</span>tion Playbook
          </h1>
          <p className="text-xl md:text-2xl text-text2 max-w-2xl mx-auto leading-relaxed">
            Real-world insights on augmenting workflows, connecting systems, and putting AI to work for your business.
          </p>
        </Container>
      </Section>

      <Section className="pb-24">
        <Container>
          {posts.length > 0 ? (
            <div className="space-y-16">
              {/* Featured Post */}
              {featuredPost && (
                <Link href={`/blog/${featuredPost.slug}`} className="block group">
                  <Card variant="glow" className="flex flex-col lg:flex-row overflow-hidden group border-border/50 bg-surface/40 backdrop-blur-sm p-0">
                    <div className="relative w-full lg:w-[55%] h-72 lg:h-auto overflow-hidden min-h-[350px]">
                      {featuredPost.image ? (
                        <>
                          <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
                          <Image
                            src={featuredPost.image}
                            alt={featuredPost.title}
                            fill
                            className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                          />
                        </>
                      ) : (
                        <div className="absolute inset-0 bg-surface flex items-center justify-center group-hover:bg-surface2 transition-colors duration-500">
                          <div className="w-full h-full opacity-20 group-hover:opacity-30 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_70%)] blur-[40px]"></div>
                          <span className="absolute text-5xl font-bold text-transparent bg-clip-text gradient-text opacity-50 font-mono tracking-tighter">
                            {featuredPost.title.substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div className="absolute top-6 left-6 z-20">
                        <span className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider bg-black/60 text-white rounded-full backdrop-blur-md border border-white/10 shadow-xl">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="w-full lg:w-[45%] p-8 md:p-12 flex flex-col justify-center relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      
                      <div className="flex flex-wrap items-center gap-3 text-sm text-text2 mb-4 font-mono">
                        <span className="text-accent">{featuredPost.date}</span>
                        <span className="text-border">•</span>
                        <span>{featuredPost.readTime}</span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-text mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-accent2 transition-all duration-300 leading-tight">
                        {featuredPost.title}
                      </h2>
                      <p className="text-text2 text-lg line-clamp-3 mb-8 leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                      
                      <div className="mt-auto flex items-center text-text font-medium group-hover:text-accent transition-colors gap-2">
                        <span>Read article</span>
                        <ArrowRight className="w-4.5 h-4.5 transform group-hover:translate-x-1.5 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </Link>
              )}

              {/* Grid map for regular posts */}
              {regularPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularPosts.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="block group h-full">
                      <Card variant="glass" className="overflow-hidden h-full flex flex-col group cursor-pointer border-border/50 bg-surface/30 p-0 hover:bg-surface/60">
                        <div className="relative h-56 w-full overflow-hidden">
                          {post.image ? (
                            <>
                              <div className="absolute inset-0 bg-black/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
                              <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                              />
                            </>
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-surface group-hover:bg-surface2 transition-colors duration-500">
                               <div className="w-full h-full opacity-10 group-hover:opacity-20 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,var(--text2)_0%,transparent_60%)] blur-[30px]"></div>
                               <span className="absolute text-4xl font-bold text-text2 opacity-20 font-mono tracking-tighter">
                                {post.title.substring(0, 2).toUpperCase()}
                               </span>
                            </div>
                          )}
                        </div>
                        <div className="p-6 flex flex-col flex-grow relative">
                          <div className="flex items-center gap-3 text-xs text-text2 mb-3 font-mono">
                            <span className="text-text/70">{post.date}</span>
                            <span className="text-border">•</span>
                            <span className="text-text/70">{post.readTime}</span>
                          </div>
                          <h3 className="text-xl font-bold text-text mb-3 group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                            {post.title}
                          </h3>
                          <p className="text-text2 text-sm line-clamp-3 mb-6 leading-relaxed flex-grow">
                            {post.excerpt}
                          </p>
                          <div className="mt-auto flex items-center text-sm font-medium text-text group-hover:text-accent transition-colors gap-1.5">
                            Read more
                            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-24 glass rounded-3xl border border-border/50 backdrop-blur-sm shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-surface/80 rounded-full flex items-center justify-center mx-auto mb-6 border border-border/50 shadow-[0_0_40px_rgba(15,176,215,0.15)]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-text2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/></svg>
                </div>
                <p className="text-2xl text-text font-bold mb-3">No articles yet</p>
                <p className="text-text2 max-w-md mx-auto text-lg leading-relaxed">I'm currently writing some new content. Check back soon for insights on AI automation and building effective systems.</p>
              </div>
            </div>
          )}
        </Container>
      </Section>

      <CTABanner />
    </>
  );
}