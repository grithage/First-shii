
import React from 'react';
import { User } from '../types';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onSearch: (term: string) => void;
  user: User | null;
  onAccountClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick, onSearch, user, onAccountClick }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.location.hash = '#'}>
          <div className="w-10 h-10 bg-black flex items-center justify-center rounded transition-transform group-hover:rotate-12">
            <span className="text-white font-black text-xl italic">G</span>
          </div>
          <h1 className="text-2xl font-black tracking-tighter uppercase hidden sm:block italic">GRITBUYS</h1>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-xl relative hidden md:block">
          <input
            type="text"
            placeholder="Scan inventory (gear, tech, apparel)..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-100 border-transparent focus:bg-white focus:ring-2 focus:ring-black rounded-lg transition-all outline-none font-medium"
          />
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"></i>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button 
            onClick={onAccountClick}
            className="flex items-center gap-2 font-black text-xs tracking-widest hover:text-amber-600 transition-colors uppercase"
          >
            <i className="fa-solid fa-user-circle text-xl"></i>
            <span className="hidden sm:inline">{user ? user.name.split(' ')[0] : 'LOGIN'}</span>
          </button>
          
          <button 
            onClick={onCartClick}
            className="relative p-2 hover:bg-zinc-100 rounded-full transition-colors"
          >
            <i className="fa-solid fa-truck-ramp-box text-xl"></i>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
