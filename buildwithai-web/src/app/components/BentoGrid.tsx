"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Server, Globe, Database, Layers, Code, Lock } from "lucide-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

const features = [
  {
    id: 1,
    title: "Self-Hosted AI Pipelines",
    description: "Full control over your data and models. Deploy on your infrastructure with zero external dependencies.",
    header: <Shield className="w-8 h-8 text-teal-400" />,
  },
  {
    id: 2,
    title: "Deterministic Workflows",
    description: "Predictable, repeatable outcomes. Every execution produces the same high-quality, auditable result.",
    header: <Zap className="w-8 h-8 text-teal-400" />,
  },
  {
    id: 3,
    title: "Enterprise Scalability",
    description: "Scale from prototypes to organization-wide deployments. Horizontal scaling built into every pipeline.",
    header: <Server className="w-8 h-8 text-teal-400" />,
  },
  {
    id: 4,
    title: "Global Edge Deployment",
    description: "Deploy pipelines to edge locations worldwide. Sub-millisecond latency for AI inference.",
    header: <Globe className="w-8 h-8 text-teal-400" />,
  },
  {
    id: 5,
    title: "Data Sovereignty",
    description: "Your data never leaves your network. Complete GDPR, HIPAA, and SOC2 compliance built-in.",
    header: <Lock className="w-8 h-8 text-teal-400" />,
  },
  {
    id: 6,
    title: "Composable Architecture",
    description: "Build pipelines from reusable components. Mix, match, and version control every step.",
    header: <Layers className="w-8 h-8 text-teal-400" />,
  },
  {
    id: 7,
    title: "Developer Experience",
    description: "Type-safe APIs, local development, and instant feedback loops. Built by developers, for developers.",
    header: <Code className="w-8 h-8 text-teal-400" />,
  },
  {
    id: 8,
    title: "Persistent State",
    description: "Durable execution with automatic checkpointing. Resume from failure without data loss.",
    header: <Database className="w-8 h-8 text-teal-400" />,
  },
];

export default function BentoGridSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-slate-950 relative">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-500/5 to-transparent pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 lg:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-400 text-sm font-medium mb-4">
            CORE CAPABILITIES
          </span>
          <h2 className="font-orbitron text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-slate-100 mb-4">
            Autonomous AI Pipelines,{' '}
            <span className="gradient-text">Deployed for You</span>
          </h2>
          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto">
            Eight enterprise-grade capabilities that make sovereign AI operations effortless.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 md:auto-rows-[22rem] lg:auto-rows-[24rem]">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
              >
                <BentoGridItem
                  className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-6 md:p-8 transition-all duration-500 hover:border-teal-500/30 hover:shadow-[0_0_40px_rgba(20,184,166,0.15)] hover:bg-slate-900/80 card-tilt"
                  title={feature.title}
                  description={feature.description}
                  header={feature.header}
                />
              </motion.div>
            ))}
          </BentoGrid>
        </motion.div>
      </div>
    </section>
  );
}