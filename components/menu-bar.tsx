"use client"

import { useState } from "react"
import {
  Home,
  Briefcase,
  Users,
  TrendingUp,
  MessageSquare,
  Award,
  Wallet,
  Settings,
  FileText,
  Search,
  Clock,
  Star,
  DollarSign,
  HelpCircle,
  BookOpen,
} from "lucide-react"

interface MenuBarProps {
  onNavigate?: (tab: string) => void
}

export function MenuBar({ onNavigate }: MenuBarProps) {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null)

  const handleMenuClick = (tab: string) => {
    onNavigate?.(tab)
    setHoveredMenu(null)
  }

  return (
    <div className="bg-slate-800 border-b border-slate-700 sticky top-20 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-1">
          {/* Home */}
          <button
            className="px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-sm font-medium flex items-center gap-2"
            onMouseEnter={() => setHoveredMenu("home")}
            onMouseLeave={() => setHoveredMenu(null)}
            onClick={() => handleMenuClick("browse")}
          >
            <Home size={18} />
            Home
          </button>

          {/* Browse & Find */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredMenu("browse")}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <button className="px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-sm font-medium flex items-center gap-2">
              <Search size={18} />
              Browse & Find
            </button>
            {hoveredMenu === "browse" && (
              <div className="absolute left-0 top-full bg-slate-700 rounded-lg shadow-lg border border-slate-600 w-56">
                <button
                  onClick={() => handleMenuClick("browse")}
                  className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-600 transition-colors border-b border-slate-600 flex items-center gap-3"
                >
                  <Briefcase size={16} />
                  All Available Gigs
                </button>
                <button
                  onClick={() => handleMenuClick("browse")}
                  className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-600 transition-colors border-b border-slate-600 flex items-center gap-3"
                >
                  <Search size={16} />
                  Advanced Search
                </button>
                <button
                  onClick={() => handleMenuClick("browse")}
                  className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-600 transition-colors border-b border-slate-600 flex items-center gap-3"
                >
                  <Star size={16} />
                  Saved Gigs
                </button>
                <button
                  onClick={() => handleMenuClick("browse")}
                  className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-600 transition-colors flex items-center gap-3"
                >
                  <TrendingUp size={16} />
                  Trending Gigs
                </button>
              </div>
            )}
          </div>

          {/* Work Management */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredMenu("work")}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <button className="px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-sm font-medium flex items-center gap-2">
              <FileText size={18} />
              My Work
            </button>
            {hoveredMenu === "work" && (
              <div className="absolute left-0 top-full bg-slate-700 rounded-lg shadow-lg border border-slate-600 w-56">
                <button
                  onClick={() => handleMenuClick("my-gigs")}
                  className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-600 transition-colors border-b border-slate-600 flex items-center gap-3"
                >
                  <Briefcase size={16} />
                  Posted Gigs
                </button>
                <button
                  onClick={() => handleMenuClick("my-bids")}
                  className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-600 transition-colors border-b border-slate-600 flex items-center gap-3"
                >
                  <FileText size={16} />
                  My Bids
                </button>
                <button
                  onClick={() => handleMenuClick("profile")}
                  className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-600 transition-colors border-b border-slate-600 flex items-center gap-3"
                >
                  <Clock size={16} />
                  Active Contracts
                </button>
                <button
                  onClick={() => handleMenuClick("profile")}
                  className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-600 transition-colors flex items-center gap-3"
                >
                  <Award size={16} />
                  Completed Work
                </button>
              </div>
            )}
          </div>

          {/* Communication */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredMenu("chat")}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <button className="px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-sm font-medium flex items-center gap-2">
              <MessageSquare size={18} />
              Messages
            </button>
            {hoveredMenu === "chat" && (
              <div className="absolute left-0 top-full bg-slate-700 rounded-lg shadow-lg border border-slate-600 w-56">
                <button className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-600 transition-colors border-b border-slate-600 flex items-center gap-3">
                  <MessageSquare size={16} />
                  All Messages
                </button>
                <button className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-600 transition-colors border-b border-slate-600 flex items-center gap-3">
                  <Users size={16} />
                  Conversations
                </button>
                <button className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-600 transition-colors flex items-center gap-3">
                  <Award size={16} />
                  Notifications
                </button>
              </div>
            )}
          </div>

          {/* Financial */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredMenu("finance")}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <button className="px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-sm font-medium flex items-center gap-2">
              <Wallet size={18} />
              Earnings & Payments
            </button>
            {hoveredMenu === "finance" && (
              <div className="absolute left-0 top-full bg-slate-700 rounded-lg shadow-lg border border-slate-600 w-56">
                <button className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-600 transition-colors border-b border-slate-600 flex items-center gap-3">
                  <DollarSign size={16} />
                  Earnings
                </button>
                <button className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-600 transition-colors border-b border-slate-600 flex items-center gap-3">
                  <Wallet size={16} />
                  Payments
                </button>
                <button className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-600 transition-colors border-b border-slate-600 flex items-center gap-3">
                  <FileText size={16} />
                  Invoices
                </button>
                <button className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-600 transition-colors flex items-center gap-3">
                  <TrendingUp size={16} />
                  Reports
                </button>
              </div>
            )}
          </div>

          {/* Account & Settings */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredMenu("account")}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <button className="px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-sm font-medium flex items-center gap-2">
              <Settings size={18} />
              Account
            </button>
            {hoveredMenu === "account" && (
              <div className="absolute left-0 top-full bg-slate-700 rounded-lg shadow-lg border border-slate-600 w-56">
                <button
                  onClick={() => handleMenuClick("profile")}
                  className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-600 transition-colors border-b border-slate-600 flex items-center gap-3"
                >
                  <Users size={16} />
                  Profile Settings
                </button>
                <button className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-600 transition-colors border-b border-slate-600 flex items-center gap-3">
                  <Award size={16} />
                  Skills & Portfolio
                </button>
                <button className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-600 transition-colors border-b border-slate-600 flex items-center gap-3">
                  <Settings size={16} />
                  Preferences
                </button>
                <button className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-600 transition-colors flex items-center gap-3">
                  <Wallet size={16} />
                  Payment Methods
                </button>
              </div>
            )}
          </div>

          {/* Learning & Resources */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredMenu("learn")}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <button className="px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-sm font-medium flex items-center gap-2">
              <BookOpen size={18} />
              Learn
            </button>
            {hoveredMenu === "learn" && (
              <div className="absolute left-0 top-full bg-slate-700 rounded-lg shadow-lg border border-slate-600 w-56">
                <button className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-600 transition-colors border-b border-slate-600 flex items-center gap-3">
                  <BookOpen size={16} />
                  Guides & Tips
                </button>
                <button className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-600 transition-colors border-b border-slate-600 flex items-center gap-3">
                  <HelpCircle size={16} />
                  FAQ
                </button>
                <button className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-600 transition-colors flex items-center gap-3">
                  <Award size={16} />
                  Community Forum
                </button>
              </div>
            )}
          </div>

          {/* Help & Support */}
          <button className="px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-sm font-medium flex items-center gap-2">
            <HelpCircle size={18} />
            Support
          </button>
        </div>
      </div>
    </div>
  )
}
