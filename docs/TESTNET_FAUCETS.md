# 🚰 Testnet Faucets Guide

This guide shows you how to get testnet tokens for all networks in the Interchain Nexus project.

## Quick Start

### 1. **Citrea Testnet (cBTC)** - NEW! 🆕
- **Faucet**: https://citrea.xyz/faucet
- **Token**: cBTC (Citrea Bitcoin)
- **Network**: Citrea Testnet (Chain ID: 1001)
- **Steps**:
  1. Visit https://citrea.xyz/faucet
  2. Connect your wallet (MetaMask recommended)
  3. Switch to Citrea testnet
  4. Click "Request Test Tokens"
  5. Wait for confirmation

### 2. **Base Sepolia (ETH)**
- **Faucet**: https://faucet.quicknode.com/base/sepolia
- **Token**: ETH
- **Network**: Base Sepolia (Chain ID: 84532)
- **Alternative**: https://bridge.base.org/deposit

### 3. **Ethereum Sepolia (ETH)**
- **Faucet**: https://sepoliafaucet.com/
- **Token**: ETH
- **Network**: Ethereum Sepolia (Chain ID: 11155111)
- **Alternative**: https://faucet.quicknode.com/ethereum/sepolia

### 4. **Filecoin Calibration (FIL)**
- **Faucet**: https://faucet.calibration.fildev.network/
- **Token**: FIL
- **Network**: Filecoin Calibration (Chain ID: 314159)
- **Steps**:
  1. Visit the faucet
  2. Enter your wallet address
  3. Complete captcha
  4. Click "Request FIL"

### 5. **Flare Testnet (FLR)**
- **Faucet**: https://faucet.flare.network/
- **Token**: FLR
- **Network**: Flare Testnet (Chain ID: 114)
- **Steps**:
  1. Visit the faucet
  2. Connect your wallet
  3. Click "Request Test Tokens"

### 6. **Lisk Sepolia (LSK)**
- **Faucet**: https://faucet.sepolia-api.lisk.com/
- **Token**: LSK
- **Network**: Lisk Sepolia (Chain ID: 4202)
- **Steps**:
  1. Visit the faucet
  2. Enter your wallet address
  3. Click "Request LSK"

## 🔧 Check Your Balances

Use our balance checker script to see your testnet token balances:

```bash
# Install dependencies first
cd contracts
npm install

# Check balances for your wallet
node ../scripts/check-testnet-balances.js YOUR_WALLET_ADDRESS
```

Example:
```bash
node ../scripts/check-testnet-balances.js 0x1234567890123456789012345678901234567890
```

## 📱 Wallet Setup

### MetaMask Configuration

Add these networks to your MetaMask:

#### Citrea Testnet
- **Network Name**: Citrea Testnet
- **RPC URL**: https://rpc.citrea.xyz
- **Chain ID**: 1001
- **Currency Symbol**: cBTC
- **Block Explorer**: https://explorer.citrea.xyz

#### Base Sepolia
- **Network Name**: Base Sepolia
- **RPC URL**: https://sepolia.base.org
- **Chain ID**: 84532
- **Currency Symbol**: ETH
- **Block Explorer**: https://sepolia.basescan.org

#### Ethereum Sepolia
- **Network Name**: Ethereum Sepolia
- **RPC URL**: https://rpc.sepolia.org
- **Chain ID**: 11155111
- **Currency Symbol**: ETH
- **Block Explorer**: https://sepolia.etherscan.io

#### Filecoin Calibration
- **Network Name**: Filecoin Calibration
- **RPC URL**: https://api.calibration.node.glif.io/rpc/v1
- **Chain ID**: 314159
- **Currency Symbol**: FIL
- **Block Explorer**: https://calibration.filscan.io

#### Flare Testnet
- **Network Name**: Flare Testnet
- **RPC URL**: https://coston2-api.flare.network/ext/C/rpc
- **Chain ID**: 114
- **Currency Symbol**: FLR
- **Block Explorer**: https://coston2-explorer.flare.network

#### Lisk Sepolia
- **Network Name**: Lisk Sepolia
- **RPC URL**: https://rpc.sepolia-api.lisk.com
- **Chain ID**: 4202
- **Currency Symbol**: LSK
- **Block Explorer**: https://testnet.liskscan.com

## 🚨 Troubleshooting

### Common Issues

1. **"Insufficient funds" error**
   - Make sure you have testnet tokens from the faucet
   - Check that you're on the correct network

2. **"Network not found" error**
   - Add the network to your MetaMask manually
   - Use the RPC URLs provided above

3. **"Transaction failed" error**
   - Increase gas limit
   - Check network congestion
   - Ensure you have enough tokens for gas fees

4. **Faucet not working**
   - Try alternative faucet URLs
   - Check if faucet has daily limits
   - Wait a few minutes and try again

### Gas Fees

Approximate gas fees for each network:
- **Base Sepolia**: ~0.001 ETH
- **Ethereum Sepolia**: ~0.005 ETH
- **Filecoin Calibration**: ~0.1 FIL
- **Flare Testnet**: ~1 FLR
- **Lisk Sepolia**: ~0.1 LSK
- **Citrea Testnet**: ~0.001 cBTC

## 📋 Checklist

Before deploying contracts:

- [ ] Get testnet tokens from all faucets
- [ ] Add all networks to MetaMask
- [ ] Verify wallet has sufficient balance for gas
- [ ] Test network connections
- [ ] Check block explorer access

## 🔗 Useful Links

- **Citrea Documentation**: https://docs.citrea.xyz
- **Base Documentation**: https://docs.base.org
- **Ethereum Sepolia**: https://sepolia.dev
- **Filecoin Documentation**: https://docs.filecoin.io
- **Flare Documentation**: https://docs.flare.network
- **Lisk Documentation**: https://lisk.com/documentation

## 💡 Tips

1. **Bookmark faucets** for easy access
2. **Set up network alerts** to know when you need more tokens
3. **Keep some extra tokens** for gas fees
4. **Test transactions** before deploying contracts
5. **Use block explorers** to verify transactions

Happy testing! 🚀
