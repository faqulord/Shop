"use client";
import { useEffect, useState } from 'react';
import { DollarSign, ShoppingBag, Users, Mail, TrendingUp, Calendar, Copy } from 'lucide-react';
// Grafikonok importálása
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function Dashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  
  // Statisztikák állapota
  const [stats, setStats] = useState({
    dailyRevenue: 0,
    monthlyRevenue: 0,
    dailyOrders: 0,
    totalOrders: 0,
    visitorsToday: 142, // DEMO adat (amíg nincs bekötve a backend számláló)
    visitorsMonth: 3450 // DEMO adat
  });

  const [emailList, setEmailList] = useState<string[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      
      // Adatok rendezése időrendben (legújabb elöl)
      const sortedData = data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      setOrders(sortedData);
      processStats(sortedData);
      setLoading(false);
    } catch (error) {
      console.error("Hiba:", error);
      setLoading(false);
    }
  };

  // --- MATEK & ADATFELDOLGOZÁS ---
  const processStats = (data: any[]) => {
    const today = new Date().toISOString().split('T')[0];
    const currentMonth = new Date().getMonth();

    let dailyRev = 0;
    let monthlyRev = 0;
    let dailyOrd = 0;
    
    // Emailek gyűjtése (Set-et használunk, hogy ne legyen duplikáció)
    const uniqueEmails = new Set<string>();

    // Grafikon előkészítése (Utolsó 7 nap)
    const last7Days = [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().split('T')[0];
    }).reverse();

    const chartMap: any = {};
    last7Days.forEach(day => chartMap[day] = 0);

    data.forEach(order => {
      const orderDate = order.createdAt.split('T')[0];
      const orderMonth = new Date(order.createdAt).getMonth();

      // Email mentése
      if (order.email) uniqueEmails.add(order.email);

      // Grafikon adat töltése
      if (chartMap[orderDate] !== undefined) {
          chartMap[orderDate] += order.totalAmount;
      }

      // Napi stat
      if (orderDate === today) {
        dailyRev += order.totalAmount;
        dailyOrd += 1;
      }

      // Havi stat
      if (orderMonth === currentMonth) {
        monthlyRev += order.totalAmount;
      }
    });

    // Grafikon formázása a Recharts-nak
    const finalChartData = last7Days.map(date => ({
        name: date.slice(5), // Csak a hónap-nap (pl 02-10)
        bevetel: chartMap[date]
    }));

    setStats(prev => ({
      ...prev,
      dailyRevenue: dailyRev,
      monthlyRevenue: monthlyRev,
      dailyOrders: dailyOrd,
      totalOrders: data.length
    }));

    setEmailList(Array.from(uniqueEmails));
    setChartData(finalChartData);
  };

  const copyEmails = () => {
      navigator.clipboard.writeText(emailList.join(', '));
      alert(`${emailList.length} db email cím kimásolva!`);
  }

  if (loading) return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">
          <div className="animate-spin mr-2">❄</div> Adatok betöltése...
      </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Admin Vezérlőpult</h1>
            <p className="text-slate-500">Valentin Napi Kampány - Élő adatok</p>
        </div>
        <div className="flex gap-2">
            <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-slate-800 transition">
                <Calendar size={16} /> Február 2024
            </button>
        </div>
      </div>

      {/* --- 1. SOR: KÁRTYÁK --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Napi Bevétel */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden group">
          <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:scale-110 transition duration-500">
              <DollarSign size={80} />
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><TrendingUp size={20} /></div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mai Bevétel</span>
          </div>
          <h3 className="text-3xl font-black text-slate-900">{stats.dailyRevenue.toLocaleString()} Ft</h3>
          <p className="text-xs text-emerald-600 font-bold mt-1">+ {stats.dailyOrders} db rendelés ma</p>
        </div>

        {/* Havi Bevétel */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><ShoppingBag size={20} /></div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Havi Bevétel</span>
          </div>
          <h3 className="text-3xl font-black text-slate-900">{stats.monthlyRevenue.toLocaleString()} Ft</h3>
          <p className="text-xs text-slate-400 mt-1">Ebben a hónapban</p>
        </div>

        {/* Látogatók */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10"><Users size={100} /></div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/10 rounded-lg"><Users size={20} /></div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Látogatók</span>
          </div>
          <div className="flex items-end gap-2">
             <h3 className="text-3xl font-black">{stats.visitorsToday}</h3>
             <span className="text-sm text-slate-400 mb-1">/ ma</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">{stats.visitorsMonth} látogató a hónapban</p>
        </div>

        {/* Összes Eladás */}
        <div className="bg-gradient-to-br from-rose-500 to-pink-600 text-white p-6 rounded-2xl shadow-xl shadow-rose-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-lg"><ShoppingBag size={20} /></div>
            <span className="text-xs font-bold text-white/80 uppercase tracking-wider">Összes Eladás</span>
          </div>
          <h3 className="text-3xl font-black">{stats.totalOrders} db</h3>
          <p className="text-xs text-white/70 mt-1">Teljes élettartam</p>
        </div>

      </div>

      {/* --- 2. SOR: GRAFIKON ÉS EMAILEK --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* BEVÉTEL GRAFIKON (2/3 szélesség) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-lg">
              <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <TrendingUp size={18} className="text-slate-400"/> Heti Bevétel Alakulása
              </h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} tickFormatter={(value) => `${value/1000}E`} />
                        <Tooltip 
                            contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff'}}
                            itemStyle={{color: '#fff'}}
                            cursor={{fill: '#f1f5f9'}}
                        />
                        <Bar dataKey="bevetel" name="Bevétel (Ft)" fill="#0f172a" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
              </div>
          </div>

          {/* EMAIL LISTA (1/3 szélesség) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-lg flex flex-col h-[400px]">
              <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                      <Mail size={18} className="text-rose-500"/> Email Lista
                  </h3>
                  <span className="text-xs font-bold bg-rose-100 text-rose-600 px-2 py-1 rounded-full">
                      {emailList.length} db
                  </span>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                  {emailList.length > 0 ? emailList.map((email, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition text-sm text-slate-600">
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-bold text-slate-400 border border-slate-200">
                              {email.charAt(0).toUpperCase()}
                          </div>
                          <span className="truncate">{email}</span>
                      </div>
                  )) : (
                      <div className="text-center text-gray-400 py-10">Még nincs feliratkozó.</div>
                  )}
              </div>

              <button onClick={copyEmails} className="mt-4 w-full py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition flex items-center justify-center gap-2">
                  <Copy size={16} /> Lista másolása
              </button>
          </div>
      </div>

      {/* --- 3. SOR: RENDELÉS TÁBLÁZAT --- */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-bold text-slate-900">Legutóbbi Rendelések</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4 font-semibold">Vásárló</th>
                <th className="px-6 py-4 font-semibold">Dátum</th>
                <th className="px-6 py-4 font-semibold">Státusz</th>
                <th className="px-6 py-4 font-semibold text-right">Összeg</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{order.customerName}</div>
                    <div className="text-xs text-slate-400">{order.email}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {new Date(order.createdAt).toLocaleDateString()} <span className="text-xs text-slate-300 ml-1">{new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                      order.status === 'Kézbesítve' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 
                      order.status === 'Szállítás alatt' ? 'bg-blue-100 text-blue-700 border-blue-200' : 
                      'bg-amber-100 text-amber-700 border-amber-200'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-black text-slate-900">
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