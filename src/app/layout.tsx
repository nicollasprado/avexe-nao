import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import React from "react";
import { TanstackProvider } from "../providers/TanstackProvider";
import { CartProvider } from "@/contexts/CartContext";
import { PathProvider } from "@/contexts/PathContext";
import { PathWatcher } from "@/components/PathWatcher";
import CartSheet from "./components/CartSheet";
import { AuthProvider } from "@/contexts/AuthContext";
import { CustomProvider } from "rsuite";

import "rsuite/Input/styles/index.css";
import "rsuite/InputGroup/styles/index.css";
import "rsuite/AutoComplete/styles/index.css";
import { OrderProvider } from "@/contexts/OrderContext";

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
        <AuthProvider>
          <CustomProvider>
            <TanstackProvider>
              <PathProvider>
                <OrderProvider>
                  <CartProvider>
                    <PathWatcher />
                    <CartSheet />
                    {children}
                  </CartProvider>
                </OrderProvider>
              </PathProvider>
            </TanstackProvider>
          </CustomProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
