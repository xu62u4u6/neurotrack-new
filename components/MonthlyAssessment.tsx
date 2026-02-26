import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Brain, ArrowRight, X } from 'lucide-react';

interface MonthlyAssessmentProps {
  onComplete: (points: number) => void;
  onExit: () => void;
}

const MonthlyAssessment: React.FC<MonthlyAssessmentProps> = ({ onComplete, onExit }) => {
  const [step, setStep] = useState(0);
  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(prev => prev + 1);
    } else {
      onComplete(100);
      onExit();
    }
  };

  // 選項按鈕元件
  const OptionButton = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="w-full p-4 bg-neuro-surface rounded-2xl text-left hover:bg-pastel-green/30 transition-all flex items-center gap-3 active:scale-[0.98] touch-manipulation"
    >
      <X size={20} className="text-neutral-400 flex-shrink-0" />
      <span className="font-medium text-ink-main">{children}</span>
    </button>
  );

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="text-center py-8">
             <div className="w-32 h-32 bg-pastel-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain size={64} className="text-on-pastel-blue-icon" />
             </div>
             <h2 className="text-2xl font-bold text-ink-main mb-4">每月大腦健康檢查</h2>
             <p className="text-ink-sub mb-8 leading-relaxed">
               這是一個稍微詳細一點的評估，大約需要 5-10 分鐘。<br/>
               完成後您可以獲得 <span className="text-pastel-peach font-bold text-xl">100 分</span> 的獎勵！
             </p>
             <button onClick={handleNext} className="w-full py-4 bg-interaction text-white rounded-2xl font-bold text-lg shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:bg-interaction-hover transition-all active:scale-[0.98]">
               開始評估
             </button>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-ink-main">1. 時間定向感</h3>
            <p className="text-ink-sub">請問今年是哪一年？現在是哪個季節？</p>
            <div className="space-y-3">
              <OptionButton onClick={handleNext}>2025年 / 春季</OptionButton>
              <OptionButton onClick={handleNext}>2024年 / 冬季</OptionButton>
              <OptionButton onClick={handleNext}>2025年 / 夏季</OptionButton>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-ink-main">2. 記憶力測試</h3>
            <p className="text-ink-sub">請記住這三個詞：</p>
            <div className="bg-pastel-yellow p-6 rounded-2xl">
              <span className="text-2xl font-bold text-on-pastel-yellow block text-center">蘋果、硬幣、桌子</span>
            </div>
            <p className="text-ink-muted text-sm">等一下會請您重複。</p>
            <button onClick={handleNext} className="w-full py-4 bg-interaction text-white rounded-2xl font-bold active:scale-[0.98] transition-all">我記住了</button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-ink-main">3. 計算能力</h3>
            <p className="text-ink-sub">100 減去 7 是多少？再減去 7 呢？</p>
             <div className="space-y-3">
              <OptionButton onClick={handleNext}>93, 86</OptionButton>
              <OptionButton onClick={handleNext}>93, 85</OptionButton>
              <OptionButton onClick={handleNext}>92, 85</OptionButton>
            </div>
          </div>
        );
      case 4:
         return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-ink-main">4. 回憶測試</h3>
            <p className="text-ink-sub">請選出剛剛請您記住的三個詞：</p>
             <div className="space-y-3">
              <OptionButton onClick={handleNext}>香蕉、錢包、椅子</OptionButton>
              <OptionButton onClick={handleNext}>蘋果、硬幣、桌子</OptionButton>
              <OptionButton onClick={handleNext}>蘋果、鑰匙、桌子</OptionButton>
            </div>
          </div>
        );
      case 5:
        return (
           <div className="text-center py-8">
             <div className="w-24 h-24 bg-pastel-green rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={48} className="text-status-success-icon" />
             </div>
             <h2 className="text-2xl font-bold text-ink-main mb-2">評估完成！</h2>
             <p className="text-ink-sub mb-8">感謝您的耐心配合，這些資料將對醫生很有幫助。</p>
             <button onClick={handleNext} className="w-full py-4 bg-interaction text-white rounded-2xl font-bold text-lg shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:bg-interaction-hover transition-all flex items-center justify-center active:scale-[0.98]">
               領取 100 積分
               <ArrowRight className="ml-2" />
             </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto min-h-screen bg-neuro-bg">
      <header className="mb-6 flex items-center">
        <button onClick={onExit} aria-label="返回" className="p-2 -ml-2 text-ink-muted hover:text-ink-main transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1 ml-2">
            <div className="h-2 w-full bg-neuro-surface rounded-full overflow-hidden">
                <div
                    className="h-full bg-pastel-olive transition-all duration-300"
                    style={{ width: `${(step / totalSteps) * 100}%` }}
                />
            </div>
        </div>
        <span className="ml-3 text-xs font-bold text-ink-muted tabular-nums">{step}/{totalSteps}</span>
      </header>

      <div className="bg-neuro-card rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-6 min-h-[400px] flex flex-col justify-center">
        {renderContent()}
      </div>
    </div>
  );
};

export default MonthlyAssessment;