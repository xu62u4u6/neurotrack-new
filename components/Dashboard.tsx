import React, { useState, useEffect } from 'react';
import { ArrowUpRight, MoreHorizontal, Brain, Mic, Moon, Pill } from 'lucide-react';
import { AppScreen } from '../types';

interface DashboardProps {
  onNavigate: (screen: AppScreen) => void;
  score: number;
  level: number;
  progress: number;
  nextLevelScore: number;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, score, level, progress, nextLevelScore }) => {
  const [greeting, setGreeting] = useState('');
  const [activeMood, setActiveMood] = useState(0);
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('早安');
    else if (hour < 18) setGreeting('午安');
    else setGreeting('晚安');
  }, []);

  // 模擬全局狀態：完成任務可以增加進度
  // 在實際應用中，這應該來自 props 或全局狀態
  const completedTasks = Math.min(35, Math.floor((score / nextLevelScore) * 35));

  return (
    <div className="min-h-screen bg-neuro-bg p-4 md:p-8 font-sans text-ink-main pb-32">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 左上組件：心情與狀態問候 */}
        <GreetingCard greeting={greeting} activeMood={activeMood} setActiveMood={setActiveMood} />
        
        {/* 右上組件：泡泡進度圖 (遊戲化收集) */}
        <ProgressCard completedCount={completedTasks} />
        
        {/* 左下組件：每日任務卡片群 (點擊可增加進度) */}
        <TaskCards onNavigate={onNavigate} />
        
        {/* 右下組件：長期情緒/狀態追蹤膠囊圖 */}
        <StatusCapsuleChart />
        
      </div>
    </div>
  );
};

// 1. 問候與心情組件
const GreetingCard = ({ greeting, activeMood, setActiveMood }: { greeting: string, activeMood: number, setActiveMood: (i: number) => void }) => {
  const moods = [
    { emoji: '😄', label: '開心', color: 'bg-pastel-yellow' },
    { emoji: '😌', label: '平靜', color: 'bg-pastel-green' },
    { emoji: '🤔', label: '困惑', color: 'bg-pastel-peach' },
    { emoji: '🥱', label: '疲倦', color: 'bg-pastel-blue' },
    { emoji: '😶', label: '無感', color: 'bg-pastel-neutral' }
  ];

  return (
    <div className="col-span-1 p-6 md:p-8 rounded-[2rem] flex flex-col justify-center">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-ink-main text-white rounded-full flex items-center justify-center font-bold font-serif">N</div>
        <span className="font-semibold text-xl tracking-tight">NeuroTrack</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-semibold mb-2 leading-tight">
        {greeting}, <br />
        <span className="font-light">今天覺得<span className="font-bold">記憶力</span>如何？</span>
      </h1>
      <p className="text-sm text-ink-sub mt-6 mb-4 font-medium tracking-wide">每日心情日誌</p>
      <div className="flex gap-3">
        {moods.map((mood, index) => (
          <button
            key={index}
            onClick={() => setActiveMood(index)}
            className={`w-12 h-12 text-2xl rounded-full flex items-center justify-center transition-all duration-300 active-press ${
              activeMood === index 
                ? `${mood.color} shadow-md scale-110` 
                : 'bg-white/50 opacity-60 hover:opacity-100 hover:bg-white hover:scale-105'
            }`}
            title={mood.label}
          >
            {mood.emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

// 2. 泡泡進度組件 (取代傳統進度條)
const ProgressCard = ({ completedCount }: { completedCount: number }) => {
  const totalBubbles = 35; 
  const percentage = Math.round((completedCount / totalBubbles) * 100);

  return (
    <div className="bg-neuro-card p-6 md:p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] col-span-1 flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-ink-muted text-sm font-medium tracking-wide">本週進度</h3>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-6xl font-bold tracking-tighter">{percentage}%</p>
            <span className="text-sm text-ink-muted font-medium">完成度</span>
          </div>
        </div>
        <button className="text-ink-muted hover:text-ink-main transition-colors">
          <MoreHorizontal size={24} />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-2 md:gap-3 mt-auto max-w-full">
        {Array.from({ length: totalBubbles }).map((_, i) => (
          <div 
            key={i} 
            className={`aspect-square rounded-full transition-all duration-500 ${
              i < completedCount 
                ? 'bg-pastel-green scale-100' 
                : 'border-2 border-neuro-surface bg-transparent scale-90' 
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// 3. 任務卡片群組 (粉彩多色卡片)
const TaskCards = ({ onNavigate }: { onNavigate: (s: AppScreen) => void }) => {
  const tasks = [
    { id: 1, title: '認知\n小遊戲', bg: 'bg-pastel-blue', textColor: 'text-blue-900', iconBg: 'bg-blue-900/10', screen: AppScreen.COGNITIVE },
    { id: 2, title: '語音\n日記', bg: 'bg-pastel-yellow', textColor: 'text-yellow-900', iconBg: 'bg-yellow-900/10', screen: AppScreen.SPEECH },
    { id: 3, title: '用藥\n提醒', bg: 'bg-pastel-green', textColor: 'text-green-900', iconBg: 'bg-green-900/10', screen: AppScreen.MEDICATION },
    { id: 4, title: '睡眠\n紀錄', bg: 'bg-neuro-card shadow-[0_4px_20px_rgb(0,0,0,0.03)]', textColor: 'text-ink-main', iconBg: 'bg-neuro-surface', screen: AppScreen.SLEEP },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 col-span-1">
      {tasks.map((task) => (
        <div 
          key={task.id}
          onClick={() => onNavigate(task.screen)}
          className={`${task.bg} p-5 md:p-6 rounded-[2rem] flex flex-col justify-between aspect-square hover:-translate-y-1 hover:shadow-lg transition-all cursor-pointer group active-press`}
        >
          <h3 className={`text-lg md:text-xl font-medium ${task.textColor} whitespace-pre-line leading-tight`}>
            {task.title}
          </h3>
          <div className="flex justify-end">
            <span className={`w-8 h-8 rounded-full ${task.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <ArrowUpRight size={16} className={task.textColor} />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

// 4. 狀態膠囊圖組件 (長條圖的溫潤變體)
const StatusCapsuleChart = () => {
  const data = [
    { label: '日', value: 50, color: 'bg-pastel-yellow', category: '開心' },
    { label: '一', value: 72, color: 'bg-pastel-olive', category: '平靜' },
    { label: '二', value: 23, color: 'bg-pastel-peach', category: '困惑' },
    { label: '三', value: 77, color: 'bg-pastel-blue', category: '疲倦' },
    { label: '四', value: 69, color: 'bg-pastel-yellow', category: '開心' },
    { label: '五', value: 100, color: 'bg-pastel-olive', category: '平靜' },
    { label: '六', value: 85, color: 'bg-pastel-peach', category: '困惑' },
  ];

  return (
    <div className="bg-neuro-card p-6 md:p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] col-span-1 flex flex-col h-full min-h-[300px]">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-semibold text-lg text-ink-main">活躍滿意度</h3>
          <p className="text-xs text-ink-muted mt-1">基於每日測驗與語音分析</p>
        </div>
        <div className="flex gap-1 bg-neuro-surface p-1 rounded-full">
          <button className="text-xs bg-white text-ink-main px-3 py-1 rounded-full shadow-sm font-medium">週</button>
          <button className="text-xs text-ink-muted px-3 py-1 hover:text-ink-main transition-colors">月</button>
        </div>
      </div>
      
      <div className="flex justify-between items-end flex-grow mt-4 pb-2">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-3 w-full group relative cursor-pointer">
            <span className="absolute -top-6 text-xs font-bold text-ink-sub opacity-0 group-hover:opacity-100 transition-opacity">
              {item.value}%
            </span>
            
            <div className="w-8 md:w-10 h-32 md:h-40 bg-neuro-surface rounded-full flex flex-col justify-end overflow-hidden relative group-hover:bg-gray-100 transition-colors">
              <div 
                className={`w-full rounded-full ${item.color} transition-all duration-1000 ease-out absolute bottom-0 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]`}
                style={{ height: `${item.value}%` }}
              />
            </div>
            <span className="text-xs text-ink-muted font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
