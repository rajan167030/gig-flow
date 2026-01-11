"use client"

import type React from "react"

import { useState } from "react"
import { type Gig, useAuthStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface BidModalProps {
  gig: Gig
  onClose: () => void
}

export function BidModal({ gig, onClose }: BidModalProps) {
  const [amount, setAmount] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const { user, submitBid, bids } = useAuthStore()

  // Check if user has already bid on this gig
  const hasUserBid = bids.some((bid) => bid.gigId === gig.id && bid.freelancerId === user?.id)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount || !message) {
      setError("Please fill in all fields")
      return
    }
    const numAmount = Number.parseFloat(amount)
    if (numAmount <= 0) {
      setError("Amount must be greater than 0")
      return
    }
    submitBid(gig.id, numAmount, message)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md p-6 bg-slate-900 border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">Place a Bid</h2>

        {hasUserBid && (
          <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-3 mb-4 text-amber-300 text-sm">
            You have already placed a bid on this gig
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Your Bid Amount ($)</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="1500"
              min="1"
              step="0.01"
              className="bg-slate-800 border-slate-700 text-white placeholder-slate-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Proposal Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell the client about your experience and why you're the best fit..."
              rows={4}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex gap-3">
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
              Submit Bid
            </Button>
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 text-slate-300 border-slate-600 hover:bg-slate-800 bg-transparent"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
