"use client";

import { useState, useEffect } from 'react';
import { ShoppingBag, Star, Truck, ShieldCheck, Clock, ThumbsUp, MessageCircle, Share2 } from 'lucide-react';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <main className="min-h-screen bg-white font-sans text-gray-800">
      
      {/* FEJLÉC */}
      <nav className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <ShoppingBag className="text-primary h-6 w-6" />
            <span>Lipses<span className="text-primary">Official</span></span>
          </div>
          <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition">
            Kosár (0)
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* KÉP + VISSZASZÁMLÁLÓ MOBILON */}
          <div className="relative">
             <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 relative">
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full font-bold text-sm shadow-md animate-pulse z-10">
                  -50% AKCIÓ
                </div>
                {/* IDE JÖN MAJD A SAJÁT KÉPED */}
                <div className="flex items-center justify-center h-full text-8xl">💄</div>
             </div>
             
             {/* Visszaszámláló a kép alatt */}
             <div className="mt-4 bg-red-50 border border-red-100 p-3 rounded-xl flex items-center justify-between">
                <span className="text-red-600 font-bold flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4" /> AJÁNLAT VÉGE:
                </span>
                <span className="font-mono text-xl font-bold text-red-600">
                  {formatTime(timeLeft)}
                </span>
             </div>
          </div>

          {/* SZÖVEGES RÉSZ */}
          <div>
            <div className="flex items-center gap-1 text-yellow-400 mb-2">
              <Star className="fill-current w-4 h-4" />
              <Star className="fill-current w-4 h-4" />
              <Star className="fill-current w-4 h-4" />
              <Star className="fill-current w-4 h-4" />
              <Star className="fill-current w-4 h-4" />
              <span className="text-gray-400 text-xs ml-2">(4.9/5 - 1,240+ vélemény)</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight text-gray-900">
              Felejtsd el a <span className="text-primary">szájfeltöltést!</span>
            </h1>
            
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              Miért fizetnél 80.000 Ft-ot fájdalmas tűszúrásokért? A <b>Lipses Varázs</b> természetes hatóanyagaival azonnal bizsergeti és dúsítja az ajkakat. 
              <br/><br/>
              ✅ Akár 6 órás tartós hatás<br/>
              ✅ Hialuronsavval hidratál<br/>
              ✅ Nincs tű, nincs fájdalom
            </p>

            <div className="flex items-end gap-3 mb-6">
              <span className="text-4xl font-bold text-gray-900">9.990 Ft</span>
              <span className="text-xl text-gray-400 line-through mb-1">19.990 Ft</span>
            </div>

            <button className="w-full bg-primary hover:bg-secondary text-white text-xl font-bold py-4 rounded-xl shadow-lg shadow-pink-500/30 transform transition active:scale-95 mb-6 uppercase tracking-wide">
              Kérem a dús ajkakat
            </button>

            <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-4">
              <div className="flex items-center gap-1"><Truck className="w-4 h-4" /> 1-2 napos szállítás</div>
              <div className="flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> Pénzvisszafizetés</div>
            </div>
          </div>
        </div>

        {/* --- FACEBOOK KOMMENT SZEKCIÓ --- */}
        <div className="mt-16 border-t border-gray-200 pt-10">
          <h3 className="text-2xl font-bold mb-8 text-center">Mit mondanak, akik már próbálták?</h3>
          
          <div className="space-y-4 max-w-2xl mx-auto">
            {/* Komment 1 */}
            <div className="bg-gray-50 p-4 rounded-2xl">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">K</div>
                <div className="flex-1">
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                    <p className="font-bold text-sm text-blue-900 mb-1">Kovács Kinga</p>
                    <p className="text-gray-700 text-sm">Csajok! Ez valami brutál. 😱 Én félek a tűtől, sose merném töltetni, de ettől 5 perc alatt olyan szám lett, hogy a barátom azt hitte, titokban elmentem orvoshoz. Imádom!</p>
                  </div>
                  <div className="flex gap-4 mt-1 ml-2 text-xs text-gray-500 font-medium">
                    <span className="cursor-pointer hover:underline">Tetszik</span>
                    <span className="cursor-pointer hover:underline">Válasz</span>
                    <span>23 perce</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Komment 2 */}
            <div className="bg-gray-50 p-4 rounded-2xl">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold">Sz</div>
                <div className="flex-1">
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                    <p className="font-bold text-sm text-blue-900 mb-1">Nagy Szandra</p>
                    <p className="text-gray-700 text-sm">Már a második tubussal rendeltem. Buliba kötelező! Kicsit csíp az elején, de pont ettől nő meg. 💋</p>
                    {/* Kamu kép a kommentben */}
                    <div className="mt-2 w-32 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500">
                       [Fotó csatolva]
                    </div>
                  </div>
                  <div className="flex gap-4 mt-1 ml-2 text-xs text-gray-500 font-medium">
                    <span className="cursor-pointer hover:underline text-blue-600">34 ember kedveli</span>
                    <span className="cursor-pointer hover:underline">Válasz</span>
                    <span>2 órája</span>
                  </div>
                </div>
              </div>
            </div>

             {/* Komment 3 */}
             <div className="bg-gray-50 p-4 rounded-2xl">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">E</div>
                <div className="flex-1">
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                    <p className="font-bold text-sm text-blue-900 mb-1">Tóth Eszter</p>
                    <p className="text-gray-700 text-sm">Hihetetlen gyors szállítás, tegnap rendeltem, ma reggel hozta a futár. Köszönöm Lipses! ❤️</p>
                  </div>
                  <div className="flex gap-4 mt-1 ml-2 text-xs text-gray-500 font-medium">
                    <span className="cursor-pointer hover:underline">Tetszik</span>
                    <span className="cursor-pointer hover:underline">Válasz</span>
                    <span>5 órája</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
