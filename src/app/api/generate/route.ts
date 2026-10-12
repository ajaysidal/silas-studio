export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://host.docker.internal:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3';
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = String(body.prompt || '').trim();
    const systemPrompt = String(body.systemPrompt || '').trim();
    if (!prompt) return new Response(JSON.stringify({ error: 'Prompt required.' }), { status: 400 });
    const ollamaRes = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: OLLAMA_MODEL, prompt, system: systemPrompt || 'You are Silas.', stream: false }),
    });
    if (!ollamaRes.ok) return new Response(JSON.stringify({ error: 'Ollama failed.' }), { status: 500 });
    const data = await ollamaRes.json();
    return new Response(JSON.stringify({ text: data.response || '' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) { return new Response(JSON.stringify({ error: 'Failed.' }), { status: 500 }); }
}
