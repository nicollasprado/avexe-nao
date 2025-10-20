import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import IAddressDTO from "@/interfaces/dtos/IAddressDTO";
import { apiService } from "@/services/ApiService";
import { useEffect, useState } from "react";
import EditAddressForm from "./EditAddressForm";
import { formatCep } from "@/utils/formatCep";

interface IEditAddressDialogProps {
  addressId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function EditAddressDialog({
  addressId,
  open,
  setOpen,
}: IEditAddressDialogProps) {
  const [address, setAddress] = useState<IAddressDTO>();

  useEffect(() => {
    const fetchAddress = async () => {
      const res = await apiService.axios.get(`/api/addresses/${addressId}`, {
        withCredentials: true,
      });
      setAddress(res.data);
    };

    fetchAddress();
  }, [addressId]);

  if (!address) return null;

  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Endereço</DialogTitle>
          <DialogDescription className="text-left">
            Preencha os dados abaixo com as novas informações para editar o
            endereço.
          </DialogDescription>

          <div className="flex flex-col items-start text-left text-mygray-400 font-medium mb-1">
            <p>{address.street.toUpperCase().replace("AVENIDA", "AV.")}</p>

            <div className="text-sm">
              <p>
                {address.city} - {address.neighborhood}
              </p>
              <p>CEP: {formatCep(address.cep.toUpperCase())}</p>
            </div>
          </div>

          <EditAddressForm
            key={address.id}
            addressId={address.id}
            number={address.number}
            complement={address.complement}
            reference={address.reference}
            setDialogOpen={setOpen}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
