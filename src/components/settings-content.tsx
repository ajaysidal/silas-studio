"use client"

import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import { useState, useEffect } from "react"
import { GitHubRepositories } from "@/components/github-repositories"

export function SettingsContent() {
  const { data: session, update } = useSession()
  const [ollamaStatus, setOllamaStatus] = useState<"checking" | "connected" | "disconnected">("checking")
  const [availableModels, setAvailableModels] = useState<string[]>([])
  
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
  }
  
  useEffect(() => {
    checkOllamaConnection()
  }, [])
  
  const checkOllamaConnection = async () => {
    try {
      const response = await fetch("/api/ollama/status")
      if (response.ok) {
        const data = await response.json()
        setOllamaStatus(data.connected ? "connected" : "disconnected")
        setAvailableModels(data.models || [])
      } else {
        setOllamaStatus("disconnected")
      }
    } catch {
      setOllamaStatus("disconnected")
    }
  }
  
  const getStatusClass = () => {
    if (ollamaStatus === "connected") return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    if (ollamaStatus === "disconnected") return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
  }
  
  const getStatusText = () => {
    if (ollamaStatus === "connected") return "Connected"
    if (ollamaStatus === "disconnected") return "Disconnected"
    return "Checking..."
  }
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
      
      <section className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Profile</h2>
        <div className="flex items-center gap-4">
          {session?.user?.image && (
            <img src={session.user.image} alt="" className="w-16 h-16 rounded-full" />
          )}
          <div>
            <p className="text-lg font-medium text-gray-900 dark:text-white">{session?.user?.name}</p>
            <p className="text-gray-600 dark:text-gray-400">{session?.user?.email}</p>
          </div>
        </div>
      </section>
      
      <section className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">GitHub Integration</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Connect your GitHub account to access repositories, create branches, and open pull requests.
        </p>
        <GitHubRepositories />
      </section>
      
      <section className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
          Ollama (Local AI)
          <span className={"px-2 py-0.5 text-xs rounded-full " + getStatusClass()}>
            {getStatusText()}
          </span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Ollama runs locally on your machine - completely free, private, and no API keys needed.
        </p>
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-mono text-gray-600 dark:text-gray-300">Endpoint</span>
            <code className="text-sm font-mono text-blue-600 dark:text-blue-400">http://localhost:11434</code>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-mono text-gray-600 dark:text-gray-300">Available Models</span>
            <span className="text-sm text-gray-900 dark:text-white">{availableModels.length} installed</span>
          </div>
          {availableModels.length > 0 && (
            <details className="mt-2">
              <summary className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer">View Models</summary>
              <ul className="mt-2 space-y-1">
                {availableModels.map((model) => (
                  <li key={model} className="text-sm font-mono text-gray-700 dark:text-gray-300">{model}</li>
                ))}
              </ul>
            </details>
          )}
        </div>
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-medium text-blue-900 dark:text-blue-300 mb-2">Recommended Models</h3>
          <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
            <li><code>qwen2.5-coder:7b</code> - Best balance (4.7GB, ~6GB RAM)</li>
            <li><code>qwen2.5-coder:14b</code> - Higher quality (9GB, ~11GB RAM)</li>
            <li><code>deepseek-coder-v2:16b</code> - Strong reasoning (9GB)</li>
            <li>Install with: <code>ollama pull qwen2.5-coder:7b</code></li>
          </ul>
        </div>
        <button
          onClick={checkOllamaConnection}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Refresh Connection
        </button>
      </section>
      
      <section className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Danger Zone</h2>
            <p className="text-gray-600 dark:text-gray-400">Sign out of your account</p>
          </div>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </section>
    </div>
  )
}