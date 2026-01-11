"use client"

import { useState } from "react"
import { useAuthStore } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BidsListModal } from "./bids-list-modal"

export function MyGigsTab() {
  const user = useAuthStore((state) => state.user)
  const gigs = useAuthStore((state) => state.gigs)
  const deleteGig = useAuthStore((state) => state.deleteGig)
  const [selectedGigId, setSelectedGigId] = useState<string | null>(null)

  const myGigs = gigs.filter((gig) => gig.clientId === user?.id)

  if (myGigs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400 text-lg">You haven't posted any gigs yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {myGigs.map((gig) => (
        <Card key={gig.id} className="p-6 bg-slate-900 border-slate-700">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">{gig.title}</h3>
              <p className="text-slate-400 text-sm">{gig.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-400">${gig.budget}</div>
              <div
                className={`text-xs font-medium mt-2 ${
                  gig.status === "open"
                    ? "text-blue-400"
                    : gig.status === "assigned"
                      ? "text-green-400"
                      : "text-slate-500"
                }`}
              >
                {gig.status.charAt(0).toUpperCase() + gig.status.slice(1)}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-700">
            <span className="text-slate-400">
              Bids received: <span className="text-white font-bold">{gig.bidsCount}</span>
            </span>
            <div className="flex gap-2">
              {gig.bidsCount > 0 && (
                <Button
                  onClick={() => setSelectedGigId(gig.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
                >
                  Review Bids
                </Button>
              )}
              {gig.status === "open" && (
                <Button
                  onClick={() => deleteGig(gig.id)}
                  variant="outline"
                  className="text-red-400 border-red-600 hover:bg-red-900/20 text-sm"
                >
                  Close Gig
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}

      {selectedGigId && <BidsListModal gigId={selectedGigId} onClose={() => setSelectedGigId(null)} />}
    </div>
  )
}
