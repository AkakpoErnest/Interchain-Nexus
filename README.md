# 🌌 The Interchain Nexus: A Digital Odyssey

A web-based puzzle-card RPG that feels like a game, not just a dApp. Players choose a starter NFT card, complete realm-specific puzzles, earn Realm Cards, and ultimately forge the Nexus Core.

## 🎮 Game Overview

The Interchain Nexus is a blockchain-based RPG where players journey through five fragmented realms to restore the cosmic balance. Each realm represents a different blockchain ecosystem and offers unique challenges.

### 🃏 Game Flow

1. **Choose Your Pioneer** - Select from 4 unique starter cards, each with passive buffs
2. **Conquer the Realms** - Complete 5 realm-specific puzzles to earn NFT cards
3. **Forge the Nexus** - Unlock the ultimate Nexus Core card when all realms are unified

### 🌟 The Five Realms

- **Vaults of Memory** (Filecoin) - Word puzzle challenges
- **Oracle Spire** (Flare) - Random fate rolls
- **Forge Halls** (Base) - Mini-app building challenges
- **Hall of Names** (ENS) - Identity verification puzzles
- **Council Chambers** (Governance) - On-chain voting mechanics

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Interchain-Nexus

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to begin your odyssey.

## 🎯 Features

### ✨ Game Mechanics
- **Card Selection System** - Choose your Pioneer with unique passive abilities
- **Progressive Puzzles** - Each realm unlocks the next in sequence
- **NFT Rewards** - Earn unique cards for completing challenges
- **Leaderboard** - Compete with other pioneers

### 🎨 Visual Effects
- **Card Animations** - Flip effects and glowing borders
- **Confetti Celebrations** - Particle effects for successes
- **Shake Animations** - Visual feedback for failures
- **Cosmic Theme** - Dark sci-fi aesthetic with neon accents

### 🔊 Audio (Optional)
- **Cosmic Hum** - Ambient background sound
- **Success Chimes** - Pleasant audio feedback
- **Drum Hits** - Failure sound effects
- **Unlock Sounds** - Card acquisition audio

## 🛠️ Technical Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Animations**: Framer Motion
- **Blockchain**: wagmi, viem, RainbowKit (ready for integration)
- **UI Components**: Radix UI primitives

## 📁 Project Structure

```
├── app/
│   ├── choose/          # Pioneer card selection
│   ├── play/            # Main game interface
│   ├── inventory/       # NFT collection view
│   ├── leaderboard/     # Player rankings
│   └── page.tsx         # Landing page
├── components/
│   ├── ui/              # Reusable UI components
│   ├── sound-effects.tsx # Audio system
│   └── confetti.tsx     # Celebration effects
└── public/              # Card images and assets
```

## 🎮 How to Play

1. **Start Your Journey** - Visit the landing page and click "Begin Odyssey"
2. **Choose Your Pioneer** - Select from 4 unique starter cards
3. **Enter the Realms** - Complete puzzles in sequence:
   - Solve word scrambles in the Vaults of Memory
   - Roll dice in the Oracle Spire (need 60+ to succeed)
   - Tap rapidly in the Forge Halls (10 taps in 10 seconds)
   - Verify your ENS name in the Hall of Names
   - Cast votes in the Council Chambers
4. **Collect Cards** - Each completed realm grants an NFT card
5. **Forge the Nexus** - Complete all 5 realms to unlock the Nexus Core

## 🔮 Future Enhancements

- **Smart Contract Integration** - Full NFT minting on-chain
- **Multi-chain Support** - Connect to actual blockchain networks
- **Social Features** - Guilds and team challenges
- **Advanced Puzzles** - More complex realm challenges
- **Mobile App** - Native mobile experience

## 🎨 Card Images

The game includes beautiful card artwork:
- `base_social_architect_card_refined.png` - The Social Architect
- `ens_identity_guardian_card_refined.png` - The Identity Guardian  
- `filecoin_data_weaver_card_refined.png` - The Data Weaver
- `flare_oracle_seer_card_refined.png` - The Oracle Seer
- `glow_strike_card.png` - The Nexus Core

## 🤝 Contributing

This is a demo project showcasing blockchain gaming concepts. Feel free to fork and extend with your own features!

## 📄 License

MIT License - see LICENSE file for details.

---

*"The cosmos lies fractured. Five realms hold the keys: Memory, Truth, Creation, Identity, and Law. You are a Pioneer. Choose your path, solve the trials, and unite the realms into the Nexus."*