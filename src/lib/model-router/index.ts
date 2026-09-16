// Multi-Model Router - Intelligent model selection based on task type

export interface ModelCapabilities {
  name: string
  size: string // e.g., "7B", "14B", "34B", "70B"
  ramRequired: string // e.g., "6GB", "11GB", "22GB", "40GB"
  strengths: ModelStrength[]
  bestFor: TaskType[]
  speed: "fast" | "medium" | "slow"
  quality: "good" | "better" | "best"
}

export type ModelStrength = 
  | "code-generation"
  | "reasoning"
  | "debugging"
  | "refactoring"
  | "architecture"
  | "documentation"
  | "testing"
  | "simple-code"
  | "complex-code"

export type TaskType = 
  | "simple-code"
  | "complex-code"
  | "debugging"
  | "architecture"
  | "refactoring"
  | "documentation"
  | "testing"
  | "general-chat"

export const MODEL_CAPABILITIES: ModelCapabilities[] = [
  {
    name: "qwen2.5-coder:7b",
    size: "7B",
    ramRequired: "~6GB",
    strengths: ["code-generation", "simple-code", "debugging"],
    bestFor: ["simple-code", "general-chat"],
    speed: "fast",
    quality: "good",
  },
  {
    name: "qwen2.5-coder:14b",
    size: "14B",
    ramRequired: "~11GB",
    strengths: ["code-generation", "reasoning", "debugging", "refactoring"],
    bestFor: ["simple-code", "complex-code", "debugging", "refactoring", "general-chat"],
    speed: "medium",
    quality: "better",
  },
  {
    name: "deepseek-coder-v2:16b",
    size: "16B",
    ramRequired: "~12GB",
    strengths: ["reasoning", "architecture", "complex-code", "debugging"],
    bestFor: ["complex-code", "architecture", "debugging", "refactoring"],
    speed: "medium",
    quality: "better",
  },
  {
    name: "codellama:34b",
    size: "34B",
    ramRequired: "~22GB",
    strengths: ["code-generation", "reasoning", "architecture", "refactoring", "testing"],
    bestFor: ["complex-code", "architecture", "refactoring", "testing"],
    speed: "slow",
    quality: "best",
  },
  {
    name: "llama3.1:70b",
    size: "70B",
    ramRequired: "~40GB",
    strengths: ["reasoning", "architecture", "documentation", "complex-code", "refactoring"],
    bestFor: ["architecture", "complex-code", "documentation", "refactoring"],
    speed: "slow",
    quality: "best",
  },
]

export function selectModelForTask(
  taskType: TaskType,
  availableModels: string[],
  userPreference?: string
): string {
  // If user explicitly selected a model, use it
  if (userPreference && availableModels.includes(userPreference)) {
    return userPreference
  }

  // Find models that are best for this task type
  const suitableModels = MODEL_CAPABILITIES.filter(
    (m) => m.bestFor.includes(taskType) && availableModels.includes(m.name)
  )

  if (suitableModels.length === 0) {
    // Fallback: use any available model, preferring higher quality
    const available = MODEL_CAPABILITIES.filter((m) => availableModels.includes(m.name))
    if (available.length > 0) {
      // Sort by quality desc, then speed asc
      available.sort((a, b) => {
        const qualityOrder = { best: 3, better: 2, good: 1 }
        const speedOrder = { fast: 1, medium: 2, slow: 3 }
        const qDiff = qualityOrder[b.quality] - qualityOrder[a.quality]
        if (qDiff !== 0) return qDiff
        return speedOrder[a.speed] - speedOrder[b.speed]
      })
      return available[0].name
    }
    // Ultimate fallback
    return availableModels[0] || "qwen2.5-coder:7b"
  }

  // Sort by quality desc, then speed asc
  suitableModels.sort((a, b) => {
    const qualityOrder = { best: 3, better: 2, good: 1 }
    const speedOrder = { fast: 1, medium: 2, slow: 3 }
    const qDiff = qualityOrder[b.quality] - qualityOrder[a.quality]
    if (qDiff !== 0) return qDiff
    return speedOrder[a.speed] - speedOrder[b.speed]
  })

  return suitableModels[0].name
}

export function detectTaskType(prompt: string): TaskType {
  const lowerPrompt = prompt.toLowerCase()

  // Architecture/design tasks
  if (
    lowerPrompt.includes("architect") ||
    lowerPrompt.includes("design system") ||
    lowerPrompt.includes("system design") ||
    lowerPrompt.includes("scalab") ||
    lowerPrompt.includes("microservice") ||
    lowerPrompt.includes("infrastructure")
  ) {
    return "architecture"
  }

  // Debugging tasks
  if (
    lowerPrompt.includes("debug") ||
    lowerPrompt.includes("fix") ||
    lowerPrompt.includes("error") ||
    lowerPrompt.includes("bug") ||
    lowerPrompt.includes("issue") ||
    lowerPrompt.includes("broken") ||
    lowerPrompt.includes("not working")
  ) {
    return "debugging"
  }

  // Refactoring tasks
  if (
    lowerPrompt.includes("refactor") ||
    lowerPrompt.includes("improve") ||
    lowerPrompt.includes("optimize") ||
    lowerPrompt.includes("clean up") ||
    lowerPrompt.includes("restructure")
  ) {
    return "refactoring"
  }

  // Documentation tasks
  if (
    lowerPrompt.includes("document") ||
    lowerPrompt.includes("readme") ||
    lowerPrompt.includes("comment") ||
    lowerPrompt.includes("explain") ||
    lowerPrompt.includes("documentation")
  ) {
    return "documentation"
  }

  // Testing tasks
  if (
    lowerPrompt.includes("test") ||
    lowerPrompt.includes("spec") ||
    lowerPrompt.includes("unit test") ||
    lowerPrompt.includes("integration test") ||
    lowerPrompt.includes("e2e")
  ) {
    return "testing"
  }

  // Complex code generation
  if (
    lowerPrompt.includes("full") ||
    lowerPrompt.includes("complete") ||
    lowerPrompt.includes("entire") ||
    lowerPrompt.includes("dashboard") ||
    lowerPrompt.includes("application") ||
    lowerPrompt.includes("platform") ||
    lowerPrompt.includes("system") ||
    (lowerPrompt.includes("auth") && lowerPrompt.length > 50) ||
    (lowerPrompt.includes("api") && lowerPrompt.length > 50)
  ) {
    return "complex-code"
  }

  // Simple code generation
  if (
    lowerPrompt.includes("component") ||
    lowerPrompt.includes("function") ||
    lowerPrompt.includes("hook") ||
    lowerPrompt.includes("utility") ||
    lowerPrompt.includes("helper") ||
    lowerPrompt.includes("button") ||
    lowerPrompt.includes("form") ||
    lowerPrompt.includes("modal") ||
    lowerPrompt.includes("card") ||
    lowerPrompt.length < 100
  ) {
    return "simple-code"
  }

  return "general-chat"
}

export function getModelInfo(modelName: string): ModelCapabilities | undefined {
  return MODEL_CAPABILITIES.find((m) => m.name === modelName)
}

export function getAllModels(): ModelCapabilities[] {
  return MODEL_CAPABILITIES
}

export function getRecommendedModels(taskType: TaskType): ModelCapabilities[] {
  return MODEL_CAPABILITIES.filter((m) => m.bestFor.includes(taskType))
}