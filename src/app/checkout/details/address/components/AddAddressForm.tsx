"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { PatternFormat } from "react-number-format";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { viaCepService } from "@/services/ViaCepService";
import { CepNotFoundError } from "@/errors/CepNotFoundError";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { apiService } from "@/services/ApiService";
import { useRouter } from "next/navigation";

const addAddressSchema = z.object({
  cep: z.string().min(8, "CEP é obrigatório"),
  street: z.string().min(5, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  city: z.string().min(2, "Cidade é obrigatória"),
  neighborhood: z.string().min(2, "Bairro é obrigatório"),
  complement: z.string().optional(),
  reference: z.string().optional(),
});

type TFormSchema = z.infer<typeof addAddressSchema>;

interface IAddAddressFormProps {
  setDialogOpen?: (open: boolean) => void;
}

export default function AddAddressForm({
  setDialogOpen,
}: IAddAddressFormProps) {
  const router = useRouter();

  const form = useForm<TFormSchema>({
    resolver: zodResolver(addAddressSchema),
    defaultValues: {
      cep: "",
      street: "",
      number: "",
      city: "",
      neighborhood: "",
      complement: "",
      reference: "",
    },
  });

  const cepDigits = form.watch("cep").replace("-", "").trim();
  const [cepValid, setCepValid] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);

  const handleCepChange = async (cep: string) => {
    const cleanCep = cep.replace("-", "").trim();
    form.setValue("cep", cleanCep);

    if (cleanCep.length !== 8) return;

    try {
      const address = await viaCepService.getAddressByCep(cleanCep);
      form.setValue("city", address.city);
      form.setValue("neighborhood", address.neighborhood);
      form.setValue("street", address.street);
      setCepValid(true);
      form.clearErrors("cep");
    } catch (error) {
      if (error instanceof CepNotFoundError) {
        setCepValid(false);
        toast.error("CEP não encontrado");
        form.setError("cep", { message: "CEP não encontrado" });
      }
    }
  };

  const handleSubmit = async (data: TFormSchema) => {
    setBtnDisabled(true);

    const res = await apiService.axios.post("/api/addresses", data, {
      withCredentials: true,
    });

    setBtnDisabled(false);
    if (res.status === 201) {
      toast.success("Endereço adicionado com sucesso!");

      setDialogOpen?.(false);
      router.refresh();
    } else {
      toast.error("Erro ao adicionar endereço. Tente novamente.");
      return;
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="cep"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CEP</FormLabel>
                <FormControl>
                  <PatternFormat
                    format="#####-###"
                    customInput={Input}
                    {...field}
                    value={field.value}
                    onChange={(e) => handleCepChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {cepDigits.length === 8 && cepValid && (
            <>
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="neighborhood"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bairro</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex gap-2">
                <div className="w-[70%]">
                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rua</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-[30%]">
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
                </div>
              </div>
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
            </>
          )}
        </div>

        <Button
          type="submit"
          size={"lg"}
          className="mb-2"
          disabled={btnDisabled}
        >
          Adicionar Endereço
        </Button>
      </form>
    </Form>
  );
}
