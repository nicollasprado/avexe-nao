"use client";

import { PhotoPlaceholder } from "@/app/components/PhotoPlaceholder";
import ICartProduct from "@/interfaces/ICartProduct";
import { formatPrice } from "@/utils/formatPrice";
import { Dot, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";

interface CheckoutProductCardProps {
  cartProduct: ICartProduct;
}

export default function CheckoutProductCard({
  cartProduct,
}: CheckoutProductCardProps) {
  const { decreaseProductQuantity, increaseProductQuantity } = useCart();

  const getImage = () => {
    if (cartProduct.product.imgUrl) {
      return (
        <Image
          src={cartProduct.product.imgUrl}
          alt={cartProduct.product.name}
          fill
          className="rounded"
        />
      );
    }

    return <PhotoPlaceholder width={64} height={64} />;
  };

  const handleDecrease = (cartProduct: ICartProduct) => {
    decreaseProductQuantity(cartProduct);
  };

  return (
    <div className="w-full flex gap-2">
      <div className="relative w-16 h-16">{getImage()}</div>

      <div className="flex flex-col justify-between w-full">
        <h3 className="text-md text-mygray-400 font-semibold">
          {cartProduct.product.name}
        </h3>
        <ul className="flex flex-wrap items-center">
          {cartProduct.toppings.map((topping, index) => (
            <li
              key={topping.id}
              className="text-[0.8rem] text-mygray-300 flex items-center"
            >
              <span>{topping.name}</span>
              {index < cartProduct.toppings.length - 1 ? (
                <Dot width={16} height={16} />
              ) : (
                ""
              )}
            </li>
          ))}
        </ul>

        <div className="flex justify-between items-center">
          <p className="text-mygray-400 font-semibold">
            R$ {formatPrice(cartProduct.product.price * cartProduct.quantity)}
          </p>

          <div className="flex gap-4 items-center">
            <button
              type="button"
              className="cursor-pointer"
              onClick={() => handleDecrease(cartProduct)}
            >
              <Minus />
            </button>

            <p className="text-mygray-400 font-semibold w-5 text-center">
              {cartProduct.quantity}
            </p>

            <button
              type="button"
              className="p-1 bg-mypurple rounded-sm cursor-pointer"
              onClick={() => increaseProductQuantity(cartProduct)}
            >
              <Plus className="text-white" width={22} height={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
