'use client'

import { useState, useEffect } from 'react'
import { Hash } from 'viem'
import { useWaitForTransactionReceipt } from 'wagmi'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Loader2, 
  CheckCircle, 
  XCircle, 
  ExternalLink, 
  Clock, 
  Zap,
  AlertTriangle,
  Info
} from 'lucide-react'
import { getNetworkConfig } from '@/lib/blockchain'

interface TransactionStatusProps {
  hash: Hash
  chainId: number
  onSuccess?: (receipt: any) => void
  onError?: (error: Error) => void
  onTimeout?: () => void
  timeoutMs?: number
  title?: string
  description?: string
}

type TransactionState = 'pending' | 'confirming' | 'success' | 'error' | 'timeout'

export function TransactionStatus({
  hash,
  chainId,
  onSuccess,
  onError,
  onTimeout,
  timeoutMs = 300000, // 5 minutes default
  title = 'Transaction Status',
  description = 'Your transaction is being processed'
}: TransactionStatusProps) {
  const [state, setState] = useState<TransactionState>('pending')
  const [startTime, setStartTime] = useState<number>(Date.now())
  const [elapsedTime, setElapsedTime] = useState<number>(0)

  const { data: receipt, isLoading, error } = useWaitForTransactionReceipt({
    hash,
    timeout: timeoutMs,
  })

  const networkConfig = getNetworkConfig(chainId)

  // Update elapsed time
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Date.now() - startTime)
    }, 1000)

    return () => clearInterval(interval)
  }, [startTime])

  // Handle transaction receipt
  useEffect(() => {
    if (receipt) {
      if (receipt.status === 'success') {
        setState('success')
        onSuccess?.(receipt)
      } else {
        setState('error')
        onError?.(new Error('Transaction was reverted'))
      }
    }
  }, [receipt, onSuccess, onError])

  // Handle errors
  useEffect(() => {
    if (error) {
      setState('error')
      onError?.(error)
    }
  }, [error, onError])

  // Handle timeout
  useEffect(() => {
    if (elapsedTime > timeoutMs && state === 'pending') {
      setState('timeout')
      onTimeout?.()
    }
  }, [elapsedTime, timeoutMs, state, onTimeout])

  // Update state based on loading status
  useEffect(() => {
    if (isLoading && state === 'pending') {
      setState('confirming')
    }
  }, [isLoading, state])

  const getProgressValue = () => {
    switch (state) {
      case 'pending': return 25
      case 'confirming': return 75
      case 'success': return 100
      case 'error': return 0
      case 'timeout': return 0
      default: return 0
    }
  }

  const getStatusIcon = () => {
    switch (state) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />
      case 'confirming':
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />
      case 'timeout':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />
      default:
        return <Info className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusText = () => {
    switch (state) {
      case 'pending':
        return 'Transaction Submitted'
      case 'confirming':
        return 'Confirming Transaction'
      case 'success':
        return 'Transaction Confirmed'
      case 'error':
        return 'Transaction Failed'
      case 'timeout':
        return 'Transaction Timeout'
      default:
        return 'Unknown Status'
    }
  }

  const getStatusColor = () => {
    switch (state) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'confirming':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'success':
        return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'error':
        return 'bg-red-500/20 text-red-300 border-red-500/30'
      case 'timeout':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`
    }
    return `${remainingSeconds}s`
  }

  const getBlockExplorerUrl = () => {
    if (!networkConfig) return null
    return `${networkConfig.blockExplorers.default.url}/tx/${hash}`
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {getStatusIcon()}
          <span>{title}</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Badge */}
        <div className="flex justify-center">
          <Badge className={`${getStatusColor()} px-4 py-2`}>
            {getStatusText()}
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Progress</span>
            <span>{getProgressValue()}%</span>
          </div>
          <Progress value={getProgressValue()} className="h-2" />
        </div>

        {/* Transaction Hash */}
        <div className="text-sm">
          <p className="text-muted-foreground mb-1">Transaction Hash:</p>
          <p className="font-mono text-xs break-all bg-slate-800 p-2 rounded">
            {hash}
          </p>
        </div>

        {/* Network Info */}
        {networkConfig && (
          <div className="text-sm text-muted-foreground">
            <p>Network: {networkConfig.name}</p>
            <p>Chain ID: {chainId}</p>
          </div>
        )}

        {/* Elapsed Time */}
        <div className="text-sm text-muted-foreground">
          <p>Elapsed Time: {formatTime(elapsedTime)}</p>
        </div>

        {/* Receipt Info */}
        {receipt && (
          <div className="text-sm">
            <p className="text-muted-foreground mb-1">Transaction Receipt:</p>
            <div className="bg-slate-800 p-2 rounded space-y-1">
              <p>Block Number: {receipt.blockNumber?.toString()}</p>
              <p>Gas Used: {receipt.gasUsed?.toString()}</p>
              <p>Status: {receipt.status === 'success' ? 'Success' : 'Failed'}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {state === 'error' && error && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>
              {error.message || 'Transaction failed'}
            </AlertDescription>
          </Alert>
        )}

        {/* Timeout Message */}
        {state === 'timeout' && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Transaction is taking longer than expected. It may still be processing.
            </AlertDescription>
          </Alert>
        )}

        {/* Success Message */}
        {state === 'success' && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Transaction confirmed successfully!
            </AlertDescription>
          </Alert>
        )}

        {/* Block Explorer Link */}
        {getBlockExplorerUrl() && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => window.open(getBlockExplorerUrl(), '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View on {networkConfig?.blockExplorers.default.name}
          </Button>
        )}

        {/* Action Buttons */}
        {state === 'timeout' && (
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => {
                setState('pending')
                setStartTime(Date.now())
                setElapsedTime(0)
              }}
            >
              <Zap className="h-4 w-4 mr-2" />
              Retry
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => window.open(getBlockExplorerUrl(), '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Check Status
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Hook for transaction status
export function useTransactionStatus(hash: Hash | undefined, chainId: number) {
  const [state, setState] = useState<TransactionState>('pending')
  const [receipt, setReceipt] = useState<any>(null)
  const [error, setError] = useState<Error | null>(null)

  const { data: txReceipt, isLoading, error: txError } = useWaitForTransactionReceipt({
    hash,
    timeout: 300000, // 5 minutes
  })

  useEffect(() => {
    if (txReceipt) {
      if (txReceipt.status === 'success') {
        setState('success')
        setReceipt(txReceipt)
      } else {
        setState('error')
        setError(new Error('Transaction was reverted'))
      }
    }
  }, [txReceipt])

  useEffect(() => {
    if (txError) {
      setState('error')
      setError(txError)
    }
  }, [txError])

  useEffect(() => {
    if (isLoading && state === 'pending') {
      setState('confirming')
    }
  }, [isLoading, state])

  return {
    state,
    receipt,
    error,
    isLoading,
    isSuccess: state === 'success',
    isError: state === 'error',
    isPending: state === 'pending',
    isConfirming: state === 'confirming',
  }
}
