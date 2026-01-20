"use client"; // Ez kell a visszaszámlálóhoz!

import { useState, useEffect } from 'react';
import { ShoppingBag, Star, Truck, ShieldCheck, Clock } from 'lucide-react';

export default function Home() {
  // Visszaszámláló logika (15 percről indul)
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Idő formázása (pl. 14:59)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <main className="min-h-screen bg-white font-sans text-gray-800">
      
      {/* 1. PROFESSZIONÁLIS FEJLÉC */}
      <nav className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <ShoppingBag className="text-primary h-6 w-6" />
            <span>Lipses<span className="text-primary">Official</span></span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-500">
            <span>Rólunk</span>
            <span>Garancia</span>
            <span>Kapcsolat</span>
          </div>
          <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition">
            Kosár (0)
          </button>
        </div>
      </nav>

      {/* 2. ÉRTÉKESÍTÉSI ZÓNA */}
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Termék Kép Helye */}
          <div className="relative aspect-square bg-gray-100 rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
             {/* 50% Címke */}
            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full font-bold text-sm shadow-md animate-pulse">
              -50% AKCIÓ
            </div>
            <div className="flex items-center justify-center h-full text-6xl">
              💄
              {/* Ide jön majd a valódi fotód! */}
            </div>
          </div>

          {/* Szöveges Rész */}
          <div>
            <div className="flex items-center gap-1 text-yellow-400 mb-4">
              <Star className="fill-current w-5 h-5" />
              <Star className="fill-current w-5 h-5" />
              <Star className="fill-current w-5 h-5" />
              <Star className="fill-current w-5 h-5" />
              <Star className="fill-current w-5 h-5" />
              <span className="text-gray-400 text-sm ml-2">(1,240+ értékelés)</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-gray-900">
              Az Eredeti <span className="text-primary">Lipses</span> Varázs
            </h1>
            
            <p className="text-gray-500 mb-6 text-lg leading-relaxed">
              Felejtsd el a vékony, repedezett ajkakat. Az új formulánk 24 órás tartást és azonnali dúsító hatást biztosít. 
            </p>

            {/* ÁRAZÁS + VISSZASZÁMLÁLÓ */}
            <div className="bg-red-50 border border-red-100 p-4 rounded-xl mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-red-600 font-bold flex items-center gap-2">
                  <Clock className="w-4 h-4" /> AJÁNLAT VÉGE:
                </span>
                <span className="font-mono text-xl font-bold text-red-600">
                  {formatTime(timeLeft)}
                </span>
              </div>
              <div className="flex items-end gap-3">
                <span className="text-3xl font-bold text-gray-900">9.990 Ft</span>
                <span className="text-xl text-gray-400 line-through mb-1">19.990 Ft</span>
              </div>
            </div>

            {/* GOMB */}
            <button className="w-full bg-primary hover:bg-secondary text-white text-xl font-bold py-4 rounded-xl shadow-lg shadow-pink-500/30 transform transition active:scale-95 mb-6">
              MEGRENDELEM MOST
            </button>

            {/* BIZALMI IKONOK */}
            <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-6">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-6 h-6 text-gray-800" />
                <span>Ingyen Szállítás</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-6 h-6 text-gray-800" />
                <span>30 Nap Garancia</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Star className="w-6 h-6 text-gray-800" />
                <span>Prémium Minőség</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
