"use client";
// Ez a két sor kényszeríti a frissítést, hogy ne ragadjon be a régi verzió!
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { useState, useEffect } from 'react';
import { ArrowRight, Gift, Clock, ShieldCheck, Heart, Star, CheckCircle, Truck, Info } from 'lucide-react';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ h: 11, m: 59, s: 0 });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', zip: '', city: '', address: '' });

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

  const handleSubmit = (e: any) => {
      e.preventDefault();
      setLoading(true);
      setTimeout(() => {
        window.location.href = "https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=stylefaqu@gmail.com&item_name=Lipses_Valentin_Csomag&amount=12990&currency_code=HUF";
      }, 1500);
  };

  return (
    <div className="pb-20 overflow-x-hidden text-[#4a4a4a]">
      
      {/* --- FEJLÉC --- */}
      <nav className="fixed w-full z-50 top-0 bg-white/95 backdrop-blur-md border-b border-[#c59d5f]/30 h-20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-full flex justify-between items-center">
             <div className="flex flex-col">
                 <span className="font-serif text-2xl md:text-3xl font-bold text-[#c59d5f] tracking-tight">LipsesHungary</span>
                 <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-500">Prémium Ajakápolás</span>
             </div>
             
             <button onClick={scrollToOrder} className="hidden md:flex bg-gradient-to-r from-[#c59d5f] to-[#eecf97] text-white px-6 py-2 rounded-full font-bold shadow-md items-center gap-2 text-sm hover:scale-105 transition">
                 <Heart size={16} fill="white" /> Megrendelem
             </button>
        </div>
      </nav>

      {/* --- HERO SZEKCIÓ --- */}
      <section className="pt-32 pb-10 px-4">
         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
             
             {/* Bal: Szöveg */}
             <div className="text-center md:text-left space-y-6">
                 
                 <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow border border-[#c59d5f]/50 animate-pulse">
                     <Gift size={18} className="text-[#c59d5f]" />
                     <span className="text-[#c59d5f] font-bold text-sm uppercase">Valentin Napi Akció: Feb 10-ig!</span>
                 </div>

                 <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#4a4a4a] leading-[1.1]">
                     NYERJ AZONNALI <br/>
                     <span className="text-[#c59d5f]">AJAKDÚSÍTÁST!</span>
                 </h1>

                 <p className="text-gray-600 text-lg leading-relaxed">
                     Felejtsd el a fájdalmas tűszúrásokat! A Lipses technológia sűrített levegővel varázsol telt ajkakat otthon. <br/>
                     <span className="font-bold text-[#c59d5f]">Most ajándék díszcsomagolásban!</span>
                 </p>

                 {/* Visszaszámláló */}
                 <div className="bg-white p-4 rounded-xl border border-[#c59d5f] inline-block shadow-lg">
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
                     <button onClick={scrollToOrder} className="bg-gradient-to-r from-[#c59d5f] to-[#a37e45] text-white text-lg font-bold px-8 py-4 rounded-full shadow-xl flex items-center justify-center gap-2 hover:scale-105 transition">
                         Kérem a Csomagot <ArrowRight />
                     </button>
                     <div className="flex items-center gap-2 text-sm text-gray-500 px-4 py-2 bg-white/50 rounded-lg">
                        <Truck size={18} /> <span>Garantáltan odaér <strong>Valentin-napig!</strong></span>
                     </div>
                 </div>
             </div>

             {/* Jobb: TERMÉK KÉP (FIX kozmetikai kép) */}
             <div className="relative flex justify-center mt-8 md:mt-0">
                 <div className="relative z-10 w-full max-w-md">
                    <img 
                        src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=800&auto=format&fit=crop" 
                        className="w-full rounded-[2rem] shadow-2xl border-4 border-white"
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
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#c59d5f]/20 blur-[60px] rounded-full -z-10"></div>
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
                      <div key={i} className="bg-white p-6 rounded-2xl border border-[#c59d5f]/20 shadow-sm">
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
          <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md p-8 md:p-12 rounded-[2rem] border border-[#c59d5f] shadow-2xl">
              <div className="text-center mb-8">
                  <span className="text-[#c59d5f] font-bold text-sm tracking-widest uppercase">Biztonságos Fizetés</span>
                  <h2 className="text-3xl font-serif font-bold text-gray-800 mt-2">Megrendelés Leadása</h2>
              </div>

              {/* Termék összegzés */}
              <div className="flex items-center gap-4 bg-[#fff0f5] p-4 rounded-xl border border-[#c59d5f]/20 mb-6">
                  <div className="w-16 h-16 bg-white rounded-lg overflow-hidden border border-[#c59d5f]/20">
                     <img src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=200" className="w-full h-full object-cover"/>
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
                     <input required type="text" placeholder="Vezetéknév" className="w-full bg-white border border-gray-300 p-4 rounded-xl focus:border-[#c59d5f] focus:ring-[#c59d5f] outline-none" onChange={e => setFormData({...formData, name: e.target.value})} />
                     <input required type="text" placeholder="Keresztnév" className="w-full bg-white border border-gray-300 p-4 rounded-xl focus:border-[#c59d5f] focus:ring-[#c59d5f] outline-none" />
                  </div>
                  
                  <input required type="email" placeholder="Email Cím" className="w-full bg-white border border-gray-300 p-4 rounded-xl focus:border-[#c59d5f] focus:ring-[#c59d5f] outline-none" onChange={e => setFormData({...formData, email: e.target.value})} />
                  <input required type="tel" placeholder="Telefonszám" className="w-full bg-white border border-gray-300 p-4 rounded-xl focus:border-[#c59d5f] focus:ring-[#c59d5f] outline-none" onChange={e => setFormData({...formData, phone: e.target.value})} />
                  
                  <div className="grid grid-cols-3 gap-4">
                      <input required type="text" placeholder="Ir.szám" className="col-span-1 w-full bg-white border border-gray-300 p-4 rounded-xl focus:border-[#c59d5f] outline-none" onChange={e => setFormData({...formData, zip: e.target.value})} />
                      <input required type="text" placeholder="Város" className="col-span-2 w-full bg-white border border-gray-300 p-4 rounded-xl focus:border-[#c59d5f] outline-none" onChange={e => setFormData({...formData, city: e.target.value})} />
                  </div>
                  <input required type="text" placeholder="Utca, házszám" className="w-full bg-white border border-gray-300 p-4 rounded-xl focus:border-[#c59d5f] outline-none" onChange={e => setFormData({...formData, address: e.target.value})} />

                  {/* Fizetési gomb */}
                  <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-[#c59d5f] to-[#a37e45] text-white font-bold text-xl py-5 rounded-xl shadow-lg mt-6 flex items-center justify-center gap-3 hover:scale-[1.02] transition">
                      {loading ? 'Feldolgozás...' : <>Tovább a Fizetéshez <ArrowRight /></>}
                  </button>
                  
                  {/* Trust Badgek - KÉPEK HELYETT IKONOK, HOGY BIZTOS MEGJELENJEN */}
                  <div className="text-center mt-6">
                      <p className="text-xs text-gray-500 mb-2 font-bold uppercase">Biztonságos Fizetés:</p>
                      <div className="flex justify-center gap-6 opacity-60 hover:opacity-100 transition">
                           <div className="flex items-center gap-1"><CreditCard size={24}/> <span className="text-xs font-bold">Bankkártya</span></div>
                           <div className="flex items-center gap-1 font-bold text-blue-800 italic text-lg">PayPal</div>
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