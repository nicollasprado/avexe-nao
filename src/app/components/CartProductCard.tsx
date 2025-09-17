import ICartProduct from "@/interfaces/ICartProduct";
import { capitalize } from "@/utils/capitalize";
import { formatPrice } from "@/utils/formatPrice";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { Product } from "~/prisma/generated/prisma/wasm";
import { PhotoPlaceholder } from "./PhotoPlaceholder";
import { Separator } from "@/components/ui/separator";

interface ICartProductCardProps {
  cartProduct: ICartProduct;
  index: number;
  removeProduct: (product: ICartProduct) => void;
}

export function CartProductCard({
  cartProduct,
  index,
  removeProduct,
}: ICartProductCardProps) {
  const getProductImage = (product: Product) => {
    if (product.imgUrl) {
      return (
        <Image
          src={`/${product.imgUrl}`}
          alt={`Foto do ${product.name}`}
          className="rounded"
          fill
        />
      );
    }

    return <PhotoPlaceholder width={48} height={48} />;
  };

  return (
    <li key={index} className="flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <div className="flex gap-2">
          <div className="relative h-12 w-12">
            {getProductImage(cartProduct.product)}
          </div>

          <div className="flex flex-col gap-1">
            <div>
              <p className="text-mygray-400 text-md">
                <b>{cartProduct.product.name}</b>
              </p>
              <p className="text-sm">{cartProduct.quantity}x </p>
            </div>

            <ul className="list-disc list-inside">
              {cartProduct.toppings.map((topping, idx) => (
                <li key={idx} className="text-mygray-400 text-sm">
                  {capitalize(topping.name)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          type="button"
          className="cursor-pointer mt-1 bg-red-500 rounded-full p-[0.28rem]"
          onClick={() => removeProduct(cartProduct)}
        >
          <Trash2 className="stroke-white" width={16} height={16} />
        </button>
      </div>

      <p className="text-right font-semibold text-mygray-400">
        R$ {formatPrice(cartProduct.price)}
      </p>

      <Separator />
    </li>
  );
}
