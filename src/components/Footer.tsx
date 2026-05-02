import Link from "next/link";

const footerLinks = {
  services: [
    { href: "/services", label: "Services" },
    { href: "/services#workflows", label: "AI Workflow Automation" },
    { href: "/services#agents", label: "Custom AI Agents" },
    { href: "/services#strategy", label: "AI Strategy & Roadmapping" },
    { href: "/services#optimization", label: "Ongoing Optimization" },
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  resources: [
    { href: "/ai-assessment", label: "Free AI Assessment" },
    { href: "/blog", label: "Latest Posts" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link href="/" className="block">
              <img src="/JoshStrohm_Wordmark_nobg.png" alt="Josh Strohm" className="h-10 w-auto object-contain" />
            </Link>
            <p className="text-text2 text-sm leading-relaxed">
              I build custom AI tools and agents that stop manual work and help
              you grow.
            </p>
            <Link href="/" className="block mt-2">
              <img src="/JoshStrohm_Wordmark_nobg.png" alt="Josh Strohm" className="h-10 w-auto object-contain" />
            </Link>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text2 hover:text-[#2dd4bf] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text2 hover:text-[#2dd4bf] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text2 hover:text-[#2dd4bf] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Josh Strohm. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="mailto:hi@joshstrohm.me"
              className="text-sm text-text2 hover:text-[#2dd4bf] transition-colors"
            >
              hi@joshstrohm.me
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}