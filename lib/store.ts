import { create } from "zustand"

export interface User {
  id: string
  name: string
  email: string
  role: "client" | "freelancer" | null
  budget?: number
}

export interface Gig {
  id: string
  title: string
  description: string
  budget: number
  clientId: string
  clientName: string
  status: "open" | "assigned" | "completed"
  bidsCount: number
  createdAt: string
}

export interface Bid {
  id: string
  gigId: string
  freelancerId: string
  freelancerName: string
  amount: number
  message: string
  status: "pending" | "hired" | "rejected"
  createdAt: string
}

interface AuthStore {
  user: User | null
  gigs: Gig[]
  bids: Bid[]
  login: (email: string, name: string) => void
  logout: () => void
  postGig: (title: string, description: string, budget: number) => void
  submitBid: (gigId: string, amount: number, message: string) => void
  hireBidder: (gigId: string, bidId: string) => void
  deleteGig: (gigId: string) => void
}

// Mock data
const INITIAL_GIGS: Gig[] = [
  {
    id: "1",
    title: "Build a React Dashboard",
    description: "Need a responsive admin dashboard with charts and tables.",
    budget: 1500,
    clientId: "client-1",
    clientName: "Sarah Chen",
    status: "open",
    bidsCount: 3,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    title: "API Development",
    description: "REST API for e-commerce platform with authentication.",
    budget: 2500,
    clientId: "client-2",
    clientName: "John Smith",
    status: "open",
    bidsCount: 5,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    title: "UI/UX Design",
    description: "Design mockups for mobile app (5 screens).",
    budget: 800,
    clientId: "client-3",
    clientName: "Emily Wong",
    status: "open",
    bidsCount: 2,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
]

const INITIAL_BIDS: Bid[] = [
  {
    id: "bid-1",
    gigId: "1",
    freelancerId: "freelancer-1",
    freelancerName: "Alex Johnson",
    amount: 1200,
    message: "I have 5 years of React experience. Can deliver in 1 week.",
    status: "pending",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "bid-2",
    gigId: "1",
    freelancerId: "freelancer-2",
    freelancerName: "Maria Garcia",
    amount: 1400,
    message: "Expert in React and TypeScript. Fast delivery guaranteed.",
    status: "pending",
    createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "bid-3",
    gigId: "1",
    freelancerId: "freelancer-3",
    freelancerName: "David Kim",
    amount: 1000,
    message: "Competitive rate, excellent communication.",
    status: "pending",
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
]

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  gigs: INITIAL_GIGS,
  bids: INITIAL_BIDS,

  login: (email: string, name: string) =>
    set({
      user: {
        id: `user-${Date.now()}`,
        name,
        email,
        role: null,
      },
    }),

  logout: () => set({ user: null }),

  postGig: (title: string, description: string, budget: number) =>
    set((state) => {
      if (!state.user) return state
      const newGig: Gig = {
        id: `gig-${Date.now()}`,
        title,
        description,
        budget,
        clientId: state.user.id,
        clientName: state.user.name,
        status: "open",
        bidsCount: 0,
        createdAt: new Date().toISOString(),
      }
      return { gigs: [...state.gigs, newGig] }
    }),

  submitBid: (gigId: string, amount: number, message: string) =>
    set((state) => {
      if (!state.user) return state
      const newBid: Bid = {
        id: `bid-${Date.now()}`,
        gigId,
        freelancerId: state.user.id,
        freelancerName: state.user.name,
        amount,
        message,
        status: "pending",
        createdAt: new Date().toISOString(),
      }
      const updatedGigs = state.gigs.map((gig) => (gig.id === gigId ? { ...gig, bidsCount: gig.bidsCount + 1 } : gig))
      return { bids: [...state.bids, newBid], gigs: updatedGigs }
    }),

  hireBidder: (gigId: string, bidId: string) =>
    set((state) => {
      // Mark the gig as assigned
      const updatedGigs = state.gigs.map((gig) => (gig.id === gigId ? { ...gig, status: "assigned" } : gig))

      // Mark the hired bid as hired, and all other bids for this gig as rejected
      const updatedBids = state.bids.map((bid) => {
        if (bid.id === bidId) {
          return { ...bid, status: "hired" }
        }
        if (bid.gigId === gigId && bid.status === "pending") {
          return { ...bid, status: "rejected" }
        }
        return bid
      })

      return { gigs: updatedGigs, bids: updatedBids }
    }),

  deleteGig: (gigId: string) =>
    set((state) => ({
      gigs: state.gigs.filter((gig) => gig.id !== gigId),
      bids: state.bids.filter((bid) => bid.gigId !== gigId),
    })),
}))
