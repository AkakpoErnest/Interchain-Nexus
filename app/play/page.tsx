"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"

type QuestState = "select" | "archive" | "oracle" | "complete"
type RealmStatus = "locked" | "available" | "completed"

interface RealmProgress {
  archive: RealmStatus
  oracle: RealmStatus
  builder: RealmStatus
  identity: RealmStatus
  governance: RealmStatus
}

export default function PlayPage() {
  const [questState, setQuestState] = useState<QuestState>("select")
  const [realmProgress, setRealmProgress] = useState<RealmProgress>({
    archive: "available",
    oracle: "locked",
    builder: "locked",
    identity: "locked",
    governance: "locked",
  })

  // Archive Realm state
  const [archiveAnswer, setArchiveAnswer] = useState("")
  const [archiveSubmitted, setArchiveSubmitted] = useState(false)
  const [archiveLoading, setArchiveLoading] = useState(false)

  // Oracle Realm state
  const [oracleRoll, setOracleRoll] = useState<number | null>(null)
  const [oracleLoading, setOracleLoading] = useState(false)
  const [oracleResult, setOracleResult] = useState<"success" | "failure" | null>(null)

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

    const success = roll >= 50
    setOracleResult(success ? "success" : "failure")
    setOracleLoading(false)

    if (success) {
      setRealmProgress((prev) => ({
        ...prev,
        oracle: "completed",
        builder: "available",
      }))
    }

    setTimeout(() => {
      setQuestState("select")
    }, 4000)
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
                <Button variant="ghost" className="glow-hover text-primary">
                  Play
                </Button>
                <Button variant="ghost" className="glow-hover">
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
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Archive Realm */}
                <Card
                  className={`glow-hover bg-card/50 backdrop-blur-sm ${getStatusColor(realmProgress.archive)} transition-all duration-300 ${realmProgress.archive === "available" ? "hover:scale-105 cursor-pointer" : ""}`}
                  onClick={() => realmProgress.archive === "available" && setQuestState("archive")}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-2xl">📚</span>
                      </div>
                      <Badge variant="outline" className={getStatusColor(realmProgress.archive)}>
                        {getStatusText(realmProgress.archive)}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">Archive Realm</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Where all memories are locked in silent vaults. Solve the word puzzle to unlock ancient knowledge.
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
                        <span className="text-2xl">🔮</span>
                      </div>
                      <Badge variant="outline" className={getStatusColor(realmProgress.oracle)}>
                        {getStatusText(realmProgress.oracle)}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">Oracle Realm</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Where truth is hidden behind randomness and shifting fates. Roll the dice of destiny.
                    </p>
                    <Badge variant="secondary" className="w-full justify-center">
                      Flare Randomness
                    </Badge>
                  </CardContent>
                </Card>

                {/* Builder Realm */}
                <Card
                  className={`glow-hover bg-card/50 backdrop-blur-sm ${getStatusColor(realmProgress.builder)} transition-all duration-300`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                        <span className="text-2xl">🏗️</span>
                      </div>
                      <Badge variant="outline" className={getStatusColor(realmProgress.builder)}>
                        {getStatusText(realmProgress.builder)}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">Builder Realm</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Where small worlds flicker in and out, made of code and creativity. Build to unlock.
                    </p>
                    <Badge variant="secondary" className="w-full justify-center">
                      Base Mini-App
                    </Badge>
                  </CardContent>
                </Card>

                {/* Identity Realm */}
                <Card
                  className={`glow-hover bg-card/50 backdrop-blur-sm ${getStatusColor(realmProgress.identity)} transition-all duration-300`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                        <span className="text-2xl">🎭</span>
                      </div>
                      <Badge variant="outline" className={getStatusColor(realmProgress.identity)}>
                        {getStatusText(realmProgress.identity)}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">Identity Realm</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Where names shape destiny and shadow beings wander nameless. Prove your true identity.
                    </p>
                    <Badge variant="secondary" className="w-full justify-center">
                      ENS Names
                    </Badge>
                  </CardContent>
                </Card>

                {/* Governance Realm */}
                <Card
                  className={`glow-hover bg-card/50 backdrop-blur-sm ${getStatusColor(realmProgress.governance)} transition-all duration-300`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <span className="text-2xl">⚖️</span>
                      </div>
                      <Badge variant="outline" className={getStatusColor(realmProgress.governance)}>
                        {getStatusText(realmProgress.governance)}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">Governance Realm</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Where law and consensus bind the wills of many. Make choices that shape the future.
                    </p>
                    <Badge variant="secondary" className="w-full justify-center">
                      Lisk Governance
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {questState === "archive" && (
            <div className="max-w-2xl mx-auto">
              <Card className="glow bg-card/50 backdrop-blur-sm border-primary/50">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl mb-4">Archive Realm Challenge</CardTitle>
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
                        ✅ Correct! Your answer has been stored on Filecoin. Archive Realm Card NFT earned!
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

          {questState === "oracle" && (
            <div className="max-w-2xl mx-auto">
              <Card className="glow bg-card/50 backdrop-blur-sm border-accent/50">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl mb-4">Oracle Realm Challenge</CardTitle>
                  <p className="text-muted-foreground">
                    The Oracle speaks in numbers and chance. Roll the dice of fate to prove your worthiness.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎲</div>
                    <p className="text-lg mb-6">
                      You need to roll <span className="text-accent font-bold">50 or higher</span> to succeed
                    </p>

                    {oracleRoll !== null && (
                      <div className="space-y-4">
                        <div className="text-5xl font-bold text-accent">{oracleRoll}</div>
                        {oracleResult === "success" ? (
                          <Alert className="border-green-500/50 bg-green-500/10">
                            <AlertDescription className="text-center">
                              🎉 Success! The Oracle smiles upon you. Oracle Realm Card NFT earned!
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
        </div>
      </main>
    </div>
  )
}
