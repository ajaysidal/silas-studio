import { auth } from "@/auth/auth"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth()
  
  if (!session) {
    redirect("/api/auth/signin")
  }
  
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Silas Studio
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            AI-powered code generation and development studio
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/chat"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Chatting
            </a>
            <a
              href="/projects"
              className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              View Projects
            </a>
          </div>
        </div>
        
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              NIM Integration
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Access NVIDIA NIM models including Nemotron, DeepSeek, and Kimi for code generation.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              GitHub Integration
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Connect repositories, create branches, and open PRs directly from the chat interface.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Project Management
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Organize your work into projects with persistent context and conversation history.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
