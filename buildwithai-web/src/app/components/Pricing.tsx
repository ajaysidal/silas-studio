"use client";

import { motion, Check, X, ArrowRight } from "lucide-react";
import { Button } from "./Button";

interface Plan {
  id: string;
  name: string;
  price: string;
  interval: string;
  description: string;
  features: string[];
  additionalFeatures?: string[];
  cta: string;
  highlight?: boolean;
  badge?: string;
}

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "$29",
    interval: "/ month",
    description: "Perfect for individual developers and small projects",
    features: [
      "10 AI Pipeline executions/month",
      "5 Concurrent workflows",
      "Local development environment",
      "Community support",
      "Open-source components",
      "Basic monitoring & logs",
    ],
    cta: "Start Free Trial",
    badge: "Most Popular",
  },
  {
    id: "professional",
    name: "Professional",
    price: "$79",
    interval: "/ month",
    description: "For growing teams building production AI systems",
    features: [
      "Unlimited pipeline executions",
      "20 Concurrent workflows",
      "Team collaboration (5 seats)",
      "Priority email support",
      "Advanced monitoring & alerting",
      "Custom integrations",
      "SSO (SAML/OIDC)",
      "Audit logs & compliance",
    ],
    additionalFeatures: [
      "Dedicated account manager",
      "Custom SLA options",
      "On-premise deployment support",
    ],
    cta: "Get Started",
    highlight: true,
    badge: "Best Value",
  },
  {
    id: "founding",
    name: "Founding Partner",
    price: "$1,500",
    interval: "/ month",
    description: "Strategic partnership for enterprise-scale deployments",
    features: [
      "Unlimited everything",
      "Unlimited team seats",
      "White-glove onboarding",
      "24/7 dedicated support",
      "Custom feature development",
      "Co-marketing opportunities",
      "Early access to new features",
      "Executive business reviews",
    ],
    additionalFeatures: [
      "Source code access",
      "Custom deployment architecture",
      "Regulatory compliance assistance",
      "Executive escalation path",
    ],
    cta: "Apply Now",
    badge: "Enterprise",
  },
];

function getCardClasses(plan: Plan): string {
  const base = "relative rounded-2xl p-8 transition-all duration-500 group";
  if (plan.highlight) {
    return `${base} bg-slate-900 border-2 border-teal-500/30 shadow-[0_0_60px_rgba(20,184,166,0.15)] hover:shadow-[0_0_80px_rgba(20,184,166,0.2)]`;
  }
  return `${base} bg-slate-900/50 border border-slate-800 hover:border-teal-500/20 hover:shadow-[0_0_40px_rgba(20,184,166,0.1)]`;
}

function getButtonClasses(plan: Plan): string {
  const base = "w-full py-3.5 rounded-xl font-medium text-lg transition-all duration-300 flex items-center justify-center gap-2";
  if (plan.highlight) {
    return `${base} bg-gradient-to-r from-teal-600 to-cyan-500 text-white hover:from-teal-500 hover:to-cyan-400 shadow-lg shadow-teal-500/25`;
  }
  return `${base} bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700`;
}

function getBadgeClasses(plan: Plan): string {
  const base = "absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold";
  if (plan.highlight) {
    return `${base} bg-gradient-to-r from-teal-600 to-cyan-500 text-white`;
  }
  return `${base} bg-slate-800 text-slate-300 border border-slate-700`;
}

export default function Pricing() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-slate-950 relative">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-t from-teal-500/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-teal-500/10 text-teal-400 text-sm font-medium mb-4">
            TRANSPARENT PRICING
          </span>
          <h2 className="font-orbitron text-3xl md:text-4xl lg:text-5xl text-slate-100 mb-4 leading-tight">
            Simple, Predictable{' '}
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto">
            No hidden fees. No per-token costs. Scale without surprises.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <div key={plan.id} className={getCardClasses(plan)}>
              {/* Badge */}
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold">
                  {plan.badge}
                </span>
              )}

              {/* Plan Header */}
              <div className="mb-8">
                <h3 className="font-orbitron text-2xl md:text-3xl text-slate-100 mb-2">
                  {plan.name}
                </h3>
                <p className="text-slate-500 text-sm mb-6">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-orbitron text-5xl md:text-6xl font-bold text-teal-400">
                    {plan.price}
                  </span>
                  <span className="text-slate-500">{plan.interval}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li className="flex items-start gap-3 text-slate-300">
                    <Check className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                href={plan.id === "founding" ? "/contact" : "#"}
                className={getButtonClasses(plan)}
              >
                {plan.cta}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}