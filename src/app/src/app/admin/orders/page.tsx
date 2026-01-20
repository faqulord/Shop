import { ShoppingBag, Search } from 'lucide-react';

export default function OrdersPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Rendelések</h1>
        <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
          Exportálás (.csv)
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-8 text-center">
        <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="text-gray-400" size={32} />
        </div>
        <h3 className="text-lg font-medium text-gray-900">Még nincs rendelésed</h3>
        <p className="text-gray-500 max-w-sm mx-auto mt-2">
          Amint valaki vásárol a boltban, itt fog megjelenni a rendelés állapota, a vevő adatai és a profit.
        </p>
      </div>
    </div>
  );
}
