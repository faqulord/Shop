"use client";
import { useState, useEffect } from 'react';
import { Star, Check, Shield, ArrowRight, CreditCard, Banknote, ThumbsUp, AlertTriangle, Zap, Clock, CheckCircle } from 'lucide-react';

export default function Home() {
  // --- BEÁLLÍTÁSOK ---
  const PAYPAL_EMAIL = "stylefaqu@gmail.com"; 
  const VS_IMAGE_URL = "https://i.imgur.com/vHqB3qG.png"; // A magyar összehasonlító kép

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ h: 3, m: 11, s: 55 });
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', city: '', zip: '' });
  const [orderStatus, setOrderStatus] = useState('');

  // Visszaszámláló logika
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

  // ADATOK BETÖLTÉSE AZ ADMINBÓL
  useEffect(() => {
    const fetchData = async () => {
      try {
        const prodRes = await fetch('/api/products');
        const prodData = await prodRes.json();
        // Ha több termék van, az elsőt vesszük, vagy amit az admin küld
        const currentProduct = Array.isArray(prodData) ? prodData[0] : prodData;
        setProduct(currentProduct);
        setLoading(false);
      } catch (err) { 
        console.error("Hiba az adatoknál:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setOrderStatus('loading');
    try {
        const orderData = {
            customerName: formData.name,
            email: "vasarlo@gmail.com",
            phone: formData.phone,
            address: formData.address,
            city: "Magyarország",
            zip: "0000",
            products: [{ name: product.name, price: product.price, quantity: 1 }],
            totalAmount: product.price,
            paymentMethod: 'card',
            status: 'Fizetésre vár'
        };
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        if (response.ok) {
            window.location.href = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${PAYPAL_EMAIL}&item_name=${encodeURIComponent(product.name)}&amount=${product.price}&currency_code=HUF&return=${encodeURIComponent(window.location.href)}`;
        }
    } catch (error) { 
      setOrderStatus('');
      alert("Hiba történt a kapcsolatban.");
    }
  };

  if (loading || !product) return <div className="min-h-screen flex items-center justify-center font-bold">Lipses betöltése...</div>;

  // MEGHATÁROZZUK A KÉPET: Adminból jövő kép VAGY egy tartalék kép, ha az admin üres
  const displayImage = product.image || "https://cc-west-usa.oss-accelerate.aliyuncs.com/20240314/2301130391666.jpg";

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* FEJLÉC */}
      <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm py-3 px-4 flex justify-between items-center">
        <span className="text-2xl font-black text-pink-600 tracking-tighter">LIPSES.</span>
        <button onClick={() => document.getElementById('order')?.scrollIntoView({behavior:'smooth'})} className="bg-black text-white px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition shadow-lg flex items-center gap-2">
          Megrendelés <ArrowRight size={16} />
        </button>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative">
            <div className="absolute top-4 right-4 bg-red-600 text-white w-16 h-16 flex items-center justify-center rounded-full shadow-xl z-10 border-2 border-white animate-pulse">
              <p className="text-xl font-black">-50%</p>
            </div>
            {/* MOST MÁR AZ ADMINBÓL JÖVŐ KÉPET MUTATJA */}
            <img src={displayImage} className="rounded-3xl shadow-2xl w-full aspect-[4/5] object-cover border-4 border-white" alt={product.name} />
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[1,2,3,4,5].map(i => <Star key={i} fill="currentColor" size={16}/>)}
              </div>
              <span className="text-gray-400 text-xs font-bold">(395 vélemény)</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-black leading-tight uppercase italic">{product.name}</h1>
            
            <div className="text-xl font-bold text-black leading-relaxed italic" dangerouslySetInnerHTML={{ __html: product.description ? product.description.replace(/\n/g, '<br/>') : '' }}></div>

            <div className="bg-red-50 border-2 border-red-100 p-5 rounded-2xl flex justify-between items-center shadow-inner">
              <div className="space-y-1">
                <p className="text-[10px] text-red-500 font-black uppercase flex items-center gap-1"><Clock size={12}/> Az akció lejár:</p>
                <p className="text-2xl font-mono font-black text-red-600">0{timeLeft.h}:{timeLeft.m < 10 ? `0${timeLeft.m}` : timeLeft.m}:{timeLeft.s < 10 ? `0${timeLeft.s}` : timeLeft.s}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 line-through text-sm font-bold">{Math.round(product.price * 2).toLocaleString()} Ft</p>
                <p className="text-3xl font-black text-black">{product.price.toLocaleString()} Ft</p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl space-y-3 border border-gray-200">
              <p className="flex items-center gap-3 font-black text-black text-lg"><CheckCircle size={22} className="text-green-600 fill-green-50"/> Tűmentes Russian Lips hatás</p>
              <p className="flex items-center gap-3 font-black text-black text-lg"><CheckCircle size={22} className="text-green-600 fill-green-50"/> Azonnali dúsítás fájdalom nélkül</p>
              <p className="flex items-center gap-3 font-black text-black text-lg"><CheckCircle size={22} className="text-green-600 fill-green-50"/> Természetes kollagén aktiválás</p>
            </div>
          </div>
        </div>

        {/* ÖSSZEHASONLÍTÓ KÉP */}
        <div className="mt-16 space-y-8">
            <h2 className="text-center text-3xl font-black text-black uppercase tracking-widest italic">Miért válaszd a Lipses Pro-t?</h2>
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-100 p-2">
                <img src={VS_IMAGE_URL} className="w-full rounded-2xl" alt="Összehasonlítás" />
            </div>
        </div>
      </main>

      {/* RENDELÉS */}
      <section id="order" className="bg-gray-100 py-16 px-4">
        <div className="max-w-xl mx-auto">
            <div className="bg-red-600 text-white p-5 rounded-2xl mb-8 flex items-start gap-4 shadow-xl border-2 border-red-500 animate-pulse">
                <AlertTriangle className="shrink-0" size={32} />
                <div>
                    <h4 className="font-black uppercase text-sm">Fontos információ:</h4>
                    <p className="text-xs font-bold mt-1">Jelenleg KIZÁRÓLAG Bankkártyás fizetés (PayPal) érhető el! Az utánvétes opció Február 10-én nyílik meg.</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
                <div className="bg-black p-8 text-white text-center">
                    <h3 className="text-3xl font-black mb-1 italic">RENDELÉS LEADÁSA 📦</h3>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">Biztonságos SSL Titkosítás</p>
                </div>
                
                <form onSubmit={handleSubmit} className="p-8 space-y-5">
                    <input required className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold outline-none focus:border-pink-500" placeholder="Teljes név" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    <input required className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold outline-none focus:border-pink-500" placeholder="Telefonszám" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                    <input required className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold outline-none focus:border-pink-500" placeholder="Szállítási cím" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                    
                    <button className="w-full bg-black text-white py-6 rounded-2xl font-black text-2xl shadow-2xl hover:bg-gray-900 active:scale-95 transition-all mt-4">
                        {orderStatus === 'loading' ? 'FELDOLGOZÁS...' : 'KÉREM A KÉSZÜLÉKET! 🚀'}
                    </button>
                </form>
            </div>
        </div>
      </section>
    </div>
  );
}
