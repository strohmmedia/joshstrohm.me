import Link from "next/link";
import Button from "@/components/ui/Button";

export default function CTABanner() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-surface to-accent/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(15,176,215,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(15,176,215,0.05),transparent_40%)]" />
      
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-6">
            Ready to automate what slows you down?
          </h2>
          <p className="text-lg text-text2 mb-8">
            Get your free automation audit. No calls required-I&apos;ll respond within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg">Get Your Free Audit</Button>
            </Link>
            <Link href="/services">
              <Button variant="secondary" size="lg">See What I Build</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}