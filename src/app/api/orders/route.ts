import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Ha nincs .env fájl, akkor a helyi adatbázist használja
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/shop";

async function connectToDb() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  return await mongoose.connect(MONGODB_URI);
}

// Bővítettük a sémát: paymentMethod + trackingNumber
const OrderSchema = new mongoose.Schema({
  customerName: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  zip: String,
  products: Array,
  totalAmount: Number,
  paymentMethod: String, // EZT HOZZÁADTAM (hogy lássuk mivel fizetett)
  status: { type: String, default: 'Fizetésre vár' },
  trackingNumber: { type: String, default: '' }
}, { timestamps: true });

// Figyelünk, hogy ne legyen modell ütközés újratöltéskor
const Order = mongoose.models.ShopOrder || mongoose.model('ShopOrder', OrderSchema);

// --- 1. GET: Adatok lekérése az Adminnak ---
export async function GET() {
  try {
    await connectToDb();
    // A legújabb rendelés legyen legfelül (sort -1)
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ error: "Hiba az adatok lekérésekor" }, { status: 500 });
  }
}

// --- 2. POST: Új rendelés mentése (Vásárláskor) ---
export async function POST(req: Request) {
  try {
    await connectToDb();
    const body = await req.json();
    
    // Alapértelmezett státusz beállítása
    const newOrderData = {
        ...body,
        status: 'Fizetésre vár (PayPal)',
    };

    const newOrder = await Order.create(newOrderData);
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error: any) {
    console.error("Mentési hiba:", error);
    return NextResponse.json({ error: "Hiba a rendelés mentésekor" }, { status: 500 });
  }
}

// --- 3. PUT: Státusz és Követőkód frissítése (Adminból) ---
export async function PUT(req: Request) {
  try {
    await connectToDb();
    const body = await req.json();
    const { id, status, trackingNumber } = body; 

    if (!id) return NextResponse.json({ error: "Nincs ID megadva" }, { status: 400 });

    const updatedOrder = await Order.findByIdAndUpdate(
      id, 
      { status, trackingNumber }, 
      { new: true } // Visszaküldi a frissített adatot
    );

    return NextResponse.json(updatedOrder);
  } catch (error: any) {
    return NextResponse.json({ error: "Hiba a frissítéskor" }, { status: 500 });
  }
}