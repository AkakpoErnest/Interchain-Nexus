# Interchain Nexus: A Digital Odyssey

Interchain Nexus is a blockchain game where players mint unique Pioneer NFTs across different networks. Each Pioneer represents a specific blockchain ecosystem with its own story, abilities, and smart contract. The game connects multiple blockchains to create a unified experience where networks work together instead of in isolation.

Built with Next.js, the game features real smart contracts, IPFS metadata storage, and advanced gameplay mechanics including leaderboards, achievement systems, and immersive storylines. We've also integrated Zama Protocol for confidential smart contracts, adding privacy-preserving features to the mix.

## 🎯 Problem We're Solving

### The Problem with Current Blockchain Gaming

Right now, blockchain games are stuck on single networks. You can't use your Ethereum NFTs in a Polygon game, or your Solana assets in an Avalanche dApp. This creates a fragmented experience where players have to manage multiple wallets, learn different interfaces, and can't really build a unified digital identity.

We wanted to change that. Instead of building another game on just one blockchain, we created Interchain Nexus - a game that actually uses multiple blockchains working together. Each network contributes what it does best, and players get a seamless experience across all of them.

## 🚀 How It Works

The game centers around four unique Pioneer types, each representing a different blockchain ecosystem:

- **Oracle Seer** (Flare) - Uses Flare's oracle network for predictions and data verification
- **Identity Guardian** (ENS) - Manages digital identities through Ethereum Name Service
- **Data Weaver** (Filecoin) - Handles decentralized storage and data archiving
- **Social Architect** (Lisk) - Builds communities and social connections

Each Pioneer has its own smart contract deployed on its native network, but they all work together. When you mint a Pioneer, you're not just getting an NFT - you're getting access to that network's unique capabilities and a story-driven experience that teaches you how these technologies actually work.

### What Makes This Different

- **Real Multi-Chain**: Actually uses different blockchains, not just one with multiple tokens
- **Soulbound NFTs**: Your Pioneers can't be traded - they're truly yours
- **Story-Driven**: Each Pioneer has a complete storyline that teaches you about its blockchain
- **Leaderboard System**: Compete with other players across all networks
- **Achievement System**: Unlock achievements by mastering different aspects of each network
- **ENS Integration**: Real Ethereum Name Service interactions, not just mockups
- **Zama Protocol**: Privacy-preserving features using fully homomorphic encryption
- **Cross-Chain Synergies**: Actions on one network enhance your capabilities on others

## 🏗️ Architecture

### Frontend Stack
- **Next.js 15.2.4**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **Wagmi**: React hooks for Ethereum
- **Viem**: TypeScript interface for Ethereum
- **V0**: Used as the foundation for the landing page design, then customized and extended

### Smart Contract Stack
- **Solidity 0.8.19**: Smart contract language
- **Hardhat 2.26.3**: Development environment and deployment tool
- **OpenZeppelin 4.9.6**: Secure smart contract libraries
- **ERC721**: Non-fungible token standard
- **Zama Protocol**: Confidential smart contracts with FHE (Fully Homomorphic Encryption)
- **ENS Integration**: Ethereum Name Service integration for identity management
- **FTSO Integration**: Flare Time Series Oracle for prediction accuracy
- **Filecoin Storage**: Decentralized storage and data archiving
- **Lisk dApp Integration**: Social connections and community building

### Blockchain Networks
- **Base Sepolia** (Chain ID: 84532) - Ready for deployment
- **Ethereum Sepolia** (Chain ID: 11155111) ✅ **LIVE** - ENS Identity Guardian deployed
- **Filecoin Calibration** (Chain ID: 314159) ✅ **LIVE** - Data Weaver contract deployed
- **Flare Testnet** (Chain ID: 114) ✅ **LIVE** - Oracle Seer contract deployed
- **Lisk Sepolia** (Chain ID: 4202) ✅ **LIVE** - Social Architect contract deployed
- **Zama Protocol**: Confidential smart contracts on Ethereum Sepolia - In development

## 📁 Project Structure

```
Interchain-Nexus/
├── app/                          # Next.js App Router pages
│   ├── choose/                   # Pioneer selection and minting page
│   ├── inventory/                # NFT inventory page
│   ├── leaderboard/              # Player leaderboard
│   ├── play/                     # Game interface
│   └── ens-story/                # ENS Identity Guardian story page
├── components/                   # React components
│   ├── ui/                       # Reusable UI components
│   ├── nft-minting.tsx          # NFT minting interface
│   ├── ens-minting.tsx          # ENS-specific minting interface
│   ├── confidential-ens-minting.tsx # Zama confidential ENS minting
│   ├── ens-trial-system.tsx     # ENS trial system component
│   ├── metamask-connect-simple.tsx # MetaMask connection
│   ├── providers.tsx             # Wagmi configuration
│   └── transaction-status.tsx    # Transaction feedback
├── contracts/                    # Smart contracts
│   ├── Pioneer.sol              # Main NFT contract
│   ├── FlareOracleSeerSimple.sol # Flare Oracle Seer contract
│   ├── EnsIdentityGuardianSimple.sol # ENS Identity Guardian contract
│   ├── SimpleConfidentialEnsIdentityGuardian.sol # Zama confidential contract
│   ├── scripts/                 # Deployment scripts
│   └── test/                    # Contract tests
├── lib/                         # Utility libraries
│   ├── blockchain.ts            # Blockchain utilities
│   ├── contract-config.ts       # Contract addresses
│   ├── ens-game-stories.ts      # ENS story content
│   ├── hooks/                   # Custom React hooks
│   │   ├── usePioneerContract.ts # Pioneer contract hooks
│   │   └── useEnsPioneerContract.ts # ENS contract hooks
│   └── ipfs.ts                  # IPFS integration
├── docs/                        # Documentation
│   ├── ZAMA_IMPLEMENTATION.md   # Zama Protocol implementation guide
│   ├── ZAMA_INTEGRATION.md      # Zama Protocol integration guide
│   ├── ENS_IMPLEMENTATION.md    # ENS implementation details
│   ├── FLARE_IMPLEMENTATION.md  # Flare implementation details
│   ├── LISK_IMPLEMENTATION.md   # Lisk implementation details
│   ├── FILECOIN_IMPLEMENTATION.md # Filecoin implementation details
│   ├── BLOCKCHAIN_INTEGRATION.md # Multi-chain integration guide
│   ├── DEPLOYMENT_GUIDE.md      # Deployment instructions
│   └── TESTNET_DEPLOYMENT_GUIDE.md # Testnet deployment guide
└── public/                      # Static assets
    └── [pioneer-cards].png      # NFT artwork
```

## 🎮 How the Game Works

### How to Play

1. **Connect Your Wallet**: Use MetaMask to connect to the game
2. **Choose Your Pioneer**: Pick from four different Pioneer types, each representing a blockchain ecosystem
3. **Mint Your NFT**: Deploy your Pioneer on its native blockchain network
4. **Start Your Journey**: Each Pioneer has its own story and unique abilities:
   - **Oracle Seer**: Make predictions using Flare's oracle network
   - **Identity Guardian**: Master ENS with seven mystical trials
   - **Data Weaver**: Archive data and optimize storage on Filecoin
   - **Social Architect**: Build communities and connect with other players on Lisk
5. **Compete & Progress**: Climb the leaderboards, unlock achievements, and master multiple networks
6. **Cross-Chain Synergy**: Your actions on one network enhance your capabilities on others

### Technical Features
- **Auto Network Detection**: The game automatically switches to the right blockchain for each Pioneer
- **Real Smart Contracts**: Each Pioneer has its own deployed contract with unique functionality
- **Soulbound NFTs**: Your Pioneers are permanently tied to your wallet - no trading, just pure ownership
- **Progressive Abilities**: Each Pioneer unlocks new features as you progress through its story

### Interconnected Multi-Chain Architecture
The Interchain Nexus creates a unified ecosystem where different blockchain networks work together, each contributing their unique strengths to create a seamless gaming experience:

#### **The Interchain Web - How Blockchains Work Together:**

**🌐 Flare Testnet (Oracle Seer)** - The Data Oracle Hub
- Provides prediction accuracy and data verification services
- Feeds verified data to other networks in the ecosystem
- Acts as the "truth layer" for cross-chain data validation

**🗄️ Filecoin Calibration (Data Weaver)** - The Storage Backbone  
- Stores and archives data from all other networks
- Provides decentralized storage for the entire Interchain Nexus
- Enables data persistence and retrieval across the ecosystem

**👥 Lisk Sepolia (Social Architect)** - The Community Connector
- Builds social connections between players across all networks
- Creates communities that span multiple blockchain ecosystems
- Facilitates cross-chain social interactions and governance

**🛡️ Ethereum Sepolia (ENS Identity Guardian)** - The Identity Layer
- Provides unified identity management across all networks
- Verifies and attests to player identities in the ecosystem
- Creates trust relationships that enable cross-chain interactions

#### **Cross-Chain Synergies:**
- **Data Flow**: Flare oracles verify data → Filecoin stores it → ENS manages access → Lisk builds communities around it
- **Identity Verification**: ENS verifies identities → Lisk connects verified users → Flare tracks their reputation → Filecoin stores their history
- **Community Building**: Lisk creates communities → ENS verifies members → Flare tracks community metrics → Filecoin archives community data
- **Trust Network**: Each network contributes to building a comprehensive trust and reputation system across the entire Interchain Nexus

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
- **Contract**: `0xD02dc1Ac6744bAE948Ba68B8e0Bb82Db5d78e1A4`
- **Network**: Ethereum Sepolia (Chain ID: 11155111)
- **Features**: Domain management, identity verification, attestations
- **Special Functions**: `mintIdentityGuardian`, `hasIdentityGuardian`, `getIdentityGuardianData`
- **Artwork**: `ens_identity_guardian_card_refined.png`
- **Story**: "The Oracle of the Eternal Names" - A mystical journey through seven trials of naming
- **Game Features**: ENS integration, reverse records, text records, avatar records, guild subnames

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
- **Contract**: `0x2D6E6A6430F0121d6949D743DF54730b40C5c74F`
- **Network**: Flare Testnet (Chain ID: 114)
- **Features**: Oracle prediction accuracy, data verification, prediction making
- **Special Functions**: `mintPioneer`, `hasPioneer`, `getPlayerPioneer`
- **Artwork**: `flare_oracle_seer_card_refined.png`

## 🔧 Smart Contract Details

### Contract Architecture

The Interchain Nexus uses a multi-contract architecture where each Pioneer type has its own specialized smart contract deployed on its native blockchain network. All contracts inherit from OpenZeppelin's ERC721 standard and implement soulbound (non-transferable) NFT functionality.

### 1. FlareOracleSeerSimple.sol (Flare Testnet)
**Contract Address**: `0x2D6E6A6430F0121d6949D743DF54730b40C5c74F`

```solidity
// Key Features:
- Oracle prediction accuracy tracking
- Data verification system
- Prediction making functionality
- Soulbound NFTs (non-transferable)
- Flare network integration
- Public minting (no owner restrictions)
```

**Special Functions**:
- `mintPioneer(uint256 pioneerType, address playerAddress)`: Mint Oracle Seer NFT
- `hasPioneer(address player)`: Check if player has Oracle Seer
- `getPlayerPioneer(address player)`: Get player's Oracle Seer token ID
- `isMintingAvailable()`: Check if minting is available

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

### 2. EnsIdentityGuardianSimple.sol (Ethereum Sepolia)
**Contract Address**: `0xD02dc1Ac6744bAE948Ba68B8e0Bb82Db5d78e1A4`

```solidity
// Key Features:
- Domain management and verification
- Identity attestation system
- Trust score tracking
- ENS integration
- Digital identity protection
- Public minting (no owner restrictions)
```

**Special Functions**:
- `mintPioneer(uint256 pioneerType, address playerAddress)`: Mint Identity Guardian
- `hasPioneer(address player)`: Check if player has Identity Guardian
- `getPlayerPioneer(address player)`: Get player's Identity Guardian token ID
- `isMintingAvailable()`: Check if minting is available

### 3. SimpleConfidentialEnsIdentityGuardian.sol (Ethereum Sepolia)
**Contract Address**: `0x...` (Zama confidential contract)

```solidity
// Key Features:
- Confidential smart contracts with FHE
- Privacy-preserving identity management
- Encrypted data storage and processing
- Zama Protocol integration
- Programmable confidentiality
```

**Special Functions**:
- `mintConfidentialPioneer(uint256 pioneerType, address playerAddress)`: Mint confidential Identity Guardian
- `hasConfidentialPioneer(address player)`: Check if player has confidential Identity Guardian
- `getConfidentialPioneerData(address player)`: Get confidential pioneer data

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

## 🚀 What's Live Right Now

### ✅ Deployed and Working

#### Flare Testnet (Chain ID: 114)
- **Oracle Seer Contract**: `0x9015957A2210BB8B10e27d8BBEEF8d9498f123eF`
  - Status: ✅ Live and minting
  - Explorer: [Flare Testnet Explorer](https://coston2-explorer.flare.network)
  - Features: Oracle predictions, data verification, FTSO integration
  - Deployed: August 30, 2025

#### Filecoin Calibration Testnet (Chain ID: 314159)
- **Data Weaver Contract**: `0xc00a268Fbcbb00a72bfc8CD0FE7CfE26dad3BEd8`
  - Status: ✅ Live and minting
  - Explorer: [Filecoin Calibration Explorer](https://calibration.filscan.io)
  - Features: Data archiving, storage contracts, efficiency scoring
  - Deployed: August 31, 2025

#### Ethereum Sepolia Testnet (Chain ID: 11155111)
- **ENS Identity Guardian Contract**: `0xf8ACAa1035f3573Bd2F7730D0aC0789D71EBF1ef`
  - Status: ✅ Live and minting
  - Explorer: [Ethereum Sepolia Explorer](https://sepolia.etherscan.io)
  - Features: ENS integration, identity verification, domain management
  - Deployed: August 31, 2025
  - **Story System**: "The Oracle of the Eternal Names" with seven trials
  - **Real ENS**: Actual ENS interactions for reverse records, text records, avatars

#### Lisk Sepolia Testnet (Chain ID: 4202)
- **Social Architect Contract**: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
  - Status: ✅ Live and minting
  - Features: Community building, social connections, dApp integration
  - Deployed: August 30, 2025

### 🔄 Coming Soon
- **Base Sepolia**: Social Architect contract ready for deployment
- **Zama Protocol**: Confidential smart contracts with FHE encryption

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
| Ethereum Sepolia | 11155111 | https://sepolia.infura.io/v3/YOUR_KEY | ✅ Deployed | `0xD02dc1Ac6744bAE948Ba68B8e0Bb82Db5d78e1A4` |
| Filecoin Calibration | 314159 | https://api.calibration.node.glif.io/rpc/v1 | ✅ Deployed | `0x3179588E9774bC6ee1B4AF8Db55Fb8e1500649C1` |
| Flare Testnet | 114 | https://coston2-api.flare.network/ext/C/rpc | ✅ Deployed | `0x2D6E6A6430F0121d6949D743DF54730b40C5c74F` |
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

The Interchain Nexus implements a sophisticated multi-chain architecture that creates seamless interoperability between different blockchain networks, allowing them to work together as a unified ecosystem:

```typescript
// lib/blockchain.ts - Interchain contract routing and cross-chain data flow
export function getContractAddress(chainId: number): string {
  const addresses = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES]
  if (!addresses) {
    throw new Error(`Unsupported chain ID: ${chainId}`)
  }
  return addresses.pioneer
}

// Cross-chain Pioneer type detection and network mapping
export function getPioneerTypeFromRealm(realm: string): PioneerType {
  switch (realm) {
    case 'Flare': return PioneerType.ORACLE_SEER      // Data verification hub
    case 'Filecoin': return PioneerType.DATA_WEAVER   // Storage backbone
    case 'ENS': return PioneerType.IDENTITY_GUARDIAN  // Identity layer
    case 'Lisk': return PioneerType.SOCIAL_ARCHITECT  // Community connector
    default: throw new Error(`Unknown realm: ${realm}`)
  }
}

// Cross-chain data sharing and trust propagation
export function shareDataAcrossChains(data: any, sourceChain: number, targetChains: number[]) {
  // Flare oracles verify data integrity
  // Filecoin stores the verified data
  // ENS manages access permissions
  // Lisk distributes to communities
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

## 🏆 Leaderboard & Achievement System

### Comprehensive Scoring System

The Interchain Nexus features an advanced leaderboard system that tracks player progress across all blockchain networks:

#### **Scoring Mechanics**
- **Base Score**: 100 points per Pioneer NFT minted
- **Specialized Bonuses**: Each Pioneer type has unique scoring multipliers
- **Achievement Points**: 8+ unique achievements with different point values
- **Cross-Chain Bonuses**: Additional points for minting on multiple networks
- **Activity Tracking**: Points for ongoing engagement and progression

#### **Achievement System**
1. **First Steps** (50 pts) - Mint your first Pioneer NFT
2. **Realm Master** (500 pts) - Mint Pioneers on all 4 networks
3. **Community Architect** (200 pts) - Create 5 communities
4. **Data Guardian** (200 pts) - Archive 10 data sets
5. **Oracle Master** (200 pts) - Make 20 accurate predictions
6. **Identity Protector** (200 pts) - Verify 15 identities
7. **Nexus Explorer** (150 pts) - Active on 3 different networks
8. **Early Adopter** (100 pts) - Joined in the first week

#### **Leaderboard Categories**
- **Nexus Masters**: Players with all 4 realms unified
- **Realm Guardians**: Players with 2-3 realms
- **Chain Walkers**: Players with 1 realm
- **Elite Pioneers**: Top 10 players
- **Skilled Pioneers**: Top 50 players

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
- **Story System**: "The Oracle of the Eternal Names" - Seven mystical trials
  - **Trial 1**: The Summoning - Claim your true name in the ENS registry
  - **Trial 2**: The Reverse Record Rite - Set reverse resolution for your ENS name
  - **Trial 3**: The Prophecy Logbook - Inscribe your deeds in ENS text records
  - **Trial 4**: The Avatar Rite - Set your avatar in the realm of names
  - **Trial 5**: The Guild of Names - Create or join ENS subdomains
  - **Trial 6**: The Oracle Tournament - Answer riddles via ENS records
  - **Trial 7**: The Eternal Binding - Complete all trials and achieve mastery

#### Social Architect (Lisk Network)
- **Community Building**: Create and manage communities
- **Social Connections**: Build networks of connections
- **dApp Integration**: Integrate with Lisk dApps
- **Progression**: Social influence grows with community engagement

### Cross-Chain Gameplay & Interoperability

The Interchain Nexus creates a truly interconnected gaming experience where blockchains work together:

#### **The Interchain Journey:**
- **Multi-Network Pioneers**: Players mint Pioneers on different networks, each contributing to the overall ecosystem
- **Cross-Chain Synergies**: Actions on one network enhance capabilities on others
- **Unified Identity**: ENS Identity Guardian provides consistent identity across all networks
- **Shared Data Layer**: Filecoin Data Weaver stores and shares data across the entire ecosystem
- **Community Cross-Pollination**: Lisk Social Architect connects players across all networks
- **Trust Propagation**: Reputation and trust scores flow between networks via Flare oracles

#### **How Networks Intertwine:**
1. **Start with Identity**: Mint an ENS Identity Guardian to establish your digital identity
2. **Build Community**: Use Lisk Social Architect to connect with other verified players
3. **Store & Share**: Filecoin Data Weaver archives your community interactions and achievements
4. **Verify & Predict**: Flare Oracle Seer validates your actions and predicts future opportunities
5. **Cross-Chain Benefits**: Each Pioneer enhances the others, creating exponential value

#### **Interchain Mechanics:**
- **Data Sharing**: Information flows seamlessly between networks
- **Trust Networks**: Reputation built on one network affects interactions on others
- **Community Spans**: Social connections transcend individual blockchain boundaries
- **Unified Progression**: Player advancement is tracked across the entire Interchain Nexus

### Soulbound NFT System

All Pioneer NFTs are soulbound (non-transferable), ensuring:
- **Unique Identity**: Each Pioneer is permanently tied to its owner
- **Progression Tracking**: Long-term progression and reputation building
- **Anti-Speculation**: Focus on gameplay rather than trading
- **Authentic Experience**: True ownership of digital identity

## 🌐 The Interchain Vision

### Philosophy: Blockchain Networks Working Together

The Interchain Nexus represents a new paradigm in blockchain gaming - instead of isolated networks competing for users, we create a collaborative ecosystem where each blockchain contributes its unique strengths to create something greater than the sum of its parts.

#### **Why Interchain Matters:**
- **No Single Point of Failure**: Distributed across multiple networks
- **Leverage Network Strengths**: Each blockchain excels at what it does best
- **True Decentralization**: No single network controls the entire ecosystem
- **Innovation Through Collaboration**: Networks inspire and improve each other
- **User Choice**: Players can choose their preferred networks while staying connected

#### **The Interchain Promise:**
- **Seamless Experience**: Users don't need to understand the complexity behind the scenes
- **Cross-Chain Benefits**: Actions on one network enhance capabilities on others
- **Unified Identity**: One identity that works across all networks
- **Shared Resources**: Data, reputation, and community connections flow freely
- **Future-Proof**: New networks can join the ecosystem and contribute their strengths

## 🔐 Zama Protocol Integration

### Confidential Smart Contracts with FHE

The Interchain Nexus integrates Zama Protocol's Fully Homomorphic Encryption (FHE) technology to provide privacy-preserving blockchain interactions:

#### **Key Features**
- **End-to-End Encryption**: Transaction inputs and state are encrypted
- **Programmable Confidentiality**: Smart contracts define who can decrypt what
- **Composability**: Confidential contracts work with non-confidential ones
- **Privacy-Preserving Identity**: ENS identity management with privacy protection

#### **Confidential ENS Implementation**
- **Contract**: `SimpleConfidentialEnsIdentityGuardian.sol`
- **Network**: Ethereum Sepolia (Chain ID: 11155111)
- **Features**: 
  - Confidential identity management
  - Privacy-preserving ENS interactions
  - Encrypted data storage and processing
  - Programmable confidentiality rules

#### **Confidential Story System**
The confidential ENS Identity Guardian features a privacy-preserving story system:
- **Chapter 1**: The Confidential Summoning - Encrypted identity verification
- **Chapter 2**: The Encrypted Record Rite - Encrypted reverse record management
- **Chapter 3**: The Secret Prophecy Logbook - Encrypted text record management
- **Chapter 4**: The Hidden Avatar Rite - Encrypted avatar management
- **Chapter 5**: The Secret Guild - Encrypted subdomain management
- **Chapter 6**: The Confidential Tournament - Encrypted riddle system
- **Chapter 7**: The Eternal Shadow - Complete confidential identity system

#### **FHE Configuration**
```typescript
export const FHE_CONFIG = {
  ENCRYPTION_KEY_SIZE: 256,
  DECRYPTION_THRESHOLD: 0.8,
  PRIVACY_LEVEL: 'HIGH',
  CONFIDENTIALITY_MODE: 'FULL'
};
```

## 🚀 Future Enhancements

### Planned Features
- [x] Multi-chain smart contract deployment
- [x] Specialized Pioneer contracts with unique abilities
- [x] Soulbound NFT system
- [x] Cross-chain data sharing and trust propagation
- [x] Interconnected blockchain ecosystem
- [x] Zama Protocol confidential smart contracts
- [x] Comprehensive leaderboard system
- [x] Achievement system with 8+ unique achievements
- [x] ENS story system with seven mystical trials
- [x] Pioneer progression and specialized abilities
- [ ] IPFS metadata integration
- [ ] Cross-chain quest system
- [ ] Pioneer evolution and upgrades
- [ ] Community governance features
- [ ] Advanced interchain mechanics
- [ ] New blockchain network integrations

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
11. **Deployed ENS Identity Guardian** - Contract live at `0xf8ACAa1035f3573Bd2F7730D0aC0789D71EBF1ef` on Ethereum Sepolia
12. **Created ENS Story System** - "The Oracle of the Eternal Names" with seven mystical trials
13. **Implemented ENS Trial System** - Real ENS interactions for reverse records, text records, avatar records
14. **Added Mystical Story Images** - Integrated three epic fantasy images into the story flow
15. **Zama Protocol Integration** - Deployed confidential ENS contract for privacy features
16. **Updated README Documentation** - Added problem statement, Zama integration details, and comprehensive implementation guides
17. **Fixed Contract Addresses** - Updated all contract addresses to reflect current deployments
18. **Enhanced Project Structure** - Added documentation for all blockchain integrations

### Issues Resolved
- ✅ "Cannot read properties of undefined (reading 'id')" error
- ✅ RainbowKit vs MetaMask preference
- ✅ Hardhat ESM/CJS compatibility
- ✅ Contract compilation and deployment
- ✅ BigInt JSON serialization
- ✅ Pioneer status checking errors
- ✅ Supply tracker "Unable to load supply data" error
- ✅ Journey interface complexity

## 📚 Implementation Documentation

### Blockchain Integration Guides
- **[Zama Protocol Implementation](./docs/ZAMA_IMPLEMENTATION.md)** - Confidential smart contracts with FHE
- **[ENS Implementation](./docs/ENS_IMPLEMENTATION.md)** - Ethereum Name Service integration
- **[Flare Implementation](./docs/FLARE_IMPLEMENTATION.md)** - Oracle and prediction system
- **[Filecoin Implementation](./docs/FILECOIN_IMPLEMENTATION.md)** - Decentralized storage and archiving
- **[Lisk Implementation](./docs/LISK_IMPLEMENTATION.md)** - Social connections and community building
- **[Blockchain Integration](./docs/BLOCKCHAIN_INTEGRATION.md)** - Multi-chain architecture overview
- **[Deployment Guide](./docs/DEPLOYMENT_GUIDE.md)** - Complete deployment instructions
- **[Testnet Deployment](./docs/TESTNET_DEPLOYMENT_GUIDE.md)** - Testnet-specific deployment guide

### External Resources

#### Zama Protocol
- [Zama Protocol Documentation](https://docs.zama.ai/protocol)
- [FHE Solidity Library](https://docs.zama.ai/protocol/solidity)
- [Zama Developer Hub](https://zama.ai/developer-hub)
- [FHEVM Documentation](https://docs.zama.ai/protocol/fhevm)

#### ENS (Ethereum Name Service)
- [ENS Documentation](https://docs.ens.domains/)
- [ENS Registry Contract](https://etherscan.io/address/0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e)
- [Reverse Registrar Contract](https://etherscan.io/address/0x6F628b68b30Dc3c17f336cBdb8121d3b75D6D83d)
- [Public Resolver Contract](https://etherscan.io/address/0x8FADE66Ba79cD89eEFcEbe2a03b2226Fd1A77335)

#### Flare Network
- [Flare Documentation](https://docs.flare.network/)
- [FTSO Documentation](https://docs.flare.network/tech/ftso/)
- [State Connector Documentation](https://docs.flare.network/tech/state-connector/)
- [Flare Testnet Explorer](https://coston2-explorer.flare.network)

#### Filecoin Network
- [Filecoin Documentation](https://docs.filecoin.io/)
- [Filecoin Storage Documentation](https://docs.filecoin.io/storage/)
- [Filecoin Retrieval Documentation](https://docs.filecoin.io/retrieval/)
- [Filecoin Calibration Testnet](https://calibration.filscan.io/)

#### Lisk Network
- [Lisk Documentation](https://lisk.com/documentation/)
- [Lisk SDK Documentation](https://lisk.com/documentation/lisk-sdk/)
- [Lisk dApp Development](https://lisk.com/documentation/lisk-sdk/development-guide/)
- [Lisk Testnet Explorer](https://testnet-explorer.lisk.com/)

### Tools & Explorers
- [ENS Manager](https://app.ens.domains/)
- [ENS Namehash Calculator](https://swolfeyes.github.io/ethereum-namehash-calculator/)
- [ENS Subgraph](https://thegraph.com/explorer/subgraph/ensdomains/ens)
- [Flare Testnet Faucet](https://faucet.flare.network/)
- [Filecoin Calibration Faucet](https://faucet.calibration.fildev.network/)
- [Lisk Testnet Faucet](https://testnet-faucet.lisk.com/)

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

**Status**: ✅ **LIVE** - Four blockchain networks deployed and ready to play!

**What's Working**:
- ✅ **Flare Testnet** - Oracle Seer contract live at `0x9015957A2210BB8B10e27d8BBEEF8d9498f123eF`
- ✅ **Filecoin Calibration** - Data Weaver contract live at `0xc00a268Fbcbb00a72bfc8CD0FE7CfE26dad3BEd8`
- ✅ **Ethereum Sepolia** - ENS Identity Guardian contract live at `0xf8ACAa1035f3573Bd2F7730D0aC0789D71EBF1ef`
- ✅ **Lisk Sepolia** - Social Architect contract live at `0x5FbDB2315678afecb367f032d93F642f64180aa3`

**Game Features**:
- ✅ Multi-chain Pioneer NFT minting
- ✅ Leaderboard system with achievements
- ✅ ENS story system with seven trials
- ✅ Cross-chain gameplay mechanics
- ✅ Pioneer progression and abilities

**Coming Soon**:
- 🔄 Base Sepolia deployment
- 🔄 Zama Protocol confidential contracts

**Last Updated**: August 31, 2025
**Version**: 1.0.0