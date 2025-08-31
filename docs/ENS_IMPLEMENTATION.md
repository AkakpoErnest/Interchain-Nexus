# ENS Implementation Guide

## Overview

The ENS (Ethereum Name Service) integration in Interchain Nexus provides a comprehensive identity management system that allows players to establish their digital identity across the blockchain ecosystem. This implementation includes smart contracts, story systems, and real ENS interactions.

## 🎯 Problem Solved

ENS integration solves the identity fragmentation problem in blockchain gaming by providing:
- **Unified Identity**: Single identity that works across all networks
- **Human-Readable Names**: Replace complex addresses with memorable names
- **Cross-Chain Recognition**: Identity verification that spans multiple blockchains
- **Trust Building**: Reputation and trust scores tied to ENS identity

## 🏗️ Architecture

### Smart Contracts

#### 1. EnsIdentityGuardianSimple.sol
**Contract Address**: `0xD02dc1Ac6744bAE948Ba68B8e0Bb82Db5d78e1A4`
**Network**: Ethereum Sepolia (Chain ID: 11155111)

```solidity
// Key Features:
- ERC721 NFT standard with soulbound functionality
- Public minting (no owner restrictions)
- ENS integration capabilities
- Identity verification system
- Trust score tracking
```

**Functions**:
- `mintPioneer(uint256 pioneerType, address playerAddress)`: Mint Identity Guardian NFT
- `hasPioneer(address player)`: Check if player has Identity Guardian
- `getPlayerPioneer(address player)`: Get player's Identity Guardian token ID
- `isMintingAvailable()`: Check if minting is available

#### 2. SimpleConfidentialEnsIdentityGuardian.sol
**Contract Address**: `0x...` (To be deployed)
**Network**: Ethereum Sepolia (Chain ID: 11155111)

```solidity
// Key Features:
- Zama Protocol integration with FHE
- Confidential identity management
- Privacy-preserving ENS interactions
- Encrypted data storage and processing
```

**Functions**:
- `mintConfidentialPioneer(uint256 pioneerType, address playerAddress)`: Mint confidential Identity Guardian
- `hasConfidentialPioneer(address player)`: Check if player has confidential Identity Guardian
- `getConfidentialPioneerData(address player)`: Get confidential pioneer data

### Frontend Components

#### 1. ENS Minting Component (`components/ens-minting.tsx`)
- Handles ENS Identity Guardian NFT minting
- Provides debug information for troubleshooting
- Manages transaction states and user feedback
- Redirects to ENS story after successful minting

#### 2. ENS Story System (`app/ens-story/page.tsx`)
- Implements "The Oracle of the Eternal Names" narrative
- Seven mystical trials with automatic blockchain interactions
- Visual Oracle action overlay with cosmic animations
- Progress tracking and localStorage persistence

#### 3. ENS Trial System (`components/ens-trial-system.tsx`)
- Manages the seven trials of ENS mastery
- Handles real ENS interactions (reverse records, text records, avatar records)
- Provides visual feedback and progress tracking

### Custom Hooks

#### 1. ENS Pioneer Contract Hooks (`lib/hooks/useEnsPioneerContract.ts`)
- `useHasEnsPioneer`: Check if player has ENS Identity Guardian
- `usePlayerEnsPioneer`: Get player's ENS Identity Guardian token ID
- `useEnsTotalSupply`: Get total supply of ENS Identity Guardians
- `useEnsIsMintingAvailable`: Check if ENS minting is available
- `useMintEnsPioneer`: Mint ENS Identity Guardian NFT

## 🎮 Game Implementation

### Story System: "The Oracle of the Eternal Names"

The ENS Identity Guardian features a comprehensive story system with seven mystical trials:

#### Trial 1: The Summoning
- **Oracle Message**: "In the fractured realms of the blockchain multiverse..."
- **Task**: Automatic ENS name verification
- **Reward**: Personal Name Scroll (game journal) + Title: Seer of Light
- **ENS Action**: Automatic ENS name verification

#### Trial 2: The Reverse Record Rite
- **Oracle Message**: "Speak your name backward, so all chains may know thee..."
- **Task**: Set reverse record for ENS name
- **Reward**: Namebound Seer NFT + unlock next level
- **ENS Action**: Set reverse record (address → ENS name)

#### Trial 3: The Prophecy Logbook
- **Oracle Message**: "Write thine deeds upon the scroll of your name..."
- **Task**: Set text record on ENS
- **Reward**: Scroll Fragment NFT
- **ENS Action**: Set text record (quest1 = complete)

#### Trial 4: The Avatar Rite
- **Oracle Message**: "Let your face be seen, lest you walk nameless..."
- **Task**: Set avatar record on ENS
- **Reward**: Oracle Mask cosmetic NFT
- **ENS Action**: Set avatar record (image hash/NFT PFP)

#### Trial 5: The Guild of Names
- **Oracle Message**: "Form a fellowship, bound by names..."
- **Task**: Create or join ENS subdomain
- **Reward**: Guild NFT badge + access to guild-only quests
- **ENS Action**: Create/join ENS subdomain (alice.seerorder.eth)

#### Trial 6: The Oracle Tournament
- **Oracle Message**: "The Oracle poses riddles..."
- **Task**: Answer riddles via ENS text records
- **Reward**: Rare Prophecy NFT
- **ENS Action**: Set oracle_riddle text record with answer

#### Trial 7: The Eternal Binding
- **Oracle Message**: "Your name is now eternal..."
- **Task**: Complete all previous trials
- **Reward**: Master of Names title + full ENS mastery
- **ENS Action**: Final verification of all ENS records

## 🚀 Deployment Process

### 1. Contract Deployment
```bash
# Deploy ENS Identity Guardian Simple
cd contracts
npm run deploy:ens-simple

# Deploy Zama Confidential ENS
npm run deploy:simple-confidential-ens
```

### 2. Contract Verification
```bash
# Verify ENS Identity Guardian
npx hardhat verify --network sepolia 0xD02dc1Ac6744bAE948Ba68B8e0Bb82Db5d78e1A4

# Verify Zama Confidential ENS
npx hardhat verify --network sepolia [CONTRACT_ADDRESS]
```

### 3. Frontend Integration
```typescript
// Update contract addresses in lib/contract-config.ts
export const CONTRACT_ADDRESSES = {
  11155111: { // Ethereum Sepolia
    ensPioneer: '0xD02dc1Ac6744bAE948Ba68B8e0Bb82Db5d78e1A4',
    confidentialEns: '[ZAMA_CONTRACT_ADDRESS]'
  }
};
```

## 🔧 Configuration

### Environment Variables
```bash
# .env file
NEXT_PUBLIC_ENS_CONTRACT_SEPOLIA=0xD02dc1Ac6744bAE948Ba68B8e0Bb82Db5d78e1A4
NEXT_PUBLIC_CONFIDENTIAL_ENS_SEPOLIA=[ZAMA_CONTRACT_ADDRESS]
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
```

### Network Configuration
```typescript
// lib/blockchain.ts
export const ENS_CHAIN_ID = 11155111; // Ethereum Sepolia
export const ENS_REGISTRY_ADDRESS = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';
export const REVERSE_REGISTRAR_ADDRESS = '0x6F628b68b30Dc3c17f336cBdb8121d3b75D6D83d';
export const PUBLIC_RESOLVER_ADDRESS = '0x8FADE66Ba79cD89eEFcEbe2a03b2226Fd1A77335';
```

## 🎯 Usage Examples

### 1. Mint ENS Identity Guardian
```typescript
import { useMintEnsPioneer } from '@/lib/hooks/useEnsPioneerContract';

const { mintEnsPioneer, isPending, error } = useMintEnsPioneer();

const handleMint = async () => {
  try {
    await mintEnsPioneer(1, playerAddress); // Pioneer type 1 = Identity Guardian
    // Redirect to ENS story
    window.location.href = '/ens-story';
  } catch (err) {
    console.error('Minting failed:', err);
  }
};
```

### 2. Check ENS Pioneer Status
```typescript
import { useHasEnsPioneer } from '@/lib/hooks/useEnsPioneerContract';

const { data: hasPioneer, isLoading } = useHasEnsPioneer(address, 11155111);

if (hasPioneer) {
  // Player has ENS Identity Guardian
  // Show story or game interface
}
```

### 3. ENS Story Integration
```typescript
// app/ens-story/page.tsx
const [currentChapter, setCurrentChapter] = useState(0);
const [isOracleActing, setIsOracleActing] = useState(false);

const simulateOracleAction = async (chapterIndex: number) => {
  const chapter = ENS_STORY_CHAPTERS[chapterIndex];
  setIsOracleActing(true);
  setOracleAction(chapter.ensAction || '');
  
  // Simulate blockchain interaction
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Store action in localStorage
  const actions = JSON.parse(localStorage.getItem('ensActions') || '[]');
  actions.push({
    chapter: chapterIndex,
    action: chapter.ensAction,
    timestamp: Date.now()
  });
  localStorage.setItem('ensActions', JSON.stringify(actions));
  
  setIsOracleActing(false);
  setOracleAction('');
};
```

## 🐛 Troubleshooting

### Common Issues

1. **"Execution reverted for an unknown reason"**
   - **Cause**: Wrong contract address or ABI mismatch
   - **Solution**: Verify contract address in environment variables

2. **"Cannot read properties of undefined"**
   - **Cause**: Missing chain ID or address
   - **Solution**: Add null checks for chainId and address

3. **ENS interactions not working**
   - **Cause**: Wrong ENS contract addresses
   - **Solution**: Verify ENS Registry, Reverse Registrar, and Public Resolver addresses

### Debug Information
The ENS minting component includes comprehensive debug information:
- Chain support status
- Contract addresses
- Minting availability
- Pioneer status
- Button disabled state

## 🚀 Future Enhancements

### Planned Features
- [ ] Real ENS name registration integration
- [ ] ENS subdomain management
- [ ] Cross-chain ENS identity verification
- [ ] ENS-based reputation system
- [ ] ENS avatar integration with NFT PFPs

### Technical Improvements
- [ ] Batch ENS operations
- [ ] ENS name resolution caching
- [ ] Multi-signature ENS management
- [ ] ENS-based access control
- [ ] ENS integration with other Pioneer types

## 📚 Resources

### Documentation
- [ENS Documentation](https://docs.ens.domains/)
- [ENS Registry Contract](https://etherscan.io/address/0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e)
- [Reverse Registrar Contract](https://etherscan.io/address/0x6F628b68b30Dc3c17f336cBdb8121d3b75D6D83d)
- [Public Resolver Contract](https://etherscan.io/address/0x8FADE66Ba79cD89eEFcEbe2a03b2226Fd1A77335)

### Tools
- [ENS Manager](https://app.ens.domains/)
- [ENS Namehash Calculator](https://swolfeyes.github.io/ethereum-namehash-calculator/)
- [ENS Subgraph](https://thegraph.com/explorer/subgraph/ensdomains/ens)

---

**Status**: ✅ **LIVE** - ENS Identity Guardian deployed and ready for testing!

**Last Updated**: August 31, 2025
**Version**: 1.0.0
