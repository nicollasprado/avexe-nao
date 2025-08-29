import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import { Product } from "~/prisma/generated/prisma";

export default function CartSheet() {
  const { isOpen, toggleCart, products } = useCart();

  const getProductImage = (product: Product) => {
    if (product.imgUrl) {
      return (
        <Image
          src={`/${product.imgUrl}`}
          alt={`Foto do ${product.name}`}
          width={32}
          height={32}
        />
      );
    }

    return <div className="bg-mygray-200 w-32 h-32"></div>;
  };

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-2xl">Minha sacola</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <ol>
          {products.map((product) => (
            <li key={product.id}>{getProductImage(product)}</li>
          ))}
        </ol>
      </SheetContent>
    </Sheet>
  );
}
