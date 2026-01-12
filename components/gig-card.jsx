"use client"

import { useState } from "react"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { BidModal } from "./bid-modal"

export function GigCard({ gig }) {
  const [showBidModal, setShowBidModal] = useState(false)
  const formattedDate = new Date(gig.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })

  return (
    <>
      <Card className="p-6 premium-card hover:border-purple-500/50 transition-all cursor-pointer hover:shadow-lg hover:shadow-purple-500/25 h-full flex flex-col">
        <div className="mb-4 flex-1">
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{gig.title}</h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-1">{gig.description}</p>
        </div>

        <div className="mb-4 pt-4 border-t border-gray-700/50">
          <div className="text-2xl font-bold text-green-400">${gig.budget}</div>
          <div className="text-xs text-gray-500 mb-3">{formattedDate}</div>
        </div>

        <div className="space-y-2 text-sm mb-4">
          <div className="text-gray-400">
            Client: <span className="text-white font-medium block">{gig.clientName}</span>
          </div>
          <div className="text-gray-400">
            Bids: <span className="text-white font-medium">{gig.bidsCount}</span>
          </div>
        </div>

        <Button onClick={() => setShowBidModal(true)} className="w-full premium-button text-white">
          Place Bid
        </Button>
      </Card>

      {showBidModal && <BidModal gig={gig} onClose={() => setShowBidModal(false)} />}
    </>
  )
}
