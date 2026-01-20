import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// --- 1. ADATBÁZIS KAPCSOLÓDÁS ---
const MONGODB_URI = process.env.MONGODB_URI;

async function connectToDb() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (!MONGODB_URI) throw new Error('HIÁNYZIK A MONGODB_URI!');
  return await mongoose.connect(MONGODB_URI);
}

// --- 2. MODELL DEFINIÁLÁSA HELYBEN (A Hiba elkerülése végett) ---
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  discountText: { type: String },
  imageUrl: { type: String, required: true },
  reviewsCount: { type: Number, default: 0 },
  rating: { type: Number, default: 5 }
}, { timestamps: true });

// Így biztosan megtalálja a Product modellt!
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);


// --- 3. API FUNKCIÓK ---

// LEKÉRÉS (GET)
export async function GET() {
  try {
    await connectToDb();
    const product = await Product.findOne();
    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ error: "Hiba: " + error.message }, { status: 500 });
  }
}

// MENTÉS (PUT)
export async function PUT(req: Request) {
  try {
    await connectToDb();
    const body = await req.json();
    
    // Frissítjük az első terméket
    const updatedProduct = await Product.findOneAndUpdate({}, body, { new: true });
    
    return NextResponse.json(updatedProduct);
  } catch (error: any) {
    return NextResponse.json({ error: "Hiba: " + error.message }, { status: 500 });
  }
}
