// Page Builder Engine - Core Generation Logic

import { callOllama } from "@/lib/ollama-client"
import type { 
  GenerationRequest, 
  GenerationResponse, 
  ComponentSpec, 
  DesignSystemSpec 
} from "@/types/page-builder"
import { buildGenerationPrompt } from "./prompts"
import { parseGenerationResponse, validateComponentSpec } from "./parser"
import { extractFilesFromComponents } from "./file-extractor"

const DEFAULT_MODEL = "qwen2.5-coder:14b"
const GENERATION_TEMPERATURE = 0.2
const GENERATION_MAX_TOKENS = 8192

export class PageBuilderEngine {
  private designSystem: DesignSystemSpec | null = null
  private componentRegistry: Map<string, ComponentSpec> = new Map()

  constructor(private projectId?: string) {}

  async generate(request: GenerationRequest): Promise<GenerationResponse> {
    const startTime = Date.now()
    
    try {
      // Build the complete prompt with context
      const prompt = buildGenerationPrompt({
        ...request,
        context: {
          ...request.context,
          projectId: this.projectId,
          designSystem: this.designSystem || request.context?.designSystem,
        },
      })

      // Call Ollama for generation
      const response = await callOllama(
        [{ role: "system", content: prompt }],
        {
          model: request.options?.model || DEFAULT_MODEL,
          temperature: request.options?.temperature ?? GENERATION_TEMPERATURE,
          maxTokens: request.options?.maxTokens ?? GENERATION_MAX_TOKENS,
          stream: false,
        }
      )

      // Parse and validate the response
      const parsed = parseGenerationResponse(response.message.content)
      
      // Validate each component
      const validatedComponents = parsed.components.map(comp => {
        const validated = validateComponentSpec(comp)
        this.componentRegistry.set(validated.name, validated)
        return validated
      })

      // Extract individual files from components
      const files = extractFilesFromComponents(validatedComponents, request.options)

      const generationTimeMs = Date.now() - startTime

      return {
        success: true,
        components: validatedComponents,
        files,
        warnings: parsed.warnings,
        metadata: {
          modelUsed: response.model,
          tokensUsed: response.eval_count || 0,
          generationTimeMs,
          timestamp: new Date().toISOString(),
        },
      }
    } catch (error) {
      return {
        success: false,
        components: [],
        files: [],
        errors: [error instanceof Error ? error.message : "Generation failed"],
        metadata: {
          modelUsed: DEFAULT_MODEL,
          tokensUsed: 0,
          generationTimeMs: Date.now() - startTime,
          timestamp: new Date().toISOString(),
        },
      }
    }
  }

  async refineComponent(componentName: string, _feedback: string): Promise<ComponentSpec | null> {
    const component = this.componentRegistry.get(componentName)
    if (!component) return null

    // TODO: Implement refinement using COMPONENT_REFINEMENT_PROMPT
    // For now, return the original
    return component
  }

  setDesignSystem(designSystem: DesignSystemSpec): void {
    this.designSystem = designSystem
  }

  getDesignSystem(): DesignSystemSpec | null {
    return this.designSystem
  }

  getComponent(name: string): ComponentSpec | undefined {
    return this.componentRegistry.get(name)
  }

  getAllComponents(): ComponentSpec[] {
    return Array.from(this.componentRegistry.values())
  }

  clearRegistry(): void {
    this.componentRegistry.clear()
  }
}

// Singleton instance for the project
let engineInstance: PageBuilderEngine | null = null

export function getPageBuilderEngine(projectId?: string): PageBuilderEngine {
  if (!engineInstance) {
    engineInstance = new PageBuilderEngine(projectId)
  }
  return engineInstance
}

export function resetPageBuilderEngine(): void {
  engineInstance = null
}