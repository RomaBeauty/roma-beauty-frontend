import { api } from "@/plugins/api";

class AutenticacaoService {
    async cadastro(user) {
        try {
            const response = await api.post("/cadastro", user);
            return true;
        } catch(error) {
            console.error("Erro no cadastro:", error);
            return false;
        }
    }

    async login(user) {
        try {
            const response = await api.post("/login", user);
            return true;
        } catch(error) {
            console.error("Erro no login:", error);
            return false;
        }
    }
}

export default new AutenticacaoService();