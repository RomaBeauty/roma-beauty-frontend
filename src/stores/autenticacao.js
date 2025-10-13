import { defineStore } from "pinia";
import AutenticacaoService from "@/services/autenticacao";
import { useToastStore } from "./toast";

export const useAutenticacaoStore = defineStore("autenticacao", () => {
    const toastStore = useToastStore();

    async function cadastro(user, router) {
        const response = await AutenticacaoService.cadastro(user);
        if (response) {
            // Faz login automaticamente após cadastro
            await login({ email: user.email, password: user.password }, router);
        }
    }

    async function login(user, router) {
        const response = await AutenticacaoService.login(user);
        if (response) {
            localStorage.setItem("access", response.access);
            localStorage.setItem("refresh", response.refresh);

            toastStore.notify("Login realizado com sucesso!", "success");

            // 🔹 Navega para /home
            router.push("/home");
        }
    }

    return {
        cadastro,
        login
    }
});
