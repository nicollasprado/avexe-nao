import prisma from "@/lib/prisma";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import { redirect } from "next/navigation";
import ProductPageClient from "./components/ProductPageClient";

interface IProductPageProps {
  params: Promise<{ productId: number }>;
}

export default async function ProductPage({ params }: IProductPageProps) {
  const { productId } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id: Number(productId),
    },
    include: {
      toppings: true,
    },
  });

  if (!product) {
    redirect("/");
  }

  const getProductImage = () => {
    if (product.imgUrl) {
      return (
        <h1 className="relative w-full h-[50dvh]">
          <Image
            src={`/${product.imgUrl}`}
            alt={`Foto do ${product.name}`}
            fill
          />
        </h1>
      );
    }

    return <h1 className="w-full h-[50dvh] bg-mygray-200"></h1>;
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      {getProductImage()}

      <div className="flex justify-around text-mygray-400 text-xl font-bold">
        <h2>{product.name}</h2>
        <p>R$ {formatPrice(product.price)}</p>
      </div>

      <ProductPageClient product={product} />
    </div>
  );
}
