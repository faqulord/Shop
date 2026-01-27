"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      // Értesítjük a rendszert, hogy a fizetés sikeres volt!
      fetch('/api/order/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId }),
      })
      .then(() => setLoading(false))
      .catch((err) => console.error(err));
    } else {
      setLoading(false);
    }
  }, [orderId]);

  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center p-4 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-green-100">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-green-500 w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-brand-dark mb-4">Köszönjük a rendelésed!</h1>
        <p className="text-gray-600 mb-8">
          A fizetés sikeres volt. A csomagodat hamarosan összeállítjuk és átadjuk a futárnak.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-6 text-sm text-gray-500">
          Rendelés azonosító: <br/>
          <span className="font-mono text-brand-dark font-bold">{orderId}</span>
        </div>
        <Link href="/" className="bg-brand-accent text-white py-3 px-8 rounded-full font-bold inline-flex items-center gap-2 hover:bg-red-600 transition">
          Vissza a főoldalra <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}