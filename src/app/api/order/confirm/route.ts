import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Order from '@/models/Order';

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    await connectToDatabase();
    
    // Megkeressük a rendelést és átírjuk a státuszt FIZETVE-re
    await Order.findByIdAndUpdate(id, { status: 'FIZETVE' });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Hiba' }, { status: 500 });
  }
}