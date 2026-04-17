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

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Section className="pt-32 pb-16">
        <Container>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Blog
          </h1>
          <p className="text-xl text-text2 max-w-2xl">
            Practical thoughts on AI automation, building systems, and what actually works.
          </p>
        </Container>
      </Section>

      <Section className="pb-16">
        <Container>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                  <Card variant="default" className="overflow-hidden h-full group cursor-pointer">
                    <div className="relative h-56 w-full overflow-hidden">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0fb0d7] to-[#2dd4bf] flex items-center justify-center">
                          <span className="text-white/30 text-6xl font-bold">{post.title.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-muted mb-3">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h2 className="text-xl font-bold text-text mb-3 group-hover:text-[#2dd4bf] transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-text2 text-sm line-clamp-3">{post.excerpt}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-text2 mb-4">No posts yet.</p>
              <p className="text-muted">Check back soon for insights on AI automation.</p>
            </div>
          )}
        </Container>
      </Section>

      <CTABanner />
    </>
  );
}