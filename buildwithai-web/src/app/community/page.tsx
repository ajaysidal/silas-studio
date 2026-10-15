/* Community page - GitHub link and contact */
export default function Community() {
  return (
    <main className="min-h-screen bg-slate-950 py-12 md:py-16 lg:py-20 xl:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="px-4 py-12">
          <h1 className="font-orbitron text-4xl font-bold text-slate-100 mb-6">
            Community
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Join the Build With AI community. Open-source foundation, shared success.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-teal-500/30 hover:bg-slate-900/80">
              <h3 className="font-orbitron text-sm font-semibold text-teal-400 mb-2 uppercase tracking-wider">Get Involved</h3>
              <ul className="text-slate-300 text-sm leading-relaxed">
                <li>Star the repository and join the discussion</li>
                <li>Fork templates and adaptyour infrastructure</li>
                <li>Submit feature requests via the /changelog page</li>
              </ul>
            </div>
            <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-teal-500/30 hover:bg-slate-900/80">
              <h3 className="font-orbitron text-sm font-semibold text-teal-400 mb-2 uppercase tracking-wider">Contact</h3>
              <ul className="text-slate-300 text-sm leading-relaxed">
                <li>Email: hello@buildwithai.digital</li>
                <li>GitHub: https://github.com/buildwithai</li>
                <li>Sporadic forum: #buildwithai on libera.chat (topic-driven, no persistent channel)</li>
              </ul>
            </div>
            <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-teal-500/30 hover:bg-slate-900/80">
              <h3 className="font-orbitron text-sm font-semibold text-teal-400 mb-2 uppercase tracking-wider">Roadmap</h3>
              <ul className="text-slate-300 text-sm leading-relaxed">
                <li>Q4 2026: Automated status monitoring</li>
                <li>Q1 2027: SOC 2 Type II alignment (documented, not claimed)</li>
                <li>Ongoing: Community-voted feature priorities</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}