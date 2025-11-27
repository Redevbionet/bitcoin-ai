import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

export const AiAnalyst: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Hello! I'm your Bitcoin AI Assistant. I can help you interpret node logs, explain RPC commands, or discuss network health. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(messages, input);
      
      const aiMsg: ChatMessage = {
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] relative">
      <div className="absolute inset-0 bg-gradient-to-br from-bitcoin-orange/5 to-transparent pointer-events-none rounded-xl" />
      
      <div className="bg-bitcoin-panel border border-bitcoin-border rounded-t-xl p-4 flex items-center gap-3">
        <div className="bg-gradient-to-r from-bitcoin-orange to-yellow-500 p-2 rounded-lg text-white">
          <Bot size={24} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            AI Node Analyst
            <Sparkles size={14} className="text-yellow-400 animate-pulse" />
          </h2>
          <p className="text-xs text-gray-400">Powered by Gemini 2.5 Flash</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-bitcoin-dark/50 border-x border-bitcoin-border backdrop-blur-sm">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'model' && (
              <div className="w-8 h-8 rounded-full bg-bitcoin-panel border border-bitcoin-border flex items-center justify-center flex-shrink-0">
                <Bot size={16} className="text-bitcoin-orange" />
              </div>
            )}
            
            <div className={`max-w-[80%] rounded-2xl p-4 ${
              msg.role === 'user' 
                ? 'bg-bitcoin-orange text-white rounded-tr-sm' 
                : 'bg-bitcoin-panel border border-bitcoin-border text-gray-200 rounded-tl-sm'
            }`}>
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</p>
              <span className={`text-[10px] block mt-2 ${msg.role === 'user' ? 'text-white/60' : 'text-gray-500'}`}>
                {msg.timestamp.toLocaleTimeString()}
              </span>
            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                <User size={16} className="text-gray-300" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-bitcoin-panel border border-bitcoin-border flex items-center justify-center">
              <Bot size={16} className="text-bitcoin-orange" />
            </div>
            <div className="bg-bitcoin-panel border border-bitcoin-border rounded-2xl rounded-tl-sm p-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-bitcoin-panel border border-bitcoin-border rounded-b-xl p-4">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your node status, logs, or Bitcoin protocols..."
            className="w-full bg-bitcoin-dark border border-bitcoin-border text-white rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:border-bitcoin-orange focus:ring-1 focus:ring-bitcoin-orange transition-all placeholder-gray-600"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-bitcoin-orange hover:bg-bitcoin-orange/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};