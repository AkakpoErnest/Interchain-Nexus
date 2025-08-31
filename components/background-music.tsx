"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX, Music } from "lucide-react"

interface BackgroundMusicProps {
  enabled?: boolean
  volume?: number
  onVolumeChange?: (volume: number) => void
}

export function BackgroundMusic({ 
  enabled = true, 
  volume = 0.3,
  onVolumeChange 
}: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentVolume, setCurrentVolume] = useState(volume)

  useEffect(() => {
    // Initialize audio element
    if (typeof window !== 'undefined' && !audioRef.current) {
      audioRef.current = new Audio('/Adam Dib - Veils of Ruin.mp3')
      audioRef.current.loop = true
      audioRef.current.preload = 'auto'
    }
  }, [])

  useEffect(() => {
    if (enabled && !isMuted && audioRef.current) {
      startMusic()
    } else {
      stopMusic()
    }

    return () => {
      stopMusic()
    }
  }, [enabled, isMuted, currentVolume])

  const startMusic = async () => {
    if (!audioRef.current || isPlaying) return

    try {
      audioRef.current.volume = currentVolume
      await audioRef.current.play()
      setIsPlaying(true)
    } catch (error) {
      console.log('Audio playback failed:', error)
      // User interaction might be required for autoplay
    }
  }

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setIsPlaying(false)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (newVolume: number) => {
    setCurrentVolume(newVolume)
    onVolumeChange?.(newVolume)
    
    // Update audio volume if music is playing
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-lg p-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleMute}
        className="text-white hover:bg-white/20"
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </Button>
      
      <div className="flex items-center space-x-1">
        <Music className="h-3 w-3 text-white/70" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={currentVolume}
          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
          className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${currentVolume * 100}%, rgba(255,255,255,0.2) ${currentVolume * 100}%, rgba(255,255,255,0.2) 100%)`
          }}
        />
      </div>
    </div>
  )
}

// Enhanced cosmic ambient sound for specific game moments
export function CosmicAmbientSound({ 
  intensity = 0.5,
  duration = 10000 
}: { 
  intensity?: number
  duration?: number 
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && !audioRef.current) {
      audioRef.current = new Audio('/Adam Dib - Veils of Ruin.mp3')
      audioRef.current.volume = intensity * 0.3
      audioRef.current.loop = false
    }

    if (audioRef.current) {
      playCosmicAmbient()
    }

    return () => {
      stopCosmicAmbient()
    }
  }, [intensity, duration])

  const playCosmicAmbient = async () => {
    if (!audioRef.current) return

    try {
      audioRef.current.volume = intensity * 0.3
      await audioRef.current.play()
      
      // Auto-stop after duration
      setTimeout(() => {
        stopCosmicAmbient()
      }, duration)
    } catch (error) {
      console.log('Cosmic ambient playback failed:', error)
    }
  }

  const stopCosmicAmbient = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  return null
}
