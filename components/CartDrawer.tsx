
import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove, onCheckout }) => {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[60] shadow-2xl flex flex-col transform transition-transform duration-300">
        <div className="p-6 border-b border-zinc-200 flex justify-between items-center bg-zinc-50">
          <h2 className="text-2xl font-black italic tracking-tighter uppercase">MISSION GEAR BAG</h2>
          <button onClick={onClose} className="p-2 hover:bg-zinc-200 rounded-full">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-zinc-300 gap-4">
              <i className="fa-solid fa-parachute-box text-6xl"></i>
              <p className="font-bold text-lg uppercase tracking-widest">Deployment Bag Empty</p>
              <button 
                onClick={onClose}
                className="mt-4 px-8 py-3 bg-black text-white font-black rounded uppercase text-xs tracking-widest"
              >
                Acquire Gear
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="w-20 h-20 rounded-lg bg-zinc-100 overflow-hidden shrink-0 border border-zinc-200">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between mb-1 gap-2">
                    <h4 className="font-bold uppercase text-xs tracking-tight truncate">{item.name}</h4>
                    <button onClick={() => onRemove(item.id)} className="text-zinc-300 hover:text-red-500 shrink-0">
                      <i className="fa-solid fa-trash-can text-sm"></i>
                    </button>
                  </div>
                  <p className="text-amber-600 font-black mb-3 text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                  <div className="flex items-center border border-zinc-200 rounded-lg w-fit overflow-hidden bg-zinc-50">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="px-2 py-0.5 hover:bg-zinc-200 font-bold"
                    >
                      <i className="fa-solid fa-minus text-[10px]"></i>
                    </button>
                    <span className="px-3 py-0.5 font-bold text-xs border-x border-zinc-200 min-w-[32px] text-center">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="px-2 py-0.5 hover:bg-zinc-200 font-bold"
                    >
                      <i className="fa-solid fa-plus text-[10px]"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-zinc-200 bg-zinc-50">
            <div className="flex justify-between items-end mb-6">
              <div className="space-y-1">
                <span className="text-zinc-400 font-black uppercase tracking-widest text-[10px]">Operational Total</span>
                <p className="text-3xl font-black">${total.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black uppercase text-green-600 tracking-widest">Priority Shipping</p>
                <p className="text-[10px] font-bold text-zinc-400 uppercase">Included</p>
              </div>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-black text-white py-5 rounded-xl font-black text-base tracking-[0.2em] hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 uppercase italic"
            >
              Confirm Deployment
              <i className="fa-solid fa-chevron-right text-xs"></i>
            </button>
            <p className="text-center text-[10px] text-zinc-400 mt-6 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
              <i className="fa-solid fa-shield-halved"></i>
              Encrypted Checkout Protocol
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
