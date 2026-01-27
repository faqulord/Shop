"use client";
import { useState, useEffect } from 'react';
import { ArrowRight, Gift, Clock, ShieldCheck, Heart } from 'lucide-react';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ h: 12, m: 0, s: 0 });

  // Visszaszámláló
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59 };
        return { h: 12, m: 59, s: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToOrder = () => document.getElementById('order-section')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="pb-20">
      
      {/* --- FEJLÉC --- */}
      <nav className="fixed w-full z-50 top-0 bg-white/90 backdrop-blur-md border-b border-[#d4af37]/30 h-20 flex items-center shadow-sm">
        <div className="max-w-6xl mx-auto px-4 w-full flex justify-between items-center">
             {/* LOGÓ Szövegként (hogy biztosan jó legyen) */}
             <div className="flex flex-col leading-none">
                 <span className="font-serif text-3xl font-bold text-[#d4af37]">LipsesHungary</span>
                 <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 text-center">Prémium Ajakápolás</span>
             </div>
             
             <button onClick={scrollToOrder} className="hidden md:block bg-[#d4af37] text-white px-6 py-2 rounded-full font-bold shadow-md hover:bg-[#bfa05d] transition">
                 Megrendelem
             </button>
        </div>
      </nav>

      {/* --- HERO SZEKCIÓ --- */}
      <section className="pt-32 pb-16 px-4">
         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             
             {/* Bal oldal: Szöveg */}
             <div className="text-center md:text-left space-y-6">
                 
                 <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow border border-[#d4af37]">
                     <Gift size={18} className="text-[#d4af37]" />
                     <span className="text-[#d4af37] font-bold text-sm uppercase">Valentin Napi Akció</span>
                 </div>

                 <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-800 leading-tight">
                     VALENTIN NAPI <br/>
                     <span className="text-gold-gradient">NYEREMÉNYJÁTÉK!</span>
                 </h1>

                 <p className="text-lg text-gray-600 font-light">
                     Nyerj fájdalommentes, azonnali ajakdúsítást! <br/>
                     <span className="font-bold text-[#d4af37]">Garantáltan odaér Valentin-napig! 🚀</span>
                 </p>

                 {/* Visszaszámláló */}
                 <div className="bg-white/80 p-4 rounded-xl border-2 border-[#d4af37] inline-block shadow-lg">
                      <div className="flex items-center justify-center gap-2 mb-2">
                          <Clock size={16} className="text-gray-500"/>
                          <span className="text-xs font-bold text-gray-500 uppercase">Sorsolásig hátralévő idő:</span>
                      </div>
                      <div className="flex gap-4 font-mono text-3xl font-bold text-[#d4af37]">
                          <div>{timeLeft.h}<span className="text-xs block text-gray-400">Óra</span></div>:
                          <div>{timeLeft.m}<span className="text-xs block text-gray-400">Perc</span></div>:
                          <div>{timeLeft.s}<span className="text-xs block text-gray-400">Mp</span></div>
                      </div>
                 </div>

                 <div className="pt-4">
                     <button onClick={scrollToOrder} className="w-full md:w-auto bg-gradient-to-r from-[#d4af37] to-[#bfa05d] text-white text-xl font-bold px-10 py-4 rounded-full shadow-xl hover:scale-105 transition flex items-center justify-center gap-2">
                         Kérem a Csomagot <ArrowRight />
                     </button>
                 </div>
             </div>

             {/* Jobb oldal: KÉP (FIX KÉP, NEM VÉLETLENSZERŰ) */}
             <div className="relative flex justify-center">
                 {/* Ez egy konkrét kép egy fehér/arany ajakápolóról, nem random ember */}
                 <img 
                    src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=800&auto=format&fit=crop" 
                    className="w-full max-w-md rounded-[2rem] shadow-[0_20px_50px_rgba(212,175,55,0.4)] border-4 border-white object-cover"
                    alt="Lipses Valentin Csomag"
                 />
                 
                 {/* Címkék a képen */}
                 <div className="absolute top-6 -left-2 bg-white px-4 py-2 rounded-full shadow-lg border border-[#d4af37] flex items-center gap-2 animate-bounce">
                     <span className="text-[#d4af37]">⏳</span> 
                     <span className="font-bold text-gray-700 text-xs">12 ÓRÁN ÁT TARTÓ HATÁS</span>
                 </div>
                 
                 <div className="absolute bottom-10 -right-2 bg-white px-4 py-2 rounded-full shadow-lg border border-[#d4af37] flex items-center gap-2">
                     <span className="text-red-500">🚫</span> 
                     <span className="font-bold text-gray-700 text-xs">TŰ NÉLKÜL</span>
                 </div>
             </div>

         </div>
      </section>

      {/* --- RENDELÉS ŰRLAP --- */}
      <div id="order-section" className="px-4 py-10">
          <div className="max-w-3xl mx-auto glass-light p-8 md:p-12 rounded-[2rem]">
              <div className="text-center mb-8">
                  <h2 className="text-3xl font-serif font-bold text-gray-800">Rendelés Leadása</h2>
                  <p className="text-gray-500 mt-2">Töltsd ki az adatokat a sorsoláshoz és vásárláshoz.</p>
              </div>

              <form className="space-y-4">
                  <input type="text" placeholder="Teljes Név" className="w-full bg-white border border-[#d4af37]/50 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-gray-800 placeholder-gray-400" />
                  <input type="email" placeholder="Email Cím" className="w-full bg-white border border-[#d4af37]/50 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-gray-800 placeholder-gray-400" />
                  <input type="tel" placeholder="Telefonszám" className="w-full bg-white border border-[#d4af37]/50 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-gray-800 placeholder-gray-400" />
                  
                  <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="Irányítószám" className="w-full bg-white border border-[#d4af37]/50 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-gray-800 placeholder-gray-400" />
                      <input type="text" placeholder="Város" className="w-full bg-white border border-[#d4af37]/50 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-gray-800 placeholder-gray-400" />
                  </div>
                  <input type="text" placeholder="Utca, házszám" className="w-full bg-white border border-[#d4af37]/50 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-gray-800 placeholder-gray-400" />

                  <button className="w-full bg-[#d4af37] text-white font-bold text-xl py-4 rounded-xl shadow-lg mt-6 hover:bg-[#bfa05d] transition">
                      Megrendelés Leadása
                  </button>
                  
                  <div className="text-center mt-4 flex items-center justify-center gap-2 text-gray-500 text-sm">
                      <ShieldCheck size={16} /> 100% Pénzvisszafizetési Garancia
                  </div>
              </form>
          </div>
      </div>

    </div>
  );
}