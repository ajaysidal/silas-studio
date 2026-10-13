'use client'

import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'

interface Plan {
  id: string
  name: string
  price: string
  interval: string
  features: string[]
  cta: string
  highlight?: boolean
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Starter',
    price: '$29',
    interval: '/ month',
    features: ['10 SEO pillars', '5 social threads', 'Email support'],
    cta: 'Get Started',
  },
  {
    id: 'pro',
    name: 'Professional',
    price: '$79',
    interval: '/ month',
    features: ['Unlimited SEO pillars', 'Unlimited social threads', 'Priority support'],
    cta: 'Get Started',
  },
  {
    id: 'founding',
    name: 'Founding Partner',
    price: '$1,500',
    interval: '/ month',
    features: [
      '4 Long-form SEO pillars',
      '12 short-form social threads',
      '1 monthly newsletter',
      'Dedicated account manager',
      'Custom integrations',
    ],
    cta: 'Apply Now',
    highlight: true,
  },
]

function getButtonClassName(plan: Plan): string {
  return `w-full py-3 rounded-xl font-medium transition-all duration-300 ${plan.highlight ? 'bg-teal-600 text-white' : 'bg-slate-900 text-slate-100 hover:bg-slate-800'}`
}

function getButtonTextClassName(plan: Plan): string {
  return plan.highlight ? 'text-white' : 'text-slate-100 hover:bg-slate-800'
}

function getDivClassName(plan: Plan): string {
  return `
    rounded-2xl bg-slate-900/50 border border-slate-700 p-8 transition-all duration-500 
    ${plan.highlight ? 'border-teal-500/30 shadow-xl shadow-teal-500/20 hover:scale-[1.02]' : 'hover:border-teal-500/20 hover:shadow-teal-500/20'}
  `.trim()
}

function getTextClassName(plan: Plan): string {
  return plan.highlight ? 'text-teal-400' : 'text-slate-300'
}

export default function Pricing() {
  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-orbitron text-4xl md:text-5xl text-slate-100 mb-12 text-center">
          Pricing Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              className={getDivClassName(plan)}
            >
              <h3 className="font-orbitron text-2xl md:text-3xl text-slate-100 mb-2 {getTextClassName(plan)}">
                {plan.name}
              </h3>
              <p className="text-4xl md:text-3xl font-bold text-teal-400 mb-1">{plan.price}</p>
              <p className="text-slate-500 mb-6">{plan.interval}</p>
              <ul className="space-y-3 mb-8 text-slate-300">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="w-4 h-4 text-teal-400 mt-1 flex-shrink-0 group-hover:text-teal-500 transition" />
                    <span className="ml-3">{feature}</span>
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={getButtonClassName(plan)}
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
