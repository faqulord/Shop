"use client";

import { useState, useEffect } from "react";
import { Star, CheckCircle, Clock, ShieldCheck, Heart, Facebook, Instagram, AlertTriangle, ArrowRight, ShoppingBag, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  // --- ÁLLAPOTOK ---
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Űrlap adatok
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "" // Irányítószám, Város, Utca, Házszám
  });

  // --- VISSZASZÁMLÁLÓ LOGIKA ---
  useEffect(() => {
    const targetDate = new Date("2026-02-14T00:00:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // --- RENDELÉS LEADÁSA ---
  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Adatok mentése a MongoDB-be
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // 2. Ha sikeres a mentés, irány a PayPal
        const paypalLink = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=stylefaqu@gmail.com&currency_code=HUF&amount=12990&item_name=Lipses%20Lip%20Plumper&custom=${formData.email}&return=https://lipseshungary.railway.app&cancel_return=https://lipseshungary.railway.app`;
        window.location.href = paypalLink;
      } else {
        alert("Hiba történt a feldolgozás során. Kérlek próbáld újra.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      alert("Hálózati hiba.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-light overflow-x-hidden font-sans">
      
      {/* --- FELSŐ SÁV --- */}
      <header className="fixed w-full z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-brand-rose/30">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <span className="text-2xl font-bold text-brand-dark tracking-tighter">
            Lipses<span className="text-brand-gold">Hungary</span>
          </span>
          <div className="flex gap-4 items-center">
            <button onClick={() => setIsModalOpen(true)} className="bg-brand-accent text-white px-4 py-2 rounded-full font-bold text-sm hidden sm:flex items-center gap-2 hover:bg-red-600 transition">
              <ShoppingBag size={16} /> Vásárlás
            </button>
          </div>
        </div>
      </header>

      {/* --- ÚJ HERO SZEKCIÓ (KÉP KÖZÉPEN) --- */}
      <section className="pt-28 pb-12 px-4 md:pt-36 bg-gradient-to-b from-brand-light to-white relative">
        <div className="container mx-auto max-w-4xl text-center">
          
          {/* CÍMSOR */}
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-brand-dark leading-tight mb-8"
          >
            Telt ajkak <span className="text-brand-accent">tű és fájdalom</span> nélkül? <br/>
            <span className="text-brand-gold italic">Igen!</span>
          </motion.h1>

          {/* KÉP (KÖZÉPEN, KIEMELVE) */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-lg mx-auto mb-8"
          >
            <div className="absolute inset-0 bg-brand-gold/20 blur-3xl rounded-full transform scale-90 -z-10"></div>
            <img 
              src="https://i.postimg.cc/pLV7dyv8/Gemini-Generated-Image-ifti5sifti5sifti.png" 
              alt="Lipses Termék" 
              className="w-full h-auto rounded-3xl shadow-2xl border-4 border-white transform hover:scale-105 transition duration-500"
            />
             {/* Badge a képen */}
             <div className="absolute top-4 right-4 bg-brand-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase shadow-lg animate-pulse">
                Valentin Napi Akció
              </div>
          </motion.div>

          {/* VISSZASZÁMLÁLÓ (A KÉP ALATT) */}
          <div className="flex justify-center mb-8">
            <div className="flex gap-3 md:gap-6 text-center bg-white px-6 py-3 rounded-2xl shadow-lg border border-brand-rose/30">
                 <div><span className="text-2xl md:text-3xl font-bold text-brand-dark">{timeLeft.days}</span><br/><span className="text-[10px] uppercase text-gray-500">Nap</span></div>
                 <div className="text-2xl font-bold text-brand-gold mt-1">:</div>
                 <div><span className="text-2xl md:text-3xl font-bold text-brand-dark">{timeLeft.hours}</span><br/><span className="text-[10px] uppercase text-gray-500">Óra</span></div>
                 <div className="text-2xl font-bold text-brand-gold mt-1">:</div>
                 <div><span className="text-2xl md:text-3xl font-bold text-brand-dark">{timeLeft.minutes}</span><br/><span className="text-[10px] uppercase text-gray-500">Perc</span></div>
                 <div className="text-2xl font-bold text-brand-gold mt-1">:</div>
                 <div><span className="text-2xl md:text-3xl font-bold text-brand-dark">{timeLeft.seconds}</span><br/><span className="text-[10px] uppercase text-gray-500">mp</span></div>
            </div>
          </div>

          {/* SZÖVEG ÉS GOMB */}
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            A Lipses™ technológia azonnali, természetes hatást biztosít. 
            <strong> Garantáltan odaér Valentin-napig! 🎁</strong>
          </p>

           <div className="bg-red-50 border border-red-100 p-3 mb-8 rounded-lg inline-block text-sm text-red-700">
             <AlertTriangle className="inline w-4 h-4 mr-2 mb-1"/>
             <strong>Figyelem:</strong> Febr. 10-ig csak bankkártyás fizetés érhető el!
           </div>

           <div className="flex justify-center">
            <button onClick={() => setIsModalOpen(true)} className="bg-brand-accent hover:bg-red-600 text-white text-xl font-bold py-4 px-12 rounded-full shadow-xl shadow-brand-accent/40 transition transform hover:scale-105 flex items-center gap-2">
              Kérem az Azonnali Hatást! <ArrowRight size={24} />
            </button>
           </div>

        </div>
      </section>

      {/* --- ELŐNYÖK --- */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <Heart size={40} className="mx-auto text-brand-accent mb-4"/>
              <h3 className="text-xl font-bold mb-2">Fájdalommentes</h3>
              <p className="text-gray-600">Nincs tű, nincs kockázat.</p>
            </div>
            <div className="p-6">
              <Clock size={40} className="mx-auto text-brand-gold mb-4"/>
              <h3 className="text-xl font-bold mb-2">Tartós Hatás</h3>
              <p className="text-gray-600">Akár 12 órán át tartó teltség.</p>
            </div>
            <div className="p-6">
              <CheckCircle size={40} className="mx-auto text-brand-dark mb-4"/>
              <h3 className="text-xl font-bold mb-2">Természetes</h3>
              <p className="text-gray-600">Azonnali eredmény otthon.</p>
            </div>
        </div>
      </section>
      
      {/* --- VÁSÁRLÓI ADATGYŰJTŐ MODAL (POP-UP) --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
            >
              {/* Modal Fejléc */}
              <div className="bg-brand-light p-4 border-b border-brand-rose/20 flex justify-between items-center">
                <h3 className="font-bold text-lg text-brand-dark">Szállítási Adatok</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>

              {/* Űrlap */}
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-4">Add meg az adataidat, hogy tudjuk hova küldeni a csomagot a fizetés után.</p>
                
                <form onSubmit={handleOrderSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Teljes Név</label>
                    <input 
                      required 
                      type="text" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:outline-none"
                      placeholder="Pl. Kiss Anna"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Cím</label>
                    <input 
                      required 
                      type="email" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:outline-none"
                      placeholder="anna@pelda.hu"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Telefonszám</label>
                    <input 
                      required 
                      type="tel" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:outline-none"
                      placeholder="+36 30 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Pontos Szállítási Cím</label>
                    <textarea 
                      required 
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:outline-none"
                      placeholder="Irányítószám, Város, Utca, Házszám, Emelet/Ajtó"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-brand-accent hover:bg-red-600 text-white font-bold py-4 rounded-xl shadow-lg transition flex justify-center items-center gap-2"
                    >
                      {isSubmitting ? (
                        <> <Loader2 className="animate-spin" /> Feldolgozás... </>
                      ) : (
                        <> Tovább a Fizetéshez (12.990 Ft) <ArrowRight /> </>
                      )}
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-3">
                      A gombra kattintva átirányítunk a PayPal biztonságos oldalára.
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}