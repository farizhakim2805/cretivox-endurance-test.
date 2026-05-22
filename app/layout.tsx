import type { Metadata } from "next";
import { Bebas_Neue, Space_Grotesk } from "next/font/google";
import "./globals.css";

// Konfigurasi Font Judul (Bebas Neue)
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas", // Kita buatkan variabel CSS agar terbaca oleh Tailwind
});

// Konfigurasi Font Paragraf (Space Grotesk)
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "Fariz Hakim | Endurance Test",
  description: "Cretivox Internship Experience - Endurance Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      {/* Menerapkan variabel font ke tag <body> */}
      <body className={`${bebasNeue.variable} ${spaceGrotesk.variable} font-space antialiased bg-zinc-950 text-white`}>
        {children}
      </body>
    </html>
  );
}