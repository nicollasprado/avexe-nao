import { usePath } from "@/contexts/PathContext";
import { ChevronLeft, User } from "lucide-react";
import Link from "next/link";

export default function CheckoutHeader() {
  const { getLastPath } = usePath();

  return (
    <header className="w-full flex justify-between px-4 pt-5">
      <Link href={getLastPath()}>
        <ChevronLeft />
      </Link>

      <h2 className="font-medium">Finalizar Compra</h2>

      <Link href="#">
        <User />
      </Link>
    </header>
  );
}
