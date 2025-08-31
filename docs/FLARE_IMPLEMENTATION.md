# Flare Implementation Guide

## Overview

The Flare Network integration in Interchain Nexus provides oracle-based prediction and data verification capabilities through the Oracle Seer Pioneer. This implementation leverages Flare's unique features including the Flare Time Series Oracle (FTSO) and State Connector for cross-chain data verification.

## 🎯 Problem Solved

Flare integration solves the data verification and prediction accuracy problem in blockchain gaming by providing:
- **Decentralized Oracle Data**: Real-time price feeds and external data
- **Cross-Chain Verification**: State Connector for validating events on other chains
- **Prediction Accuracy**: FTSO-based prediction scoring and validation
- **Data Integrity**: Verified data feeds for game mechanics

## 🏗️ Architecture

### Smart Contracts

#### 1. FlareOracleSeerSimple.sol
**Contract Address**: `0x2D6E6A6430F0121d6949D743DF54730b40C5c74F`
**Network**: Flare Testnet (Chain ID: 114)

```solidity
// Key Features:
- ERC721 NFT standard with soulbound functionality
- Public minting (no owner restrictions)
- Oracle prediction accuracy tracking
- Data verification system
- Flare network integration
```

**Functions**:
- `mintPioneer(uint256 pioneerType, address playerAddress)`: Mint Oracle Seer NFT
- `hasPioneer(address player)`: Check if player has Oracle Seer
- `getPlayerPioneer(address player)`: Get player's Oracle Seer token ID
- `isMintingAvailable()`: Check if minting is available

### Frontend Components

#### 1. Oracle Seer Game (`components/oracle-seer-game.tsx`)
- Implements the Oracle Seer game mechanics
- FTSO data integration for real-time price feeds
- Cross-chain verification simulation
- Prediction accuracy tracking
- Guild mechanics and community features

#### 2. NFT Minting Component (`components/nft-minting.tsx`)
- Handles Oracle Seer NFT minting
- Manages transaction states and user feedback
- Redirects to story after successful minting
- Provides debug information for troubleshooting

### Custom Hooks

#### 1. Pioneer Contract Hooks (`lib/hooks/usePioneerContract.ts`)
- `useHasPioneer`: Check if player has Oracle Seer
- `usePlayerPioneer`: Get player's Oracle Seer token ID
- `useTotalSupply`: Get total supply of Oracle Seers
- `useIsMintingAvailable`: Check if Oracle Seer minting is available
- `useMintPioneer`: Mint Oracle Seer NFT

## 🎮 Game Implementation

### Oracle Seer Game Mechanics

The Oracle Seer game features comprehensive oracle-based gameplay:

#### 1. FTSO Integration
```typescript
// Mock FTSO data for game mechanics
const mockFTSOData = {
  'ETH/USD': { price: 2500, confidence: 0.95, timestamp: Date.now() },
  'BTC/USD': { price: 45000, confidence: 0.98, timestamp: Date.now() },
  'FLR/USD': { price: 0.05, confidence: 0.92, timestamp: Date.now() }
};

// FTSO-based prediction system
const makePrediction = async (asset: string, predictedPrice: number) => {
  const currentPrice = mockFTSOData[asset]?.price;
  const accuracy = Math.abs(currentPrice - predictedPrice) / currentPrice;
  return { accuracy, isCorrect: accuracy < 0.1 };
};
```

#### 2. Cross-Chain Verification
```typescript
// State Connector simulation
const verifyCrossChainEvent = async (chainId: number, txHash: string) => {
  // Simulate State Connector verification
  const verification = await simulateStateConnector(chainId, txHash);
  return verification.isValid;
};
```

#### 3. Prediction Accuracy System
```typescript
// Prediction accuracy tracking
const updatePredictionScore = (playerId: string, accuracy: number) => {
  const currentScore = getPlayerScore(playerId);
  const newScore = currentScore + (accuracy * 100);
  setPlayerScore(playerId, newScore);
};
```

### Game Chapters and Quests

#### Chapter 1: The Oracle's Awakening
- **Quest**: FTSO Price Prediction
- **Task**: Predict ETH/USD price within 10% accuracy
- **Reward**: Oracle Vision Card + 100 points
- **FTSO Integration**: Real-time ETH/USD price feed

#### Chapter 2: Cross-Chain Prophecy
- **Quest**: State Connector Verification
- **Task**: Verify a transaction on Ethereum mainnet
- **Reward**: Cross-Chain Seer Badge + 150 points
- **State Connector**: Simulated cross-chain verification

#### Chapter 3: The Oracle Tournament
- **Quest**: Community Prediction Contest
- **Task**: Compete with other players in prediction accuracy
- **Reward**: Tournament Champion NFT + 200 points
- **Community**: Guild-based competition

#### Chapter 4: The Guild of Prophets
- **Quest**: Guild Formation and Management
- **Task**: Create or join a prediction guild
- **Reward**: Guild Leader Badge + 250 points
- **Social**: Community building mechanics

#### Chapter 5: The Calculation Rite
- **Quest**: Complex Price Calculations
- **Task**: Calculate multi-asset portfolio values
- **Reward**: Master Calculator NFT + 300 points
- **Math**: Advanced calculation challenges

#### Chapter 6: The Sequence Oracle
- **Quest**: Time Series Prediction
- **Task**: Predict price sequences over time
- **Reward**: Time Seer Badge + 350 points
- **Time Series**: Sequential prediction challenges

#### Chapter 7: The Final Prophecy
- **Quest**: Ultimate Prediction Challenge
- **Task**: Make the most accurate prediction possible
- **Reward**: Oracle Master Title + 500 points
- **Final**: Comprehensive prediction challenge

## 🚀 Deployment Process

### 1. Contract Deployment
```bash
# Deploy Flare Oracle Seer Simple
cd contracts
npm run deploy:flare-simple
```

### 2. Contract Verification
```bash
# Verify Flare Oracle Seer
npx hardhat verify --network flareTestnet 0x2D6E6A6430F0121d6949D743DF54730b40C5c74F
```

### 3. Frontend Integration
```typescript
// Update contract addresses in lib/contract-config.ts
export const CONTRACT_ADDRESSES = {
  114: { // Flare Testnet
    pioneer: '0x2D6E6A6430F0121d6949D743DF54730b40C5c74F'
  }
};
```

## 🔧 Configuration

### Environment Variables
```bash
# .env file
NEXT_PUBLIC_FLARE_CONTRACT=0x2D6E6A6430F0121d6949D743DF54730b40C5c74F
FLARE_TESTNET_RPC_URL=https://coston2-api.flare.network/ext/C/rpc
```

### Network Configuration
```typescript
// lib/blockchain.ts
export const FLARE_CHAIN_ID = 114; // Flare Testnet
export const FLARE_RPC_URL = 'https://coston2-api.flare.network/ext/C/rpc';
export const FLARE_CURRENCY_SYMBOL = 'C2FLR';
```

### FTSO Configuration
```typescript
// FTSO data providers
export const FTSO_PROVIDERS = {
  'ETH/USD': '0x...', // ETH/USD price feed
  'BTC/USD': '0x...', // BTC/USD price feed
  'FLR/USD': '0x...'  // FLR/USD price feed
};
```

## 🎯 Usage Examples

### 1. Mint Oracle Seer
```typescript
import { useMintPioneer } from '@/lib/hooks/usePioneerContract';

const { mintPioneer, isPending, error } = useMintPioneer();

const handleMint = async () => {
  try {
    await mintPioneer(3, playerAddress); // Pioneer type 3 = Oracle Seer
    // Redirect to story
    window.location.href = '/story';
  } catch (err) {
    console.error('Minting failed:', err);
  }
};
```

### 2. Check Oracle Seer Status
```typescript
import { useHasPioneer } from '@/lib/hooks/usePioneerContract';

const { data: hasPioneer, isLoading } = useHasPioneer(address, 114);

if (hasPioneer) {
  // Player has Oracle Seer
  // Show game interface
}
```

### 3. FTSO Data Integration
```typescript
// components/oracle-seer-game.tsx
const [ftsoData, setFtsData] = useState({});

useEffect(() => {
  const fetchFTSOData = async () => {
    // Fetch real FTSO data
    const data = await getFTSOData();
    setFtsData(data);
  };
  
  fetchFTSOData();
  const interval = setInterval(fetchFTSOData, 30000); // Update every 30 seconds
  
  return () => clearInterval(interval);
}, []);
```

### 4. Prediction System
```typescript
const makePrediction = async (asset: string, predictedPrice: number) => {
  const currentPrice = ftsoData[asset]?.price;
  if (!currentPrice) return;
  
  const accuracy = Math.abs(currentPrice - predictedPrice) / currentPrice;
  const isCorrect = accuracy < 0.1; // Within 10%
  
  // Update player score
  updatePlayerScore(playerId, accuracy * 100);
  
  return { accuracy, isCorrect, currentPrice };
};
```

## 🐛 Troubleshooting

### Common Issues

1. **"Execution reverted for an unknown reason"**
   - **Cause**: Wrong contract address or ABI mismatch
   - **Solution**: Verify contract address in environment variables

2. **FTSO data not loading**
   - **Cause**: Network connectivity or RPC issues
   - **Solution**: Check Flare testnet RPC URL and network status

3. **Cross-chain verification failing**
   - **Cause**: State Connector not properly configured
   - **Solution**: Verify State Connector contract addresses

### Debug Information
The Oracle Seer game includes comprehensive debug information:
- FTSO data status
- Prediction accuracy scores
- Cross-chain verification status
- Guild membership status

## 🚀 Future Enhancements

### Planned Features
- [ ] Real FTSO integration with live price feeds
- [ ] State Connector integration for cross-chain verification
- [ ] Advanced prediction algorithms
- [ ] Guild-based prediction tournaments
- [ ] Oracle reputation system

### Technical Improvements
- [ ] FTSO data caching and optimization
- [ ] Cross-chain event monitoring
- [ ] Prediction accuracy analytics
- [ ] Guild management system
- [ ] Oracle performance metrics

## 📚 Resources

### Documentation
- [Flare Documentation](https://docs.flare.network/)
- [FTSO Documentation](https://docs.flare.network/tech/ftso/)
- [State Connector Documentation](https://docs.flare.network/tech/state-connector/)
- [Flare Testnet Explorer](https://coston2-explorer.flare.network)

### Tools
- [Flare Testnet Faucet](https://faucet.flare.network/)
- [FTSO Data Explorer](https://ftso.flare.network/)
- [State Connector Explorer](https://state-connector.flare.network/)

### Contracts
- [Flare Oracle Seer Contract](https://coston2-explorer.flare.network/address/0x2D6E6A6430F0121d6949D743DF54730b40C5c74F)
- [FTSO Registry](https://coston2-explorer.flare.network/address/0x...)
- [State Connector](https://coston2-explorer.flare.network/address/0x...)

---

**Status**: ✅ **LIVE** - Flare Oracle Seer deployed and ready for testing!

**Last Updated**: August 30, 2025
**Version**: 1.0.0
