import type { OllamaConfig, OllamaMessage, OllamaCompletionOptions, OllamaCompletionResponse, OllamaModelKey } from "@/types/ollama"

let configCache: OllamaConfig | null = null

export function clearOllamaConfigCache(): void {
  configCache = null
}

export async function getOllamaConfig(): Promise<OllamaConfig> {
  if (configCache) return configCache

  const baseUrl = process.env.OLLAMA_BASE_URL || "http://localhost:11434"
  
  configCache = {
    baseUrl,
    defaults: {
      temperature: 0.7,
      maxTokens: 4096,
    },
  }
  
  return configCache
}

export async function callOllama(
  messages: OllamaMessage[],
  options: OllamaCompletionOptions = {}
): Promise<OllamaCompletionResponse> {
  const config = await getOllamaConfig()
  
  const model = (options.model as OllamaModelKey) || "qwen2.5-coder:7b"
  
  const response = await fetch(`${config.baseUrl}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: options.temperature ?? config.defaults.temperature,
      num_predict: options.maxTokens ?? config.defaults.maxTokens,
      stream: false,
    }),
  })
  
  if (!response.ok) {
    // Try to extract a JSON error payload; Ollama may return { error: "..." }
    let errMsg: string
    try {
      const errBody = await response.json()
      errMsg = errBody?.error ?? JSON.stringify(errBody)
    } catch {
      errMsg = await response.text()
    }
    throw new Error(`Ollama API error: ${response.status} - ${errMsg}`)
  }
  
  return response.json()
}

export async function* streamOllama(
  messages: OllamaMessage[],
  options: OllamaCompletionOptions = {}
): AsyncGenerator<string, void, unknown> {
  const config = await getOllamaConfig()
  
  const model = (options.model as OllamaModelKey) || "qwen2.5-coder:7b"
  const response = await fetch(`${config.baseUrl}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: options.temperature ?? config.defaults.temperature,
      num_predict: options.maxTokens ?? config.defaults.maxTokens,
      stream: true,
    }),
  })
  if (!response.ok) {
    // Attempt to surface a readable error message from Ollama
    let errMsg: string
    try {
      const errBody = await response.json()
      errMsg = errBody?.error ?? JSON.stringify(errBody)
    } catch {
      errMsg = await response.text()
    }
    throw new Error(`Ollama API error: ${response.status} - ${errMsg}`)
  }
  
  const reader = response.body?.getReader()
  if (!reader) return
  
  const decoder = new TextDecoder()
  let buffer = ""
  
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      
      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split("\n")
      buffer = lines.pop() || ""
      
      for (const line of lines) {
        if (line.trim() === "") continue
        
        try {
          const parsed = JSON.parse(line)
          // Ollama may return an error object in the stream; propagate it
          if (parsed.error) {
            throw new Error(`Ollama stream error: ${parsed.error}`)
          }
          const content = parsed.message?.content
          if (content) yield content
          if (parsed.done) return
        } catch {
          // Ignore parse errors for incomplete chunks
      }
}
    }
  } finally {
    reader.releaseLock()
  }
}

export async function listOllamaModels(): Promise<string[]> {
  const config = await getOllamaConfig()
  
  try {
    const response = await fetch(`${config.baseUrl}/api/tags`)
    if (!response.ok) return []
    
    const data = await response.json()
    return data.models?.map((m: { name: string }) => m.name) || []
  } catch {
    return []
  }
}

export async function checkOllamaHealth(): Promise<boolean> {
  const config = await getOllamaConfig()
  
  try {
    const response = await fetch(`${config.baseUrl}/api/tags`, { 
      method: "GET",
      signal: AbortSignal.timeout(5000)
    })
    return response.ok
  } catch {
    return false
  }
}
