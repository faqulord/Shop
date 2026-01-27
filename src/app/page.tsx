"use client";
import { useState, useEffect } from 'react';
import { ArrowRight, Gift, Clock, ShieldCheck, Star, Heart, CheckCircle } from 'lucide-react';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ h: 11, m: 59, s: 0 });
  const [loading, setLoading] = useState(false);

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

  // Egyszerűsített rendelés
  const handleSubmit = (e: any) => {
      e.preventDefault();
      setLoading(true);
      // Szimulált PayPal átirányítás
      setTimeout(() => {
        window.location.href = "https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=stylefaqu@gmail.com&item_name=Lipses_Valentin_Csomag&amount=12990&currency_code=HUF";
      }, 1500);
  };

  return (
    <div className="pb-20">
      
      {/* --- 1. FEJLÉC (LOGÓ) --- */}
      <nav className="fixed w-full z-50 top-0 bg-white/90 backdrop-blur-md border-b border-[#c59d5f]/30 h-20 shadow-sm flex items-center">
        <div className="max-w-6xl mx-auto px-4 w-full flex justify-between items-center">
             {/* Logó szövegesen (de stílusosan) */}
             <div className="flex flex-col">
                 <h1 className="text-2xl md:text-3xl font-bold text-[#c59d5f] tracking-wide font-serif">LipsesHungary</h1>
                 <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Prémium Ajakápolás</span>
             </div>
             
             <button onClick={scrollToOrder} className="hidden md:flex btn-gold px-6 py-2 rounded-full items-center gap-2 text-sm shadow-md">
                 <Heart size={16} fill="white" /> Rendelés
             </button>
        </div>
      </nav>

      {/* --- 2. HERO SZEKCIÓ (FŐOLDAL) --- */}
      <section className="pt-32 pb-12 px-4">
         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             
             {/* Bal: Szöveg */}
             <div className="text-center md:text-left space-y-6">
                 
                 {/* Címke */}
                 <div className="inline-flex items-center gap-2 bg-white px-5 py-2 rounded-full shadow border border-[#c59d5f] animate-pulse">
                     <Gift size={20} className="text-[#c59d5f]" />
                     <span className="text-[#c59d5f] font-bold text-sm uppercase">Valentin Napi Akció</span>
                 </div>

                 {/* Főcím */}
                 <h1 className="text-4xl md:text-6xl font-bold text-[#4a4a4a] leading-tight">
                     NYERJ AZONNALI <br/>
                     <span className="text-[#c59d5f]">AJAKDÚSÍTÁST!</span>
                 </h1>

                 {/* Leírás */}
                 <p className="text-gray-600 text-lg">
                     Nincs többé fájdalmas szájfeltöltés! A Lipses technológia otthonodba hozza a telt ajkakat. <br/>
                     <span className="font-bold text-[#c59d5f]">Most ajándék díszcsomagolásban!</span>
                 </p>

                 {/* Visszaszámláló */}
                 <div className="glass-card p-4 rounded-xl inline-block">
                      <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                          <Clock size={16} className="text-gray-500"/>
                          <span className="text-xs font-bold text-gray-500 uppercase">Sorsolásig hátralévő idő:</span>
                      </div>
                      <div className="flex gap-4 font-mono text-3xl font-bold text-[#c59d5f]">
                          <div>{timeLeft.h}<span className="text-xs block text-gray-400 font-sans">Óra</span></div>:
                          <div>{timeLeft.m}<span className="text-xs block text-gray-400 font-sans">Perc</span></div>:
                          <div>{timeLeft.s}<span className="text-xs block text-gray-400 font-sans">Mp</span></div>
                      </div>
                 </div>

                 {/* Gomb */}
                 <div className="pt-4 flex justify-center md:justify-start">
                     <button onClick={scrollToOrder} className="btn-gold text-lg px-10 py-4 rounded-full shadow-xl flex items-center gap-2">
                         Kérem a Csomagot <ArrowRight />
                     </button>
                 </div>
             </div>

             {/* Jobb: KÉP (Kozmetikai kép) */}
             <div className="relative flex justify-center mt-6 md:mt-0">
                 {/* Ez egy FIX kozmetikai dobozos kép, nem véletlenszerű */}
                 <img 
                    src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=600&auto=format&fit=crop" 
                    className="w-full max-w-sm rounded-[2rem] shadow-[0_20px_50px_rgba(197,157,95,0.3)] border-4 border-white"
                    alt="Lipses Csomag"
                 />
                 
                 {/* Lebegő elemek */}
                 <div className="absolute top-8 -left-2 bg-white px-4 py-2 rounded-full shadow-lg border border-[#c59d5f] flex items-center gap-2">
                     <span className="text-[#c59d5f]">⏳</span> 
                     <span className="font-bold text-gray-700 text-xs">12 ÓRÁS HATÁS</span>
                 </div>
                 <div className="absolute bottom-12 -right-2 bg-white px-4 py-2 rounded-full shadow-lg border border-[#c59d5f] flex items-center gap-2">
                     <span className="text-red-500">🚫</span> 
                     <span className="font-bold text-gray-700 text-xs">TŰ NÉLKÜL</span>
                 </div>
             </div>
         </div>
      </section>

      {/* --- 3. RENDELÉS ŰRLAP --- */}
      <div id="order-section" className="px-4 py-12">
          <div className="max-w-3xl mx-auto glass-card p-8 md:p-12 rounded-[2rem]">
              <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-[#4a4a4a] mb-2">Megrendelés Leadása</h2>
                  <p className="text-gray-500">Töltsd ki az adatokat a sorsoláshoz és vásárláshoz.</p>
              </div>

              {/* Termék info */}
              <div className="flex items-center gap-4 bg-[#fff0f5] p-4 rounded-xl border border-[#c59d5f]/30 mb-8">
                  <div className="w-16 h-16 bg-white rounded-lg overflow-hidden border border-[#c59d5f]/20">
                     <img src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=150" className="w-full h-full object-cover"/>
                  </div>
                  <div>
                      <h4 className="font-bold text-gray-800">Lipses Hyaluron Pen</h4>
                      <p className="text-xs text-[#c59d5f] font-bold uppercase">Valentin Csomag</p>
                  </div>
                  <div className="ml-auto text-right">
                      <span className="text-gray-400 line-through text-xs block">24.990 Ft</span>
                      <span className="text-xl font-bold text-[#c59d5f]">12.990 Ft</span>
                  </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <input required type="text" placeholder="Vezetéknév" className="w-full bg-white border border-gray-300 p-4 rounded-xl focus:border-[#c59d5f] focus:outline-none focus:ring-1 focus:ring-[#c59d5f]" />
                     <input required type="text" placeholder="Keresztnév" className="w-full bg-white border border-gray-300 p-4 rounded-xl focus:border-[#c59d5f] focus:outline-none focus:ring-1 focus:ring-[#c59d5f]" />
                  </div>
                  
                  <input required type="email" placeholder="Email Cím" className="w-full bg-white border border-gray-300 p-4 rounded-xl focus:border-[#c59d5f] focus:outline-none focus:ring-1 focus:ring-[#c59d5f]" />
                  <input required type="tel" placeholder="Telefonszám" className="w-full bg-white border border-gray-300 p-4 rounded-xl focus:border-[#c59d5f] focus:outline-none focus:ring-1 focus:ring-[#c59d5f]" />
                  
                  <div className="grid grid-cols-3 gap-4">
                      <input required type="text" placeholder="Ir.szám" className="col-span-1 w-full bg-white border border-gray-300 p-4 rounded-xl focus:border-[#c59d5f] focus:outline-none" />
                      <input required type="text" placeholder="Város" className="col-span-2 w-full bg-white border border-gray-300 p-4 rounded-xl focus:border-[#c59d5f] focus:outline-none" />
                  </div>
                  <input required type="text" placeholder="Utca, házszám" className="w-full bg-white border border-gray-300 p-4 rounded-xl focus:border-[#c59d5f] focus:outline-none" />

                  {/* Fizetési gomb */}
                  <button type="submit" disabled={loading} className="w-full btn-gold text-white font-bold text-xl py-5 rounded-xl shadow-lg mt-6 flex items-center justify-center gap-3">
                      {loading ? 'Feldolgozás...' : <>Tovább a Fizetéshez <ArrowRight /></>}
                  </button>
                  
                  {/* Trust Badgek */}
                  <div className="text-center mt-6">
                      <p className="text-xs text-gray-500 mb-2 font-bold uppercase">Biztonságos Fizetés:</p>
                      <div className="flex justify-center gap-4 opacity-60 hover:opacity-100 transition grayscale hover:grayscale-0">
                           {/* Helyi ikonok helyett SVG linkek hogy biztosan megjelenjen */}
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