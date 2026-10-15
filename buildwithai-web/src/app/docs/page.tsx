/* Docs page - getting-started guide reflecting real stack */
export default function Docs() {
  return (
    <main className="min-h-screen bg-slate-950 py-12 md:py-16 lg:py-20 xl:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="px-4 py-12">
          <h1 className="font-orbitron text-4xl font-bold text-slate-100 mb-6">
            Getting Started
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Real configuration guide for Build With AI infrastructure.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-teal-500/30 hover:bg-slate-900/80">
              <h3 className="font-orbitron text-sm font-semibold text-teal-400 mb-2 uppercase tracking-wider">Stack</h3>
              <ul className="text-slate-300 text-sm leading-relaxed">
                <li>Next.js 16 App Router (framework)</li>
                <li>Payload CMS v3 (headless CMS)</li>
                <li>PostgreSQL (database)</li>
                <li>Docker Compose (local/deployment)</li>
                <li>Tailwind CSS v4 (styling)</li>
                <li>Framer Motion (animations)</li>
                <li>Lucide icons (iconography)</li>
                <li>Ollama-ready (LLM integration)</li>
                <li>Self-hosted by design (core principle)</li>
              </ul>
            </div>
            <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-teal-500/30 hover:bg-slate-900/80">
              <h3 className="font-orbitron text-sm font-semibold text-teal-400 mb-2 uppercase tracking-wider">Local Deployment</h3>
              <ol className="text-slate-300 text-sm leading-relaxed">
                <li>Clone the repository</li>
                <li>Run `docker compose up -d` in /opt/silas-studio</li>
                <li>Visit https://buildwithai.digital:3000 for the marketing site</li>
                <li>Visit https://cms.buildwithai.digital:3003 for the CMS admin</li>
              </ol>
            </div>
            <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-teal-500/30 hover:bg-slate-900/80">
              <h3 className="font-orbitron text-sm font-semibold text-teal-400 mb-2 uppercase tracking-wider">Production</h3>
              <ol className="text-slate-300 text-sm leading-relaxed">
                <li>Deploy Docker containers to your infrastructure</li>
                <li>Configure POSTGRES_URL from environment</li>
                <li>Set PAYLOAD_SECRET for CMS admin access</li>
                <li>Configure NEXT_PUBLIC_ENABLE_SILAS_CHAT if desired</li>
                <li>Ensure SSH key-only auth and UFW firewall on your host</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}