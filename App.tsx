import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import DoctorReport from './components/DoctorReport';
import CognitiveTest from './components/CognitiveTest';
import SpeechRecording from './components/SpeechRecording';
import SleepLog from './components/SleepLog';
import Medication from './components/Medication';
import AiAssistant from './components/AiAssistant';
import MonthlyAssessment from './components/MonthlyAssessment';
import { AppScreen } from './types';
import { Trophy, Star } from 'lucide-react';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.DASHBOARD);
  
  // Gamification State
  const [score, setScore] = useState<number>(() => {
    const saved = localStorage.getItem('neurotrack_score');
    return saved ? parseInt(saved, 10) : 1250; // Default start score
  });

  const [showReward, setShowReward] = useState<{points: number, visible: boolean}>({ points: 0, visible: false });

  useEffect(() => {
    localStorage.setItem('neurotrack_score', score.toString());
  }, [score]);

  // Calculate Level based on score (Simple formula: every 500 points is a level)
  const currentLevel = Math.floor(score / 500) + 1;
  const nextLevelScore = currentLevel * 500;
  const progressToNext = ((score % 500) / 500) * 100;

  const handleAddPoints = (points: number) => {
    setScore(prev => prev + points);
    setShowReward({ points, visible: true });
    
    // Hide reward notification after 3 seconds
    setTimeout(() => {
      setShowReward(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case AppScreen.DASHBOARD:
        return (
          <Dashboard 
            onNavigate={setCurrentScreen} 
            score={score} 
            level={currentLevel} 
            progress={progressToNext} 
            nextLevelScore={nextLevelScore}
          />
        );
      case AppScreen.DATA_REPORT:
        return <DoctorReport />;
      case AppScreen.COGNITIVE:
        return <CognitiveTest onComplete={(pts) => handleAddPoints(pts)} onExit={() => setCurrentScreen(AppScreen.DASHBOARD)} />;
      case AppScreen.SPEECH:
        return <SpeechRecording onComplete={(pts) => handleAddPoints(pts)} onExit={() => setCurrentScreen(AppScreen.DASHBOARD)} />;
      case AppScreen.SLEEP:
        return <SleepLog onComplete={(pts) => handleAddPoints(pts)} onExit={() => setCurrentScreen(AppScreen.DASHBOARD)} />;
      case AppScreen.MEDICATION:
        return <Medication onComplete={(pts) => handleAddPoints(pts)} />;
      case AppScreen.AI_CHAT:
        return <AiAssistant />;
      case AppScreen.MONTHLY_ASSESSMENT:
        return <MonthlyAssessment onComplete={(pts) => handleAddPoints(pts)} onExit={() => setCurrentScreen(AppScreen.DASHBOARD)} />;
      default:
        return <Dashboard onNavigate={setCurrentScreen} score={score} level={currentLevel} progress={progressToNext} nextLevelScore={nextLevelScore} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans text-ink-main">
      <div className="w-full max-w-md h-[100dvh] md:h-[850px] bg-neuro-bg md:rounded-[3rem] md:shadow-2xl relative overflow-hidden flex flex-col border-gray-200 md:border-8">
        <main className="flex-1 overflow-y-auto no-scrollbar pb-20">
          {renderScreen()}
        </main>

        {/* Reward Toast Notification */}
        {showReward.visible && (
          <div className="fixed inset-0 flex items-center justify-center z-[100] pointer-events-none px-4">
            <div className="bg-white/95 backdrop-blur-sm border-2 border-pastel-yellow p-6 rounded-[2.5rem] shadow-2xl flex flex-col items-center animate-in zoom-in fade-in duration-300 transform scale-110">
              <div className="relative">
                <Star className="text-pastel-yellow fill-pastel-yellow w-20 h-20 animate-spin-slow" />
                <Trophy className="text-yellow-700 w-10 h-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <h2 className="text-2xl font-bold text-ink-main mt-2">任務完成！</h2>
              <p className="text-4xl font-bold text-ink-main mt-1">+{showReward.points} <span className="text-lg text-ink-sub">分</span></p>
            </div>
          </div>
        )}

        <Navigation currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      </div>
    </div>
  );
};

export default App;
