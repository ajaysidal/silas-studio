import { NextResponse } from "next/server"
import { listOllamaModels, checkOllamaHealth } from "@/lib/ollama-client"

export async function GET() {
  try {
    const connected = await checkOllamaHealth()
    let models: string[] = []
    
    if (connected) {
      models = await listOllamaModels()
    }
    
    return NextResponse.json({ connected, models })
  } catch (_error) {
    return NextResponse.json({ connected: false, models: [], error: "Failed to check Ollama" })
  }
}