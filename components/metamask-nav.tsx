'use client'

import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { baseSepolia, sepolia, filecoinTestnet, flareTestnet, lisk } from 'wagmi/chains'
import { Wallet, LogOut, ChevronDown } from 'lucide-react'

export function MetaMaskNav() {
  const { address, isConnected, chainId } = useAccount()
  const { connect, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  // Check if MetaMask is installed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMetaMaskInstalled(!!window.ethereum?.isMetaMask)
    }
  }, [])

  const handleConnect = () => {
    connect({ connector: injected() })
  }

  const handleDisconnect = () => {
    disconnect()
    setShowDropdown(false)
  }

  const handleSwitchChain = (chainId: number) => {
    switchChain({ chainId })
    setShowDropdown(false)
  }

  const getChainName = (chainId: number | undefined) => {
    if (!chainId) return 'Unknown Network'
    switch (chainId) {
      case baseSepolia.id: return 'Base Sepolia'
      case sepolia.id: return 'Ethereum Sepolia'
      case filecoinTestnet.id: return 'Filecoin Testnet'
      case flareTestnet.id: return 'Flare Testnet'
      case lisk.id: return 'Lisk Testnet'
      default: return `Chain ${chainId}`
    }
  }

  const getChainColor = (chainId: number | undefined) => {
    if (!chainId) return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    switch (chainId) {
      case baseSepolia.id: return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case sepolia.id: return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
      case filecoinTestnet.id: return 'bg-green-500/20 text-green-300 border-green-500/30'
      case flareTestnet.id: return 'bg-orange-500/20 text-orange-300 border-orange-500/30'
      case lisk.id: return 'bg-purple-500/20 text-purple-300 border-purple-500/30'
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  if (!isMetaMaskInstalled) {
    return (
      <Button variant="outline" className="glow-hover bg-transparent border-red-400 text-red-400 hover:bg-red-400 hover:text-black">
        Install MetaMask
      </Button>
    )
  }

  if (!isConnected) {
    return (
      <Button 
        onClick={handleConnect}
        disabled={isPending}
        variant="outline" 
        className="glow-hover bg-transparent border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
      >
        <Wallet className="h-4 w-4 mr-2" />
        {isPending ? 'Connecting...' : 'Connect MetaMask'}
      </Button>
    )
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setShowDropdown(!showDropdown)}
        className="glow-hover bg-transparent border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
      >
        <Wallet className="h-4 w-4 mr-2" />
        {address?.slice(0, 6)}...{address?.slice(-4)}
        <ChevronDown className="h-4 w-4 ml-2" />
      </Button>

      {showDropdown && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-slate-800 border border-slate-600 rounded-lg shadow-xl z-50">
          <div className="p-4 space-y-3">
            {/* Address */}
            <div className="text-sm">
              <p className="text-muted-foreground mb-1">Address:</p>
              <p className="font-mono text-xs break-all bg-slate-700 p-2 rounded">
                {address}
              </p>
            </div>

            {/* Current Chain */}
            <div className="text-sm">
              <p className="text-muted-foreground mb-2">Network:</p>
              <Badge className={`${getChainColor(chainId)} px-3 py-1`}>
                {getChainName(chainId)}
              </Badge>
            </div>

            {/* Network Switcher */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Switch Network:</p>
              <div className="grid grid-cols-1 gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSwitchChain(baseSepolia.id)}
                  className="text-xs justify-start"
                >
                  Base Sepolia
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSwitchChain(sepolia.id)}
                  className="text-xs justify-start"
                >
                  Ethereum Sepolia
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSwitchChain(filecoinTestnet.id)}
                  className="text-xs justify-start"
                >
                  Filecoin Testnet
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSwitchChain(flareTestnet.id)}
                  className="text-xs justify-start"
                >
                  Flare Testnet
                </Button>
              </div>
            </div>

            {/* Disconnect */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleDisconnect}
              className="w-full text-red-400 border-red-400/30 hover:bg-red-400/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Disconnect
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
