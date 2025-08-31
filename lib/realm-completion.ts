import { PioneerType } from './blockchain'

// Realm completion tracking interface
export interface RealmCompletion {
  realm: string
  pioneerType: PioneerType
  completed: boolean
  completedAt?: string
  score?: number
}

// Available realms and their unlock requirements
export interface RealmUnlockRequirement {
  realm: string
  pioneerType: PioneerType
  isLocked: boolean
  unlockRequirement: string
  requiredCompletedRealms: number
  requiredRealms?: string[] // Specific realms that must be completed
}

// Define realm unlock requirements
export const REALM_UNLOCK_REQUIREMENTS: RealmUnlockRequirement[] = [
  {
    realm: "Flare",
    pioneerType: PioneerType.ORACLE_SEER,
    isLocked: false,
    unlockRequirement: "Available from the start",
    requiredCompletedRealms: 0
  },
  {
    realm: "ENS", 
    pioneerType: PioneerType.IDENTITY_GUARDIAN,
    isLocked: false,
    unlockRequirement: "Available from the start",
    requiredCompletedRealms: 0
  },
  {
    realm: "Filecoin",
    pioneerType: PioneerType.DATA_WEAVER,
    isLocked: false,
    unlockRequirement: "Available from the start",
    requiredCompletedRealms: 0
  },
  {
    realm: "Lisk",
    pioneerType: PioneerType.SOCIAL_ARCHITECT,
    isLocked: true,
    unlockRequirement: "Complete 2 other realms to unlock",
    requiredCompletedRealms: 2,
    requiredRealms: ["Flare", "ENS", "Filecoin"] // Any 2 of these 3
  },
  {
    realm: "Governance",
    pioneerType: PioneerType.CONSENSUS_WEAVER,
    isLocked: true,
    unlockRequirement: "Complete 2 other realms to unlock",
    requiredCompletedRealms: 2,
    requiredRealms: ["Flare", "ENS", "Filecoin"] // Any 2 of these 3
  }
]

// Get realm completion status from localStorage
export function getRealmCompletionStatus(): RealmCompletion[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem('realm-completion-status')
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error loading realm completion status:', error)
    return []
  }
}

// Save realm completion status to localStorage
export function saveRealmCompletionStatus(completions: RealmCompletion[]): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem('realm-completion-status', JSON.stringify(completions))
  } catch (error) {
    console.error('Error saving realm completion status:', error)
  }
}

// Mark a realm as completed
export function markRealmCompleted(realm: string, pioneerType: PioneerType, score: number = 0): void {
  const completions = getRealmCompletionStatus()
  
  // Check if realm is already completed
  const existingIndex = completions.findIndex(c => c.realm === realm)
  
  if (existingIndex >= 0) {
    // Update existing completion
    completions[existingIndex] = {
      ...completions[existingIndex],
      completed: true,
      completedAt: new Date().toISOString(),
      score: Math.max(completions[existingIndex].score || 0, score)
    }
  } else {
    // Add new completion
    completions.push({
      realm,
      pioneerType,
      completed: true,
      completedAt: new Date().toISOString(),
      score
    })
  }
  
  saveRealmCompletionStatus(completions)
}

// Check if a realm is unlocked based on completion requirements
export function isRealmUnlocked(realm: string): boolean {
  const requirement = REALM_UNLOCK_REQUIREMENTS.find(r => r.realm === realm)
  if (!requirement) return false
  
  // If not locked, it's always unlocked
  if (!requirement.isLocked) return true
  
  const completions = getRealmCompletionStatus()
  const completedRealms = completions.filter(c => c.completed)
  
  // Check if enough realms are completed
  if (completedRealms.length < requirement.requiredCompletedRealms) {
    return false
  }
  
  // If specific realms are required, check if enough of them are completed
  if (requirement.requiredRealms) {
    const completedRequiredRealms = completedRealms.filter(c => 
      requirement.requiredRealms!.includes(c.realm)
    )
    return completedRequiredRealms.length >= requirement.requiredCompletedRealms
  }
  
  return true
}

// Get unlock progress for a locked realm
export function getRealmUnlockProgress(realm: string): {
  isUnlocked: boolean
  completedCount: number
  requiredCount: number
  completedRealms: string[]
  remainingRealms: string[]
} {
  const requirement = REALM_UNLOCK_REQUIREMENTS.find(r => r.realm === realm)
  if (!requirement) {
    return {
      isUnlocked: false,
      completedCount: 0,
      requiredCount: 0,
      completedRealms: [],
      remainingRealms: []
    }
  }
  
  const completions = getRealmCompletionStatus()
  const completedRealms = completions.filter(c => c.completed)
  
  if (requirement.requiredRealms) {
    const completedRequiredRealms = completedRealms.filter(c => 
      requirement.requiredRealms!.includes(c.realm)
    )
    const remainingRealms = requirement.requiredRealms.filter(r => 
      !completedRequiredRealms.some(c => c.realm === r)
    )
    
    return {
      isUnlocked: completedRequiredRealms.length >= requirement.requiredCompletedRealms,
      completedCount: completedRequiredRealms.length,
      requiredCount: requirement.requiredCompletedRealms,
      completedRealms: completedRequiredRealms.map(c => c.realm),
      remainingRealms
    }
  }
  
  return {
    isUnlocked: completedRealms.length >= requirement.requiredCompletedRealms,
    completedCount: completedRealms.length,
    requiredCount: requirement.requiredCompletedRealms,
    completedRealms: completedRealms.map(c => c.realm),
    remainingRealms: []
  }
}

// Get all realm unlock requirements with current status
export function getAllRealmUnlockRequirements(): (RealmUnlockRequirement & {
  isUnlocked: boolean
  unlockProgress: ReturnType<typeof getRealmUnlockProgress>
})[] {
  return REALM_UNLOCK_REQUIREMENTS.map(requirement => ({
    ...requirement,
    isUnlocked: isRealmUnlocked(requirement.realm),
    unlockProgress: getRealmUnlockProgress(requirement.realm)
  }))
}

// Get completion statistics
export function getCompletionStats(): {
  totalRealms: number
  completedRealms: number
  lockedRealms: number
  unlockedRealms: number
  completionPercentage: number
} {
  const completions = getRealmCompletionStatus()
  const completedRealms = completions.filter(c => c.completed).length
  const totalRealms = REALM_UNLOCK_REQUIREMENTS.length
  const lockedRealms = REALM_UNLOCK_REQUIREMENTS.filter(r => r.isLocked).length
  const unlockedRealms = totalRealms - lockedRealms
  
  return {
    totalRealms,
    completedRealms,
    lockedRealms,
    unlockedRealms,
    completionPercentage: Math.round((completedRealms / totalRealms) * 100)
  }
}
