import SelectAddressCard from "@/app/checkout/details/address/components/SelectAddressCard";
import ReturnBtn from "@/app/components/ReturnBtn";
import IAddressDTO from "@/interfaces/dtos/IAddressDTO";
import prisma from "@/lib/prisma";
import { getUserIdFromCookies } from "@/utils/getUserIdFromCookies";
import { redirect } from "next/navigation";
import AddAddress from "./components/AddAddress";
import { Toaster } from "sonner";

export default async function Address() {
  const userId = await getUserIdFromCookies();

  if (!userId) {
    redirect("/login");
  }

  const addresses: IAddressDTO[] = await prisma.address.findMany({
    where: {
      userId,
    },
    omit: {
      createdAt: true,
      updatedAt: true,
    },
  });

  return (
    <div className="h-full flex flex-col gap-6 px-4">
      <Toaster position="top-center" />

      <div className="flex items-center justify-between pt-2">
        <ReturnBtn bg />
        <h1 className="text-lg font-medium text-mygray-400">
          Selecionar Endereço
        </h1>
        <span className="invisible">
          <ReturnBtn bg />
        </span>
      </div>

      <ol className="h-full flex flex-col gap-4 overflow-y-scroll">
        {addresses.map((address) => (
          <li key={address.id} className="border-b-2 border-mygray-100 pb-4">
            <SelectAddressCard {...address} />
          </li>
        ))}
      </ol>

      <AddAddress />
    </div>
  );
}
