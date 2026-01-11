"use client"

import { useAuthStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import {
  User,
  Menu,
  X,
  Bell,
  MessageSquare,
  Settings,
  HelpCircle,
  LogOut,
  Plus,
  Briefcase,
  FileText,
} from "lucide-react"
import { useState } from "react"

interface NavbarProps {
  onLogout: () => void
  onPostGig: () => void
  onProfileClick: () => void
  onNavigate?: (tab: string) => void
}

export function Navbar({ onLogout, onPostGig, onProfileClick, onNavigate }: NavbarProps) {
  const user = useAuthStore((state) => state.user)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu)
  }

  const handleNavigate = (tab: string) => {
    setIsMenuOpen(false)
    setOpenDropdown(null)
    onNavigate?.(tab)
  }

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Top Bar */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            <div className="text-2xl font-bold text-blue-400">GigFlow</div>

            {/* Desktop Main Menu */}
            <div className="hidden lg:flex items-center gap-1">
              <button
                onClick={() => toggleDropdown("browse")}
                className="px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors text-sm font-medium flex items-center gap-2"
              >
                <Briefcase size={16} />
                Browse Gigs
              </button>
              <button
                onClick={() => toggleDropdown("manage")}
                className="px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors text-sm font-medium flex items-center gap-2"
              >
                <FileText size={16} />
                Manage
              </button>
              <button
                onClick={() => toggleDropdown("more")}
                className="px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors text-sm font-medium"
              >
                More
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button className="relative p-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors hidden sm:block">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Menu Dropdown */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => toggleDropdown("user")}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <User size={18} />
                <span className="text-slate-300 text-sm font-medium hidden md:inline">{user?.name}</span>
              </button>

              {openDropdown === "user" && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg border border-slate-700 shadow-xl">
                  <button
                    onClick={() => {
                      onProfileClick()
                      setOpenDropdown(null)
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-700 transition-colors text-sm border-b border-slate-700"
                  >
                    <User size={16} />
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      handleNavigate("my-gigs")
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-700 transition-colors text-sm border-b border-slate-700"
                  >
                    <Briefcase size={16} />
                    My Posted Gigs
                  </button>
                  <button
                    onClick={() => {
                      handleNavigate("my-bids")
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-700 transition-colors text-sm border-b border-slate-700"
                  >
                    <FileText size={16} />
                    My Bids
                  </button>
                  <button
                    onClick={() => toggleDropdown("settings")}
                    className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-700 transition-colors text-sm border-b border-slate-700"
                  >
                    <Settings size={16} />
                    Settings
                  </button>
                  <button
                    onClick={() => toggleDropdown("help")}
                    className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-700 transition-colors text-sm border-b border-slate-700"
                  >
                    <HelpCircle size={16} />
                    Help & Support
                  </button>
                  <button
                    onClick={() => {
                      onLogout()
                      setOpenDropdown(null)
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-slate-700 transition-colors text-sm"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Post Gig Button */}
            <Button
              onClick={onPostGig}
              className="bg-blue-600 hover:bg-blue-700 text-white hidden sm:flex items-center gap-2 text-sm"
            >
              <Plus size={18} />
              <span className="hidden md:inline">Post Gig</span>
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mt-4 lg:hidden space-y-2 border-t border-slate-800 pt-4">
            <button
              onClick={() => handleNavigate("browse")}
              className="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors text-sm flex items-center gap-2"
            >
              <Briefcase size={16} />
              Browse Gigs
            </button>
            <button
              onClick={() => handleNavigate("my-gigs")}
              className="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors text-sm flex items-center gap-2"
            >
              <FileText size={16} />
              My Posted Gigs
            </button>
            <button
              onClick={() => handleNavigate("my-bids")}
              className="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors text-sm flex items-center gap-2"
            >
              <FileText size={16} />
              My Bids
            </button>
            <button
              onClick={() => handleNavigate("profile")}
              className="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors text-sm flex items-center gap-2"
            >
              <User size={16} />
              Profile
            </button>
            <button
              onClick={onPostGig}
              className="w-full text-left px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors text-sm flex items-center gap-2 font-medium"
            >
              <Plus size={16} />
              Post a Gig
            </button>
            <button
              onClick={() => {
                onLogout()
                setIsMenuOpen(false)
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-red-400 hover:bg-slate-800 transition-colors text-sm flex items-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}

        {/* Desktop Dropdowns */}
        {openDropdown && (
          <div className="absolute left-0 right-0 top-20 hidden lg:block">
            {openDropdown === "browse" && (
              <div className="bg-slate-800 border-b border-slate-700 p-4">
                <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6">
                  <button onClick={() => handleNavigate("browse")} className="text-left">
                    <div className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                      <Briefcase size={16} />
                      Browse All Gigs
                    </div>
                    <p className="text-slate-400 text-sm">Explore available job listings</p>
                  </button>
                  <button onClick={() => handleNavigate("browse")} className="text-left">
                    <div className="text-blue-400 font-semibold mb-2">Search Filters</div>
                    <p className="text-slate-400 text-sm">Filter by category and budget</p>
                  </button>
                  <button onClick={() => handleNavigate("browse")} className="text-left">
                    <div className="text-blue-400 font-semibold mb-2">Saved Gigs</div>
                    <p className="text-slate-400 text-sm">View your bookmarked jobs</p>
                  </button>
                </div>
              </div>
            )}

            {openDropdown === "manage" && (
              <div className="bg-slate-800 border-b border-slate-700 p-4">
                <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6">
                  <button onClick={() => handleNavigate("my-gigs")} className="text-left">
                    <div className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                      <Briefcase size={16} />
                      My Posted Gigs
                    </div>
                    <p className="text-slate-400 text-sm">Manage your job postings</p>
                  </button>
                  <button onClick={() => handleNavigate("my-bids")} className="text-left">
                    <div className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                      <FileText size={16} />
                      My Bids
                    </div>
                    <p className="text-slate-400 text-sm">Track your bid submissions</p>
                  </button>
                  <button onClick={() => handleNavigate("profile")} className="text-left">
                    <div className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                      <User size={16} />
                      Active Contracts
                    </div>
                    <p className="text-slate-400 text-sm">View hired jobs in progress</p>
                  </button>
                </div>
              </div>
            )}

            {openDropdown === "more" && (
              <div className="bg-slate-800 border-b border-slate-700 p-4">
                <div className="max-w-7xl mx-auto grid grid-cols-4 gap-6">
                  <button className="text-left">
                    <div className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                      <MessageSquare size={16} />
                      Messages
                    </div>
                    <p className="text-slate-400 text-sm">Chat with clients/freelancers</p>
                  </button>
                  <button className="text-left">
                    <div className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                      <Bell size={16} />
                      Notifications
                    </div>
                    <p className="text-slate-400 text-sm">View all alerts and updates</p>
                  </button>
                  <button className="text-left">
                    <div className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                      <Settings size={16} />
                      Settings
                    </div>
                    <p className="text-slate-400 text-sm">Manage account preferences</p>
                  </button>
                  <button className="text-left">
                    <div className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                      <HelpCircle size={16} />
                      Help
                    </div>
                    <p className="text-slate-400 text-sm">Support and documentation</p>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
