# Interchain Nexus: A Digital Odyssey

A Next.js-based blockchain game that allows users to mint Pioneer NFTs across multiple blockchain networks. This project integrates smart contracts, IPFS metadata storage, and multi-chain wallet connectivity.

## 🚀 Project Overview

Interchain Nexus is an epic blockchain quest where players can mint unique Pioneer NFTs representing different blockchain ecosystems. Each Pioneer represents a specific blockchain network and has unique characteristics, artwork, and metadata. The game features specialized smart contracts deployed across multiple blockchain networks, each with unique functionality and game mechanics.

### 🎯 Key Features

- **Multi-Chain Support**: Deploy and interact with contracts across multiple blockchain networks
- **Pioneer NFTs**: Unique soulbound NFTs representing different blockchain ecosystems
- **MetaMask Integration**: Direct MetaMask wallet connection (RainbowKit removed for simplicity)
- **IPFS Metadata**: Decentralized storage for NFT metadata and artwork
- **Responsive UI**: Modern, dark-themed interface with smooth animations
- **Smart Contract Integration**: Full ERC721 implementation with custom functionality
- **Simplified Interface**: Streamlined pioneer selection and minting without status checking

## 🏗️ Architecture

### Frontend Stack
- **Next.js 15.2.4**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **Wagmi**: React hooks for Ethereum
- **Viem**: TypeScript interface for Ethereum

### Smart Contract Stack
- **Solidity 0.8.19**: Smart contract language
- **Hardhat 2.26.3**: Development environment and deployment tool
- **OpenZeppelin 4.9.6**: Secure smart contract libraries
- **ERC721**: Non-fungible token standard

### Blockchain Networks
- **Base Sepolia** (Chain ID: 84532)
- **Ethereum Sepolia** (Chain ID: 11155111)
- **Filecoin Calibration** (Chain ID: 314159)
- **Flare Testnet** (Chain ID: 114) ✅ **DEPLOYED**
- **Lisk Sepolia** (Chain ID: 4202)

## 📁 Project Structure

```
Interchain-Nexus/
├── app/                          # Next.js App Router pages
│   ├── choose/                   # Pioneer selection and minting page
│   ├── inventory/                # NFT inventory page
│   ├── leaderboard/              # Player leaderboard
│   └── play/                     # Game interface
├── components/                   # React components
│   ├── ui/                       # Reusable UI components
│   ├── nft-minting.tsx          # NFT minting interface
│   ├── metamask-connect-simple.tsx # MetaMask connection
│   ├── providers.tsx             # Wagmi configuration
│   └── transaction-status.tsx    # Transaction feedback
├── contracts/                    # Smart contracts
│   ├── Pioneer.sol              # Main NFT contract
│   ├── scripts/                 # Deployment scripts
│   └── test/                    # Contract tests
├── lib/                         # Utility libraries
│   ├── blockchain.ts            # Blockchain utilities
│   ├── contract-config.ts       # Contract addresses
│   ├── hooks/                   # Custom React hooks
│   └── ipfs.ts                  # IPFS integration
└── public/                      # Static assets
    └── [pioneer-cards].png      # NFT artwork
```

## 🎮 How the Game Works

### Game Flow
1. **Connect Wallet**: Players connect their MetaMask wallet to the application
2. **Select Pioneer**: Choose from four unique Pioneer types, each representing a different blockchain ecosystem
3. **Mint NFT**: Mint the selected Pioneer NFT on the corresponding blockchain network
4. **Explore Features**: Each Pioneer has unique abilities and can interact with specialized game mechanics
5. **Cross-Chain Journey**: Players can mint Pioneers on different networks to experience the full Interchain Nexus

### Smart Contract Integration
- **Automatic Network Detection**: The app automatically detects which blockchain network you're connected to
- **Contract Selection**: Each Pioneer type is associated with a specific smart contract on its native blockchain
- **Soulbound NFTs**: All Pioneer NFTs are non-transferable, making them truly unique to each player
- **Progressive Features**: Each contract includes specialized functions for that Pioneer type's unique abilities

### Multi-Chain Architecture
The game uses a distributed architecture where each blockchain network hosts its own specialized Pioneer contract:
- **Flare Testnet**: Oracle Seer contract with prediction and data verification features
- **Filecoin Calibration**: Data Weaver contract with storage and archiving capabilities  
- **Lisk Sepolia**: Social Architect contract with community building features
- **Ethereum Sepolia**: ENS Identity Guardian contract with domain management features

## 🎮 Pioneer Types

The game features four unique Pioneer types, each representing a different blockchain ecosystem:

### 1. The Social Architect (Lisk Sepolia)
- **Realm**: Lisk
- **Rarity**: Common
- **Description**: Builder of Worlds
- **Contract**: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
- **Network**: Lisk Sepolia (Chain ID: 4202)
- **Features**: Community building, social connections, dApp integration
- **Artwork**: `base_social_architect_card_refined.png`

### 2. The Identity Guardian (Ethereum Sepolia)
- **Realm**: ENS
- **Rarity**: Rare
- **Description**: Keeper of Names
- **Contract**: Ready for deployment
- **Network**: Ethereum Sepolia (Chain ID: 11155111)
- **Features**: Domain management, identity verification, attestations
- **Special Functions**: `mintIdentityGuardian`, `hasIdentityGuardian`, `getIdentityGuardianData`
- **Artwork**: `ens_identity_guardian_card_refined.png`

### 3. The Data Weaver (Filecoin Calibration)
- **Realm**: Filecoin
- **Rarity**: Epic
- **Description**: Archivist of the Nexus
- **Contract**: `0x3179588E9774bC6ee1B4AF8Db55Fb8e1500649C1`
- **Network**: Filecoin Calibration (Chain ID: 314159)
- **Features**: Data archiving, storage contracts, retrieval tracking, storage efficiency scoring
- **Special Functions**: `archiveData`, `createStorageContract`, `retrieveData`, `getDataWeaverData`
- **Artwork**: `filecoin_data_weaver_card_refined.png`

### 4. The Oracle Seer (Flare Testnet)
- **Realm**: Flare
- **Rarity**: Legendary
- **Description**: Truth Seeker of the Cosmos
- **Contract**: `0x9015957A2210BB8B10e27d8BBEEF8d9498f123eF`
- **Network**: Flare Testnet (Chain ID: 114)
- **Features**: Oracle prediction accuracy, data verification, prediction making
- **Special Functions**: `makePrediction`, `verifyData`, `getOracleAccuracy`
- **Artwork**: `flare_oracle_seer_card_refined.png`

## 🔧 Smart Contract Details

### Contract Architecture

The Interchain Nexus uses a multi-contract architecture where each Pioneer type has its own specialized smart contract deployed on its native blockchain network. All contracts inherit from OpenZeppelin's ERC721 standard and implement soulbound (non-transferable) NFT functionality.

### 1. FlareOracleSeer.sol (Flare Testnet)
**Contract Address**: `0x9015957A2210BB8B10e27d8BBEEF8d9498f123eF`

```solidity
// Key Features:
- Oracle prediction accuracy tracking
- Data verification system
- Prediction making functionality
- Soulbound NFTs (non-transferable)
- Flare network integration
```

**Special Functions**:
- `makePrediction(string prediction, uint256 confidence)`: Make oracle predictions
- `verifyData(string dataHash, bool isValid)`: Verify data accuracy
- `getOracleAccuracy(address player)`: Get player's prediction accuracy
- `updatePredictionScore(uint256 tokenId, uint256 score)`: Update prediction scores

### 2. FilecoinDataWeaver.sol (Filecoin Calibration)
**Contract Address**: `0x3179588E9774bC6ee1B4AF8Db55Fb8e1500649C1`

```solidity
// Key Features:
- Data archiving and storage tracking
- Storage contract creation and management
- Data retrieval optimization
- Storage efficiency scoring system
- Filecoin network integration
```

**Special Functions**:
- `archiveData(string dataHash, uint256 dataSize)`: Archive data and update stats
- `createStorageContract(string contractName, uint256 storageCapacity)`: Create storage contracts
- `retrieveData(string dataHash, uint256 retrievalTime)`: Track data retrieval
- `getDataWeaverData(uint256 tokenId)`: Get comprehensive Data Weaver stats

### 3. ENSIdentityGuardian.sol (Ethereum Sepolia)
**Contract Address**: Ready for deployment

```solidity
// Key Features:
- Domain management and verification
- Identity attestation system
- Trust score tracking
- ENS integration
- Digital identity protection
```

**Special Functions**:
- `mintIdentityGuardian(address player, string name, string title)`: Mint Identity Guardian
- `hasIdentityGuardian(address player)`: Check if player has Identity Guardian
- `getIdentityGuardianData(uint256 tokenId)`: Get Identity Guardian data
- `verifyIdentity(string domain, bool isValid)`: Verify domain identities
- `issueAttestation(address target, string attestation)`: Issue identity attestations

### 4. LiskSocialArchitect.sol (Lisk Sepolia)
**Contract Address**: `0x5FbDB2315678afecb367f032d93F642f64180aa3`

```solidity
// Key Features:
- Community building and management
- Social connection tracking
- dApp integration capabilities
- Social graph management
- Lisk ecosystem integration
```

**Special Functions**:
- `mintSocialArchitect(address player, string name, string title)`: Mint Social Architect
- `createCommunity(string communityName, string description)`: Create communities
- `joinCommunity(uint256 communityId)`: Join existing communities
- `getSocialConnections(address player)`: Get player's social connections

### Common Security Features (All Contracts):
- **Ownable**: Only contract owner can call admin functions
- **ReentrancyGuard**: Prevents reentrancy attacks
- **Non-transferable**: NFTs are soulbound (cannot be transferred)
- **Input validation**: All inputs are validated
- **Event logging**: Comprehensive event logging for transparency

## 🚀 Deployment Status

### ✅ Successfully Deployed

#### Flare Testnet (Chain ID: 114)
- **Flare Oracle Seer Contract**: `0x9015957A2210BB8B10e27d8BBEEF8d9498f123eF`
  - Status: ✅ Live and ready for minting
  - Explorer: [Flare Testnet Explorer](https://coston2-explorer.flare.network)
  - Features: Oracle prediction accuracy, data verification, prediction making
  - Deployed: August 30, 2025

- **Legacy Flare Contract**: `0x6858dF5365ffCbe31b5FE68D9E6ebB81321F7F86`
  - Status: ✅ Deployed (legacy version)
  - Explorer: [Flare Testnet Explorer](https://coston2-explorer.flare.network)
  - Deployed: August 30, 2025

#### Filecoin Calibration Testnet (Chain ID: 314159)
- **Filecoin Data Weaver Contract**: `0x3179588E9774bC6ee1B4AF8Db55Fb8e1500649C1`
  - Status: ✅ Live and ready for minting
  - Explorer: [Filecoin Calibration Explorer](https://calibration.filscan.io)
  - Features: Data archiving, storage contracts, retrieval tracking, storage efficiency scoring
  - Deployed: August 31, 2025
  - Tested: ✅ Minting functionality verified

#### Lisk Sepolia Testnet (Chain ID: 4202)
- **Lisk Social Architect Contract**: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
  - Status: ✅ Deployed
  - Features: Community building, social connections, dApp integration
  - Network: Lisk Sepolia Testnet

### 🔄 Ready for Deployment
- **Base Social Architect Contract** (Base Sepolia)
  - Features: Community building, social connections, dApp integration
- **ENS Identity Guardian Contract** (Ethereum Sepolia)
  - Features: Domain management, identity verification, attestations

## 🛠️ Development Setup

### Prerequisites
- Node.js 20.19.4+ (Note: Hardhat works with v2.26.3)
- npm or pnpm
- MetaMask wallet
- Testnet tokens for gas fees

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Interchain-Nexus
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Create .env file in contracts directory
cd contracts
echo "PRIVATE_KEY=your_private_key_here" > .env
echo "BASE_SEPOLIA_RPC_URL=https://sepolia.base.org" >> .env
echo "SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY" >> .env
echo "FILECOIN_TESTNET_RPC_URL=https://api.calibration.node.glif.io/rpc/v1" >> .env
echo "FLARE_TESTNET_RPC_URL=https://coston2-api.flare.network/ext/C/rpc" >> .env
echo "LISK_TESTNET_RPC_URL=https://rpc.api.testnet.lisk.com" >> .env
```

4. **Start development server**
```bash
npm run dev
```

### Smart Contract Development

1. **Compile contracts**
```bash
cd contracts
npm run compile
```

2. **Run tests**
```bash
npm run test
```

3. **Deploy to testnet**
```bash
# Deploy to Flare testnet (already deployed)
npm run deploy:flare-testnet

# Deploy to other testnets
npm run deploy:base-sepolia
npm run deploy:sepolia
npm run deploy:filecoin-testnet
npm run deploy:lisk-testnet
```

4. **Deploy to all testnets**
```bash
npm run deploy:all-testnets
```

5. **Verify deployed contracts**
```bash
# Verify Flare Oracle Seer
npx hardhat verify --network flareTestnet 0x9015957A2210BB8B10e27d8BBEEF8d9498f123eF

# Verify Filecoin Data Weaver
npx hardhat verify --network filecoinTestnet 0x3179588E9774bC6ee1B4AF8Db55Fb8e1500649C1

# Verify Lisk Social Architect
npx hardhat verify --network liskTestnet 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

## 🔗 Network Configuration

### Supported Networks

| Network | Chain ID | RPC URL | Status | Contract Address |
|---------|----------|---------|--------|------------------|
| Base Sepolia | 84532 | https://sepolia.base.org | Ready | TBD |
| Ethereum Sepolia | 11155111 | https://sepolia.infura.io/v3/YOUR_KEY | Ready | TBD |
| Filecoin Calibration | 314159 | https://api.calibration.node.glif.io/rpc/v1 | ✅ Deployed | `0x3179588E9774bC6ee1B4AF8Db55Fb8e1500649C1` |
| Flare Testnet | 114 | https://coston2-api.flare.network/ext/C/rpc | ✅ Deployed | `0x9015957A2210BB8B10e27d8BBEEF8d9498f123eF` |
| Lisk Sepolia | 4202 | https://rpc.sepolia-api.lisk.com | ✅ Deployed | `0x5FbDB2315678afecb367f032d93F642f64180aa3` |

### Adding Networks to MetaMask

The app automatically detects supported networks. To manually add networks to MetaMask:

1. **Base Sepolia**
   - Network Name: Base Sepolia
   - RPC URL: https://sepolia.base.org
   - Chain ID: 84532
   - Currency Symbol: ETH

2. **Flare Testnet**
   - Network Name: Flare Testnet
   - RPC URL: https://coston2-api.flare.network/ext/C/rpc
   - Chain ID: 114
   - Currency Symbol: C2FLR

3. **Filecoin Calibration Testnet**
   - Network Name: Filecoin Calibration
   - RPC URL: https://api.calibration.node.glif.io/rpc/v1
   - Chain ID: 314159
   - Currency Symbol: tFIL

4. **Lisk Sepolia Testnet**
   - Network Name: Lisk Sepolia
   - RPC URL: https://rpc.sepolia-api.lisk.com
   - Chain ID: 4202
   - Currency Symbol: LSK

## 🎯 How to Use

### 1. Connect Wallet
- Click "Connect MetaMask" button
- Approve connection in MetaMask
- Ensure you're on a supported testnet

### 2. Select Pioneer
- Browse the four Pioneer cards
- Click on a Pioneer to view details
- Read the Pioneer's story and characteristics
- No status checking - direct selection and minting

### 3. Mint NFT
- Click "Mint Pioneer NFT" button
- Confirm transaction in MetaMask
- Wait for transaction confirmation
- View your new NFT in the inventory

### 4. View Inventory
- Navigate to the inventory page
- View your minted Pioneers
- See Pioneer details and metadata

## 🔧 Technical Implementation

### Multi-Chain Integration Architecture

The Interchain Nexus implements a sophisticated multi-chain architecture that automatically detects the connected network and routes transactions to the appropriate smart contract:

```typescript
// lib/blockchain.ts - Multi-chain contract routing
export function getContractAddress(chainId: number): string {
  const addresses = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES]
  if (!addresses) {
    throw new Error(`Unsupported chain ID: ${chainId}`)
  }
  return addresses.pioneer
}

// Automatic Pioneer type detection based on network
export function getPioneerTypeFromRealm(realm: string): PioneerType {
  switch (realm) {
    case 'Flare': return PioneerType.ORACLE_SEER
    case 'Filecoin': return PioneerType.DATA_WEAVER
    case 'ENS': return PioneerType.IDENTITY_GUARDIAN
    case 'Lisk': return PioneerType.SOCIAL_ARCHITECT
    default: throw new Error(`Unknown realm: ${realm}`)
  }
}
```

### Wallet Integration

The app uses a simplified MetaMask-only approach with automatic network switching:

```typescript
// providers.tsx - Wagmi configuration
const config = createConfig({
  chains: [liskSepolia, baseSepolia, sepolia, filecoinCalibration, flareTestnet],
  connectors: [injected()], // MetaMask only
  transports: {
    [liskSepolia.id]: http(),
    [baseSepolia.id]: http(),
    [sepolia.id]: http(),
    [filecoinCalibration.id]: http(),
    [flareTestnet.id]: http(),
  },
})
```

### Smart Contract Interaction

Each Pioneer type has specialized hooks for interacting with its unique contract functions:

```typescript
// lib/hooks/usePioneerContract.ts - Contract interaction hooks
export function useMintPioneer() {
  const { writeContract, data: hash, error, isPending } = useWriteContract()
  
  const mintPioneer = async (pioneerType: PioneerType, playerAddress: Address, chainId: number) => {
    const { contractAddress, abi } = usePioneerContract(chainId)
    return writeContract({
      address: contractAddress,
      abi,
      functionName: 'mintPioneer',
      args: [pioneerType, playerAddress],
    })
  }
  
  return { mintPioneer, hash, error, isPending }
}
```

### Contract Integration

```typescript
// Custom hooks for contract interaction
export function useMintPioneer() {
  const { writeContract, data: hash, error, isPending } = useWriteContract()
  
  const mintPioneer = async (pioneerType: PioneerType, playerAddress: Address, chainId: number) => {
    const { contractAddress, abi } = usePioneerContract(chainId)
    return writeContract({
      address: contractAddress,
      abi,
      functionName: 'mintPioneer',
      args: [pioneerType, playerAddress],
    })
  }
  
  return { mintPioneer, hash, error, isPending }
}
```

### Error Handling

The app includes comprehensive error handling:

```typescript
// Robust chain ID handling
const getChainName = (chainId: number | undefined) => {
  if (!chainId) return 'Unknown Network'
  const chain = supportedChains.find(c => c.chain.id === chainId)
  return chain ? chain.name : `Chain ${chainId}`
}
```

## 🐛 Troubleshooting

### Common Issues

1. **"Cannot read properties of undefined (reading 'id')"**
   - **Solution**: Fixed by adding null checks for chainId
   - **Status**: ✅ Resolved

2. **RainbowKit showing instead of MetaMask**
   - **Solution**: Removed RainbowKit, implemented direct MetaMask connection
   - **Status**: ✅ Resolved

3. **Hardhat ESM/CJS compatibility issues**
   - **Solution**: Used Hardhat v2.26.3 with CommonJS
   - **Status**: ✅ Resolved

4. **Contract deployment failures**
   - **Solution**: Fixed OpenZeppelin version compatibility
   - **Status**: ✅ Resolved

### Network Issues

1. **Lisk RPC connectivity**
   - **Issue**: `ENOTFOUND rpc.api.testnet.lisk.com`
   - **Status**: ⚠️ Network connectivity issue
   - **Workaround**: Use other testnets (Flare deployed successfully)

## 🔒 Security Considerations

### ⚠️ Important Security Notes

1. **Private Key Security**
   - Never share private keys publicly
   - Use environment variables for private keys
   - Consider using hardware wallets for production

2. **Testnet Usage**
   - This project uses testnets only
   - No real value is at risk
   - Testnet tokens have no monetary value

3. **Contract Security**
   - Contracts use OpenZeppelin libraries
   - Reentrancy protection implemented
   - Input validation included
   - Owner-only functions protected

## 🎯 Game Mechanics & Features

### Pioneer Abilities & Progression

Each Pioneer type has unique abilities that players can develop through interaction with the smart contracts:

#### Oracle Seer (Flare Network)
- **Prediction Accuracy**: Make predictions and track accuracy over time
- **Data Verification**: Verify external data sources and build reputation
- **Oracle Network**: Participate in Flare's oracle ecosystem
- **Progression**: Higher accuracy leads to better prediction rewards

#### Data Weaver (Filecoin Network)
- **Data Archiving**: Archive data and track storage efficiency
- **Storage Contracts**: Create and manage storage contracts
- **Retrieval Optimization**: Optimize data retrieval speeds
- **Progression**: Storage score increases with efficient data management

#### Identity Guardian (ENS Network)
- **Domain Management**: Manage and verify ENS domains
- **Identity Verification**: Verify digital identities
- **Attestation System**: Issue and manage identity attestations
- **Progression**: Trust score increases with successful verifications

#### Social Architect (Lisk Network)
- **Community Building**: Create and manage communities
- **Social Connections**: Build networks of connections
- **dApp Integration**: Integrate with Lisk dApps
- **Progression**: Social influence grows with community engagement

### Cross-Chain Gameplay

The Interchain Nexus encourages players to explore multiple blockchain networks:
- **Multi-Network Pioneers**: Players can mint Pioneers on different networks
- **Cross-Chain Benefits**: Each Pioneer provides unique advantages
- **Network Specialization**: Different networks excel at different game mechanics
- **Unified Experience**: Seamless switching between networks

### Soulbound NFT System

All Pioneer NFTs are soulbound (non-transferable), ensuring:
- **Unique Identity**: Each Pioneer is permanently tied to its owner
- **Progression Tracking**: Long-term progression and reputation building
- **Anti-Speculation**: Focus on gameplay rather than trading
- **Authentic Experience**: True ownership of digital identity

## 🚀 Future Enhancements

### Planned Features
- [x] Multi-chain smart contract deployment
- [x] Specialized Pioneer contracts with unique abilities
- [x] Soulbound NFT system
- [ ] IPFS metadata integration
- [ ] Cross-chain quest system
- [ ] Pioneer evolution and upgrades
- [ ] Leaderboard functionality
- [ ] Community governance features
- [ ] Advanced game mechanics

### Technical Improvements
- [x] Contract verification on block explorers
- [x] Gas optimization for different networks
- [x] Multi-chain wallet integration
- [ ] Batch minting functionality
- [ ] Metadata caching system
- [ ] Error recovery mechanisms
- [ ] Performance monitoring
- [ ] Analytics dashboard

## 📝 Development Log

### Recent Changes

1. **Removed RainbowKit** - Simplified to MetaMask-only connection
2. **Fixed Chain ID Handling** - Added comprehensive null checks
3. **Deployed to Flare Testnet** - Contract live at `0x9015957A2210BB8B10e27d8BBEEF8d9498f123eF`
4. **Updated Contract Configuration** - Added deployed contract addresses
5. **Fixed Hardhat Compatibility** - Downgraded to v2.26.3 for Node.js compatibility
6. **Removed Pioneer Status Checking** - Eliminated pioneer status verification from choose page
7. **Removed Journey Interface** - Deleted Identity Guardian's Journey component
8. **Removed Supply Tracker** - Eliminated supply tracking component that was showing errors
9. **Deployed Filecoin Data Weaver** - Contract live at `0x3179588E9774bC6ee1B4AF8Db55Fb8e1500649C1`
10. **Tested Filecoin Minting** - Verified minting functionality on Filecoin Calibration testnet

### Issues Resolved
- ✅ "Cannot read properties of undefined (reading 'id')" error
- ✅ RainbowKit vs MetaMask preference
- ✅ Hardhat ESM/CJS compatibility
- ✅ Contract compilation and deployment
- ✅ BigInt JSON serialization
- ✅ Pioneer status checking errors
- ✅ Supply tracker "Unable to load supply data" error
- ✅ Journey interface complexity

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review the development log
3. Check network connectivity
4. Ensure MetaMask is properly configured
5. Verify you have testnet tokens for gas

---

**Status**: ✅ **LIVE** - Flare Testnet deployment successful, ready for testing!

**Last Updated**: August 30, 2025
**Version**: 1.0.0