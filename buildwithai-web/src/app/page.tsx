import Header from '@/components/Header'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="min-h-screen flex items-center justify-center px-4 pb-12 bg-gradient-to-b from-teal-400 to-cyan-600">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="font-orbitron text-5xl md:text-6xl text-slate-100 mb-4">
            BUILD THE FUTURE WITH SOVEREIGN AI.
          </h1>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            Enterprise-grade, self-hosted AI operations and headless infrastructure.
            No vendor lock-in. No data leakage. Total operational leverage, built on open-source foundations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-slate-900 text-slate-100 rounded-lg hover:bg-slate-800 transition font-medium">
              Launch Silas Studio
            </button>
            <button className="px-6 py-3 bg-slate-900/50 text-slate-100 rounded-lg border border-slate-700 hover:bg-slate-800 transition font-medium">
              Explore DFY Solutions
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
