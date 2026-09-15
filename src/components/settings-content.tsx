"use client"

import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import { GitHubRepositories } from "@/components/github-repositories"

export function SettingsContent() {
  const { data: session, update } = useSession()
  
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
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
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">API Keys</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Configure your NVIDIA NIM API key for AI model access.
        </p>
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <code className="text-sm font-mono text-gray-600 dark:text-gray-300">
            Add NIM_API_KEY to your .env file
          </code>
        </div>
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
