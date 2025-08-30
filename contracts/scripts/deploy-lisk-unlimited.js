const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Deploying Lisk Social Architect Unlimited Contract...");

  // Get the contract factory
  const LiskSocialArchitectUnlimited = await ethers.getContractFactory("LiskSocialArchitectUnlimited");

  // Deploy the contract with optimized gas configuration for Lisk
  console.log("📝 Deploying contract...");
  
  // Get current gas price and add buffer
  const feeData = await ethers.provider.getFeeData();
  const gasPrice = feeData.gasPrice ? feeData.gasPrice * 2n : ethers.parseUnits("25", "gwei");
  
  console.log("⛽ Gas Price:", ethers.formatUnits(gasPrice, "gwei"), "gwei");
  
  const liskSocialArchitect = await LiskSocialArchitectUnlimited.deploy({
    gasLimit: 8000000, // Higher gas limit for Lisk
    gasPrice: gasPrice,
  });

  // Wait for deployment to complete
  await liskSocialArchitect.waitForDeployment();

  const contractAddress = await liskSocialArchitect.getAddress();
  console.log("✅ Lisk Social Architect Unlimited deployed to:", contractAddress);

  // Get network information
  const network = await ethers.provider.getNetwork();
  console.log("🌐 Network:", network.name, "(Chain ID:", network.chainId.toString() + ")");

  // Verify deployment
  console.log("🔍 Verifying deployment...");
  const name = await liskSocialArchitect.name();
  const symbol = await liskSocialArchitect.symbol();
  const totalSupply = await liskSocialArchitect.totalSupply();

  console.log("📊 Contract Details:");
  console.log("  Name:", name);
  console.log("  Symbol:", symbol);
  console.log("  Current Supply:", totalSupply.toString());
  console.log("  Max Supply: Unlimited");

  // Test minting
  console.log("🧪 Testing minting...");
  const [deployer] = await ethers.getSigners();
  
  try {
    const tx = await liskSocialArchitect.publicMint("Test Architect", "Builder of Worlds");
    await tx.wait();
    console.log("✅ Test mint successful!");
    
    const newSupply = await liskSocialArchitect.totalSupply();
    console.log("  New Supply:", newSupply.toString());
  } catch (error) {
    console.log("❌ Test mint failed:", error.message);
  }

  // Save deployment info
  const deploymentInfo = {
    contractAddress,
    network: network.name,
    chainId: network.chainId.toString(),
    name,
    symbol,
    deployedAt: new Date().toISOString(),
    deployer: await liskSocialArchitect.owner()
  };

  console.log("💾 Deployment Info:", JSON.stringify(deploymentInfo, null, 2));

  // Instructions for next steps
  console.log("\n🎯 Next Steps:");
  console.log("1. Update your .env file with the contract address:");
  console.log(`   NEXT_PUBLIC_PIONEER_CONTRACT_LISK_SEPOLIA=${contractAddress}`);
  console.log("2. Update lib/contract-config.ts with the new address");
  console.log("3. Test the contract by minting a Social Architect NFT");
  console.log("4. This version has unlimited supply for easier testing");

  console.log("\n🎉 Deployment completed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
