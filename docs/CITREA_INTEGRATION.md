# Citrea Integration Guide

This document describes the integration of Citrea (Bitcoin's first ZK rollup) into the Interchain Nexus project.

## Overview

Citrea is Bitcoin's first ZK rollup that brings smart contract functionality to Bitcoin while maintaining its security guarantees. This integration adds a new governance realm to the Interchain Nexus game.

## Features

### The Governance Guardian
- **Name**: The Governance Guardian
- **Title**: Guardian of Bitcoin Governance
- **Realm**: Citrea
- **Rarity**: Legendary
- **Description**: A master of Bitcoin governance through ZK rollup technology

### Key Abilities
1. **Bitcoin Integration**: Connect with Bitcoin's security model
2. **Governance Mastery**: Create and vote on governance proposals
3. **ZK Proof Verification**: Verify zero-knowledge proofs for Bitcoin transactions
4. **Bitcoin Connections**: Establish connections with Bitcoin ecosystem

## Technical Implementation

### Smart Contract
- **Contract**: `CitreaGovernanceGuardian.sol`
- **Network**: Citrea Testnet (Chain ID: 1001)
- **Features**:
  - Soulbound NFT (non-transferable)
  - Governance proposal creation
  - Voting system
  - ZK proof verification
  - Bitcoin connection tracking
  - Governance score system

### Network Configuration
```typescript
// Citrea Testnet
1001: {
  name: 'Citrea Testnet',
  chainId: 1001,
  nativeCurrency: { name: 'Citrea Bitcoin', symbol: 'cBTC', decimals: 18 },
  rpcUrls: { default: { http: ['https://rpc.citrea.xyz'] } },
  blockExplorers: { default: { name: 'Citrea Explorer', url: 'https://explorer.citrea.xyz' } },
}
```

### Component Integration
- **Component**: `CitreaGovernanceGuardian.tsx`
- **Features**:
  - Wallet connection for Citrea testnet
  - NFT minting interface
  - Governance actions (create proposals, vote)
  - ZK proof verification
  - Bitcoin connection management
  - Real-time governance score tracking

## Deployment

### Prerequisites
1. Citrea testnet RPC access
2. Test cBTC tokens from faucet
3. Private key for deployment

### Deployment Steps

1. **Get Test Tokens**
   ```bash
   # Visit the Citrea faucet
   https://citrea.xyz/faucet
   ```

2. **Configure Environment**
   ```bash
   # Add to .env file
   PRIVATE_KEY=your_private_key_here
   CITREA_TESTNET_RPC_URL=https://rpc.citrea.xyz
   NEXT_PUBLIC_PIONEER_CONTRACT_CITREA_TESTNET=0x...
   ```

3. **Deploy Contract**
   ```bash
   # Run deployment script
   ./scripts/deploy-citrea.sh
   ```

4. **Update Configuration**
   ```typescript
   // Update contract-config.ts
   1001: {
     pioneer: '0x...', // Deployed contract address
   }
   ```

## Usage

### For Players
1. Connect wallet to Citrea testnet
2. Select "The Governance Guardian" card
3. Mint the NFT with custom name and title
4. Participate in governance activities:
   - Create proposals
   - Cast votes
   - Verify ZK proofs
   - Make Bitcoin connections

### For Developers
1. Import the component:
   ```typescript
   import CitreaGovernanceGuardian from '@/components/citrea-governance-guardian'
   ```

2. Use in your application:
   ```tsx
   <CitreaGovernanceGuardian onMintSuccess={handleSuccess} />
   ```

## Governance Features

### Proposal Creation
- Create governance proposals with titles and IDs
- Track proposal creation in governance score
- Event emission for proposal tracking

### Voting System
- Cast votes on proposals (support/oppose)
- Track voting participation
- Update governance score based on participation

### ZK Proof Verification
- Verify different types of ZK proofs
- Track verification activities
- Maintain proof verification history

### Bitcoin Connections
- Establish connections with Bitcoin ecosystem
- Track connection types and activities
- Update governance score based on connections

## Scoring System

The Governance Guardian uses a comprehensive scoring system:

- **Starting Score**: 200 points
- **Proposal Creation**: +150 points per proposal
- **Voting**: +50 points per vote
- **ZK Proof Verification**: +100 points per proof
- **Bitcoin Connections**: +75 points per connection

## Integration with Game Flow

1. **Card Selection**: Players can select the Governance Guardian card
2. **Network Switching**: Automatic prompt to switch to Citrea testnet
3. **NFT Minting**: Custom name and title for the guardian
4. **Gameplay**: Participate in governance activities to increase score
5. **Progression**: Unlock additional features based on governance score

## Resources

- **Citrea Documentation**: https://docs.citrea.xyz
- **Citrea Faucet**: https://citrea.xyz/faucet
- **Citrea Explorer**: https://explorer.citrea.xyz
- **Citrea Discord**: https://discord.com/invite/citrea
- **Citrea GitHub**: https://github.com/chainwayxyz/citrea

## Troubleshooting

### Common Issues

1. **Network Connection**
   - Ensure you're connected to Citrea testnet
   - Check RPC URL configuration
   - Verify chain ID (1001)

2. **Transaction Failures**
   - Check cBTC balance for gas fees
   - Verify contract address
   - Ensure contract is deployed

3. **Component Issues**
   - Check wallet connection
   - Verify contract ABI
   - Ensure proper network switching

### Support

For technical support:
- Check Citrea documentation
- Join Citrea Discord community
- Review contract deployment logs
- Verify network configuration

## Future Enhancements

1. **Advanced Governance**
   - Multi-signature proposals
   - Delegation system
   - Time-locked voting

2. **Bitcoin Integration**
   - Lightning Network connections
   - Bitcoin transaction verification
   - Cross-chain bridge interactions

3. **ZK Proof Features**
   - Custom proof types
   - Proof verification rewards
   - Advanced cryptographic operations

4. **Social Features**
   - Governance leaderboards
   - Community proposals
   - Collaborative governance
