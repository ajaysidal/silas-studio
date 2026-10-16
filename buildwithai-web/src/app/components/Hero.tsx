/* Server Hero component — plain Tailwind, no JS libraries, no framer-motion, no magnetic */
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-background">
      {/* Two absolutely-positioned radial glow divs using CSS vars, no animation library */}
      <div className="absolute top-10 left-10 md:left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-80" />
      <div className="absolute bottom-10 right-10 md:right-1/2 -translate-x-1/2 w-80 h-80 bg-primary/15 rounded-full blur-3xl opacity-60" />

      <div className="max-w-3xl mx-auto text-center">
        {/* Eyebrow: text-primary for brand accent */}
        <p className="text-sm font-semibold tracking-widest uppercase text-primary">
          Self-Hosted AI Operations
        </p>

        {/* H1 with font-orbitron scaling */}
        <h1 className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mt-4">
          Your AI. Your servers. Your rules.
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Build With AI deploys autonomous AI pipelines on infrastructure you own. No vendor lock-in. No data leaving your servers. Built entirely on open-source foundations.
        </p>

        {/* CTA row: primary + secondary, flex-col sm:flex-row */}
        <div className="mt-8 flex gap-4 justify-center flex-col sm:flex-row">
          {/* Primary CTA */}
          <Link
            href="https://silas-studio.buildwithai.digital"
            className="rounded-full bg-primary text-primary-foreground px-8 py-3.5 font-semibold hover:opacity-90 transition-opacity"
          >
            Launch Silas Studio
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/pricing"
            className="rounded-full border border-border px-8 py-3.5 font-semibold hover:bg-muted transition-colors"
          >
            See Pricing
          </Link>
        </div>

        {/* Trust row: self-hosted, open source, sovereignty — NO certifications */}
        <div className="mt-8 flex wrap gap-6 justify-center text-sm text-muted-foreground">
          <span>Self-Hosted</span>
          <span>Open Source</span>
          <span>Zero Lock-in</span>
          <span>Data Sovereignty</span>
        </div>
      </div>
    </section>
  )
}
