import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// --- 1. ADATBÁZIS KAPCSOLÓDÁS ---
const MONGODB_URI = process.env.MONGODB_URI;

async function connectToDb() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (!MONGODB_URI) throw new Error('HIÁNYZIK A MONGODB_URI!');
  return await mongoose.connect(MONGODB_URI);
}

// --- 2. MODELL DEFINIÁLÁSA ITT HELYBEN (Hogy ne legyen "Module not found" hiba) ---
// Ez biztosítja, hogy a kód mindig megtalálja a sémát, importálás nélkül!

const OrderSchema = new mongoose.Schema({
  customerName: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  zip: String,
  products: [{
    name: String,
    price: Number,
    quantity: Number
  }],
  totalAmount: Number,
  status: { type: String, default: 'Feldolgozás alatt' }
}, { timestamps: true });

// Fontos: Itt 'Order'-t használunk, hogy lássa a korábban feltöltött adatokat!
// (A 'models.Order' ellenőrzi, hogy létezik-e már a modell, így nem akad össze)
const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);


// --- 3. A LEKÉRDEZÉS (API) ---
export async function GET() {
  try {
    await connectToDb();
    
    // Lekérjük az összes rendelést, a legújabbal kezdve
    const orders = await Order.find().sort({ createdAt: -1 });
    
    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ error: "Hiba: " + error.message }, { status: 500 });
  }
}
