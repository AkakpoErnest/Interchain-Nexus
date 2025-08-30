const { ethers } = require("hardhat");
const fs = require('fs');
const path = require('path');

async function main() {
  const networks = [
    {
      name: 'baseSepolia',
      chainId: 84532,
      displayName: 'Base Sepolia'
    },
    {
      name: 'sepolia', 
      chainId: 11155111,
      displayName: 'Ethereum Sepolia'
    },
    {
      name: 'filecoinTestnet',
      chainId: 314159,
      displayName: 'Filecoin Testnet'
    },
    {
      name: 'flareTestnet',
      chainId: 114,
      displayName: 'Flare Testnet'
    },
    {
      name: 'liskTestnet',
      chainId: 1135,
      displayName: 'Lisk Testnet'
    }
  ];

  console.log("🚀 Starting deployment to all testnets...");
  console.log("📋 Networks to deploy:", networks.map(n => n.displayName).join(', '));

  const deployments = [];

  for (const network of networks) {
    try {
      console.log(`\n📦 Deploying to ${network.displayName} (${network.name})...`);
      
      // Get the contract factory
      const Pioneer = await ethers.getContractFactory("Pioneer");
      
      // Deploy the contract
      const pioneer = await Pioneer.deploy();
      await pioneer.waitForDeployment();
      
      const address = await pioneer.getAddress();
      const deployer = (await ethers.getSigners())[0].address;
      
      console.log(`✅ Deployed to ${network.displayName}: ${address}`);
      
      // Get network info
      const networkInfo = await ethers.provider.getNetwork();
      console.log(`🌐 Network: ${networkInfo.name} (Chain ID: ${networkInfo.chainId})`);
      
      // Get total supply
      const totalSupply = await pioneer.totalSupply();
      console.log(`📊 Initial total supply: ${totalSupply.toString()}`);
      
      // Save deployment info
      const deploymentInfo = {
        network: network.name,
        displayName: network.displayName,
        chainId: network.chainId,
        contractAddress: address,
        deployedAt: new Date().toISOString(),
        deployer: deployer,
        totalSupply: totalSupply.toString(),
        networkName: networkInfo.name
      };
      
      deployments.push(deploymentInfo);
      console.log(`📋 Deployment info saved for ${network.displayName}`);
      
    } catch (error) {
      console.error(`❌ Failed to deploy to ${network.displayName}:`, error.message);
      
      // Still save the error info
      deployments.push({
        network: network.name,
        displayName: network.displayName,
        chainId: network.chainId,
        error: error.message,
        deployedAt: new Date().toISOString()
      });
    }
  }
  
  // Save all deployments to file
  const deploymentsDir = path.join(__dirname, '..', 'deployments');
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }
  
  const deploymentFile = path.join(deploymentsDir, 'all-testnets-deployments.json');
  fs.writeFileSync(deploymentFile, JSON.stringify(deployments, null, 2));
  
  console.log("\n🎉 All deployments completed!");
  console.log(`📁 Deployment info saved to: ${deploymentFile}`);
  
  // Display summary
  console.log("\n📊 Deployment Summary:");
  console.log("=" * 50);
  
  deployments.forEach(deployment => {
    if (deployment.error) {
      console.log(`❌ ${deployment.displayName}: FAILED - ${deployment.error}`);
    } else {
      console.log(`✅ ${deployment.displayName}: ${deployment.contractAddress}`);
    }
  });
  
  console.log("\n🔍 Next Steps:");
  console.log("1. Update contract addresses in lib/contract-config.ts");
  console.log("2. Verify contracts on block explorers");
  console.log("3. Test minting on each network");
  console.log("4. Update frontend configuration");
  
  // Generate frontend config update
  console.log("\n📝 Frontend Config Update:");
  console.log("Update lib/contract-config.ts with these addresses:");
  console.log("=" * 50);
  
  deployments.forEach(deployment => {
    if (!deployment.error) {
      console.log(`  ${deployment.chainId}: {`);
      console.log(`    pioneer: '${deployment.contractAddress}',`);
      console.log(`  },`);
    }
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
