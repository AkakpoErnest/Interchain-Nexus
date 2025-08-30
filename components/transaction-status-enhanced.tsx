"use client"

import { useState, useEffect } from 'react'
import { Hash } from 'viem'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ExternalLink, Clock, Zap, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import { getNetworkConfig } from '@/lib/blockchain'

interface TransactionStatusEnhancedProps {
  hash: Hash
  chainId: number
  title: string
  description: string
  onSuccess?: (receipt: any) => void
  onError?: (error: Error) => void
}

export function TransactionStatusEnhanced({ 
  hash, 
  chainId, 
  title, 
  description, 
  onSuccess, 
  onError 
}: TransactionStatusEnhancedProps) {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [estimatedTime, setEstimatedTime] = useState(0)
  const [status, setStatus] = useState<'pending' | 'confirming' | 'success' | 'error'>('pending')
  const [progress, setProgress] = useState(0)

  const networkConfig = getNetworkConfig(chainId)
  const blockExplorerUrl = `${networkConfig.blockExplorers.default.url}/tx/${hash}`

  // Get network-specific timing estimates
  const getNetworkTiming = (chainId: number) => {
    switch (chainId) {
      case 114: // Flare Testnet - slower
        return { estimated: 180, warning: 300, critical: 600 } // 3-10 minutes
      case 84532: // Base Sepolia - fast
        return { estimated: 30, warning: 60, critical: 120 } // 30s-2min
      case 11155111: // Ethereum Sepolia - medium
        return { estimated: 60, warning: 120, critical: 300 } // 1-5 minutes
      case 314159: // Filecoin Calibration - medium
        return { estimated: 90, warning: 180, critical: 360 } // 1.5-6 minutes
      default:
        return { estimated: 60, warning: 120, critical: 300 }
    }
  }

  const timing = getNetworkTiming(chainId)

  // Update elapsed time
  useEffect(() => {
    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000)
      setElapsedTime(elapsed)
      
      // Update progress based on elapsed time
      if (elapsed < timing.estimated) {
        setProgress(Math.min((elapsed / timing.estimated) * 75, 75))
        setStatus('pending')
      } else if (elapsed < timing.warning) {
        setProgress(Math.min(75 + ((elapsed - timing.estimated) / (timing.warning - timing.estimated)) * 20, 95))
        setStatus('confirming')
      } else {
        setProgress(95)
        setStatus('confirming')
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [timing])

  // Format time display
  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  // Get status color and icon
  const getStatusInfo = () => {
    if (elapsedTime > timing.critical) {
      return {
        color: 'text-red-400',
        icon: <AlertTriangle className="h-4 w-4" />,
        message: 'Transaction is taking longer than expected. This may be due to network congestion.'
      }
    } else if (elapsedTime > timing.warning) {
      return {
        color: 'text-yellow-400',
        icon: <Clock className="h-4 w-4" />,
        message: 'Transaction is taking longer than usual. Please be patient.'
      }
    } else {
      return {
        color: 'text-blue-400',
        icon: <Zap className="h-4 w-4" />,
        message: 'Transaction is being processed on the blockchain.'
      }
    }
  }

  const statusInfo = getStatusInfo()

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {statusInfo.icon}
          <span className={statusInfo.color}>{title}</span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Network Info */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span>{networkConfig.name}</span>
          </Badge>
          <span className="text-sm text-muted-foreground">Chain ID: {chainId}</span>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className={statusInfo.color}>
              {status === 'pending' && 'Submitting...'}
              {status === 'confirming' && 'Confirming...'}
              {status === 'success' && 'Confirmed!'}
              {status === 'error' && 'Failed'}
            </span>
            <span className="text-muted-foreground">{progress.toFixed(0)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Timing Info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Elapsed:</span>
            <div className="font-mono">{formatTime(elapsedTime)}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Est. Time:</span>
            <div className="font-mono">{formatTime(timing.estimated)}</div>
          </div>
        </div>

        {/* Status Message */}
        <Alert>
          {statusInfo.icon}
          <AlertDescription className={statusInfo.color}>
            {statusInfo.message}
          </AlertDescription>
        </Alert>

        {/* Transaction Hash */}
        <div className="space-y-2">
          <span className="text-sm text-muted-foreground">Transaction Hash:</span>
          <div className="font-mono text-xs bg-muted p-2 rounded break-all">
            {hash}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => window.open(blockExplorerUrl, '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View on Explorer
          </Button>
        </div>

        {/* Network-specific tips */}
        {chainId === 114 && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Flare Testnet Tip:</strong> This network can be slower than others. 
              Transactions typically take 2-5 minutes to confirm. Please be patient!
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}

