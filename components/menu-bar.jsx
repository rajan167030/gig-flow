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
  ChevronLeft,
  ChevronRight,
  BarChart3,
  FolderOpen,
  User,
  Bell,
  UserCircle,
} from "lucide-react"

import { useState as useReactState } from "react"
import { ProfileMenuCard } from "./profile-menu-card"

export function MenuBar({ onNavigate, activeTab }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)
  const [showProfileMenu, setShowProfileMenu] = useReactState(false)

  const handleMenuClick = (tab) => {
    onNavigate?.(tab)
  }

  const menuItems = [
    {
      id: "browse",
      label: "Dashboard",
      icon: Home,
      description: "Overview & Analytics"
    },
    
    {
      id: "my-gigs",
      label: "My Gigs",
      icon: Briefcase,
      description: "Posted Projects"
    },
    {
      id: "my-bids",
      label: "My Bids",
      icon: FileText,
      description: "Active Proposals"
    },
    {
      id: "messages",
      label: "Messages",
      icon: MessageSquare,
      description: "Communications"
    },
    {
      id: "earnings",
      label: "Earnings",
      icon: DollarSign,
      description: "Financial Overview"
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      description: "Performance Metrics"
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      description: "Account Settings"
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
      description: "View Profile"
    }
  ]

  return (
    <div className={`bg-black border-r border-gray-800/50 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } min-h-screen fixed top-0 left-0 z-30 premium-sidebar`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-800/50 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-semibold text-sm">GigFlow</h2>
              <p className="text-gray-400 text-xs">Dashboard</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="p-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          const isHovered = hoveredItem === item.id

          return (
            <div
              key={item.id}
              className="relative"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <button
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25'
                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                }`}
              >
                <Icon
                  size={20}
                  className={`flex-shrink-0 transition-colors ${
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                  }`}
                />
                {!isCollapsed && (
                  <>
                    <span className="font-medium text-sm">{item.label}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </>
                )}
              </button>

              {/* Tooltip for collapsed state */}
              {isCollapsed && isHovered && (
                <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-slate-800 text-white px-3 py-2 rounded-lg shadow-lg border border-slate-700 z-50 whitespace-nowrap">
                  <div className="font-medium text-sm">{item.label}</div>
                  <div className="text-xs text-slate-400">{item.description}</div>
                  <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-slate-800"></div>
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Bottom Section with Profile Icon */}
      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-800/50">
        {!isCollapsed ? (
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors text-sm" onClick={() => setShowProfileMenu(true)}>
              <UserCircle size={20} />
              Profile
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors text-sm">
              <HelpCircle size={18} />
              Help & Support
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors text-sm">
              <Settings size={18} />
              Settings
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors" onClick={() => setShowProfileMenu(true)}>
              <UserCircle size={20} />
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors">
              <HelpCircle size={18} />
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors">
              <Settings size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Profile Card Modal */}
      {showProfileMenu && <ProfileMenuCard onClose={() => setShowProfileMenu(false)} />}
    </div>
  )
}
