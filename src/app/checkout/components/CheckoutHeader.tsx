import ReturnBtn from "@/app/components/ReturnBtn";
import { User } from "lucide-react";
import Link from "next/link";

export default function CheckoutHeader() {
  return (
    <header className="w-full flex justify-between items-center px-4 pt-3">
      <ReturnBtn size={24} />

      <h2 className="font-medium">Finalizar Compra</h2>

      <Link href="#">
        <User />
      </Link>
    </header>
  );
}
