"use client"

import type React from "react"

import { useState } from "react"
import { useAuthStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export function AuthForm() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const login = useAuthStore((state) => state.login)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !name) {
      setError("Please fill in all fields")
      return
    }
    login(email, name)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 to-slate-900">
      <Card className="w-full max-w-md p-8 bg-slate-900 border-slate-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">GigFlow</h1>
          <p className="text-slate-400">Freelance Marketplace</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Full Name</label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="bg-slate-800 border-slate-700 text-white placeholder-slate-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="bg-slate-800 border-slate-700 text-white placeholder-slate-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
            Sign In
          </Button>
        </form>

        <p className="text-center text-slate-400 text-sm mt-6">Demo: Use any email and name to get started</p>
      </Card>
    </div>
  )
}
