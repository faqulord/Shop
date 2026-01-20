"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2, Plus, ArrowLeft, Star, User, CheckCircle } from 'lucide-react';

export default function ReviewsManager() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Új komment adatai
  const [newReview, setNewReview] = useState({
    author: '',
    text: '',
    rating: 5,
    date: 'Most',
    likes: 12
  });

  // 1. Betöltjük a kommenteket, amikor megnyílik az oldal
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const res = await fetch('/api/reviews');
    const data = await res.json();
    setReviews(data);
    setLoading(false);
  };

  // 2. Törlés funkció
  const handleDelete = async (id: string) => {
    if (!confirm('Biztosan törölni akarod ezt a véleményt?')) return;
    
    await fetch('/api/reviews', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    fetchReviews(); // Frissítjük a listát
  };

  // 3. Hozzáadás funkció
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/reviews', {
      method: 'POST',
      body: JSON.stringify({ ...newReview, verified: true }),
    });
    setShowForm(false);
    setNewReview({ author: '', text: '', rating: 5, date: 'Most', likes: 0 }); // Ürítés
    fetchReviews(); // Frissítés
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      
      {/* FEJLÉC */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Vélemények Kezelése</h1>
            <p className="text-gray-400 text-sm">{reviews.length} db vélemény látható</p>
          </div>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-primary hover:bg-pink-600 px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition"
        >
          <Plus size={18} /> Új Kamu Komment
        </button>
      </div>

      {/* ÚJ KOMMENT ŰRLAP (Csak akkor látszik, ha megnyomtad a gombot) */}
      {showForm && (
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-8 animate-fade-in">
          <h3 className="font-bold mb-4">Új vélemény írása</h3>
          <form onSubmit={handleAdd} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <input 
                placeholder="Név (pl. Nagy Anna)" 
                className="bg-gray-900 p-3 rounded border border-gray-700 text-white"
                value={newReview.author}
                onChange={e => setNewReview({...newReview, author: e.target.value})}
                required
              />
              <select 
                className="bg-gray-900 p-3 rounded border border-gray-700 text-white"
                value={newReview.rating}
                onChange={e => setNewReview({...newReview, rating: Number(e.target.value)})}
              >
                <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                <option value="4">⭐⭐⭐⭐ (4)</option>
                <option value="3">⭐⭐⭐ (3)</option>
              </select>
            </div>
            <textarea 
              placeholder="Mit írt a vásárló? (Legyen hiteles!)" 
              className="bg-gray-900 p-3 rounded border border-gray-700 text-white h-24"
              value={newReview.text}
              onChange={e => setNewReview({...newReview, text: e.target.value})}
              required
            />
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded transition">
              MENTÉS ÉS KÖZZÉTÉTEL
            </button>
          </form>
        </div>
      )}

      {/* LISTA (Mint a Shopify-ban) */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Betöltés...</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-900/50 text-gray-400 text-xs uppercase">
              <tr>
                <th className="p-4">Vásárló</th>
                <th className="p-4">Vélemény</th>
                <th className="p-4">Értékelés</th>
                <th className="p-4 text-right">Művelet</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {reviews.map((review) => (
                <tr key={review._id} className="hover:bg-gray-700/50 transition">
                  <td className="p-4">
                    <div className="font-bold flex items-center gap-2">
                      <User size={16} className="text-gray-400" />
                      {review.author}
                      {review.verified && <CheckCircle size={14} className="text-blue-400" />}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{review.date}</div>
                  </td>
                  <td className="p-4 text-sm text-gray-300 max-w-md truncate">
                    {review.text}
                  </td>
                  <td className="p-4">
                    <div className="flex text-yellow-400 text-xs">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => handleDelete(review._id)}
                      className="text-red-400 hover:bg-red-900/30 p-2 rounded transition"
                      title="Törlés"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
