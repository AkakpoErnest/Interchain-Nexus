import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Pioneer Cards based on the provided images
const pioneerCards = [
  {
    id: 1,
    name: "The Social Architect",
    title: "Builder",
    realm: "Base",
    rarity: "Epic",
    stats: { creativity: 95, leadership: 88, innovation: 92 },
    image: "/base_social_architect_card_refined.png",
    description: "A master builder who creates social protocols and community structures. Specializes in Base ecosystem development.",
  },
  {
    id: 2,
    name: "The Identity Guardian",
    title: "Protector",
    realm: "ENS",
    rarity: "Epic",
    stats: { security: 95, wisdom: 90, protection: 88 },
    image: "/ens_identity_guardian_card_refined.png",
    description: "A guardian of digital identity and names. Protects the sacred registry of ENS names across the cosmos.",
  },
  {
    id: 3,
    name: "The Data Weaver",
    title: "Archivist",
    realm: "Filecoin",
    rarity: "Epic",
    stats: { knowledge: 95, precision: 92, memory: 90 },
    image: "/filecoin_data_weaver_card_refined.png",
    description: "A master of data storage and retrieval. Weaves information across the decentralized Filecoin network.",
  },
  {
    id: 4,
    name: "The Oracle Seer",
    title: "Prophet",
    realm: "Flare",
    rarity: "Epic",
    stats: { foresight: 95, intuition: 88, prophecy: 90 },
    image: "/flare_oracle_seer_card_refined.png",
    description: "A seer who reads the patterns of randomness and fate. Harnesses Flare's oracle network for divination.",
  },
]

const realmCards = [
  {
    id: 1,
    name: "Memory Shard",
    type: "Archive Realm",
    rarity: "Rare",
    bonus: "Archive puzzles +25%",
    image: "/crystalline-shard-with-cosmic-energy.png",
    description: "A fragment of ancient knowledge from the Vaults of Memory. Earned by solving word puzzles.",
  },
  {
    id: 2,
    name: "Oracle Seal",
    type: "Oracle Realm",
    rarity: "Rare",
    bonus: "Oracle rolls +25%",
    image: "/mystical-oracle-eye-with-data-streams.png",
    description: "A mystical seal from the Oracle Spire. Earned by rolling fate successfully.",
  },
  {
    id: 3,
    name: "Forge Ember",
    type: "Forge Realm",
    rarity: "Rare",
    bonus: "Builder tasks +25%",
    image: "/holographic-app-interface-deployment.png",
    description: "A glowing ember from the Forge Halls. Earned by building mini-apps.",
  },
  {
    id: 4,
    name: "True Name",
    type: "Identity Realm",
    rarity: "Rare",
    bonus: "Identity checks +25%",
    image: "/glowing-scroll-with-encrypted-symbols.png",
    description: "A sacred name from the Hall of Names. Earned by proving your identity.",
  },
  {
    id: 5,
    name: "Council Mark",
    type: "Governance Realm",
    rarity: "Rare",
    bonus: "Voting power +25%",
    image: "/futuristic-citadel-with-governance-symbols.png",
    description: "A mark of authority from the Council Chambers. Earned by participating in governance.",
  },
]

const protocolCards = [
  {
    id: 1,
    name: "Flare Oracle's Gaze",
    type: "Verification Protocol",
    rarity: "Epic",
    effect: "Reveals hidden truths, verifies data authenticity",
    cooldown: "3 turns",
    image: "/mystical-oracle-eye-with-data-streams.png",
    description: "Harness Flare's oracle network to verify crucial information.",
  },
  {
    id: 2,
    name: "Base Mini-App Deployment",
    type: "Social Protocol",
    rarity: "Uncommon",
    effect: "Creates temporary social hub",
    cooldown: "5 turns",
    image: "/holographic-app-interface-deployment.png",
    description: "Rapidly deploy social applications to solve community challenges.",
  },
]

const artifactCards = [
  {
    id: 1,
    name: "Nexus Core",
    type: "Ultimate Artifact",
    rarity: "Legendary",
    effect: "Unlocks the finale cutscene",
    image: "/glow_strike_card.png",
    description: "The ultimate artifact forged from all five realm cards. This is the key to restoring the Interchain Nexus.",
  },
  {
    id: 2,
    name: "The Shard of Genesis",
    type: "Primordial Fragment",
    rarity: "Legendary",
    effect: "Universal resource bonus +15%",
    image: "/crystalline-shard-with-cosmic-energy.png",
    description: "A fragment of the original blockchain, pulsing with primordial energy.",
  },
  {
    id: 3,
    name: "Encrypted Data Scroll",
    type: "Quest Item",
    rarity: "Rare",
    effect: "Unlocks hidden quest line",
    image: "/glowing-scroll-with-encrypted-symbols.png",
    description: "Ancient data scroll containing secrets of the interchain.",
  },
]

function NFTCard({ card, type }: { card: any; type: string }) {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Legendary":
        return "text-yellow-400 border-yellow-400/50"
      case "Epic":
        return "text-purple-400 border-purple-400/50"
      case "Rare":
        return "text-blue-400 border-blue-400/50"
      case "Uncommon":
        return "text-green-400 border-green-400/50"
      default:
        return "text-gray-400 border-gray-400/50"
    }
  }

  return (
    <Card
      className={`glow-hover bg-card/50 backdrop-blur-sm ${getRarityColor(card.rarity)} transition-all duration-300 hover:scale-105`}
    >
      <CardHeader className="pb-2">
        <div className="aspect-[3/4] rounded-lg overflow-hidden mb-3">
          <img src={card.image || "/placeholder.svg"} alt={card.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{card.name}</CardTitle>
          <Badge variant="outline" className={getRarityColor(card.rarity)}>
            {card.rarity}
          </Badge>
        </div>
        {card.title && <p className="text-sm text-muted-foreground">{card.title}</p>}
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{card.description}</p>

        {type === "pioneer" && card.stats && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Speed</span>
              <span className="text-primary">{card.stats.speed}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Accuracy</span>
              <span className="text-primary">{card.stats.accuracy}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Power</span>
              <span className="text-primary">{card.stats.power}</span>
            </div>
            <Badge variant="secondary" className="w-full justify-center">
              {card.realm} Realm
            </Badge>
          </div>
        )}

        {type === "realm" && (
          <div className="space-y-2">
            <Badge variant="secondary" className="w-full justify-center">
              {card.type}
            </Badge>
            <div className="text-sm text-center text-primary font-medium">{card.bonus}</div>
          </div>
        )}

        {type === "protocol" && (
          <div className="space-y-2">
            <Badge variant="secondary" className="w-full justify-center">
              {card.type}
            </Badge>
            <div className="text-sm text-muted-foreground">
              <strong>Effect:</strong> {card.effect}
            </div>
            <div className="text-sm text-accent">
              <strong>Cooldown:</strong> {card.cooldown}
            </div>
          </div>
        )}

        {type === "artifact" && (
          <div className="space-y-2">
            <Badge variant="secondary" className="w-full justify-center">
              {card.type}
            </Badge>
            <div className="text-sm text-center text-primary font-medium">{card.effect}</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function InventoryPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <a href="/" className="text-xl font-bold text-primary text-glow hover:opacity-80 transition-opacity">
                Interchain Nexus
              </a>
              <div className="hidden md:flex space-x-6">
                <Button variant="ghost" className="glow-hover text-primary">
                  Inventory
                </Button>
                <Button variant="ghost" className="glow-hover">
                  <a href="/play">Play</a>
                </Button>
                <Button variant="ghost" className="glow-hover">
                  <a href="/">Quest</a>
                </Button>
                <Button variant="ghost" className="glow-hover">
                  Leaderboard
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="hidden sm:flex glow">
                pioneer.eth
              </Badge>
              <Button variant="outline" className="glow-hover bg-transparent">
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-glow">NFT</span> <span className="text-primary">Inventory</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your collection of Pioneer cards, Realm territories, Protocol abilities, and rare Artifacts from across
              the interchain.
            </p>
          </div>

          <Tabs defaultValue="pioneers" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="pioneers" className="text-sm">
                Pioneer Cards
              </TabsTrigger>
              <TabsTrigger value="realms" className="text-sm">
                Realm Cards
              </TabsTrigger>
              <TabsTrigger value="protocols" className="text-sm">
                Protocol Cards
              </TabsTrigger>
              <TabsTrigger value="artifacts" className="text-sm">
                Artifact Cards
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pioneers" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Pioneer Cards ({pioneerCards.length})</h2>
                <Badge variant="outline" className="text-primary border-primary/50">
                  Character NFTs
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {pioneerCards.map((card) => (
                  <NFTCard key={card.id} card={card} type="pioneer" />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="realms" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Realm Cards ({realmCards.length})</h2>
                <Badge variant="outline" className="text-accent border-accent/50">
                  Territory NFTs
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {realmCards.map((card) => (
                  <NFTCard key={card.id} card={card} type="realm" />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="protocols" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Protocol Cards ({protocolCards.length})</h2>
                <Badge variant="outline" className="text-secondary border-secondary/50">
                  Ability NFTs
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {protocolCards.map((card) => (
                  <NFTCard key={card.id} card={card} type="protocol" />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="artifacts" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Artifact Cards ({artifactCards.length})</h2>
                <Badge variant="outline" className="text-yellow-400 border-yellow-400/50">
                  Item NFTs
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {artifactCards.map((card) => (
                  <NFTCard key={card.id} card={card} type="artifact" />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
