const { ethers } = require("hardhat");

async function main() {
  console.log("🔍 Debugging Filecoin Data Weaver contract...");
  
  const contractAddress = "0xc00a268Fbcbb00a72bfc8CD0FE7CfE26dad3BEd8";
  const FilecoinDataWeaver = await ethers.getContractFactory("FilecoinDataWeaver");
  const filecoinDataWeaver = FilecoinDataWeaver.attach(contractAddress);
  
  console.log("📋 Contract Address:", contractAddress);
  
  // Get the contract interface
  const contractInterface = filecoinDataWeaver.interface;
  console.log("\n📋 Available functions:");
  
  // List all functions
  const functions = contractInterface.functions;
  Object.keys(functions).forEach(funcName => {
    console.log("-", funcName);
  });
  
  // Test if mintPioneer exists
  console.log("\n🎯 Testing mintPioneer function...");
  try {
    const hasMintPioneer = typeof filecoinDataWeaver.mintPioneer === 'function';
    console.log("mintPioneer function exists:", hasMintPioneer);
    
    if (hasMintPioneer) {
      console.log("✅ mintPioneer function is available!");
    } else {
      console.log("❌ mintPioneer function is NOT available!");
    }
  } catch (error) {
    console.log("❌ Error checking mintPioneer:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Debug failed:", error);
    process.exit(1);
  });

