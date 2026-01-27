"use client";
import { useState, useEffect } from 'react';
// Ikonok (Lucide-react csomagból, ami már telepítve van nálad)
import { Star, Check, Shield, ArrowRight, CreditCard, Banknote, ThumbsUp, AlertTriangle, Clock, CheckCircle, Snowflake } from 'lucide-react';

export default function Home() {

  // --- 1. VÁLTOZÓK (EZ AZ AGY, EZT NEM BÁNTJUK) ---
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ h: 3, m: 12, s: 45 });
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', city: '', zip: '' });
  const [orderStatus, setOrderStatus] = useState('');

  const PAYPAL_EMAIL = "stylefaqu@gmail.com"; 

  // --- 2. IDŐZÍTŐ LOGIKA ---
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

  // --- 3. TERMÉK ADATOK LEKÉRÉSE (API HÍVÁS) ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Itt hívjuk meg a te backend API-dat, ami a mappáidban van
        const prodRes = await fetch('/api/products');
        const prodData = await prodRes.json();
        setProduct(prodData);
        setLoading(false);
      } catch (err) { console.error(err); }
    };
    fetchData();
  }, []);

  // --- HÓESÉS EFFEKT LOGIKA ---
  useEffect(() => {
    const createSnowflake = () => {
      const snowflake = document.createElement('div');
      snowflake.classList.add('snowflake');
      snowflake.style.left = Math.random() * 100 + 'vw';
      snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
      snowflake.style.opacity = Math.random().toString();
      snowflake.innerText = '❄';
      
      const container = document.getElementById('snow-container');
      if (container) {
        container.appendChild(snowflake);
        setTimeout(() => {
          snowflake.remove();
        }, 5000);
      }
    };
    // Kicsit ritkítottam a hóesést, hogy ne terhelje a telefont
    const interval = setInterval(createSnowflake, 300);
    return () => clearInterval(interval);
  }, []);

  // --- 4. STATIKUS KOMMENTEK (EZEK CSAK SZÖVEGEK) ---
  const staticReviews = [
    {
      author: "Varga Niki",
      text: "Lányok, ez valami kegyetlen! 😱 Azt hittem kamu, de 2 perc alatt olyat csinált a számmal, mintha töltettem volna. Kicsit bizserget, de megéri!",
      rating: 5,
      date: "2 órája",
      verified: true,
      hasPhoto: false,
      likes: 24 
    },
    {
      author: "Kovács Petra",
      text: "Nagyon gyorsan megjött! A gép kicsit hangosabb, mint gondoltam, ezért csak 4 csillag, de az eredmény tényleg brutál. Randi előtt kötelező.",
      rating: 4,
      date: "5 órája",
      verified: true,
      hasPhoto: false,
      likes: 12
    },
    {
      author: "Tóth Eszter",
      text: "Már a barátnőmnek is rendeltem egyet. Imádom, hogy nem kell tűszúrás. Az Apple formájút használom, nagyon kényelmes.",
      rating: 5,
      date: "Tegnap",
      verified: true,
      hasPhoto: false,
      likes: 58
    },
    {
        author: "Nagy Anna",
        text: "A Téli akcióban vettem 2 darabot, a legjobb döntés volt! Ajándékba is tökéletes.",
        rating: 5,
        date: "Ma",
        verified: true,
        hasPhoto: false,
        likes: 102
      }
  ];

  // --- 5. GÖRGETÉS FUNKCIÓ ---
  const scrollToOrder = () => {
    document.getElementById('order-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const calculateTotal = () => {
    if (!product) return 0;
    return product.price;
  };

  // --- 6. RENDELÉS LEADÁSA (EZ A KRITIKUS RÉSZ - ÉRINTETLEN) ---
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setOrderStatus('loading');

    const totalAmount = calculateTotal();

    try {
        const orderData = {
            customerName: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: "Magyarország",
            zip: "0000",
            products: [{ name: product.name, price: product.price, quantity: 1 }],
            totalAmount: totalAmount,
            paymentMethod: 'card',
            status: 'Fizetésre vár (PayPal)'
        };

        // Itt küldi el az adatokat a te meglévő backend API-dnak
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });

        if (response.ok) {
            // Átirányítás a PayPalra
            const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${PAYPAL_EMAIL}&item_name=${encodeURIComponent(product.name)}&amount=${totalAmount}&currency_code=HUF&return=${encodeURIComponent(window.location.href)}`;
            window.location.href = paypalUrl;
        } else {
            alert("Hiba történt a rendelés feldolgozásakor. Kérlek próbáld újra!");
            setOrderStatus('');
        }
    } catch (error) {
        console.error("Hiba:", error);
        setOrderStatus('');
    }
  };

  // --- 7. BETÖLTŐ KÉPERNYŐ (LOADING) ---
  if (loading || !product) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a2a] text-[#ffd700] font-medium">
            <div className="animate-spin mr-3">❄</div> Betöltés...
        </div>
    );
  }

  // --- 8. A DESIGN (HTML SZERKEZET) ---
  return (
    <div className="min-h-screen bg-[#0a0a2a] text-white font-sans relative overflow-x-hidden selection:bg-[#ffd700] selection:text-black">
      
      {/* GLOBAL STYLES (Szabványos React formátum) */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;500;700;900&display=swap');
        body { font-family: 'Outfit', sans-serif; }
        .snowflake {
          position: absolute;
          top: -20px;
          color: white;
          font-size: 14px;
          user-select: none;
          z-index: 1;
          pointer-events: none;
          animation-name: fall;
          animation-timing-function: linear;
        }
        @keyframes fall {
          to { transform: translateY(100vh); }
        }
        .glass-panel {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 215, 0, 0.2);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }
        .gold-glow {
            text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
        }
      `}} />

      {/* HÓESÉS HELYE */}
      <div id="snow-container" className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-50"></div>

      {/* FEJLÉC */}
      <nav className="fixed w-full top-0 z-50 bg-[#0a0a2a]/80 backdrop-blur-md border-b border-[#ffd700]/30 py-4 transition-all">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
          <span className="text-2xl font-black text-[#ffd700] tracking-widest uppercase flex items-center gap-2">
             LIPSES <span className="text-xs border border-[#ffd700] px-2 rounded-full font-normal text-white">Winter Edition</span>
          </span>
          <button onClick={scrollToOrder} className="bg-[#ffd700] text-[#0a0a2a] px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition shadow-[0_0_15px_rgba(255,215,0,0.5)] flex items-center gap-2">
            Megrendelem <ArrowRight size={16} />
          </button>
        </div>
      </nav>

      <main className="relative z-10 pt-20">
        
        {/* HERO SZEKCIÓ (Fő rész) */}
        <section className="max-w-5xl mx-auto px-4 py-12 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* KÉP + TÉLI AKCIÓ CÍMKE */}
            <div className="relative group">
               <div className="absolute -top-6 -left-4 bg-[#ffd700] text-[#0a0a2a] px-4 py-2 rounded-lg shadow-xl z-20 border-2 border-white transform -rotate-3 animate-pulse">
                 <p className="text-lg font-black uppercase">Téli Akció!</p>
               </div>

               <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(255,215,0,0.15)] border-4 border-[#ffd700]/20 relative">
                 <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700" onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=800"; }} />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a2a] via-transparent to-transparent opacity-60"></div>
               </div>
            </div>

            <div className="space-y-8 text-center md:text-left">
              <div>
                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                  <span className="bg-[#ffd700]/20 text-[#ffd700] px-3 py-1 rounded-full text-[10px] font-bold uppercase border border-[#ffd700]/30">Téli limitált széria</span>
                  <div className="flex text-[#ffd700]">
                    {[1,2,3,4,5].map(i => <Star key={i} fill="currentColor" size={14}/>)}
                  </div>
                </div>

                {/* TERMÉK NEVE */}
                <h1 className="text-4xl md:text-6xl font-black text-white leading-none mb-4 gold-glow">{product.name}</h1>

                {/* TERMÉK LEÍRÁSA (HTML renderelve) */}
                <div className="text-lg text-gray-300 leading-relaxed font-light" 
                     dangerouslySetInnerHTML={{ __html: product.description ? product.description.replace(/\n/g, '<br/>') : '' }}>
                </div>
              </div>

              {/* TÉLI LUXUS AJÁNLAT DOBOZ */}
              <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10"><Snowflake size={100} /></div>
                  
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
                      <div>
                          <p className="text-xs text-[#ffd700] font-bold uppercase flex items-center gap-1 mb-1">
                              <Clock size={12}/> Az akció lejár:
                          </p>
                          <p className="text-2xl font-mono font-black text-white">
                              0{timeLeft.h}:{timeLeft.m < 10 ? `0${timeLeft.m}` : timeLeft.m}:{timeLeft.s < 10 ? `0${timeLeft.s}` : timeLeft.s}
                          </p>
                          <p className="text-xs text-gray-400 mt-2 uppercase tracking-wide">Február 10-ig érvényes</p>
                      </div>
                      <div className="text-center md:text-right border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                          <div className="mb-2">
                            <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">HOT DEAL</span>
                          </div>
                          <p className="text-gray-400 line-through text-sm">24.000 Ft helyett</p>
                          {/* !!! ITT VAN A 2000 FT ÁR KIÍRVA !!! */}
                          <p className="text-3xl font-black text-[#ffd700]">2.000 Ft <span className="text-sm text-white font-normal">/ 2 db*</span></p>
                      </div>
                  </div>
              </div>

              <button onClick={scrollToOrder} className="w-full bg-gradient-to-r from-[#ffd700] to-[#e6c200] text-[#0a0a2a] px-8 py-5 rounded-xl font-black text-xl hover:scale-[1.02] transition shadow-[0_0_25px_rgba(255,215,0,0.4)] flex items-center justify-center gap-3">
                Kérem a Téli Csomagot <ArrowRight size={22} />
              </button>
            </div>
          </div>
        </section>

        {/* --- KOMMENTEK --- */}
        <section className="py-16 relative">
          <div className="absolute inset-0 bg-[#ffd700]/5 skew-y-3 transform origin-top-left -z-10"></div>
          
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-[#ffd700] mb-8 flex items-center justify-center gap-2 uppercase tracking-widest text-center">
               Vásárlói vélemények <span className="text-white font-normal text-sm opacity-50">(395)</span>
            </h2>

            <div className="space-y-4">
              {staticReviews.map((review, i) => (
                <div key={i} className="glass-panel p-4 rounded-xl flex gap-4 items-start">
                  <div className="flex-shrink-0">
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[#0a0a2a] font-bold text-sm shadow-lg border border-[#ffd700] ${i===1 ? 'bg-[#ffd700]' : 'bg-white'}`}>
                        {review.author?.charAt(0) || "V"}
                     </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-bold text-sm text-white">{review.author}</h4>
                            <div className="flex text-[#ffd700] text-[10px] my-1">
                                {[...Array(review.rating)].map((_, i) => <Star key={i} fill="currentColor" size={10}/>)}
                            </div>
                        </div>
                        <span className="text-[10px] text-gray-400">{review.date}</span>
                    </div>

                    <p className="text-sm text-gray-300 leading-snug mt-1">{review.text}</p>

                    <div className="flex items-center gap-4 mt-3">
                        {review.verified && (
                            <span className="flex items-center gap-1 text-[10px] text-green-400 border border-green-400/30 px-1.5 py-0.5 rounded">
                                <CheckCircle size={10} /> Ellenőrzött vásárló
                            </span>
                        )}
                        <div className="flex items-center gap-1 text-[10px] text-[#ffd700]">
                            <ThumbsUp size={10} /> {review.likes}
                        </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- ŰRLAP RÉSZ --- */}
        <div id="order-section" className="py-16 relative">
          <div className="max-w-xl mx-auto px-4">

            {/* FIGYELMEZTETÉS */}
            <div className="glass-panel p-5 rounded-xl mb-8 flex items-start gap-4 border-l-4 border-l-[#ffd700]">
                <div className="bg-[#ffd700]/20 p-2 rounded-full">
                    <AlertTriangle className="text-[#ffd700]" size={24} />
                </div>
                <div>
                    <h4 className="text-[#ffd700] font-bold text-sm uppercase mb-1">Téli Fizetési Információ:</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        A nagy érdeklődés miatt jelenleg csak <strong>Bankkártyás fizetés</strong> (PayPal) lehetséges! <br/>
                        Az utánvétes fizetés <strong>Február 10-én</strong> nyílik meg újra.
                    </p>
                </div>
            </div>

            <div className="bg-[#0f0f1a] border border-[#ffd700]/30 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden relative">
              <div className="bg-gradient-to-r from-[#ffd700] to-[#b39700] p-6 text-[#0a0a2a] text-center relative overflow-hidden">
                <h3 className="text-2xl font-black mb-1 uppercase">Rendelés Leadása</h3>
                <p className="text-[#0a0a2a]/80 text-xs font-bold uppercase tracking-widest">Biztonságos SSL Kapcsolat</p>
              </div>

              <div className="p-6 md:p-8">
                {orderStatus === 'success' ? (
                  <div className="text-center py-10">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500"><Check size={40} className="text-green-500" /></div>
                    <h3 className="text-2xl font-bold text-white mb-2">Köszönjük! 🎉</h3>
                    <p className="text-gray-400 text-sm mb-6">A fizetést sikeresen rögzítettük.</p>
                    <button onClick={() => setOrderStatus('')} className="text-[#ffd700] font-bold text-sm hover:underline">Új rendelés</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">

                    <div className="grid grid-cols-2 gap-4">
                        <div className="cursor-pointer p-4 rounded-xl border-2 border-[#ffd700] bg-[#ffd700]/10 relative transition hover:bg-[#ffd700]/20">
                            <div className="absolute top-2 right-2 text-[#ffd700]"><CheckCircle size={18} /></div>
                            <div className="flex flex-col items-center text-center">
                                <CreditCard className="text-[#ffd700] mb-2" size={28} />
                                <span className="font-bold text-white text-sm">Bankkártya</span>
                                <span className="text-[10px] text-[#0a0a2a] font-bold mt-2 bg-[#ffd700] px-2 py-0.5 rounded">INGYEN SZÁLLÍTÁS</span>
                            </div>
                        </div>

                        <div className="relative p-4 rounded-xl border border-gray-700 bg-gray-800/50 opacity-50 cursor-not-allowed grayscale">
                             <div className="absolute inset-0 flex items-center justify-center z-10 text-center px-1">
                                <div className="bg-[#0a0a2a] px-3 py-1 rounded border border-gray-600 shadow-xl transform -rotate-3">
                                    <span className="block text-[10px] text-gray-400 font-bold uppercase">Nyitás:</span>
                                    <span className="block text-xs font-black text-[#ffd700]">FEBRUÁR 10.</span>
                                </div>
                             </div>
                            <div className="flex flex-col items-center text-center blur-[2px]">
                                <Banknote className="text-gray-500 mb-2" size={28} />
                                <span className="font-bold text-gray-400 text-sm">Utánvét</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                       <div>
                           <label className="text-[11px] font-bold text-[#ffd700] uppercase ml-1 tracking-wider">Név</label>
                           <input required type="text" className="w-full p-4 bg-[#0a0a2a] border border-gray-700 rounded-xl text-white text-sm focus:border-[#ffd700] focus:ring-1 focus:ring-[#ffd700] outline-none transition placeholder-gray-600" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Pl. Minta Éva" />
                       </div>
                       
                       <div className="grid grid-cols-2 gap-4">
                           <div>
                               <label className="text-[11px] font-bold text-[#ffd700] uppercase ml-1 tracking-wider">Email</label>
                               <input required type="email" className="w-full p-4 bg-[#0a0a2a] border border-gray-700 rounded-xl text-white text-sm focus:border-[#ffd700] focus:ring-1 focus:ring-[#ffd700] outline-none transition placeholder-gra