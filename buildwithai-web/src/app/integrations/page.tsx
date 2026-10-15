/* Integrations page - real integrations only */
export default function Integrations() {
  return (
    <main className="min-h-screen bg-slate-950 py-12 md:py-16 lg:py-20 xl:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="px-4 py-12">
          <h1 className="font-orbitron text-4xl font-bold text-slate-100 mb-6">
            Integrations
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Platforms and tools that integrate with Build With AI infrastructure — real
            integrations only, no virtual partnerships.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-teal-500/30 hover:bg-slate-900/80">
              <h3 className="font-orbitron text-sm font-semibold text-teal-400 mb-2 uppercase tracking-wider">Core Framework</h3>
              <ul className="text-slate-300 text-sm leading-relaxed">
                <li>Next.js 16 — App Router, server components, middleware</li>
              </ul>
            </div>
            <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-teal-500/30 hover:bg-slate-900/80">
              <h3 className="font-orbitron text-sm font-semibold text-teal-400 mb-2 uppercase tracking-wider">CMS</h3>
              <ul className="text-slate-300 text-sm leading-relaxed">
                <li>Payload CMS v3 — headless content management, collection modeling, admin UI</li>
              </ul>
            </div>
            <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-teal-500/30 hover:bg-slate-900/80">
              <h3 className="font-orbitron text-sm font-semibold text-teal-400 mb-2 uppercase tracking-wider">Database</h3>
              <ul className="text-slate-300 text-sm leading-relaxed">
                <li>PostgreSQL — relational database, owned infrastructure</li>
              </ul>
            </div>
            <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-teal-500/30 hover:bg-slate-900/80">
              <h3 className="font-orbitron text-sm font-semibold text-teal-400 mb-2 uppercase tracking-wider">Container & Orchestration</h3>
              <ul className="text-slate-300 text-sm leading-relaxed">
                <li>Docker — containerization and lifecycle management</li>
                <li>Docker Compose — local development and deployment orchestration</li>
              </ul>
            </div>
            <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-teal-500/30 hover:bg-slate-900/80">
              <h3 className="font-orbitron text-sm font-semibold text-teal-400 mb-2 uppercase tracking-wider">Animation & UI</h3>
              <ul className="text-slate-300 text-sm leading-relaxed">
                <li>Framer Motion — animation variants, gesture responses</li>
              </ul>
            </div>
            <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-teal-500/30 hover:bg-slate-900/80">
              <h3 className="font-orbitron text-sm font-semibold text-teal-400 mb-2 uppercase tracking-wider">Iconography</h3>
              <ul className="text-slate-300 text-sm leading-relaxed">
                <li>Lucide React — SVG icon set, accessible markup</li>
              </ul>
            </div>
            <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-teal-500/30 hover:bg-slate-900/80">
              <h3 className="font-orbitron text-sm font-semibold text-teal-400 mb-2 uppercase tracking-wider">LLM Integration</h3>
              <ul className="text-slate-300 text-sm leading-relaxed">
                <li>Ollama — local LLM deployment via OLLAMA_BASE_URL + OLLAMA_MODEL env vars</li>
                <li>Labelled "ready, not bundled" — widget gated by env flag</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}