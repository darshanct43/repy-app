
import React, { useState } from 'react';
import { TrendingUp, Calendar, Scissors, Star, Bot, Zap, ArrowLeft, CreditCard, Plus, Camera, Video, Trash2, Edit3, Image as ImageIcon, Save, ChevronRight, X } from 'lucide-react';
import { Card, Badge, Button } from './Shared';
import { AreaChart, Area, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from 'recharts';
import { LanguageCode, Appointment, Review, Service, BarberShop } from '../types';
import { TRANSLATIONS, LOGO_SVG, MOCK_SHOPS } from '../constants';
import AIAssistant from './AIAssistant';

const REVENUE_DATA = [
  { day: 'Mon', total: 2000 }, { day: 'Tue', total: 3400 }, { day: 'Wed', total: 2100 },
  { day: 'Thu', total: 4500 }, { day: 'Fri', total: 5200 }, { day: 'Sat', total: 8100 }, { day: 'Sun', total: 6900 },
];

const MOCK_APPOINTMENTS: Appointment[] = [
  { id: 'a1', shopId: '1', customerName: 'Rohan Verma', customerPhone: '9876543210', serviceId: 's1', serviceName: 'Elite Haircut', date: 'Today', time: '11:00 AM', status: 'CONFIRMED' },
  { id: 'a2', shopId: '1', customerName: 'Ishaan Gupta', customerPhone: '9123456789', serviceId: 's2', serviceName: 'Beard Sculpting', date: 'Today', time: '01:30 PM', status: 'PENDING' },
];

interface BarberDashboardProps {
  lang: LanguageCode;
  onLogout: () => void;
}

const BarberDashboard: React.FC<BarberDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'services' | 'gallery' | 'reviews'>('overview');
  const [showAIBot, setShowAIBot] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [shop, setShop] = useState<BarberShop>(MOCK_SHOPS[0]);

  // Handle Service Update
  const saveService = (updatedService: Service) => {
    setShop(prev => ({
      ...prev,
      services: prev.services.map(s => s.id === updatedService.id ? updatedService : s)
    }));
    setSelectedService(null);
  };

  // Sub-view: Service Detail Editor
  if (selectedService) {
    return (
      <div className="min-h-screen bg-white text-slate-900 animate-in slide-in-from-right duration-300">
        <header className="px-6 pt-16 pb-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-50">
           <button onClick={() => setSelectedService(null)} className="p-3 bg-slate-50 rounded-2xl text-slate-400">
             <ArrowLeft size={20}/>
           </button>
           <h2 className="font-black italic uppercase tracking-tighter text-xl">Edit Service</h2>
           <button onClick={() => saveService(selectedService)} className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg">
             <Save size={20}/>
           </button>
        </header>

        <div className="p-8 space-y-8">
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Service Image</h3>
            <div className="w-full aspect-video bg-slate-100 rounded-[32px] overflow-hidden border border-slate-200 flex flex-col items-center justify-center relative">
               <img src="https://images.unsplash.com/photo-1503910361347-ed0596136a5e?w=800" className="w-full h-full object-cover opacity-40" />
               <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <ImageIcon size={32} className="text-slate-400" />
                  <p className="text-[10px] font-black text-slate-500 uppercase">Change Photo</p>
               </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase">Service Name</label>
              <input className="w-full bg-slate-50 border-none p-5 rounded-2xl font-bold" defaultValue={selectedService.name} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase">Price (₹)</label>
                <input type="number" className="w-full bg-slate-50 border-none p-5 rounded-2xl font-black text-blue-600" defaultValue={selectedService.price} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase">Duration (Min)</label>
                <input type="number" className="w-full bg-slate-50 border-none p-5 rounded-2xl font-bold" defaultValue={selectedService.durationMinutes} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase">Description</label>
              <textarea className="w-full bg-slate-50 border-none p-5 rounded-2xl font-medium text-sm h-32" placeholder="Tell customers what is included..." defaultValue={selectedService.description} />
            </div>
          </div>

          <Button fullWidth variant="secondary" className="py-6 rounded-[28px] border-none bg-red-50 text-red-500">
             <Trash2 size={18}/> Delete Service
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-900 pb-32">
      {showAIBot && <AIAssistant userRole="BARBER" onClose={() => setShowAIBot(false)} />}
      
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 px-6 py-5 flex justify-between items-center rounded-b-[32px] shadow-sm">
        <div className="flex items-center gap-4">
          {activeTab !== 'overview' && (
            <button onClick={() => setActiveTab('overview')} className="p-2 bg-slate-50 rounded-xl text-slate-400">
              <ArrowLeft size={18}/>
            </button>
          )}
          <div className="w-10 h-10 drop-shadow-md" dangerouslySetInnerHTML={{ __html: LOGO_SVG }} />
          <div>
            <span className="font-black text-lg italic text-blue-600 tracking-tighter uppercase leading-none block">REPY PARTNER</span>
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{shop.name}</span>
          </div>
        </div>
        <button onClick={onLogout} className="text-[9px] font-black bg-slate-50 text-slate-400 px-4 py-2.5 rounded-xl border border-slate-100 uppercase tracking-widest hover:text-red-500 transition-colors">Sign Out</button>
      </nav>

      <main className="p-6 space-y-10">
        {activeTab === 'overview' && (
          <div className="space-y-10 animate-in fade-in duration-500">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
               <Card className="p-6 bg-white border-slate-100 shadow-sm">
                  <TrendingUp className="text-blue-600 mb-2" size={20}/>
                  <p className="text-2xl font-black italic">₹8,400</p>
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Today's Revenue</p>
               </Card>
               <Card className="p-6 bg-white border-slate-100 shadow-sm">
                  <Calendar className="text-green-600 mb-2" size={20}/>
                  <p className="text-2xl font-black italic">12</p>
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Appointments</p>
               </Card>
            </div>

            <section className="space-y-4">
              <div className="flex justify-between items-center ml-2">
                <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest italic">Weekly Activity</h2>
                <Badge color="bg-blue-50 text-blue-600">Growth +14%</Badge>
              </div>
              <Card className="p-6 h-[240px] bg-white border-slate-200">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={REVENUE_DATA}>
                    <defs>
                      <linearGradient id="barberGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                    <Tooltip />
                    <Area type="monotone" dataKey="total" stroke="#2563EB" strokeWidth={4} fill="url(#barberGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </section>

            <Button fullWidth onClick={() => setShowAIBot(true)} className="py-6 bg-slate-900 rounded-[28px] font-black uppercase text-xs tracking-widest shadow-xl">
              <Bot size={18}/> Manage with REPY AI
            </Button>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
            <h2 className="text-xl font-black italic uppercase ml-2 tracking-tighter">Today's Schedule</h2>
            {MOCK_APPOINTMENTS.map((app) => (
              <Card key={app.id} className="p-5 flex justify-between items-center bg-white border-slate-100 hover:border-blue-500 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-blue-50 rounded-[20px] flex items-center justify-center text-blue-600 border border-blue-100">
                    <Calendar size={28} />
                  </div>
                  <div>
                    <p className="font-black text-base uppercase italic">{app.customerName}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{app.serviceName} • {app.time}</p>
                  </div>
                </div>
                <Badge color={app.status === 'CONFIRMED' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}>
                  {app.status}
                </Badge>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'services' && (
          <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
            <div className="flex justify-between items-center ml-2">
              <h2 className="text-xl font-black italic uppercase tracking-tighter">Services</h2>
              <button className="p-3 bg-blue-600 rounded-2xl text-white"><Plus size={20}/></button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {shop.services.map((s) => (
                <Card key={s.id} onClick={() => setSelectedService(s)} className="p-6 bg-white border-slate-100 hover:border-blue-600 transition-all cursor-pointer group">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                        <Scissors size={24} />
                      </div>
                      <div>
                        <p className="font-black text-base uppercase italic">{s.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold">{s.durationMinutes} Mins • Elite Class</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black text-blue-600">₹{s.price}</p>
                      <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Edit Details</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="space-y-10 animate-in slide-in-from-bottom duration-500">
            <section className="space-y-4">
              <div className="flex justify-between items-center ml-2">
                <h2 className="text-xl font-black italic uppercase tracking-tighter">Shop Gallery</h2>
                <div className="flex gap-2">
                  <button className="p-3 bg-slate-100 rounded-2xl text-slate-600"><Camera size={18}/></button>
                  <button className="p-3 bg-slate-100 rounded-2xl text-slate-600"><Video size={18}/></button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[...(shop.shopPhotos || []), ...(shop.portfolioPhotos || [])].map((img, i) => (
                  <div key={i} className="aspect-square bg-slate-100 rounded-[32px] overflow-hidden border border-slate-200 group relative">
                    <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <button className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-md rounded-xl text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <X size={14}/>
                    </button>
                  </div>
                ))}
                <button className="aspect-square bg-white border-2 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center gap-2 hover:border-blue-400 transition-colors">
                  <Plus size={24} className="text-slate-300"/>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Add Media</span>
                </button>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
            <h2 className="text-xl font-black italic uppercase tracking-tighter ml-2">Customer Feedback</h2>
            <div className="space-y-4">
              {shop.reviews.map((rev) => (
                <Card key={rev.id} className="p-6 bg-white border-slate-100 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-black italic border border-blue-100">
                        {rev.userName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-sm uppercase italic">{rev.userName}</p>
                        <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest">{rev.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} fill={i < rev.rating ? "currentColor" : "none"} strokeWidth={3} />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 font-medium italic leading-relaxed">"{rev.comment}"</p>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Modern Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-200 p-6 flex justify-around items-center z-40 max-w-[500px] mx-auto rounded-t-[48px] shadow-2xl">
        {[
          { id: 'overview', icon: <TrendingUp size={22}/> },
          { id: 'appointments', icon: <Calendar size={22}/> },
          { id: 'services', icon: <Scissors size={22}/> },
          { id: 'gallery', icon: <ImageIcon size={22}/> },
          { id: 'reviews', icon: <Star size={22}/> }
        ].map(item => (
          <button 
            key={item.id} 
            onClick={() => setActiveTab(item.id as any)} 
            className={`p-4 rounded-[20px] transition-all duration-300 relative ${activeTab === item.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30 scale-110 -translate-y-2' : 'text-slate-300 hover:text-slate-500'}`}
          >
            {item.icon}
            {activeTab === item.id && (
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BarberDashboard;
