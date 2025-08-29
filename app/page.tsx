import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-primary text-glow">Interchain Nexus</h1>
              <div className="hidden md:flex space-x-6">
                <Button variant="ghost" className="glow-hover">
                  <a href="/inventory">Inventory</a>
                </Button>
                <Button variant="ghost" className="glow-hover">
                  <a href="/play">Play</a>
                </Button>
                <Button variant="ghost" className="glow-hover">
                  Leaderboard
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* ENS Name Chip - placeholder for when connected */}
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

      {/* Hero Section */}
      <main className="pt-16">
        <div className="relative overflow-hidden">
          {/* Background with subtle pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background opacity-50"></div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(0, 188, 212, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(255, 87, 34, 0.1) 0%, transparent 50%)`,
            }}
          ></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <div className="text-center">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-balance mb-8">
                <span className="text-glow">Interchain Nexus:</span>
                <br />
                <span className="text-primary">A Digital Odyssey</span>
              </h1>

              <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 text-pretty">
                Embark on an epic blockchain quest across multiple chains. Archive clues on Filecoin, verify signals
                through Flare oracles, and roll your destiny to unlock the secrets of the interchain.
              </p>

              <Button size="lg" className="text-lg px-8 py-6 glow-hover">
                <a href="/play">Begin Quest</a>
              </Button>
            </div>
          </div>
        </div>

        {/* Quest Timeline */}
        <section className="py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Your Quest Awaits</h2>
              <p className="text-xl text-muted-foreground">Complete three critical steps to master the interchain</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1: Archive */}
              <Card className="relative glow-hover border-primary/20 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">1</span>
                    </div>
                    <Badge variant="outline" className="text-primary border-primary/50">
                      Filecoin
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Archive</h3>
                  <p className="text-muted-foreground mb-6">
                    Upload your quest clues to the decentralized Filecoin network. Preserve your data across the cosmos
                    with immutable storage.
                  </p>
                  <div className="flex items-center text-sm text-primary">
                    <div className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse"></div>
                    Ready to begin
                  </div>
                </CardContent>
              </Card>

              {/* Step 2: Verify */}
              <Card className="relative glow-hover border-accent/20 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="text-2xl font-bold text-accent">2</span>
                    </div>
                    <Badge variant="outline" className="text-accent border-accent/50">
                      Flare
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Verify</h3>
                  <p className="text-muted-foreground mb-6">
                    Validate your signals through Flare's oracle network. Ensure data integrity across multiple
                    blockchain ecosystems.
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground mr-2"></div>
                    Awaiting archive
                  </div>
                </CardContent>
              </Card>

              {/* Step 3: Resolve */}
              <Card className="relative glow-hover border-secondary/20 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                      <span className="text-2xl font-bold text-secondary">3</span>
                    </div>
                    <Badge variant="outline" className="text-secondary border-secondary/50">
                      Roll
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Resolve</h3>
                  <p className="text-muted-foreground mb-6">
                    Roll your destiny and unlock the final secrets. Your fate across the interchain awaits your courage.
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground mr-2"></div>
                    Awaiting verification
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8">
              Ready to Begin Your <span className="text-primary">Digital Odyssey</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Join thousands of pioneers exploring the frontiers of blockchain technology. Your adventure across the
              interchain starts now.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6 glow-hover">
                <a href="/play">Start Quest</a>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 glow-hover bg-transparent">
                View Leaderboard
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-bold text-primary text-glow">Interchain Nexus</h3>
              <p className="text-sm text-muted-foreground">Bridging worlds through blockchain</p>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                Documentation
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Community
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
