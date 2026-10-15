/* Status page - honest system status */
export default function Status() {
  return (
    <main className="min-h-screen bg-slate-950 py-12 md:py-16 lg:py-20 xl:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="px-4 py-12">
          <h1 className="font-orbitron text-4xl font-bold text-slate-100 mb-6">
            System Status
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Current operational state. All systems self-hosted.
          </p>
          <div className="mt-8 p-6 rounded-2xl bg-slate-800 border border-slate-700">
            <h2 className="font-orbitron text-2xl font-semibold text-teal-400 mb-4">
              Services
            </h2>
            <ul className="text-slate-300 text-sm leading-relaxed">
              <li>Marketing Site (Next.js App Router)</li>
              <li>Silas Studio (Docker + Node.js)</li>
              <li>Payload CMS (Postgres + Next.js)</li>
              <li>PostgreSQL Database</li>
            </ul>
          </div>
          <div className="mt-8 p-6 rounded-2xl bg-slate-800 border border-slate-700">
            <h2 className="font-orbitron text-2xl font-semibold text-teal-400 mb-4">
              Last Verified
            </h2>
            <p className="text-slate-300 text-sm">
              15 October 2026
            </p>
          </div>
          <div className="mt-8 p-6 rounded-2xl bg-slate-800 border border-slate-700">
            <h2 className="font-orbitron text-2xl font-semibold text-teal-400 mb-4">
              Roadmap
            </h2>
            <p className="text-slate-300 text-sm">
              Automated status monitoring in Q4 2026. Full integration with uptime endpoints deferred until infrastructure is air-gapped certified.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}