const { ethers } = require("hardhat");

async function main() {
  console.log("🧪 Testing Filecoin Data Weaver minting functionality...");
  
  // Get the deployed contract
  const contractAddress = "0xc00a268Fbcbb00a72bfc8CD0FE7CfE26dad3BEd8";
  const FilecoinDataWeaver = await ethers.getContractFactory("FilecoinDataWeaver");
  const filecoinDataWeaver = FilecoinDataWeaver.attach(contractAddress);
  
  console.log("📋 Contract Address:", contractAddress);
  
  // Get deployer address
  const [deployer] = await ethers.getSigners();
  console.log("👤 Deployer address:", deployer.address);
  
  // Check initial state
  const initialTotalSupply = await filecoinDataWeaver.totalSupply();
  console.log("📊 Initial total supply:", initialTotalSupply.toString());
  
  // Test minting a Data Weaver using the new mintPioneer function
  console.log("\n🎯 Testing Data Weaver minting with mintPioneer function...");
  
  try {
    const tx = await filecoinDataWeaver.mintPioneer(
      2, // PioneerType.DATA_WEAVER
      deployer.address
    );
    
    console.log("⏳ Transaction hash:", tx.hash);
    console.log("⏳ Waiting for confirmation...");
    
    const receipt = await tx.wait();
    console.log("✅ Transaction confirmed in block:", receipt.blockNumber);
    
    // Check updated state
    const newTotalSupply = await filecoinDataWeaver.totalSupply();
    console.log("📊 New total supply:", newTotalSupply.toString());
    
    // Check if deployer has Data Weaver
    const hasDataWeaver = await filecoinDataWeaver.hasPioneer(deployer.address);
    console.log("🎯 Deployer has Data Weaver:", hasDataWeaver);
    
    if (hasDataWeaver) {
      const tokenId = await filecoinDataWeaver.getPlayerPioneer(deployer.address);
      console.log("🆔 Token ID:", tokenId.toString());
      
      // Get Data Weaver data using the new getPioneerData function
      const weaverData = await filecoinDataWeaver.getPioneerData(tokenId);
      console.log("\n📋 Data Weaver Information:");
      console.log("Pioneer Type:", weaverData.pioneerType.toString());
      console.log("Name:", weaverData.name);
      console.log("Title:", weaverData.title);
      console.log("Realm:", weaverData.realm);
      console.log("Rarity:", weaverData.rarity);
      console.log("Minted At:", new Date(Number(weaverData.mintedAt) * 1000).toISOString());
      console.log("Is Active:", weaverData.isActive);
    }
    
    console.log("\n🎉 Minting test completed successfully!");
    
  } catch (error) {
    console.error("❌ Minting test failed:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Test failed:", error);
    process.exit(1);
  });
