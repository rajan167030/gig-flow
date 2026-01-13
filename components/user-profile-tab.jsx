"use client"

import { useState } from "react"
import { useAuthStore } from "../lib/store"
import { Mail, Calendar, Briefcase, CheckCircle, Clock, Award, TrendingUp, Globe, Zap, Star, User as UserIcon, X } from "lucide-react"
import { Card } from "./ui/card"
import { Button } from "./ui/button"

export function UserProfileTab() {
  const [showPublicProfile, setShowPublicProfile] = useState(false)
  const { user, gigs, bids } = useAuthStore()

  if (!user) return null

  const userGigs = gigs.filter((gig) => gig.clientId === user.id)
  const userBids = bids.filter((bid) => bid.freelancerId === user.id)
  const hiredBids = userBids.filter((bid) => bid.status === "hired")
  const completedGigs = gigs.filter((gig) => gig.clientId === user.id && gig.status === "completed")
  const totalEarned = hiredBids.reduce((sum, bid) => sum + bid.amount, 0)
  const totalSpent = completedGigs.reduce((sum, gig) => sum + gig.budget, 0)

  return (
    <div className="space-y-8 pb-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-purple-900/50 via-blue-900/50 to-indigo-900/50 rounded-lg p-8 border border-gray-700/50 premium-card">
        <div className="space-y-4">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-2xl shadow-purple-500/30">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">{user.name}</h1>
            <div className="flex items-center gap-2 text-gray-300 mt-3">
              <Mail size={18} className="text-purple-400" />
              <span className="font-medium">{user.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 mt-2">
              <Calendar size={18} className="text-blue-400" />
              <span>Member since {new Date().getFullYear()}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 mt-2">
              <Globe size={18} className="text-indigo-400" />
              <span>Verified Account</span>
            </div>
          </div>
          <div classonClick={() => setShowPublicProfile(true)} Name="flex gap-3 mt-6">
            <Button className="premium-button">Edit Profile</Button>
            <Button variant="outline" className="text-gray-300 border-gray-600 hover:bg-gray-800/50">View Public Profile</Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Posted Gigs */}
        <Card className="premium-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-300 font-semibold">Gigs Posted</h3>
            <Briefcase size={24} className="text-blue-400" />
          </div>
          <p className="text-4xl font-bold text-white">{userGigs.length}</p>
          <p className="text-sm text-gray-400 mt-2">as a Client</p>
        </Card>

        {/* Bids Submitted */}
        <Card className="premium-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-300 font-semibold">Bids Placed</h3>
            <Clock size={24} className="text-amber-400" />
          </div>
          <p className="text-4xl font-bold text-white">{userBids.length}</p>
          <p className="text-sm text-gray-400 mt-2">as a Freelancer</p>
        </Card>

        {/* Hired Bids */}
        <Card className="premium-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-300 font-semibold">Success Rate</h3>
            <CheckCircle size={24} className="text-green-400" />
          </div>
          <p className="text-4xl font-bold text-white">
            {userBids.length > 0 ? Math.round((hiredBids.length / userBids.length) * 100) : 0}%
          </p>
          <p className="text-sm text-gray-400 mt-2">Hired: {hiredBids.length}/{userBids.length}</p>
        </Card>

        {/* Total Activity */}
        <Card className="premium-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-300 font-semibold">Total Activity</h3>
            <TrendingUp size={24} className="text-purple-400" />
          </div>
          <p className="text-4xl font-bold text-white">{userGigs.length + userBids.length}</p>
          <p className="text-sm text-gray-400 mt-2">Gigs + Bids</p>
        </Card>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="premium-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Award size={24} className="text-green-400" />
            <h3 className="text-lg font-semibold text-white">Total Earned</h3>
          </div>
          <p className="text-3xl font-bold text-green-400">${totalEarned.toFixed(2)}</p>
          <p className="text-sm text-gray-400 mt-2">From {hiredBids.length} hired bids</p>
          <div className="mt-4 pt-4 border-t border-gray-700/50">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Average per bid:</span>
              <span className="text-white font-semibold">${hiredBids.length > 0 ? (totalEarned / hiredBids.length).toFixed(2) : 0}</span>
            </div>
          </div>
        </Card>

        <Card className="premium-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Zap size={24} className="text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Total Spent</h3>
          </div>
          <p className="text-3xl font-bold text-blue-400">${totalSpent.toFixed(2)}</p>
          <p className="text-sm text-gray-400 mt-2">On {completedGigs.length} completed gigs</p>
          <div className="mt-4 pt-4 border-t border-gray-700/50">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Average per gig:</span>
              <span className="text-white font-semibold">${completedGigs.length > 0 ? (totalSpent / completedGigs.length).toFixed(2) : 0}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Profile Overview */}
      <Card className="premium-card p-6">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Star size={24} className="text-yellow-400" />
          Account Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2 pb-6 md:pb-0 border-b md:border-b-0 md:border-r border-gray-700/50">
            <p className="text-gray-400 text-sm font-semibold uppercase">Account Status</p>
            <p className="text-white font-medium text-lg">Active & Verified</p>
          </div>
          <div className="space-y-2 pb-6 md:pb-0 border-b md:border-b-0 md:border-r border-gray-700/50">
            <p className="text-gray-400 text-sm font-semibold uppercase">Member Since</p>
            <p className="text-white font-medium text-lg">January {new Date().getFullYear()}</p>
          </div>
          <div className="space-y-2">
            <p className="text-gray-400 text-sm font-semibold uppercase">Account Tier</p>
            <p className="text-white font-medium text-lg">Professional</p>
          </div>
        </div>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bids */}
        <Card className="premium-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Clock size={20} className="text-amber-400" />
            Recent Bids
          </h3>
          {userBids.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No bids submitted yet</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {userBids
                .slice(-5)
                .reverse()
                .map((bid) => (
                  <div key={bid.id} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-gray-600/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-white font-semibold">Gig #{bid.gigId}</p>
                        <p className="text-gray-400 text-sm mt-1">{bid.message.substring(0, 50)}...</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${
                          bid.status === "hired"
                            ? "bg-green-900/30 text-green-300"
                            : bid.status === "rejected"
                              ? "bg-red-900/30 text-red-300"
                              : "bg-amber-900/30 text-amber-300"
                        }`}
                      >
                        {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between items-end">
                      <p className="text-gray-400 text-xs">
                        {new Date(bid.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-green-400 font-semibold">${bid.amount}</p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </Card>

        {/* Recent Gigs */}
        <Card className="premium-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Briefcase size={20} className="text-blue-400" />
            Recent Gigs
          </h3>
          {userGigs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No gigs posted yet</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {userGigs
                .slice(-5)
                .reverse()
                .map((gig) => (
                  <div key={gig.id} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-gray-600/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <p className="text-white font-semibold">{gig.title}</p>
                        <p className="text-gray-400 text-sm mt-1">{gig.description.substring(0, 50)}...</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${
                          gig.status === "open"
                            ? "bg-blue-900/30 text-blue-300"
                            : gig.status === "assigned"
                              ? "bg-purple-900/30 text-purple-300"
                              : "bg-green-900/30 text-green-300"
                        }`}
                      >
                        {gig.status.charAt(0).toUpperCase() + gig.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <UserIcon size={14} />
                        {gig.bidsCount} bids
                      </div>
                      <p className="text-blue-400 font-semibold">${gig.budget}</p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </Card>
      </div>

      {/* Performance Summary */}
      <Card className="premium-card p-6 bg-gradient-to-r from-gray-800/30 to-gray-900/50">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp size={20} className="text-purple-400" />
          Performance Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-1">Avg Bid Value</p>
            <p className="text-2xl font-bold text-green-400">
              ${userBids.length > 0 ? (userBids.reduce((sum, b) => sum + b.amount, 0) / userBids.length).toFixed(0) : 0}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-1">Avg Gig Budget</p>
            <p className="text-2xl font-bold text-blue-400">
              ${userGigs.length > 0 ? (userGigs.reduce((sum, g) => sum + g.budget, 0) / userGigs.length).toFixed(0) : 0}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-1">Response Rate</p>
            <p className="text-2xl font-bold text-purple-400">
              {userGigs.length > 0 ? ((userGigs.reduce((sum, g) => sum + g.bidsCount, 0) / userGigs.length).toFixed(1)) : 0}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-1">Total Projects</p>
            <p className="text-2xl font-bold text-indigo-400">
              {userGigs.length + userBids.length}
            </p>
          </div>

      {/* Public Profile Modal */}
      {showPublicProfile && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-lg border border-gray-700/50 w-full max-w-2xl max-h-96 overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700/50 sticky top-0 bg-slate-900">
              <h2 className="text-2xl font-bold text-white">Public Profile</h2>
              <button
                onClick={() => setShowPublicProfile(false)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X size={24} className="text-gray-400" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Profile Info */}
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-3xl font-bold text-white flex-shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white">{user.name}</h3>
                  <div className="flex items-center gap-2 text-gray-400 mt-2">
                    <CheckCircle size={16} className="text-green-400" />
                    <span>Verified Member</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 mt-1">
                    <Award size={16} className="text-yellow-400" />
                    <span>Professional Tier</span>
                  </div>
                </div>
              </div>

              {/* Public Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-4 text-center border border-gray-700/50">
                  <p className="text-gray-400 text-sm mb-1">Gigs Posted</p>
                  <p className="text-2xl font-bold text-white">{userGigs.length}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 text-center border border-gray-700/50">
                  <p className="text-gray-400 text-sm mb-1">Success Rate</p>
                  <p className="text-2xl font-bold text-green-400">
                    {userBids.length > 0 ? Math.round((hiredBids.length / userBids.length) * 100) : 0}%
                  </p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 text-center border border-gray-700/50">
                  <p className="text-gray-400 text-sm mb-1">Total Earned</p>
                  <p className="text-2xl font-bold text-blue-400">${totalEarned}</p>
                </div>
              </div>

              {/* Recent Gigs */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Recent Gigs</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {userGigs.slice(-3).length === 0 ? (
                    <p className="text-gray-400 text-sm">No gigs posted yet</p>
                  ) : (
                    userGigs.slice(-3).map((gig) => (
                      <div key={gig.id} className="p-3 bg-gray-800/50 rounded border border-gray-700/50">
                        <p className="text-white font-medium text-sm">{gig.title}</p>
                        <p className="text-gray-400 text-xs mt-1">${gig.budget}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Public Message */}
              <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4">
                <p className="text-gray-300 text-sm">
                  <span className="text-blue-400 font-semibold">@{user.name.toLowerCase().replace(/\s+/g, '')}</span> is available for freelance work. Feel free to contact for project inquiries!
                </p>
              </div>

              {/* Contact Button */}
              <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all shadow-lg shadow-blue-500/20">
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
        </div>
      </Card>
    </div>
  
)}