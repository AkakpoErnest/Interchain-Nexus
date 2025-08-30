const { ethers } = require("hardhat");
const fs = require('fs');
const path = require('path');

async function main() {
  console.log("🚀 Starting Pioneer contract deployment...");

  // Get the contract factory
  const Pioneer = await ethers.getContractFactory("Pioneer");
  
  // Deploy the contract
  console.log("📦 Deploying Pioneer contract...");
  const pioneer = await Pioneer.deploy();
  
  // Wait for deployment to complete
  await pioneer.waitForDeployment();
  
  const pioneerAddress = await pioneer.getAddress();
  console.log("✅ Pioneer contract deployed to:", pioneerAddress);
  
  // Get network information
  const network = await ethers.provider.getNetwork();
  console.log("🌐 Network:", network.name, "(Chain ID:", network.chainId, ")");
  
  // Verify deployment
  const totalSupply = await pioneer.totalSupply();
  console.log("📊 Initial total supply:", totalSupply.toString());
  
  // Set base URI if provided
  const baseURI = process.env.BASE_URI;
  if (baseURI) {
    console.log("🔗 Setting base URI:", baseURI);
    await pioneer.setBaseURI(baseURI);
    console.log("✅ Base URI set successfully");
  }
  
  // Output deployment information
  console.log("\n📋 Deployment Summary:");
  console.log("Contract Address:", pioneerAddress);
  console.log("Network:", network.name);
  console.log("Chain ID:", network.chainId);
  console.log("Base URI:", baseURI || "Not set");
  
  // Save deployment info to file
  const deploymentInfo = {
    contractAddress: pioneerAddress,
    network: network.name,
    chainId: network.chainId,
    baseURI: baseURI || "",
    deployedAt: new Date().toISOString(),
    deployer: (await ethers.getSigners())[0].address
  };
  

  
  // Create deployments directory if it doesn't exist
  const deploymentsDir = path.join(__dirname, '..', 'deployments');
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }
  
  // Save deployment info
  const deploymentFile = path.join(deploymentsDir, `${network.name}-${network.chainId}.json`);
  fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value, 2));
  console.log("💾 Deployment info saved to:", deploymentFile);
  
  console.log("\n🎉 Deployment completed successfully!");
  console.log("🔍 You can verify the contract on the block explorer");
  console.log("📝 Use the following command to verify:");
  console.log(`npx hardhat verify --network ${network.name} ${pioneerAddress}`);
}

// Handle errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });