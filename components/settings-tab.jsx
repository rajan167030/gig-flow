"use client"

import { useState } from "react"
import { useAuthStore } from "../lib/store"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Palette,
  Trash2,
  Eye,
  EyeOff,
  Save,
  Mail,
  Lock,
  Globe,
  Moon,
  Sun,
  Smartphone,
  AlertTriangle
} from "lucide-react"

export function SettingsTab() {
  const user = useAuthStore((state) => state.user)
  const settings = useAuthStore((state) => state.settings)
  const updateSettings = useAuthStore((state) => state.updateSettings)
  const updateProfile = useAuthStore((state) => state.updateProfile)
  const [activeSection, setActiveSection] = useState("profile")
  const [showPassword, setShowPassword] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  // Profile settings state
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "",
    location: "",
    website: "",
    skills: "",
    hourlyRate: "",
    timezone: "UTC"
  })

  // Password settings state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  // Use settings from store
  const [notifications, setNotifications] = useState(settings.notifications)
  const [privacy, setPrivacy] = useState(settings.privacy)
  const [theme, setTheme] = useState(settings.appearance)

  const handleProfileUpdate = () => {
    updateProfile(profileData)
    // In a real app, this would also make an API call
    console.log("Profile updated:", profileData)
  }

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match")
      return
    }
    // In a real app, this would make an API call
    console.log("Changing password")
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
  }

  const handleNotificationUpdate = () => {
    updateSettings("notifications", notifications)
    console.log("Notifications updated:", notifications)
  }

  const handlePrivacyUpdate = () => {
    updateSettings("privacy", privacy)
    console.log("Privacy updated:", privacy)
  }

  const handleThemeUpdate = () => {
    updateSettings("appearance", theme)
    console.log("Theme updated:", theme)
  }

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // In a real app, this would make an API call
      console.log("Deleting account")
    }
  }

  const sections = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Eye },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "danger", label: "Danger Zone", icon: AlertTriangle }
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Settings Header */}
      <div className="premium-card p-6">
        <h1 className="text-2xl font-bold text-white mb-2">Account Settings</h1>
        <p className="text-gray-400">Manage your account preferences and settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card className="premium-card p-4">
            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? "bg-purple-600/20 text-purple-300 border border-purple-500/30"
                        : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm font-medium">{section.label}</span>
                  </button>
                )
              })}
            </nav>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {/* Profile Settings */}
          {activeSection === "profile" && (
            <Card className="premium-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <User className="text-purple-400" size={24} />
                <h2 className="text-xl font-semibold text-white">Profile Information</h2>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                    <Input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="premium-input"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                    <Input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="premium-input"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    className="w-full px-3 py-2 premium-input text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-md"
                    rows={4}
                    placeholder="Tell others about yourself, your experience, and what you do..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                    <Input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      className="premium-input"
                      placeholder="City, Country"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
                    <Input
                      type="url"
                      value={profileData.website}
                      onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                      className="premium-input"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Skills</label>
                    <Input
                      type="text"
                      value={profileData.skills}
                      onChange={(e) => setProfileData({...profileData, skills: e.target.value})}
                      className="premium-input"
                      placeholder="React, Node.js, Python..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Hourly Rate ($)</label>
                    <Input
                      type="number"
                      value={profileData.hourlyRate}
                      onChange={(e) => setProfileData({...profileData, hourlyRate: e.target.value})}
                      className="premium-input"
                      placeholder="50"
                      min="1"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleProfileUpdate} className="premium-button">
                    <Save size={16} className="mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Security Settings */}
          {activeSection === "security" && (
            <Card className="premium-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="text-purple-400" size={24} />
                <h2 className="text-xl font-semibold text-white">Security Settings</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                      <div className="relative">
                        <Input
                          type={showCurrentPassword ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                          className="premium-input pr-10"
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                        <div className="relative">
                          <Input
                            type={showNewPassword ? "text" : "password"}
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                            className="premium-input pr-10"
                            placeholder="Enter new password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                          >
                            {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                        <Input
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                          className="premium-input"
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handlePasswordChange} className="premium-button">
                        <Lock size={16} className="mr-2" />
                        Update Password
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-700/50 pt-6">
                  <h3 className="text-lg font-medium text-white mb-4">Two-Factor Authentication</h3>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">SMS Authentication</p>
                        <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
                      </div>
                      <Button variant="outline" className="text-gray-300 border-gray-600 hover:bg-gray-800/50">
                        Enable
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-700/50 pt-6">
                  <h3 className="text-lg font-medium text-white mb-4">Active Sessions</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">Current Session</p>
                          <p className="text-gray-400 text-sm">Chrome on Windows • Active now</p>
                        </div>
                        <span className="text-green-400 text-sm">Current</span>
                      </div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">Mobile App</p>
                          <p className="text-gray-400 text-sm">iPhone • Last active 2 hours ago</p>
                        </div>
                        <Button variant="outline" size="sm" className="text-red-400 border-red-600 hover:bg-red-500/10">
                          Revoke
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Notifications Settings */}
          {activeSection === "notifications" && (
            <Card className="premium-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="text-purple-400" size={24} />
                <h2 className="text-xl font-semibold text-white">Notification Preferences</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Email Notifications</h3>
                  <div className="space-y-4">
                    {[
                      { key: "bidNotifications", label: "New bids on my gigs", desc: "Get notified when someone bids on your posted gigs" },
                      { key: "messageNotifications", label: "New messages", desc: "Receive notifications for new messages" },
                      { key: "marketingEmails", label: "Marketing emails", desc: "Receive updates about new features and promotions" },
                      { key: "weeklyDigest", label: "Weekly digest", desc: "Get a weekly summary of your activity" }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                        <div>
                          <p className="text-white font-medium">{item.label}</p>
                          <p className="text-gray-400 text-sm">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications[item.key]}
                            onChange={(e) => setNotifications({...notifications, [item.key]: e.target.checked})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-700/50 pt-6">
                  <h3 className="text-lg font-medium text-white mb-4">Push Notifications</h3>
                  <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Browser notifications</p>
                      <p className="text-gray-400 text-sm">Receive push notifications in your browser</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.pushNotifications}
                        onChange={(e) => setNotifications({...notifications, pushNotifications: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleNotificationUpdate} className="premium-button">
                    <Save size={16} className="mr-2" />
                    Save Preferences
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Privacy Settings */}
          {activeSection === "privacy" && (
            <Card className="premium-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <Eye className="text-purple-400" size={24} />
                <h2 className="text-xl font-semibold text-white">Privacy Settings</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Profile Visibility</h3>
                  <div className="space-y-3">
                    {[
                      { value: "public", label: "Public", desc: "Anyone can see your profile" },
                      { value: "private", label: "Private", desc: "Only you can see your profile" },
                      { value: "clients", label: "Clients Only", desc: "Only clients you've worked with can see your profile" }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center p-4 bg-gray-800/50 rounded-lg cursor-pointer hover:bg-gray-700/50">
                        <input
                          type="radio"
                          name="profileVisibility"
                          value={option.value}
                          checked={privacy.profileVisibility === option.value}
                          onChange={(e) => setPrivacy({...privacy, profileVisibility: e.target.value})}
                          className="text-purple-600 focus:ring-purple-500"
                        />
                        <div className="ml-3">
                          <p className="text-white font-medium">{option.label}</p>
                          <p className="text-gray-400 text-sm">{option.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-700/50 pt-6">
                  <h3 className="text-lg font-medium text-white mb-4">Privacy Options</h3>
                  <div className="space-y-4">
                    {[
                      { key: "showOnlineStatus", label: "Show online status", desc: "Let others see when you're online" },
                      { key: "showEmail", label: "Show email address", desc: "Display your email on your public profile" },
                      { key: "allowMessages", label: "Allow direct messages", desc: "Let other users send you messages" },
                      { key: "showActivity", label: "Show activity status", desc: "Display when you were last active" }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                        <div>
                          <p className="text-white font-medium">{item.label}</p>
                          <p className="text-gray-400 text-sm">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={privacy[item.key]}
                            onChange={(e) => setPrivacy({...privacy, [item.key]: e.target.checked})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handlePrivacyUpdate} className="premium-button">
                    <Save size={16} className="mr-2" />
                    Save Settings
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Billing Settings */}
          {activeSection === "billing" && (
            <Card className="premium-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="text-purple-400" size={24} />
                <h2 className="text-xl font-semibold text-white">Billing & Payments</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Payment Methods</h3>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="text-gray-400" size={20} />
                        <div>
                          <p className="text-white font-medium">•••• •••• •••• 4242</p>
                          <p className="text-gray-400 text-sm">Expires 12/25</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="text-gray-300 border-gray-600 hover:bg-gray-800/50">
                        Edit
                      </Button>
                    </div>
                  </div>
                  <Button className="mt-4 premium-button">
                    <CreditCard size={16} className="mr-2" />
                    Add Payment Method
                  </Button>
                </div>

                <div className="border-t border-gray-700/50 pt-6">
                  <h3 className="text-lg font-medium text-white mb-4">Billing History</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">Premium Subscription</p>
                          <p className="text-gray-400 text-sm">January 15, 2024</p>
                        </div>
                        <div className="text-right">
                          <p className="text-green-400 font-medium">$29.99</p>
                          <p className="text-gray-400 text-sm">Paid</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">Service Fee</p>
                          <p className="text-gray-400 text-sm">January 10, 2024</p>
                        </div>
                        <div className="text-right">
                          <p className="text-green-400 font-medium">$5.00</p>
                          <p className="text-gray-400 text-sm">Paid</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Appearance Settings */}
          {activeSection === "appearance" && (
            <Card className="premium-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <Palette className="text-purple-400" size={24} />
                <h2 className="text-xl font-semibold text-white">Appearance</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Theme</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center p-4 bg-gray-800/50 rounded-lg cursor-pointer hover:bg-gray-700/50">
                      <input
                        type="radio"
                        name="theme"
                        value="dark"
                        checked={theme.mode === "dark"}
                        onChange={(e) => setTheme({...theme, mode: e.target.value})}
                        className="text-purple-600 focus:ring-purple-500"
                      />
                      <div className="ml-3 flex items-center gap-3">
                        <Moon size={20} className="text-purple-400" />
                        <div>
                          <p className="text-white font-medium">Dark</p>
                          <p className="text-gray-400 text-sm">Default dark theme</p>
                        </div>
                      </div>
                    </label>
                    <label className="flex items-center p-4 bg-gray-800/50 rounded-lg cursor-pointer hover:bg-gray-700/50">
                      <input
                        type="radio"
                        name="theme"
                        value="light"
                        checked={theme.mode === "light"}
                        onChange={(e) => setTheme({...theme, mode: e.target.value})}
                        className="text-purple-600 focus:ring-purple-500"
                      />
                      <div className="ml-3 flex items-center gap-3">
                        <Sun size={20} className="text-yellow-400" />
                        <div>
                          <p className="text-white font-medium">Light</p>
                          <p className="text-gray-400 text-sm">Light theme</p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Accent Color</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { value: "purple", color: "bg-purple-600", label: "Purple" },
                      { value: "blue", color: "bg-blue-600", label: "Blue" },
                      { value: "green", color: "bg-green-600", label: "Green" },
                      { value: "red", color: "bg-red-600", label: "Red" }
                    ].map((color) => (
                      <label key={color.value} className="cursor-pointer">
                        <input
                          type="radio"
                          name="accentColor"
                          value={color.value}
                          checked={theme.accentColor === color.value}
                          onChange={(e) => setTheme({...theme, accentColor: e.target.value})}
                          className="sr-only"
                        />
                        <div className={`w-full h-12 ${color.color} rounded-lg flex items-center justify-center transition-all ${
                          theme.accentColor === color.value ? "ring-2 ring-white ring-offset-2 ring-offset-gray-900" : ""
                        }`}>
                          <span className="text-white text-sm font-medium">{color.label}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Font Size</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: "small", label: "Small" },
                      { value: "medium", label: "Medium" },
                      { value: "large", label: "Large" }
                    ].map((size) => (
                      <label key={size.value} className="flex items-center p-4 bg-gray-800/50 rounded-lg cursor-pointer hover:bg-gray-700/50">
                        <input
                          type="radio"
                          name="fontSize"
                          value={size.value}
                          checked={theme.fontSize === size.value}
                          onChange={(e) => setTheme({...theme, fontSize: e.target.value})}
                          className="text-purple-600 focus:ring-purple-500"
                        />
                        <span className="ml-3 text-white font-medium">{size.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleThemeUpdate} className="premium-button">
                    <Save size={16} className="mr-2" />
                    Apply Changes
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Danger Zone */}
          {activeSection === "danger" && (
            <Card className="premium-card p-6 border-red-500/30">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="text-red-400" size={24} />
                <h2 className="text-xl font-semibold text-white">Danger Zone</h2>
              </div>

              <div className="space-y-6">
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-2">Delete Account</h3>
                  <p className="text-red-300 text-sm mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Type "DELETE" to confirm
                      </label>
                      <Input
                        type="text"
                        className="premium-input border-red-500/30 focus:border-red-500"
                        placeholder="DELETE"
                      />
                    </div>
                    <Button
                      onClick={handleDeleteAccount}
                      className="bg-red-600 hover:bg-red-700 text-white border-red-600"
                    >
                      <Trash2 size={16} className="mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>

                <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-2">Deactivate Account</h3>
                  <p className="text-amber-300 text-sm mb-4">
                    Temporarily deactivate your account. You can reactivate it anytime.
                  </p>
                  <Button variant="outline" className="text-amber-400 border-amber-600 hover:bg-amber-500/10">
                    Deactivate Account
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}