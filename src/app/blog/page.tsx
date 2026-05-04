import { getAllPosts } from "@/lib/blog";
import BlogPageClient from "./BlogClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Josh Strohm - AI Automation Insights",
  description: "Practical thoughts on AI automation, building systems, and what actually works.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return <BlogPageClient posts={posts} />;
}