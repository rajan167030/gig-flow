"use client"

import { useAuthStore } from "@/lib/store"
import { Dashboard } from "@/components/dashboard"
import { AuthForm } from "@/components/auth-form"

export default function Home() {
  const { user } = useAuthStore()

  return <div className="min-h-screen bg-background">{user ? <Dashboard /> : <AuthForm />}</div>
}
