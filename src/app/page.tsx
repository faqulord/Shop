import Image from "next/image";
import { Star, Check, Zap, ShoppingCart } from "lucide-react";

export default function Home() {
  const product = {
    name: "Smart Lip Plumper PRO",
    price: 12990,
    originalPrice: 24990,
    rating: 4.9,
    reviews: 842,
    mainImage: "https://images.unsplash.com/photo-1596462502278-27bfdd403ea6?auto=format&fit=crop&q=80&w=800",
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans pb-24 md:pb-0">
      <div className="bg-black text-white text-center text-xs py-2 font-medium tracking-wide">
        INGYENES SZÁLLÍTÁS MA ÉJFÉLIG 🚚
      </div>
      <nav className="flex justify-between items-center p-4 border-b sticky top-0 bg-white/95 backdrop-blur z-50 shadow-sm">
        <div className="text-xl font-black tracking-tighter text-pink-600">
          GLOW<span className="text-black">LAB</span>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
          <ShoppingCart size={16} /> Kosár (0)
        </button>
      </nav>
      <main className="max-w-6xl mx-auto md:py-10 p-4">
        <div className="md:grid md:grid-cols-2 md:gap-12">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-6 border border-gray-100">
            <img src={product.mainImage} alt="Lip Plumper" className="w-full h-full object-cover"/>
            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
              -50% AKCIÓ
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-extrabold mb-4 leading-tight">
              Telt ajkak <span className="text-pink-600">tűszúrás nélkül.</span>
            </h1>
            <div className="flex items-end gap-3 mb-6 border-b pb-6 border-gray-100">
              <span className="text-4xl font-bold text-gray-900">{product.price.toLocaleString('hu-HU')} Ft</span>
              <span className="text-xl text-gray-400 line-through mb-1">{product.originalPrice.toLocaleString('hu-HU')} Ft</span>
            </div>
            <button className="hidden md:flex w-full bg-pink-600 text-white text-xl font-bold py-5 rounded-xl items-center justify-center gap-2 shadow-xl">
              MEGRENDELEM MOST <Zap className="fill-white"/>
            </button>
          </div>
        </div>
      </main>
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-4 z-50 shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-500 font-bold text-sm">Végösszeg:</span>
          <span className="text-xl font-bold">{product.price.toLocaleString('hu-HU')} Ft</span>
        </div>
        <button className="w-full bg-black text-white py-3.5 rounded-xl text-lg font-bold flex justify-center items-center gap-2 shadow-lg">
          KÉREM A CSOMAGOT <Zap className="w-5 h-5 fill-white"/>
        </button>
      </div>
    </div>
  );
}
