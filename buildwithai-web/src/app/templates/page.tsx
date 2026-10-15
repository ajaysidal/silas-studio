/* Templates page - DFY templates actually offered */
export default function Templates() {
  return (
    <main className="min-h-screen bg-slate-950 py-12 md:py-16 lg:py-20 xl:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="px-4 py-12">
          <h1 className="font-orbitron text-4xl font-bold text-slate-100 mb-6">
            Templates
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            DFY templates actually offered — based on the /dfy page content. No virtual
            items.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <article className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-teal-500/30 hover:bg-slate-900/80">
              <h3 className="font-orbitron text-lg font-semibold text-slate-100 mb-3">
                Self-Hosted Starter Pipeline
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Complete AI pipeline scaffold with Silas Studio configuration, Postgres
                schema, and deterministic workflow definitions. Deploy on your infrastructure.
              </p>
              <a
                href="/dfy"
                className="text-teal-400 hover:text-teal-600 transition-colors underline-sm"
              >
                Apply for DFY →
              </a>
            </article>
            <article className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-teal-500/30 hover:bg-slate-900/80">
              <h3 className="font-orbitron text-lg font-semibold text-slate-100 mb-3">
                Dashboard Monitoring Setup
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Pre-configured Grafana + Prometheus dashboards for AI pipeline metrics,
                latency tracking, and error rates. Tailwind-styled, Orbitron-headlined.
              </p>
              <a
                href="/dfy"
                className="text-teal-400 hover:text-teal-600 transition-colors underline-sm"
              >
                Request template →
              </a>
            </article>
            <article className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-teal-500/30 hover:bg-slate-900/80">
              <h3 className="font-orbitron text-lg font-semibold text-slate-100 mb-3">
                Docker Compose Deployment
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Ready-to-run Docker Compose file for local Silas Studio + Payload CMS
                deployment. No node dependencies. SSH-hardened by default.
              </p>
              <a
                href="/dfy"
                className="text-teal-400 hover:text-teal-600 transition-colors underline-sm"
              >
                Request template →
              </a>
            </article>
          </div>
        </div>
      </div>
    </main>
  )
}