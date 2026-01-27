"use client";
import { useState, useEffect } from 'react';
import { Star, Check, ArrowRight, CreditCard, Banknote, ShieldCheck, Zap, Gift, Clock, CheckCircle, Snowflake, Heart, Sparkles } from 'lucide-react';

export default function Home() {

  // --- 1. ADATOK ÉS ÁLLAPOTOK ---
  const [product, setProduct] = useState<any>({
    name: "LIPSES™ Hyaluron Pen",
    subtitle: "Winter Edition ❄️",
    description: "Felejtsd el a tűszúrást! A Lipses sűrített levegővel varázsol telt, csábító ajkakat otthonod kényelmében. Most exkluzív téli csomagban.",
    price: 12990,
    originalPrice: 24990,
    imageUrl: "https://images.unsplash.com/photo-1617391768406-382436d65377?q=80&w=1000&auto=format&fit=crop" // Prémium kép
  });

  const [timeLeft, setTimeLeft] = useState({ h: 3, m: 12, s: 45 });
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', city: '', zip: '' });
  const [orderStatus, setOrderStatus] = useState('');
  
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

  // --- 3. GÖRDÍTÉS ---
  const scrollToOrder = () => {
    document.getElementById('order-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // --- 4. RENDELÉS KEZELÉSE ---
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setOrderStatus('loading');

    // Itt történik a rendelés logika (ugyanaz mint eddig)
    const totalAmount = product.price;
    try {
        const orderData = {
            customerName: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: `${formData.zip} ${formData.city}, ${formData.address}`,
            products: [{ name: product.name, price: product.price, quantity: 1 }],
            totalAmount: totalAmount,
            paymentMethod: 'card',
            status: 'Fizetésre vár (PayPal)'
        };

        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });

        const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${PAYPAL_EMAIL}&item_name=${encodeURIComponent(product.name)}&amount=${totalAmount}&currency_code=HUF&return=${encodeURIComponent(window.location.href)}`;
        window.location.href = paypalUrl;

    } catch (error) {
        console.error(error);
        setOrderStatus('');
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-rose-500 selection:text-white pb-20 overflow-hidden">
      
      {/* EXTRA HÓESÉS CSS (Hogy biztosan látszódjon) */}
      <style jsx global>{`
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
        .floating { animation: float 4s ease-in-out infinite; }
        .glass-card {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .text-glow { text-shadow: 0 0 20px rgba(255,255,255,0.4); }
        .gold-gradient { background: linear-gradient(to right, #fcd34d, #d97706); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .rose-gradient { background: linear-gradient(to right, #fb7185, #e11d48); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      `}</style>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-12 px-4">
        {/* Háttér fények */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-600/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -z-10"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Bal oldal: Szöveg */}
            <div className="space-y-8 text-center lg:text-left z-10">
                
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-rose-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(225,29,72,0.3)] floating">
                    <Heart className="text-rose-500 fill-rose-500" size={16} />
                    <span className="text-sm font-bold text-rose-200 uppercase tracking-widest">Valentin Napi Akció</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-black leading-tight text-white drop-shadow-2xl">
                    TELT AJKAK <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-500 to-rose-600 text-glow">
                        FÁJDALOM NÉLKÜL
                    </span>
                </h1>

                <p className="text-lg text-slate-300 leading-relaxed max-w-lg mx-auto lg:mx-0 font-light">
                   Fedezd fel a <strong className="text-white">LIPSES™ technológiát</strong>. Nincs tű, nincs fájdalom, csak gyönyörű, természetes hatású ajkak. A tökéletes ajándék magadnak.
                </p>

                {/* Ár kártya */}
                <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                    <div className="glass-card px-8 py-4 rounded-2xl flex items-center gap-4">
                        <div className="text-right">
                             <span className="block text-slate-500 line-through text-sm decoration-rose-500/50">24.990 Ft</span>
                             <span className="block text-4xl font-black text-white">{product.price.toLocaleString()} Ft</span>
                        </div>
                        <div className="h-10 w-px bg-white/20"></div>
                        <div className="text-left text-xs font-bold uppercase text-amber-400">
                            Limitált <br/> Téli ár
                        </div>
                    </div>
                    
                    <button onClick={scrollToOrder} className="group relative px-8 py-5 bg-gradient-to-r from-rose-600 to-pink-600 rounded-xl font-bold text-white shadow-[0_0_30px_rgba(225,29,72,0.5)] hover:shadow-[0_0_50px_rgba(225,29,72,0.7)] hover:scale-105 transition-all duration-300">
                        <span className="flex items-center gap-2 text-lg">
                            Megrendelem Most <ArrowRight className="group-hover:translate-x-1 transition" />
                        </span>
                        {/* Hópehely a gombon */}
                        <Snowflake className="absolute top-2 right-2 text-white/20 animate-spin-slow" size={20} />
                    </button>
                </div>

                <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-400">
                    <div className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-500"/> Ingyenes Szállítás</div>
                    <div className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-500"/> 100% Pénzvisszafizetés</div>
                </div>
            </div>

            {/* Jobb oldal: Kép Effect */}
            <div className="relative group perspective-1000 z-10 mt-10 lg:mt-0">
                {/* Díszítő elemek */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-400/20 blur-[50px] rounded-full"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-rose-500/20 blur-[50px] rounded-full"></div>
                
                <div className="relative rounded-[2.5rem] overflow-hidden border border-white/20 shadow-2xl bg-slate-900/50 transform group-hover:rotate-1 transition duration-700">
                    <img 
                        src={product.imageUrl} 
                        alt="Lipses Pen" 
                        className="w-full h-auto object-cover opacity-90 group-hover:scale-105 transition duration-700" 
                    />
                    
                    {/* Fagyos hatás overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                    
                    {/* Floating Badge */}
                    <div className="absolute bottom-8 left-8 right-8 glass-card p-4 rounded-xl flex items-center justify-between">
                         <div>
                            <p className="text-xs text-rose-300 font-bold uppercase mb-1">Akció vége:</p>
                            <div className="flex gap-2 font-mono text-xl font-bold text-white">
                                <span>0{timeLeft.h}</span>:<span>{timeLeft.m}</span>:<span>{timeLeft.s}</span>
                            </div>
                         </div>
                         <div className="h-10 w-10 bg-rose-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                            <Gift className="text-white" size={20} />
                         </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- FEATURE GRID (Miért válaszd?) --- */}
      <section className="py-20 bg-slate-900/50 backdrop-blur-sm">
         <div className="max-w-7xl mx-auto px-4">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 
                 <div className="glass-card p-8 rounded-2xl hover:bg-white/5 transition duration-300 border-t-4 border-rose-500">
                    <div className="w-14 h-14 bg-rose-500/20 rounded-full flex items-center justify-center mb-6 text-rose-500">
                        <ShieldCheck size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Biztonságos & Tűmentes</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        A sűrített levegős technológiának köszönhetően nem kell tűszúrástól tartanod. Nincs fájdalom, nincs vérzés.
                    </p>
                 </div>

                 <div className="glass-card p-8 rounded-2xl hover:bg-white/5 transition duration-300 border-t-4 border-amber-400">
                    <div className="w-14 h-14 bg-amber-400/20 rounded-full flex items-center justify-center mb-6 text-amber-400">
                        <Zap size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Azonnali Eredmény</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Már az első használat után látványos a változás. Telt, hidratált ajkak mindössze 10 perc alatt.
                    </p>
                 </div>

                 <div className="glass-card p-8 rounded-2xl hover:bg-white/5 transition duration-300 border-t-4 border-cyan-400">
                    <div className="w-14 h-14 bg-cyan-400/20 rounded-full flex items-center justify-center mb-6 text-cyan-400">
                        <Sparkles size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Prémium Minőség</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Több ezer elégedett magyar vásárló. Orvosi acél fejjel és strapabíró kialakítással a hosszú élettartamért.
                    </p>
                 </div>

             </div>
         </div>
      </section>

      {/* --- ORDER SECTION (A Pénzcsináló Rész) --- */}
      <div id="order-section" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-rose-950/20 -z-10"></div>
        
        <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
                <span className="text-rose-500 font-bold tracking-widest uppercase text-sm">Ne maradj le</span>
                <h2 className="text-3xl md:text-5xl font-black text-white mt-2 mb-4">Kérd a Csomagod Most!</h2>
                <p className="text-slate-400">Töltsd ki az adatokat, és a rendszer átirányít a biztonságos fizetéshez.</p>
            </div>

            <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-1 shadow-2xl">
                <div className="bg-slate-950 rounded-[1.3rem] p-6 md:p-10 border border-white/5">
                    
                    {/* Termék összesítő sáv */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-lg bg-slate-800 overflow-hidden">
                                <img src={product.imageUrl} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white">{product.name}</h4>
                                <span className="text-xs text-rose-400 uppercase font-bold">Valentin Csomag</span>
                            </div>
                        </div>
                        <div className="text-right">
                             <div className="text-xl font-bold text-white">{product.price.toLocaleString()} Ft</div>
                             <div className="text-xs text-slate-500 line-through">{product.originalPrice.toLocaleString()} Ft</div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase ml-1 mb-1">Teljes Név</label>
                                <input required type="text" placeholder="Pl. Kiss Anna" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition" 
                                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase ml-1 mb-1">Email Cím</label>
                                    <input required type="email" placeholder="email@pelda.hu" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition" 
                                        value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase ml-1 mb-1">Telefonszám</label>
                                    <input required type="tel" placeholder="+36 30 ..." className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition" 
                                        value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-span-1">
                                    <label className="block text-xs font-bold text-slate-400 uppercase ml-1 mb-1">Ir. Szám</label>
                                    <input required type="text" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-rose-500 outline-none" 
                                        value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})} />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-xs font-bold text-slate-400 uppercase ml-1 mb-1">Város</label>
                                    <input required type="text" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-rose-500 outline-none" 
                                        value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                                </div>
                            </div>
                             <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase ml-1 mb-1">Utca, házszám</label>
                                <input required type="text" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition" 
                                    value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                            </div>
                        </div>

                        {/* Fizetési mód választó design */}
                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="relative p-4 rounded-xl border-2 border-rose-500 bg-rose-500/10 cursor-pointer transition hover:bg-rose-500/20">
                                <div className="absolute top-2 right-2 text-rose-500"><CheckCircle size={18} /></div>
                                <div className="text-center">
                                    <CreditCard className="mx-auto mb-2 text-rose-400" size={24} />
                                    <span className="block text-sm font-bold text-white">Bankkártya / PayPal</span>
                                </div>
                            </div>
                             <div className="relative p-4 rounded-xl border border-slate-700 bg-slate-800/50 opacity-50 cursor-not-allowed">
                                <div className="text-center grayscale">
                                    <Banknote className="mx-auto mb-2 text-slate-500" size={24} />
                                    <span className="block text-sm font-bold text-slate-500">Utánvét</span>
                                    <span className="text-[10px] text-amber-500 font-bold uppercase mt-1 block">Február 10-től</span>
                                </div>
                            </div>
                        </div>

                        <button type="submit" disabled={orderStatus === 'loading'} className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-900 font-black text-xl py-4 rounded-xl shadow-[0_0_20px_rgba(251,191,36,0.4)] transform active:scale-95 transition-all flex items-center justify-center gap-2 mt-6">
                            {orderStatus === 'loading' ? <span className="animate-spin">❄</span> : <>Megrendelés Leadása <ArrowRight size={22} /></>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
}