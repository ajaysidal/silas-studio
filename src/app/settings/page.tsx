import { SettingsContent } from "@/components/settings-content"
import { auth } from "@/auth/auth"
import { redirect } from "next/navigation"

export default async function SettingsPage() {
  const session = await auth()
  if (!session) {
    redirect("/api/auth/signin")
  }

  return <SettingsContent />
}