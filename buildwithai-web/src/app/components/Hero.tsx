"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Aurora Background */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={
          {
            "--aurora":
              "repeating-linear-gradient(100deg,#14b8a6_10%,#06b6d4_15%,#0d9488_20%,#0891b2_25%,#14b8a6_30%)",
            "--dark-gradient":
              "repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)",
            "--white-gradient":
              "repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)",
            "--teal-400": "#14b8a6",
            "--cyan-400": "#06b6d4",
            "--teal-600": "#0d9488",
            "--cyan-600": "#0891b2",
            "--black": "#000",
            "--white": "#fff",
            "--transparent": "transparent",
          } as React.CSSProperties
        }
      >
        <div
          className="after:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--white-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] opacity-50 blur-[10px] invert filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--teal-600)_10%,var(--cyan-400)_15%,var(--teal-400)_20%,var(--cyan-600)_25%,var(--teal-600)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[''] dark:[background-image:var(--dark-gradient),var(--aurora)] dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora)] [mask-image:radial-gradient(ellipse_at_50%_0%,black_20%,var(--transparent)_80%)]"
        ></div>
      </div>

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950" />

      <div className="relative z-10 max-w-7xl mx-auto text-center px-4 py-16 md:py-20">
        {/* Staggered Entrance Animation */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                type: "tween",
                delayChildren: 0.2,
                staggerChildren: 0.15,
                ease: "easeOut",
              },
            },
          }}
        >
          {/* Headline with word-by-word animation */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" } },
            }}
            className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-slate-100 mb-6"
          >
            BUILD THE FUTURE WITH{' '}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              SOVEREIGN AI.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
            }}
            className="text-base md:text-lg text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Enterprise-grade, self-hosted AI operations and headless infrastructure. 
            No vendor lock-in. No data leakage. Total operational leverage, built on open-source foundations.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
            }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <MagneticButton 
              href="https://silas-studio.buildwithai.digital"
              className="w-64"
            >
              <span className="relative flex items-center gap-2">
                Launch Silas Studio
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </MagneticButton>
            <MagneticButton 
              href="/dfy"
              className="w-64 border border-slate-700 bg-transparent hover:bg-slate-900/50"
            >
              Explore DFY Solutions
            </MagneticButton>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.4 } },
            }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-slate-500 text-sm"
          >
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-teal-400" />
              <span>Self-Hosted</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-teal-400" />
              <span>Open Source</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-teal-400" />
              <span>SOC2 Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-teal-400" />
              <span>Zero Lock-in</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-slate-500"
          >
            <span className="text-xs uppercase tracking-wider">Scroll to explore</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}