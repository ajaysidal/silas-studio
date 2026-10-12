'use client';
import { useState } from 'react';
import TokenGatedRoute from '@/components/TokenGatedRoute';
export default function Studio() {
  const [systemPrompt, setSystemPrompt] = useState('You are an expert SEO content writer.');
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const executeAgent = async () => {
    if (!prompt.trim()) return;
    setLoading(true); setOutput('');
    try {
      const res = await fetch('/api/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt, systemPrompt }) });
      const data = await res.json();
      setOutput(data.text || '');
    } catch (err) { setOutput('Error generating.'); } finally { setLoading(false); }
  };
  return (
    <TokenGatedRoute>
      <main className="flex h-screen bg-slate-950 text-slate-100">
        <div className="w-full md:w-1/3 border-r border-slate-800 p-6 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-blue-400">Agent Controls</h2>
          <textarea value={systemPrompt} onChange={(e) => setSystemPrompt(e.target.value)} className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg h-32" />
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Enter prompt..." className="w-full flex-1 p-3 bg-slate-900 border border-slate-700 rounded-lg" />
          <button onClick={executeAgent} disabled={loading} className="w-full py-3 bg-blue-600 rounded-lg font-semibold">{loading ? 'Generating...' : 'Execute Agent'}</button>
        </div>
        <div className="hidden md:block md:w-2/3 p-8 overflow-y-auto">
          <h2 className="text-xl font-bold text-emerald-400 mb-6">Studio Output</h2>
          <div className="p-6 bg-slate-900/50 rounded-lg border border-slate-800 whitespace-pre-wrap">{output || 'Ready for input.'}</div>
        </div>
      </main>
    </TokenGatedRoute>
  );
}
