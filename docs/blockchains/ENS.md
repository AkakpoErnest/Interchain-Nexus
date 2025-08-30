# ENS (Ethereum Name Service) Integration

## Overview
ENS is a distributed, open, and extensible naming system based on the Ethereum blockchain. It maps human-readable names to machine-readable identifiers.

## Pioneer: The Identity Guardian
- **Name**: The Identity Guardian
- **Title**: Keeper of Names
- **Realm**: ENS
- **Rarity**: Epic
- **Specialty**: Digital identity and naming systems

## Technical Integration

### Network Details
- **Chain ID**: 1 (Ethereum Mainnet)
- **RPC URL**: `https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY`
- **Block Explorer**: `https://etherscan.io`
- **ENS Registry**: `0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e`

### Smart Contract Features
```solidity
// ENS integration for Identity Guardian
import "@ensdomains/ens-contracts/contracts/registry/ENS.sol";

contract IdentityGuardian {
    ENS public ens;
    
    // Name resolution and verification
    // Identity management
    // Cross-chain name binding
}
```

### Game Integration
- **Puzzle Type**: Hall of Names (Identity verification)
- **Mechanism**: Solve naming puzzles and verify identities
- **Reward**: True Name Card
- **Bonus**: +25% success rate on identity puzzles

### Key Features
1. **Human-Readable Names**: `player.eth` instead of `0x1234...`
2. **Cross-Chain Support**: Works across multiple blockchains
3. **Subdomain Management**: Create and manage subdomains
4. **Reverse Resolution**: Get name from address

### Development Tools
- **ENS SDK**: JavaScript library for ENS interactions
- **ethers.js**: ENS provider integration
- **ENS App**: Web interface for name management
- **Graph Protocol**: ENS subgraph for queries

### Contract Integration
```javascript
// ENS resolution example
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider(process.env.ETH_RPC);
const ens = new ethers.Contract(ENS_REGISTRY, ENS_ABI, provider);

// Resolve name to address
const address = await ens.resolver(ethers.utils.namehash('player.eth'));
```

### Identity Features
- **Name Registration**: Register `.eth` domains
- **Subdomain Creation**: Create custom subdomains
- **Profile Management**: Link social profiles to ENS names
- **Cross-Chain Identity**: Use ENS names across different chains

### Puzzle Mechanics
1. **Name Resolution**: Players must resolve ENS names to addresses
2. **Subdomain Creation**: Create and manage subdomains
3. **Profile Verification**: Verify identity through ENS records
4. **Cross-Chain Binding**: Bind names across multiple networks

## Integration Checklist
- [ ] Set up ENS SDK
- [ ] Implement name resolution
- [ ] Create identity verification system
- [ ] Build subdomain management
- [ ] Test hall of names puzzles
- [ ] Integrate with Ethereum mainnet
