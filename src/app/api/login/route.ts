import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // --- ITT A JELSZÓ! ---
    // Alapból "admin123", de a Railway-en az ADMIN_PASSWORD változóval átírhatod.
    const PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

    // Ha a beírt jelszó egyezik a titkossal
    if (body.password === PASSWORD) {
      const response = NextResponse.json({ success: true });
      
      // Adunk egy "admin_token" sütit, ami 1 napig érvényes
      response.cookies.set('admin_token', 'true', { 
        httpOnly: true,     // JavaScript nem fér hozzá (biztonságos)
        path: '/',          // Minden oldalon érvényes
        maxAge: 60 * 60 * 24 // 1 nap (másodpercben)
      });
      
      return response;
    }

    // Ha rossz a jelszó
    return NextResponse.json({ error: "Rossz jelszó" }, { status: 401 });

  } catch (error) {
    return NextResponse.json({ error: "Hiba történt" }, { status: 500 });
  }
}
