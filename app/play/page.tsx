"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion, AnimatePresence } from "framer-motion"

type QuestState = "select" | "archive" | "oracle" | "forge" | "identity" | "governance" | "nexus"
type RealmStatus = "locked" | "available" | "completed"

interface RealmProgress {
  archive: RealmStatus
  oracle: RealmStatus
  forge: RealmStatus
  identity: RealmStatus
  governance: RealmStatus
}

interface PioneerCard {
  id: number
  name: string
  realm: string
  passiveBuff: string
}

export default function PlayPage() {
  const [questState, setQuestState] = useState<QuestState>("select")
  const [realmProgress, setRealmProgress] = useState<RealmProgress>({
    archive: "available",
    oracle: "locked",
    forge: "locked",
    identity: "locked",
    governance: "locked",
  })
  const [selectedPioneer, setSelectedPioneer] = useState<PioneerCard | null>(null)
  const [showNexusCore, setShowNexusCore] = useState(false)

  // Archive Realm state
  const [archiveAnswer, setArchiveAnswer] = useState("")
  const [archiveSubmitted, setArchiveSubmitted] = useState(false)
  const [archiveLoading, setArchiveLoading] = useState(false)

  // Oracle Realm state
  const [oracleRoll, setOracleRoll] = useState<number | null>(null)
  const [oracleLoading, setOracleLoading] = useState(false)
  const [oracleResult, setOracleResult] = useState<"success" | "failure" | null>(null)

  // Forge Realm state
  const [forgeProgress, setForgeProgress] = useState(0)
  const [forgeTimeLeft, setForgeTimeLeft] = useState(10)
  const [forgeActive, setForgeActive] = useState(false)
  const [forgeCompleted, setForgeCompleted] = useState(false)

  // Identity Realm state
  const [ensName, setEnsName] = useState("")
  const [identityLoading, setIdentityLoading] = useState(false)
  const [identitySubmitted, setIdentitySubmitted] = useState(false)

  // Governance Realm state
  const [governanceVote, setGovernanceVote] = useState<"yes" | "no" | null>(null)
  const [governanceLoading, setGovernanceLoading] = useState(false)
  const [governanceSubmitted, setGovernanceSubmitted] = useState(false)

  // Load selected pioneer from localStorage (simulated)
  useEffect(() => {
    const pioneer = localStorage.getItem("selectedPioneer")
    if (pioneer) {
      setSelectedPioneer(JSON.parse(pioneer))
    }
  }, [])

  // Forge timer
  useEffect(() => {
    if (forgeActive && forgeTimeLeft > 0) {
      const timer = setTimeout(() => setForgeTimeLeft(forgeTimeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (forgeActive && forgeTimeLeft === 0) {
      setForgeActive(false)
      if (forgeProgress < 10) {
        setForgeProgress(0)
        setForgeTimeLeft(10)
      }
    }
  }, [forgeActive, forgeTimeLeft, forgeProgress])

  const handleArchiveSubmit = async () => {
    if (archiveAnswer.toLowerCase() !== "memory") {
      return
    }

    setArchiveLoading(true)
    // Simulate Filecoin storage
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setArchiveSubmitted(true)
    setArchiveLoading(false)

    // Update progress
    setRealmProgress((prev) => ({
      ...prev,
      archive: "completed",
      oracle: "available",
    }))

    setTimeout(() => {
      setQuestState("select")
    }, 3000)
  }

  const handleOracleRoll = async () => {
    setOracleLoading(true)
    // Simulate Flare secure random
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const roll = Math.floor(Math.random() * 100) + 1
    setOracleRoll(roll)

    const success = roll >= 60 // Changed to 60 as per spec
    setOracleResult(success ? "success" : "failure")
    setOracleLoading(false)

    if (success) {
      setRealmProgress((prev) => ({
        ...prev,
        oracle: "completed",
        forge: "available",
      }))
    }

    setTimeout(() => {
      setQuestState("select")
    }, 4000)
  }

  const handleForgeTap = () => {
    if (!forgeActive) {
      setForgeActive(true)
      setForgeTimeLeft(10)
      setForgeProgress(0)
    }
    
    if (forgeActive && forgeTimeLeft > 0) {
      setForgeProgress(prev => {
        const newProgress = prev + 1
        if (newProgress >= 10) {
          setForgeCompleted(true)
          setForgeActive(false)
          setRealmProgress(prev => ({
            ...prev,
            forge: "completed",
            identity: "available",
          }))
          setTimeout(() => setQuestState("select"), 3000)
        }
        return newProgress
      })
    }
  }

  const handleIdentitySubmit = async () => {
    if (!ensName) return

    setIdentityLoading(true)
    // Simulate ENS check
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIdentitySubmitted(true)
    setIdentityLoading(false)

    setRealmProgress((prev) => ({
      ...prev,
      identity: "completed",
      governance: "available",
    }))

    setTimeout(() => {
      setQuestState("select")
    }, 3000)
  }

  const handleGovernanceVote = async (vote: "yes" | "no") => {
    setGovernanceVote(vote)
    setGovernanceLoading(true)
    // Simulate on-chain vote
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setGovernanceSubmitted(true)
    setGovernanceLoading(false)

    setRealmProgress((prev) => ({
      ...prev,
      governance: "completed",
    }))

    // Check if all realms completed
    const allCompleted = Object.values({...realmProgress, governance: "completed"}).every(status => status === "completed")
    if (allCompleted) {
      setTimeout(() => {
        setShowNexusCore(true)
        setQuestState("nexus")
      }, 3000)
    } else {
      setTimeout(() => {
        setQuestState("select")
      }, 3000)
    }
  }

  const getStatusColor = (status: RealmStatus) => {
    switch (status) {
      case "completed":
        return "text-green-400 border-green-400/50"
      case "available":
        return "text-primary border-primary/50"
      case "locked":
        return "text-muted-foreground border-muted-foreground/20"
    }
  }

  const getStatusText = (status: RealmStatus) => {
    switch (status) {
      case "completed":
        return "Completed"
      case "available":
        return "Available"
      case "locked":
        return "Locked"
    }
  }

  const completedRealms = Object.values(realmProgress).filter((status) => status === "completed").length
  const progressPercentage = (completedRealms / 5) * 100

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Background with your new images */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
        style={{
          backgroundImage: "url('/holographic-app-interface-deployment.png')"
        }}
      ></div>
      
      {/* Animated overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-pulse delay-3000"></div>
      </div>

      {/* Game HUD */}
      <div className="fixed top-4 left-4 z-40">
        <div className="bg-black/80 backdrop-blur-md border border-cyan-400/30 rounded-xl p-4">
          <div className="text-cyan-300 text-sm font-bold mb-2">PIONEER</div>
          <div className="text-white text-lg">{selectedPioneer?.name || "None Selected"}</div>
          <div className="text-gray-400 text-xs">{selectedPioneer?.realm || ""}</div>
        </div>
      </div>

      {/* Progress HUD */}
      <div className="fixed top-4 right-4 z-40">
        <div className="bg-black/80 backdrop-blur-md border border-purple-400/30 rounded-xl p-4 min-w-[200px]">
          <div className="text-purple-300 text-sm font-bold mb-2">REALMS UNIFIED</div>
          <div className="text-white text-2xl font-bold mb-2">{completedRealms}/5</div>
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-cyan-400/30">
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
                <Button variant="ghost" className="glow-hover text-primary">
                  Play
                </Button>
                <Button variant="ghost" className="glow-hover">
                  Leaderboard
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {selectedPioneer && (
                <Badge variant="secondary" className="hidden sm:flex glow">
                  {selectedPioneer.name}
                </Badge>
              )}
              <Button variant="outline" className="glow-hover bg-transparent">
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-glow">Quest</span> <span className="text-primary">Progress</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
              Journey through the fragmented realms to restore the Interchain Nexus
            </p>

            {/* Progress Bar */}
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-sm mb-2">
                <span>Realms Unified</span>
                <span className="text-primary">{completedRealms}/5</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>

          {questState === "select" && (
            <div className="space-y-8">
              {/* Realm Selection */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {/* Archive Realm */}
                <Card
                  className={`glow-hover bg-card/50 backdrop-blur-sm ${getStatusColor(realmProgress.archive)} transition-all duration-300 ${realmProgress.archive === "available" ? "hover:scale-105 cursor-pointer" : ""}`}
                  onClick={() => realmProgress.archive === "available" && setQuestState("archive")}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">A</span>
                      </div>
                      <Badge variant="outline" className={getStatusColor(realmProgress.archive)}>
                        {getStatusText(realmProgress.archive)}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">Vaults of Memory</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      The tablets awaken. Write what must not be forgotten.
                    </p>
                    <Badge variant="secondary" className="w-full justify-center">
                      Filecoin Storage
                    </Badge>
                  </CardContent>
                </Card>

                {/* Oracle Realm */}
                <Card
                  className={`glow-hover bg-card/50 backdrop-blur-sm ${getStatusColor(realmProgress.oracle)} transition-all duration-300 ${realmProgress.oracle === "available" ? "hover:scale-105 cursor-pointer" : ""}`}
                  onClick={() => realmProgress.oracle === "available" && setQuestState("oracle")}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                        <span className="text-2xl font-bold text-accent">O</span>
                      </div>
                      <Badge variant="outline" className={getStatusColor(realmProgress.oracle)}>
                        {getStatusText(realmProgress.oracle)}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">Oracle Spire</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Chance is the only judge. Throw the die, accept its verdict.
                    </p>
                    <Badge variant="secondary" className="w-full justify-center">
                      Flare Randomness
                    </Badge>
                  </CardContent>
                </Card>

                {/* Forge Realm */}
                <Card
                  className={`glow-hover bg-card/50 backdrop-blur-sm ${getStatusColor(realmProgress.forge)} transition-all duration-300 ${realmProgress.forge === "available" ? "hover:scale-105 cursor-pointer" : ""}`}
                  onClick={() => realmProgress.forge === "available" && setQuestState("forge")}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                        <span className="text-2xl font-bold text-secondary">F</span>
                      </div>
                      <Badge variant="outline" className={getStatusColor(realmProgress.forge)}>
                        {getStatusText(realmProgress.forge)}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">Forge Halls</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Sparks leap; creation awaits your touch.
                    </p>
                    <Badge variant="secondary" className="w-full justify-center">
                      Base Mini-App
                    </Badge>
                  </CardContent>
                </Card>

                {/* Identity Realm */}
                <Card
                  className={`glow-hover bg-card/50 backdrop-blur-sm ${getStatusColor(realmProgress.identity)} transition-all duration-300 ${realmProgress.identity === "available" ? "hover:scale-105 cursor-pointer" : ""}`}
                  onClick={() => realmProgress.identity === "available" && setQuestState("identity")}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                        <span className="text-2xl font-bold text-yellow-500">I</span>
                      </div>
                      <Badge variant="outline" className={getStatusColor(realmProgress.identity)}>
                        {getStatusText(realmProgress.identity)}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">Hall of Names</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      To lose your name is to vanish. Inscribe your truth.
                    </p>
                    <Badge variant="secondary" className="w-full justify-center">
                      ENS Names
                    </Badge>
                  </CardContent>
                </Card>

                {/* Governance Realm */}
                <Card
                  className={`glow-hover bg-card/50 backdrop-blur-sm ${getStatusColor(realmProgress.governance)} transition-all duration-300 ${realmProgress.governance === "available" ? "hover:scale-105 cursor-pointer" : ""}`}
                  onClick={() => realmProgress.governance === "available" && setQuestState("governance")}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <span className="text-2xl font-bold text-purple-500">G</span>
                      </div>
                      <Badge variant="outline" className={getStatusColor(realmProgress.governance)}>
                        {getStatusText(realmProgress.governance)}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">Council Chambers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Voices rise. One choice will echo across the Nexus.
                    </p>
                    <Badge variant="secondary" className="w-full justify-center">
                      On-chain Vote
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Archive Realm Challenge */}
          {questState === "archive" && (
            <div className="max-w-2xl mx-auto">
              <Card className="glow bg-card/50 backdrop-blur-sm border-primary/50">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl mb-4">Vaults of Memory Challenge</CardTitle>
                  <p className="text-muted-foreground">
                    The ancient vaults hold a scrambled word. Unscramble it to unlock the first key to the Nexus.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-mono bg-muted/50 rounded-lg p-6 mb-6 tracking-widest">
                      M E R O M Y
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Hint: What do the Archive Vaults preserve for eternity?
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="answer">Your Answer</Label>
                    <Input
                      id="answer"
                      value={archiveAnswer}
                      onChange={(e) => setArchiveAnswer(e.target.value)}
                      placeholder="Enter the unscrambled word..."
                      className="text-center text-lg"
                      disabled={archiveLoading || archiveSubmitted}
                    />
                  </div>

                  {archiveSubmitted ? (
                    <Alert className="border-green-500/50 bg-green-500/10">
                      <AlertDescription className="text-center">
                        ✅ Correct! Your answer has been stored on Filecoin. Memory Shard NFT earned!
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <div className="flex gap-4">
                      <Button
                        onClick={handleArchiveSubmit}
                        disabled={!archiveAnswer || archiveLoading}
                        className="flex-1"
                      >
                        {archiveLoading ? "Storing on Filecoin..." : "Submit Answer"}
                      </Button>
                      <Button variant="outline" onClick={() => setQuestState("select")} disabled={archiveLoading}>
                        Back
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Oracle Realm Challenge */}
          {questState === "oracle" && (
            <div className="max-w-2xl mx-auto">
              <Card className="glow bg-card/50 backdrop-blur-sm border-accent/50">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl mb-4">Oracle Spire Challenge</CardTitle>
                  <p className="text-muted-foreground">
                    The Oracle speaks in numbers and chance. Roll the dice of fate to prove your worthiness.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-6xl mb-4 font-bold text-accent">DICE</div>
                    <p className="text-lg mb-6">
                      You need to roll <span className="text-accent font-bold">60 or higher</span> to succeed
                    </p>

                    {oracleRoll !== null && (
                      <div className="space-y-4">
                        <div className="text-5xl font-bold text-accent">{oracleRoll}</div>
                        {oracleResult === "success" ? (
                          <Alert className="border-green-500/50 bg-green-500/10">
                            <AlertDescription className="text-center">
                              🎉 Success! The Oracle smiles upon you. Oracle Seal NFT earned!
                            </AlertDescription>
                          </Alert>
                        ) : (
                          <Alert className="border-red-500/50 bg-red-500/10">
                            <AlertDescription className="text-center">
                              💀 The fates were not kind. Try again when you're ready.
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    )}
                  </div>

                  {oracleRoll === null ? (
                    <div className="flex gap-4">
                      <Button onClick={handleOracleRoll} disabled={oracleLoading} className="flex-1">
                        {oracleLoading ? "Consulting Flare Oracle..." : "Roll the Dice"}
                      </Button>
                      <Button variant="outline" onClick={() => setQuestState("select")} disabled={oracleLoading}>
                        Back
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-4">
                      <Button
                        onClick={() => {
                          setOracleRoll(null)
                          setOracleResult(null)
                        }}
                        disabled={oracleLoading}
                        className="flex-1"
                      >
                        Roll Again
                      </Button>
                      <Button variant="outline" onClick={() => setQuestState("select")}>
                        Back to Realms
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Forge Realm Challenge */}
          {questState === "forge" && (
            <div className="max-w-2xl mx-auto">
              <Card className="glow bg-card/50 backdrop-blur-sm border-secondary/50">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl mb-4">Forge Halls Challenge</CardTitle>
                  <p className="text-muted-foreground">
                    Tap to build your mini-app! You must tap 10 times within 10 seconds to succeed.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-6xl mb-4 font-bold text-secondary">BUILD</div>
                    <div className="space-y-4">
                      <div className="text-2xl font-bold">
                        Progress: {forgeProgress}/10
                      </div>
                      <Progress value={(forgeProgress / 10) * 100} className="h-3" />
                      {forgeActive && (
                        <div className="text-lg text-accent">
                          Time Left: {forgeTimeLeft}s
                        </div>
                      )}
                    </div>
                  </div>

                  {forgeCompleted ? (
                    <Alert className="border-green-500/50 bg-green-500/10">
                      <AlertDescription className="text-center">
                        🎉 Forge complete! Your mini-app has been deployed. Forge Ember NFT earned!
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <div className="flex gap-4">
                      <Button
                        onClick={handleForgeTap}
                        disabled={forgeActive && forgeTimeLeft === 0}
                        className="flex-1 text-lg py-6"
                      >
                        {forgeActive ? "Tap to Build!" : "Start Building"}
                      </Button>
                      <Button variant="outline" onClick={() => setQuestState("select")}>
                        Back
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Identity Realm Challenge */}
          {questState === "identity" && (
            <div className="max-w-2xl mx-auto">
              <Card className="glow bg-card/50 backdrop-blur-sm border-yellow-500/50">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl mb-4">Hall of Names Challenge</CardTitle>
                  <p className="text-muted-foreground">
                    Prove your identity by engraving your ENS name into the sacred registry.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-6xl mb-4 font-bold text-yellow-500">NAME</div>
                    <p className="text-lg mb-6">
                      Enter your ENS name to engrave it into the metadata
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="ensName">ENS Name</Label>
                    <Input
                      id="ensName"
                      value={ensName}
                      onChange={(e) => setEnsName(e.target.value)}
                      placeholder="pioneer.eth"
                      className="text-center text-lg"
                      disabled={identityLoading || identitySubmitted}
                    />
                  </div>

                  {identitySubmitted ? (
                    <Alert className="border-green-500/50 bg-green-500/10">
                      <AlertDescription className="text-center">
                        ✅ Identity verified! Your name has been engraved. True Name NFT earned!
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <div className="flex gap-4">
                      <Button
                        onClick={handleIdentitySubmit}
                        disabled={!ensName || identityLoading}
                        className="flex-1"
                      >
                        {identityLoading ? "Engraving Name..." : "Engrave Name"}
                      </Button>
                      <Button variant="outline" onClick={() => setQuestState("select")} disabled={identityLoading}>
                        Back
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Governance Realm Challenge */}
          {questState === "governance" && (
            <div className="max-w-2xl mx-auto">
              <Card className="glow bg-card/50 backdrop-blur-sm border-purple-500/50">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl mb-4">Council Chambers Challenge</CardTitle>
                  <p className="text-muted-foreground">
                    Cast your vote on the future of the Nexus. Your choice will be recorded on-chain.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-6xl mb-4 font-bold text-purple-500">VOTE</div>
                    <p className="text-lg mb-6">
                      Should the Nexus be governed by decentralized consensus?
                    </p>
                  </div>

                  {governanceSubmitted ? (
                    <Alert className="border-green-500/50 bg-green-500/10">
                      <AlertDescription className="text-center">
                        ✅ Vote recorded on-chain! Your voice has been heard. Council Mark NFT earned!
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          onClick={() => handleGovernanceVote("yes")}
                          disabled={governanceLoading}
                          className="text-lg py-6"
                          variant={governanceVote === "yes" ? "default" : "outline"}
                        >
                          Yes
                        </Button>
                        <Button
                          onClick={() => handleGovernanceVote("no")}
                          disabled={governanceLoading}
                          className="text-lg py-6"
                          variant={governanceVote === "no" ? "default" : "outline"}
                        >
                          No
                        </Button>
                      </div>
                      <Button variant="outline" onClick={() => setQuestState("select")} disabled={governanceLoading}>
                        Back
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Nexus Core Finale */}
          {questState === "nexus" && showNexusCore && (
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <Card className="glow bg-card/50 backdrop-blur-sm border-primary/50">
                <CardHeader className="text-center">
                  <motion.div
                    className="text-8xl mb-6 font-bold text-cyan-400"
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    NEXUS
                  </motion.div>
                  <CardTitle className="text-4xl mb-4">The Nexus Core</CardTitle>
                  <p className="text-xl text-muted-foreground">
                    All five realms have been unified! The Nexus Core has been forged from your journey across the interchain.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert className="border-yellow-500/50 bg-yellow-500/10">
                    <AlertDescription className="text-center text-lg">
                      🎉 CONGRATULATIONS! You have successfully forged the Nexus Core NFT!
                    </AlertDescription>
                  </Alert>
                  
                  <div className="grid grid-cols-5 gap-4 mb-6">
                    {Object.entries(realmProgress).map(([realm, status]) => (
                      <div key={realm} className="text-center">
                        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-2">
                          <span className="text-2xl font-bold text-green-500">✓</span>
                        </div>
                        <p className="text-sm font-medium capitalize">{realm}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4 justify-center">
                    <Button size="lg" className="text-lg px-8 py-6 glow-hover">
                      <a href="/inventory">View Your Collection</a>
                    </Button>
                    <Button variant="outline" size="lg" className="text-lg px-8 py-6 glow-hover bg-transparent">
                      <a href="/leaderboard">View Leaderboard</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}