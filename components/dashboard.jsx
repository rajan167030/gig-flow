"use client"

import { useState } from "react"
import { useAuthStore } from "../lib/store"
import { MenuBar } from "./menu-bar"
import { GigsList } from "./gigs-list"
import { PostGigModal } from "./post-gig-modal"
import { MyGigsTab } from "./my-gigs-tab"
import { MyBidsTab } from "./my-bids-tab"
import { UserProfileTab } from "./user-profile-tab"
import { SettingsTab } from "./settings-tab"
import { MessageSquare, DollarSign, BarChart3 } from "lucide-react"

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("browse")
  const [showPostModal, setShowPostModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const handleNavigate = (tab) => {
    if (tab === "browse" || tab === "my-gigs" || tab === "my-bids" || tab === "profile" || tab === "settings" || tab === "messages" || tab === "earnings" || tab === "analytics") {
      setActiveTab(tab)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 relative">
      {/* Sidebar Menu - Fixed */}
      <MenuBar onNavigate={handleNavigate} activeTab={activeTab} />

      {/* Main Content - Offset from fixed sidebar */}
      <div className="flex-1 flex flex-col ml-64 min-h-screen">
        {/* Page Content */}
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                {activeTab === "browse" && "Browse Gigs"}
                {activeTab === "my-gigs" && "My Posted Gigs"}
                {activeTab === "my-bids" && "My Bids & Proposals"}
                {activeTab === "profile" && "Profile Settings"}
                {activeTab === "settings" && "Account Settings"}
                {activeTab === "messages" && "Messages"}
                {activeTab === "earnings" && "Earnings & Payments"}
                {activeTab === "analytics" && "Analytics & Reports"}
              </h1>
              <p className="text-slate-400">
                {activeTab === "browse" && "Discover and apply for freelance opportunities"}
                {activeTab === "my-gigs" && "Manage your posted projects and track progress"}
                {activeTab === "my-bids" && "View and manage your submitted proposals"}
                {activeTab === "profile" && "Update your profile and account settings"}
                {activeTab === "settings" && "Manage your account preferences and settings"}
                {activeTab === "messages" && "Communicate with clients and freelancers"}
                {activeTab === "earnings" && "Track your income and payment history"}
                {activeTab === "analytics" && "View performance metrics and insights"}
              </p>
            </div>

            {/* Content Area */}
            {activeTab === "browse" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <input
                      type="text"
                      placeholder="Search gigs by title..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={() => setShowPostModal(true)}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
                  >
                    Post New Gig
                  </button>
                </div>
                <GigsList searchTerm={searchTerm} />
              </div>
            )}

            {activeTab === "my-gigs" && <MyGigsTab />}
            {activeTab === "settings" && <SettingsTab />}
            {activeTab === "my-bids" && <MyBidsTab />}
            {activeTab === "profile" && <UserProfileTab />}
            {activeTab === "messages" && (
              <div className="bg-slate-900 rounded-lg border border-slate-700 p-8 text-center">
                <MessageSquare className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Messages</h3>
                <p className="text-slate-400">Your message inbox will appear here.</p>
              </div>
            )}
            {activeTab === "earnings" && (
              <div className="bg-slate-900 rounded-lg border border-slate-700 p-8 text-center">
                <DollarSign className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Earnings Dashboard</h3>
                <p className="text-slate-400">Your earnings and payment information will appear here.</p>
              </div>
            )}
            {activeTab === "analytics" && (
              <div className="bg-slate-900 rounded-lg border border-slate-700 p-8 text-center">
                <BarChart3 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Analytics</h3>
                <p className="text-slate-400">Performance metrics and insights will appear here.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {showPostModal && <PostGigModal onClose={() => setShowPostModal(false)} />}
    </div>
  )
}
