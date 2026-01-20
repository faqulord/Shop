"use client";
import { useEffect, useState } from 'react';
import { DollarSign, ShoppingBag, Users } from 'lucide-react';

export default function Dashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState({
    dailyRevenue: 0,
    totalRevenue: 0,
    dailyOrders: 0,
    totalOrders: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data);
      calculateStats(data);
      setLoading(false);
    } catch (error) {
      console.error("Hiba:", error);
    }
  };

  // --- ITT A MATEK: Kiszámoljuk a bevételeket ---
  const calculateStats = (data: any[]) => {
    const today = new Date().toISOString().split('T')[0]; // Pl: "2024-01-20"
    
    let dailyRev = 0;
    let totalRev = 0;
    let dailyOrd = 0;

    data.forEach(order => {
      totalRev += order.totalAmount;
      
      // Megnézzük, hogy a rendelés dátuma (napja) egyezik-e a maival
      const orderDate = order.createdAt.split('T')[0];
      
      if (orderDate === today) {
        dailyRev += order.totalAmount;
        dailyOrd += 1;
      }
    });

    setStats({
      dailyRevenue: dailyRev,
      totalRevenue: totalRev,
      dailyOrders: dailyOrd,
      totalOrders: data.length
    });
  };

  if (loading) return <div className="p-8 text-gray-500">Adatok betöltése...</div>;

  return (
    <div className="max-w-7xl mx-auto">
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Vezérlőpult</h1>
        <p className="text-gray-500">Valós idejű pénzügyi adatok.</p>
      </div>

      {/* STATISZTIKA KÁRTYÁK */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Napi Bevétel */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">MAI NAP</span>
          </div>
          <p className="text-sm text-gray-500 font-medium">Napi Bevétel</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">
            {stats.dailyRevenue.toLocaleString()} Ft
          </h3>
        </div>

        {/* Összes Bevétel */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">TELJES</span>
          </div>
          <p className="text-sm text-gray-500 font-medium">Összes Bevétel</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">
            {stats.totalRevenue.toLocaleString()} Ft
          </h3>
        </div>

        {/* Rendelések */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 font-medium">Rendelések (Ma / Összes)</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">
            {stats.dailyOrders} / {stats.totalOrders} db
          </h3>
        </div>
      </div>

      {/* RENDELÉS LISTA (Vevő adatok) */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-bold text-gray-900">Legutóbbi Rendelések</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase">
              <tr>
                <th className="px-6 py-4">Vásárló</th>
                <th className="px-6 py-4">Dátum</th>
                <th className="px-6 py-4">Státusz</th>
                <th className="px-6 py-4 text-right">Összeg</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{order.customerName}</div>
                    <div className="text-xs text-gray-500">{order.email}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      order.status === 'Kézbesítve' ? 'bg-green-100 text-green-700' : 
                      order.status === 'Szállítás alatt' ? 'bg-blue-100 text-blue-700' : 
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold">
                    {order.totalAmount.toLocaleString()} Ft
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
