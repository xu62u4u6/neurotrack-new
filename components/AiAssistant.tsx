import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, CloudSun, MessageSquare } from 'lucide-react';
import { ChatMessage } from '../types';
import { GoogleGenAI } from "@google/genai";

const AiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<(ChatMessage & { isSystem?: boolean, icon?: any })[]>([
    {
        id: 'system_weather',
        role: 'model',
        text: '今日天氣晴朗，氣溫 24°C。太陽很大，林爺爺下午想出門的話，別忘了帶帽子喔！☀️',
        timestamp: new Date(new Date().setHours(8, 30)),
        isSystem: true,
        icon: CloudSun
    },
    {
        id: 'welcome',
        role: 'model',
        text: '您好，林爺爺！我是您的健康小秘書。今天有什麼我可以幫您的嗎？😊',
        timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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
    <div className="flex flex-col h-full bg-neuro-bg">
      <header className="p-6 bg-white/80 backdrop-blur-md border-b border-neuro-surface flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-pastel-blue rounded-2xl flex items-center justify-center text-blue-900 shadow-sm">
            <MessageSquare size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-ink-main">健康小秘書</h1>
            <p className="text-xs text-ink-muted">隨時為您服務</p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar" ref={scrollRef}>
        {messages.map((msg) => {
            if (msg.isSystem) {
                const Icon = msg.icon || CloudSun;
                return (
                    <div key={msg.id} className="flex justify-center my-4 animate-in fade-in slide-in-from-top-4">
                        <div className="bg-white border border-neuro-surface shadow-sm rounded-[2rem] p-5 max-w-[95%] flex items-start gap-4">
                            <div className="bg-pastel-yellow p-3 rounded-2xl text-yellow-900 flex-shrink-0">
                                <Icon size={24} />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-bold text-yellow-900 uppercase tracking-widest mb-1">健康播報</h4>
                                <p className="text-sm font-medium text-ink-main leading-relaxed">{msg.text}</p>
                            </div>
                        </div>
                    </div>
                );
            }

            return (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
                    {msg.role === 'model' && (
                        <div className="w-8 h-8 rounded-xl bg-pastel-blue flex items-center justify-center text-blue-900 mb-1 flex-shrink-0">
                            <MessageSquare size={16} />
                        </div>
                    )}
                    <div className={`max-w-[85%] rounded-[1.5rem] px-5 py-3 ${
                        msg.role === 'user' 
                        ? 'bg-ink-main text-white rounded-br-none shadow-md' 
                        : 'bg-white border border-neuro-surface text-ink-main rounded-bl-none shadow-sm'
                    }`}>
                        <p className="text-base font-medium leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                        <span className={`text-[10px] block mt-1 font-medium ${msg.role === 'user' ? 'text-white/70' : 'text-ink-muted'}`}>
                            {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                    </div>
                </div>
            );
        })}
        {isLoading && (
            <div className="flex justify-start items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-pastel-blue flex items-center justify-center text-blue-900">
                    <Sparkles size={16} className="animate-spin" />
                </div>
                <div className="bg-white rounded-[1.5rem] rounded-bl-none px-5 py-3 border border-neuro-surface shadow-sm flex items-center gap-1">
                    <div className="w-2 h-2 bg-ink-muted rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                    <div className="w-2 h-2 bg-ink-muted rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-ink-muted rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
            </div>
        )}
      </div>

      <div className="p-6 bg-white/80 backdrop-blur-md border-t border-neuro-surface pb-32">
        <div className="relative flex items-center bg-neuro-surface rounded-full px-2 py-2 focus-within:ring-2 ring-pastel-blue transition-all">
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="跟小秘書說說話..."
                className="flex-1 bg-transparent border-none focus:ring-0 px-4 py-2 text-base font-medium text-ink-main placeholder:text-ink-muted"
            />
            <button 
                onClick={handleSend}
                disabled={!inputText.trim() || isLoading}
                className="w-10 h-10 bg-ink-main text-white rounded-full flex items-center justify-center hover:bg-ink-main/90 disabled:opacity-50 transition-all active-press"
            >
                <Send size={18} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;
