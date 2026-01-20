import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

async function connectToDb() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (!MONGODB_URI) throw new Error('HIÁNYZIK A MONGODB_URI!');
  return await mongoose.connect(MONGODB_URI);
}

// BŐVÍTETT SÉMA: Most már van 'imageUrl'
const reviewSchema = new mongoose.Schema({
  author: String,
  text: String,
  rating: Number,
  date: String,
  likes: Number,
  hasPhoto: Boolean,
  verified: Boolean,
  imageUrl: String // <--- EZ AZ ÚJ SOR
}, { timestamps: true });

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

export async function GET() {
  try {
    await connectToDb();
    const reviews = await Review.find().sort({ createdAt: -1 });
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ error: "Hiba" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectToDb();
    const { id } = await req.json();
    await Review.findByIdAndDelete(id);
    return NextResponse.json({ message: "Törölve" });
  } catch (error) {
    return NextResponse.json({ error: "Hiba" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDb();
    const body = await req.json();
    await Review.create(body);
    return NextResponse.json({ message: "Létrehozva" });
  } catch (error) {
    return NextResponse.json({ error: "Hiba" }, { status: 500 });
  }
}
