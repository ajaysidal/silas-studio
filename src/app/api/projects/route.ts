import { auth } from "@/auth/auth"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  const projects = await prisma.project.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
  })
  
  return NextResponse.json(projects)
}

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  const body = await request.json()
  const { name, description, repositoryUrl } = body
  
  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 })
  }
  
  const project = await prisma.project.create({
    data: {
      name,
      description,
      repositoryUrl,
      userId: session.user.id,
    },
  })
  
  return NextResponse.json(project)
}
