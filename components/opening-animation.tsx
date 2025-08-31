"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CosmicAmbientSound } from "./background-music"

interface OpeningAnimationProps {
  onComplete: () => void
}

const storyScenes = [
  {
    id: 1,
    title: "Long, long ago...",
    text: "In the beginning, there was unity. The Interchain Nexus connected all realms in perfect harmony.",
    background: "/4c9e11fd-263b-4c44-88f4-6740fe33c89e.jpeg",
    duration: 4000
  },
  {
    id: 2,
    title: "The Great Fracture",
    text: "But darkness came. The Nexus shattered, and the realms were torn apart, each isolated in their own domain.",
    background: "/_ (1).jpeg",
    duration: 4000
  },
  {
    id: 3,
    title: "The Age of Isolation",
    text: "Memory faded in the Vaults of Filecoin. Truth became uncertain in the Oracle Spires of Flare.",
    background: "/_ (2).jpeg",
    duration: 4000
  },
  {
    id: 4,
    title: "The Call of Creation",
    text: "Creation slumbered in the Forge Halls of Base. Identity was lost in the Hall of Names. Law crumbled in the Council Chambers.",
    background: "/_ (3).jpeg",
    duration: 4000
  },
  {
    id: 5,
    title: "The Prophecy",
    text: "But the ancient texts speak of a chosen one - a Pioneer who will journey through all five realms and restore the Nexus.",
    background: "/_ (4).jpeg",
    duration: 4000
  },
  {
    id: 6,
    title: "Your Destiny Awaits",
    text: "That Pioneer is you. The cosmos calls. Will you answer?",
    background: "/4c9e11fd-263b-4c44-88f4-6740fe33c89e.jpeg",
    duration: 3000
  }
]

export function OpeningAnimation({ onComplete }: OpeningAnimationProps) {
  const [currentScene, setCurrentScene] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (currentScene < storyScenes.length) {
      const timer = setTimeout(() => {
        setCurrentScene(currentScene + 1)
      }, storyScenes[currentScene].duration)

      return () => clearTimeout(timer)
    } else {
      // Animation complete
      setTimeout(() => {
        setIsVisible(false)
        setTimeout(onComplete, 1000)
      }, 2000)
    }
  }, [currentScene, onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[100] bg-black">
      {/* Cosmic Ambient Sound */}
      <CosmicAmbientSound intensity={0.3} duration={30000} />
      
      <AnimatePresence mode="wait">
        {currentScene < storyScenes.length && (
          <motion.div
            key={currentScene}
            className="relative w-full h-full"
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
                backgroundImage: `url('${storyScenes[currentScene].background}')`
              }}
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 bg-black/50"></div>
              {/* Cinematic overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
            </motion.div>

            {/* Animated overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80"></div>

            {/* Floating particles */}
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Story Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
              <motion.div
                className="text-center max-w-4xl"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                {/* Scene Title */}
                <motion.h1
                  className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-8"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {storyScenes[currentScene].title}
                  </span>
                </motion.h1>

                {/* Scene Text */}
                <motion.p
                  className="text-xl sm:text-2xl lg:text-3xl text-gray-300 leading-relaxed mb-8"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 1.5 }}
                >
                  {storyScenes[currentScene].text}
                </motion.p>

                {/* Progress Indicator */}
                <motion.div
                  className="flex justify-center space-x-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 2 }}
                >
                  {storyScenes.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-500 ${
                        index === currentScene
                          ? "bg-cyan-400 scale-125"
                          : index < currentScene
                          ? "bg-purple-400"
                          : "bg-gray-600"
                      }`}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* Skip Button */}
            <motion.button
              className="absolute top-8 right-8 z-20 px-6 py-3 bg-black/50 backdrop-blur-sm border border-cyan-400/30 rounded-lg text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
              onClick={() => {
                setIsVisible(false)
                setTimeout(onComplete, 500)
              }}
            >
              Skip Animation
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final Transition */}
      {currentScene >= storyScenes.length && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="text-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="text-6xl sm:text-8xl font-bold text-white mb-8">
              NEXUS
            </h1>
            <p className="text-2xl sm:text-3xl text-white font-semibold">
              The Journey Begins...
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
