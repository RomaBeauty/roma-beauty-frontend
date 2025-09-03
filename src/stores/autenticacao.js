import { defineStore } from "pinia";
import AutenticacaoService from "@/services/autenticacao";
import { useToastStore } from "./toast";
import { useRouter } from "vue-router";

export const useAutenticacaoStore = defineStore("autenticacao", () => {
    const toastStore = useToastStore();
    const router = useRouter();

    async function cadastro(user) {
        const response = await AutenticacaoService.cadastro(user);

        if (response) {
            login({email: user.email, password: user.password})
        }
    }

    async function login(user) {
        const response = await AutenticacaoService.login(user);

        if (response) {
            localStorage.setItem("access", response.access);
            localStorage.setItem("refresh", response.refresh);
            router.push({ path: "/" });
            toastStore.notify("Login realizado com sucesso!", "success");
        }
    }

    return {
        cadastro,
        login
    }
})