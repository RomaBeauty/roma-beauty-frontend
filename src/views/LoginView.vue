<template>
  <div class="pagina-login">
    <div class="cadastro">
      <div class="titulo-cadastro">Login</div>
      <div class="infos-cadastro">
        <div class="input-box">
          <input
            type="text"
            v-model="user.email"
            id="email"
            class="input-cadastro"
            required
          />
          <label for="email" class="label">Email</label>
          <div class="icon"><i class="fa-solid fa-user"></i></div>
        </div>

        <div class="input-box">
          <input
            type="password"
            v-model="user.password"
            id="senha"
            class="input-cadastro"
            required
          />
          <label for="senha" class="label">Senha</label>
          <div class="icon"><i class="fa-solid fa-lock"></i></div>
        </div>

        <button class="botao-acesso" @click="fazerLogin">Acessar</button>

        <div class="botao-login">
          Ainda não tem uma conta?<router-link to="/cadastro">Criar</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const user = reactive({
  email: '',
  password: ''
});

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

async function fazerLogin() {
  if (!user.email || !user.password) {
    alert("Preencha todos os campos!");
    return;
  }

  try {
    const res = await axios.post(`${API_BASE}/token/`, {
      email: user.email,
      password: user.password
    });

    // Salva tokens e tipo de usuário
    localStorage.setItem('access_token', res.data.access);
    localStorage.setItem('refresh_token', res.data.refresh);
    localStorage.setItem('tipo_usuario', res.data.tipo_usuario);

    alert("Login realizado com sucesso!");

    // Redireciona conforme tipo de usuário
    if (res.data.tipo_usuario === 'funcionario') {
      router.push('/funcionario');
    } else {
      router.push('/home');
    }

  } catch (err) {
    console.error(err);
    alert("Email ou senha incorretos");
  }
}

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: #000;
  font-family: "Poppins", sans-serif;
  color: #fff;
}

/* Página principal */
.pagina-login {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  min-height: 100vh;
  padding: 2rem;
}

/* Container principal */
.cadastro {
  width: 60vh;
  max-width: 600px;
  height: auto;
  backdrop-filter: blur(25px);
  border: 2px solid #fff;
  border-radius: 15px;
  padding: 3rem 2rem;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.5);
  background-color: rgba(0, 0, 0, 0.6);
}

/* Inputs */
.input-box {
  position: relative;
  display: grid;
  margin: 20px 0;
  color: #fff;
}

.input-cadastro {
  width: 100%;
  height: 55px;
  font-size: 16px;
  background: transparent;
  padding-inline: 20px 50px;
  border-radius: 30px;
  outline: none;
  border: 2px solid #fff;
  color: #fff;
}

.input-cadastro:focus~.label,
.input-cadastro:valid~.label {
  position: absolute;
  top: -10px;
  left: 20px;
  font-size: 14px;
  background-color: #ffffff;
  border-radius: 30px;
  color: #000;
  padding: 0 10px;
  transition: all 0.2s ease-in-out;
}

/* Label */
.label {
  position: absolute;
  top: 15px;
  left: 20px;
  transition: 0.2s;
  pointer-events: none;
}

/* Título do formulário */
.titulo-cadastro {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 30px;
  color: #fff;
}

/* Ícone dos inputs */
.icon {
  position: absolute;
  top: 12px;
  right: 25px;
  font-size: 20px;
  color: #fff;
}

/* Botão principal */
.botao-acesso {
  width: 30vh;
  height: 55px;
  padding: 15px 30px;
  border-radius: 30px;
  background-color: #fff;
  color: #3a3a3a;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
  margin-left: 10vh;
    border: 1px solid #7f7f7f;

}

.botao-acesso:hover {
  background-color: transparent;
  color: #7f7f7f;
  transition: all .5s ease;
  border: 1px solid #7f7f7f;
}

/* Botão de cadastro */
.botao-login {
  margin-top: 20px;
  text-align: center;
  color: #adaeb0;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
    justify-content: center;
  align-items: center;

}

.botao-login a {
  color: #ffffff;
  font-weight: 700;
  text-decoration: none;
  transition: color 0.3s ease;
}

.botao-login a:hover {
  color: #9c9c9c;
  cursor: pointer;
}
</style>
