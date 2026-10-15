/* Privacy Policy page - real practices only */
export default function Privacy() {
  return (
    <main className="min-h-screen bg-slate-950 py-12 md:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="px-4 py-12">
          <h1 className="font-orbitron text-4xl font-bold text-slate-100 mb-6">Privacy Policy</h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            We are committed to protecting your privacy. This policy explains how we handle your data
            when you use Build With AI products and services.
          </p>
          <div className="mt-8 p-6 rounded-2xl bg-slate-800 border border-slate-700">
            <h2 className="font-orbitron text-2xl font-semibold text-teal-400 mb-4">
              Data Sovereignty
            </h2>
            <p className="text-slate-400 text-sm">
              We do not store your data on external servers. All data remains on your infrastructure
              when you deploy Build With AI solutions self-hosted.
            </p>
          </div>
          <div className="mt-8 p-6 rounded-2xl bg-slate-800 border border-slate-700">
            <h2 className="font-orbitron text-2xl font-semibold text-teal-400 mb-4">
              Contact & Data Protection Officer
            </h2>
            <p className="text-slate-400 text-sm">
              Data Protection Officer: hello@buildwithai.digital
            </p>
            <p className="text-slate-400 text-sm">
              You may also exercise your rights by contacting us at the address above.
            </p>
          </div>
          <div className="mt-8 p-6 rounded-2xl bg-slate-800 border border-slate-700">
            <h2 className="font-orbitron text-2xl font-semibold text-teal-400 mb-4">
              Data We Process (Self-Hosted Only)
            </h2>
            <p className="text-slate-400 text-sm">
              When deployed self-hosted via Silas Studio or Payload CMS, the following data
              is processed within your infrastructure:
            </p>
            <ul className="text-slate-300 text-sm leading-relaxed">
              <li>User authentication credentials (hashed, stored locally)</li>
              <li>Project/configuration data stored on your infrastructure</li>
              <li>Audit logs generated on your systems</li>
              <li>No customer data is transmitted to Build With AI when self-hosted</li>
            </ul>
          </div>
          <div className="mt-8 p-6 rounded-2xl bg-slate-800 border border-slate-700">
            <h2 className="font-orbitron text-2xl font-semibold text-teal-400 mb-4">
              Third-Party Processors
            </h2>
            <p className="text-slate-400 text-sm">
              No third-party AI processors or analytics are deployed when using self-hosted
              Build With AI infrastructure. All processing occurs within your controlled environment.
            </p>
          </div>
          <div className="mt-8 p-6 rounded-2xl bg-slate-800 border border-slate-700">
            <h2 className="font-orbitron text-2xl font-semibold text-teal-400 mb-4">
              User Rights
            </h2>
            <p className="text-slate-400 text-sm">
              In accordance with data protection regulations, you may:
            </p>
            <ul className="text-slate-300 text-sm leading-relaxed">
              <li>Access: Request a copy of your data processed on your infrastructure</li>
              <li>Erasure: Request deletion of your data from your systems</li>
              <li>Export: Obtain your data in a structured format from your infrastructure</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}