"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ConfettiPiece {
  id: number
  x: number
  y: number
  color: string
  delay: number
}

interface ConfettiProps {
  trigger: boolean
  onComplete?: () => void
}

const colors = [
  "#00bcd4", // Cyan
  "#ff5722", // Orange
  "#4caf50", // Green
  "#ffeb3b", // Yellow
  "#9c27b0", // Purple
  "#f44336", // Red
  "#2196f3", // Blue
]

export function Confetti({ trigger, onComplete }: ConfettiProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    if (trigger) {
      const newPieces: ConfettiPiece[] = []
      
      // Create 50 confetti pieces
      for (let i = 0; i < 50; i++) {
        newPieces.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: -10,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 0.5,
        })
      }
      
      setPieces(newPieces)
      
      // Clear pieces after animation
      setTimeout(() => {
        setPieces([])
        onComplete?.()
      }, 3000)
    }
  }, [trigger, onComplete])

  return (
    <AnimatePresence>
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="fixed w-3 h-3 rounded-full pointer-events-none z-50"
          style={{
            left: piece.x,
            top: piece.y,
            backgroundColor: piece.color,
          }}
          initial={{ 
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          animate={{ 
            opacity: 0,
            scale: 0,
            rotate: 720,
            y: window.innerHeight + 100,
            x: piece.x + (Math.random() - 0.5) * 200,
          }}
          transition={{
            duration: 3,
            delay: piece.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </AnimatePresence>
  )
}
