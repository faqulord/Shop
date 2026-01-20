import Link from 'next/link';
import { LayoutDashboard, ShoppingBag, MessageSquare, Settings, LogOut, Package } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
      
      {/* --- ASZTALI SIDEBAR (Csak gépen látszik: md:flex) --- */}
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col fixed h-full z-20">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <div className="font-bold text-xl tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
            <span>Admin<span className="text-gray-400">Panel</span></span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-2">Áttekintés</p>
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition">
            <LayoutDashboard size={20} /> Vezérlőpult
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition">
            <ShoppingBag size={20} /> Rendelések
          </Link>

          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-6">Kezelés</p>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition">
            <Package size={20} /> Termékek
          </Link>
          <Link href="/admin/reviews" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition">
            <MessageSquare size={20} /> Vélemények
          </Link>
        </nav>
      </aside>

      {/* --- TARTALOM (Mobilon teljes szélesség, Gépen margóval) --- */}
      <main className="flex-1 ml-0 md:ml-64 p-4 md:p-8 pb-24 md:pb-8 overflow-y-auto">
        {children}
      </main>

      {/* --- MOBIL ALSÓ MENÜ (Csak mobilon látszik: md:hidden) --- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-3 z-50 shadow-lg">
        <Link href="/admin" className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600">
          <LayoutDashboard size={24} />
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link href="/admin/reviews" className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600">
          <MessageSquare size={24} />
          <span className="text-[10px] font-medium">Komment</span>
        </Link>
        <Link href="/admin/orders" className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600">
          <ShoppingBag size={24} />
          <span className="text-[10px] font-medium">Rendelés</span>
        </Link>
        <Link href="/settings" className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600">
          <Settings size={24} />
          <span className="text-[10px] font-medium">Beállítás</span>
        </Link>
      </div>

    </div>
  );
}
