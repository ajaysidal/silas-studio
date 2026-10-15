/* Terms of Service page - clear service description, TODO-LEGAL-REVIEW marker */
export default function Terms() {
  return (
    <main className="min-h-screen bg-slate-950 py-12 md:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="px-4 py-8">
          <h1 className="font-orbitron text-4xl font-bold text-slate-100 mb-6">
            Terms of Service
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            These terms govern your use of Build With AI services and infrastructure. Please read
            them carefully before deploying or using our products.
          </p>
          <div className="mt-8 p-6 rounded-2xl bg-slate-800 border border-slate-700">
            <h2 className="font-orbitron text-2xl font-semibold text-teal-400 mb-4">
              Last Updated: October 2026
            </h2>
            <p className="text-slate-400 text-sm">
              We reserve the right to modify these terms at any time. You will be notified
              of material changes.
            </p>
            <p className="text-teal-500 text-xs mt-2">
              TODO-LEGAL-REVIEW: Governing law, liability limits, and dispute resolution
              should be reviewed by qualified legal counsel before public deployment.
            </p>
          </div>
          <div className="mt-8 p-6 rounded-2xl bg-slate-800 border border-slate-700">
            <h2 className="font-orbitron text-2xl font-semibold text-teal-400 mb-4">
              Acceptable Use
            </h2>
            <p className="text-slate-400 text-sm">
              By using Build With AI products, you agree to:
            </p>
            <ul className="text-slate-300 text-sm leading-relaxed">
              <li>Not use our infrastructure for illegal activities or weapons development</li>
              <li>Not reverse-engineer or extract model weights from our hosted services</li>
              <li>Respect data sovereignty and jurisdictional boundaries for all customer data</li>
              <li>Not export or distribute any output that violates applicable regulations</li>
            </ul>
          </div>
          <div className="mt-8 p-6 rounded-2xl bg-slate-800 border border-slate-700">
            <h2 className="font-orbitron text-2xl font-semibold text-teal-400 mb-4">
              Liability
            </h2>
            <p className="text-slate-400 text-sm">
              Build With AI provides infrastructure and tooling. We do not guarantee specific
              business outcomes, model performance, or suitability for any particular regulatory
              regime. All deployment risk rests with the deploying organization.
            </p>
            <p className="text-teal-500 text-xs mt-2">
              TODO-LEGAL-Review: Exact liability language requires legal counsel.
            </p>
          </div>
          <div className="mt-8 p-6 rounded-2xl bg-slate-800 border border-slate-700">
            <h2 className="font-orbitron text-2xl font-semibold text-teal-400 mb-4">
              Governing Law
            </h2>
            <p className="text-slate-400 text-sm">
              TODO-LEGAL-Review: Governing law jurisdiction has not been determined. Seek
              counsel to specify applicable jurisdiction for dispute resolution.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}