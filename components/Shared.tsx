
import React from 'react';

export const Badge: React.FC<{ children: React.ReactNode; color?: string }> = ({ 
  children, 
  color = 'bg-blue-50 text-blue-600 border border-blue-100' 
}) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${color}`}>
    {children}
  </span>
);

export const Button: React.FC<{ 
  children: React.ReactNode; 
  onClick?: () => void; 
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
}> = ({ children, onClick, className = '', variant = 'primary', size = 'md', fullWidth = false, disabled = false }) => {
  const baseStyles = "rounded-2xl font-black transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95";
  
  const sizeStyles = {
    sm: "px-3 py-2 text-[10px] uppercase",
    md: "px-5 py-3 text-xs uppercase",
    lg: "px-8 py-4 text-sm uppercase"
  };

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-500/20",
    secondary: "bg-slate-900 text-white hover:bg-black border border-slate-800",
    outline: "border border-slate-200 text-slate-800 hover:bg-slate-50 bg-white",
    ghost: "text-slate-500 hover:bg-slate-50"
  };
  
  return (
    <button 
      disabled={disabled}
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export const Card: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}> = ({ children, className = '', onClick, style }) => (
  <div 
    onClick={onClick}
    style={style}
    className={`bg-white rounded-[32px] border border-slate-100 overflow-hidden transition-all shadow-[0_4px_20px_rgba(0,0,0,0.03)] ${className}`}
  >
    {children}
  </div>
);
