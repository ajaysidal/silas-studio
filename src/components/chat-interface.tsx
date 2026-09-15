"use client"

import { useState, useRef, useEffect } from "react"
import { useSession } from "next-auth/react"

interface Message {
  role: "user" | "assistant" | "system"
  content: string
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
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
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
        }),
      })
      
      if (!response.ok) throw new Error("Failed to send message")
      
      const reader = response.body?.getReader()
      if (!reader) throw new Error("No response stream")
      
      const decoder = new TextDecoder()
      let assistantContent = ""
      let assistantMessageIndex = messages.length
      
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
      <header className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Silas Studio Chat</h2>
        <div className="flex items-center gap-4">
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white min-w-[280px]"
          >
            {OLLAMA_MODELS.map((model) => (
              <option key={model.value} value={model.value}>
                {model.label}
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Signed in as {session?.user?.email}
          </span>
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
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
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>
      
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
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