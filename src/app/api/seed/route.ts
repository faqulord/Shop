import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// --- 1. RÉSZ: A MODELLEK ÉS KAPCSOLAT (Mindent idehoztunk) ---

const MONGODB_URI = process.env.MONGODB_URI;

// Adatbázis kapcsolódás logikája
async function connectToDb() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }
  if (!MONGODB_URI) {
    throw new Error('HIÁNYZIK A MONGODB_URI a Railway Variables-ből!');
  }
  return await mongoose.connect(MONGODB_URI);
}

// Termék "Tervrajz" (Schema)
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

// Ha már létezik a modell, használjuk azt, ha nem, létrehozzuk
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

// Komment "Tervrajz" (Schema)
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


// --- 2. RÉSZ: MAGA A FELTÖLTÉS ---

export async function GET() {
  try {
    await connectToDb(); // 1. Kapcsolódunk

    // 2. Töröljük a régit
    await Product.deleteMany({});
    await Review.deleteMany({});

    // 3. Létrehozzuk a TERMÉKET
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

    // 4. Létrehozzuk a KOMMENTEKET
    await Review.create([
      {
        author: "Kovács Kinga",
        text: "Csajok! Ez valami brutál. 😱 Én félek a tűtől, de ettől 5 perc alatt olyan szám lett, hogy a barátom azt hitte orvosnál voltam.",
        rating: 5,
        date: "23 perce",
        likes: 124,
        verified: true
      },
      {
        author: "Nagy Szandra",
        text: "Már a második tubussal rendeltem. Buliba kötelező! Kicsit csíp az elején, de pont ettől nő meg. 💋",
        rating: 5,
        date: "2 órája",
        likes: 89,
        hasPhoto: true,
        verified: true
      },
      {
        author: "Tóth Eszter",
        text: "Hihetetlen gyors szállítás, tegnap rendeltem, ma reggel hozta a futár. Köszönöm Lipses! ❤️",
        rating: 5,
        date: "5 órája",
        likes: 45,
        verified: true
      }
    ]);

    return NextResponse.json({ message: "SIKER! 🚀 Az adatbázis fel lett töltve a termékkel és kommentekkel." });
    
  } catch (error: any) {
    return NextResponse.json({ error: "Hiba történt: " + error.message }, { status: 500 });
  }
}
