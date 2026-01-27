import "./globals.css";
import type { Metadata } from "next";
// Betöltjük a Google Fontokat a luxus kinézethez
import { Playfair_Display, Montserrat } from "next/font/google"; 

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"], variable: '--font-serif' });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["300", "400", "500", "700"], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "LipsesHungary | Valentin Napi Akció",
  description: "Prémium ajakdúsítás tű nélkül.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hu">
      <body className={`${playfair.variable} ${montserrat.variable} antialiased`}>
        
        {/* Hóesés réteg */}
        <div className="snow-container">
            <div className="snow"></div>
        </div>

        {/* Tartalom */}
        <main className="relative z-10 min-h-screen">
            {children}
        </main>
        
      </body>
    </html>
  )
}