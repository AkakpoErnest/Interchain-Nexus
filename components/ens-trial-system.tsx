"use client";

import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  CheckCircle, 
  XCircle, 
  Loader2, 
  ExternalLink, 
  Eye, 
  Scroll, 
  Shield, 
  Users,
  Trophy,
  Star,
  Crown
} from 'lucide-react';

// ENS Registry and Resolver addresses on Sepolia
const ENS_REGISTRY = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';
const ENS_PUBLIC_RESOLVER = '0x8FADE66Ba79cD59e7Ad53F8e5c3b2F3b34b0192b';
const ENS_REVERSE_REGISTRAR = '0x72bb4EF80dc408668c573Ef71b87a2b7E4e74F25';

// ENS ABI fragments
const ENS_REGISTRY_ABI = [
  {
    "inputs": [{"name": "name", "type": "string"}],
    "name": "resolver",
    "outputs": [{"type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "name", "type": "string"}],
    "name": "owner",
    "outputs": [{"type": "address"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

const ENS_RESOLVER_ABI = [
  {
    "inputs": [{"name": "name", "type": "string"}, {"name": "key", "type": "string"}],
    "name": "text",
    "outputs": [{"type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "name", "type": "string"}],
    "name": "addr",
    "outputs": [{"type": "address"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

const ENS_REVERSE_REGISTRAR_ABI = [
  {
    "inputs": [{"name": "name", "type": "string"}],
    "name": "setName",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

interface ENSTrial {
  id: number;
  title: string;
  description: string;
  ensAction: string;
  reward: string;
  completed: boolean;
  validation: (data: any) => boolean;
}

interface ENSTrialSystemProps {
  onTrialComplete: (trialId: number) => void;
  onAllTrialsComplete: () => void;
}

export function ENSTrialSystem({ onTrialComplete, onAllTrialsComplete }: ENSTrialSystemProps) {
  const { address, isConnected } = useAccount();
  const [currentTrial, setCurrentTrial] = useState(0);
  const [trials, setTrials] = useState<ENSTrial[]>([]);
  const [userENSName, setUserENSName] = useState<string>('');
  const [textRecordValue, setTextRecordValue] = useState<string>('');
  const [avatarHash, setAvatarHash] = useState<string>('');
  const [guildName, setGuildName] = useState<string>('');
  const [riddleAnswer, setRiddleAnswer] = useState<string>('');

  // Initialize trials
  useEffect(() => {
    const initialTrials: ENSTrial[] = [
      {
        id: 1,
        title: "The Summoning",
        description: "Claim your ENS name to become a True-Named Apprentice",
        ensAction: "Register ENS name",
        reward: "Personal Name Scroll + Seer of Light Title",
        completed: false,
        validation: (data) => data.hasENSName
      },
      {
        id: 2,
        title: "The Mirror Rite",
        description: "Set a reverse record so your address points to your ENS name",
        ensAction: "Set reverse record",
        reward: "Name Echo NFT + True-Named Apprentice Title",
        completed: false,
        validation: (data) => data.hasReverseRecord
      },
      {
        id: 3,
        title: "The Prophecy Log",
        description: "Write your first prophecy into ENS text records",
        ensAction: "Set text record",
        reward: "Prophecy Fragment NFT + Lore Keeper Badge",
        completed: false,
        validation: (data) => data.hasTextRecord
      },
      {
        id: 4,
        title: "The Avatar Rite",
        description: "Set an avatar record to reveal your true visage",
        ensAction: "Set avatar record",
        reward: "The Masked Seer Badge + Avatar Fragment",
        completed: false,
        validation: (data) => data.hasAvatarRecord
      },
      {
        id: 5,
        title: "The Guild of Names",
        description: "Join a guild by registering a subname",
        ensAction: "Join guild subname",
        reward: "Guild Banner NFT + Guild Access",
        completed: false,
        validation: (data) => data.hasGuildMembership
      },
      {
        id: 6,
        title: "The Riddle of Records",
        description: "Answer Oracle riddles through ENS text records",
        ensAction: "Answer riddles via text records",
        reward: "Rare Prophecy NFT + Oracle's Blessing",
        completed: false,
        validation: (data) => data.hasRiddleAnswer
      },
      {
        id: 7,
        title: "The Tournament of Eternal Names",
        description: "Compete in the ultimate guild tournament",
        ensAction: "Tournament participation",
        reward: "Eternal Guild Seal NFT + Master of Names Title",
        completed: false,
        validation: (data) => data.hasTournamentParticipation
      }
    ];
    setTrials(initialTrials);
  }, []);

  // Check ENS name ownership
  const { data: ensOwner } = useReadContract({
    address: ENS_REGISTRY,
    abi: ENS_REGISTRY_ABI,
    functionName: 'owner',
    args: userENSName ? [`${userENSName}.eth`] : undefined,
    query: { enabled: !!userENSName && !!address }
  });

  // Check reverse record
  const { data: reverseRecord } = useReadContract({
    address: ENS_PUBLIC_RESOLVER,
    abi: ENS_RESOLVER_ABI,
    functionName: 'addr',
    args: address ? [`${address.slice(0, 2)}.${address.slice(2, 4)}.${address.slice(4, 6)}.${address.slice(6, 8)}.${address.slice(8, 10)}.${address.slice(10, 12)}.${address.slice(12, 14)}.${address.slice(14, 16)}.${address.slice(16, 18)}.${address.slice(18, 20)}.${address.slice(20, 22)}.${address.slice(22, 24)}.${address.slice(24, 26)}.${address.slice(26, 28)}.${address.slice(28, 30)}.${address.slice(30, 32)}.addr.reverse`] : undefined,
    query: { enabled: !!address }
  });

  // Check text record
  const { data: textRecord } = useReadContract({
    address: ENS_PUBLIC_RESOLVER,
    abi: ENS_RESOLVER_ABI,
    functionName: 'text',
    args: userENSName ? [`${userENSName}.eth`, 'quest1'] : undefined,
    query: { enabled: !!userENSName }
  });

  // Check avatar record
  const { data: avatarRecord } = useReadContract({
    address: ENS_PUBLIC_RESOLVER,
    abi: ENS_RESOLVER_ABI,
    functionName: 'text',
    args: userENSName ? [`${userENSName}.eth`, 'avatar'] : undefined,
    query: { enabled: !!userENSName }
  });

  // Write contract for reverse record
  const { writeContract: writeReverseRecord, hash: reverseHash } = useWriteContract();
  const { data: reverseReceipt } = useWaitForTransactionReceipt({ hash: reverseHash });

  // Validate trial completion
  const validateTrial = (trialId: number): boolean => {
    const trial = trials.find(t => t.id === trialId);
    if (!trial) return false;

    const validationData = {
      hasENSName: ensOwner === address,
      hasReverseRecord: reverseRecord === address,
      hasTextRecord: textRecord === 'complete',
      hasAvatarRecord: !!avatarRecord && avatarRecord !== '',
      hasGuildMembership: guildName !== '',
      hasRiddleAnswer: riddleAnswer === 'Ethereum',
      hasTournamentParticipation: false // This would be set by tournament completion
    };

    return trial.validation(validationData);
  };

  // Complete trial
  const completeTrial = (trialId: number) => {
    const updatedTrials = trials.map(trial => 
      trial.id === trialId ? { ...trial, completed: true } : trial
    );
    setTrials(updatedTrials);
    onTrialComplete(trialId);

    // Check if all trials are complete
    if (updatedTrials.every(trial => trial.completed)) {
      onAllTrialsComplete();
    }
  };

  // Handle reverse record setting
  const handleSetReverseRecord = async () => {
    if (!userENSName || !address) return;
    
    try {
      await writeReverseRecord({
        address: ENS_REVERSE_REGISTRAR,
        abi: ENS_REVERSE_REGISTRAR_ABI,
        functionName: 'setName',
        args: [`${userENSName}.eth`]
      });
    } catch (error) {
      console.error('Error setting reverse record:', error);
    }
  };

  const currentTrialData = trials[currentTrial];

  if (!isConnected) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6 text-center">
          <XCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
          <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
          <p className="text-gray-300 mb-6">
            To begin the trials of naming, you must first connect your wallet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Trial Progress */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-300">
            <Crown className="w-6 h-6 mr-2" />
            Trials of the Eternal Names
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">
                Progress: {trials.filter(t => t.completed).length} / {trials.length} trials completed
              </span>
              <Badge variant="outline" className="text-purple-300 border-purple-400">
                Trial {currentTrial + 1} of {trials.length}
              </Badge>
            </div>
            <Progress 
              value={(trials.filter(t => t.completed).length / trials.length) * 100} 
              className="h-3"
            />
          </div>
        </CardContent>
      </Card>

      {/* Current Trial */}
      {currentTrialData && (
        <Card className="bg-black/20 border-purple-500/30">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Eye className="w-6 h-6 mr-2" />
              {currentTrialData.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/20">
              <p className="text-purple-100">{currentTrialData.description}</p>
            </div>

            {/* Trial-specific UI */}
            {currentTrialData.id === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="ens-name">Your ENS Name</Label>
                  <Input
                    id="ens-name"
                    placeholder="Enter your ENS name (without .eth)"
                    value={userENSName}
                    onChange={(e) => setUserENSName(e.target.value)}
                  />
                </div>
                <Alert>
                  <ExternalLink className="h-4 w-4" />
                  <AlertDescription>
                    You need to register this name on ENS Manager first. Visit{' '}
                    <a 
                      href="https://app.ens.domains" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      app.ens.domains
                    </a>
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {currentTrialData.id === 2 && (
              <div className="space-y-4">
                <div>
                  <Label>Reverse Record Status</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    {reverseRecord === address ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                    <span className="text-sm">
                      {reverseRecord === address ? 'Reverse record is set' : 'Reverse record not set'}
                    </span>
                  </div>
                </div>
                <Button 
                  onClick={handleSetReverseRecord}
                  disabled={!userENSName || reverseRecord === address}
                  className="w-full"
                >
                  Set Reverse Record
                </Button>
              </div>
            )}

            {currentTrialData.id === 3 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="text-record">Prophecy Text</Label>
                  <Input
                    id="text-record"
                    placeholder="Enter 'complete' to finish this trial"
                    value={textRecordValue}
                    onChange={(e) => setTextRecordValue(e.target.value)}
                  />
                </div>
                <Alert>
                  <Scroll className="h-4 w-4" />
                  <AlertDescription>
                    Set this text record in your ENS name's resolver. The key should be 'quest1' and value should be 'complete'.
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {currentTrialData.id === 4 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="avatar-hash">Avatar Hash</Label>
                  <Input
                    id="avatar-hash"
                    placeholder="Enter IPFS hash or image URL"
                    value={avatarHash}
                    onChange={(e) => setAvatarHash(e.target.value)}
                  />
                </div>
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    Set an avatar record in your ENS name's resolver. The key should be 'avatar' and value should be your image hash or URL.
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {currentTrialData.id === 5 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="guild-name">Guild Name</Label>
                  <Input
                    id="guild-name"
                    placeholder="Enter guild subname (e.g., alice.guildofnames.eth)"
                    value={guildName}
                    onChange={(e) => setGuildName(e.target.value)}
                  />
                </div>
                <Alert>
                  <Users className="h-4 w-4" />
                  <AlertDescription>
                    Join a guild by registering a subname. You'll need the guild's main domain to be registered first.
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {currentTrialData.id === 6 && (
              <div className="space-y-4">
                <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/20">
                  <h4 className="font-semibold text-blue-300 mb-2">Oracle's Riddle:</h4>
                  <p className="text-blue-100">
                    "The Sun rises thrice but never sets. Write its name into your Ledger."
                  </p>
                </div>
                <div>
                  <Label htmlFor="riddle-answer">Your Answer</Label>
                  <Input
                    id="riddle-answer"
                    placeholder="Enter the answer to the riddle"
                    value={riddleAnswer}
                    onChange={(e) => setRiddleAnswer(e.target.value)}
                  />
                </div>
                <Alert>
                  <Star className="h-4 w-4" />
                  <AlertDescription>
                    Set a text record with key 'oracle_riddle' and your answer as the value.
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {currentTrialData.id === 7 && (
              <div className="space-y-4">
                <div className="bg-yellow-900/30 p-4 rounded-lg border border-yellow-500/20">
                  <h4 className="font-semibold text-yellow-300 mb-2">Tournament of Eternal Names</h4>
                  <p className="text-yellow-100">
                    The final trial approaches. Guilds will compete in time-limited challenges.
                    This feature will be available in the full game release.
                  </p>
                </div>
                <Alert>
                  <Trophy className="h-4 w-4" />
                  <AlertDescription>
                    Tournament participation will be tracked through special ENS records and guild coordination.
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {/* Trial Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {validateTrial(currentTrialData.id) ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-green-400">Trial Complete!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-400" />
                    <span className="text-red-400">Trial Incomplete</span>
                  </>
                )}
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentTrial(Math.max(0, currentTrial - 1))}
                  disabled={currentTrial === 0}
                >
                  Previous
                </Button>
                <Button
                  onClick={() => setCurrentTrial(Math.min(trials.length - 1, currentTrial + 1))}
                  disabled={currentTrial === trials.length - 1}
                >
                  Next
                </Button>
                {validateTrial(currentTrialData.id) && !currentTrialData.completed && (
                  <Button
                    onClick={() => completeTrial(currentTrialData.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Complete Trial
                  </Button>
                )}
              </div>
            </div>

            {/* Reward Preview */}
            <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/20">
              <h4 className="font-semibold text-green-300 mb-2 flex items-center">
                <Trophy className="w-4 h-4 mr-2" />
                Reward:
              </h4>
              <p className="text-green-100">{currentTrialData.reward}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trial Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {trials.map((trial, index) => (
          <Card
            key={trial.id}
            className={`cursor-pointer transition-all ${
              index === currentTrial
                ? 'bg-purple-600/30 border-purple-400'
                : trial.completed
                ? 'bg-green-600/20 border-green-400'
                : 'bg-gray-600/20 border-gray-400'
            }`}
            onClick={() => setCurrentTrial(index)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-white">
                  Trial {trial.id}
                </span>
                {trial.completed && (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                )}
              </div>
              <h4 className="text-sm font-semibold text-gray-200 mb-1">
                {trial.title}
              </h4>
              <p className="text-xs text-gray-400 line-clamp-2">
                {trial.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
