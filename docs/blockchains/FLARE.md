# Flare Integration

## Overview
Flare is a blockchain that provides developers with access to high-integrity data from other chains and the internet. It features the State Connector and Flare Time Series Oracle (FTSO).

## Pioneer: The Oracle Seer
- **Name**: The Oracle Seer
- **Title**: Truth Seeker of the Cosmos
- **Realm**: Flare
- **Rarity**: Epic
- **Specialty**: Oracle data and truth verification

## Technical Integration

### Network Details
- **Chain ID**: 14 (Mainnet), 114 (Testnet)
- **RPC URL**: `https://flare-api.flare.network/ext/C/rpc`
- **Block Explorer**: `https://flare-explorer.flare.network`
- **Native Token**: FLR (Flare)

### Smart Contract Features
```solidity
// Flare integration for Oracle Seer
import "@flarenetwork/flare-smart-contracts/contracts/StateConnector.sol";

contract OracleSeer {
    StateConnector public stateConnector;
    
    // Oracle data verification
    // Truth validation systems
    // Random number generation
    // Cross-chain data access
}
```

### Game Integration
- **Puzzle Type**: Oracle Spire (Dice rolling)
- **Mechanism**: Roll dice and verify outcomes with oracles
- **Reward**: Oracle Seal Card
- **Bonus**: +25% success rate on oracle puzzles

### Key Features
1. **State Connector**: Access data from other blockchains
2. **FTSO**: Decentralized price feeds and data
3. **Randomness**: Verifiable random number generation
4. **Cross-Chain Data**: Access to external blockchain data

### Development Tools
- **Flare SDK**: JavaScript library for Flare
- **Hardhat Flare**: Development environment
- **Flare Explorer**: Block explorer and tools
- **FTSO API**: Access to oracle data feeds

### Oracle Integration
```javascript
// Flare oracle example
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider(FLARE_RPC);
const ftso = new ethers.Contract(FTSO_ADDRESS, FTSO_ABI, provider);

// Get price data
const priceData = await ftso.getCurrentPrice();
const randomValue = await ftso.getRandom();
```

### Oracle Features
- **Price Feeds**: Real-time price data from FTSO
- **Random Numbers**: Verifiable randomness for games
- **State Proofs**: Verify data from other blockchains
- **Data Validation**: Ensure data integrity and truth

### Puzzle Mechanics
1. **Dice Rolling**: Use Flare's randomness for fair dice rolls
2. **Oracle Verification**: Verify dice outcomes with oracle data
3. **Truth Validation**: Validate game results against oracle data
4. **Cross-Chain Proofs**: Use State Connector for verification

### FTSO Integration
- **Price Feeds**: Access to real-time price data
- **Random Generation**: Verifiable random numbers
- **Data Feeds**: Various data sources for game mechanics
- **Validation**: Ensure data accuracy and integrity

## Integration Checklist
- [ ] Set up Flare network connection
- [ ] Implement FTSO integration
- [ ] Build oracle verification system
- [ ] Create randomness mechanisms
- [ ] Test oracle spire puzzles
- [ ] Integrate with State Connector
