import { auth } from "@/auth/auth"
import { callOllama, streamOllama } from "@/lib/ollama-client"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import type { OllamaMessage } from "@/types/ollama"

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const body = await request.json()
    const { messages, model, stream, temperature, maxTokens, projectId } = body
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 })
    }
    
    // Persist user message (last user message in payload)
    const userMessage = messages.find((m: OllamaMessage) => m.role === "user")
    await prisma.message.create({
      data: {
        role: "user",
        content: userMessage?.content ?? "",
        projectId: projectId ?? "",
        // The user is inferred via session.user.id; linking to project can be added later.
      },
    })
      
    if (stream) {
      const encoder = new TextEncoder()
      let assistantContent = ""
      const streamResponse = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of streamOllama(messages, { model, temperature, maxTokens })) {
              assistantContent += chunk
              controller.enqueue(encoder.encode("data: " + JSON.stringify({ content: chunk }) + "\n\n"))
            }
            controller.enqueue(encoder.encode("data: [DONE]\n\n"))
            controller.close()
            // Save assistant message after streaming ends
            await prisma.message.create({
              data: {
                role: "assistant",
                content: assistantContent,
                projectId: projectId ?? "",
              },
            })
  } catch (error) {
            controller.error(error)
          }
        },
      })
      
      return new NextResponse(streamResponse, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
        },
      })
    }
    
    const response = await callOllama(messages, { model, temperature, maxTokens })
    // Persist assistant response (non‑stream)
    await prisma.message.create({
      data: {
        role: "assistant",
        content: response.message.content,
        projectId: projectId ?? "",
      },
    })
    return NextResponse.json(response)
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const projectId = searchParams.get("projectId")

  // Require authentication for fetching messages
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const messages = await prisma.message.findMany({
    where: { projectId: projectId ?? undefined },
    orderBy: { createdAt: "asc" },
  })

  return NextResponse.json(messages)
}

