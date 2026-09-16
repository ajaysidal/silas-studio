import { DeploymentConsole } from "@/components/deployment/deployment-console"
import { auth } from "@/auth/auth"
import { redirect } from "next/navigation"

export default async function DeploymentPage() {
  const session = await auth()

  if (!session) {
    redirect("/api/auth/signin")
  }

  return <DeploymentConsole />
}