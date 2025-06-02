import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Dumbbell } from "lucide-react"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Olympic Fitness",
  description: "Olympic Fitness - The Best Fitness Center in Salé",
  icons: {
    icon: "/logo-cnom.png",
    apple: "/logo-cnom.png",
    shortcut: "/logo-cnom.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} bg-dark-bg-primary text-dark-text-primary`}
      >
        {children}
      </body>
    </html>
  );
}
