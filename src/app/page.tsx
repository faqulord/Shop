"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Clock, Heart, AlertTriangle, ArrowRight, X, Loader2, ThumbsUp, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- HÓESÉS KOMPONENS ---
const Snowfall = () => {
  const [flakes, setFlakes] = useState<any[]>([]);

  useEffect(() => {
    const newFlakes = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + "%",
      animationDuration: Math.random() * 5 + 5 + "s",
      animationDelay: Math.random() * 5 + "s",
      opacity: Math.random() * 0.7 + 0.3,
      size: Math.random() * 6 + 4 + "px"
    }));
    setFlakes(newFlakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {flakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute top-[-20px] bg-white rounded-full blur-[0.5px] shadow-sm shadow-white"
          style={{
            left: flake.left,
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
            animation: `fall ${flake.animationDuration} linear infinite`,
            animationDelay: flake.animationDelay,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) translateX(0px); }
          100% { transform: translateY(110vh) translateX(20px); }
        }
      `}</style>
    </div>
  );
};

// --- KAMU KOMMENT ADATBÁZIS ---
const ALL_COMMENTS = [
  { id: 1, name: "Kovács Alexandra", img: 5, text: "Lányok, ez valami csoda! 😍 Féltem tőle kicsit, de tényleg nem fáj. A párom rögtön észrevette este. Valentin napra tökéletes lesz!", time: "2 órája" },
  { id: 2, name: "Nagy Beatrix", img: 9, text: "Megrendeltem tegnap, ma már ki is hozták! Nagyon profi a csomagolás, igazi prémium érzés. 💖", time: "5 órája" },
  { id: 3, name: "Varga Eszter", img: 32, text: "Nekem 10 órán át simán tartott. Sokkal jobb mint a töltés, attól mindig féltem. Ez meg természetes. Köszönöm Lipses! 🙏", time: "1 napja" },
  { id: 4, name: "Tóth Tímea", img: 44, text: "Először szkeptikus voltam, de a barátnőm ajánlotta. Nem bántam meg! Azonnal látszik a különbség.", time: "2 napja" },
  { id: 5, name: "Horváth Éva", img: 12, text: "Nagyon gyorsan megjött, köszönöm a korrekt ügyintézést. A termék pedig 5 csillagos! ⭐⭐⭐⭐⭐", time: "2 napja" },
  { id: 6, name: "Szabó Zsófi", img: 21, text: "Végre nem kell tű alá feküdnöm. Imádom, hogy bármikor feldobhatom vele a sminkem előtt.", time: "3 napja" },
  { id: 7, name: "Kiss Ramóna", img: 16, text: "Ajándékba kaptam a páromtól. A legjobb meglepetés volt! 🥰", time: "4 napja" },
  { id: 8, name: "Molnár Kinga", img: 28, text: "Kicsit bizserget, de egyáltalán nem kellemetlen. A hatás pedig magáért beszél.", time: "5 napja" },
  { id: 9, name: "Balogh Adrienn", img: 35, text: "Már a másodikat rendelem a húgomnak is. Csak ajánlani tudom.", time: "1 hete" },
];

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  const commentsPerPage = 3;
  const totalPages = Math.ceil(ALL_COMMENTS.length / commentsPerPage);
  const currentComments = ALL_COMMENTS.slice((currentPage - 1) * commentsPerPage, currentPage * commentsPerPage);

  const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "" });

  // Látogatás rögzítése
  useEffect(() => { fetch('/api/visit', { method: 'POST' }); }, []);

  // Visszaszámláló
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

  // --- RENDELÉS KEZELÉSE ÉS ÁTIRÁNYÍTÁS ---
  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // 1. Adatok mentése az adatbázisba
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json(); // Itt kapjuk meg a rendelés ID-t!

      if (res.ok) {
        // 2. PayPal Link összeállítása a visszatérési (return) linkkel
        // Ha sikeres a fizetés, a /success oldalra dobja vissza az ID-val együtt
        const returnUrl = `https://lipseshungary.railway.app/success?id=${data.orderId}`;
        const cancelUrl = `https://lipseshungary.railway.app`;
        
        const paypalLink = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=stylefaqu@gmail.com&currency_code=HUF&amount=12990&item_name=Lipses%20Lip%20Plumper&custom=${formData.email}&return=${encodeURIComponent(returnUrl)}&cancel_return=${encodeURIComponent(cancelUrl)}`;
        
        // 3. Átirányítás
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
    // SÖTÉTÍTETT HÁTTÉR: Púderes Mályva Átmenet (hogy látsszon a hó!)
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#dcb4b4] via-[#eedddd] to-[#fdf4f5] overflow-x-hidden font-sans text-brand-dark relative">
      
      {/* ITT A HÓESÉS! */}
      <Snowfall />

      {/* HEADER */}
      <header className="fixed w-full z-40 bg-white/90 backdrop-blur-md shadow-sm border-b border-brand-rose/30">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <span className="text-2xl font-bold tracking-tighter">
            Lipses<span className="text-brand-gold">Hungary</span>
          </span>
          <button onClick={() => setIsModalOpen(true)} className="bg-brand-accent text-white px-4 py-2 rounded-full font-bold text-sm hidden sm:flex items-center gap-2 hover:bg-red-600 transition shadow-lg shadow-brand-accent/20">
             Vásárlás
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-28 pb-12 px-4 md:pt-36 relative">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-4 inline-block px-4 py-1 rounded-full bg-white/80 text-red-600 text-sm font-bold uppercase tracking-wider border border-red-200 backdrop-blur-sm shadow-sm">
             🔥 Valentin-napi Készletkisöprés
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-brand-dark leading-tight mb-6 drop-shadow-sm">
            Felejtsd el a tűszúrást! <br/>
            <span className="text-brand-accent">100% Fájdalommentes</span> Ajakdúsítás.
          </h1>

          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
            Miért fizetnél <strong>80.000 Ft-ot</strong> egyetlen töltésért, ha rettegsz a tűtől? 
            A Lipses™ technológia azonnal, biztonságosan varázsol telt, csábító ajkakat – <span className="underline decoration-brand-gold decoration-2">otthonod kényelméből.</span>
          </p>

          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="relative w-full max-w-lg mx-auto mb-8">
            <div className="absolute inset-0 bg-brand-gold/40 blur-3xl rounded-full transform scale-90 -z-10"></div>
            <img src="https://i.postimg.cc/pLV7dyv8/Gemini-Generated-Image-ifti5sifti5sifti.png" alt="Lipses Termék" className="w-full h-auto rounded-3xl shadow-2xl border-4 border-white" />
          </motion.div>

          {/* VISSZASZÁMLÁLÓ */}
          <div className="flex justify-center mb-8">
            <div className="flex gap-4 text-center bg-white/80 backdrop-blur-md px-8 py-4 rounded-2xl shadow-xl border border-white/50 relative z-10">
                 <div><span className="text-3xl font-bold text-brand-dark">{timeLeft.days}</span><br/><span className="text-[10px] uppercase text-gray-500">Nap</span></div>
                 <div className="text-3xl font-bold text-brand-gold">:</div>
                 <div><span className="text-3xl font-bold text-brand-dark">{timeLeft.hours}</span><br/><span className="text-[10px] uppercase text-gray-500">Óra</span></div>
                 <div className="text-3xl font-bold text-brand-gold">:</div>
                 <div><span className="text-3xl font-bold text-brand-dark">{timeLeft.minutes}</span><br/><span className="text-[10px] uppercase text-gray-500">Perc</span></div>
                 <div className="text-3xl font-bold text-brand-gold">:</div>
                 <div><span className="text-3xl font-bold text-brand-dark">{timeLeft.seconds}</span><br/><span className="text-[10px] uppercase text-gray-500">mp</span></div>
            </div>
          </div>

           <div className="bg-red-50/90 backdrop-blur-sm border border-red-100 p-4 mb-8 rounded-xl inline-flex items-center gap-3 text-sm text-red-800 shadow-sm mx-auto max-w-lg text-left relative z-10">
             <AlertTriangle className="shrink-0 w-6 h-6 text-red-600"/>
             <div>
               <strong>Utolsó darabok!</strong> A garantált Valentin-napi kiszállítás határideje: <span className="underline">Február 10.</span>
             </div>
           </div>

           <div className="flex justify-center relative z-10">
            <button onClick={() => setIsModalOpen(true)} className="bg-brand-accent hover:bg-red-600 text-white text-xl font-bold py-5 px-10 rounded-full shadow-xl shadow-brand-accent/40 transition transform hover:scale-105 flex items-center gap-2">
              Kérem a Telt Ajkakat! <ArrowRight size={24} />
            </button>
           </div>
        </div>
      </section>

      {/* --- ELŐNYÖK --- */}
      <section className="py-16 bg-white/60 backdrop-blur-md border-b border-white/50 relative z-10">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-accent"><Heart size={32}/></div>
              <h3 className="text-xl font-bold mb-2">Tű Nélküli Megoldás</h3>
              <p className="text-gray-600">Nincs szúrás, nincs fájdalom, nincsenek csomók. Csak a tiszta eredmény.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-gold"><Clock size={32}/></div>
              <h3 className="text-xl font-bold mb-2">Tartós, 12 Órás Hatás</h3>
              <p className="text-gray-600">Egy kezelés reggel, és estig magabiztos lehetsz. Randira, buliba tökéletes.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-dark"><CheckCircle size={32}/></div>
              <h3 className="text-xl font-bold mb-2">Természetes Volumen</h3>
              <p className="text-gray-600">Azonnali vérbőség és kollagén stimuláció a saját ajkaid dúsítására.</p>
            </div>
        </div>
      </section>

      {/* --- KOMMENTEK --- */}
      <section className="py-20 bg-transparent relative z-10">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-2xl font-bold text-brand-dark mb-8 text-center drop-shadow-sm">Vásárlói Vélemények</h2>
          <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-white/50 p-4 min-h-[400px] flex flex-col justify-between">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
               <span className="font-semibold text-gray-700 flex items-center gap-2"><ThumbsUp size={16} className="bg-blue-500 text-white p-0.5 rounded-full"/> 427</span>
               <div className="flex gap-1 text-gray-500 text-sm">
                 <span>Rendezés:</span> <span className="font-bold cursor-pointer">Legnépszerűbb</span>
               </div>
            </div>
            <div className="flex-grow">
              {currentComments.map((comment) => (
                <motion.div key={comment.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex gap-3 mb-6">
                  <img src={`https://i.pravatar.cc/100?img=${comment.img}`} alt="User" className="w-10 h-10 rounded-full border border-gray-200" />
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-2xl px-4 py-2 inline-block">
                      <p className="font-bold text-sm text-gray-900">{comment.name}</p>
                      <p className="text-sm text-gray-800">{comment.text}</p>
                    </div>
                    <div className="flex gap-4 mt-1 ml-2 text-xs text-gray-500 font-semibold select-none">
                      <span className="cursor-pointer hover:underline text-brand-dark">Tetszik</span> <span>{comment.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-2">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className={`flex items-center gap-1 text-sm font-semibold ${currentPage === 1 ? 'text-gray-300' : 'text-brand-dark hover:text-brand-accent'}`}> <ChevronLeft size={16}/> Előző </button>
              <span className="text-sm text-gray-500">{currentPage} / {totalPages} oldal</span>
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className={`flex items-center gap-1 text-sm font-semibold ${currentPage === totalPages ? 'text-gray-300' : 'text-brand-dark hover:text-brand-accent'}`}> Következő <ChevronRight size={16}/> </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <section className="py-12 bg-brand-dark text-white text-center relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ne maradj le!</h2>
          <button onClick={() => setIsModalOpen(true)} className="bg-brand-gold hover:bg-white hover:text-brand-dark text-white text-xl font-bold py-4 px-10 rounded-full transition shadow-lg inline-flex items-center gap-2">
            Megrendelem most! <ArrowRight />
          </button>
          <div className="mt-8 flex justify-center gap-4 opacity-50 text-sm">
             <span>🔒 SSL Titkosított Fizetés</span>
             <span>💳 Bankkártya / PayPal</span>
          </div>
          <p className="mt-8 text-xs text-gray-400">© 2024 LipsesHungary.</p>
        </div>
      </section>
      
      {/* --- MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
              <div className="bg-brand-light p-4 border-b border-brand-rose/20 flex justify-between items-center">
                <h3 className="font-bold text-lg text-brand-dark">Szállítási Adatok</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
              </div>
              <div className="p-6">
                <form onSubmit={handleOrderSubmit} className="space-y-4">
                  <div><label className="block text-xs font-bold text-gray-700 uppercase mb-1">Név</label><input required type="text" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Pl. Kiss Anna" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} /></div>
                  <div><label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email</label><input required type="email" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="anna@pelda.hu" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} /></div>
                  <div><label className="block text-xs font-bold text-gray-700 uppercase mb-1">Telefon</label><input required type="tel" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="+36 30 123 4567" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} /></div>
                  <div><label className="block text-xs font-bold text-gray-700 uppercase mb-1">Cím</label><textarea required rows={2} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Irányítószám, Város, Utca, Házszám" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} /></div>
                  <div className="pt-2">
                    <button type="submit" disabled={isSubmitting} className="w-full bg-brand-accent hover:bg-red-600 text-white font-bold py-4 rounded-xl shadow-lg transition flex justify-center items-center gap-2">
                      {isSubmitting ? ( <> <Loader2 className="animate-spin" /> Feldolgozás... </> ) : ( <> Tovább a Fizetéshez (12.990 Ft) <ArrowRight /> </> )}
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-2">PayPal és Bankkártyás fizetés.</p>
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