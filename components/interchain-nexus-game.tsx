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
  Crown
} from 'lucide-react'

interface GameState {
  currentChapter: number
  currentPuzzle: number
  score: number
  completedChapters: number[]
  inventory: string[]
  energy: number
  maxEnergy: number
}

interface Puzzle {
  id: number
  type: 'question' | 'sequence' | 'pattern' | 'memory'
  question: string
  options?: string[]
  correctAnswer: string | number
  image?: string
  hint?: string
  reward: string
  energyCost: number
}

interface Chapter {
  id: number
  title: string
  description: string
  image: string
  story: string
  puzzles: Puzzle[]
  reward: string
}

const gameChapters: Chapter[] = [
  {
    id: 1,
    title: "The Oracle's Awakening",
    description: "Your journey begins in the cosmic realm of Flare",
    image: "/mystical-oracle-eye-with-data-streams.png",
    story: "As the Oracle Seer, you awaken in the ethereal realm of Flare. The cosmic energy flows through your being, granting you the power to see beyond the veil of reality. Ancient symbols float around you, each containing fragments of interchain knowledge.",
    puzzles: [
      {
        id: 1,
        type: 'question',
        question: "What is the primary purpose of the Oracle Seer in the Interchain Nexus?",
        options: ["To predict market prices", "To seek truth across blockchains", "To mine cryptocurrency", "To trade NFTs"],
        correctAnswer: "To seek truth across blockchains",
        image: "/mystical-oracle-eye-with-data-streams.png",
        hint: "Think about the Oracle's role in maintaining truth and accuracy across different blockchain networks.",
        reward: "Cosmic Vision +1",
        energyCost: 10
      },
      {
        id: 2,
        type: 'sequence',
        question: "Arrange the blockchain networks in order of their discovery:",
        options: ["Ethereum", "Flare", "Lisk", "Filecoin"],
        correctAnswer: 0, // Ethereum first
        image: "/futuristic-citadel-with-governance-symbols.png",
        hint: "Consider the chronological order of blockchain development.",
        reward: "Historical Knowledge +1",
        energyCost: 15
      }
    ],
    reward: "Oracle's Insight"
  },
  {
    id: 2,
    title: "The Data Weaver's Loom",
    description: "Navigate the intricate web of Filecoin's data storage",
    image: "/towering-data-storage-facility-with-glowing-cores.png",
    story: "You enter the vast data storage facilities of Filecoin. Massive towers of crystalline storage units pulse with energy, each containing fragments of the interchain's collective knowledge. The Data Weaver's patterns dance in the air, showing how information flows between networks.",
    puzzles: [
      {
        id: 3,
        type: 'pattern',
        question: "Identify the correct data storage pattern for optimal efficiency:",
        options: ["Centralized", "Decentralized", "Hybrid", "Random"],
        correctAnswer: "Decentralized",
        image: "/towering-data-storage-facility-with-glowing-cores.png",
        hint: "Filecoin's architecture is built on the principle of distributed storage.",
        reward: "Data Mastery +1",
        energyCost: 20
      },
      {
        id: 4,
        type: 'memory',
        question: "What is the minimum storage duration for data on Filecoin?",
        options: ["1 day", "1 week", "1 month", "1 year"],
        correctAnswer: "1 year",
        image: "/futuristic-data-archivist-with-holographic-display.png",
        hint: "Filecoin requires long-term storage commitments for network stability.",
        reward: "Storage Wisdom +1",
        energyCost: 12
      }
    ],
    reward: "Data Weaver's Thread"
  },
  {
    id: 3,
    title: "The Social Architect's Blueprint",
    description: "Design the social infrastructure of Lisk",
    image: "/futuristic-citadel-with-governance-symbols.png",
    story: "You arrive at the architectural marvels of Lisk, where the Social Architect has designed the perfect community protocols. The citadel's governance symbols glow with democratic energy, showing how communities can self-organize and thrive in the interchain ecosystem.",
    puzzles: [
      {
        id: 5,
        type: 'question',
        question: "What is the key principle behind Lisk's social architecture?",
        options: ["Centralized control", "Community governance", "Corporate hierarchy", "Random selection"],
        correctAnswer: "Community governance",
        image: "/futuristic-citadel-with-governance-symbols.png",
        hint: "Lisk emphasizes community-driven development and governance.",
        reward: "Social Harmony +1",
        energyCost: 18
      },
      {
        id: 6,
        type: 'sequence',
        question: "Order the steps for building a successful blockchain community:",
        options: ["Create governance", "Build infrastructure", "Gather community", "Launch protocol"],
        correctAnswer: 2, // Gather community first
        image: "/diplomatic-blockchain-negotiator-with-energy-patte.png",
        hint: "Community comes before infrastructure in successful blockchain projects.",
        reward: "Community Builder +1",
        energyCost: 25
      }
    ],
    reward: "Architect's Blueprint"
  },
  {
    id: 4,
    title: "The Identity Guardian's Vault",
    description: "Protect the sacred registry of ENS names",
    image: "/glowing-scroll-with-encrypted-symbols.png",
    story: "You enter the sacred vault where the Identity Guardian protects the ENS registry. Glowing scrolls float in the air, each containing encrypted identity data. The guardian's symbols pulse with protective energy, ensuring that every name in the interchain remains authentic and secure.",
    puzzles: [
      {
        id: 7,
        type: 'question',
        question: "What makes an ENS name truly secure?",
        options: ["Length", "Complexity", "Verification", "Popularity"],
        correctAnswer: "Verification",
        image: "/glowing-scroll-with-encrypted-symbols.png",
        hint: "ENS security comes from cryptographic verification, not complexity.",
        reward: "Identity Protection +1",
        energyCost: 22
      },
      {
        id: 8,
        type: 'pattern',
        question: "Which pattern represents the strongest identity verification?",
        options: ["Single signature", "Multi-signature", "Biometric", "Password"],
        correctAnswer: "Multi-signature",
        image: "/ens_identity_guardian_card_refined.png",
        hint: "Multiple signatures provide better security than single verification methods.",
        reward: "Guardian's Shield +1",
        energyCost: 30
      }
    ],
    reward: "Guardian's Seal"
  },
  {
    id: 5,
    title: "The Final Convergence",
    description: "Unite all blockchains in the Interchain Nexus",
    image: "/holographic-app-interface-deployment.png",
    story: "You reach the final chamber where all blockchain networks converge. The holographic interface shows the complete interchain ecosystem, with data flowing seamlessly between networks. This is where you must prove your mastery and unite all the fragments of knowledge you've gathered.",
    puzzles: [
      {
        id: 9,
        type: 'question',
        question: "What is the ultimate goal of the Interchain Nexus?",
        options: ["Profit maximization", "Network unification", "Technology dominance", "User control"],
        correctAnswer: "Network unification",
        image: "/holographic-app-interface-deployment.png",
        hint: "The Interchain Nexus aims to connect and unify different blockchain networks.",
        reward: "Unity Mastery +1",
        energyCost: 35
      },
      {
        id: 10,
        type: 'sequence',
        question: "Arrange the networks in order of their importance to the Interchain Nexus:",
        options: ["Flare", "Ethereum", "Filecoin", "Lisk"],
        correctAnswer: 1, // Ethereum as the foundation
        image: "/cyberpunk-archer-with-glowing-bow.png",
        hint: "Ethereum serves as the foundational layer for many interchain protocols.",
        reward: "Nexus Mastery +1",
        energyCost: 40
      }
    ],
    reward: "Interchain Nexus Master"
  }
]

export function InterchainNexusGame() {
  const [gameState, setGameState] = useState<GameState>({
    currentChapter: 1,
    currentPuzzle: 0,
    score: 0,
    completedChapters: [],
    inventory: [],
    energy: 100,
    maxEnergy: 100
  })

  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [showStory, setShowStory] = useState(true)

  const currentChapter = gameChapters[gameState.currentChapter - 1]
  const currentPuzzle = currentChapter?.puzzles[gameState.currentPuzzle]

  const handleAnswer = (answer: string | number) => {
    setSelectedAnswer(answer)
    
    if (answer === currentPuzzle?.correctAnswer) {
      // Correct answer
      setGameState(prev => ({
        ...prev,
        score: prev.score + 100,
        energy: Math.max(0, prev.energy - (currentPuzzle?.energyCost || 0)),
        inventory: [...prev.inventory, currentPuzzle?.reward || '']
      }))
      
      // Move to next puzzle or chapter
      setTimeout(() => {
        if (gameState.currentPuzzle < currentChapter.puzzles.length - 1) {
          setGameState(prev => ({ ...prev, currentPuzzle: prev.currentPuzzle + 1 }))
        } else {
          // Chapter complete
          setGameState(prev => ({
            ...prev,
            completedChapters: [...prev.completedChapters, prev.currentChapter],
            currentChapter: prev.currentChapter + 1,
            currentPuzzle: 0,
            inventory: [...prev.inventory, currentChapter.reward]
          }))
          
          if (gameState.currentChapter >= gameChapters.length) {
            setGameComplete(true)
          }
        }
        setSelectedAnswer(null)
        setShowHint(false)
      }, 2000)
    } else {
      // Wrong answer - lose energy
      setGameState(prev => ({
        ...prev,
        energy: Math.max(0, prev.energy - 10)
      }))
    }
  }

  const useHint = () => {
    if (gameState.energy >= 5) {
      setShowHint(true)
      setGameState(prev => ({ ...prev, energy: prev.energy - 5 }))
    }
  }

  const restartGame = () => {
    setGameState({
      currentChapter: 1,
      currentPuzzle: 0,
      score: 0,
      completedChapters: [],
      inventory: [],
      energy: 100,
      maxEnergy: 100
    })
    setSelectedAnswer(null)
    setShowHint(false)
    setGameComplete(false)
    setShowStory(true)
  }

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl w-full"
        >
          <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500/30">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Crown className="h-16 w-16 text-yellow-400" />
              </div>
              <CardTitle className="text-3xl text-white mb-2">
                🎉 Interchain Nexus Master! 🎉
              </CardTitle>
              <p className="text-gray-300">
                You have successfully united all blockchain networks and mastered the Interchain Nexus!
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">
                  Final Score: {gameState.score}
                </div>
                <div className="text-lg text-gray-300">
                  Chapters Completed: {gameState.completedChapters.length}/{gameChapters.length}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">🏆 Achievements Unlocked:</h3>
                <div className="grid grid-cols-2 gap-2">
                  {gameState.inventory.map((item, index) => (
                    <Badge key={index} variant="secondary" className="bg-purple-600/30 text-purple-200">
                      {item}
                    </Badge>
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
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Zap className="h-4 w-4" />
                  <span>Energy: {gameState.energy}/{gameState.maxEnergy}</span>
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
                  Puzzles in this chapter: {currentChapter.puzzles.length}
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

  if (!currentPuzzle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading puzzle...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Game Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-purple-600/30 text-purple-200">
              Chapter {gameState.currentChapter}
            </Badge>
            <Badge variant="outline" className="border-yellow-500/50 text-yellow-300">
              Puzzle {gameState.currentPuzzle + 1}
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
          </div>
        </div>

        {/* Energy Bar */}
        <div className="mb-6">
          <Progress 
            value={(gameState.energy / gameState.maxEnergy) * 100} 
            className="h-2"
          />
        </div>

        {/* Puzzle Card */}
        <motion.div
          key={`${gameState.currentChapter}-${gameState.currentPuzzle}`}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
        >
          <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500/30 mb-6">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-purple-400" />
                  <span className="text-sm text-gray-400">
                    {currentPuzzle.type.toUpperCase()} PUZZLE
                  </span>
                </div>
                <Badge variant="outline" className="border-blue-500/50 text-blue-300">
                  Energy Cost: {currentPuzzle.energyCost}
                </Badge>
              </div>
              <CardTitle className="text-xl text-white">
                {currentPuzzle.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentPuzzle.image && (
                <div className="relative">
                  <img 
                    src={currentPuzzle.image} 
                    alt="Puzzle visual"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
                </div>
              )}

              {showHint && currentPuzzle.hint && (
                <Alert className="bg-blue-900/30 border-blue-500/30">
                  <Lightbulb className="h-4 w-4" />
                  <AlertDescription className="text-blue-200">
                    {currentPuzzle.hint}
                  </AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentPuzzle.options?.map((option, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      className={`w-full h-16 text-left justify-start border-2 transition-all ${
                        selectedAnswer === option
                          ? option === currentPuzzle.correctAnswer
                            ? 'border-green-500 bg-green-500/20 text-green-300'
                            : 'border-red-500 bg-red-500/20 text-red-300'
                          : 'border-purple-500/50 hover:border-purple-400 hover:bg-purple-500/20'
                      }`}
                      onClick={() => handleAnswer(option)}
                      disabled={selectedAnswer !== null}
                    >
                      <div className="flex items-center space-x-3">
                        {selectedAnswer === option && (
                          option === currentPuzzle.correctAnswer ? (
                            <CheckCircle className="h-5 w-5 text-green-400" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-400" />
                          )
                        )}
                        <span>{option}</span>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={useHint}
                  disabled={gameState.energy < 5 || showHint}
                  className="border-yellow-500/50 text-yellow-300 hover:bg-yellow-500/20"
                >
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Use Hint (-5 Energy)
                </Button>
                
                <div className="text-sm text-gray-400">
                  Reward: {currentPuzzle.reward}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Inventory */}
        {gameState.inventory.length > 0 && (
          <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-600/30">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Inventory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {gameState.inventory.map((item, index) => (
                  <Badge key={index} variant="secondary" className="bg-purple-600/30 text-purple-200">
                    {item}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
