'use client'

import { useState, useEffect } from 'react'
import { useAccount, useChainId } from 'wagmi'
import { OracleSeerGame } from '@/components/oracle-seer-game'
import { MetaMaskConnectSimple } from '@/components/metamask-connect-simple'
import { useHasPioneer } from '@/lib/hooks/usePioneerContract'

export default function PlayPage() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const [gameStarted, setGameStarted] = useState(false)
  
  // Check if user has a pioneer
  const { data: hasPioneer, isLoading: hasPioneerLoading } = useHasPioneer(address, chainId)

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-6">Connect Your Wallet</h1>
          <p className="text-gray-300 mb-8">Connect your wallet to start playing the Interchain Nexus game</p>
          <MetaMaskConnectSimple />
        </div>
      </div>
    )
  }

  if (hasPioneerLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Checking your Pioneer status...</p>
        </div>
      </div>
    )
  }

  if (!hasPioneer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto p-6">
          <h1 className="text-3xl font-bold text-white mb-6">No Pioneer Found</h1>
          <p className="text-gray-300 mb-8 text-lg leading-relaxed">
            You need to mint a Pioneer NFT before you can start playing the Interchain Nexus game. 
            Visit the Choose page to mint your first Pioneer and begin your adventure.
          </p>
          <a 
            href="/choose"
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 inline-block"
          >
            Mint Your Pioneer
          </a>
        </div>
      </div>
    )
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto p-6">
          <h1 className="text-4xl font-bold text-white mb-6">
            Welcome to the Interchain Nexus
          </h1>
          <p className="text-gray-300 mb-8 text-lg leading-relaxed">
            As an Oracle Seer, you have the power to see beyond the veil of reality and seek truth across all blockchain networks. 
            Your journey begins now in the cosmic realm where data flows like starlight.
          </p>
          <button
            onClick={() => setGameStarted(true)}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Begin Your Journey
          </button>
        </div>
      </div>
    )
  }

  return <OracleSeerGame />
}