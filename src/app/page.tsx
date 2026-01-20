import { ShoppingBag } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <div className="flex items-center gap-3 mb-8">
        {/* Itt már a te primary színedet használjuk! */}
        <ShoppingBag className="h-12 w-12 text-primary" />
        <h1 className="text-4xl font-bold text-gray-900">
          Lipses <span className="text-primary">Shop</span>
        </h1>
      </div>
      
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-100">
        <div className="h-32 w-32 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl">
          💄
        </div>
        
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          A rendszer készen áll!
        </h2>
        
        <p className="text-gray-600 mb-8">
          A Tailwind CSS dizájn motor sikeresen beépítve. <br/>
          Most következik az adatbázis bekötése.
        </p>
        
        <button className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md active:scale-95">
          Admin Belépés (Hamarosan)
        </button>
      </div>
    </main>
  );
}
