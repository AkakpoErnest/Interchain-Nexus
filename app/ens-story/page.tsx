"use client";

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowRight, ArrowLeft, Crown, Scroll, Shield, Users, Eye, Trophy, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { ENSTrialSystem } from '@/components/ens-trial-system';

interface StoryChapter {
  id: number;
  title: string;
  oracleMessage: string;
  task: string;
  reward: string;
  image: string;
  completed: boolean;
  ensAction?: string;
}

const ENS_STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 1,
    title: "The Summoning",
    oracleMessage: "In the fractured realms of the blockchain multiverse, an ancient Seer emerges — one who can pierce into hidden knowledge across all chains. Known only as the Oracle of Names, this Seer channels the power of digital identity, gathering real-world data to guide players. But the Seer's visions are scattered in shards across the network, and only those brave enough to follow his riddles can restore the truth. You, the Apprentice, must claim your Eternal Name to begin this mystical journey.",
    task: "The Oracle will automatically check if you have an ENS name. If not, you will be guided to claim one.",
    reward: "Personal Name Scroll (game journal) + Title: Seer of Light",
    image: "/_ (6).jpeg",
    completed: false,
    ensAction: "Automatic ENS name verification"
  },
  {
    id: 2,
    title: "The Mirror Rite",
    oracleMessage: "The Oracle's voice echoes through the cosmic realm: 'Names must echo back, else they are but whispers in the void. Your identity must be bound to your address, so all chains may know thee by your true name.' The Oracle begins the ancient ritual, channeling ethereal energy to bind your name to your address.",
    task: "The Oracle will automatically set your reverse record, binding your identity across all chains.",
    reward: "Title upgrade: True-Named Apprentice + Name Echo NFT",
    image: "/_ (5).jpeg",
    completed: false,
    ensAction: "Automatic reverse record setting"
  },
  {
    id: 3,
    title: "The Prophecy Log",
    oracleMessage: "The Oracle's eyes glow with cosmic energy as he speaks: 'Inscribe thine deeds upon the scroll of thy Name. Your first prophecy shall be written into the Name Ledger for all eternity.' The Oracle's staff glows brighter as he begins to inscribe your first prophecy into the blockchain.",
    task: "The Oracle will automatically write your first prophecy into ENS text records.",
    reward: "Prophecy Fragment NFT + Lore Keeper Badge",
    image: "/_ (6).jpeg",
    completed: false,
    ensAction: "Automatic text record creation"
  },
  {
    id: 4,
    title: "The Avatar Rite",
    oracleMessage: "The Oracle raises his staff, and the cosmic realm begins to shift: 'Without a face, you are forgotten in the void. Let your true visage be seen in the cosmic realm of names.' A mystical portal opens, revealing your digital avatar that will be bound to your name forever.",
    task: "The Oracle will automatically set your avatar record, revealing your true form.",
    reward: "Cosmetic Badge: The Masked Seer + Avatar Fragment",
    image: "/_ (5).jpeg",
    completed: false,
    ensAction: "Automatic avatar record setting"
  },
  {
    id: 5,
    title: "The Guild of Names",
    oracleMessage: "The Oracle's voice booms across the realm: 'No prophet walks alone in the cosmic void. Join a fellowship bound by names and forge your destiny together.' The Oracle begins to weave the threads of connection, creating a guild where names are bound in eternal fellowship.",
    task: "The Oracle will automatically create a guild subname for you, binding you to the fellowship.",
    reward: "Guild Banner NFT + Access to guild-only quests",
    image: "/_ (6).jpeg",
    completed: false,
    ensAction: "Automatic guild subname creation"
  },
  {
    id: 6,
    title: "The Riddle of Records",
    oracleMessage: "The Oracle's eyes blaze with ancient wisdom: 'The Sun rises thrice but never sets. Inscribe its name into your Ledger, Apprentice.' The Oracle poses his first riddle, and the cosmic energy swirls around you as the answer must be written into the Name Ledger.",
    task: "The Oracle will automatically answer the riddle and write it into your ENS records.",
    reward: "Rare Prophecy NFT + Oracle's Blessing",
    image: "/_ (5).jpeg",
    completed: false,
    ensAction: "Automatic riddle answer inscription"
  },
  {
    id: 7,
    title: "The Tournament of Eternal Names",
    oracleMessage: "The Oracle's voice echoes with final authority: 'The final trial approaches, Apprentice. You have proven yourself worthy of the ancient knowledge. The Tournament of Eternal Names begins, and you shall compete with other guilds in the ultimate test of naming wisdom.' The cosmic realm shifts as the final trial commences.",
    task: "The Oracle will automatically complete the tournament and claim your eternal reward.",
    reward: "Eternal Guild Seal NFT + Master of Names Title",
    image: "/_ (6).jpeg",
    completed: false,
    ensAction: "Automatic tournament completion"
  }
];

export default function ENSStoryPage() {
  const { address } = useAccount();
  const [currentChapter, setCurrentChapter] = useState(0);
  const [storyProgress, setStoryProgress] = useState(0);
  const [showOracle, setShowOracle] = useState(true);
  const [showTrials, setShowTrials] = useState(false);
  const [playerName, setPlayerName] = useState<string>('');
  const [guildName, setGuildName] = useState<string>('');
  const [oracleAction, setOracleAction] = useState<string>('');
  const [isOracleActing, setIsOracleActing] = useState(false);

  useEffect(() => {
    // Load story progress from localStorage
    const savedProgress = localStorage.getItem('ens-story-progress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCurrentChapter(progress.currentChapter || 0);
      setStoryProgress(progress.storyProgress || 0);
      setPlayerName(progress.playerName || '');
      setGuildName(progress.guildName || '');
    }
  }, []);

  const saveProgress = (chapter: number, progress: number) => {
    const progressData = {
      currentChapter: chapter,
      storyProgress: progress,
      playerName,
      guildName
    };
    localStorage.setItem('ens-story-progress', JSON.stringify(progressData));
  };

  const goToNextChapter = () => {
    if (currentChapter < ENS_STORY_CHAPTERS.length - 1) {
      const newChapter = currentChapter + 1;
      const newProgress = ((newChapter + 1) / ENS_STORY_CHAPTERS.length) * 100;
      setCurrentChapter(newChapter);
      setStoryProgress(newProgress);
      saveProgress(newChapter, newProgress);
      setShowOracle(true);
    } else {
      // Story complete - redirect to game
      localStorage.setItem('ens-story-complete', 'true');
      window.location.href = '/play';
    }
  };

  const goToPreviousChapter = () => {
    if (currentChapter > 0) {
      const newChapter = currentChapter - 1;
      const newProgress = ((newChapter + 1) / ENS_STORY_CHAPTERS.length) * 100;
      setCurrentChapter(newChapter);
      setStoryProgress(newProgress);
      saveProgress(newChapter, newProgress);
      setShowOracle(true);
    }
  };

  const completeChapter = async () => {
    // Mark chapter as completed
    const updatedChapters = [...ENS_STORY_CHAPTERS];
    updatedChapters[currentChapter].completed = true;
    
    // Save completion
    const completedChapters = localStorage.getItem('ens-completed-chapters') || '[]';
    const completed = JSON.parse(completedChapters);
    if (!completed.includes(currentChapter)) {
      completed.push(currentChapter);
      localStorage.setItem('ens-completed-chapters', JSON.stringify(completed));
    }
    
    // Simulate Oracle performing blockchain actions
    await simulateOracleAction(currentChapter);
    
    // If this is the first chapter, show trials
    if (currentChapter === 0) {
      setShowTrials(true);
      setShowOracle(false);
    } else {
      goToNextChapter();
    }
  };

  const simulateOracleAction = async (chapterIndex: number) => {
    const chapter = ENS_STORY_CHAPTERS[chapterIndex];
    
    setIsOracleActing(true);
    setOracleAction(chapter.ensAction || '');
    
    // Simulate Oracle performing the action with visual feedback
    console.log(`Oracle performing: ${chapter.ensAction}`);
    
    // Add a delay to simulate the Oracle's mystical process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Simulate successful completion
    console.log(`Oracle completed: ${chapter.ensAction}`);
    
    // Store the Oracle's actions in localStorage for the game
    const oracleActions = JSON.parse(localStorage.getItem('oracle-actions') || '[]');
    oracleActions.push({
      chapter: chapterIndex + 1,
      action: chapter.ensAction,
      completedAt: new Date().toISOString(),
      reward: chapter.reward
    });
    localStorage.setItem('oracle-actions', JSON.stringify(oracleActions));
    
    setIsOracleActing(false);
    setOracleAction('');
  };

  const handleTrialComplete = (trialId: number) => {
    console.log(`Trial ${trialId} completed!`);
    // You can add specific logic for each trial completion here
  };

  const handleAllTrialsComplete = () => {
    console.log('All trials completed!');
    // Mark story as complete and redirect to game
    localStorage.setItem('ens-story-complete', 'true');
    window.location.href = '/play';
  };

  const currentChapterData = ENS_STORY_CHAPTERS[currentChapter];

  if (!address) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Shield className="w-16 h-16 mx-auto mb-4 text-purple-400" />
            <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
            <p className="text-gray-300 mb-6">
              To begin your journey as an ENS Identity Guardian, you must first connect your wallet.
            </p>
            <Button onClick={() => window.location.href = '/choose'} className="w-full">
              Return to Pioneer Selection
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show trials if they should be displayed
  if (showTrials) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                🎮 The Oracle of the Eternal Names
              </h1>
              <p className="text-purple-200">
                Complete the seven trials to restore the Name Ledger
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setShowTrials(false);
                setShowOracle(true);
              }}
              className="border-purple-400 text-purple-300 hover:bg-purple-900/30"
            >
              Return to Story
            </Button>
          </div>
          <ENSTrialSystem
            onTrialComplete={handleTrialComplete}
            onAllTrialsComplete={handleAllTrialsComplete}
          />
        </div>
      </div>
    );
  }

  // Oracle Action Overlay
  if (isOracleActing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto p-6">
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse flex items-center justify-center">
              <Eye className="w-16 h-16 text-white animate-spin" />
            </div>
            <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full border-4 border-purple-300 animate-ping opacity-20"></div>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-6">
            The Oracle is Acting
          </h1>
          
          <div className="bg-black/20 p-6 rounded-lg border border-purple-500/30 mb-6">
            <p className="text-purple-200 text-lg mb-4">
              The Oracle channels cosmic energy to perform:
            </p>
            <p className="text-white text-xl font-semibold">
              {oracleAction}
            </p>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-purple-300">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Channeling blockchain energy...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              🎮 The Oracle of the Eternal Names
            </h1>
            <p className="text-purple-200">
              Journey through the seven trials of naming to restore the Name Ledger
            </p>
          </div>
          <div className="text-right">
            <Badge variant="outline" className="text-purple-300 border-purple-400">
              Chapter {currentChapter + 1} of {ENS_STORY_CHAPTERS.length}
            </Badge>
            <div className="mt-2">
              <Progress value={storyProgress} className="w-32 h-2" />
            </div>
          </div>
        </div>

        {/* Story Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Oracle Message */}
          <Card className="bg-black/20 border-purple-500/30">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-300">
                <Eye className="w-6 h-6 mr-2" />
                The Oracle Speaks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/20">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {currentChapterData.title}
                  </h3>
                  <p className="text-purple-100 leading-relaxed">
                    {currentChapterData.oracleMessage}
                  </p>
                </div>
                
                <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/20">
                  <h4 className="font-semibold text-blue-300 mb-2">Your Quest:</h4>
                  <p className="text-blue-100">{currentChapterData.task}</p>
                </div>

                <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/20">
                  <h4 className="font-semibold text-green-300 mb-2 flex items-center">
                    <Trophy className="w-4 h-4 mr-2" />
                    Reward:
                  </h4>
                  <p className="text-green-100">{currentChapterData.reward}</p>
                </div>

                {currentChapterData.ensAction && (
                  <Alert>
                    <Scroll className="h-4 w-4" />
                    <AlertDescription>
                      <strong>ENS Action Required:</strong> {currentChapterData.ensAction}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Mystical Image */}
          <Card className="bg-black/20 border-purple-500/30">
            <CardContent className="p-0">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src={currentChapterData.image}
                  alt={`Chapter ${currentChapter + 1}: ${currentChapterData.title}`}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge variant="secondary" className="bg-purple-600/80 text-white">
                    {currentChapterData.title}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={goToPreviousChapter}
            disabled={currentChapter === 0}
            className="border-purple-400 text-purple-300 hover:bg-purple-900/30"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous Chapter
          </Button>

          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={() => window.location.href = '/choose'}
              className="border-gray-400 text-gray-300 hover:bg-gray-900/30"
            >
              Return to Selection
            </Button>
            
            <Button
              onClick={completeChapter}
              disabled={isOracleActing}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50"
            >
              {isOracleActing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Oracle Acting...
                </>
              ) : (
                <>
                  Complete Chapter
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Chapter Progress */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-white mb-4">Your Journey Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ENS_STORY_CHAPTERS.map((chapter, index) => (
              <Card
                key={chapter.id}
                className={`cursor-pointer transition-all ${
                  index === currentChapter
                    ? 'bg-purple-600/30 border-purple-400'
                    : index < currentChapter
                    ? 'bg-green-600/20 border-green-400'
                    : 'bg-gray-600/20 border-gray-400'
                }`}
                onClick={() => {
                  setCurrentChapter(index);
                  setStoryProgress(((index + 1) / ENS_STORY_CHAPTERS.length) * 100);
                  saveProgress(index, ((index + 1) / ENS_STORY_CHAPTERS.length) * 100);
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">
                      Chapter {chapter.id}
                    </span>
                    {index < currentChapter && (
                      <Crown className="w-4 h-4 text-yellow-400" />
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-gray-200 mb-1">
                    {chapter.title}
                  </h4>
                  <p className="text-xs text-gray-400 line-clamp-2">
                    {chapter.task}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
