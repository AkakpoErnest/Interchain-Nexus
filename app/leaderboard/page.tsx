"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

interface LeaderboardEntry {
  rank: number
  player: string
  ensName: string
  realmsUnified: number
  totalCards: number
  pioneerCard: string
  joinDate: string
  lastActive: string
}

// Mock leaderboard data
const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    player: "0x742d...8f3a",
    ensName: "nexus.master.eth",
    realmsUnified: 5,
    totalCards: 6,
    pioneerCard: "The Social Architect",
    joinDate: "2024-01-15",
    lastActive: "2 hours ago"
  },
  {
    rank: 2,
    player: "0x8b1c...9e2d",
    ensName: "oracle.seer.eth",
    realmsUnified: 5,
    totalCards: 6,
    pioneerCard: "The Oracle Seer",
    joinDate: "2024-01-16",
    lastActive: "5 hours ago"
  },
  {
    rank: 3,
    player: "0x3f7a...4c8b",
    ensName: "data.weaver.eth",
    realmsUnified: 4,
    totalCards: 5,
    pioneerCard: "The Data Weaver",
    joinDate: "2024-01-17",
    lastActive: "1 day ago"
  },
  {
    rank: 4,
    player: "0x9e2d...7f3a",
    ensName: "identity.guardian.eth",
    realmsUnified: 4,
    totalCards: 5,
    pioneerCard: "The Identity Guardian",
    joinDate: "2024-01-18",
    lastActive: "2 days ago"
  },
  {
    rank: 5,
    player: "0x5c8b...2e7a",
    ensName: "builder.architect.eth",
    realmsUnified: 3,
    totalCards: 4,
    pioneerCard: "The Social Architect",
    joinDate: "2024-01-19",
    lastActive: "3 days ago"
  },
  {
    rank: 6,
    player: "0x2e7a...9c8b",
    ensName: "pioneer.eth",
    realmsUnified: 3,
    totalCards: 4,
    pioneerCard: "The Oracle Seer",
    joinDate: "2024-01-20",
    lastActive: "4 days ago"
  },
  {
    rank: 7,
    player: "0x7f3a...5c8b",
    ensName: "explorer.eth",
    realmsUnified: 2,
    totalCards: 3,
    pioneerCard: "The Data Weaver",
    joinDate: "2024-01-21",
    lastActive: "5 days ago"
  },
  {
    rank: 8,
    player: "0x4c8b...2e7a",
    ensName: "adventurer.eth",
    realmsUnified: 2,
    totalCards: 3,
    pioneerCard: "The Identity Guardian",
    joinDate: "2024-01-22",
    lastActive: "6 days ago"
  },
  {
    rank: 9,
    player: "0x8f3a...7c8b",
    ensName: "seeker.eth",
    realmsUnified: 1,
    totalCards: 2,
    pioneerCard: "The Social Architect",
    joinDate: "2024-01-23",
    lastActive: "1 week ago"
  },
  {
    rank: 10,
    player: "0x1c8b...9f3a",
    ensName: "wanderer.eth",
    realmsUnified: 1,
    totalCards: 2,
    pioneerCard: "The Oracle Seer",
    joinDate: "2024-01-24",
    lastActive: "1 week ago"
  }
]

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<"realms" | "cards" | "recent">("realms")

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLeaderboard(mockLeaderboard)
      setLoading(false)
    }, 1000)
  }, [])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇"
      case 2:
        return "🥈"
      case 3:
        return "🥉"
      default:
        return `#${rank}`
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-400 border-yellow-400/50"
      case 2:
        return "text-gray-300 border-gray-300/50"
      case 3:
        return "text-amber-600 border-amber-600/50"
      default:
        return "text-muted-foreground border-muted-foreground/20"
    }
  }

  const getRealmProgress = (realmsUnified: number) => {
    const realms = ["Archive", "Oracle", "Forge", "Identity", "Governance"]
    return realms.map((realm, index) => (
      <div
        key={realm}
        className={`w-3 h-3 rounded-full ${
          index < realmsUnified ? "bg-green-400" : "bg-muted-foreground/30"
        }`}
        title={`${realm} ${index < realmsUnified ? "Completed" : "Locked"}`}
      />
    ))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🌌</div>
          <p className="text-xl text-muted-foreground">Loading leaderboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <a href="/" className="text-xl font-bold text-primary text-glow hover:opacity-80 transition-opacity">
                Interchain Nexus
              </a>
              <div className="hidden md:flex space-x-6">
                <Button variant="ghost" className="glow-hover">
                  <a href="/inventory">Inventory</a>
                </Button>
                <Button variant="ghost" className="glow-hover">
                  <a href="/play">Play</a>
                </Button>
                <Button variant="ghost" className="glow-hover text-primary">
                  Leaderboard
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="hidden sm:flex glow">
                pioneer.eth
              </Badge>
              <Button variant="outline" className="glow-hover bg-transparent">
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1 
              className="text-4xl sm:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-glow">Nexus</span> <span className="text-primary">Leaderboard</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Ranked by the number of realms unified. Only the most dedicated pioneers make it to the top.
            </motion.p>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <Card className="glow-hover bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {leaderboard.filter(p => p.realmsUnified === 5).length}
                  </div>
                  <p className="text-muted-foreground">Nexus Masters</p>
                </CardContent>
              </Card>
              <Card className="glow-hover bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-accent mb-2">
                    {leaderboard.length}
                  </div>
                  <p className="text-muted-foreground">Total Pioneers</p>
                </CardContent>
              </Card>
              <Card className="glow-hover bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">
                    {Math.round(leaderboard.reduce((acc, p) => acc + p.realmsUnified, 0) / leaderboard.length * 10) / 10}
                  </div>
                  <p className="text-muted-foreground">Avg Realms</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Leaderboard Table */}
          <Card className="glow-hover bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Pioneer Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-2">Rank</th>
                      <th className="text-left py-4 px-2">Player</th>
                      <th className="text-left py-4 px-2">Realms Unified</th>
                      <th className="text-left py-4 px-2">Total Cards</th>
                      <th className="text-left py-4 px-2">Pioneer Card</th>
                      <th className="text-left py-4 px-2">Progress</th>
                      <th className="text-left py-4 px-2">Last Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((entry, index) => (
                      <motion.tr
                        key={entry.rank}
                        className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                      >
                        <td className="py-4 px-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl">{getRankIcon(entry.rank)}</span>
                            <span className="font-bold">{entry.rank}</span>
                          </div>
                        </td>
                        <td className="py-4 px-2">
                          <div>
                            <div className="font-medium">{entry.ensName}</div>
                            <div className="text-sm text-muted-foreground">{entry.player}</div>
                          </div>
                        </td>
                        <td className="py-4 px-2">
                          <Badge 
                            variant="outline" 
                            className={getRankColor(entry.rank)}
                          >
                            {entry.realmsUnified}/5
                          </Badge>
                        </td>
                        <td className="py-4 px-2">
                          <span className="font-medium">{entry.totalCards}</span>
                        </td>
                        <td className="py-4 px-2">
                          <span className="text-sm">{entry.pioneerCard}</span>
                        </td>
                        <td className="py-4 px-2">
                          <div className="flex space-x-1">
                            {getRealmProgress(entry.realmsUnified)}
                          </div>
                        </td>
                        <td className="py-4 px-2">
                          <span className="text-sm text-muted-foreground">{entry.lastActive}</span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-4">Ready to Climb the Rankings?</h2>
              <p className="text-muted-foreground mb-6">
                Join the pioneers and start your journey across the interchain realms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-6 glow-hover">
                  <a href="/choose">Begin Your Quest</a>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 glow-hover bg-transparent">
                  <a href="/play">Continue Playing</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
