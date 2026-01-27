import "./globals.css";
import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google"; // Prémium betűtípusok

// Google Fonts betöltése
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-serif' });
const montserrat = Montserrat({ subsets: ["latin"], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "LipsesHungary - Prémium Ajakápolás",
  description: "Valentin napi nyereményjáték és akció.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hu">
      <body className={`${playfair.variable} ${montserrat.variable} font-sans antialiased overflow-x-hidden`}>
        
        {/* --- TÉLI HÓESÉS EFFEKT (ELŐTÉRBEN) --- */}
        <div className="snow-container">
            <div className="snow"></div>
            <div className="snow-layer2"></div>
        </div>

        {/* --- TARTALOM --- */}
        <main className="relative z-10 min-h-screen">
            {children}
        </main>
        
      </body>
    </html>
  )
}