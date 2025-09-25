"use client";

import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, User } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { Prisma } from "~/prisma/generated/prisma";
import { ToppingRow } from "./ToppingRow";
import ReturnBtn from "@/app/components/ReturnBtn";
import ProfileBtn from "@/app/components/ProfileBtn";

interface IProductPageClientProps {
  product: Prisma.ProductGetPayload<{
    include: {
      toppings: true;
    };
  }>;
}

export default function ProductPageClient({
  product,
}: IProductPageClientProps) {
  const { addProduct, toggleCart } = useCart();

  const [selectedToppingsQuantity, setSelectedToppingsQuantity] =
    useState<number>(0);
  const [productQuantity, setProductQuantity] = useState<number>(1);

  const handleToppingCheckboxSelect = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target;

    if (input.checked) {
      if (selectedToppingsQuantity === product.toppingsQt) {
        input.checked = false;
        return;
      }

      setSelectedToppingsQuantity((prev) => prev + 1);
      return;
    }

    setSelectedToppingsQuantity((prev) => prev - 1);
  };

  const getToppingsLeftQuantityText = () => {
    const quantityLeft = product.toppingsQt - selectedToppingsQuantity;

    switch (quantityLeft) {
      case 1:
        return `Escolha até mais 1 complemento:`;
      default:
        return `Escolha até mais ${quantityLeft} complementos:`;
    }
  };

  const handleSubmit = () => {
    const selectedToppings = document.querySelectorAll(
      "input[type=checkbox]:checked"
    );

    const selectedToppingsArray = Array.from(selectedToppings).map(
      (topping) => {
        const [name, id] = topping.id.split("-");
        return {
          id,
          name,
        };
      }
    );

    addProduct(product, selectedToppingsArray, productQuantity, product.price);
    toggleCart();
  };

  return (
    <>
      <ReturnBtn />

      <ProfileBtn />

      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-4 p-2">
          <p className="font-medium">{getToppingsLeftQuantityText()}</p>
          <ul className="flex flex-col gap-6 overflow-y-scroll h-[43dvh]">
            {product.toppings.map((topping) => (
              <ToppingRow
                key={topping.id}
                topping={topping}
                onCheck={handleToppingCheckboxSelect}
              />
            ))}
          </ul>
        </div>

        <div className="h-[10dvh] flex justify-evenly items-center bg-mygray-200 rounded-t-2xl">
          <button
            type="button"
            className="bg-lightgreen px-4 py-3 rounded-xl font-semibold text-xl text-mygray-400"
            onClick={handleSubmit}
          >
            Adicionar
          </button>
          <div className="flex gap-4 bg-white px-4 py-3 rounded-xl">
            <Minus
              onClick={() =>
                setProductQuantity((prev) => (prev > 1 ? prev - 1 : prev))
              }
              className="cursor-pointer"
            />
            <p className="w-2 text-center">{productQuantity}</p>
            <Plus
              onClick={() => setProductQuantity((prev) => prev + 1)}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </>
  );
}
