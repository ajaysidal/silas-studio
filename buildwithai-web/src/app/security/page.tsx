export const metadata = {
  title: 'Security — Build With AI',
  description: 'Security architecture and controls deployed today.',
};

export default function SecurityPage() {
  const controls = [
    { name: 'SSH Key-Only Authentication', description: 'Password authentication disabled system-wide.' },
    { name: 'Fail2ban', description: 'Automated brute-force protection on all exposed services.' },
    { name: 'UFW Firewall Lockdown', description: 'Default deny inbound; only required ports open.' },
    { name: 'Auditd Logging', description: 'Comprehensive kernel-level audit trail for all privileged actions.' },
    { name: 'Docker Container Isolation', description: 'Each service in isolated containers with minimal privileges.' },
    { name: 'TLS Termination', description: 'All public traffic encrypted via HTTPS with modern cipher suites.' },
    { name: 'Encrypted Database Credentials', description: 'Postgres credentials stored in environment files, never committed to source.' },
  ];

  return (
    <main className="min-h-screen bg-background">
      <section className="py-12 md:py-16 lg:py-20 xl:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-orbitron text-4xl md:text-5xl font-bold mb-6">
            Security Architecture
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            The following security controls are actively deployed across our infrastructure today.
          </p>

          <div className="space-y-6">
            {controls.map((control) => (
              <div key={control.name} className="border border-border rounded-lg p-6 bg-card">
                <h3 className="font-orbitron text-xl font-semibold mb-2">{control.name}</h3>
                <p className="text-muted-foreground">{control.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 border-t border-border pt-8">
            <h2 className="font-orbitron text-2xl font-bold mb-4">Roadmap</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• SOC 2 Type II alignment (planned)</li>
              <li>• Automated uptime & incident monitoring (planned)</li>
              <li>• Third-party penetration testing (planned)</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-4">
              We do not claim certifications we do not hold. Our roadmap is honest and transparent.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
