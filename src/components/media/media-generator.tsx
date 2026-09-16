"use client"

import { useState, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"

interface GenerationJob {
  jobId: string
  status: "queued" | "processing" | "completed" | "failed"
  progress: number
  type: string
  prompt: string
  model: string
  result?: { url: string; thumbnailUrl: string }
  error?: string
  createdAt: string
  completedAt?: string
}

const DEFAULT_MODELS = {
  image: "SDXL",
  video: "SVD",
  "3d": "TripoSR",
  audio: "AudioLDM",
} as const

export function MediaGenerator() {
  const [prompt, setPrompt] = useState("")
  const [type, setType] = useState<"image" | "video" | "3d" | "audio">("image")
  const [model, setModel] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [jobs, setJobs] = useState<GenerationJob[]>([])
  const [error, setError] = useState<string | null>(null)

  const defaultModels = useMemo(() => DEFAULT_MODELS, [])

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt")
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const res = await fetch("/api/media/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          type,
          model: model || defaultModels[type],
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Failed to start generation")
      }

      const job = await res.json()
      setJobs((prev) => [job, ...prev])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start generation")
    } finally {
      setIsGenerating(false)
    }
  }, [prompt, type, model, defaultModels])

  // Poll for job updates
  // In a real app, you'd use WebSockets or Server-Sent Events

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-white dark:bg-gray-900">
      <header className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Generative Media</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Generate images, videos, 3D models, and audio with AI
            </p>
          </div>
        </div>
      </header>

      {error && (
        <div className="mx-4 mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      <main className="flex-1 overflow-auto p-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">
          {/* Generation Form */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Generate</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Media Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["image", "video", "3d", "audio"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          setType(t)
                          setModel(defaultModels[t])
                        }}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                          type === t
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                            : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                        }`}
                      >
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Model
                  </label>
                  <select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {type === "image" && (
                      <>
                        <option value="SDXL">SDXL (Stable Diffusion XL)</option>
                        <option value="SD3">Stable Diffusion 3</option>
                        <option value="Flux">Flux.1</option>
                        <option value="Midjourney">Midjourney v6 (via API)</option>
                      </>
                    )}
                    {type === "video" && (
                      <>
                        <option value="SVD">Stable Video Diffusion</option>
                        <option value="Gen-2">Runway Gen-2</option>
                        <option value="Pika">Pika Labs</option>
                        <option value="Luma">Luma Dream Machine</option>
                      </>
                    )}
                    {type === "3d" && (
                      <>
                        <option value="TripoSR">TripoSR</option>
                        <option value="LRM">Large Reconstruction Model</option>
                        <option value="TRELLIS">TRELLIS</option>
                      </>
                    )}
                    {type === "audio" && (
                      <>
                        <option value="AudioLDM">AudioLDM</option>
                        <option value="MusicGen">MusicGen</option>
                        <option value="AudioGen">AudioGen</option>
                        <option value="StableAudio">Stable Audio</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Prompt
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={4}
                    placeholder="Describe what you want to generate..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full"
                  size="lg"
                >
                  {isGenerating ? "Generating..." : `Generate ${type.charAt(0).toUpperCase() + type.slice(1)}`}
                </Button>

                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Note: Requires local ComfyUI/SD WebUI or cloud API keys (Replicate, Fal.ai)
                </p>
              </div>
            </div>
          </div>

          {/* Jobs History */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Generation History</h3>
              </div>
              <div className="p-4">
                {jobs.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🎨</div>
                    <p className="text-gray-600 dark:text-gray-400">No generations yet</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Enter a prompt and click Generate to start
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {jobs.map((job) => (
                      <div
                        key={job.jobId}
                        className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                                {job.type.toUpperCase()}
                              </span>
                              <span className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                                {job.model}
                              </span>
                              <span className={`px-2 py-0.5 text-xs rounded ${
                                job.status === "completed" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" :
                                job.status === "processing" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" :
                                job.status === "failed" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" :
                                "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                              }`}>
                                {job.status}
                              </span>
                            </div>
                            <p className="text-gray-900 dark:text-white mb-2">{job.prompt}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Created: {new Date(job.createdAt).toLocaleString()}
                            </p>
                          </div>

                          {job.status === "completed" && job.result && (
                            <div className="flex items-center gap-2">
                              {job.type === "image" && (
                                <img
                                  src={job.result.thumbnailUrl}
                                  alt={job.prompt}
                                  className="w-20 h-20 object-cover rounded-lg"
                                />
                              )}
                              {job.type !== "image" && (
                                <div className="w-20 h-20 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
                                  <span className="text-3xl">{job.type === "video" ? "🎬" : job.type === "3d" ? "📦" : "🔊"}</span>
                                </div>
                              )}
                              <Button variant="outline" size="sm" onClick={() => window.open(job.result!.url, "_blank")}>
                                View
                              </Button>
                            </div>
                          )}

                          {job.status === "processing" && (
                            <div className="w-48">
                              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-blue-600 transition-all duration-300"
                                  style={{ width: `${job.progress}%` }}
                                />
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 text-right mt-1">{job.progress}%</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}