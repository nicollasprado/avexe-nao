"use client";

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
import { Eye, EyeClosed } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AutoComplete, Input, InputGroup } from "rsuite";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().min(6, "Email é obrigatório"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
});

type TFormData = z.infer<typeof formSchema>;

const EMAIL_SUFFIXES = [
  "@gmail.com",
  "@yahoo.com",
  "@hotmail.com",
  "@outlook.com",
];

export default function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);
  const { login, isAuthenticated } = useAuth();

  if (isAuthenticated) redirect("/");

  const form = useForm<TFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (data: TFormData) => {
    login(data.email, data.password);
  };

  const handleEmailChange = (value: string) => {
    const at = value.match(/@[\S]*/);
    const nextData = at
      ? EMAIL_SUFFIXES.filter((item) => item.indexOf(at[0]) >= 0).map(
          (item) => {
            return `${value}${item.replace(at[0], "")}`;
          }
        )
      : EMAIL_SUFFIXES.map((item) => `${value}${item}`);

    setEmailSuggestions(nextData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-10"
      >
        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <AutoComplete
                    {...field}
                    data={emailSuggestions}
                    onChange={(value) => {
                      field.onChange(value);
                      handleEmailChange(value);
                    }}
                    placeholder="Digite seu email"
                    autoComplete="new-password"
                    size="lg"
                  />
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
                  <InputGroup size="lg">
                    <Input
                      {...field}
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Digite sua senha"
                    />
                    <InputGroup.Button
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? <Eye /> : <EyeClosed />}
                    </InputGroup.Button>
                  </InputGroup>
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
          Entrar
        </button>
      </form>
    </Form>
  );
}
