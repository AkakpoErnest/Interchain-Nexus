'use client'

import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { baseSepolia, sepolia, filecoinTestnet, flareTestnet, lisk } from 'wagmi/chains'
import { Wallet, LogOut, AlertCircle } from 'lucide-react'

export function MetaMaskConnect() {
  const { address, isConnected, chainId } = useAccount()
  const { connect, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false)

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
  }

  const handleSwitchChain = (chainId: number) => {
    switchChain({ chainId })
  }

  const getChainName = (chainId: number) => {
    switch (chainId) {
      case baseSepolia.id: return 'Base Sepolia'
      case sepolia.id: return 'Ethereum Sepolia'
      case filecoinTestnet.id: return 'Filecoin Testnet'
      case flareTestnet.id: return 'Flare Testnet'
      case lisk.id: return 'Lisk Testnet'
      default: return `Chain ${chainId}`
    }
  }

  const getChainColor = (chainId: number) => {
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
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          MetaMask is not installed. Please install MetaMask to connect your wallet.
        </AlertDescription>
      </Alert>
    )
  }

  if (!isConnected) {
    return (
      <div className="space-y-4">
        <Button 
          onClick={handleConnect}
          disabled={isPending}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
        >
          <Wallet className="h-4 w-4 mr-2" />
          {isPending ? 'Connecting...' : 'Connect MetaMask'}
        </Button>
        
        <div className="text-sm text-muted-foreground text-center">
          <p>Connect your MetaMask wallet to start minting Pioneer NFTs</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Connection Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Wallet className="h-4 w-4 text-green-500" />
          <span className="text-sm font-medium">Connected</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDisconnect}
          className="text-red-400 border-red-400/30 hover:bg-red-400/10"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Disconnect
        </Button>
      </div>

      {/* Address */}
      <div className="text-sm">
        <p className="text-muted-foreground mb-1">Address:</p>
        <p className="font-mono text-xs break-all bg-slate-800 p-2 rounded">
          {address}
        </p>
      </div>

      {/* Current Chain */}
      <div className="text-sm">
        <p className="text-muted-foreground mb-2">Current Network:</p>
        <Badge className={`${getChainColor(chainId)} px-3 py-1`}>
          {getChainName(chainId)}
        </Badge>
      </div>

      {/* Network Switcher */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Switch Network:</p>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSwitchChain(baseSepolia.id)}
            className="text-xs"
          >
            Base Sepolia
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSwitchChain(sepolia.id)}
            className="text-xs"
          >
            Ethereum Sepolia
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSwitchChain(filecoinTestnet.id)}
            className="text-xs"
          >
            Filecoin Testnet
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSwitchChain(flareTestnet.id)}
            className="text-xs"
          >
            Flare Testnet
          </Button>
        </div>
      </div>

      {/* Testnet Info */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="text-xs">
          Make sure you have testnet tokens for the selected network. 
          Get testnet ETH from faucets or bridge from mainnet.
        </AlertDescription>
      </Alert>
    </div>
  )
}
