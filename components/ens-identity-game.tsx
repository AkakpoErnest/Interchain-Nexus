'use client'

import { useState, useEffect } from 'react'
import { useAccount, useChainId } from 'wagmi'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  ArrowRight, 
  Pause, 
  Play, 
  RotateCcw, 
  Eye, 
  Zap, 
  Star,
  Users,
  Scroll,
  Crown,
  Shield
} from 'lucide-react'
import { ensGameChapters, ensVisionCards, ensGameIntro, EnsQuest, EnsVisionCard } from '@/lib/ens-game-stories'

interface EnsGameState {
  currentChapter: number
  currentQuest: number
  energy: number
  maxEnergy: number
  score: number
  reputation: number
  visionCards: EnsVisionCard[]
  completedQuests: number[]
  guildMembership?: string
  ensName?: string
  reverseRecord?: boolean
  textRecords: Record<string, string>
  avatarSet?: boolean
}

export function EnsIdentityGame() {
  const { address } = useAccount()
  const chainId = useChainId()
  
  const [gameState, setGameState] = useState<EnsGameState>({
    currentChapter: 1,
    currentQuest: 0,
    energy: 100,
    maxEnergy: 100,
    score: 0,
    reputation: 0,
    visionCards: [],
    completedQuests: [],
    textRecords: {}
  })
  
  const [showNavigation, setShowNavigation] = useState(false)
  const [gamePaused, setGamePaused] = useState(false)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState(0)
  const [questAnswer, setQuestAnswer] = useState('')
  const [questTimer, setQuestTimer] = useState<number | null>(null)
  const [showStory, setShowStory] = useState(true)

  const currentChapter = ensGameChapters[gameState.currentChapter - 1]
  const currentQuest = currentChapter?.quests[gameState.currentQuest]

  // Mock ENS data for demonstration
  const mockEnsData = {
    name: address ? `${address.slice(0, 6)}.eth` : 'unknown.eth',
    reverseRecord: Math.random() > 0.5,
    textRecords: {
      'quest1': 'complete',
      'apprentice': 'true',
      'oracle_riddle': 'Ethereum'
    },
    avatar: Math.random() > 0.3 ? 'set' : undefined,
    guild: Math.random() > 0.7 ? 'seerorder.eth' : undefined
  }

  useEffect(() => {
    // Initialize ENS data
    setGameState(prev => ({
      ...prev,
      ensName: mockEnsData.name,
      reverseRecord: mockEnsData.reverseRecord,
      textRecords: mockEnsData.textRecords,
      avatarSet: !!mockEnsData.avatar,
      guildMembership: mockEnsData.guild
    }))
  }, [address])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (questTimer && questTimer > 0 && !gamePaused) {
      interval = setInterval(() => {
        setQuestTimer(prev => prev ? prev - 1 : null)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [questTimer, gamePaused])

  const startQuest = (quest: EnsQuest) => {
    if (gameState.energy < quest.energyCost) {
      alert('Not enough energy!')
      return
    }

    setGameState(prev => ({
      ...prev,
      energy: prev.energy - quest.energyCost
    }))

    if (quest.timeLimit) {
      setQuestTimer(quest.timeLimit)
    }
  }

  const completeQuest = (quest: EnsQuest, answer?: string) => {
    const isCorrect = checkQuestAnswer(quest, answer)
    
    if (isCorrect) {
      setGameState(prev => ({
        ...prev,
        score: prev.score + (quest.difficulty === 'easy' ? 10 : quest.difficulty === 'medium' ? 25 : quest.difficulty === 'hard' ? 50 : 100),
        reputation: prev.reputation + (quest.difficulty === 'easy' ? 5 : quest.difficulty === 'medium' ? 10 : quest.difficulty === 'hard' ? 20 : 50),
        visionCards: [...prev.visionCards, quest.reward],
        completedQuests: [...prev.completedQuests, quest.id]
      }))
      
      setQuestAnswer('')
      setQuestTimer(null)
      
      // Auto-advance to next quest or chapter
      setTimeout(() => {
        goToNextQuest()
      }, 2000)
    } else {
      setWrongAnswers(prev => prev + 1)
      alert('Incorrect answer! Try again.')
    }
  }

  const checkQuestAnswer = (quest: EnsQuest, answer?: string): boolean => {
    switch (quest.type) {
      case 'name-check':
        return !!gameState.ensName
      case 'reverse-record':
        return gameState.reverseRecord || false
      case 'text-record':
        return Object.keys(gameState.textRecords).length > 0
      case 'avatar':
        return gameState.avatarSet || false
      case 'guild':
        return !!gameState.guildMembership
      case 'oracle-riddle':
        return answer?.toLowerCase() === 'ethereum'
      default:
        return false
    }
  }

  const goToNextQuest = () => {
    if (gameState.currentQuest < currentChapter.quests.length - 1) {
      setGameState(prev => ({ ...prev, currentQuest: prev.currentQuest + 1 }))
    } else if (gameState.currentChapter < ensGameChapters.length) {
      setGameState(prev => ({ 
        ...prev, 
        currentChapter: prev.currentChapter + 1, 
        currentQuest: 0 
      }))
    }
  }

  const goToPreviousQuest = () => {
    if (gameState.currentQuest > 0) {
      setGameState(prev => ({ ...prev, currentQuest: prev.currentQuest - 1 }))
    } else if (gameState.currentChapter > 1) {
      const prevChapter = ensGameChapters[gameState.currentChapter - 2]
      setGameState(prev => ({ 
        ...prev, 
        currentChapter: prev.currentChapter - 1, 
        currentQuest: prevChapter.quests.length - 1 
      }))
    }
  }

  const pauseGame = () => {
    setGamePaused(!gamePaused)
  }

  const restartGame = () => {
    setGameState({
      currentChapter: 1,
      currentQuest: 0,
      energy: 100,
      maxEnergy: 100,
      score: 0,
      reputation: 0,
      visionCards: [],
      completedQuests: [],
      textRecords: {}
    })
    setHintsUsed(0)
    setWrongAnswers(0)
    setQuestAnswer('')
    setQuestTimer(null)
    setGamePaused(false)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'hard': return 'bg-orange-500/20 text-orange-300 border-orange-500/30'
      case 'legendary': return 'bg-purple-500/20 text-purple-300 border-purple-500/30'
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500/20 text-gray-300'
      case 'rare': return 'bg-blue-500/20 text-blue-300'
      case 'epic': return 'bg-purple-500/20 text-purple-300'
      case 'legendary': return 'bg-yellow-500/20 text-yellow-300'
      default: return 'bg-gray-500/20 text-gray-300'
    }
  }

  if (showStory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-4">{ensGameIntro.title}</h1>
            <h2 className="text-2xl text-blue-300 mb-6">{ensGameIntro.subtitle}</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
              {ensGameIntro.description}
            </p>
          </motion.div>

          <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-500/30 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-white text-center">Your Journey Awaits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {ensGameIntro.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button
              onClick={() => setShowStory(false)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 text-lg"
            >
              Begin Your Journey
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4">
      {/* Pause Overlay */}
      {gamePaused && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <Card className="bg-gradient-to-br from-blue-900/90 to-purple-900/90 border-blue-500/30 max-w-md w-full mx-4">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Game Paused</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center text-gray-300">
                <p>Chapter {gameState.currentChapter} - Quest {gameState.currentQuest + 1}</p>
                <p>Score: {gameState.score} | Energy: {gameState.energy}</p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={pauseGame}
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-500"
                >
                  Resume Game
                </Button>
                <Button
                  onClick={restartGame}
                  variant="outline"
                  className="flex-1 border-red-500/50 text-red-300 hover:bg-red-500/20"
                >
                  Restart
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
            <Badge className={getDifficultyColor(currentQuest?.difficulty || 'easy')}>
              Chapter {gameState.currentChapter}
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              Quest {gameState.currentQuest + 1}
            </Badge>
            <Badge className={getDifficultyColor(currentQuest?.difficulty || 'easy')}>
              {currentQuest?.difficulty?.toUpperCase()}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-white">{gameState.score}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-blue-400" />
              <span className="text-white">{gameState.energy}/{gameState.maxEnergy}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Crown className="h-4 w-4 text-purple-400" />
              <span className="text-white">{gameState.reputation}</span>
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
                      disabled={gameState.currentChapter === ensGameChapters.length && gameState.currentQuest === currentChapter.quests.length - 1}
                      className="border-green-500/50 text-green-300 hover:bg-green-500/20"
                    >
                      Next Quest
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                  <div className="text-sm text-gray-400">
                    Progress: {gameState.currentChapter}/{ensGameChapters.length} chapters
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Energy Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-300">Energy</span>
            <span className="text-sm text-gray-300">{gameState.energy}/{gameState.maxEnergy}</span>
          </div>
          <Progress 
            value={(gameState.energy / gameState.maxEnergy) * 100} 
            className="h-2"
          />
        </div>

        {/* Story Section */}
        <motion.div
          key={`${gameState.currentChapter}-${gameState.currentQuest}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-2xl text-white">{currentChapter?.title}</CardTitle>
              <p className="text-blue-300">{currentChapter?.description}</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-lg leading-relaxed">
                {currentChapter?.story}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quest Content */}
        {currentQuest && (
          <motion.div
            key={currentQuest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-600/30">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl text-white">{currentQuest.title}</CardTitle>
                    <p className="text-gray-300 mt-2">{currentQuest.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getDifficultyColor(currentQuest.difficulty)}>
                      {currentQuest.difficulty}
                    </Badge>
                    <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                      -{currentQuest.energyCost} Energy
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* ENS Task */}
                <div className="bg-gray-700/30 p-4 rounded-lg border border-gray-600/30">
                  <h4 className="text-lg font-semibold text-white mb-2 flex items-center">
                    <Scroll className="h-5 w-5 mr-2 text-blue-400" />
                    ENS Task
                  </h4>
                  <p className="text-gray-300">{currentQuest.ensTask}</p>
                </div>

                {/* Quest Input */}
                <div className="space-y-4">
                  {currentQuest.type === 'oracle-riddle' && currentQuest.multipleChoice && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Choose your answer:
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {currentQuest.multipleChoice.map((choice, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            onClick={() => setQuestAnswer(choice)}
                            className={`border-gray-600/30 text-gray-300 hover:bg-blue-500/20 ${
                              questAnswer === choice ? 'bg-blue-500/20 border-blue-500/50' : ''
                            }`}
                          >
                            {choice}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentQuest.type === 'text-record' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Text Record Key:
                      </label>
                      <input
                        type="text"
                        value={questAnswer}
                        onChange={(e) => setQuestAnswer(e.target.value)}
                        placeholder="e.g., quest1"
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400"
                      />
                    </div>
                  )}
                </div>

                {/* Timer */}
                {questTimer && questTimer > 0 && (
                  <Alert className="border-orange-500/30 bg-orange-500/10">
                    <AlertDescription className="text-orange-300">
                      Time remaining: {Math.floor(questTimer / 60)}:{(questTimer % 60).toString().padStart(2, '0')}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => startQuest(currentQuest)}
                    disabled={gameState.energy < currentQuest.energyCost || gameState.completedQuests.includes(currentQuest.id)}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    {gameState.completedQuests.includes(currentQuest.id) ? 'Completed' : 'Start Quest'}
                  </Button>
                  
                  {questAnswer && (
                    <Button
                      onClick={() => completeQuest(currentQuest, questAnswer)}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                    >
                      Submit Answer
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Vision Cards */}
        {gameState.visionCards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-purple-400" />
                  Vision Cards Collected
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {gameState.visionCards.map((card, index) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className={`${getRarityColor(card.rarity)} border-current`}>
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-2">{card.name}</h4>
                          <p className="text-sm opacity-80 mb-2">{card.description}</p>
                          <div className="flex justify-between items-center">
                            <Badge className={getRarityColor(card.rarity)}>
                              {card.rarity}
                            </Badge>
                            <span className="text-sm">Power: {card.power}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Stats */}
        <Card className="bg-gray-800/50 border-gray-600/30">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white">{gameState.completedQuests.length}</div>
                <div className="text-sm text-gray-400">Quests Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{gameState.visionCards.length}</div>
                <div className="text-sm text-gray-400">Vision Cards</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{hintsUsed}</div>
                <div className="text-sm text-gray-400">Hints Used</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{wrongAnswers}</div>
                <div className="text-sm text-gray-400">Wrong Answers</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
