
import React, { useState, useEffect, useRef } from 'react';
import { Send, ArrowLeft, Mic, Phone, X, PhoneOff, CheckCircle2, MessageSquare } from 'lucide-react';
import { BarberShop, Message } from '../types';
import { getAIReceptionistResponse } from '../services/geminiService';
// Fix: Import Badge from Shared component
import { Badge, Button } from './Shared';

interface AIReceptionistProps {
  shop: BarberShop;
  onClose: () => void;
  initialMode?: 'chat' | 'call';
}

const AIReceptionist: React.FC<AIReceptionistProps> = ({ shop, onClose, initialMode = 'chat' }) => {
  const [mode, setMode] = useState<'chat' | 'call'>(initialMode);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `Namaste! I'm ${shop.name}'s AI assistant. Want to book a slot?`, timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmedDetails, setConfirmedDetails] = useState<{service?: string, time?: string}>({});
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (textOverride?: string) => {
    const text = textOverride || inputText;
    if (!text.trim() || isLoading) return;
    
    setMessages(prev => [...prev, { role: 'user', text: text, timestamp: new Date() }]);
    setInputText('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
      const response = await getAIReceptionistResponse(shop, text, history);
      
      const functionPart = response.candidates?.[0]?.content?.parts?.find(p => p.functionCall);
      if (functionPart && functionPart.functionCall?.name === 'bookAppointment') {
        const args = functionPart.functionCall.args as any;
        const serviceName = shop.services.find(s => s.id === args.serviceId)?.name || 'Service';
        setConfirmedDetails({ service: serviceName, time: args.time });
        setBookingConfirmed(true);
      } else {
        const aiText = response.text || "Ji, main samajh nahi paaya. Dubara bolenge?";
        setMessages(prev => [...prev, { role: 'model', text: aiText, timestamp: new Date() }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Error connecting to AI. Please try again.", timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (bookingConfirmed) {
    return (
      <div className="fixed inset-0 bg-white z-[200] flex flex-col items-center justify-center p-10 text-center animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-8 border border-green-100 shadow-xl">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-3xl font-black mb-2 tracking-tighter uppercase italic text-slate-900">Slot Confirmed!</h2>
        <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 mb-10 w-full max-w-sm shadow-sm">
           <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-4">
              <span className="text-slate-400 font-black text-[10px] uppercase">Service</span>
              <span className="font-black italic text-blue-600 text-lg">{confirmedDetails.service}</span>
           </div>
           <div className="flex justify-between items-center">
              <span className="text-slate-400 font-black text-[10px] uppercase">Slot</span>
              <span className="font-black italic text-blue-600 text-lg">{confirmedDetails.time}</span>
           </div>
        </div>
        <Button fullWidth onClick={onClose} className="bg-slate-900 py-6 text-lg italic rounded-[32px]">Go Back</Button>
      </div>
    );
  }

  if (mode === 'call') {
    return (
      <div className="fixed inset-0 bg-[#F9FAFB] z-[200] flex flex-col items-center justify-between p-12 text-center animate-in slide-in-from-bottom duration-500">
        <div className="w-full flex justify-between items-center">
          <Badge color="bg-blue-50 text-blue-600">AI CALL ACTIVE</Badge>
          <button onClick={() => setMode('chat')} className="p-3 bg-white rounded-2xl border border-slate-200"><MessageSquare size={20}/></button>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-2xl border border-slate-100 mb-10 relative">
             <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-ping" />
             <img src={shop.profilePhoto} className="w-32 h-32 rounded-full object-cover" />
          </div>
          <h2 className="text-3xl font-black italic tracking-tighter uppercase">{shop.name}</h2>
          <p className="text-slate-400 font-bold mt-2 uppercase text-[10px] tracking-widest">REPY Voice Assistant Speaking...</p>
        </div>

        <div className="w-full flex justify-center gap-1 h-12 mb-20">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s`, height: `${Math.random() * 100}%` }} />
          ))}
        </div>

        <div className="w-full space-y-6">
          <p className="text-slate-500 font-medium italic">"Tell me your preferred time for a {shop.services[0].name}..."</p>
          <div className="flex justify-center gap-8">
            <button onClick={onClose} className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-red-500/30 active:scale-90 transition-all"><PhoneOff size={32}/></button>
            <button className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-blue-500/30 active:scale-90 transition-all"><Mic size={32}/></button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#F9FAFB] z-[200] flex flex-col max-w-[500px] mx-auto text-slate-900 border-x border-slate-200">
      <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-white sticky top-0 z-10 rounded-b-[32px] shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 bg-slate-50 rounded-xl border border-slate-100 active:scale-90 transition-all text-slate-400 hover:text-slate-900"><ArrowLeft size={20}/></button>
          <div className="w-10 h-10 rounded-2xl overflow-hidden ring-2 ring-blue-500/10">
            <img src={shop.profilePhoto} className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="font-black text-sm tracking-tight uppercase italic">{shop.name} AI</h3>
            <p className="text-[8px] text-green-600 font-black uppercase tracking-widest flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"/> Online</p>
          </div>
        </div>
        <button onClick={() => setMode('call')} className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100 active:scale-95 transition-all"><Phone size={20}/></button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
            <div className={`max-w-[85%] p-5 rounded-[28px] shadow-sm ${
              m.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none shadow-md'
            }`}>
              <p className="text-sm font-bold leading-relaxed">{m.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-white p-3 rounded-full flex gap-1 border border-slate-100">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]" />
             </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-6 bg-white border-t border-slate-100 rounded-t-[40px] shadow-2xl">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4">
          {['Check Prices', 'Book Slot', 'Home Visit?'].map(q => (
            <button key={q} onClick={() => handleSendMessage(q)} className="shrink-0 bg-slate-50 px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-400 border border-slate-100 active:bg-blue-600 active:text-white transition-all">{q}</button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <input className="flex-1 bg-slate-50 border border-slate-100 rounded-[24px] py-4 px-6 outline-none text-sm font-bold placeholder-slate-300 focus:border-blue-600 transition-all" placeholder="Ask AI..." value={inputText} onChange={e => setInputText(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} />
          <button onClick={() => handleSendMessage()} className="p-4 bg-blue-600 rounded-[20px] shadow-lg shadow-blue-500/20 active:scale-90 transition-all">
            <Send size={20} className="text-white"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIReceptionist;
