import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Sun, CalendarCheck, Check } from 'lucide-react';
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

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('早安');
    else if (hour < 18) setGreeting('午安');
    else setGreeting('晚安');
  }, []);

  // 模擬今日任務完成狀態
  const completedCount = Math.min(4, Math.floor(score / 300));

  const tasks = [
    { id: 'cognitive', title: '認知\n小遊戲', bg: 'bg-pastel-blue', text: 'text-blue-900', iconBg: 'bg-blue-900/10', screen: AppScreen.COGNITIVE },
    { id: 'voice', title: '語音\n日記', bg: 'bg-pastel-yellow', text: 'text-yellow-900', iconBg: 'bg-yellow-900/10', screen: AppScreen.SPEECH },
    { id: 'sleep', title: '睡眠\n紀錄', bg: 'bg-pastel-green', text: 'text-green-900', iconBg: 'bg-green-900/10', screen: AppScreen.SLEEP },
    { id: 'meds', title: '用藥\n提醒', bg: 'bg-neuro-card shadow-[0_4px_20px_rgb(0,0,0,0.03)]', text: 'text-ink-main', iconBg: 'bg-neuro-surface', screen: AppScreen.MEDICATION },
  ];

  // 簡單判斷任務是否完成
  const isTaskDone = (index: number) => index < completedCount;

  return (
    <div className="p-6 min-h-full pb-8 bg-neuro-bg">
      {/* 頂部問候 */}
      <div className="mt-4 mb-6">
        <h1 className="text-4xl font-semibold mb-2 leading-tight text-ink-main">
          {greeting}, <br />
          <span className="font-light">今天覺得<span className="font-bold">精神</span>如何？</span>
        </h1>
      </div>

      {/* 今日進度卡片 */}
      <div className="bg-neuro-card p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] mb-4 flex justify-between items-center">
        <div>
          <h3 className="text-ink-muted font-medium tracking-wide mb-1 text-sm">今日待辦進度</h3>
          <p className="text-xl font-bold text-ink-main">
            已完成 <span className="text-[#E39882] text-4xl mx-1">{completedCount}</span> / 4 任務
          </p>
        </div>
        <div className="w-14 h-14 bg-pastel-yellow/30 rounded-full flex items-center justify-center flex-shrink-0">
          <Sun className="text-yellow-600" size={32} />
        </div>
      </div>

      {/* 本月總結卡片 */}
      <button
        onClick={() => onNavigate(AppScreen.MONTHLY_ASSESSMENT)}
        className="bg-neuro-card p-5 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] mb-6 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform group w-full text-left touch-manipulation"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-pastel-green rounded-full flex items-center justify-center text-green-800">
            <CalendarCheck size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-ink-main text-lg">本月總結</h3>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            </div>
            <p className="text-xs text-ink-muted font-medium mt-0.5">狀態極佳，點此評估</p>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-neuro-surface flex items-center justify-center group-hover:bg-gray-200 transition-colors">
          <ArrowUpRight size={20} className="text-ink-muted" />
        </div>
      </button>

      {/* 任務標題 */}
      <h3 className="text-lg font-bold text-ink-main mb-4 ml-2">今日任務清單</h3>

      {/* 任務卡片 2x2 */}
      <div className="grid grid-cols-2 gap-4">
        {tasks.map((task, index) => {
          const isDone = isTaskDone(index);
          return (
            <button
              key={task.id}
              onClick={() => onNavigate(task.screen)}
              className={`${isDone ? 'bg-gray-100 opacity-60' : task.bg} p-5 rounded-[2rem] flex flex-col justify-between aspect-square active:scale-95 transition-transform cursor-pointer relative overflow-hidden text-left touch-manipulation`}
            >
              <h3 className={`text-xl font-medium ${isDone ? 'text-gray-500' : task.text} whitespace-pre-line leading-tight`}>
                {task.title}
              </h3>
              <div className="flex justify-end">
                <span className={`w-10 h-10 rounded-full ${isDone ? 'bg-gray-200' : task.iconBg} flex items-center justify-center`}>
                  {isDone ? (
                    <Check size={20} className="text-gray-500" />
                  ) : (
                    <ArrowUpRight size={20} className={task.text} />
                  )}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
