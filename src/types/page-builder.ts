// Page Builder Engine Types - Phase 3: Natural Language → Next.js/Tailwind Components

export interface PageBuilderConfig {
  defaultFramework: "nextjs" | "react"
  defaultStyling: "tailwind" | "css-modules"
  componentLibrary: "shadcn" | "radix" | "custom"
  outputDirectory: string
}

export interface ComponentSpec {
  name: string
  type: ComponentType
  description: string
  props: ComponentProp[]
  children?: ComponentSpec[]
  styling: StylingSpec
  imports: ImportSpec[]
  code?: string
}

export type ComponentType = 
  | "page"
  | "layout"
  | "section"
  | "component"
  | "form"
  | "table"
  | "card"
  | "modal"
  | "navigation"
  | "button"
  | "input"
  | "custom"

export interface ComponentProp {
  name: string
  type: string
  required: boolean
  defaultValue?: string
  description?: string
}

export interface StylingSpec {
  container?: string
  layout?: "flex" | "grid" | "block"
  spacing?: string
  colors?: ColorScheme
  responsive?: ResponsiveSpec
  animations?: AnimationSpec
}

export interface ColorScheme {
  primary?: string
  secondary?: string
  background?: string
  text?: string
  accent?: string
}

export interface ResponsiveSpec {
  mobile?: string
  tablet?: string
  desktop?: string
}

export interface AnimationSpec {
  enter?: string
  exit?: string
  hover?: string
}

export interface ImportSpec {
  source: string
  imports: string[]
  type: "default" | "named" | "namespace"
}

export interface GenerationRequest {
  prompt: string
  context?: GenerationContext
  options?: GenerationOptions
}

export interface GenerationContext {
  projectId?: string
  existingComponents?: ComponentSpec[]
  designSystem?: DesignSystemSpec
  repositoryFiles?: RepositoryFile[]
}

export interface DesignSystemSpec {
  colors: Record<string, string>
  spacing: Record<string, string>
  typography: Record<string, string>
  borderRadius: Record<string, string>
  shadows: Record<string, string>
}

export interface RepositoryFile {
  path: string
  content: string
  language: string
}

export interface GenerationOptions {
  model?: string
  temperature?: number
  maxTokens?: number
  includeTests?: boolean
  includeStorybook?: boolean
  strictMode?: boolean
   // Used by the Page Builder to associate generated assets with a specific project
   projectId?: string
}

export interface GenerationResponse {
  success: boolean
  components: ComponentSpec[]
  files: GeneratedFile[]
  errors?: string[]
  warnings?: string[]
  metadata: GenerationMetadata
}

export interface GeneratedFile {
  path: string
  content: string
  language: "tsx" | "ts" | "css" | "json" | "md"
}

export interface GenerationMetadata {
  modelUsed: string
  tokensUsed: number
  generationTimeMs: number
  timestamp: string
}

export interface PageBuilderState {
  currentProject: string | null
  generatedComponents: ComponentSpec[]
  previewMode: boolean
  selectedComponent: ComponentSpec | null
}