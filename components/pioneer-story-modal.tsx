"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { X, BookOpen, Target, Zap } from "lucide-react"

interface PioneerStoryModalProps {
  pioneer: {
    id: number
    name: string
    title: string
    realm: string
    rarity: string
    image: string
    description: string
    lore: string
    story: string
    abilities: string[]
    mission: string
    passiveBuff: string
  }
  isOpen: boolean
  onClose: () => void
}

export function PioneerStoryModal({ pioneer, isOpen, onClose }: PioneerStoryModalProps) {
  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border border-cyan-400/30 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 bg-black/20 border border-white/20 rounded-full w-8 h-8 p-0 flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Header */}
            <div className="relative h-64 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-t-xl overflow-hidden">
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 p-6 h-full flex items-end">
                <div className="flex items-end gap-6">
                  <div className="relative">
                    <img
                      src={pioneer.image}
                      alt={pioneer.name}
                      className="w-32 h-32 object-cover rounded-lg border-2 border-cyan-400/50 shadow-2xl"
                    />
                    <Badge className="absolute -top-2 -right-2 bg-purple-600 text-white">
                      {pioneer.rarity}
                    </Badge>
                  </div>
                  <div className="text-white">
                    <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      {pioneer.name}
                    </h1>
                    <h2 className="text-xl text-cyan-300 mb-2">{pioneer.title}</h2>
                    <p className="text-gray-300 text-lg">{pioneer.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Story Section */}
              <Card className="bg-slate-800/50 border-cyan-400/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-cyan-400">
                    <BookOpen className="h-5 w-5" />
                    The Story
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {pioneer.story}
                  </p>
                </CardContent>
              </Card>

              {/* Mission Section */}
              <Card className="bg-slate-800/50 border-purple-400/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-400">
                    <Target className="h-5 w-5" />
                    Sacred Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {pioneer.mission}
                  </p>
                </CardContent>
              </Card>

              {/* Abilities Section */}
              <Card className="bg-slate-800/50 border-green-400/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-400">
                    <Zap className="h-5 w-5" />
                    Special Abilities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {pioneer.abilities.map((ability, index) => (
                      <Badge key={index} variant="secondary" className="bg-green-600/20 text-green-300 border-green-400/30">
                        {ability}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Passive Buff */}
              <Card className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border-yellow-400/30">
                <CardHeader>
                  <CardTitle className="text-yellow-400">Passive Ability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-yellow-200 font-medium">
                    {pioneer.passiveBuff}
                  </p>
                </CardContent>
              </Card>

              {/* Lore */}
              <Card className="bg-slate-800/50 border-cyan-400/20">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Ancient Lore</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 italic leading-relaxed">
                    "{pioneer.lore}"
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-cyan-400/20">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  Realm: <span className="text-cyan-400 font-medium">{pioneer.realm}</span>
                </div>
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    onClose()
                  }}
                  className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white px-6 py-2"
                >
                  Close Story
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
