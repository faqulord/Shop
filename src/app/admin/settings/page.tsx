import { Save } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Bolt Beállítások</h1>
      
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
        <h3 className="font-bold text-lg mb-4">Általános</h3>
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bolt Neve</label>
            <input type="text" className="w-full p-2 border rounded-lg bg-gray-50" defaultValue="LipsesOfficial" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pénznem</label>
            <select className="w-full p-2 border rounded-lg bg-gray-50">
              <option>HUF (Ft)</option>
              <option>EUR (€)</option>
            </select>
          </div>
        </div>
      </div>
      
      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition">
        <Save size={20} /> Mentés
      </button>
    </div>
  );
}
