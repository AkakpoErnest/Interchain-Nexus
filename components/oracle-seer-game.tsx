'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Eye, 
  Brain, 
  Zap, 
  Shield, 
  Search, 
  Star, 
  Play, 
  CheckCircle, 
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Lightbulb,
  Target,
  Crown,
  Globe,
  TrendingUp,
  Users,
  Award,
  BookOpen,
  Sparkles
} from 'lucide-react'

interface GameState {
  currentChapter: number
  currentQuest: number
  score: number
  completedChapters: number[]
  visionCards: VisionCard[]
  energy: number
  maxEnergy: number
  reputation: number
  guildMembership: string | null
}

interface VisionCard {
  id: string
  name: string
  description: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  image: string
  data: any
  mintedAt: number
  canFuse: boolean
  fusionTarget?: string
}

interface OracleQuest {
  id: number
  type: 'ftso' | 'cross-chain' | 'voting' | 'guild' | 'calculation' | 'prediction' | 'sequence'
  title: string
  description: string
  oracleQuery: string
  expectedAnswer?: any
  reward: VisionCard
  energyCost: number
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary'
  realTimeData?: boolean
  timeLimit?: number
  multipleChoice?: string[]
  calculation?: {
    formula: string
    variables: Record<string, number>
  }
  sequence?: {
    pattern: string[]
    nextValue: string
  }
}

interface Chapter {
  id: number
  title: string
  description: string
  image: string
  story: string
  quests: OracleQuest[]
  reward: VisionCard
  unlocksNext: boolean
}

// Mock FTSO data - in real implementation, this would come from Flare's oracle
const mockFTSOData = {
  'ETH/USD': 2450.67,
  'BTC/USD': 43250.89,
  'FLR/USD': 0.0234,
  'SGB/USD': 0.0012,
  'temperature': 22.5,
  'humidity': 65,
  'wind_speed': 12.3
}

const gameChapters: Chapter[] = [
  {
    id: 1,
    title: "The Seer's Awakening",
    description: "Begin your journey as an Apprentice of the Oracle",
    image: "/mystical-oracle-eye-with-data-streams.png",
    story: "In the ethereal realm of Flare, the Oracle Seer awakens from centuries of slumber. His eyes, now glowing with the power of decentralized truth, pierce through the veil of reality. 'Apprentice,' he whispers, 'the Great Fracture has scattered my visions across the multiverse. Only through the power of the FTSO can we restore the truth.'",
    quests: [
      {
        id: 1,
        type: 'ftso',
        title: "The Price of Truth",
        description: "The Seer asks: 'What is the current price of Ethereum in the realm of fiat?' Query the FTSO to reveal this truth.",
        oracleQuery: 'ETH/USD',
        expectedAnswer: mockFTSOData['ETH/USD'],
        reward: {
          id: 'vision-eth-sun',
          name: 'Vision of the Ether Sun',
          description: 'A fragment showing the radiant price of Ethereum',
          rarity: 'common',
          image: '/cyberpunk-archer-with-glowing-bow.png',
          data: { price: mockFTSOData['ETH/USD'], timestamp: Date.now() },
          mintedAt: Date.now(),
          canFuse: true,
          fusionTarget: 'eclipse-prophecy'
        },
        energyCost: 10,
        difficulty: 'easy',
        realTimeData: true,
        timeLimit: 30,
        multipleChoice: ['$2,400 - $2,500', '$2,500 - $2,600', '$2,600 - $2,700', 'Above $2,700']
      },
      {
        id: 2,
        type: 'ftso',
        title: "The Bitcoin Beacon",
        description: "The Seer's vision shows a golden beacon. 'What price does this beacon shine at?' Query the FTSO for Bitcoin's current value.",
        oracleQuery: 'BTC/USD',
        expectedAnswer: mockFTSOData['BTC/USD'],
        reward: {
          id: 'vision-btc-beacon',
          name: 'Vision of the Bitcoin Beacon',
          description: 'A golden fragment showing Bitcoin\'s current price',
          rarity: 'common',
          image: '/glowing-scroll-with-encrypted-symbols.png',
          data: { price: mockFTSOData['BTC/USD'], timestamp: Date.now() },
          mintedAt: Date.now(),
          canFuse: true,
          fusionTarget: 'eclipse-prophecy'
        },
        energyCost: 15,
        difficulty: 'easy',
        realTimeData: true
      }
    ],
    reward: {
      id: 'apprentice-badge',
      name: 'Apprentice Badge',
      description: 'Proof of your first steps in the Oracle\'s service',
      rarity: 'rare',
      image: '/flare_oracle_seer_card_refined.png',
      data: { level: 1, title: 'Apprentice' },
      mintedAt: Date.now(),
      canFuse: false
    },
    unlocksNext: true
  },
  {
    id: 2,
    title: "The Cross-Chain Prophecy",
    description: "Journey beyond Flare to gather truth from other realms",
    image: "/holographic-app-interface-deployment.png",
    story: "The Seer's eyes widen as he peers across the multiverse. 'Apprentice, the truth is not confined to one realm. The State Connector allows us to verify events from distant chains. Go forth and bring back proof of transactions from the Ethereum realm.'",
    quests: [
      {
        id: 3,
        type: 'cross-chain',
        title: "The Ethereum Transaction",
        description: "The Seer needs proof of a recent Uniswap transaction on Ethereum. Use the State Connector to verify and bring back the proof.",
        oracleQuery: 'ethereum-transaction-verification',
        expectedAnswer: 'verified',
        reward: {
          id: 'vision-ethereum-bridge',
          name: 'Vision of the Ethereum Bridge',
          description: 'Proof of cross-chain truth from Ethereum',
          rarity: 'epic',
          image: '/futuristic-citadel-with-governance-symbols.png',
          data: { chain: 'ethereum', verified: true, timestamp: Date.now() },
          mintedAt: Date.now(),
          canFuse: true,
          fusionTarget: 'multiverse-prophecy'
        },
        energyCost: 25,
        difficulty: 'medium',
        realTimeData: false
      },
      {
        id: 4,
        type: 'voting',
        title: "The Oracle Vote",
        description: "The Seer's vision is unclear. Stake your tokens to support the most likely outcome of the next price movement.",
        oracleQuery: 'price-prediction-vote',
        expectedAnswer: 'up',
        reward: {
          id: 'vision-oracle-vote',
          name: 'Vision of the Oracle Vote',
          description: 'Your stake in the truth of the oracle',
          rarity: 'rare',
          image: '/towering-data-storage-facility-with-glowing-cores.png',
          data: { vote: 'up', staked: 100, timestamp: Date.now() },
          mintedAt: Date.now(),
          canFuse: true,
          fusionTarget: 'consensus-prophecy'
        },
        energyCost: 20,
        difficulty: 'medium',
        realTimeData: true
      }
    ],
    reward: {
      id: 'cross-chain-master',
      name: 'Cross-Chain Master Badge',
      description: 'Proof of your ability to navigate between realms',
      rarity: 'epic',
      image: '/diplomatic-blockchain-negotiator-with-energy-patte.png',
      data: { level: 2, title: 'Cross-Chain Master' },
      mintedAt: Date.now(),
      canFuse: false
    },
    unlocksNext: true
  },
  {
    id: 3,
    title: "The Guild of Prophets",
    description: "Join forces with other Seers to unlock greater truths",
    image: "/futuristic-data-archivist-with-holographic-display.png",
    story: "The Seer gestures to the horizon where other Apprentices gather. 'The greatest truths are discovered together. Form a Guild of Prophets and compete in the Oracle Tournament. Only through collective wisdom can we restore the complete prophecy.'",
    quests: [
      {
        id: 5,
        type: 'guild',
        title: "The Guild Formation",
        description: "Create or join a guild of Oracle Apprentices. Pool your visions and tokens to compete in the tournament.",
        oracleQuery: 'guild-formation',
        expectedAnswer: 'guild-created',
        reward: {
          id: 'vision-guild-banner',
          name: 'Vision of the Guild Banner',
          description: 'Your guild\'s symbol of unity and strength',
          rarity: 'epic',
          image: '/ens_identity_guardian_card_refined.png',
          data: { guild: 'Prophets of Truth', members: 5, timestamp: Date.now() },
          mintedAt: Date.now(),
          canFuse: true,
          fusionTarget: 'guild-prophecy'
        },
        energyCost: 30,
        difficulty: 'hard',
        realTimeData: false
      },
      {
        id: 6,
        type: 'ftso',
        title: "The Weather Oracle",
        description: "The Seer needs to know the current weather conditions. Query the FTSO for real-world weather data.",
        oracleQuery: 'temperature',
        expectedAnswer: mockFTSOData['temperature'],
        reward: {
          id: 'vision-weather-oracle',
          name: 'Vision of the Weather Oracle',
          description: 'Real-world weather data from the oracle',
          rarity: 'rare',
          image: '/mystical-oracle-eye-with-data-streams.png',
          data: { temperature: mockFTSOData['temperature'], timestamp: Date.now() },
          mintedAt: Date.now(),
          canFuse: true,
          fusionTarget: 'nature-prophecy'
        },
        energyCost: 15,
        difficulty: 'easy',
        realTimeData: true
      }
    ],
    reward: {
      id: 'guild-master',
      name: 'Guild Master Badge',
      description: 'Leader of the Prophets Guild',
      rarity: 'legendary',
      image: '/base_social_architect_card_refined.png',
      data: { level: 3, title: 'Guild Master' },
      mintedAt: Date.now(),
      canFuse: false
    },
    unlocksNext: true
  },
  {
    id: 4,
    title: "The Final Prophecy",
    description: "Unite all visions to restore the complete truth",
    image: "/cyberpunk-archer-with-glowing-bow.png",
    story: "The Seer's eyes blaze with cosmic fire as all the vision fragments begin to align. 'Apprentice, the time has come. Fuse your collected visions to unlock the Final Prophecy. Only then will the Great Fracture be healed and all chains united.'",
    quests: [
      {
        id: 7,
        type: 'ftso',
        title: "The Flare Token Vision",
        description: "The Seer asks for the current price of Flare's native token. This final piece will complete the prophecy.",
        oracleQuery: 'FLR/USD',
        expectedAnswer: mockFTSOData['FLR/USD'],
        reward: {
          id: 'vision-flare-token',
          name: 'Vision of the Flare Token',
          description: 'The final fragment of the prophecy',
          rarity: 'legendary',
          image: '/filecoin_data_weaver_card_refined.png',
          data: { price: mockFTSOData['FLR/USD'], timestamp: Date.now() },
          mintedAt: Date.now(),
          canFuse: true,
          fusionTarget: 'final-prophecy'
        },
        energyCost: 40,
        difficulty: 'legendary',
        realTimeData: true
      }
    ],
    reward: {
      id: 'oracle-master',
      name: 'Oracle Master Badge',
      description: 'The highest honor in the Oracle\'s service',
      rarity: 'legendary',
      image: '/lisk_consensus_weaver_card_refined.png',
      data: { level: 4, title: 'Oracle Master' },
      mintedAt: Date.now(),
      canFuse: false
    },
    unlocksNext: false
  }
]

export function OracleSeerGame() {
  const [gameState, setGameState] = useState<GameState>({
    currentChapter: 1,
    currentQuest: 0,
    score: 0,
    completedChapters: [],
    visionCards: [],
    energy: 100,
    maxEnergy: 100,
    reputation: 0,
    guildMembership: null
  })

  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [showStory, setShowStory] = useState(true)
  const [oracleResponse, setOracleResponse] = useState<any>(null)
  const [isQueryingOracle, setIsQueryingOracle] = useState(false)
  const [showNavigation, setShowNavigation] = useState(false)
  const [gamePaused, setGamePaused] = useState(false)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState(0)

  const currentChapter = gameChapters[gameState.currentChapter - 1]
  const currentQuest = currentChapter?.quests[gameState.currentQuest]

  const queryOracle = async (query: string) => {
    setIsQueryingOracle(true)
    
    // Simulate oracle query delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // In real implementation, this would query Flare's FTSO
    const response = mockFTSOData[query as keyof typeof mockFTSOData] || 'oracle-error'
    
    setOracleResponse(response)
    setIsQueryingOracle(false)
    return response
  }

  const handleOracleQuery = async () => {
    if (!currentQuest) return
    
    const response = await queryOracle(currentQuest.oracleQuery)
    
    // Check if the response matches the expected answer
    const isCorrect = response === currentQuest.expectedAnswer
    
    if (isCorrect) {
      // Correct answer
      setGameState(prev => ({
        ...prev,
        score: prev.score + (currentQuest.difficulty === 'easy' ? 100 : 
                           currentQuest.difficulty === 'medium' ? 200 :
                           currentQuest.difficulty === 'hard' ? 300 : 500),
        energy: Math.max(0, prev.energy - (currentQuest?.energyCost || 0)),
        visionCards: [...prev.visionCards, currentQuest?.reward],
        reputation: prev.reputation + 10
      }))
      
      // Move to next quest or chapter
      setTimeout(() => {
        if (gameState.currentQuest < currentChapter.quests.length - 1) {
          setGameState(prev => ({ ...prev, currentQuest: prev.currentQuest + 1 }))
        } else {
          // Chapter complete
          setGameState(prev => ({
            ...prev,
            completedChapters: [...prev.completedChapters, prev.currentChapter],
            currentChapter: prev.currentChapter + 1,
            currentQuest: 0,
            visionCards: [...prev.visionCards, currentChapter.reward]
          }))
          
          if (gameState.currentChapter >= gameChapters.length) {
            setGameComplete(true)
          }
        }
        setSelectedAnswer(null)
        setShowHint(false)
        setOracleResponse(null)
      }, 3000)
    } else {
      // Wrong answer - lose energy
      setGameState(prev => ({
        ...prev,
        energy: Math.max(0, prev.energy - 10),
        reputation: Math.max(0, prev.reputation - 5)
      }))
    }
  }

  const fuseVisionCards = (card1: VisionCard, card2: VisionCard) => {
    if (!card1.canFuse || !card2.canFuse) return
    
    const fusionResult: VisionCard = {
      id: `fused-${Date.now()}`,
      name: 'Eclipse Prophecy',
      description: 'A fused vision revealing the complete truth',
      rarity: 'legendary',
      image: '/holographic-app-interface-deployment.png',
      data: { fused: true, components: [card1.id, card2.id] },
      mintedAt: Date.now(),
      canFuse: false
    }
    
    setGameState(prev => ({
      ...prev,
      visionCards: prev.visionCards.filter(card => card.id !== card1.id && card.id !== card2.id).concat(fusionResult),
      score: prev.score + 1000
    }))
  }

  const restartGame = () => {
    setGameState({
      currentChapter: 1,
      currentQuest: 0,
      score: 0,
      completedChapters: [],
      visionCards: [],
      energy: 100,
      maxEnergy: 100,
      reputation: 0,
      guildMembership: null
    })
    setSelectedAnswer(null)
    setShowHint(false)
    setGameComplete(false)
    setShowStory(true)
    setOracleResponse(null)
    setShowNavigation(false)
    setGamePaused(false)
    setHintsUsed(0)
    setWrongAnswers(0)
  }

  const goToNextQuest = () => {
    if (gameState.currentQuest < currentChapter.quests.length - 1) {
      setGameState(prev => ({ ...prev, currentQuest: prev.currentQuest + 1 }))
      setOracleResponse(null)
      setShowHint(false)
    } else if (gameState.currentChapter < gameChapters.length) {
      setGameState(prev => ({
        ...prev,
        currentChapter: prev.currentChapter + 1,
        currentQuest: 0
      }))
      setShowStory(true)
      setOracleResponse(null)
      setShowHint(false)
    }
  }

  const goToPreviousQuest = () => {
    if (gameState.currentQuest > 0) {
      setGameState(prev => ({ ...prev, currentQuest: prev.currentQuest - 1 }))
      setOracleResponse(null)
      setShowHint(false)
    } else if (gameState.currentChapter > 1) {
      setGameState(prev => ({
        ...prev,
        currentChapter: prev.currentChapter - 1,
        currentQuest: gameChapters[prev.currentChapter - 2].quests.length - 1
      }))
      setOracleResponse(null)
      setShowHint(false)
    }
  }

  const pauseGame = () => {
    setGamePaused(!gamePaused)
  }

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-4xl w-full"
        >
          <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500/30">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Crown className="h-16 w-16 text-yellow-400" />
              </div>
              <CardTitle className="text-3xl text-white mb-2">
                🎉 Oracle Master! 🎉
              </CardTitle>
              <p className="text-gray-300">
                You have successfully restored the complete prophecy and healed the Great Fracture!
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">
                  Final Score: {gameState.score}
                </div>
                <div className="text-lg text-gray-300">
                  Reputation: {gameState.reputation} | Vision Cards: {gameState.visionCards.length}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">🔮 Vision Cards Collected:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {gameState.visionCards.map((card) => (
                    <Card key={card.id} className="bg-gray-800/50 border-purple-500/30">
                      <CardContent className="p-4">
                        <img src={card.image} alt={card.name} className="w-full h-20 object-cover rounded mb-2" />
                        <h4 className="font-semibold text-white text-sm">{card.name}</h4>
                        <Badge variant="secondary" className={`text-xs ${
                          card.rarity === 'common' ? 'bg-gray-500' :
                          card.rarity === 'rare' ? 'bg-blue-500' :
                          card.rarity === 'epic' ? 'bg-purple-500' : 'bg-yellow-500'
                        }`}>
                          {card.rarity}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button onClick={restartGame} variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-500/20">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Play Again
                </Button>
                <Button onClick={() => window.location.href = '/inventory'} className="bg-gradient-to-r from-purple-500 to-blue-500">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  View Inventory
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  if (showStory && currentChapter) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-4xl w-full"
        >
          <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500/30">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary" className="bg-purple-600/30 text-purple-200">
                  Chapter {currentChapter.id}
                </Badge>
                <div className="flex items-center space-x-4 text-sm text-gray-300">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4" />
                    <span>Energy: {gameState.energy}/{gameState.maxEnergy}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4" />
                    <span>Reputation: {gameState.reputation}</span>
                  </div>
                </div>
              </div>
              <CardTitle className="text-2xl text-white mb-2">
                {currentChapter.title}
              </CardTitle>
              <p className="text-gray-300">
                {currentChapter.description}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative">
                <img 
                  src={currentChapter.image} 
                  alt={currentChapter.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
              </div>
              
              <div className="bg-black/30 p-4 rounded-lg">
                <p className="text-gray-200 leading-relaxed">
                  {currentChapter.story}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  Quests in this chapter: {currentChapter.quests.length}
                </div>
                <Button 
                  onClick={() => setShowStory(false)}
                  className="bg-gradient-to-r from-purple-500 to-blue-500"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Begin Chapter
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  if (!currentQuest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading quest...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
      {/* Pause Overlay */}
      {gamePaused && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <Card className="bg-gradient-to-br from-purple-900/90 to-blue-900/90 border-purple-500/30 max-w-md w-full mx-4">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Game Paused</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center text-gray-300">
                <p>Chapter {gameState.currentChapter} - Quest {gameState.currentQuest + 1}</p>
                <p>Score: {gameState.score} | Energy: {gameState.energy}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={pauseGame}
                  className="bg-gradient-to-r from-green-500 to-blue-500"
                >
                  Resume Game
                </Button>
                <Button
                  onClick={restartGame}
                  variant="outline"
                  className="border-red-500/50 text-red-300 hover:bg-red-500/20"
                >
                  Restart
                </Button>
                <Button
                  onClick={() => window.location.href = '/inventory'}
                  variant="outline"
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Inventory
                </Button>
                <Button
                  onClick={() => window.location.href = '/'}
                  variant="outline"
                  className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/20"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Home
                </Button>
                <Button
                  onClick={() => window.location.href = '/choose'}
                  variant="outline"
                  className="border-yellow-500/50 text-yellow-300 hover:bg-yellow-500/20"
                >
                  <Star className="h-4 w-4 mr-2" />
                  Choose
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Game Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-purple-600/30 text-purple-200">
              Chapter {gameState.currentChapter}
            </Badge>
            <Badge variant="outline" className="border-yellow-500/50 text-yellow-300">
              Quest {gameState.currentQuest + 1}
            </Badge>
            <Badge variant="outline" className={`border-2 ${
              currentQuest.difficulty === 'easy' ? 'border-green-500/50 text-green-300' :
              currentQuest.difficulty === 'medium' ? 'border-yellow-500/50 text-yellow-300' :
              currentQuest.difficulty === 'hard' ? 'border-orange-500/50 text-orange-300' :
              'border-red-500/50 text-red-300'
            }`}>
              {currentQuest.difficulty.toUpperCase()}
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-white">Score: {gameState.score}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Zap className="h-4 w-4 text-blue-400" />
              <span className="text-white">Energy: {gameState.energy}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Award className="h-4 w-4 text-purple-400" />
              <span className="text-white">Rep: {gameState.reputation}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowNavigation(!showNavigation)}
              className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/20"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={pauseGame}
              className="border-orange-500/50 text-orange-300 hover:bg-orange-500/20"
            >
              {gamePaused ? 'Resume' : 'Pause'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = '/inventory'}
              className="border-green-500/50 text-green-300 hover:bg-green-500/20"
            >
              <Shield className="h-4 w-4 mr-1" />
              Inventory
            </Button>
          </div>
        </div>

        {/* Navigation Controls */}
        {showNavigation && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Card className="bg-gray-800/50 border-gray-600/30">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      onClick={goToPreviousQuest}
                      disabled={gameState.currentChapter === 1 && gameState.currentQuest === 0}
                      className="border-blue-500/50 text-blue-300 hover:bg-blue-500/20"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous Quest
                    </Button>
                    <Button
                      variant="outline"
                      onClick={goToNextQuest}
                      disabled={gameState.currentChapter === gameChapters.length && gameState.currentQuest === currentChapter.quests.length - 1}
                      className="border-green-500/50 text-green-300 hover:bg-green-500/20"
                    >
                      Next Quest
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-400">
                      Progress: {gameState.currentChapter}/{gameChapters.length} chapters
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.location.href = '/inventory'}
                      className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
                    >
                      <Shield className="h-4 w-4 mr-1" />
                      Inventory
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.location.href = '/'}
                      className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/20"
                    >
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Home
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.location.href = '/choose'}
                      className="border-yellow-500/50 text-yellow-300 hover:bg-yellow-500/20"
                    >
                      <Star className="h-4 w-4 mr-1" />
                      Choose
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Energy Bar */}
        <div className="mb-6">
          <Progress 
            value={(gameState.energy / gameState.maxEnergy) * 100} 
            className="h-2"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Quest Area */}
          <div className="lg:col-span-2">
            <motion.div
              key={`${gameState.currentChapter}-${gameState.currentQuest}`}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
            >
              <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500/30 mb-6">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Eye className="h-5 w-5 text-purple-400" />
                      <span className="text-sm text-gray-400">
                        {currentQuest.type.toUpperCase()} QUEST
                      </span>
                    </div>
                    <Badge variant="outline" className="border-blue-500/50 text-blue-300">
                      Energy Cost: {currentQuest.energyCost}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-white">
                    {currentQuest.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-black/30 p-4 rounded-lg">
                    <p className="text-gray-200 leading-relaxed">
                      {currentQuest.description}
                    </p>
                  </div>

                  {currentQuest.image && (
                    <div className="relative">
                      <img 
                        src={currentQuest.image} 
                        alt="Quest visual"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
                    </div>
                  )}

                  {/* Oracle Query Section */}
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="text-white font-semibold mb-3 flex items-center">
                      <Globe className="h-5 w-5 mr-2 text-cyan-400" />
                      Oracle Query: {currentQuest.oracleQuery}
                    </h4>
                    
                    {currentQuest.timeLimit && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-400 mb-2">
                          <span>Time Limit</span>
                          <span>{currentQuest.timeLimit}s</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                    )}

                    {currentQuest.multipleChoice && (
                      <div className="mb-4">
                        <h5 className="text-white font-semibold mb-3">Choose the correct range:</h5>
                        <div className="grid grid-cols-2 gap-2">
                          {currentQuest.multipleChoice.map((choice, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              className="text-left justify-start border-purple-500/50 hover:border-purple-400 hover:bg-purple-500/20"
                              onClick={() => setSelectedAnswer(choice)}
                            >
                              {choice}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    {currentQuest.calculation && (
                      <div className="mb-4">
                        <h5 className="text-white font-semibold mb-3">Calculate the result:</h5>
                        <div className="bg-gray-700/50 p-3 rounded-lg">
                          <p className="text-gray-300 mb-2">Formula: {currentQuest.calculation.formula}</p>
                          <p className="text-gray-300 mb-2">Variables: {JSON.stringify(currentQuest.calculation.variables)}</p>
                          <div className="flex items-center space-x-2">
                            <input
                              type="number"
                              placeholder="Enter your answer"
                              className="flex-1 bg-gray-600 text-white px-3 py-2 rounded border border-gray-500"
                              onChange={(e) => setSelectedAnswer(parseFloat(e.target.value))}
                            />
                            <Button
                              variant="outline"
                              onClick={() => {
                                const result = eval(currentQuest.calculation.formula.replace('price', currentQuest.calculation.variables.price.toString()))
                                setSelectedAnswer(result)
                              }}
                              className="border-blue-500/50 text-blue-300 hover:bg-blue-500/20"
                            >
                              Calculate
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentQuest.sequence && (
                      <div className="mb-4">
                        <h5 className="text-white font-semibold mb-3">Complete the sequence:</h5>
                        <div className="bg-gray-700/50 p-3 rounded-lg">
                          <p className="text-gray-300 mb-2">Pattern: {currentQuest.sequence.pattern.join(', ')}</p>
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              placeholder="Next value"
                              className="flex-1 bg-gray-600 text-white px-3 py-2 rounded border border-gray-500"
                              onChange={(e) => setSelectedAnswer(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {isQueryingOracle ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mr-3"></div>
                        <span className="text-gray-300">Querying the Oracle...</span>
                      </div>
                    ) : oracleResponse ? (
                      <div className="bg-green-900/30 border border-green-500/30 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                          <span className="text-green-300 font-semibold">Oracle Response:</span>
                        </div>
                        <p className="text-white text-lg font-mono">
                          {oracleResponse}
                        </p>
                        {selectedAnswer && (
                          <div className="mt-3">
                            <Button
                              onClick={handleOracleQuery}
                              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Submit Answer
                            </Button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Button 
                        onClick={handleOracleQuery}
                        disabled={gameState.energy < currentQuest.energyCost}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                      >
                        <Search className="h-4 w-4 mr-2" />
                        Query the Oracle
                      </Button>
                    )}
                  </div>

                  {/* Quest Reward Preview */}
                  <div className="bg-gray-800/30 p-4 rounded-lg">
                    <h4 className="text-white font-semibold mb-3 flex items-center">
                      <Sparkles className="h-5 w-5 mr-2 text-yellow-400" />
                      Quest Reward
                    </h4>
                    <div className="flex items-center space-x-4">
                      <img 
                        src={currentQuest.reward.image} 
                        alt={currentQuest.reward.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h5 className="text-white font-semibold">{currentQuest.reward.name}</h5>
                        <p className="text-gray-400 text-sm">{currentQuest.reward.description}</p>
                        <Badge variant="secondary" className={`text-xs ${
                          currentQuest.reward.rarity === 'common' ? 'bg-gray-500' :
                          currentQuest.reward.rarity === 'rare' ? 'bg-blue-500' :
                          currentQuest.reward.rarity === 'epic' ? 'bg-purple-500' : 'bg-yellow-500'
                        }`}>
                          {currentQuest.reward.rarity}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar - Vision Cards */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-600/30">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  Vision Cards
                </CardTitle>
              </CardHeader>
              <CardContent>
                {gameState.visionCards.length === 0 ? (
                  <p className="text-gray-400 text-sm">No vision cards collected yet.</p>
                ) : (
                  <div className="space-y-3">
                    {gameState.visionCards.map((card) => (
                      <div key={card.id} className="bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={card.image} 
                            alt={card.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="text-white font-semibold text-sm">{card.name}</h4>
                            <Badge variant="secondary" className={`text-xs ${
                              card.rarity === 'common' ? 'bg-gray-500' :
                              card.rarity === 'rare' ? 'bg-blue-500' :
                              card.rarity === 'epic' ? 'bg-purple-500' : 'bg-yellow-500'
                            }`}>
                              {card.rarity}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Fusion Section */}
            {gameState.visionCards.filter(card => card.canFuse).length >= 2 && (
              <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-500/30">
                <CardHeader>
                  <CardTitle className="text-lg text-white flex items-center">
                    <Sparkles className="h-5 w-5 mr-2" />
                    Vision Fusion
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm mb-4">
                    You have vision cards that can be fused to create more powerful prophecies!
                  </p>
                  <Button 
                    onClick={() => {
                      const fusibleCards = gameState.visionCards.filter(card => card.canFuse)
                      if (fusibleCards.length >= 2) {
                        fuseVisionCards(fusibleCards[0], fusibleCards[1])
                      }
                    }}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Fuse Vision Cards
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
