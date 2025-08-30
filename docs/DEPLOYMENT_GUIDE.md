# Smart Contract Deployment Guide

## Overview

This guide covers deploying the Pioneer NFT smart contracts to multiple blockchain networks and integrating them with the Interchain Nexus frontend.

## Prerequisites

1. **Node.js**: Version 18+ (recommended: 22.10.0+)
2. **Hardhat**: Installed in the contracts directory
3. **Wallet**: With sufficient funds for deployment on each network
4. **API Keys**: For block explorers and RPC providers

## Environment Setup

### 1. Install Dependencies

```bash
cd contracts
npm install
```

### 2. Environment Variables

Create a `.env` file in the contracts directory:

```bash
# Private key for deployment (keep secure!)
PRIVATE_KEY=your_private_key_here

# RPC URLs
BASE_RPC_URL=https://mainnet.base.org
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
FILECOIN_RPC_URL=https://api.node.glif.io/rpc/v1
FILECOIN_TESTNET_RPC_URL=https://api.calibration.node.glif.io/rpc/v1
FLARE_RPC_URL=https://flare-api.flare.network/ext/C/rpc
FLARE_TESTNET_RPC_URL=https://coston2-api.flare.network/ext/C/rpc
LISK_RPC_URL=https://rpc.api.lisk.com

# Block Explorer API Keys
BASESCAN_API_KEY=your_basescan_api_key
ETHERSCAN_API_KEY=your_etherscan_api_key
FLARE_API_KEY=your_flare_api_key
LISK_API_KEY=your_lisk_api_key

# IPFS Configuration
BASE_URI=https://api.interchainnexus.com/metadata/
```

## Deployment Process

### 1. Compile Contracts

```bash
npm run compile
```

### 2. Test Contracts

```bash
npm test
```

### 3. Deploy to Networks

#### Base Sepolia (Testnet)
```bash
npm run deploy:base-sepolia
```

#### Base Mainnet
```bash
npm run deploy:base
```

#### Ethereum Sepolia (Testnet)
```bash
npm run deploy:sepolia
```

#### Ethereum Mainnet
```bash
npm run deploy:ethereum
```

#### Filecoin Testnet
```bash
npm run deploy:filecoin-testnet
```

#### Filecoin Mainnet
```bash
npm run deploy:filecoin
```

#### Flare Testnet
```bash
npm run deploy:flare-testnet
```

#### Flare Mainnet
```bash
npm run deploy:flare
```

#### Lisk Mainnet
```bash
npm run deploy:lisk
```

### 4. Verify Contracts

After deployment, verify the contracts on block explorers:

```bash
# Base Sepolia
npm run verify:base-sepolia

# Base Mainnet
npm run verify:base
```

## Frontend Integration

### 1. Update Contract Addresses

After deployment, update the contract addresses in `lib/contract-config.ts`:

```typescript
export const CONTRACT_ADDRESSES = {
  8453: {
    pioneer: '0xYourDeployedContractAddress', // Base Mainnet
  },
  84532: {
    pioneer: '0xYourDeployedContractAddress', // Base Sepolia
  },
  // ... other networks
}
```

### 2. Environment Variables

Create a `.env.local` file in the project root:

```bash
# WalletConnect Project ID
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id

# Contract Addresses
NEXT_PUBLIC_PIONEER_CONTRACT_BASE=0xYourDeployedContractAddress
NEXT_PUBLIC_PIONEER_CONTRACT_BASE_SEPOLIA=0xYourDeployedContractAddress
NEXT_PUBLIC_PIONEER_CONTRACT_ETHEREUM=0xYourDeployedContractAddress
NEXT_PUBLIC_PIONEER_CONTRACT_SEPOLIA=0xYourDeployedContractAddress
NEXT_PUBLIC_PIONEER_CONTRACT_FILECOIN=0xYourDeployedContractAddress
NEXT_PUBLIC_PIONEER_CONTRACT_FILECOIN_TESTNET=0xYourDeployedContractAddress
NEXT_PUBLIC_PIONEER_CONTRACT_FLARE=0xYourDeployedContractAddress
NEXT_PUBLIC_PIONEER_CONTRACT_FLARE_TESTNET=0xYourDeployedContractAddress
NEXT_PUBLIC_PIONEER_CONTRACT_LISK=0xYourDeployedContractAddress

# IPFS Configuration
NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.io/ipfs/
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_api_key
NEXT_PUBLIC_PINATA_SECRET_KEY=your_pinata_secret_key
```

### 3. Test the Integration

1. Start the development server:
```bash
npm run dev
```

2. Connect your wallet
3. Select a Pioneer type
4. Test the minting process

## Network-Specific Considerations

### Base Network
- **Gas**: Very low gas fees (~$0.01 per transaction)
- **Speed**: ~2 second block time
- **Native Token**: ETH (same as Ethereum)

### Filecoin Network
- **Gas**: FIL tokens required
- **Speed**: Variable block times
- **Storage**: Can store NFT metadata on Filecoin

### Flare Network
- **Gas**: FLR tokens required
- **Oracle Integration**: Built-in oracle functionality
- **Speed**: ~1-2 second block time

### Lisk Network
- **Gas**: LSK tokens required
- **Speed**: ~10 second block time
- **Features**: Built-in governance mechanisms

## Security Considerations

1. **Private Keys**: Never commit private keys to version control
2. **Multi-sig**: Consider using multi-signature wallets for mainnet deployments
3. **Testing**: Always test on testnets first
4. **Verification**: Verify contracts on block explorers
5. **Access Control**: Review contract ownership and access controls

## Troubleshooting

### Common Issues

1. **Node.js Version**: Ensure you're using Node.js 18+ for Hardhat compatibility
2. **Gas Estimation**: Some networks may have different gas estimation methods
3. **RPC Limits**: Use dedicated RPC providers for production deployments
4. **Network Congestion**: Deploy during low-traffic periods

### Error Messages

- **"insufficient funds"**: Ensure wallet has enough native tokens for gas
- **"nonce too low"**: Reset wallet nonce or wait for pending transactions
- **"gas limit exceeded"**: Increase gas limit in deployment script

## Monitoring and Maintenance

1. **Block Explorer**: Monitor contract activity on block explorers
2. **Events**: Track PioneerMinted events for analytics
3. **Upgrades**: Plan for potential contract upgrades
4. **Backup**: Keep deployment artifacts and private keys secure

## Next Steps

After successful deployment:

1. Update frontend contract addresses
2. Test all network integrations
3. Deploy metadata to IPFS
4. Set up monitoring and analytics
5. Plan for future contract upgrades

## Support

For issues or questions:
- Check the [Blockchain Integration Documentation](./BLOCKCHAIN_INTEGRATION.md)
- Review network-specific documentation in `docs/blockchains/`
- Test on testnets before mainnet deployment
