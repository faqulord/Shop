import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Product from '@/models/Product'; // <--- Ezt frissítettük az előbb

const MONGODB_URI = process.env.MONGODB_URI;

async function connectToDb() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  return await mongoose.connect(MONGODB_URI!);
}

// 1. LEKÉRÉS (GET) - Hogy lásd az adatokat a szerkesztőben
export async function GET() {
  try {
    await connectToDb();
    // Mivel ez egy egytermékes bolt, az elsőt kérjük le
    const product = await Product.findOne();
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Hiba a lekéréskor" }, { status: 500 });
  }
}

// 2. MENTÉS (PUT) - Amikor átírod az árat vagy szöveget
export async function PUT(req: Request) {
  try {
    await connectToDb();
    const body = await req.json();
    
    // Megkeressük az első terméket és felülírjuk az új adatokkal
    // a { new: true } miatt a frissített adatot kapjuk vissza
    const updatedProduct = await Product.findOneAndUpdate({}, body, { new: true });
    
    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ error: "Hiba a mentéskor" }, { status: 500 });
  }
}
