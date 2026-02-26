import React, { useState } from 'react';
import { Moon, Sun, Save } from 'lucide-react';
import { SleepInput, SleepOutput } from '../types';

interface SleepLogProps {
    onComplete?: (points: number) => void;
}

const SleepLog: React.FC<SleepLogProps> = ({ onComplete }) => {
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
    { value: 'poor', label: '差', emoji: '😫' },
    { value: 'fair', label: '尚可', emoji: '😐' },
    { value: 'good', label: '好', emoji: '🙂' },
    { value: 'excellent', label: '極佳', emoji: '😃' },
  ];

  return (
    <div className="p-6 max-w-lg mx-auto min-h-screen pb-24">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">睡眠記錄</h1>
        <p className="text-slate-500 mt-2">昨晚睡得好嗎？</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Time Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center space-x-2 mb-3 text-indigo-500">
              <Moon size={20} />
              <label className="text-sm font-semibold">就寢時間</label>
            </div>
            <input
              type="time"
              value={sleepTime}
              onChange={(e) => setSleepTime(e.target.value)}
              className="w-full text-2xl font-bold text-slate-800 bg-transparent border-b border-slate-200 focus:border-indigo-500 outline-none p-1"
            />
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center space-x-2 mb-3 text-amber-500">
              <Sun size={20} />
              <label className="text-sm font-semibold">起床時間</label>
            </div>
            <input
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className="w-full text-2xl font-bold text-slate-800 bg-transparent border-b border-slate-200 focus:border-amber-500 outline-none p-1"
            />
          </div>
        </div>

        {/* Calculated Duration */}
        <div className="text-center">
            <span className="text-sm text-slate-400 font-medium">總時數</span>
            <div className="text-4xl font-bold text-slate-800 mt-1">{calculateHours()} <span className="text-lg font-normal text-slate-400">小時</span></div>
        </div>

        {/* Quality Selector */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">睡眠品質</label>
          <div className="grid grid-cols-4 gap-2">
            {qualityOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setQuality(opt.value as any)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
                  quality === opt.value
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'
                }`}
              >
                <span className="text-2xl mb-1">{opt.emoji}</span>
                <span className="text-xs font-semibold">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-indigo-200"
        >
          <Save size={20} />
          <span>儲存記錄 (+10分)</span>
        </button>
      </form>
    </div>
  );
};

export default SleepLog;