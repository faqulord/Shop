"use client";
import { useState, useEffect } from 'react';
import { Star, Check, ShoppingCart, Truck, Shield } from 'lucide-react';

export default function Home() {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Űrlap adatok
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', city: '', zip: ''
  });
  const [orderStatus, setOrderStatus] = useState('');

  // --- 1. ADATOK BETÖLTÉSE (Amikor megnyílik az oldal) ---
  useEffect(() => {
    // Termék lekérése
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => console.error("Hiba:", err));
  }, []);

  // --- 2. RENDELÉS BEKÜLDÉSE ---
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setOrderStatus('loading');

    const orderData = {
      customerName: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      zip: formData.zip,
      products: [{ name: product.name, price: product.price, quantity: 1 }],
      totalAmount: product.price
    };

    // Itt küldjük el a rendelést a szervernek
    const res = await fetch('/api/orders', {
      method: 'POST', // FIGYELEM: Ehhez majd kell a POST funkció az API-ba!
      body: JSON.stringify(orderData),
    });

    if (res.ok) {
      setOrderStatus('success');
      // Töröljük az űrlapot
      setFormData({ name: '', email: '', phone: '', address: '', city: '', zip: '' });
    } else {
      setOrderStatus('error');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Bolt betöltése...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Hiba a betöltéskor.</div>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      
      {/* --- HERO SZEKCIÓ (A Termék) --- */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600 tracking-tight">Shop.</h1>
          <a href="#order" className="bg-blue-600 text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-blue-700 transition shadow-md">
            Megrendelem
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          
          {/* BAL OLDAL: Kép */}
          <div className="bg-white p-2 rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden group">
             {/* Akciós címke */}
             {product.discountText && (
               <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10 animate-pulse">
                 {product.discountText}
               </div>
             )}
             <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 relative">
               <img 
                 src={product.imageUrl} 
                 alt={product.name} 
                 className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
               />
             </div>
          </div>

          {/* JOBB OLDAL: Szöveg és Ár */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-2">
                {product.name}
              </h2>
              <div className="flex items-center gap-2 text-yellow-400 text-sm font-bold">
                <div className="flex"><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/></div>
                <span className="text-gray-400">({product.reviewsCount} értékelés)</span>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <p className="text-gray-500 text-sm mb-1 line-through font-medium">Eredeti ár: {product.originalPrice?.toLocaleString()} Ft</p>
              <div className="text-4xl font-extrabold text-blue-600">
                {product.price?.toLocaleString()} Ft
              </div>
              <p className="text-xs text-blue-400 mt-2 font-medium">⚡ Villámgyors szállítás 1-2 munkanap</p>
            </div>

            <p className="text-gray-600 leading-relaxed text-lg">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-white p-3 rounded-xl border border-gray-100 shadow-sm"><Truck size={18} className="text-blue-500"/> Ingyenes szállítás</div>
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-white p-3 rounded-xl border border-gray-100 shadow-sm"><Shield size={18} className="text-blue-500"/> 30 napos garancia</div>
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-white p-3 rounded-xl border border-gray-100 shadow-sm"><Check size={18} className="text-green-500"/> Raktáron</div>
            </div>

            <a href="#order" className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-200 transition transform hover:-translate-y-1">
              Megrendelés Most
            </a>
          </div>
        </div>

        {/* --- RENDELÉS ŰRLAP --- */}
        <div id="order" className="mt-20 max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gray-900 p-6 text-white text-center">
              <h3 className="text-2xl font-bold">Szállítási Adatok</h3>
              <p className="text-gray-400 text-sm mt-1">Töltsd ki a mezőket a rendeléshez</p>
            </div>
            
            <div className="p-8">
              {orderStatus === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={40} className="text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Köszönjük a rendelést!</h3>
                  <p className="text-gray-500">Hamarosan felvesszük veled a kapcsolatot.</p>
                  <button onClick={() => setOrderStatus('')} className="mt-6 text-blue-600 font-bold hover:underline">Új rendelés leadása</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Teljes Név</label>
                    <input required type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Pl. Kiss János" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Cím</label>
                      <input required type="email" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
                        value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="janos@gmail.com" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Telefonszám</label>
                      <input required type="tel" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
                        value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="0630..." />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Szállítási Cím</label>
                    <input required type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
                      value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="Utca, házszám" />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Város</label>
                      <input required type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
                        value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} placeholder="Város" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Irányítószám</label>
                      <input required type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
                        value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})} placeholder="1234" />
                    </div>
                  </div>

                  <button disabled={orderStatus === 'loading'} className="w-full bg-gray-900 hover:bg-black text-white py-4 rounded-xl font-bold text-lg shadow-lg mt-4 flex justify-center items-center gap-2">
                    {orderStatus === 'loading' ? 'Feldolgozás...' : <>Megrendelés Véglegesítése <ShoppingCart size={20}/></>}
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-4">Fizetés utánvétellel a futárnál.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-12 mt-20 text-center">
        <p className="text-gray-500">© 2024 Shop Minden jog fenntartva.</p>
      </footer>
    </div>
  );
}
