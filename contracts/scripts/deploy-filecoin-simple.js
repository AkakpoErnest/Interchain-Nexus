const { ethers } = require("hardhat");
const fs = require('fs');
const path = require('path');

async function main() {
  console.log("🚀 Starting Filecoin Data Weaver Simple contract deployment...");
  
  // Get the contract factory
  const FilecoinDataWeaverSimple = await ethers.getContractFactory("FilecoinDataWeaverSimple");
  
  console.log("📦 Deploying Filecoin Data Weaver Simple contract...");
  
  // Deploy the contract
  const filecoinDataWeaverSimple = await FilecoinDataWeaverSimple.deploy();
  await filecoinDataWeaverSimple.waitForDeployment();
  
  const contractAddress = await filecoinDataWeaverSimple.getAddress();
  console.log("✅ Filecoin Data Weaver Simple contract deployed to:", contractAddress);
  
  // Get network information
  const network = await ethers.provider.getNetwork();
  console.log("🌐 Network:", network.name, "(Chain ID:", network.chainId.toString() + ")");
  
  // Get initial total supply
  const totalSupply = await filecoinDataWeaverSimple.totalSupply();
  console.log("📊 Initial total supply:", totalSupply.toString());
  
  // Prepare deployment info
  const deploymentInfo = {
    contractName: "FilecoinDataWeaverSimple",
    contractAddress: contractAddress,
    network: network.name,
    chainId: network.chainId,
    deployer: (await ethers.provider.getSigner()).address,
    deploymentTime: new Date().toISOString(),
    totalSupply: totalSupply.toString(),
    features: [
      "Simplified Data Weaver contract",
      "Public minting with mintPioneer function",
      "Standard Pioneer interface compatibility",
      "Soulbound NFTs (non-transferable)"
    ]
  };
  
  console.log("\n📋 Deployment Summary:");
  console.log("Contract Name:", deploymentInfo.contractName);
  console.log("Contract Address:", deploymentInfo.contractAddress);
  console.log("Network:", deploymentInfo.network);
  console.log("Chain ID:", deploymentInfo.chainId.toString());
  
  // Save deployment info
  const deploymentsDir = path.join(__dirname, '..', 'deployments');
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }
  
  const deploymentFile = path.join(deploymentsDir, `filecoin-data-weaver-simple-${network.name}-${network.chainId}.json`);
  fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value, 2));
  console.log("💾 Deployment info saved to:", deploymentFile);
  
  console.log("\n🎉 Deployment completed successfully!");
  console.log("🔍 You can verify the contract on the block explorer");
  console.log("📝 Use the following command to verify:");
  console.log(`npx hardhat verify --network ${network.name} ${contractAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
