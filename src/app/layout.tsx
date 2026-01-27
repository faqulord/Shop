import "./globals.css";
import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "600", "700"], variable: '--font-serif' });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["300", "400", "500", "700"], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "LipsesHungary | Prémium Ajakfeltöltés",
  description: "Tű nélküli hyaluron pen technológia otthonra.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hu">
      <body className={`${playfair.variable} ${montserrat.variable} antialiased`}>
        {/* Hóesés */}
        <div className="snow-container">
            <div className="snow"></div>
        </div>
        {children}
      </body>
    </html>
  )
}