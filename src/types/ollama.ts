export interface OllamaConfig {
  baseUrl: string
  defaults: {
    temperature: number
    maxTokens: number
  }
}

export interface OllamaMessage {
  role: "system" | "user" | "assistant"
  content: string
}

export interface OllamaCompletionOptions {
  model?: string
  temperature?: number
  maxTokens?: number
  stream?: boolean
}

export interface OllamaCompletionResponse {
  model: string
  created_at: string
  message: OllamaMessage
  done: boolean
  total_duration?: number
  load_duration?: number
  prompt_eval_count?: number
  prompt_eval_duration?: number
  eval_count?: number
  eval_duration?: number
}

export type OllamaModelKey = "qwen2.5-coder:7b" | "qwen2.5-coder:14b" | "deepseek-coder-v2:16b" | "codellama:34b" | "llama3.1:70b"