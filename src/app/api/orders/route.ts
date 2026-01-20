import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Order from '@/models/ShopOrder'; // <--- ITT A LÉNYEG!

const MONGODB_URI = process.env.MONGODB_URI;

async function connectToDb() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  return await mongoose.connect(MONGODB_URI!);
}

export async function GET() {
  try {
    await connectToDb();
    // Lekérjük az összes rendelést, legújabbal kezdve
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "Hiba" }, { status: 500 });
  }
}
