const { ethers } = require("hardhat");
const fs = require('fs');
const path = require('path');

async function main() {
  console.log("🚀 Starting Flare Oracle Seer contract deployment...");
  
  // Get the contract factory
  const FlareOracleSeer = await ethers.getContractFactory("FlareOracleSeer");
  
  console.log("📦 Deploying Flare Oracle Seer contract...");
  
  // Deploy the contract
  const flareOracleSeer = await FlareOracleSeer.deploy();
  await flareOracleSeer.waitForDeployment();
  
  const contractAddress = await flareOracleSeer.getAddress();
  console.log("✅ Flare Oracle Seer contract deployed to:", contractAddress);
  
  // Get network information
  const network = await ethers.provider.getNetwork();
  console.log("🌐 Network:", network.name, "(Chain ID:", network.chainId.toString() + ")");
  
  // Get initial total supply and max supply
  const totalSupply = await flareOracleSeer.totalSupply();
  const maxSupply = await flareOracleSeer.MAX_SUPPLY();
  const remainingSupply = await flareOracleSeer.remainingSupply();
  const isMintingAvailable = await flareOracleSeer.isMintingAvailable();
  
  console.log("📊 Initial total supply:", totalSupply.toString());
  console.log("📊 Maximum supply:", maxSupply.toString());
  console.log("📊 Remaining supply:", remainingSupply.toString());
  console.log("📊 Minting available:", isMintingAvailable);
  
  // Prepare deployment info
  const deploymentInfo = {
    contractName: "FlareOracleSeer",
    contractAddress: contractAddress,
    network: network.name,
    chainId: network.chainId,
    deployer: (await ethers.provider.getSigner()).address,
    deploymentTime: new Date().toISOString(),
    baseURI: "Not set",
    totalSupply: totalSupply.toString(),
    maxSupply: maxSupply.toString(),
    remainingSupply: remainingSupply.toString(),
    isMintingAvailable: isMintingAvailable,
    features: [
      "Oracle prediction accuracy tracking",
      "Data verification system",
      "Prediction making functionality",
      "Soulbound NFTs (non-transferable)",
      "Flare network integration"
    ]
  };
  
  console.log("\n📋 Deployment Summary:");
  console.log("Contract Name:", deploymentInfo.contractName);
  console.log("Contract Address:", deploymentInfo.contractAddress);
  console.log("Network:", deploymentInfo.network);
  console.log("Chain ID:", deploymentInfo.chainId.toString());
  console.log("Base URI:", deploymentInfo.baseURI);
  
  // Save deployment info
  const deploymentsDir = path.join(__dirname, '..', 'deployments');
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }
  
  const deploymentFile = path.join(deploymentsDir, `flare-oracle-seer-${network.name}-${network.chainId}.json`);
  fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value, 2));
  console.log("💾 Deployment info saved to:", deploymentFile);
  
  console.log("\n🎉 Deployment completed successfully!");
  console.log("🔍 You can verify the contract on the block explorer");
  console.log("📝 Use the following command to verify:");
  console.log(`npx hardhat verify --network ${network.name} ${contractAddress}`);
  
  console.log("\n🎮 Game Journey Features:");
  console.log("- Oracle prediction accuracy tracking");
  console.log("- Data verification and validation");
  console.log("- Flare network oracle integration");
  console.log("- Progressive skill development");
  console.log("- Unique Flare ecosystem benefits");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
