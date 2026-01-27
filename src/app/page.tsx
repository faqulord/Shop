"use client";
// Kényszerítjük a frissítést, hogy ne ragadjon be régi verzió
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { useState, useEffect } from 'react';
import { ArrowRight, Gift, Clock, ShieldCheck, Heart, Star, CheckCircle, Truck, CreditCard, ShoppingBag, Users } from 'lucide-react';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ h: 11, m: 59, s: 0 });
  const [loading, setLoading] = useState(false);
  
  // CSOMAG VÁLASZTÓ (1 db vagy 2 db)
  const [selectedPackage, setSelectedPackage] = useState<'single' | 'double'>('single');
  
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', zip: '', city: '', address: '' });

  // ÁRAK
  const prices = {
      single: 12990,
      double: 21990 // 2 db vásárlása esetén olcsóbb!
  };

  // Visszaszámláló
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59 };
        return { h: 11, m: 59, s: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToOrder = () => document.getElementById('order-section')?.scrollIntoView({ behavior: 'smooth' });

  // RENDELÉS LEADÁSA
  const handleSubmit = async (e: any) => {
      e.preventDefault();
      setLoading(true);

      const totalAmount = selectedPackage === 'single' ? prices.single : prices.double;
      const productName = selectedPackage === 'single' ? "Lipses Valentin Csomag (1db)" : "Barátnős Csomag (2db)";

      const orderData = {
          customerName: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: `${formData.zip} ${formData.city}, ${formData.address}`,
          products: [{ name: productName, price: totalAmount, quantity: 1 }],
          totalAmount: totalAmount,
          status: 'Fizetésre vár',
          paymentMethod: 'PayPal/Card'
      };

      try {
        // 1. Mentés az adatbázisba (Admin panelhez)
        await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });

        // 2. Átirányítás PayPalra
        const paypalLink = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=stylefaqu@gmail.com&item_name=${encodeURIComponent(productName)}&amount=${totalAmount}&currency_code=HUF`;
        window.location.href = paypalLink;

      } catch (error) {
          alert("Hiba történt a rendelés feldolgozásakor. Kérlek próbáld újra.");
          setLoading(false);
      }
  };

  return (
    <div className="pb-20 overflow-x-hidden text-[#2d2d2d]">
      
      {/* --- FEJLÉC --- */}
      <nav className="fixed w-full z-50 top-0 bg-white/95 backdrop-blur-md border-b border-[#c59d5f]/30 h-20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-full flex justify-between items-center">
             <div className="flex flex-col">
                 <span className="font-serif text-2xl md:text-3xl font-bold text-[#c59d5f] tracking-tight">LipsesHungary</span>
                 <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-500">Prémium Ajakápolás</span>
             </div>
             
             <button onClick={scrollToOrder} className="hidden md:flex btn-primary px-6 py-2 rounded-full shadow-md items-center gap-2 text-sm">
                 <Heart size={16} fill="white" /> Megrendelem
             </button>
        </div>
      </nav>

      {/* --- HERO SZEKCIÓ --- */}
      <section className="pt-32 pb-16 px-4">
         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             
             {/* Bal: Szöveg */}
             <div className="text-center md:text-left space-y-6">
                 
                 <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow border border-[#c59d5f]/50 animate-pulse">
                     <Gift size={18} className="text-[#c59d5f]" />
                     <span className="text-[#c59d5f] font-bold text-sm uppercase">Valentin Napi Akció: Feb 10-ig!</span>
                 </div>

                 <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#2d2d2d] leading-[1.1]">
                     NYERJ AZONNALI <br/>
                     <span className="text-[#c59d5f]">AJAKDÚSÍTÁST!</span>
                 </h1>

                 <p className="text-gray-600 text-lg leading-relaxed">
                     Felejtsd el a fájdalmas tűszúrásokat! A Lipses technológia sűrített levegővel varázsol telt ajkakat otthon. <br/>
                     <span className="font-bold text-[#c59d5f]">Most ajándék díszcsomagolásban!</span>
                 </p>

                 {/* Visszaszámláló */}
                 <div className="glass-panel p-5 rounded-xl inline-block">
                      <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                          <Clock size={16} className="text-gray-500"/>
                          <span className="text-xs font-bold text-gray-500 uppercase">Akció vége:</span>
                      </div>
                      <div className="flex gap-4 font-mono text-3xl font-bold text-[#c59d5f]">
                          <div>{timeLeft.h}<span className="text-xs block text-gray-400 font-sans">Óra</span></div>:
                          <div>{timeLeft.m}<span className="text-xs block text-gray-400 font-sans">Perc</span></div>:
                          <div>{timeLeft.s}<span className="text-xs block text-gray-400 font-sans">Mp</span></div>
                      </div>
                 </div>

                 <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                     <button onClick={scrollToOrder} className="btn-primary text-white text-lg px-8 py-4 rounded-full shadow-xl flex items-center justify-center gap-2">
                         Kérem a Csomagot <ArrowRight />
                     </button>
                 </div>
                 
                 <div className="flex items-center justify-center md:justify-start gap-4 text-xs text-gray-500 font-semibold uppercase tracking-wider">
                    <span className="flex items-center gap-1"><Truck size={14}/> 1 Napos Szállítás</span>
                    <span className="flex items-center gap-1"><ShieldCheck size={14}/> Garancia</span>
                 </div>
             </div>

             {/* Jobb: TERMÉK KÉP (FIX kozmetikai csomag) */}
             <div className="relative flex justify-center mt-8 md:mt-0">
                 <div className="relative z-10 w-full max-w-md group">
                    <img 
                        src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=800&auto=format&fit=crop" 
                        className="w-full rounded-[2rem] shadow-2xl border-4 border-white group-hover:scale-105 transition duration-700"
                        alt="Lipses Valentin Csomag"
                    />
                    
                    {/* Badgek */}
                    <div className="absolute top-6 -left-4 bg-white px-4 py-2 rounded-full shadow-lg border border-[#c59d5f] flex items-center gap-2">
                        <span className="text-[#c59d5f]">⏳</span> 
                        <span className="font-bold text-gray-700 text-xs">12 ÓRÁS HATÁS</span>
                    </div>
                    <div className="absolute bottom-10 -right-4 bg-white px-4 py-2 rounded-full shadow-lg border border-[#c59d5f] flex items-center gap-2">
                        <span className="text-red-500">🚫</span> 
                        <span className="font-bold text-gray-700 text-xs">TŰ NÉLKÜL</span>
                    </div>
                 </div>
                 
                 {/* Háttér effekt */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#c59d5f]/20 blur-[80px] rounded-full -z-10"></div>
             </div>
         </div>
      </section>

      {/* --- VÉLEMÉNYEK --- */}
      <section className="py-16 bg-white/60 backdrop-blur-sm border-y border-[#c59d5f]/10">
          <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-center text-3xl font-serif font-bold text-gray-800 mb-10">
                  Vásárlóink <span className="text-[#c59d5f]">Imádják</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                      { name: "Varga Niki", text: "Azt hittem kamu, de tényleg működik! A párom imádta." },
                      { name: "Kovács Bea", text: "Nagyon szép a csomagolás, ajándéknak tökéletes volt." },
                      { name: "Tóth Eszter", text: "Végre nem kell tűszúrás. Kicsit bizserget, de szuper!" }
                  ].map((review, i) => (
                      <div key={i} className="glass-panel p-6 rounded-2xl shadow-sm">
                          <div className="flex text-[#c59d5f] mb-2"><Star fill="#c59d5f" size={16}/><Star fill="#c59d5f" size={16}/><Star fill="#c59d5f" size={16}/><Star fill="#c59d5f" size={16}/><Star fill="#c59d5f" size={16}/></div>
                          <p className="text-gray-600 text-sm italic mb-4">"{review.text}"</p>
                          <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-[#c59d5f] rounded-full text-white flex items-center justify-center font-bold text-xs">{review.name[0]}</div>
                              <span className="font-bold text-sm text-gray-800">{review.name}</span>
                              <CheckCircle size={14} className="text-green-500 ml-auto" />
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* --- RENDELÉS ŰRLAP --- */}
      <div id="order-section" className="px-4 py-16">
          <div className="max-w-4xl mx-auto glass-panel p-8 md:p-12 rounded-[2rem] shadow-2xl">
              <div className="text-center mb-8">
                  <span className="text-[#c59d5f] font-bold text-sm tracking-widest uppercase">Biztonságos Fizetés</span>
                  <h2 className="text-3xl font-serif font-bold text-gray-800 mt-2">Csomag Kiválasztása</h2>
              </div>

              {/* 1. CSOMAG VÁLASZTÓ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  {/* Szimpla Csomag */}
                  <div 
                    onClick={() => setSelectedPackage('single')}
                    className={`cursor-pointer border-2 rounded-2xl p-6 relative transition ${selectedPackage === 'single' ? 'border-[#c59d5f] bg-white shadow-lg' : 'border-gray-200 bg-white/50 hover:border-[#c59d5f]/50'}`}
                  >
                      <div className="flex items-center gap-3 mb-2">
                         <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedPackage === 'single' ? 'border-[#c59d5f]' : 'border-gray-400'}`}>
                             {selectedPackage === 'single' && <div className="w-3 h-3 bg-[#c59d5f] rounded-full"></div>}
                         </div>
                         <h3 className="font-bold text-lg">1 db Lipses Pen</h3>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">Alap csomag kipróbáláshoz.</p>
                      <p className="text-2xl font-bold text-[#c59d5f]">12.990 Ft</p>
                  </div>

                  {/* Barátnős Csomag */}
                  <div 
                    onClick={() => setSelectedPackage('double')}
                    className={`cursor-pointer border-2 rounded-2xl p-6 relative transition ${selectedPackage === 'double' ? 'border-[#c59d5f] bg-white shadow-lg' : 'border-gray-200 bg-white/50 hover:border-[#c59d5f]/50'}`}
                  >
                      <div className="absolute -top-3 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce">
                          LEGJOBB AJÁNLAT
                      </div>
                      <div className="flex items-center gap-3 mb-2">
                         <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedPackage === 'double' ? 'border-[#c59d5f]' : 'border-gray-400'}`}>
                             {selectedPackage === 'double' && <div className="w-3 h-3 bg-[#c59d5f] rounded-full"></div>}
                         </div>
                         <h3 className="font-bold text-lg">Barátnős Csomag (2 db)</h3>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">Rendelj a barátnőddel és spórolj!</p>
                      <div className="flex items-center gap-3">
                          <p className="text-gray-400 line-through text-lg">25.980 Ft</p>
                          <p className="text-2xl font-bold text-[#c59d5f]">{prices.double.toLocaleString()} Ft</p>
                      </div>
                  </div>
              </div>

              {/* 2. ADATOK KITÖLTÉSE */}
              <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <input required type="text" placeholder="Teljes név" className="w-full bg-white border border-gray-300 p-4 rounded-xl focus:border-[#c59d5f] focus:ring-[#c59d5f] outline-none" onChange={e => setFormData({...formData, name: e.target.value})} />
                     <input required type="tel" placeholder="Telefonszám" className="w-full bg-white border border-gray-300 p-4 rounded-xl focus:border-[#c59d5f] focus:ring-[#c59d5f] outline-none" onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  
                  <input required type="email" placeholder="Email Cím" className="w-full bg-white border border-gray-300 p-4 rounded-xl focus:border-[#c59d5f] focus:ring-[#c59d5f] outline-none" onChange={e => setFormData({...formData, email: e.target.value})} />
                  
                  <div className="grid grid-cols-3 gap-4">
                      <input required type="text" placeholder="Ir.szám" className="col-span-1 w-full bg-white border border-gray-300 p-4 rounded-xl focus:border-[#c59d5f] outline-none" onChange={e => setFormData({...formData, zip: e.target.value})} />
                      <input required type="text" placeholder="Város" className="col-span-2 w-full bg-white border border-gray-300 p-4 rounded-xl focus:border-[#c59d5f] outline-none" onChange={e => setFormData({...formData, city: e.target.value})} />
                  </div>
                  <input required type="text" placeholder="Utca, házszám" className="w-full bg-white border border-gray-300 p-4 rounded-xl focus:border-[#c59d5f] outline-none" onChange={e => setFormData({...formData, address: e.target.value})} />

                  {/* Fizetési gomb */}
                  <button type="submit" disabled={loading} className="w-full btn-primary text-white font-bold text-xl py-5 rounded-xl shadow-lg mt-6 flex items-center justify-center gap-3">
                      {loading ? 'Feldolgozás...' : (
                          <>
                            {selectedPackage === 'single' ? '12.990 Ft' : '21.990 Ft'} • Fizetés <ArrowRight />
                          </>
                      )}
                  </button>
                  
                  {/* Trust Badgek */}
                  <div className="text-center mt-6">
                      <p className="text-xs text-gray-500 mb-2 font-bold uppercase">Biztonságos Fizetés:</p>
                      <div className="flex justify-center gap-6 opacity-60 hover:opacity-100 transition grayscale hover:grayscale-0">
                           <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-6" alt="PayPal"/>
                           <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" alt="Mastercard"/>
                           <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" className="h-6" alt="Visa"/>
                      </div>
                      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                          <ShieldCheck size={14} className="text-[#c59d5f]"/> 100% Pénzvisszafizetési Garancia
                      </div>
                  </div>
              </form>
          </div>
      </div>

    </div>
  );
}