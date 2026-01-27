import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Visit from '@/models/Visit';

export async function POST() {
  await connectToDatabase();
  await Visit.create({}); // Létrehozunk egy új látogatást
  return NextResponse.json({ message: 'OK' });
}