import { getAllPosts } from "@/lib/blog";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
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
            <Link href={`/blog/${featuredPost.slug}`} className="block group">
              <Card variant="glow" className="overflow-hidden group cursor-pointer">
                <div className="relative h-64 md:h-80">
                  {featuredPost.image ? (
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0fb0d7] to-[#2dd4bf]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <Badge className="mb-4">Featured</Badge>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-[#2dd4bf] transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-white/80 text-lg mb-4">{featuredPost.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-white/60">
                      <span>{featuredPost.date}</span>
                      <span>-</span>
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </Container>
        </Section>
      )}

      <Section>
        <Container>
          <h2 className="text-2xl font-bold mb-8">More posts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                <Card variant="default" className="overflow-hidden h-full group cursor-pointer">
                  <div className="relative h-48">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0fb0d7] to-[#2dd4bf]" />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-text mb-3 group-hover:text-[#2dd4bf] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-text2 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-muted">
                      <span>{post.date}</span>
                      <span>-</span>
                      <span>{post.readTime}</span>
                    </div>
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