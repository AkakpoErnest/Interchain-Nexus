'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Eye, 
  Database, 
  Users, 
  Globe, 
  Star, 
  Zap, 
  Shield, 
  BookOpen,
  Trophy,
  Target
} from 'lucide-react'
import { PioneerType } from '@/lib/blockchain'

interface GameJourneyProps {
  pioneerType: PioneerType
  isActive: boolean
}

interface JourneyStep {
  id: number
  title: string
  description: string
  reward: string
  completed: boolean
  icon: React.ReactNode
}

export function GameJourney({ pioneerType, isActive }: GameJourneyProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const getJourneyData = (type: PioneerType) => {
    switch (type) {
      case PioneerType.ORACLE_SEER:
        return {
          title: "Oracle Seer's Journey",
          subtitle: "Truth Seeker of the Cosmos",
          description: "Master the art of data verification and become a guardian of truth in the Flare ecosystem.",
          color: "from-orange-500 to-red-600",
          icon: <Eye className="h-8 w-8" />,
          steps: [
            {
              id: 1,
              title: "Initiate Oracle Training",
              description: "Learn the basics of decentralized oracles and data feeds",
              reward: "Oracle Badge + 100 XP",
              completed: true,
              icon: <BookOpen className="h-5 w-5" />
            },
            {
              id: 2,
              title: "Data Verification Mastery",
              description: "Practice verifying data from multiple sources",
              reward: "Verification Badge + 250 XP",
              completed: true,
              icon: <Shield className="h-5 w-5" />
            },
            {
              id: 3,
              title: "Flare Network Integration",
              description: "Connect with Flare's oracle network and participate in data feeds",
              reward: "Network Badge + 500 XP",
              completed: false,
              icon: <Globe className="h-5 w-5" />
            },
            {
              id: 4,
              title: "Prediction Market Expert",
              description: "Create and participate in prediction markets using Flare oracles",
              reward: "Expert Badge + 1000 XP",
              completed: false,
              icon: <Target className="h-5 w-5" />
            },
            {
              id: 5,
              title: "Oracle Seer Mastery",
              description: "Become a recognized oracle provider in the Flare ecosystem",
              reward: "Master Badge + 2000 XP + Special NFT",
              completed: false,
              icon: <Trophy className="h-5 w-5" />
            }
          ]
        }
      case PioneerType.SOCIAL_ARCHITECT:
        return {
          title: "Social Architect's Journey",
          subtitle: "Builder of Worlds",
          description: "Construct the social infrastructure of the Base ecosystem and build communities.",
          color: "from-blue-500 to-purple-600",
          icon: <Users className="h-8 w-8" />,
          steps: [
            {
              id: 1,
              title: "Community Foundation",
              description: "Learn about on-chain social graphs and community building",
              reward: "Builder Badge + 100 XP",
              completed: true,
              icon: <Users className="h-5 w-5" />
            },
            {
              id: 2,
              title: "Base Social Features",
              description: "Explore Base's social features and on-chain interactions",
              reward: "Social Badge + 250 XP",
              completed: true,
              icon: <Globe className="h-5 w-5" />
            },
            {
              id: 3,
              title: "DApp Integration",
              description: "Build and integrate social features into decentralized applications",
              reward: "Developer Badge + 500 XP",
              completed: false,
              icon: <Zap className="h-5 w-5" />
            },
            {
              id: 4,
              title: "Social Protocol Master",
              description: "Create innovative social protocols on Base",
              reward: "Protocol Badge + 1000 XP",
              completed: false,
              icon: <Star className="h-5 w-5" />
            },
            {
              id: 5,
              title: "World Builder",
              description: "Establish a thriving social ecosystem on Base",
              reward: "Architect Badge + 2000 XP + Special NFT",
              completed: false,
              icon: <Trophy className="h-5 w-5" />
            }
          ]
        }
      case PioneerType.DATA_WEAVER:
        return {
          title: "Data Weaver's Journey",
          subtitle: "Archivist of the Nexus",
          description: "Master the art of decentralized storage and become a guardian of the world's data.",
          color: "from-green-500 to-teal-600",
          icon: <Database className="h-8 w-8" />,
          steps: [
            {
              id: 1,
              title: "Storage Fundamentals",
              description: "Learn about IPFS and decentralized storage principles",
              reward: "Storage Badge + 100 XP",
              completed: true,
              icon: <Database className="h-5 w-5" />
            },
            {
              id: 2,
              title: "Filecoin Network",
              description: "Explore Filecoin's storage network and mining mechanisms",
              reward: "Network Badge + 250 XP",
              completed: true,
              icon: <Globe className="h-5 w-5" />
            },
            {
              id: 3,
              title: "Data Archiving",
              description: "Practice archiving and retrieving data from decentralized storage",
              reward: "Archivist Badge + 500 XP",
              completed: false,
              icon: <Shield className="h-5 w-5" />
            },
            {
              id: 4,
              title: "Storage Provider",
              description: "Become a storage provider on the Filecoin network",
              reward: "Provider Badge + 1000 XP",
              completed: false,
              icon: <Zap className="h-5 w-5" />
            },
            {
              id: 5,
              title: "Data Weaver Master",
              description: "Master the art of decentralized data management",
              reward: "Weaver Badge + 2000 XP + Special NFT",
              completed: false,
              icon: <Trophy className="h-5 w-5" />
            }
          ]
        }
      case PioneerType.IDENTITY_GUARDIAN:
        return {
          title: "Identity Guardian's Journey",
          subtitle: "Keeper of Names",
          description: "Protect and manage digital identities in the decentralized world.",
          color: "from-purple-500 to-pink-600",
          icon: <Shield className="h-8 w-8" />,
          steps: [
            {
              id: 1,
              title: "Identity Basics",
              description: "Learn about decentralized identity and naming systems",
              reward: "Identity Badge + 100 XP",
              completed: true,
              icon: <Shield className="h-5 w-5" />
            },
            {
              id: 2,
              title: "ENS Mastery",
              description: "Master Ethereum Name Service and domain management",
              reward: "ENS Badge + 250 XP",
              completed: true,
              icon: <Globe className="h-5 w-5" />
            },
            {
              id: 3,
              title: "Identity Verification",
              description: "Learn about identity verification and attestation",
              reward: "Verification Badge + 500 XP",
              completed: false,
              icon: <Eye className="h-5 w-5" />
            },
            {
              id: 4,
              title: "Identity Protocol Builder",
              description: "Build identity protocols and verification systems",
              reward: "Builder Badge + 1000 XP",
              completed: false,
              icon: <Zap className="h-5 w-5" />
            },
            {
              id: 5,
              title: "Identity Guardian Master",
              description: "Become a recognized identity guardian in the ecosystem",
              reward: "Guardian Badge + 2000 XP + Special NFT",
              completed: false,
              icon: <Trophy className="h-5 w-5" />
            }
          ]
        }
    }
  }

  const journeyData = getJourneyData(pioneerType)
  const progress = (journeyData.steps.filter(step => step.completed).length / journeyData.steps.length) * 100

  if (!isActive) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-gray-400">
            Select a Pioneer to begin your journey
          </CardTitle>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${journeyData.color} mb-4`}>
          {journeyData.icon}
        </div>
        <CardTitle className="text-2xl font-bold">{journeyData.title}</CardTitle>
        <p className="text-lg text-gray-300">{journeyData.subtitle}</p>
        <p className="text-gray-400 mt-2">{journeyData.description}</p>
      </CardHeader>
      
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Journey Progress</span>
            <span className="text-sm text-gray-400">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="space-y-4">
          {journeyData.steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${
                step.completed 
                  ? 'bg-green-500/10 border-green-500/30' 
                  : currentStep === index 
                    ? 'bg-blue-500/10 border-blue-500/30' 
                    : 'bg-gray-800/50 border-gray-600/30'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  step.completed 
                    ? 'bg-green-500 text-white' 
                    : currentStep === index 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-600 text-gray-300'
                }`}>
                  {step.completed ? '✓' : step.id}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold">{step.title}</h3>
                    {step.completed && <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Completed</Badge>}
                    {currentStep === index && !step.completed && <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Current</Badge>}
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{step.description}</p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    {step.icon}
                    <span>{step.reward}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button 
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
            onClick={() => setCurrentStep((prev) => (prev + 1) % journeyData.steps.length)}
          >
            Continue Journey
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
