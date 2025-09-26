import Image from "next/image";
import Link from "next/link";
import LoginForm from "./components/LoginForm";

export default function Login() {
  return (
    <div className="flex flex-col justify-evenly items-center h-screen p-4">
      <div className="flex flex-col items-center gap-8">
        <Link href="/">
          <h1 className="w-28 h-28 relative">
            <Image src="/logo.jpg" alt="Logo" fill className="rounded-lg" />
          </h1>
        </Link>

        <div className="flex flex-col items-center">
          <p className="text-sm text-mygray-300">Bem-Vindo de volta</p>
          <p className="text-md text-mygray-400">
            Preencha os dados para conectar-se
          </p>
        </div>
      </div>

      <main className="flex flex-col justify-between items-center h-[50dvh]">
        <div className="flex flex-col gap-4">
          <LoginForm />
          <Link
            href={"/recover"}
            className="text-sm text-mypurple font-medium text-center"
          >
            Esqueci minha senha
          </Link>
        </div>

        <p className="text-sm text-mygray-300">
          Não tem conta?{" "}
          <Link
            href={"/register"}
            className="text-sm text-mypurple font-medium"
          >
            Crie uma conta
          </Link>
        </p>
      </main>
    </div>
  );
}
