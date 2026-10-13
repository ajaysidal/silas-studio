'use client'

import { Home, Settings, Layout, Mail, LogIn } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
      <div className="max-w-7xl mx-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-100">Build With AI</h1>
        <nav className="hidden md:flex items-center gap-8">
          <a href="/" className="text-slate-400 hover:text-teal-400 transition">Home</a>
          <a href="/pricing" className="text-slate-400 hover:text-teal-400 transition">Pricing</a>
          <a href="/dfy" className="text-slate-400 hover:text-teal-400 transition">DFY</a>
          <a href="/contact" className="text-slate-400 hover:text-teal-400 transition">Contact</a>
          <a href="/login" className="text-slate-400 hover:text-teal-400 transition">Login</a>
        </nav>
        <div className="flex items-center gap-2">
          <LogIn className="h-5 w-5 text-slate-400" />
        </div>
      </div>
    </header>
  )
}
