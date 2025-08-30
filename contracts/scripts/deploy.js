const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Starting Interchain Nexus contract deployment...\n");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString(), "wei\n");

  // Deploy Pioneer NFT contract
  console.log("📜 Deploying Pioneer NFT contract...");
  const Pioneer = await ethers.getContractFactory("Pioneer");
  const pioneer = await Pioneer.deploy();
  await pioneer.deployed();
  console.log("✅ Pioneer contract deployed to:", pioneer.address);

  // Deploy RealmQuest contract
  console.log("\n🎮 Deploying RealmQuest contract...");
  const RealmQuest = await ethers.getContractFactory("RealmQuest");
  const realmQuest = await RealmQuest.deploy(pioneer.address);
  await realmQuest.deployed();
  console.log("✅ RealmQuest contract deployed to:", realmQuest.address);

  // Deploy NexusCore contract
  console.log("\n💎 Deploying NexusCore contract...");
  const NexusCore = await ethers.getContractFactory("NexusCore");
  const nexusCore = await NexusCore.deploy();
  await nexusCore.deployed();
  console.log("✅ NexusCore contract deployed to:", nexusCore.address);

  // Deploy LiskConsensus contract (if LSK token address is provided)
  let liskConsensus;
  if (process.env.LSK_TOKEN_ADDRESS) {
    console.log("\n🔗 Deploying LiskConsensus contract...");
    const LiskConsensus = await ethers.getContractFactory("LiskConsensus");
    liskConsensus = await LiskConsensus.deploy(process.env.LSK_TOKEN_ADDRESS);
    await liskConsensus.deployed();
    console.log("✅ LiskConsensus contract deployed to:", liskConsensus.address);
  }

  // Set up contract relationships
  console.log("\n🔧 Setting up contract relationships...");
  
  // Set RealmQuest contract in NexusCore
  await nexusCore.setRealmQuestContract(realmQuest.address);
  console.log("✅ Set RealmQuest contract in NexusCore");

  // Set NexusCore contract in RealmQuest
  await realmQuest.setNexusCoreContract(nexusCore.address);
  console.log("✅ Set NexusCore contract in RealmQuest");

  // Set base URI for Pioneer NFTs
  const pioneerBaseURI = process.env.PIONEER_BASE_URI || "https://api.interchainnexus.com/pioneer/";
  await pioneer.setBaseURI(pioneerBaseURI);
  console.log("✅ Set Pioneer base URI:", pioneerBaseURI);

  // Set base URI for NexusCore NFTs
  const nexusBaseURI = process.env.NEXUS_BASE_URI || "https://api.interchainnexus.com/nexus/";
  await nexusCore.setBaseURI(nexusBaseURI);
  console.log("✅ Set NexusCore base URI:", nexusBaseURI);

  // Deploy contracts to different networks if specified
  const network = await ethers.provider.getNetwork();
  console.log("\n🌐 Deployed to network:", network.name, "(Chain ID:", network.chainId, ")");

  // Print deployment summary
  console.log("\n📋 Deployment Summary:");
  console.log("======================");
  console.log("Pioneer Contract:", pioneer.address);
  console.log("RealmQuest Contract:", realmQuest.address);
  console.log("NexusCore Contract:", nexusCore.address);
  if (liskConsensus) {
    console.log("LiskConsensus Contract:", liskConsensus.address);
  }
  console.log("Deployer:", deployer.address);
  console.log("Network:", network.name, "(Chain ID:", network.chainId, ")");

  // Save deployment info to file
  const deploymentInfo = {
    network: network.name,
    chainId: network.chainId,
    deployer: deployer.address,
    contracts: {
      Pioneer: pioneer.address,
      RealmQuest: realmQuest.address,
      NexusCore: nexusCore.address,
      ...(liskConsensus && { LiskConsensus: liskConsensus.address })
    },
    timestamp: new Date().toISOString(),
    baseURIs: {
      Pioneer: pioneerBaseURI,
      NexusCore: nexusBaseURI
    }
  };

  const fs = require('fs');
  const deploymentFile = `deployments/${network.name}-${network.chainId}.json`;
  
  // Create deployments directory if it doesn't exist
  if (!fs.existsSync('deployments')) {
    fs.mkdirSync('deployments');
  }
  
  fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
  console.log(`\n💾 Deployment info saved to: ${deploymentFile}`);

  // Verify contracts if on a supported network
  if (network.chainId !== 31337 && network.chainId !== 1337) {
    console.log("\n🔍 Verifying contracts...");
    console.log("Run the following commands to verify contracts:");
    console.log(`npx hardhat verify --network ${network.name} ${pioneer.address}`);
    console.log(`npx hardhat verify --network ${network.name} ${realmQuest.address} "${pioneer.address}"`);
    console.log(`npx hardhat verify --network ${network.name} ${nexusCore.address}`);
    if (liskConsensus) {
      console.log(`npx hardhat verify --network ${network.name} ${liskConsensus.address} "${process.env.LSK_TOKEN_ADDRESS}"`);
    }
  }

  console.log("\n🎉 Deployment completed successfully!");
  console.log("\nNext steps:");
  console.log("1. Update your frontend with the new contract addresses");
  console.log("2. Set up IPFS for metadata storage");
  console.log("3. Configure wallet connection in your app");
  console.log("4. Test the contracts with sample transactions");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
