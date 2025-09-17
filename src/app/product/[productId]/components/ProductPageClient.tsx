"use client";

import { useCart } from "@/contexts/CartContext";
import { usePath } from "@/contexts/PathContext";
import { ChevronLeft, Minus, Plus, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { Prisma, Topping } from "~/prisma/generated/prisma";

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
  const { getLastPath } = usePath();
  const router = useRouter();

  const [selectedToppingsQuantity, setSelectedToppingsQuantity] =
    useState<number>(0);
  const [productQuantity, setProductQuantity] = useState<number>(1);

  const getToppingImg = (topping: Topping) => {
    if (topping.imgUrl) {
      return (
        <Image
          src={`/${topping.imgUrl}`}
          alt={`foto do ${topping.name}`}
          fill
        />
      );
    }

    return <div className="w-10 h-10 bg-mygray-200"></div>;
  };

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

  const handleReturnBtnClick = () => {
    const pastPath = getLastPath();
    router.push(pastPath);
  };

  const handleSubmit = () => {
    const selectedToppings = document.querySelectorAll(
      "input[type=checkbox]:checked"
    );

    const selectedToppingsArray = Array.from(selectedToppings).map(
      (topping) => {
        const [name, id] = topping.id.split("-");
        return {
          id: Number(id),
          name,
        };
      }
    );

    addProduct({
      product,
      quantity: productQuantity,
      toppings: selectedToppingsArray,
      price: product.price,
    });

    toggleCart();
  };

  return (
    <>
      <button
        type="button"
        onClick={handleReturnBtnClick}
        className="absolute top-5 left-5 bg-white p-2 rounded-full cursor-pointer"
      >
        <ChevronLeft />
      </button>

      <Link
        href="#"
        className="absolute z-49 right-5 top-5 bg-white p-2 rounded-full text-mygray-400"
      >
        <User />
      </Link>

      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-4 p-2">
          <p className="font-medium">{getToppingsLeftQuantityText()}</p>
          <ul className="flex flex-col gap-6 overflow-y-scroll h-[43dvh]">
            {product.toppings.map((topping) => (
              <li
                key={topping.id}
                className="flex justify-between items-center px-2"
              >
                <label
                  htmlFor={`${topping.name}-${topping.id}`}
                  className="flex gap-2 items-center"
                >
                  <div className="relative w-10 h-10">
                    {getToppingImg(topping)}
                  </div>
                  {topping.name}
                </label>
                <input
                  type="checkbox"
                  name={`${topping.name}-${topping.id}`}
                  id={`${topping.name}-${topping.id}`}
                  className="w-6 h-6 toppingCheckbox"
                  onChange={(e) => handleToppingCheckboxSelect(e)}
                />
              </li>
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
