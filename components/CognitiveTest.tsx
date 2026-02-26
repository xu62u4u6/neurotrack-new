import React, { useState, useEffect, useCallback } from 'react';
import { Play, CheckCircle, RotateCcw } from 'lucide-react';
import { CognitiveTestInput, CognitiveTestOutput } from '../types';

interface CognitiveTestProps {
    onComplete?: (points: number) => void;
}

const CognitiveTest: React.FC<CognitiveTestProps> = ({ onComplete }) => {
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
    <div className="p-6 max-w-lg mx-auto min-h-screen pb-24">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">{testData.test_name}</h1>
        <p className="text-slate-500 mt-2">{testData.instructions}</p>
        {testData.previous_score !== undefined && (
          <div className="mt-4 inline-block px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600">
            上次分數: {testData.previous_score}/5
          </div>
        )}
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col items-center justify-center min-h-[300px]">
        {status === 'IDLE' && (
          <button
            onClick={startTest}
            className="group relative flex items-center justify-center w-24 h-24 bg-teal-50 rounded-full hover:bg-teal-100 transition-all"
          >
            <Play className="text-teal-600 ml-1" size={40} />
            <span className="absolute -bottom-8 text-sm font-semibold text-teal-700">開始測驗</span>
          </button>
        )}

        {status === 'SHOWING' && (
          <div className="text-8xl font-bold text-slate-800 tabular-nums animate-pulse">
            {displayNumber !== null ? displayNumber : "..."}
          </div>
        )}

        {status === 'INPUT' && (
          <div className="w-full">
            <label className="block text-sm font-medium text-slate-700 mb-2">請輸入數字：</label>
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full text-center text-3xl tracking-widest p-4 border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:ring-0 outline-none transition-colors"
              placeholder="12345"
              autoFocus
            />
            <button
              onClick={handleSubmit}
              className="mt-6 w-full py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors"
            >
              提交答案
            </button>
          </div>
        )}

        {status === 'FINISHED' && (
          <div className="text-center animate-in fade-in zoom-in duration-300">
            <CheckCircle className="text-green-500 mx-auto mb-4" size={64} />
            <h3 className="text-2xl font-bold text-slate-800">測驗完成！</h3>
            <p className="text-slate-500 mt-2">您的得分</p>
            <div className="text-5xl font-bold text-teal-600 mt-2">{score} / 5</div>
            <button
              onClick={() => setStatus('IDLE')}
              className="mt-8 flex items-center justify-center space-x-2 text-slate-500 hover:text-slate-800 transition-colors mx-auto"
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