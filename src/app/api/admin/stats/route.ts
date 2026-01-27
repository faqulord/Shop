import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Order from '@/models/Order';
import Visit from '@/models/Visit';

export async function GET() {
  try {
    await connectToDatabase();

    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // 1. Rendelések lekérdezése
    const orders = await Order.find().sort({ createdAt: -1 });

    // 2. Bevételek számolása
    const dailyRevenue = orders
      .filter(o => new Date(o.createdAt) >= startOfDay)
      .reduce((acc, curr) => acc + (curr.price || 0), 0);

    const monthlyRevenue = orders
      .filter(o => new Date(o.createdAt) >= startOfMonth)
      .reduce((acc, curr) => acc + (curr.price || 0), 0);

    // 3. Látogatók számolása
    const totalVisitors = await Visit.countDocuments();
    const todayVisitors = await Visit.countDocuments({
      date: { $gte: startOfDay }
    });

    return NextResponse.json({
      orders,
      stats: {
        dailyRevenue,
        monthlyRevenue,
        totalVisitors,
        todayVisitors
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Hiba az adatok lekérésekor' }, { status: 500 });
  }
}