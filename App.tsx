
import React, { useState } from 'react';
import CustomerView from './components/CustomerView';
import BarberDashboard from './components/BarberDashboard';
import AdminDashboard from './components/AdminDashboard';
import Auth from './components/Auth';
import IntroAnimation from './components/IntroAnimation';
import { UserRole, LanguageCode } from './types';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [authData, setAuthData] = useState<{ role: UserRole, lang: LanguageCode } | null>(null);

  const handleAuthComplete = (role: UserRole, lang: LanguageCode) => {
    setAuthData({ role, lang });
  };

  const handleLogout = () => {
    setAuthData(null);
  };

  if (showIntro) {
    return <IntroAnimation onComplete={() => setShowIntro(false)} />;
  }

  if (!authData) {
    return <Auth onComplete={handleAuthComplete} />;
  }

  return (
    <div className="max-w-[500px] mx-auto min-h-screen bg-[#F8F9FA] shadow-2xl relative overflow-hidden font-sans border-x border-slate-200">
      {authData.role === UserRole.ADMIN ? (
        <AdminDashboard />
      ) : authData.role === UserRole.CUSTOMER ? (
        <CustomerView lang={authData.lang} />
      ) : (
        <BarberDashboard lang={authData.lang} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;
