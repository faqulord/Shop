import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// --- 1. RÉSZ: KAPCSOLAT ÉS SÉMA (A Biztonság kedvéért itt is definiáljuk) ---

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

// Komment Séma (Ugyanaz, mint eddig)
const reviewSchema = new mongoose.Schema({
  author: String,
  text: String,
  rating: Number,
  date: String,
  likes: Number,
  hasPhoto: Boolean,
  verified: Boolean
}, { timestamps: true });

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

// --- 2. RÉSZ: A FUNKCIÓK ---

// LEKÉRDEZÉS (Hogy lássuk a kommenteket az Admin panelen)
export async function GET() {
  try {
    await connectToDb();
    const reviews = await Review.find().sort({ createdAt: -1 }); // Legújabb elöl
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ error: "Hiba a lekéréskor" }, { status: 500 });
  }
}

// TÖRLÉS (Ha nem tetszik egy komment)
export async function DELETE(req: Request) {
  try {
    await connectToDb();
    const { id } = await req.json(); // Megkapjuk, melyiket kell törölni
    await Review.findByIdAndDelete(id);
    return NextResponse.json({ message: "Sikeresen törölve!" });
  } catch (error) {
    return NextResponse.json({ error: "Hiba a törléskor" }, { status: 500 });
  }
}

// HOZZÁADÁS (Ha újat akarsz írni)
export async function POST(req: Request) {
  try {
    await connectToDb();
    const body = await req.json();
    await Review.create(body);
    return NextResponse.json({ message: "Komment létrehozva!" });
  } catch (error) {
    return NextResponse.json({ error: "Hiba a mentéskor" }, { status: 500 });
  }
}
