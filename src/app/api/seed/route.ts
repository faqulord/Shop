import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Product from '@/models/Product';
import Review from '@/models/Review';

export async function GET() {
  await dbConnect();

  // 1. Töröljük a régi szemetet (hogy ne legyen duplikáció)
  await Product.deleteMany({});
  await Review.deleteMany({});

  // 2. Létrehozzuk a LIPSES terméket
  await Product.create({
    name: "Lipses Varázs Ajakdúsító",
    description: "Felejtsd el a fájdalmas tűszúrásokat! A Lipses Varázs természetes hatóanyagaival azonnal dúsítja az ajkakat.",
    price: 9990,
    originalPrice: 19990,
    discountText: "-50% AKCIÓ",
    imageUrl: "/lipses.jpg", // Majd ide teszünk képet
    reviewsCount: 1245,
    rating: 4.9
  });

  // 3. Létrehozzuk a KAMU KOMMENTEKET
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

  return NextResponse.json({ message: "ADATBÁZIS SIKERESEN FELTÖLTVE! 🚀 Mehetsz az oldalra." });
}
