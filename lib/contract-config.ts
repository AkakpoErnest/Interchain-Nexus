// Contract configuration and addresses
// Update these addresses after deploying contracts to each network

export const CONTRACT_ADDRESSES = {
  // Base Mainnet
  8453: {
    pioneer: process.env.NEXT_PUBLIC_PIONEER_CONTRACT_BASE || '0x0000000000000000000000000000000000000000',
  },
  // Base Sepolia Testnet
  84532: {
    pioneer: process.env.NEXT_PUBLIC_PIONEER_CONTRACT_BASE_SEPOLIA || '0x0000000000000000000000000000000000000000',
  },
  // Ethereum Mainnet
  1: {
    pioneer: process.env.NEXT_PUBLIC_PIONEER_CONTRACT_ETHEREUM || '0x0000000000000000000000000000000000000000',
  },
  // Sepolia Testnet
  11155111: {
    pioneer: process.env.NEXT_PUBLIC_PIONEER_CONTRACT_SEPOLIA || '0x0000000000000000000000000000000000000000',
  },
  // Filecoin Mainnet
  314: {
    pioneer: process.env.NEXT_PUBLIC_PIONEER_CONTRACT_FILECOIN || '0x0000000000000000000000000000000000000000',
  },
  // Filecoin Testnet
  314159: {
    pioneer: process.env.NEXT_PUBLIC_PIONEER_CONTRACT_FILECOIN_TESTNET || '0x0000000000000000000000000000000000000000',
  },
  // Flare Mainnet
  14: {
    pioneer: process.env.NEXT_PUBLIC_PIONEER_CONTRACT_FLARE || '0x0000000000000000000000000000000000000000',
  },
  // Flare Testnet - Oracle Seer Contract (Unlimited Supply + Public Minting)
  114: {
    pioneer: process.env.NEXT_PUBLIC_PIONEER_CONTRACT_FLARE_TESTNET || '0x2D6E6A6430F0121d6949D743DF54730b40C5c74F',
  },
  // Lisk Mainnet
  1135: {
    pioneer: process.env.NEXT_PUBLIC_PIONEER_CONTRACT_LISK || '0x0000000000000000000000000000000000000000',
  },
  // Lisk Sepolia Testnet (using unlimited version for easier testing)
  4202: {
    pioneer: process.env.NEXT_PUBLIC_PIONEER_CONTRACT_LISK_SEPOLIA || '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  },
} as const

// IPFS Configuration
export const IPFS_CONFIG = {
  gateway: process.env.NEXT_PUBLIC_IPFS_GATEWAY || 'https://ipfs.io/ipfs/',
  pinataApiKey: process.env.NEXT_PUBLIC_PINATA_API_KEY || '',
  pinataSecretKey: process.env.NEXT_PUBLIC_PINATA_SECRET_KEY || '',
}

// RPC Configuration
export const RPC_CONFIG = {
  base: process.env.NEXT_PUBLIC_BASE_RPC_URL || 'https://mainnet.base.org',
  baseSepolia: process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL || 'https://sepolia.base.org',
  ethereum: process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL || 'https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY',
  sepolia: process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || 'https://sepolia.infura.io/v3/YOUR_KEY',
  filecoin: process.env.NEXT_PUBLIC_FILECOIN_RPC_URL || 'https://api.node.glif.io/rpc/v1',
  filecoinTestnet: process.env.NEXT_PUBLIC_FILECOIN_TESTNET_RPC_URL || 'https://api.calibration.node.glif.io/rpc/v1',
  flare: process.env.NEXT_PUBLIC_FLARE_RPC_URL || 'https://flare-api.flare.network/ext/C/rpc',
  flareTestnet: process.env.NEXT_PUBLIC_FLARE_TESTNET_RPC_URL || 'https://coston2-api.flare.network/ext/C/rpc',
  lisk: process.env.NEXT_PUBLIC_LISK_RPC_URL || 'https://rpc.api.lisk.com',
}

// Helper function to get contract address
export function getContractAddress(chainId: number): string {
  const addresses = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES]
  if (!addresses) {
    throw new Error(`Unsupported chain ID: ${chainId}`)
  }
  return addresses.pioneer
}

// Helper function to check if contract is deployed
export function isContractDeployed(chainId: number): boolean {
  const address = getContractAddress(chainId)
  return address !== '0x0000000000000000000000000000000000000000'
}
