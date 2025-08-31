export interface EnsQuest {
  id: number
  type: 'name-check' | 'reverse-record' | 'text-record' | 'avatar' | 'guild' | 'oracle-riddle'
  title: string
  description: string
  ensTask: string
  expectedResult?: any
  reward: EnsVisionCard
  energyCost: number
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary'
  timeLimit?: number
  multipleChoice?: string[]
  calculation?: {
    formula: string
    variables: Record<string, number>
  }
}

export interface EnsVisionCard {
  id: string
  name: string
  description: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  power: number
  fusion?: string[]
  ensRecord?: string
}

export interface EnsGameChapter {
  id: number
  title: string
  description: string
  story: string
  quests: EnsQuest[]
  unlockRequirement?: string
}

export const ensVisionCards: EnsVisionCard[] = [
  {
    id: 'apprentice-badge',
    name: 'Apprentice of the Oracle',
    description: 'Your first step into the realm of names',
    rarity: 'common',
    power: 10,
    ensRecord: 'apprentice=true'
  },
  {
    id: 'namebound-seer',
    name: 'Namebound Seer',
    description: 'You have mastered the art of reverse resolution',
    rarity: 'rare',
    power: 25,
    ensRecord: 'reverse_master=true'
  },
  {
    id: 'scroll-fragment',
    name: 'Scroll Fragment',
    description: 'A piece of the ancient prophecy scroll',
    rarity: 'rare',
    power: 30,
    ensRecord: 'prophecy_writer=true'
  },
  {
    id: 'oracle-mask',
    name: 'Oracle Mask',
    description: 'Your face is now known across all realms',
    rarity: 'epic',
    power: 50,
    ensRecord: 'avatar_set=true'
  },
  {
    id: 'guild-badge',
    name: 'Guild Badge',
    description: 'You belong to a fellowship of names',
    rarity: 'epic',
    power: 75,
    ensRecord: 'guild_member=true'
  },
  {
    id: 'prophecy-nft',
    name: 'Prophecy NFT',
    description: 'The rarest of all oracle visions',
    rarity: 'legendary',
    power: 100,
    ensRecord: 'oracle_master=true'
  }
]

export const ensGameChapters: EnsGameChapter[] = [
  {
    id: 1,
    title: "The Summoning of Names",
    description: "In the ancient realm of code and ether, names carry true power. The Oracle of Names guides you to discover your true identity.",
    story: "Welcome, Apprentice. In this realm, your name is your power. But first, you must claim your true name in the eternal registry of the blockchain. The Oracle awaits your first step into the world of ENS.",
    quests: [
      {
        id: 1,
        type: 'name-check',
        title: "Claim Thy Name",
        description: "The Oracle checks if you have claimed your true name in the ENS registry",
        ensTask: "Check if your address has an ENS name registered",
        expectedResult: "ENS name found or registration required",
        reward: ensVisionCards[0], // Apprentice badge
        energyCost: 5,
        difficulty: 'easy',
        timeLimit: 60
      }
    ]
  },
  {
    id: 2,
    title: "The Reverse Record Trial",
    description: "Speak your name backward, so all chains may know thee. Master the art of reverse resolution.",
    story: "Now that you have a name, you must learn to speak it in reverse. This ancient art allows all chains to know your true identity, even when only your address is visible.",
    quests: [
      {
        id: 2,
        type: 'reverse-record',
        title: "The Backward Name",
        description: "Set a reverse record so your address points to your ENS name",
        ensTask: "Configure reverse resolution for your ENS name",
        expectedResult: "Reverse record set successfully",
        reward: ensVisionCards[1], // Namebound Seer
        energyCost: 10,
        difficulty: 'medium',
        timeLimit: 120
      }
    ]
  },
  {
    id: 3,
    title: "The Prophecy Logbook",
    description: "Write thine deeds upon the scroll of your name. Inscribe your journey in the eternal records.",
    story: "Every great seer must keep a logbook of their deeds. Your ENS name can store these records for all eternity. Learn to inscribe your journey in the blockchain's memory.",
    quests: [
      {
        id: 3,
        type: 'text-record',
        title: "Inscribe the Scroll",
        description: "Set a text record on your ENS name to record your deeds",
        ensTask: "Add a text record to your ENS name (e.g., quest1=complete)",
        expectedResult: "Text record successfully added",
        reward: ensVisionCards[2], // Scroll Fragment
        energyCost: 15,
        difficulty: 'medium',
        timeLimit: 180
      }
    ]
  },
  {
    id: 4,
    title: "The Avatar Rite",
    description: "Let your face be seen, lest you walk nameless. Set your avatar in the realm of names.",
    story: "A true seer must have a face that others can recognize. Set your avatar in the ENS records so that your name carries not just power, but identity.",
    quests: [
      {
        id: 4,
        type: 'avatar',
        title: "The Face of Power",
        description: "Set an avatar record on your ENS name",
        ensTask: "Configure an avatar for your ENS name",
        expectedResult: "Avatar record set successfully",
        reward: ensVisionCards[3], // Oracle Mask
        energyCost: 20,
        difficulty: 'hard',
        timeLimit: 240
      }
    ]
  },
  {
    id: 5,
    title: "The Guild of Names",
    description: "Form a fellowship, bound by names. Create or join a guild through ENS subdomains.",
    story: "No seer walks alone. The greatest power comes from fellowship. Create or join a guild where names are bound together in subdomains, forming a network of power.",
    quests: [
      {
        id: 5,
        type: 'guild',
        title: "The Fellowship",
        description: "Create or join a guild through ENS subdomains",
        ensTask: "Set up or join a guild subdomain (e.g., alice.seerorder.eth)",
        expectedResult: "Guild membership established",
        reward: ensVisionCards[4], // Guild Badge
        energyCost: 25,
        difficulty: 'hard',
        timeLimit: 300
      }
    ]
  },
  {
    id: 6,
    title: "The Oracle Tournament",
    description: "Face the ultimate challenge. Answer the Oracle's riddles and prove your mastery.",
    story: "The final trial awaits. The Oracle poses riddles that must be answered through ENS records. Only the most skilled seers can unlock the final prophecy.",
    quests: [
      {
        id: 6,
        type: 'oracle-riddle',
        title: "The Final Riddle",
        description: "Answer the Oracle's riddle by setting the correct ENS record",
        ensTask: "The Sun rises thrice but never sets. Inscribe its name in your ENS oracle_riddle record.",
        expectedResult: "Correct riddle answer inscribed",
        reward: ensVisionCards[5], // Prophecy NFT
        energyCost: 30,
        difficulty: 'legendary',
        timeLimit: 600,
        multipleChoice: ['Ethereum', 'Bitcoin', 'Solana', 'Polygon']
      }
    ]
  }
]

export const ensGameIntro = {
  title: "The Oracle of Names",
  subtitle: "A Journey Through ENS",
  description: "In the ancient realm of code and ether, names carry true power. The Oracle of Names guides Apprentices to discover their true identity, inscribe prophecies in their Name Scrolls, and form Guilds of Names.",
  features: [
    "Claim your true name in the ENS registry",
    "Master reverse resolution and identity binding", 
    "Inscribe your deeds in eternal blockchain records",
    "Set your avatar and establish your digital identity",
    "Form guilds through ENS subdomains",
    "Face the Oracle's riddles in the ultimate tournament"
  ]
}
