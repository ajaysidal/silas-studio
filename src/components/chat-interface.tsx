"use client"

import { useState, useRef, useEffect } from "react"
import { useSession } from "next-auth/react"

interface Message {
  role: "user" | "assistant" | "system"
  content: string
  createdAt?: string
}

interface Project {
  id: string
  name: string
  description: string | null
  repositoryUrl: string | null
}

const OLLAMA_MODELS = [
  { value: "qwen2.5-coder:7b", label: "Qwen 2.5 Coder 7B (Recommended)" },
  { value: "qwen2.5-coder:14b", label: "Qwen 2.5 Coder 14B (Better quality)" },
  { value: "deepseek-coder-v2:16b", label: "DeepSeek Coder V2 16B" },
  { value: "codellama:34b", label: "CodeLlama 34B" },
  { value: "llama3.1:70b", label: "Llama 3.1 70B" },
]

export function ChatInterface() {
  const { data: session } = useSession()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState("qwen2.5-coder:7b")
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isLoadingProjects, setIsLoadingProjects] = useState(true)
  const [isLoadingMessages, setIsLoadingMessages] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Fetch projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects")
        if (res.ok) {
          const data = await res.json()
          setProjects(data)
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error)
      } finally {
        setIsLoadingProjects(false)
      }
    }
    fetchProjects()
  }, [])

  // Load project messages when project changes
  useEffect(() => {
    let mounted = true
    const load = async () => {
      if (!selectedProject?.id) {
        if (mounted) setMessages([])
        return
      }
      
      setIsLoadingMessages(true)
      try {
        const res = await fetch(`/api/chat?projectId=${selectedProject.id}`)
        if (res.ok) {
          const data = await res.json()
          if (mounted) {
            const formattedMessages: Message[] = data.map((msg: { role: string; content: string; createdAt: string }) => ({
              role: msg.role as "user" | "assistant" | "system",
              content: msg.content,
              createdAt: msg.createdAt,
            }))
            setMessages(formattedMessages)
          }
        }
      } catch (error) {
        console.error("Failed to load project messages:", error)
      } finally {
        if (mounted) setIsLoadingMessages(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [selectedProject])

  const handleProjectChange = (projectId: string | null) => {
    const project = projectId ? projects.find(p => p.id === projectId) || null : null
    setSelectedProject(project)
    setMessages([]) // Clear messages immediately for better UX
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    
    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "system", content: "You are a helpful coding assistant specialized in modern web development, 3D graphics, and software architecture." }, ...messages, userMessage],
          model: selectedModel,
          stream: true,
          projectId: selectedProject?.id || null,
        }),
      })
      
      if (!response.ok) throw new Error("Failed to send message")
      
      const reader = response.body?.getReader()
      if (!reader) throw new Error("No response stream")
      
      const decoder = new TextDecoder()
      let assistantContent = ""
      const assistantMessageIndex = messages.length
      
      setMessages((prev) => [...prev, { role: "assistant", content: "" }])
      
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        
        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split("\n")
        
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6).trim()
            if (data === "[DONE]") continue
            
            try {
              const parsed = JSON.parse(data)
              if (parsed.content) {
                assistantContent += parsed.content
                setMessages((prev) => {
                  const newMessages = [...prev]
                  newMessages[assistantMessageIndex] = { role: "assistant", content: assistantContent }
                  return newMessages
                })
              }
            } catch {
              // Ignore parse errors
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error)
      setMessages((prev) => [...prev, { role: "assistant", content: "Error: Failed to get response" }])
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-white dark:bg-gray-900">
      <header className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Silas Studio Chat</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          {/* Project Selector */}
          <div className="w-full sm:w-64">
            <label htmlFor="project-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Project Context
            </label>
            <select
              id="project-select"
              value={selectedProject?.id || ""}
              onChange={(e) => handleProjectChange(e.target.value || null)}
              disabled={isLoadingProjects}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="">No project selected (general chat)</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
            {selectedProject && (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 truncate" title={selectedProject.description || ""}>
                {selectedProject.description || "No description"}
              </p>
            )}
          </div>

          {/* Model Selector */}
          <div className="w-full sm:w-72">
            <label htmlFor="model-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Model
            </label>
            <select
              id="model-select"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {OLLAMA_MODELS.map((model) => (
                <option key={model.value} value={model.value}>
                  {model.label}
                </option>
              ))}
            </select>
          </div>

          <span className="text-sm text-gray-600 dark:text-gray-400 sm:hidden">
            Signed in as {session?.user?.email}
          </span>
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoadingMessages ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            Loading conversation...
          </div>
        ) : messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="text-lg">{selectedProject ? `Start chatting about ${selectedProject.name}` : "Select a project or start a general chat"}</p>
              <p className="text-sm mt-1">Your conversation will appear here</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div
                key={index}
                className={message.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                <div
                  className={message.role === "user"
                    ? "max-w-[70%] p-4 rounded-2xl bg-blue-600 text-white rounded-br-none"
                    : "max-w-[70%] p-4 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none"
                  }
                >
                  <pre className="whitespace-pre-wrap font-mono text-sm">{message.content}</pre>
                  {message.createdAt && (
                    <p className="text-xs text-gray-300 dark:text-gray-500 mt-1 text-right">
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </main>
      
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={selectedProject ? `Ask about ${selectedProject.name}...` : "Type your message..."}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  )
}