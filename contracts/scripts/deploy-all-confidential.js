const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying all confidential contracts...");
  
  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  
  // Check deployer balance
  const balance = await deployer.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.utils.formatEther(balance), "ETH");
  
  const contracts = {};
  
  try {
    // Deploy Confidential ENS Identity Guardian
    console.log("\n1. Deploying Confidential ENS Identity Guardian...");
    const ConfidentialEnsIdentityGuardian = await ethers.getContractFactory("ConfidentialEnsIdentityGuardian");
    const ensContract = await ConfidentialEnsIdentityGuardian.deploy();
    await ensContract.waitForDeployment();
    const ensAddress = await ensContract.getAddress();
    contracts.confidentialEns = ensAddress;
    console.log("✓ Confidential ENS Identity Guardian deployed to:", ensAddress);
    
    // Deploy Confidential Pioneer Distribution
    console.log("\n2. Deploying Confidential Pioneer Distribution...");
    const ConfidentialPioneerDistribution = await ethers.getContractFactory("ConfidentialPioneerDistribution");
    const distributionContract = await ConfidentialPioneerDistribution.deploy();
    await distributionContract.waitForDeployment();
    const distributionAddress = await distributionContract.getAddress();
    contracts.confidentialDistribution = distributionAddress;
    console.log("✓ Confidential Pioneer Distribution deployed to:", distributionAddress);
    
    // Deploy Confidential Pioneer Governance
    console.log("\n3. Deploying Confidential Pioneer Governance...");
    const ConfidentialPioneerGovernance = await ethers.getContractFactory("ConfidentialPioneerGovernance");
    const governanceContract = await ConfidentialPioneerGovernance.deploy();
    await governanceContract.waitForDeployment();
    const governanceAddress = await governanceContract.getAddress();
    contracts.confidentialGovernance = governanceAddress;
    console.log("✓ Confidential Pioneer Governance deployed to:", governanceAddress);
    
    // Verify deployments
    console.log("\n4. Verifying deployments...");
    
    const ensTotalSupply = await ensContract.totalSupply();
    console.log("✓ ENS Contract total supply:", ensTotalSupply.toString());
    
    const ensMintingAvailable = await ensContract.isMintingAvailable();
    console.log("✓ ENS Contract minting available:", ensMintingAvailable);
    
    const governanceTotalProposals = await governanceContract.getTotalProposals();
    console.log("✓ Governance Contract total proposals:", governanceTotalProposals.toString());
    
    console.log("\n🎉 All confidential contracts deployed successfully!");
    console.log("\n📋 Contract Addresses:");
    console.log("Confidential ENS Identity Guardian:", contracts.confidentialEns);
    console.log("Confidential Pioneer Distribution:", contracts.confidentialDistribution);
    console.log("Confidential Pioneer Governance:", contracts.confidentialGovernance);
    
    console.log("\n📝 Environment Variables to add to .env:");
    console.log(`NEXT_PUBLIC_CONFIDENTIAL_ENS_CONTRACT_SEPOLIA=${contracts.confidentialEns}`);
    console.log(`NEXT_PUBLIC_CONFIDENTIAL_DISTRIBUTION_CONTRACT_SEPOLIA=${contracts.confidentialDistribution}`);
    console.log(`NEXT_PUBLIC_CONFIDENTIAL_GOVERNANCE_CONTRACT_SEPOLIA=${contracts.confidentialGovernance}`);
    
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
