
import React, { useState, useRef, useEffect } from 'react';
import { LANGUAGES, TRANSLATIONS, LOGO_SVG } from '../constants';
import { UserRole, LanguageCode, Gender } from '../types';
import { Button, Card } from './Shared';
import { Phone, ArrowLeft, User, Lock, Loader2, QrCode, Scissors, ChevronRight, Camera, CheckCircle2 } from 'lucide-react';

interface AuthProps {
  onComplete: (role: UserRole, lang: LanguageCode) => void;
}

type AuthStep = 'language' | 'login' | 'signup' | 'otp' | 'idScan' | 'payment' | 'verifying';

const Auth: React.FC<AuthProps> = ({ onComplete }) => {
  const [step, setStep] = useState<AuthStep>('language');
  const [lang, setLang] = useState<LanguageCode>('en');
  const [isBarberFlow, setIsBarberFlow] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const t = (key: string) => TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en']?.[key] || key;

  useEffect(() => {
    if (step === 'payment') {
      // Simulate automatic payment detection after 4 seconds
      const timer = setTimeout(() => {
        setStep('verifying');
        setTimeout(() => {
          onComplete(UserRole.BARBER, lang);
        }, 2000);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleLogin = () => {
    if (phone === 'owner43' && password === 'Hospital@43') {
      onComplete(UserRole.BARBER, lang);
    } else if (phone === 'admin43' && password === 'Hospital@43') {
      onComplete(UserRole.ADMIN, lang);
    } else {
      onComplete(UserRole.CUSTOMER, lang);
    }
  };

  const handleBack = () => {
    if (step === 'login') setStep('language');
    else if (step === 'signup') setStep('login');
    else if (step === 'otp') setStep('signup');
    else if (step === 'idScan') setStep('otp');
    else if (step === 'payment') setStep('idScan');
  };

  return (
    <div className="min-h-screen bg-[#121212] p-8 flex flex-col relative text-white">
      {step !== 'language' && step !== 'verifying' && (
        <button onClick={handleBack} className="absolute top-8 left-8 p-3 bg-[#1e1e1e] rounded-full border border-white/10 z-20 hover:scale-110 active:scale-95 transition-all">
          <ArrowLeft size={24} />
        </button>
      )}

      {step === 'language' && (
        <div className="flex-1 flex flex-col items-center justify-center max-w-sm mx-auto w-full">
          <div className="w-24 h-24 mb-10 drop-shadow-2xl" dangerouslySetInnerHTML={{ __html: LOGO_SVG }} />
          <h1 className="text-4xl font-black mb-12 tracking-tighter italic uppercase text-center">REPY AI</h1>
          <div className="w-full space-y-4">
            {LANGUAGES.map((l) => (
              <Card 
                key={l.code} 
                onClick={() => { setLang(l.code); setStep('login'); }} 
                className="p-8 bg-[#1a1a1a] border-white/5 hover:border-blue-500/50 cursor-pointer flex justify-between items-center group transition-all"
              >
                <div>
                  <div className="text-2xl font-black group-hover:text-blue-500 transition-colors">{l.nativeName}</div>
                  <div className="text-slate-600 text-[10px] font-black uppercase tracking-widest mt-1">{l.name}</div>
                </div>
                <ChevronRight className="text-slate-800 group-hover:text-blue-500 transition-colors" />
              </Card>
            ))}
          </div>
        </div>
      )}

      {step === 'login' && (
        <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
          <div className="w-16 h-16 mb-8 drop-shadow-lg" dangerouslySetInnerHTML={{ __html: LOGO_SVG }} />
          <h1 className="text-4xl font-black mb-2 tracking-tighter italic uppercase">{t('welcome')}</h1>
          <p className="text-slate-600 mb-10 text-[10px] font-black uppercase tracking-[0.3em]">REPY Partner Ecosystem</p>
          <div className="space-y-4">
             <input className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl py-6 px-7 outline-none focus:border-blue-600 font-bold shadow-2xl transition-all" placeholder={t('phone')} value={phone} onChange={e => setPhone(e.target.value)} />
             <input type="password" className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl py-6 px-7 outline-none focus:border-blue-600 font-bold shadow-2xl transition-all" placeholder={t('password')} value={password} onChange={e => setPassword(e.target.value)} />
             <Button fullWidth onClick={handleLogin} className="bg-gradient-to-r from-blue-600 to-indigo-600 py-6 mt-6 font-black text-lg rounded-[28px] shadow-2xl">LOGIN</Button>
             <button onClick={() => { setIsBarberFlow(true); setStep('signup'); }} className="w-full text-center text-blue-500 font-black mt-8 uppercase text-[11px] tracking-[0.2em] underline decoration-blue-500/30 hover:text-blue-400">REGISTER NEW SHOP</button>
          </div>
        </div>
      )}

      {step === 'signup' && (
        <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
          <h1 className="text-3xl font-black mb-10 tracking-tighter uppercase italic">PARTNER ONBOARDING</h1>
          <div className="space-y-4">
             <input className="w-full bg-[#1a1a1a] border border-white/10 rounded-2xl py-6 px-7 font-bold outline-none" placeholder="Business / Shop Name" />
             <input className="w-full bg-[#1a1a1a] border border-white/10 rounded-2xl py-6 px-7 font-bold outline-none" placeholder="Primary Mobile Number" />
             <Button fullWidth onClick={() => setStep('otp')} className="bg-blue-600 py-6 mt-8 font-black rounded-[28px]">GET VERIFICATION CODE</Button>
          </div>
        </div>
      )}

      {step === 'otp' && (
        <div className="flex-1 flex flex-col justify-center text-center max-w-sm mx-auto">
          <h1 className="text-3xl font-black mb-2 tracking-tighter italic">SECURITY CHECK</h1>
          <p className="text-slate-600 mb-12 uppercase text-[10px] font-black tracking-[0.2em]">Enter the 4-digit code sent to your phone</p>
          <input className="w-full bg-[#1a1a1a] text-6xl text-center py-10 border-white/5 rounded-[40px] text-blue-600 tracking-[0.5em] outline-none shadow-2xl" placeholder="----" maxLength={4} onChange={e => {
            if (e.target.value.length === 4) setStep(isBarberFlow ? 'idScan' : 'role' as any);
          }} />
          <Button onClick={() => setStep(isBarberFlow ? 'idScan' : 'role' as any)} className="bg-blue-600 py-6 mt-12 font-black rounded-[28px]">VERIFY & CONTINUE</Button>
        </div>
      )}

      {step === 'idScan' && (
        <div className="flex-1 flex flex-col justify-center items-center max-w-sm mx-auto w-full">
          <h1 className="text-2xl font-black mb-10 tracking-tighter uppercase italic">IDENTITY VERIFICATION</h1>
          <div className="w-full aspect-video bg-[#1a1a1a] rounded-[48px] border-4 border-dashed border-white/5 flex flex-col items-center justify-center p-12 mb-10 shadow-2xl group hover:border-blue-600 transition-all">
             <Camera className="text-blue-600 mb-6 group-hover:scale-110 transition-transform" size={64} />
             <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest text-center">Scan Aadhar or Trade License</p>
          </div>
          <Button fullWidth onClick={() => setStep('payment')} className="bg-blue-600 py-6 font-black rounded-[28px]">PROCEED TO ACTIVATION</Button>
        </div>
      )}

      {step === 'payment' && (
        <div className="flex-1 flex flex-col items-center justify-center max-w-sm mx-auto w-full animate-in fade-in duration-500">
          <h1 className="text-3xl font-black mb-2 italic tracking-tighter uppercase">ACTIVATE SHOP</h1>
          <p className="text-slate-600 mb-12 text-center text-[10px] font-black uppercase tracking-widest">Pay ₹1 to activate. Automatic detection ON.</p>
          <div className="bg-white p-10 rounded-[56px] mb-12 shadow-[0_0_80px_rgba(255,255,255,0.15)] animate-pulse">
             <QrCode size={180} className="text-black" />
          </div>
          <div className="flex items-center gap-3 text-blue-500">
             <Loader2 className="animate-spin" size={20} />
             <p className="text-[10px] font-black uppercase tracking-widest">Waiting for payment...</p>
          </div>
        </div>
      )}

      {step === 'verifying' && (
        <div className="flex-1 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-300">
          <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-8 border border-green-500/20 shadow-2xl">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-3xl font-black mb-4 tracking-tighter uppercase italic">PAYMENT DETECTED</h2>
          <p className="text-slate-600 font-black uppercase tracking-widest text-[10px]">Your shop is now active on REPY Network.</p>
        </div>
      )}
    </div>
  );
};

export default Auth;
