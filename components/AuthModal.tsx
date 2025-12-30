
import React, { useState } from 'react';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation: Save to local storage
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: isLogin ? (email.split('@')[0]) : name,
      address: '123 Grit Way, Outpost Delta',
    };
    
    // In a real app, we'd check passwords, etc.
    localStorage.setItem('grit_user', JSON.stringify(mockUser));
    onAuthSuccess(mockUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-md">
      <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="bg-black p-8 text-center relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-white">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
          <div className="w-12 h-12 bg-amber-500 mx-auto flex items-center justify-center rounded mb-4 rotate-3">
            <span className="text-black font-black text-2xl italic">G</span>
          </div>
          <h2 className="text-white text-2xl font-black italic tracking-tighter uppercase">
            {isLogin ? 'BASE CAMP LOGIN' : 'RECRUIT ENROLLMENT'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Full Name</label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-100 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none font-bold"
                placeholder="JACK REACHER"
              />
            </div>
          )}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Email Address</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-100 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none font-bold"
              placeholder="operator@gritbuys.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Security Cipher</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-100 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none font-bold"
              placeholder="••••••••"
            />
          </div>

          <button className="w-full bg-black text-white py-4 rounded-xl font-black tracking-[0.2em] uppercase hover:bg-zinc-800 transition-all">
            {isLogin ? 'AUTHENTICATE' : 'DEPLOY ACCOUNT'}
          </button>

          <p className="text-center text-xs font-bold text-zinc-400">
            {isLogin ? "New to the unit?" : "Already enlisted?"}
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-black hover:text-amber-600 underline"
            >
              {isLogin ? 'Request Access' : 'Return to Login'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
