import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

async function connectToDb() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  return await mongoose.connect(MONGODB_URI!);
}

// DEFINIÁLJUK A VÉLEMÉNYEKET (Hogy mit keressen az adatbázisban)
const reviewSchema = new mongoose.Schema({ 
  author: String, 
  text: String, 
  rating: Number, 
  date: String, 
  likes: Number, 
  hasPhoto: Boolean, 
  verified: Boolean, 
  imageUrl: String 
}, { timestamps: true });

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

export async function GET() {
  try {
    await connectToDb();
    // Lekérjük az összes véleményt, a legújabbal kezdve
    const reviews = await Review.find().sort({ createdAt: -1 });
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ error: "Hiba" }, { status: 500 });
  }
}
