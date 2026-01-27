import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// Ikonok importálása a telepített csomagból
import { Facebook, Instagram, Globe } from "lucide-react";

// Google Font betöltése a modern kinézethez
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lipses Shop - Valentin Napi Akció",
  description: "A legjobb dropshipping termékek - Prémium ajakdúsítás",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hu">
      <body className={`${inter.className} bg-slate-950 text-slate-100 antialiased relative overflow-x-hidden selection:bg-rose-500 selection:text-white`}>
        
        {/* === HÁTTÉR EFFEKTEK === */}
        {/* Hóesés konténer (A CSS fogja mozgatni) */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
            <div className="snow"></div>
            <div className="snow snow-mid"></div>
            <div className="snow snow-far"></div>
        </div>

        {/* Finom kék köd a háttérben a prémium hatáshoz */}
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none z-0"></div>
        <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-900/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

        {/* === FEJLÉC / HEADER === */}
        <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
             
             {/* Bal oldal: Social Ikonok */}
             <div className="flex items-center gap-4">
                <a 
                  href="https://facebook.com/groups/tecsoportod" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/5 hover:bg-blue-600 hover:text-white transition-all duration-300 text-slate-400"
                  aria-label="Facebook Csoport"
                >
                  <Facebook size={18} />
                </a>
                <a 
                  href="https://instagram.com/tecsoportod" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/5 hover:bg-pink-600 hover:text-white transition-all duration-300 text-slate-400"
                  aria-label="Instagram Oldal"
                >
                  <Instagram size={18} />
                </a>
             </div>

             {/* Közép (Mobilon eltűnhet, de itt lehetne a Logo) */}
             <div className="text-xs font-bold tracking-widest text-slate-500 uppercase hidden sm:block">
                Lipses Winter Edition
             </div>

             {/* Jobb oldal: Nyelvválasztó */}
             <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <Globe size={16} className="text-cyan-400" />
                <div className="flex items-center text-xs font-bold tracking-wide">
                  <span className="cursor-pointer text-white hover:text-cyan-300 transition-colors">HU</span>
                  <span className="mx-2 text-slate-600">|</span>
                  <span className="cursor-pointer text-slate-500 hover:text-white transition-colors">EN</span>
                </div>
             </div>
          </div>
        </header>

        {/* === FŐ TARTALOM === */}
        <main className="relative z-10 pt-16 flex flex-col min-h-screen">
            {children}
        </main>
        
      </body>
    </html>
  )
}