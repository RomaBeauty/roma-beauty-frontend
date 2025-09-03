import { api } from "@/plugins/api";

class AutenticacaoService {
    async cadastro(user) {
        try {
            await api.post("/cadastro/", user);
            return true;
        } catch(error) {
            console.error("Erro no cadastro:", error);
            return false;
        }
    }

    async login(user) {
        try {
            const response = await api.post("/token/", user);
            return response.data;
        } catch(error) {
            console.error("Erro no login:", error);
            return false;
        }
    }
}

export default new AutenticacaoService();