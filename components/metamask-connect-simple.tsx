'use client'

import { useState } from 'react'
import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { baseSepolia, sepolia, filecoinCalibration, flareTestnet, liskSepolia } from 'wagmi/chains'
import { Wallet, LogOut, ChevronDown } from 'lucide-react'

export function MetaMaskConnectSimple() {
  const { address, isConnected, chainId } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()
  const [showNetworks, setShowNetworks] = useState(false)

  const supportedChains = [
    { chain: liskSepolia, name: 'Lisk Sepolia', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
    { chain: baseSepolia, name: 'Base Sepolia', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
    { chain: sepolia, name: 'Ethereum Sepolia', color: 'bg-gray-500/20 text-gray-300 border-gray-500/30' },
    { chain: filecoinCalibration, name: 'Filecoin Calibration', color: 'bg-green-500/20 text-green-300 border-green-500/30' },
    { chain: flareTestnet, name: 'Flare Testnet', color: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
  ]

  const getChainName = (chainId: number | undefined) => {
    if (!chainId) return 'Unknown Network'
    const chain = supportedChains.find(c => c.chain.id === chainId)
    return chain ? chain.name : `Chain ${chainId}`
  }

  const getChainColor = (chainId: number | undefined) => {
    if (!chainId) return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    const chain = supportedChains.find(c => c.chain.id === chainId)
    return chain ? chain.color : 'bg-gray-500/20 text-gray-300 border-gray-500/30'
  }

  const handleConnect = () => {
    connect({ connector: injected() })
  }

  const handleSwitchChain = (chainId: number) => {
    switchChain({ chainId })
    setShowNetworks(false)
  }

  if (!isConnected) {
    return (
      <Button
        onClick={handleConnect}
        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
      >
        <Wallet className="h-4 w-4 mr-2" />
        Connect MetaMask
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-3">
      {/* Network Badge */}
      <Badge className={`${getChainColor(chainId)} border`}>
        {getChainName(chainId)}
      </Badge>

      {/* Wallet Address */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-gray-800/50 border border-gray-600/30 rounded-lg px-3 py-2">
          <Wallet className="h-4 w-4 text-green-400" />
          <span className="text-green-400 font-mono text-sm">
            {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Unknown'}
          </span>
          <button
            onClick={() => setShowNetworks(!showNetworks)}
            className="text-green-400 hover:text-green-300 transition-colors"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        {/* Disconnect Button */}
        <Button
          onClick={() => disconnect()}
          variant="outline"
          size="sm"
          className="border-red-500/30 text-red-400 hover:bg-red-500/10"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>

      {/* Network Dropdown */}
      {showNetworks && (
        <div className="absolute top-full right-0 mt-2 bg-gray-900 border border-gray-600/30 rounded-lg shadow-xl z-50 min-w-[200px]">
          <div className="p-2">
            <div className="text-xs text-gray-400 mb-2 px-2">Switch Network</div>
            {supportedChains.map(({ chain, name, color }) => (
              <button
                key={chain.id}
                onClick={() => handleSwitchChain(chain.id)}
                className={`w-full text-left px-3 py-2 rounded-md hover:bg-gray-800/50 transition-colors flex items-center justify-between ${
                  chainId === chain.id ? 'bg-gray-800/50' : ''
                }`}
              >
                <span className="text-sm">{name}</span>
                <Badge className={`${color} border text-xs`}>
                  {chain.id}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
