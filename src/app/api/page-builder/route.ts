// Page Builder API - Phase 3: Natural Language → Component Generation

import { auth } from "@/auth/auth"
import { getPageBuilderEngine } from "@/lib/page-builder/generator"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { prompt, context, options } = body

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const engine = getPageBuilderEngine(session.user.id)
    
    const result = await engine.generate({
      prompt,
      context,
      options: {
        model: options?.model,
        temperature: options?.temperature,
        maxTokens: options?.maxTokens,
        includeTests: options?.includeTests ?? false,
        includeStorybook: options?.includeStorybook ?? false,
        strictMode: options?.strictMode ?? true,
      },
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Page Builder API error:", error)
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "Generation failed",
        success: false,
        components: [],
        files: [],
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const action = searchParams.get("action")

    if (action === "components") {
      const engine = getPageBuilderEngine(session.user.id)
      const components = engine.getAllComponents()
      return NextResponse.json({ components })
    }

    if (action === "design-system") {
      const engine = getPageBuilderEngine(session.user.id)
      const designSystem = engine.getDesignSystem()
      return NextResponse.json({ designSystem })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Page Builder API error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Request failed" },
      { status: 500 }
    )
  }
}