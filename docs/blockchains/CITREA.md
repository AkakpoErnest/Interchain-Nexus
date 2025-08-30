# Citrea Bitcoin Rollup Integration

## Overview
Citrea is the first Bitcoin rollup that uses zero-knowledge proofs to bring smart contracts and Ethereum-compatible programmability to Bitcoin without changing its base layer. It enables Bitcoin to function as a fully programmable platform.

## Pioneer: The Bitcoin Oracle
- **Name**: The Bitcoin Oracle
- **Title**: Seer of the Original Chain
- **Realm**: Citrea
- **Rarity**: Legendary
- **Specialty**: Bitcoin smart contracts and EVM compatibility

## Technical Integration

### Network Details
- **Base Chain**: Bitcoin (L1)
- **Technology**: Zero-Knowledge Proofs + Rollup
- **Compatibility**: EVM-compatible
- **Security**: Inherits Bitcoin's security guarantees
- **Native Token**: BTC

### Smart Contract Features
```solidity
// Citrea Bitcoin rollup integration
contract BitcoinOracle {
    // Bitcoin state verification
    // EVM-compatible smart contracts
    // Bitcoin-native token operations
    // Cross-chain Bitcoin integration
}
```

### Game Integration
- **Puzzle Type**: Bitcoin Smart Contract Challenges
- **Mechanism**: Deploy and interact with Bitcoin-based smart contracts
- **Reward**: Bitcoin Seal Card
- **Bonus**: +30% success rate on Bitcoin puzzles

### Key Features
1. **Bitcoin Security**: Inherits Bitcoin's proof-of-work security
2. **EVM Compatibility**: Use familiar Ethereum tooling
3. **Smart Contracts**: Deploy contracts on Bitcoin
4. **₿apps**: Bitcoin-native applications

### Development Tools
- **Citrea SDK**: Official development tools
- **EVM Tooling**: Standard Ethereum development stack
- **Bitcoin Integration**: Native Bitcoin functionality
- **Testnet Faucet**: https://citrea.xyz/faucet

### Bitcoin Integration Examples
```javascript
// Citrea Bitcoin rollup example
import { CitreaProvider } from '@citrea/sdk';

const provider = new CitreaProvider('https://citrea-testnet.xyz');
const contract = new ethers.Contract(address, abi, provider);

// Deploy smart contract on Bitcoin
const tx = await contract.deploy();
await tx.wait();

// Interact with Bitcoin-based smart contract
const result = await contract.someFunction();
```

### Use Cases in Game
- **Bitcoin DeFi**: Decentralized finance on Bitcoin
- **Bitcoin NFTs**: Non-fungible tokens on Bitcoin
- **Bitcoin Gaming**: Game assets secured by Bitcoin
- **Bitcoin Identity**: Identity systems on Bitcoin

## Integration Checklist
- [ ] Set up Citrea testnet connection
- [ ] Deploy Bitcoin smart contracts
- [ ] Implement Bitcoin-native game mechanics
- [ ] Create Bitcoin puzzle challenges
- [ ] Test EVM compatibility on Bitcoin
