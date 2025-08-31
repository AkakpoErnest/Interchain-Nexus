require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// FHE configuration for Zama Protocol
const fhevmConfig = {
  fhevm: {
    network: "ethereum", // Use Ethereum for ENS integration
    chainId: 1,
  },
};

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    // Local development
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
    
    // Base Network
    base: {
      url: process.env.BASE_RPC_URL || "https://mainnet.base.org",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 8453,
    },
    baseSepolia: {
      url: process.env.BASE_SEPOLIA_RPC_URL || "https://sepolia.base.org",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 84532,
    },
    
    // Ethereum Mainnet
    ethereum: {
      url: process.env.ETHEREUM_RPC_URL || "https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 1,
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "https://sepolia.infura.io/v3/YOUR_KEY",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 11155111,
    },
    
    // Filecoin Network
    filecoin: {
      url: process.env.FILECOIN_RPC_URL || "https://api.node.glif.io/rpc/v1",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 314,
    },
    filecoinTestnet: {
      url: process.env.FILECOIN_TESTNET_RPC_URL || "https://api.calibration.node.glif.io/rpc/v1",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 314159,
    },
    
    // Flare Network
    flare: {
      url: process.env.FLARE_RPC_URL || "https://flare-api.flare.network/ext/C/rpc",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 14,
    },
    flareTestnet: {
      url: process.env.FLARE_TESTNET_RPC_URL || "https://coston2-api.flare.network/ext/C/rpc",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 114,
    },
    
    // Lisk Network
    lisk: {
      url: process.env.LISK_RPC_URL || "https://rpc.api.lisk.com",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 1135,
    },
    liskSepolia: {
      url: process.env.LISK_TESTNET_RPC_URL || "https://rpc.sepolia-api.lisk.com",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 4202, // Lisk Sepolia testnet chain ID
    },
    
    // Citrea Network (Bitcoin ZK Rollup)
    citreaTestnet: {
      url: process.env.CITREA_TESTNET_RPC_URL || "https://rpc.citrea.xyz",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 1001, // Citrea testnet chain ID
    },
  },
  
  // Gas configuration
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  
  // Etherscan configuration for contract verification
  etherscan: {
    apiKey: {
      base: process.env.BASESCAN_API_KEY,
      baseSepolia: process.env.BASESCAN_API_KEY,
      mainnet: process.env.ETHERSCAN_API_KEY,
      sepolia: process.env.ETHERSCAN_API_KEY,
      flare: process.env.FLARE_API_KEY,
      flareTestnet: process.env.FLARE_API_KEY,
      lisk: process.env.LISK_API_KEY,
      liskTestnet: process.env.LISK_API_KEY,
    },
    customChains: [
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org"
        }
      },
      {
        network: "baseSepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org"
        }
      },
      {
        network: "flare",
        chainId: 14,
        urls: {
          apiURL: "https://flare-explorer.flare.network/api",
          browserURL: "https://flare-explorer.flare.network"
        }
      },
      {
        network: "flareTestnet",
        chainId: 114,
        urls: {
          apiURL: "https://coston2-explorer.flare.network/api",
          browserURL: "https://coston2-explorer.flare.network"
        }
      },
      {
        network: "lisk",
        chainId: 1135,
        urls: {
          apiURL: "https://liskscan.com/api",
          browserURL: "https://liskscan.com"
        }
      }
    ]
  },
  
  // Path configuration
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  
  // Mocha configuration for tests
  mocha: {
    timeout: 40000
  }
};
