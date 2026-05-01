import { getPostBySlug, getAllPosts } from "@/lib/blog";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <Section className="pt-32">
        <Container>
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Post not found</h1>
            <Link href="/blog">
              <Button>Back to Blog</Button>
            </Link>
          </div>
        </Container>
      </Section>
    );
  }

  const processedContent = await remark().use(html).process(post.content);
  const contentHtml = processedContent.toString();

  const contentParts = post.content.split("\n").filter(Boolean);

  return (
    <>
      <Section className="pt-32 pb-16">
        <Container>
          <Link href="/blog" className="text-text2 hover:text-[#2dd4bf] text-sm mb-8 inline-block">
            Back to Blog
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-text2 mb-8">
            <span>{post.date}</span>
            <span className="text-border">•</span>
            <span>{post.readTime}</span>
          </div>
          
          {post.image && (
            <div className="relative w-full h-[300px] md:h-[450px] lg:h-[600px] rounded-2xl overflow-hidden mb-12 border border-border/50">
              <Image 
                src={post.image} 
                alt={post.title} 
                fill 
                priority
                className="object-cover"
              />
            </div>
          )}
        </Container>
      </Section>

      <Section className="py-8">
        <Container>
          <article 
            className="prose prose-invert prose-lg max-w-[720px]"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </Container>
      </Section>

      <Section className="py-8 bg-surface">
        <Container>
          <div className="text-center">
            <p className="text-lg text-text2 mb-4">Want to automate your workflows?</p>
            <Link href="https://www.joshstrohm.me/ai-assessment" target="_blank" rel="noopener noreferrer" className="inline-block">
              <span className="inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2dd4bf] focus:ring-offset-2 focus:ring-offset-bg disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-[#0fb0d7] to-[#2dd4bf] text-white border border-transparent hover:border-[#050505] hover:opacity-90 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#2dd4bf]/25 active:scale-[0.98] px-6 py-3 text-base">
                Get Your AI Assessment
              </span>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}