<template>
  <div class="pagina-login">
    <div class="cadastro">
      <div class="titulo-cadastro">Cadastrar-se</div>
      <div class="infos-cadastro">

        <div class="input-box">
          <input v-model="first_name" type="text" id="nome" class="input-cadastro" required />
          <label for="nome" class="label">Nome</label>
          <div class="icon"><i class="fa-solid fa-user"></i></div>
        </div>

        <div class="input-box">
          <input v-model="last_name" type="text" id="sobrenome" class="input-cadastro" required />
          <label for="sobrenome" class="label">Sobrenome</label>
          <div class="icon"><i class="fa-solid fa-user"></i></div>
        </div>

        <div class="input-box">
          <input v-model="user.email" type="email" id="email" class="input-cadastro" required />
          <label for="email" class="label">E-mail</label>
          <div class="icon"><i class="fa-solid fa-envelope"></i></div>
        </div>

        <div class="input-box">
          <input v-model="user.password" type="password" id="senha" class="input-cadastro" required />
          <label for="senha" class="label">Senha</label>
          <div class="icon"><i class="fa-solid fa-lock"></i></div>
        </div>

        <div class="input-box">
          <input v-model="confirmarSenha" type="password" id="confirmarSenha" class="input-cadastro" required />
          <label for="confirmarSenha" class="label">Confirmação de senha</label>
          <div class="icon"><i class="fa-solid fa-lock"></i></div>
        </div>
        <button class="botao-acesso" @click="validarCadastro">Acessar</button>

          <div class="botao-login">
            Já tenho uma conta <router-link to="/">Entrar</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAutenticacaoStore } from '@/stores/autenticacao';
import { useToastStore } from '@/stores/toast';

const router = useRouter();
const toastStore = useToastStore();
const autenticacaoStore = useAutenticacaoStore();

const first_name = ref('');
const last_name = ref('');
const confirmarSenha = ref('');
const user = reactive({
  name: '',
  email: '',
  password: ''
});

async function validarCadastro() {
  if (user.password !== confirmarSenha.value) {
    toastStore.notify("As senhas não coincidem!", "error");
    return;
  }
  user.name = first_name.value + " " + last_name.value;
  await autenticacaoStore.cadastro(user, router); // envia pro back e vai pra /home
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
  background-image:url('/public/imagem/todos.png');
  min-height: 100vh;
  padding: 2rem;
}

/* Container principal */
.cadastro {
  width: 70vh;
  max-width: 600px;
  height: 94%;
  backdrop-filter: blur(25px);
  border: 2px solid #fff;
  border-radius: 15px;
  height: 90vh;
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
  color: #fff;
}

.titulo-cadastro span {
  color: #adaeb0;
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
  margin-left: 14vh;
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
