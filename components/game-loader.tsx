"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface GameLoaderProps {
  onComplete: () => void
}

export default function GameLoader({ onComplete }: GameLoaderProps) {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Initializing Nexus...")
  const [currentBackground, setCurrentBackground] = useState("/4c9e11fd-263b-4c44-88f4-6740fe33c89e.jpeg")

  const loadingSteps = [
    { progress: 20, text: "Connecting to Interchain...", background: "/4c9e11fd-263b-4c44-88f4-6740fe33c89e.jpeg" },
    { progress: 40, text: "Loading Pioneer Database...", background: "/towering-data-storage-facility-with-glowing-cores.png" },
    { progress: 60, text: "Synchronizing Realms...", background: "/futuristic-data-archivist-with-holographic-display.png" },
    { progress: 80, text: "Preparing Quest Engine...", background: "/mystical-oracle-eye-with-data-streams.png" },
    { progress: 100, text: "Nexus Ready!", background: "/crystalline-shard-with-cosmic-energy.png" }
  ]

  useEffect(() => {
    let currentStep = 0
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep]
        setLoadingProgress(step.progress)
        setLoadingText(step.text)
        setCurrentBackground(step.background)
        currentStep++
      } else {
        clearInterval(interval)
        setTimeout(() => {
          onComplete()
        }, 1000)
      }
    }, 800)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
      <motion.div 
        key={currentBackground}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: `url('${currentBackground}')`
        }}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      ></motion.div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-pulse delay-3000"></div>
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-400 rounded-full animate-pulse delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
        {/* Game Logo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-12"
        >
          <h1 className="text-6xl sm:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            INTERCHAIN NEXUS
          </h1>
          <p className="text-2xl text-gray-300 font-semibold">
            A Digital Odyssey
          </p>
        </motion.div>

        {/* Loading Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8"
        >
          <div className="w-full max-w-md mx-auto bg-gray-800 rounded-full h-3 mb-4 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-lg text-gray-300 font-medium">
            {loadingText}
          </p>
          <p className="text-sm text-gray-400 mt-2">
            {loadingProgress}%
          </p>
        </motion.div>

        {/* Loading Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-center space-x-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-cyan-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>

        {/* Game Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-8 text-sm text-gray-400"
        >
          <p>Preparing your journey across the interchain...</p>
        </motion.div>
      </div>
    </div>
  )
}
