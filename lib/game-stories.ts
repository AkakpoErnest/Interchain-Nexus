// Game story system for Interchain Nexus
export interface GameChoice {
  id: string
  text: string
  outcome: 'success' | 'failure' | 'neutral'
  prediction?: string // Oracle Seer specific
  consequences: string[]
  nextSceneId?: string
}

export interface GameScene {
  id: string
  title: string
  description: string
  image: string
  choices: GameChoice[]
  isCombat?: boolean
  isQuiz?: boolean
  isDiscovery?: boolean
  requiredLevel?: number
  rewards?: {
    experience?: number
    items?: string[]
    currency?: number
  }
}

export interface GameStory {
  id: string
  pioneerType: string
  title: string
  description: string
  startingSceneId: string
  scenes: Record<string, GameScene>
  totalScenes: number
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary'
}

// Oracle Seer Story - "The Prophecy of the Fractured Cosmos"
export const oracleSeerStory: GameStory = {
  id: 'oracle-seer-prophecy',
  pioneerType: 'ORACLE_SEER',
  title: 'The Prophecy of the Fractured Cosmos',
  description: 'As an Oracle Seer, you must use your powers of prediction to navigate through the fractured realms and restore balance to the Interchain Nexus.',
  startingSceneId: 'cosmic-awakening',
  totalScenes: 8,
  difficulty: 'medium',
  scenes: {
    'cosmic-awakening': {
      id: 'cosmic-awakening',
      title: 'The Cosmic Awakening',
      description: 'You awaken in the ethereal realm of Flare, surrounded by streams of data and cosmic energy. Your Oracle Eye pulses with ancient power, showing you glimpses of the future. The Interchain Nexus is fractured, and only you can see the path to restoration.',
      image: '/mystical-oracle-eye-with-data-streams.png',
      choices: [
        {
          id: 'embrace-power',
          text: 'Embrace your Oracle powers and seek the first prophecy',
          outcome: 'success',
          prediction: 'The path ahead is clear - seek the Crystalline Shard in the Data Streams',
          consequences: ['You gain +2 Oracle Insight', 'The cosmic energy flows through you'],
          nextSceneId: 'data-streams'
        },
        {
          id: 'caution',
          text: 'Proceed with caution and study the cosmic patterns first',
          outcome: 'neutral',
          prediction: 'Patience will serve you well, but time is of the essence',
          consequences: ['You gain +1 Wisdom', 'The patterns become clearer'],
          nextSceneId: 'data-streams'
        },
        {
          id: 'reject-power',
          text: 'Reject the Oracle powers and try to find another way',
          outcome: 'failure',
          prediction: 'Without embracing your destiny, the path remains shrouded in darkness',
          consequences: ['You lose -1 Oracle Insight', 'The cosmic energy fades'],
          nextSceneId: 'cosmic-awakening' // Loop back
        }
      ]
    },
    'data-streams': {
      id: 'data-streams',
      title: 'The Flowing Data Streams',
      description: 'You find yourself in a realm where data flows like rivers of light. The Oracle Eye shows you multiple paths through the streams, each leading to different outcomes. You must choose wisely.',
      image: '/glowing-scroll-with-encrypted-symbols.png',
      choices: [
        {
          id: 'follow-brightest',
          text: 'Follow the brightest data stream',
          outcome: 'success',
          prediction: 'The brightest path leads to the Crystalline Shard, but danger awaits',
          consequences: ['You find the Crystalline Shard', 'A guardian awakens'],
          nextSceneId: 'shard-guardian'
        },
        {
          id: 'follow-patterns',
          text: 'Follow the patterns that match your Oracle vision',
          outcome: 'success',
          prediction: 'Your Oracle vision guides you to a hidden treasure',
          consequences: ['You gain +3 Oracle Insight', 'You find a hidden cache'],
          nextSceneId: 'hidden-cache'
        },
        {
          id: 'explore-all',
          text: 'Try to explore all streams simultaneously',
          outcome: 'failure',
          prediction: 'Spreading your focus too thin will lead to confusion',
          consequences: ['You become disoriented', 'You lose -2 Oracle Insight'],
          nextSceneId: 'data-streams' // Loop back
        }
      ]
    },
    'shard-guardian': {
      id: 'shard-guardian',
      title: 'The Crystalline Shard Guardian',
      description: 'Before you stands a magnificent crystalline shard, pulsing with cosmic energy. But it is guarded by a being of pure data - the Shard Guardian. Your Oracle Eye shows you its weaknesses, but also its strength.',
      image: '/crystalline-shard-with-cosmic-energy.png',
      isCombat: true,
      choices: [
        {
          id: 'oracle-strike',
          text: 'Use Oracle prediction to strike at the perfect moment',
          outcome: 'success',
          prediction: 'The guardian will move left in 3 seconds - strike then!',
          consequences: ['Critical hit!', 'Guardian is stunned', 'You gain the Crystalline Shard'],
          nextSceneId: 'shard-power'
        },
        {
          id: 'diplomatic',
          text: 'Try to communicate with the guardian',
          outcome: 'neutral',
          prediction: 'The guardian is ancient and wise - it may listen',
          consequences: ['Guardian becomes friendly', 'You learn about the Nexus history'],
          nextSceneId: 'guardian-wisdom'
        },
        {
          id: 'direct-attack',
          text: 'Attack the guardian directly',
          outcome: 'failure',
          prediction: 'Direct confrontation will lead to your defeat',
          consequences: ['You take heavy damage', 'Guardian becomes enraged'],
          nextSceneId: 'shard-guardian' // Loop back
        }
      ]
    },
    'shard-power': {
      id: 'shard-power',
      title: 'The Power of the Shard',
      description: 'With the Crystalline Shard in your possession, your Oracle powers have grown exponentially. You can now see further into the future and sense the fractures in the Interchain Nexus more clearly.',
      image: '/crystalline-shard-with-cosmic-energy.png',
      choices: [
        {
          id: 'seek-fractures',
          text: 'Use the shard to locate the main fractures in the Nexus',
          outcome: 'success',
          prediction: 'The main fracture is in the Governance Citadel - but it is heavily guarded',
          consequences: ['You locate the main fracture', 'You gain +5 Oracle Insight'],
          nextSceneId: 'governance-citadel'
        },
        {
          id: 'heal-minor',
          text: 'Start by healing minor fractures to build power',
          outcome: 'success',
          prediction: 'Healing minor fractures will make you stronger for the main challenge',
          consequences: ['You heal 3 minor fractures', 'You gain +3 Power'],
          nextSceneId: 'minor-fractures'
        },
        {
          id: 'study-shard',
          text: 'Study the shard to understand its full potential',
          outcome: 'neutral',
          prediction: 'Knowledge is power, but time is running out',
          consequences: ['You gain deep understanding', 'You learn advanced Oracle techniques'],
          nextSceneId: 'shard-power' // Stay to study more
        }
      ]
    },
    'governance-citadel': {
      id: 'governance-citadel',
      title: 'The Governance Citadel',
      description: 'You arrive at the towering Governance Citadel, where the main fracture in the Interchain Nexus lies. The citadel is protected by ancient governance protocols and powerful guardians. Your Oracle Eye shows you the path through, but it is perilous.',
      image: '/futuristic-citadel-with-governance-symbols.png',
      isCombat: true,
      choices: [
        {
          id: 'oracle-stealth',
          text: 'Use Oracle prediction to navigate the citadel undetected',
          outcome: 'success',
          prediction: 'The guards will patrol in a 5-minute cycle - move during the gap',
          consequences: ['You sneak past the guards', 'You reach the inner sanctum'],
          nextSceneId: 'inner-sanctum'
        },
        {
          id: 'challenge-protocols',
          text: 'Challenge the governance protocols directly',
          outcome: 'failure',
          prediction: 'The protocols are too powerful for direct confrontation',
          consequences: ['You are overwhelmed by the protocols', 'You take massive damage'],
          nextSceneId: 'governance-citadel' // Loop back
        },
        {
          id: 'seek-allies',
          text: 'Look for allies within the citadel',
          outcome: 'neutral',
          prediction: 'There may be others who oppose the current governance',
          consequences: ['You find potential allies', 'You learn about the citadel\'s history'],
          nextSceneId: 'citadel-allies'
        }
      ]
    },
    'inner-sanctum': {
      id: 'inner-sanctum',
      title: 'The Inner Sanctum',
      description: 'You have reached the inner sanctum of the Governance Citadel. Here lies the source of the fracture - a corrupted governance node that is causing the Interchain Nexus to fragment. Your Oracle Eye shows you the exact moment to strike.',
      image: '/futuristic-citadel-with-governance-symbols.png',
      isCombat: true,
      choices: [
        {
          id: 'oracle-strike-final',
          text: 'Use your ultimate Oracle power to strike at the perfect moment',
          outcome: 'success',
          prediction: 'The corruption will peak in 10 seconds - that is when to strike!',
          consequences: ['You destroy the corruption', 'The Nexus begins to heal', 'You gain +10 Oracle Insight'],
          nextSceneId: 'nexus-healing'
        },
        {
          id: 'purify-gradually',
          text: 'Try to purify the corruption gradually',
          outcome: 'neutral',
          prediction: 'Gradual purification is safer but takes longer',
          consequences: ['You begin the purification process', 'The corruption weakens'],
          nextSceneId: 'inner-sanctum' // Continue purification
        },
        {
          id: 'absorb-corruption',
          text: 'Try to absorb the corruption into yourself',
          outcome: 'failure',
          prediction: 'Absorbing the corruption will corrupt you instead',
          consequences: ['You become corrupted', 'You lose -5 Oracle Insight', 'You must start over'],
          nextSceneId: 'cosmic-awakening' // Start over
        }
      ]
    },
    'nexus-healing': {
      id: 'nexus-healing',
      title: 'The Nexus Heals',
      description: 'As the corruption is destroyed, the Interchain Nexus begins to heal. The fractured realms start to reconnect, and you can feel the cosmic energy flowing properly again. Your Oracle Eye shows you a vision of the restored Nexus.',
      image: '/mystical-oracle-eye-with-data-streams.png',
      choices: [
        {
          id: 'guide-healing',
          text: 'Use your Oracle powers to guide the healing process',
          outcome: 'success',
          prediction: 'Your guidance will ensure the Nexus heals completely and stronger than before',
          consequences: ['The Nexus heals perfectly', 'You become the Nexus Oracle', 'You gain +15 Oracle Insight'],
          nextSceneId: 'nexus-oracle'
        },
        {
          id: 'observe-healing',
          text: 'Observe the healing process and learn from it',
          outcome: 'neutral',
          prediction: 'Observation will teach you much about the Nexus',
          consequences: ['You gain deep knowledge', 'The Nexus heals naturally'],
          nextSceneId: 'nexus-oracle'
        },
        {
          id: 'interfere',
          text: 'Try to speed up the healing process',
          outcome: 'failure',
          prediction: 'Interfering with natural healing will cause new fractures',
          consequences: ['New fractures appear', 'You must heal them again'],
          nextSceneId: 'nexus-healing' // Loop back
        }
      ]
    },
    'nexus-oracle': {
      id: 'nexus-oracle',
      title: 'The Nexus Oracle',
      description: 'You have successfully restored the Interchain Nexus and become its Oracle. Your powers have grown beyond imagination, and you can now see across all realms and predict the future of the entire cosmos. You are the guardian of balance and truth.',
      image: '/mystical-oracle-eye-with-data-streams.png',
      choices: [
        {
          id: 'accept-destiny',
          text: 'Accept your role as the Nexus Oracle',
          outcome: 'success',
          prediction: 'As the Nexus Oracle, you will guide the cosmos toward harmony',
          consequences: ['You become the Nexus Oracle', 'You gain ultimate Oracle powers', 'You can now predict cosmic events'],
          nextSceneId: 'oracle-destiny'
        },
        {
          id: 'seek-higher-purpose',
          text: 'Seek an even higher purpose beyond the Nexus',
          outcome: 'success',
          prediction: 'There are greater mysteries beyond the Nexus waiting to be discovered',
          consequences: ['You transcend the Nexus', 'You gain cosmic awareness', 'New adventures await'],
          nextSceneId: 'cosmic-transcendence'
        },
        {
          id: 'return-to-mortal',
          text: 'Return to mortal form and live a normal life',
          outcome: 'neutral',
          prediction: 'You can return to mortality, but your Oracle powers will fade',
          consequences: ['You return to mortal form', 'You retain some Oracle abilities', 'You can start new adventures'],
          nextSceneId: 'mortal-return'
        }
      ]
    }
  }
}

// Identity Guardian Story - "The Realm of Names"
export const identityGuardianStory: GameStory = {
  id: 'identity-guardian-realm',
  pioneerType: 'IDENTITY_GUARDIAN',
  title: 'The Realm of Names',
  description: 'As an Identity Guardian, you must navigate the complex world of digital identities, protect the realm of names, and ensure the integrity of the ENS ecosystem.',
  startingSceneId: 'name-realm-awakening',
  totalScenes: 8,
  difficulty: 'medium',
  scenes: {
    'name-realm-awakening': {
      id: 'name-realm-awakening',
      title: 'The Name Realm Awakening',
      description: 'You awaken in the ethereal realm of ENS, where names hold power and identities flow like digital rivers. Your Guardian Shield pulses with ancient energy, showing you the fractured state of the Name Realm. The identity system is under attack, and only you can restore order.',
      image: '/glowing-scroll-with-encrypted-symbols.png',
      choices: [
        {
          id: 'embrace-guardian',
          text: 'Embrace your Guardian powers and seek the first identity',
          outcome: 'success',
          consequences: ['You gain +2 Guardian Insight', 'The name energy flows through you'],
          nextSceneId: 'domain-forest'
        },
        {
          id: 'study-patterns',
          text: 'Study the name patterns and identity flows first',
          outcome: 'neutral',
          consequences: ['You gain +1 Wisdom', 'The patterns become clearer'],
          nextSceneId: 'domain-forest'
        },
        {
          id: 'reject-guardian',
          text: 'Reject the Guardian powers and try to find another way',
          outcome: 'failure',
          consequences: ['You lose -1 Guardian Insight', 'The name energy fades'],
          nextSceneId: 'name-realm-awakening' // Loop back
        }
      ]
    },
    'domain-forest': {
      id: 'domain-forest',
      title: 'The Domain Forest',
      description: 'You find yourself in a mystical forest where domains grow like trees, each bearing unique names and identities. The Guardian Shield shows you multiple paths through the forest, each leading to different domain guardians. You must choose wisely.',
      image: '/futuristic-data-archivist-with-holographic-display.png',
      choices: [
        {
          id: 'follow-brightest-domain',
          text: 'Follow the path to the brightest domain tree',
          outcome: 'success',
          consequences: ['You find the Prime Domain', 'A domain guardian awakens'],
          nextSceneId: 'domain-guardian'
        },
        {
          id: 'follow-identity-patterns',
          text: 'Follow the patterns that match your Guardian vision',
          outcome: 'success',
          consequences: ['You gain +3 Guardian Insight', 'You find a hidden identity cache'],
          nextSceneId: 'identity-cache'
        },
        {
          id: 'explore-all-domains',
          text: 'Try to explore all domain trees simultaneously',
          outcome: 'failure',
          consequences: ['You become disoriented', 'You lose -2 Guardian Insight'],
          nextSceneId: 'domain-forest' // Loop back
        }
      ]
    },
    'domain-guardian': {
      id: 'domain-guardian',
      title: 'The Domain Guardian',
      description: 'Before you stands a magnificent domain tree, pulsing with identity energy. But it is guarded by a being of pure name essence - the Domain Guardian. Your Guardian Shield shows you its weaknesses, but also its strength.',
      image: '/towering-data-storage-facility-with-glowing-cores.png',
      isCombat: true,
      choices: [
        {
          id: 'guardian-strike',
          text: 'Use Guardian prediction to strike at the perfect moment',
          outcome: 'success',
          consequences: ['Critical hit!', 'Guardian is stunned', 'You gain the Prime Domain'],
          nextSceneId: 'domain-power'
        },
        {
          id: 'diplomatic-approach',
          text: 'Try to communicate with the guardian',
          outcome: 'neutral',
          consequences: ['Guardian becomes friendly', 'You learn about the Name Realm history'],
          nextSceneId: 'guardian-wisdom'
        },
        {
          id: 'direct-attack',
          text: 'Attack the guardian directly',
          outcome: 'failure',
          consequences: ['You take heavy damage', 'Guardian becomes enraged'],
          nextSceneId: 'domain-guardian' // Loop back
        }
      ]
    },
    'domain-power': {
      id: 'domain-power',
      title: 'The Power of the Domain',
      description: 'With the Prime Domain in your possession, your Guardian powers have grown exponentially. You can now see the identity flows more clearly and sense the fractures in the Name Realm more precisely.',
      image: '/towering-data-storage-facility-with-glowing-cores.png',
      choices: [
        {
          id: 'seek-identity-fractures',
          text: 'Use the domain to locate the main identity fractures',
          outcome: 'success',
          consequences: ['You locate the main fracture', 'You gain +5 Guardian Insight'],
          nextSceneId: 'identity-citadel'
        },
        {
          id: 'heal-minor-identities',
          text: 'Start by healing minor identity fractures',
          outcome: 'success',
          consequences: ['You heal 3 minor fractures', 'You gain +3 Power'],
          nextSceneId: 'minor-identities'
        },
        {
          id: 'study-domain',
          text: 'Study the domain to understand its full potential',
          outcome: 'neutral',
          consequences: ['You gain deep understanding', 'You learn advanced Guardian techniques'],
          nextSceneId: 'domain-power' // Stay to study more
        }
      ]
    },
    'identity-citadel': {
      id: 'identity-citadel',
      title: 'The Identity Citadel',
      description: 'You arrive at the towering Identity Citadel, where the main fracture in the Name Realm lies. The citadel is protected by ancient identity protocols and powerful name guardians. Your Guardian Shield shows you the path through, but it is perilous.',
      image: '/futuristic-citadel-with-governance-symbols.png',
      isCombat: true,
      choices: [
        {
          id: 'guardian-stealth',
          text: 'Use Guardian prediction to navigate the citadel undetected',
          outcome: 'success',
          consequences: ['You sneak past the guardians', 'You reach the inner sanctum'],
          nextSceneId: 'inner-sanctum'
        },
        {
          id: 'challenge-protocols',
          text: 'Challenge the identity protocols directly',
          outcome: 'failure',
          consequences: ['You are overwhelmed by the protocols', 'You take massive damage'],
          nextSceneId: 'identity-citadel' // Loop back
        },
        {
          id: 'seek-allies',
          text: 'Look for allies within the citadel',
          outcome: 'neutral',
          consequences: ['You find potential allies', 'You learn about the citadel\'s history'],
          nextSceneId: 'citadel-allies'
        }
      ]
    },
    'inner-sanctum': {
      id: 'inner-sanctum',
      title: 'The Inner Sanctum',
      description: 'You have reached the inner sanctum of the Identity Citadel. Here lies the source of the fracture - a corrupted identity node that is causing the Name Realm to fragment. Your Guardian Shield shows you the exact moment to strike.',
      image: '/futuristic-citadel-with-governance-symbols.png',
      isCombat: true,
      choices: [
        {
          id: 'guardian-strike-final',
          text: 'Use your ultimate Guardian power to strike at the perfect moment',
          outcome: 'success',
          consequences: ['You destroy the corruption', 'The Name Realm begins to heal', 'You gain +10 Guardian Insight'],
          nextSceneId: 'name-realm-healing'
        },
        {
          id: 'purify-gradually',
          text: 'Try to purify the corruption gradually',
          outcome: 'neutral',
          consequences: ['You begin the purification process', 'The corruption weakens'],
          nextSceneId: 'inner-sanctum' // Continue purification
        },
        {
          id: 'absorb-corruption',
          text: 'Try to absorb the corruption into yourself',
          outcome: 'failure',
          consequences: ['You become corrupted', 'You lose -5 Guardian Insight', 'You must start over'],
          nextSceneId: 'name-realm-awakening' // Start over
        }
      ]
    },
    'name-realm-healing': {
      id: 'name-realm-healing',
      title: 'The Name Realm Heals',
      description: 'As the corruption is destroyed, the Name Realm begins to heal. The fractured identities start to reconnect, and you can feel the name energy flowing properly again. Your Guardian Shield shows you a vision of the restored Name Realm.',
      image: '/glowing-scroll-with-encrypted-symbols.png',
      choices: [
        {
          id: 'guide-healing',
          text: 'Use your Guardian powers to guide the healing process',
          outcome: 'success',
          consequences: ['The Name Realm heals perfectly', 'You become the Name Realm Guardian', 'You gain +15 Guardian Insight'],
          nextSceneId: 'name-realm-guardian'
        },
        {
          id: 'observe-healing',
          text: 'Observe the healing process and learn from it',
          outcome: 'neutral',
          consequences: ['You gain deep knowledge', 'The Name Realm heals naturally'],
          nextSceneId: 'name-realm-guardian'
        },
        {
          id: 'interfere',
          text: 'Try to speed up the healing process',
          outcome: 'failure',
          consequences: ['New fractures appear', 'You must heal them again'],
          nextSceneId: 'name-realm-healing' // Loop back
        }
      ]
    },
    'name-realm-guardian': {
      id: 'name-realm-guardian',
      title: 'The Name Realm Guardian',
      description: 'You have successfully restored the Name Realm and become its Guardian. Your powers have grown beyond imagination, and you can now protect identities across all realms and ensure the integrity of the naming system. You are the guardian of names and identities.',
      image: '/glowing-scroll-with-encrypted-symbols.png',
      choices: [
        {
          id: 'accept-destiny',
          text: 'Accept your role as the Name Realm Guardian',
          outcome: 'success',
          consequences: ['You become the Name Realm Guardian', 'You gain ultimate Guardian powers', 'You can now protect all identities'],
          nextSceneId: 'guardian-destiny'
        },
        {
          id: 'seek-higher-purpose',
          text: 'Seek an even higher purpose beyond the Name Realm',
          outcome: 'success',
          consequences: ['You transcend the Name Realm', 'You gain cosmic identity awareness', 'New adventures await'],
          nextSceneId: 'cosmic-identity-transcendence'
        },
        {
          id: 'return-to-mortal',
          text: 'Return to mortal form and live a normal life',
          outcome: 'neutral',
          consequences: ['You return to mortal form', 'You retain some Guardian abilities', 'You can start new adventures'],
          nextSceneId: 'mortal-return'
        }
      ]
    }
  }
}

// Export all stories
export const gameStories: Record<string, GameStory> = {
  'oracle-seer-prophecy': oracleSeerStory,
  'identity-guardian-realm': identityGuardianStory
}

// Helper functions
export function getStoryByPioneerType(pioneerType: string): GameStory | null {
  const story = Object.values(gameStories).find(story => 
    story.pioneerType === pioneerType
  )
  return story || null
}

export function getSceneById(storyId: string, sceneId: string): GameScene | null {
  const story = gameStories[storyId]
  if (!story) return null
  return story.scenes[sceneId] || null
}

export function getChoiceById(storyId: string, sceneId: string, choiceId: string): GameChoice | null {
  const scene = getSceneById(storyId, sceneId)
  if (!scene) return null
  return scene.choices.find(choice => choice.id === choiceId) || null
}

