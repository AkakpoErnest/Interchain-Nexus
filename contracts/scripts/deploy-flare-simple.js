const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Starting Flare Oracle Seer Simple contract deployment...");

  // Get the contract factory
  const FlareOracleSeerSimple = await ethers.getContractFactory("FlareOracleSeerSimple");

  console.log("📦 Deploying Flare Oracle Seer Simple contract...");
  
  // Deploy the contract
  const flareOracleSeerSimple = await FlareOracleSeerSimple.deploy();
  
  // Wait for deployment
  await flareOracleSeerSimple.waitForDeployment();
  
  const contractAddress = await flareOracleSeerSimple.getAddress();
  
  console.log(`✅ Flare Oracle Seer Simple contract deployed to: ${contractAddress}`);
  console.log(`🌐 Network: ${network.name} (Chain ID: ${network.config.chainId})`);
  
  // Test basic functions
  try {
    const name = await flareOracleSeerSimple.name();
    console.log(`📋 Contract Name: ${name}`);
    
    const symbol = await flareOracleSeerSimple.symbol();
    console.log(`🏷️  Contract Symbol: ${symbol}`);
    
    const totalSupply = await flareOracleSeerSimple.totalSupply();
    console.log(`📊 Total Supply: ${totalSupply}`);
    
    const isMintingAvailable = await flareOracleSeerSimple.isMintingAvailable();
    console.log(`✅ Minting Available: ${isMintingAvailable}`);
    
    console.log("🎉 Contract deployment and verification completed successfully!");
    
  } catch (error) {
    console.log("❌ Contract verification failed:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
