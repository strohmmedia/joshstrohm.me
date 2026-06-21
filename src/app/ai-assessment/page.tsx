"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AIAssessmentPage() {
  const router = useRouter();

  useEffect(() => {
    window.location.href = "https://theurl.site/ai-assessment";
  }, []);

  return null;
}
