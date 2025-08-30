"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MetaMaskConnectSimple } from "@/components/metamask-connect-simple"
import { useAccount, useChainId } from "wagmi"
import { 
  useHasPioneer, 
  usePlayerPioneer, 
  useTotalSupply,
  useContractInfo
} from "@/lib/hooks/usePioneerContract"
import { PioneerType, getPioneerTypeInfo, getNetworkConfig } from "@/lib/blockchain"
import { ExternalLink, Eye, Zap, Shield, Brain, Search, Star, Play, Trophy, Gift } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function InventoryPage() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const [activeTab, setActiveTab] = useState("pioneers")

  // Contract hooks
  const { data: hasPioneer, isLoading: hasPioneerLoading } = useHasPioneer(address, chainId)
  const { data: playerPioneerTokenId } = usePlayerPioneer(address, chainId)
  const { data: totalSupply } = useTotalSupply(chainId)
  const { name: contractName, symbol: contractSymbol } = useContractInfo(chainId)
  
  // Create pioneer data manually since our simple contract doesn't have getPioneerData
  const pioneerData = hasPioneer && playerPioneerTokenId ? {
    pioneerType: PioneerType.ORACLE_SEER,
    name: "The Oracle Seer",
    title: "Truth Seeker of the Cosmos",
    realm: "Flare",
    rarity: "Epic",
    mintedAt: BigInt(Math.floor(Date.now() / 1000)), // Current timestamp
    isActive: true
  } : null

  // Mock game items and achievements (these would come from your game system)
  const [gameItems] = useState([
    {
      id: 1,
      name: "Crystalline Shard",
      type: "artifact",
      rarity: "legendary",
      description: "A shard of pure cosmic energy that enhances Oracle powers",
      image: "/crystalline-shard-with-cosmic-energy.png",
      obtained: true
    },
    {
      id: 2,
      name: "Memory Tablet",
      type: "artifact",
      rarity: "epic",
      description: "An ancient tablet that preserves knowledge for eternity",
      image: "/glowing-scroll-with-encrypted-symbols.png",
      obtained: false
    },
    {
      id: 3,
      name: "Oracle Eye",
      type: "ability",
      rarity: "legendary",
      description: "The mystical eye that sees into the future",
      image: "/mystical-oracle-eye-with-data-streams.png",
      obtained: true
    }
  ])

  const [achievements] = useState([
    {
      id: 1,
      name: "First Steps",
      description: "Minted your first Pioneer NFT",
      icon: "🎯",
      obtained: true,
      date: "2024-01-15"
    },
    {
      id: 2,
      name: "Oracle Master",
      description: "Completed the Oracle Seer story",
      icon: "🔮",
      obtained: true,
      date: "2024-01-15"
    },
    {
      id: 3,
      name: "Nexus Guardian",
      description: "Restored balance to the Interchain Nexus",
      icon: "⚡",
      obtained: false,
      date: null
    }
  ])

  const networkConfig = chainId ? getNetworkConfig(chainId) : null

  if (!isConnected) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
          style={{
            backgroundImage: "url('/towering-data-storage-facility-with-glowing-cores.png')"
          }}
        ></div>
        
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
                  <Button variant="ghost" className="glow-hover text-cyan-400">
                    Inventory
                  </Button>
                  <Button variant="ghost" className="glow-hover text-gray-300 hover:text-cyan-400">
                    <a href="/play">Play</a>
                  </Button>
                  <Button variant="ghost" className="glow-hover text-gray-300 hover:text-cyan-400">
                    Leaderboard
                  </Button>
                </div>
              </div>
              <MetaMaskConnectSimple />
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Card className="bg-card/50 backdrop-blur-sm border-cyan-400/30">
              <CardContent className="p-8 text-center">
                <Alert>
                  <Eye className="h-4 w-4" />
                  <AlertDescription>
                    Please connect your wallet to view your inventory. You need to have minted a Pioneer NFT to see your collection.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
        style={{
          backgroundImage: "url('/towering-data-storage-facility-with-glowing-cores.png')"
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
                <Button variant="ghost" className="glow-hover text-cyan-400">
                  Inventory
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
              <MetaMaskConnectSimple />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              className="relative mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl sm:text-7xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  INVENTORY
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
                <span className="text-cyan-400 font-semibold">Your collection awaits.</span> View your Pioneer NFTs, game items, and achievements.
              </p>
            </motion.div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-card/50 backdrop-blur-sm border-cyan-400/30">
              <TabsTrigger value="pioneers" className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Pioneers</span>
              </TabsTrigger>
              <TabsTrigger value="items" className="flex items-center space-x-2">
                <Gift className="h-4 w-4" />
                <span>Items</span>
              </TabsTrigger>
              <TabsTrigger value="achievements" className="flex items-center space-x-2">
                <Trophy className="h-4 w-4" />
                <span>Achievements</span>
              </TabsTrigger>
            </TabsList>

            {/* Pioneers Tab */}
            <TabsContent value="pioneers" className="mt-8">
              <div className="space-y-6">
                {hasPioneerLoading ? (
                  <Card className="bg-card/50 backdrop-blur-sm border-cyan-400/30">
                    <CardContent className="p-8 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto mb-4"></div>
                      <p className="text-gray-300">Loading your Pioneer NFTs...</p>
                    </CardContent>
                  </Card>
                ) : hasPioneer && pioneerData ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="bg-card/50 backdrop-blur-sm border-cyan-400/30">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-2xl flex items-center space-x-2">
                              <Shield className="h-6 w-6 text-cyan-400" />
                              <span>Your Pioneer NFT</span>
                            </CardTitle>
                            <p className="text-gray-400">Token ID: {playerPioneerTokenId?.toString()}</p>
                          </div>
                          <Badge variant="outline" className="bg-green-500/20 text-green-300 border-green-500/30">
                            Owned
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <img 
                              src={getPioneerTypeInfo(pioneerData.pioneerType)?.image || '/placeholder.jpg'} 
                              alt={pioneerData.name}
                              className="w-full h-64 object-cover rounded-lg"
                            />
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => window.open(`/play`, '_blank')}
                              >
                                <Play className="h-4 w-4 mr-2" />
                                Play Story
                              </Button>
                              {networkConfig && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => window.open(`${networkConfig.blockExplorers.default.url}/token/${playerPioneerTokenId}`, '_blank')}
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  View on Explorer
                                </Button>
                              )}
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <h3 className="text-xl font-semibold text-white">{pioneerData.name}</h3>
                              <p className="text-cyan-400 font-medium">{pioneerData.title}</p>
                              <Badge variant="secondary" className="mt-2 bg-purple-600/20 text-purple-300">
                                {pioneerData.realm}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Rarity:</span>
                                <span className="text-yellow-400">{pioneerData.rarity}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Minted:</span>
                                <span className="text-gray-300">
                                  {new Date(Number(pioneerData.mintedAt) * 1000).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Status:</span>
                                <span className={pioneerData.isActive ? "text-green-400" : "text-red-400"}>
                                  {pioneerData.isActive ? "Active" : "Inactive"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Contract:</span>
                                <span className="text-gray-300">{contractName} ({contractSymbol})</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ) : (
                  <Card className="bg-card/50 backdrop-blur-sm border-cyan-400/30">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 rounded-full bg-gray-500/20 flex items-center justify-center mx-auto mb-4">
                        <Shield className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">No Pioneer NFTs Found</h3>
                      <p className="text-gray-400 mb-6">
                        You haven't minted any Pioneer NFTs yet. Visit the Choose page to mint your first Pioneer and begin your adventure.
                      </p>
                      <Button asChild>
                        <a href="/choose">Mint Pioneer NFT</a>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Items Tab */}
            <TabsContent value="items" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gameItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className={`bg-card/50 backdrop-blur-sm transition-all duration-300 ${
                      item.obtained 
                        ? 'border-green-400/30 hover:border-green-400/50' 
                        : 'border-gray-600/30 opacity-60'
                    }`}>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 rounded-lg overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <Badge 
                            variant="outline" 
                            className={
                              item.rarity === 'legendary' 
                                ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                                : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                            }
                          >
                            {item.rarity}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground text-sm">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                            {item.type}
                          </Badge>
                          <Badge 
                            variant={item.obtained ? "default" : "outline"}
                            className={item.obtained ? "bg-green-500/20 text-green-300" : ""}
                          >
                            {item.obtained ? "Obtained" : "Not Obtained"}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className={`bg-card/50 backdrop-blur-sm transition-all duration-300 ${
                      achievement.obtained 
                        ? 'border-yellow-400/30 hover:border-yellow-400/50' 
                        : 'border-gray-600/30 opacity-60'
                    }`}>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-4xl">{achievement.icon}</div>
                          <Badge 
                            variant={achievement.obtained ? "default" : "outline"}
                            className={achievement.obtained ? "bg-yellow-500/20 text-yellow-300" : ""}
                          >
                            {achievement.obtained ? "Unlocked" : "Locked"}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{achievement.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground text-sm">{achievement.description}</p>
                        {achievement.obtained && achievement.date && (
                          <div className="text-xs text-gray-500">
                            Unlocked: {new Date(achievement.date).toLocaleDateString()}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}