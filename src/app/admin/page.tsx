import Link from 'next/link';
import { DollarSign, Users, MessageCircle, ShoppingBag, ArrowRight } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      
      {/* FEJLÉC - ÁTÍRTUK A NEVET, HOGY LÁSD A FRISSÍTÉST */}
      <div className="flex items-center justify-between mb-8 border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-pink-500">Lipses BOSS 👑</h1>
          <p className="text-gray-400 text-sm">Vezérlőpult</p>
        </div>
        <Link href="/" className="text-sm bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition">
          Vissza a Boltra
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-500/20 p-3 rounded-full text-green-400"><DollarSign size={24} /></div>
            <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">+12% ma</span>
          </div>
          <h3 className="text-gray-400 text-sm">Mai Becsült Bevétel</h3>
          <p className="text-3xl font-bold">154.990 Ft</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-500/20 p-3 rounded-full text-blue-400"><Users size={24} /></div>
          </div>
          <h3 className="text-gray-400 text-sm">Élő Látogatók</h3>
          <p className="text-3xl font-bold">42</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-500/20 p-3 rounded-full text-purple-400"><ShoppingBag size={24} /></div>
            <span className="text-xs font-bold text-yellow-400 bg-yellow-500/10 px-2 py-1 rounded">3 feldolgozandó</span>
          </div>
          <h3 className="text-gray-400 text-sm">Új Rendelések</h3>
          <p className="text-3xl font-bold">18</p>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Kezelés</h2>
      <div className="grid gap-4">
        
        {/* --- ITT A LINK, AMINEK MŰKÖDNIE KELL --- */}
        <Link href="/admin/reviews" className="block">
          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 hover:border-pink-500 cursor-pointer transition group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-pink-600 p-3 rounded-lg text-white">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Kommentek Kezelése</h3>
                  <p className="text-gray-400 text-sm">Kamu vélemények írása, törlése</p>
                </div>
              </div>
              <ArrowRight className="text-gray-500 group-hover:text-pink-500 transition" />
            </div>
          </div>
        </Link>

        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 opacity-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 p-3 rounded-lg text-white">
                <ShoppingBag size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Termék Szerkesztése (Hamarosan)</h3>
                <p className="text-gray-400 text-sm">Ár, Akció, Leírás módosítása</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
