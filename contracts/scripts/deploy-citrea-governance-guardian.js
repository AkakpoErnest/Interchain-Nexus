const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying CitreaGovernanceGuardian contract...");

  // Get the contract factory
  const CitreaGovernanceGuardian = await ethers.getContractFactory("CitreaGovernanceGuardian");

  // Deploy the contract
  const citreaGovernanceGuardian = await CitreaGovernanceGuardian.deploy();

  // Wait for deployment to complete
  await citreaGovernanceGuardian.waitForDeployment();

  const contractAddress = await citreaGovernanceGuardian.getAddress();

  console.log("CitreaGovernanceGuardian deployed to:", contractAddress);
  console.log("Contract name:", await citreaGovernanceGuardian.name());
  console.log("Contract symbol:", await citreaGovernanceGuardian.symbol());

  // Verify deployment
  console.log("\nVerifying deployment...");
  const totalSupply = await citreaGovernanceGuardian.totalSupply();
  console.log("Initial total supply:", totalSupply.toString());

  // Save deployment info
  const deploymentInfo = {
    network: "citrea-testnet",
    chainId: 1001,
    contractName: "CitreaGovernanceGuardian",
    contractAddress: contractAddress,
    deployer: await citreaGovernanceGuardian.owner(),
    deploymentTime: new Date().toISOString(),
    transactionHash: citreaGovernanceGuardian.deploymentTransaction().hash,
  };

  console.log("\nDeployment Information:");
  console.log(JSON.stringify(deploymentInfo, null, 2));

  // Instructions for next steps
  console.log("\n" + "=".repeat(60));
  console.log("DEPLOYMENT COMPLETE!");
  console.log("=".repeat(60));
  console.log("\nNext steps:");
  console.log("1. Update your .env file with the contract address:");
  console.log(`   NEXT_PUBLIC_PIONEER_CONTRACT_CITREA_TESTNET=${contractAddress}`);
  console.log("\n2. Add the contract address to your contract-config.ts:");
  console.log(`   pioneer: '${contractAddress}',`);
  console.log("\n3. Verify the contract on Citrea Explorer (if available)");
  console.log("\n4. Test the contract functions using the CitreaGovernanceGuardian component");
  
  console.log("\nContract ABI and deployment info saved to deployment artifacts.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
