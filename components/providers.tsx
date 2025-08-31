'use client'

import { WagmiProvider, createConfig, http } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { injected, metaMask } from 'wagmi/connectors'
import { baseSepolia, sepolia, filecoinCalibration, flareTestnet, liskSepolia } from 'wagmi/chains'

// Create a query client
const queryClient = new QueryClient()

// Define supported chains - Lisk Sepolia first as default
const supportedChains = [liskSepolia, baseSepolia, sepolia, filecoinCalibration, flareTestnet] as const

// Create wagmi config
const config = createConfig({
  chains: supportedChains,
  connectors: [
    metaMask(), // Prioritize MetaMask specifically
    injected(), // Fallback for other injected wallets
  ],
  transports: {
    [liskSepolia.id]: http(),
    [baseSepolia.id]: http(),
    [sepolia.id]: http(),
    [filecoinCalibration.id]: http('https://api.calibration.node.glif.io/rpc/v1', {
      retryCount: 3,
      retryDelay: 1000,
    }),
    [flareTestnet.id]: http(),
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}