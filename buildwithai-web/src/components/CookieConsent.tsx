/* Cookie Consent Banner - fixed bottom, render-once persistence */
'use client';

import { useEffect, useState } from 'react';

export default function CookieConsent() {
  const [hasShown, setHasShown] = useState(false);
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null);

  // Check if consent already stored
  useEffect(() => {
    const stored = localStorage.getItem('bwai-consent');
    if (stored !== null) {
      setConsentGiven(JSON.parse(stored) as boolean | null);
      setHasShown(true);
    }
  }, []);

  // Store consent choice
  useEffect(() => {
    if (consentGiven !== null) {
      localStorage.setItem('bwai-consent', JSON.stringify(consentGiven));
    }
  }, [consentGiven]);

  if (hasShown) return null; // render once

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full z-50 bg-slate-950/90 backdrop-blur-md border-t border-slate-800/50 p-4 transition-all duration-300"
      style={{ transitionDelay: '0s' }}
    >
      <p className="text-slate-300 text-sm leading-relaxed">
        We use essential cookies to power our site. You may consent to analytics cookies below.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mt-3">
        <button
          onClick={() => setConsentGiven(false)}
          className="relative w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-800 text-slate-100 font-medium hover:bg-slate-700 border border-slate-600 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          Essential only
        </button>
        <button
          onClick={() => setConsentGiven(true)}
          className="relative w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-500 text-white font-medium hover:from-teal-500 hover:to-cyan-400 hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          Accept all
        </button>
      </div>
    </div>
  );
}