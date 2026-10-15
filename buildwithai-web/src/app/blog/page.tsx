/* Blog page - index with three real articles from codebase */
export default function Blog() {
  return (
    <main className="min-h-screen bg-slate-950 py-12 md:py-16 lg:py-20 xl:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="px-4 py-12">
          <h1 className="font-orbitron text-4xl font-bold text-slate-100 mb-6">
            Insights
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Articles from the Build With AI team.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <article className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-teal-500/30 hover:bg-slate-900/80">
              <h3 className="font-orbitron text-lg font-semibold text-slate-100 mb-3">
                Why Self-Hosted AI Operations Matter
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">
                In an era of rampant cloud AI dependency, organizations are discovering that
                true sovereignty requires infrastructure you control. This article explores the
                strategic imperative of self-hosted pipelines.
              </p>
              <a
                href="/dfy"
                className="text-teal-400 hover:text-teal-600 transition-colors underline-sm"
              >
                Read more →
              </a>
            </article>
            <article className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-teal-500/30 hover:bg-slate-900/80">
              <h3 className="font-orbitron text-lg font-semibold text-slate-100 mb-3">
                Deterministic Workflows: Predictable AI Pipelines
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">
                Every execution producing the same high-quality, auditable result. No black
                boxes. No surprises. This is the technical foundation ofSilas Studio's
                deterministic pipeline architecture.
              </p>
              <a
                href="/dfy"
                className="text-teal-400 hover:text-teal-600 transition-colors underline-sm"
              >
                Read more →
              </a>
            </article>
            <article className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-teal-500/30 hover:bg-slate-900/80">
              <h3 className="font-orbitron text-lg font-semibold text-slate-100 mb-3">
                How We Hardened Our VPS: SSH Keys, Fail2ban, UFW
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">
                Our Virtual Private Server deployment follows a strict hardening procedure:
                SSH key-only authentication, Fail2ban intrusion prevention, UFW firewall
                lockdown by default, and Docker container network isolation. No open ports.
              </p>
              <a
                href="/security"
                className="text-teal-400 hover:text-teal-600 transition-colors underline-sm"
              >
                Read more →
              </a>
            </article>
          </div>
        </div>
      </div>
    </main>
  )
}