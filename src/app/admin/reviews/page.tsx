"use client";
import { useState, useEffect } from 'react';
import { Trash2, Plus, Star, User, CheckCircle, Search } from 'lucide-react';

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

  useEffect(() => { fetchReviews(); }, []);

  const fetchReviews = async () => {
    const res = await fetch('/api/reviews');
    const data = await res.json();
    setReviews(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Törlöd ezt a véleményt?')) return;
    await fetch('/api/reviews', { method: 'DELETE', body: JSON.stringify({ id }) });
    fetchReviews();
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/reviews', { method: 'POST', body: JSON.stringify({ ...newReview, verified: true }) });
    setShowForm(false);
    setNewReview({ author: '', text: '', rating: 5, date: 'Most', likes: 0 });
    fetchReviews();
  };

  return (
    <div className="max-w-5xl mx-auto">
      
      {/* Címsor és Gomb */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vásárlói Vélemények</h1>
          <p className="text-gray-500 text-sm">Itt tudod kezelni a "kamu" és valódi visszajelzéseket.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition shadow-sm"
        >
          <Plus size={18} /> Új Hozzáadása
        </button>
      </div>

      {/* Új Hozzáadása Doboz */}
      {showForm && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8 animate-fade-in">
          <h3 className="font-bold text-gray-900 mb-4">Új vélemény generálása</h3>
          <form onSubmit={handleAdd} className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                placeholder="Név (pl. Nagy Anna)" 
                className="bg-gray-50 p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newReview.author}
                onChange={e => setNewReview({...newReview, author: e.target.value})}
                required
              />
              <select 
                className="bg-gray-50 p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newReview.rating}
                onChange={e => setNewReview({...newReview, rating: Number(e.target.value)})}
              >
                <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                <option value="4">⭐⭐⭐⭐ (4)</option>
              </select>
            </div>
            <textarea 
              placeholder="Vélemény szövege..." 
              className="bg-gray-50 p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
              value={newReview.text}
              onChange={e => setNewReview({...newReview, text: e.target.value})}
              required
            />
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition">
              MENTÉS
            </button>
          </form>
        </div>
      )}

      {/* Lista */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Betöltés...</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs border-b border-gray-200 hidden md:table-header-group">
              <tr>
                <th className="p-4">Vásárló</th>
                <th className="p-4">Szöveg</th>
                <th className="p-4">Értékelés</th>
                <th className="p-4 text-right">Művelet</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reviews.map((review) => (
                <tr key={review._id} className="hover:bg-gray-50 transition flex flex-col md:table-row">
                  <td className="p-4">
                    <div className="font-bold text-gray-900 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">
                        {review.author.charAt(0)}
                      </div>
                      {review.author}
                      {review.verified && <CheckCircle size={14} className="text-blue-500" />}
                    </div>
                    <div className="text-xs text-gray-400 mt-1 md:hidden">{review.date}</div>
                  </td>
                  <td className="p-4 text-sm text-gray-600 md:max-w-md">
                    {review.text}
                  </td>
                  <td className="p-4">
                    <div className="flex text-yellow-400 text-xs">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-right border-t md:border-t-0 border-gray-100">
                    <button 
                      onClick={() => handleDelete(review._id)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition flex items-center gap-2 md:inline-flex"
                    >
                      <Trash2 size={16} /> <span className="md:hidden text-sm font-medium">Törlés</span>
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
