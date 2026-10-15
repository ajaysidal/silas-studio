/* Press page - factual company facts */
export default function Press() {
  return (
    <main className="min-h-screen bg-slate-950 py-12 md:py-16 lg:py-20 xl:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="px-4 py-12">
          <h1 className="font-orbitron text-4xl font-bold text-slate-100 mb-6">
            Press
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Factual company facts for media professionals.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-teal-500/30 hover:bg-slate-900/80">
              <h3 className="font-orbitron text-sm font-semibold text-teal-400 mb-2 uppercase tracking-wider">Company</h3>
              <ul className="text-slate-300 text-sm leading-relaxed">
                <li>Founded: 2026</li>
                <li>Mission: Sovereign AI infrastructure for the enterprise</li>
                <li>Core belief: Organizations must own their intelligence layer completely</li>
              </ul>
            </div>
            <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-teal-500/30 hover:bg-slate-900/80">
              <h3 className="font-orbitron text-sm font-semibold text-teal-400 mb-2 uppercase tracking-wider">Founder</h3>
              <ul className="text-slate-300 text-sm leading-relaxed">
                <li>Ajaya Sidal — formerly platform engineering at global firms, witnessed firsthand the perils of vendor lock-in and data sovereignty violations</li>
                <li>Based in Fiji — values of community, stewardship, and intergenerational thinking</li>
              </ul>
            </div>
            <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-teal-500/30 hover:bg-slate-900/80">
              <h3 className="font-orbitron text-sm font-semibold text-teal-400 mb-2 uppercase tracking-wider">Media Contact</h3>
              <ul className="text-slate-300 text-sm leading-relaxed">
                <li>Email: hello@buildwithai.digital</li>
                <li>No invented awards or "trusted by" logo walls</li>
                <li>All claims verifiable against the codebase and infrastructure</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}