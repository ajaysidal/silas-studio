// Page Builder Page - Phase 3

import { PageBuilderInterface } from "@/components/page-builder/page-builder-interface"
import { auth } from "@/auth/auth"
import { redirect } from "next/navigation"

export default async function PageBuilderPage() {
  const session = await auth()
  
  if (!session) {
    redirect("/api/auth/signin")
  }
  
  return <PageBuilderInterface />
}