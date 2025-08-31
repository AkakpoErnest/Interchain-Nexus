"use client"

import { useState, useEffect } from "react"
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Lock, Eye, EyeOff } from "lucide-react"
import { motion } from "framer-motion"

interface ConfidentialENSMintingProps {
  onMintComplete?: (data: any) => void
  onError?: (error: Error) => void
}

export function ConfidentialENSMinting({ onMintComplete, onError }: ConfidentialENSMintingProps) {
  const { address, isConnected } = useAccount()
  const [isMinting, setIsMinting] = useState(false)
  const [mintStatus, setMintStatus] = useState<string>("")
  const [showConfidentialFeatures, setShowConfidentialFeatures] = useState(false)
  
  // Mock FHE encryption state (in real implementation, this would use Zama's FHE library)
  const [encryptedIdentityScore, setEncryptedIdentityScore] = useState<string>("")
  const [encryptedVote, setEncryptedVote] = useState<string>("")
  
  const { writeContract, data: hash, error, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  useEffect(() => {
    if (isConfirmed) {
      setIsMinting(false)
      setMintStatus("Confidential ENS Identity Guardian minted successfully!")
      
      // Store minted data with confidential features
      const mintedData = {
        type: "Confidential ENS Identity Guardian",
        tokenId: "1", // Mock token ID
        confidentialFeatures: {
          encryptedIdentityScore,
          encryptedVote,
          hasConfidentialVoting: true,
          hasConfidentialIdentity: true,
        },
        timestamp: Date.now(),
      }
      
      localStorage.setItem("mintedPioneerData", JSON.stringify(mintedData))
      localStorage.setItem("showStoryFlow", "true")
      
      onMintComplete?.(mintedData)
    }
  }, [isConfirmed, encryptedIdentityScore, encryptedVote, onMintComplete])

  useEffect(() => {
    if (error) {
      setIsMinting(false)
      setMintStatus(`Error: ${error.message}`)
      onError?.(error)
    }
  }, [error, onError])

  const handleMint = async () => {
    if (!isConnected || !address) {
      setMintStatus("Please connect your wallet first")
      return
    }

    setIsMinting(true)
    setMintStatus("Initializing confidential minting...")
    
    try {
      // Mock FHE encryption (in real implementation, this would use Zama's FHE library)
      const mockEncryptedScore = `encrypted_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const mockEncryptedVote = `encrypted_vote_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      setEncryptedIdentityScore(mockEncryptedScore)
      setEncryptedVote(mockEncryptedVote)
      
      setMintStatus("Encrypting identity data...")
      
      // Simulate encryption delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setMintStatus("Submitting confidential transaction...")
      
      // Mock contract call (in real implementation, this would call the confidential contract)
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Simulate successful minting
      setIsMinting(false)
      setMintStatus("Confidential ENS Identity Guardian minted successfully!")
      
      const mintedData = {
        type: "Confidential ENS Identity Guardian",
        tokenId: "1",
        confidentialFeatures: {
          encryptedIdentityScore: mockEncryptedScore,
          encryptedVote: mockEncryptedVote,
          hasConfidentialVoting: true,
          hasConfidentialIdentity: true,
        },
        timestamp: Date.now(),
      }
      
      localStorage.setItem("mintedPioneerData", JSON.stringify(mintedData))
      localStorage.setItem("showStoryFlow", "true")
      
      onMintComplete?.(mintedData)
      
    } catch (err) {
      setIsMinting(false)
      setMintStatus(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
      onError?.(err instanceof Error ? err : new Error('Unknown error'))
    }
  }

  const toggleConfidentialFeatures = () => {
    setShowConfidentialFeatures(!showConfidentialFeatures)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-cyan-400/30">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Shield className="h-6 w-6 text-cyan-400" />
            <CardTitle className="text-2xl font-bold text-cyan-300">
              Confidential ENS Identity Guardian
            </CardTitle>
            <Lock className="h-6 w-6 text-cyan-400" />
          </div>
          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
            Powered by Zama Protocol
          </Badge>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-gray-300 mb-4">
              Mint a confidential ENS Identity Guardian with end-to-end encryption using Zama's FHE technology.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-400/30 rounded-lg p-4">
                <h4 className="text-blue-300 font-semibold mb-2">Confidential Identity</h4>
                <p className="text-sm text-gray-400">
                  Your identity data is encrypted end-to-end, visible only to you and authorized contracts.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-green-600/20 to-cyan-600/20 border border-green-400/30 rounded-lg p-4">
                <h4 className="text-green-300 font-semibold mb-2">Private Governance</h4>
                <p className="text-sm text-gray-400">
                  Cast confidential votes on Pioneer decisions without revealing your choices.
                </p>
              </div>
            </div>
          </div>

          {mintStatus && (
            <Alert className={`border-2 ${
              mintStatus.includes("Error") 
                ? "border-red-500/50 bg-red-500/10" 
                : mintStatus.includes("successfully")
                ? "border-green-500/50 bg-green-500/10"
                : "border-blue-500/50 bg-blue-500/10"
            }`}>
              <AlertDescription className="text-center">
                {mintStatus}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col space-y-4">
            <Button
              onClick={handleMint}
              disabled={!isConnected || isMinting}
              className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white border-0 py-3 text-lg font-semibold"
            >
              {isMinting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Minting Confidentially...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Mint Confidential ENS Guardian</span>
                </div>
              )}
            </Button>

            <Button
              onClick={toggleConfidentialFeatures}
              variant="outline"
              className="w-full border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/10"
            >
              <div className="flex items-center space-x-2">
                {showConfidentialFeatures ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span>
                  {showConfidentialFeatures ? "Hide" : "Show"} Confidential Features
                </span>
              </div>
            </Button>
          </div>

          {showConfidentialFeatures && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="bg-gradient-to-r from-slate-700/50 to-slate-800/50 border border-slate-600/30 rounded-lg p-4">
                <h4 className="text-slate-300 font-semibold mb-3">Confidential Features</h4>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-slate-400">Encrypted Identity Score</label>
                    <div className="bg-slate-800/50 border border-slate-600/30 rounded p-2 mt-1">
                      <code className="text-xs text-slate-300 break-all">
                        {encryptedIdentityScore || "Not encrypted yet"}
                      </code>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-slate-400">Encrypted Vote</label>
                    <div className="bg-slate-800/50 border border-slate-600/30 rounded p-2 mt-1">
                      <code className="text-xs text-slate-300 break-all">
                        {encryptedVote || "Not encrypted yet"}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
