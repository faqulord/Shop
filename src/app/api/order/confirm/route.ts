
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Order from '@/models/Order';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    await connectToDatabase();
    
    // 1. Megkeressük a rendelést és átírjuk a státuszt FIZETVE-re
    // Fontos: elmentjük az eredményt egy változóba (updatedOrder), hogy tudjuk az email címet!
    const updatedOrder = await Order.findByIdAndUpdate(id, { status: 'FIZETVE' }, { new: true });

    if (!updatedOrder) {
      return NextResponse.json({ error: 'Rendelés nem található' }, { status: 404 });
    }

    // 2. EMAIL KÜLDÉS BEÁLLÍTÁSA
    // Csak akkor próbálunk emailt küldeni, ha be vannak állítva a jelszavak a Railway-en
    if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
      
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS, // Ez NEM a sima jelszó, hanem "Alkalmazás Jelszó"
        },
      });

      const mailOptions = {
        from: `"Lipses Hungary" <${process.env.GMAIL_USER}>`,
        to: updatedOrder.email, // A vevő email címe
        subject: 'Sikeres Rendelés - Lipses Hungary',
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
            <div style="background-color: #FDF4F5; padding: 20px; text-align: center; border-bottom: 3px solid #C69C6D;">
              <h1 style="color: #5A3A3A; margin: 0;">Köszönjük a rendelésed! 💖</h1>
            </div>
            
            <div style="padding: 20px;">
              <p>Kedves <strong>${updatedOrder.customerName}</strong>!</p>
              
              <p>Örömmel értesítünk, hogy a fizetésed sikeresen beérkezett. A rendelésedet feldolgoztuk.</p>
              
              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>Rendelt termék:</strong> Lipses Lip Plumper - Valentin Napi Kiadás</p>
                <p style="margin: 5px 0;"><strong>Szállítási cím:</strong> ${updatedOrder.address}</p>
                <p style="margin: 5px 0;"><strong>Státusz:</strong> <span style="color: green; font-weight: bold;">Kiszállítás alatt 🚚</span></p>
              </div>

              <p>Hamarosan átadjuk a futárnak, és már úton is lesz hozzád a telt ajkak titka! 😉</p>
              
              <p style="font-size: 12px; color: #888; margin-top: 30px;">
                Üdvözlettel,<br/>
                A LipsesHungary Csapata
              </p>
            </div>
          </div>
        `,
      };

      // Levél elküldése
      await transporter.sendMail(mailOptions);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Hiba:", error);
    return NextResponse.json({ error: 'Hiba' }, { status: 500 });
  }
}