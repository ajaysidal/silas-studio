import type { NIMConfig, NIMMessage, NIMCompletionOptions, NIMCompletionResponse, NIMModelKey } from "@/types/nim"
import { getNIMConfig, getNIMApiKey } from "@/lib/nim"

export async function callNIM(
  messages: NIMMessage[],
  options: NIMCompletionOptions = {}
): Promise<NIMCompletionResponse> {
  const config = await getNIMConfig()
  const apiKey = getNIMApiKey()
  
  const modelKey = (options.model as NIMModelKey) || "deepseek-v4"
  const endpoint = config.endpoints[modelKey]
  
  if (!endpoint) {
    throw new Error(`Unknown model: ${modelKey}`)
  }
  
  const response = await fetch(`${endpoint.url}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: endpoint.model,
      messages,
      temperature: options.temperature ?? config.defaults.temperature,
      max_tokens: options.maxTokens ?? config.defaults.maxTokens,
      stream: options.stream ?? false,
    }),
  })
  
  if (!response.ok) {
    const error = await response.text()
    throw new Error(`NIM API error: ${response.status} - ${error}`)
  }
  
  return response.json()
}

export async function* streamNIM(
  messages: NIMMessage[],
  options: NIMCompletionOptions = {}
): AsyncGenerator<string, void, unknown> {
  const config = await getNIMConfig()
  const apiKey = getNIMApiKey()
  
  const modelKey = (options.model as NIMModelKey) || "deepseek-v4"
  const endpoint = config.endpoints[modelKey]
  
  if (!endpoint) {
    throw new Error(`Unknown model: ${modelKey}`)
  }
  
  const response = await fetch(`${endpoint.url}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: endpoint.model,
      messages,
      temperature: options.temperature ?? config.defaults.temperature,
      max_tokens: options.maxTokens ?? config.defaults.maxTokens,
      stream: true,
    }),
  })
  
  if (!response.ok) {
    const error = await response.text()
    throw new Error(`NIM API error: ${response.status} - ${error}`)
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
        if (line.startsWith("data: ")) {
          const data = line.slice(6).trim()
          if (data === "[DONE]") return
          
          try {
            const parsed = JSON.parse(data)
            const content = parsed.choices[0]?.delta?.content
            if (content) yield content
          } catch {
            // Ignore parse errors for incomplete chunks
          }
        }
      }
    }
  } finally {
    reader.releaseLock()
  }
}
