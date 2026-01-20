"use client";
import { useState, useEffect } from 'react';
import { Star, Check, Truck, Shield, ArrowRight, Heart } from 'lucide-react';

export default function Home() {
  const [product, setProduct] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Űrlap adatok
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', city: '', zip: ''
  });
  const [orderStatus, setOrderStatus] = useState('');

  // --- ADATOK BETÖLTÉSE ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Termék adatainak lekérése
        const prodRes = await fetch('/api/products');
        const prodData = await prodRes.json();
        setProduct(prodData);

        // 2. Vélemények lekérése
        const revRes = await fetch('/api/reviews');
        const revData = await revRes.json();
        setReviews(revData);
        
        setLoading(false);
      } catch (err) {
        console.error("Hiba az adatok betöltésekor", err);
      }
    };
    fetchData();
  }, []);

  // Gördülés a rendeléshez (Ez növeli az eladásokat!)
  const scrollToOrder = () => {
    document.getElementById('order-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Rendelés beküldése (Egyelőre szimuláció, hogy lásd a működést)
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setOrderStatus('loading');
    
    setTimeout(() => {
        setOrderStatus('success');
        setFormData({ name: '', email: '', phone: '', address: '', city: '', zip: '' });
    }, 2000);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500 font-medium">Betöltés...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Hiba történt. Frissítsd az oldalt!</div>;

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      
      {/* --- FEJLÉC --- */}
      <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <span className="text-2xl font-extrabold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Lipses.
          </span>
          <button onClick={scrollToOrder} className="bg-black text-white px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-lg flex items-center gap-2">
            Megrendelem <ArrowRight size={16} />
          </button>
        </div>
      </nav>

      <main>
        {/* --- TERMÉK BEMUTATÓ (Hero) --- */}
        <section className="max-w-6xl mx-auto px-4 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* KÉP (Bal oldal) */}
            <div className="relative animate-fade-in-up">
               {/* Ár buborék */}
               <div className="absolute -top-6 -right-2 bg-white p-4 rounded-2xl shadow-xl z-10 border border-gray-100 animate-bounce-slow">
                 <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Csak most</p>
                 <p className="text-3xl font-black text-pink-600">{product.price.toLocaleString()} Ft</p>
               </div>
               
               {/* Termék kép keretben */}
               <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-gray-100 relative group border-4 border-white">
                 <img 
                   src={product.imageUrl} 
                   alt={product.name} 
                   className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                   onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=800"; }}
                 />
               </div>
            </div>

            {/* SZÖVEG ÉS ÉRTÉKESÍTÉS (Jobb oldal) */}
            <div className="space-y-8 animate-fade-in-up delay-100">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  {product.discountText && (
                    <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                      {product.discountText}
                    </span>
                  )}
                  <div className="flex text-yellow-400 items-center">
                    {[1,2,3,4,5].map(i => <Star key={i} fill="currentColor" size={18}/>)}
                    <span className="text-gray-400 text-sm ml-2 font-medium underline decoration-gray-300">
                      {reviews.length} elégedett vásárló
                    </span>
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
                  {product.name}
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed font-light">
                  {product.description}
                </p>
              </div>

              {/* --- ELŐNYÖK (Ami eladja a terméket) --- */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 text-lg">
                  <Heart className="text-pink-500 fill-pink-500" size={24} />
                  Miért imádják a nők?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0"><Check size={16} className="text-green-600"/></div>
                    <span className="font-medium text-lg">Hialuronsavval tölti fel az ajkakat</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0"><Check size={16} className="text-green-600"/></div>
                    <span className="font-medium text-lg">Azonnali dúsító hatás (bizsergéssel)</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0"><Check size={16} className="text-green-600"/></div>
                    <span className="font-medium text-lg">Akár 12 órán át tartó hidratálás</span>
                  </li>
                </ul>
              </div>

              {/* Akció gomb */}
              <div className="pt-4">
                <button onClick={scrollToOrder} className="w-full bg-gray-900 text-white px-8 py-5 rounded-2xl font-bold text-xl hover:bg-black transition shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 transform hover:-translate-y-1">
                  Kérem a csomagot <ArrowRight size={24} />
                </button>
                <div className="flex items-center gap-4 text-sm text-gray-500 justify-center mt-4">
                   <span className="flex items-center gap-1"><Shield size={16} className="text-green-500"/> 30 napos garancia</span>
                   <span className="flex items-center gap-1"><Truck size={16} className="text-blue-500"/> Ingyenes szállítás</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- VÉLEMÉNYEK (Ez építi a bizalmat) --- */}
        <section className="bg-white py-16 border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Mások mondták rólunk 💬</h2>
              <p className="text-gray-500 mt-2">Valós vásárlói visszajelzések</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.length > 0 ? reviews.map((review, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition duration-300">
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(review.rating || 5)].map((_, i) => <Star key={i} fill="currentColor" size={16}/>)}
                    </div>
                    {review.verified && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold ml-2">ELLENŐRZÖTT</span>}
                  </div>
                  
                  <p className="text-gray-700 mb-6 italic leading-relaxed">"{review.text}"</p>
                  
                  {/* Kép a kommenthez */}
                  {review.imageUrl && review.hasPhoto && (
                    <div className="mb-4 w-full h-40 rounded-xl overflow-hidden shadow-sm">
                       <img src={review.imageUrl} alt="Review" className="w-full h-full object-cover hover:scale-105 transition duration-500"/>
                    </div>
                  )}

                  <div className="flex items-center gap-3 border-t border-gray-200 pt-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center font-bold text-white shadow-md">
                      {review.author?.charAt(0) || "V"}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-900">{review.author || "Vásárló"}</p>
                      <p className="text-xs text-gray-500">{review.date || 'Nemrég vásárolt'}</p>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="col-span-3 text-center py-10 bg-gray-50 rounded-xl">
                    <p className="text-gray-500">A vélemények betöltése folyamatban...</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* --- MEGRENDELÉS ŰRLAP --- */}
        <div id="order-section" className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden ring-1 ring-gray-100">
              
              {/* Űrlap Fejléc */}
              <div className="bg-gray-900 p-8 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500"></div>
                <h3 className="text-3xl font-bold mb-2">Rendelés Leadása 📦</h3>
                <p className="text-gray-300">Töltsd ki az adataidat, és holnap küldjük a futárt!</p>
              </div>
              
              <div className="p-8 md:p-10">
                {orderStatus === 'success' ? (
                  <div className="text-center py-12 animate-fade-in">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                      <Check size={48} className="text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Köszönjük a rendelést! 🎉</h3>
                    <p className="text-gray-500 mb-6">A csomagodat összekészítjük. Emailben küldtük a visszaigazolást.</p>
                    <button onClick={() => setOrderStatus('')} className="text-blue-600 font-bold hover:underline">
                        Új rendelés leadása
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    <div className="space-y-4">
                       <div>
                         <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 mb-1 block">Teljes Név</label>
                         <input required type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none transition font-medium" 
                           value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Pl. Minta Éva" />
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div>
                             <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 mb-1 block">Email Cím</label>
                             <input required type="email" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none transition font-medium" 
                               value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="eva@gmail.com" />
                           </div>
                           <div>
                             <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 mb-1 block">Telefonszám</label>
                             <input required type="tel" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none transition font-medium" 
                               value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="06 30 123 4567" />
                           </div>
                       </div>
                       
                       <div>
                         <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 mb-1 block">Szállítási Cím (Házhozszállítás)</label>
                         <input required type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none transition font-medium" 
                           value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="Város, Utca, Házszám" />
                       </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                      <div className="flex justify-between items-center mb-6 bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <span className="text-blue-800 font-medium">Fizetendő összeg (Utánvét):</span>
                        <span className="text-2xl font-black text-blue-700">{product.price.toLocaleString()} Ft</span>
                      </div>
                      
                      <button disabled={orderStatus === 'loading'} className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white py-5 rounded-xl font-bold text-xl shadow-lg transform active:scale-95 transition flex justify-center items-center gap-3">
                        {orderStatus === 'loading' ? 'Feldolgozás...' : <>Megrendelés Véglegesítése <Check size={24}/></>}
                      </button>
                      <p className="text-center text-xs text-gray-400 mt-4 flex justify-center items-center gap-1">
                        <Shield size={12}/> Az adataidat 100% biztonságban kezeljük.
                      </p>
                    </div>

                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-12 mt-12 text-center">
        <p className="text-gray-500 text-sm">© 2024 Lipses Shop. Minden jog fenntartva.</p>
      </footer>
    </div>
  );
}
