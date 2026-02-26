import React from 'react';
import { Check, Circle, CheckCircle2, Coffee, Sun, Moon } from 'lucide-react';

interface MedicationProps {
  onComplete?: (points: number) => void;
}

const Medication: React.FC<MedicationProps> = ({ onComplete }) => {
  return (
    <div className="p-6 min-h-full bg-neuro-bg pb-32">
      <div className="mt-4 mb-8">
        <h1 className="text-3xl font-bold text-ink-main">用藥清單</h1>
        <p className="text-ink-sub mt-1">按時吃藥收集健康泡泡</p>
      </div>

      {/* 已完成的用藥 (粉彩綠) */}
      <div className="bg-pastel-green p-6 rounded-[2.5rem] mb-4 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Coffee size={24} className="text-green-700" />
            <h3 className="font-bold text-xl text-green-900">早餐後</h3>
          </div>
          <span className="bg-white/50 text-green-900 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <Check size={14}/> 已完成
          </span>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-white/40 p-3 rounded-2xl">
            <CheckCircle2 className="text-green-700" size={24} />
            <p className="font-medium text-green-900 line-through decoration-green-900/50">降血壓藥 (1顆)</p>
          </div>
          <div className="flex items-center gap-3 bg-white/40 p-3 rounded-2xl">
            <CheckCircle2 className="text-green-700" size={24} />
            <p className="font-medium text-green-900 line-through decoration-green-900/50">維他命 B (1顆)</p>
          </div>
        </div>
      </div>

      {/* 待完成的用藥 (粉彩黃) */}
      <div className="bg-pastel-yellow p-6 rounded-[2.5rem] mb-4 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Sun size={24} className="text-yellow-700" />
            <h3 className="font-bold text-xl text-yellow-900">午餐後</h3>
          </div>
        </div>
        <div className="space-y-3">
          <button
            onClick={() => onComplete && onComplete(10)}
            className="flex items-center gap-3 bg-white/40 p-3 rounded-2xl cursor-pointer hover:bg-white/60 transition-colors active-press w-full text-left touch-manipulation"
          >
            <Circle className="text-yellow-700" size={24} />
            <p className="font-medium text-yellow-900">鈣片 <span className="text-xs text-yellow-800/70 ml-1">500mg</span></p>
          </button>
        </div>
      </div>

      {/* 未來的用藥 (粉彩藍) */}
      <div className="bg-pastel-blue/50 p-6 rounded-[2.5rem] shadow-sm">
        <div className="flex items-center gap-2">
          <Moon size={24} className="text-blue-700/60" />
          <h3 className="font-bold text-xl text-blue-900/60">晚餐後</h3>
        </div>
      </div>
    </div>
  );
};

export default Medication;
