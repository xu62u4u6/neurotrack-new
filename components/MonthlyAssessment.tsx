import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Brain, Calendar, Clock, ArrowRight } from 'lucide-react';

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

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="text-center py-8">
             <div className="w-32 h-32 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain size={64} className="text-purple-600" />
             </div>
             <h2 className="text-2xl font-bold text-slate-800 mb-4">每月大腦健康檢查</h2>
             <p className="text-slate-500 mb-8 leading-relaxed">
               這是一個稍微詳細一點的評估，大約需要 5-10 分鐘。<br/>
               完成後您可以獲得 <span className="text-amber-500 font-bold text-xl">100 分</span> 的獎勵！
             </p>
             <button onClick={handleNext} className="w-full py-4 bg-purple-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-purple-200 hover:bg-purple-700 transition-all">
               開始評估
             </button>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-800">1. 時間定向感</h3>
            <p className="text-slate-600">請問今年是哪一年？現在是哪個季節？</p>
            <div className="space-y-3">
              <button onClick={handleNext} className="w-full p-4 border border-slate-200 rounded-xl text-left hover:border-purple-500 hover:bg-purple-50 transition-all">2025年 / 春季</button>
              <button onClick={handleNext} className="w-full p-4 border border-slate-200 rounded-xl text-left hover:border-purple-500 hover:bg-purple-50 transition-all">2024年 / 冬季</button>
              <button onClick={handleNext} className="w-full p-4 border border-slate-200 rounded-xl text-left hover:border-purple-500 hover:bg-purple-50 transition-all">2025年 / 夏季</button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-800">2. 記憶力測試</h3>
            <p className="text-slate-600">請記住這三個詞：<br/><span className="text-2xl font-bold text-indigo-600 block mt-4 mb-4">蘋果、硬幣、桌子</span><br/>等一下會請您重複。</p>
            <button onClick={handleNext} className="w-full py-3 bg-slate-800 text-white rounded-xl">我記住了</button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-800">3. 計算能力</h3>
            <p className="text-slate-600">100 減去 7 是多少？再減去 7 呢？</p>
             <div className="space-y-3">
              <button onClick={handleNext} className="w-full p-4 border border-slate-200 rounded-xl text-left hover:border-purple-500 hover:bg-purple-50 transition-all">93, 86</button>
              <button onClick={handleNext} className="w-full p-4 border border-slate-200 rounded-xl text-left hover:border-purple-500 hover:bg-purple-50 transition-all">93, 85</button>
              <button onClick={handleNext} className="w-full p-4 border border-slate-200 rounded-xl text-left hover:border-purple-500 hover:bg-purple-50 transition-all">92, 85</button>
            </div>
          </div>
        );
      case 4:
         return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-800">4. 回憶測試</h3>
            <p className="text-slate-600">請選出剛剛請您記住的三個詞：</p>
             <div className="space-y-3">
              <button onClick={handleNext} className="w-full p-4 border border-slate-200 rounded-xl text-left hover:border-purple-500 hover:bg-purple-50 transition-all">香蕉、錢包、椅子</button>
              <button onClick={handleNext} className="w-full p-4 border border-slate-200 rounded-xl text-left hover:border-purple-500 hover:bg-purple-50 transition-all">蘋果、硬幣、桌子</button>
              <button onClick={handleNext} className="w-full p-4 border border-slate-200 rounded-xl text-left hover:border-purple-500 hover:bg-purple-50 transition-all">蘋果、鑰匙、桌子</button>
            </div>
          </div>
        );
      case 5:
        return (
           <div className="text-center py-8 animate-in fade-in zoom-in">
             <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={48} className="text-green-600" />
             </div>
             <h2 className="text-2xl font-bold text-slate-800 mb-2">評估完成！</h2>
             <p className="text-slate-500 mb-8">感謝您的耐心配合，這些資料將對醫生很有幫助。</p>
             <button onClick={handleNext} className="w-full py-4 bg-purple-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-purple-200 hover:bg-purple-700 transition-all flex items-center justify-center">
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
    <div className="p-6 max-w-lg mx-auto min-h-screen bg-slate-50">
      <header className="mb-6 flex items-center">
        <button onClick={onExit} className="p-2 -ml-2 text-slate-400 hover:text-slate-600">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1 ml-2">
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-purple-500 transition-all duration-300" 
                    style={{ width: `${(step / totalSteps) * 100}%` }} 
                />
            </div>
        </div>
        <span className="ml-3 text-xs font-bold text-slate-400">{step}/{totalSteps}</span>
      </header>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 min-h-[400px] flex flex-col justify-center">
        {renderContent()}
      </div>
    </div>
  );
};

export default MonthlyAssessment;