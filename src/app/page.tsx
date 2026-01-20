"use client";
import { useState, useEffect } from 'react';
import { Star, Check, Truck, Shield, ArrowRight, Heart, CreditCard, Banknote } from 'lucide-react';

export default function Home() {
  const [product, setProduct] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // --- A TE PAYPAL CÍMED ---
  const PAYPAL_EMAIL = "stylefaqu@gmail.com"; 
  
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');
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
    return paymentMethod === 'cod' ? product.price + 2500 : product.price;
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
            paymentMethod: paymentMethod,
            status: paymentMethod === 'card' ? 'Fizetésre vár (PayPal)' : 'Feldolgozás alatt'
        };

        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });

        if (response.ok) {
            if (paymentMethod === 'card') {
                const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${PAYPAL_EMAIL}&item_name=${encodeURIComponent(product.name)}&amount=${totalAmount}&currency_code=HUF&return=${encodeURIComponent(window.location.href)}`;
                window.location.href = paypalUrl;
            } else {
                setOrderStatus('success');
                setFormData({ name: '', email: '', phone: '', address: '', city: '', zip: '' });
            }
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
      <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <span className="text-2xl font-extrabold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Lipses.</span>
          <button onClick={scrollToOrder} className="bg-black text-white px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-lg flex items-center gap-2">
            Megrendelem <ArrowRight size={16} />
          </button>
        </div>
      </nav>

      <main>
        <section className="max-w-6xl mx-auto px-4 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative animate-fade-in-up">
               <div className="absolute -top-6 -right-2 bg-white p-4 rounded-2xl shadow-xl z-10 border border-gray-100 animate-bounce-slow">
                 <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Csak most</p>
                 <p className="text-3xl font-black text-pink-600">{product.price.toLocaleString()} Ft</p>
               </div>
               <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-gray-100 relative group border-4 border-white">
                 <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=800"; }} />
               </div>
            </div>
            <div className="space-y-8 animate-fade-in-up delay-100">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  {product.discountText && <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">{product.discountText}</span>}
                  <div className="flex text-yellow-400 items-center">
                    {[1,2,3,4,5].map(i => <Star key={i} fill="currentColor" size={18}/>)}
                    <span className="text-gray-400 text-sm ml-2 font-medium underline decoration-gray-300">{reviews.length} elégedett vásárló</span>
                  </div>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-6">{product.name}</h1>
                <p className="text-xl text-gray-600 leading-relaxed font-light">{product.description}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 text-lg"><Heart className="text-pink-500 fill-pink-500" size={24} /> Miért imádják a nők?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-700"><CheckCircle size={16} className="text-green-600"/> <span className="font-medium text-lg">Hialuronsavval tölti fel az ajkakat</span></li>
                  <li className="flex items-center gap-3 text-gray-700"><CheckCircle size={16} className="text-green-600"/> <span className="font-medium text-lg">Azonnali dúsító hatás</span></li>
                  <li className="flex items-center gap-3 text-gray-700"><CheckCircle size={16} className="text-green-600"/> <span className="font-medium text-lg">Akár 12 órán át tartó hidratálás</span></li>
                </ul>
              </div>
              <div className="pt-4">
                <button onClick={scrollToOrder} className="w-full bg-gray-900 text-white px-8 py-5 rounded-2xl font-bold text-xl hover:bg-black transition shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 transform hover:-translate-y-1">Kérem a csomagot <ArrowRight size={24} /></button>
              </div>
            </div>
          </div>
        </section>

        <div id="order-section" className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden ring-1 ring-gray-100">
              <div className="bg-gray-900 p-8 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500"></div>
                <h3 className="text-3xl font-bold mb-2">Rendelés Leadása 📦</h3>
                <p className="text-gray-300">Válassz fizetési módot és töltsd ki az adataidat!</p>
              </div>
              
              <div className="p-8 md:p-10">
                {orderStatus === 'success' ? (
                  <div className="text-center py-12 animate-fade-in">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm"><Check size={48} className="text-green-600" /></div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Sikeres Rendelés! 🎉</h3>
                    <p className="text-gray-500 mb-6">A futárnál tudsz fizetni.</p>
                    <button onClick={() => setOrderStatus('')} className="text-blue-600 font-bold hover:underline">Új rendelés</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* --- ITT VANNAK A HIÁNYZÓ GOMBOK! --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div onClick={() => setPaymentMethod('card')} className={`cursor-pointer p-4 rounded-xl border-2 transition-all relative ${paymentMethod === 'card' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
                            {paymentMethod === 'card' && <div className="absolute top-2 right-2 text-green-600"><CheckCircle size={20} fill="currentColor" className="text-white"/></div>}
                            <div className="flex items-center gap-3 mb-2"><CreditCard className="text-green-600" /><span className="font-bold text-gray-900">Bankkártya</span></div>
                            <p className="text-xs text-gray-500">Gyors és biztonságos (PayPal).</p>
                            <div className="mt-2 bg-green-200 text-green-800 text-[10px] font-bold px-2 py-1 rounded inline-block">INGYENES SZÁLLÍTÁS</div>
                        </div>

                        <div onClick={() => setPaymentMethod('cod')} className={`cursor-pointer p-4 rounded-xl border-2 transition-all relative ${paymentMethod === 'cod' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                             {paymentMethod === 'cod' && <div className="absolute top-2 right-2 text-blue-600"><CheckCircle size={20} fill="currentColor" className="text-white"/></div>}
                            <div className="flex items-center gap-3 mb-2"><Banknote className="text-gray-600" /><span className="font-bold text-gray-900">Utánvét</span></div>
                            <p className="text-xs text-gray-500">Fizetés a futárnál készpénzzel.</p>
                            <div className="mt-2 bg-red-100 text-red-800 text-[10px] font-bold px-2 py-1 rounded inline-block">+2500 FT KEZELÉSI KÖLTSÉG</div>
                        </div>
                    </div>

                    <div className="space-y-4">
                       <div><label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1 block">Teljes Név</label><input required type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none font-medium" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Pl. Minta Éva" /></div>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div><label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1 block">Email</label><input required type="email" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none font-medium" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="eva@gmail.com" /></div>
                           <div><label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1 block">Telefon</label><input required type="tel" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none font-medium" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="06 30 ..." /></div>
                       </div>
                       <div><label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1 block">Szállítási Cím</label><input required type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none font-medium" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="Város, Utca, Házszám" /></div>
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                      <div className="flex justify-between items-center mb-2"><span className="text-gray-500">Termék ára:</span><span className="font-bold">{product.price.toLocaleString()} Ft</span></div>
                      {paymentMethod === 'cod' && (<div className="flex justify-between items-center mb-2 text-red-500"><span className="text-sm">Utánvét díj:</span><span className="font-bold">+2.500 Ft</span></div>)}
                      <div className="flex justify-between items-center mb-6 bg-gray-50 p-4 rounded-xl border border-gray-200"><span className="text-gray-900 font-bold text-lg">Fizetendő:</span><span className="text-3xl font-black text-pink-600">{calculateTotal().toLocaleString()} Ft</span></div>
                      <button disabled={orderStatus === 'loading'} className="w-full bg-gradient-to-r from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 text-white py-5 rounded-xl font-bold text-xl shadow-lg transform active:scale-95 transition flex justify-center items-center gap-3">
                        {orderStatus === 'loading' ? 'Feldolgozás...' : (paymentMethod === 'card' ? 'Tovább a Fizetéshez (PayPal)' : 'Megrendelés Véglegesítése')}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white border-t border-gray-200 py-12 mt-12 text-center"><p className="text-gray-500 text-sm">© 2024 Lipses Shop.</p></footer>
    </div>
  );
}

function CheckCircle({ size, fill, className }: any) {
    return ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={fill || "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> );
}
