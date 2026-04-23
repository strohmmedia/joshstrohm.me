"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function AIAssessmentPage() {
  useEffect(() => {
    // Load Tally embed widget script
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-black">
      <div className="flex h-16 items-center bg-bg/80 backdrop-blur-xl border-b border-border px-6">
        <Link
          href="/"
          className="text-sm font-medium text-text2 hover:text-[#2dd4bf] transition-colors"
        >
          ← Back
        </Link>
      </div>
      <div className="relative overflow-hidden bg-black" style={{ height: "calc(100% - 4rem)" }}>
        <iframe
          data-tally-src="https://tally.so/r/Med68Y?transparentBackground=1"
          width="100%"
          height="100%"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          title="AI Efficiency Assessment"
          className="absolute inset-0 border-0"
        />
      </div>
    </div>
  );
}
