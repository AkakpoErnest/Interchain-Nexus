"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { EpicOpeningAnimation } from "@/components/epic-opening-animation"
import GameLoader from "@/components/game-loader"
import { BackgroundMusic } from "@/components/background-music"
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react"

export default function HomePage() {
  const [showLoader, setShowLoader] = useState(true)
  const [showAnimation, setShowAnimation] = useState(false)

  const handleLoaderComplete = () => {
    setShowLoader(false)
    // After loader, show the main page with BEGIN ODYSSEY button
  }

  const handleBeginOdyssey = () => {
    // Start the story animation when button is clicked
    setShowAnimation(true)
  }

  const handleAnimationComplete = () => {
    setShowAnimation(false)
    // Redirect to choose page after story animation
    window.location.href = "/choose"
  }
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Background with your new images */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: "url('/4c9e11fd-263b-4c44-88f4-6740fe33c89e.jpeg')"
        }}
      ></div>
      
      {/* Animated overlay */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-pulse delay-3000"></div>
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-green-400 rounded-full animate-pulse delay-4000"></div>
      </div>

      {/* Navigation - Only show when no loader or animation */}
      {!showLoader && !showAnimation && (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-cyan-400/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <img 
                src="/LOGO WITHOUT WORD.png" 
                alt="Interchain Nexus Logo" 
                className="w-8 h-8"
              />
              <h1 className="text-xl font-bold text-cyan-400 text-glow">Interchain Nexus</h1>
              <div className="hidden md:flex space-x-6">
                <Button variant="ghost" className="glow-hover text-gray-300 hover:text-cyan-400">
                  <a href="/inventory">Inventory</a>
                </Button>
                <Button variant="ghost" className="glow-hover text-gray-300 hover:text-cyan-400">
                  <a href="/play">Play</a>
                </Button>
                <Button variant="ghost" className="glow-hover text-gray-300 hover:text-cyan-400">
                  Leaderboard
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="hidden sm:flex glow bg-purple-600/80 text-white">
                pioneer.eth
              </Badge>
              <Button variant="outline" className="glow-hover bg-transparent border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black">
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      </nav>
      )}

      {/* Hero Section - Only show when no loader or animation */}
      {!showLoader && !showAnimation && (
        <main className="pt-20 relative z-10">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            {/* Game Title with Glow Effect */}
            <div className="relative mb-8">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-balance mb-4">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                  INTERCHAIN NEXUS
                </span>
              </h1>
              <div className="text-2xl sm:text-3xl font-semibold text-cyan-300 mb-8">
                A Digital Odyssey
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-600/20 via-purple-600/20 to-pink-600/20 blur-3xl opacity-50"></div>
            </div>

            {/* Game Description */}
            <div className="max-w-4xl mx-auto mb-12">
              <p className="text-xl sm:text-2xl text-gray-300 mb-6 leading-relaxed">
                <span className="text-cyan-400 font-semibold">The cosmos lies fractured.</span> Five realms hold the keys: 
                <span className="text-purple-400"> Memory</span>, <span className="text-pink-400">Truth</span>, 
                <span className="text-yellow-400"> Creation</span>, <span className="text-green-400">Identity</span>, 
                and <span className="text-red-400">Law</span>.
              </p>
              <p className="text-lg text-gray-400 mb-8">
                You are a Pioneer. Choose your path, solve the trials, and unite the realms into the Nexus.
              </p>
            </div>

            {/* Animated Arrow pointing to Begin Odyssey */}
            <div className="relative mb-8">
              <div className="flex items-center justify-center space-x-4 animate-bounce">
                <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />
                <ArrowDown className="h-8 w-8 text-cyan-400 animate-bounce" />
                <span className="text-lg text-cyan-300 font-semibold">Start Your Journey</span>
                <ArrowDown className="h-8 w-8 text-cyan-400 animate-bounce" />
                <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />
              </div>
            </div>

            {/* Game Start Button */}
            <div className="relative z-20">
              <Button 
                size="lg" 
                className="text-xl px-12 py-8 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 border-2 border-cyan-400 shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer animate-pulse"
                onClick={handleBeginOdyssey}
                style={{ zIndex: 1000 }}
              >
                <span className="flex items-center space-x-3">
                  <ArrowRight className="h-6 w-6" />
                  <span>BEGIN ODYSSEY</span>
                  <Sparkles className="h-5 w-5 animate-spin" />
                </span>
              </Button>
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-600/30 to-purple-600/30 blur-xl opacity-75 pointer-events-none"></div>
              
              {/* Pulsing ring around button */}
              <div className="absolute -inset-4 border-2 border-cyan-400/50 rounded-lg animate-ping"></div>
              <div className="absolute -inset-6 border border-cyan-400/30 rounded-lg animate-ping delay-1000"></div>
            </div>
          </div>
        </div>

        {/* Quest Timeline */}
        <section className="py-24 bg-black/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-cyan-300">The Five Realms</h2>
              <p className="text-xl text-gray-300">Journey through five fragmented realms to forge the Nexus Core</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {/* Vaults of Memory */}
              <Card className="relative glow-hover border-primary/20 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border-2 border-purple-400/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <span className="text-xl">📚</span>
                    </div>
                    <Badge variant="outline" className="text-purple-400 border-purple-400/50">
                      Filecoin
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-purple-300">Vaults of Memory</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    The tablets awaken. Write what must not be forgotten. Solve word puzzles to earn Memory Shards.
                  </p>
                  <div className="text-xs text-purple-400 font-medium">Memory Shard NFT</div>
                </CardContent>
              </Card>

              {/* Oracle Spire */}
              <Card className="relative glow-hover border-accent/20 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border-2 border-pink-400/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
                      <span className="text-xl">🔮</span>
                    </div>
                    <Badge variant="outline" className="text-pink-400 border-pink-400/50">
                      Flare
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-pink-300">Oracle Spire</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Chance is the only judge. Throw the die, accept its verdict. Roll fate to earn Oracle Seals.
                  </p>
                  <div className="text-xs text-pink-400 font-medium">Oracle Seal NFT</div>
                </CardContent>
              </Card>

              {/* Forge Halls */}
              <Card className="relative glow-hover border-secondary/20 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border-2 border-yellow-400/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                      <span className="text-xl">🏗️</span>
                    </div>
                    <Badge variant="outline" className="text-yellow-400 border-yellow-400/50">
                      Base
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-yellow-300">Forge Halls</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Sparks leap; creation awaits your touch. Build mini-apps to earn Forge Embers.
                  </p>
                  <div className="text-xs text-yellow-400 font-medium">Forge Ember NFT</div>
                </CardContent>
              </Card>

              {/* Hall of Names */}
              <Card className="relative glow-hover border-yellow-500/20 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border-2 border-green-400/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <span className="text-xl">🎭</span>
                    </div>
                    <Badge variant="outline" className="text-green-400 border-green-400/50">
                      ENS
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-green-300">Hall of Names</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    To lose your name is to vanish. Inscribe your truth. Prove identity to earn True Names.
                  </p>
                  <div className="text-xs text-green-400 font-medium">True Name NFT</div>
                </CardContent>
              </Card>

              {/* Council Chambers */}
              <Card className="relative glow-hover border-purple-500/20 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border-2 border-red-400/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                      <span className="text-xl">⚖️</span>
                    </div>
                    <Badge variant="outline" className="text-red-400 border-red-400/50">
                      Governance
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-red-300">Council Chambers</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Voices rise. One choice will echo across the Nexus. Vote to earn Council Marks.
                  </p>
                  <div className="text-xs text-red-400 font-medium">Council Mark NFT</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-cyan-300">
              Ready to Begin Your <span className="text-purple-400">Digital Odyssey</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Join thousands of pioneers exploring the frontiers of blockchain technology. Your adventure across the
              interchain starts now.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="relative">
                <Button size="lg" className="text-lg px-8 py-6 glow-hover bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 animate-pulse" onClick={handleBeginOdyssey}>
                  <span className="flex items-center space-x-2">
                    <ArrowRight className="h-5 w-5" />
                    <span>Start Quest</span>
                    <Sparkles className="h-4 w-4 animate-spin" />
                  </span>
                </Button>
                {/* Arrow pointing to button */}
                <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 hidden lg:block">
                  <ArrowRight className="h-8 w-8 text-cyan-400 animate-bounce" />
                </div>
              </div>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 glow-hover bg-transparent border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black">
                View Leaderboard
              </Button>
            </div>
          </div>
        </section>
      </main>
      )}

      {/* Footer */}
      <footer className="border-t border-cyan-400/30 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-bold text-cyan-400 text-glow">Interchain Nexus</h3>
              <p className="text-sm text-gray-400">Bridging worlds through blockchain</p>
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Documentation
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Community
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Game Loader */}
      {showLoader && (
        <GameLoader onComplete={handleLoaderComplete} />
      )}

      {/* Epic Opening Animation */}
      {showAnimation && (
        <EpicOpeningAnimation onComplete={handleAnimationComplete} />
      )}

      {/* Floating Arrow Guide - Only show after loader */}
      {!showLoader && !showAnimation && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none">
          <div className="flex flex-col items-center space-y-2 animate-bounce">
            <div className="text-sm text-cyan-300 font-semibold bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-400/30">
              Click to Begin Your Journey
            </div>
            <ArrowDown className="h-8 w-8 text-cyan-400 animate-bounce" />
          </div>
        </div>
      )}

      {/* Background Music */}
      <BackgroundMusic enabled={!showLoader && !showAnimation} />
    </div>
  )
}