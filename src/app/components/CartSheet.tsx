"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { Trash } from "lucide-react";
import Image from "next/image";
import { Product } from "~/prisma/generated/prisma";

export default function CartSheet() {
  const { isOpen, toggleCart, products, removeProduct } = useCart();

  const getProductImage = (product: Product) => {
    if (product.imgUrl) {
      return (
        <Image
          src={`/${product.imgUrl}`}
          alt={`Foto do ${product.name}`}
          fill
        />
      );
    }

    return <div className="bg-mygray-200 w-12 h-12"></div>;
  };

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-2xl">Minha sacola</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <ol className="flex flex-col gap-4 px-4">
          {products.map((cartProd, index) => (
            <li key={index} className="flex justify-between">
              <div className="flex gap-2">
                <div className="relative h-12 w-12">
                  {getProductImage(cartProd.product)}
                </div>

                <div className="flex flex-col">
                  <p className="text-mygray-400 text-md">
                    {cartProd.quantity}x {cartProd.product.name}
                  </p>

                  <ul className="flex flex-wrap gap-x-1 w-fit">
                    {cartProd.toppings.map((topping, index) => (
                      <li
                        key={topping.id}
                        className="text-[0.8rem] text-mygray-400"
                      >
                        {topping.name}
                        {index < cartProd.toppings.length - 1 && ","}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                type="button"
                className="cursor-pointer"
                onClick={() => removeProduct(cartProd)}
              >
                <Trash className="text-red-500" />
              </button>
            </li>
          ))}
        </ol>
      </SheetContent>
    </Sheet>
  );
}
