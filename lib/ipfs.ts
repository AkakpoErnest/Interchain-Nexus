import { IPFS_CONFIG } from './contract-config'

// NFT Metadata structure
export interface NFTMetadata {
  name: string
  description: string
  image: string
  external_url?: string
  attributes: Array<{
    trait_type: string
    value: string | number
  }>
  animation_url?: string
  background_color?: string
}

// Pioneer-specific metadata
export interface PioneerMetadata extends NFTMetadata {
  pioneer_type: string
  realm: string
  rarity: string
  title: string
  abilities: string[]
  mission: string
  passive_buff: string
  stats: Record<string, number>
  lore: string
  story: string
}

// IPFS service class
export class IPFSService {
  private gateway: string
  private pinataApiKey?: string
  private pinataSecretKey?: string

  constructor() {
    this.gateway = IPFS_CONFIG.gateway
    this.pinataApiKey = IPFS_CONFIG.pinataApiKey
    this.pinataSecretKey = IPFS_CONFIG.pinataSecretKey
  }

  // Upload metadata to IPFS using Pinata
  async uploadMetadata(metadata: PioneerMetadata): Promise<string> {
    if (!this.pinataApiKey || !this.pinataSecretKey) {
      throw new Error('Pinata API credentials not configured')
    }

    try {
      const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'pinata_api_key': this.pinataApiKey,
          'pinata_secret_api_key': this.pinataSecretKey,
        },
        body: JSON.stringify({
          pinataContent: metadata,
          pinataMetadata: {
            name: `pioneer-${metadata.name.toLowerCase().replace(/\s+/g, '-')}`,
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to upload to IPFS: ${response.statusText}`)
      }

      const result = await response.json()
      return result.IpfsHash
    } catch (error) {
      console.error('IPFS upload error:', error)
      throw error
    }
  }

  // Upload image to IPFS using Pinata
  async uploadImage(file: File, name: string): Promise<string> {
    if (!this.pinataApiKey || !this.pinataSecretKey) {
      throw new Error('Pinata API credentials not configured')
    }

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('pinataMetadata', JSON.stringify({
        name: name,
      }))

      const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          'pinata_api_key': this.pinataApiKey,
          'pinata_secret_api_key': this.pinataSecretKey,
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Failed to upload image to IPFS: ${response.statusText}`)
      }

      const result = await response.json()
      return result.IpfsHash
    } catch (error) {
      console.error('IPFS image upload error:', error)
      throw error
    }
  }

  // Get metadata from IPFS
  async getMetadata(ipfsHash: string): Promise<PioneerMetadata> {
    try {
      const response = await fetch(`${this.gateway}${ipfsHash}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch metadata: ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error('IPFS fetch error:', error)
      throw error
    }
  }

  // Get image URL from IPFS hash
  getImageUrl(ipfsHash: string): string {
    return `${this.gateway}${ipfsHash}`
  }

  // Generate metadata for a pioneer
  generatePioneerMetadata(pioneerData: any, tokenId: bigint): PioneerMetadata {
    return {
      name: pioneerData.name,
      description: pioneerData.description || `${pioneerData.name} - ${pioneerData.title}`,
      image: pioneerData.image || `/placeholder.jpg`,
      external_url: `https://interchainnexus.com/pioneer/${tokenId}`,
      attributes: [
        {
          trait_type: 'Pioneer Type',
          value: pioneerData.name,
        },
        {
          trait_type: 'Title',
          value: pioneerData.title,
        },
        {
          trait_type: 'Realm',
          value: pioneerData.realm,
        },
        {
          trait_type: 'Rarity',
          value: pioneerData.rarity,
        },
        {
          trait_type: 'Token ID',
          value: tokenId.toString(),
        },
        // Add stats as attributes
        ...Object.entries(pioneerData.stats || {}).map(([stat, value]) => ({
          trait_type: stat.charAt(0).toUpperCase() + stat.slice(1),
          value: value as number,
        })),
        // Add abilities as attributes
        ...pioneerData.abilities?.map((ability: string, index: number) => ({
          trait_type: `Ability ${index + 1}`,
          value: ability,
        })) || [],
      ],
      pioneer_type: pioneerData.name,
      realm: pioneerData.realm,
      rarity: pioneerData.rarity,
      title: pioneerData.title,
      abilities: pioneerData.abilities || [],
      mission: pioneerData.mission || '',
      passive_buff: pioneerData.passiveBuff || '',
      stats: pioneerData.stats || {},
      lore: pioneerData.lore || '',
      story: pioneerData.story || '',
    }
  }

  // Batch upload multiple metadata files
  async batchUploadMetadata(metadataList: PioneerMetadata[]): Promise<string[]> {
    const uploadPromises = metadataList.map(metadata => this.uploadMetadata(metadata))
    return Promise.all(uploadPromises)
  }

  // Check if IPFS is available
  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${this.gateway}QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG/readme`)
      return response.ok
    } catch {
      return false
    }
  }
}

// Default IPFS service instance
export const ipfsService = new IPFSService()

// Helper functions
export function formatIPFSUrl(ipfsHash: string): string {
  if (ipfsHash.startsWith('ipfs://')) {
    return ipfsHash.replace('ipfs://', IPFS_CONFIG.gateway)
  }
  return `${IPFS_CONFIG.gateway}${ipfsHash}`
}

export function extractIPFSHash(url: string): string | null {
  if (url.startsWith('ipfs://')) {
    return url.replace('ipfs://', '')
  }
  if (url.includes('/ipfs/')) {
    return url.split('/ipfs/')[1]
  }
  return null
}

// Metadata templates for different pioneer types
export const PIONEER_METADATA_TEMPLATES = {
  SOCIAL_ARCHITECT: {
    name: 'The Social Architect',
    title: 'Builder of Worlds',
    realm: 'Base',
    rarity: 'Epic',
    description: 'A visionary who designs and builds community protocols and social applications on Base.',
    image: '/base_social_architect_card_refined.png',
    abilities: ['Community Building', 'Protocol Design', 'Social Engineering'],
    mission: 'Build bridges between all blockchain communities and create the social infrastructure for the Interchain Nexus.',
    passive_buff: 'Base puzzles get +25% success rate',
    stats: { creativity: 58, leadership: 52, innovation: 60 },
  },
  IDENTITY_GUARDIAN: {
    name: 'The Identity Guardian',
    title: 'Keeper of Names',
    realm: 'ENS',
    rarity: 'Epic',
    description: 'A protector of digital identities, ensuring the integrity of ENS names across the cosmos.',
    image: '/ens_identity_guardian_card_refined.png',
    abilities: ['Identity Verification', 'Name Protection', 'Trust Enforcement'],
    mission: 'Protect the sacred registry of ENS names and ensure every entity in the interchain has a true, verifiable identity.',
    passive_buff: 'ENS puzzles get +25% success rate',
    stats: { security: 60, wisdom: 45, protection: 58 },
  },
  DATA_WEAVER: {
    name: 'The Data Weaver',
    title: 'Archivist of the Nexus',
    realm: 'Filecoin',
    rarity: 'Epic',
    description: 'A master of decentralized storage, preserving the collective memory across the decentralized Filecoin network.',
    image: '/filecoin_data_weaver_card_refined.png',
    abilities: ['Data Preservation', 'Memory Weaving', 'Archive Management'],
    mission: 'Preserve all knowledge and data across the interchain, ensuring nothing is ever lost to the void.',
    passive_buff: 'Filecoin puzzles get +25% success rate',
    stats: { knowledge: 56, precision: 60, memory: 48 },
  },
  ORACLE_SEER: {
    name: 'The Oracle Seer',
    title: 'Truth Seeker of the Cosmos',
    realm: 'Flare',
    rarity: 'Epic',
    description: 'A seer who reads the patterns of randomness and fate. Harnesses Flare\'s oracle network for divination.',
    image: '/flare_oracle_seer_card_refined.png',
    abilities: ['Truth Divination', 'Data Verification', 'Oracle Communication'],
    mission: 'Ensure all oracle data is authentic and true, maintaining the integrity of information across the interchain.',
    passive_buff: 'Flare puzzles get +25% success rate',
    stats: { foresight: 62, intuition: 40, prophecy: 58 },
  },
} as const

