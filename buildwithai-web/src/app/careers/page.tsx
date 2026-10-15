/* Careers page - honest founding team status */
export default function Careers() {
  return (
    <main className="min-h-screen bg-slate-950 py-12 md:py-16 lg:py-20 xl:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="px-4 py-12">
          <h1 className="font-orbitron text-4xl font-bold text-slate-100 mb-6">
            Careers
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Small founding team. No open roles currently. Spontaneous applications welcome.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-teal-500/30 hover:bg-slate-900/80">
              <h3 className="font-orbitron text-sm font-semibold text-teal-400 mb-2 uppercase tracking-wider">Team</h3>
              <ul className="text-slate-300 text-sm leading-relaxed">
                <li>Ajaya Sidal — Founder & Architect (remote, Fiji time)</li>
                <li>Contractors invited for specific expertise windows</li>
                <li>No full-time roles posted at this time</li>
              </ul>
            </div>
            <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-teal-500/30 hover:bg-slate-900/80">
              <h3 className="font-orbitron text-sm font-semibold text-teal-400 mb-2 uppercase tracking-wider">How to Apply</h3>
              <ul className="text-slate-300 text-sm leading-relaxed">
                <li>Email your expertise statement and CV to: hello@buildwithai.digital</li>
                <li>Subject: "Spontaneous Application — [Expertise Area]"</li>
                <li>We review all applications; responses within 24 hours</li>
              </ul>
            </div>
            <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-teal-500/30 hover:bg-slate-900/80">
              <h3 className="font-orbitron text-sm font-semibold text-teal-400 mb-2 uppercase tracking-wider">Values</h3>
              <ul className="text-slate-300 text-sm leading-relaxed">
                <li>Community — we value shared success and open-source foundations</li>
                <li>Sovereignty — we value infrastructure you control</li>
                <li>Intergenerational thinking — we value long-term over short-term</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}