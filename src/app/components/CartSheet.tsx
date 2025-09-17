"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import { CartProductCard } from "./CartProductCard";
import { formatPrice } from "@/utils/formatPrice";

export default function CartSheet() {
  const { isOpen, toggleCart, products, removeProduct, totalPrice } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="border-none">
        <SheetHeader>
          <SheetTitle className="text-2xl">Minha sacola</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="flex flex-col justify-between h-full">
          <ol className="flex flex-col gap-4 px-4">
            {products.map((cartProd, index) => (
              <CartProductCard
                key={index}
                cartProduct={cartProd}
                index={index}
                removeProduct={removeProduct}
              />
            ))}
          </ol>

          {products.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="flex justify-between border-2 border-mygray-100 rounded-sm p-6 mx-4">
                <p className="text-mygray-400">Total</p>

                <p className="font-semibold text-mygray-400">
                  R$ {formatPrice(totalPrice)}
                </p>
              </div>

              <Link
                href="/checkout"
                className="p-4 m-4 bg-mypurple text-white rounded-2xl font-semibold cursor-pointer text-center"
              >
                Finalizar
              </Link>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
