# Base Network Deployment Setup

## Quick Start: Deploy to Base Sepolia Testnet

### 1. Get Testnet ETH
1. Go to [Base Bridge](https://bridge.base.org/deposit)
2. Connect your wallet
3. Switch to Sepolia testnet
4. Get free Sepolia ETH from a faucet
5. Bridge some ETH to Base Sepolia

### 2. Set Up Environment
Create `contracts/.env` file:
```bash
# Your private key (keep secure!)
PRIVATE_KEY=your_private_key_here

# Base Sepolia RPC (free)
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org

# Optional: Better RPC performance
# BASE_SEPOLIA_RPC_URL=https://base-sepolia.g.alchemy.com/v2/YOUR_KEY

# Block Explorer API (for verification)
BASESCAN_API_KEY=your_basescan_api_key

# IPFS Configuration
BASE_URI=https://api.interchainnexus.com/metadata/
```

### 3. Deploy to Base Sepolia
```bash
cd contracts
npm run deploy:base-sepolia
```

### 4. Verify Contract
```bash
npm run verify:base-sepolia
```

### 5. Update Frontend
Update `lib/contract-config.ts` with deployed address:
```typescript
export const CONTRACT_ADDRESSES = {
  84532: {
    pioneer: '0xYourDeployedContractAddress', // Base Sepolia
  },
  // ... other networks
}
```

## Why Base Network?

### Base Sepolia (Testnet)
- ✅ **Free**: No cost to deploy or test
- ✅ **Fast**: ~2 second block times
- ✅ **Reliable**: Built by Coinbase
- ✅ **Easy**: Simple setup and deployment

### Base Mainnet (Production)
- ✅ **Low Cost**: ~$0.01 per transaction
- ✅ **Fast**: ~2 second block times
- ✅ **Scalable**: Built on Optimism's OP Stack
- ✅ **Secure**: Inherits Ethereum's security
- ✅ **Growing**: Active ecosystem and users

## Deployment Commands

### Testnet Deployment
```bash
# Base Sepolia
npm run deploy:base-sepolia

# Ethereum Sepolia
npm run deploy:sepolia

# Filecoin Testnet
npm run deploy:filecoin-testnet

# Flare Testnet
npm run deploy:flare-testnet
```

### Mainnet Deployment
```bash
# Base Mainnet (RECOMMENDED)
npm run deploy:base

# Ethereum Mainnet (expensive)
npm run deploy:ethereum

# Filecoin Mainnet
npm run deploy:filecoin

# Flare Mainnet
npm run deploy:flare

# Lisk Mainnet
npm run deploy:lisk
```

## Cost Comparison

| Network | Deployment Cost | Transaction Cost |
|---------|----------------|------------------|
| Base Sepolia | Free | Free |
| Base Mainnet | ~$5-10 | ~$0.01 |
| Ethereum Sepolia | Free | Free |
| Ethereum Mainnet | ~$50-100 | ~$5-20 |
| Filecoin Testnet | Free | Free |
| Filecoin Mainnet | ~$10-20 | ~$0.10 |

## Next Steps After Deployment

1. **Test Minting**: Use the frontend to test NFT minting
2. **Verify Contract**: Verify on block explorer
3. **Update Frontend**: Update contract addresses
4. **Test All Features**: Test pioneer selection and minting
5. **Deploy to Mainnet**: When ready for production

## Support Resources

- [Base Documentation](https://docs.base.org/)
- [Base Bridge](https://bridge.base.org/)
- [BaseScan Explorer](https://sepolia.basescan.org/)
- [Base Faucet](https://bridge.base.org/deposit)

