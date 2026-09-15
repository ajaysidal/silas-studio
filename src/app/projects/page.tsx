import { ProjectsList } from "@/components/projects-list"
import { auth } from "@/auth/auth"
import { redirect } from "next/navigation"

export default async function ProjectsPage() {
  const session = await auth()
  
  if (!session) {
    redirect("/api/auth/signin")
  }
  
  return <ProjectsList />
}
