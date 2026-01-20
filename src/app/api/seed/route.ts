import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

async function connectToDb() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (!MONGODB_URI) throw new Error('HIÁNYZIK A MONGODB_URI!');
  return await mongoose.connect(MONGODB_URI);
}

// --- MODELLEK DEFINIÁLÁSA (Biztonsági okból itt helyben) ---

// 1. Termék
const productSchema = new mongoose.Schema({ 
  name: String, 
  description: String, 
  price: Number, 
  originalPrice: Number, 
  discountText: String, 
  imageUrl: String, 
  reviewsCount: Number, 
  rating: Number 
}, { timestamps: true });
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

// 2. Komment (Vélemény) - Bővítve képpel
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

// 3. Rendelés (EZ AZ ÚJ!)
const orderSchema = new mongoose.Schema({ 
  customerName: String, 
  email: String, 
  phone: String, 
  address: String, 
  city: String, 
  zip: String, 
  products: Array, 
  totalAmount: Number, 
  status: String 
}, { timestamps: true });
const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);


// --- A FOLYAMAT ---

export async function GET() {
  try {
    await connectToDb(); 

    // Törlünk mindent, hogy tiszta lappal induljunk
    await Product.deleteMany({});
    await Review.deleteMany({});
    await Order.deleteMany({});

    // 1. Létrehozzuk a TERMÉKET
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

    // 2. Létrehozzuk a KOMMENTEKET
    await Review.create([
      { author: "Kovács Kinga", text: "Csajok! Ez valami brutál. 😱", rating: 5, date: "23 perce", likes: 124, verified: true },
      { author: "Nagy Szandra", text: "Már a második tubussal rendeltem. 💋", rating: 5, date: "2 órája", likes: 89, hasPhoto: true, verified: true, imageUrl: "https://images.unsplash.com/photo-1512413914633-b5043f4041ea?w=200" },
      { author: "Tóth Eszter", text: "Hihetetlen gyors szállítás! ❤️", rating: 5, date: "5 órája", likes: 45, verified: true }
    ]);

    // 3. Létrehozzuk a PRÓBA RENDELÉSEKET (Hogy legyen statisztika)
    await Order.create([
      { 
        customerName: "Varga Judit", 
        email: "judit@gmail.com", 
        phone: "06301234567", 
        address: "Kossuth u. 12.", 
        city: "Budapest", 
        zip: "1052", 
        products: [{name: "Lipses", price: 9990, quantity: 1}], 
        totalAmount: 9990, 
        status: "Feldolgozás alatt" 
      },
      { 
        customerName: "Kiss Péter", 
        email: "peter@citromail.hu", 
        phone: "06209876543", 
        address: "Fő tér 5.", 
        city: "Debrecen", 
        zip: "4025", 
        products: [{name: "Lipses", price: 9990, quantity: 2}], 
        totalAmount: 19980, 
        status: "Szállítás alatt" 
      },
      { 
        customerName: "Nagy Éva", 
        email: "eva@freemail.hu", 
        phone: "06705554433", 
        address: "Petőfi S. u. 8.", 
        city: "Szeged", 
        zip: "6720", 
        products: [{name: "Lipses", price: 9990, quantity: 1}], 
        totalAmount: 9990, 
        status: "Kézbesítve" 
      }
    ]);

    return NextResponse.json({ message: "SIKER! 🚀 Adatbázis feltöltve termékkel, kommentekkel és próba rendelésekkel." });
    
  } catch (error: any) {
    return NextResponse.json({ error: "Hiba: " + error.message }, { status: 500 });
  }
}
