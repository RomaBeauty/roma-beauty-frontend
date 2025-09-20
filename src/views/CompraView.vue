<script setup>
import { ref } from 'vue'
import axios from 'axios'

// URL da API (ideal deixar no .env: VITE_API_URL=http://localhost:8000/api)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

// Campos do formulário
const nome = ref('')
const sobrenome = ref('')
const email = ref('')
const telefone = ref('')
const cep = ref('')
const rua = ref('')
const bairro = ref('')
const cidade = ref('')
const estado = ref('')
const numero = ref('')
const complemento = ref('')

// Feedback para o usuário
const mensagem = ref('')
const erro = ref('')

// Função para buscar CEP
const buscarCep = async () => {
  const cepLimpo = cep.value.replace(/\D/g, '')
  if (cepLimpo.length !== 8) return

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`)
    if (response.data.erro) {
      rua.value = ''
      bairro.value = ''
      cidade.value = ''
      estado.value = ''
      alert('CEP não encontrado.')
    } else {
      rua.value = response.data.logradouro
      bairro.value = response.data.bairro
      cidade.value = response.data.localidade
      estado.value = response.data.uf
    }
  } catch (error) {
    console.error('Erro ao buscar CEP:', error)
  }
}

// Função para enviar pro backend
const enviarFormulario = async () => {
  try {
    const payload = {
      nome: nome.value,
      sobrenome: sobrenome.value,
      email: email.value,
      telefone: telefone.value,
      cep: cep.value,
      rua: rua.value,
      numero: numero.value,
      bairro: bairro.value,
      complemento: complemento.value,
      cidade: cidade.value,
      estado: estado.value
    }

    const response = await axios.post(`${API_URL}/purchases/`, payload)

    mensagem.value = response.data.message || 'Compra realizada com sucesso!'
    erro.value = ''

    // Limpar formulário
    nome.value = ''
    sobrenome.value = ''
    email.value = ''
    telefone.value = ''
    cep.value = ''
    rua.value = ''
    numero.value = ''
    bairro.value = ''
    complemento.value = ''
    cidade.value = ''
    estado.value = ''
  } catch (e) {
    erro.value = e.response?.data?.detail || 'Erro ao enviar compra.'
    mensagem.value = ''
    console.error('Erro ao enviar formulário:', e)
  }
}
</script>

<template>
  <div class="container">
    <div class="lado1">
      <div class="logo">
        <img src="/public/imagem/logo.png" alt="">
      </div>
      <div class="historico">
        <p>Sacola ></p>
        <p class="info">Informações </p>
        <p>> Pagamento</p>
      </div>

      <div class="lado1">
        <div class="formulario">
          < <form @submit.prevent="enviarFormulario">
            <!-- Linha 1: Nome e Sobrenome -->
            <div class="linha">
              <div class="campo">
                <input id="nome" type="text" v-model="nome" placeholder="Nome" required />
              </div>
              <div class="campo">
                <input id="sobrenome" type="text" v-model="sobrenome" placeholder="Sobrenome" required />
              </div>
            </div>

            <!-- Linha 2: Email -->
            <div class="linha">
              <div class="campo unico">
                <input id="email" type="email" v-model="email" placeholder="Email" required />
              </div>
            </div>

            <!-- Linha 3: Telefone -->
            <div class="linha">
              <div class="campo unico">
                <input id="telefone" type="tel" v-model="telefone" placeholder="Telefone" required />
              </div>
            </div>

            <!-- Linha 4: CEP + botão -->
            <div class="linha">
              <div class="campo cep-container">
                <input id="cep" type="text" v-model="cep" placeholder="CEP" required />
                <button type="button" class="buscar-cep" @click="buscarCep">
                  Buscar
                </button>
              </div>
            </div>


            <!-- Linha 5: Rua e Número -->
            <div class="linha">
              <div class="campo">
                <input id="rua" type="text" v-model="rua" placeholder="Rua" readonly />
              </div>
              <div class="campo">
                <input id="numero" type="text" v-model="numero" placeholder="Número" required />
              </div>
            </div>

            <!-- Linha 6: Bairro e Complemento -->
            <div class="linha">
              <div class="campo">
                <input id="bairro" type="text" v-model="bairro" placeholder="Bairro" readonly />
              </div>
              <div class="campo">
                <input id="complemento" type="text" v-model="complemento" placeholder="Complemento (opcional)" />
              </div>
            </div>

            <!-- Linha 7: Cidade e Estado -->
            <div class="linha">
              <div class="campo">
                <input id="cidade" type="text" v-model="cidade" placeholder="Cidade" readonly />
              </div>
              <div class="campo">
                <input id="estado" type="text" v-model="estado" placeholder="Estado" readonly />
              </div>
            </div>

            <button type="submit">Enviar</button>
            </form>

            <!-- Mensagens de feedback -->
            <p v-if="mensagem" style="color: green; margin-top: 10px;">{{ mensagem }}</p>
            <p v-if="erro" style="color: red; margin-top: 10px;">{{ erro }}</p>
        </div>
      </div>
    </div>

    <!-- lado2 (resumo da compra, produtos etc) permanece igual -->
    <div class="lado2">
      <!-- Produto principal -->
      <div class="produto-principal">
        <div class="imagem-produto">
          <img src="/public/cabelo/valentine-cabelo2.png" alt="Produto">
          <div class="quantidade">1</div>
        </div>
        <div class="info-produto">
          <p class="nome-produto">Máscara Super Inteligente 500g</p>
          <p class="valor-produto">R$ 120,00</p>
        </div>
      </div>

      <!-- Resumo do pedido -->
      <div class="resumo">
        <div class="linha-resumo">
          <span>Subtotal</span>
          <span>R$ 120,00</span>
        </div>
        <div class="linha-resumo">
          <span>Envio</span>
          <span>R$ 15,00</span>
        </div>
        <div class="linha-resumo total">
          <span>Total</span>
          <span>R$ 135,00</span>
        </div>
      </div>

      <!-- Outros produtos -->
      <div class="outros">
        <h3>Outros produtos</h3>
        <div class="cards-produtos">
          <div class="card-produto">
            <img src="/public/cabelo/valentine-cabelo3.png" alt="">
            <div class="adicional">
              <h1>Óleo</h1>
              <p>R$ 50,00</p>
            </div>
            <button class="adicionar">Adicionar</button>
          </div>

          <div class="card-produto">
            <img src="/public/cabelo/valentine-cabelo.png" alt="">
            <div class="adicional">
              <h1>Shampoo</h1>
              <p>R$ 80,00</p>
            </div>
            <button class="adicionar">Adicionar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton+SC&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap');


.lado2 {
  background-color: rgb(241, 240, 237);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  margin-top: -10px;
  margin-right: -7px;
  margin-bottom: 40px;
}

/* Produto principal */
.produto-principal {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 740px;
}

.imagem-produto {
  position: relative;
  width: 100px;
  height: 100px;
}

.card-produto {
  display: flex;
  justify-content: space-between;
  /* separa os lados */
  align-items: center;
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  height: 70px;
}

.imagem-produto img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  border: solid 1px #555;
}

.quantidade {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: #333;
  color: #fff;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
}

.info-produto {
  display: flex;
  gap: 5px;
}

.nome-produto {
  font-weight: bold;
  font-size: 1.2rem;
}

.valor-produto {
  font-weight: 600;
  color: #555;
  margin-left: 200px;
  width: 100px;
  font-size: 1.1rem;
}

/* Código de desconto */
.desconto {
  display: flex;
  gap: 10px;
}

.desconto input {
  flex: 1;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  height: 30px;
  font-size: 1rem;
}

.desconto button {
  padding: 8px 15px;
  border: none;
  border-radius: 6px;
  background-color: #333;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;

}

/* Resumo do pedido */
.resumo {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.linha-resumo {
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
}

.total {
  font-weight: bold;
  font-size: 1.2rem;
}

/* Outros produtos */
.outros {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cards-produtos {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-produto {
  display: flex;
  gap: 10px;
  align-items: center;
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  height: 70px;
}

.card-produto img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 6px;
}

.card-produto p {
  margin: 0;
  flex-direction: column;

}

.adicional h1 {
  font-weight: 700;
  font-size: 1rem;
}


.cep-container {
  display: flex;
  gap: 10px;
  align-items: center;
}

.buscar-cep {
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  background-color: #333;
  color: #fff;
  cursor: pointer;
  transition: 0.3s;
  font-size: 0.9rem;
  white-space: nowrap;
}

.buscar-cep:hover {
  background-color: #555;
}




.container {
  display: grid;
  grid-template-columns: 50% 50%;
  margin: 0;
  font-family: "Poppins", sans-serif;

}

.info {
  color: rgb(195, 194, 191);
}

.formulario form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 700px;
  margin: 0 auto;
}


/* Linha de campos lado a lado */
.linha {
  display: flex;
  gap: 15px;
  align-items: flex-start;
  /* alinha todos à esquerda */
}

/* Campos individuais */
.campo {
  flex: 1;
  display: flex;
  flex-direction: column;
}


.campo input {
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 500;
}

/* Campos únicos ocupam 100% */
.campo.unico {
  flex: 1 1 100%;
}

/* Labels alinhados uniformemente */


/* Botão */
button {
  padding: 12px;
  border-radius: 8px;
  border: none;
  background-color: #333;
  color: #fff;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background-color: #555;
}

.lado1 {
  text-align: center;
  border-right: 1px solid rgb(255, 251, 242);
  padding: 20px;
}



.logo img {
  width: 280px;
  height: 150px;
  margin-top: -30px;
}

.historico {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: -35px;
}

.pagamento {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #fff;
  margin-top: 60px;

}

.pagamento i {
  font-size: 2rem;

}

.pag1 {
  background-color: rgb(0, 26, 255);
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  width: 200px;
  gap: 40px;
}

.pag2 {
  background-color: black;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  width: 200px;

}

.pag3 {
  background-color: #ffd900;
  padding: 10px;
  border-radius: 5px;
  width: 200px;

}

.formulario form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin: 0 auto;
}

.formulario input {
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.formulario button {
  padding: 10px;
  border-radius: 8px;
  border: none;
  background-color: #333;
  color: #fff;
  cursor: pointer;
  transition: 0.3s;
}

.formulario button:hover {
  background-color: #555;
}
</style>