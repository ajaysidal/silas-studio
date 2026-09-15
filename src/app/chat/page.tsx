import { ChatInterface } from "@/components/chat-interface"
import { auth } from "@/auth/auth"
import { redirect } from "next/navigation"

export default async function ChatPage() {
  const session = await auth()
  
  if (!session) {
    redirect("/api/auth/signin")
  }
  
  return <ChatInterface />
}
