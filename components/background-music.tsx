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
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorsRef = useRef<OscillatorNode[]>([])
  const gainNodesRef = useRef<GainNode[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentVolume, setCurrentVolume] = useState(volume)

  useEffect(() => {
    // Initialize audio context
    if (typeof window !== 'undefined' && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }, [])

  useEffect(() => {
    if (enabled && !isMuted && audioContextRef.current) {
      startAmbientMusic()
    } else {
      stopAmbientMusic()
    }

    return () => {
      stopAmbientMusic()
    }
  }, [enabled, isMuted, currentVolume])

  const startAmbientMusic = () => {
    if (!audioContextRef.current || isPlaying) return

    const audioContext = audioContextRef.current
    const oscillators: OscillatorNode[] = []
    const gainNodes: GainNode[] = []

    // Create multiple layers of ambient sound
    const layers = [
      { freq: 60, type: 'sine' as OscillatorType, volume: 0.02 }, // Deep bass
      { freq: 120, type: 'sine' as OscillatorType, volume: 0.015 }, // Low mid
      { freq: 240, type: 'triangle' as OscillatorType, volume: 0.01 }, // Mid
      { freq: 480, type: 'sine' as OscillatorType, volume: 0.008 }, // High mid
    ]

    layers.forEach((layer, index) => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.type = layer.type
      oscillator.frequency.setValueAtTime(layer.freq, audioContext.currentTime)
      
      // Add subtle frequency modulation for movement
      const lfo = audioContext.createOscillator()
      const lfoGain = audioContext.createGain()
      lfo.connect(lfoGain)
      lfoGain.connect(oscillator.frequency)
      lfo.frequency.setValueAtTime(0.1 + index * 0.05, audioContext.currentTime)
      lfoGain.gain.setValueAtTime(layer.freq * 0.1, audioContext.currentTime)
      
      gainNode.gain.setValueAtTime(layer.volume * currentVolume, audioContext.currentTime)
      
      oscillator.start(audioContext.currentTime)
      lfo.start(audioContext.currentTime)
      
      oscillators.push(oscillator)
      gainNodes.push(gainNode)
    })

    oscillatorsRef.current = oscillators
    gainNodesRef.current = gainNodes
    setIsPlaying(true)
  }

  const stopAmbientMusic = () => {
    oscillatorsRef.current.forEach(oscillator => {
      try {
        oscillator.stop()
      } catch (e) {
        // Oscillator might already be stopped
      }
    })
    oscillatorsRef.current = []
    gainNodesRef.current = []
    setIsPlaying(false)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (newVolume: number) => {
    setCurrentVolume(newVolume)
    onVolumeChange?.(newVolume)
    
    // Update gain nodes if music is playing
    gainNodesRef.current.forEach((gainNode, index) => {
      const layers = [
        { volume: 0.02 },
        { volume: 0.015 },
        { volume: 0.01 },
        { volume: 0.008 },
      ]
      gainNode.gain.setValueAtTime(layers[index].volume * newVolume, audioContextRef.current?.currentTime || 0)
    })
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
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorsRef = useRef<OscillatorNode[]>([])

  useEffect(() => {
    if (typeof window !== 'undefined' && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }

    if (audioContextRef.current) {
      playCosmicAmbient()
    }

    return () => {
      stopCosmicAmbient()
    }
  }, [intensity, duration])

  const playCosmicAmbient = () => {
    if (!audioContextRef.current) return

    const audioContext = audioContextRef.current
    const oscillators: OscillatorNode[] = []

    // Create a more complex cosmic soundscape
    const cosmicLayers = [
      { freq: 40, type: 'sine' as OscillatorType, volume: 0.03 * intensity },
      { freq: 80, type: 'triangle' as OscillatorType, volume: 0.02 * intensity },
      { freq: 160, type: 'sine' as OscillatorType, volume: 0.015 * intensity },
      { freq: 320, type: 'sawtooth' as OscillatorType, volume: 0.01 * intensity },
    ]

    cosmicLayers.forEach((layer, index) => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.type = layer.type
      oscillator.frequency.setValueAtTime(layer.freq, audioContext.currentTime)
      
      // Add complex modulation
      const lfo1 = audioContext.createOscillator()
      const lfo1Gain = audioContext.createGain()
      lfo1.connect(lfo1Gain)
      lfo1Gain.connect(oscillator.frequency)
      lfo1.frequency.setValueAtTime(0.05 + index * 0.02, audioContext.currentTime)
      lfo1Gain.gain.setValueAtTime(layer.freq * 0.2, audioContext.currentTime)
      
      // Add volume modulation
      const lfo2 = audioContext.createOscillator()
      const lfo2Gain = audioContext.createGain()
      lfo2.connect(lfo2Gain)
      lfo2Gain.connect(gainNode.gain)
      lfo2.frequency.setValueAtTime(0.1 + index * 0.03, audioContext.currentTime)
      lfo2Gain.gain.setValueAtTime(layer.volume * 0.3, audioContext.currentTime)
      
      gainNode.gain.setValueAtTime(layer.volume, audioContext.currentTime)
      
      oscillator.start(audioContext.currentTime)
      lfo1.start(audioContext.currentTime)
      lfo2.start(audioContext.currentTime)
      
      oscillators.push(oscillator)
    })

    oscillatorsRef.current = oscillators

    // Auto-stop after duration
    setTimeout(() => {
      stopCosmicAmbient()
    }, duration)
  }

  const stopCosmicAmbient = () => {
    oscillatorsRef.current.forEach(oscillator => {
      try {
        oscillator.stop()
      } catch (e) {
        // Oscillator might already be stopped
      }
    })
    oscillatorsRef.current = []
  }

  return null
}
