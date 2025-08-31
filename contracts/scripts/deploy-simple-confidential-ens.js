const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying Simple Confidential ENS Identity Guardian...");
  
  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  
  // Check deployer balance
  const balance = await deployer.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");
  
  if (balance < ethers.parseEther("0.01")) {
    console.log("⚠️  Warning: Low balance! You may need more testnet ETH.");
    console.log("Get testnet ETH from: https://sepoliafaucet.com/");
  }
  
  try {
    // Deploy Simple Confidential ENS Identity Guardian
    console.log("\n1. Deploying Simple Confidential ENS Identity Guardian...");
    const SimpleConfidentialEnsIdentityGuardian = await ethers.getContractFactory("SimpleConfidentialEnsIdentityGuardian");
    const ensContract = await SimpleConfidentialEnsIdentityGuardian.deploy();
    
    await ensContract.waitForDeployment();
    const ensAddress = await ensContract.getAddress();
    
    console.log("✓ Simple Confidential ENS Identity Guardian deployed to:", ensAddress);
    
    // Verify deployment
    console.log("\n2. Verifying deployment...");
    
    const totalSupply = await ensContract.totalSupply();
    console.log("✓ Total supply:", totalSupply.toString());
    
    const isMintingAvailable = await ensContract.isMintingAvailable();
    console.log("✓ Minting available:", isMintingAvailable);
    
    const ensPioneerType = await ensContract.ENS_PIONEER_TYPE();
    console.log("✓ ENS Pioneer Type:", ensPioneerType.toString());
    
    console.log("\n🎉 Simple Confidential ENS Identity Guardian deployed successfully!");
    console.log("\n📋 Contract Address:");
    console.log("Simple Confidential ENS Identity Guardian:", ensAddress);
    
    console.log("\n📝 Environment Variable to add to .env:");
    console.log(`NEXT_PUBLIC_CONFIDENTIAL_ENS_CONTRACT_SEPOLIA=${ensAddress}`);
    
    console.log("\n🔗 View on Sepolia Etherscan:");
    console.log(`https://sepolia.etherscan.io/address/${ensAddress}`);
    
  } catch (error) {
    console.error("❌ Deployment failed:", error);
    throw error;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
