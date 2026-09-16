"use client"

import { useState, useEffect } from "react"

interface Repository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  private: boolean
  updated_at: string
  default_branch: string
}

export function GitHubRepositories() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const fetchRepos = async () => {
    try {
      const res = await fetch("/api/github")
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Failed to fetch repositories")
      }
      const data = await res.json()
      setRepos(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setIsLoading(false)
    }
  }
  
useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRepos()
  }, [])
  
  const handleCreateBranch = async (repo: Repository, branchName: string) => {
    try {
      const res = await fetch("/api/github", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "createBranch",
          owner: repo.full_name.split("/")[0],
          repo: repo.name,
          branchName,
          baseSha: repo.default_branch,
        }),
      })
      if (!res.ok) throw new Error("Failed to create branch")
      alert(`Branch ${branchName} created successfully!`)
    } catch (err) {
      alert(`Error: ${err instanceof Error ? err.message : "Unknown error"}`)
    }
  }
  
  if (isLoading) return <div className="p-4 text-center">Loading repositories...</div>
  if (error) return <div className="p-4 text-red-500">{error}</div>
  if (repos.length === 0) return <div className="p-4 text-center text-gray-500">No repositories found</div>
  
  return (
    <div className="space-y-3">
      {repos.map((repo) => (
        <div
          key={repo.id}
          className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">{repo.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{repo.full_name}</p>
              </div>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full ${repo.private ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>
              {repo.private ? "Private" : "Public"}
            </span>
          </div>
          {repo.description && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{repo.description}</p>
          )}
          <div className="mt-3 flex gap-2">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              View on GitHub
            </a>
            <button
              onClick={() => {
                const branchName = prompt("Enter branch name:")
                if (branchName) handleCreateBranch(repo, branchName)
              }}
              className="text-sm px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Create Branch
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
