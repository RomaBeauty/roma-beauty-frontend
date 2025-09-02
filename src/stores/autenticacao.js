import { defineStore } from "pinia";
import AutenticacaoService from "@/services/autenticacao";

export const useAutenticacaoStore = defineStore("autenticacao", () => {
    async function cadastro(user) {
        return await AutenticacaoService.cadastro(user);
    }

    async function login(user) {
        return await AutenticacaoService.login(user);
    }

    return {
        cadastro,
        login
    }
})