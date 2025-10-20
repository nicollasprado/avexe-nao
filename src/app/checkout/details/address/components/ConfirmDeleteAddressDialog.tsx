"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import IAddressDTO from "@/interfaces/dtos/IAddressDTO";
import { apiService } from "@/services/ApiService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface IConfirmDeleteAddressDialogProps {
  address: Pick<
    IAddressDTO,
    | "id"
    | "number"
    | "street"
    | "complement"
    | "city"
    | "neighborhood"
    | "reference"
  >;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ConfirmDeleteAddressDialog({
  address,
  open,
  setOpen,
}: IConfirmDeleteAddressDialogProps) {
  const router = useRouter();

  const [btnDisabled, setBtnDisabled] = useState(false);

  const handleConfirmDelete = async () => {
    setBtnDisabled(true);

    const res = await apiService.axios.delete(`/api/addresses/${address.id}`, {
      withCredentials: true,
    });

    if (res.status !== 200) {
      toast.error("Erro ao deletar endereço. Tente novamente.");
      return;
    }

    toast.success("Endereço deletado com sucesso");
    setOpen(false);
    router.refresh();
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="flex flex-col gap-4">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left">
            Quer mesmo deletar?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            Essa ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="p-2 border-1 border-mygray-100 rounded-md">
          <p className="text-mygray-400 text-sm text-left">
            {address.street.toUpperCase().replace("AVENIDA", "AV.")} Nº{" "}
            {address.number.toUpperCase()}{" "}
            {address.complement &&
              `- ${address.complement
                .toUpperCase()
                .replace("APARTAMENTO", "APTO.")}`}
          </p>

          <p className="text-mygray-300 text-sm">
            {address.reference && address.reference.toUpperCase()}
          </p>

          <p className="text-mygray-300 text-sm">
            {address.neighborhood} - {address.city}
          </p>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmDelete}
            disabled={btnDisabled}
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
