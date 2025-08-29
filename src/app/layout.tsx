import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import React from "react";
import { TanstackProvider } from "../providers/TanstackProvider";
import { CartProvider } from "@/contexts/CartContext";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Se Avexe Não",
  description: "Sua açaiteria preferida",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br font-sans">
      <body className={`${poppins.variable} antialiased w-[100dvw] h-[100dvh]`}>
        <TanstackProvider>
          <CartProvider>{children}</CartProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
