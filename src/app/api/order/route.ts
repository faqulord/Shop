import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Order from '@/models/Order';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectToDatabase();

    // Létrehozzuk az új rendelést az adatbázisban "Függőben" státusszal
    const newOrder = await Order.create({
      customerName: body.name,
      email: body.email,
      phone: body.phone,
      address: body.address,
      product: "Lipses Lip Plumper - Valentin Nap",
      price: 12990,
      status: 'fizetesre_var', // Még nem tudjuk, hogy sikeres-e a PayPal, de az adat megvan!
    });

    return NextResponse.json({ message: 'Rendelés rögzítve', orderId: newOrder._id }, { status: 201 });
  } catch (error) {
    console.error('Rendelés hiba:', error);
    return NextResponse.json({ message: 'Hiba történt' }, { status: 500 });
  }
}