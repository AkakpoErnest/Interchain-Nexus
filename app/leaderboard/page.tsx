"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

// Simplified leaderboard data
const mockLeaderboardData = [
  {
    rank: 1,
    player: '0x742d35Cc6C4C7b8c8c8c8c8c8c8c8c8c8c8f3a',
    ensName: 'nexus.master.eth',
    realmsUnified: 4,
    totalScore: 1250,
    pioneerCards: [
      { name: 'Oracle Seer', realm: 'Flare', icon: '🔮' },
      { name: 'Identity Guardian', realm: 'ENS', icon: '🛡️' },
      { name: 'Data Weaver', realm: 'Filecoin', icon: '🗄️' },
      { name: 'Social Architect', realm: 'Lisk', icon: '🏗️' }
    ],
    achievements: ['🌟', '👑', '🏗️', '🗄️']
  },
  {
    rank: 2,
    player: '0x8b1c35Cc6C4C7b8c8c8c8c8c8c8c8c8c8c9e2d',
    ensName: 'oracle.seer.eth',
    realmsUnified: 3,
    totalScore: 980,
    pioneerCards: [
      { name: 'Oracle Seer', realm: 'Flare', icon: '🔮' },
      { name: 'Data Weaver', realm: 'Filecoin', icon: '🗄️' },
      { name: 'Identity Guardian', realm: 'ENS', icon: '🛡️' }
    ],
    achievements: ['🌟', '🔮', '🗄️']
  },
  {
    rank: 3,
    player: '0x3f7a35Cc6C4C7b8c8c8c8c8c8c8c8c8c8c4c8b',
    ensName: 'data.weaver.eth',
    realmsUnified: 2,
    totalScore: 650,
    pioneerCards: [
      { name: 'Data Weaver', realm: 'Filecoin', icon: '🗄️' },
      { name: 'Social Architect', realm: 'Lisk', icon: '🏗️' }
    ],
    achievements: ['🌟', '🗄️']
  }
]

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState(mockLeaderboardData)
  const [loading, setLoading] = useState(false)
  const [sortBy, setSortBy] = useState<"score" | "realms">("score")
  const [filterBy, setFilterBy] = useState<"all" | "nexus-masters" | "realm-guardians" | "chain-walkers">("all")

  // Apply filters and sorting
  const filteredAndSortedLeaderboard = (() => {
    let filtered = leaderboard

    // Apply filters
    switch (filterBy) {
      case "nexus-masters":
        filtered = leaderboard.filter(p => p.realmsUnified === 4)
        break
      case "realm-guardians":
        filtered = leaderboard.filter(p => p.realmsUnified >= 2 && p.realmsUnified <= 3)
        break
      case "chain-walkers":
        filtered = leaderboard.filter(p => p.realmsUnified === 1)
        break
      default:
        filtered = leaderboard
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      if (sortBy === "score") return b.totalScore - a.totalScore
      return b.realmsUnified - a.realmsUnified
    })
  })()

  const getRankDisplay = (rank: number) => {
    if (rank === 1) return { icon: '🥇', color: 'text-yellow-400 border-yellow-400/50', title: 'Nexus Master' }
    if (rank === 2) return { icon: '🥈', color: 'text-gray-300 border-gray-300/50', title: 'Realm Guardian' }
    if (rank === 3) return { icon: '🥉', color: 'text-amber-600 border-amber-600/50', title: 'Chain Walker' }
    return { icon: `#${rank}`, color: 'text-blue-400 border-blue-400/50', title: 'Pioneer' }
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
              <Card className="glow-hover bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    {leaderboard.filter(p => p.realmsUnified === 4).length}
                  </div>
                  <p className="text-muted-foreground">Nexus Masters</p>
                  <p className="text-xs text-muted-foreground">All 4 Realms</p>
                </CardContent>
              </Card>
              <Card className="glow-hover bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {leaderboard.length}
                  </div>
                  <p className="text-muted-foreground">Total Pioneers</p>
                  <p className="text-xs text-muted-foreground">Active Players</p>
                </CardContent>
              </Card>
              <Card className="glow-hover bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-accent mb-2">
                    {leaderboard.length > 0 ? Math.round(leaderboard.reduce((acc, p) => acc + p.realmsUnified, 0) / leaderboard.length * 10) / 10 : 0}
                  </div>
                  <p className="text-muted-foreground">Avg Realms</p>
                  <p className="text-xs text-muted-foreground">Per Player</p>
                </CardContent>
              </Card>
              <Card className="glow-hover bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">
                    {leaderboard.length > 0 ? Math.round(leaderboard.reduce((acc, p) => acc + p.totalScore, 0) / leaderboard.length) : 0}
                  </div>
                  <p className="text-muted-foreground">Avg Score</p>
                  <p className="text-xs text-muted-foreground">Total Points</p>
                </CardContent>
              </Card>
            </div>

            {/* Filter and Sort Controls */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex gap-2">
                <Button
                  variant={filterBy === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterBy("all")}
                  className="glow-hover"
                >
                  All Pioneers
                </Button>
                <Button
                  variant={filterBy === "nexus-masters" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterBy("nexus-masters")}
                  className="glow-hover"
                >
                  Nexus Masters
                </Button>
                <Button
                  variant={filterBy === "realm-guardians" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterBy("realm-guardians")}
                  className="glow-hover"
                >
                  Realm Guardians
                </Button>
                <Button
                  variant={filterBy === "chain-walkers" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterBy("chain-walkers")}
                  className="glow-hover"
                >
                  Chain Walkers
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={sortBy === "score" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy("score")}
                  className="glow-hover"
                >
                  Score
                </Button>
                <Button
                  variant={sortBy === "realms" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy("realms")}
                  className="glow-hover"
                >
                  Realms
                </Button>
              </div>
            </div>
          </div>

          {/* Leaderboard Table */}
          <Card className="glow-hover bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Pioneer Rankings</CardTitle>
              <p className="text-center text-muted-foreground">
                Showing {filteredAndSortedLeaderboard.length} of {leaderboard.length} pioneers
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-2">Rank</th>
                      <th className="text-left py-4 px-2">Player</th>
                      <th className="text-left py-4 px-2">Score</th>
                      <th className="text-left py-4 px-2">Realms</th>
                      <th className="text-left py-4 px-2">Pioneers</th>
                      <th className="text-left py-4 px-2">Achievements</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAndSortedLeaderboard.map((entry, index) => {
                      const rankDisplay = getRankDisplay(entry.rank)
                      
                      return (
                        <motion.tr
                          key={entry.rank}
                          className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.05 }}
                        >
                          <td className="py-4 px-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl">{rankDisplay.icon}</span>
                              <div>
                                <div className="font-bold">{entry.rank}</div>
                                <div className="text-xs text-muted-foreground">{rankDisplay.title}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-2">
                            <div>
                              <div className="font-medium">{entry.ensName || 'Anonymous'}</div>
                              <div className="text-sm text-muted-foreground">
                                {entry.player.slice(0, 6)}...{entry.player.slice(-4)}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-2">
                            <div className="font-bold text-primary">{entry.totalScore.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">Total Points</div>
                          </td>
                          <td className="py-4 px-2">
                            <Badge 
                              variant="outline" 
                              className={rankDisplay.color}
                            >
                              {entry.realmsUnified}/4
                            </Badge>
                          </td>
                          <td className="py-4 px-2">
                            <div className="flex flex-wrap gap-1">
                              {entry.pioneerCards.map((card, cardIndex) => (
                                <div
                                  key={cardIndex}
                                  className="flex items-center space-x-1 text-xs"
                                  title={`${card.name} - ${card.realm}`}
                                >
                                  <span>{card.icon}</span>
                                  <span className="hidden sm:inline">{card.realm}</span>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="py-4 px-2">
                            <div className="flex flex-wrap gap-1">
                              {entry.achievements.map((achievement, achIndex) => (
                                <div
                                  key={achIndex}
                                  className="text-lg"
                                  title="Achievement"
                                >
                                  {achievement}
                                </div>
                              ))}
                            </div>
                          </td>
                        </motion.tr>
                      )
                    })}
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
                Join the pioneers and start your journey across the interchain realms. Mint NFTs, earn achievements, and build your legacy in the Nexus.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-6 glow-hover">
                  <a href="/choose">Begin Your Quest</a>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 glow-hover bg-transparent">
                  <a href="/inventory">View Inventory</a>
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