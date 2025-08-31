const { ethers } = require("hardhat");
const fs = require('fs');
const path = require('path');

async function main() {
  console.log("🚀 Starting Filecoin Data Weaver contract deployment...");
  
  // Get the contract factory
  const FilecoinDataWeaver = await ethers.getContractFactory("FilecoinDataWeaver");
  
  console.log("📦 Deploying Filecoin Data Weaver contract...");
  
  // Deploy the contract
  const filecoinDataWeaver = await FilecoinDataWeaver.deploy();
  await filecoinDataWeaver.waitForDeployment();
  
  const contractAddress = await filecoinDataWeaver.getAddress();
  console.log("✅ Filecoin Data Weaver contract deployed to:", contractAddress);
  
  // Get network information
  const network = await ethers.provider.getNetwork();
  console.log("🌐 Network:", network.name, "(Chain ID:", network.chainId.toString() + ")");
  
  // Get initial total supply
  const totalSupply = await filecoinDataWeaver.totalSupply();
  
  console.log("📊 Initial total supply:", totalSupply.toString());
  
  // Prepare deployment info
  const deploymentInfo = {
    contractName: "FilecoinDataWeaver",
    contractAddress: contractAddress,
    network: network.name,
    chainId: network.chainId,
    deployer: (await ethers.provider.getSigner()).address,
    deploymentTime: new Date().toISOString(),
    baseURI: "https://ipfs.io/ipfs/",
    totalSupply: totalSupply.toString(),
    features: [
      "Data archiving and storage tracking",
      "Storage contract creation",
      "Data retrieval optimization",
      "Storage efficiency scoring",
      "Soulbound NFTs (non-transferable)",
      "Filecoin network integration"
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
  
  const deploymentFile = path.join(deploymentsDir, `filecoin-data-weaver-${network.name}-${network.chainId}.json`);
  fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value, 2));
  console.log("💾 Deployment info saved to:", deploymentFile);
  
  console.log("\n🎉 Deployment completed successfully!");
  console.log("🔍 You can verify the contract on the block explorer");
  console.log("📝 Use the following command to verify:");
  console.log(`npx hardhat verify --network ${network.name} ${contractAddress}`);
  
  console.log("\n🎮 Data Weaver Features:");
  console.log("- Data archiving and storage tracking");
  console.log("- Storage contract creation and management");
  console.log("- Data retrieval optimization");
  console.log("- Storage efficiency scoring system");
  console.log("- Filecoin network integration");
  console.log("- Progressive skill development");
  
  console.log("\n📋 Next Steps:");
  console.log("1. Update contract-config.ts with the new address");
  console.log("2. Test minting functionality");
  console.log("3. Verify contract on block explorer");
  console.log("4. Update frontend to use new contract address");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
