"use client"

import { useEffect, useRef } from "react"

interface SoundEffectsProps {
  playSuccess?: boolean
  playFailure?: boolean
  playUnlock?: boolean
  playBackground?: boolean
}

export function SoundEffects({ 
  playSuccess, 
  playFailure, 
  playUnlock, 
  playBackground 
}: SoundEffectsProps) {
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    // Initialize audio context
    if (typeof window !== 'undefined' && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }, [])

  useEffect(() => {
    if (!audioContextRef.current) return

    const audioContext = audioContextRef.current

    if (playSuccess) {
      playChime(audioContext)
    }
  }, [playSuccess])

  useEffect(() => {
    if (!audioContextRef.current) return

    const audioContext = audioContextRef.current

    if (playFailure) {
      playDrum(audioContext)
    }
  }, [playFailure])

  useEffect(() => {
    if (!audioContextRef.current) return

    const audioContext = audioContextRef.current

    if (playUnlock) {
      playUnlockSound(audioContext)
    }
  }, [playUnlock])

  useEffect(() => {
    if (!audioContextRef.current) return

    const audioContext = audioContextRef.current

    if (playBackground) {
      playCosmicHum(audioContext)
    }
  }, [playBackground])

  return null
}

// Generate a pleasant chime sound
function playChime(audioContext: AudioContext) {
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime) // C5
  oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1) // E5
  oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2) // G5
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1)
  
  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + 1)
}

// Generate a drum hit sound
function playDrum(audioContext: AudioContext) {
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  oscillator.type = 'sawtooth'
  oscillator.frequency.setValueAtTime(100, audioContext.currentTime)
  oscillator.frequency.exponentialRampToValueAtTime(20, audioContext.currentTime + 0.1)
  
  gainNode.gain.setValueAtTime(0.5, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
  
  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + 0.2)
}

// Generate an unlock sound
function playUnlockSound(audioContext: AudioContext) {
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  oscillator.frequency.setValueAtTime(200, audioContext.currentTime)
  oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.3)
  
  gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
  
  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + 0.5)
}

// Generate a cosmic hum background sound
function playCosmicHum(audioContext: AudioContext) {
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  oscillator.type = 'sine'
  oscillator.frequency.setValueAtTime(60, audioContext.currentTime)
  
  gainNode.gain.setValueAtTime(0.05, audioContext.currentTime)
  
  oscillator.start(audioContext.currentTime)
  
  // Stop after 10 seconds
  setTimeout(() => {
    oscillator.stop()
  }, 10000)
}
