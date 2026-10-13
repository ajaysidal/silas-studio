'use client'
import { motion } from 'framer-motion'
import { Linkedin, Briefcase, Llaptop, Send } from 'lucide-react'

export default function Hero() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      {/* Aurora Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-cyan-500/10 to-teal-500/10 animate-gradient infinite"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto text-center px-4">
        {/* Staggered Entrance Animation */}
        <motion.div
          className="mb-12"
          initial="hidden"
          animate="visible"
          transition={
            {
              type: "tween",
              delayChildren: 0.2,
              staggerChildren: 0.3,
              ease: "easeOut"
            }
          }
        >
          <h1 className="font-orbitron text-5xl md:text-7xl text-slate-100 mb-4">
            BUILD THE FUTURE WITH SOVEREIGN AI.
          </h1>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            Enterprise-grade, self-hosted AI operations and headless infrastructure.
            No vendor lock-in. No data leakage. Total operational leverage, built on open-source foundations.
          </p>
        </motion.div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-slate-900 text-slate-100 rounded-xl font-medium text-lg hover:bg-slate-800 transition-all duration-300 shadow-lg shadow-slate-500/20"
          >
            Launch Silas Studio
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-slate-900/50 text-slate-100 rounded-xl border border-slate-700 font-medium text-lg hover:bg-slate-800 transition-all duration-300"
          >
            Explore DFY Solutions
          </motion.button>
        </div>
      </div>
    </section>
  )
}
