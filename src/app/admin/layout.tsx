import Link from 'next/link';
import { LayoutDashboard, ShoppingBag, MessageSquare, Settings, LogOut, Package } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
      
      {/* BAL OLDALI MENÜ (SIDEBAR) - Shopify stílus */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-10">
        
        {/* Logó terület */}
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <div className="font-bold text-xl tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
            <span>Admin<span className="text-gray-400">Panel</span></span>
          </div>
        </div>

        {/* Menüpontok */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-2">Áttekintés</p>
          
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition">
            <LayoutDashboard size={20} />
            Vezérlőpult
          </Link>

          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition">
            <ShoppingBag size={20} />
            Rendelések <span className="ml-auto bg-blue-100 text-blue-600 py-0.5 px-2 rounded-full text-xs">3</span>
          </Link>

          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-6">Kezelés</p>

          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition">
            <Package size={20} />
            Termékek
          </Link>

          <Link href="/admin/reviews" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition">
            <MessageSquare size={20} />
            Vélemények
          </Link>

          <div className="mt-auto pt-6">
             <Link href="/settings" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition">
              <Settings size={20} />
              Beállítások
            </Link>
          </div>
        </nav>

        {/* Kilépés alul */}
        <div className="p-4 border-t border-gray-100">
          <button className="flex items-center gap-3 w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition">
            <LogOut size={20} />
            Kilépés
          </button>
        </div>
      </aside>

      {/* TARTALMI RÉSZ (Ez változik középen) */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}
