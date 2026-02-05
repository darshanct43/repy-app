
import React, { useState } from 'react';
import { MOCK_SHOPS } from '../constants';
import { Card, Badge, Button } from './Shared';
import { LayoutDashboard, MessageSquare, CreditCard, Bell, CheckCircle, XCircle, Search, Filter, ArrowLeft, User, ShieldCheck, Scissors, TrendingUp, DollarSign, Star, Trash2 } from 'lucide-react';
import { AdminMessage, UserRole, Review } from '../types';

const AdminDashboard: React.FC = () => {
  const [shops, setShops] = useState(MOCK_SHOPS);
  const [activeTab, setActiveTab] = useState<'shops' | 'billing' | 'messages' | 'reviews'>('shops');
  const [adminMessages] = useState<AdminMessage[]>([
    { id: 'm1', senderName: 'Rahul (Royal Elite)', senderRole: UserRole.BARBER, text: 'Need help with UPI setup.', timestamp: new Date(), status: 'unread' },
    { id: 'm2', senderName: 'Amit (Customer)', senderRole: UserRole.CUSTOMER, text: 'Barber did not show up.', timestamp: new Date(), status: 'read' }
  ]);

  const allReviews = shops.flatMap(s => s.reviews.map(r => ({ ...r, shopName: s.name })));

  const handleDeleteReview = (reviewId: string) => {
    alert("Review hidden from public view.");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 pb-24 max-w-[500px] mx-auto border-x border-white/5">
      <div className="flex justify-between items-start mb-12 mt-4">
        <div>
          <h1 className="text-5xl font-black text-blue-600 tracking-tighter italic">HUB</h1>
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em] mt-1">Admin Control Center</p>
        </div>
        <div className="flex gap-1 bg-[#1e1e1e] p-1.5 rounded-[24px] border border-white/5 shadow-2xl overflow-x-auto no-scrollbar max-w-[200px]">
           {['shops', 'billing', 'messages', 'reviews'].map((tab) => (
             <button 
               key={tab} 
               onClick={() => setActiveTab(tab as any)} 
               className={`px-4 py-2.5 rounded-[18px] text-[9px] font-black uppercase transition-all shrink-0 ${
                 activeTab === tab ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500'
               }`}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      {activeTab === 'shops' && (
        <div className="space-y-6">
           <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 bg-[#111111]">
                 <div className="flex justify-between items-start mb-2">
                    <TrendingUp size={20} className="text-blue-500" />
                    <Badge color="bg-blue-500/10 text-blue-500">+12%</Badge>
                 </div>
                 <p className="text-4xl font-black italic">{shops.length}</p>
                 <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest mt-1">Active Partners</p>
              </Card>
              <Card className="p-6 bg-[#111111]">
                 <div className="flex justify-between items-start mb-2">
                    <DollarSign size={20} className="text-green-500" />
                    <Badge color="bg-green-500/10 text-green-400">LIVE</Badge>
                 </div>
                 <p className="text-4xl font-black italic text-green-500">₹850</p>
                 <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest mt-1">Today Revenue</p>
              </Card>
           </div>
           
           <h2 className="text-xs font-black text-slate-600 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
             <ShieldCheck size={14}/> Verification Queue
           </h2>
           {shops.map(shop => (
             <Card key={shop.id} className="p-5 flex justify-between items-center group bg-[#161616]">
               <div className="flex gap-4 items-center">
                  <div className="relative">
                    <img src={shop.profilePhoto} className="w-16 h-16 rounded-[24px] object-cover ring-2 ring-white/5" />
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-[#161616] ${shop.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                  </div>
                  <div>
                    <h4 className="font-black text-lg tracking-tight leading-none mb-1">{shop.name}</h4>
                    <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest">{shop.ownerName}</p>
                    <Badge color="bg-green-500/10 text-green-400 mt-2 font-black">₹1 VERIFIED</Badge>
                  </div>
               </div>
               <Button size="sm" variant="outline" className="border-blue-500/20 text-blue-500 px-6 font-black rounded-xl">APPROVE</Button>
             </Card>
           ))}
        </div>
      )}

      {activeTab === 'billing' && (
        <div className="space-y-6">
          <h2 className="text-xl font-black uppercase tracking-tighter italic">Settlements & History</h2>
          <Card className="p-8 bg-[#111111] space-y-4 border-dashed border-white/5">
             <div className="text-center space-y-2">
                <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest">Total Payouts Handled</p>
                <p className="text-6xl font-black italic text-blue-600">₹4.2L</p>
             </div>
          </Card>

          {shops.map(shop => (
            <Card key={shop.id} className="p-6 space-y-6 bg-[#161616]">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-black text-2xl tracking-tighter">{shop.name}</h4>
                  <p className="text-[10px] font-black text-slate-600 uppercase mt-1">Partner: {shop.ownerName}</p>
                </div>
                <Badge color={shop.billingStatus === 'PAID' ? 'bg-green-600/10 text-green-400' : 'bg-red-500/10 text-red-400'}>
                  {shop.billingStatus}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button variant="outline" size="sm" className="border-white/5 bg-white/5"><Bell size={14}/> REMIND</Button>
                <Button variant="primary" size="sm" className="bg-blue-600"><CheckCircle size={14}/> RELEASE</Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'messages' && (
        <div className="space-y-6">
           <h2 className="text-xl font-black uppercase tracking-tighter italic">Partner Messages</h2>
           {adminMessages.map(msg => (
             <Card key={msg.id} className={`p-6 border-l-4 transition-all hover:bg-[#1a1a1a] ${msg.senderRole === UserRole.BARBER ? 'border-l-purple-600 bg-purple-600/5' : 'border-l-blue-600 bg-blue-600/5'}`}>
                <div className="flex justify-between items-center mb-4">
                   <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${msg.senderRole === UserRole.BARBER ? 'bg-purple-600/20 text-purple-400' : 'bg-blue-600/20 text-blue-400'}`}>
                        {msg.senderRole === UserRole.BARBER ? <Scissors size={18}/> : <User size={18}/>}
                      </div>
                      <span className="text-sm font-black uppercase tracking-widest">{msg.senderName}</span>
                   </div>
                   <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{msg.status}</span>
                </div>
                <p className="text-base font-medium mb-6 opacity-90 leading-relaxed text-slate-200">{msg.text}</p>
                <div className="flex gap-2">
                   <Button fullWidth size="sm" variant="outline" className="border-white/5 bg-[#00000033] py-4">REPLY NOW</Button>
                </div>
             </Card>
           ))}
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="space-y-6">
           <h2 className="text-xl font-black uppercase tracking-tighter italic">Review Moderation</h2>
           <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Only 4+ stars are shown to customers by default.</p>
           {allReviews.map(rev => (
             <Card key={rev.id} className="p-6 bg-[#161616]">
                <div className="flex justify-between items-start mb-4">
                   <div>
                      <h4 className="font-black text-xs uppercase tracking-widest text-blue-400">{rev.userName}</h4>
                      <p className="text-[8px] text-slate-600 font-black uppercase">{rev.shopName}</p>
                   </div>
                   <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => <Star key={i} size={8} className={i < rev.rating ? 'text-amber-500' : 'text-slate-800'} fill={i < rev.rating ? 'currentColor' : 'none'}/>)}
                   </div>
                </div>
                <p className="text-sm italic mb-6 text-slate-400 leading-relaxed">"{rev.comment}"</p>
                <div className="flex gap-3">
                   <Button fullWidth size="sm" variant="outline" className="text-red-500 border-red-500/20 hover:bg-red-500/10" onClick={() => handleDeleteReview(rev.id)}>
                      <Trash2 size={14}/> REMOVE REVIEW
                   </Button>
                </div>
             </Card>
           ))}
        </div>
      )}
      
      {/* Admin Back Button */}
      <button onClick={() => window.location.reload()} className="fixed bottom-8 left-8 p-4 bg-white/5 border border-white/10 rounded-full backdrop-blur-xl hover:scale-110 active:scale-95 transition-all">
        <ArrowLeft size={24}/>
      </button>
    </div>
  );
};

export default AdminDashboard;
