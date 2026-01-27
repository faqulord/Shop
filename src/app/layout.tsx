import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LipsesHungary - Prémium Ajakdúsítás",
  description: "Fájdalommentes, azonnali ajakdúsítás tű nélkül.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body className={inter.className}>{children}</body>
    </html>
  );
}