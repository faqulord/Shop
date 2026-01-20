"use client";
import { useState, useEffect } from 'react';
import { Save, Image as ImageIcon, Loader } from 'lucide-react';

export default function ProductEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Itt tároljuk az adatokat
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    originalPrice: 0,
    description: '',
    discountText: '',
    imageUrl: ''
  });

  // 1. Betöltjük a jelenlegi adatokat, amikor megnyílik az oldal
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data) setProduct(data);
        setLoading(false);
      });
  }, []);

  // 2. Mentés gomb funkciója
  const handleSave = async () => {
    setSaving(true);
    
    // Elküldjük az új adatokat a "Postásnak" (API)
    await fetch('/api/products', {
      method: 'PUT',
      body: JSON.stringify(product),
    });
    
    setSaving(false);
    alert('Siker! A termék adatai frissültek. ✅');
  };

  if (loading) return <div className="p-12 text-center text-gray-500">Adatok betöltése...</div>;

  return (
    <div className="max-w-4xl mx-auto pb-12">
      
      {/* FEJLÉC */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Termék Szerkesztése ✏️</h1>
          <p className="text-gray-500">Itt tudod módosítani, amit a vevők látnak a Főoldalon.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition shadow-lg disabled:opacity-50"
        >
          {saving ? <Loader className="animate-spin" /> : <Save size={20} />}
          {saving ? 'Mentés...' : 'Változások Mentése'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* BAL OLDAL: Kép és Előnézet */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
            <label className="block text-sm font-bold text-gray-700 mb-2">Termék Képe</label>
            
            {/* Kép előnézet */}
            <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4 border-2 border-dashed border-gray-300 relative flex items-center justify-center">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt="Termék" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="text-gray-400 w-12 h-12" />
              )}
            </div>
            
            {/* Kép URL beviteli mező */}
            <input 
              type="text" 
              placeholder="Kép URL (pl. https://...)" 
              className="w-full p-2 text-sm border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
              value={product.imageUrl}
              onChange={e => setProduct({...product, imageUrl: e.target.value})}
            />
            <p className="text-xs text-gray-400 mt-2">Másolj be egy kép linket a netről (pl. Google Képek -> Jobb klikk -> Kép címének másolása).</p>
          </div>
        </div>

        {/* JOBB OLDAL: Adatok */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-lg mb-4 text-gray-900">Alapadatok</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Termék Neve</label>
                <input 
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-lg"
                  value={product.name}
                  onChange={e => setProduct({...product, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Eladási Ár (Ft)</label>
                  <input 
                    type="number"
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-green-600"
                    value={product.price}
                    onChange={e => setProduct({...product, price: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Eredeti Ár (Áthúzva)</label>
                  <input 
                    type="number"
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 outline-none text-gray-500 line-through"
                    value={product.originalPrice}
                    onChange={e => setProduct({...product, originalPrice: Number(e.target.value)})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Akciós Szöveg (Címke)</label>
                <input 
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  value={product.discountText}
                  onChange={e => setProduct({...product, discountText: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-lg mb-4 text-gray-900">Leírás</h3>
            <textarea 
              className="w-full p-4 border border-gray-200 rounded-xl h-48 focus:ring-2 focus:ring-blue-500 outline-none text-gray-600 leading-relaxed"
              value={product.description}
              onChange={e => setProduct({...product, description: e.target.value})}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
