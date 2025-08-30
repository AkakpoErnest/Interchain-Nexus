"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface EpicOpeningAnimationProps {
  onComplete: () => void
}

const epicStoryScenes = [
  {
    id: 1,
    chapter: "Prologue",
    title: "The Age of Isolation",
    text: "Long ago, the digital cosmos was fractured into countless islands of logic. Each realm believed itself to be the only world that mattered.",
    background: "/4c9e11fd-263b-4c44-88f4-6740fe33c89e.jpeg",
    duration: 5000
  },
  {
    id: 2,
    chapter: "Prologue",
    title: "The Five Realms",
    text: "The Vaults of Memory guarded eternal archives of knowledge. The Oracle Spire whispered truths through endless streams of chance. The Forge Halls gave birth to flickering constructs of creativity. The Hall of Names bestowed identity upon wandering souls. The Council Chambers bound entire societies through law and consensus.",
    background: "/towering-data-storage-facility-with-glowing-cores.png",
    duration: 6000
  },
  {
    id: 3,
    chapter: "Prologue",
    title: "The Awakening",
    text: "For centuries, these realms thrived alone, their inhabitants blind to the existence of one another. Yet across the void, strange echoes began to stir — anomalies in the archives, whispers of foreign data, nameless figures crossing the boundaries of identity.",
    background: "/futuristic-data-archivist-with-holographic-display.png",
    duration: 5000
  },
  {
    id: 4,
    chapter: "Chapter One",
    title: "The Awakening",
    text: "From the Vaults came fragments of knowledge that did not belong. In the Oracle Spire, visions grew restless, hinting at truths that came from beyond. In the Forge Halls, mini-worlds glitched with foreign sparks of creation.",
    background: "/mystical-oracle-eye-with-data-streams.png",
    duration: 5000
  },
  {
    id: 5,
    chapter: "Chapter One",
    title: "The Vision Emerges",
    text: "In the Hall of Names, inscriptions appeared that no scribe had ever carved. In the Council Chambers, philosophers argued about unity, though no one could recall why. It was then that the vision of the Nexus emerged: a single thread to bind all realms.",
    background: "/futuristic-citadel-with-governance-symbols.png",
    duration: 5000
  },
  {
    id: 6,
    chapter: "Chapter Two",
    title: "The Trials of the Realms",
    text: "But the path to the Nexus was not freely given. It would be forged through pioneers — travelers bold enough to step between worlds, solve the riddles of each realm, and carry fragments of power back with them. You are one such pioneer.",
    background: "/crystalline-shard-with-cosmic-energy.png",
    duration: 5000
  },
  {
    id: 7,
    chapter: "Chapter Two",
    title: "The Five Trials",
    text: "Your journey begins with a single card — your Pioneer's Sigil. With it, you step into the first of five trials: The Vaults of Memory, The Oracle Spire, The Forge Halls, The Hall of Names, and The Council Chambers.",
    background: "/glowing-scroll-with-encrypted-symbols.png",
    duration: 5000
  },
  {
    id: 8,
    chapter: "Chapter Three",
    title: "The Nexus Forged",
    text: "With each realm conquered, your collection of cards grows. When the five cards unite in your hand, a great pattern awakens. The Interchain Nexus blazes into being — a bridge across realms, a web of unity that cannot be undone.",
    background: "/holographic-app-interface-deployment.png",
    duration: 5000
  },
  {
    id: 9,
    chapter: "Chapter Three",
    title: "Your Destiny Awaits",
    text: "Yet beware: not all travelers seek unity. Some, known as the Fragmenters, cling to the old ways of isolation. The fate of the Nexus rests with you. Will you rise as a unifier, binding the digital cosmos together?",
    background: "/cyberpunk-archer-with-glowing-bow.png",
    duration: 5000
  }
]

export function EpicOpeningAnimation({ onComplete }: EpicOpeningAnimationProps) {
  const [currentScene, setCurrentScene] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [showSkip, setShowSkip] = useState(false)

  useEffect(() => {
    setShowSkip(true)
    
    const timer = setTimeout(() => {
      if (currentScene < epicStoryScenes.length - 1) {
        setCurrentScene(currentScene + 1)
      } else {
        setIsVisible(false)
        setTimeout(() => {
          onComplete()
        }, 1000)
      }
    }, epicStoryScenes[currentScene].duration)

    return () => clearTimeout(timer)
  }, [currentScene, onComplete])

  const handleSkip = () => {
    setIsVisible(false)
    setTimeout(() => {
      onComplete()
    }, 500)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          className="relative w-full h-full flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Background Image */}
          <motion.div 
            key={`bg-${currentScene}`}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${epicStoryScenes[currentScene].background}')`
            }}
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-black/60"></div>
            {/* Cinematic overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70"></div>
          </motion.div>

          {/* Floating particles */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse delay-2000"></div>
            <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-pulse delay-3000"></div>
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-400 rounded-full animate-pulse delay-4000"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            {/* Chapter */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-4"
            >
              <span className="text-lg font-semibold text-cyan-400 tracking-wider">
                {epicStoryScenes[currentScene].chapter}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-6xl font-bold text-white mb-8 leading-tight"
            >
              {epicStoryScenes[currentScene].title}
            </motion.h1>

            {/* Story Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <p className="text-lg sm:text-xl text-gray-200 leading-relaxed">
                {epicStoryScenes[currentScene].text}
              </p>
            </motion.div>

            {/* Progress Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-12 flex justify-center space-x-2"
            >
              {epicStoryScenes.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentScene 
                      ? 'bg-cyan-400 scale-125' 
                      : index < currentScene 
                        ? 'bg-cyan-400/60' 
                        : 'bg-gray-600'
                  }`}
                />
              ))}
            </motion.div>
          </div>

          {/* Skip Button */}
          {showSkip && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2 }}
              onClick={handleSkip}
              className="absolute top-8 right-8 px-6 py-2 bg-black/50 backdrop-blur-sm border border-gray-600 rounded-lg text-gray-300 hover:text-white hover:border-cyan-400 transition-all duration-300"
            >
              Skip
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
