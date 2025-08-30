"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  useTotalSupply, 
  useRemainingSupply, 
  useMaxSupply, 
  useIsMintingAvailable 
} from '@/lib/hooks/usePioneerContract'
import { useChainId } from 'wagmi'
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Users, Package } from 'lucide-react'

interface SupplyTrackerProps {
  className?: string
}

export function SupplyTracker({ className = "" }: SupplyTrackerProps) {
  const chainId = useChainId()
  
  const { data: totalSupply, isLoading: totalSupplyLoading } = useTotalSupply(chainId)
  const { data: remainingSupply, isLoading: remainingSupplyLoading } = useRemainingSupply(chainId)
  const { data: maxSupply, isLoading: maxSupplyLoading } = useMaxSupply(chainId)
  const { data: isMintingAvailable, isLoading: mintingAvailableLoading } = useIsMintingAvailable(chainId)

  if (totalSupplyLoading || remainingSupplyLoading || maxSupplyLoading || mintingAvailableLoading) {
    return (
      <Card className={`bg-card/50 backdrop-blur-sm border-cyan-400/30 ${className}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-400"></div>
            <span className="text-gray-300">Loading supply data...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!totalSupply || !remainingSupply || !maxSupply) {
    return (
      <Card className={`bg-card/50 backdrop-blur-sm border-red-400/30 ${className}`}>
        <CardContent className="p-6">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Unable to load supply data. Please check your network connection.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  const totalSupplyNum = Number(totalSupply)
  const remainingSupplyNum = Number(remainingSupply)
  const maxSupplyNum = Number(maxSupply)
  const supplyPercentage = (totalSupplyNum / maxSupplyNum) * 100
  const remainingPercentage = (remainingSupplyNum / maxSupplyNum) * 100

  // Determine supply status
  const getSupplyStatus = () => {
    if (supplyPercentage >= 90) return { status: 'critical', color: 'text-red-400', icon: <AlertTriangle className="h-4 w-4" /> }
    if (supplyPercentage >= 75) return { status: 'high', color: 'text-yellow-400', icon: <TrendingUp className="h-4 w-4" /> }
    if (supplyPercentage >= 50) return { status: 'medium', color: 'text-blue-400', icon: <TrendingUp className="h-4 w-4" /> }
    return { status: 'low', color: 'text-green-400', icon: <TrendingDown className="h-4 w-4" /> }
  }

  const supplyStatus = getSupplyStatus()

  return (
    <Card className={`bg-card/50 backdrop-blur-sm border-cyan-400/30 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Package className="h-5 w-5 text-cyan-400" />
          <span>Oracle Seer Supply</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Supply Overview */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-2">
              <Users className="h-4 w-4 text-cyan-400" />
              <span className="text-sm text-gray-400">Minted</span>
            </div>
            <div className="text-2xl font-bold text-cyan-400">{totalSupplyNum.toLocaleString()}</div>
            <div className="text-xs text-gray-500">of {maxSupplyNum.toLocaleString()}</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-2">
              <Package className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-gray-400">Remaining</span>
            </div>
            <div className="text-2xl font-bold text-purple-400">{remainingSupplyNum.toLocaleString()}</div>
            <div className="text-xs text-gray-500">{remainingPercentage.toFixed(1)}% left</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Supply Progress</span>
            <span className={`font-medium ${supplyStatus.color}`}>
              {supplyPercentage.toFixed(1)}%
            </span>
          </div>
          <Progress value={supplyPercentage} className="h-3" />
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>0</span>
            <span>{maxSupplyNum.toLocaleString()}</span>
          </div>
        </div>

        {/* Status Alert */}
        <Alert className={supplyStatus.status === 'critical' ? 'border-red-500/50 bg-red-500/10' : 
                          supplyStatus.status === 'high' ? 'border-yellow-500/50 bg-yellow-500/10' : 
                          'border-green-500/50 bg-green-500/10'}>
          {supplyStatus.icon}
          <AlertDescription className={supplyStatus.color}>
            {supplyStatus.status === 'critical' && '⚠️ Supply is running critically low! Only a few Oracle Seers remain.'}
            {supplyStatus.status === 'high' && '📈 Supply is getting high. Consider minting soon!'}
            {supplyStatus.status === 'medium' && '📊 Supply is at a moderate level.'}
            {supplyStatus.status === 'low' && '📉 Supply is still abundant. Plenty of Oracle Seers available.'}
          </AlertDescription>
        </Alert>

        {/* Minting Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Minting Status:</span>
          <Badge 
            variant={isMintingAvailable ? "default" : "destructive"}
            className={isMintingAvailable ? "bg-green-500/20 text-green-300 border-green-500/30" : "bg-red-500/20 text-red-300 border-red-500/30"}
          >
            {isMintingAvailable ? (
              <>
                <CheckCircle className="h-3 w-3 mr-1" />
                Available
              </>
            ) : (
              <>
                <AlertTriangle className="h-3 w-3 mr-1" />
                Sold Out
              </>
            )}
          </Badge>
        </div>

        {/* Rarity Information */}
        <div className="bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-400/30 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-purple-300 mb-2">Rarity Information</h4>
          <div className="text-xs text-gray-300 space-y-1">
            <div>• Each Oracle Seer is unique and soulbound</div>
            <div>• Limited to {maxSupplyNum.toLocaleString()} total supply</div>
            <div>• Early minters get better Oracle accuracy</div>
            <div>• Non-transferable (soulbound) NFTs</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

