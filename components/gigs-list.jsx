"use client"

import { useAuthStore } from "../lib/store"
import { GigCard } from "./gig-card"

export function GigsList({ searchTerm }) {
  const gigs = useAuthStore((state) => state.gigs)

  const filteredGigs = gigs.filter(
    (gig) => gig.status === "open" && gig.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div>
      {filteredGigs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No gigs found matching your search</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGigs.map((gig) => (
            <GigCard key={gig.id} gig={gig} />
          ))}
        </div>
      )}
    </div>
  )
}
