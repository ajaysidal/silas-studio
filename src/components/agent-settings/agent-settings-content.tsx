"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { selectModelForTask, getAllModels, type ModelCapabilities, type TaskType } from "@/lib/model-router"

interface AgentSettings {
  defaultModel: string
  temperature: number
  maxTokens: number
  systemPrompt: string
  multiModelRouting: boolean
  taskModelOverrides: Record<TaskType, string>
}

const DEFAULT_SETTINGS: AgentSettings = {
  defaultModel: "qwen2.5-coder:14b",
  temperature: 0.2,
  maxTokens: 8192,
  systemPrompt: "You are a helpful coding assistant specialized in modern web development, 3D graphics, and software architecture.",
  multiModelRouting: true,
  taskModelOverrides: {
    "simple-code": "qwen2.5-coder:7b",
    "complex-code": "qwen2.5-coder:14b",
    "debugging": "deepseek-coder-v2:16b",
    "architecture": "llama3.1:70b",
    "refactoring": "codellama:34b",
    "documentation": "llama3.1:70b",
    "testing": "codellama:34b",
    "general-chat": "qwen2.5-coder:7b",
  },
}

const TASK_LABELS: Record<TaskType, string> = {
  "simple-code": "Simple Code Generation",
  "complex-code": "Complex Code Generation",
  "debugging": "Debugging & Error Fixing",
  "architecture": "System Architecture",
  "refactoring": "Code Refactoring",
  "documentation": "Documentation",
  "testing": "Test Generation",
  "general-chat": "General Chat",
}

const TASK_DESCRIPTIONS: Record<TaskType, string> = {
  "simple-code": "Buttons, forms, hooks, small components",
  "complex-code": "Full dashboards, applications, auth systems",
  "debugging": "Fix errors, resolve bugs, troubleshoot",
  "architecture": "System design, scalability, infrastructure",
  "refactoring": "Optimize, restructure, improve code quality",
  "documentation": "README, comments, API docs, explanations",
  "testing": "Unit tests, integration tests, E2E tests",
  "general-chat": "Questions, explanations, general assistance",
}

export function AgentSettingsContent() {
  const { data: _session } = useSession()
  const [settings, setSettings] = useState<AgentSettings>(DEFAULT_SETTINGS)
  const [availableModels, setAvailableModels] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [modelCapabilities, setModelCapabilities] = useState<ModelCapabilities[]>([])

  // Fetch available models and load saved settings
  useEffect(() => {
    let mounted = true
    const loadSettings = async () => {
      try {
        // Set model capabilities immediately (synchronous)
        if (mounted) {
          setModelCapabilities(getAllModels())
        }

        // Fetch available models from Ollama
        const modelsRes = await fetch("/api/ollama/status")
        if (modelsRes.ok) {
          const data = await modelsRes.json()
          if (mounted) {
            setAvailableModels(data.models || [])
          }
        }

        // Load saved settings from API
        const settingsRes = await fetch("/api/agent-settings")
        if (settingsRes.ok) {
          const data = await settingsRes.json()
          if (mounted && data && Object.keys(data).length > 0) {
            setSettings((prev) => ({ ...prev, ...data }))
          }
        }
      } catch (error) {
        console.error("Failed to load settings:", error)
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    loadSettings()
    return () => { mounted = false }
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    setMessage(null)

    try {
      const res = await fetch("/api/agent-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Failed to save settings")
      }

      setMessage({ type: "success", text: "Settings saved successfully" })
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Failed to save settings" })
    } finally {
      setIsSaving(false)
    }
  }

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS)
    setMessage({ type: "success", text: "Settings reset to defaults" })
  }

  const handleModelChange = (model: string) => {
    setSettings((prev) => ({ ...prev, defaultModel: model }))
  }

  const handleTaskModelChange = (task: TaskType, model: string) => {
    setSettings((prev) => ({
      ...prev,
      taskModelOverrides: { ...prev.taskModelOverrides, [task]: model },
    }))
  }

  const handleTemperatureChange = (value: number) => {
    setSettings((prev) => ({ ...prev, temperature: value }))
  }

  const handleMaxTokensChange = (value: number) => {
    setSettings((prev) => ({ ...prev, maxTokens: value }))
  }

  const handleSystemPromptChange = (value: string) => {
    setSettings((prev) => ({ ...prev, systemPrompt: value }))
  }

  const handleMultiModelRoutingChange = (enabled: boolean) => {
    setSettings((prev) => ({ ...prev, multiModelRouting: enabled }))
  }

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center py-12">Loading settings...</div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Agent Settings</h1>
      <p className="text-gray-600 dark:text-gray-400">
        Configure AI agent behavior, model preferences, and multi-model routing
      </p>

      {message && (
        <div className={`p-4 rounded-lg ${message.type === "success" ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200" : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200"}`}>
          {message.text}
        </div>
      )}

      {/* Default Model */}
      <section className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Default Model</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          The model used when multi-model routing is disabled or for tasks without specific overrides.
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Default Model
            </label>
            <select
              value={settings.defaultModel}
              onChange={(e) => handleModelChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {availableModels.length > 0 ? availableModels.map((m) => (
                <option key={m} value={m}>
                  {m} {modelCapabilities.find(c => c.name === m) && `(${modelCapabilities.find(c => c.name === m)!.size}, ${modelCapabilities.find(c => c.name === m)!.quality})`}
                </option>
              )) : (
                <option value="qwen2.5-coder:7b">qwen2.5-coder:7b (Fast)</option>
              )}
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Temperature
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={settings.temperature}
                  onChange={(e) => handleTemperatureChange(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm font-mono text-gray-900 dark:text-white w-12">
                  {settings.temperature.toFixed(1)}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Lower = more deterministic, Higher = more creative
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Max Tokens
              </label>
              <input
                type="number"
                value={settings.maxTokens}
                onChange={(e) => handleMaxTokensChange(Number(e.target.value))}
                min="1024"
                max="32768"
                step="1024"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Maximum response length (1024-32768)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* System Prompt */}
      <section className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">System Prompt</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          The base instructions given to the AI before each conversation.
        </p>
        <textarea
          value={settings.systemPrompt}
          onChange={(e) => handleSystemPromptChange(e.target.value)}
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y font-mono text-sm"
          placeholder="Enter system prompt..."
        />
      </section>

      {/* Multi-Model Routing */}
      <section className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Multi-Model Routing</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Automatically select the best model based on task type
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.multiModelRouting}
              onChange={(e) => handleMultiModelRoutingChange(e.target.checked)}
              className="sr-only peer"
            />
            <div className={`w-11 h-6 rounded-full peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 ${settings.multiModelRouting ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"}`} />
          </label>
        </div>

        {settings.multiModelRouting && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Configure which model to use for each task type. The agent will automatically detect the task type and route to the appropriate model.
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {(Object.keys(settings.taskModelOverrides) as TaskType[]).map((task) => (
                <div key={task} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">{TASK_LABELS[task]}</h4>
                    <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                      {modelCapabilities.find(m => m.name === settings.taskModelOverrides[task])?.size || "?"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{TASK_DESCRIPTIONS[task]}</p>
                  <select
                    value={settings.taskModelOverrides[task]}
                    onChange={(e) => handleTaskModelChange(task, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  >
                    {availableModels.length > 0 ? availableModels.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    )) : (
                      <>
                        <option value="qwen2.5-coder:7b">qwen2.5-coder:7b</option>
                        <option value="qwen2.5-coder:14b">qwen2.5-coder:14b</option>
                        <option value="deepseek-coder-v2:16b">deepseek-coder-v2:16b</option>
                        <option value="codellama:34b">codellama:34b</option>
                        <option value="llama3.1:70b">llama3.1:70b</option>
                      </>
                    )}
                  </select>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" onClick={() => {
                // Auto-detect best models for available models
                const newOverrides: Record<TaskType, string> = {} as Record<TaskType, string>
                ;(Object.keys(settings.taskModelOverrides) as TaskType[]).forEach((task) => {
                  newOverrides[task] = selectModelForTask(task, availableModels.length > 0 ? availableModels : ["qwen2.5-coder:7b"])
                })
                setSettings((prev) => ({ ...prev, taskModelOverrides: newOverrides }))
                setMessage({ type: "success", text: "Models auto-configured based on availability" })
              }}>
                Auto-Configure Models
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* Model Capabilities Reference */}
      <section className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Model Capabilities Reference</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left p-3 font-medium text-gray-600 dark:text-gray-400">Model</th>
                <th className="text-left p-3 font-medium text-gray-600 dark:text-gray-400">Size</th>
                <th className="text-left p-3 font-medium text-gray-600 dark:text-gray-400">RAM</th>
                <th className="text-left p-3 font-medium text-gray-600 dark:text-gray-400">Speed</th>
                <th className="text-left p-3 font-medium text-gray-600 dark:text-gray-400">Quality</th>
                <th className="text-left p-3 font-medium text-gray-600 dark:text-gray-400">Best For</th>
                <th className="text-left p-3 font-medium text-gray-600 dark:text-gray-400">Available</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {modelCapabilities.map((model) => (
                <tr key={model.name} className={availableModels.includes(model.name) ? "" : "opacity-50"}>
                  <td className="p-3 font-mono text-gray-900 dark:text-white">{model.name}</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">{model.size}</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">{model.ramRequired}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 text-xs rounded ${
                      model.speed === "fast" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" :
                      model.speed === "medium" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" :
                      "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    }`}>
                      {model.speed}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 text-xs rounded ${
                      model.quality === "best" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" :
                      model.quality === "better" ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" :
                      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
                    }`}>
                      {model.quality}
                    </span>
                  </td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">
                    {model.bestFor.join(", ")}
                  </td>
                  <td className="p-3">
                    {availableModels.includes(model.name) ? (
                      <span className="text-green-600 dark:text-green-400">✓ Installed</span>
                    ) : (
                      <span className="text-gray-400 dark:text-gray-500">Not installed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={handleReset}>
          Reset to Defaults
        </Button>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  )
}