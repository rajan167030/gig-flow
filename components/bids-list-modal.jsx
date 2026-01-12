"use client"

import { useAuthStore } from "../lib/store"
import { Button } from "./ui/button"
import { Card } from "./ui/card"

export function BidsListModal({ gigId, onClose }) {
  const bids = useAuthStore((state) => state.bids)
  const hireBidder = useAuthStore((state) => state.hireBidder)
  const gig = useAuthStore((state) => state.gigs.find((g) => g.id === gigId))

  const gigBids = bids.filter((bid) => bid.gigId === gigId)

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6 premium-card">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">{gig?.title}</h2>
            <p className="text-gray-400 text-sm mt-1">
              {gigBids.length} bid{gigBids.length !== 1 ? "s" : ""} received
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {gigBids.map((bid) => (
            <div key={bid.id} className="p-4 bg-gray-800/50 border border-gray-700/50 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-white">{bid.freelancerName}</h3>
                  <p className="text-sm text-gray-400 mt-1">{bid.message}</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-green-400">${bid.amount}</div>
                  <div
                    className={`text-xs font-medium mt-2 ${
                      bid.status === "pending"
                        ? "text-amber-400"
                        : bid.status === "hired"
                          ? "text-green-400"
                          : "text-red-400"
                    }`}
                  >
                    {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                  </div>
                </div>
              </div>

              {bid.status === "pending" && gig?.status === "open" && (
                <Button
                  onClick={() => {
                    hireBidder(gigId, bid.id)
                    onClose()
                  }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold mt-3"
                >
                  Hire this Freelancer
                </Button>
              )}
            </div>
          ))}
        </div>

        <Button
          onClick={onClose}
          variant="outline"
          className="w-full mt-6 text-gray-300 border-gray-600 hover:bg-gray-800/50 bg-transparent"
        >
          Close
        </Button>
      </Card>
    </div>
  )
}
