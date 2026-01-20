import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

async function connectToDb() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (!MONGODB_URI) throw new Error('HIÁNYZIK A MONGODB_URI!');
  return await mongoose.connect(MONGODB_URI);
}

// Bővítettük a sémát a követőkóddal (trackingNumber)
const OrderSchema = new mongoose.Schema({
  customerName: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  zip: String,
  products: Array,
  totalAmount: Number,
  status: { type: String, default: 'Feldolgozás alatt' },
  trackingNumber: { type: String, default: '' } // EZ AZ ÚJ!
}, { timestamps: true });

const Order = mongoose.models.ShopOrder || mongoose.model('ShopOrder', OrderSchema);

export async function GET() {
  try {
    await connectToDb();
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ error: "Hiba" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDb();
    const body = await req.json();
    const newOrder = await Order.create(body);
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: "Hiba" }, { status: 500 });
  }
}

// EZ AZ ÚJ RÉSZ: A Státusz Frissítése!
export async function PUT(req: Request) {
  try {
    await connectToDb();
    const body = await req.json();
    const { id, status, trackingNumber } = body; // Ezeket várjuk az Admintól

    // Megkeressük ID alapján és frissítjük
    const updatedOrder = await Order.findByIdAndUpdate(
      id, 
      { status, trackingNumber }, 
      { new: true }
    );
    
    return NextResponse.json(updatedOrder);
  } catch (error: any) {
    return NextResponse.json({ error: "Hiba a frissítéskor" }, { status: 500 });
  }
}
