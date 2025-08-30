'use client'

import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { Address, Hash } from 'viem'
import { PIONEER_ABI, PioneerType, PioneerData, getContractAddress } from '../blockchain'

export function usePioneerContract(chainId: number | undefined) {
  const contractAddress = chainId ? getContractAddress(chainId) as Address : undefined

  return {
    contractAddress,
    abi: PIONEER_ABI,
  }
}

// Hook to check if a player has a pioneer
export function useHasPioneer(playerAddress: Address | undefined, chainId: number | undefined) {
  const { contractAddress, abi } = usePioneerContract(chainId)

  return useReadContract({
    address: contractAddress,
    abi,
    functionName: 'hasPioneer',
    args: playerAddress ? [playerAddress] : undefined,
    query: {
      enabled: !!playerAddress && !!contractAddress && !!chainId,
    },
  })
}

// Hook to get player's pioneer token ID
export function usePlayerPioneer(playerAddress: Address | undefined, chainId: number | undefined) {
  const { contractAddress, abi } = usePioneerContract(chainId)

  return useReadContract({
    address: contractAddress,
    abi,
    functionName: 'getPlayerPioneer',
    args: playerAddress ? [playerAddress] : undefined,
    query: {
      enabled: !!playerAddress && !!contractAddress && !!chainId,
    },
  })
}

// Hook to get pioneer data by token ID
export function usePioneerData(tokenId: bigint | undefined, chainId: number | undefined) {
  const { contractAddress, abi } = usePioneerContract(chainId)

  return useReadContract({
    address: contractAddress,
    abi,
    functionName: 'getPioneerData',
    args: tokenId !== undefined ? [tokenId] : undefined,
    query: {
      enabled: tokenId !== undefined && !!contractAddress && !!chainId,
    },
  })
}

// Hook to get total supply
export function useTotalSupply(chainId: number | undefined) {
  const { contractAddress, abi } = usePioneerContract(chainId)

  return useReadContract({
    address: contractAddress,
    abi,
    functionName: 'totalSupply',
    query: {
      enabled: !!contractAddress && !!chainId,
    },
  })
}

// Hook to get pioneer type information
export function usePioneerTypeInfo(pioneerType: PioneerType, chainId: number | undefined) {
  const { contractAddress, abi } = usePioneerContract(chainId)

  const nameQuery = useReadContract({
    address: contractAddress,
    abi,
    functionName: 'pioneerNames',
    args: [pioneerType],
    query: {
      enabled: !!contractAddress && !!chainId,
    },
  })

  const titleQuery = useReadContract({
    address: contractAddress,
    abi,
    functionName: 'pioneerTitles',
    args: [pioneerType],
    query: {
      enabled: !!contractAddress && !!chainId,
    },
  })

  const realmQuery = useReadContract({
    address: contractAddress,
    abi,
    functionName: 'pioneerRealms',
    args: [pioneerType],
    query: {
      enabled: !!contractAddress && !!chainId,
    },
  })

  const rarityQuery = useReadContract({
    address: contractAddress,
    abi,
    functionName: 'pioneerRarities',
    args: [pioneerType],
    query: {
      enabled: !!contractAddress && !!chainId,
    },
  })

  return {
    name: nameQuery.data,
    title: titleQuery.data,
    realm: realmQuery.data,
    rarity: rarityQuery.data,
    isLoading: nameQuery.isLoading || titleQuery.isLoading || realmQuery.isLoading || rarityQuery.isLoading,
    error: nameQuery.error || titleQuery.error || realmQuery.error || rarityQuery.error,
  }
}

// Hook to mint a pioneer NFT
export function useMintPioneer() {
  const { writeContract, data: hash, error, isPending } = useWriteContract()

  const mintPioneer = async (pioneerType: PioneerType, playerAddress: Address, chainId: number | undefined) => {
    if (!chainId) throw new Error('Chain ID is required')
    const { contractAddress, abi } = usePioneerContract(chainId)
    
    if (!contractAddress) throw new Error('Contract address not found for this chain')
    
    return writeContract({
      address: contractAddress,
      abi,
      functionName: 'mintPioneer',
      args: [pioneerType, playerAddress],
    })
  }

  return {
    mintPioneer,
    hash,
    error,
    isPending,
  }
}

// Hook to wait for mint transaction
export function useMintTransactionReceipt(hash: Hash | undefined) {
  return useWaitForTransactionReceipt({
    hash,
  })
}

// Hook to get contract name and symbol
export function useContractInfo(chainId: number | undefined) {
  const { contractAddress, abi } = usePioneerContract(chainId)

  const nameQuery = useReadContract({
    address: contractAddress,
    abi,
    functionName: 'name',
    query: {
      enabled: !!contractAddress && !!chainId,
    },
  })

  const symbolQuery = useReadContract({
    address: contractAddress,
    abi,
    functionName: 'symbol',
    query: {
      enabled: !!contractAddress && !!chainId,
    },
  })

  return {
    name: nameQuery.data,
    symbol: symbolQuery.data,
    isLoading: nameQuery.isLoading || symbolQuery.isLoading,
    error: nameQuery.error || symbolQuery.error,
  }
}
