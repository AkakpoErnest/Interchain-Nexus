"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Eye, 
  Zap, 
  Shield, 
  Brain, 
  Search, 
  Star, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react'
import { GameStory, GameScene, GameChoice, getStoryByPioneerType } from '@/lib/game-stories'

interface GameEngineProps {
  pioneerType: string
  onGameComplete?: (results: GameResults) => void
  onGameOver?: () => void
}

interface GameResults {
  storyId: string
  completed: boolean
  score: number
  choices: string[]
  finalScene: string
  rewards: {
    experience: number
    items: string[]
    currency: number
  }
}

interface GameState {
  currentSceneId: string
  score: number
  experience: number
  items: string[]
  currency: number
  choices: string[]
  isAlive: boolean
  oracleInsight: number
  power: number
  wisdom: number
}

export function GameEngine({ pioneerType, onGameComplete, onGameOver }: GameEngineProps) {
  const [story, setStory] = useState<GameStory | null>(null)
  const [currentScene, setCurrentScene] = useState<GameScene | null>(null)
  const [gameState, setGameState] = useState<GameState>({
    currentSceneId: '',
    score: 0,
    experience: 0,
    items: [],
    currency: 0,
    choices: [],
    isAlive: true,
    oracleInsight: 5, // Starting Oracle Insight
    power: 3,
    wisdom: 3
  })
  const [showPrediction, setShowPrediction] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize game
  useEffect(() => {
    const gameStory = getStoryByPioneerType(pioneerType)
    if (gameStory) {
      setStory(gameStory)
      setCurrentScene(gameStory.scenes[gameStory.startingSceneId])
      setGameState(prev => ({
        ...prev,
        currentSceneId: gameStory.startingSceneId
      }))
    }
    setIsLoading(false)
  }, [pioneerType])

  // Handle choice selection
  const handleChoice = (choice: GameChoice) => {
    if (!story || !currentScene) return

    // Show prediction for Oracle Seer
    if (choice.prediction && pioneerType === 'ORACLE_SEER') {
      setShowPrediction(choice.prediction)
      setTimeout(() => {
        setShowPrediction(null)
        processChoice(choice)
      }, 3000)
    } else {
      processChoice(choice)
    }
  }

  const processChoice = (choice: GameChoice) => {
    if (!story || !currentScene) return

    // Update game state based on choice outcome
    const newState = { ...gameState }
    newState.choices.push(choice.id)

    // Apply consequences
    choice.consequences.forEach(consequence => {
      if (consequence.includes('+')) {
        const [stat, value] = consequence.split('+')
        const numValue = parseInt(value)
        if (stat.includes('Oracle Insight')) newState.oracleInsight += numValue
        if (stat.includes('Power')) newState.power += numValue
        if (stat.includes('Wisdom')) newState.wisdom += numValue
        if (stat.includes('experience')) newState.experience += numValue
      } else if (consequence.includes('-')) {
        const [stat, value] = consequence.split('-')
        const numValue = parseInt(value)
        if (stat.includes('Oracle Insight')) newState.oracleInsight -= numValue
        if (stat.includes('Power')) newState.power -= numValue
        if (stat.includes('Wisdom')) newState.wisdom -= numValue
      } else if (consequence.includes('damage')) {
        newState.power -= 2
        if (newState.power <= 0) {
          newState.isAlive = false
          onGameOver?.()
          return
        }
      } else if (consequence.includes('item')) {
        newState.items.push(consequence)
      }
    })

    // Update score based on outcome
    if (choice.outcome === 'success') {
      newState.score += 10
    } else if (choice.outcome === 'failure') {
      newState.score -= 5
    }

    // Move to next scene
    if (choice.nextSceneId) {
      const nextScene = story.scenes[choice.nextSceneId]
      if (nextScene) {
        setCurrentScene(nextScene)
        newState.currentSceneId = choice.nextSceneId
      }
    }

    setGameState(newState)

    // Check if game is complete
    if (choice.nextSceneId === 'oracle-destiny' || 
        choice.nextSceneId === 'cosmic-transcendence' || 
        choice.nextSceneId === 'mortal-return') {
      onGameComplete?.({
        storyId: story.id,
        completed: true,
        score: newState.score,
        choices: newState.choices,
        finalScene: choice.nextSceneId,
        rewards: {
          experience: newState.experience,
          items: newState.items,
          currency: newState.currency
        }
      })
    }
  }

  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
            <span>Loading your adventure...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!story || !currentScene) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>
              Story not found for this Pioneer type. Please try again.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (!gameState.isAlive) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>
              You have fallen in battle! You need to mint a Nexus Core NFT to revive and continue your adventure.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Game Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-purple-500" />
                <span>{story.title}</span>
              </CardTitle>
              <CardDescription>{story.description}</CardDescription>
            </div>
            <Badge variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              {story.difficulty.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Game Stats */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Eye className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium">Oracle Insight</span>
              </div>
              <div className="text-2xl font-bold text-purple-400">{gameState.oracleInsight}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Zap className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Power</span>
              </div>
              <div className="text-2xl font-bold text-blue-400">{gameState.power}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Brain className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Wisdom</span>
              </div>
              <div className="text-2xl font-bold text-green-400">{gameState.wisdom}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">Score</span>
              </div>
              <div className="text-2xl font-bold text-yellow-400">{gameState.score}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prediction Display */}
      <AnimatePresence>
        {showPrediction && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Alert className="bg-purple-500/20 border-purple-500/30">
              <Eye className="h-4 w-4 text-purple-400" />
              <AlertDescription className="text-purple-300">
                <strong>Oracle Prediction:</strong> {showPrediction}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Current Scene */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {currentScene.isCombat && <Shield className="h-5 w-5 text-red-500" />}
            {currentScene.isQuiz && <Brain className="h-5 w-5 text-blue-500" />}
            {currentScene.isDiscovery && <Search className="h-5 w-5 text-green-500" />}
            <span>{currentScene.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Scene Image */}
          <div className="relative">
            <img 
              src={currentScene.image} 
              alt={currentScene.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute top-4 right-4">
              {currentScene.isCombat && (
                <Badge variant="destructive" className="bg-red-500/20 text-red-300 border-red-500/30">
                  <Shield className="h-3 w-3 mr-1" />
                  Combat
                </Badge>
              )}
              {currentScene.isQuiz && (
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  <Brain className="h-3 w-3 mr-1" />
                  Quiz
                </Badge>
              )}
              {currentScene.isDiscovery && (
                <Badge variant="outline" className="bg-green-500/20 text-green-300 border-green-500/30">
                  <Search className="h-3 w-3 mr-1" />
                  Discovery
                </Badge>
              )}
            </div>
          </div>

          {/* Scene Description */}
          <p className="text-gray-300 leading-relaxed">{currentScene.description}</p>

          {/* Choices */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Choose your action:</h3>
            {currentScene.choices.map((choice, index) => (
              <motion.div
                key={choice.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant="outline"
                  className="w-full justify-start h-auto p-4 text-left"
                  onClick={() => handleChoice(choice)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {choice.outcome === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
                      {choice.outcome === 'failure' && <XCircle className="h-5 w-5 text-red-500" />}
                      {choice.outcome === 'neutral' && <Clock className="h-5 w-5 text-yellow-500" />}
                    </div>
                    <div>
                      <div className="font-medium">{choice.text}</div>
                      {choice.prediction && (
                        <div className="text-sm text-purple-300 mt-1">
                          <Eye className="h-3 w-3 inline mr-1" />
                          Oracle Vision Available
                        </div>
                      )}
                    </div>
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

