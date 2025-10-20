"use client";

import { useOrder } from "@/contexts/OrderContext";
import { usePath } from "@/contexts/PathContext";
import IAddressDTO from "@/interfaces/dtos/IAddressDTO";
import { Settings, Trash2 } from "lucide-react";
import { redirect } from "next/navigation";
import EditAddressDialog from "./EditAddressDialog";
import { useState } from "react";
import ConfirmDeleteAddressDialog from "./ConfirmDeleteAddressDialog";

type ISelectAddressCardProps = Omit<IAddressDTO, "lastUsedAt">;

export default function SelectAddressCard({
  id,
  cep,
  number,
  street,
  complement,
  city,
  neighborhood,
  reference,
}: ISelectAddressCardProps) {
  const { setAddress } = useOrder();
  const { getLastPath } = usePath();

  const [editAddressOpen, setEditAddressOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  if (!cep || !number || !street || !city || !neighborhood) {
    return null;
  }

  const handleCardClick = () => {
    setAddress(id);
    redirect(getLastPath() || "/checkout/details");
  };

  return (
    <>
      <EditAddressDialog
        address={{
          id,
          cep,
          number,
          street,
          complement,
          city,
          neighborhood,
          reference,
        }}
        open={editAddressOpen}
        setOpen={setEditAddressOpen}
      />

      <ConfirmDeleteAddressDialog
        address={{
          id,
          number,
          street,
          complement,
          city,
          neighborhood,
          reference,
        }}
        open={confirmDeleteOpen}
        setOpen={setConfirmDeleteOpen}
      />

      <div className="flex items-center justify-between px-4 gap-2">
        <button
          type="button"
          onClick={handleCardClick}
          className="flex flex-col gap-1 items-start cursor-pointer"
        >
          <p className="text-mygray-400 text-sm text-left">
            {street.toUpperCase().replace("AVENIDA", "AV.")} Nº{" "}
            {number.toUpperCase()}{" "}
            {complement &&
              `- ${complement.toUpperCase().replace("APARTAMENTO", "APTO.")}`}
          </p>

          <p className="text-mygray-300 text-xs">
            {reference && reference.toUpperCase()}
          </p>

          <p className="text-mygray-300 text-xs">
            {neighborhood} - {city}
          </p>
        </button>

        <div className="flex flex-col gap-4 text-xs">
          <button
            type="button"
            className="text-mygray-300 bg-mygray-100 rounded-full p-2 cursor-pointer"
            onClick={() => setEditAddressOpen(true)}
          >
            <Settings size={18} />
          </button>

          <button
            type="button"
            className="text-red-400 bg-red-100 rounded-full p-2 cursor-pointer"
            onClick={() => setConfirmDeleteOpen(true)}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </>
  );
}
