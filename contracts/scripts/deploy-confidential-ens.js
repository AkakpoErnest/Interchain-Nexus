const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying Confidential ENS Identity Guardian...");
  
  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  
  // Check deployer balance
  const balance = await deployer.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.utils.formatEther(balance), "ETH");
  
  // Deploy the Confidential ENS Identity Guardian contract
  const ConfidentialEnsIdentityGuardian = await ethers.getContractFactory("ConfidentialEnsIdentityGuardian");
  const ensContract = await ConfidentialEnsIdentityGuardian.deploy();
  
  await ensContract.waitForDeployment();
  const ensAddress = await ensContract.getAddress();
  
  console.log("Confidential ENS Identity Guardian deployed to:", ensAddress);
  
  // Verify deployment
  console.log("Verifying deployment...");
  const totalSupply = await ensContract.totalSupply();
  console.log("Initial total supply:", totalSupply.toString());
  
  const isMintingAvailable = await ensContract.isMintingAvailable();
  console.log("Minting available:", isMintingAvailable);
  
  console.log("Deployment completed successfully!");
  console.log("Contract address:", ensAddress);
  console.log("Deployer address:", deployer.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
