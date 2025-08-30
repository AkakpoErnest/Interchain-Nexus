"use client"

import { Badge } from '@/components/ui/badge'
import { Clock, Zap, AlertTriangle } from 'lucide-react'

interface NetworkSpeedIndicatorProps {
  chainId: number
  className?: string
}

export function NetworkSpeedIndicator({ chainId, className = "" }: NetworkSpeedIndicatorProps) {
  const getNetworkSpeed = (chainId: number) => {
    switch (chainId) {
      case 114: // Flare Testnet
        return {
          speed: 'slow',
          icon: <AlertTriangle className="h-3 w-3" />,
          color: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
          text: 'Slow (2-5 min)',
          description: 'Flare testnet can be slower than other networks'
        }
      case 84532: // Base Sepolia
        return {
          speed: 'fast',
          icon: <Zap className="h-3 w-3" />,
          color: 'bg-green-500/20 text-green-300 border-green-500/30',
          text: 'Fast (30s-1min)',
          description: 'Base Sepolia is typically very fast'
        }
      case 11155111: // Ethereum Sepolia
        return {
          speed: 'medium',
          icon: <Clock className="h-3 w-3" />,
          color: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
          text: 'Medium (1-3 min)',
          description: 'Ethereum Sepolia has moderate confirmation times'
        }
      case 314159: // Filecoin Calibration
        return {
          speed: 'medium',
          icon: <Clock className="h-3 w-3" />,
          color: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
          text: 'Medium (1-3 min)',
          description: 'Filecoin Calibration has moderate confirmation times'
        }
      default:
        return {
          speed: 'unknown',
          icon: <Clock className="h-3 w-3" />,
          color: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
          text: 'Unknown',
          description: 'Network speed unknown'
        }
    }
  }

  const speedInfo = getNetworkSpeed(chainId)

  return (
    <Badge 
      variant="outline" 
      className={`${speedInfo.color} ${className}`}
      title={speedInfo.description}
    >
      {speedInfo.icon}
      <span className="ml-1">{speedInfo.text}</span>
    </Badge>
  )
}

