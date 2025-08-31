'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { parseEther } from 'viem'
import { PioneerType, getPioneerTypeInfo, getChainIdForPioneerType } from '@/lib/blockchain'
import { CONTRACT_ADDRESSES } from '@/lib/contract-config'

// Citrea Governance Guardian ABI
const CITREA_GOVERNANCE_GUARDIAN_ABI = [
  {
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'player', type: 'address' }],
    name: 'hasGovernanceGuardian',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'player', type: 'address' }],
    name: 'getPlayerGovernanceGuardian',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'getGovernanceGuardianData',
    outputs: [
      {
        components: [
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'string', name: 'title', type: 'string' },
          { internalType: 'string', name: 'realm', type: 'string' },
          { internalType: 'string', name: 'rarity', type: 'string' },
          { internalType: 'uint256', name: 'mintedAt', type: 'uint256' },
          { internalType: 'bool', name: 'isActive', type: 'bool' },
          { internalType: 'uint256', name: 'proposalsCreated', type: 'uint256' },
          { internalType: 'uint256', name: 'votesCast', type: 'uint256' },
          { internalType: 'uint256', name: 'zkProofsVerified', type: 'uint256' },
          { internalType: 'uint256', name: 'governanceScore', type: 'uint256' },
          { internalType: 'uint256', name: 'bitcoinConnections', type: 'uint256' },
        ],
        internalType: 'struct CitreaGovernanceGuardian.GovernanceGuardianData',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'player', type: 'address' },
      { internalType: 'string', name: 'name', type: 'string' },
      { internalType: 'string', name: 'title', type: 'string' }
    ],
    name: 'mintGovernanceGuardian',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: 'proposalTitle', type: 'string' },
      { internalType: 'uint256', name: 'proposalId', type: 'uint256' }
    ],
    name: 'createProposal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'proposalId', type: 'uint256' },
      { internalType: 'bool', name: 'support', type: 'bool' }
    ],
    name: 'castVote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: 'proofType', type: 'string' }],
    name: 'verifyZKProof',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: 'connectionType', type: 'string' }],
    name: 'makeBitcoinConnection',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'player', type: 'address' },
      { indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { indexed: false, internalType: 'string', name: 'name', type: 'string' }
    ],
    name: 'GovernanceGuardianMinted',
    type: 'event',
  },
] as const

interface CitreaGovernanceGuardianProps {
  onMintSuccess?: () => void
}

export default function CitreaGovernanceGuardian({ onMintSuccess }: CitreaGovernanceGuardianProps) {
  const { address, isConnected, chainId } = useAccount()
  const [guardianName, setGuardianName] = useState('')
  const [guardianTitle, setGuardianTitle] = useState('')
  const [isMinting, setIsMinting] = useState(false)
  const [hasGuardian, setHasGuardian] = useState(false)
  const [guardianData, setGuardianData] = useState<any>(null)
  const [proposalTitle, setProposalTitle] = useState('')
  const [proposalId, setProposalId] = useState('')
  const [proofType, setProofType] = useState('')
  const [connectionType, setConnectionType] = useState('')

  const citreaChainId = getChainIdForPioneerType(PioneerType.GOVERNANCE_GUARDIAN)
  const contractAddress = CONTRACT_ADDRESSES[citreaChainId as keyof typeof CONTRACT_ADDRESSES]?.pioneer

  // Check if user has a Governance Guardian
  const { data: hasGuardianData } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: CITREA_GOVERNANCE_GUARDIAN_ABI,
    functionName: 'hasGovernanceGuardian',
    args: address ? [address] : undefined,
    chainId: citreaChainId,
  })

  // Get user's token ID if they have a guardian
  const { data: tokenId } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: CITREA_GOVERNANCE_GUARDIAN_ABI,
    functionName: 'getPlayerGovernanceGuardian',
    args: address ? [address] : undefined,
    chainId: citreaChainId,
    query: { enabled: !!hasGuardianData && hasGuardianData },
  })

  // Get guardian data if user has one
  const { data: guardianDataFromContract } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: CITREA_GOVERNANCE_GUARDIAN_ABI,
    functionName: 'getGovernanceGuardianData',
    args: tokenId ? [tokenId] : undefined,
    chainId: citreaChainId,
    query: { enabled: !!tokenId },
  })

  // Mint Governance Guardian
  const { writeContract: mintGuardian, data: mintHash } = useWriteContract()
  const { isLoading: isMintConfirming, isSuccess: isMintConfirmed } = useWaitForTransactionReceipt({
    hash: mintHash,
  })

  // Create Proposal
  const { writeContract: createProposal, data: proposalHash } = useWriteContract()
  const { isLoading: isProposalConfirming, isSuccess: isProposalConfirmed } = useWaitForTransactionReceipt({
    hash: proposalHash,
  })

  // Cast Vote
  const { writeContract: castVote, data: voteHash } = useWriteContract()
  const { isLoading: isVoteConfirming, isSuccess: isVoteConfirmed } = useWaitForTransactionReceipt({
    hash: voteHash,
  })

  // Verify ZK Proof
  const { writeContract: verifyProof, data: proofHash } = useWriteContract()
  const { isLoading: isProofConfirming, isSuccess: isProofConfirmed } = useWaitForTransactionReceipt({
    hash: proofHash,
  })

  // Make Bitcoin Connection
  const { writeContract: makeConnection, data: connectionHash } = useWriteContract()
  const { isLoading: isConnectionConfirming, isSuccess: isConnectionConfirmed } = useWaitForTransactionReceipt({
    hash: connectionHash,
  })

  useEffect(() => {
    if (hasGuardianData !== undefined) {
      setHasGuardian(hasGuardianData)
    }
  }, [hasGuardianData])

  useEffect(() => {
    if (guardianDataFromContract) {
      setGuardianData(guardianDataFromContract)
    }
  }, [guardianDataFromContract])

  useEffect(() => {
    if (isMintConfirmed && onMintSuccess) {
      onMintSuccess()
    }
  }, [isMintConfirmed, onMintSuccess])

  const handleMintGuardian = async () => {
    if (!address || !guardianName || !guardianTitle) return

    setIsMinting(true)
    try {
      await mintGuardian({
        address: contractAddress as `0x${string}`,
        abi: CITREA_GOVERNANCE_GUARDIAN_ABI,
        functionName: 'mintGovernanceGuardian',
        args: [address, guardianName, guardianTitle],
        chainId: citreaChainId,
      })
    } catch (error) {
      console.error('Error minting Governance Guardian:', error)
    } finally {
      setIsMinting(false)
    }
  }

  const handleCreateProposal = async () => {
    if (!address || !proposalTitle || !proposalId) return

    try {
      await createProposal({
        address: contractAddress as `0x${string}`,
        abi: CITREA_GOVERNANCE_GUARDIAN_ABI,
        functionName: 'createProposal',
        args: [proposalTitle, BigInt(proposalId)],
        chainId: citreaChainId,
      })
    } catch (error) {
      console.error('Error creating proposal:', error)
    }
  }

  const handleCastVote = async (proposalId: string, support: boolean) => {
    if (!address) return

    try {
      await castVote({
        address: contractAddress as `0x${string}`,
        abi: CITREA_GOVERNANCE_GUARDIAN_ABI,
        functionName: 'castVote',
        args: [BigInt(proposalId), support],
        chainId: citreaChainId,
      })
    } catch (error) {
      console.error('Error casting vote:', error)
    }
  }

  const handleVerifyZKProof = async () => {
    if (!address || !proofType) return

    try {
      await verifyProof({
        address: contractAddress as `0x${string}`,
        abi: CITREA_GOVERNANCE_GUARDIAN_ABI,
        functionName: 'verifyZKProof',
        args: [proofType],
        chainId: citreaChainId,
      })
    } catch (error) {
      console.error('Error verifying ZK proof:', error)
    }
  }

  const handleMakeBitcoinConnection = async () => {
    if (!address || !connectionType) return

    try {
      await makeConnection({
        address: contractAddress as `0x${string}`,
        abi: CITREA_GOVERNANCE_GUARDIAN_ABI,
        functionName: 'makeBitcoinConnection',
        args: [connectionType],
        chainId: citreaChainId,
      })
    } catch (error) {
      console.error('Error making Bitcoin connection:', error)
    }
  }

  const pioneerInfo = getPioneerTypeInfo(PioneerType.GOVERNANCE_GUARDIAN)

  if (!isConnected) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Citrea Governance Guardian</CardTitle>
          <CardDescription className="text-center">
            Connect your wallet to access Bitcoin governance through ZK rollup technology
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              Please connect your wallet to interact with the Citrea Governance Guardian realm.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (chainId !== citreaChainId) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Citrea Governance Guardian</CardTitle>
          <CardDescription className="text-center">
            Switch to Citrea Testnet to access Bitcoin governance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              Please switch to Citrea Testnet (Chain ID: {citreaChainId}) to interact with the Governance Guardian.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (!hasGuardian) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">{pioneerInfo.name}</CardTitle>
          <CardDescription className="text-center">{pioneerInfo.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <Badge variant="secondary" className="mb-2">
              {pioneerInfo.rarity}
            </Badge>
            <p className="text-sm text-muted-foreground">
              {pioneerInfo.title} • {pioneerInfo.realm}
            </p>
          </div>
          
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Guardian Name"
              value={guardianName}
              onChange={(e) => setGuardianName(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Guardian Title"
              value={guardianTitle}
              onChange={(e) => setGuardianTitle(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <Button
            onClick={handleMintGuardian}
            disabled={isMinting || isMintConfirming || !guardianName || !guardianTitle}
            className="w-full"
          >
            {isMinting || isMintConfirming ? 'Minting...' : 'Mint Governance Guardian'}
          </Button>

          {isMintConfirmed && (
            <Alert>
              <AlertDescription>
                Governance Guardian minted successfully! You can now participate in Bitcoin governance.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">{pioneerInfo.name}</CardTitle>
        <CardDescription className="text-center">
          {guardianData?.name} • {guardianData?.title}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Guardian Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{guardianData?.proposalsCreated || 0}</div>
            <div className="text-sm text-muted-foreground">Proposals</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{guardianData?.votesCast || 0}</div>
            <div className="text-sm text-muted-foreground">Votes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{guardianData?.zkProofsVerified || 0}</div>
            <div className="text-sm text-muted-foreground">ZK Proofs</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{guardianData?.bitcoinConnections || 0}</div>
            <div className="text-sm text-muted-foreground">BTC Connections</div>
          </div>
        </div>

        {/* Governance Score */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Governance Score</span>
            <span>{guardianData?.governanceScore || 0}</span>
          </div>
          <Progress value={(guardianData?.governanceScore || 0) / 10} className="h-2" />
        </div>

        {/* Governance Actions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Governance Actions</h3>
          
          {/* Create Proposal */}
          <div className="space-y-2">
            <h4 className="font-medium">Create Proposal</h4>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Proposal Title"
                value={proposalTitle}
                onChange={(e) => setProposalTitle(e.target.value)}
                className="flex-1 p-2 border rounded-md"
              />
              <input
                type="number"
                placeholder="Proposal ID"
                value={proposalId}
                onChange={(e) => setProposalId(e.target.value)}
                className="w-24 p-2 border rounded-md"
              />
              <Button
                onClick={handleCreateProposal}
                disabled={isProposalConfirming || !proposalTitle || !proposalId}
                size="sm"
              >
                {isProposalConfirming ? 'Creating...' : 'Create'}
              </Button>
            </div>
          </div>

          {/* Cast Vote */}
          <div className="space-y-2">
            <h4 className="font-medium">Cast Vote</h4>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Proposal ID"
                className="w-24 p-2 border rounded-md"
                onChange={(e) => setProposalId(e.target.value)}
              />
              <Button
                onClick={() => handleCastVote(proposalId, true)}
                disabled={isVoteConfirming || !proposalId}
                size="sm"
                variant="outline"
              >
                {isVoteConfirming ? 'Voting...' : 'Support'}
              </Button>
              <Button
                onClick={() => handleCastVote(proposalId, false)}
                disabled={isVoteConfirming || !proposalId}
                size="sm"
                variant="outline"
              >
                {isVoteConfirming ? 'Voting...' : 'Oppose'}
              </Button>
            </div>
          </div>

          {/* Verify ZK Proof */}
          <div className="space-y-2">
            <h4 className="font-medium">Verify ZK Proof</h4>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Proof Type (e.g., Bitcoin Transaction)"
                value={proofType}
                onChange={(e) => setProofType(e.target.value)}
                className="flex-1 p-2 border rounded-md"
              />
              <Button
                onClick={handleVerifyZKProof}
                disabled={isProofConfirming || !proofType}
                size="sm"
              >
                {isProofConfirming ? 'Verifying...' : 'Verify'}
              </Button>
            </div>
          </div>

          {/* Make Bitcoin Connection */}
          <div className="space-y-2">
            <h4 className="font-medium">Make Bitcoin Connection</h4>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Connection Type (e.g., Lightning Network)"
                value={connectionType}
                onChange={(e) => setConnectionType(e.target.value)}
                className="flex-1 p-2 border rounded-md"
              />
              <Button
                onClick={handleMakeBitcoinConnection}
                disabled={isConnectionConfirming || !connectionType}
                size="sm"
              >
                {isConnectionConfirming ? 'Connecting...' : 'Connect'}
              </Button>
            </div>
          </div>
        </div>

        {/* Success Messages */}
        {isProposalConfirmed && (
          <Alert>
            <AlertDescription>
              Proposal created successfully! Your governance score has increased.
            </AlertDescription>
          </Alert>
        )}

        {isVoteConfirmed && (
          <Alert>
            <AlertDescription>
              Vote cast successfully! Your participation in governance has been recorded.
            </AlertDescription>
          </Alert>
        )}

        {isProofConfirmed && (
          <Alert>
            <AlertDescription>
              ZK proof verified successfully! You've contributed to Bitcoin's security.
            </AlertDescription>
          </Alert>
        )}

        {isConnectionConfirmed && (
          <Alert>
            <AlertDescription>
              Bitcoin connection established! You've strengthened the Bitcoin ecosystem.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
