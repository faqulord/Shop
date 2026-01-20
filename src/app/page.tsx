"use client";
import { useState, useEffect } from 'react';
// Ikonok importálása
import { Star, Check, Shield, ArrowRight, Heart, CreditCard, Banknote, ThumbsUp, AlertTriangle, Zap, Clock, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Home() {
  
  // --- 1. KÉPGALÉRIA BEÁLLÍTÁSA (ITT CSERÉLD A LINKEKET!) ---
  // Fontos: Ide másold be a saját képeid linkjét a macskakörmök közé!
  const productImages = [
    "https://cc-west-usa.oss-accelerate.aliyuncs.com/20240314/2301130391666.jpg", // 1. Fő kép (A gép szemből)
    "https://cc-west-usa.oss-accelerate.aliyuncs.com/20240314/6682054625292.jpg", // 2. Kép (Használat közben / Doboz)
    "https://cc-west-usa.oss-accelerate.aliyuncs.com/20240314/1580231904712.jpg"  // 3. Kép (Részletek)
  ];

  const [currentImg, setCurrentImg] = useState(0);

  const nextImage = () => {
    setCurrentImg((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImg((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
  };

  // --- 2. VÁLTOZÓK ---
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ h: 3, m: 12, s: 45 });
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', city: '', zip: '' });
  const [orderStatus, setOrderStatus] = useState('');
  
  const PAYPAL_EMAIL = "stylefaqu@gmail.com"; 

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
    return () => clearInterval(timer);
  }, []);

  // --- 4. ADATLEKÉRÉS ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const prodRes = await fetch('/api/products');
        const prodData = await prodRes.json();
        setProduct(prodData);
        setLoading(false);
      } catch (err) { console.error(err); }
    };
    fetchData();
  }, []);

  // --- 5. KOMMENTEK ---
  const staticReviews = [
    {
      author: "Varga Niki",
      text: "Lányok, ez valami kegyetlen! 😱 Azt hittem kamu, de 2 perc alatt olyat csinált a számmal, mintha töltettem volna. Kicsit bizserget, de megéri!",
      rating: 5,
      date: "2 órája",
      verified: true,
      hasPhoto: false
    },
    {
      author: "Kovács Petra",
      text: "Nagyon gyorsan megjött! A gép kicsit hangosabb, mint gondoltam, ezért csak 4 csillag, de az eredmény tényleg brutál. Randi előtt kötelező.",
      rating: 4,
      date: "5 órája",
      verified: true,
      hasPhoto: false
    },
    {
      author: "Tóth Eszter",
      text: "Már a barátnőmnek is rendeltem egyet. Imádom, hogy nem kell tűszúrás. Az Apple formájút használom, nagyon kényelmes.",
      rating: 5,
      date: "Tegnap",
      verified: true,
      hasPhoto: false
    }
  ];

  // --- 6. NAVIGÁCIÓ ---
  const scrollToOrder = () => {
    document.getElementById('order-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const calculateTotal = () => {
    if (!product) return 0;
    return product.price;
  };

  // --- 7. RENDELÉS LEADÁSA ---
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

        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });

        if (response.ok) {
            const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${PAYPAL_EMAIL}&item_name=${encodeURIComponent(product.name)}&amount=${totalAmount}&currency_code=HUF&return=${encodeURIComponent(window.location.href)}`;
            window.location.href = paypalUrl;
        } else {
            alert("Hiba történt. Próbáld újra!");
            setOrderStatus('');
        }
    } catch (error) {
        console.error("Hiba:", error);
        setOrderStatus('');
    }
  };

  // --- 8. BETÖLTÉS ---
  if (loading || !product) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500 font-medium">Betöltés...</div>;
  }

  // --- 9. FŐOLDAL HTML ---
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      
      {/* FEJLÉC */}
      <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm py-3">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
          <span className="text-2xl font-black text-pink-600 tracking-tighter">LIPSES.</span>
          <button onClick={scrollToOrder} className="bg-black text-white px-5 py-2 rounded-full font-bold text-xs hover:scale-105 transition shadow-lg flex items-center gap-2">
            Megrendelem <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      <main>
        {/* HERO SZEKCIÓ */}
        <section className="max-w-5xl mx-auto px-4 py-8 lg:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* --- KÉPGALÉRIA (SLIDER) --- */}
            <div className="relative group">
               {/* -50% DOBOZ */}
               <div className="absolute top-4 right-4 bg-red-600 text-white w-14 h-14 flex items-center justify-center rounded-full shadow-xl z-20 border-2 border-white animate-pulse">
                 <p className="text-lg font-black">-50%</p>
               </div>
               
               {/* A KÉP */}
               <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-gray-100 border-4 border-white relative">
                 <img 
                    src={productImages[currentImg]} 
                    alt="Product" 
                    className="w-full h-full object-cover transition-all duration-500 ease-in-out"
                    onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=800"; }} 
                 />
                 
                 {/* BALRA NYÍL */}
                 <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md backdrop-blur-sm transition">
                    <ChevronLeft size={24} />
                 </button>

                 {/* JOBBRA NYÍL */}
                 <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md backdrop-blur-sm transition">
                    <ChevronRight size={24} />
                 </button>

                 {/* PÖTTYÖK ALUL */}
                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {productImages.map((_, idx) => (
                        <div key={idx} className={`w-2 h-2 rounded-full transition-all ${currentImg === idx ? 'bg-pink-600 w-4' : 'bg-white/60'}`} />
                    ))}
                 </div>
               </div>
            </div>

            {/* TERMÉK INFÓK */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase">TŰMENTES TECHNOLÓGIA</span>
                  <div className="flex text-yellow-400">
                    {[1,2,3,4,5].map(i => <Star key={i} fill="currentColor" size={14}/>)}
                  </div>
                  <span className="text-gray-400 text-xs">(395 vélemény)</span>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-4">{product.name}</h1>
                
                <div className="text-lg font-medium text-black leading-relaxed" 
                     dangerouslySetInnerHTML={{ __html: product.description ? product.description.replace(/\n/g, '<br/>') : '' }}>
                </div>
              </div>

              {/* VISSZASZÁMLÁLÓ */}
              <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center justify-between">
                  <div>
                      <p className="text-xs text-red-500 font-bold uppercase flex items-center gap-1">
                          <Clock size={12}/> Az akció lejár:
                      </p>
                      <p className="text-xl font-mono font-black text-red-600">
                          0{timeLeft.h}:{timeLeft.m < 10 ? `0${timeLeft.m}` : timeLeft.m}:{timeLeft.s < 10 ? `0${timeLeft.s}` : timeLeft.s}
                      </p>
                  </div>
                  <div className="text-right">
                      <p className="text-gray-400 line-through text-sm">{product.originalPrice?.toLocaleString()} Ft</p>
                      <p className="text-2xl font-black text-gray-900">{product.price.toLocaleString()} Ft</p>
                  </div>
              </div>

              {/* ELŐNYÖK */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm mb-3"><Zap className="text-pink-500 fill-pink-500" size={18} /> Miért imádják a nők?</h3>
                <ul className="space-y-2 text-base">
                  <li className="flex items-center gap-2 text-black font-bold"><Check size={18} className="text-green-600"/> Tűmentes "Russian Lips" hatás</li>
                  <li className="flex items-center gap-2 text-black font-bold"><Check size={18} className="text-green-600"/> Természetes kollagén-aktiválás (Vegyszermentes)</li>
                  <li className="flex items-center gap-2 text-black font-bold"><Check size={18} className="text-green-600"/> Hialuronnal & növényi olajokkal is használható!</li>
                </ul>
              </div>

              <button onClick={scrollToOrder} className="w-full bg-gray-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-black transition shadow-xl flex items-center justify-center gap-2">
                Kérem a készüléket <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* KOMMENTEK SZEKCIÓ */}
        <section className="bg-white py-10 border-t border-gray-100">
          <div className="max-w-xl mx-auto px-4">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                Vásárlói vélemények <span className="text-gray-500 font-normal text-sm">(395)</span>
            </h2>
            
            <div className="space-y-4">
              {staticReviews.map((review, i) => (
                <div key={i} className="flex gap-2 items-start animate-fade-in-up">
                  <div className="flex-shrink-0">
                     {review.imageUrl && !review.hasPhoto ? (
                        <img src={review.imageUrl} className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border border-gray-200" alt="Avatar"/>
                     ) : (
                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm ${i===1 ? 'bg-purple-600' : 'bg-blue-600'}`}>
                           {review.author?.charAt(0) || "V"}
                        </div>
                     )}
                  </div>

                  <div className="flex-1">
                    <div className="bg-[#f0f2f5] px-3 py-2 rounded-[18px] inline-block relative min-w-[180px]">
                        <div className="flex items-center gap-1">
                            <h4 className="font-bold text-[13px] text-gray-900 cursor-pointer hover:underline">
                                {review.author}
                            </h4>
                            {review.verified && <CheckCircle size={12} className="text-blue-500 fill-blue-500 text-white" />}
                        </div>
                        
                        <div className="flex text-yellow-500 text-[10px] mb-1">
                            {[...Array(review.rating)].map((_, i) => <Star key={i} fill="currentColor" size={8}/>)}
                        </div>

                        <p className="text-[14px] text-gray-800 leading-snug mt-0.5">{review.text}</p>
                        
                        <div className="absolute -bottom-2 -right-1 bg-white rounded-full shadow-md border border-gray-100 flex items-center gap-1 px-1 py-0.5 cursor-pointer">
                            <div className="bg-blue-500 rounded-full p-[2px]"><ThumbsUp size={8} fill="white" className="text-white"/></div>
                            <span className="text-[10px] text-gray-500 font-bold">{Math.floor(Math.random() * 30) + 5}</span>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-1 ml-3 text-[11px] font-bold text-gray-500">
                        <span className="cursor-pointer hover:underline text-gray-600">Tetszik</span>
                        <span className="cursor-pointer hover:underline text-gray-600">Válasz</span>
                        <span className="font-normal text-gray-400">{review.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center pt-4">
                <p className="text-gray-400 text-xs font-bold cursor-pointer hover:text-gray-600 transition">
                    Előző 392 hozzászólás betöltése...
                </p>
            </div>

          </div>
        </section>

        {/* ŰRLAP SZEKCIÓ */}
        <div id="order-section" className="py-12 bg-gray-50">
          <div className="max-w-xl mx-auto px-4">
            
            {/* PIROS FIGYELMEZTETÉS */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3 shadow-sm animate-pulse">
                <AlertTriangle className="text-red-600 shrink-0" size={24} />
                <div>
                    <h4 className="text-red-800 font-bold text-sm uppercase">Fontos Információ:</h4>
                    <p className="text-red-700 text-sm mt-1 leading-snug">
                        Jelenleg csak <strong>Bankkártyás fizetés</strong> (PayPal) lehetséges! <br/>
                        Az utánvétes fizetés <strong>Február 10-én</strong> nyílik meg.
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-900 p-6 text-white text-center">
                <h3 className="text-2xl font-bold mb-1">Rendelés Leadása 📦</h3>
                <p className="text-gray-400 text-xs uppercase tracking-wide">Biztonságos SSL Kapcsolat</p>
              </div>
              
              <div className="p-6 md:p-8">
                {orderStatus === 'success' ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><Check size={32} className="text-green-600" /></div>
                    <h3 className="text-xl font-bold text-gray-900">Köszönjük! 🎉</h3>
                    <p className="text-gray-500 text-sm mb-4">A fizetést sikeresen rögzítettük.</p>
                    <button onClick={() => setOrderStatus('')} className="text-blue-600 font-bold text-sm hover:underline">Új rendelés</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <div className="grid grid-cols-2 gap-3">
                        <div className="cursor-pointer p-3 rounded-lg border-2 border-green-500 bg-green-50 relative">
                            <div className="absolute top-1 right-1 text-green-600"><CheckCircle size={16} className="text-green-600"/></div>
                            <div className="flex flex-col items-center text-center">
                                <CreditCard className="text-green-600 mb-1" size={24} />
                                <span className="font-bold text-gray-900 text-sm">Bankkártya</span>
                                <span className="text-[10px] text-green-700 font-bold mt-1 bg-green-200 px-2 py-0.5 rounded">INGYEN SZÁLLÍTÁS</span>
                            </div>
                        </div>

                        <div className="relative p-3 rounded-lg border-2 border-gray-200 bg-gray-100 opacity-60 cursor-not-allowed grayscale">
                             <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-lg z-10 text-center px-1">
                                <div className="bg-white px-2 py-1 rounded border border-gray-300 shadow-sm transform -rotate-2">
                                    <span className="block text-[10px] text-gray-500 font-bold uppercase">Nyitás:</span>
                                    <span className="block text-xs font-black text-gray-800">FEBRUÁR 10.</span>
                                </div>
                             </div>
                            <div className="flex flex-col items-center text-center blur-[1px]">
                                <Banknote className="text-gray-500 mb-1" size={24} />
                                <span className="font-bold text-gray-500 text-sm">Utánvét</span>
                                <span className="text-[10px] text-gray-400 font-bold mt-1 bg-gray-200 px-2 py-0.5 rounded">+2500 FT</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                       <div><label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Név</label><input required type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Pl. Minta Éva" /></div>
                       <div className="grid grid-cols-2 gap-3">
                           <div><label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Email</label><input required type="email" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 outline-none" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="email@cim.hu" /></div>
                           <div><label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Telefon</label><input required type="tel" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 outline-none" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="06 30..." /></div>
                       </div>
                       <div><label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Cím</label><input required type="text" className="w-full p-3 bg-gray-50 border border-gray-200 ro