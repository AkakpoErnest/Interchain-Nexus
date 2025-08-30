# Interchain Nexus: A Digital Odyssey

A Next.js-based blockchain game that allows users to mint Pioneer NFTs across multiple blockchain networks. This project integrates smart contracts, IPFS metadata storage, and multi-chain wallet connectivity.

## 🚀 Project Overview

Interchain Nexus is an epic blockchain quest where players can mint unique Pioneer NFTs representing different blockchain ecosystems. Each Pioneer represents a specific blockchain network and has unique characteristics, artwork, and metadata.

### 🎯 Key Features

- **Multi-Chain Support**: Deploy and interact with contracts across multiple blockchain networks
- **Pioneer NFTs**: Unique soulbound NFTs representing different blockchain ecosystems
- **MetaMask Integration**: Direct MetaMask wallet connection (RainbowKit removed for simplicity)
- **IPFS Metadata**: Decentralized storage for NFT metadata and artwork
- **Responsive UI**: Modern, dark-themed interface with smooth animations
- **Smart Contract Integration**: Full ERC721 implementation with custom functionality

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

## 🎮 Pioneer Types

The game features four unique Pioneer types, each representing a different blockchain ecosystem:

### 1. The Social Architect (Base)
- **Realm**: Base
- **Rarity**: Common
- **Description**: Builder of Worlds
- **Artwork**: `base_social_architect_card_refined.png`

### 2. The Identity Guardian (ENS)
- **Realm**: ENS
- **Rarity**: Rare
- **Description**: Keeper of Names
- **Artwork**: `ens_identity_guardian_card_refined.png`

### 3. The Data Weaver (Filecoin)
- **Realm**: Filecoin
- **Rarity**: Epic
- **Description**: Archivist of the Nexus
- **Artwork**: `filecoin_data_weaver_card_refined.png`

### 4. The Oracle Seer (Flare)
- **Realm**: Flare
- **Rarity**: Legendary
- **Description**: Truth Seeker of the Cosmos
- **Artwork**: `flare_oracle_seer_card_refined.png`

## 🔧 Smart Contract Details

### Pioneer.sol Contract

The main smart contract implements an ERC721 NFT with the following features:

```solidity
// Key Features:
- ERC721 compliance with OpenZeppelin
- Soulbound-like (non-transferable) NFTs
- Pioneer type enumeration
- Metadata storage
- Owner-only functions
- Reentrancy protection
```

#### Contract Functions:
- `mintPioneer(PioneerType, address)`: Mint a new Pioneer NFT
- `getPioneerData(tokenId)`: Retrieve Pioneer metadata
- `getPlayerPioneer(address)`: Get player's Pioneer token ID
- `hasPioneer(address)`: Check if player has a Pioneer
- `totalSupply()`: Get total number of minted Pioneers
- `setBaseURI(string)`: Set metadata base URI (owner only)

#### Security Features:
- **Ownable**: Only contract owner can call admin functions
- **ReentrancyGuard**: Prevents reentrancy attacks
- **Non-transferable**: NFTs are soulbound (cannot be transferred)
- **Input validation**: All inputs are validated

## 🚀 Deployment Status

### ✅ Successfully Deployed
- **Flare Oracle Seer Contract**: `0x9015957A2210BB8B10e27d8BBEEF8d9498f123eF`
  - Network: Flare Testnet (Chain ID: 114)
  - Status: Live and ready for minting
  - Explorer: [Flare Testnet Explorer](https://coston2-explorer.flare.network)
  - Features: Oracle prediction accuracy, data verification, prediction making

### 🔄 Ready for Deployment
- **Base Social Architect Contract** (Base Sepolia)
  - Features: Community building, social connections, dApp integration
- **Filecoin Data Weaver Contract** (Filecoin Calibration)
  - Features: Data archiving, storage contracts, retrieval tracking
- **ENS Identity Guardian Contract** (Ethereum Sepolia)
  - Features: Domain management, identity verification, attestations
- **Lisk Sepolia** (General Pioneer contract)

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

## 🔗 Network Configuration

### Supported Networks

| Network | Chain ID | RPC URL | Status |
|---------|----------|---------|--------|
| Base Sepolia | 84532 | https://sepolia.base.org | Ready |
| Ethereum Sepolia | 11155111 | https://sepolia.infura.io/v3/YOUR_KEY | Ready |
| Filecoin Calibration | 314159 | https://api.calibration.node.glif.io/rpc/v1 | Ready |
| Flare Testnet | 114 | https://coston2-api.flare.network/ext/C/rpc | ✅ Deployed |
| Lisk Sepolia | 4202 | https://rpc.api.testnet.lisk.com | Ready |

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

## 🎯 How to Use

### 1. Connect Wallet
- Click "Connect MetaMask" button
- Approve connection in MetaMask
- Ensure you're on a supported testnet

### 2. Select Pioneer
- Browse the four Pioneer cards
- Click on a Pioneer to view details
- Read the Pioneer's story and characteristics

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

### Wallet Integration

The app uses a simplified MetaMask-only approach:

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

## 🚀 Future Enhancements

### Planned Features
- [ ] IPFS metadata integration
- [ ] Additional blockchain networks
- [ ] Game mechanics and quests
- [ ] Leaderboard functionality
- [ ] Pioneer evolution system
- [ ] Marketplace integration

### Technical Improvements
- [ ] Contract verification on block explorers
- [ ] Gas optimization
- [ ] Batch minting functionality
- [ ] Metadata caching
- [ ] Error recovery mechanisms

## 📝 Development Log

### Recent Changes

1. **Removed RainbowKit** - Simplified to MetaMask-only connection
2. **Fixed Chain ID Handling** - Added comprehensive null checks
3. **Deployed to Flare Testnet** - Contract live at `0x6858dF5365ffCbe31b5FE68D9E6ebB81321F7F86`
4. **Updated Contract Configuration** - Added deployed contract addresses
5. **Fixed Hardhat Compatibility** - Downgraded to v2.26.3 for Node.js compatibility

### Issues Resolved
- ✅ "Cannot read properties of undefined (reading 'id')" error
- ✅ RainbowKit vs MetaMask preference
- ✅ Hardhat ESM/CJS compatibility
- ✅ Contract compilation and deployment
- ✅ BigInt JSON serialization

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