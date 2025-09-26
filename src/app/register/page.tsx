import Image from "next/image";
import Link from "next/link";
import RegisterForm from "./components/RegisterForm";

export default function Register() {
  return (
    <div>
      <div className="flex flex-col justify-evenly items-center h-screen p-4">
        <div className="flex flex-col items-center gap-8">
          <Link href="/">
            <h1 className="w-28 h-28 relative">
              <Image src="/logo.jpg" alt="Logo" fill className="rounded-lg" />
            </h1>
          </Link>

          <div className="flex flex-col items-center">
            <p className="text-sm text-mygray-300">Seja bem vindo</p>
            <p className="text-md text-mygray-400">
              Preencha os dados para criar sua conta e aproveitar nossos
              produtos.
            </p>
          </div>
        </div>

        <main className="flex flex-col justify-between items-center h-[60dvh] w-full">
          <RegisterForm />

          <Link href={"/login"} className="text-sm text-mygray-300">
            Já possui uma conta?{" "}
            <span className="text-sm text-mypurple font-medium">
              Conectar-se
            </span>
          </Link>
        </main>
      </div>
    </div>
  );
}
