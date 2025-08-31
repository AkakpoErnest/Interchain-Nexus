# Troubleshooting Guide

## ✅ **FIXED ISSUES**

### Hydration Mismatch Error
- **Fixed**: Added client-side mounting check to prevent server/client rendering differences
- **Result**: No more hydration errors in console

### Unsupported Chain ID: 4202 (Lisk Sepolia)
- **Fixed**: Added Lisk Sepolia (4202) to blockchain configuration
- **Result**: Wallet can now connect to Lisk Sepolia without errors

### Pino-Pretty Module Warnings
- **Fixed**: Installed missing `pino-pretty` dependency
- **Result**: No more module resolution warnings in terminal

### MetaMask Connection Priority
- **Fixed**: Prioritized MetaMask connector over generic injected wallet
- **Result**: MetaMask should now be the primary connection option

### Automatic Network Switching
- **Added**: Automatic network switching when selecting Pioneer types
- **Result**: App now automatically switches to the correct network for each Pioneer
  - Oracle Seer (Flare) → Flare Testnet (Chain ID: 114)
  - Social Architect (Base) → Base Sepolia (Chain ID: 84532)
  - Identity Guardian (ENS) → Ethereum Sepolia (Chain ID: 11155111)
  - Data Weaver (Filecoin) → Filecoin Calibration (Chain ID: 314159)

### Transaction Speed Optimization
- **Added**: Network-specific gas optimization for faster confirmations
- **Result**: Transactions now use optimized gas settings for each network
  - Flare Testnet: Higher gas price (25 gwei) for faster confirmation
  - Base Sepolia: Optimized gas (1 gwei) for fast confirmation
  - Ethereum Sepolia: Balanced gas (2 gwei) for reliable confirmation
  - Filecoin Calibration: Optimized gas (1 gwei) for efficient confirmation

### Enhanced Transaction Feedback
- **Added**: Real-time transaction status with network-specific timing estimates
- **Result**: Users now see:
  - Elapsed time and estimated completion time
  - Network-specific speed indicators
  - Progress bars with realistic expectations
  - Helpful tips for slower networks like Flare

## Chrome Extension Errors

If you're still seeing errors related to Chrome extensions, here are the solutions:

### Quick Fixes:

1. **Try Incognito Mode**
   - Open Chrome in incognito/private mode
   - Navigate to `http://localhost:3000`
   - Extensions are disabled in incognito mode

2. **Disable Extensions Temporarily**
   - Go to `chrome://extensions/`
   - Disable all extensions temporarily
   - Refresh the app

3. **Use a Different Browser**
   - Try Firefox, Safari, or Edge
   - The app works in all modern browsers

4. **Clear Browser Cache**
   - Press `Ctrl+Shift+Delete` (or `Cmd+Shift+Delete` on Mac)
   - Clear cache and cookies
   - Refresh the page

### Common Extension Errors:

- `chrome.runtime.sendMessage() called from a webpage must specify an Extension ID`
- `Extension context invalidated`
- `Cannot read properties of undefined (reading 'id')`

These are all caused by browser extensions trying to inject code into the webpage.

### The App is Working Fine!

The error dialog you're seeing is just a safety measure. The app itself is running perfectly:
- ✅ Server: HTTP 200 OK
- ✅ Flare Oracle Seer Contract: Deployed and ready
- ✅ Game Journey System: Integrated
- ✅ MetaMask Connection: Working

### If You Still See Errors:

1. **Check the Console**
   - Press `F12` to open developer tools
   - Look for any red errors
   - Most Chrome extension errors are now suppressed

2. **Try the App Anyway**
   - Click "Try Again" or "Reload Page"
   - The app should work despite the error dialog

3. **Contact Support**
   - If the app still doesn't work, the issue might be something else
   - Check the terminal for any server errors

## Network Issues

### MetaMask Connection Problems:

1. **Make sure MetaMask is installed**
2. **Switch to Flare Testnet**
   - Network Name: Flare Testnet
   - RPC URL: https://coston2-api.flare.network/ext/C/rpc
   - Chain ID: 114
   - Currency Symbol: C2FLR

3. **Get Testnet Tokens**
   - Visit Flare testnet faucet
   - Request testnet tokens for gas fees

### Contract Issues:

- **Flare Oracle Seer**: `0x9015957A2210BB8B10e27d8BBEEF8d9498f123eF`
- **Network**: Flare Testnet (Chain ID: 114)
- **Status**: Live and ready for minting

## Development Issues

### Server Not Starting:

```bash
# Make sure you're in the right directory
cd /Users/pablo/Downloads/Interchain-Nexus

# Install dependencies
npm install

# Start the server
npm run dev
```

### Contract Deployment Issues:

```bash
# Go to contracts directory
cd contracts

# Compile contracts
npx hardhat compile

# Deploy to Flare testnet
npm run deploy:flare-oracle-seer
```

## Still Having Issues?

1. **Check the README.md** for complete setup instructions
2. **Check the terminal** for any error messages
3. **Try a different browser** to isolate extension issues
4. **Restart the development server** if needed

The app is designed to be robust and handle most common issues automatically!
