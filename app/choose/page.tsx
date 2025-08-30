"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion, AnimatePresence } from "framer-motion"

// Pioneer Card data based on the provided images
const pioneerCards = [
  {
    id: 1,
    name: "The Social Architect",
    title: "Builder",
    realm: "Base",
    rarity: "Epic",
    stats: { creativity: 95, leadership: 88, innovation: 92 },
    image: "/base_social_architect_card_refined.png",
    description: "A master builder who creates social protocols and community structures. Specializes in Base ecosystem development.",
    lore: "Born from the digital ether, the Social Architect weaves communities from code and connection. Their creations span across the Base ecosystem, building bridges between minds and machines.",
    passiveBuff: "Builder puzzles get +25% success rate"
  },
  {
    id: 2,
    name: "The Identity Guardian",
    title: "Protector",
    realm: "ENS",
    rarity: "Epic",
    stats: { security: 95, wisdom: 90, protection: 88 },
    image: "/ens_identity_guardian_card_refined.png",
    description: "A guardian of digital identity and names. Protects the sacred registry of ENS names across the cosmos.",
    lore: "In the realm of names, where identity is power, the Guardian stands eternal. They protect the sacred registry, ensuring no name is lost to the void.",
    passiveBuff: "Identity puzzles get +25% success rate"
  },
  {
    id: 3,
    name: "The Data Weaver",
    title: "Archivist",
    realm: "Filecoin",
    rarity: "Epic",
    stats: { knowledge: 95, precision: 92, memory: 90 },
    image: "/filecoin_data_weaver_card_refined.png",
    description: "A master of data storage and retrieval. Weaves information across the decentralized Filecoin network.",
    lore: "In the vast archives of Filecoin, the Weaver spins threads of data into eternal tapestries. Nothing is forgotten, nothing is lost in their domain.",
    passiveBuff: "Archive puzzles get +25% success rate"
  },
  {
    id: 4,
    name: "The Oracle Seer",
    title: "Prophet",
    realm: "Flare",
    rarity: "Epic",
    stats: { foresight: 95, intuition: 88, prophecy: 90 },
    image: "/flare_oracle_seer_card_refined.png",
    description: "A seer who reads the patterns of randomness and fate. Harnesses Flare's oracle network for divination.",
    lore: "Through the mists of uncertainty, the Seer peers into the future. Their connection to Flare's oracles grants them glimpses of destiny itself.",
    passiveBuff: "Oracle puzzles get +25% success rate"
  }
]

export default function ChoosePage() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  const [isMinting, setIsMinting] = useState(false)
  const [mintComplete, setMintComplete] = useState(false)

  const handleCardSelect = (cardId: number) => {
    setSelectedCard(cardId)
  }

  const handleMint = async () => {
    if (!selectedCard) return
    
    setIsMinting(true)
    
    // Store selected pioneer in localStorage
    const selectedPioneerData = pioneerCards.find(card => card.id === selectedCard)
    if (selectedPioneerData) {
      localStorage.setItem("selectedPioneer", JSON.stringify(selectedPioneerData))
    }
    
    // Simulate NFT minting process
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setIsMinting(false)
    setMintComplete(true)
    
    // Redirect to play page after a delay
    setTimeout(() => {
      window.location.href = "/play"
    }, 2000)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Background with your new images */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
        style={{
          backgroundImage: "url('/cyberpunk-archer-with-glowing-bow.png')"
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

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-cyan-400/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <img 
                src="/LOGO WITHOUT WORD.png" 
                alt="Interchain Nexus Logo" 
                className="w-8 h-8"
              />
              <a href="/" className="text-xl font-bold text-cyan-400 text-glow hover:opacity-80 transition-opacity">
                Interchain Nexus
              </a>
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

      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12 relative z-10">
            <motion.div
              className="relative mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl sm:text-7xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  CHOOSE YOUR PIONEER
                </span>
              </h1>
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-600/20 via-purple-600/20 to-pink-600/20 blur-3xl opacity-50"></div>
            </motion.div>
            
            <motion.div 
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-xl text-gray-300 mb-4">
                <span className="text-cyan-400 font-semibold">The cosmos lies fractured.</span> Five realms await your mastery:
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-lg">
                <span className="px-4 py-2 bg-purple-600/20 border border-purple-400/30 rounded-lg text-purple-300">Memory</span>
                <span className="px-4 py-2 bg-pink-600/20 border border-pink-400/30 rounded-lg text-pink-300">Truth</span>
                <span className="px-4 py-2 bg-yellow-600/20 border border-yellow-400/30 rounded-lg text-yellow-300">Creation</span>
                <span className="px-4 py-2 bg-green-600/20 border border-green-400/30 rounded-lg text-green-300">Identity</span>
                <span className="px-4 py-2 bg-red-600/20 border border-red-400/30 rounded-lg text-red-300">Law</span>
              </div>
            </motion.div>
            
            {mintComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Alert className="border-green-500/50 bg-green-500/10 max-w-md mx-auto">
                  <AlertDescription className="text-center">
                    Pioneer Card minted successfully! Redirecting to your quest...
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </div>

          {/* Pioneer Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {pioneerCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <Card
                  className={`relative overflow-hidden transition-all duration-300 cursor-pointer ${
                    selectedCard === card.id 
                      ? "ring-4 ring-cyan-400 scale-110 shadow-2xl shadow-cyan-400/50" 
                      : "hover:scale-105 hover:shadow-xl hover:shadow-purple-400/30"
                  } bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border-2 ${
                    selectedCard === card.id ? "border-cyan-400" : "border-slate-600"
                  }`}
                  onClick={() => handleCardSelect(card.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="aspect-[3/4] rounded-lg overflow-hidden mb-4 relative">
                      <img 
                        src={card.image} 
                        alt={card.name} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" 
                      />
                      {selectedCard === card.id && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-cyan-400/30 to-transparent border-2 border-cyan-400 rounded-lg"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-purple-600/80 text-white border-purple-400">
                          {card.rarity}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-center">
                      <CardTitle className="text-xl font-bold text-cyan-300 mb-1">{card.name}</CardTitle>
                      <p className="text-sm text-purple-300 font-medium">{card.title}</p>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-300 leading-relaxed">{card.description}</p>
                    
                    {/* Stats */}
                    <div className="space-y-2">
                      {Object.entries(card.stats).map(([stat, value]) => (
                        <div key={stat} className="flex justify-between items-center">
                          <span className="capitalize text-gray-400 text-sm">{stat}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full transition-all duration-500"
                                style={{ width: `${value}%` }}
                              ></div>
                            </div>
                            <span className="text-cyan-400 font-bold text-sm w-8">{value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Passive Buff */}
                    <div className="p-3 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 rounded-lg border border-cyan-400/30">
                      <p className="text-xs text-cyan-300 font-medium text-center">{card.passiveBuff}</p>
                    </div>
                    
                    <Badge className="w-full justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                      {card.realm} Realm
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Selection Actions */}
          <motion.div 
            className="text-center relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {selectedCard && !mintComplete && (
              <div className="space-y-8">
                <motion.div
                  className="max-w-4xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-cyan-400/30 rounded-2xl p-8">
                    <h3 className="text-3xl font-bold mb-4 text-cyan-300">
                      Selected: {pioneerCards.find(c => c.id === selectedCard)?.name}
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                      {pioneerCards.find(c => c.id === selectedCard)?.lore}
                    </p>
                    <div className="flex justify-center">
                      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 text-lg">
                        {pioneerCards.find(c => c.id === selectedCard)?.passiveBuff}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Button 
                    size="lg" 
                    className="text-xl px-16 py-8 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 border-2 border-cyan-400 shadow-2xl transform hover:scale-105 transition-all duration-300"
                    onClick={handleMint}
                    disabled={isMinting}
                  >
                    {isMinting ? (
                      <span className="flex items-center space-x-3">
                        <span className="animate-spin">⟳</span>
                        <span>Minting Pioneer Card...</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-3">
                        <span>MINT & BEGIN QUEST</span>
                      </span>
                    )}
                  </Button>
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-600/30 to-purple-600/30 blur-xl opacity-75"></div>
                </motion.div>
              </div>
            )}
            
            {!selectedCard && (
              <motion.div
                className="max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-gradient-to-r from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-purple-400/30 rounded-xl p-6">
                  <p className="text-gray-300 text-xl">
                    Select a Pioneer Card to begin your journey across the interchain
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  )
}