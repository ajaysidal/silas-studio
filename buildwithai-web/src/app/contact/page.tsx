export default function Contact() {
  return (
    <main className="py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="font-orbitron text-4xl md:text-5xl text-slate-100 mb-6">
          Let's Build Your Sovereign Infrastructure.
        </h1>
        <p className="text-lg text-slate-300 mb-12">
          Whether you are ready to deploy a Done-For-You AI pipeline, integrate our Headless CMS, or discuss a custom enterprise architecture, our team is ready to assist. We respond to all inquiries within 24 hours.
        </p>
      </div>
      <div className="max-w-md mx-auto space-y-4 p-6 bg-slate-950/80 rounded-lg backdrop-blur-md">
        <form>
          <div>
            <label className="block text-slate-300 mb-2">Full Name</label>
            <input type="text" className="w-full p-3 bg-slate-900 text-slate-100 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-400" />
          </div>
          <div>
            <label className="block text-slate-300 mb-2">Company Email</label>
            <input type="email" className="w-full p-3 bg-slate-900 text-slate-100 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-400" />
          </div>
          <div>
            <label className="block text-slate-300 mb-2">Organization / Agency Name</label>
            <input type="text" className="w-full p-3 bg-slate-900 text-slate-100 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-400" />
          </div>
          <div>
            <label className="block text-slate-300 mb-2">Area of Interest</label>
            <select className="w-full p-3 bg-slate-900 text-slate-100 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-400">
              <option value="">Select an option</option>
              <option>Done-For-You AI</option>
              <option>Payload CMS Integration</option>
              <option>Enterprise App Builder</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-slate-300 mb-2">Message / Project Details</label>
            <textarea className="w-full p-3 bg-slate-900 text-slate-100 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-400" rows={4} />
          </div>
          <button type="submit" className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-500 transition font-medium">
            Send Secure Message
          </button>
        </form>
      </div>
    </main>
  )
}
