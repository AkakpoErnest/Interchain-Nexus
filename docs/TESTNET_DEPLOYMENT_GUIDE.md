# Complete Testnet Deployment Guide

## 🚀 Deploy to All Supported Testnets

This guide will help you deploy the Pioneer NFT contract to all supported testnets.

## Prerequisites

1. **Node.js 18+** (recommended: 22.10.0+)
2. **Wallet with testnet tokens** for each network
3. **Private key** for deployment
4. **RPC access** (free options available)

## Environment Setup

Create `contracts/.env` file:

```bash
# Private key for deployment (keep secure!)
PRIVATE_KEY=your_private_key_here

# Base Sepolia (Free RPC)
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org

# Ethereum Sepolia (Free RPC)
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
# Or use: https://rpc.sepolia.org

# Filecoin Testnet (Free RPC)
FILECOIN_TESTNET_RPC_URL=https://api.calibration.node.glif.io/rpc/v1

# Flare Testnet (Free RPC)
FLARE_TESTNET_RPC_URL=https://coston2-api.flare.network/ext/C/rpc

# Lisk Testnet (Free RPC)
LISK_TESTNET_RPC_URL=https://rpc.api.testnet.lisk.com

# Block Explorer API Keys (for verification)
BASESCAN_API_KEY=your_basescan_api_key
ETHERSCAN_API_KEY=your_etherscan_api_key
FLARE_API_KEY=your_flare_api_key
LISK_API_KEY=your_lisk_api_key

# IPFS Configuration
BASE_URI=https://api.interchainnexus.com/metadata/
```

## Testnet Information & Faucets

### 1. Base Sepolia
- **Chain ID**: 84532
- **Native Token**: ETH
- **Faucet**: [Base Bridge](https://bridge.base.org/deposit)
- **Explorer**: [BaseScan Sepolia](https://sepolia.basescan.org/)
- **RPC**: Free at `https://sepolia.base.org`

### 2. Ethereum Sepolia
- **Chain ID**: 11155111
- **Native Token**: ETH
- **Faucet**: [Sepolia Faucet](https://sepoliafaucet.com/)
- **Explorer**: [Etherscan Sepolia](https://sepolia.etherscan.io/)
- **RPC**: Free at `https://rpc.sepolia.org`

### 3. Filecoin Testnet (Calibration)
- **Chain ID**: 314159
- **Native Token**: FIL
- **Faucet**: [Filecoin Calibration Faucet](https://faucet.calibration.fildev.network/)
- **Explorer**: [Filfox Calibration](https://calibration.filfox.info/)
- **RPC**: Free at `https://api.calibration.node.glif.io/rpc/v1`

### 4. Flare Testnet (Coston2)
- **Chain ID**: 114
- **Native Token**: FLR
- **Faucet**: [Flare Faucet](https://faucet.flare.network/)
- **Explorer**: [Flare Testnet Explorer](https://coston2-explorer.flare.network/)
- **RPC**: Free at `https://coston2-api.flare.network/ext/C/rpc`

### 5. Lisk Testnet
- **Chain ID**: 1135
- **Native Token**: LSK
- **Faucet**: [Lisk Faucet](https://testnet-faucet.lisk.com/)
- **Explorer**: [LiskScan Testnet](https://testnet.liskscan.com/)
- **RPC**: Free at `https://rpc.api.testnet.lisk.com`

## Deployment Commands

### Step 1: Compile Contracts
```bash
cd contracts
npm run compile
```

### Step 2: Deploy to All Testnets

#### Base Sepolia
```bash
npm run deploy:base-sepolia
```

#### Ethereum Sepolia
```bash
npm run deploy:sepolia
```

#### Filecoin Testnet
```bash
npm run deploy:filecoin-testnet
```

#### Flare Testnet
```bash
npm run deploy:flare-testnet
```

#### Lisk Testnet
```bash
npm run deploy:lisk-testnet
```

### Step 3: Verify Contracts

#### Base Sepolia
```bash
npm run verify:base-sepolia
```

#### Ethereum Sepolia
```bash
npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
```

#### Filecoin Testnet
```bash
npx hardhat verify --network filecoinTestnet <CONTRACT_ADDRESS>
```

#### Flare Testnet
```bash
npx hardhat verify --network flareTestnet <CONTRACT_ADDRESS>
```

#### Lisk Testnet
```bash
npx hardhat verify --network liskTestnet <CONTRACT_ADDRESS>
```

## Batch Deployment Script

Create `contracts/scripts/deploy-all-testnets.js`:

```javascript
const { ethers } = require("hardhat");

async function main() {
  const networks = [
    'baseSepolia',
    'sepolia', 
    'filecoinTestnet',
    'flareTestnet',
    'liskTestnet'
  ];

  console.log("🚀 Starting deployment to all testnets...");

  for (const network of networks) {
    try {
      console.log(`\n📦 Deploying to ${network}...`);
      
      // Get the contract factory
      const Pioneer = await ethers.getContractFactory("Pioneer");
      
      // Deploy the contract
      const pioneer = await Pioneer.deploy();
      await pioneer.waitForDeployment();
      
      const address = await pioneer.getAddress();
      console.log(`✅ Deployed to ${network}: ${address}`);
      
      // Save deployment info
      const deploymentInfo = {
        network,
        contractAddress: address,
        deployedAt: new Date().toISOString(),
        deployer: (await ethers.getSigners())[0].address
      };
      
      console.log(`📋 Deployment info:`, deploymentInfo);
      
    } catch (error) {
      console.error(`❌ Failed to deploy to ${network}:`, error.message);
    }
  }
  
  console.log("\n🎉 All deployments completed!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
```

Run batch deployment:
```bash
npx hardhat run scripts/deploy-all-testnets.js
```

## Update Frontend Configuration

After deployment, update `lib/contract-config.ts`:

```typescript
export const CONTRACT_ADDRESSES = {
  // Base Sepolia
  84532: {
    pioneer: '0xYourBaseSepoliaAddress',
  },
  // Ethereum Sepolia
  11155111: {
    pioneer: '0xYourSepoliaAddress',
  },
  // Filecoin Testnet
  314159: {
    pioneer: '0xYourFilecoinTestnetAddress',
  },
  // Flare Testnet
  114: {
    pioneer: '0xYourFlareTestnetAddress',
  },
  // Lisk Testnet
  1135: {
    pioneer: '0xYourLiskTestnetAddress',
  },
} as const
```

## Testing the Deployments

1. **Start the frontend**:
```bash
npm run dev
```

2. **Test each network**:
   - Connect wallet
   - Switch to each testnet
   - Select a pioneer
   - Test minting

3. **Verify on block explorers**:
   - Check contract addresses
   - Verify transactions
   - Test contract functions

## Troubleshooting

### Common Issues

1. **Insufficient funds**: Get testnet tokens from faucets
2. **RPC errors**: Use alternative RPC endpoints
3. **Gas estimation**: Some networks may need manual gas limits
4. **Network congestion**: Deploy during low-traffic periods

### Network-Specific Issues

- **Filecoin**: May require FIL tokens for gas
- **Flare**: Uses FLR tokens for transactions
- **Lisk**: Uses LSK tokens for gas
- **Base/Ethereum**: Use ETH for gas

## Cost Estimation

| Network | Deployment Cost | Transaction Cost |
|---------|----------------|------------------|
| Base Sepolia | Free | Free |
| Ethereum Sepolia | Free | Free |
| Filecoin Testnet | Free | Free |
| Flare Testnet | Free | Free |
| Lisk Testnet | Free | Free |

## Next Steps

1. **Deploy to all testnets**
2. **Test minting on each network**
3. **Verify contracts on block explorers**
4. **Update frontend configuration**
5. **Test complete user flow**
6. **Deploy to mainnets when ready**

## Support Resources

- [Base Documentation](https://docs.base.org/)
- [Ethereum Sepolia](https://sepolia.dev/)
- [Filecoin Calibration](https://docs.filecoin.io/build/calibration-networks/)
- [Flare Documentation](https://docs.flare.network/)
- [Lisk Documentation](https://lisk.com/documentation/)

