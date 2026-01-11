"use client"

import { useAuthStore } from "@/lib/store"
import { Card } from "@/components/ui/card"

export function MyBidsTab() {
  const user = useAuthStore((state) => state.user)
  const bids = useAuthStore((state) => state.bids)
  const gigs = useAuthStore((state) => state.gigs)

  const myBids = bids.filter((bid) => bid.freelancerId === user?.id)

  if (myBids.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400 text-lg">You haven't placed any bids yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {myBids.map((bid) => {
        const gig = gigs.find((g) => g.id === bid.gigId)
        return (
          <Card key={bid.id} className="p-6 bg-slate-900 border-slate-700">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1">{gig?.title}</h3>
                <p className="text-slate-400 text-sm mb-2">
                  Client: <span className="text-white">{gig?.clientName}</span>
                </p>
                <p className="text-slate-400 text-sm italic">"{bid.message}"</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-400">${bid.amount}</div>
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

            <div className="pt-4 border-t border-slate-700 text-xs text-slate-500">
              Placed on {new Date(bid.createdAt).toLocaleDateString()}
            </div>
          </Card>
        )
      })}
    </div>
  )
}
