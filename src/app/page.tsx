import { ShoppingBag } from 'lucide-react';

export default function Home() {
  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      fontFamily: 'sans-serif',
      padding: '20px'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '15px', 
        marginBottom: '20px' 
      }}>
        <ShoppingBag size={48} color="#333" />
        <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Super Dropship Store</h1>
      </div>
      
      <p style={{ fontSize: '1.2rem', color: '#666', textAlign: 'center' }}>
        Az oldal sikeresen elindult! 🚀<br />
        A termékek feltöltése folyamatban...
      </p>
      
      <button style={{
        marginTop: '30px',
        padding: '12px 24px',
        fontSize: '1rem',
        backgroundColor: '#000',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>
        Vásárlás megkezdése
      </button>
    </main>
  );
}
