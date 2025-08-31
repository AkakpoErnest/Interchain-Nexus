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
  useRemainingSupply,
  useMaxSupply,
  useIsMintingAvailable,
  useContractInfo
} from '@/lib/hooks/usePioneerContract'
import { 
  PioneerType, 
  getPioneerTypeInfo, 
  isSupportedChain,
  getNetworkConfig 
} from '@/lib/blockchain'
import { getContractAddress } from '@/lib/contract-config'
import { Loader2, CheckCircle, XCircle, ExternalLink, Zap, Sparkles, Trophy } from 'lucide-react'
import { TransactionStatusEnhanced } from './transaction-status-enhanced'
import { NetworkSwitcher } from './network-switcher'
import { Confetti } from './confetti'
import { SoundEffects } from './sound-effects'

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
  const [showConfetti, setShowConfetti] = useState(false)
  const [playSuccessSound, setPlaySuccessSound] = useState(false)

  // Contract hooks
  const { data: hasPioneer, isLoading: hasPioneerLoading } = useHasPioneer(address, chainId)
  const { data: playerPioneerTokenId } = usePlayerPioneer(address, chainId)
  const { data: pioneerData, isLoading: pioneerDataLoading } = usePioneerData(playerPioneerTokenId, chainId)
  const { data: totalSupply } = useTotalSupply(chainId)
  const { data: remainingSupply } = useRemainingSupply(chainId)
  const { data: maxSupply } = useMaxSupply(chainId)
  const { data: isMintingAvailable } = useIsMintingAvailable(chainId)
  const { name: contractName, symbol: contractSymbol } = useContractInfo(chainId)
  
  // Minting hooks
  const { mintPioneer, hash, error: mintError, isPending } = useMintPioneer()
  const { data: receipt, isLoading: isConfirming, error: receiptError } = useMintTransactionReceipt(hash)

  // Check if chain is supported
  const isChainSupported = chainId ? isSupportedChain(chainId) : false
  const networkConfig = isChainSupported && chainId ? getNetworkConfig(chainId) : null

  // Get pioneer type info
  const pioneerInfo = selectedPioneerType !== undefined ? getPioneerTypeInfo(selectedPioneerType) : null

  // Always allow minting - no supply limit
  const calculatedMintingAvailable = true

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
      setShowConfetti(true)
      setPlaySuccessSound(true)
      
      // Extract token ID from logs or use the latest token ID
      const tokenId = playerPioneerTokenId || BigInt(totalSupply || 0)
      
      // Store the minted pioneer data for story flow
      const mintedPioneerData = {
        id: selectedPioneerType,
        name: pioneerInfo?.name || 'Unknown Pioneer',
        title: pioneerInfo?.title || 'Unknown Title',
        realm: pioneerInfo?.realm || 'Unknown Realm',
        rarity: pioneerInfo?.rarity || 'Common',
        stats: { community: 50, innovation: 50, engagement: 50 },
        image: pioneerInfo?.image || '/placeholder.jpg',
        description: pioneerInfo?.description || 'A mysterious pioneer from the interchain.',
        lore: 'Born from the digital realm, this pioneer seeks to restore balance to the Interchain Nexus.',
        story: 'Your journey begins now. As a newly minted pioneer, you hold the power to shape the future of the Interchain Nexus. The fractured realms await your arrival, and only you can restore the harmony that once existed between all blockchain ecosystems.',
        abilities: ['Blockchain Navigation', 'Cross-Chain Communication', 'Protocol Mastery'],
        mission: 'Restore balance to the Interchain Nexus and unite all blockchain ecosystems.',
        passiveBuff: `${pioneerInfo?.realm} puzzles get +25% success rate`
      }
      
      // Store pioneer data for story flow
      localStorage.setItem('mintedPioneerData', JSON.stringify(mintedPioneerData))
      localStorage.setItem('showStoryFlow', 'true')
      
      // Redirect to story page after a short delay
      setTimeout(() => {
        window.location.href = '/story'
      }, 2000)
      
      onMintComplete?.(tokenId, mintedPioneerData)
    } else if (receipt && receipt.status === 'reverted') {
      setMintStep('error')
      setErrorMessage('Transaction was reverted')
    }
  }, [receipt, playerPioneerTokenId, totalSupply, pioneerInfo, onMintComplete])

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
        {/* Network Switcher */}
        {selectedPioneerType !== undefined && (
          <NetworkSwitcher 
            pioneerType={selectedPioneerType}
            onNetworkSwitched={() => {
              console.log('Network switched successfully')
            }}
            onError={(error) => {
              console.error('Network switch error:', error)
              setErrorMessage(error.message)
            }}
          />
        )}
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
          <p>Total Supply: {totalSupply?.toString() || '0'} / Unlimited</p>
          <p>Remaining: Unlimited</p>
          <div className="flex items-center space-x-2">
            <span>Status:</span>
            <Badge 
              variant={calculatedMintingAvailable ? "default" : "destructive"}
              className={calculatedMintingAvailable ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}
            >
              {calculatedMintingAvailable ? "Available" : "Sold Out"}
            </Badge>
          </div>
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
          <div className="space-y-4">
            <Alert className="border-green-500/50 bg-green-500/10">
              <Trophy className="h-4 w-4 text-green-400" />
              <AlertDescription className="text-green-300">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-yellow-400" />
                    <span className="font-semibold">Mint Successful!</span>
                  </div>
                  <p>Your {pioneerInfo?.name} NFT has been successfully minted and is now in your wallet!</p>
                  <p className="text-sm text-green-200">
                    Token ID: {playerPioneerTokenId?.toString() || 'Loading...'}
                  </p>
                </div>
              </AlertDescription>
            </Alert>
            
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                🎉 Congratulations! You are now a Pioneer of the Interchain Nexus!
              </p>
              <p className="text-xs text-muted-foreground">
                Redirecting to your story in a moment...
              </p>
            </div>
          </div>
        )}

        {/* Transaction Status */}
        {hash && (
          <TransactionStatusEnhanced
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
          disabled={isPending || isConfirming || mintStep === 'success' || !calculatedMintingAvailable}
          className="w-full"
        >
          {isPending || isConfirming ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {isPending ? 'Minting...' : 'Confirming...'}
            </>
          ) : mintStep === 'success' ? (
            <>
              <Trophy className="h-4 w-4 mr-2 text-yellow-400" />
              <span className="text-green-400">Minted Successfully!</span>
            </>
          ) : (
            <>
              <Zap className="h-4 w-4 mr-2" />
              Mint Pioneer NFT
            </>
          )}
        </Button>
      </CardContent>
      
      {/* Confetti Animation */}
      <Confetti 
        trigger={showConfetti} 
        onComplete={() => setShowConfetti(false)}
      />
      
      {/* Sound Effects */}
      <SoundEffects playSuccess={playSuccessSound} />
    </Card>
  )
}


