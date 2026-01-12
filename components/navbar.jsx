"use client"

import { useAuthStore } from "../lib/store"
import { Button } from "./ui/button"
import {
  User,
  Bell,
  MessageSquare,
  Settings,
  HelpCircle,
  LogOut,
  Plus,
  ChevronDown,
} from "lucide-react"
import { useState } from "react"

export function Navbar({ onLogout, onPostGig, onProfileClick, onNavigate }) {
  const user = useAuthStore((state) => state.user)
  const [openDropdown, setOpenDropdown] = useState(null)

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu)
  }

  return (
    <nav className="bg-black/80 backdrop-blur-xl border-b border-gray-800/50 premium-navbar sticky top-0 z-40">
      <div className="px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Left Section - Breadcrumb/Title */}
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-white">Dashboard</h1>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Post Gig Button */}
            <Button
              onClick={onPostGig}
              className="premium-button px-4 py-2 text-white font-medium shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all"
            >
              <Plus size={16} className="mr-2" />
              Post Gig
            </Button>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Messages */}
            <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors">
              <MessageSquare size={20} />
            </button>

            {/* User Menu Dropdown */}
            <div className="relative">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    onProfileClick()
                    setOpenDropdown(null)
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors border border-gray-700/50 cursor-pointer"
                  title="Go to Profile"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/20">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="text-gray-300 text-sm font-medium hidden md:inline">{user?.name}</span>
                </button>
                <button
                  onClick={() => toggleDropdown("user")}
                  className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors border border-gray-700/50"
                  title="Account Menu"
                >
                  <ChevronDown size={16} className="text-gray-400" />
                </button>
              </div>

              {openDropdown === "user" && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-xl rounded-lg border border-gray-700/50 shadow-2xl">
                  <button
                    onClick={() => {
                      onProfileClick()
                      setOpenDropdown(null)
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800/50 transition-colors text-sm border-b border-gray-700/50"
                  >
                    <User size={16} />
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      onNavigate?.("settings")
                      setOpenDropdown(null)
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800/50 transition-colors text-sm border-b border-gray-700/50"
                  >
                    <Settings size={16} />
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      onNavigate?.("help")
                      setOpenDropdown(null)
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800/50 transition-colors text-sm border-b border-gray-700/50"
                  >
                    <HelpCircle size={16} />
                    Help & Support
                  </button>
                  <button
                    onClick={() => {
                      onLogout()
                      setOpenDropdown(null)
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors text-sm"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
