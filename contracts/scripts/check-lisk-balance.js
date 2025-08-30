const { ethers } = require("hardhat");
require('dotenv').config();

async function main() {
  console.log("🔍 Checking Lisk Sepolia wallet balance...");

  // Check if private key is set
  if (!process.env.PRIVATE_KEY) {
    console.log("❌ PRIVATE_KEY not found in .env file");
    console.log("💡 Please add your private key to the .env file");
    return;
  }

  // Create provider for Lisk Sepolia
  const liskProvider = new ethers.JsonRpcProvider(process.env.LISK_TESTNET_RPC_URL || "https://rpc.sepolia-api.lisk.com");
  
  // Create wallet
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, liskProvider);
  console.log("Wallet Address:", wallet.address);

  try {
    // Get balance
    const balance = await wallet.provider.getBalance(wallet.address);
    const balanceInEth = ethers.formatEther(balance);
    
    console.log("Balance:", balanceInEth, "LSK");
    console.log("Balance (Wei):", balance.toString());

    // Get network info
    const network = await wallet.provider.getNetwork();
    console.log("Network:", network.name, "(Chain ID:", network.chainId.toString() + ")");

    // Check if balance is sufficient for deployment
    const estimatedGas = ethers.parseEther("0.1"); // Rough estimate for Lisk
    if (balance < estimatedGas) {
      console.log("❌ Insufficient balance for deployment");
      console.log("💡 You need at least 0.1 LSK for gas fees");
      console.log("🔗 Get testnet tokens from Lisk faucet:");
      console.log("   https://testnet-faucet.lisk.com/");
    } else {
      console.log("✅ Sufficient balance for deployment");
      console.log("🚀 Ready to deploy Lisk Social Architect contract!");
    }

    // Check if contract is already deployed
    const contractAddress = process.env.NEXT_PUBLIC_PIONEER_CONTRACT_LISK_SEPOLIA || "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    console.log("\n📋 Current contract address:", contractAddress);
    
    // Try to check if contract exists
    try {
      const code = await wallet.provider.getCode(contractAddress);
      if (code === "0x") {
        console.log("⚠️  Contract not deployed at this address");
      } else {
        console.log("✅ Contract is deployed and verified");
      }
    } catch (error) {
      console.log("⚠️  Could not verify contract deployment");
    }

  } catch (error) {
    console.error("❌ Error connecting to Lisk Sepolia:", error.message);
    console.log("💡 Make sure you have the correct RPC URL and network access");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  });
