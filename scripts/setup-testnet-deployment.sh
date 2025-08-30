#!/bin/bash

echo "🚀 Interchain Nexus Testnet Deployment Setup"
echo "=============================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

echo "📋 Setting up testnet deployment..."

# Create contracts directory if it doesn't exist
if [ ! -d "contracts" ]; then
    echo "❌ Contracts directory not found. Please ensure contracts are set up first."
    exit 1
fi

# Navigate to contracts directory
cd contracts

echo "📦 Installing dependencies..."
npm install

echo "🔧 Setting up environment file..."
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cat > .env << EOF
# Private key for deployment (keep secure!)
PRIVATE_KEY=your_private_key_here

# Base Sepolia (Free RPC)
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org

# Ethereum Sepolia (Free RPC)
SEPOLIA_RPC_URL=https://rpc.sepolia.org

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
EOF
    echo "✅ Created .env file"
else
    echo "⚠️  .env file already exists"
fi

echo "🧪 Testing compilation..."
npm run compile

if [ $? -eq 0 ]; then
    echo "✅ Compilation successful"
else
    echo "❌ Compilation failed. Please check your setup."
    exit 1
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Edit contracts/.env and add your private key"
echo "2. Get testnet tokens from faucets:"
echo "   - Base Sepolia: https://bridge.base.org/deposit"
echo "   - Ethereum Sepolia: https://sepoliafaucet.com/"
echo "   - Filecoin Testnet: https://faucet.calibration.fildev.network/"
echo "   - Flare Testnet: https://faucet.flare.network/"
echo "   - Lisk Testnet: https://testnet-faucet.lisk.com/"
echo ""
echo "3. Deploy to all testnets:"
echo "   cd contracts"
echo "   npm run deploy:all-testnets"
echo ""
echo "4. Or deploy individually:"
echo "   npm run deploy:base-sepolia"
echo "   npm run deploy:sepolia"
echo "   npm run deploy:filecoin-testnet"
echo "   npm run deploy:flare-testnet"
echo "   npm run deploy:lisk-testnet"
echo ""
echo "📚 See docs/TESTNET_DEPLOYMENT_GUIDE.md for detailed instructions"

