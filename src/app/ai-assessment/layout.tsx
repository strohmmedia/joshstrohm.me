import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Efficiency Assessment | Strohm Media",
  description: "Evaluate your current capabilities and discover opportunities for AI-driven improvements in your workflows.",
};

export default function AIAssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
