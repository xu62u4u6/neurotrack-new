import React from 'react';
import { Home, Activity, Pill, MessageSquare } from 'lucide-react';
import { AppScreen } from '../types';

interface NavigationProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentScreen, onNavigate }) => {
  const navItems = [
    { id: AppScreen.DASHBOARD, icon: Home, label: '首頁' },
    { id: AppScreen.DATA_REPORT, icon: Activity, label: '數據' },
    { id: AppScreen.MEDICATION, icon: Pill, label: '用藥' },
    { id: AppScreen.AI_CHAT, icon: MessageSquare, label: '助理' },
  ];

  // Determine if we are on a main tab or a sub-page
  const mainTabs = [AppScreen.DASHBOARD, AppScreen.DATA_REPORT, AppScreen.MEDICATION, AppScreen.AI_CHAT];
  const isMainTab = mainTabs.includes(currentScreen);

  if (!isMainTab) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-white/80 backdrop-blur-xl border-t border-white px-6 py-4 pb-8 md:pb-6 flex justify-between items-center z-50 rounded-t-[2rem] shadow-lg">
      {navItems.map((item) => {
        const isActive = currentScreen === item.id;
        return (
          <button 
            key={item.id} 
            onClick={() => onNavigate(item.id)}
            className="flex flex-col items-center gap-1.5 w-16 relative active-press"
          >
            <div className={`transition-all duration-300 z-10 ${isActive ? 'text-ink-main -translate-y-2' : 'text-ink-muted'}`}>
              <item.icon size={24} />
            </div>
            {isActive && <div className="absolute top-1 w-10 h-10 bg-neuro-surface rounded-full -z-0"></div>}
            <span className={`text-[11px] font-bold transition-all duration-300 ${isActive ? 'text-ink-main opacity-100' : 'text-ink-muted opacity-0'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default Navigation;
