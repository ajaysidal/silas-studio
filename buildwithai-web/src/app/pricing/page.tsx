import Link from 'next/link';

export const metadata = {
  title: 'Pricing — Build With AI',
  description: 'Transparent, honest pricing for self-hosted AI infrastructure.',
};

export default function PricingPage() {
  const tiers = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'For solo builders and small projects.',
      features: [
        '1 active AI pipeline',
        'Self-hosted on your VPS',
        'Community support',
        'Open-source foundation',
      ],
    },
    {
      name: 'Professional',
      price: '$79',
      period: '/month',
      description: 'For teams shipping autonomous AI workflows.',
      features: [
        'Unlimited pipelines',
        'Multi-agent orchestration',
        'Priority support',
        'Advanced security hardening',
        'Custom integrations',
      ],
      highlight: true,
    },
    {
      name: 'Founding Partner',
      price: '$1,500',
      period: '/setup',
      description: 'Full DFY deployment and architecture.',
      features: [
        'Everything in Professional',
        'Dedicated deployment engineer',
        'Custom AI pipeline design',
        'Security audit & hardening',
        'Lifetime updates',
        'Direct founder access',
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <section className="py-12 md:py-16 lg:py-20 xl:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-orbitron text-4xl md:text-5xl font-bold mb-4">
              Honest, Transparent Pricing
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              No hidden fees. No vendor lock-in. Own your infrastructure forever.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-8 ${
                  tier.highlight
                    ? 'bg-card border-2 border-primary shadow-lg shadow-primary/20'
                    : 'bg-card border border-border'
                }`}
              >
                <h3 className="font-orbitron text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="text-muted-foreground mb-6">{tier.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground">{tier.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block text-center py-3 rounded-lg font-semibold transition-colors ${
                    tier.highlight
                      ? 'bg-primary text-primary-foreground hover:opacity-90'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {tier.highlight ? 'Get Started' : 'Contact Us'}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-muted-foreground">
              All plans include self-hosted deployment. Your data stays yours.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
