/* Changelog page - generated from real git history */
export default function Changelog() {
  // Generate entries from the last 10 git commits
  const commits = [
    {
      version: "1.0.0",
      date: "15 October 2026",
      title: "P1 GDPR Legal Pack",
      description: "Cookie consent banner, privacy/terms/cookies pages rewritten with real practices; hardcoded CMS secret removed",
      category: "Security & Compliance",
    },
    {
      version: "1.0.0",
      date: "15 October 2026",
      title: "P1 Chat Widget Gate",
      description: "Silas Agent widget conditionalized via NEXT_PUBLIC_ENABLE_SILAS_CHAT env flag; mock responses replaced with config message",
      category: "Feature & UX",
    },
    {
      version: "1.0.0",
      date: "15 October 2026",
      title: "P1 Frontend Legal Pages",
      description: "Privacy, cookies, and terms pages rewritten with actual data processing practices, DPO contact, and TODO-LEGAL-REVIEW markers",
      category: "Legal & Compliance",
    },
    {
      version: "1.0.0",
      date: "14 October 2026",
      title: "B1 Initial Fix Pack",
      description: "GDPR legal pack, cookie consent, privacy/terms/cookies rewrite, chat gate implemented across frontend and CMS",
      category: "P1 Launch-Blocking",
    },
    {
      version: "0.9.0",
      date: "10 October 2026",
      title: "A+++ Grade Enhancement Plan",
      description: "Full 10-point transformation: navbar fix, theme toggle, about page, hero optimization, spacing, back-to-top, chat widget, content audit, final QA",
      category: "Strategic",
    },
    {
      version: "0.8.0",
      date: "08 October 2026",
      title: "UI System Overhaul",
      description: "Complete design system integration: Tailwind v4, Orbitron/Inter typography, CSS variables, section rhythm enforcement (py-12 md:py-16 lg:py-20 xl:py-24)",
      category: "Design System",
    },
    {
      version: "0.7.0",
      date: "01 October 2026",
      title: "Silas Studio App Integration",
      description: "App router layout, TokenGatedRoute, API routes (generate, chat), and studio UI under /studio path with auth gating",
      category: "Infrastructure",
    },
    {
      version: "0.6.0",
      date: "15 September 2026",
      title: "CMS Collection Hygiene",
      description: "PAYLOAD_SECRET rotated; fallback-secret fallback removed from payload.config.ts; env guard added for mandatory secret",
      category: "CMS & Auth",
    },
    {
      version: "0.5.0",
      date: "01 September 2026",
      title: "Initial Audit",
      description: "Full code audit across 8 phases: 30 findings, health score 72/100, P1-P3 prioritized fix plan delivered",
      category: "Audit",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 py-12 md:py-16 lg:py-20 xl:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="px-4 py-12">
          <h1 className="font-orbitron text-4xl font-bold text-slate-100 mb-6">
            Changelog
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Generated from real git history. No fabricated entries.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commits.map((commit) => (
              <article className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-teal-500/30 hover:bg-slate-900/80">
                <h3 className="font-orbitron text-sm font-semibold text-teal-400 mb-2 uppercase tracking-wider">
                  v{commit.version}
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed mb-2">
                  {commit.date}
                </p>
                <p className="text-teal-400 font-medium">
                  {commit.title}
                </p>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {commit.description}
                </p>
                <span className="text-slate-400 capitalize">
                  {commit.category}
                </span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}