// Page Builder UI - Phase 3: Natural Language → Component Generator

"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"

interface GeneratedComponent {
  name: string
  type: string
  description: string
  code: string
  path: string
}

interface GenerationResult {
  success: boolean
  components: GeneratedComponent[]
  files: { path: string; content: string }[]
  errors?: string[]
  warnings?: string[]
  metadata?: {
    modelUsed: string
    tokensUsed: number
    generationTimeMs: number
  }
}

const EXAMPLE_PROMPTS = [
  "Create a responsive dashboard layout with sidebar navigation, header with user menu, and main content area",
  "Build a contact form with name, email, subject, and message fields with validation",
  "Generate a data table component with sorting, pagination, and row selection",
  "Create a modal dialog with confirm/cancel actions and keyboard accessibility",
  "Build a pricing card component with tier comparison and CTA button",
  "Generate a settings page layout with tabs for profile, notifications, and billing",
]

export function PageBuilderInterface() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<GenerationResult | null>(null)
  const [selectedTab, setSelectedTab] = useState<"preview" | "code" | "files">("preview")
  const [selectedComponent, setSelectedComponent] = useState<GeneratedComponent | null>(null)
  const [model, setModel] = useState("qwen2.5-coder:14b")
  const [includeTests, setIncludeTests] = useState(false)
  const [includeStorybook, setIncludeStorybook] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return

    setIsGenerating(true)
    setResult(null)

    try {
      const response = await fetch("/api/page-builder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          options: {
            model,
            includeTests,
            includeStorybook,
            temperature: 0.2,
            maxTokens: 8192,
          },
        }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Generation error:", error)
      setResult({
        success: false,
        components: [],
        files: [],
        errors: [error instanceof Error ? error.message : "Generation failed"],
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleExampleClick = (example: string) => {
    setPrompt(example)
  }

  const handleTabChange = (tab: "preview" | "code" | "files") => {
    setSelectedTab(tab)
  }

  const handleComponentSelect = (comp: GeneratedComponent) => {
    setSelectedComponent(comp)
    setSelectedTab("code")
  }

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
    // TODO: Show toast notification
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Page Builder Engine</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Convert natural language to production-ready Next.js/Tailwind components
            </p>
          </div>
          
          <div className="flex items-center gap-3 flex-wrap">
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white min-w-[220px]"
            >
              <option value="qwen2.5-coder:7b">Qwen 2.5 Coder 7B (Fast)</option>
              <option value="qwen2.5-coder:14b">Qwen 2.5 Coder 14B (Balanced)</option>
              <option value="deepseek-coder-v2:16b">DeepSeek Coder V2 16B</option>
              <option value="codellama:34b">CodeLlama 34B</option>
              <option value="llama3.1:70b">Llama 3.1 70B (Best Quality)</option>
            </select>
            
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={includeTests}
                  onChange={(e) => setIncludeTests(e.target.checked)}
                  className="rounded border-gray-300"
                />
                Tests
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={includeStorybook}
                  onChange={(e) => setIncludeStorybook(e.target.checked)}
                  className="rounded border-gray-300"
                />
                Storybook
              </label>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <div className="flex h-full max-w-7xl mx-auto w-full">
          {/* Left Panel - Input & Examples */}
          <div className="w-full lg:w-1/2 border-r border-gray-200 dark:border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Describe the component you want to build
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Create a responsive dashboard with sidebar navigation, user avatar dropdown, and a main content area with stats cards..."
                className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                disabled={isGenerating}
              />
            </div>

            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-900 dark:text-white">Example Prompts</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {EXAMPLE_PROMPTS.map((example, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    onClick={() => handleExampleClick(example)}
                    disabled={isGenerating}
                    className="whitespace-nowrap"
                  >
                    {example.slice(0, 30)}...
                  </Button>
                ))}
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-end">
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                size="lg"
                className="w-full"
              >
                {isGenerating ? "Generating..." : "Generate Component"}
              </Button>
              
              {result?.metadata && (
                <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 space-y-1">
                  <p>Model: {result.metadata.modelUsed}</p>
                  <p>Tokens: {result.metadata.tokensUsed}</p>
                  <p>Time: {result.metadata.generationTimeMs}ms</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="w-full lg:w-1/2 flex flex-col">
            {result ? (
              <>
                {/* Tabs */}
                <div className="border-b border-gray-200 dark:border-gray-700">
                  <nav className="flex -mb-px" aria-label="Tabs">
                    {[
                      { id: "preview" as const, label: "Preview", count: result.components.length },
                      { id: "code" as const, label: "Code", count: result.components.length },
                      { id: "files" as const, label: "Files", count: result.files.length },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                          selectedTab === tab.id
                            ? "border-blue-600 text-blue-600 dark:text-blue-400"
                            : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        }`}
                      >
                        {tab.label} <span className="ml-1 px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 rounded-full">{tab.count}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Error/Warning Display */}
                {(result.errors && result.errors.length > 0) && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800">
                    <div className="text-sm text-red-800 dark:text-red-200">
                      <strong>Errors:</strong>
                      <ul className="mt-1 list-disc list-inside space-y-1">
                        {result.errors.map((err, i) => <li key={i}>{err}</li>)}
                      </ul>
                    </div>
                  </div>
                )}

                {(result.warnings && result.warnings.length > 0) && (
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800">
                    <div className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>Warnings:</strong>
                      <ul className="mt-1 list-disc list-inside space-y-1">
                        {result.warnings.map((warn, i) => <li key={i}>{warn}</li>)}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Tab Panels */}
                <div className="flex-1 overflow-auto">
                  {selectedTab === "preview" && (
                    <div className="p-4" ref={previewRef}>
                      {result.components.length === 0 ? (
                        <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                          No components generated
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {result.components.map((comp, i) => (
                            <div
                              key={i}
                              onClick={() => handleComponentSelect(comp)}
                              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 cursor-pointer transition-colors bg-white dark:bg-gray-800"
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-medium text-gray-900 dark:text-white">{comp.name}</h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{comp.description}</p>
                                  <span className="inline-block mt-2 px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                                    {comp.type}
                                  </span>
                                </div>
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {selectedTab === "code" && (
                    <div className="p-4">
                      {selectedComponent ? (
                        <div className="flex flex-col h-full">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-gray-900 dark:text-white">{selectedComponent.name}</h4>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(selectedComponent.code)}
                            >
                              Copy Code
                            </Button>
                          </div>
                          <div className="flex-1 overflow-auto bg-gray-950 rounded-lg p-4">
                            <pre className="text-sm text-gray-100 overflow-x-auto"><code>{selectedComponent.code}</code></pre>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                          Click a component in Preview tab to view code
                        </div>
                      )}
                    </div>
                  )}

                  {selectedTab === "files" && (
                    <div className="p-4">
                      {result.files.length === 0 ? (
                        <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                          No files generated
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {result.files.map((file, i) => (
                            <div key={i} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                              <div className="flex items-center justify-between mb-2">
                                <code className="text-sm text-gray-900 dark:text-white font-mono">{file.path}</code>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => copyToClipboard(file.content)}
                                >
                                  Copy
                                </Button>
                              </div>
                              <pre className="text-xs text-gray-600 dark:text-gray-400 overflow-x-auto max-h-48"><code>{file.content.slice(0, 500)}{file.content.length > 500 ? "..." : ""}</code></pre>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  <p className="text-lg">Enter a prompt and click Generate</p>
                  <p className="text-sm mt-1">Your Next.js/Tailwind component will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}