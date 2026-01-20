import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

async function connectToDb() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (!MONGODB_URI) throw new Error('HIÁNYZIK A MONGODB_URI!');
  return await mongoose.connect(MONGODB_URI);
}

// MODELL DEFINIÁLÁSA HELYBEN (Biztos ami biztos alapon)
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
  status: { type: String, default: 'Feldolgozás alatt' } // Alap státusz
}, { timestamps: true });

// Fontos: Itt a 'ShopOrder' nevet használjuk, amit múltkor tisztáztunk!
const Order = mongoose.models.ShopOrder || mongoose.model('ShopOrder', OrderSchema);

// 1. LEKÉRÉS (GET) - Az Adminnak
export async function GET() {
  try {
    await connectToDb();
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ error: "Hiba: " + error.message }, { status: 500 });
  }
}

// 2. ÚJ RENDELÉS MENTÉSE (POST) - A Főoldalnak
export async function POST(req: Request) {
  try {
    await connectToDb();
    const body = await req.json(); // Megkapjuk az adatokat a főoldalról

    // Létrehozzuk az új rendelést az adatbázisban
    const newOrder = await Order.create(body);
    
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: "Hiba a mentéskor: " + error.message }, { status: 500 });
  }
}
