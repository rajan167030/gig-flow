"use client"

import { useState } from "react"
import { useAuthStore } from "../lib/store"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card } from "./ui/card"

export function PostGigModal({ onClose }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [budget, setBudget] = useState("")
  const [error, setError] = useState("")
  const postGig = useAuthStore((state) => state.postGig)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !description || !budget) {
      setError("Please fill in all fields")
      return
    }
    const numBudget = Number.parseFloat(budget)
    if (numBudget <= 0) {
      setError("Budget must be greater than 0")
      return
    }
    postGig(title, description, numBudget)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-md p-6 premium-card">
        <h2 className="text-xl font-bold text-white mb-4">Post a New Gig</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Gig Title</label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Build a React Dashboard"
              className="premium-input text-white placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what you need..."
              rows={4}
              className="w-full px-3 py-2 premium-input text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Budget ($)</label>
            <Input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="1500"
              min="1"
              step="0.01"
              className="premium-input text-white placeholder-gray-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex gap-3">
            <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white">
              Post Gig
            </Button>
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 text-gray-300 border-gray-600 hover:bg-gray-800/50 bg-transparent"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
