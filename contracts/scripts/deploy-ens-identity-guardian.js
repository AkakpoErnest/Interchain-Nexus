const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Starting ENS Identity Guardian deployment...");

  // Get the contract factory
  const ENSIdentityGuardian = await ethers.getContractFactory("ENSIdentityGuardian");
  
  console.log("📋 Deploying ENS Identity Guardian contract...");
  
  // Deploy the contract
  const ensIdentityGuardian = await ENSIdentityGuardian.deploy();
  
  // Wait for deployment to complete
  await ensIdentityGuardian.waitForDeployment();
  
  const contractAddress = await ensIdentityGuardian.getAddress();
  
  console.log("✅ ENS Identity Guardian deployed successfully!");
  console.log("📍 Contract Address:", contractAddress);
  console.log("🌐 Network:", network.name);
  console.log("⛽ Gas Used:", (await ensIdentityGuardian.deploymentTransaction().wait()).gasUsed.toString());
  
  // Verify deployment
  console.log("\n🔍 Verifying deployment...");
  const name = await ensIdentityGuardian.name();
  const symbol = await ensIdentityGuardian.symbol();
  const totalSupply = await ensIdentityGuardian.totalSupply();
  
  console.log("📝 Contract Name:", name);
  console.log("🏷️  Contract Symbol:", symbol);
  console.log("📊 Total Supply:", totalSupply.toString());
  
  // Save deployment info
  const deploymentInfo = {
    contractAddress: contractAddress,
    network: network.name,
    chainId: network.config.chainId,
    deployedAt: new Date().toISOString(),
    gasUsed: (await ensIdentityGuardian.deploymentTransaction().wait()).gasUsed.toString(),
    contractName: "ENSIdentityGuardian",
    contractSymbol: "GUARDIAN"
  };
  
  console.log("\n💾 Deployment completed successfully!");
  console.log("📋 Deployment Summary:");
  console.log(JSON.stringify(deploymentInfo, null, 2));
  
  // Instructions for next steps
  console.log("\n📋 Next Steps:");
  console.log("1. Update your .env file with the contract address:");
  console.log(`   NEXT_PUBLIC_PIONEER_CONTRACT_SEPOLIA=${contractAddress}`);
  console.log("2. Verify the contract on Etherscan (if on mainnet/testnet)");
  console.log("3. Test the minting functionality");
  console.log("4. Update your frontend configuration");
  
  return deploymentInfo;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
