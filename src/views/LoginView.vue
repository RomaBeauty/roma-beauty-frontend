<template>
  <div class="pagina-login">
    <div class="cadastro">
      <div class="titulo-cadastro">Login</div>
      <div class="infos-cadastro">
        <div class="input-box">
          <input type="text" v-model="user.email" id="email" class="input-cadastro" required />
          <label for="email" class="label">Email</label>
          <div class="icon"><i class="fa-solid fa-user"></i></div>
        </div>

        <div class="input-box">
          <input type="password" v-model="user.password" id="senha" class="input-cadastro" required />
          <label for="senha" class="label">Senha</label>
          <div class="icon"><i class="fa-solid fa-lock"></i></div>
        </div>

        <button class="botao-acesso" @click="fazerLogin">Acessar</button>

        <div class="botao-login">
          Ainda não tem uma conta?
          <router-link to="/cadastro">Criar</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAutenticacaoStore } from '@/stores/autenticacao';
import { useToastStore } from '@/stores/toast';

const router = useRouter();
const toastStore = useToastStore();
const autenticacaoStore = useAutenticacaoStore();

const user = reactive({
  email: '',
  password: ''
});

async function fazerLogin() {
  if (!user.email || !user.password) {
    toastStore.notify("Preencha todos os campos!", "error");
    return;
  }
  await autenticacaoStore.login(user, router); // envia pro back e vai pra /home
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
  margin-left: 45vh;
}

/* Inputs */
.input-box {
  position: relative;
  display: grid;
  margin: 20px 0;
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
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
  margin-left: 10vh;
}


.botao-acesso:hover {
  background-color: #feb7d9c1;
  color: #ffffff;
}

/* Botão de cadastro*/
.botao-login {
  margin-top: 20px;
  text-align: center;
  color: #adaeb0;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px; 
}

.botao-login a {
  color: #0049da;
  font-weight: 700;
  text-decoration: none;
  transition: color 0.3s ease;
}

.botao-login a:hover {
  color: #feb7d9;
  cursor: pointer;
}
</style>