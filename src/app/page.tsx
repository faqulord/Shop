"use client";
import { useState, useEffect } from 'react';
import { Star, Check, ArrowRight, CreditCard, Clock, ShieldCheck, Heart, Info, Snowflake, Gift } from 'lucide-react';

export default function Home() {

  // --- 1. ADATOK ---
  const [timeLeft, setTimeLeft] = useState({ h: 3, m: 12, s: 45 });
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', city: '', zip: '' });
  const [orderStatus, setOrderStatus] = useState('');
  
  // PROFIBB TERMÉK KÉP (Elegáns környezetben)
  const PRODUCT_IMAGE = "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop"; 
  // LOGÓ KÉP (A beküldött arculat része)
  const LOGO_IMAGE = "https://i.imgur.com/8Wq74c4.png"; // Egy placeholder a logódnak, cseréld le a sajátodra, ha van URL-ed!

  const product = {
    name: "LIPSES™ Hyaluron Pen",
    subtitle: "Valentin Napi Prémium Csomag ❤️",
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
      
      {/* --- Hóesés (Előtérben) --- */}
      <div className="snow-container"></div>

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-rose-gold/20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
            {/* Logó és Felirat */}
            <div className="flex items-center gap-3">
                <img src={LOGO_IMAGE} alt="LipsesHungary Logo" className="h-12 w-12 object-contain filter drop-shadow-sm" />
                <div>
                    <h1 className="text-2xl font-bold text-rose-gold tracking-wide font-serif">LipsesHungary</h1>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">Prémium Ajakápolás</p>
                </div>
            </div>
            
            <button onClick={scrollToOrder} className="rose-gold-gradient text-white px-6 py-3 rounded-full text-sm font-bold hover:shadow-lg transition transform hover:scale-105">
                Megrendelem
            </button>
        </div>
      </nav>

      {/* --- HERO SECTION (A Főoldal) --- */}
      <section className="relative pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            
            {/* Szöveg + Marketing */}
            <div className="text-center lg:text-left space-y-8">
                
                {/* Valentin Napi Kiemelés */}
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white border-2 border-rose-gold shadow-md">
                    <Heart size={18} className="fill-rose-gold text-rose-gold" /> 
                    <span className="text-rose-gold font-bold uppercase tracking-wider text-sm">Valentin Napi Akció: Február 10-ig!</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-gray-800 leading-tight font-serif">
                    NINCS TÖBBÉ <br/>
                    <span className="rose-gold-text-gradient">
                        FÁJDALMAS SZÁJFELTÖLTÉS!
                    </span>
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed font-light">
                    {product.description} <br/>
                    <span className="text-rose-gold font-semibold">Most limitált Téli Díszcsomagolásban!</span>
                </p>

                {/* Időzítő Kártya */}
                <div className="glass-panel p-6 rounded-2xl inline-block">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Clock size={18} className="text-rose-gold" />
                        <p className="text-sm text-gray-500 uppercase tracking-widest">Az akció lejár:</p>
                    </div>
                    <div className="flex gap-4 font-mono text-4xl font-bold text-rose-gold justify-center">
                        <div className="text-center"><span className="block">{timeLeft.h}</span><span className="text-xs text-gray-500 font-sans uppercase">Óra</span></div>
                        <div className="text-rose-gold">:</div>
                        <div className="text-center"><span className="block">{timeLeft.m}</span><span className="text-xs text-gray-500 font-sans uppercase">Perc</span></div>
                        <div className="text-rose-gold">:</div>
                        <div className="text-center"><span className="block">{timeLeft.s}</span><span className="text-xs text-gray-500 font-sans uppercase">Mp</span></div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 pt-4 justify-center lg:justify-start">
                    <button onClick={scrollToOrder} className="rose-gold-gradient text-white px-10 py-5 rounded-full font-bold text-xl shadow-lg hover:shadow-xl transition transform hover:scale-105 flex items-center justify-center gap-3">
                        Kérem a Csomagot <ArrowRight size={24} />
                    </button>
                    <div className="flex items-center gap-4 px-8 py-5 border-2 border-rose-gold rounded-full bg-white shadow-md">
                        <Gift size={24} className="text-rose-gold" />
                        <div className="text-right">
                            <span className="block text-gray-500 line-through text-sm">{product.originalPrice} Ft</span>
                            <span className="block text-2xl font-bold text-rose-gold">{product.price} Ft</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center lg:justify-start gap-8 text-sm text-gray-500 pt-4 font-medium">
                   <span className="flex items-center gap-2"><Check size={18} className="text-rose-gold"/> Tűmentes</span>
                   <span className="flex items-center gap-2"><Check size={18} className="text-rose-gold"/> Azonnali hatás</span>
                   <span className="flex items-center gap-2"><Check size={18} className="text-rose-gold"/> Biztonságos</span>
                </div>
            </div>

            {/* KÉP (Profi kép, elegáns keretben) */}
            <div className="relative mt-12 lg:mt-0">
                {/* Háttér glória */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-rose-gold/20 blur-[100px] rounded-full -z-10"></div>
                
                {/* A Termék Kártya */}
                <div className="relative bg-white border-4 border-rose-gold rounded-[3rem] overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition duration-700 z-10">
                    <img 
                        src={PRODUCT_IMAGE} 
                        alt="Lipses Hyaluron Pen" 
                        className="w-full h-[600px] object-cover" 
                    />
                    
                    {/* Hópehely overlay */}
                    <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-md">
                        <Snowflake size={24} className="text-rose-gold animate-spin-slow" />
                    </div>

                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white via-white/90 to-transparent p-8 pt-24">
                        <div className="bg-rose-gold text-white text-xs font-bold px-3 py-1.5 rounded-full w-max mb-3 uppercase tracking-wider">PRÉMIUM CSOMAG</div>
                        <h3 className="text-3xl font-bold text-gray-800 font-serif">Lipses™ Hyaluron Pen</h3>
                        <p className="text-lg text-gray-600 font-light">Otthoni ajakdúsító készlet</p>
                    </div>
                </div>
            </div>

        </div>
      </section>

      {/* --- SOCIAL PROOF (Vélemények) --- */}
      <section className="py-20 bg-white/60 border-y border-rose-gold/20 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-center text-3xl font-bold text-gray-800 mb-12 font-serif">
                  <span className="text-rose-gold">★★★★★</span> <br/>
                  Vásárlóink Imádják
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Vélemény 1 */}
                  <div className="glass-panel p-8 rounded-3xl relative hover:shadow-xl transition">
                      <div className="absolute -top-5 -left-5 bg-rose-gold text-white p-3 rounded-full border-4 border-white font-bold shadow-md text-lg">VN</div>
                      <p className="text-gray-700 text-base mb-6 mt-4 italic leading-relaxed">"Lányok, ez valami kegyetlen! 😱 Azt hittem kamu, de 2 perc alatt olyat csinált a számmal, mintha töltettem volna. Imádom!"</p>
                      <div className="flex justify-between items-center border-t border-rose-gold/10 pt-4">
                          <span className="font-bold text-gray-800 text-base">Varga Niki</span>
                          <span className="text-rose-gold text-sm flex items-center gap-1 font-medium"><ShieldCheck size={16}/> Ellenőrzött</span>
                      </div>
                  </div>
                  {/* Vélemény 2 */}
                  <div className="glass-panel p-8 rounded-3xl relative hover:shadow-xl transition">
                      <div className="absolute -top-5 -left-5 bg-rose-gold text-white p-3 rounded-full border-4 border-white font-bold shadow-md text-lg">KP</div>
                      <p className="text-gray-700 text-base mb-6 mt-4 italic leading-relaxed">"Brutál jó! Kicsit bizserget, de abszolút megéri. Randi előtt kötelező darab lett nálam. A csomagolás is gyönyörű."</p>
                      <div className="flex justify-between items-center border-t border-rose-gold/10 pt-4">
                          <span className="font-bold text-gray-800 text-base">Kovács Petra</span>
                          <span className="text-rose-gold text-sm flex items-center gap-1 font-medium"><ShieldCheck size={16}/> Ellenőrzött</span>
                      </div>
                  </div>
                  {/* Vélemény 3 */}
                  <div className="glass-panel p-8 rounded-3xl relative hover:shadow-xl transition">
                      <div className="absolute -top-5 -left-5 bg-rose-gold text-white p-3 rounded-full border-4 border-white font-bold shadow-md text-lg">TE</div>
                      <p className="text-gray-700 text-base mb-6 mt-4 italic leading-relaxed">"Már a barátnőmnek is rendeltem. A Téli csomagolás pedig gyönyörű lett! Nagyon elégedett vagyok."</p>
                      <div className="flex justify-between items-center border-t border-rose-gold/10 pt-4">
                          <span className="font-bold text-gray-800 text-base">Tóth Eszter</span>
                          <span className="text-rose-gold text-sm flex items-center gap-1 font-medium"><ShieldCheck size={16}/> Ellenőrzött</span>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* --- CHECKOUT (Rendelés) --- */}
      <div id="order-section" className="py-24 px-4">
          <div className="max-w-5xl mx-auto glass-panel rounded-[3rem] overflow-hidden shadow-2xl border-2 border-rose-gold">
              <div className="rose-gold-gradient p-8 text-center">
                  <h2 className="text-3xl font-bold text-white uppercase tracking-wider font-serif">Megrendelés Leadása</h2>
                  <p className="text-white/90 text-sm mt-2 flex items-center justify-center gap-2"><ShieldCheck size={16}/> Biztonságos SSL Kapcsolat</p>
              </div>

              <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                  
                  {/* Termék info */}
                  <div className="space-y-8">
                      <div className="bg-white p-6 rounded-3xl border-2 border-rose-gold/30 flex gap-6 shadow-sm items-center">
                          <div className="w-24 h-24 bg-gray-100 rounded-2xl overflow-hidden shrink-0 border border-rose-gold/20">
                               <img src={PRODUCT_IMAGE} className="w-full h-full object-cover" />
                          </div>
                          <div>
                              <h4 className="font-bold text-xl text-gray-800 font-serif">{product.name}</h4>
                              <p className="text-sm text-rose-gold uppercase font-bold mb-2 tracking-wider">Valentin Csomag</p>
                              <div className="flex items-center gap-3">
                                <span className="text-gray-400 line-through text-lg">{product.originalPrice} Ft</span>
                                <p className="text-3xl font-bold text-rose-gold">{product.price} Ft</p>
                              </div>
                          </div>
                      </div>
                      
                      <div className="bg-rose-gold/10 p-6 rounded-3xl border-2 border-rose-gold/30 flex gap-4 text-sm text-rose-gold items-start">
                          <Info className="shrink-0 mt-1" size={20} />
                          <p className="leading-relaxed">A nagy Valentin-napi érdeklődés miatt az utánvét szünetel. <br/> <strong className="text-gray-800 font-bold">Csak biztonságos Bankkártyás / PayPal fizetés elérhető.</strong></p>
                      </div>

                      <div className="text-sm text-gray-500 text-center flex items-center justify-center gap-2">
                          <ShieldCheck size={16} className="text-rose-gold"/> A termékre 100% pénzvisszafizetési garanciát vállalunk 30 napig.
                      </div>
                  </div>

                  {/* Űrlap */}
                  <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                          <label className="text-xs font-bold text-gray-500 uppercase ml-1 tracking-wider">Teljes Név</label>
                          <input required type="text" placeholder="Pl. Kiss Anna" className="w-full bg-white border-2 border-rose-gold/30 rounded-2xl px-5 py-4 text-gray-800 focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20 outline-none transition shadow-sm placeholder-gray-400 text-base" 
                              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                      </div>

                      <div>
                          <label className="text-xs font-bold text-gray-500 uppercase ml-1 tracking-wider">Email Cím</label>
                          <input required type="email" placeholder="anna@mail.hu" className="w-full bg-white border-2 border-rose-gold/30 rounded-2xl px-5 py-4 text-gray-800 focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20 outline-none transition shadow-sm placeholder-gray-400 text-base" 
                              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                      </div>

                      <div>
                          <label className="text-xs font-bold text-gray-500 uppercase ml-1 tracking-wider">Telefonszám</label>
                          <input required type="tel" placeholder="06 30 123 4567" className="w-full bg-white border-2 border-rose-gold/30 rounded-2xl px-5 py-4 text-gray-800 focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20 outline-none transition shadow-sm placeholder-gray-400 text-base" 
                              value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                          <div>
                             <label className="text-xs font-bold text-gray-500 uppercase ml-1 tracking-wider">Ir. Szám</label>
                             <input required type="text" placeholder="1011" className="w-full bg-white border-2 border-rose-gold/30 rounded-2xl px-5 py-4 text-gray-800 focus:border-rose-gold outline-none shadow-sm placeholder-gray-400 text-base" 
                                 value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})} />
                          </div>
                          <div className="col-span-2">
                             <label className="text-xs font-bold text-gray-500 uppercase ml-1 tracking-wider">Város</label>
                             <input required type="text" placeholder="Budapest" className="w-full bg-white border-2 border-rose-gold/30 rounded-2xl px-5 py-4 text-gray-800 focus:border-rose-gold outline-none shadow-sm placeholder-gray-400 text-base" 
                                 value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                          </div>
                      </div>

                      <div>
                          <label className="text-xs font-bold text-gray-500 uppercase ml-1 tracking-wider">Utca, házszám</label>
                          <input required type="text" placeholder="Fő utca 1." className="w-full bg-white border-2 border-rose-gold/30 rounded-2xl px-5 py-4 text-gray-800 focus:border-rose-gold outline-none transition shadow-sm placeholder-gray-400 text-base" 
                              value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                      </div>

                      <button type="submit" disabled={orderStatus === 'loading'} className="w-full mt-6 rose-gold-gradient text-white font-bold text-xl py-5 rounded-full shadow-lg flex items-center justify-center gap-3 transform active:scale-95 transition hover:shadow-xl">
                          {orderStatus === 'loading' ? <span className="animate-spin">❄</span> : <>Megrendelés Leadása <ArrowRight size={24}/></>}
                      </button>
                      
   