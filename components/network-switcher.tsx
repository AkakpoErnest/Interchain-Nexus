"use client"

import { useEffect, useState } from 'react'
import { useAccount, useSwitchChain } from 'wagmi'
import { PioneerType, getChainIdForPioneerType, getNetworkNameForPioneerType } from '@/lib/blockchain'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Loader2, AlertTriangle, CheckCircle } from 'lucide-react'

interface NetworkSwitcherProps {
  pioneerType: PioneerType
  onNetworkSwitched?: () => void
  onError?: (error: Error) => void
}

export function NetworkSwitcher({ pioneerType, onNetworkSwitched, onError }: NetworkSwitcherProps) {
  const { isConnected, chainId } = useAccount()
  const { switchChain, isPending, error } = useSwitchChain()
  const [isSwitching, setIsSwitching] = useState(false)
  const [hasSwitched, setHasSwitched] = useState(false)

  const requiredChainId = getChainIdForPioneerType(pioneerType)
  const networkName = getNetworkNameForPioneerType(pioneerType)
  const isOnCorrectNetwork = chainId === requiredChainId

  // Auto-switch when pioneer type changes
  useEffect(() => {
    if (isConnected && !isOnCorrectNetwork && !isSwitching && !hasSwitched) {
      handleSwitchNetwork()
    }
  }, [pioneerType, isConnected, isOnCorrectNetwork, isSwitching, hasSwitched])

  const handleSwitchNetwork = async () => {
    if (!isConnected) return

    try {
      setIsSwitching(true)
      setHasSwitched(false)
      
      await switchChain({ chainId: requiredChainId })
      setHasSwitched(true)
      onNetworkSwitched?.()
    } catch (error) {
      console.error('Network switch error:', error)
      onError?.(error instanceof Error ? error : new Error('Failed to switch network'))
    } finally {
      setIsSwitching(false)
    }
  }

  // Show success state briefly
  useEffect(() => {
    if (hasSwitched && isOnCorrectNetwork) {
      const timer = setTimeout(() => {
        setHasSwitched(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [hasSwitched, isOnCorrectNetwork])

  if (!isConnected) {
    return null
  }

  if (isOnCorrectNetwork && !hasSwitched) {
    return null // Don't show anything if already on correct network
  }

  if (hasSwitched && isOnCorrectNetwork) {
    return (
      <Alert className="mb-4">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <AlertDescription className="text-green-400">
          Successfully switched to {networkName}! Ready to mint your Pioneer NFT.
        </AlertDescription>
      </Alert>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Failed to switch to {networkName}. Please switch manually in your wallet.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert className="mb-4">
      <AlertTriangle className="h-4 w-4 text-yellow-500" />
      <AlertDescription className="flex items-center justify-between">
        <span>
          {isSwitching 
            ? `Switching to ${networkName}...` 
            : `Please switch to ${networkName} to mint this Pioneer NFT.`
          }
        </span>
        {!isSwitching && (
          <Button 
            size="sm" 
            variant="outline"
            onClick={handleSwitchNetwork}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Switching...
              </>
            ) : (
              'Switch Network'
            )}
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
}

