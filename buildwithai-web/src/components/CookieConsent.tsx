'use client';

import { useEffect, useState } from 'react';

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('bwai-consent');
    if (stored) {
      setConsentGiven(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (consentGiven !== null) {
      localStorage.setItem('bwai-consent', JSON.stringify(consentGiven));
    }
  }, [consentGiven]);

  // Don't render on server or before mounted to prevent hydration mismatch
  if (!mounted) return null;

  // Don't show if consent already given
  if (consentGiven !== null) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-card border-t border-border">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-foreground">
          We use cookies for essential site functionality.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setConsentGiven(false)}
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg"
          >
            Essential only
          </button>
          <button
            onClick={() => setConsentGiven(true)}
            className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:opacity-90"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
