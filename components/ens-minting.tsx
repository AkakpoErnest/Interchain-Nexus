'use client'

import { useState, useEffect } from 'react'
import { useAccount, useChainId } from 'wagmi'
import { Address } from 'viem'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  useHasPioneer, 
  usePlayerPioneer, 
  usePioneerData, 
  useMintPioneer, 
  useMintTransactionReceipt,
  useTotalSupply,
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
import { Loader2, CheckCircle, XCircle, ExternalLink, Shield, User, Globe, Star } from 'lucide-react'
import { TransactionStatusEnhanced } from './transaction-status-enhanced'
import { NetworkSwitcher } from './network-switcher'

interface ENSMintingProps {
  onMintComplete?: (tokenId: bigint, pioneerData: any) => void
  onError?: (error: Error) => void
}

export function ENSMinting({ onMintComplete, onError }: ENSMintingProps) {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const [mintStep, setMintStep] = useState<'idle' | 'minting' | 'confirming' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [guardianName, setGuardianName] = useState<string>('')
  const [guardianTitle, setGuardianTitle] = useState<string>('')

  // ENS-specific chain ID (Ethereum Sepolia)
  const ensChainId = 11155111

  // Contract hooks
  const { data: hasPioneer, isLoading: hasPioneerLoading } = useHasPioneer(address, ensChainId)
  const { data: playerPioneerTokenId } = usePlayerPioneer(address, ensChainId)
  const { data: pioneerData, isLoading: pioneerDataLoading } = usePioneerData(playerPioneerTokenId, ensChainId)
  const { data: totalSupply } = useTotalSupply(ensChainId)
  const { data: isMintingAvailable } = useIsMintingAvailable(ensChainId)
  const { name: contractName, symbol: contractSymbol } = useContractInfo(ensChainId)
  
  // Minting hooks
  const { mintPioneer, hash, error: mintError, isPending } = useMintPioneer()
  const { data: receipt, isLoading: isConfirming, error: receiptError } = useMintTransactionReceipt(hash)

  // Check if chain is supported
  const isChainSupported = isSupportedChain(ensChainId)
  const networkConfig = getNetworkConfig(ensChainId)

  // Get ENS Identity Guardian info
  const pioneerInfo = getPioneerTypeInfo(PioneerType.IDENTITY_GUARDIAN)

  // Handle minting process
  const handleMint = async () => {
    if (!address || !isChainSupported || !guardianName.trim() || !guardianTitle.trim()) return

    try {
      setMintStep('minting')
      setErrorMessage('')
      
      await mintPioneer(PioneerType.IDENTITY_GUARDIAN, address, ensChainId)
    } catch (error) {
      console.error('ENS Minting error:', error)
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
      
      // Store the minted pioneer data for story flow
      const mintedPioneerData = {
        id: PioneerType.IDENTITY_GUARDIAN,
        name: guardianName || pioneerInfo?.name || 'Identity Guardian',
        title: guardianTitle || pioneerInfo?.title || 'Keeper of Names',
        realm: pioneerInfo?.realm || 'ENS',
        rarity: pioneerInfo?.rarity || 'Epic',
        stats: { 
          domainsManaged: 0, 
          identitiesVerified: 0, 
          attestationsIssued: 0, 
          trustScore: 100 
        },
        image: pioneerInfo?.image || '/ens_identity_guardian_card_refined.png',
        description: pioneerInfo?.description || 'A guardian of digital identity and name resolution.',
        lore: 'Born from the realm of names, this guardian seeks to protect and manage digital identities across the Interchain Nexus.',
        story: 'Your journey as an Identity Guardian begins now. You hold the power to manage ENS domains, verify identities, and issue attestations. The fractured Name Realm awaits your arrival, and only you can restore the harmony of digital identity.',
        abilities: ['Domain Management', 'Identity Verification', 'Attestation Issuance', 'Trust Building'],
        mission: 'Protect digital identities and restore order to the Name Realm.',
        passiveBuff: 'ENS puzzles get +25% success rate'
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
  }, [receipt, playerPioneerTokenId, totalSupply, pioneerInfo, guardianName, guardianTitle, onMintComplete])

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

  // Loading state
  if (hasPioneerLoading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Checking Identity Guardian status...</span>
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
            <span>Identity Guardian Already Minted</span>
          </CardTitle>
          <CardDescription>
            You already have an Identity Guardian NFT in your wallet
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <img 
              src={pioneerInfo?.image || '/ens_identity_guardian_card_refined.png'} 
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

          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => window.open(`${networkConfig.blockExplorers.default.url}/token/${getContractAddress(ensChainId)}?a=${playerPioneerTokenId}`, '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View on {networkConfig.blockExplorers.default.name}
          </Button>
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
              Please connect your wallet to mint an Identity Guardian NFT.
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
          <Shield className="h-5 w-5" />
          <span>Mint Identity Guardian NFT</span>
        </CardTitle>
        <CardDescription>
          Mint your {pioneerInfo?.name} NFT on {networkConfig?.name}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Network Switcher */}
        <NetworkSwitcher 
          pioneerType={PioneerType.IDENTITY_GUARDIAN}
          onNetworkSwitched={() => {
            console.log('Network switched successfully')
          }}
          onError={(error) => {
            console.error('Network switch error:', error)
            setErrorMessage(error.message)
          }}
        />

        {/* Guardian Customization */}
        <div className="space-y-3">
          <div>
            <Label htmlFor="guardianName">Guardian Name</Label>
            <Input
              id="guardianName"
              placeholder="Enter your guardian's name"
              value={guardianName}
              onChange={(e) => setGuardianName(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="guardianTitle">Guardian Title</Label>
            <Input
              id="guardianTitle"
              placeholder="Enter your guardian's title"
              value={guardianTitle}
              onChange={(e) => setGuardianTitle(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        {/* Pioneer Preview */}
        <div className="flex items-center space-x-3 p-4 border rounded-lg">
          <img 
            src={pioneerInfo?.image || '/ens_identity_guardian_card_refined.png'} 
            alt={pioneerInfo?.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <h3 className="font-semibold">{guardianName || pioneerInfo?.name}</h3>
            <p className="text-sm text-muted-foreground">{guardianTitle || pioneerInfo?.title}</p>
            <div className="flex space-x-2 mt-1">
              <Badge variant="secondary">{pioneerInfo?.realm}</Badge>
              <Badge variant="outline">{pioneerInfo?.rarity}</Badge>
            </div>
          </div>
        </div>

        {/* Identity Guardian Abilities */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Identity Guardian Abilities:</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center space-x-1">
              <Globe className="h-3 w-3" />
              <span>Domain Management</span>
            </div>
            <div className="flex items-center space-x-1">
              <User className="h-3 w-3" />
              <span>Identity Verification</span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield className="h-3 w-3" />
              <span>Attestation Issuance</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3" />
              <span>Trust Building</span>
            </div>
          </div>
        </div>

        {/* Contract Info */}
        <div className="text-sm text-muted-foreground space-y-1">
          <p>Contract: {contractName} ({contractSymbol})</p>
          <p>Network: {networkConfig?.name}</p>
          <p>Total Supply: {totalSupply?.toString() || '0'} / Unlimited</p>
          <div className="flex items-center space-x-2">
            <span>Status:</span>
            <Badge 
              variant={isMintingAvailable ? "default" : "destructive"}
              className={isMintingAvailable ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}
            >
              {isMintingAvailable ? "Available" : "Sold Out"}
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
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Identity Guardian NFT minted successfully! Your NFT is now in your wallet.
            </AlertDescription>
          </Alert>
        )}

        {/* Transaction Status */}
        {hash && (
          <TransactionStatusEnhanced
            hash={hash}
            chainId={ensChainId}
            title="Minting Identity Guardian NFT"
            description="Your Identity Guardian NFT is being minted on the blockchain"
            onSuccess={(receipt) => {
              console.log('ENS Mint transaction confirmed:', receipt)
            }}
            onError={(error) => {
              console.error('ENS Mint transaction failed:', error)
              setErrorMessage(error.message)
            }}
          />
        )}

        {/* Mint Button */}
        <Button 
          onClick={handleMint}
          disabled={isPending || isConfirming || mintStep === 'success' || !isMintingAvailable || !guardianName.trim() || !guardianTitle.trim()}
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
              <Shield className="h-4 w-4 mr-2" />
              Mint Identity Guardian NFT
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
