"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, CheckCircle, Clock, ShieldCheck, Heart, Facebook, Instagram, AlertTriangle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-light overflow-x-hidden font-sans">
      
      {/* --- FELSŐ SÁV (HEADER) --- */}
      <header className="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-brand-rose/30">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-brand-dark tracking-tighter">
              Lipses<span className="text-brand-gold">Hungary</span>
            </span>
          </div>
          <div className="flex gap-4">
            {/* Cseréld le a linkeket a sajátjaidra! */}
            <a href="https://facebook.com" target="_blank" className="text-brand-dark hover:text-brand-accent transition">
              <Facebook size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" className="text-brand-dark hover:text-brand-accent transition">
              <Instagram size={24} />
            </a>
          </div>
        </div>
      </header>

      {/* --- HERO SZEKCIÓ --- */}
      <section className="pt-32 pb-16 px-4 md:pt-40 md:pb-24 bg-gradient-to-b from-brand-light to-white relative overflow-hidden">
        {/* Háttér dekoráció (Márvány hatás imitálás CSS-el) */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-rose/5 rounded-bl-[100px] -z-10" />
        
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          
          {/* Szöveges rész */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-rose/20 text-brand-dark text-sm font-semibold mb-6 border border-brand-rose">
              <Star size={14} className="fill-brand-gold text-brand-gold" /> 
              Végre Magyarországon!
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-brand-dark leading-tight mb-6">
              Telt ajkak <span className="text-brand-accent">tű és fájdalom</span> nélkül? <br/>
              <span className="text-brand-gold italic">Igen!</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Felejtsd el a drága töltéseket és a tűszúrást. A Lipses™ technológia azonnali, természetes hatást biztosít, ami akár 12 órán át tart. 
              <br/><strong>Garantáltan odaér Valentin-napig! 🎁</strong>
            </p>

            {/* FIZETÉSI FIGYELMEZTETÉS */}
            <div className="bg-red-50 border-l-4 border-brand-accent p-4 mb-8 rounded-r-lg shadow-sm">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-brand-accent shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-red-800 text-sm uppercase mb-1">Fontos Rendelési Információ</h3>
                  <p className="text-sm text-red-700">
                    A Valentin-napi garantált kiszállítás miatt <strong>február 10-ig</strong> kizárólag Bankkártyás vagy PayPal fizetést fogadunk el. 
                    <span className="block mt-1 text-xs opacity-80">Utánvétes fizetés újra elérhető: Február 11-től.</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-brand-accent hover:bg-red-600 text-white text-lg font-bold py-4 px-8 rounded-full shadow-lg shadow-brand-accent/30 transition transform hover:scale-105 flex items-center justify-center gap-2">
                Kérem az Azonnali Hatást! <ArrowRight size={20} />
              </button>
            </div>
            
            <div className="mt-6 flex items-center gap-4 text-sm text-gray-500">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-bold overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+20}`} alt="user" />
                  </div>
                ))}
              </div>
              <p>Már <span className="font-bold text-brand-dark">1,200+</span> elégedett hölgy választotta.</p>
            </div>
          </motion.div>

          {/* Kép rész */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
             {/* IDE KERÜL MAJD A TE KÉPED: /product-main.png */}
             {/* Most egy placeholder képet használok */}
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop" 
                alt="Lipses Device" 
                className="w-full h-auto object-cover transform hover:scale-105 transition duration-700"
              />
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur px-4 py-2 rounded-xl shadow-lg flex items-center gap-3">
                <div className="bg-brand-gold/20 p-2 rounded-full text-brand-gold">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">Garancia</p>
                  <p className="font-bold text-brand-dark">Pénzvisszafizetés</p>
                </div>
              </div>
            </div>
            
            {/* Dekorációs elemek */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-gold/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-accent/20 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* --- ELŐNYÖK SZEKCIÓ --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">Miért a Lipses?</h2>
            <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl bg-brand-light border border-brand-rose/20 text-center hover:shadow-xl transition duration-300">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-brand-accent">
                <Heart size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Tű és Fájdalom Nélkül</h3>
              <p className="text-gray-600">Nem kell félned a szúrástól. A vákuum technológia kíméletesen, de hatékonyan dúsít.</p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl bg-brand-light border border-brand-rose/20 text-center hover:shadow-xl transition duration-300">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-brand-gold">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">12 Órás Tartós Hatás</h3>
              <p className="text-gray-600">Egyetlen használattal egész napos magabiztosság. Tökéletes randira, buliba vagy fotózáshoz.</p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl bg-brand-light border border-brand-rose/20 text-center hover:shadow-xl transition duration-300">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-brand-dark">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Természetes Eredmény</h3>
              <p className="text-gray-600">Nincs "kacsa száj" effektus. A saját ajkaid teltségét fokozza a vérkeringés serkentésével.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- KAMU FACEBOOK KOMMENTEK --- */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-2xl font-bold text-brand-dark mb-8 text-center">Mit mondanak mások?</h2>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
               <span className="font-semibold text-gray-700">427 hozzászólás</span>
               <div className="flex gap-1 text-gray-500 text-sm">
                 <span>Rendezés:</span>
                 <span className="font-bold cursor-pointer">Legnépszerűbb</span>
               </div>
            </div>

            {/* Komment 1 */}
            <div className="flex gap-3 mb-6">
              <img src="https://i.pravatar.cc/100?img=5" alt="User" className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <div className="bg-gray-100 rounded-2xl px-4 py-2 inline-block">
                  <p className="font-bold text-sm text-gray-900">Kovács Alexandra</p>
                  <p className="text-sm text-gray-800">Lányok, ez valami csoda! 😍 Féltem tőle kicsit, de tényleg nem fáj. A párom rögtön észrevette este. Valentin napra tökéletes lesz!</p>
                </div>
                <div className="flex gap-4 mt-1 ml-2 text-xs text-gray-500 font-semibold">
                  <span className="cursor-pointer hover:underline text-brand-dark">Tetszik</span>
                  <span className="cursor-pointer hover:underline">Válasz</span>
                  <span>2 órája</span>
                </div>
              </div>
            </div>

            {/* Komment 2 */}
            <div className="flex gap-3 mb-6">
              <img src="https://i.pravatar.cc/100?img=9" alt="User" className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <div className="bg-gray-100 rounded-2xl px-4 py-2 inline-block">
                  <p className="font-bold text-sm text-gray-900">Nagy Beatrix</p>
                  <p className="text-sm text-gray-800">Megrendeltem tegnap, ma már ki is hozták! Nagyon profi a csomagolás, igazi prémium érzés. 💖</p>
                </div>
                <div className="flex gap-4 mt-1 ml-2 text-xs text-gray-500 font-semibold">
                  <span className="cursor-pointer hover:underline text-brand-dark">Tetszik</span>
                  <span className="cursor-pointer hover:underline">Válasz</span>
                  <span>5 órája</span>
                </div>
              </div>
            </div>

             {/* Komment 3 */}
             <div className="flex gap-3 mb-6">
              <img src="https://i.pravatar.cc/100?img=32" alt="User" className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <div className="bg-gray-100 rounded-2xl px-4 py-2 inline-block">
                  <p className="font-bold text-sm text-gray-900">Varga Eszter</p>
                  <p className="text-sm text-gray-800">Nekem 10 órán át simán tartott. Sokkal jobb mint a töltés, attól mindig féltem. Ez meg természetes. Köszönöm Lipses! 🙏</p>
                </div>
                <div className="flex gap-4 mt-1 ml-2 text-xs text-gray-500 font-semibold">
                  <span className="cursor-pointer hover:underline text-brand-dark">Tetszik</span>
                  <span className="cursor-pointer hover:underline">Válasz</span>
                  <span>1 napja</span>
                </div>
              </div>
            </div>

            {/* Fake Link */}
            <div className="text-center pt-2">
              <p className="text-brand-dark font-semibold text-sm cursor-pointer hover:underline opacity-80">
                Korábbi hozzászólások megtekintése (424)
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* --- CTA FOOTER --- */}
      <section className="py-12 bg-brand-dark text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ne maradj le a Valentin-napi ajánlatról!</h2>
          <p className="mb-8 text-brand-rose">A készlet gyorsan fogy. Rendeld meg most.</p>
          <button className="bg-brand-gold hover:bg-white hover:text-brand-dark text-white text-xl font-bold py-4 px-10 rounded-full transition shadow-lg inline-flex items-center gap-2">
            Megrendelem most! <ArrowRight />
          </button>
          
          <div className="mt-8 flex justify-center gap-4 opacity-50">
             {/* Fizetési ikonok helye (szövegesen most) */}
             <span>🔒 SSL Titkosított Fizetés</span>
             <span>💳 Visa/Mastercard</span>
             <span>🅿️ PayPal</span>
          </div>
          
          <p className="mt-8 text-xs text-gray-400">© 2024 LipsesHungary. Minden jog fenntartva.</p>
        </div>
      </section>

    </div>
  );
}