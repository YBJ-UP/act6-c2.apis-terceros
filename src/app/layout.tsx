import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Consumo de APIs de terceros",
  description: "Las APIs son Meow Facts y Cats As A Service (CATAAS)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="bg-indigo-700 py-5">
          <ul className="flex gap-50 items-center justify-center">
            <li>
              <Link href={"/"}>API 1.- Meow Facts</Link>
            </li>
            <li>
              <Link href={"/cataas"}>API 2.- Cats As A Service</Link>
            </li>
          </ul>
        </nav>
        <div className="m-10">
          {children}
        </div>
      </body>
    </html>
  );
}
