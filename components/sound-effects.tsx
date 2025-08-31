"use client"

import { useEffect, useRef } from "react"

interface SoundEffectsProps {
  playSuccess?: boolean
  playFailure?: boolean
  playUnlock?: boolean
  playBackground?: boolean
  playClick?: boolean
  playHover?: boolean
  playLevelUp?: boolean
  playAchievement?: boolean
  playTransition?: boolean
}

export function SoundEffects({ 
  playSuccess, 
  playFailure, 
  playUnlock, 
  playBackground,
  playClick,
  playHover,
  playLevelUp,
  playAchievement,
  playTransition
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

  useEffect(() => {
    if (!audioContextRef.current) return

    const audioContext = audioContextRef.current

    if (playClick) {
      playClickSound(audioContext)
    }
  }, [playClick])

  useEffect(() => {
    if (!audioContextRef.current) return

    const audioContext = audioContextRef.current

    if (playHover) {
      playHoverSound(audioContext)
    }
  }, [playHover])

  useEffect(() => {
    if (!audioContextRef.current) return

    const audioContext = audioContextRef.current

    if (playLevelUp) {
      playLevelUpSound(audioContext)
    }
  }, [playLevelUp])

  useEffect(() => {
    if (!audioContextRef.current) return

    const audioContext = audioContextRef.current

    if (playAchievement) {
      playAchievementSound(audioContext)
    }
  }, [playAchievement])

  useEffect(() => {
    if (!audioContextRef.current) return

    const audioContext = audioContextRef.current

    if (playTransition) {
      playTransitionSound(audioContext)
    }
  }, [playTransition])

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

// Generate a subtle click sound
function playClickSound(audioContext: AudioContext) {
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  oscillator.type = 'sine'
  oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
  oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.05)
  
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
  
  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + 0.1)
}

// Generate a gentle hover sound
function playHoverSound(audioContext: AudioContext) {
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  oscillator.type = 'sine'
  oscillator.frequency.setValueAtTime(600, audioContext.currentTime)
  oscillator.frequency.linearRampToValueAtTime(800, audioContext.currentTime + 0.1)
  
  gainNode.gain.setValueAtTime(0.05, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15)
  
  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + 0.15)
}

// Generate a level up fanfare
function playLevelUpSound(audioContext: AudioContext) {
  const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6
  
  notes.forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime + index * 0.1)
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime + index * 0.1)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.1 + 0.5)
    
    oscillator.start(audioContext.currentTime + index * 0.1)
    oscillator.stop(audioContext.currentTime + index * 0.1 + 0.5)
  })
}

// Generate an achievement sound
function playAchievementSound(audioContext: AudioContext) {
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  oscillator.type = 'sine'
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime) // A4
  oscillator.frequency.setValueAtTime(554.37, audioContext.currentTime + 0.2) // C#5
  oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.4) // E5
  oscillator.frequency.setValueAtTime(880, audioContext.currentTime + 0.6) // A5
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.2)
  
  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + 1.2)
}

// Generate a transition sound
function playTransitionSound(audioContext: AudioContext) {
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  oscillator.type = 'sawtooth'
  oscillator.frequency.setValueAtTime(200, audioContext.currentTime)
  oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.3)
  
  gainNode.gain.setValueAtTime(0.15, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
  
  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + 0.5)
}
