import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lipses Shop",
  description: "A legjobb dropshipping termékek",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hu">
      <body>{children}</body>
    </html>
  )
}
