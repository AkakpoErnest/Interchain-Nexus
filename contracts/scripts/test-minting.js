const { ethers } = require("hardhat");

async function main() {
  console.log("🧪 Testing Lisk Social Architect Minting...");

  // Contract address (update this with the deployed address)
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  
  // Get the contract factory
  const LiskSocialArchitect = await ethers.getContractFactory("LiskSocialArchitectUnlimited");
  
  // Connect to the deployed contract
  const contract = LiskSocialArchitect.attach(contractAddress);
  
  // Get the deployer
  const [deployer] = await ethers.getSigners();
  console.log("Testing with address:", deployer.address);
  
  try {
    // Check if player already has a Social Architect
    const hasArchitect = await contract.hasSocialArchitect(deployer.address);
    console.log("Has Social Architect:", hasArchitect);
    
    if (!hasArchitect) {
      // Try to mint a Social Architect
      console.log("🎯 Attempting to mint Social Architect...");
      const tx = await contract.publicMint("Test Social Architect", "Builder of Worlds");
      console.log("Transaction hash:", tx.hash);
      
      // Wait for transaction to be mined
      const receipt = await tx.wait();
      console.log("✅ Transaction confirmed in block:", receipt.blockNumber);
      
      // Check the new state
      const newHasArchitect = await contract.hasSocialArchitect(deployer.address);
      const tokenId = await contract.getPlayerSocialArchitect(deployer.address);
      const totalSupply = await contract.totalSupply();
      
      console.log("📊 After minting:");
      console.log("  Has Social Architect:", newHasArchitect);
      console.log("  Token ID:", tokenId.toString());
      console.log("  Total Supply:", totalSupply.toString());
      
      // Get the Social Architect data
      const architectData = await contract.getSocialArchitectData(tokenId);
      console.log("📋 Social Architect Data:");
      console.log("  Name:", architectData.name);
      console.log("  Title:", architectData.title);
      console.log("  Realm:", architectData.realm);
      console.log("  Rarity:", architectData.rarity);
      console.log("  Community Score:", architectData.communityScore.toString());
      console.log("  Protocols Built:", architectData.protocolsBuilt.toString());
      console.log("  Connections Made:", architectData.connectionsMade.toString());
      
    } else {
      console.log("ℹ️  Player already has a Social Architect");
      const tokenId = await contract.getPlayerSocialArchitect(deployer.address);
      const architectData = await contract.getSocialArchitectData(tokenId);
      console.log("📋 Current Social Architect Data:");
      console.log("  Token ID:", tokenId.toString());
      console.log("  Name:", architectData.name);
      console.log("  Title:", architectData.title);
      console.log("  Community Score:", architectData.communityScore.toString());
    }
    
    // Test building a protocol
    console.log("\n🔨 Testing protocol building...");
    const buildTx = await contract.buildProtocol("Test Protocol", 5);
    await buildTx.wait();
    console.log("✅ Protocol built successfully!");
    
    // Check updated data
    const tokenId = await contract.getPlayerSocialArchitect(deployer.address);
    const updatedData = await contract.getSocialArchitectData(tokenId);
    console.log("📊 Updated stats:");
    console.log("  Protocols Built:", updatedData.protocolsBuilt.toString());
    console.log("  Community Score:", updatedData.communityScore.toString());
    
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Test failed:", error);
    process.exit(1);
  });

