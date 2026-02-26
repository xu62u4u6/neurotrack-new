import React from 'react';
import { Check, Circle, CheckCircle2 } from 'lucide-react';

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
      <div className="bg-pastel-green p-6 rounded-[2.5rem] mb-4 shadow-sm relative overflow-hidden">
        <div className="absolute -right-4 -top-4 text-8xl opacity-20">☕</div>
        <div className="flex justify-between items-center mb-6 relative z-10">
          <h3 className="font-bold text-xl text-green-900">早餐後</h3>
          <span className="bg-white/50 text-green-900 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <Check size={14}/> 已完成
          </span>
        </div>
        <div className="space-y-3 relative z-10">
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

      {/* 待完成的用藥 (純白底色，黃色點綴) */}
      <div className="bg-white p-6 rounded-[2.5rem] mb-4 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-pastel-yellow/30">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">☀️</span>
            <h3 className="font-bold text-xl text-ink-main">午餐後</h3>
          </div>
        </div>
        <div className="space-y-3">
          <div 
            onClick={() => onComplete && onComplete(10)}
            className="flex items-center gap-3 bg-neuro-surface p-3 rounded-2xl cursor-pointer hover:bg-pastel-yellow/20 transition-colors active-press"
          >
            <Circle className="text-ink-muted" size={24} />
            <p className="font-medium text-ink-main">鈣片 <span className="text-xs text-ink-sub ml-1">500mg</span></p>
          </div>
        </div>
      </div>

      {/* 未來的用藥 (純白底色，藍色點綴，稍微透明) */}
      <div className="bg-white/60 p-6 rounded-[2.5rem] shadow-sm border border-neuro-surface">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌙</span>
          <h3 className="font-bold text-xl text-ink-muted">晚餐後</h3>
        </div>
      </div>
    </div>
  );
};

export default Medication;
