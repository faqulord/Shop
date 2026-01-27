"use client";
import { useState, useEffect } from 'react';
import { Star, Check, ArrowRight, CreditCard, Clock, ShieldCheck, Heart, Info, Snowflake } from 'lucide-react';

export default function Home() {

  // --- 1. ADATOK ---
  const [timeLeft, setTimeLeft] = useState({ h: 3, m: 12, s: 45 });
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', city: '', zip: '' });
  const [orderStatus, setOrderStatus] = useState('');
  
  // ÚJ, PROFIBB TERMÉK KÉP
  const PRODUCT_IMAGE = "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop";

  const product = {
    name: "LIPSES™ Hyaluron Pen",
    subtitle: "Valentin Napi Akció ❤️",
    price: 12990,
    originalPrice: 24990,
    description: "Érd el a telt, csábító ajkakat fájdalom és tűszúrás nélkül! A Lipses technológia sűrített levegővel juttatja a hyaluront a bőrbe. Otthoni használatra tervezve."
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

        await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });

        const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${PAYPAL_EMAIL}&item_name=${encodeURIComponent(product.name)}&amount=${product.price}&currency_code=HUF&return=${encodeURIComponent(window.location.href)}`;
        window.location.href = paypalUrl;

    } catch (error) {
        alert("Hiba történt. Kérlek próbáld újra.");
        setOrderStatus('');
    }
  };

  const scrollToOrder = () => document.getElementById('order-section')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen relative font-sans text-gray-800">
      
      {/* Hóesés háttér elem (előtérben) */}
      <div className="snow-container"></div>

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-rose-gold/20">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="text-2xl font-black tracking-widest text-rose-gold flex items-center gap-2">
                LIPSES Hungary <span className="text-xs font-normal bg-rose-gold px-2 py-0.5 rounded-full text-white">Prémium</span>
            </div>
            <button onClick={scrollToOrder} className="bg-rose-gold text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-rose-600 transition shadow-md">
                Megrendelem
            </button>
        </div>
      </nav>

      {/* --- HERO SECTION (A Főoldal) --- */}
      <section className="relative pt-28 pb-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            
            {/* Szöveg + Marketing */}
            <div className="text-center lg:text-left space-y-6">
                
                {/* Valentin Napi Kiemelés - Logó stílusban */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-gold/10 border border-rose-gold/50 text-rose-gold text-sm font-bold uppercase tracking-wider backdrop-blur-md shadow-sm">
                    <Heart size={14} className="fill-current" /> Valentin Napi Akció: Február 10-ig!
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-gray-800 leading-tight drop-shadow-sm">
                    NINCS TÖBBÉ <br/>
                    <span className="text-rose-gold">
                        FÁJDALMAS SZÁJFELTÖLTÉS!
                    </span>
                </h1>

                <p className="text-lg text-gray-600 leading-relaxed">
                    {product.description} <br/>
                    <span className="text-rose-gold font-bold">Most limitált Téli Díszcsomagolásban!</span>
                </p>

                {/* Időzítő Kártya */}
                <div className="bg-white/70 border border-rose-gold/30 p-4 rounded-xl inline-block backdrop-blur-sm shadow-sm">
                    <p className="text-xs text-gray-500 mb-1 uppercase text-center">Az akció lejár:</p>
                    <div className="flex gap-4 font-mono text-2xl font-bold text-rose-gold justify-center">
                        <div className="text-center"><span className="block text-rose-gold">0{timeLeft.h}</span><span className="text-[10px] text-gray-500 font-sans">Óra</span></div>
                        <div className="text-rose-gold">:</div>
                        <div className="text-center"><span className="block text-rose-gold">{timeLeft.m}</span><span className="text-[10px] text-gray-500 font-sans">Perc</span></div>
                        <div className="text-rose-gold">:</div>
                        <div className="text-center"><span className="block text-rose-gold">{timeLeft.s}</span><span className="text-[10px] text-gray-500 font-sans">Mp</span></div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                    <button onClick={scrollToOrder} className="bg-gradient-to-r from-rose-500 to-rose-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-105 transition flex items-center justify-center gap-2">
                        Kérem a Csomagot <ArrowRight />
                    </button>
                    <div className="flex items-center gap-2 px-6 py-4 border border-rose-gold/30 rounded-xl bg-white/70 backdrop-blur-sm shadow-sm">
                        <div className="text-right">
                            <span className="block text-gray-500 line-through text-xs">{product.originalPrice} Ft</span>
                            <span className="block text-xl font-bold text-rose-gold">{product.price} Ft</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center lg:justify-start gap-6 text-xs text-gray-500 pt-2">
                   <span className="flex items-center gap-1"><Check size={14} className="text-rose-gold"/> Tűmentes</span>
                   <span className="flex items-center gap-1"><Check size={14} className="text-rose-gold"/> Azonnali hatás</span>
                   <span className="flex items-center gap-1"><Check size={14} className="text-rose-gold"/> Biztonságos</span>
                </div>
            </div>

            {/* KÉP (Javítva - Profi kép) */}
            <div className="relative mt-8 lg:mt-0">
                <div className="absolute top-0 left-0 w-full h-full bg-rose-gold/20 blur-[80px] rounded-full -z-10"></div>
                
                {/* A Termék Kártya */}
                <div className="relative bg-white border border-rose-gold/20 rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition duration-700">
                    <img 
                        src={PRODUCT_IMAGE} 
                        alt="Lipses Hyaluron Pen" 
                        className="w-full h-[500px] object-cover" 
                    />
                    
                    {/* Hópehely overlay */}
                    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full">
                        <Snowflake className="text-rose-gold animate-spin-slow" />
                    </div>

                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white/90 to-transparent p-6 pt-20">
                        <div className="bg-rose-gold text-white text-[10px] font-bold px-2 py-1 rounded w-max mb-2">PRÉMIUM CSOMAG</div>
                        <h3 className="text-xl font-bold text-gray-800">Lipses™ Hyaluron Pen</h3>
                        <p className="text-sm text-gray-600">Otthoni ajakdúsító készlet</p>
                    </div>
                </div>
            </div>

        </div>
      </section>

      {/* --- SOCIAL PROOF (Vélemények) --- */}
      <section className="py-16 bg-white/50 border-y border-rose-gold/10 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-center text-2xl font-bold text-gray-800 mb-10">
                  <span className="text-rose-gold">★★★★★</span> <br/>
                  Vásárlóink Imádják
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Vélemény 1 */}
                  <div className="glass-panel p-6 rounded-2xl relative">
                      <div className="absolute -top-3 -left-3 bg-white text-rose-gold p-2 rounded-full border border-rose-gold/30 font-bold shadow-sm">VN</div>
                      <p className="text-gray-700 text-sm mb-4 mt-2 italic">"Lányok, ez valami kegyetlen! 😱 Azt hittem kamu, de 2 perc alatt olyat csinált a számmal, mintha töltettem volna."</p>
                      <div className="flex justify-between items-center border-t border-rose-gold/10 pt-4">
                          <span className="font-bold text-gray-800 text-sm">Varga Niki</span>
                          <span className="text-rose-gold text-xs flex items-center gap-1"><ShieldCheck size={12}/> Ellenőrzött</span>
                      </div>
                  </div>
                  {/* Vélemény 2 */}
                  <div className="glass-panel p-6 rounded-2xl relative">
                      <div className="absolute -top-3 -left-3 bg-white text-rose-gold p-2 rounded-full border border-rose-gold/30 font-bold shadow-sm">KP</div>
                      <p className="text-gray-700 text-sm mb-4 mt-2 italic">"Brutál jó! Kicsit bizserget, de abszolút megéri. Randi előtt kötelező darab lett nálam."</p>
                      <div className="flex justify-between items-center border-t border-rose-gold/10 pt-4">
                          <span className="font-bold text-gray-800 text-sm">Kovács Petra</span>
                          <span className="text-rose-gold text-xs flex items-center gap-1"><ShieldCheck size={12}/> Ellenőrzött</span>
                      </div>
                  </div>
                  {/* Vélemény 3 */}
                  <div className="glass-panel p-6 rounded-2xl relative">
                      <div className="absolute -top-3 -left-3 bg-white text-rose-gold p-2 rounded-full border border-rose-gold/30 font-bold shadow-sm">TE</div>
                      <p className="text-gray-700 text-sm mb-4 mt-2 italic">"Már a barátnőmnek is rendeltem. A Téli csomagolás pedig gyönyörű lett!"</p>
                      <div className="flex justify-between items-center border-t border-rose-gold/10 pt-4">
                          <span className="font-bold text-gray-800 text-sm">Tóth Eszter</span>
                          <span className="text-rose-gold text-xs flex items-center gap-1"><ShieldCheck size={12}/> Ellenőrzött</span>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* --- CHECKOUT (Rendelés) --- */}
      <div id="order-section" className="py-20 px-4">
          <div className="max-w-4xl mx-auto glass-panel rounded-3xl overflow-hidden shadow-2xl border border-rose-gold/20">
              <div className="bg-gradient-to-r from-rose-500 to-rose-600 p-6 text-center">
                  <h2 className="text-2xl font-black text-white uppercase tracking-wider">Megrendelés Leadása</h2>
                  <p className="text-white/80 text-sm">Biztonságos SSL Kapcsolat</p>
              </div>

              <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                  
                  {/* Termék info */}
                  <div className="space-y-6">
                      <div className="bg-white/70 p-4 rounded-xl border border-rose-gold/20 flex gap-4 shadow-sm">
                          <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                               <img src={PRODUCT_IMAGE} className="w-full h-full object-cover" />
                          </div>
                          <div>
                              <h4 className="font-bold text-gray-800">{product.name}</h4>
                              <p className="text-xs text-rose-gold uppercase font-bold mb-1">Valentin Csomag</p>
                              <p className="text-lg font-bold text-gray-800">{product.price} Ft</p>
                          </div>
                      </div>
                      
                      <div className="bg-rose-gold/10 p-4 rounded-xl border border-rose-gold/30 flex gap-3 text-sm text-rose-gold">
                          <Info className="shrink-0" />
                          <p>A nagy Valentin-napi érdeklődés miatt az utánvét szünetel. <br/> <strong className="text-gray-800">Csak biztonságos Bankkártyás / PayPal fizetés elérhető.</strong></p>
                      </div>

                      <div className="text-xs text-gray-500 text-center">
                          A termékre 100% pénzvisszafizetési garanciát vállalunk 30 napig.
                      </div>
                  </div>

                  {/* Űrlap */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                          <label className="text-xs font-bold text-gray-500 uppercase ml-1">Teljes Név</label>
                          <input required type="text" placeholder="Pl. Kiss Anna" className="w-full bg-white border border-rose-gold/30 rounded-xl px-4 py-3 text-gray-800 focus:border-rose-gold focus:ring-1 focus:ring-rose-gold outline-none transition shadow-sm placeholder-gray-400" 
                              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                      </div>

                      <div>
                          <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email Cím</label>
                          <input required type="email" placeholder="anna@mail.hu" className="w-full bg-white border border-rose-gold/30 rounded-xl px-4 py-3 text-gray-800 focus:border-rose-gold focus:ring-1 focus:ring-rose-gold outline-none transition shadow-sm placeholder-gray-400" 
                              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                      </div>

                      <div>
                          <label className="text-xs font-bold text-gray-500 uppercase ml-1">Telefonszám</label>
                          <input required type="tel" placeholder="06 30 123 4567" className="w-full bg-white border border-rose-gold/30 rounded-xl px-4 py-3 text-gray-800 focus:border-rose-gold focus:ring-1 focus:ring-rose-gold outline-none transition shadow-sm placeholder-gray-400" 
                              value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                          <div>
                             <label className="text-xs font-bold text-gray-500 uppercase ml-1">Ir. Szám</label>
                             <input required type="text" placeholder="1011" className="w-full bg-white border border-rose-gold/30 rounded-xl px-4 py-3 text-gray-800 focus:border-rose-gold outline-none shadow-sm placeholder-gray-400" 
                                 value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})} />
                          </div>
                          <div className="col-span-2">
                             <label className="text-xs font-bold text-gray-500 uppercase ml-1">Város</label>
                             <input required type="text" placeholder="Budapest" className="w-full bg-white border border-rose-gold/30 rounded-xl px-4 py-3 text-gray-800 focus:border-rose-gold outline-none shadow-sm placeholder-gray-400" 
                                 value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                          </div>
                      </div>

                      <div>
                          <label className="text-xs font-bold text-gray-500 uppercase ml-1">Utca, házszám</label>
                          <input required type="text" placeholder="Fő utca 1." className="w-full bg-white border border-rose-gold/30 rounded-xl px-4 py-3 text-gray-800 focus:border-rose-gold outline-none transition shadow-sm placeholder-gray-400" 
                              value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                      </div>

                      <button type="submit" disabled={orderStatus === 'loading'} className="w-full mt-4 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white font-bold text-lg py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transform active:scale-95 transition">
                          {orderStatus === 'loading' ? <span className="animate-spin">❄</span> : <>Megrendelés Leadása <ArrowRight/></>}
                      </button>
                      
                      <div className="flex justify-center gap-4 opacity-60 grayscale pt-2 text-gray-600">
                           <CreditCard size={20}/> <span>Visa / MasterCard / PayPal</span>
                      </div>
                  </form>
              </div>
          </div>
      </div>

    </div>
  );
}