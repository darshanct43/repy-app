
import React, { useState, useEffect, useRef } from 'react';
import { Send, X, Bot, Sparkles, ArrowLeft, Loader2 } from 'lucide-react';
import { Button, Card } from './Shared';
import { getGeneralAssistantResponse } from '../services/geminiService';

interface AIAssistantProps {
  userRole: 'CUSTOMER' | 'BARBER';
  onClose: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ userRole, onClose }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { 
      role: 'model', 
      text: userRole === 'BARBER' 
        ? "Namaste Partner! I'm your REPY Business Assistant. I can help you manage bookings, explain the 30-day trial, or show you how to set up your Studio Highlights. How can I help today?"
        : "Hi! I'm your REPY Assistant. Need help finding the best fades in the city or booking with our AI receptionists? Just ask!" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userText = input;
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput('');
    setIsTyping(true);

    try {
      const history = messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
      const response = await getGeneralAssistantResponse(userRole, userText, history);
      const aiText = response.text || "I'm having a bit of trouble thinking right now. Could you ask that again?";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm facing a connection issue. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#121212] z-[200] flex flex-col max-w-[500px] mx-auto animate-in slide-in-from-bottom duration-300">
      <div className="p-6 border-b border-white/5 bg-[#1e1e1e] flex justify-between items-center rounded-b-[32px] shadow-xl">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-2 bg-white/5 rounded-full border border-white/5 hover:bg-white/10 transition-all">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <div>
            <h3 className="font-black text-lg text-white italic tracking-tighter uppercase flex items-center gap-2">
              <Bot className="text-blue-500" size={20} /> REPY AI
            </h3>
            <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Digital Assistant</p>
          </div>
        </div>
        <Sparkles className="text-amber-500 animate-pulse" size={20} />
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0a0a0a]">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
            <div className={`max-w-[85%] p-5 rounded-[28px] text-sm font-bold leading-relaxed shadow-2xl ${
              m.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-[#1e1e1e] text-slate-200 border border-white/5 rounded-bl-none'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
             <div className="bg-[#1e1e1e] p-4 rounded-full flex gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
             </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="p-6 bg-[#1e1e1e] border-t border-white/5 rounded-t-[40px] shadow-2xl">
        <div className="flex gap-3">
          <input 
            className="flex-1 bg-[#121212] border-none rounded-2xl p-4 text-white outline-none focus:ring-1 focus:ring-blue-600 font-bold placeholder-slate-700" 
            placeholder="How can I help you today?" 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend} className="p-4 bg-blue-600 rounded-2xl shadow-xl shadow-blue-500/20 active:scale-90 transition-all">
            <Send size={20} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
