import { useState } from "react"
import { useAuthStore } from "../lib/store"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { User as UserIcon, LogOut, LogIn } from "lucide-react"

export function ProfileMenuCard({ onClose }) {
  const { user, logout, login } = useAuthStore()
  const [showLogin, setShowLogin] = useState(false)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()
    setError("")
    if (!email || !name) {
      setError("Please fill in all fields")
      return
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address")
      return
    }
    login(email, name)
    setShowLogin(false)
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <Card className="w-full max-w-xs p-6 premium-card relative" onClick={e => e.stopPropagation()}>
        <div className="flex flex-col items-center gap-4">
          <UserIcon className="w-12 h-12 text-indigo-400 mb-2" />
          {user ? (
            <>
              <h2 className="text-xl font-bold text-white">{user.name}</h2>
              <p className="text-gray-400 text-sm mb-2">{user.email}</p>
              <Button onClick={logout} className="w-full flex gap-2 items-center">
                <LogOut className="w-5 h-5" /> Log Out
              </Button>
            </>
          ) : showLogin ? (
            <form onSubmit={handleLogin} className="w-full space-y-3">
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Full Name"
                className="premium-input w-full"
              />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email Address"
                className="premium-input w-full"
              />
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <Button type="submit" className="w-full flex gap-2 items-center">
                <LogIn className="w-5 h-5" /> Log In
              </Button>
            </form>
          ) : (
            <Button onClick={() => setShowLogin(true)} className="w-full flex gap-2 items-center">
              <LogIn className="w-5 h-5" /> Log In
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
