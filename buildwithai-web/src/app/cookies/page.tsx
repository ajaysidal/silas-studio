/* Cookies Policy page - exact storage used today */
export default function Cookies() {
  return (
    <main className="min-h-screen bg-slate-950 py-12 md:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="px-4 py-8">
          <h1 className="font-orbitron text-4xl font-bold text-slate-100 mb-6">
            Cookie Policy
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            This policy describes the cookies and similar tracking technologies used by Build With AI.
          </p>
          <div className="mt-8 p-6 rounded-2xl bg-slate-800 border border-slate-700">
            <h2 className="font-orbitron text-2xl font-semibold text-teal-400 mb-4">
              Storage Used Today
            </h2>
            <table className="w-full text-slate-300 text-sm">
              <thead>
                <tr>
                  <th className="text-teal-400">Storage</th>
                  <th className="text-teal-400">Purpose</th>
                  <th className="text-teal-400">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-medium">Theme preference</td>
                  <td>Remembers your light/dark theme choice</td>
                  <td>Until browser clearance</td>
                </tr>
                <tr>
                  <td className="font-medium">Consent choice</td>
                  <td>Remembers your cookie consent preference</td>
                  <td>12 months or until reset</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-8 p-6 rounded-2xl bg-slate-800 border border-slate-700">
            <h2 className="font-orbitron text-2xl font-semibold text-teal-400 mb-4">
              Essential Cookies
            </h2>
            <p className="text-slate-400 text-sm">
              These cookies are necessary for the website to function properly. They include:
            </p>
            <ul className="text-slate-300 text-sm leading-relaxed">
              <li>Session management — identifies your session</li>
              <li>Security — protects against malicious attacks</li>
              <li>Preferences — stores your cookie consent choice</li>
            </ul>
          </div>
          <div className="mt-8 p-6 rounded-2xl bg-slate-800 border border-slate-700">
            <h2 className="font-orbitron text-2xl font-semibold text-teal-400 mb-4">
              Non-Essential Cookies (When Consented)
            </h2>
            <p className="text-slate-400 text-sm">
              When you accept all cookies, the following may be set:
            </p>
            <ul className="text-slate-300 text-sm leading-relaxed">
              <li>Analytics — optional, helps us understand site usage patterns</li>
              <li>No third-party AI processor cookies are set at any time</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}