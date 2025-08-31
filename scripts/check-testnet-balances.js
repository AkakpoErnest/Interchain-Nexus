const { ethers } = require("ethers");

// Network configurations
const networks = {
  baseSepolia: {
    name: "Base Sepolia",
    rpc: "https://sepolia.base.org",
    chainId: 84532,
    symbol: "ETH"
  },
  ethereumSepolia: {
    name: "Ethereum Sepolia", 
    rpc: "https://rpc.sepolia.org",
    chainId: 11155111,
    symbol: "ETH"
  },
  filecoinCalibration: {
    name: "Filecoin Calibration",
    rpc: "https://api.calibration.node.glif.io/rpc/v1",
    chainId: 314159,
    symbol: "FIL"
  },
  flareTestnet: {
    name: "Flare Testnet",
    rpc: "https://coston2-api.flare.network/ext/C/rpc",
    chainId: 114,
    symbol: "FLR"
  },
  liskSepolia: {
    name: "Lisk Sepolia",
    rpc: "https://rpc.sepolia-api.lisk.com",
    chainId: 4202,
    symbol: "LSK"
  },
  citreaTestnet: {
    name: "Citrea Testnet",
    rpc: "https://rpc.citrea.xyz",
    chainId: 1001,
    symbol: "cBTC"
  }
};

async function checkBalance(network, address) {
  try {
    const provider = new ethers.JsonRpcProvider(network.rpc);
    const balance = await provider.getBalance(address);
    const formattedBalance = ethers.formatEther(balance);
    
    return {
      network: network.name,
      balance: formattedBalance,
      symbol: network.symbol,
      status: "✅ Connected"
    };
  } catch (error) {
    return {
      network: network.name,
      balance: "0",
      symbol: network.symbol,
      status: "❌ Error: " + error.message
    };
  }
}

async function main() {
  const walletAddress = process.argv[2];
  
  if (!walletAddress) {
    console.log("Usage: node check-testnet-balances.js <wallet_address>");
    console.log("Example: node check-testnet-balances.js 0x1234567890123456789012345678901234567890");
    process.exit(1);
  }

  console.log("🔍 Checking testnet balances for:", walletAddress);
  console.log("=" .repeat(60));

  const results = [];
  
  for (const [key, network] of Object.entries(networks)) {
    const result = await checkBalance(network, walletAddress);
    results.push(result);
  }

  // Display results
  results.forEach(result => {
    console.log(`\n${result.status} ${result.network}`);
    console.log(`   Balance: ${result.balance} ${result.symbol}`);
  });

  // Summary
  console.log("\n" + "=" .repeat(60));
  console.log("📊 Summary:");
  
  const connectedNetworks = results.filter(r => r.status.includes("✅"));
  const errorNetworks = results.filter(r => r.status.includes("❌"));
  
  console.log(`✅ Connected networks: ${connectedNetworks.length}`);
  console.log(`❌ Error networks: ${errorNetworks.length}`);
  
  if (errorNetworks.length > 0) {
    console.log("\n🔧 Networks with errors:");
    errorNetworks.forEach(network => {
      console.log(`   - ${network.network}: ${network.status}`);
    });
  }

  // Faucet links
  console.log("\n🚰 Faucet Links:");
  console.log("   Base Sepolia: https://faucet.quicknode.com/base/sepolia");
  console.log("   Ethereum Sepolia: https://sepoliafaucet.com/");
  console.log("   Filecoin Calibration: https://faucet.calibration.fildev.network/");
  console.log("   Flare Testnet: https://faucet.flare.network/");
  console.log("   Lisk Sepolia: https://faucet.sepolia-api.lisk.com/");
  console.log("   Citrea Testnet: https://citrea.xyz/faucet");
}

main().catch(console.error);
