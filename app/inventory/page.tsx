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
import { 
  useHasEnsPioneer, 
  usePlayerEnsPioneer, 
  useEnsTotalSupply,
  useEnsContractInfo
} from "@/lib/hooks/useEnsPioneerContract"
import { PioneerType, getPioneerTypeInfo, getNetworkConfig } from "@/lib/blockchain"
import { ExternalLink, Eye, Zap, Shield, Brain, Search, Star, Play, Trophy, Gift } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function InventoryPage() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const [activeTab, setActiveTab] = useState("pioneers")

  // Contract hooks for Oracle Seer (Flare Testnet)
  const { data: hasOraclePioneer, isLoading: hasOraclePioneerLoading } = useHasPioneer(address, 114)
  const { data: playerOraclePioneerTokenId } = usePlayerPioneer(address, 114)
  const { data: oracleTotalSupply } = useTotalSupply(114)
  const { name: oracleContractName, symbol: oracleContractSymbol } = useContractInfo(114)
  
  // Contract hooks for ENS Guardian (Ethereum Sepolia)
  const { data: hasEnsPioneer, isLoading: hasEnsPioneerLoading } = useHasEnsPioneer(address, 11155111)
  const { data: playerEnsPioneerTokenId } = usePlayerEnsPioneer(address, 11155111)
  const { data: ensTotalSupply } = useEnsTotalSupply(11155111)
  const { name: ensContractName, symbol: ensContractSymbol } = useEnsContractInfo(11155111)
  
  const hasPioneer = hasOraclePioneer || hasEnsPioneer
  const hasPioneerLoading = hasOraclePioneerLoading || hasEnsPioneerLoading
  
  // Create pioneer data for Oracle Seer
  const oraclePioneerData = hasOraclePioneer && playerOraclePioneerTokenId ? {
    pioneerType: PioneerType.ORACLE_SEER,
    name: "The Oracle Seer",
    title: "Truth Seeker of the Cosmos",
    realm: "Flare",
    rarity: "Epic",
    mintedAt: BigInt(Math.floor(Date.now() / 1000)),
    isActive: true,
    tokenId: playerOraclePioneerTokenId,
    contractName: oracleContractName,
    contractSymbol: oracleContractSymbol
  } : null
  
  // Create pioneer data for ENS Guardian
  const ensPioneerData = hasEnsPioneer && playerEnsPioneerTokenId ? {
    pioneerType: PioneerType.IDENTITY_GUARDIAN,
    name: "The Identity Guardian",
    title: "Keeper of Names",
    realm: "ENS",
    rarity: "Epic",
    mintedAt: BigInt(Math.floor(Date.now() / 1000)),
    isActive: true,
    tokenId: playerEnsPioneerTokenId,
    contractName: ensContractName,
    contractSymbol: ensContractSymbol
  } : null

  // Mock game items and achievements (these would come from your game system)
  const [gameItems] = useState([
    // Flare Oracle Seer Items
    {
      id: 1,
      name: "Crystalline Shard",
      type: "artifact",
      rarity: "legendary",
      description: "A shard of pure cosmic energy that enhances Oracle powers",
      image: "/crystalline-shard-with-cosmic-energy.png",
      obtained: true,
      realm: "Flare"
    },
    {
      id: 2,
      name: "Oracle Eye",
      type: "ability",
      rarity: "legendary",
      description: "The mystical eye that sees into the future",
      image: "/mystical-oracle-eye-with-data-streams.png",
      obtained: true,
      realm: "Flare"
    },
    {
      id: 3,
      name: "Flare Predictor",
      type: "tool",
      rarity: "epic",
      description: "A device that predicts market movements using Flare's oracle data",
      image: "/futuristic-citadel-with-governance-symbols.png",
      obtained: false,
      realm: "Flare",
      unlockType: "task",
      unlockRequirement: "Complete 5 oracle predictions",
      unlockProgress: 3,
      unlockTarget: 5
    },
    {
      id: 4,
      name: "Truth Seeker's Staff",
      type: "weapon",
      rarity: "epic",
      description: "A staff that channels the power of Flare's oracles",
      image: "/cyberpunk-archer-with-glowing-bow.png",
      obtained: false,
      realm: "Flare",
      unlockType: "purchase",
      price: 100,
      currency: "FLR"
    },
    
    // ENS Identity Guardian Items
    {
      id: 5,
      name: "Name Registry Key",
      type: "artifact",
      rarity: "epic",
      description: "A mystical key that unlocks the secrets of the ENS registry",
      image: "/glowing-scroll-with-encrypted-symbols.png",
      obtained: false,
      realm: "ENS",
      unlockType: "task",
      unlockRequirement: "Verify 10 ENS domains",
      unlockProgress: 7,
      unlockTarget: 10
    },
    {
      id: 6,
      name: "Identity Shield",
      type: "armor",
      rarity: "legendary",
      description: "A protective shield that guards against identity theft",
      image: "/ens_identity_guardian_card_refined.png",
      obtained: false,
      realm: "ENS",
      unlockType: "purchase",
      price: 250,
      currency: "ETH"
    },
    {
      id: 7,
      name: "Domain Verifier",
      type: "tool",
      rarity: "rare",
      description: "A tool that verifies the authenticity of ENS domains",
      image: "/futuristic-data-archivist-with-holographic-display.png",
      obtained: false,
      realm: "ENS",
      unlockType: "task",
      unlockRequirement: "Complete ENS Guardian story",
      unlockProgress: 0,
      unlockTarget: 1
    },
    
    // Filecoin Data Weaver Items
    {
      id: 8,
      name: "Memory Tablet",
      type: "artifact",
      rarity: "epic",
      description: "An ancient tablet that preserves knowledge for eternity",
      image: "/glowing-scroll-with-encrypted-symbols.png",
      obtained: false,
      realm: "Filecoin",
      unlockType: "task",
      unlockRequirement: "Store 1TB of data",
      unlockProgress: 0.6,
      unlockTarget: 1
    },
    {
      id: 9,
      name: "Storage Crystal",
      type: "artifact",
      rarity: "legendary",
      description: "A crystal that can store infinite amounts of data",
      image: "/towering-data-storage-facility-with-glowing-cores.png",
      obtained: false,
      realm: "Filecoin",
      unlockType: "purchase",
      price: 500,
      currency: "FIL"
    },
    {
      id: 10,
      name: "Data Retrieval Orb",
      type: "tool",
      rarity: "epic",
      description: "An orb that can instantly retrieve any stored data",
      image: "/futuristic-data-archivist-with-holographic-display.png",
      obtained: false,
      realm: "Filecoin",
      unlockType: "task",
      unlockRequirement: "Retrieve 100 files successfully",
      unlockProgress: 45,
      unlockTarget: 100
    },
    
    // Lisk Social Architect Items (Locked)
    {
      id: 11,
      name: "Community Builder's Hammer",
      type: "weapon",
      rarity: "legendary",
      description: "A hammer that forges strong social connections",
      image: "/base_social_architect_card_refined.png",
      obtained: false,
      realm: "Lisk",
      locked: true
    },
    {
      id: 12,
      name: "Social Graph Compass",
      type: "tool",
      rarity: "epic",
      description: "A compass that navigates the complex web of social connections",
      image: "/diplomatic-blockchain-negotiator-with-energy-patte.png",
      obtained: false,
      realm: "Lisk",
      locked: true
    },
    
    // Governance Consensus Weaver Items (Locked)
    {
      id: 13,
      name: "Consensus Crown",
      type: "artifact",
      rarity: "legendary",
      description: "A crown that brings harmony to all blockchain communities",
      image: "/lisk_consensus_weaver_card_refined.png",
      obtained: false,
      realm: "Governance",
      locked: true
    },
    {
      id: 14,
      name: "Voting Scepter",
      type: "weapon",
      rarity: "epic",
      description: "A scepter that ensures fair and transparent governance",
      image: "/futuristic-citadel-with-governance-symbols.png",
      obtained: false,
      realm: "Governance",
      locked: true
    }
  ])

  // Mock player token balances
  const [playerBalances] = useState({
    FLR: 150,
    ETH: 0.5,
    FIL: 25,
    LSK: 0,
    GOV: 0
  })

  // Functions for item interaction
  const handlePurchaseItem = (item: any) => {
    if (playerBalances[item.currency as keyof typeof playerBalances] >= item.price) {
      // In a real app, this would trigger a blockchain transaction
      console.log(`Purchasing ${item.name} for ${item.price} ${item.currency}`)
      // Update item status to obtained
      // This would be handled by your state management system
    } else {
      alert(`Insufficient ${item.currency} balance!`)
    }
  }

  const handleUnlockItem = (item: any) => {
    if (item.unlockProgress >= item.unlockTarget) {
      console.log(`Unlocking ${item.name} by completing task`)
      // Update item status to obtained
      // This would be handled by your state management system
    }
  }

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
                    <a href="/leaderboard">Leaderboard</a>
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
                  <a href="/leaderboard">Leaderboard</a>
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
          
          {/* Token Balances */}
          <div className="mb-8">
            <div className="bg-card/30 backdrop-blur-sm border border-cyan-400/20 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Token Balances</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(playerBalances).map(([currency, balance]) => (
                  <div key={currency} className="bg-card/50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-cyan-400">{balance}</div>
                    <div className="text-sm text-gray-300">{currency}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
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
                {hasPioneer ? (
                  <div className="space-y-6">
                    {/* Oracle Seer Pioneer */}
                    {oraclePioneerData && (
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
                                  <span>Oracle Seer NFT</span>
                                </CardTitle>
                                <p className="text-gray-400">Token ID: {oraclePioneerData.tokenId?.toString()}</p>
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
                                  src={getPioneerTypeInfo(oraclePioneerData.pioneerType)?.image || '/placeholder.jpg'} 
                                  alt={oraclePioneerData.name}
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
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div>
                                  <h3 className="text-xl font-semibold text-white">{oraclePioneerData.name}</h3>
                                  <p className="text-cyan-400 font-medium">{oraclePioneerData.title}</p>
                                  <Badge variant="secondary" className="mt-2 bg-purple-600/20 text-purple-300">
                                    {oraclePioneerData.realm}
                                  </Badge>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Rarity:</span>
                                    <span className="text-yellow-400">{oraclePioneerData.rarity}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Minted:</span>
                                    <span className="text-gray-300">
                                      {new Date(Number(oraclePioneerData.mintedAt) * 1000).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Status:</span>
                                    <span className={oraclePioneerData.isActive ? "text-green-400" : "text-red-400"}>
                                      {oraclePioneerData.isActive ? "Active" : "Inactive"}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Contract:</span>
                                    <span className="text-gray-300">{oraclePioneerData.contractName} ({oraclePioneerData.contractSymbol})</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}

                    {/* ENS Guardian Pioneer */}
                    {ensPioneerData && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <Card className="bg-card/50 backdrop-blur-sm border-blue-400/30">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div>
                                <CardTitle className="text-2xl flex items-center space-x-2">
                                  <Shield className="h-6 w-6 text-blue-400" />
                                  <span>Identity Guardian NFT</span>
                                </CardTitle>
                                <p className="text-gray-400">Token ID: {ensPioneerData.tokenId?.toString()}</p>
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
                                  src={getPioneerTypeInfo(ensPioneerData.pioneerType)?.image || '/placeholder.jpg'} 
                                  alt={ensPioneerData.name}
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
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div>
                                  <h3 className="text-xl font-semibold text-white">{ensPioneerData.name}</h3>
                                  <p className="text-blue-400 font-medium">{ensPioneerData.title}</p>
                                  <Badge variant="secondary" className="mt-2 bg-blue-600/20 text-blue-300">
                                    {ensPioneerData.realm}
                                  </Badge>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Rarity:</span>
                                    <span className="text-yellow-400">{ensPioneerData.rarity}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Minted:</span>
                                    <span className="text-gray-300">
                                      {new Date(Number(ensPioneerData.mintedAt) * 1000).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Status:</span>
                                    <span className={ensPioneerData.isActive ? "text-green-400" : "text-red-400"}>
                                      {ensPioneerData.isActive ? "Active" : "Inactive"}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Contract:</span>
                                    <span className="text-gray-300">{ensPioneerData.contractName} ({ensPioneerData.contractSymbol})</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </div>
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
              <div className="space-y-8">
                {['Flare', 'ENS', 'Filecoin', 'Lisk', 'Governance'].map((realm, realmIndex) => {
                  const realmItems = gameItems.filter(item => item.realm === realm)
                  if (realmItems.length === 0) return null
                  
                  return (
                    <motion.div
                      key={realm}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: realmIndex * 0.1 }}
                    >
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-white mb-2">{realm} Realm Items</h3>
                        <div className="h-px bg-gradient-to-r from-cyan-400/50 to-purple-400/50"></div>
                      </div>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {realmItems.map((item, index) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: (realmIndex * 0.1) + (index * 0.05) }}
                          >
                            <Card className={`bg-card/50 backdrop-blur-sm transition-all duration-300 relative ${
                              item.locked
                                ? 'border-gray-600/30 opacity-40'
                                : item.obtained 
                                  ? 'border-green-400/30 hover:border-green-400/50' 
                                  : 'border-gray-600/30 opacity-60'
                            }`}>
                              {item.locked && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10 rounded-lg">
                                  <div className="text-center">
                                    <div className="w-8 h-8 mx-auto mb-2 bg-gray-600 rounded-full flex items-center justify-center">
                                      <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                      </svg>
                                    </div>
                                    <p className="text-xs text-gray-300 font-medium">LOCKED</p>
                                  </div>
                                </div>
                              )}
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
                                        : item.rarity === 'epic'
                                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                                        : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                                    }
                                  >
                                    {item.rarity}
                                  </Badge>
                                </div>
                                <CardTitle className="text-lg">{item.name}</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <p className="text-muted-foreground text-sm">{item.description}</p>
                                
                                {/* Unlock Requirements */}
                                {!item.obtained && !item.locked && item.unlockType && (
                                  <div className="space-y-2">
                                    {item.unlockType === 'task' && (
                                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                                        <div className="flex items-center justify-between mb-2">
                                          <span className="text-xs text-blue-300 font-medium">Task Progress</span>
                                          <span className="text-xs text-blue-300">
                                            {item.unlockProgress}/{item.unlockTarget}
                                          </span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                          <div 
                                            className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                                            style={{ 
                                              width: `${Math.min((item.unlockProgress / item.unlockTarget) * 100, 100)}%` 
                                            }}
                                          ></div>
                                        </div>
                                        <p className="text-xs text-blue-200 mt-1">{item.unlockRequirement}</p>
                                        {item.unlockProgress >= item.unlockTarget && (
                                          <Button 
                                            size="sm" 
                                            className="w-full mt-2 bg-green-600 hover:bg-green-700"
                                            onClick={() => handleUnlockItem(item)}
                                          >
                                            Unlock Item
                                          </Button>
                                        )}
                                      </div>
                                    )}
                                    
                                    {item.unlockType === 'purchase' && (
                                      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                                        <div className="flex items-center justify-between mb-2">
                                          <span className="text-xs text-purple-300 font-medium">Price</span>
                                          <span className="text-xs text-purple-300">
                                            {item.price} {item.currency}
                                          </span>
                                        </div>
                                        <div className="flex items-center justify-between mb-2">
                                          <span className="text-xs text-gray-400">Your Balance</span>
                                          <span className="text-xs text-gray-300">
                                            {playerBalances[item.currency as keyof typeof playerBalances]} {item.currency}
                                          </span>
                                        </div>
                                        <Button 
                                          size="sm" 
                                          className={`w-full ${
                                            playerBalances[item.currency as keyof typeof playerBalances] >= item.price
                                              ? 'bg-purple-600 hover:bg-purple-700'
                                              : 'bg-gray-600 cursor-not-allowed'
                                          }`}
                                          onClick={() => handlePurchaseItem(item)}
                                          disabled={playerBalances[item.currency as keyof typeof playerBalances] < item.price}
                                        >
                                          {playerBalances[item.currency as keyof typeof playerBalances] >= item.price 
                                            ? 'Purchase' 
                                            : 'Insufficient Funds'
                                          }
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                )}
                                
                                <div className="flex items-center justify-between">
                                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                                    {item.type}
                                  </Badge>
                                  <Badge 
                                    variant={item.locked ? "outline" : item.obtained ? "default" : "outline"}
                                    className={
                                      item.locked 
                                        ? "bg-gray-500/20 text-gray-300"
                                        : item.obtained 
                                          ? "bg-green-500/20 text-green-300" 
                                          : ""
                                    }
                                  >
                                    {item.locked ? "Locked" : item.obtained ? "Obtained" : "Not Obtained"}
                                  </Badge>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )
                })}
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