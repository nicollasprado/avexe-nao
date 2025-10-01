"use client";

import EmailAutoComplete from "@/app/components/EmailAutoComplete";
import LoadingScreen from "@/app/components/LoadingScreen";
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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().min(6, "Email é obrigatório"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
});

type TFormData = z.infer<typeof formSchema>;

export default function LoginForm() {
  const { login, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) redirect("/");

  useEffect(() => {
    if (isAuthenticated === null) {
      setLoading(true);
      return;
    }

    if (isAuthenticated) redirect("/");

    setLoading(false);
  }, [isAuthenticated]);

  const form = useForm<TFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  if (loading) return <LoadingScreen />;

  const onSubmit = (data: TFormData) => {
    login(data.email, data.password);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-10 w-full"
      >
        <div className="flex flex-col gap-6">
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
          CONECTAR
        </button>
      </form>
    </Form>
  );
}
