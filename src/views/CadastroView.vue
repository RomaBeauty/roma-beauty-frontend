<template>
    <div class="pagina-login">
        <div class="cadastro">
            <div class="titulo-cadastro">Cadastrar-se</div>
            <div class="infos-cadastro">

                <div class="input-box">
                    <input v-model="nome" type="text" id="nome" class="input-cadastro" required />
                    <label for="nome" class="label">Nome</label>
                    <div class="icon"><i class="fa-solid fa-user"></i></div>
                </div>

                <div class="input-box">
                    <input v-model="sobrenome" type="text" id="sobrenome" class="input-cadastro" required />
                    <label for="sobrenome" class="label">Sobrenome</label>
                    <div class="icon"><i class="fa-solid fa-user"></i></div>
                </div>

                <div class="input-box">
                    <input v-model="email" type="email" id="email" class="input-cadastro" required />
                    <label for="email" class="label">E-mail</label>
                    <div class="icon"><i class="fa-solid fa-envelope"></i></div>
                </div>

                <div class="input-box">
                    <input v-model="senha" type="password" id="senha" class="input-cadastro" required />
                    <label for="senha" class="label">Senha</label>
                    <div class="icon"><i class="fa-solid fa-lock"></i></div>
                </div>

                <div class="input-box">
                    <input v-model="confirmarSenha" type="password" id="confirmarSenha" class="input-cadastro"
                        required />
                    <label for="confirmarSenha" class="label">Confirmação de senha</label>
                    <div class="icon"><i class="fa-solid fa-lock"></i></div>
                </div>

                <div class="input-box">
                    <input v-model="telefone" type="tel" id="telefone" class="input-cadastro" required />
                    <label for="telefone" class="label">Telefone</label>
                    <div class="icon"><i class="fa-solid fa-phone"></i></div>
                </div>

                <button class="botao-acesso" @click="acessar">Acessar</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const nome = ref('')
const sobrenome = ref('')
const email = ref('')
const senha = ref('')
const confirmarSenha = ref('')
const telefone = ref('')

function acessar() {
    console.log({
        nome: nome.value,
        sobrenome: sobrenome.value,
        email: email.value,
        senha: senha.value,
        confirmarSenha: confirmarSenha.value,
        telefone: telefone.value
    })
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
    margin-left: 50vh;
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
    border: 1px solid #fff;
    color: #fff;
}

.input-cadastro:focus~.label,
.input-cadastro:valid~.label {
    position: absolute;
    top: -10px;
    left: 20px;
    font-size: 14px;
    background-color: #e9e7e9;
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
</style>
