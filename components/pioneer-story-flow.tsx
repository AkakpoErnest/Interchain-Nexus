'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  BookOpen, 
  Play, 
  Users, 
  Zap, 
  Shield, 
  Star,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

interface PioneerStoryFlowProps {
  pioneerData: {
    id: number
    name: string
    title: string
    realm: string
    rarity: string
    stats: Record<string, number>
    image: string
    description: string
    lore: string
    story: string
    abilities: string[]
    mission: string
    passiveBuff: string
  }
  onStoryComplete: () => void
  onStartGame: () => void
}

export function PioneerStoryFlow({ pioneerData, onStoryComplete, onStartGame }: PioneerStoryFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [displayedText, setDisplayedText] = useState('')
  const [showGameOptions, setShowGameOptions] = useState(false)

  const storySteps = [
    {
      title: "Welcome, Pioneer",
      content: `You have successfully minted ${pioneerData.name}, the ${pioneerData.title}!`,
      type: "welcome"
    },
    {
      title: "Your Origin Story",
      content: pioneerData.story,
      type: "story"
    },
    {
      title: "Your Mission",
      content: pioneerData.mission,
      type: "mission"
    },
    {
      title: "Your Powers",
      content: `As ${pioneerData.name}, you possess unique abilities that will aid you in your quest through the Interchain Nexus.`,
      type: "abilities"
    }
  ]

  const gameTypes = [
    {
      id: "discovery",
      name: "Discovery Quest",
      description: "Explore the fractured realms and uncover hidden secrets",
      icon: BookOpen,
      difficulty: "Beginner",
      rewards: "Story progression, XP, items"
    },
    {
      id: "battle",
      name: "Realm Battle",
      description: "Face challenges and enemies in strategic combat",
      icon: Zap,
      difficulty: "Intermediate",
      rewards: "Power upgrades, rare items"
    },
    {
      id: "puzzle",
      name: "Mind Puzzles",
      description: "Solve complex puzzles using your Pioneer's unique abilities",
      icon: Star,
      difficulty: "Advanced",
      rewards: "Ability unlocks, special powers"
    },
    {
      id: "social",
      name: "Community Building",
      description: "Connect with other Pioneers and build alliances",
      icon: Users,
      difficulty: "All Levels",
      rewards: "Network effects, shared resources"
    }
  ]

  // Typewriter effect
  useEffect(() => {
    if (currentStep < storySteps.length) {
      const currentStepData = storySteps[currentStep]
      setIsTyping(true)
      setDisplayedText('')
      
      let index = 0
      const timer = setInterval(() => {
        if (index < currentStepData.content.length) {
          setDisplayedText(currentStepData.content.slice(0, index + 1))
          index++
        } else {
          setIsTyping(false)
          clearInterval(timer)
        }
      }, 30)

      return () => clearInterval(timer)
    }
  }, [currentStep])

  const handleNext = () => {
    if (currentStep < storySteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowGameOptions(true)
    }
  }

  const handleStartGameType = (gameType: string) => {
    // Store selected game type and start the game
    localStorage.setItem('selectedGameType', gameType)
    onStartGame()
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Legendary":
        return "text-yellow-400 border-yellow-400/50"
      case "Epic":
        return "text-purple-400 border-purple-400/50"
      case "Rare":
        return "text-blue-400 border-blue-400/50"
      default:
        return "text-gray-400 border-gray-400/50"
    }
  }

  if (showGameOptions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl w-full"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Choose Your Adventure
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Now that you understand your role as {pioneerData.name}, choose how you want to begin your journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gameTypes.map((gameType, index) => (
              <motion.div
                key={gameType.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glow-hover bg-card/50 backdrop-blur-sm border-cyan-400/30 transition-all duration-300 hover:scale-105 cursor-pointer h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <gameType.icon className="h-5 w-5 text-cyan-400" />
                      <span>{gameType.name}</span>
                    </CardTitle>
                    <CardDescription>{gameType.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={getRarityColor(pioneerData.rarity)}>
                        {gameType.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      <p className="font-semibold mb-1">Rewards:</p>
                      <p>{gameType.rewards}</p>
                    </div>

                    <Button 
                      onClick={() => handleStartGameType(gameType.id)}
                      className="w-full"
                      variant="outline"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start {gameType.name}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full"
      >
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Story Progress</span>
            <span className="text-sm text-gray-400">{currentStep + 1} / {storySteps.length}</span>
          </div>
          <Progress 
            value={((currentStep + 1) / storySteps.length) * 100} 
            className="h-2"
          />
        </div>

        {/* Pioneer Card */}
        <Card className="glow-hover bg-card/50 backdrop-blur-sm border-cyan-400/30 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <img 
                src={pioneerData.image} 
                alt={pioneerData.name}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{pioneerData.name}</h2>
                <p className="text-lg text-cyan-400 mb-2">{pioneerData.title}</p>
                <div className="flex space-x-2 mb-3">
                  <Badge variant="outline" className={getRarityColor(pioneerData.rarity)}>
                    {pioneerData.rarity}
                  </Badge>
                  <Badge variant="secondary">{pioneerData.realm}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{pioneerData.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Story Content */}
        <Card className="glow-hover bg-card/50 backdrop-blur-sm border-purple-400/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-purple-400" />
              <span>{storySteps[currentStep].title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="min-h-[200px]">
              <p className="text-lg leading-relaxed">
                {displayedText}
                {isTyping && <span className="animate-pulse">|</span>}
              </p>
            </div>

            {/* Show abilities for abilities step */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Your Abilities:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {pioneerData.abilities.map((ability, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 bg-purple-900/30 rounded-lg">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span>{ability}</span>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-cyan-900/30 rounded-lg">
                  <p className="text-sm">
                    <span className="font-semibold text-cyan-400">Passive Buff:</span> {pioneerData.passiveBuff}
                  </p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center pt-4">
              <div className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {storySteps.length}
              </div>
              <Button 
                onClick={handleNext}
                disabled={isTyping}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
              >
                {currentStep < storySteps.length - 1 ? (
                  <>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Begin Your Journey
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

