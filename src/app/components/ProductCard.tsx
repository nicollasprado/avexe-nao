import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import { Product } from "~/prisma/generated/prisma";
import { PhotoPlaceholder } from "./PhotoPlaceholder";

interface IProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: IProductCardProps) {
  const getImage = () => {
    if (product.imgUrl) {
      return (
        <Image
          src={`/${product.imgUrl}`}
          alt={`foto do produto ${product.name}`}
          className="rounded-md"
          fill
        />
      );
    }

    return <PhotoPlaceholder width={68} height={68} />;
  };

  return (
    <li>
      <Link
        href={`/product/${product.id}`}
        className="flex justify-between items-center"
      >
        <section className="flex flex-col gap-1">
          <h3 className="font-semibold text-mygray-400">{product.name}</h3>
          <p className="text-[0.85rem] text-mygray-300 max-w-67">
            {product.description}
          </p>
          <p className="font-semibold text-mygray-400 text-lg">
            R$ {formatPrice(product.price)}
          </p>
        </section>

        <div className="relative w-18 h-18">{getImage()}</div>
      </Link>
    </li>
  );
}
