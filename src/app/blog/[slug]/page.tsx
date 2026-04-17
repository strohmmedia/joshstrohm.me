import { getPostBySlug, getAllPosts } from "@/lib/blog";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { Metadata } from "next";
import { remark } from "remark";
import html from "remark-html";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Josh Strohm Blog`,
    description: post.excerpt,
  };
}

// Simple Arrow SVG components
const ArrowLeft = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 19-7-7 7-7"/>
    <path d="M19 12H5"/>
  </svg>
);

const ArrowRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14"></path>
    <path d="m12 5 7 7-7 7"></path>
  </svg>
);

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <Section className="pt-40 pb-24 min-h-screen">
        <Container>
          <div className="text-center max-w-lg mx-auto glass p-12 rounded-3xl border border-border/50">
            <h1 className="text-4xl font-bold mb-4 gradient-text">Post not found</h1>
            <p className="text-text2 mb-8">The article you're looking for doesn't exist or has been moved.</p>
            <Link href="/blog">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2 inline" />
                Back to Journal
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    );
  }

  const processedContent = await remark().use(html).process(post.content);
  const contentHtml = processedContent.toString();

  return (
    <>
      <Section className="relative pt-40 pb-16 overflow-hidden border-b border-border/30 bg-surface/30">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] -z-10" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-accent3/5 rounded-full blur-[100px] -z-10" />

        <Container className="max-w-[800px] relative z-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-text2 hover:text-accent text-sm font-medium mb-10 transition-colors group">
            <div className="p-1.5 rounded-full bg-surface2 border border-border group-hover:border-accent/30 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-0.5 transition-transform" />
            </div>
            Back to Journal
          </Link>
          
          <div className="flex flex-wrap items-center gap-4 text-sm font-mono mb-6">
            <div className="px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
              {post.date}
            </div>
            <span className="text-border">•</span>
            <span className="text-text2 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {post.readTime}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-[1.1] tracking-tight text-text">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 pt-8 border-t border-border/50 mt-8">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-surface flex items-center justify-center border border-border shadow-inner">
              <span className="text-xl font-bold text-transparent bg-clip-text gradient-text">JS</span>
            </div>
            <div>
              <p className="font-semibold text-text">Josh Strohm</p>
              <p className="text-sm text-text2">AI Automation Specialist</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-24 relative">
        <Container className="max-w-[800px]">
          <article 
            className="prose prose-invert prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-accent hover:prose-a:text-accent2 prose-a:transition-colors prose-img:rounded-2xl prose-img:border prose-img:border-border/50 prose-hr:border-border/50"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </Container>
      </Section>

      <Section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-surface2/50 backdrop-blur-3xl -z-10" />
        <Container>
          <div className="max-w-2xl mx-auto text-center glass p-8 md:p-12 rounded-3xl border border-accent/20 shadow-[0_0_50px_rgba(15,176,215,0.05)]">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-accent to-accent2 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-accent/20 transform rotate-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white -rotate-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            <h3 className="text-3xl font-bold mb-4">Want to automate your workflows?</h3>
            <p className="text-lg text-text2 mb-8">Stop doing repetitive tasks manually. Let's build a system that works for you 24/7.</p>
            <Link href="/contact">
              <Button className="px-8 shadow-lg shadow-accent/20">
                Get Your Free Audit
                <ArrowRight className="w-4 h-4 ml-2 inline" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}