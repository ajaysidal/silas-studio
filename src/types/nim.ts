export interface NIMConfig {
  endpoints: {
    [key: string]: {
      url: string
      model: string
    }
  }
  apiKey: string
  defaults: {
    temperature: number
    maxTokens: number
  }
}

export interface NIMMessage {
  role: "system" | "user" | "assistant"
  content: string
}

export interface NIMCompletionOptions {
  model?: string
  temperature?: number
  maxTokens?: number
  stream?: boolean
}

export interface NIMCompletionResponse {
  id: string
  choices: Array<{
    index: number
    message: NIMMessage
    finish_reason: string
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export type NIMModelKey = "deepseek-v4" | "nemotron-3.5" | "kimi-k3"
