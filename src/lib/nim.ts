import { NIMConfig } from "@/types/nim"

let configCache: NIMConfig | null = null

export async function getNIMConfig(): Promise<NIMConfig> {
  if (configCache) return configCache

  const fs = await import("fs/promises")
  const path = await import("path")
  
  const configPath = path.join(process.cwd(), "nim.config.json")
  const configFile = await fs.readFile(configPath, "utf-8")
  configCache = JSON.parse(configFile)
  
  return configCache
}

export function getNIMApiKey(): string {
  const apiKey = process.env.NVIDIA_API_KEY
  if (!apiKey) {
    throw new Error("NVIDIA_API_KEY environment variable is not set")
  }
  return apiKey
}
