import React, { useState, useEffect, useCallback } from 'react';
import { Play, CheckCircle, RotateCcw, ArrowLeft } from 'lucide-react';
import { CognitiveTestInput, CognitiveTestOutput } from '../types';

interface CognitiveTestProps {
    onComplete?: (points: number) => void;
    onExit?: () => void;
}

const CognitiveTest: React.FC<CognitiveTestProps> = ({ onComplete, onExit }) => {
  // Mock Input Data
  const testData: CognitiveTestInput = {
    test_id: 'digit_span_001',
    test_name: '數字記憶廣度測驗',
    instructions: '請記住螢幕上顯示的數字順序，並依序輸入。',
    expected_duration: 120,
    previous_score: 5,
  };

  const [status, setStatus] = useState<'IDLE' | 'SHOWING' | 'INPUT' | 'FINISHED'>('IDLE');
  const [sequence, setSequence] = useState<number[]>([]);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [displayNumber, setDisplayNumber] = useState<number | null>(null);

  const startTest = () => {
    const newSequence = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10));
    setSequence(newSequence);
    setScore(0);
    setUserAnswer('');
    setStatus('SHOWING');
    setStartTime(Date.now());

    let i = 0;
    const interval = setInterval(() => {
      if (i < newSequence.length) {
        setDisplayNumber(newSequence[i]);
        i++;
      } else {
        clearInterval(interval);
        setDisplayNumber(null);
        setStatus('INPUT');
      }
    }, 1000);
  };

  const handleSubmit = () => {
    const correctCount = sequence.reduce((acc, val, idx) => {
      return val === parseInt(userAnswer[idx]) ? acc + 1 : acc;
    }, 0);
    
    setScore(correctCount);
    setStatus('FINISHED');

    // Simulate Output
    const output: CognitiveTestOutput = {
      user_id: 'user_123',
      test_id: testData.test_id,
      score: correctCount,
      response_time: (Date.now() - startTime) / 1000,
      timestamp: new Date().toISOString(),
    };
    console.log("Output to backend:", output);

    // Trigger Gamification Points (10 points for daily task)
    if (onComplete) {
        setTimeout(() => onComplete(10), 500);
    }
  };

  return (
    <div className="p-6 min-h-screen pb-32 bg-neuro-bg">
      {/* 返回按鈕 */}
      {onExit && (
        <button onClick={onExit} aria-label="返回" className="p-2 -ml-2 mb-4 text-ink-muted hover:text-ink-main transition-colors">
          <ArrowLeft size={24} />
        </button>
      )}

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-ink-main">{testData.test_name}</h1>
        <p className="text-ink-sub mt-1">{testData.instructions}</p>
        {testData.previous_score !== undefined && (
          <div className="mt-4 inline-block px-3 py-1 bg-neuro-surface rounded-full text-xs font-medium text-ink-sub tabular-nums">
            上次分數: {testData.previous_score}/5
          </div>
        )}
      </header>

      <div className="bg-neuro-card rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-8 flex flex-col items-center justify-center min-h-[300px]">
        {status === 'IDLE' && (
          <button
            onClick={startTest}
            className="group relative flex items-center justify-center w-24 h-24 bg-pastel-blue rounded-full hover:bg-pastel-blue/80 transition-all active:scale-95 touch-manipulation"
          >
            <Play className="text-on-pastel-blue-icon ml-1" size={40} />
            <span className="absolute -bottom-8 text-sm font-semibold text-on-pastel-blue-icon">開始測驗</span>
          </button>
        )}

        {status === 'SHOWING' && (
          <div className="text-8xl font-bold text-ink-main tabular-nums animate-pulse">
            {displayNumber !== null ? displayNumber : "…"}
          </div>
        )}

        {status === 'INPUT' && (
          <div className="w-full">
            <label htmlFor="digit-input" className="block text-sm font-medium text-ink-sub mb-2">請輸入數字：</label>
            <input
              id="digit-input"
              type="text"
              inputMode="numeric"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full text-center text-3xl tracking-widest p-4 border-2 border-neuro-surface rounded-2xl focus:border-pastel-olive outline-none focus-visible:ring-2 focus-visible:ring-pastel-olive transition-colors bg-white"
              placeholder="12345"
              autoFocus
            />
            <button
              onClick={handleSubmit}
              className="mt-6 w-full py-4 bg-interaction text-white rounded-2xl font-bold hover:bg-interaction-hover transition-colors active:scale-[0.98]"
            >
              提交答案
            </button>
          </div>
        )}

        {status === 'FINISHED' && (
          <div className="text-center">
            <div className="w-20 h-20 bg-pastel-green rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-status-success-icon" size={48} />
            </div>
            <h3 className="text-2xl font-bold text-ink-main">測驗完成！</h3>
            <p className="text-ink-sub mt-2">您的得分</p>
            <div className="text-5xl font-bold text-pastel-olive mt-2 tabular-nums">{score} / 5</div>
            <button
              onClick={() => setStatus('IDLE')}
              className="mt-8 flex items-center justify-center space-x-2 text-ink-muted hover:text-ink-main transition-colors mx-auto"
            >
              <RotateCcw size={18} />
              <span>重新測驗</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CognitiveTest;