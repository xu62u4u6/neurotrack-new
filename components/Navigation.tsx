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
    <div className="absolute bottom-0 w-full bg-white/90 backdrop-blur-xl border-t border-white px-2 py-4 pb-[max(2rem,env(safe-area-inset-bottom))] md:pb-6 flex justify-around items-center z-50 rounded-t-[2rem]">
      {navItems.map((item) => {
        const isActive = currentScreen === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            aria-label={item.label}
            className="flex flex-col items-center gap-1.5 w-14 relative active-press"
          >
            {/* 背景圓形 - 放最底層 */}
            {isActive && <div className="absolute top-0.5 w-10 h-10 bg-gray-100 rounded-full"></div>}

            {/* 圖示 */}
            <div className={`relative z-10 transition-all duration-300 ${isActive ? 'text-gray-800 -translate-y-2' : 'text-gray-400'}`}>
              <item.icon size={24} />
            </div>

            {/* 文字標籤 */}
            <span className={`relative z-10 text-[10px] font-bold transition-all duration-300 ${isActive ? 'text-gray-800 opacity-100' : 'text-gray-400 opacity-0'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default Navigation;
