const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Deploying Lisk Social Architect Contract...");

  // Get the contract factory
  const LiskSocialArchitect = await ethers.getContractFactory("LiskSocialArchitect");

  // Deploy the contract
  console.log("📝 Deploying contract...");
  const liskSocialArchitect = await LiskSocialArchitect.deploy();

  // Wait for deployment to complete
  await liskSocialArchitect.waitForDeployment();

  const contractAddress = await liskSocialArchitect.getAddress();
  console.log("✅ Lisk Social Architect deployed to:", contractAddress);

  // Get network information
  const network = await ethers.provider.getNetwork();
  console.log("🌐 Network:", network.name, "(Chain ID:", network.chainId.toString() + ")");

  // Verify deployment
  console.log("🔍 Verifying deployment...");
  const name = await liskSocialArchitect.name();
  const symbol = await liskSocialArchitect.symbol();
  const maxSupply = await liskSocialArchitect.MAX_SUPPLY();
  const totalSupply = await liskSocialArchitect.totalSupply();

  console.log("📊 Contract Details:");
  console.log("  Name:", name);
  console.log("  Symbol:", symbol);
  console.log("  Max Supply:", maxSupply.toString());
  console.log("  Current Supply:", totalSupply.toString());

  // Save deployment info
  const deploymentInfo = {
    contractAddress,
    network: network.name,
    chainId: network.chainId.toString(),
    name,
    symbol,
    maxSupply: maxSupply.toString(),
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
  console.log("4. Verify the contract on the block explorer (if available)");

  console.log("\n🎉 Deployment completed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });

