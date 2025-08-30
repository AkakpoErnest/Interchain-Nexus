'use client'

import { useAccount, useChainId } from 'wagmi'
import { useHasPioneer, usePlayerPioneer, usePioneerContract } from '@/lib/hooks/usePioneerContract'

export function DebugPioneerStatus() {
  const { address } = useAccount()
  const chainId = useChainId()
  const { contractAddress, abi } = usePioneerContract(chainId)
  
  const { data: hasPioneer, isLoading: hasPioneerLoading, error: hasPioneerError } = useHasPioneer(address, chainId)
  const { data: playerPioneerTokenId, isLoading: playerPioneerLoading, error: playerPioneerError } = usePlayerPioneer(address, chainId)

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">Debug Pioneer Status</h3>
      <div className="space-y-1">
        <div>Address: {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'}</div>
        <div>Chain ID: {chainId || 'Not connected'}</div>
        <div>Contract: {contractAddress ? `${contractAddress.slice(0, 6)}...${contractAddress.slice(-4)}` : 'Not found'}</div>
        <div>Has Pioneer: {hasPioneerLoading ? 'Loading...' : hasPioneerError ? `Error: ${hasPioneerError.message}` : hasPioneer ? 'Yes' : 'No'}</div>
        <div>Token ID: {playerPioneerLoading ? 'Loading...' : playerPioneerError ? `Error: ${playerPioneerError.message}` : playerPioneerTokenId?.toString() || 'None'}</div>
        <div>ABI Functions: {abi.filter((item: any) => item.type === 'function' && item.name === 'hasPioneer').length > 0 ? 'hasPioneer found' : 'hasPioneer missing'}</div>
      </div>
    </div>
  )
}
