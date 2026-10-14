"use client";

import { motion } from "framer-motion";
import { ArrowRight, Target, Eye, Flag, Users, Shield, Sparkles } from "lucide-react";
import Link from "next/link";

export default function About() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-16 md:py-20 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-400 text-sm font-medium mb-6">
              ROOTED IN LEGACY
            </span>
            <h1 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-slate-100 mb-6">
              Built for the Future of{' '}
              <span className="gradient-text">Sovereign AI</span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              Build With AI was founded on a simple, non-negotiable premise: true innovation requires data sovereignty. 
              Our mission is deeply informed by the resilience, community empowerment, and forward-thinking values of our Fiji roots. 
              We do not build disposable software. We architect deterministic, self-hosted ecosystems—like Silas Studio and our 
              enterprise Payload CMS deployments—that give organizations absolute control over their data, their workflows, 
              and their digital legacy. We are not here to rent you AI capabilities. We are here to help you own them.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Goals */}
      <section className="py-16 md:py-20 lg:py-24 bg-slate-950 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-500/5 to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16 lg:mb-20"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-400 text-sm font-medium mb-4">
              OUR FOUNDATION
            </span>
            <h2 className="font-orbitron text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-slate-100 mb-4">
              Principles That Guide{' '}
              <span className="gradient-text">Every Decision</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Three pillars that define who we are, where we're going, and how we measure success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Mission */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="group relative rounded-2xl border border-slate-800 bg-slate-900/50 p-8 transition-all duration-500 hover:border-teal-500/30 hover:shadow-[0_0_40px_rgba(20,184,166,0.15)] hover:bg-slate-900/80"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center mb-6 group-hover:bg-teal-500/20 transition-colors duration-300">
                <Target className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="font-orbitron text-xl md:text-2xl font-semibold text-slate-100 mb-4">Mission</h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                To democratize sovereign AI infrastructure by delivering enterprise-grade, self-hosted pipelines that eliminate 
                vendor lock-in, ensure data privacy, and provide deterministic operational leverage for organizations of all sizes.
              </p>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li className="flex items-center gap-2"><Shield className="w-4 h-4 text-teal-400" /> Zero data leakage</li>
                <li className="flex items-center gap-2"><Shield className="w-4 h-4 text-teal-400" /> Full operational control</li>
                <li className="flex items-center gap-2"><Shield className="w-4 h-4 text-teal-400" /> Open-source foundations</li>
                <li className="flex items-center gap-2"><Shield className="w-4 h-4 text-teal-400" /> Deterministic outcomes</li>
              </ul>
            </motion.article>

            {/* Vision */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              className="group relative rounded-2xl border border-slate-800 bg-slate-900/50 p-8 transition-all duration-500 hover:border-teal-500/30 hover:shadow-[0_0_40px_rgba(20,184,166,0.15)] hover:bg-slate-900/80"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center mb-6 group-hover:bg-teal-500/20 transition-colors duration-300">
                <Eye className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="font-orbitron text-xl md:text-2xl font-semibold text-slate-100 mb-4">Vision</h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                A world where every organization—regardless of size—operates with complete AI sovereignty. Where intelligence 
                augmentation is not a rented service but an owned capability, deployed on infrastructure you control, 
                governed by policies you define, serving communities you empower.
              </p>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-teal-400" /> Self-hosted by default</li>
                <li className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-teal-400" /> Edge-native deployment</li>
                <li className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-teal-400" /> Community-driven innovation</li>
                <li className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-teal-400" /> Legacy-preserving architecture</li>
              </ul>
            </motion.article>

            {/* Goals */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
              className="group relative rounded-2xl border border-slate-800 bg-slate-900/50 p-8 transition-all duration-500 hover:border-teal-500/30 hover:shadow-[0_0_40px_rgba(20,184,166,0.15)] hover:bg-slate-900/80"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center mb-6 group-hover:bg-teal-500/20 transition-colors duration-300">
                <Flag className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="font-orbitron text-xl md:text-2xl font-semibold text-slate-100 mb-4">Goals</h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                Measurable milestones that hold us accountable to our mission and vision.
              </p>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li className="flex items-center gap-2"><Users className="w-4 h-4 text-teal-400" /> 10,000+ sovereign deployments by 2027</li>
                <li className="flex items-center gap-2"><Users className="w-4 h-4 text-teal-400" /> Zero vendor lock-in for all customers</li>
                <li className="flex items-center gap-2"><Users className="w-4 h-4 text-teal-400" /> 100% open-source core pipeline</li>
                <li className="flex items-center gap-2"><Users className="w-4 h-4 text-teal-400" /> SOC2 Type II certification</li>
              </ul>
            </motion.article>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-slate-950/50 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          >
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-slate-800 bg-gradient-to-br from-teal-500/10 via-slate-900 to-cyan-500/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
                    <span className="font-orbitron text-3xl font-bold text-white">AS</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-slate-950 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 opacity-20 blur-2xl" />
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-500 opacity-20 blur-2xl" />
            </div>

            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-400 text-sm font-medium mb-4">
                FOUNDER & ARCHITECT
              </span>
              <h2 className="font-orbitron text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-slate-100 mb-6">
                Ajay Sidal —{' '}
                <span className="gradient-text">Legacy Founder</span>
              </h2>
              <div className="space-y-4 text-slate-300 leading-relaxed mb-8">
                <p>
                  Born from the resilience and community spirit of Fiji, Ajay brings a unique perspective to AI infrastructure: 
                  technology must serve people, not the other way around. His career spans enterprise architecture, 
                  open-source leadership, and sovereign cloud deployments across regulated industries.
                </p>
                <p>
                  Before founding Build With AI, Ajay led platform engineering at global firms where he witnessed firsthand 
                  the perils of vendor lock-in, data sovereignty violations, and the fragility of cloud-dependent AI stacks. 
                  This experience forged the conviction that organizations must own their intelligence layer completely.
                </p>
                <p>
                  Under his leadership, Build With AI has delivered Silas Studio—the autonomous AI operations platform—and 
                  enterprise Payload CMS deployments for boutique agencies and Fortune 500 enterprises alike. 
                  Every line of code reflects the Fiji values of <strong className="text-slate-100">community</strong>, 
                  <strong className="text-slate-100">stewardship</strong>, and <strong className="text-slate-100">intergenerational thinking</strong>.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <a
                  href="https://www.linkedin.com/in/ajaysidal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 font-medium hover:border-teal-500/50 hover:bg-slate-800/50 transition-all duration-300"
                >
                  <svg className="w-5 h-5 text-teal-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                  <span>Connect on LinkedIn</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700 text-slate-300 font-medium hover:border-teal-500 hover:text-teal-400 hover:bg-slate-900/50 transition-all duration-300"
                >
                  Discuss Your Project
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-slate-950 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-500/5 to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16 lg:mb-20"
          >
            <h2 className="font-orbitron text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-slate-100 mb-4">
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              The principles that shape every product decision, every customer interaction, and every line of code.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Sovereignty First", desc: "Your data, your models, your infrastructure. Never rented. Always owned." },
              { icon: Users, title: "Community Over Competition", desc: "Open-source foundations. Shared success. Rising tide lifts all boats." },
              { icon: Target, title: "Deterministic Excellence", desc: "Predictable, repeatable, auditable outcomes. No black boxes. No surprises." },
              { icon: Sparkles, title: "Legacy-Minded Building", desc: "Software that outlives trends. Architecture that serves generations." },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                className="group p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-teal-500/30 hover:bg-slate-900/80 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center mb-4 group-hover:bg-teal-500/20 transition-colors duration-300">
                  <value.icon className="w-5 h-5 text-teal-400" />
                </div>
                <h3 className="font-orbitron text-lg font-semibold text-slate-100 mb-2">{value.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-slate-950 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-500/10 to-transparent pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="font-orbitron text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-slate-100 mb-6">
              Ready to Build{' '}
              <span className="gradient-text">Sovereign AI</span>?
            </h2>
            <p className="text-lg text-slate-300 mb-10 leading-relaxed">
              Join organizations worldwide deploying self-hosted AI pipelines with total control, zero lock-in, and deterministic outcomes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://silas-studio.buildwithai.digital"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 font-orbitron font-semibold text-slate-100 bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-500 hover:to-cyan-400 shadow-lg shadow-teal-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                Launch Silas Studio
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 font-orbitron font-semibold text-slate-100 border border-slate-700 bg-slate-900/50 hover:border-teal-500 hover:bg-slate-800/50 hover:text-teal-400 transition-all duration-300"
              >
                Contact Our Team
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
