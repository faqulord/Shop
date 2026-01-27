"use client";

import { useState, useEffect } from "react";
import { Users, DollarSign, ShoppingCart, Calendar, Eye, Loader2 } from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  // Egyszerű jelszó védelem (A való életben ezt szerver oldalon kellene, de most ez a leggyorsabb)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "1234") { // <--- ITT A JELSZÓ! Írd át ha akarod.
      setIsAuthenticated(true);
      fetchData();
    } else {
      alert("Hibás jelszó!");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/stats');
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-6 text-center text-brand-dark">Lipses Admin</h1>
          <input
            type="password"
            placeholder="Jelszó"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-brand-dark text-white p-3 rounded-lg font-bold hover:bg-black transition">Belépés</button>
        </form>
      </div>
    );
  }

  if (loading || !data) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-brand-gold" size={48}/></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Sidebar imitáció + Header */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-30">
        <div className="font-bold text-xl text-brand-dark">Lipses<span className="text-brand-gold">Admin</span></div>
        <button onClick={() => setIsAuthenticated(false)} className="text-sm text-gray-500 hover:text-red-500">Kijelentkezés</button>
      </nav>

      <main className="container mx-auto px-4 py-8">
        
        {/* STATISZTIKÁK KÁRTYÁK */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-500 text-sm font-medium">Napi Bevétel</p>
                <h3 className="text-3xl font-bold text-brand-dark">{data.stats.dailyRevenue.toLocaleString()} Ft</h3>
              </div>
              <div className="p-2 bg-green-100 rounded-lg text-green-600"><DollarSign size={20}/></div>
            </div>
            <p className="text-xs text-green-600 font-semibold">+ Mai nap</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-500 text-sm font-medium">Havi Bevétel</p>
                <h3 className="text-3xl font-bold text-brand-dark">{data.stats.monthlyRevenue.toLocaleString()} Ft</h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Calendar size={20}/></div>
            </div>
            <p className="text-xs text-gray-400">Ebben a hónapban</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-500 text-sm font-medium">Látogatók (Ma)</p>
                <h3 className="text-3xl font-bold text-brand-dark">{data.stats.todayVisitors}</h3>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg text-purple-600"><Eye size={20}/></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-500 text-sm font-medium">Összes Rendelés</p>
                <h3 className="text-3xl font-bold text-brand-dark">{data.orders.length}</h3>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg text-orange-600"><ShoppingCart size={20}/></div>
            </div>
          </div>
        </div>

        {/* RENDELÉSEK TÁBLÁZAT */}
        <h2 className="text-xl font-bold mb-4 text-gray-800">Legutóbbi Rendelések</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500">
                  <th className="p-4 font-semibold">Dátum</th>
                  <th className="p-4 font-semibold">Vevő Neve</th>
                  <th className="p-4 font-semibold">Email / Telefon</th>
                  <th className="p-4 font-semibold">Cím</th>
                  <th className="p-4 font-semibold">Összeg</th>
                  <th className="p-4 font-semibold">Státusz</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.orders.map((order: any) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition">
                    <td className="p-4 text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString('hu-HU')} <br/>
                      <span className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleTimeString('hu-HU')}</span>
                    </td>
                    <td className="p-4 font-medium text-gray-900">{order.customerName}</td>
                    <td className="p-4 text-sm text-gray-600">
                      {order.email} <br/>
                      <span className="text-gray-400">{order.phone}</span>
                    </td>
                    <td className="p-4 text-sm text-gray-600 max-w-xs truncate" title={order.address}>{order.address}</td>
                    <td className="p-4 font-bold text-brand-dark">{order.price?.toLocaleString()} Ft</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        order.status === 'fizetesre_var' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {order.status === 'fizetesre_var' ? 'Fizetésre Vár' : order.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {data.orders.length === 0 && (
                   <tr>
                     <td colSpan={6} className="p-8 text-center text-gray-400">Még nincs rendelésed.</td>
                   </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}