"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import IUpdateAddressDTO from "@/interfaces/dtos/IUpdateAddressDTO";
import { apiService } from "@/services/ApiService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const schema = z.object({
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().min(0),
  reference: z.string().min(0),
});

type TFormSchema = z.infer<typeof schema>;

interface IEditAddressFormProps {
  addressId: string;
  number: string;
  complement: string;
  reference: string;
  setDialogOpen?: (open: boolean) => void;
}

export default function EditAddressForm({
  addressId,
  number,
  complement,
  reference,
  setDialogOpen,
}: IEditAddressFormProps) {
  const router = useRouter();

  const [btnDisabled, setBtnDisabled] = useState(false);

  const oldAddress = {
    number,
    complement,
    reference,
  };

  const form = useForm<TFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      number,
      complement: complement || "",
      reference: reference || "",
    },
  });

  const handleSave = async (data: Omit<IUpdateAddressDTO, "id">) => {
    setBtnDisabled(true);

    if (JSON.stringify(oldAddress) === JSON.stringify(data)) {
      toast.success("Endereço atualizado com sucesso");
      setDialogOpen?.(false);
      router.refresh();
      return;
    }

    const res = await apiService.axios.patch(
      `/api/addresses/${addressId}`,
      data,
      {
        withCredentials: true,
      }
    );

    if (res.status !== 200) {
      toast.error("Erro ao atualizar endereço, Tente novamente.");
      return;
    }

    toast.success("Endereço atualizado com sucesso");
    setBtnDisabled(true);
    setDialogOpen?.(false);
    router.refresh();
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleSave)}
      >
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="complement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Complemento</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Referência</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-green-500 text-lg font-semibold"
          size={"lg"}
          disabled={btnDisabled}
        >
          Salvar
        </Button>
      </form>
    </Form>
  );
}
