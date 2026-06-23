import { getAllPosts } from "@/lib/blog";
import BlogPageClient from "./BlogClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agent Application | Josh Strohm - Agentic AI Insights",
  description: "Practical thoughts on agentic AI, building autonomous systems, and what actually works in production.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return <BlogPageClient posts={posts} />;
}