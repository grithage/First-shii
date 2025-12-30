
import React, { useState } from 'react';
import { User, Order } from '../types';

interface AccountPortalProps {
  user: User;
  orders: Order[];
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const AccountPortal: React.FC<AccountPortalProps> = ({ user, orders, onLogout, isOpen, onClose }) => {
  const [tab, setTab] = useState<'profile' | 'orders'>('profile');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-md">
      <div className="bg-white w-full max-w-4xl h-[80vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in slide-in-from-bottom-10 duration-300">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-zinc-950 text-white p-8 flex flex-col">
          <div className="mb-12">
            <p className="text-[10px] font-black tracking-[0.3em] text-amber-500 uppercase mb-2">Authenticated User</p>
            <h2 className="text-2xl font-black italic tracking-tighter uppercase leading-none">{user.name}</h2>
          </div>

          <nav className="flex-1 space-y-2">
            <button 
              onClick={() => setTab('profile')}
              className={`w-full text-left px-4 py-3 rounded-lg font-black text-xs tracking-widest uppercase transition-all flex items-center gap-3 ${tab === 'profile' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <i className="fa-solid fa-user-shield w-5"></i>
              Profile
            </button>
            <button 
              onClick={() => setTab('orders')}
              className={`w-full text-left px-4 py-3 rounded-lg font-black text-xs tracking-widest uppercase transition-all flex items-center gap-3 ${tab === 'orders' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <i className="fa-solid fa-box-archive w-5"></i>
              Deployments
              {orders.length > 0 && (
                <span className="ml-auto bg-amber-600 text-white text-[10px] px-2 py-0.5 rounded-full">{orders.length}</span>
              )}
            </button>
          </nav>

          <button 
            onClick={onLogout}
            className="mt-auto flex items-center gap-3 text-zinc-500 hover:text-red-500 font-black text-xs tracking-widest uppercase transition-colors p-4"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            Terminates Session
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 bg-zinc-50 flex flex-col relative">
          <button onClick={onClose} className="absolute top-6 right-6 text-zinc-400 hover:text-black z-10">
            <i className="fa-solid fa-xmark text-2xl"></i>
          </button>

          <div className="flex-1 overflow-y-auto p-12">
            {tab === 'profile' ? (
              <div className="max-w-xl space-y-12">
                <header>
                  <h3 className="text-3xl font-black italic tracking-tighter uppercase mb-2">Field Profile</h3>
                  <div className="w-12 h-1.5 bg-black"></div>
                </header>
                
                <div className="grid gap-8">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Comm-Link (Email)</p>
                    <p className="font-bold text-lg">{user.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Deployment Address</p>
                    <p className="font-bold text-lg">{user.address}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Security Status</p>
                    <div className="flex items-center gap-2 text-green-600 font-bold">
                      <i className="fa-solid fa-circle-check"></i>
                      VERIFIED OPERATOR
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-12">
                <header>
                  <h3 className="text-3xl font-black italic tracking-tighter uppercase mb-2">Previous Deployments</h3>
                  <div className="w-12 h-1.5 bg-black"></div>
                </header>

                {orders.length === 0 ? (
                  <div className="text-center py-20 text-zinc-300">
                    <i className="fa-solid fa-parachute-box text-6xl mb-6"></i>
                    <p className="font-bold uppercase tracking-widest">No mission history recorded.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map(order => (
                      <div key={order.id} className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between gap-6">
                        <div className="space-y-1">
                          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Mission ID: {order.id}</p>
                          <p className="font-bold">{order.date}</p>
                          <p className="text-sm text-zinc-500">{order.items.length} Units in Drop</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest ${
                            order.status === 'Deployed' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {order.status}
                          </span>
                          <p className="text-xl font-black">${order.total.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPortal;
