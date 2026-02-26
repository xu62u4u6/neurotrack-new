import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, UploadCloud } from 'lucide-react';
import { SpeechInput, SpeechOutput } from '../types';

interface SpeechRecordingProps {
    onComplete?: (points: number) => void;
}

const SpeechRecording: React.FC<SpeechRecordingProps> = ({ onComplete }) => {
  // Mock Data
  const inputData: SpeechInput = {
    script_text: "今天天氣真好，微風輕輕吹過樹梢，陽光灑在草地上，讓人感到無比舒適與放鬆。",
    max_duration: 30,
    example_audio_url: "#",
  };

  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(inputData.max_duration);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  // Use 'number' for browser setInterval return type
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) clearInterval(timerRef.current);
    };
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setAudioUrl(null);
    setTimeLeft(inputData.max_duration);

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          stopRecording();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (timerRef.current !== null) clearInterval(timerRef.current);
    // Simulate created blob URL
    setAudioUrl("mock_blob_url");
  };

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      const output: SpeechOutput = {
        user_id: 'user_123',
        task_type: 'read_sentence',
        audio_url: 's3://bucket/audio_abc123.wav',
        duration: inputData.max_duration - timeLeft,
        timestamp: new Date().toISOString(),
      };
      console.log('Output to backend:', output);
      
      // Award Points
      if (onComplete) {
          onComplete(10);
      }
      setAudioUrl(null);
    }, 1500);
  };

  return (
    <div className="p-6 max-w-lg mx-auto min-h-screen pb-24">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">語音評估</h1>
        <p className="text-slate-500 mt-2">請清晰朗讀以下文字。</p>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-6">
        <blockquote className="text-xl leading-relaxed font-medium text-slate-700 border-l-4 border-teal-500 pl-4 py-1">
          "{inputData.script_text}"
        </blockquote>
      </div>

      <div className="flex flex-col items-center space-y-8 mt-12">
        <div className="relative">
          {/* Ripple effect when recording */}
          {isRecording && (
            <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-25"></div>
          )}
          <button
            onClick={toggleRecording}
            className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
              isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-teal-600 hover:bg-teal-700'
            }`}
          >
            {isRecording ? (
              <Square size={32} className="text-white fill-current" />
            ) : (
              <Mic size={36} className="text-white" />
            )}
          </button>
        </div>

        <div className="text-center">
          <p className={`text-3xl font-mono font-bold ${isRecording ? 'text-red-500' : 'text-slate-400'}`}>
            00:{timeLeft.toString().padStart(2, '0')}
          </p>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
            {isRecording ? '錄音中...' : '準備錄音'}
          </p>
        </div>

        {audioUrl && !isRecording && (
          <div className="w-full animate-in slide-in-from-bottom-4 fade-in duration-500">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                        <Play size={18} className="text-slate-600 ml-1" />
                    </div>
                    <span className="text-sm font-medium text-slate-600">Recording_01.wav</span>
                </div>
                <span className="text-xs text-slate-400">{(inputData.max_duration - timeLeft).toFixed(1)}s</span>
            </div>
            
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full py-3 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-900 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {uploading ? (
                <span>上傳中...</span>
              ) : (
                <>
                  <UploadCloud size={20} />
                  <span>提交錄音 (+10分)</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeechRecording;