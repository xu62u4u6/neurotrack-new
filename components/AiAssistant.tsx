import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, CalendarCheck, Bot } from 'lucide-react';
import { ChatMessage } from '../types';
import { GoogleGenAI } from "@google/genai";

const AiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<(ChatMessage & { isSystem?: boolean })[]>([
    {
      id: 'system_reminder',
      role: 'model',
      text: '提醒：下午兩點記得吃鈣片喔！',
      timestamp: new Date(new Date().setHours(8, 30)),
      isSystem: true,
    },
    {
      id: 'welcome',
      role: 'model',
      text: '您好，林爺爺！我是您的健康小秘書。今天天氣不錯，有出門走走嗎？',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 使用 setTimeout 確保 DOM 更新後再捲動
    const timer = setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      // ⚠️ 安全性問題：API Key 不應該暴露在前端程式碼中
      // 這裡僅作為 Demo 使用，正式環境應透過後端 proxy 呼叫 API
      const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : undefined;
      if (!apiKey) throw new Error("No API Key");

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `
        你是一位溫柔、耐心、有同理心的健康助手。
        正在與一位長輩「林爺爺」聊天。

        請遵循以下原則：
        1. 稱呼他為「林爺爺」。
        2. 使用鼓勵、正向且溫暖的語氣。
        3. 內容要易讀，避免生硬名詞。
        4. 回答不超過 100 字。

        使用者說：${userMsg.text}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text || "我收到了，您的身體狀況很棒喔！",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);

    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "抱歉林爺爺，我的連線好像斷掉了，要請您再說一次喔！",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full relative bg-neuro-bg">
      {/* 頁面標題 */}
      <div className="p-6 pb-2">
        <div className="mt-4 mb-4">
          <h1 className="text-3xl font-bold text-ink-main">健康助理</h1>
          <p className="text-ink-sub mt-1">隨時與我聊聊您的狀況</p>
        </div>
      </div>

      {/* 對話區域 */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 no-scrollbar" ref={scrollRef}>
        {messages.map((msg) => {
          // 系統健康播報訊息
          if (msg.isSystem) {
            return (
              <div key={msg.id} className="bg-pastel-blue p-5 rounded-[2rem] rounded-tl-none shadow-sm w-[85%]">
                <div className="flex items-center gap-2 mb-2">
                  <CalendarCheck size={16} className="text-on-pastel-blue/60" />
                  <span className="text-xs font-bold text-on-pastel-blue/60">健康播報</span>
                </div>
                <p className="text-on-pastel-blue font-medium leading-relaxed">{msg.text}</p>
              </div>
            );
          }

          // AI 助理訊息
          if (msg.role === 'model') {
            return (
              <div key={msg.id} className="flex gap-3 w-[90%]">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex-shrink-0 flex items-center justify-center">
                  <Bot size={20} className="text-neutral-500" />
                </div>
                <div className="bg-pastel-yellow p-5 rounded-[2rem] rounded-tl-none shadow-sm">
                  <p className="text-on-pastel-yellow font-medium leading-relaxed">{msg.text}</p>
                </div>
              </div>
            );
          }

          // 使用者訊息
          return (
            <div key={msg.id} className="flex justify-end">
              <div className="bg-interaction text-white p-5 rounded-[2rem] rounded-tr-none shadow-md max-w-[85%]">
                <p className="font-medium leading-relaxed">{msg.text}</p>
              </div>
            </div>
          );
        })}

        {/* Loading 狀態 */}
        {isLoading && (
          <div className="flex gap-3 w-[90%]">
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex-shrink-0 flex items-center justify-center">
              <Sparkles size={18} className="text-on-pastel-yellow-icon animate-spin" />
            </div>
            <div className="bg-pastel-yellow/50 p-5 rounded-[2rem] rounded-tl-none shadow-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-on-pastel-yellow-icon rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-2 h-2 bg-on-pastel-yellow-icon rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
              <div className="w-2 h-2 bg-on-pastel-yellow-icon rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
            </div>
          </div>
        )}
      </div>

      {/* 輸入區域 */}
      <div className="p-4 pb-28">
        <div className="bg-white rounded-full flex items-center px-5 py-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <input
            type="text"
            name="chat-input"
            autoComplete="off"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="跟助理說說話..."
            className="bg-transparent flex-1 outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded text-neutral-700 font-medium"
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim() || isLoading}
            aria-label="發送訊息"
            className="w-10 h-10 bg-interaction rounded-full flex items-center justify-center text-white ml-2 disabled:opacity-50 transition-all active:scale-95"
          >
            <Send size={16} className="ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;
