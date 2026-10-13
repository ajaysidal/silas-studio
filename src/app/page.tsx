export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-950 text-white">
      <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
        Silas Studio
      </h1>
      <p className="text-xl text-slate-400 mb-8 text-center max-w-2xl">
        Autonomous AI operations. Self-hosted, secure, and open-source. 
        Build your legacy with deterministic workflows.
      </p>
      <a href="/studio" className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-all">
        Launch App
      </a>
    </main>
  )
}
