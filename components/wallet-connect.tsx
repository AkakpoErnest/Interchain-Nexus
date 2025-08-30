"use client"

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useDisconnect } from 'wagmi'

export function WalletConnect() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  return (
    <div className="flex items-center gap-4">
      <ConnectButton 
        chainStatus="icon"
        accountStatus={{
          smallScreen: 'avatar',
          largeScreen: 'full',
        }}
        showBalance={{
          smallScreen: false,
          largeScreen: true,
        }}
      />
    </div>
  )
}

export function WalletStatus() {
  const { address, isConnected } = useAccount()

  if (!isConnected) {
    return (
      <div className="text-sm text-muted-foreground">
        Connect your wallet to begin
      </div>
    )
  }

  return (
    <div className="text-sm text-green-400">
      Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
    </div>
  )
}
