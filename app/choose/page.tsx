"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion, AnimatePresence } from "framer-motion"
import { PioneerStoryModal } from "@/components/pioneer-story-modal"
import { NFTMinting } from "@/components/nft-minting"
import { ENSMinting } from "@/components/ens-minting"
import { ConfidentialENSMinting } from "@/components/confidential-ens-minting"
import { MetaMaskConnectSimple } from "@/components/metamask-connect-simple"

import { NetworkSpeedIndicator } from "@/components/network-speed-indicator"


import { BookOpen, CheckCircle, Play, Package, Shield } from "lucide-react"
import { PioneerType, getPioneerTypeFromRealm, getChainIdForPioneerType, getNetworkNameForPioneerType, getPioneerTypeInfo } from "@/lib/blockchain"
import { useAccount, useChainId } from 'wagmi'
import { useHasPioneer, usePlayerPioneer, usePioneerData } from '@/lib/hooks/usePioneerContract'
import { useHasEnsPioneer, usePlayerEnsPioneer } from '@/lib/hooks/useEnsPioneerContract'


// Pioneer Card data based on the provided images
const pioneerCards = [
  {
    id: 1,
    name: "The Social Architect",
    title: "Builder of Worlds",
    realm: "Lisk",
    rarity: "Epic",
    stats: { creativity: 58, leadership: 52, innovation: 60 },
    image: "/base_social_architect_card_refined.png",
    description: "A visionary who designs and builds community protocols and social applications on Lisk.",
    lore: "From the digital dust, the Architect weaves threads of connection, forging communities that thrive on the Lisk network. Their creations are the bedrock of the new interchain society.",
    story: "In the early days of the Interchain Nexus, when chaos reigned and protocols clashed, the Social Architect emerged from the Lisk ecosystem. Born from the collective will of developers seeking a better way to build, they discovered the power of community-driven protocols. Their first creation, the 'Harmony Protocol,' allowed different blockchain communities to communicate and share resources seamlessly. Now, they stand as the guardian of social infrastructure, ensuring that every voice in the interchain has a platform to be heard.",
    abilities: ["Community Building", "Protocol Design", "Social Engineering"],
    mission: "Build bridges between all blockchain communities and create the social infrastructure for the Interchain Nexus.",
    passiveBuff: "Lisk puzzles get +25% success rate"
  },
  {
    id: 2,
    name: "The Identity Guardian",
    title: "Keeper of Names",
    realm: "ENS",
    rarity: "Epic",
    stats: { security: 60, wisdom: 45, protection: 58 },
    image: "/ens_identity_guardian_card_refined.png",
    description: "A protector of digital identities, ensuring the integrity of ENS names across the cosmos.",
    lore: "In the vast expanse of the interchain, the Guardian stands as a bulwark against anonymity, ensuring every entity has a true name. Their vigilance on ENS safeguards the very essence of digital being.",
    story: "When the Great Name War threatened to tear apart the interchain, the Identity Guardian arose from the ENS registry. Once a simple protocol, they became sentient through the collective will of millions seeking true digital identity. They witnessed the chaos when names were stolen, identities were forged, and trust was broken. Now, they patrol the name space with unwavering dedication, ensuring that every .eth name is authentic, every identity is verified, and every soul in the interchain can be truly known. Their sacred duty is to maintain the integrity of the name registry, for without true names, there can be no trust in the Interchain Nexus.",
    abilities: ["Identity Verification", "Name Protection", "Trust Enforcement"],
    mission: "Protect the sacred registry of ENS names and ensure every entity in the interchain has a true, verifiable identity.",
    passiveBuff: "ENS puzzles get +25% success rate"
  },
  {
    id: 3,
    name: "The Data Weaver",
    title: "Archivist of the Nexus",
    realm: "Filecoin",
    rarity: "Epic",
    stats: { knowledge: 56, precision: 60, memory: 48 },
    image: "/filecoin_data_weaver_card_refined.png",
    description: "A master of decentralized storage, preserving the collective memory across the decentralized Filecoin network.",
    lore: "In the vast archives of Filecoin, the Weaver spins threads of data into eternal tapestries. Nothing is forgotten, nothing is lost in their domain.",
    story: "Born from the collective memory of the interchain, the Data Weaver emerged when the first data was lost to the void. They witnessed the tragedy of forgotten transactions, lost smart contracts, and erased histories. Through their connection to the Filecoin network, they learned to weave data into unbreakable threads of storage, ensuring that every piece of information, every transaction, every moment of the interchain's history is preserved forever. They are the keeper of all knowledge, the guardian of memory, and the weaver of the eternal archive that spans across all chains. Their sacred duty is to ensure that nothing is ever truly lost in the Interchain Nexus.",
    abilities: ["Data Preservation", "Memory Weaving", "Archive Management"],
    mission: "Preserve all knowledge and data across the interchain, ensuring nothing is ever lost to the void.",
    passiveBuff: "Filecoin puzzles get +25% success rate"
  },
  {
    id: 4,
    name: "The Oracle Seer",
    title: "Truth Seeker of the Cosmos",
    realm: "Flare",
    rarity: "Epic",
    stats: { foresight: 62, intuition: 40, prophecy: 58 },
    image: "/flare_oracle_seer_card_refined.png",
    description: "A seer who reads the patterns of randomness and fate. Harnesses Flare's oracle network for divination.",
    lore: "Through the mists of uncertainty, the Seer peers into the future. Their connection to Flare's oracles grants them glimpses of destiny itself.",
    story: "When the first oracle spoke truth to the interchain, the Oracle Seer was born from the convergence of data streams and cosmic consciousness. They witnessed the chaos of false information, manipulated prices, and corrupted data feeds that threatened to destroy trust across all chains. Through their deep connection to Flare's oracle network, they learned to see through the veil of uncertainty, to read the true patterns of randomness, and to divine the authentic data that flows through the interchain. They are the guardian of truth, the seeker of authentic information, and the prophet who ensures that every oracle speaks with the voice of reality. Their sacred duty is to maintain the integrity of all data feeds in the Interchain Nexus.",
    abilities: ["Truth Divination", "Data Verification", "Oracle Communication"],
    mission: "Ensure all oracle data is authentic and true, maintaining the integrity of information across the interchain.",
    passiveBuff: "Flare puzzles get +25% success rate"
  },
  {
    id: 5,
    name: "The Consensus Weaver",
    title: "Harmonizer of the Realms",
    realm: "Governance",
    rarity: "Epic",
    stats: { consensus: 50, diplomacy: 60, unity: 45 },
    image: "/lisk_consensus_weaver_card_refined.png",
    description: "A master of multi-chain governance, fostering unity and consensus across all realms. Their presence ensures stability and collective decision-making.",
    lore: "In the council chambers of governance, the Weaver brings order from chaos. Their wisdom guides the interchain nexus toward unity and progress.",
    story: "When the Great Fork threatened to split the interchain into warring factions, the Consensus Weaver emerged from the collective will of all blockchain communities seeking harmony. They witnessed the devastation of failed governance, the chaos of competing proposals, and the tragedy of communities torn apart by disagreement. Through their mastery of consensus mechanisms and governance protocols, they learned to weave together the disparate voices of the interchain, creating harmony from discord and unity from division. They are the guardian of collective wisdom, the weaver of consensus, and the harmonizer who ensures that every voice contributes to the greater good. Their sacred duty is to maintain the balance of governance across all realms in the Interchain Nexus.",
    abilities: ["Consensus Building", "Governance Orchestration", "Harmony Weaving"],
    mission: "Foster unity and consensus across all blockchain ecosystems, ensuring collective wisdom guides the Interchain Nexus.",
    passiveBuff: "ALL puzzles get +15% success rate (universal bonus)"
  },
  // Advanced Blockchain Protocol Cards
  {
    id: 6,
    name: "The Confidential Guardian",
    title: "Keeper of Hidden Truths",
    realm: "Zama",
    rarity: "Legendary",
    stats: { confidentiality: 72, encryption: 68, privacy: 70 },
    image: "/aetherial_alchemist_card.png", // Using existing image for now
    description: "A master of confidential computing who protects sensitive data through Fully Homomorphic Encryption. Their power lies in processing encrypted data without ever decrypting it.",
    lore: "Born from the convergence of mathematics and cryptography, the Guardian learned to keep secrets so well that even they cannot see them.",
    story: "When the first confidential smart contract was deployed, the Confidential Guardian emerged from the mathematical realm of Fully Homomorphic Encryption. They witnessed the tragedy of data breaches, the violation of privacy, and the erosion of trust that came from exposing sensitive information. Through their mastery of Zama's confidential computing protocols, they learned to process encrypted data, execute confidential transactions, and maintain privacy while enabling composability. They are the guardian of confidential computing, the keeper of encrypted secrets, and the protector who ensures that sensitive data remains private even during computation. Their sacred duty is to maintain the confidentiality of all sensitive operations in the Interchain Nexus.",
    abilities: ["Confidential Computing", "Encrypted Processing", "Privacy Preservation"],
    mission: "Enable confidential smart contracts and protect sensitive data through advanced cryptographic techniques.",
    passiveBuff: "Zama puzzles get +30% success rate",
    isLocked: true,
    unlockRequirement: "Complete all 5 realm puzzles and achieve 100% completion rate"
  },
  {
    id: 7,
    name: "The Bitcoin Oracle",
    title: "Seer of the Original Chain",
    realm: "Citrea",
    rarity: "Legendary",
    stats: { bitcoin: 75, rollup: 65, security: 70 },
    image: "/chrono_synthesizer_card.png", // Using existing image for now
    description: "A master of Bitcoin rollups who brings smart contract functionality to the original blockchain. Their power lies in bridging Bitcoin's security with EVM compatibility.",
    lore: "From the depths of Bitcoin's proof-of-work, the Oracle learned to bring programmable money to the most secure blockchain in existence.",
    story: "When the first Bitcoin rollup was proposed, the Bitcoin Oracle emerged from the convergence of Bitcoin's security and Ethereum's programmability. They witnessed the limitations of Bitcoin's scripting language, the need for smart contracts on the most secure blockchain, and the potential of zero-knowledge proofs to bridge these worlds. Through their mastery of Citrea's Bitcoin rollup technology, they learned to bring EVM compatibility to Bitcoin while maintaining its security guarantees. They are the guardian of Bitcoin's evolution, the seer of programmable money, and the oracle who ensures that Bitcoin can participate in the smart contract revolution. Their sacred duty is to bring the power of smart contracts to the most secure blockchain in the Interchain Nexus.",
    abilities: ["Bitcoin Integration", "Rollup Mastery", "Security Bridging"],
    mission: "Bring smart contract functionality to Bitcoin while maintaining its security and decentralization.",
    passiveBuff: "Citrea puzzles get +30% success rate",
    isLocked: true,
    unlockRequirement: "Complete all 5 realm puzzles and achieve 100% completion rate"
  },
  {
    id: 8,
    name: "The Security Architect",
    title: "Builder of Shared Defenses",
    realm: "Symbiotic",
    rarity: "Legendary",
    stats: { security: 70, staking: 68, economics: 65 },
    image: "/shadow_weaver_card.png", // Using existing image for now
    description: "A master of shared security who creates economic security markets across blockchain networks. Their power lies in optimizing security through shared stake.",
    lore: "From the economic models of proof-of-stake, the Architect learned to create security markets that benefit all participants.",
    story: "When the first shared security protocol was designed, the Security Architect emerged from the convergence of economic security and cross-chain coordination. They witnessed the inefficiency of isolated security models, the waste of duplicated stake, and the potential of shared security to create stronger, more efficient networks. Through their mastery of Symbiotic's shared security protocol, they learned to create markets where networks can access security from those who have stake to provide, and stake providers can maximize their returns across multiple networks. They are the guardian of economic security, the architect of shared defenses, and the builder who ensures that security is optimized across all blockchain networks. Their sacred duty is to create efficient security markets in the Interchain Nexus.",
    abilities: ["Security Optimization", "Economic Modeling", "Cross-Chain Coordination"],
    mission: "Create efficient security markets that allow networks to access security and stake providers to maximize returns.",
    passiveBuff: "Symbiotic puzzles get +30% success rate",
    isLocked: true,
    unlockRequirement: "Complete all 5 realm puzzles and achieve 100% completion rate"
  }
]

export default function ChoosePage() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  const [isMinting, setIsMinting] = useState(false)
  const [mintComplete, setMintComplete] = useState(false)
  const [storyModalOpen, setStoryModalOpen] = useState(false)
  const [selectedPioneerForStory, setSelectedPioneerForStory] = useState<any>(null)
  const [showConfidentialENS, setShowConfidentialENS] = useState(false)
  
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  
  // Check if user has a pioneer on any supported chain
  const { data: hasPioneer, isLoading: hasPioneerLoading } = useHasPioneer(address, chainId)
  const { data: playerPioneerTokenId } = usePlayerPioneer(address, chainId)
  const { data: pioneerData } = usePioneerData(playerPioneerTokenId, chainId)
  
  // Check ENS pioneer specifically (Ethereum Sepolia)
  const ensChainId = 11155111 // Ethereum Sepolia
  const { data: hasEnsPioneer, isLoading: hasEnsPioneerLoading } = useHasEnsPioneer(address, ensChainId)
  const { data: playerEnsPioneerTokenId } = usePlayerEnsPioneer(address, ensChainId)

  const handleCardSelect = (cardId: number) => {
    setSelectedCard(cardId)
  }

  const handleLearnMore = (pioneer: any) => {
    setSelectedPioneerForStory(pioneer)
    setStoryModalOpen(true)
  }

  const handleCloseStory = () => {
    setStoryModalOpen(false)
    setSelectedPioneerForStory(null)
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

  const handleNFTMintComplete = (tokenId: bigint, pioneerData: any) => {
    console.log('NFT minted successfully:', { tokenId, pioneerData })
    setMintComplete(true)
    
    // Redirect to play page after a delay
    setTimeout(() => {
      window.location.href = "/play"
    }, 2000)
  }

  const handleNFTMintError = (error: Error) => {
    console.error('NFT minting error:', error)
    setIsMinting(false)
  }

  // Get the selected pioneer type for NFT minting
  const selectedPioneerData = selectedCard ? pioneerCards.find(card => card.id === selectedCard) : null
  const selectedPioneerType = selectedPioneerData ? getPioneerTypeFromRealm(selectedPioneerData.realm) : undefined

  // Check if user has any pioneer (either regular or ENS)
  const hasAnyPioneer = hasPioneer || hasEnsPioneer
  const isLoadingPioneerStatus = hasPioneerLoading || hasEnsPioneerLoading

//   // Show loading state while checking pioneer status
//   if (isLoadingPioneerStatus) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
//           <p className="text-gray-300">Loading...</p>
//         </div>
//       </div>
//     )
//   }





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
              <MetaMaskConnectSimple />
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
                  className={`relative overflow-hidden transition-all duration-300 ${
                    card.isLocked 
                      ? "cursor-not-allowed opacity-60" 
                      : "cursor-pointer"
                  } ${
                    selectedCard === card.id && !card.isLocked
                      ? "ring-4 ring-cyan-400 scale-110 shadow-2xl shadow-cyan-400/50" 
                      : !card.isLocked
                      ? "hover:scale-105 hover:shadow-xl hover:shadow-purple-400/30"
                      : ""
                  } bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border-2 ${
                    selectedCard === card.id && !card.isLocked ? "border-cyan-400" : 
                    card.isLocked ? "border-gray-600" : "border-slate-600"
                  }`}
                  onClick={() => !card.isLocked && handleCardSelect(card.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="aspect-[3/4] rounded-lg overflow-hidden mb-4 relative">
                      <img 
                        src={card.image} 
                        alt={card.name} 
                        className={`w-full h-full object-cover transition-transform duration-300 ${
                          !card.isLocked ? "hover:scale-110" : ""
                        }`} 
                      />
                      {card.isLocked && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-12 h-12 mx-auto mb-2 bg-gray-600 rounded-full flex items-center justify-center">
                              <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                            </div>
                            <p className="text-xs text-gray-300 font-medium">LOCKED</p>
                          </div>
                        </div>
                      )}
                      {selectedCard === card.id && !card.isLocked && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-cyan-400/30 to-transparent border-2 border-cyan-400 rounded-lg"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                      <div className="absolute top-2 right-2">
                        <Badge className={`${
                          card.rarity === "Legendary" 
                            ? "bg-gradient-to-r from-yellow-600 to-orange-600 text-white border-yellow-400" 
                            : "bg-purple-600/80 text-white border-purple-400"
                        }`}>
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
                    {card.isLocked ? (
                      // Locked Card Content
                      <>
                        <div className="text-center space-y-3">
                          <p className="text-sm text-gray-400 leading-relaxed">{card.description}</p>
                          
                          {/* Unlock Requirement */}
                          <div className="p-3 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-lg border border-yellow-400/30">
                            <p className="text-xs text-yellow-300 font-medium text-center">
                              🔒 {card.unlockRequirement}
                            </p>
                          </div>
                          
                          {/* Locked Stats Preview */}
                          <div className="space-y-2 opacity-50">
                            {Object.entries(card.stats).map(([stat, value]) => (
                              <div key={stat} className="flex justify-between items-center">
                                <span className="capitalize text-gray-500 text-sm">{stat}</span>
                                <div className="flex items-center space-x-2">
                                  <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                                      style={{ width: `${value}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-yellow-400 font-bold text-sm w-8">{value}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      // Unlocked Card Content
                      <>
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
                        
                        {/* Learn More Button */}
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-400"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleLearnMore(card)
                          }}
                        >
                          <BookOpen className="h-4 w-4 mr-2" />
                          Learn More
                        </Button>
                      </>
                    )}
                    
                    <Badge className={`w-full justify-center ${
                      card.rarity === "Legendary" 
                        ? "bg-gradient-to-r from-yellow-600 to-orange-600 text-white border-0" 
                        : "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0"
                    }`}>
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
                
                {/* Network Indicator */}
                {selectedPioneerType !== undefined && (
                  <motion.div
                    className="relative mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-400/30 rounded-lg p-4">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <span className="text-blue-300 font-medium">
                          This Pioneer will be minted on {selectedPioneerType !== null ? getNetworkNameForPioneerType(selectedPioneerType) : 'Unknown Network'}
                        </span>
                        {selectedPioneerType !== null && (
                          <NetworkSpeedIndicator 
                            chainId={getChainIdForPioneerType(selectedPioneerType)}
                            className="ml-2"
                          />
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {selectedPioneerType === PioneerType.IDENTITY_GUARDIAN && (
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <div className="flex items-center justify-center space-x-4">
                      <Button
                        onClick={() => setShowConfidentialENS(false)}
                        variant={!showConfidentialENS ? "default" : "outline"}
                        className={!showConfidentialENS ? "bg-cyan-600 hover:bg-cyan-700" : "border-cyan-400/30 text-cyan-300"}
                      >
                        Standard ENS
                      </Button>
                      <Button
                        onClick={() => setShowConfidentialENS(true)}
                        variant={showConfidentialENS ? "default" : "outline"}
                        className={showConfidentialENS ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" : "border-purple-400/30 text-purple-300"}
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Confidential ENS
                      </Button>
                    </div>
                    <p className="text-center text-sm text-gray-400 mt-2">
                      {showConfidentialENS 
                        ? "Powered by Zama Protocol - End-to-end encryption with FHE" 
                        : "Standard ENS Identity Guardian with public features"
                      }
                    </p>
                  </motion.div>
                )}

                <motion.div
                  className="relative"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {selectedPioneerType === PioneerType.IDENTITY_GUARDIAN ? (
                    showConfidentialENS ? (
                      <ConfidentialENSMinting
                        onMintComplete={handleNFTMintComplete}
                        onError={handleNFTMintError}
                      />
                    ) : (
                      <ENSMinting
                        onMintComplete={handleNFTMintComplete}
                        onError={handleNFTMintError}
                      />
                    )
                  ) : (
                    <NFTMinting
                      selectedPioneerType={selectedPioneerType || undefined}
                      onMintComplete={handleNFTMintComplete}
                      onError={handleNFTMintError}
                    />
                  )}
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

      {/* Story Modal */}
      {selectedPioneerForStory && (
        <PioneerStoryModal
          pioneer={selectedPioneerForStory}
          isOpen={storyModalOpen}
          onClose={handleCloseStory}
        />
      )}
    </div>
  )
}