"use client"

import { useState } from "react"
import { useAuthStore } from "../lib/store"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card } from "./ui/card"

export function BidModal({ gig, onClose }) {
  const [amount, setAmount] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const { user, submitBid, bids } = useAuthStore()

  const hasUserBid = bids.some((bid) => bid.gigId === gig.id && bid.freelancerId === user?.id)

  const handleSubmit = (e) => {
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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-md p-6 premium-card">
        <h2 className="text-xl font-bold text-white mb-4">Place a Bid</h2>

        {hasUserBid && (
          <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-3 mb-4 text-amber-300 text-sm">
            You have already placed a bid on this gig
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Your Bid Amount ($)</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="1500"
              min="1"
              step="0.01"
              className="premium-input text-white placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Proposal Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell the client about your experience and why you're the best fit..."
              rows={4}
              className="w-full px-3 py-2 premium-input text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-md"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex gap-3">
            <Button type="submit" className="flex-1 premium-button text-white">
              Submit Bid
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
