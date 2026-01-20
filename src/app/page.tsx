"use client";
import { useState, useEffect } from 'react';
import { Star, Check, Truck, Shield, ArrowRight, Heart, CreditCard, Banknote, Lock, ThumbsUp, MessageCircle, AlertTriangle, Zap } from 'lucide-react';

export default function Home() {
  const [product, setProduct] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // A SAJÁT PAYPAL CÍMED
  const PAYPAL_EMAIL = "stylefaqu@gmail.com"; 
  
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', city: '', zip: ''
  });
  const [orderStatus, setOrderStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prodRes = await fetch('/api/products');
        const prodData = await prodRes.json();
        setProduct(prodData);
        const revRes = await fetch('/api/reviews');
        const revData = await revRes.json();
        setReviews(revData);
        setLoading(false);
      } catch (err) { console.error(err); }
    };
    fetchData();
  }, []);

  const scrollToOrder = () => {
    document.getElementById('order-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const calculateTotal = () => {
    if (!product) return 0;
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

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500 font-medium">Betöltés...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Hiba történt.</div>;

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      
      {/* FEJLÉC */}
      <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm py-3">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
          <span className="text-xl font-extrabold text-pink-600 tracking-tight">Lipses.</span>
          <button onClick={scrollToOrder} className="bg-black text-white px-5 py-2 rounded-full font-bold text-xs hover:scale-105 transition shadow-lg flex items-center gap-2">
            Rendelés <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section className="max-w-5xl mx-auto px-4 py-8 lg:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            <div className="relative">
               <div className="absolute -top-4 -right-4 bg-white p-3 rounded-xl shadow-lg z-10 border border-gray-100 animate-bounce-slow transform rotate-3">
                 <p className="text-[10px] text-gray-500 font-bold uppercase">Csak most</p>
                 <p className="text-2xl font-black text-pink-600">{product.price.toLocaleString()} Ft</p>
               </div>
               <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-gray-100 border-4 border-white">
                 <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=800"; }} />
               </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase">{product.discountText || "-50% AKCIÓ"}</span>
                  <div className="flex text-yellow-400">
                    {[1,2,3,4,5].map(i => <Star key={i} fill="currentColor" size={14}/>)}
                  </div>
                  <span className="text-gray-400 text-xs">({reviews.length} vélemény)</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-4">{product.name}</h1>
                
                {/* --- ITT A VÁLTOZTATÁS: NAGYOBB ÉS FEKETÉBB SZÖVEG --- */}
                <div className="text-lg md:text-xl font-medium text-black leading-relaxed" 
                     dangerouslySetInnerHTML={{ __html: product.description.replace(/\n/g, '<br/>') }}>
                </div>
              </div>

              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm mb-3"><Zap className="text-pink-500 fill-pink-500" size={18} /> Miért imádják a nők?</h3>
                <ul className="space-y-2 text-base">
                  <li className="flex items-center gap-2 text-black font-bold"><CheckCircle size={18} className="text-green-600"/> Tűmentes "Russian Lips" hatás</li>
                  <li className="flex items-center gap-2 text-black font-bold"><CheckCircle size={18} className="text-green-600"/> Azonnali dúsítás fájdalom nélkül</li>
                  <li className="flex items-center gap-2 text-black font-bold"><CheckCircle size={18} className="text-green-600"/> Tartós eredmény (akár 12 óra)</li>
                </ul>
              </div>

              <button onClick={scrollToOrder} className="w-full bg-gray-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-black transition shadow-xl flex items-center justify-center gap-2">
                Kérem a csomagot <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* --- FACEBOOK STÍLUSÚ KOMMENTEK --- */}
        <section className="bg-white py-10 border-t border-gray-100">
          <div className="max-w-xl mx-auto px-4">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                Vásárlói vélemények <span className="text-gray-500 font-normal text-sm">({reviews.length})</span>
            </h2>
            
            <div className="space-y-4">
              {reviews.length > 0 ? reviews.map((review, i) => (
                <div key={i} className="flex gap-2 items-start animate-fade-in-up">
                  
                  {/* PROFILKÉP */}
                  <div className="flex-shrink-0">
                     {review.imageUrl && !review.hasPhoto ? (
                        <img src={review.imageUrl} className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border border-gray-200" alt="Avatar"/>
                     ) : (
                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm bg-blue-600`}>
                           {review.author?.charAt(0) || "V"}
                        </div>
                     )}
                  </div>

                  {/* KOMMENT DOBOZ */}
                  <div className="flex-1">
                    <div className="bg-[#f0f2f5] px-3 py-2 rounded-[18px] inline-block relative min-w-[180px]">
                        <div className="flex items-center gap-1">
                            <h4 className="font-bold text-[13px] text-gray-900 cursor-pointer hover:underline">
                                {review.author}
                            </h4>
                            {review.verified && <CheckCircle size={12} className="text-blue-500 fill-blue-500 text-white" />}
                        </div>
                        
                        <p className="text-[14px] text-gray-800 leading-snug mt-0.5">{review.text}</p>
                        
                        {review.imageUrl && review.hasPhoto && (
                            <div className="mt-2 rounded-lg overflow-hidden max-w-[200px] border border-gray-200">
                                <img src={review.imageUrl} alt="Review attachment" className="w-full object-cover"/>
                            </div>
                        )}

                        <div className="absolute -bottom-2 -right-1 bg-white rounded-full shadow-md border border-gray-100 flex items-center gap-1 px-1 py-0.5 cursor-pointer">
                            <div className="bg-blue-500 rounded-full p-[2px]"><ThumbsUp size={8} fill="white" className="text-white"/></div>
                            <span className="text-[10px] text-gray-500 font-bold">{Math.floor(Math.random() * 20) + 2}</span>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-1 ml-3 text-[11px] font-bold text-gray-500">
                        <span className="cursor-pointer hover:underline text-gray-600">Tetszik</span>
                        <span className="cursor-pointer hover:underline text-gray-600">Válasz</span>
                        <span className="font-normal text-gray-400">{review.date || '2 órája'}</span>
                    </div>
                  </div>
                </div>
              )) : (
                <p className="text-center text-gray-500 text-sm">Legyél te az első hozzászóló!</p>
              )}
            </div>
          </div>
        </section>

        {/* ŰRLAP + PIROS FIGYELMEZTETÉS */}
        <div id="order-section" className="py-12 bg-gray-50">
          <div className="max-w-xl mx-auto px-4">
            
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
                       <div><label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Cím</label><input required type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 outline-none" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="Város, Utca, Házszám" /></div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center mb-4">
                          <span className="text-sm text-gray-500 font-medium">Fizetendő:</span>
                          <span className="text-2xl font-black text-pink-600">{calculateTotal().toLocaleString()} Ft</span>
                      </div>
                      <button disabled={orderStatus === 'loading'} className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-gray-800 transition transform active:scale-95">
                        {orderStatus === 'loading' ? 'Feldolgozás...' : 'Tovább a Fizetéshez (PayPal)'}
                      </button>
                      <p className="text-center text-[10px] text-gray-400 mt-3 flex justify-center items-center gap-1">
                        <Shield size={10}/> SSL Titkosított Fizetés
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white border-t border-gray-200 py-8 mt-8 text-center"><p className="text-gray-400 text-xs">© 2024 Lipses Shop.</p></footer>
    </div>
  );
}

function CheckCircle({ size, fill, className }: any) {
    return ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={fill || "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> );
}
