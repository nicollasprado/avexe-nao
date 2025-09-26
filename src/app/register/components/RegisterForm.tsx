"use client";

import EmailAutoComplete from "@/app/components/EmailAutoComplete";
import PasswordInput from "@/app/components/PasswordInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input } from "rsuite";
import z from "zod";

const registerSchema = z.object({
  firstName: z.string().min(2, "Primeiro nome é obrigatório"),
  lastName: z.string().min(2, "Último nome é obrigatório"),
  email: z.string().min(5, "Email é obrigatório"),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
});

type TFormSchema = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const { register, isAuthenticated } = useAuth();

  if (isAuthenticated) redirect("/");

  const form = useForm<TFormSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const handleOnSubmit = (data: TFormSchema) => {
    register(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleOnSubmit)}
        className="flex flex-col gap-8 w-full"
      >
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Seu nome"
                    type="text"
                    size="lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sobrenome</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Seu sobrenome"
                    type="text"
                    size="lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <EmailAutoComplete field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <PasswordInput field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <button
          type="submit"
          className="bg-mypurple text-white p-4 rounded-md font-semibold cursor-pointer"
        >
          CADASTRAR
        </button>
      </form>
    </Form>
  );
}
