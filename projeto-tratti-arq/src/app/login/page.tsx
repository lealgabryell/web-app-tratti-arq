"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginRequest } from "../../services/auth";
import Cookie from "js-cookie";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Preencha todos os campos!");
      return;
    }

    setIsLoading(true);

    try {
      const data = await loginRequest({ email, password });

      // 1. Feedback no Console
      console.log("Login realizado com sucesso!", data);

      // 2. Feedback Visual (Toast)
      toast.success("Bem-vindo!");

      // 3. Salva Token e Redireciona
      Cookie.set("tratti_token", data.token, { expires: 2 });
      Cookie.set("tratti_role", data.role, { expires: 2 });

      // Delay pequeno para o usuário ler o toast de sucesso
      setTimeout(() => {
        if (data.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/home");
        }
      }, 1000);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // 1. Feedback no Console
      console.error("Erro no login:", error.response?.data || error.message);

      // 2. Feedback Visual (Toast Customizado para Erro)
      const mensagemErro =
        error.response?.status === 403 || error.response?.status === 401
          ? "E-mail ou senha incorretos."
          : "Erro ao conectar com o servidor.";

      toast.error(mensagemErro);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="p-10 bg-white shadow-2xl rounded-xl w-full max-w-md border border-gray-200"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Tratti Arq</h1>
          <p className="text-gray-500 mt-2">Entre com suas credenciais</p>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="E-mail"
            disabled={isLoading}
            className="w-full p-3 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:bg-gray-50"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            disabled={isLoading}
            className="w-full p-3 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:bg-gray-50"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition-colors disabled:bg-blue-300"
        >
          {isLoading ? "Autenticando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
