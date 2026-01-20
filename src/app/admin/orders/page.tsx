"use client";
import { useEffect, useState } from 'react';
import { ShoppingBag, Truck, CheckCircle, Package, Edit2, Save, X } from 'lucide-react';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Szerkesztési állapot
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempStatus, setTempStatus] = useState('');
  const [tempTracking, setTempTracking] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error("Hiba:", error);
    }
  };

  // Szerkesztés indítása
  const startEdit = (order: any) => {
    setEditingId(order._id);
    setTempStatus(order.status);
    setTempTracking(order.trackingNumber || '');
  };

  // MENTÉS gomb funkciója
  const saveOrder = async () => {
    try {
      const res = await fetch('/api/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingId,
          status: tempStatus,
          trackingNumber: tempTracking
        }),
      });

      if (res.ok) {
        setEditingId(null);
        fetchOrders(); // Frissítjük a listát
      }
    } catch (error) {
      alert("Hiba a mentéskor!");
    }
  };

  const getStatusColor = (status: string) => {
    if (status === 'Kézbesítve') return 'bg-green-100 text-green-700 border-green-200';
    if (status === 'Szállítás alatt') return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-yellow-100 text-yellow-700 border-yellow-200';
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rendelések Kezelése 📦</h1>
          <p className="text-gray-500 text-sm">Itt tudod frissíteni a csomagok állapotát.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm text-sm font-bold">
            Összesen: {orders.length} db
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12 text-gray-500">Betöltés...</div>
        ) : orders.map((order) => (
          <div key={order._id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition">
            
            {/* FEJLÉC RÉSZ */}
            <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white border border-gray-200 rounded-lg">
                  <ShoppingBag size={20} className="text-gray-400"/>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-mono">#{order._id.slice(-6).toUpperCase()}</p>
                  <p className="text-sm font-bold text-gray-900">{order.customerName}</p>
                </div>
              </div>

              {/* STÁTUSZ CÍMKE */}
              {editingId === order._id ? (
                 <div className="flex gap-2">
                    <button onClick={saveOrder} className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1 hover:bg-green-700"><Save size={16}/> Mentés</button>
                    <button onClick={() => setEditingId(null)} className="bg-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-gray-300"><X size={16}/></button>
                 </div>
              ) : (
                 <button onClick={() => startEdit(order)} className={`px-3 py-1.5 rounded-full text-xs font-bold border flex items-center gap-2 ${getStatusColor(order.status)}`}>
                    {order.status === 'Szállítás alatt' && <Truck size={14}/>}
                    {order.status === 'Kézbesítve' && <CheckCircle size={14}/>}
                    {order.status === 'Feldolgozás alatt' && <Package size={14}/>}
                    {order.status} <Edit2 size={12} className="opacity-50 ml-1"/>
                 </button>
              )}
            </div>

            {/* TARTALOM */}
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Bal oldal: Adatok */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Dátum:</span>
                  <span className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Összeg:</span>
                  <span className="font-bold text-gray-900">{order.totalAmount?.toLocaleString()} Ft</span>
                </div>
                <div className="border-t border-gray-100 pt-2 mt-2">
                  <p className="text-gray-500 text-xs mb-1">Szállítási adatok:</p>
                  <p className="font-medium">{order.city}, {order.address}</p>
                  <p className="text-gray-500">{order.phone}</p>
                  <p className="text-gray-500">{order.email}</p>
                </div>
              </div>

              {/* Jobb oldal: Szerkesztő felület */}
              <div className={`rounded-xl p-4 transition-colors ${editingId === order._id ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 border border-gray-100'}`}>
                
                {editingId === order._id ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-blue-800 mb-1">Állapot módosítása</label>
                      <select 
                        className="w-full p-2 rounded-lg border border-blue-200 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        value={tempStatus}
                        onChange={(e) => setTempStatus(e.target.value)}
                      >
                        <option value="Feldolgozás alatt">Feldolgozás alatt</option>
                        <option value="Szállítás alatt">Szállítás alatt (CJ feladta)</option>
                        <option value="Kézbesítve">Kézbesítve (Pénz beérkezett)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-blue-800 mb-1">Követőkód (Tracking ID)</label>
                      <input 
                        type="text" 
                        placeholder="Pl. CJ123456789CN"
                        className="w-full p-2 rounded-lg border border-blue-200 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        value={tempTracking}
                        onChange={(e) => setTempTracking(e.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col justify-center">
                    <p className="text-xs text-gray-500 font-bold uppercase mb-1">Követőkód</p>
                    {order.trackingNumber ? (
                      <div className="flex items-center gap-2 text-green-600 font-mono font-bold bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm">
                        <Truck size={16}/> {order.trackingNumber}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400 italic">Még nincs rögzítve</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
