import { Address } from 'viem'
import { PioneerType, getPioneerTypeInfo, getChainIdForPioneerType } from './blockchain'
import { CONTRACT_ADDRESSES } from './contract-config'

// Leaderboard entry interface
export interface LeaderboardEntry {
  rank: number
  player: Address
  ensName?: string
  realmsUnified: number
  totalCards: number
  pioneerCards: PioneerCard[]
  totalScore: number
  joinDate: string
  lastActive: string
  achievements: Achievement[]
}

// Pioneer card data
export interface PioneerCard {
  pioneerType: PioneerType
  name: string
  title: string
  realm: string
  rarity: string
  mintedAt: bigint
  isActive: boolean
  chainId: number
  contractAddress: string
  score: number
  specialStats?: any // Contract-specific stats
}

// Achievement system
export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  unlockedAt: string
  points: number
}

// Scoring system for different Pioneer types
export const PIONEER_SCORING = {
  [PioneerType.SOCIAL_ARCHITECT]: {
    baseScore: 100,
    communityBonus: 50, // Per community created
    connectionBonus: 10, // Per social connection
    dAppBonus: 25, // Per dApp integrated
  },
  [PioneerType.IDENTITY_GUARDIAN]: {
    baseScore: 100,
    domainBonus: 30, // Per domain managed
    verificationBonus: 20, // Per identity verified
    attestationBonus: 15, // Per attestation issued
    trustBonus: 5, // Per trust point
  },
  [PioneerType.DATA_WEAVER]: {
    baseScore: 100,
    archiveBonus: 25, // Per data archived
    storageBonus: 40, // Per storage contract created
    retrievalBonus: 15, // Per data retrieval
    efficiencyBonus: 10, // Per efficiency point
  },
  [PioneerType.ORACLE_SEER]: {
    baseScore: 100,
    predictionBonus: 30, // Per prediction made
    verificationBonus: 20, // Per data verified
    accuracyBonus: 5, // Per accuracy point
  },
}

// Achievement definitions
export const ACHIEVEMENTS = {
  FIRST_PIONEER: {
    id: 'first_pioneer',
    name: 'First Steps',
    description: 'Minted your first Pioneer NFT',
    icon: '🌟',
    rarity: 'common' as const,
    points: 50,
  },
  REALM_MASTER: {
    id: 'realm_master',
    name: 'Realm Master',
    description: 'Minted Pioneers on all 4 networks',
    icon: '👑',
    rarity: 'legendary' as const,
    points: 500,
  },
  SOCIAL_BUILDER: {
    id: 'social_builder',
    name: 'Community Architect',
    description: 'Created 5 communities',
    icon: '🏗️',
    rarity: 'epic' as const,
    points: 200,
  },
  DATA_GUARDIAN: {
    id: 'data_guardian',
    name: 'Data Guardian',
    description: 'Archived 10 data sets',
    icon: '🗄️',
    rarity: 'epic' as const,
    points: 200,
  },
  ORACLE_MASTER: {
    id: 'oracle_master',
    name: 'Oracle Master',
    description: 'Made 20 accurate predictions',
    icon: '🔮',
    rarity: 'epic' as const,
    points: 200,
  },
  IDENTITY_PROTECTOR: {
    id: 'identity_protector',
    name: 'Identity Protector',
    description: 'Verified 15 identities',
    icon: '🛡️',
    rarity: 'epic' as const,
    points: 200,
  },
  NEXUS_EXPLORER: {
    id: 'nexus_explorer',
    name: 'Nexus Explorer',
    description: 'Active on 3 different networks',
    icon: '🌌',
    rarity: 'rare' as const,
    points: 150,
  },
  EARLY_ADOPTER: {
    id: 'early_adopter',
    name: 'Early Adopter',
    description: 'Joined in the first week',
    icon: '⚡',
    rarity: 'rare' as const,
    points: 100,
  },
}

// Mock data for demonstration (will be replaced with real contract data)
export const MOCK_LEADERBOARD_DATA: LeaderboardEntry[] = [
  {
    rank: 1,
    player: '0x742d35Cc6C4C7b8c8c8c8c8c8c8c8c8c8c8f3a' as Address,
    ensName: 'nexus.master.eth',
    realmsUnified: 4,
    totalCards: 4,
    totalScore: 1250,
    joinDate: '2024-01-15',
    lastActive: '2 hours ago',
    pioneerCards: [
      {
        pioneerType: PioneerType.SOCIAL_ARCHITECT,
        name: 'The Social Architect',
        title: 'Builder of Worlds',
        realm: 'Lisk',
        rarity: 'Epic',
        mintedAt: BigInt(1705276800),
        isActive: true,
        chainId: 4202,
        contractAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
        score: 350,
        specialStats: { communitiesBuilt: 5, socialConnections: 12, dAppsIntegrated: 3 }
      },
      {
        pioneerType: PioneerType.IDENTITY_GUARDIAN,
        name: 'The Identity Guardian',
        title: 'Keeper of Names',
        realm: 'ENS',
        rarity: 'Rare',
        mintedAt: BigInt(1705363200),
        isActive: true,
        chainId: 11155111,
        contractAddress: '0xf8ACAa1035f3573Bd2F7730D0aC0789D71EBF1ef',
        score: 280,
        specialStats: { domainsManaged: 3, identitiesVerified: 8, attestationsIssued: 5, trustScore: 150 }
      },
      {
        pioneerType: PioneerType.DATA_WEAVER,
        name: 'The Data Weaver',
        title: 'Archivist of the Nexus',
        realm: 'Filecoin',
        rarity: 'Epic',
        mintedAt: BigInt(1705449600),
        isActive: true,
        chainId: 314159,
        contractAddress: '0xc00a268Fbcbb00a72bfc8CD0FE7CfE26dad3BEd8',
        score: 320,
        specialStats: { dataArchived: 8, storageContracts: 2, dataRetrieved: 15, efficiencyScore: 85 }
      },
      {
        pioneerType: PioneerType.ORACLE_SEER,
        name: 'The Oracle Seer',
        title: 'Truth Seeker of the Cosmos',
        realm: 'Flare',
        rarity: 'Legendary',
        mintedAt: BigInt(1705536000),
        isActive: true,
        chainId: 114,
        contractAddress: '0x9015957A2210BB8B10e27d8BBEEF8d9498f123eF',
        score: 300,
        specialStats: { predictionsMade: 12, dataVerified: 18, oracleAccuracy: 92 }
      }
    ],
    achievements: [
      ACHIEVEMENTS.FIRST_PIONEER,
      ACHIEVEMENTS.REALM_MASTER,
      ACHIEVEMENTS.SOCIAL_BUILDER,
      ACHIEVEMENTS.DATA_GUARDIAN,
      ACHIEVEMENTS.ORACLE_MASTER,
      ACHIEVEMENTS.IDENTITY_PROTECTOR,
      ACHIEVEMENTS.NEXUS_EXPLORER,
    ]
  },
  {
    rank: 2,
    player: '0x8b1c35Cc6C4C7b8c8c8c8c8c8c8c8c8c8c8c9e2d' as Address,
    ensName: 'oracle.seer.eth',
    realmsUnified: 3,
    totalCards: 3,
    totalScore: 980,
    joinDate: '2024-01-16',
    lastActive: '5 hours ago',
    pioneerCards: [
      {
        pioneerType: PioneerType.ORACLE_SEER,
        name: 'The Oracle Seer',
        title: 'Truth Seeker of the Cosmos',
        realm: 'Flare',
        rarity: 'Legendary',
        mintedAt: BigInt(1705363200),
        isActive: true,
        chainId: 114,
        contractAddress: '0x9015957A2210BB8B10e27d8BBEEF8d9498f123eF',
        score: 400,
        specialStats: { predictionsMade: 15, dataVerified: 22, oracleAccuracy: 88 }
      },
      {
        pioneerType: PioneerType.DATA_WEAVER,
        name: 'The Data Weaver',
        title: 'Archivist of the Nexus',
        realm: 'Filecoin',
        rarity: 'Epic',
        mintedAt: BigInt(1705449600),
        isActive: true,
        chainId: 314159,
        contractAddress: '0xc00a268Fbcbb00a72bfc8CD0FE7CfE26dad3BEd8',
        score: 320,
        specialStats: { dataArchived: 6, storageContracts: 1, dataRetrieved: 12, efficiencyScore: 78 }
      },
      {
        pioneerType: PioneerType.IDENTITY_GUARDIAN,
        name: 'The Identity Guardian',
        title: 'Keeper of Names',
        realm: 'ENS',
        rarity: 'Rare',
        mintedAt: BigInt(1705536000),
        isActive: true,
        chainId: 11155111,
        contractAddress: '0xf8ACAa1035f3573Bd2F7730D0aC0789D71EBF1ef',
        score: 260,
        specialStats: { domainsManaged: 2, identitiesVerified: 6, attestationsIssued: 4, trustScore: 120 }
      }
    ],
    achievements: [
      ACHIEVEMENTS.FIRST_PIONEER,
      ACHIEVEMENTS.ORACLE_MASTER,
      ACHIEVEMENTS.DATA_GUARDIAN,
      ACHIEVEMENTS.NEXUS_EXPLORER,
    ]
  },
  {
    rank: 3,
    player: '0x3f7a35Cc6C4C7b8c8c8c8c8c8c8c8c8c8c8c4c8b' as Address,
    ensName: 'data.weaver.eth',
    realmsUnified: 2,
    totalCards: 2,
    totalScore: 650,
    joinDate: '2024-01-17',
    lastActive: '1 day ago',
    pioneerCards: [
      {
        pioneerType: PioneerType.DATA_WEAVER,
        name: 'The Data Weaver',
        title: 'Archivist of the Nexus',
        realm: 'Filecoin',
        rarity: 'Epic',
        mintedAt: BigInt(1705449600),
        isActive: true,
        chainId: 314159,
        contractAddress: '0xc00a268Fbcbb00a72bfc8CD0FE7CfE26dad3BEd8',
        score: 380,
        specialStats: { dataArchived: 10, storageContracts: 3, dataRetrieved: 20, efficiencyScore: 90 }
      },
      {
        pioneerType: PioneerType.SOCIAL_ARCHITECT,
        name: 'The Social Architect',
        title: 'Builder of Worlds',
        realm: 'Lisk',
        rarity: 'Epic',
        mintedAt: BigInt(1705536000),
        isActive: true,
        chainId: 4202,
        contractAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
        score: 270,
        specialStats: { communitiesBuilt: 3, socialConnections: 8, dAppsIntegrated: 2 }
      }
    ],
    achievements: [
      ACHIEVEMENTS.FIRST_PIONEER,
      ACHIEVEMENTS.DATA_GUARDIAN,
    ]
  }
]

// Calculate score for a Pioneer card based on its type and stats
export function calculatePioneerScore(pioneerType: PioneerType, specialStats: any = {}): number {
  const scoring = PIONEER_SCORING[pioneerType]
  let score = scoring.baseScore

  switch (pioneerType) {
    case PioneerType.SOCIAL_ARCHITECT:
      score += (specialStats.communitiesBuilt || 0) * scoring.communityBonus
      score += (specialStats.socialConnections || 0) * scoring.connectionBonus
      score += (specialStats.dAppsIntegrated || 0) * scoring.dAppBonus
      break
    case PioneerType.IDENTITY_GUARDIAN:
      score += (specialStats.domainsManaged || 0) * scoring.domainBonus
      score += (specialStats.identitiesVerified || 0) * scoring.verificationBonus
      score += (specialStats.attestationsIssued || 0) * scoring.attestationBonus
      score += (specialStats.trustScore || 0) * scoring.trustBonus
      break
    case PioneerType.DATA_WEAVER:
      score += (specialStats.dataArchived || 0) * scoring.archiveBonus
      score += (specialStats.storageContracts || 0) * scoring.storageBonus
      score += (specialStats.dataRetrieved || 0) * scoring.retrievalBonus
      score += (specialStats.efficiencyScore || 0) * scoring.efficiencyBonus
      break
    case PioneerType.ORACLE_SEER:
      score += (specialStats.predictionsMade || 0) * scoring.predictionBonus
      score += (specialStats.dataVerified || 0) * scoring.verificationBonus
      score += (specialStats.oracleAccuracy || 0) * scoring.accuracyBonus
      break
  }

  return Math.floor(score)
}

// Calculate total score for a player
export function calculateTotalScore(pioneerCards: PioneerCard[], achievements: Achievement[]): number {
  const pioneerScore = pioneerCards.reduce((total, card) => total + card.score, 0)
  const achievementScore = achievements.reduce((total, achievement) => total + achievement.points, 0)
  return pioneerScore + achievementScore
}

// Get leaderboard data (mock implementation - will be replaced with real contract calls)
export async function getLeaderboardData(): Promise<LeaderboardEntry[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Sort by total score descending
  return MOCK_LEADERBOARD_DATA.sort((a, b) => b.totalScore - a.totalScore).map((entry, index) => ({
    ...entry,
    rank: index + 1
  }))
}

// Get player's position in leaderboard
export function getPlayerRank(playerAddress: Address, leaderboard: LeaderboardEntry[]): number {
  const playerIndex = leaderboard.findIndex(entry => entry.player.toLowerCase() === playerAddress.toLowerCase())
  return playerIndex >= 0 ? playerIndex + 1 : -1
}

// Get player's leaderboard entry
export function getPlayerEntry(playerAddress: Address, leaderboard: LeaderboardEntry[]): LeaderboardEntry | null {
  return leaderboard.find(entry => entry.player.toLowerCase() === playerAddress.toLowerCase()) || null
}

// Filter leaderboard by criteria
export function filterLeaderboard(
  leaderboard: LeaderboardEntry[],
  filters: {
    minRealms?: number
    maxRealms?: number
    pioneerType?: PioneerType
    minScore?: number
    maxScore?: number
  }
): LeaderboardEntry[] {
  return leaderboard.filter(entry => {
    if (filters.minRealms && entry.realmsUnified < filters.minRealms) return false
    if (filters.maxRealms && entry.realmsUnified > filters.maxRealms) return false
    if (filters.minScore && entry.totalScore < filters.minScore) return false
    if (filters.maxScore && entry.totalScore > filters.maxScore) return false
    if (filters.pioneerType && !entry.pioneerCards.some(card => card.pioneerType === filters.pioneerType)) return false
    return true
  })
}

// Sort leaderboard by different criteria
export function sortLeaderboard(
  leaderboard: LeaderboardEntry[],
  sortBy: 'score' | 'realms' | 'cards' | 'recent' | 'achievements'
): LeaderboardEntry[] {
  const sorted = [...leaderboard]
  
  switch (sortBy) {
    case 'score':
      return sorted.sort((a, b) => b.totalScore - a.totalScore)
    case 'realms':
      return sorted.sort((a, b) => b.realmsUnified - a.realmsUnified)
    case 'cards':
      return sorted.sort((a, b) => b.totalCards - a.totalCards)
    case 'recent':
      return sorted.sort((a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime())
    case 'achievements':
      return sorted.sort((a, b) => b.achievements.length - a.achievements.length)
    default:
      return sorted
  }
}

// Get realm progress for display
export function getRealmProgress(realmsUnified: number) {
  const realms = ['Lisk', 'ENS', 'Filecoin', 'Flare']
  return realms.map((realm, index) => ({
    name: realm,
    completed: index < realmsUnified,
    index
  }))
}

// Get achievement rarity color
export function getAchievementRarityColor(rarity: string): string {
  switch (rarity) {
    case 'common':
      return 'text-gray-400 border-gray-400/50'
    case 'rare':
      return 'text-blue-400 border-blue-400/50'
    case 'epic':
      return 'text-purple-400 border-purple-400/50'
    case 'legendary':
      return 'text-yellow-400 border-yellow-400/50'
    default:
      return 'text-gray-400 border-gray-400/50'
  }
}

// Get rank display info
export function getRankDisplay(rank: number) {
  if (rank === 1) return { icon: '🥇', color: 'text-yellow-400 border-yellow-400/50', title: 'Nexus Master' }
  if (rank === 2) return { icon: '🥈', color: 'text-gray-300 border-gray-300/50', title: 'Realm Guardian' }
  if (rank === 3) return { icon: '🥉', color: 'text-amber-600 border-amber-600/50', title: 'Chain Walker' }
  if (rank <= 10) return { icon: `#${rank}`, color: 'text-blue-400 border-blue-400/50', title: 'Elite Pioneer' }
  if (rank <= 50) return { icon: `#${rank}`, color: 'text-green-400 border-green-400/50', title: 'Skilled Pioneer' }
  return { icon: `#${rank}`, color: 'text-muted-foreground border-muted-foreground/20', title: 'Pioneer' }
}
