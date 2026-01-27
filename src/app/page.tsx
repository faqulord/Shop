"use client";
import { useState, useEffect } from 'react';
import { Star, Check, ArrowRight, CreditCard, ShieldCheck, Zap, Truck, Package, Info, Plus } from 'lucide-react';

export default function Home() {

  // --- 1. ADATOK ---
  const [loading, setLoading] = useState(false); // Most false-ra állítom alapból, hogy lásd a designt azonnal
  const [timeLeft, setTimeLeft] = useState({ h: 3, m: 12, s: 45 });
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', city: '', zip: '' });
  const [orderStatus, setOrderStatus] = useState('');
  
  // FŐ TERMÉK ADATOK
  const product = {
    name: "LIPSES™ Hyaluron Pen v2",
    badge: "USA EDITION",
    price: 12990,
    originalPrice: 24990,
    // EGY JÓ MINŐSÉGŰ KÉP (Unsplash ID direct link)
    image: "https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?q=80&w=1000&auto=format&fit=crop",
    description: "Az amerikai nők kedvenc otthoni ajakdúsító eszköze végre Magyarországon. Tű nélküli technológia, azonnali eredmény."
  };

  const PAYPAL_EMAIL = "stylefaqu@gmail.com"; 

  // --- 2. IDŐZÍTŐ ---
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59 };
        return { h: 3, m: 59, s: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // --- 3. RENDELÉS LOGIKA ---
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setOrderStatus('loading');

    try {
        const orderData = {
            customerName: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: `${formData.zip} ${formData.city}, ${formData.address}`,
            products: [{ name: product.name, price: product.price, quantity: 1 }],
            totalAmount: product.price,
            paymentMethod: 'card',
            status: 'Fizetésre vár (PayPal)'
        };

        // Adatbázisba mentés
        await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });

        // PayPal átirányítás
        const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${PAYPAL_EMAIL}&item_name=${encodeURIComponent(product.name)}&amount=${product.price}&currency_code=HUF&return=${encodeURIComponent(window.location.href)}`;
        window.location.href = paypalUrl;

    } catch (error) {
        alert("Hiba történt a feldolgozás során.");
        setOrderStatus('');
    }
  };

  const scrollToOrder = () => document.getElementById('order-section')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen pb-20">
      
      {/* --- HERO SECTION (A Nagy Belépő) --- */}
      <section className="relative pt-12 pb-20 px-4 md:px-8 overflow-hidden">
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             
             {/* Bal oldal: Szöveg */}
             <div className="z-10 order-2 lg:order-1 text-center lg:text-left">
                <div className="inline-block mb-4 px-3 py-1 rounded border border-rose-500/30 bg-rose-500/10 text-rose-400 text-xs font-bold uppercase tracking-widest">
                    Hivatalos Forgalmazó
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
                    AJKAK, <br/> AMIKRE VÁGYTÁL.
                </h1>
                <p className="text-lg text-zinc-400 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                    A <strong className="text-white">Lipses™ USA</strong> technológia forradalmasítja az otthoni szépségápolást. Nincs tű, nincs fájdalom. Csak prémium hyaluronsav és sűrített levegő.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <button onClick={scrollToOrder} className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                        Vásárlás Indítása
                    </button>
                    <a href="#products" className="px-8 py-4 rounded-full font-bold text-white border border-zinc-700 hover:bg-zinc-800 transition">
                        Termékek Megtekintése
                    </a>
                </div>

                <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    <span className="flex items-center gap-2"><Check size={14} className="text-emerald-500"/> USA Standard</span>
                    <span className="flex items-center gap-2"><Check size={14} className="text-emerald-500"/> Garancia</span>
                    <span className="flex items-center gap-2"><Check size={14} className="text-emerald-500"/> 24h Szállítás</span>
                </div>
             </div>

             {/* Jobb oldal: Termék Kép (Javítva) */}
             <div className="z-10 order-1 lg:order-2 relative">
                 <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900">
                     {/* Itt a biztos képbetöltés */}
                     <img 
                        src={product.image} 
                        alt="Lipses Product" 
                        className="w-full h-full object-cover transform hover:scale-105 transition duration-1000"
                     />
                     
                     {/* Lebegő akció kártya */}
                     <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center justify-between">
                         <div>
                            <p className="text-zinc-400 text-xs uppercase font-bold">Valentin Akció</p>
                            <div className="flex items-center gap-2 text-white font-mono font-bold">
                                <span>{timeLeft.h}:{timeLeft.m}:{timeLeft.s}</span>
                            </div>
                         </div>
                         <div className="text-right">
                             <span className="text-zinc-500 line-through text-xs">{product.originalPrice} Ft</span>
                             <span className="block text-xl font-bold text-white">{product.price} Ft</span>
                         </div>
                     </div>
                 </div>
                 
                 {/* Háttér dekoráció */}
                 <div className="absolute -top-10 -right-10 w-full h-full bg-gradient-to-tr from-rose-600/20 to-blue-600/20 rounded-full blur-[100px] -z-10"></div>
             </div>
         </div>
      </section>

      {/* --- STATISZTIKA SÁV --- */}
      <div className="border-y border-white/5 bg-black/30 backdrop-blur-sm py-8">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                  <div className="text-3xl font-black text-white mb-1">12k+</div>
                  <div className="text-xs text-zinc-500 uppercase font-bold">Eladott db</div>
              </div>
              <div>
                  <div className="text-3xl font-black text-white mb-1">4.9</div>
                  <div className="text-xs text-zinc-500 uppercase font-bold">Vásárlói Értékelés</div>
              </div>
              <div>
                  <div className="text-3xl font-black text-white mb-1">USA</div>
                  <div className="text-xs text-zinc-500 uppercase font-bold">Technológia</div>
              </div>
              <div>
                  <div className="text-3xl font-black text-white mb-1">100%</div>
                  <div className="text-xs text-zinc-500 uppercase font-bold">Pénzvisszafizetés</div>
              </div>
          </div>
      </div>

      {/* --- TERMÉKEK GRID (Hogy Webshopnak nézzen ki) --- */}
      <section id="products" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-end mb-10">
                  <div>
                      <h2 className="text-3xl font-black text-white mb-2">Termékeink</h2>
                      <p className="text-zinc-400">Válassz a prémium csomagjaink közül.</p>
                  </div>
                  <a href="#" className="text-sm font-bold text-rose-500 hover:text-rose-400 hidden sm:block">Összes termék &rarr;</a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* FŐ TERMÉK KÁRTYA */}
                  <div className="glass p-4 rounded-2xl group cursor-pointer border border-rose-500/30 relative">
                      <div className="absolute top-4 left-4 bg-rose-600 text-white text-[10px] font-bold px-2 py-1 rounded">BESTSELLER</div>
                      <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-zinc-800">
                          <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-500"/>
                      </div>
                      <h3 className="font-bold text-white text-lg">{product.name}</h3>
                      <p className="text-zinc-400 text-sm mb-4">Teljes kezdőcsomag töltőanyaggal.</p>
                      <div className="flex items-center justify-between">
                          <span className="font-bold text-white">{product.price.toLocaleString()} Ft</span>
                          <button onClick={scrollToOrder} className="bg-white text-black p-2 rounded-full hover:bg-zinc-200 transition">
                              <Plus size={20} />
                          </button>
                      </div>
                  </div>

                  {/* PLACEHOLDER TERMÉK 1 (Hogy látszódjon a jövő) */}
                  <div className="glass p-4 rounded-2xl opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition duration-500">
                      <div className="absolute top-4 left-4 bg-zinc-800 text-zinc-400 text-[10px] font-bold px-2 py-1 rounded">HAMAROSAN</div>
                      <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-zinc-800 flex items-center justify-center">
                          <Package className="text-zinc-600" size={40}/>
                      </div>
                      <h3 className="font-bold text-white text-lg">Hyaluron Refill Pack</h3>
                      <p className="text-zinc-400 text-sm mb-4">Utántöltő ampullák (5db).</p>
                      <div className="flex items-center justify-between">
                          <span className="font-bold text-zinc-500">Coming Soon</span>
                      </div>
                  </div>

                   {/* PLACEHOLDER TERMÉK 2 */}
                   <div className="glass p-4 rounded-2xl opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition duration-500">
                      <div className="absolute top-4 left-4 bg-zinc-800 text-zinc-400 text-[10px] font-bold px-2 py-1 rounded">HAMAROSAN</div>
                      <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-zinc-800 flex items-center justify-center">
                          <Zap className="text-zinc-600" size={40}/>
                      </div>
                      <h3 className="font-bold text-white text-lg">Lipses Pro Machine</h3>
                      <p className="text-zinc-400 text-sm mb-4">Szalon minőségű gép.</p>
                      <div className="flex items-center justify-between">
                          <span className="font-bold text-zinc-500">Coming Soon</span>
                      </div>
                  </div>

              </div>
          </div>
      </section>

      {/* --- CHECKOUT SECTION (Felhasználóbarát űrlap) --- */}
      <div id="order-section" className="bg-white text-black py-20">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
              
              {/* Bal: Összesítő */}
              <div>
                  <h2 className="text-3xl font-black mb-6">Rendelés Véglegesítése</h2>
                  <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200 mb-6">
                      <div className="flex gap-4 items-center mb-4">
                          <div className="w-20 h-20 bg-zinc-200 rounded-lg overflow-hidden">
                              <img src={product.image} className="w-full h-full object-cover" />
                          </div>
                          <div>
                              <h4 className="font-bold text-lg">{product.name}</h4>
                              <span className="text-rose-600 font-bold text-sm">Valentin Napi Akció</span>
                          </div>
                          <div className="ml-auto font-bold text-xl">
                              {product.price.toLocaleString()} Ft
                          </div>
                      </div>
                      <div className="border-t border-zinc-200 pt-4 space-y-2 text-sm text-zinc-600">
                          <div className="flex justify-between"><span>Részösszeg</span> <span>{product.originalPrice.toLocaleString()} Ft</span></div>
                          <div className="flex justify-between text-rose-600"><span>Kedvezmény</span> <span>-12.000 Ft</span></div>
                          <div className="flex justify-between"><span>Szállítás</span> <span className="font-bold text-emerald-600">INGYENES</span></div>
                          <div className="border-t border-zinc-200 pt-2 flex justify-between font-black text-lg text-black">
                              <span>Fizetendő</span> <span>{product.price.toLocaleString()} Ft</span>
                          </div>
                      </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-blue-50 text-blue-800 rounded-xl text-sm">
                      <Info className="shrink-0" size={20} />
                      <p>Mivel a termék amerikai raktárból érkezik (gyorsított eljárással), jelenleg csak a biztonságos <strong>online fizetés</strong> (PayPal/Bankkártya) elérhető.</p>
                  </div>
              </div>

              {/* Jobb: Űrlap */}
              <div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Vezetéknév</label>
                            <input required placeholder="Kovács" className="w-full bg-zinc-100 border-none p-4 rounded-xl font-medium focus:ring-2 focus:ring-black outline-none" 
                            onChange={e => setFormData({...formData, name: e.target.value + " "})} />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Keresztnév</label>
                            <input required placeholder="Anna" className="w-full bg-zinc-100 border-none p-4 rounded-xl font-medium focus:ring-2 focus:ring-black outline-none" 
                            onChange={e => setFormData({...formData, name: formData.name + e.target.value})} />
                        </div>
                      </div>

                      <div>
                            <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Email cím</label>
                            <input required type="email" placeholder="anna@mail.hu" className="w-full bg-zinc-100 border-none p-4 rounded-xl font-medium focus:ring-2 focus:ring-black outline-none" 
                            value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                      </div>

                      <div>
                            <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Telefonszám</label>
                            <input required type="tel" placeholder="+36 30 123 4567" className="w-full bg-zinc-100 border-none p-4 rounded-xl font-medium focus:ring-2 focus:ring-black outline-none" 
                            value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                          <div>
                             <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Ir. szám</label>
                             <input required placeholder="1052" className="w-full bg-zinc-100 border-none p-4 rounded-xl font-medium focus:ring-2 focus:ring-black outline-none" 
                             value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})} />
                          </div>
                          <div className="col-span-2">
                             <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Város</label>
                             <input required placeholder="Budapest" className="w-full bg-zinc-100 border-none p-4 rounded-xl font-medium focus:ring-2 focus:ring-black outline-none" 
                             value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                          </div>
                      </div>

                      <div>
                            <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Utca, házszám</label>
                            <input required placeholder="Petőfi Sándor u. 12. 2.em" className="w-full bg-zinc-100 border-none p-4 rounded-xl font-medium focus:ring-2 focus:ring-black outline-none" 
                            value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                      </div>
                      
                      {/* Fizetési gomb */}
                      <button type="submit" disabled={orderStatus === 'loading'} className="w-full bg-black text-white font-bold text-xl py-5 rounded-xl shadow-xl hover:bg-zinc-800 transition flex items-center justify-center gap-3 mt-4">
                          {orderStatus === 'loading' ? 'Feldolgozás...' : <>Biztonságos Fizetés <CreditCard size={24}/></>}
                      </button>
                      
                      <div className="flex items-center justify-center gap-4 opacity-50 grayscale mt-4">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-6" />
                          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" />
                          <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" className="h-6" />
                      </div>
                  </form>
              </div>
          </div>
      </div>

    </div>
  );
}