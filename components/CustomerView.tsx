
import React, { useState } from 'react';
import { Search, MapPin, Star, Phone, MessageSquare, Scissors, ArrowLeft, Bot, Trophy, Navigation, Camera, MessageCircle, PlayCircle } from 'lucide-react';
import { MOCK_SHOPS, TRANSLATIONS, LOGO_SVG } from '../constants';
import { BarberShop, LanguageCode } from '../types';
import { Badge, Button, Card } from './Shared';
import AIReceptionist from './AIReceptionist';
import AIAssistant from './AIAssistant';

interface CustomerViewProps {
  lang: LanguageCode;
}

const CustomerView: React.FC<CustomerViewProps> = ({ lang }) => {
  const [selectedShop, setSelectedShop] = useState<BarberShop | null>(null);
  const [aiMode, setAiMode] = useState<'chat' | 'call' | null>(null);
  const [showAIBot, setShowAIBot] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredShops = MOCK_SHOPS.filter(shop => 
    shop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGuideLocation = (e: React.MouseEvent, shop: BarberShop) => {
    e.stopPropagation();
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${shop.location.lat},${shop.location.lng}`, '_blank');
  };

  if (aiMode && selectedShop) {
    return <AIReceptionist shop={selectedShop} initialMode={aiMode} onClose={() => setAiMode(null)} />;
  }

  if (selectedShop) {
    return (
      <div className="pb-40 bg-white min-h-screen text-slate-900 animate-in fade-in duration-300">
        <div className="relative h-[320px] w-full">
          <img src={selectedShop.coverPhoto} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
          <button onClick={() => setSelectedShop(null)} className="absolute top-8 left-8 bg-white/95 p-3 rounded-2xl border border-slate-200 z-50 backdrop-blur-md shadow-xl active:scale-95 transition-all text-slate-900">
            <ArrowLeft size={24} />
          </button>
          
          <div className="absolute bottom-6 left-8 right-8">
            <h1 className="text-3xl font-black mb-1 tracking-tighter uppercase italic leading-tight">{selectedShop.name}</h1>
            <div className="flex items-center gap-3">
              <Badge color="bg-blue-50 text-blue-600">ELITE PARTNER</Badge>
              <span className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black border border-slate-100 shadow-sm"><Star size={12} className="text-amber-500" fill="currentColor"/> {selectedShop.rating}</span>
            </div>
          </div>
        </div>

        <div className="px-8 space-y-12 mt-8">
          {/* Photos & Videos Section */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic flex items-center gap-2">
                <Camera size={14} /> Shop Photos & Videos
              </h2>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {[...(selectedShop.shopPhotos || []), ...(selectedShop.portfolioPhotos || [])].map((photo, i) => (
                <div key={i} className="w-56 h-64 shrink-0 rounded-[32px] overflow-hidden border border-slate-100 shadow-sm relative group">
                  <img src={photo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {i === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <PlayCircle className="text-white" size={40} />
                    </div>
                  )}
                </div>
              ))}
              {(!selectedShop.shopPhotos?.length && !selectedShop.portfolioPhotos?.length) && (
                <p className="text-slate-400 text-xs italic">No media found.</p>
              )}
            </div>
          </section>

          {/* Services Section */}
          <section className="space-y-4">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Services</h2>
            <div className="grid grid-cols-1 gap-3">
               {selectedShop.services.map(s => (
                 <Card key={s.id} className="p-5 border-slate-100 bg-slate-50 flex justify-between items-center">
                    <div>
                      <p className="font-black text-base italic uppercase">{s.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold">{s.durationMinutes} Mins</p>
                    </div>
                    <p className="text-xl font-black text-blue-600">₹{s.price}</p>
                 </Card>
               ))}
            </div>
          </section>

          {/* Reviews Section */}
          <section className="space-y-6 pb-10">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic flex items-center gap-2">
              <MessageCircle size={14} /> User Reviews ({selectedShop.reviews?.length || 0})
            </h2>
            <div className="space-y-4">
              {selectedShop.reviews?.map((review) => (
                <Card key={review.id} className="p-6 bg-white border-slate-100 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-black text-sm uppercase italic">{review.userName}</p>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} fill={i < review.rating ? "currentColor" : "none"} strokeWidth={3} />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 font-medium italic leading-relaxed">"{review.comment}"</p>
                  <p className="text-[8px] text-slate-300 font-black uppercase mt-4 tracking-widest">{review.date}</p>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/95 backdrop-blur-2xl border-t border-slate-100 z-40 max-w-[500px] mx-auto rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
          <Button fullWidth className="py-6 bg-blue-600 text-lg italic uppercase font-black mb-4 shadow-xl shadow-blue-500/20" onClick={() => setAiMode('chat')}>
            BOOK WITH REPY AI
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="py-4 font-black text-[9px] rounded-2xl border-slate-200" onClick={() => setAiMode('chat')}>
              <MessageSquare size={14}/> CHAT AI
            </Button>
            <Button variant="outline" className="py-4 font-black text-[9px] rounded-2xl border-slate-200" onClick={() => setAiMode('call')}>
              <Phone size={14}/> CALL AI
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9FAFB] min-h-screen text-slate-900 pb-48">
      {showAIBot && <AIAssistant userRole="CUSTOMER" onClose={() => setShowAIBot(false)} />}
      
      <header className="px-8 pt-16 pb-8 flex justify-between items-start">
        <div>
          <h1 className="text-5xl font-black tracking-tighter italic text-blue-600 uppercase leading-none">REPY</h1>
          <p className="text-[9px] font-black text-slate-400 tracking-[0.4em] uppercase mt-2">AI Receptionist</p>
        </div>
        <div className="w-14 h-14 drop-shadow-xl" dangerouslySetInnerHTML={{ __html: LOGO_SVG }} />
      </header>

      <div className="px-8 space-y-10">
        <div className="relative shadow-sm rounded-3xl overflow-hidden border border-slate-200">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
          <input 
            className="w-full bg-white border-none py-5 pl-14 pr-10 text-slate-900 placeholder-slate-300 outline-none font-bold text-sm" 
            placeholder="Search styles, fades, shops..." 
            value={searchQuery} 
            onChange={e => setSearchQuery(e.target.value)} 
          />
        </div>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-amber-50 p-2 rounded-xl text-amber-500 border border-amber-100">
              <Trophy size={18} />
            </div>
            <h2 className="text-xl font-black italic uppercase tracking-tight">City Elite</h2>
          </div>
          
          <div className="space-y-5">
            {filteredShops.map((shop) => (
              <Card key={shop.id} className="p-5 border-slate-200 bg-white hover:border-blue-600/20 transition-all shadow-sm active:scale-[0.98]" onClick={() => setSelectedShop(shop)}>
                <div className="flex gap-5">
                  <div className="w-20 h-20 shrink-0 bg-slate-100 rounded-2xl overflow-hidden border border-slate-100">
                    <img src={shop.profilePhoto} className="w-full h-full object-cover" alt={shop.name} />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-lg font-black uppercase italic truncate leading-tight">{shop.name}</h3>
                      <Badge color={shop.status === 'AVAILABLE' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}>
                        {shop.status === 'AVAILABLE' ? 'OPEN' : 'OFF'}
                      </Badge>
                    </div>
                    
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-1.5 truncate">
                      <MapPin size={10} className="shrink-0"/> {shop.location.address}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                       <span className="text-amber-500 font-black text-base flex items-center gap-1.5">
                         <Star size={14} fill="currentColor"/> {shop.rating}
                       </span>
                       <button 
                        onClick={(e) => handleGuideLocation(e, shop)} 
                        className="text-[8px] font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100 uppercase tracking-wider hover:bg-blue-100 transition-colors"
                       >
                         Guide Location
                       </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
      
      <button 
        className="fixed bottom-10 right-8 w-14 h-14 bg-blue-600 rounded-full shadow-[0_10px_30px_rgba(37,99,235,0.4)] flex items-center justify-center text-white active:scale-90 transition-all border-4 border-white z-50 animate-bounce" 
        onClick={() => setShowAIBot(true)}
      >
        <Bot size={28} />
      </button>
    </div>
  );
};

export default CustomerView;
