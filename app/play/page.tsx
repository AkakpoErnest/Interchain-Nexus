'use client'

import { useState, useEffect } from 'react'
import { useAccount, useChainId } from 'wagmi'
import { OracleSeerGame } from '@/components/oracle-seer-game'
import { EnsIdentityGame } from '@/components/ens-identity-game'
import { MetaMaskConnectSimple } from '@/components/metamask-connect-simple'
import { useHasPioneer } from '@/lib/hooks/usePioneerContract'
import { useHasEnsPioneer } from '@/lib/hooks/useEnsPioneerContract'
import { PioneerType } from '@/lib/blockchain'

export default function PlayPage() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const [gameStarted, setGameStarted] = useState(false)
  
  // Check if user has any pioneer
  const { data: hasOraclePioneer, isLoading: hasOraclePioneerLoading } = useHasPioneer(address, 114) // Flare Testnet
  const { data: hasEnsPioneer, isLoading: hasEnsPioneerLoading } = useHasEnsPioneer(address, 11155111) // Ethereum Sepolia
  
  const hasPioneer = hasOraclePioneer || hasEnsPioneer
  const hasPioneerLoading = hasOraclePioneerLoading || hasEnsPioneerLoading

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

  // Skip loading state - go directly to game or no pioneer message

  if (!hasPioneer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto p-6">
          <h1 className="text-3xl font-bold text-white mb-6">No Pioneer Found</h1>
          <p className="text-gray-300 mb-8 text-lg leading-relaxed">
            You need to mint a Pioneer NFT before you can start playing the Interchain Nexus game. 
            Visit the Choose page to mint your first Pioneer and begin your adventure.
          </p>
          
          {/* Debug Info */}
          <div className="bg-black/20 p-4 rounded-lg mb-6 text-left">
            <h3 className="text-white font-semibold mb-2">Debug Info:</h3>
            <p className="text-gray-300 text-sm">Address: {address || 'Not connected'}</p>
            <p className="text-gray-300 text-sm">Chain ID: {chainId || 'Unknown'}</p>
            <p className="text-gray-300 text-sm">Oracle Pioneer (Flare): {hasOraclePioneer ? 'Yes' : 'No'}</p>
            <p className="text-gray-300 text-sm">ENS Pioneer (Sepolia): {hasEnsPioneer ? 'Yes' : 'No'}</p>
            <p className="text-gray-300 text-sm">Loading: {hasPioneerLoading ? 'Yes' : 'No'}</p>
          </div>
          
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
            {hasOraclePioneer && hasEnsPioneer ? 
              "You have both an Oracle Seer and an Identity Guardian! Choose your adventure:" :
              hasOraclePioneer ? 
                "As an Oracle Seer, you have the power to see beyond the veil of reality and seek truth across all blockchain networks. Your journey begins now in the cosmic realm where data flows like starlight." :
                "As an Identity Guardian, you are the keeper of names and protector of digital identities. Your journey begins in the ancient realm of code and ether, where names carry true power."
            }
          </p>
          {hasOraclePioneer && hasEnsPioneer ? (
            <div className="space-y-4">
              <button
                onClick={() => setGameStarted(true)}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 mr-4"
              >
                Play as Oracle Seer
              </button>
              <button
                onClick={() => setGameStarted(true)}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Play as Identity Guardian
              </button>
            </div>
          ) : (
            <button
              onClick={() => setGameStarted(true)}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Begin Your Journey
            </button>
          )}
        </div>
      </div>
    )
  }

  // Determine which game to show based on available pioneers
  if (hasOraclePioneer && !hasEnsPioneer) {
    return <OracleSeerGame />
  } else if (hasEnsPioneer && !hasOraclePioneer) {
    return <EnsIdentityGame />
  } else if (hasOraclePioneer && hasEnsPioneer) {
    // If user has both, default to Oracle Seer for now
    // In the future, we could add a game selection interface
    return <OracleSeerGame />
  } else {
    return <OracleSeerGame />
  }
}