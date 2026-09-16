// Page Builder Engine - Response Parsing & Validation

import type { 
  GenerationResponse, 
  ComponentSpec, 
  ComponentProp,
  StylingSpec,
  ImportSpec,
  GeneratedFile 
} from "@/types/page-builder"

// Raw types for parsing untrusted JSON input
interface RawComponent {
  name?: unknown
  type?: unknown
  description?: unknown
  props?: RawProp[]
  children?: RawComponent[]
  styling?: unknown
  imports?: RawImport[]
  code?: unknown
}

interface RawProp {
  name?: unknown
  type?: unknown
  required?: unknown
  defaultValue?: unknown
  description?: unknown
}

interface RawImport {
  source?: unknown
  imports?: unknown
  type?: unknown
}

interface RawFile {
  path?: unknown
  content?: unknown
  language?: unknown
}

export function parseGenerationResponse(content: string): GenerationResponse {
  // Try to extract JSON from the response
  let jsonStr = content.trim()
  
  // Handle markdown code blocks
  const codeBlockMatch = jsonStr.match(/```(?:json)?\n([\s\S]*?)\n```/)
  if (codeBlockMatch) {
    jsonStr = codeBlockMatch[1].trim()
  }
  
  // Handle potential leading/trailing text
  const firstBrace = jsonStr.indexOf("{")
  const lastBrace = jsonStr.lastIndexOf("}")
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    jsonStr = jsonStr.slice(firstBrace, lastBrace + 1)
  }

  try {
    const parsed = JSON.parse(jsonStr)
    
    // Validate required fields
    if (!parsed.components || !Array.isArray(parsed.components)) {
      throw new Error("Missing or invalid 'components' array")
    }
    
    if (!parsed.files || !Array.isArray(parsed.files)) {
      throw new Error("Missing or invalid 'files' array")
    }

    return {
      success: parsed.success ?? true,
      components: (parsed.components as RawComponent[]).map(validateComponentSpec),
      files: (parsed.files as RawFile[]).map(validateGeneratedFile),
      errors: parsed.errors,
      warnings: parsed.warnings,
      metadata: parsed.metadata || {
        modelUsed: "unknown",
        tokensUsed: 0,
        generationTimeMs: 0,
        timestamp: new Date().toISOString(),
      },
    }
  } catch (error) {
    throw new Error(`Failed to parse generation response: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export function validateComponentSpec(comp: RawComponent): ComponentSpec {
  const errors: string[] = []
  
  // Required fields
  if (!comp.name || typeof comp.name !== "string") {
    errors.push("Component missing required 'name' (string)")
  }
  
  if (!comp.type || !isValidComponentType(String(comp.type))) {
    errors.push(`Component missing or invalid 'type': ${comp.type}`)
  }
  
  if (!comp.description || typeof comp.description !== "string") {
    errors.push("Component missing required 'description' (string)")
  }

  // Props validation
  const props: ComponentProp[] = ((comp.props as RawProp[]) || []).map((p: RawProp, i: number) => {
    const propErrors: string[] = []
    if (!p.name || typeof p.name !== "string") propErrors.push(`Prop ${i}: missing 'name'`)
    if (!p.type || typeof p.type !== "string") propErrors.push(`Prop ${p.name || i}: missing 'type'`)
    if (typeof p.required !== "boolean") propErrors.push(`Prop ${p.name || i}: 'required' must be boolean`)
    
    if (propErrors.length > 0) errors.push(...propErrors)
    
    return {
      name: (p.name as string) || `prop${i}`,
      type: (p.type as string) || "any",
      required: (p.required as boolean) ?? false,
      defaultValue: p.defaultValue as string | undefined,
      description: p.description as string | undefined,
    }
  })

  // Styling validation
  const styling: StylingSpec = comp.styling || {}
  if (styling.layout && !["flex", "grid", "block"].includes(styling.layout)) {
    errors.push(`Invalid layout type: ${styling.layout}`)
  }

  // Imports validation
  const imports: ImportSpec[] = ((comp.imports as RawImport[]) || []).map((imp: RawImport, i: number) => {
    if (!imp.source || !imp.imports || !Array.isArray(imp.imports)) {
      errors.push(`Import ${i}: invalid structure`)
      return { source: "", imports: [], type: "named" as const }
    }
    return {
      source: imp.source as string,
      imports: imp.imports as string[],
      type: (imp.type as "default" | "named" | "namespace") || "named",
    }
  })

  // Children validation
  const children: ComponentSpec[] = ((comp.children as RawComponent[]) || []).map((child: RawComponent) => 
    validateComponentSpec(child)
  )

  if (errors.length > 0) {
    console.warn(`Component validation warnings for ${comp.name || "unknown"}:`, errors)
  }

  return {
    name: (comp.name as string) || "UnnamedComponent",
    type: (comp.type as ComponentSpec["type"]) || "component",
    description: (comp.description as string) || "",
    props,
    children: children.length > 0 ? children : undefined,
    styling,
    imports,
    code: comp.code as string | undefined,
  }
}

function isValidComponentType(type: string): boolean {
  const validTypes = [
    "page", "layout", "section", "component", "form", 
    "table", "card", "modal", "navigation", "button", "input", "custom"
  ]
  return validTypes.includes(type)
}

function validateGeneratedFile(file: RawFile): GeneratedFile {
  return {
    path: file.path as string || "unknown.tsx",
    content: file.content as string || "",
    language: file.language as "tsx" | "ts" | "css" | "json" | "md" || "tsx",
  }
}

export function validateGenerationResponse(response: GenerationResponse): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (!response.success && (!response.errors || response.errors.length === 0)) {
    errors.push("Failed response must include errors array")
  }
  
  if (!Array.isArray(response.components)) {
    errors.push("Components must be an array")
  }
  
  if (!Array.isArray(response.files)) {
    errors.push("Files must be an array")
  }
  
  if (!response.metadata) {
    errors.push("Missing metadata")
  } else {
    if (!response.metadata.modelUsed) errors.push("Metadata missing modelUsed")
    if (typeof response.metadata.tokensUsed !== "number") errors.push("Metadata tokensUsed must be number")
    if (typeof response.metadata.generationTimeMs !== "number") errors.push("Metadata generationTimeMs must be number")
    if (!response.metadata.timestamp) errors.push("Metadata missing timestamp")
  }

  return { valid: errors.length === 0, errors }
}