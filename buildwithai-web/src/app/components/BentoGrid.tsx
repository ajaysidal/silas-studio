'use client'

import { motion } from 'framer-motion'
import { Rocket, Server, Palette, CloudDownload, Shield, Mail } from 'lucide-react'

interface Feature {
  id: number
  title: string
  description: string
  icon: React.ComponentType
}

const features: Feature[] = [
  {
    id: 1,
    title: 'Self-Hosted AI Pipelines',
    description: 'Full control over your data and models. No vendor lock-in. No API fees.',
    icon: Shield,
  },
  {
    id: 2,
    title: 'Deterministic Workflows',
    description: 'Predictable, repeatable outcomes. Every run produces the same high-quality output.',
    icon: Rocket,
  },
  {
    id: 3,
    title: 'Enterprise Scalability',
    description: 'Scale from prototypes to organization-wide deployments with ease.',
    icon: Server,
  },
  {
    id: 4,
    title: 'Custom Integration',
    description: 'Connect your existing tools and workflows. API, CMS, and custom builders.',
    icon: Mail,
  },
]

export default function BentoGrid() {
  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-orbitron text-4xl md:text-5xl text-slate-100 mb-12 text-center">
          Autonomous AI Pipelines, Deployed for You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className="group rounded-2xl bg-slate-900/50 p-8 border border-slate-700 hover:bg-slate-950/80 transition-all duration-500 hover:shadow-2xl shadow-slate-500/10"
            >
              <div className="w-12 h-12 mx-auto mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="font-orbitron text-xl md:text-2xl text-slate-100 mb-3 group-hover:text-teal-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-300 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
