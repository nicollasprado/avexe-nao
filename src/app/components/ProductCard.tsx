import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import { Product } from "~/prisma/generated/prisma";

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

    return <div className="w-18 h-18 bg-mygray-200 rounded-md"></div>;
  };

  return (
    <li>
      <Link
        href={`/product/${product.id}`}
        className="flex justify-between items-center border-b-2 border-mygray-100 pb-7"
      >
        <section className="flex flex-col gap-2">
          <h3 className="font-medium text-mygray-400">{product.name}</h3>
          <p className="text-sm text-mygray-300 max-w-67">
            {product.description}
          </p>
          <p className="font-medium text-mygray-400 text-lg">
            R$ {formatPrice(product.price)}
          </p>
        </section>

        <div className="relative w-18 h-18">{getImage()}</div>
      </Link>
    </li>
  );
}
