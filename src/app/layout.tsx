import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LipsesHungary - Valentin Napi Nyereményjáték",
  description: "Prémium ajakápolás tű nélkül.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hu">
      <body className="antialiased">
        {/* Hóesés réteg */}
        <div className="snow-container">
            <div className="snow"></div>
        </div>
        {children}
      </body>
    </html>
  )
}