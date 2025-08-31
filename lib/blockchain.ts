import { Address, Hash, parseEther } from 'viem'
import { CONTRACT_ADDRESSES } from './contract-config'

// Pioneer types enum matching the smart contract
export enum PioneerType {
  SOCIAL_ARCHITECT = 0,    // Lisk - Builder of Worlds
  IDENTITY_GUARDIAN = 1,   // ENS - Keeper of Names  
  DATA_WEAVER = 2,         // Filecoin - Archivist of the Nexus
  ORACLE_SEER = 3          // Flare - Truth Seeker of the Cosmos
}

// Pioneer data structure
export interface PioneerData {
  pioneerType: PioneerType
  name: string
  title: string
  realm: string
  rarity: string
  mintedAt: bigint
  isActive: boolean
}

// Contract ABI for ENS Pioneer contract
export const ENS_PIONEER_ABI = [
  // Read functions
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
    name: 'hasPioneer',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'player', type: 'address' }],
    name: 'getPlayerPioneer',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isMintingAvailable',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ENS_REGISTRY',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ENS_PIONEER_TYPE',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  // Write functions
  {
    inputs: [
      { internalType: 'uint256', name: 'pioneerType', type: 'uint256' },
      { internalType: 'address', name: 'playerAddress', type: 'address' }
    ],
    name: 'mintPioneer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'player', type: 'address' },
      { internalType: 'string', name: 'name', type: 'string' },
      { internalType: 'string', name: 'title', type: 'string' }
    ],
    name: 'mintIdentityGuardian',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  // Events
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'player', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'pioneerType', type: 'uint256' }
    ],
    name: 'PioneerMinted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'player', type: 'address' },
      { indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { indexed: false, internalType: 'string', name: 'name', type: 'string' }
    ],
    name: 'IdentityGuardianMinted',
    type: 'event',
  },
] as const

// Contract ABI for Pioneer contract
export const PIONEER_ABI = [
  // Read functions
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
    name: 'hasPioneer',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'player', type: 'address' }],
    name: 'getPlayerPioneer',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isMintingAvailable',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'player', type: 'address' }],
    name: 'hasPioneer',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'player', type: 'address' }],
    name: 'getPlayerPioneer',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'getPioneerData',
    outputs: [
      {
        components: [
          { internalType: 'enum Pioneer.PioneerType', name: 'pioneerType', type: 'uint8' },
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'string', name: 'title', type: 'string' },
          { internalType: 'string', name: 'realm', type: 'string' },
          { internalType: 'string', name: 'rarity', type: 'string' },
          { internalType: 'uint256', name: 'mintedAt', type: 'uint256' },
          { internalType: 'bool', name: 'isActive', type: 'bool' },
        ],
        internalType: 'struct Pioneer.PioneerData',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    name: 'pioneerNames',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    name: 'pioneerTitles',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    name: 'pioneerRealms',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    name: 'pioneerRarities',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  // Write functions

  {
    inputs: [
      { internalType: 'uint256', name: 'pioneerType', type: 'uint256' },
      { internalType: 'address', name: 'playerAddress', type: 'address' },
    ],
    name: 'mintPioneer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: 'baseURI', type: 'string' }],
    name: 'setBaseURI',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'deactivatePioneer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  // Events
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'player', type: 'address' },
      { indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { indexed: false, internalType: 'enum Pioneer.PioneerType', name: 'pioneerType', type: 'uint8' },
      { indexed: false, internalType: 'string', name: 'name', type: 'string' },
    ],
    name: 'PioneerMinted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { indexed: true, internalType: 'address', name: 'player', type: 'address' },
    ],
    name: 'PioneerActivated',
    type: 'event',
  },
] as const



// Network configuration
export const NETWORK_CONFIG = {
  8453: {
    name: 'Base',
    chainId: 8453,
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: { default: { http: ['https://mainnet.base.org'] } },
    blockExplorers: { default: { name: 'BaseScan', url: 'https://basescan.org' } },
  },
  84532: {
    name: 'Base Sepolia',
    chainId: 84532,
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: { default: { http: ['https://sepolia.base.org'] } },
    blockExplorers: { default: { name: 'BaseScan Sepolia', url: 'https://sepolia.basescan.org' } },
  },
  1: {
    name: 'Ethereum',
    chainId: 1,
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: { default: { http: ['https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY'] } },
    blockExplorers: { default: { name: 'Etherscan', url: 'https://etherscan.io' } },
  },
  11155111: {
    name: 'Sepolia',
    chainId: 11155111,
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: { default: { http: ['https://sepolia.infura.io/v3/YOUR_KEY'] } },
    blockExplorers: { default: { name: 'Etherscan Sepolia', url: 'https://sepolia.etherscan.io' } },
  },
  314: {
    name: 'Filecoin',
    chainId: 314,
    nativeCurrency: { name: 'Filecoin', symbol: 'FIL', decimals: 18 },
    rpcUrls: { default: { http: ['https://api.node.glif.io/rpc/v1'] } },
    blockExplorers: { default: { name: 'Filfox', url: 'https://filfox.info' } },
  },
  314159: {
    name: 'Filecoin Testnet',
    chainId: 314159,
    nativeCurrency: { name: 'Filecoin', symbol: 'FIL', decimals: 18 },
    rpcUrls: { default: { http: ['https://api.calibration.node.glif.io/rpc/v1'] } },
    blockExplorers: { default: { name: 'Filfox Testnet', url: 'https://calibration.filfox.info' } },
  },
  14: {
    name: 'Flare',
    chainId: 14,
    nativeCurrency: { name: 'Flare', symbol: 'FLR', decimals: 18 },
    rpcUrls: { default: { http: ['https://flare-api.flare.network/ext/C/rpc'] } },
    blockExplorers: { default: { name: 'Flare Explorer', url: 'https://flare-explorer.flare.network' } },
  },
  114: {
    name: 'Flare Testnet',
    chainId: 114,
    nativeCurrency: { name: 'Flare', symbol: 'FLR', decimals: 18 },
    rpcUrls: { default: { http: ['https://coston2-api.flare.network/ext/C/rpc'] } },
    blockExplorers: { default: { name: 'Flare Testnet Explorer', url: 'https://coston2-explorer.flare.network' } },
  },
  1135: {
    name: 'Lisk',
    chainId: 1135,
    nativeCurrency: { name: 'Lisk', symbol: 'LSK', decimals: 18 },
    rpcUrls: { default: { http: ['https://rpc.api.lisk.com'] } },
    blockExplorers: { default: { name: 'LiskScan', url: 'https://liskscan.com' } },
  },
  4202: {
    name: 'Lisk Sepolia',
    chainId: 4202,
    nativeCurrency: { name: 'Lisk', symbol: 'LSK', decimals: 18 },
    rpcUrls: { default: { http: ['https://rpc.api.testnet.lisk.com'] } },
    blockExplorers: { default: { name: 'LiskScan Testnet', url: 'https://testnet.liskscan.com' } },
  },
} as const

// Helper functions
export function getContractAddress(chainId: number | undefined): string {
  if (!chainId) {
    throw new Error('Chain ID is required')
  }
  const addresses = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES]
  if (!addresses) {
    throw new Error(`Unsupported chain ID: ${chainId}`)
  }
  return addresses.pioneer
}

export function getEnsContractAddress(chainId: number | undefined): string {
  if (!chainId) {
    throw new Error('Chain ID is required')
  }
  const addresses = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES]
  if (!addresses) {
    throw new Error(`Unsupported chain ID: ${chainId}`)
  }
  return (addresses as any).ensPioneer || addresses.pioneer
}

export function getNetworkConfig(chainId: number | undefined) {
  if (!chainId) {
    throw new Error('Chain ID is required')
  }
  const config = NETWORK_CONFIG[chainId as keyof typeof NETWORK_CONFIG]
  if (!config) {
    throw new Error(`Unsupported chain ID: ${chainId}`)
  }
  return config
}

export function isSupportedChain(chainId: number | undefined): boolean {
  return chainId ? chainId in CONTRACT_ADDRESSES : false
}

// Pioneer type helpers
export function getPioneerTypeInfo(type: PioneerType) {
  const typeInfo = {
    [PioneerType.SOCIAL_ARCHITECT]: {
      name: 'The Social Architect',
      title: 'Builder of Worlds',
      realm: 'Lisk',
      rarity: 'Epic',
      description: 'Master of community protocols and social applications (Unlimited Supply)',
      image: '/base_social_architect_card_refined.png',
    },
    [PioneerType.IDENTITY_GUARDIAN]: {
      name: 'The Identity Guardian',
      title: 'Keeper of Names',
      realm: 'ENS',
      rarity: 'Epic',
      description: 'Protector of digital identity and name resolution',
      image: '/ens_identity_guardian_card_refined.png',
    },
    [PioneerType.DATA_WEAVER]: {
      name: 'The Data Weaver',
      title: 'Archivist of the Nexus',
      realm: 'Filecoin',
      rarity: 'Epic',
      description: 'Guardian of decentralized storage and data integrity',
      image: '/filecoin_data_weaver_card_refined.png',
    },
    [PioneerType.ORACLE_SEER]: {
      name: 'The Oracle Seer',
      title: 'Truth Seeker of the Cosmos',
      realm: 'Flare',
      rarity: 'Epic',
      description: 'Seeker of truth through oracle data and randomness',
      image: '/flare_oracle_seer_card_refined.png',
    },
  }
  
  return typeInfo[type]
}

export function getPioneerTypeFromRealm(realm: string): PioneerType | null {
  const realmMap = {
    'Base': PioneerType.SOCIAL_ARCHITECT,
    'ENS': PioneerType.IDENTITY_GUARDIAN,
    'Filecoin': PioneerType.DATA_WEAVER,
    'Flare': PioneerType.ORACLE_SEER,
  }
  
  return realmMap[realm as keyof typeof realmMap] || null
}

// Map Pioneer types to their corresponding chain IDs
export function getChainIdForPioneerType(pioneerType: PioneerType): number {
  const chainMap = {
    [PioneerType.SOCIAL_ARCHITECT]: 84532, // Base Sepolia
    [PioneerType.IDENTITY_GUARDIAN]: 11155111, // Ethereum Sepolia (ENS)
    [PioneerType.DATA_WEAVER]: 314159, // Filecoin Calibration
    [PioneerType.ORACLE_SEER]: 114, // Flare Testnet
  }
  
  return chainMap[pioneerType]
}

// Get the network name for a Pioneer type
export function getNetworkNameForPioneerType(pioneerType: PioneerType): string {
  const networkMap = {
    [PioneerType.SOCIAL_ARCHITECT]: 'Base Sepolia',
    [PioneerType.IDENTITY_GUARDIAN]: 'Ethereum Sepolia',
    [PioneerType.DATA_WEAVER]: 'Filecoin Calibration',
    [PioneerType.ORACLE_SEER]: 'Flare Testnet',
  }
  
  return networkMap[pioneerType]
}



export function isEnsContractDeployed(chainId: number | undefined): boolean {
  if (!chainId) return false
  const address = getEnsContractAddress(chainId)
  return address !== '0x0000000000000000000000000000000000000000'
}
