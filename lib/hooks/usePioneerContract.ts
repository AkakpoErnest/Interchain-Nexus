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

// Hook to get remaining supply
export function useRemainingSupply(chainId: number | undefined) {
  const { contractAddress, abi } = usePioneerContract(chainId)

  return useReadContract({
    address: contractAddress,
    abi,
    functionName: 'remainingSupply',
    query: {
      enabled: !!contractAddress && !!chainId,
    },
  })
}

// Hook to get max supply
export function useMaxSupply(chainId: number | undefined) {
  const { contractAddress, abi } = usePioneerContract(chainId)

  return useReadContract({
    address: contractAddress,
    abi,
    functionName: 'MAX_SUPPLY',
    query: {
      enabled: !!contractAddress && !!chainId,
    },
  })
}

// Hook to check if minting is available
export function useIsMintingAvailable(chainId: number | undefined) {
  const { contractAddress, abi } = usePioneerContract(chainId)

  return useReadContract({
    address: contractAddress,
    abi,
    functionName: 'isMintingAvailable',
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
    
    // Optimize gas settings for different networks
    const gasConfig = getGasConfigForChain(chainId)
    
    return writeContract({
      address: contractAddress,
      abi,
      functionName: 'mintPioneer',
      args: [pioneerType, playerAddress],
      ...gasConfig,
    })
  }

  return {
    mintPioneer,
    hash,
    error,
    isPending,
  }
}

// Get optimized gas configuration for different chains
function getGasConfigForChain(chainId: number) {
  switch (chainId) {
    case 114: // Flare Testnet - often slower, use higher gas
      return {
        gas: 500000n, // Higher gas limit
        gasPrice: 25000000000n, // 25 gwei - higher gas price for faster confirmation
      }
    case 84532: // Base Sepolia
      return {
        gas: 300000n,
        gasPrice: 1000000000n, // 1 gwei
      }
    case 11155111: // Ethereum Sepolia
      return {
        gas: 300000n,
        gasPrice: 2000000000n, // 2 gwei
      }
    case 314159: // Filecoin Calibration
      return {
        gas: 400000n,
        gasPrice: 1000000000n, // 1 gwei
      }
    default:
      return {
        gas: 300000n,
        gasPrice: 1000000000n, // 1 gwei default
      }
  }
}

// Hook to wait for mint transaction
export function useMintTransactionReceipt(hash: Hash | undefined) {
  return useWaitForTransactionReceipt({
    hash,
    timeout: 300000, // 5 minutes timeout for Flare testnet
    pollingInterval: 2000, // Check every 2 seconds
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
