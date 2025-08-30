'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PioneerStoryFlow } from '@/components/pioneer-story-flow'

export default function StoryPage() {
  const [pioneerData, setPioneerData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if we should show the story flow
    const showStoryFlow = localStorage.getItem('showStoryFlow')
    const mintedPioneerData = localStorage.getItem('mintedPioneerData')

    if (showStoryFlow === 'true' && mintedPioneerData) {
      try {
        const parsedData = JSON.parse(mintedPioneerData)
        setPioneerData(parsedData)
      } catch (error) {
        console.error('Error parsing pioneer data:', error)
        router.push('/')
      }
    } else {
      // No story to show, redirect to home
      router.push('/')
    }
    
    setIsLoading(false)
  }, [router])

  const handleStoryComplete = () => {
    // Clear the story flow flag
    localStorage.removeItem('showStoryFlow')
    // Keep the pioneer data for the game
    router.push('/play')
  }

  const handleStartGame = () => {
    // Clear the story flow flag
    localStorage.removeItem('showStoryFlow')
    // Keep the pioneer data for the game
    router.push('/play')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading your story...</p>
        </div>
      </div>
    )
  }

  if (!pioneerData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">No Oracle Vision Found</h1>
          <p className="text-gray-300 mb-6">The Oracle Seer has no vision to share with you yet. Please mint a Pioneer NFT to begin your journey.</p>
          <button 
            onClick={() => router.push('/choose')}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg transition-all duration-300"
          >
            Go to Pioneer Selection
          </button>
        </div>
      </div>
    )
  }

  return (
    <PioneerStoryFlow
      pioneerData={pioneerData}
      onStoryComplete={handleStoryComplete}
      onStartGame={handleStartGame}
    />
  )
}

