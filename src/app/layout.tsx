import "./globals.css";
import type { Metadata } from "next";
// Google Fonts - ezek adják a prémium kinézetet
import { Playfair_Display, Montserrat } from "next/font/google"; 

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"], variable: '--font-serif' });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["300", "400", "700"], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "LipsesHungary - Prémium Ajakápolás",
  description: "Valentin napi nyereményjáték.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hu">
      <body className={`${playfair.variable} ${montserrat.variable} font-sans antialiased overflow-x-hidden`}>
        
        {/* Hóesés */}
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