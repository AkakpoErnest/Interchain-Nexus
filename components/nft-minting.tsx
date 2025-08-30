'use client'

import { useState, useEffect } from 'react'
import { useAccount, useChainId } from 'wagmi'
import { Address } from 'viem'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  useHasPioneer, 
  usePlayerPioneer, 
  usePioneerData, 
  useMintPioneer, 
  useMintTransactionReceipt,
  useTotalSupply,
  useContractInfo
} from '@/lib/hooks/usePioneerContract'
import { 
  PioneerType, 
  getPioneerTypeInfo, 
  isSupportedChain,
  getNetworkConfig 
} from '@/lib/blockchain'
import { getContractAddress } from '@/lib/contract-config'
import { Loader2, CheckCircle, XCircle, ExternalLink, Zap } from 'lucide-react'
import { TransactionStatus } from './transaction-status'

interface NFTMintingProps {
  selectedPioneerType?: PioneerType
  onMintComplete?: (tokenId: bigint, pioneerData: any) => void
  onError?: (error: Error) => void
}

export function NFTMinting({ selectedPioneerType, onMintComplete, onError }: NFTMintingProps) {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const [mintStep, setMintStep] = useState<'idle' | 'minting' | 'confirming' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  // Contract hooks
  const { data: hasPioneer, isLoading: hasPioneerLoading } = useHasPioneer(address, chainId)
  const { data: playerPioneerTokenId } = usePlayerPioneer(address, chainId)
  const { data: pioneerData, isLoading: pioneerDataLoading } = usePioneerData(playerPioneerTokenId, chainId)
  const { data: totalSupply } = useTotalSupply(chainId)
  const { name: contractName, symbol: contractSymbol } = useContractInfo(chainId)
  
  // Minting hooks
  const { mintPioneer, hash, error: mintError, isPending } = useMintPioneer()
  const { data: receipt, isLoading: isConfirming, error: receiptError } = useMintTransactionReceipt(hash)

  // Check if chain is supported
  const isChainSupported = chainId ? isSupportedChain(chainId) : false
  const networkConfig = isChainSupported && chainId ? getNetworkConfig(chainId) : null

  // Handle minting process
  const handleMint = async () => {
    if (!address || !selectedPioneerType || !isChainSupported || !chainId) return

    try {
      setMintStep('minting')
      setErrorMessage('')
      
      await mintPioneer(selectedPioneerType, address, chainId)
    } catch (error) {
      console.error('Minting error:', error)
      setMintStep('error')
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error occurred')
      onError?.(error instanceof Error ? error : new Error('Unknown error'))
    }
  }

  // Handle transaction receipt
  useEffect(() => {
    if (receipt && receipt.status === 'success') {
      setMintStep('success')
      // Extract token ID from logs or use the latest token ID
      const tokenId = playerPioneerTokenId || BigInt(totalSupply || 0)
      onMintComplete?.(tokenId, pioneerData)
    } else if (receipt && receipt.status === 'reverted') {
      setMintStep('error')
      setErrorMessage('Transaction was reverted')
    }
  }, [receipt, playerPioneerTokenId, totalSupply, pioneerData, onMintComplete])

  // Handle errors
  useEffect(() => {
    if (mintError) {
      setMintStep('error')
      setErrorMessage(mintError.message)
      onError?.(mintError)
    }
    if (receiptError) {
      setMintStep('error')
      setErrorMessage(receiptError.message)
      onError?.(receiptError)
    }
  }, [mintError, receiptError, onError])

  // Get pioneer type info
  const pioneerInfo = selectedPioneerType !== undefined ? getPioneerTypeInfo(selectedPioneerType) : null

  // Loading state
  if (hasPioneerLoading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Checking pioneer status...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Already has pioneer
  if (hasPioneer && pioneerData) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>Pioneer Already Minted</span>
          </CardTitle>
          <CardDescription>
            You already have a pioneer NFT in your wallet
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <img 
              src={pioneerInfo?.image || '/placeholder.jpg'} 
              alt={pioneerData.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-semibold">{pioneerData.name}</h3>
              <p className="text-sm text-muted-foreground">{pioneerData.title}</p>
              <Badge variant="secondary">{pioneerData.realm}</Badge>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>Token ID: {playerPioneerTokenId?.toString()}</p>
            <p>Minted: {new Date(Number(pioneerData.mintedAt) * 1000).toLocaleDateString()}</p>
          </div>

          {networkConfig && (
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => window.open(`${networkConfig.blockExplorers.default.url}/token/${getContractAddress(chainId)}?a=${playerPioneerTokenId}`, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View on {networkConfig.blockExplorers.default.name}
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  // Chain not supported
  if (!isChainSupported) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6">
          <Alert>
            <XCircle className="h-4 w-4" />
            <AlertDescription>
              {chainId 
                ? `This network (Chain ID: ${chainId}) is not supported. Please switch to a supported network.`
                : 'No network detected. Please connect your wallet and switch to a supported network.'
              }
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  // No wallet connected
  if (!isConnected) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6">
          <Alert>
            <XCircle className="h-4 w-4" />
            <AlertDescription>
              Please connect your wallet to mint a pioneer NFT.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  // No pioneer type selected
  if (selectedPioneerType === undefined) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6">
          <Alert>
            <XCircle className="h-4 w-4" />
            <AlertDescription>
              Please select a pioneer type to mint.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="h-5 w-5" />
          <span>Mint Pioneer NFT</span>
        </CardTitle>
        <CardDescription>
          Mint your {pioneerInfo?.name} NFT on {networkConfig?.name}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Pioneer Preview */}
        <div className="flex items-center space-x-3 p-4 border rounded-lg">
          <img 
            src={pioneerInfo?.image || '/placeholder.jpg'} 
            alt={pioneerInfo?.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <h3 className="font-semibold">{pioneerInfo?.name}</h3>
            <p className="text-sm text-muted-foreground">{pioneerInfo?.title}</p>
            <div className="flex space-x-2 mt-1">
              <Badge variant="secondary">{pioneerInfo?.realm}</Badge>
              <Badge variant="outline">{pioneerInfo?.rarity}</Badge>
            </div>
          </div>
        </div>

        {/* Contract Info */}
        <div className="text-sm text-muted-foreground space-y-1">
          <p>Contract: {contractName} ({contractSymbol})</p>
          <p>Network: {networkConfig?.name}</p>
          <p>Total Supply: {totalSupply?.toString() || '0'}</p>
        </div>

        {/* Mint Progress */}
        {mintStep !== 'idle' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>
                {mintStep === 'minting' && 'Minting...'}
                {mintStep === 'confirming' && 'Confirming...'}
                {mintStep === 'success' && 'Success!'}
                {mintStep === 'error' && 'Error'}
              </span>
              <span>
                {mintStep === 'minting' && '0%'}
                {mintStep === 'confirming' && '50%'}
                {mintStep === 'success' && '100%'}
                {mintStep === 'error' && '0%'}
              </span>
            </div>
            <Progress 
              value={
                mintStep === 'minting' ? 25 :
                mintStep === 'confirming' ? 75 :
                mintStep === 'success' ? 100 : 0
              } 
              className="h-2"
            />
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {/* Success Message */}
        {mintStep === 'success' && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Pioneer NFT minted successfully! Your NFT is now in your wallet.
            </AlertDescription>
          </Alert>
        )}

        {/* Transaction Status */}
        {hash && (
          <TransactionStatus
            hash={hash}
            chainId={chainId}
            title="Minting Pioneer NFT"
            description="Your Pioneer NFT is being minted on the blockchain"
            onSuccess={(receipt) => {
              console.log('Mint transaction confirmed:', receipt)
            }}
            onError={(error) => {
              console.error('Mint transaction failed:', error)
              setErrorMessage(error.message)
            }}
          />
        )}

        {/* Mint Button */}
        <Button 
          onClick={handleMint}
          disabled={isPending || isConfirming || mintStep === 'success'}
          className="w-full"
        >
          {isPending || isConfirming ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {isPending ? 'Minting...' : 'Confirming...'}
            </>
          ) : mintStep === 'success' ? (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Minted Successfully
            </>
          ) : (
            <>
              <Zap className="h-4 w-4 mr-2" />
              Mint Pioneer NFT
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}


