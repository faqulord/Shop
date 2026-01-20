import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Order from '@/models/order'; // <--- ITT A JAVÍTÁS: KISBETŰS "order"

const MONGODB_URI = process.env.MONGODB_URI;

async function connectToDb() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }
  if (!MONGODB_URI) {
    throw new Error('HIÁNYZIK A MONGODB_URI!');
  }
  return await mongoose.connect(MONGODB_URI);
}

export async function GET() {
  try {
    await connectToDb();
    
    // Lekérjük az összes rendelést
    const orders = await Order.find().sort({ createdAt: -1 });
    
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "Hiba a lekéréskor" }, { status: 500 });
  }
}
