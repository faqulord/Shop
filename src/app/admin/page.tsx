import { DollarSign, ShoppingBag, Users, TrendingUp, ArrowUpRight } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      
      {/* Címsor */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Jó reggelt, Főnök! 👋</h1>
        <p className="text-gray-500">Itt tart ma a webshopod.</p>
      </div>

      {/* Statisztika Kártyák */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Bevétel */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
              <TrendingUp className="w-3 h-3 mr-1" /> +12%
            </span>
          </div>
          <p className="text-sm text-gray-500 font-medium">Összes Bevétel</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">154.990 Ft</h3>
        </div>

        {/* Rendelések */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
            <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
              <TrendingUp className="w-3 h-3 mr-1" /> +5%
            </span>
          </div>
          <p className="text-sm text-gray-500 font-medium">Rendelések száma</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">18 db</h3>
        </div>

        {/* Látogatók */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 font-medium">Aktív látogatók</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">42</h3>
        </div>
      </div>

      {/* Legutóbbi Rendelések Táblázat */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-bold text-gray-900">Legutóbbi Rendelések</h3>
          <button className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1">
            Összes megtekintése <ArrowUpRight size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase">
              <tr>
                <th className="px-6 py-4 font-medium">Rendelés ID</th>
                <th className="px-6 py-4 font-medium">Vásárló</th>
                <th className="px-6 py-4 font-medium">Dátum</th>
                <th className="px-6 py-4 font-medium">Státusz</th>
                <th className="px-6 py-4 font-medium text-right">Összeg</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              <tr className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-900">#1024</td>
                <td className="px-6 py-4">Kovács Anna</td>
                <td className="px-6 py-4 text-gray-500">Ma, 10:23</td>
                <td className="px-6 py-4"><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-bold">Feldolgozás</span></td>
                <td className="px-6 py-4 text-right font-medium">9.990 Ft</td>
              </tr>
              <tr className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-900">#1023</td>
                <td className="px-6 py-4">Nagy Péter</td>
                <td className="px-6 py-4 text-gray-500">Tegnap, 22:15</td>
                <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">Kiszállítva</span></td>
                <td className="px-6 py-4 text-right font-medium">19.990 Ft</td>
              </tr>
              <tr className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-900">#1022</td>
                <td className="px-6 py-4">Szabó Éva</td>
                <td className="px-6 py-4 text-gray-500">Tegnap, 18:40</td>
                <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">Kiszállítva</span></td>
                <td className="px-6 py-4 text-right font-medium">9.990 Ft</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
