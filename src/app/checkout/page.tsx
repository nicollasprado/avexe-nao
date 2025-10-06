"use client";

import { useCart } from "@/contexts/CartContext";
import CheckoutProductCard from "./components/CheckoutProductCard";
import { usePath } from "@/contexts/PathContext";
import { redirect } from "next/navigation";
import { ConfirmRemoveProductModal } from "../components/ConfirmRemoveProductModal";
import { formatPrice } from "@/utils/formatPrice";
import CheckoutHeader from "./components/CheckoutHeader";
import Link from "next/link";

export default function Checkout() {
  const { products, totalPrice } = useCart();
  const { getLastPath } = usePath();

  if (products.length === 0) {
    redirect(getLastPath());
  }

  return (
    <>
      <ConfirmRemoveProductModal />

      <div className="h-full w-full bg-gray-200 flex flex-col gap-5">
        <CheckoutHeader />

        <main className="h-full px-2 pb-4 flex flex-col gap-2">
          <div className="h-full bg-white rounded p-4 overflow-y-scroll">
            <ol className="flex flex-col gap-6">
              {products.map((item) => {
                return (
                  <li key={item.id}>
                    <CheckoutProductCard cartProduct={item} />
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="h-fit bg-white rounded p-4 text-[#353535] flex flex-col gap-3">
            <h2 className="font-medium">Resumo da compra</h2>
            <ol>
              <li className="w-full flex justify-between">
                <p>Subtotal:</p>
                <p className="font-semibold">R$ {formatPrice(totalPrice)}</p>
              </li>
              <li className="w-full flex justify-between">
                <p>Frete:</p>
                <p className="font-semibold">R$ {formatPrice(0)}</p>
              </li>
              <li className="w-full flex justify-between border-t mt-2 pt-2">
                <p className="font-semibold">Total:</p>
                <p className="font-semibold">R$ {formatPrice(totalPrice)}</p>
              </li>
            </ol>
          </div>

          <Link
            href="/checkout/details"
            className="bg-mypurple w-full p-4 rounded text-white font-semibold text-center text-lg cursor-pointer"
          >
            Continuar
          </Link>
        </main>
      </div>
    </>
  );
}
