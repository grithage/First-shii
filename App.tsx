
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import AIShopper from './components/AIShopper';
import AuthModal from './components/AuthModal';
import AccountPortal from './components/AccountPortal';
import { PRODUCTS, CATEGORIES } from './constants';
import { Product, CartItem, User, Order } from './types';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('grit_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('grit_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('grit_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeSub, setActiveSub] = useState<string>('All');

  // Persistence
  useEffect(() => {
    localStorage.setItem('grit_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('grit_orders', JSON.stringify(orders));
  }, [orders]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSub = activeSub === 'All' || p.subCategory === activeSub;
      return matchesSearch && matchesCategory && matchesSub;
    });
  }, [searchTerm, activeCategory, activeSub]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }

    const newOrder: Order = {
      id: `DEP-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: [...cartItems],
      total: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      status: 'Deployed',
    };

    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
    setIsCartOpen(false);
    setIsAccountOpen(true);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('grit_user');
    setIsAccountOpen(false);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header 
        cartCount={cartCount} 
        onCartClick={() => setIsCartOpen(true)}
        onSearch={setSearchTerm}
        user={user}
        onAccountClick={() => user ? setIsAccountOpen(true) : setIsAuthOpen(true)}
      />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative h-[50vh] bg-zinc-900 overflow-hidden">
          <img 
            src="https://picsum.photos/seed/grit-action/1920/1080" 
            alt="Action"
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900/40 to-transparent"></div>
          <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center items-start">
            <div className="space-y-4 max-w-2xl">
              <span className="text-amber-500 font-black tracking-[0.4em] uppercase text-xs flex items-center gap-2">
                <span className="w-8 h-px bg-amber-500"></span>
                Operational Readiness
              </span>
              <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter leading-none uppercase">
                EQUIP YOUR <br/>
                <span className="text-transparent border-b-4 border-amber-600">MISSION</span>
              </h2>
              <p className="text-zinc-400 text-base md:text-lg font-bold max-w-md uppercase tracking-wide">
                Premium grade survival essentials for the uncompromising explorer.
              </p>
            </div>
          </div>
        </section>

        {/* Categorization & Catalog */}
        <section id="shop" className="max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 space-y-12">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6">Inventory Filter</h4>
              <div className="space-y-2">
                <button
                  onClick={() => { setActiveCategory('All'); setActiveSub('All'); }}
                  className={`w-full text-left px-4 py-2 rounded font-black text-xs uppercase tracking-widest transition-all ${activeCategory === 'All' ? 'bg-black text-white' : 'text-zinc-500 hover:bg-zinc-100'}`}
                >
                  All Inventory
                </button>
                {CATEGORIES.map(cat => (
                  <div key={cat.name} className="space-y-1">
                    <button
                      onClick={() => { setActiveCategory(cat.name); setActiveSub('All'); }}
                      className={`w-full text-left px-4 py-2 rounded font-black text-xs uppercase tracking-widest transition-all ${activeCategory === cat.name ? 'bg-zinc-100 text-black' : 'text-zinc-500 hover:text-black'}`}
                    >
                      {cat.name}
                    </button>
                    {activeCategory === cat.name && (
                      <div className="ml-6 space-y-1 border-l border-zinc-200">
                        {cat.sub.map(s => (
                          <button
                            key={s}
                            onClick={() => setActiveSub(s)}
                            className={`w-full text-left pl-4 py-1.5 font-bold text-[10px] uppercase tracking-widest transition-all ${activeSub === s ? 'text-amber-600' : 'text-zinc-400 hover:text-black'}`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-200">
              <h5 className="font-black text-xs uppercase tracking-widest mb-2">Grit Protocol</h5>
              <p className="text-[10px] text-zinc-500 leading-relaxed font-bold">
                Every piece of gear is tested in extreme field conditions before deployment to our catalog.
              </p>
            </div>
          </aside>

          {/* Catalog */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8 border-b border-zinc-100 pb-4">
              <h3 className="text-2xl font-black italic uppercase tracking-tighter">
                {activeCategory} {activeSub !== 'All' ? `/ ${activeSub}` : ''}
              </h3>
              <span className="text-xs font-black text-zinc-400">{filteredProducts.length} ASSETS FOUND</span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-32 bg-zinc-50 rounded-3xl border-2 border-dashed border-zinc-200">
                <i className="fa-solid fa-triangle-exclamation text-4xl text-zinc-300 mb-4 block"></i>
                <p className="text-zinc-500 font-bold uppercase tracking-widest">Target out of range. Refine your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={addToCart} 
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onAuthSuccess={setUser} 
      />

      {user && (
        <AccountPortal 
          isOpen={isAccountOpen} 
          onClose={() => setIsAccountOpen(false)} 
          user={user} 
          orders={orders} 
          onLogout={logout} 
        />
      )}

      <AIShopper products={PRODUCTS} />
    </div>
  );
};

export default App;
