"use client"

import { useState } from "react"
import type { Gig } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BidModal } from "./bid-modal"

interface GigCardProps {
  gig: Gig
}

export function GigCard({ gig }: GigCardProps) {
  const [showBidModal, setShowBidModal] = useState(false)
  const formattedDate = new Date(gig.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })

  return (
    <>
      <Card className="p-6 bg-slate-900 border-slate-700 hover:border-blue-500 transition-all cursor-pointer hover:shadow-lg hover:shadow-blue-500/20 h-full flex flex-col">
        <div className="mb-4 flex-1">
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{gig.title}</h3>
          <p className="text-slate-400 text-sm mb-4 line-clamp-3 flex-1">{gig.description}</p>
        </div>

        <div className="mb-4 pt-4 border-t border-slate-700">
          <div className="text-2xl font-bold text-green-400 mb-2">${gig.budget}</div>
          <div className="text-xs text-slate-500 mb-3">{formattedDate}</div>
        </div>

        <div className="space-y-2 text-sm mb-4">
          <div className="text-slate-400">
            Client: <span className="text-white font-medium block">{gig.clientName}</span>
          </div>
          <div className="text-slate-400">
            Bids: <span className="text-white font-medium">{gig.bidsCount}</span>
          </div>
        </div>

        <Button onClick={() => setShowBidModal(true)} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Place Bid
        </Button>
      </Card>

      {showBidModal && <BidModal gig={gig} onClose={() => setShowBidModal(false)} />}
    </>
  )
}
