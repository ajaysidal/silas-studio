"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"

interface VercelProject {
  id: string
  name: string
  framework: string | null
  gitRepository: {
    url: string
    type: string
  } | null
  latestDeployments: VercelDeployment[]
  createdAt: string
  updatedAt: string
}

interface VercelDeployment {
  uid: string
  name: string
  url: string
  state: "READY" | "BUILDING" | "ERROR" | "CANCELED" | "INITIALIZING" | "QUEUED"
  createdAt: number
  updatedAt: number
  creator: {
    email: string
  }
  meta: {
    githubCommitSha?: string
    githubCommitMessage?: string
    githubCommitRef?: string
  }
  target: string
}

interface DeploymentLog {
  timestamp: number
  message: string
  level: "info" | "error" | "warning"
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function getStateColor(state: string): string {
  switch (state) {
    case "READY": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "BUILDING": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "ERROR": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    case "CANCELED": return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    case "INITIALIZING": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "QUEUED": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    default: return "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300"
  }
}

export function DeploymentConsole() {
  const [projects, setProjects] = useState<VercelProject[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<VercelProject | null>(null)
  const [deployments, setDeployments] = useState<VercelDeployment[]>([])
  const [logs, setLogs] = useState<DeploymentLog[]>([])
  const [selectedDeployment, setSelectedDeployment] = useState<VercelDeployment | null>(null)
  const [isLoadingDeployments, setIsLoadingDeployments] = useState(false)
  const [isLoadingLogs, setIsLoadingLogs] = useState(false)

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/deployment?action=projects")
      if (!res.ok) {
        if (res.status === 400) throw new Error("Vercel not connected. Add VERCEL_TOKEN to environment.")
        throw new Error("Failed to fetch projects")
      }
      const data = await res.json()
      setProjects(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch projects")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    let mounted = true
    const loadProjects = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const res = await fetch("/api/deployment?action=projects")
        if (!res.ok) {
          if (res.status === 400) throw new Error("Vercel not connected. Add VERCEL_TOKEN to environment.")
          throw new Error("Failed to fetch projects")
        }
        const data = await res.json()
        if (mounted) {
          setProjects(data)
          setError(null)
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to fetch projects")
        }
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }
    loadProjects()
    return () => { mounted = false }
  }, [])

  const handleProjectSelect = async (project: VercelProject) => {
    setSelectedProject(project)
    setDeployments([])
    setLogs([])
    setSelectedDeployment(null)
    await fetchDeployments(project.id)
  }

  const fetchDeployments = async (projectId: string) => {
    setIsLoadingDeployments(true)
    try {
      const res = await fetch(`/api/deployment?action=deployments&projectId=${projectId}`)
      if (!res.ok) throw new Error("Failed to fetch deployments")
      const data = await res.json()
      setDeployments(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch deployments")
    } finally {
      setIsLoadingDeployments(false)
    }
  }

  const fetchLogs = async (deploymentId: string) => {
    setSelectedDeployment(deployments.find(d => d.uid === deploymentId) || null)
    setIsLoadingLogs(true)
    setLogs([])
    try {
      const res = await fetch(`/api/deployment?action=logs&deploymentId=${deploymentId}`)
      if (!res.ok) throw new Error("Failed to fetch logs")
      const data = await res.json()
      setLogs(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch logs")
    } finally {
      setIsLoadingLogs(false)
    }
  }

  const handleRedeploy = async (deploymentId: string) => {
    try {
      const res = await fetch("/api/deployment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "redeploy", deploymentId }),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Failed to redeploy")
      }
      if (selectedProject) await fetchDeployments(selectedProject.id)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to redeploy")
    }
  }

  const handleCreateDeployment = async () => {
    if (!selectedProject) return
    try {
      const res = await fetch("/api/deployment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "createDeployment", name: selectedProject.name, target: "production" }),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Failed to create deployment")
      }
      await fetchDeployments(selectedProject.id)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create deployment")
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Deployment Console</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Monitor Vercel deployments, view logs, and trigger redeploys
            </p>
          </div>
          <div className="flex items-center gap-3">
            {selectedProject && (
              <Button onClick={handleCreateDeployment} disabled={isLoadingDeployments}>
                New Deployment
              </Button>
            )}
            <Button variant="outline" onClick={fetchProjects} disabled={isLoading}>
              Refresh Projects
            </Button>
          </div>
        </div>
      </header>

      {/* Error Display */}
      {error && (
        <div className="mx-4 mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      <main className="flex-1 overflow-auto p-4">
        {/* Project List */}
        {isLoading ? (
          <div className="text-center py-12">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚀</div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">No Vercel projects connected</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Add VERCEL_TOKEN to your environment variables to connect
            </p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Vercel Projects {projects.length > 0 && `(${projects.length})`}
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => handleProjectSelect(project)}
                  className={`p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer transition-all hover:shadow-lg ${
                    selectedProject?.id === project.id
                      ? "ring-2 ring-blue-500 border-blue-500"
                      : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white truncate pr-2">
                      {project.name}
                    </h4>
                    {project.framework && (
                      <span className="px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                        {project.framework}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate mb-2">
                    {project.gitRepository?.url || "No Git repository linked"}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Updated: {formatDate(new Date(project.updatedAt).getTime())}</span>
                    {project.latestDeployments.length > 0 && (
                      <span className={`px-2 py-0.5 rounded ${getStateColor(project.latestDeployments[0].state)}`}>
                        {project.latestDeployments[0].state}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deployments List */}
        {selectedProject && (
          <div className="max-w-7xl mx-auto mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Deployments for {selectedProject.name}
              </h3>
              <Button variant="outline" size="sm" onClick={() => fetchDeployments(selectedProject.id)} disabled={isLoadingDeployments}>
                Refresh
              </Button>
            </div>

            {isLoadingDeployments ? (
              <div className="text-center py-8">Loading deployments...</div>
            ) : deployments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400">No deployments yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left p-3 font-medium text-gray-600 dark:text-gray-400">Status</th>
                      <th className="text-left p-3 font-medium text-gray-600 dark:text-gray-400">URL</th>
                      <th className="text-left p-3 font-medium text-gray-600 dark:text-gray-400">Commit</th>
                      <th className="text-left p-3 font-medium text-gray-600 dark:text-gray-400">Created</th>
                      <th className="text-left p-3 font-medium text-gray-600 dark:text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {deployments.map((deployment) => (
                      <tr key={deployment.uid} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded text-xs ${getStateColor(deployment.state)}`}>
                            {deployment.state}
                          </span>
                        </td>
                        <td className="p-3">
                          <a href={deployment.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline truncate block max-w-xs">
                            {deployment.url}
                          </a>
                        </td>
                        <td className="p-3">
                          <div className="flex flex-col gap-1">
                            {deployment.meta.githubCommitMessage && (
                              <span className="font-mono text-xs text-gray-900 dark:text-white truncate max-w-xs">
                                {deployment.meta.githubCommitMessage}
                              </span>
                            )}
                            {deployment.meta.githubCommitSha && (
                              <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
                                {deployment.meta.githubCommitSha.slice(0, 7)}
                              </span>
                            )}
                            {deployment.meta.githubCommitRef && (
                              <span className="px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-300">
                                {deployment.meta.githubCommitRef}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-3 text-gray-600 dark:text-gray-400">
                          {formatDate(deployment.createdAt)}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => fetchLogs(deployment.uid)}
                              disabled={isLoadingLogs}
                            >
                              Logs
                            </Button>
                            {deployment.state === "ERROR" && (
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => handleRedeploy(deployment.uid)}
                              >
                                Redeploy
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Logs Modal */}
        {selectedDeployment && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => { setSelectedDeployment(null); setLogs([]) }}>
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Logs: {selectedDeployment.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs ${getStateColor(selectedDeployment.state)}`}>
                    {selectedDeployment.state}
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => { setSelectedDeployment(null); setLogs([]) }}>
                    ✕
                  </Button>
                </div>
              </div>
              <div className="flex-1 overflow-auto p-4 font-mono text-sm bg-black/5 dark:bg-gray-900">
                {isLoadingLogs ? (
                  <div className="text-center py-8 text-gray-500">Loading logs...</div>
                ) : logs.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No logs available</div>
                ) : (
                  <pre className="whitespace-pre-wrap">
                    {logs.map((log, i) => (
                      <div key={i} className={`py-0.5 ${log.level === "error" ? "text-red-400" : log.level === "warning" ? "text-yellow-400" : "text-gray-300"}`}>
                        {[new Date(log.timestamp).toISOString(), log.message].join(" ")}
                      </div>
                    ))}
                  </pre>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}