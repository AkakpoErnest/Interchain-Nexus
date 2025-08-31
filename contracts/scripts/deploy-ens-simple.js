const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Deploying ENS Identity Guardian Simple...");
  
  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  // Deploy the contract
  const EnsIdentityGuardianSimple = await ethers.getContractFactory("EnsIdentityGuardianSimple");
  const ensContract = await EnsIdentityGuardianSimple.deploy();
  
  await ensContract.waitForDeployment();
  
  const contractAddress = await ensContract.getAddress();
  console.log("✅ ENS Identity Guardian Simple deployed to:", contractAddress);
  console.log("📋 Contract Details:");
  console.log("  - Name:", await ensContract.name());
  console.log("  - Symbol:", await ensContract.symbol());
  console.log("  - ENS Registry:", await ensContract.ENS_REGISTRY());
  console.log("  - Pioneer Type:", await ensContract.ENS_PIONEER_TYPE());
  
  // Verify deployment
  console.log("\n🔍 Verifying deployment...");
  const totalSupply = await ensContract.totalSupply();
  const isMintingAvailable = await ensContract.isMintingAvailable();
  
  console.log("  - Total Supply:", totalSupply.toString());
  console.log("  - Minting Available:", isMintingAvailable);
  
  console.log("\n🎉 Deployment completed successfully!");
  console.log("📝 Add this address to your contract config:");
  console.log(`"Flare Testnet": "${contractAddress}"`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
