import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

async function connectToDb() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (!MONGODB_URI) throw new Error('HIÁNYZIK A MONGODB_URI!');
  return await mongoose.connect(MONGODB_URI);
}

// ITT A LÉNYEG: Nincs import, itt van a modell definíciója!
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

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export async function GET() {
  try {
    await connectToDb();
    const product = await Product.findOne();
    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ error: "Hiba: " + error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectToDb();
    const body = await req.json();
    const updatedProduct = await Product.findOneAndUpdate({}, body, { new: true });
    return NextResponse.json(updatedProduct);
  } catch (error: any) {
    return NextResponse.json({ error: "Hiba: " + error.message }, { status: 500 });
  }
}
