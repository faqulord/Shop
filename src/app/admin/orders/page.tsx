"use client";
import { useEffect, useState } from 'react';
import { ShoppingBag, Truck, CheckCircle, Package, Edit2, Save, X, Globe, Home } from 'lucide-react';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
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

  const startEdit = (order: any) => {
    setEditingId(order._id);
    setTempStatus(order.status);
    setTempTracking(order.trackingNumber || '');
  };

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
        fetchOrders();
      }
    } catch (error) {
      alert("Hiba a mentéskor!");
    }
  };

  // Színek és Ikonok a státuszokhoz
  const getStatusBadge = (status: string) => {
    switch (status) {
        case 'Megrendelve (CJ)': return <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold border border-purple-200 flex items-center gap-1"><Globe size={12}/> CJ Rendelve</span>;
        case 'Raktárba érkezett': return <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold border border-orange-200 flex items-center gap-1"><Home size={12}/> Csomagolás</span>;
        case 'Kiküldve (Futár)': return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-200 flex items-center gap-1"><Truck size={12}/> Úton</span>;
        case 'Kézbesítve': return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200 flex items-center gap-1"><CheckCircle size={12}/> Kész</span>;
        default: return <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold border border-gray-200 flex items-center gap-1"><Package size={12}/> Új Rendelés</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-24">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rendelések 📦</h1>
          <p className="text-gray-500 text-sm">Kövesd a csomagok útját Kínától a vevőig.</p>
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

              {editingId === order._id ? (
                 <div className="flex gap-2">
                    <button onClick={saveOrder} className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1 hover:bg-green-700"><Save size={16}/> Mentés</button>
                    <button onClick={() => setEditingId(null)} className="bg-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-gray-300"><X size={16}/></button>
                 </div>
              ) : (
                 <button onClick={() => startEdit(order)} className="hover:opacity-80 transition">
                    {getStatusBadge(order.status)}
                 </button>
              )}
            </div>

            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Fizetési mód:</span>
                  <span className={`font-bold ${order.paymentMethod === 'cod' ? 'text-blue-600' : 'text-green-600'}`}>
                    {order.paymentMethod === 'cod' ? 'Utánvét (+2500)' : 'Bankkártya (PayPal)'}
                  </span>
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

              <div className={`rounded-xl p-4 transition-colors ${editingId === order._id ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 border border-gray-100'}`}>
                {editingId === order._id ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-blue-800 mb-1">Állapot</label>
                      <select 
                        className="w-full p-2 rounded-lg border border-blue-200 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        value={tempStatus}
                        onChange={(e) => setTempStatus(e.target.value)}
                      >
                        <option value="Feldolgozás alatt">1. Új Rendelés (Feldolgozás)</option>
                        <option value="Megrendelve (CJ)">2. Megrendelve CJ-től</option>
                        <option value="Raktárba érkezett">3. Megérkezett hozzám (Csomagolás)</option>
                        <option value="Kiküldve (Futár)">4. Átadva a Futárnak</option>
                        <option value="Kézbesítve">5. Kézbesítve (Siker)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-blue-800 mb-1">Követőkód</label>
                      <input 
                        type="text" 
                        placeholder="Pl. Foxpost kód..."
                        className="w-full p-2 rounded-lg border border-blue-200 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        value={tempTracking}
                        onChange={(e) => setTempTracking(e.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col justify-center">
                    <p className="text-xs text-gray-500 font-bold uppercase mb-1">Követőkód</p>
                    <p className="text-sm font-mono font-bold text-gray-700">
                        {order.trackingNumber || "-"}
                    </p>
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
