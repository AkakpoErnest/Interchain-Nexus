#!/bin/bash

# Citrea Governance Guardian Deployment Script
# This script deploys the CitreaGovernanceGuardian contract to Citrea testnet

echo "🚀 Deploying CitreaGovernanceGuardian to Citrea Testnet..."
echo "=================================================="

# Check if we're in the contracts directory
if [ ! -f "hardhat.config.js" ]; then
    echo "❌ Error: Please run this script from the contracts directory"
    exit 1
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ Error: .env file not found. Please create one with your private key and RPC URLs"
    exit 1
fi

# Check if private key is set
if [ -z "$PRIVATE_KEY" ]; then
    echo "❌ Error: PRIVATE_KEY not set in .env file"
    exit 1
fi

# Check if Citrea RPC URL is set
if [ -z "$CITREA_TESTNET_RPC_URL" ]; then
    echo "⚠️  Warning: CITREA_TESTNET_RPC_URL not set, using default"
    export CITREA_TESTNET_RPC_URL="https://rpc.citrea.xyz"
fi

echo "📋 Deployment Configuration:"
echo "  Network: Citrea Testnet"
echo "  Chain ID: 1001"
echo "  RPC URL: $CITREA_TESTNET_RPC_URL"
echo "  Contract: CitreaGovernanceGuardian"
echo ""

# Compile contracts
echo "🔨 Compiling contracts..."
npx hardhat compile

if [ $? -ne 0 ]; then
    echo "❌ Compilation failed"
    exit 1
fi

echo "✅ Compilation successful"
echo ""

# Deploy to Citrea testnet
echo "🚀 Deploying to Citrea testnet..."
npx hardhat run scripts/deploy-citrea-governance-guardian.js --network citreaTestnet

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Deployment successful!"
    echo ""
    echo "📝 Next steps:"
    echo "1. Update your .env file with the deployed contract address"
    echo "2. Update contract-config.ts with the new address"
    echo "3. Test the contract functions"
    echo "4. Verify the contract on Citrea Explorer (if available)"
    echo ""
    echo "🔗 Useful links:"
    echo "  - Citrea Faucet: https://citrea.xyz/faucet"
    echo "  - Citrea Explorer: https://explorer.citrea.xyz"
    echo "  - Citrea Documentation: https://docs.citrea.xyz"
else
    echo "❌ Deployment failed"
    exit 1
fi
