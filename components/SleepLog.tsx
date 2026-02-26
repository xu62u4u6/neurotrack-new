import React, { useState } from 'react';
import { Moon, Sun, Save, Frown, Meh, Smile, Laugh, ArrowLeft } from 'lucide-react';
import { SleepInput, SleepOutput } from '../types';

interface SleepLogProps {
    onComplete?: (points: number) => void;
    onExit?: () => void;
}

const SleepLog: React.FC<SleepLogProps> = ({ onComplete, onExit }) => {
  const inputData: SleepInput = {
    default_sleep_time: '23:00',
    default_wake_time: '07:00',
  };

  const [sleepTime, setSleepTime] = useState(inputData.default_sleep_time);
  const [wakeTime, setWakeTime] = useState(inputData.default_wake_time);
  const [quality, setQuality] = useState<'poor' | 'fair' | 'good' | 'excellent'>('good');

  const calculateHours = () => {
    const start = new Date(`2000-01-01T${sleepTime}`);
    let end = new Date(`2000-01-01T${wakeTime}`);
    if (end <= start) {
      end = new Date(`2000-01-02T${wakeTime}`);
    }
    const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    return parseFloat(diff.toFixed(2));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const output: SleepOutput = {
      user_id: 'user_123',
      sleep_start: sleepTime,
      sleep_end: wakeTime,
      sleep_hours: calculateHours(),
      sleep_quality: quality,
      timestamp: new Date().toISOString().split('T')[0],
    };
    console.log('Output to backend:', output);
    
    // Award Points
    if (onComplete) {
        onComplete(10);
    }
  };

  const qualityOptions = [
    { value: 'poor', label: '差', Icon: Frown },
    { value: 'fair', label: '尚可', Icon: Meh },
    { value: 'good', label: '好', Icon: Smile },
    { value: 'excellent', label: '極佳', Icon: Laugh },
  ];

  return (
    <div className="p-6 min-h-screen pb-32 bg-neuro-bg">
      {/* 返回按鈕 */}
      {onExit && (
        <button onClick={onExit} aria-label="返回" className="p-2 -ml-2 mb-4 text-ink-muted hover:text-ink-main transition-colors">
          <ArrowLeft size={24} />
        </button>
      )}

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-ink-main">睡眠記錄</h1>
        <p className="text-ink-sub mt-1">昨晚睡得好嗎？</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Time Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-pastel-blue p-4 rounded-[2rem] shadow-sm">
            <div className="flex items-center space-x-2 mb-3 text-on-pastel-blue-icon">
              <Moon size={20} />
              <label htmlFor="sleep-time" className="text-sm font-semibold">就寢時間</label>
            </div>
            <input
              id="sleep-time"
              type="time"
              value={sleepTime}
              onChange={(e) => setSleepTime(e.target.value)}
              className="w-full text-2xl font-bold text-on-pastel-blue bg-white/50 rounded-xl p-2 border-none outline-none focus-visible:ring-2 focus-visible:ring-on-pastel-blue-icon"
            />
          </div>

          <div className="bg-pastel-yellow p-4 rounded-[2rem] shadow-sm">
            <div className="flex items-center space-x-2 mb-3 text-on-pastel-yellow-icon">
              <Sun size={20} />
              <label htmlFor="wake-time" className="text-sm font-semibold">起床時間</label>
            </div>
            <input
              id="wake-time"
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className="w-full text-2xl font-bold text-on-pastel-yellow bg-white/50 rounded-xl p-2 border-none outline-none focus-visible:ring-2 focus-visible:ring-on-pastel-yellow-icon"
            />
          </div>
        </div>

        {/* Calculated Duration */}
        <div className="text-center bg-neuro-card p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
            <span className="text-sm text-ink-muted font-medium">總時數</span>
            <div className="text-4xl font-bold text-ink-main mt-1 tabular-nums">{calculateHours()} <span className="text-lg font-normal text-ink-muted">小時</span></div>
        </div>

        {/* Quality Selector */}
        <div>
          <label className="block text-sm font-medium text-ink-sub mb-3">睡眠品質</label>
          <div className="grid grid-cols-4 gap-2">
            {qualityOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setQuality(opt.value as any)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all touch-manipulation active:scale-95 ${
                  quality === opt.value
                    ? 'border-pastel-olive bg-pastel-green text-green-900'
                    : 'border-neuro-surface bg-neuro-card text-ink-muted hover:border-neutral-300'
                }`}
              >
                <opt.Icon size={24} className={`mb-1 ${quality === opt.value ? 'text-on-pastel-green-icon' : 'text-neutral-500'}`} />
                <span className="text-xs font-semibold">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-interaction text-white rounded-2xl font-bold text-lg hover:bg-interaction-hover transition-colors flex items-center justify-center space-x-2 shadow-[0_8px_30px_rgb(0,0,0,0.1)] active:scale-[0.98]"
        >
          <Save size={20} />
          <span>儲存記錄 (+10分)</span>
        </button>
      </form>
    </div>
  );
};

export default SleepLog;