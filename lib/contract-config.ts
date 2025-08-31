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
  // Sepolia Testnet (ENS Identity Guardian)
  11155111: {
    pioneer: process.env.NEXT_PUBLIC_PIONEER_CONTRACT_SEPOLIA || '0x0000000000000000000000000000000000000000',
    ensPioneer: process.env.NEXT_PUBLIC_ENS_CONTRACT_SEPOLIA || '0xf8ACAa1035f3573Bd2F7730D0aC0789D71EBF1ef',
    confidentialEns: process.env.NEXT_PUBLIC_CONFIDENTIAL_ENS_CONTRACT_SEPOLIA || '0x0000000000000000000000000000000000000000',
    confidentialDistribution: process.env.NEXT_PUBLIC_CONFIDENTIAL_DISTRIBUTION_CONTRACT_SEPOLIA || '0x0000000000000000000000000000000000000000',
    confidentialGovernance: process.env.NEXT_PUBLIC_CONFIDENTIAL_GOVERNANCE_CONTRACT_SEPOLIA || '0x0000000000000000000000000000000000000000',
  },
  // Filecoin Mainnet
  314: {
    pioneer: process.env.NEXT_PUBLIC_PIONEER_CONTRACT_FILECOIN || '0x0000000000000000000000000000000000000000',
  },
  // Filecoin Testnet - Data Weaver Contract
  314159: {
    pioneer: process.env.NEXT_PUBLIC_PIONEER_CONTRACT_FILECOIN_TESTNET || '0xc00a268Fbcbb00a72bfc8CD0FE7CfE26dad3BEd8',
  },
  // Flare Mainnet
  14: {
    pioneer: process.env.NEXT_PUBLIC_PIONEER_CONTRACT_FLARE || '0x0000000000000000000000000000000000000000',
  },
  // Flare Testnet - Oracle Seer Contract (Unlimited Supply + Public Minting)
  114: {
    pioneer: process.env.NEXT_PUBLIC_PIONEER_CONTRACT_FLARE_TESTNET || '0x2D6E6A6430F0121d6949D743DF54730b40C5c74F',
    ensPioneer: process.env.NEXT_PUBLIC_ENS_CONTRACT_FLARE_TESTNET || '0xbaee9B65349929Bd78f9878555bF78027Df7f101',
  },
  // Lisk Mainnet
  1135: {
    pioneer: process.env.NEXT_PUBLIC_PIONEER_CONTRACT_LISK || '0x0000000000000000000000000000000000000000',
  },
  // Lisk Sepolia Testnet (using unlimited version for easier testing)
  4202: {
    pioneer: process.env.NEXT_PUBLIC_PIONEER_CONTRACT_LISK_SEPOLIA || '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  },
  // Citrea Testnet - Governance Guardian Contract
  1001: {
    pioneer: process.env.NEXT_PUBLIC_PIONEER_CONTRACT_CITREA_TESTNET || '0x0000000000000000000000000000000000000000',
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
  citreaTestnet: process.env.NEXT_PUBLIC_CITREA_TESTNET_RPC_URL || 'https://rpc.citrea.xyz',
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

// Helper function to get confidential ENS contract address
export function getConfidentialEnsAddress(chainId: number): string {
  const addresses = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES]
  if (!addresses || !('confidentialEns' in addresses)) {
    throw new Error(`Confidential ENS contract not deployed on chain ID: ${chainId}`)
  }
  return (addresses as any).confidentialEns
}

// Helper function to get confidential distribution contract address
export function getConfidentialDistributionAddress(chainId: number): string {
  const addresses = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES]
  if (!addresses || !('confidentialDistribution' in addresses)) {
    throw new Error(`Confidential distribution contract not deployed on chain ID: ${chainId}`)
  }
  return (addresses as any).confidentialDistribution
}

// Helper function to get confidential governance contract address
export function getConfidentialGovernanceAddress(chainId: number): string {
  const addresses = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES]
  if (!addresses || !('confidentialGovernance' in addresses)) {
    throw new Error(`Confidential governance contract not deployed on chain ID: ${chainId}`)
  }
  return (addresses as any).confidentialGovernance
}

// Helper function to check if confidential contracts are deployed
export function isConfidentialContractsDeployed(chainId: number): boolean {
  try {
    const ensAddress = getConfidentialEnsAddress(chainId)
    const distributionAddress = getConfidentialDistributionAddress(chainId)
    const governanceAddress = getConfidentialGovernanceAddress(chainId)
    
    return ensAddress !== '0x0000000000000000000000000000000000000000' &&
           distributionAddress !== '0x0000000000000000000000000000000000000000' &&
           governanceAddress !== '0x0000000000000000000000000000000000000000'
  } catch {
    return false
  }
}
