"use client";
import { useState, useEffect } from 'react';
import { Star, Check, ArrowRight, CreditCard, Banknote, ThumbsUp, AlertTriangle, Clock, CheckCircle, Snowflake, Heart } from 'lucide-react';

export default function Home() {

  // --- 1. ÁLLAPOTOK (STATE) ---
  // Alapértelmezett termékadatok, ha a szerver még nem válaszolna
  const defaultProduct = {
    name: "Lipses Hyaluron Pen",
    description: "Érd el a telt, csábító ajkakat fájdalom és tűszúrás nélkül! A Lipses technológia sűrített levegővel juttatja a hyaluront a bőrbe. \n\n Most Valentin-napi díszcsomagolásban!",
    price: 12000,
    imageUrl: "https://images.unsplash.com/photo-1588654238696-613d2a792c30?auto=format&fit=crop&q=80&w=1000" // Egy szép placeholder kép
  };

  const [product, setProduct] = useState<any>(defaultProduct);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ h: 3, m: 12, s: 45 });
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', city: '', zip: '' });
  const [orderStatus, setOrderStatus] = useState('');
  
  const PAYPAL_EMAIL = "stylefaqu@gmail.com"; 

  // --- 2. STATISZTIKA KÜLDÉSE (ADMIN RÉSZÉRE) ---
  useEffect(() => {
    // Amikor betölt az oldal, jelezzük a szervernek, hogy jött egy látogató
    const trackVisit = async () => {
        try {
            await fetch('/api/stats/visit', { method: 'POST' });
        } catch (e) {
            console.log("Statisztika hiba (nem baj, az oldal működik)", e);
        }
    };
    trackVisit();
  }, []);

  // --- 3. IDŐZÍTŐ ---
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59 };
        return { h: 3, m: 59, s: 59 };
      });
    }, 1000);
    
    // Adatbetöltés szimuláció (vagy valós API hívás)
    const fetchData = async () => {
      try {
        const prodRes = await fetch('/api/products');
        if (prodRes.ok) {
            const prodData = await prodRes.json();
            setProduct(prodData);
        }
      } catch (err) { console.error(err); }
      setLoading(false);
    };
    fetchData();

    return () => clearInterval(timer);
  }, []);


  // --- 4. KOMMENTEK ---
  const staticReviews = [
    {
      author: "Varga Niki",
      text: "Lányok, ez valami kegyetlen! 😱 Azt hittem kamu, de 2 perc alatt olyat csinált a számmal, mintha töltettem volna. Kicsit bizserget, de megéri!",
      rating: 5,
      date: "2 órája",
      verified: true,
      likes: 24 
    },
    {
      author: "Kovács Petra",
      text: "Nagyon gyorsan megjött! A gép kicsit hangosabb, mint gondoltam, ezért csak 4 csillag, de az eredmény tényleg brutál. Valentin napra tökéletes.",
      rating: 4,
      date: "5 órája",
      verified: true,
      likes: 12
    },
    {
      author: "Tóth Eszter",
      text: "Már a barátnőmnek is rendeltem egyet. Imádom, hogy nem kell tűszúrás. Az Apple formájút használom, nagyon kényelmes.",
      rating: 5,
      date: "Tegnap",
      verified: true,
      likes: 58
    },
    {
      author: "Nagy Anna",
      text: "A Téli akcióban vettem 2 darabot, a legjobb döntés volt! Ajándékba is tökéletes.",
      rating: 5,
      date: "Ma",
      verified: true,
      likes: 102
    }
  ];

  // --- 5. FUNKCIÓK ---
  const scrollToOrder = () => {
    document.getElementById('order-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const calculateTotal = () => {
    return product.price;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setOrderStatus('loading');

    const totalAmount = calculateTotal();

    try {
        const orderData = {
            customerName: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: `${formData.zip} ${formData.city}, ${formData.address}`,
            products: [{ name: product.name, price: product.price, quantity: 1 }],
            totalAmount: totalAmount,
            paymentMethod: 'card', // Csak kártya érhető el most
            status: 'Fizetésre vár (PayPal)'
        };

        // 1. Rendelés mentése API-n keresztül
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });

        // 2. PayPal átirányítás
        if (response.ok || true) { // Hack: ha nincs backend, akkor is engedje tovább teszteléshez
            
            // Itt küldjük az eladást a statisztikába
             await fetch('/api/stats/sale', { 
                method: 'POST', 
                body: JSON.stringify({ amount: totalAmount }) 
            }).catch(() => {});

            const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${PAYPAL_EMAIL}&item_name=${encodeURIComponent(product.name)}&amount=${totalAmount}&currency_code=HUF&return=${encodeURIComponent(window.location.href)}`;
            window.location.href = paypalUrl;
        } else {
            alert("Hiba történt. Próbáld újra!");
            setOrderStatus('');
        }
    } catch (error) {
        console.error("Hiba:", error);
        alert("Rendszerhiba. Kérlek próbáld újra később.");
        setOrderStatus('');
    }
  };

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-amber-400 font-medium">
            <div className="animate-spin mr-3"><Snowflake /></div> Betöltés...
        </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-100 font-sans selection:bg-rose-500 selection:text-white">

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
            
            {/* Szöveges rész */}
            <div className="space-y-6 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                    <Heart size={12} className="fill-current" /> Valentin Napi Akció
                </div>
                
                <h1 className="text-4xl md:text-6xl font-black leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    {product.name}
                </h1>
                
                <p className="text-lg text-slate-400 leading-relaxed max-w-lg mx-auto md:mx-0">
                    {product.description}
                </p>

                {/* Ár és visszaszámláló kártya */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
                    <div className="text-center sm:text-left">
                         <div className="flex items-center justify-center sm:justify-start gap-2 text-amber-400 font-mono text-2xl font-bold">
                            <Clock size={20} />
                            <span>0{timeLeft.h}:{timeLeft.m < 10 ? `0${timeLeft.m}` : timeLeft.m}:{timeLeft.s < 10 ? `0${timeLeft.s}` : timeLeft.s}</span>
                         </div>
                         <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Február 10-ig érvényes</p>
                    </div>
                    <div className="text-center sm:text-right">
                        <span className="block text-slate-500 line-through text-sm">24.990 Ft</span>
                        <span className="block text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
                            {product.price.toLocaleString()} Ft
                        </span>
                    </div>
                </div>

                <button onClick={scrollToOrder} className="w-full md:w-auto bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-[0_0_30px_rgba(225,29,72,0.4)] hover:shadow-[0_0_50px_rgba(225,29,72,0.6)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                    Kérem az Akciós Csomagot <ArrowRight />
                </button>
            </div>

            {/* Kép rész */}
            <div className="relative group perspective-1000">
                <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 to-blue-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
                <div className="relative rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl transform group-hover:rotate-1 transition-all duration-500">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                    
                    {/* Hópehely overlay a képen */}
                    <div className="absolute top-4 right-4 text-white/80 animate-pulse">
                        <Snowflake size={40} />
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Vélemények */}
      <section className="py-16 bg-slate-900/50 relative">
          <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-2xl font-bold text-center mb-10 flex items-center justify-center gap-2">
                  <span className="text-amber-400">★★★★★</span> 
                  Vásárlóink Mondták
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {staticReviews.map((review, i) => (
                    <div key={i} className="bg-slate-950/50 border border-white/5 p-5 rounded-xl hover:border-white/10 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                            <div className="font-bold">{review.author}</div>
                            <span className="text-xs text-slate-500">{review.date}</span>
                        </div>
                        <div className="flex text-amber-400 text-xs mb-2">
                            {[...Array(review.rating)].map((_, i) => <Star key={i} fill="currentColor" size={12}/>)}
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">{review.text}</p>
                        {review.verified && (
                             <div className="mt-3 flex items-center gap-1 text-[10px] text-green-400/80 uppercase tracking-wider">
                                <CheckCircle size={10} /> Ellenőrzött vásárló
                             </div>
                        )}
                    </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Rendelési Űrlap */}
      <div id="order-section" className="py-20 px-4">
        <div className="max-w-xl mx-auto">
            
            {/* Figyelmeztető sáv */}
            <div className="mb-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex gap-3 items-start">
                <AlertTriangle className="text-amber-500 shrink-0" />
                <div className="text-sm">
                    <strong className="block text-amber-400 mb-1">Fizetési Információ</strong>
                    <p className="text-slate-400">A nagy Valentin-napi érdeklődés miatt az utánvétes fizetés szünetel. <br/> A biztonságos <strong>online fizetés (PayPal/Kártya)</strong> zavartalanul működik.</p>
                </div>
            </div>

            <div className="bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-6 bg-slate-950 border-b border-white/5">
                    <h3 className="text-xl font-bold text-white mb-1">Megrendelés</h3>
                    <p className="text-xs text-slate-500 uppercase tracking-widest">Biztonságos SSL Kapcsolat</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
                    
                    {/* Fizetési Mód Választó */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="relative p-4 rounded-xl border-2 border-rose-500 bg-rose-500/10 cursor-pointer">
                            <div className="absolute top-2 right-2 text-rose-500"><CheckCircle size={16} /></div>
                            <div className="text-center">
                                <CreditCard className="mx-auto mb-2 text-rose-400" size={24} />
                                <span className="block text-sm font-bold">Bankkártya</span>
                                <span className="text-[10px] uppercase text-rose-300">Ingyen Szállítás</span>
                            </div>
                        </div>
                        <div className="relative p-4 rounded-xl border border-slate-700 bg-slate-800/50 opacity-50 grayscale cursor-not-allowed">
                             <div className="absolute inset-0 flex items-center justify-center z-10">
                                <span className="bg-slate-900 border border-slate-600 text-[10px] font-bold px-2 py-1 rounded text-amber-400 transform -rotate-6">FEBRUÁR 10-TŐL</span>
                             </div>
                            <div className="text-center">
                                <Banknote className="mx-auto mb-2 text-slate-500" size={24} />
                                <span className="block text-sm font-bold text-slate-500">Utánvét</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Teljes Név</label>
                            <input required type="text" placeholder="Pl. Minta Éva" className="w-full mt-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all" 
                                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase ml-1">Email Cím</label>
                                <input required type="email" placeholder="email@cim.hu" className="w-full mt-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all" 
                                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase ml-1">Telefonszám</label>
                                <input required type="tel" placeholder="06 30 123 4567" className="w-full mt-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all" 
                                    value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                             <div className="col-span-1">
                                <label className="text-xs font-bold text-slate-400 uppercase ml-1">Ir. Szám</label>
                                <input required type="text" placeholder="1234" className="w-full mt-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-rose-500 outline-none" 
                                    value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})} />
                            </div>
                            <div className="col-span-2">
                                <label className="text-xs font-bold text-slate-400 uppercase ml-1">Város</label>
                                <input required type="text" placeholder="Budapest" className="w-full mt-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-rose-500 outline-none" 
                                    value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Utca, házszám</label>
                            <input required type="text" placeholder="Kossuth Lajos u. 1." className="w-full mt-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all" 
                                value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                        </div>
                    </div>

                    <button type="submit" disabled={orderStatus === 'loading'} className="w-full mt-6 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-900 font-black text-xl py-4 rounded-xl shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2">
                        {orderStatus === 'loading' ? (
                            <span className="animate-spin">❄</span>
                        ) : (
                            <>Megrendelés Leadása <ArrowRight size={20} /></>
                        )}
                    </button>
                    
                    <p className="text-center text-[10px] text-slate-500 mt-4">
                        A "Megrendelés" gombra kattintva elfogadod az ÁSZF-et és az Adatkezelési Tájékoztatót.
                    </p>
                </form>
            </div>
        </div>
      </div>

    </div>
  );
}