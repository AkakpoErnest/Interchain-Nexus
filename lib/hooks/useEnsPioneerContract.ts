import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { Address } from 'viem'
import { ENS_PIONEER_ABI, getEnsContractAddress, getGasConfigForChain } from '@/lib/blockchain'

// Hook to check if player has ENS Pioneer
export function useHasEnsPioneer(playerAddress: Address | undefined, chainId: number | undefined) {
  const contractAddress = chainId ? getEnsContractAddress(chainId) : undefined
  
  return useReadContract({
    address: contractAddress as Address,
    abi: ENS_PIONEER_ABI,
    functionName: 'hasPioneer',
    args: playerAddress ? [playerAddress] : undefined,
    query: {
      enabled: !!playerAddress && !!chainId && !!contractAddress,
    },
  })
}

// Hook to get player's ENS Pioneer token ID
export function usePlayerEnsPioneer(playerAddress: Address | undefined, chainId: number | undefined) {
  const contractAddress = chainId ? getEnsContractAddress(chainId) : undefined
  
  return useReadContract({
    address: contractAddress as Address,
    abi: ENS_PIONEER_ABI,
    functionName: 'getPlayerPioneer',
    args: playerAddress ? [playerAddress] : undefined,
    query: {
      enabled: !!playerAddress && !!chainId && !!contractAddress,
    },
  })
}

// Hook to get total supply
export function useEnsTotalSupply(chainId: number | undefined) {
  const contractAddress = chainId ? getEnsContractAddress(chainId) : undefined
  
  return useReadContract({
    address: contractAddress as Address,
    abi: ENS_PIONEER_ABI,
    functionName: 'totalSupply',
    query: {
      enabled: !!chainId && !!contractAddress,
    },
  })
}

// Hook to check if minting is available
export function useEnsIsMintingAvailable(chainId: number | undefined) {
  const contractAddress = chainId ? getEnsContractAddress(chainId) : undefined
  
  return useReadContract({
    address: contractAddress as Address,
    abi: ENS_PIONEER_ABI,
    functionName: 'isMintingAvailable',
    query: {
      enabled: !!chainId && !!contractAddress,
    },
  })
}

// Hook to get contract info
export function useEnsContractInfo(chainId: number | undefined) {
  const contractAddress = chainId ? getEnsContractAddress(chainId) : undefined
  
  const { data: name } = useReadContract({
    address: contractAddress as Address,
    abi: ENS_PIONEER_ABI,
    functionName: 'name',
    query: {
      enabled: !!chainId && !!contractAddress,
    },
  })
  
  const { data: symbol } = useReadContract({
    address: contractAddress as Address,
    abi: ENS_PIONEER_ABI,
    functionName: 'symbol',
    query: {
      enabled: !!chainId && !!contractAddress,
    },
  })
  
  return {
    name: name || 'ENS Identity Guardian',
    symbol: symbol || 'ENSIG',
    address: contractAddress,
  }
}

// Hook to mint ENS Pioneer
export function useMintEnsPioneer(chainId: number | undefined) {
  const contractAddress = chainId ? getEnsContractAddress(chainId) : undefined
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  
  const mintPioneer = async (pioneerType: number, playerAddress: Address) => {
    if (!contractAddress) {
      throw new Error('Contract address not found')
    }
    
    const gasConfig = getGasConfigForChain(chainId)
    
    return writeContract({
      address: contractAddress as Address,
      abi: ENS_PIONEER_ABI,
      functionName: 'mintPioneer',
      args: [BigInt(pioneerType), playerAddress],
      ...gasConfig,
    })
  }
  
  return {
    mintPioneer,
    hash,
    isPending,
    error,
  }
}

// Hook to wait for ENS minting transaction
export function useWaitForEnsMinting(hash: `0x${string}` | undefined) {
  return useWaitForTransactionReceipt({
    hash,
    timeout: 120000, // 2 minutes timeout
    pollingInterval: 2000, // Poll every 2 seconds
  })
}
