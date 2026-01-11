"use client"

import { useState } from "react"
import { useAuthStore } from "@/lib/store"
import { Navbar } from "./navbar"
import { MenuBar } from "./menu-bar"
import { GigsList } from "./gigs-list"
import { PostGigModal } from "./post-gig-modal"
import { MyGigsTab } from "./my-gigs-tab"
import { MyBidsTab } from "./my-bids-tab"
import { UserProfileTab } from "./user-profile-tab"

type Tab = "browse" | "my-gigs" | "my-bids" | "profile"

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("browse")
  const [showPostModal, setShowPostModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const handleNavigate = (tab: string) => {
    if (tab === "browse" || tab === "my-gigs" || tab === "my-bids" || tab === "profile") {
      setActiveTab(tab as Tab)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar
        onLogout={() => useAuthStore.setState({ user: null })}
        onPostGig={() => setShowPostModal(true)}
        onProfileClick={() => setActiveTab("profile")}
        onNavigate={handleNavigate}
      />

      <MenuBar onNavigate={handleNavigate} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8 border-b border-slate-800">
          <button
            onClick={() => setActiveTab("browse")}
            className={`px-4 py-3 font-medium transition-colors ${
              activeTab === "browse"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-slate-400 hover:text-slate-300"
            }`}
          >
            Browse Gigs
          </button>
          <button
            onClick={() => setActiveTab("my-gigs")}
            className={`px-4 py-3 font-medium transition-colors ${
              activeTab === "my-gigs"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-slate-400 hover:text-slate-300"
            }`}
          >
            My Gigs
          </button>
          <button
            onClick={() => setActiveTab("my-bids")}
            className={`px-4 py-3 font-medium transition-colors ${
              activeTab === "my-bids"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-slate-400 hover:text-slate-300"
            }`}
          >
            My Bids
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-3 font-medium transition-colors ${
              activeTab === "profile"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-slate-400 hover:text-slate-300"
            }`}
          >
            Profile
          </button>
        </div>

        {activeTab === "browse" && (
          <div>
            <input
              type="text"
              placeholder="Search gigs by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 mb-6"
            />
            <GigsList searchTerm={searchTerm} />
          </div>
        )}

        {activeTab === "my-gigs" && <MyGigsTab />}
        {activeTab === "my-bids" && <MyBidsTab />}
        {activeTab === "profile" && <UserProfileTab />}
      </div>

      {showPostModal && <PostGigModal onClose={() => setShowPostModal(false)} />}
    </div>
  )
}
