import { auth } from "@/auth/auth"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

const GITHUB_API = "https://api.github.com"

async function getGitHubToken(userId: string) {
  const account = await prisma.account.findFirst({
    where: { userId, provider: "github" },
  })
  return account?.access_token
}

export async function GET(request: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  const token = await getGitHubToken(session.user.id)
  if (!token) {
    return NextResponse.json({ error: "GitHub not connected" }, { status: 400 })
  }
  
  const { searchParams } = new URL(request.url)
  const endpoint = searchParams.get("endpoint") || "/user/repos"
  const perPage = searchParams.get("per_page") || "30"
  
  try {
    const response = await fetch(`${GITHUB_API}${endpoint}?per_page=${perPage}&sort=updated`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    })
    
    if (!response.ok) {
      const error = await response.json()
      return NextResponse.json({ error: error.message }, { status: response.status })
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("GitHub API error:", error)
    return NextResponse.json({ error: "Failed to fetch from GitHub" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  const token = await getGitHubToken(session.user.id)
  if (!token) {
    return NextResponse.json({ error: "GitHub not connected" }, { status: 400 })
  }
  
  const body = await request.json()
  const { action, ...params } = body
  
  try {
    let endpoint = ""
    let method = "POST"
    let payload: Record<string, unknown> = {}
    
    switch (action) {
      case "createBranch":
        endpoint = `/repos/${params.owner}/${params.repo}/git/refs`
        payload = {
          ref: `refs/heads/${params.branchName}`,
          sha: params.baseSha,
        }
        break
      case "createPR":
        endpoint = `/repos/${params.owner}/${params.repo}/pulls`
        payload = {
          title: params.title,
          head: params.headBranch,
          base: params.baseBranch,
          body: params.body,
        }
        break
      case "createFile":
      case "updateFile":
        endpoint = `/repos/${params.owner}/${params.repo}/contents/${params.path}`
        method = "PUT"
        payload = {
          message: params.message,
          content: Buffer.from(params.content).toString("base64"),
          branch: params.branch,
        }
        if (action === "updateFile" && params.sha) {
          payload.sha = params.sha
        }
        break
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
    
    const response = await fetch(`${GITHUB_API}${endpoint}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    
    if (!response.ok) {
      const error = await response.json()
      return NextResponse.json({ error: error.message }, { status: response.status })
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("GitHub API error:", error)
    return NextResponse.json({ error: "GitHub operation failed" }, { status: 500 })
  }
}
