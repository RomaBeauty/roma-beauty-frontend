<template>
  <div class="pagina-login">
    <div class="cadastro">
      <div class="titulo-cadastro">Login</div>

      <div class="infos-cadastro">
        <div class="input-box">
          <input type="text" v-model="form.nome" id="user-nome" class="input-cadastro" required />
          <label for="user-nome" class="label">Nome</label>
          <div class="icon">
            <i class="fa-solid fa-user"></i>
          </div>
        </div>

        <div class="input-box">
          <input type="text" v-model="form.sobrenome" id="user-sobrenome" class="input-cadastro" required />
          <label for="user-sobrenome" class="label">Sobrenome</label>
          <div class="icon">
            <i class="fa-solid fa-user"></i>
          </div>
        </div>

        <div class="input-box">
          <input type="email" v-model="form.email" id="email" class="input-cadastro" required />
          <label for="email" class="label">E-mail</label>
          <div class="icon">
            <i class="fa-solid fa-envelope"></i>
          </div>
        </div>

        <div class="input-box">
          <input type="password" v-model="form.senha" id="pass" class="input-cadastro" required />
          <label for="pass" class="label">Senha</label>
          <div class="icon">
            <i class="fa-solid fa-lock"></i>
          </div>
        </div>
      </div>

      <button class="botao-acesso" @click="handleLogin">Acessar</button>

      <div class="botao-login">
        Ainda não tem uma conta?
        <div class="login-botao">
          <router-link to="/cadastro">Criar</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  nome: '',
  sobrenome: '',
  email: '',
  senha: ''
})

function handleLogin() {
  console.log('Dados do login:', form)
}
</script>

<style scoped>
/* Copie aqui o CSS que você quer que seja scoped só a esse componente */
/* Por exemplo, o que te passei antes, ou um subset dele */

.pagina-login {
    font-family: "Poppins", sans-serif;
    line-height: 1.6;
    color: #fff;
    background-color: #000;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
}

.cadastro {
    position: relative;
    width: 100%;
    max-width: 450px;
    backdrop-filter: blur(25px);
    border: 2px solid #fff;
    border-radius: 15px;
    padding: 5em 2.5em 4em 2.5em;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.5);
}

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
    text-decoration: none;
    border: 1px solid #fff;
    color: #fff;
}

.input-cadastro:focus ~ .label,
.input-cadastro:valid ~ .label {
    position: absolute;
    top: -10px;
    left: 20px;
    font-size: 14px;
    background-color: #e9e7e9;
    border-radius: 30px;
    color: #000;
    padding: 0 10px;
}

.label {
    position: absolute;
    top: 15px;
    left: 20px;
    transition: 0.2s;
}

.titulo-cadastro {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 20px;
}

.icon {
    position: absolute;
    top: 12px;
    right: 25px;
    font-size: 20px;
}

.botao-acesso {
    position: relative;
    width: 100%;
    height: 55px;
    overflow: hidden;
    padding: 15px 30px;
    border-radius: 30px;
    background-color: #fff;
    color: #3a3a3a;
    font-size: 1.2rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    z-index: 1;
    transition: color 0.3s ease;
}

.botao-acesso:hover {
    background-color: #feb7d9c1;
    transition: ease 1s;
    color: #ffffff;
}

.botao-login {
    margin-top: 20px;
    display: grid;
    grid-template-columns: auto 30px;
    margin-left: 10px;
    align-items: center;
}

.login-botao a {
    color: #adaeb0;
    font-weight: 700;
    text-decoration: none;
}

.login-botao a:hover {
    color: #feb7d9;
    transition: ease 1s;
}
</style>