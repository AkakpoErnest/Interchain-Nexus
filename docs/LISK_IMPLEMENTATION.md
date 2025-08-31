# Lisk Implementation Guide

## Overview

The Lisk Network integration in Interchain Nexus provides community building and social connection capabilities through the Social Architect Pioneer. This implementation leverages Lisk's unique features including dApp integration, social graph management, and community governance.

## 🎯 Problem Solved

Lisk integration solves the social fragmentation problem in blockchain gaming by providing:
- **Community Building**: Create and manage communities across the ecosystem
- **Social Connections**: Build networks of connections between players
- **dApp Integration**: Seamless integration with Lisk dApps
- **Social Graph Management**: Track and manage social relationships

## 🏗️ Architecture

### Smart Contracts

#### 1. LiskSocialArchitect.sol
**Contract Address**: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
**Network**: Lisk Sepolia (Chain ID: 4202)

```solidity
// Key Features:
- ERC721 NFT standard with soulbound functionality
- Community building and management
- Social connection tracking
- dApp integration capabilities
- Social graph management
- Lisk ecosystem integration
```

**Functions**:
- `mintSocialArchitect(address player, string name, string title)`: Mint Social Architect
- `createCommunity(string communityName, string description)`: Create communities
- `joinCommunity(uint256 communityId)`: Join existing communities
- `getSocialConnections(address player)`: Get player's social connections
- `getCommunityMembers(uint256 communityId)`: Get community members

### Frontend Components

#### 1. Social Architect Game (`components/social-architect-game.tsx`)
- Implements the Social Architect game mechanics
- Community building and management interface
- Social connection tracking and visualization
- dApp integration capabilities
- Guild mechanics and community features

#### 2. Community Management (`components/community-management.tsx`)
- Create and manage communities
- Invite and manage community members
- Community governance and voting
- Social graph visualization

### Custom Hooks

#### 1. Social Architect Contract Hooks (`lib/hooks/useSocialArchitectContract.ts`)
- `useHasSocialArchitect`: Check if player has Social Architect
- `usePlayerSocialArchitect`: Get player's Social Architect token ID
- `useTotalSupply`: Get total supply of Social Architects
- `useIsMintingAvailable`: Check if Social Architect minting is available
- `useMintSocialArchitect`: Mint Social Architect NFT
- `useCreateCommunity`: Create a new community
- `useJoinCommunity`: Join an existing community
- `useGetSocialConnections`: Get player's social connections

## 🎮 Game Implementation

### Social Architect Game Mechanics

The Social Architect game features comprehensive community building gameplay:

#### 1. Community Building
```typescript
// Community creation and management
const createCommunity = async (name: string, description: string) => {
  const communityId = await socialArchitectContract.createCommunity(name, description);
  return communityId;
};

const joinCommunity = async (communityId: number) => {
  await socialArchitectContract.joinCommunity(communityId);
  // Update local state
  updatePlayerCommunities(communityId);
};
```

#### 2. Social Graph Management
```typescript
// Social connection tracking
const addSocialConnection = async (targetAddress: string) => {
  await socialArchitectContract.addConnection(targetAddress);
  // Update social graph
  updateSocialGraph(playerAddress, targetAddress);
};

const getSocialConnections = async (playerAddress: string) => {
  const connections = await socialArchitectContract.getSocialConnections(playerAddress);
  return connections;
};
```

#### 3. dApp Integration
```typescript
// Lisk dApp integration
const integrateWithDApp = async (dAppAddress: string, integrationType: string) => {
  const integration = await socialArchitectContract.integrateDApp(dAppAddress, integrationType);
  return integration;
};
```

### Game Chapters and Quests

#### Chapter 1: The Community Builder
- **Quest**: Create Your First Community
- **Task**: Create a community with at least 3 members
- **Reward**: Community Builder Badge + 100 points
- **Social**: Community creation mechanics

#### Chapter 2: The Social Connector
- **Quest**: Build Your Social Network
- **Task**: Connect with 10 other players
- **Reward**: Social Connector NFT + 150 points
- **Social**: Social connection mechanics

#### Chapter 3: The Guild Master
- **Quest**: Lead a Guild
- **Task**: Become the leader of a guild with 20+ members
- **Reward**: Guild Master Badge + 200 points
- **Leadership**: Guild management mechanics

#### Chapter 4: The dApp Integrator
- **Quest**: Integrate with Lisk dApps
- **Task**: Integrate with 3 different Lisk dApps
- **Reward**: dApp Integrator NFT + 250 points
- **Integration**: dApp integration mechanics

#### Chapter 5: The Community Governor
- **Quest**: Community Governance
- **Task**: Participate in 5 community governance votes
- **Reward**: Community Governor Badge + 300 points
- **Governance**: Community voting mechanics

#### Chapter 6: The Social Influencer
- **Quest**: Build Influence
- **Task**: Achieve 1000+ social influence points
- **Reward**: Social Influencer NFT + 350 points
- **Influence**: Social influence mechanics

#### Chapter 7: The Ecosystem Architect
- **Quest**: Build the Ecosystem
- **Task**: Create a cross-chain community network
- **Reward**: Ecosystem Architect Title + 500 points
- **Ecosystem**: Cross-chain community building

## 🚀 Deployment Process

### 1. Contract Deployment
```bash
# Deploy Lisk Social Architect
cd contracts
npm run deploy:lisk-testnet
```

### 2. Contract Verification
```bash
# Verify Lisk Social Architect
npx hardhat verify --network liskTestnet 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

### 3. Frontend Integration
```typescript
// Update contract addresses in lib/contract-config.ts
export const CONTRACT_ADDRESSES = {
  4202: { // Lisk Sepolia
    pioneer: '0x5FbDB2315678afecb367f032d93F642f64180aa3'
  }
};
```

## 🔧 Configuration

### Environment Variables
```bash
# .env file
NEXT_PUBLIC_LISK_CONTRACT=0x5FbDB2315678afecb367f032d93F642f64180aa3
LISK_TESTNET_RPC_URL=https://rpc.sepolia-api.lisk.com
```

### Network Configuration
```typescript
// lib/blockchain.ts
export const LISK_CHAIN_ID = 4202; // Lisk Sepolia
export const LISK_RPC_URL = 'https://rpc.sepolia-api.lisk.com';
export const LISK_CURRENCY_SYMBOL = 'LSK';
```

### dApp Integration Configuration
```typescript
// Lisk dApp addresses
export const LISK_DAPPS = {
  'Lisk DeFi': '0x...',
  'Lisk NFT Marketplace': '0x...',
  'Lisk Social': '0x...',
  'Lisk Governance': '0x...'
};
```

## 🎯 Usage Examples

### 1. Mint Social Architect
```typescript
import { useMintSocialArchitect } from '@/lib/hooks/useSocialArchitectContract';

const { mintSocialArchitect, isPending, error } = useMintSocialArchitect();

const handleMint = async () => {
  try {
    await mintSocialArchitect(playerAddress, 'SocialArchitect', 'Community Builder');
    // Redirect to story
    window.location.href = '/story';
  } catch (err) {
    console.error('Minting failed:', err);
  }
};
```

### 2. Create Community
```typescript
import { useCreateCommunity } from '@/lib/hooks/useSocialArchitectContract';

const { createCommunity, isPending } = useCreateCommunity();

const handleCreateCommunity = async () => {
  try {
    const communityId = await createCommunity('My Community', 'A great community for players');
    console.log('Community created with ID:', communityId);
  } catch (err) {
    console.error('Community creation failed:', err);
  }
};
```

### 3. Join Community
```typescript
import { useJoinCommunity } from '@/lib/hooks/useSocialArchitectContract';

const { joinCommunity, isPending } = useJoinCommunity();

const handleJoinCommunity = async (communityId: number) => {
  try {
    await joinCommunity(communityId);
    console.log('Successfully joined community');
  } catch (err) {
    console.error('Failed to join community:', err);
  }
};
```

### 4. Social Graph Management
```typescript
const [socialGraph, setSocialGraph] = useState({});

useEffect(() => {
  const fetchSocialGraph = async () => {
    const connections = await getSocialConnections(playerAddress);
    setSocialGraph(connections);
  };
  
  fetchSocialGraph();
}, [playerAddress]);
```

## 🐛 Troubleshooting

### Common Issues

1. **"Execution reverted for an unknown reason"**
   - **Cause**: Wrong contract address or ABI mismatch
   - **Solution**: Verify contract address in environment variables

2. **Community creation failing**
   - **Cause**: Insufficient gas or network issues
   - **Solution**: Check gas limits and network connectivity

3. **Social connections not updating**
   - **Cause**: State management issues
   - **Solution**: Refresh state and check contract interactions

### Debug Information
The Social Architect game includes comprehensive debug information:
- Community membership status
- Social connection count
- dApp integration status
- Guild membership status

## 🚀 Future Enhancements

### Planned Features
- [ ] Real Lisk dApp integration
- [ ] Advanced social graph analytics
- [ ] Community governance system
- [ ] Cross-chain community building
- [ ] Social influence scoring

### Technical Improvements
- [ ] Social graph optimization
- [ ] Community management tools
- [ ] dApp integration framework
- [ ] Social analytics dashboard
- [ ] Community performance metrics

## 📚 Resources

### Documentation
- [Lisk Documentation](https://lisk.com/documentation/)
- [Lisk SDK Documentation](https://lisk.com/documentation/lisk-sdk/)
- [Lisk dApp Development](https://lisk.com/documentation/lisk-sdk/development-guide/)
- [Lisk Testnet Explorer](https://testnet-explorer.lisk.com/)

### Tools
- [Lisk Testnet Faucet](https://testnet-faucet.lisk.com/)
- [Lisk dApp Studio](https://studio.lisk.com/)
- [Lisk Community Portal](https://community.lisk.com/)

### Contracts
- [Lisk Social Architect Contract](https://testnet-explorer.lisk.com/address/0x5FbDB2315678afecb367f032d93F642f64180aa3)
- [Lisk DeFi Protocol](https://testnet-explorer.lisk.com/address/0x...)
- [Lisk NFT Marketplace](https://testnet-explorer.lisk.com/address/0x...)

---

**Status**: ✅ **LIVE** - Lisk Social Architect deployed and ready for testing!

**Last Updated**: August 30, 2025
**Version**: 1.0.0
