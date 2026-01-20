"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/admin'); // Ha jó, beenged
    } else {
      setError('Hibás jelszó! Próbáld újra.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-sm">
        
        <div className="flex justify-center mb-6">
          <div className="bg-pink-600/20 p-4 rounded-full">
            <Lock className="w-8 h-8 text-pink-500" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-white mb-2 text-center">Admin Belépés</h1>
        <p className="text-gray-400 text-sm text-center mb-6">Csak illetékeseknek!</p>
        
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Jelszó..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-700 text-white border border-gray-600 mb-4 focus:outline-none focus:border-pink-500 transition"
          />
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-lg mb-4 text-center">
              {error}
            </div>
          )}
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-xl transition active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Ellenőrzés...' : 'BELÉPÉS'}
          </button>
        </form>

      </div>
    </div>
  );
}
