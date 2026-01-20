"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, MessageSquare, Package } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Segédfüggvény: Aktív-e a gomb?
  const isActive = (path: string) => pathname === path;
  const linkClass = (path: string) => 
    `flex flex-col items-center gap-1 transition-colors ${isActive(path) ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`;

  return (
    <div className="min-h-screen bg-gray-50 pb-24"> 
      {/* A tartalom (children) fölött hagyunk helyet az alsó sávnak (pb-24) */}
      
      <main className="p-4">
        {children}
      </main>

      {/* --- ALSÓ NAVIGÁCIÓS SÁV --- */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        
        {/* 1. VEZÉRLŐ (Home) */}
        <Link href="/admin" className={linkClass('/admin')}>
          <LayoutDashboard size={24} />
          <span className="text-[10px] font-bold">Vezérlő</span>
        </Link>

        {/* 2. RENDELÉS */}
        <Link href="/admin/orders" className={linkClass('/admin/orders')}>
          <ShoppingBag size={24} />
          <span className="text-[10px] font-bold">Rendelés</span>
        </Link>

        {/* 3. TERMÉK (EZ AZ ÚJ!) */}
        <Link href="/admin/products" className={linkClass('/admin/products')}>
          <Package size={24} />
          <span className="text-[10px] font-bold">Termék</span>
        </Link>

        {/* 4. KOMMENT */}
        <Link href="/admin/reviews" className={linkClass('/admin/reviews')}>
          <MessageSquare size={24} />
          <span className="text-[10px] font-bold">Komment</span>
        </Link>

      </div>
    </div>
  );
}
