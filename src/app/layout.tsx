import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ShoppingBag, Menu, X, Facebook, Instagram, Globe } from "lucide-react";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "600", "900"] });

export const metadata: Metadata = {
  title: "LIPSES™ USA - Official Store",
  description: "Prémium ajakdúsítás amerikai technológiával.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hu" className="dark">
      <body className={`${inter.className} bg-zinc-950 text-white antialiased`}>
        
        {/* HÁTTÉR EFFEKTEK */}
        <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-rose-900/20 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full"></div>
        </div>

        {/* FELSŐ MENÜSÁV (NAVBAR) */}
        <nav className="fixed top-0 w-full z-50 glass-strong h-16 transition-all">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
             
             {/* Logo */}
             <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-widest text-white uppercase flex items-center gap-1">
                  LIPSES <span className="text-[10px] bg-white text-black px-1 rounded font-bold">USA</span>
                </span>
             </div>

             {/* Asztali Menü */}
             <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
                <a href="#" className="hover:text-white transition hover:scale-105">Kezdőlap</a>
                <a href="#products" className="hover:text-white transition hover:scale-105 flex items-center gap-1">
                   Termékek <span className="bg-rose-600 text-[9px] text-white px-1.5 py-0.5 rounded-full">Akció</span>
                </a>
                <a href="#about" className="hover:text-white transition hover:scale-105">Rólunk</a>
                <a href="#contact" className="hover:text-white transition hover:scale-105">Kapcsolat</a>
             </div>

             {/* Jobb oldal: Ikonok */}
             <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-3 border-r border-white/10 pr-4">
                   <a href="#" className="text-zinc-400 hover:text-blue-500 transition"><Facebook size={18} /></a>
                   <a href="#" className="text-zinc-400 hover:text-pink-500 transition"><Instagram size={18} /></a>
                </div>
                
                <div className="flex items-center gap-2 cursor-pointer hover:bg-white/5 p-1 rounded transition">
                   <Globe size={16} className="text-zinc-400" />
                   <span className="text-xs font-bold">HU</span>
                </div>

                <a href="#order-section" className="bg-white text-black px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-zinc-200 transition hidden sm:block">
                   Shop Now
                </a>
             </div>
          </div>
        </nav>

        {/* TARTALOM */}
        <main className="relative z-10 pt-16">
            {children}
        </main>
        
      </body>
    </html>
  )
}