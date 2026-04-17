import { getAllPosts } from "@/lib/blog";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Link from "next/link";
import CTABanner from "@/components/CTABanner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Josh Strohm - AI Automation Insights",
  description: "Practical thoughts on AI automation, building systems, and what actually works.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const featuredPost = posts.find((p) => p.featured);
  const otherPosts = posts.filter((p) => !p.featured);

  return (
    <>
      <Section className="pt-32 pb-16">
        <Container>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Insights
          </h1>
          <p className="text-xl text-text2 max-w-2xl">
            Practical thoughts on AI automation, building systems, and what actually works.
          </p>
        </Container>
      </Section>

      {featuredPost && (
        <Section className="pb-8">
          <Container>
            <Link href={`/blog/${featuredPost.slug}`}>
              <Card variant="glow" className="p-8 md:p-12 group cursor-pointer">
                <Badge className="mb-4">Featured</Badge>
                <h2 className="text-2xl md:text-3xl font-bold text-text mb-4 group-hover:text-[#2dd4bf] transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-text2 text-lg mb-4">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted">
                  <span>{featuredPost.date}</span>
                  <span>-</span>
                  <span>{featuredPost.readTime}</span>
                </div>
              </Card>
            </Link>
          </Container>
        </Section>
      )}

      <Section>
        <Container>
          <h2 className="text-2xl font-bold mb-8">More posts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card variant="default" className="p-6 group cursor-pointer">
                  <h3 className="text-xl font-semibold text-text mb-3 group-hover:text-[#2dd4bf] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-text2 text-sm mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-muted">
                    <span>{post.date}</span>
                    <span>-</span>
                    <span>{post.readTime}</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="mt-12 p-6 border border-dashed border-border rounded-xl text-center">
              <p className="text-text2">No posts yet. Check back soon!</p>
            </div>
          )}
        </Container>
      </Section>

      <CTABanner />
    </>
  );
}