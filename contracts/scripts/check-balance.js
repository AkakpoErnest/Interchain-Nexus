const { ethers } = require("hardhat");

async function main() {
  console.log("🔍 Checking wallet balance...");

  // Get the signer
  const [deployer] = await ethers.getSigners();
  console.log("Wallet Address:", deployer.address);

  // Get balance
  const balance = await deployer.provider.getBalance(deployer.address);
  const balanceInEth = ethers.formatEther(balance);
  
  console.log("Balance:", balanceInEth, "ETH");
  console.log("Balance (Wei):", balance.toString());

  // Get network info
  const network = await deployer.provider.getNetwork();
  console.log("Network:", network.name, "(Chain ID:", network.chainId.toString() + ")");

  // Check if balance is sufficient for deployment
  const estimatedGas = ethers.parseEther("0.01"); // Rough estimate
  if (balance < estimatedGas) {
    console.log("❌ Insufficient balance for deployment");
    console.log("💡 You need at least 0.01 ETH for gas fees");
    console.log("🔗 Get testnet tokens from a faucet");
  } else {
    console.log("✅ Sufficient balance for deployment");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  });

