"use client"

import { useAuthStore } from "@/lib/store"
import { Mail, Calendar, Briefcase, CheckCircle, Clock } from "lucide-react"

export function UserProfileTab() {
  const { user, gigs, bids } = useAuthStore()

  if (!user) return null

  const userGigs = gigs.filter((gig) => gig.clientId === user.id)
  const userBids = bids.filter((bid) => bid.freelancerId === user.id)
  const hiredBids = userBids.filter((bid) => bid.status === "hired")
  const completedGigs = gigs.filter((gig) => gig.clientId === user.id && gig.status === "completed")
  const totalEarned = hiredBids.reduce((sum, bid) => sum + bid.amount, 0)
  const totalSpent = completedGigs.reduce((sum, gig) => sum + gig.budget, 0)

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-lg p-8 border border-slate-800">
        <div className="space-y-4">
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-3xl font-bold text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">{user.name}</h1>
            <div className="flex items-center gap-2 text-slate-300 mt-2">
              <Mail size={18} />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 mt-2">
              <Calendar size={18} />
              <span>Member since {new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Posted Gigs */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-300 font-medium">Gigs Posted</h3>
            <Briefcase size={20} className="text-blue-400" />
          </div>
          <p className="text-4xl font-bold text-white">{userGigs.length}</p>
          <p className="text-sm text-slate-400 mt-2">as a Client</p>
        </div>

        {/* Bids Submitted */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-300 font-medium">Bids Submitted</h3>
            <Clock size={20} className="text-amber-400" />
          </div>
          <p className="text-4xl font-bold text-white">{userBids.length}</p>
          <p className="text-sm text-slate-400 mt-2">as a Freelancer</p>
        </div>

        {/* Hired Bids */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-300 font-medium">Hired Bids</h3>
            <CheckCircle size={20} className="text-green-400" />
          </div>
          <p className="text-4xl font-bold text-white">{hiredBids.length}</p>
          <p className="text-sm text-slate-400 mt-2">
            Success rate: {userBids.length > 0 ? Math.round((hiredBids.length / userBids.length) * 100) : 0}%
          </p>
        </div>

        {/* Total Activity */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-300 font-medium">Total Activity</h3>
            <Briefcase size={20} className="text-purple-400" />
          </div>
          <p className="text-4xl font-bold text-white">{userGigs.length + userBids.length}</p>
          <p className="text-sm text-slate-400 mt-2">Gigs + Bids</p>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <h3 className="text-slate-300 font-medium mb-4">Total Earned</h3>
          <p className="text-4xl font-bold text-green-400">${totalEarned.toFixed(2)}</p>
          <p className="text-sm text-slate-400 mt-2">From hired bids</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <h3 className="text-slate-300 font-medium mb-4">Total Spent</h3>
          <p className="text-4xl font-bold text-blue-400">${totalSpent.toFixed(2)}</p>
          <p className="text-sm text-slate-400 mt-2">On completed gigs</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bids */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Bids</h3>
          {userBids.length === 0 ? (
            <p className="text-slate-400">No bids submitted yet</p>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {userBids
                .slice(-5)
                .reverse()
                .map((bid) => (
                  <div key={bid.id} className="p-3 bg-slate-800 rounded border border-slate-700">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-medium">Gig #{bid.gigId}</p>
                        <p className="text-slate-400 text-sm mt-1">${bid.amount}</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          bid.status === "hired"
                            ? "bg-green-900 text-green-200"
                            : bid.status === "rejected"
                              ? "bg-red-900 text-red-200"
                              : "bg-amber-900 text-amber-200"
                        }`}
                      >
                        {bid.status}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Recent Gigs */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Gigs</h3>
          {userGigs.length === 0 ? (
            <p className="text-slate-400">No gigs posted yet</p>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {userGigs
                .slice(-5)
                .reverse()
                .map((gig) => (
                  <div key={gig.id} className="p-3 bg-slate-800 rounded border border-slate-700">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-medium text-sm">{gig.title}</p>
                        <p className="text-slate-400 text-sm mt-1">${gig.budget}</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          gig.status === "open"
                            ? "bg-blue-900 text-blue-200"
                            : gig.status === "assigned"
                              ? "bg-purple-900 text-purple-200"
                              : "bg-green-900 text-green-200"
                        }`}
                      >
                        {gig.status}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
