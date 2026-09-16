import { MediaGenerator } from "@/components/media/media-generator"
import { auth } from "@/auth/auth"
import { redirect } from "next/navigation"

export default async function MediaPage() {
  const session = await auth()

  if (!session) {
    redirect("/api/auth/signin")
  }

  return <MediaGenerator />
}