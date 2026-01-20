import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// --- 1. RÉSZ: A KAPCSOLAT ÉS MODELLEK (Mindent ideírunk, hogy ne legyen útvonal hiba) ---

const MONGODB_URI = process.env.MONGODB_URI;

// Adatbázis kapcsolódás
async function connectToDb() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }
  if (!MONGODB_URI) {
    throw new Error('HIÁNYZIK A MONGODB_URI a Railway Variables-ből!');
  }
  return await mongoose.connect(MONGODB_URI);
}

// Termék Tervrajz
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  originalPrice: Number,
  discountText: String,
  imageUrl: String,
  reviewsCount: Number,
  rating: Number,
}, { timestamps: true });

// Ha már létezik, használjuk azt, ha nem, létrehozzuk (Precízen kezelve a kis-nagybetűt)
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

// Komment Tervrajz
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


// --- 2. RÉSZ: A FELTÖLTÉS ---

export async function GET() {
  try {
    await connectToDb(); 

    // Törlés és Újraírás
    await Product.deleteMany({});
    await Review.deleteMany({});

    await Product.create({
      name: "Lipses Varázs Ajakdúsító",
      description: "Felejtsd el a fájdalmas tűszúrásokat! A Lipses Varázs természetes hatóanyagaival azonnal dúsítja az ajkakat.",
      price: 9990,
      originalPrice: 19990,
      discountText: "-50% AKCIÓ",
      imageUrl: "/lipses.jpg",
      reviewsCount: 1245,
      rating: 4.9
    });

    await Review.create([
      { author: "Kovács Kinga", text: "Csajok! Ez valami brutál. 😱", rating: 5, date: "23 perce", likes: 124, verified: true },
      { author: "Nagy Szandra", text: "Már a második tubussal rendeltem. 💋", rating: 5, date: "2 órája", likes: 89, hasPhoto: true, verified: true },
      { author: "Tóth Eszter", text: "Hihetetlen gyors szállítás! ❤️", rating: 5, date: "5 órája", likes: 45, verified: true }
    ]);

    return NextResponse.json({ message: "SIKER! 🚀 Adatbázis feltöltve." });
    
  } catch (error: any) {
    return NextResponse.json({ error: "Hiba: " + error.message }, { status: 500 });
  }
}
