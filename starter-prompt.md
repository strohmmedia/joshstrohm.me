You are an elite front-end engineer + product designer. Build a complete, production-ready MULTI-PAGE marketing website for a premium AI Automation Consultancy. It must feel like a top-tier SaaS launch: meticulous typography, deep motion design, tasteful 3D/Canvas accents, perfect responsiveness, and zero “template” vibes.

Hard rules:
- No cringe AI tropes. No random neon. No stock photos.
- Build a coherent design system and apply it consistently.
- Performance matters. 60fps. No jank. Reduced-motion support.
- Accessibility matters. Keyboard nav, contrast, focus states.

================================================================
BRAND
================================================================
- Name: Josh Strohm
- Title: AI Automation Consultant
- Tagline: “Engineered Intelligence. Automated Execution.”
- Voice: direct, precise, confident. No fluff.
- Audience: founders + ops leaders at $1M–$50M businesses.

================================================================
SITE MAP (ROUTES)
================================================================
- / (Home)
- /services
- /case-studies
- /about
- /blog (listing)
- /blog/[slug] (post template)
- /contact (intake form)

================================================================
TECH STACK (CHOOSE ONE AND IMPLEMENT CLEANLY)
================================================================
Preferred: Next.js (App Router) + TypeScript + Tailwind + shadcn/ui (or custom components).
Alternative: Astro + Tailwind + minimal JS.

Include:
- SEO (metadata, OpenGraph, sitemap, robots)
- Analytics hook placeholder
- Form submission endpoint placeholder

================================================================
DESIGN SYSTEM (APPLY EVERYWHERE)
================================================================
Color:
- bg: #050505
- surface: #0B0B0F
- surface2: #11111A
- border: rgba(255,255,255,0.08)
- text: #F5F5F5
- text2: #A1A1AA
- muted: #71717A
- accent: #6366F1 (indigo)
- accent2: #22D3EE (cyan)
- accent3: #A855F7 (purple)
- gradient: linear-gradient(135deg,#6366F1,#A855F7,#22D3EE)

Type:
- Font: General Sans (fallback Inter)
- Mono: JetBrains Mono
- H1 hero: 72/80, -0.03em, 700
- H1 page: 56/64, 700
- H2: 40/48, 600
- Body: 16/26
- Label: 12/16 uppercase, 0.12em

Layout:
- max width: 1200px
- section padding: 112px desktop / 72px tablet / 56px mobile
- card radius: 16px
- button radius: 12px

Motion:
- Reveal on scroll via IntersectionObserver (staggered)
- Card hover: translateY(-4px), border glow, shadow expand
- Buttons: subtle scale + glow
- Page transitions: crossfade (optional)
- Respect prefers-reduced-motion

Signature Visual System (must be tasteful):
- Background “aurora” gradient orbs at 6–10% opacity, slow drift.
- One hero-only interactive element (pick ONE):
  A) Canvas particle network with gentle cursor interaction
  B) Morphing mesh gradient
  C) Perspective dot-grid parallax
- Must degrade to static gradient on reduced motion.

Global components:
- Sticky nav with blur on scroll (transparent on top of Home hero)
- Footer with 4-column layout
- Reusable CTA banner above footer on all pages

================================================================
COPY — POSITIONING (USE THIS)
================================================================
Core promise:
“I build custom AI automations and agents that remove manual work, speed up revenue workflows, and make operations scalable.”

Primary CTA:
“Get Your Free Automation Audit” (no call required)

Secondary CTA:
“See What I Build”

================================================================
PAGE SPECS
================================================================

--------------------------------
HOME (/)
--------------------------------
Hero (100vh):
- Eyebrow label: “AI AUTOMATION CONSULTANT”
- H1: “I build the AI systems that run your business.”
  - Render “AI systems” with gradient text
- Subhead:
  “Custom workflows, intelligent agents, and automations engineered for how your company actually operates.”
- CTAs:
  Primary: Get Your Free Audit → (/contact)
  Secondary: See What I Build (scroll to services overview)
- Trust strip: subtle monochrome tool marks (Notion, Slack, HubSpot, Google Workspace, Salesforce, Zapier/n8n)
- Background: the single interactive hero visual

Problem section:
- H2: “Your team is drowning in work that shouldn’t require a human.”
- 4 glass cards (icons + short copy):
  1) 40+ hours lost weekly
  2) leads go cold
  3) tool overload
  4) revenue left on the table

Services overview:
- H2: “Four services. One outcome: your business runs cleaner.”
- 4 premium cards linking to /services anchors:
  1) AI Workflow Automation
  2) Custom AI Agents
  3) AI Strategy & Roadmapping
  4) Ongoing Optimization

Process:
- 3-step timeline with mono step numbers (01/02/03)
  1) Audit
  2) Build
  3) Deploy + optimize

Results:
- Animated counters (placeholders, clearly labeled as placeholders in comments):
  - 40+ hours saved/week
  - 3x faster lead response
  - < 14 days to live
- Quote block:
  “If it doesn’t save real time or make real money, it doesn’t ship.” — Josh Strohm

Tech marquee:
- smooth infinite scroll list of tools (n8n, Make, Zapier, OpenAI, Anthropic, Notion, Slack, HubSpot, Salesforce, Airtable, Supabase, Postgres, Python, Node)

CTA banner (global).

--------------------------------
SERVICES (/services)
--------------------------------
Hero:
- H1: “Automation that actually works.”
- Subhead: “No generic bots. Custom systems built for your operations.”

For each service: alternating layout (text + SVG diagram):
- Service 01: AI Workflow Automation
  - Deliverables bullets: integrations, error handling, monitoring, docs, training
- Service 02: Custom AI Agents
  - Deliverables: agent design, tool access, guardrails, evaluation, monitoring
- Service 03: AI Strategy & Roadmapping
  - Deliverables: audit, ROI scoring, roadmap, tool choices
- Service 04: Ongoing Optimization
  - Deliverables: tuning, edge cases, expansion, reporting

Optional comparison table:
DIY tools vs hiring in-house vs working with Josh (highlight Josh column).

CTA banner.

--------------------------------
CASE STUDIES (/case-studies)
--------------------------------
Hero:
- H1: “Proof, not promises.”

Grid of case study cards (placeholders, clearly marked):
- E-commerce: order → fulfillment automation
- Professional services: AI lead qualification + routing
- SaaS: onboarding automation

Each card:
- Industry tag
- Summary
- Metrics row

Empty state note: “More coming soon” + CTA.
CTA banner.

--------------------------------
ABOUT (/about)
--------------------------------
Hero:
- H1: “The person behind the systems.”

Bio:
Write a confident, human narrative (no hype) about eliminating manual chaos and building production-grade automation.

Principles cards:
- Outcomes over hours
- No black boxes
- Start small, scale fast
- Honest over comfortable

CTA banner.

--------------------------------
BLOG (/blog) + POST TEMPLATE
--------------------------------
Blog listing:
- Featured post card + grid of posts
- Build the post template route with typographic excellence (max width 720px).

Create 2 placeholder posts (marked placeholder):
- “The 5 workflows every small business should automate first”
- “Agents vs chatbots: the difference that matters”

CTA banner.

--------------------------------
CONTACT (/contact)
--------------------------------
Two-column layout:
Left:
- H1: “Get your free automation audit.”
- Copy: “No calls required. I’ll respond within 24 hours.”
- Contact blocks: email, response time, remote

Right:
Premium glass form card.
Fields:
- Name
- Email
- Company
- Website (optional)
- Revenue range (select)
- What are you trying to automate? (textarea)
- What tools do you use today? (multi-select chips)

Submit:
- Button: “Get My Free Audit →”
- Confirmation state: success animation + next steps message

================================================================
IMPLEMENTATION REQUIREMENTS
================================================================
- Build reusable components: Button, Card, Section, Container, Badge, Input, Textarea, Select, CTA banner.
- Make the UI feel “expensive”: great spacing, subtle borders, high-quality hover states.
- Add a “Command palette” style micro-feature (optional but impressive): press ⌘K to open a palette with quick links (Home, Services, Contact). Keep it lightweight.
- Ensure images (if any) are SVG/CSS generated. No stock photos.
- Provide clear placeholders for:
  - Contact form action URL
  - Social links
  - Analytics ID

Deliver output as a complete project with all pages implemented, not just mockups.